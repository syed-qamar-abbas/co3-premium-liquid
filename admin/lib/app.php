<?php
// CO3 Admin — bootstrap: session, SQLite connection, migrations, helpers, auth.
// Works on any Hostinger plan (PHP + SQLite, no MySQL server required).
declare(strict_types=1);

error_reporting(E_ALL & ~E_DEPRECATED & ~E_NOTICE);
date_default_timezone_set('Asia/Karachi');

if (session_status() === PHP_SESSION_NONE) {
    session_name('co3admin');
    session_start();
}

const CO3_DB   = __DIR__ . '/../data/co3.sqlite';
const CO3_UP   = __DIR__ . '/../uploads';
const CO3_UP_WEB = 'uploads';               // relative to /admin
const CO3_PUBLIC_UP_WEB = 'admin/uploads';  // relative to site root (used by the site)

function db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        if (!is_dir(dirname(CO3_DB))) @mkdir(dirname(CO3_DB), 0775, true);
        $pdo = new PDO('sqlite:' . CO3_DB);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $pdo->exec('PRAGMA journal_mode = WAL;');
        $pdo->exec('PRAGMA foreign_keys = ON;');
    }
    return $pdo;
}

function migrate(): void {
    db()->exec("CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT,
        must_change INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now'))
    )");
    db()->exec("CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
    )");
    db()->exec("CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        slug TEXT,
        category TEXT,
        tagline TEXT,
        description TEXT,
        ingredients TEXT,   -- json array
        flavors TEXT,       -- json array
        sizes TEXT,         -- json array of {label,price}
        toppings TEXT,      -- json array
        badges TEXT,        -- json array
        accent TEXT DEFAULT '#005F68',
        emoji TEXT DEFAULT '🥤',
        image TEXT,
        is_active INTEGER DEFAULT 1,
        sort INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
    )");
    db()->exec("CREATE TABLE IF NOT EXISTS offers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        badge TEXT, title TEXT, subtitle TEXT, body TEXT, terms TEXT,
        accent TEXT DEFAULT '#005F68', emoji TEXT DEFAULT '🎁',
        is_active INTEGER DEFAULT 1, sort INTEGER DEFAULT 0
    )");
    db()->exec("CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_name TEXT, flavor TEXT, size TEXT, qty INTEGER DEFAULT 1,
        price_each INTEGER DEFAULT 0, total INTEGER DEFAULT 0,
        fulfilment TEXT, source TEXT DEFAULT 'whatsapp',
        status TEXT DEFAULT 'new',
        customer_name TEXT, phone TEXT, note TEXT,
        created_at TEXT DEFAULT (datetime('now'))
    )");

    // ── incremental columns (safe to run repeatedly) ──
    $addcol = function (string $table, string $col, string $type): void {
        foreach (db()->query("PRAGMA table_info($table)") as $c) {
            if ($c['name'] === $col) return;
        }
        db()->exec("ALTER TABLE $table ADD COLUMN $col $type");
    };
    $addcol('offers', 'image', 'TEXT');
    $addcol('offers', 'price_before', 'TEXT');
    $addcol('offers', 'price_after', 'TEXT');
    $addcol('orders', 'address', 'TEXT');
}

// ── Settings KV ─────────────────────────────────────────────
function setting(string $key, string $default = ''): string {
    $s = db()->prepare('SELECT value FROM settings WHERE key = ?');
    $s->execute([$key]);
    $v = $s->fetchColumn();
    return $v === false ? $default : (string)$v;
}
function set_setting(string $key, string $value): void {
    db()->prepare('INSERT INTO settings(key,value) VALUES(?,?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value')->execute([$key, $value]);
}
function all_settings(): array {
    $out = [];
    foreach (db()->query('SELECT key,value FROM settings') as $r) $out[$r['key']] = $r['value'];
    return $out;
}

// ── Helpers ─────────────────────────────────────────────────
function e($s): string { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
function jarr(?string $json): array { $a = json_decode((string)$json, true); return is_array($a) ? $a : []; }
function redirect(string $to): never { header('Location: ' . $to); exit; }

function csrf_token(): string {
    if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(16));
    return $_SESSION['csrf'];
}
function csrf_field(): string { return '<input type="hidden" name="csrf" value="' . csrf_token() . '">'; }
function csrf_check(): void {
    if (($_POST['csrf'] ?? '') !== ($_SESSION['csrf'] ?? '__')) { http_response_code(400); exit('Bad CSRF token'); }
}

function flash(?string $msg = null): ?string {
    if ($msg !== null) { $_SESSION['flash'] = $msg; return null; }
    $m = $_SESSION['flash'] ?? null; unset($_SESSION['flash']); return $m;
}

// ── Auth ────────────────────────────────────────────────────
function current_user(): ?array {
    if (empty($_SESSION['uid'])) return null;
    $s = db()->prepare('SELECT * FROM users WHERE id = ?');
    $s->execute([$_SESSION['uid']]);
    return $s->fetch() ?: null;
}
function require_login(): array {
    $u = current_user();
    if (!$u) redirect('login.php');
    return $u;
}
function attempt_login(string $username, string $password): bool {
    $s = db()->prepare('SELECT * FROM users WHERE username = ?');
    $s->execute([$username]);
    $u = $s->fetch();
    if ($u && password_verify($password, $u['password_hash'])) {
        $_SESSION['uid'] = $u['id'];
        session_regenerate_id(true);
        return true;
    }
    return false;
}
function logout(): void { $_SESSION = []; session_destroy(); }

// ── Image upload (validated + downscaled with GD) ───────────
function upload_image(string $field, ?string $existing = null): ?string {
    if (empty($_FILES[$field]) || ($_FILES[$field]['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return $existing; // keep existing on no upload
    }
    if (!extension_loaded('gd')) { flash('Image tools are not enabled on this server.'); return $existing; }
    $f = $_FILES[$field];
    if ($f['error'] !== UPLOAD_ERR_OK) return $existing;
    if ($f['size'] > 6 * 1024 * 1024) { flash('Image too large (max 6 MB).'); return $existing; }

    $info = @getimagesize($f['tmp_name']);
    if (!$info) { flash('Invalid image file.'); return $existing; }
    [$w, $h] = $info;
    $mime = $info['mime'];

    $src = match ($mime) {
        'image/jpeg' => function_exists('imagecreatefromjpeg') ? @imagecreatefromjpeg($f['tmp_name']) : null,
        'image/png'  => function_exists('imagecreatefrompng') ? @imagecreatefrompng($f['tmp_name']) : null,
        'image/webp' => function_exists('imagecreatefromwebp') ? @imagecreatefromwebp($f['tmp_name']) : null,
        'image/gif'  => function_exists('imagecreatefromgif') ? @imagecreatefromgif($f['tmp_name']) : null,
        default      => null,
    };
    if (!$src || !function_exists('imagewebp')) { flash('Unsupported image type.'); return $existing; }

    // downscale to max 1200px on the long edge
    $max = 1200; $scale = min(1, $max / max($w, $h));
    $nw = (int)round($w * $scale); $nh = (int)round($h * $scale);
    $dst = imagecreatetruecolor($nw, $nh);
    imagealphablending($dst, false); imagesavealpha($dst, true);
    imagecopyresampled($dst, $src, 0, 0, 0, 0, $nw, $nh, $w, $h);

    if (!is_dir(CO3_UP)) @mkdir(CO3_UP, 0775, true);
    $name = 'img_' . date('Ymd_His') . '_' . bin2hex(random_bytes(3)) . '.webp';
    $path = CO3_UP . '/' . $name;
    imagewebp($dst, $path, 82);
    imagedestroy($src); imagedestroy($dst);

    return CO3_PUBLIC_UP_WEB . '/' . $name; // stored as site-root-relative path
}

// Boot
migrate();
