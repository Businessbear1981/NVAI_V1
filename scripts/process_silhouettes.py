"""Run the polished raised 3D brass treatment on the 3 home silhouettes.
Strips the black background, applies bevel + highlight + drop shadow,
saves with transparent background so they sit on the video, not on a plate."""

import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
sys.path.insert(0, str(Path(__file__).resolve().parent))

from generate_signatures import to_polished_brass_png, OUTPUT_DIR
from PIL import Image
import io

SILHOUETTES_DIR = Path(__file__).resolve().parent.parent / "frontend" / "public" / "brand" / "silhouettes"
BACKUP_DIR = Path(__file__).resolve().parent.parent / "frontend" / "public" / "brand" / "silhouettes-original-backup"

# Use the backup as source so we never re-process an already-processed file.
TARGETS = [
    "grounds-chateau.png",
    "kiki-profile.png",
    "tour-velvet-rope.png",
]

print(f"silhouettes dir: {SILHOUETTES_DIR}")
print(f"source (backup): {BACKUP_DIR}")
print()

for name in TARGETS:
    src = BACKUP_DIR / name
    if not src.exists():
        # Fall back to live file if backup missing
        src = SILHOUETTES_DIR / name
    print(f"-> {name}")
    print(f"   source: {src}")
    with open(src, "rb") as f:
        raw = f.read()
    polished = to_polished_brass_png(raw, is_photo=False, bright_on_dark=True)
    # crop to alpha bbox + pad
    bbox = polished.getbbox()
    if bbox:
        polished = polished.crop(bbox)
    pad_x = max(8, polished.width // 24)
    pad_y = max(8, polished.height // 24)
    padded = Image.new("RGBA", (polished.width + 2 * pad_x, polished.height + 2 * pad_y), (0, 0, 0, 0))
    padded.paste(polished, (pad_x, pad_y), polished)
    out = SILHOUETTES_DIR / name
    padded.save(out, "PNG", optimize=True)
    print(f"   saved:  {out.name}  ({out.stat().st_size:,} bytes, {padded.size[0]}x{padded.size[1]})")
    print()
