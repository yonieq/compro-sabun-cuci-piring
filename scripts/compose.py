"""Stitch viewport frames captured by scripts/verify.mjs into one image.

Usage: python scripts/compose.py <name> [max_frames]
"""
import json
import os
import sys
from pathlib import Path

from PIL import Image

name = sys.argv[1]
max_frames = int(sys.argv[2]) if len(sys.argv) > 2 else 99

out_dir = Path(os.environ.get("TEMP", "/tmp")) / "citrava-preview"
manifest = json.loads((out_dir / f"{name}.json").read_text(encoding="utf-8"))
frames = manifest["frames"][:max_frames]

images = [Image.open(frame) for frame in frames]
width = max(image.width for image in images)
total = sum(image.height for image in images)

canvas = Image.new("RGB", (width, total), "white")
y = 0
for image in images:
    canvas.paste(image, (0, y))
    y += image.height

target = out_dir / f"{name}-full.png"
canvas.save(target)

# Also emit height-limited slices that stay readable.
slice_height = 3400
for index in range(0, total, slice_height):
    part = canvas.crop((0, index, width, min(index + slice_height, total)))
    part.save(out_dir / f"{name}-part{index // slice_height + 1}.png")

print(target, canvas.size)
