#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "images" / "products"
OUT = ROOT / "public" / "images" / "products-enhanced"
OUT.mkdir(parents=True, exist_ok=True)

TEAL = (0, 95, 104)
TEAL_DEEP = (1, 58, 65)
CREAM = (244, 240, 230)
CREAM_WARM = (255, 253, 248)
GOLD = (212, 165, 55)
INK = (17, 17, 17)

ACCENTS = {
    "boba": (197, 107, 122),
    "bubble-soda": (46, 137, 180),
    "soda": (226, 149, 43),
    "iced-coffee": (122, 82, 48),
    "hot-coffee": (139, 94, 52),
    "matcha": (110, 139, 61),
    "frappe": (107, 74, 47),
    "shakes": (192, 138, 90),
    "ice-cream": (176, 91, 59),
    "boba-ice-cream": (155, 124, 184),
    "quetta-tea": (166, 112, 61),
    "iced-tea": (217, 138, 43),
    "mocktails": (47, 143, 107),
    "smoothies": (142, 59, 107),
}


def product_data():
    script = """
const fs = require('fs');
const ts = require('typescript');
const source = fs.readFileSync('lib/products.ts', 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 } }).outputText;
const m = { exports: {} };
new Function('exports','require','module', js)(m.exports, require, m);
console.log(JSON.stringify(m.exports.PRODUCTS));
"""
    raw = subprocess.check_output(["node", "-e", script], cwd=ROOT)
    return json.loads(raw)


def image_slug(path):
    return Path(path).stem


def clean_product(img):
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            # Remove the black studio background while keeping dark product detail.
            if r < 18 and g < 18 and b < 18:
                px[x, y] = (r, g, b, 0)
            elif r < 38 and g < 38 and b < 38:
                alpha = int(a * max(r, g, b) / 38)
                px[x, y] = (r, g, b, alpha)
    return img.filter(ImageFilter.GaussianBlur(0.15))


def gradient(size, accent):
    w, h = size
    bg = Image.new("RGB", size, CREAM_WARM)
    pix = bg.load()
    ax, ay = int(w * 0.72), int(h * 0.22)
    for y in range(h):
        for x in range(w):
            t = y / max(1, h - 1)
            dx = (x - ax) / w
            dy = (y - ay) / h
            glow = max(0, 1 - (dx * dx + dy * dy) * 6)
            base = tuple(int(CREAM_WARM[i] * (1 - t) + CREAM[i] * t) for i in range(3))
            color = tuple(int(base[i] * (1 - glow * 0.18) + accent[i] * (glow * 0.18)) for i in range(3))
            pix[x, y] = color
    return bg.convert("RGBA")


def draw_frame(draw, size, slug, name, category, accent):
    w, h = size
    inset = 34
    draw.rounded_rectangle([inset, inset, w - inset, h - inset], radius=58, outline=GOLD + (115,), width=3)
    draw.rounded_rectangle([inset + 16, inset + 16, w - inset - 16, h - inset - 16], radius=44, outline=TEAL + (28,), width=2)
    draw.ellipse([w - 190, 58, w - 68, 180], fill=TEAL + (230,), outline=GOLD + (150,), width=3)
    draw.text((w - 129, 102), "C3", fill=GOLD + (255,), anchor="mm")
    label = category.replace("-", " ").upper()
    draw.rounded_rectangle([58, 62, 58 + min(430, 18 * len(label) + 58), 106], radius=22, fill=TEAL + (220,))
    draw.text((82, 84), label, fill=CREAM_WARM + (245,), anchor="lm")
    title = re.sub(r"\\s+", " ", name).strip()
    if len(title) > 28:
        title = title[:27].rstrip() + "."
    draw.text((w / 2, h - 112), title, fill=TEAL_DEEP + (245,), anchor="mm")
    draw.line([w / 2 - 90, h - 76, w / 2 + 90, h - 76], fill=GOLD + (165,), width=3)


def enhance(product, source_path, out_path):
    accent = ACCENTS.get(product["category"], TEAL)
    canvas_size = (1080, 1080)
    canvas = gradient(canvas_size, accent)
    draw = ImageDraw.Draw(canvas, "RGBA")

    # Soft editorial plate.
    plate = Image.new("RGBA", canvas_size, (0, 0, 0, 0))
    pdraw = ImageDraw.Draw(plate, "RGBA")
    pdraw.ellipse([150, 175, 930, 955], fill=CREAM + (185,), outline=GOLD + (75,), width=5)
    pdraw.ellipse([230, 255, 850, 875], outline=TEAL + (28,), width=2)
    plate = plate.filter(ImageFilter.GaussianBlur(0.4))
    canvas.alpha_composite(plate)

    raw = Image.open(source_path)
    subject = clean_product(raw)
    subject.thumbnail((760, 760), Image.Resampling.LANCZOS)
    shadow = Image.new("RGBA", canvas_size, (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow, "RGBA")
    sw, sh = subject.size
    sx = (canvas_size[0] - sw) // 2
    sy = int(210 + (620 - sh) / 2)
    sdraw.ellipse([sx + 70, sy + sh - 62, sx + sw - 70, sy + sh + 18], fill=TEAL_DEEP + (92,))
    shadow = shadow.filter(ImageFilter.GaussianBlur(28))
    canvas.alpha_composite(shadow)
    canvas.alpha_composite(subject, (sx, sy))

    # Glass reflection and gold detail.
    overlay = Image.new("RGBA", canvas_size, (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay, "RGBA")
    odraw.polygon([(0, 0), (185, 0), (620, 1080), (430, 1080)], fill=(255, 255, 255, 28))
    odraw.arc([150, 145, 930, 925], 205, 330, fill=GOLD + (125,), width=5)
    canvas.alpha_composite(overlay)

    draw = ImageDraw.Draw(canvas, "RGBA")
    draw_frame(draw, canvas_size, product["slug"], product["name"], product["category"], accent)
    canvas.convert("RGB").save(out_path, "WEBP", quality=86, method=6)


def main():
    products = product_data()
    seen = {}
    for product in products:
        src_slug = image_slug(product["image"])
        source = SRC / f"{src_slug}.webp"
        if not source.exists() and src_slug == "ice-cream-scoop-shakes":
            source = SRC / "ice-cream-shakes.webp"
        if not source.exists():
            raise FileNotFoundError(source)
        out = OUT / f"{product['slug']}.webp"
        enhance(product, source, out)
        seen[product["slug"]] = out
    print(f"Enhanced {len(seen)} product images -> {OUT}")


if __name__ == "__main__":
    main()
