<?php
// Shared admin chrome. Usage: $PAGE='products'; $TITLE='Products'; require partials/head.php;
require_once __DIR__ . '/../lib/app.php';
$USER = require_login();
$PAGE = $PAGE ?? '';
$TITLE = $TITLE ?? 'Dashboard';
$NAV = [
  ['index.php',    'dashboard', '📊', 'Dashboard'],
  ['products.php', 'products',  '🥤', 'Products'],
  ['orders.php',   'orders',    '🧾', 'Orders'],
  ['offers.php',   'offers',    '🎁', 'Offers'],
  ['settings.php', 'settings',  '⚙️', 'Settings'],
];
$f = flash();
?><!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title><?= e($TITLE) ?> · CO3 Admin</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/admin.css"></head>
<body>
<div class="scrim" onclick="document.body.classList.remove('nav-open')"></div>
<div class="layout">
  <aside class="sidebar">
    <div class="sb-brand">
      <span class="m">C₃</span>
      <span><b>CO₃ Admin</b><small>Premium Liquid Shop</small></span>
    </div>
    <nav class="nav">
      <?php foreach ($NAV as [$href,$key,$ic,$label]): ?>
        <a href="<?= $href ?>" class="<?= $PAGE===$key?'active':'' ?>"><span class="ic"><?= $ic ?></span><?= $label ?></a>
      <?php endforeach; ?>
    </nav>
    <div class="sb-foot">
      <p style="color:rgba(244,240,230,.6);margin-bottom:8px">Signed in as <b style="color:var(--cream-w)"><?= e($USER['username']) ?></b></p>
      <a href="../index.html" target="_blank">↗ View website</a> &nbsp;·&nbsp; <a href="logout.php">Log out</a>
    </div>
  </aside>
  <div class="main">
    <div class="topbar">
      <button class="burger" onclick="document.body.classList.toggle('nav-open')">☰</button>
      <h1><?= e($TITLE) ?></h1>
      <?php if (($HEADER_CTA ?? '') !== ''): ?><?= $HEADER_CTA ?><?php endif; ?>
    </div>
    <div class="content">
      <?php if ($f): ?><div class="flash">✓ <?= e($f) ?></div><?php endif; ?>
