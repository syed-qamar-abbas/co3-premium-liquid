<?php
require __DIR__ . '/lib/app.php';
if (current_user()) redirect('index.php');
$err = null;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    if (attempt_login(trim($_POST['username'] ?? ''), $_POST['password'] ?? '')) redirect('index.php');
    $err = 'Incorrect username or password.';
}
$installed = (int) db()->query('SELECT COUNT(*) FROM users')->fetchColumn();
?><!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>CO3 Admin — Login</title><link rel="stylesheet" href="assets/admin.css"></head>
<body class="auth-bg">
<form class="auth-card" method="post" autocomplete="off">
  <div class="brand-mark">C₃</div>
  <h1 class="auth-title">CO₃ Admin</h1>
  <p class="muted tiny" style="margin-bottom:18px">Premium Liquid Shop · Control Panel</p>
  <?php if ($err): ?><div class="flash" style="background:#fbeaec;border-color:var(--bad);color:#a23">⚠ <?= e($err) ?></div><?php endif; ?>
  <?php if (!$installed): ?>
    <div class="flash">First time here? <a href="install.php"><b>Run setup →</b></a></div>
  <?php endif; ?>
  <?= csrf_field() ?>
  <div class="field" style="text-align:left"><label>Username</label>
    <input type="text" name="username" required autofocus></div>
  <div class="field" style="text-align:left"><label>Password</label>
    <input type="password" name="password" required></div>
  <button class="btn btn-gold btn-block">Sign in</button>
</form>
</body></html>
