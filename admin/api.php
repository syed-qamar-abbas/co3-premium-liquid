<?php
// CO3 public API — read menu/settings/offers as JSON, and log orders.
// Same-origin in production (site + /admin on one Hostinger domain). CORS open
// for GET so the static frontend can fetch during development too.
require __DIR__ . '/lib/app.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Cache-Control: public, max-age=30');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

$r = $_GET['r'] ?? 'products';

// normalise a stored image path to a site-root absolute URL
function img_url(?string $p): string {
    $p = trim((string)$p);
    if ($p === '') return '';
    if (str_starts_with($p, 'http') || str_starts_with($p, '/')) return $p;
    return '/' . ltrim($p, '/');
}

function out($data): never { echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); exit; }

if ($r === 'products') {
    $rows = db()->query('SELECT * FROM products WHERE is_active=1 ORDER BY sort, id')->fetchAll();
    $items = array_map(function ($p) {
        return [
            'id' => 'db-' . $p['id'],
            'name' => $p['name'], 'slug' => $p['slug'], 'category' => $p['category'],
            'tagline' => $p['tagline'], 'description' => $p['description'],
            'ingredients' => jarr($p['ingredients']), 'flavors' => jarr($p['flavors']),
            'sizes' => jarr($p['sizes']), 'toppings' => jarr($p['toppings']), 'badges' => jarr($p['badges']),
            'accent' => $p['accent'] ?: '#005F68', 'emoji' => $p['emoji'] ?: '🥤',
            'image' => img_url($p['image']),
        ];
    }, $rows);
    out(['products' => $items, 'updated' => date('c')]);
}

if ($r === 'settings') {
    $S = all_settings();
    foreach (['logo_nav','logo_footer'] as $k) if (!empty($S[$k])) $S[$k] = img_url($S[$k]);
    out(['settings' => $S]);
}

if ($r === 'offers') {
    $rows = db()->query('SELECT * FROM offers WHERE is_active=1 ORDER BY sort, id')->fetchAll();
    $rows = array_map(function ($o) {
        $o['image'] = img_url($o['image'] ?? '');
        return $o;
    }, $rows);
    out(['offers' => $rows]);
}

if ($r === 'track' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    $b = json_decode($raw, true) ?: $_POST;
    $qty = max(1, (int)($b['qty'] ?? 1));
    $price = (int)preg_replace('/[^0-9]/', '', (string)($b['price'] ?? 0));
    db()->prepare('INSERT INTO orders(product_name,flavor,size,qty,price_each,total,fulfilment,source,status,customer_name,phone,address)
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?)')->execute([
        substr(trim((string)($b['product'] ?? 'Unknown')), 0, 120),
        substr(trim((string)($b['flavor'] ?? '')), 0, 80),
        substr(trim((string)($b['size'] ?? '')), 0, 40),
        $qty, $price, $price * $qty,
        substr(trim((string)($b['fulfilment'] ?? '')), 0, 20),
        'whatsapp', 'new',
        substr(trim((string)($b['name'] ?? '')), 0, 80),
        substr(trim((string)($b['phone'] ?? '')), 0, 30),
        substr(trim((string)($b['address'] ?? '')), 0, 200),
    ]);
    out(['ok' => true]);
}

http_response_code(400);
out(['error' => 'Unknown request']);
