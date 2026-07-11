#!/usr/bin/env bash
# ════════════════════════════════════════════════════════════════
# CO3 Premium Liquid Shop — Image batch converter
# Converts raw PNG/JPG exports → optimized WebP, named & placed correctly.
#
# USAGE
#   1. Put your AI/photo exports in ./raw-images/ named by SLUG, e.g.
#         raw-images/blueberry-boba.png
#         raw-images/iced-matcha.jpg
#         raw-images/g1.png            (gallery)
#         raw-images/og-cover.jpg      (social card)
#         raw-images/co3-logo.png      (logo — kept as transparent PNG)
#      Any extension works: .png .jpg .jpeg .webp
#   2. Run:  npm run images      (or:  bash scripts/convert-images.sh)
#
# It only touches files you actually provide — missing ones are skipped and
# keep their branded gradient on the site. Re-run any time to add more.
# ════════════════════════════════════════════════════════════════
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_DIR="${1:-$ROOT/raw-images}"
QUALITY=80

# ── Product slugs (keep in sync with lib/products.ts) ──
PRODUCTS=(
  blueberry-boba iced-matcha cold-frappe mint-margarita
  classic-milk-tea taro-bubble-tea brown-sugar-boba mango-pearl-tea
  spanish-latte cappuccino iced-caramel-macchiato americano
  hot-matcha-latte quetta-tea kashmiri-chai
  nutty-pistachio belgian-dark-chocolate fresh-strawberry blueberry-shake
  blue-lagoon passion-mojito
  mango-tango-smoothie mixed-berry-blast
)
GALLERY=(g1 g2 g3 g4 g5 g6 g7 g8 g9 g10 g11 g12)

# ── Detect a converter ──────────────────────────────────────────
CONVERTER=""
if command -v cwebp >/dev/null 2>&1; then
  CONVERTER="cwebp"
elif command -v sips >/dev/null 2>&1 && sips --help 2>&1 | grep -qi "webp"; then
  CONVERTER="sips"
else
  cat <<'EOF'
✖ No WebP converter found.

Install one of these, then re-run:
  • libwebp (recommended):   brew install webp
  • or use built-in macOS:   recent macOS `sips` supports WebP

Quick check:  cwebp -version
EOF
  exit 1
fi
echo "→ Using converter: $CONVERTER"
echo "→ Reading from:    $SRC_DIR"
echo

mkdir -p "$ROOT/public/images/products" "$ROOT/public/images/gallery"

# Find a source file for a basename, trying common extensions.
find_src() {
  local name="$1"
  for ext in png jpg jpeg webp PNG JPG JPEG; do
    if [[ -f "$SRC_DIR/$name.$ext" ]]; then echo "$SRC_DIR/$name.$ext"; return 0; fi
  done
  return 1
}

# convert <src> <dest.webp> <maxWidth>
convert() {
  local src="$1" dest="$2" width="$3"
  if [[ "$CONVERTER" == "cwebp" ]]; then
    cwebp -quiet -q "$QUALITY" -resize "$width" 0 "$src" -o "$dest"
  else
    # sips: resize (preserve aspect) then export as webp
    sips -s format webp -s formatOptions "$QUALITY" \
         --resampleWidth "$width" "$src" --out "$dest" >/dev/null
  fi
}

count=0; missing=0; failed=0
# do_set <outdir> <maxWidth> <label> <name1> <name2> ...
# (avoids `local -n` namerefs so it runs on macOS's stock bash 3.2)
do_set() {
  local outdir="$1" width="$2" label="$3"; shift 3
  echo "── $label ──"
  for n in "$@"; do
    if src="$(find_src "$n")"; then
      if convert "$src" "$outdir/$n.webp" "$width" 2>/dev/null; then
        kb=$(( $(wc -c < "$outdir/$n.webp") / 1024 ))
        printf "  ✓ %-26s → %s.webp (%s KB)\n" "$(basename "$src")" "$n" "$kb"
        count=$((count+1))
      else
        rm -f "$outdir/$n.webp"
        printf "  ✗ %-26s (could not convert — re-export this source)\n" "$(basename "$src")"
        failed=$((failed+1))
      fi
    else
      printf "  · %-26s (no source yet — keeps gradient)\n" "$n"
      missing=$((missing+1))
    fi
  done
  echo
}

do_set "$ROOT/public/images/products" 1080 "Products (4:5, max 1080w)" "${PRODUCTS[@]}"
do_set "$ROOT/public/images/gallery"  1080 "Gallery (max 1080w)" "${GALLERY[@]}"

# ── Brand / social one-offs ─────────────────────────────────────
echo "── Brand & social ──"
if src="$(find_src og-cover)"; then
  if convert "$src" "$ROOT/public/images/og-cover.webp" 1200 2>/dev/null; then
    echo "  ✓ og-cover → og-cover.webp"; count=$((count+1))
  else echo "  ✗ og-cover (could not convert)"; failed=$((failed+1)); fi
else echo "  · og-cover (no source yet)"; missing=$((missing+1)); fi

if src="$(find_src co3-storefront)"; then
  if convert "$src" "$ROOT/public/images/co3-storefront.webp" 1600 2>/dev/null; then
    echo "  ✓ co3-storefront → co3-storefront.webp"; count=$((count+1))
  else echo "  ✗ co3-storefront (could not convert)"; failed=$((failed+1)); fi
else echo "  · co3-storefront (no source yet)"; missing=$((missing+1)); fi

# Logo stays a transparent PNG (don't convert to WebP)
if src="$(find_src co3-logo)"; then
  cp "$src" "$ROOT/public/images/co3-logo.png"
  command -v sips >/dev/null 2>&1 && sips --resampleWidth 512 "$ROOT/public/images/co3-logo.png" >/dev/null 2>&1 || true
  echo "  ✓ co3-logo → co3-logo.png (kept transparent)"; count=$((count+1))
else echo "  · co3-logo (no source yet)"; missing=$((missing+1)); fi

echo
echo "✓ Done. Converted $count image(s); $missing still using branded gradients; $failed failed."
echo "  Next: npm run build   (or refresh in npm run dev)"
