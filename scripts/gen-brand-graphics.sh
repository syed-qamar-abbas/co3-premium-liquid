#!/usr/bin/env bash
# ════════════════════════════════════════════════════════════════
# CO3 Premium Liquid Shop — Brand graphics generator
# Renders on-brand HTML banners to PNG (headless Chrome) → WebP (cwebp),
# fully offline. Produces the OG share card + 4 seasonal offer banners.
#
#   npm run graphics      (or: bash scripts/gen-brand-graphics.sh)
# ════════════════════════════════════════════════════════════════
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TPL="$ROOT/scripts/brand-templates"
WORK="$(mktemp -d)"
OUT_IMG="$ROOT/public/images"
OUT_OFFERS="$OUT_IMG/offers"
mkdir -p "$OUT_OFFERS"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[[ -x "$CHROME" ]] || CHROME="$(command -v google-chrome || command -v chromium || true)"
if [[ -z "${CHROME:-}" ]]; then echo "✖ Chrome not found"; exit 1; fi
command -v cwebp >/dev/null 2>&1 || { echo "✖ cwebp not found (brew install webp)"; exit 1; }

shoot() { # <html> <w> <h> <png>
  # Headless Chrome writes the screenshot but then lingers (GCM/updater keep it
  # alive), so we launch it detached, wait for the PNG to appear, then kill it.
  rm -f "$4"
  "$CHROME" --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
    --no-first-run --no-default-browser-check --disable-extensions \
    --disable-background-networking --disable-component-update --disable-sync \
    --user-data-dir="$WORK/p$RANDOM" --force-device-scale-factor=1 \
    --window-size="$2,$3" --screenshot="$4" "file://$1" >/dev/null 2>&1 &
  local pid=$! tries=0
  while [[ ! -s "$4" && $tries -lt 40 ]]; do sleep 0.5; tries=$((tries+1)); done
  sleep 0.4                              # let the final bytes flush
  kill "$pid" >/dev/null 2>&1 || true
  wait "$pid" 2>/dev/null || true
  [[ -s "$4" ]]                          # success = file exists and non-empty
}

# make a string safe to use as a sed REPLACEMENT (& and \ and | are special)
esc() { printf '%s' "$1" | sed 's/[\\&|]/\\&/g'; }

# substitute __KEY__ tokens in the offer template
render_offer() { # file accent emoji badge title sub body code
  sed -e "s|__ACCENT__|$(esc "$2")|g" -e "s|__EMOJI__|$(esc "$3")|g" \
      -e "s|__BADGE__|$(esc "$4")|g"  -e "s|__TITLE__|$(esc "$5")|g" \
      -e "s|__SUB__|$(esc "$6")|g"    -e "s|__BODY__|$(esc "$7")|g" \
      -e "s|__CODE__|$(esc "$8")|g" "$TPL/offer.html" > "$WORK/$1.html"
}

echo "→ Rendering brand graphics (offline, headless Chrome)…"
echo

# ── OG share card (1200×630) ───────────────────────────────────
if shoot "$TPL/og.html" 1200 630 "$WORK/og.png"; then
  cwebp -quiet -q 85 "$WORK/og.png" -o "$OUT_IMG/og-cover.webp"
  echo "  ✓ og-cover.webp            ($(( $(wc -c < "$OUT_IMG/og-cover.webp")/1024 )) KB)"
else
  echo "  ✗ og-cover.webp (render failed)"
fi

# ── Offer banners (1080×1350) ──────────────────────────────────
render_offer summer  "#005F68" "🧋" "Summer Campaign"  "Buy 2,<br>Get 1 Free"   "Premium Bubble Tea Collection" "Mix &amp; match any three bubble teas — the third is on us." "Dine-in, pickup &amp; delivery · Mention &quot;BOGO&quot; on WhatsApp."
render_offer matcha  "#5F7A3A" "🍵" "Weekday Ritual"   "Matcha<br>Mondays"      "20% off every matcha"          "Start the week jade &amp; gold. Every iced or hot matcha, 20% off." "Mondays only · Mention &quot;MATCHA20&quot; on WhatsApp."
render_offer scoop   "#7C8A4A" "🍨" "Family Pack"      "Scoop<br>Squad"         "Any four scoops · save 15%"    "Build a box of any four premium scoops and save 15% on the lot." "Pickup &amp; delivery · Mention &quot;SQUAD&quot; on WhatsApp."
render_offer student "#B8862A" "🎓" "Always On"        "Student<br>Special"     "10% off · show a student ID"   "Fuel the study grind. Students save 10% on every order, no minimum." "Show valid student ID or mention on WhatsApp."

for o in summer matcha scoop student; do
  if shoot "$WORK/$o.html" 1080 1350 "$WORK/$o.png"; then
    cwebp -quiet -q 82 "$WORK/$o.png" -o "$OUT_OFFERS/offer-$o.webp"
    echo "  ✓ offers/offer-$o.webp     ($(( $(wc -c < "$OUT_OFFERS/offer-$o.webp")/1024 )) KB)"
  else
    echo "  ✗ offers/offer-$o.webp (render failed)"
  fi
done

rm -rf "$WORK"
echo
echo "✓ Done. Brand graphics written to public/images/."
echo "  og-cover.webp is wired into <meta> already. Offer banners are ready for"
echo "  Instagram / sharing and can be dropped into the Offers page if you like."
