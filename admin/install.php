<?php
// CO3 Admin — one-time installer. Seeds the admin login + imports current menu.
// Safe to run more than once; it won't duplicate. Delete after first run (optional).
require __DIR__ . '/lib/app.php';

$DEFAULT_USER = 'admin';
$DEFAULT_PASS = 'CO3-admin-2026';   // ← change this on first login (Settings → Password)

$already = (int) db()->query('SELECT COUNT(*) FROM users')->fetchColumn();

$did = [];
if (!$already) {
    db()->prepare('INSERT INTO users(username,password_hash,name,must_change) VALUES(?,?,?,1)')
        ->execute([$DEFAULT_USER, password_hash($DEFAULT_PASS, PASSWORD_DEFAULT), 'CO3 Admin']);
    $did[] = 'Created admin user.';
}

$haveProducts = (int) db()->query('SELECT COUNT(*) FROM products')->fetchColumn();
if (!$haveProducts && is_file(__DIR__ . '/seed/seed.json')) {
    $seed = json_decode(file_get_contents(__DIR__ . '/seed/seed.json'), true);
    $pi = db()->prepare('INSERT INTO products
        (name,slug,category,tagline,description,ingredients,flavors,sizes,toppings,badges,accent,emoji,image,is_active,sort)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,1,?)');
    $i = 0;
    foreach ($seed['products'] ?? [] as $p) {
        $pi->execute([
            $p['name'] ?? '', $p['slug'] ?? '', $p['category'] ?? '', $p['tagline'] ?? '',
            $p['description'] ?? '', json_encode($p['ingredients'] ?? []), json_encode($p['flavors'] ?? []),
            json_encode($p['sizes'] ?? []), json_encode($p['toppings'] ?? []), json_encode($p['badges'] ?? []),
            $p['accent'] ?? '#005F68', $p['emoji'] ?? '🥤', $p['image'] ?? '', $i++,
        ]);
    }
    $oi = db()->prepare('INSERT INTO offers(badge,title,subtitle,body,terms,accent,emoji,image,price_before,price_after,is_active,sort) VALUES (?,?,?,?,?,?,?,?,?,?,1,?)');
    $j = 0;
    foreach ($seed['offers'] ?? [] as $o) {
        $oi->execute([$o['badge'] ?? '', $o['title'] ?? '', $o['subtitle'] ?? '', $o['body'] ?? '',
            $o['terms'] ?? '', $o['accent'] ?? '#005F68', $o['emoji'] ?? '🎁',
            $o['image'] ?? '', $o['price_before'] ?? '', $o['price_after'] ?? '', $j++]);
    }
    foreach ($seed['settings'] ?? [] as $k => $v) set_setting((string)$k, (string)$v);
    $did[] = 'Imported ' . $i . ' products, ' . $j . ' offers and brand settings.';
}
?><!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>CO3 Admin — Install</title><link rel="stylesheet" href="assets/admin.css"></head>
<body class="auth-bg">
<div class="auth-card">
  <div class="brand-mark">C₃</div>
  <h1 class="auth-title">CO₃ Admin Setup</h1>
  <?php if ($already && $haveProducts): ?>
    <p class="muted">Already installed. You can log in.</p>
  <?php else: ?>
    <ul class="install-log"><?php foreach ($did as $d) echo '<li>✓ ' . e($d) . '</li>'; ?></ul>
    <?php if (!$already): ?>
    <div class="cred-box">
      <p class="muted" style="margin-bottom:8px">Your login (change it after first sign-in):</p>
      <div class="cred-row"><span>Username</span><b><?= e($DEFAULT_USER) ?></b></div>
      <div class="cred-row"><span>Password</span><b><?= e($DEFAULT_PASS) ?></b></div>
    </div>
    <?php endif; ?>
  <?php endif; ?>
  <a href="login.php" class="btn btn-gold btn-block">Go to Login →</a>
  <p class="muted tiny" style="margin-top:14px">For security, delete <code>install.php</code> after setup.</p>
</div>
</body></html>
