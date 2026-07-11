# CO₃ Admin Panel — Deploy to Hostinger

A self-contained **PHP + SQLite** control panel. No MySQL, no Node — works on any
Hostinger shared plan. Manages products, orders, offers and all site settings,
and the public website reads its data live (no rebuild needed).

## What's inside `/admin`
```
admin/
  install.php        one-time setup (seeds login + imports your menu)
  login.php          admin sign-in
  index.php          dashboard: stats, orders, top sellers
  products.php       product list (search, show/hide, delete)
  product-edit.php   add / edit product + image upload
  orders.php         orders + status (new → preparing → done)
  offers.php         seasonal offers CRUD
  settings.php       brand text, contact, logo upload, password
  api.php            public JSON the website reads + order tracking
  lib/ data/ uploads/ seed/   (internals — protected by .htaccess)
```

## Deploy steps
1. **Build the site:** `npm run build` → gives you `out/`.
2. **Upload to `public_html`:**
   - Everything inside `out/` → `public_html/`
   - The whole `admin/` folder → `public_html/admin/`
3. **Permissions:** make `public_html/admin/data` and `public_html/admin/uploads`
   writable (755 or 775). In hPanel File Manager: right-click → Permissions.
4. **Run setup once:** visit `https://yourdomain.com/admin/install.php`.
   It creates your login and imports all 34 products. It shows your credentials:
   - Username: `admin`
   - Password: `CO3-admin-2026`  ← **change immediately** (Settings → Password)
5. **Delete `install.php`** from the server (optional but recommended).
6. Log in at `https://yourdomain.com/admin/`.

## How "live editing" works
The website fetches `/admin/api.php` at runtime. Because the site and `/admin`
share the same domain, edits in the panel appear on the site within ~30s (the
API is cached 30s) — **no rebuild required**. If the backend is ever offline,
the site automatically falls back to its built-in menu, so it never breaks.

## Requirements (all standard on Hostinger)
- PHP 8.0+ with `pdo_sqlite` and `gd` (both enabled by default).
- `mod_rewrite` + `mod_headers` (already on) for the `.htaccess` guards.

## Security notes
- Passwords are hashed (`password_hash`); sessions + CSRF tokens protect forms.
- The SQLite database and internals are blocked from the web via `.htaccess`.
- Always change the default password on first login.
- Keep `install.php` deleted after setup.

## Change the admin URL / add users
- Rename the `admin/` folder (e.g. `control/`) for a non-obvious URL — then the
  site's API base changes too: set `NEXT_PUBLIC_API_BASE=/control/api.php` before
  `npm run build`, or edit `lib/api.ts`.
- To add another admin user, run in hPanel's phpMyAdmin-style tool isn't needed;
  add via SQLite, or ask to build a "Users" screen.
