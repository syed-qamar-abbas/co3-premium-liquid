#!/usr/bin/env bash
# ════════════════════════════════════════════════════════════════
# CO3 — Gallery builder
# Drop images in  raw-images/gallery/  (any name, JPG/PNG/WebP), then run:
#     npm run gallery
# It optimises each to WebP in  public/images/gallery/  and writes
# public/data/gallery.json, which the Gallery page reads. Re-run any time you
# add or remove images. No code editing, no filename rules.
# ════════════════════════════════════════════════════════════════
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT/raw-images/gallery"
OUT="$ROOT/public/images/gallery"
DATA="$ROOT/public/data"
JSON="$DATA/gallery.json"
mkdir -p "$SRC" "$OUT" "$DATA"

command -v cwebp >/dev/null 2>&1 || { echo "✖ cwebp not found (brew install webp)"; exit 1; }

# masonry rhythm + soft fallback tints (used only while an image loads)
SPANS=(tall normal wide normal normal tall wide normal)
ACCENTS=("#005F68" "#6E8B3D" "#C56B7A" "#D4A537" "#B05B3B" "#1E7FB8" "#8E3B6B" "#2F8F6B")

titlecase() { # filename -> "Nice Label" (drops extension + any leading sort number)
  echo "$1" | sed -E 's/\.[^.]+$//; s/^[0-9]+[ _-]*//; s/[_-]+/ /g' \
    | awk '{for(i=1;i<=NF;i++)$i=toupper(substr($i,1,1)) substr($i,2)}1'
}

echo "→ Reading images from raw-images/gallery/"
echo

# collect source images (sorted, case-insensitive extensions)
shopt -s nullglob nocaseglob
files=("$SRC"/*.{jpg,jpeg,png,webp})
shopt -u nullglob nocaseglob

if [ ${#files[@]} -eq 0 ]; then
  echo "No images yet. Add some to: raw-images/gallery/  then re-run  npm run gallery"
  echo "[]" > "$JSON"; exit 0
fi

# clean previous generated gallery images (g-*.webp) to avoid stale files
rm -f "$OUT"/g-*.webp

entries=""; i=0
for src in "${files[@]}"; do
  name="g-$(printf '%02d' "$i")"
  cwebp -quiet -q 82 -resize 1000 0 "$src" -o "$OUT/$name.webp"
  label=$(titlecase "$(basename "$src")")
  span=${SPANS[$((i % ${#SPANS[@]}))]}
  accent=${ACCENTS[$((i % ${#ACCENTS[@]}))]}
  kb=$(( $(wc -c < "$OUT/$name.webp") / 1024 ))
  printf "  ✓ %-28s → %s.webp (%s KB)\n" "$(basename "$src")" "$name" "$kb"
  entries+="{\"id\":\"$name\",\"label\":\"$label\",\"src\":\"/images/gallery/$name.webp\",\"span\":\"$span\",\"accent\":\"$accent\"},"
  i=$((i+1))
done

printf '[%s]\n' "${entries%,}" > "$JSON"
echo
echo "✓ Built $i gallery image(s) → public/data/gallery.json"
echo "  Next: npm run build   (or refresh in npm run dev)"
