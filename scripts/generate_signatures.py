"""Fetch authentic artist signatures from Wikimedia Commons (public domain)
and render them in brass on a transparent background for NVAI.

Strategy:
  1. For each artist, try the MediaWiki API to resolve a known signature file
     to a server-rendered PNG. Wikimedia handles SVG -> PNG conversion for us,
     so we avoid needing cairosvg locally.
  2. Pull the rendered PNG (large, alpha-aware).
  3. Convert near-black strokes to NVAI brass (#C9A84C) while preserving the
     authentic stroke geometry. Background made transparent.
  4. Save to frontend/public/brand/signatures/<slug>.png.

We never *generate* a signature with AI. Every file written by this script
traces back to the artist's own hand on Wikimedia Commons.
"""

from __future__ import annotations

import io
import random
import sys
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image, ImageFilter, ImageChops

# Ensure stdout can handle anything
sys.stdout.reconfigure(encoding="utf-8")

# Sentinel Building palette — the iconic Coppola HQ in North Beach SF.
# 1907 flatiron clad in oxidized copper. Warm, restrained sage-verdigris with
# brass showing through the highlights. NOT bright kelly green, NOT teal —
# the specific century-old-San-Francisco-landmark green Sean called out.
HIGHLIGHT_SAGE   = (167, 191, 168)  # #A7BFA8 — sunlit oxidized copper, pale sage
BASE_GREEN       = (110, 147, 129)  # #6E9381 — THE Coppola green, body of stroke
DEEP_GREEN       = (74, 110, 94)    # #4A6E5E — recessed shadow, aged depth
EDGE_GREEN       = (46, 73, 64)     # #2E4940 — deepest verdigris, ink-dark
BRASS_GLINT      = (192, 158, 86)   # #C09E56 — warm brass peeking through

# Map artist slug -> ordered list of Wikimedia Commons file titles to try.
# Titles below are the *actual* files on Commons, verified by search.
SIGNATURE_SOURCES: dict[str, list[str]] = {
    "picasso":    ["File:Picasso signature.svg",
                   "File:Signature of Pablo Picasso.svg"],
    "chagall":    [],  # no clean SVG on Commons; will be extracted from painting JPG
    "modigliani": ["File:Amedeo_Modigliani_signature.svg"],
    "monet":      ["File:Claude Monet Signature.svg"],
    "matisse":    ["File:Henri_Matisse_signature.svg"],
    "kandinsky":  ["File:Kandinsky autograph.png",
                   "File:Unterschrift Wassily Kandinsky russischer Maler und Grafiker.png"],
    "kahlo":      ["File:Frida Kahlo signature firma.svg"],
    "pollock":    ["File:Jackson Pollock Signature.svg"],
    "davinci":    ["File:Firma de Leonardo Da Vinci.svg",
                   "File:Leonardo Da Vinci signature from Forster codex.svg"],
    "raphael":    [],  # no clean signature on Commons; canvas extract or monogram
    "bernard":    [],  # extract from a Buffet painting JPG
}

OUTPUT_DIR = Path(__file__).resolve().parent.parent / "frontend" / "public" / "brand" / "signatures"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

PAINTINGS_DIR = Path(__file__).resolve().parent.parent / "frontend" / "public" / "paintings"

# For artists whose signature has to be extracted from a painting we already
# have on disk, point at the source JPG and the normalized crop box
# (left, top, right, bottom) — values in [0, 1] of the source dimensions.
LOCAL_JPG_SOURCES: dict[str, tuple[str, tuple[float, float, float, float]]] = {
    "chagall": (
        "chagall-wolf-becomes-shepherd.jpg",
        (0.60, 0.82, 0.95, 0.96),  # lower-right where "Chagall" appears in red
    ),
}

USER_AGENT = "NVAI-SignaturePipeline/1.0 (sean.gilmore@ardanedgecapital.com)"


def resolve_thumb_url(file_title: str, width: int = 800) -> str | None:
    """Use the MediaWiki API to ask Wikimedia for a rendered PNG thumbnail
    of an SVG signature file. Returns the direct image URL or None if the
    file doesn't exist."""
    api = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "titles": file_title,
        "prop": "imageinfo",
        "iiprop": "url|mime",
        "iiurlwidth": str(width),
        "format": "json",
    }
    url = f"{api}?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            import json
            data = json.loads(r.read().decode("utf-8"))
    except Exception as e:
        print(f"   API error for {file_title}: {e}")
        return None

    pages = data.get("query", {}).get("pages", {})
    for _, page in pages.items():
        if "missing" in page:
            return None
        info = page.get("imageinfo", [])
        if not info:
            continue
        thumb = info[0].get("thumburl") or info[0].get("url")
        if thumb:
            return thumb
    return None


def fetch_png(url: str) -> bytes | None:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.read()
    except Exception as e:
        print(f"   download error: {e}")
        return None


def _build_noise(w: int, h: int, cell: int, seed: int) -> list[list[float]]:
    """Low-res random grid, bilinearly sampled later for smooth organic patina."""
    rng = random.Random(seed)
    gw, gh = (w // cell) + 2, (h // cell) + 2
    return [[rng.random() for _ in range(gw)] for _ in range(gh)]


def _sample(grid: list[list[float]], cell: int, x: int, y: int) -> float:
    gx, gy = x / cell, y / cell
    ix, iy = int(gx), int(gy)
    fx, fy = gx - ix, gy - iy
    rows = len(grid)
    cols = len(grid[0])
    n00 = grid[iy][ix]
    n10 = grid[iy][min(ix + 1, cols - 1)]
    n01 = grid[min(iy + 1, rows - 1)][ix]
    n11 = grid[min(iy + 1, rows - 1)][min(ix + 1, cols - 1)]
    a = n00 * (1 - fx) + n10 * fx
    b = n01 * (1 - fx) + n11 * fx
    return a * (1 - fy) + b * fy


def _pick_color(t: float) -> tuple[int, int, int]:
    """Pick palette stop from a 0..1 blend value (noise + light direction).
    Distribution is biased toward BASE_GREEN with patches of sage highlights,
    sparse brass glints, and pockets of deep verdigris shadow."""
    if t < 0.06:
        return BRASS_GLINT          # rare flecks where brass shows through
    if t < 0.28:
        return HIGHLIGHT_SAGE       # sun-catching sage panels
    if t < 0.68:
        return BASE_GREEN           # the iconic Coppola body
    if t < 0.92:
        return DEEP_GREEN           # shadowed verdigris
    return EDGE_GREEN               # deep oxidation pockets


def to_polished_brass_png(raw_png: bytes, is_photo: bool = False, bright_on_dark: bool = False) -> Image.Image:
    """Polished raised 3D brass rendering — bright metallic gold with a
    highlight edge along the top of each stroke, a shadow edge underneath,
    and a soft drop shadow for lift. Light source is top-left.

    Modes:
      bright_on_dark=False (default): source has dark ink on light paper
        (Wikimedia SVG signatures). Mask pixels with low luminance.
      bright_on_dark=True: source has bright shape on dark background
        (Higgsfield silhouettes — brass on black). Mask pixels with high
        luminance and saturated color, leaving the black background as
        transparent."""
    src = Image.open(io.BytesIO(raw_png))
    if is_photo:
        gray = src.convert("L")
        bw = gray.point(lambda p: 0 if p < 105 else 255, mode="L")
        src = bw.convert("RGBA")
    else:
        src = src.convert("RGBA")

    w, h = src.size
    pixels = src.load()

    # Step 1: stroke alpha mask (255 where shape, 0 elsewhere)
    mask = Image.new("L", (w, h), 0)
    mask_pixels = mask.load()
    if bright_on_dark:
        # Silhouettes: shape is bright (lum > 0.20), background is near-black
        for y in range(h):
            for x in range(w):
                r, g, b, a = pixels[x, y]
                lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255.0
                if lum > 0.20 and a > 32:
                    mask_pixels[x, y] = 255
    else:
        # Signatures: ink is dark (ink > 0.40), background is light/paper
        for y in range(h):
            for x in range(w):
                r, g, b, a = pixels[x, y]
                lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255.0
                ink = 1.0 - lum
                if ink > 0.40 and a > 32:
                    mask_pixels[x, y] = 255

    # Step 2: derive highlight + shadow edge stripes by offsetting the mask.
    # Highlight = mask AND NOT(mask shifted down-right) → top-left edge
    # Shadow    = mask AND NOT(mask shifted up-left)    → bottom-right edge
    shift = max(2, w // 250)
    shifted_dr = ImageChops.offset(mask, shift, shift)
    shifted_ul = ImageChops.offset(mask, -shift, -shift)
    highlight_edge = ImageChops.subtract(mask, shifted_dr)  # bright top-left rim
    shadow_edge = ImageChops.subtract(mask, shifted_ul)     # dark bottom-right rim

    # Step 3: paint colors over a transparent background
    POLISHED_BRASS_PALETTE = {
        "highlight": (255, 245, 198),  # cream specular, almost white
        "bright":    (244, 211, 109),  # bright polished brass
        "body":      (212, 175, 55),   # NVAI gold, rich
        "deep":      (158, 124, 38),   # deep brass body shadow
        "shadow":    (74, 53, 14),     # dark bronze edge shadow
    }

    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    out_pixels = out.load()
    hi_pix = highlight_edge.load()
    sh_pix = shadow_edge.load()

    for y in range(h):
        # vertical gradient inside the stroke body: top of image gets a touch
        # more brightness than the bottom (light source is up + left).
        v = y / max(1, h - 1)
        body_t = 1.0 - v  # 1 at top, 0 at bottom
        # interpolate body toward bright at top, toward deep at bottom
        body_color = (
            int(POLISHED_BRASS_PALETTE["deep"][0] + (POLISHED_BRASS_PALETTE["bright"][0] - POLISHED_BRASS_PALETTE["deep"][0]) * body_t),
            int(POLISHED_BRASS_PALETTE["deep"][1] + (POLISHED_BRASS_PALETTE["bright"][1] - POLISHED_BRASS_PALETTE["deep"][1]) * body_t),
            int(POLISHED_BRASS_PALETTE["deep"][2] + (POLISHED_BRASS_PALETTE["bright"][2] - POLISHED_BRASS_PALETTE["deep"][2]) * body_t),
        )
        for x in range(w):
            if mask_pixels[x, y] == 0:
                continue
            if hi_pix[x, y] > 0:
                out_pixels[x, y] = (*POLISHED_BRASS_PALETTE["highlight"], 255)
            elif sh_pix[x, y] > 0:
                out_pixels[x, y] = (*POLISHED_BRASS_PALETTE["shadow"], 255)
            else:
                out_pixels[x, y] = (*body_color, 255)

    # Step 4: soft drop shadow below the whole shape — gives it lift off the
    # background video so it reads as a raised plaque, not a painted decal.
    shadow_blur_radius = max(4, w // 200)
    shadow_offset = max(3, w // 300)
    shadow_layer = mask.filter(ImageFilter.GaussianBlur(radius=shadow_blur_radius))
    shadow_rgba = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    sl_pix = shadow_rgba.load()
    sm_pix = shadow_layer.load()
    for y in range(h):
        for x in range(w):
            v = sm_pix[x, y]
            if v > 0:
                sl_pix[x, y] = (8, 5, 2, min(180, int(v * 0.55)))
    offset_shadow = ImageChops.offset(shadow_rgba, shadow_offset, shadow_offset)
    # Wherever the foreground will paint, make the shadow fully transparent
    # (prevents shadow showing through the stroke fill).
    osp = offset_shadow.load()
    for y in range(h):
        for x in range(w):
            if mask_pixels[x, y] > 0:
                osp[x, y] = (0, 0, 0, 0)
    final = Image.alpha_composite(offset_shadow, out)
    return final


def to_brass_png(raw_png: bytes, is_photo: bool = False) -> Image.Image:
    """Convert a black-on-white (or alpha) signature image into a
    weathered Sentinel-Building-patina rendering on transparent background.

    If `is_photo` is True (source is a JPG scan of a signature on canvas/paper),
    we first apply a hard binary threshold to isolate the ink stroke from
    the textured background, then run the patina pipeline."""
    src = Image.open(io.BytesIO(raw_png))

    if is_photo:
        # Hard threshold scanned signatures: anything below 100/255 luminance
        # becomes pure black ink, everything else becomes pure white.
        # This removes canvas texture, foxing, and paper grain.
        gray = src.convert("L")
        bw = gray.point(lambda p: 0 if p < 105 else 255, mode="L")
        src = bw.convert("RGBA")
    else:
        src = src.convert("RGBA")

    pixels = src.load()
    w, h = src.size

    coarse = _build_noise(w, h, cell=max(20, w // 30), seed=42)
    fine = _build_noise(w, h, cell=max(6, w // 120), seed=2026)
    cell_coarse = max(20, w // 30)
    cell_fine = max(6, w // 120)

    # Threshold: only pixels that are clearly darker than canvas background
    # register as signature ink. This keeps JPG scans (Monet) from showing
    # canvas-paper texture as fake ink. SVG renders are unaffected — their
    # strokes are essentially pure black (ink ~= 1.0).
    INK_THRESHOLD = 0.40

    for y in range(h):
        # vertical lighting gradient — slight, top-lit
        v = y / max(1, h - 1)
        for x in range(w):
            r, g, b, a = pixels[x, y]
            lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255.0
            ink = 1.0 - lum
            if ink < INK_THRESHOLD or a < 32:
                pixels[x, y] = (0, 0, 0, 0)
                continue
            # remap ink above threshold to 0..1 so stroke_alpha still varies
            # smoothly on antialiased SVG edges
            ink_remapped = (ink - INK_THRESHOLD) / (1.0 - INK_THRESHOLD)
            stroke_alpha = int(ink_remapped * (a / 255.0) * 255)
            if stroke_alpha < 10:
                pixels[x, y] = (0, 0, 0, 0)
                continue
            n_coarse = _sample(coarse, cell_coarse, x, y)
            n_fine = _sample(fine, cell_fine, x, y)
            # blend large oxidation patches with fine speckle and a hint of
            # vertical light (top of stroke a bit brighter than the bottom)
            t = 0.55 * n_coarse + 0.30 * n_fine + 0.15 * v
            color = _pick_color(t)
            pixels[x, y] = (*color, stroke_alpha)

    return src


def process_artist_from_jpg(slug: str, filename: str, crop_norm: tuple[float, float, float, float]) -> str:
    """Extract signature from a local painting JPG (in /public/paintings)
    using a normalized crop box, then run the patina pipeline."""
    print(f"-> {slug} (local JPG extract)")
    src_path = PAINTINGS_DIR / filename
    if not src_path.exists():
        print(f"   source missing: {src_path}")
        return "missing-source"
    print(f"   source: {filename}")
    print(f"   crop:   {crop_norm}")
    with open(src_path, "rb") as f:
        raw = f.read()
    full = Image.open(io.BytesIO(raw))
    w, h = full.size
    left = int(crop_norm[0] * w)
    top = int(crop_norm[1] * h)
    right = int(crop_norm[2] * w)
    bottom = int(crop_norm[3] * h)
    cropped = full.crop((left, top, right, bottom))
    # Re-encode the cropped region as PNG bytes for to_brass_png
    buf = io.BytesIO()
    cropped.save(buf, "PNG")
    brass = to_brass_png(buf.getvalue(), is_photo=True)
    bbox = brass.getbbox()
    if bbox:
        brass = brass.crop(bbox)
    pad_x = max(8, brass.width // 12)
    pad_y = max(8, brass.height // 6)
    padded = Image.new("RGBA", (brass.width + 2 * pad_x, brass.height + 2 * pad_y), (0, 0, 0, 0))
    padded.paste(brass, (pad_x, pad_y), brass)
    out = OUTPUT_DIR / f"{slug}.png"
    padded.save(out, "PNG", optimize=True)
    print(f"   saved:  {out.name}  ({out.stat().st_size:,} bytes, {padded.size[0]}x{padded.size[1]})")
    return "ok"


def process_artist(slug: str, titles: list[str]) -> str:
    """Returns 'ok', 'missing-source', or 'error: ...' """
    print(f"-> {slug}")
    for title in titles:
        thumb_url = resolve_thumb_url(title, width=800)
        if not thumb_url:
            print(f"   not found: {title}")
            continue
        print(f"   source: {title}")
        print(f"   thumb:  {thumb_url}")
        png_bytes = fetch_png(thumb_url)
        if not png_bytes:
            continue
        # JPG scans (Monet, Kandinsky autograph) need the hard-threshold path
        is_photo = title.lower().endswith(".jpg") or "autograph" in title.lower()
        brass = to_polished_brass_png(png_bytes, is_photo=is_photo)
        # crop transparent margins so the signature fits its bounding box
        bbox = brass.getbbox()
        if bbox:
            brass = brass.crop(bbox)
        # pad 8% on each side for breathing room
        pad_x = max(8, brass.width // 12)
        pad_y = max(8, brass.height // 6)
        padded = Image.new("RGBA", (brass.width + 2 * pad_x, brass.height + 2 * pad_y), (0, 0, 0, 0))
        padded.paste(brass, (pad_x, pad_y), brass)
        out = OUTPUT_DIR / f"{slug}.png"
        padded.save(out, "PNG", optimize=True)
        print(f"   saved:  {out.name}  ({out.stat().st_size:,} bytes, {padded.size[0]}x{padded.size[1]})")
        return "ok"
    return "missing-source"


def main() -> None:
    # Optional: limit to one artist for iteration on the palette.
    # Usage:  python scripts/generate_signatures.py --only picasso
    only = None
    args = sys.argv[1:]
    if "--only" in args:
        i = args.index("--only")
        if i + 1 < len(args):
            only = args[i + 1]

    print(f"output dir: {OUTPUT_DIR}")
    sources = SIGNATURE_SOURCES if only is None else {only: SIGNATURE_SOURCES.get(only, [])}
    summary: dict[str, str] = {}
    for slug, titles in sources.items():
        # If a local JPG extraction is configured for this artist, prefer it
        if slug in LOCAL_JPG_SOURCES:
            filename, crop = LOCAL_JPG_SOURCES[slug]
            try:
                summary[slug] = process_artist_from_jpg(slug, filename, crop)
            except Exception as e:
                summary[slug] = f"error: {e}"
            continue
        if not titles:
            print(f"-> {slug}: skipped (no Wikimedia source and no local JPG)")
            summary[slug] = "needs-source"
            continue
        try:
            summary[slug] = process_artist(slug, titles)
        except Exception as e:
            summary[slug] = f"error: {e}"
    print()
    print("=== SUMMARY ===")
    for slug, status in summary.items():
        print(f"  {slug:12s}  {status}")


if __name__ == "__main__":
    main()
