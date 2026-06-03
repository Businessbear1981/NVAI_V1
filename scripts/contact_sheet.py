"""Build a contact sheet of every polished-brass asset on a dark backdrop
that simulates the chateau video background. Saves to OneDrive Desktop so
Sean can see it instantly."""

import sys
from pathlib import Path
from PIL import Image

sys.stdout.reconfigure(encoding="utf-8")

SIG_DIR = Path(__file__).resolve().parent.parent / "frontend" / "public" / "brand" / "signatures"
SIL_DIR = Path(__file__).resolve().parent.parent / "frontend" / "public" / "brand" / "silhouettes"
OUT = Path(r"C:\Users\sgill\OneDrive\Desktop\nvai-brass-contact-sheet.png")

SIGS = ["picasso", "modigliani", "matisse", "kahlo", "pollock", "davinci", "kandinsky", "monet", "chagall"]
SILS = ["grounds-chateau", "kiki-profile", "tour-velvet-rope"]

SHEET_W = 1800
PAD = 32
CELL_W = (SHEET_W - PAD * 4) // 3  # 3 cells per row
CELL_H_SIG = 220                    # signatures are wide and short
CELL_H_SIL = 320                    # silhouettes are taller

BG = (10, 8, 7, 255)  # midnight, same as the chateau video tone

def fit(im: Image.Image, max_w: int, max_h: int) -> Image.Image:
    w, h = im.size
    scale = min(max_w / w, max_h / h)
    new_w, new_h = int(w * scale), int(h * scale)
    return im.resize((new_w, new_h), Image.LANCZOS)

def add_label(img_w: int, img_h: int, text: str) -> Image.Image:
    """Make a label area below an image cell."""
    from PIL import ImageDraw, ImageFont
    strip_h = 36
    strip = Image.new("RGBA", (img_w, strip_h), BG)
    draw = ImageDraw.Draw(strip)
    try:
        font = ImageFont.truetype("arial.ttf", 16)
    except Exception:
        font = ImageFont.load_default()
    tw = draw.textlength(text, font=font)
    draw.text(((img_w - tw) // 2, 10), text, fill=(201, 168, 76, 255), font=font)
    return strip

def lay_grid(items: list[tuple[Path, str]], cell_h: int) -> Image.Image:
    """Lay items in a 3-column grid; return the composite for this section."""
    rows = (len(items) + 2) // 3
    section = Image.new("RGBA", (SHEET_W, rows * (cell_h + 36 + PAD) + PAD), BG)
    for i, (path, label) in enumerate(items):
        col = i % 3
        row = i // 3
        x = PAD + col * (CELL_W + PAD)
        y = PAD + row * (cell_h + 36 + PAD)
        try:
            im = Image.open(path).convert("RGBA")
        except Exception:
            continue
        fitted = fit(im, CELL_W, cell_h)
        # center horizontally within cell, bottom-align vertically
        cx = x + (CELL_W - fitted.width) // 2
        cy = y + (cell_h - fitted.height) // 2
        section.paste(fitted, (cx, cy), fitted)
        label_strip = add_label(CELL_W, 36, label)
        section.paste(label_strip, (x, y + cell_h), label_strip)
    return section

# Build signature section
sig_items: list[tuple[Path, str]] = []
for slug in SIGS:
    p = SIG_DIR / f"{slug}.png"
    if p.exists():
        sig_items.append((p, slug.upper()))
sig_section = lay_grid(sig_items, CELL_H_SIG)

# Build silhouette section
sil_items = [(SIL_DIR / f"{s}.png", s.upper()) for s in SILS if (SIL_DIR / f"{s}.png").exists()]
sil_section = lay_grid(sil_items, CELL_H_SIL)

# Compose full sheet with a header strip + the two sections
from PIL import ImageDraw, ImageFont
header_h = 72
total_h = header_h + sig_section.height + 24 + sil_section.height + PAD
sheet = Image.new("RGBA", (SHEET_W, total_h), BG)
draw = ImageDraw.Draw(sheet)
try:
    title_font = ImageFont.truetype("ariblk.ttf", 28)
except Exception:
    title_font = ImageFont.load_default()
draw.text((PAD, 24), "NVAI POLISHED BRASS — 9 SIGS + 3 SILHOUETTES", fill=(216, 178, 92, 255), font=title_font)
sheet.paste(sig_section, (0, header_h), sig_section)
sheet.paste(sil_section, (0, header_h + sig_section.height + 24), sil_section)

# Final: downscale if needed to keep max dimension < 1900 (Read tool ceiling)
final_w, final_h = sheet.size
if max(final_w, final_h) > 1900:
    scale = 1900 / max(final_w, final_h)
    sheet = sheet.resize((int(final_w * scale), int(final_h * scale)), Image.LANCZOS)

OUT.parent.mkdir(parents=True, exist_ok=True)
sheet.convert("RGB").save(OUT, "PNG", optimize=True)
print(f"saved: {OUT} ({OUT.stat().st_size:,} bytes, {sheet.size[0]}x{sheet.size[1]})")
