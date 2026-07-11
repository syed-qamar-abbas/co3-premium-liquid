#!/usr/bin/env bash
# ════════════════════════════════════════════════════════════════════════
# CO3 — one-shot deploy to Hostinger over SSH.
# YOU run this from your Mac's Terminal. It uploads the site + admin and
# extracts them into your web root in a single SSH session, so you only type
# your password once.
#
#   1) Open Terminal
#   2) cd "/Users/mac/C03 Premium Liquid Shop"
#   3) bash deploy-to-hostinger.sh
#   4) Type your SSH password when prompted, then change it after deployment.
# ════════════════════════════════════════════════════════════════════════
set -euo pipefail

HOST="145.79.28.194"
PORT="65002"
USER="u700603111"
DOMAIN="${DOMAIN:-darkgray-shrew-967203.hostingersite.com}"
ZIP="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/co3-hostinger-deploy.zip"

[ -f "$ZIP" ] || { echo "✖ co3-hostinger-deploy.zip not found next to this script."; exit 1; }
echo "→ Uploading $(du -h "$ZIP" | cut -f1) and deploying to $DOMAIN (you'll be asked for your SSH password once)…"
echo

cat "$ZIP" | ssh -p "$PORT" -o StrictHostKeyChecking=accept-new "$USER@$HOST" '
  set -e
  DOMAIN="darkgray-shrew-967203.hostingersite.com"
  cat > ~/co3-deploy.zip

  WEB="$HOME/domains/$DOMAIN/public_html"
  [ -d "$WEB" ] || { echo "Could not find target web root: $WEB"; exit 1; }

  mkdir -p "$WEB"
  cd "$WEB"
  command -v unzip >/dev/null 2>&1 && unzip -o ~/co3-deploy.zip >/dev/null \
    || { echo "unzip missing; using PHP"; php -r "\$z=new ZipArchive();\$z->open(getenv(\"HOME\").\"/co3-deploy.zip\");\$z->extractTo(\".\");\$z->close();"; }

  # make the admin DB + uploads writable
  chmod -R 775 admin/data admin/uploads 2>/dev/null || true
  rm -f ~/co3-deploy.zip

  echo
  echo "✓ DEPLOYED to: $WEB"
  echo "✓ Files: $(find "$WEB" -type f | wc -l | tr -d " ")"
'

echo
echo "════════════════════════════════════════════════════════"
echo "  Next (in your browser):"
echo "  1. Visit  https://$DOMAIN"
echo "  2. Visit  https://$DOMAIN/admin/install.php   (runs setup once)"
echo "  3. Log in:  admin  /  CO3-admin-2026   → then CHANGE the password."
echo "  4. Delete admin/install.php (optional, recommended)."
echo "════════════════════════════════════════════════════════"
