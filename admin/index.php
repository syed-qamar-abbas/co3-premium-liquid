<?php
$PAGE='dashboard'; $TITLE='Dashboard';
require __DIR__ . '/partials/head.php';

$q = fn($sql) => db()->query($sql)->fetchColumn();
$products   = (int)$q('SELECT COUNT(*) FROM products WHERE is_active=1');
$ordersAll  = (int)$q('SELECT COUNT(*) FROM orders');
$ordersToday= (int)$q("SELECT COUNT(*) FROM orders WHERE date(created_at)=date('now')");
$ordersWeek = (int)$q("SELECT COUNT(*) FROM orders WHERE created_at >= datetime('now','-7 days')");
$revenue    = (int)$q('SELECT COALESCE(SUM(total),0) FROM orders');
$newOrders  = (int)$q("SELECT COUNT(*) FROM orders WHERE status='new'");

$top = db()->query("SELECT product_name, COUNT(*) c, COALESCE(SUM(total),0) rev
  FROM orders GROUP BY product_name ORDER BY c DESC LIMIT 6")->fetchAll();
$recent = db()->query("SELECT * FROM orders ORDER BY id DESC LIMIT 8")->fetchAll();
$mustChange = (int)$USER['must_change'] === 1;
?>
<?php if ($mustChange): ?>
  <div class="flash" style="background:#fff6e6;border-color:var(--gold);color:#8a6a1e">
    🔐 You’re using the default password. <a href="settings.php#password"><b>Change it now →</b></a>
  </div>
<?php endif; ?>

<div class="grid stats" style="margin-bottom:22px">
  <div class="card stat"><div class="lbl">Active Products</div><div class="num"><?= $products ?></div><div class="sub">on the live menu</div></div>
  <div class="card stat"><div class="lbl">Orders · Today</div><div class="num"><?= $ordersToday ?></div><div class="sub"><?= $ordersWeek ?> this week</div></div>
  <div class="card stat"><div class="lbl">Total Orders</div><div class="num"><?= $ordersAll ?></div><div class="sub"><?= $newOrders ?> new / unhandled</div></div>
  <div class="card stat"><div class="lbl">Est. Revenue</div><div class="num">Rs <?= number_format($revenue) ?></div><div class="sub">from tracked orders</div></div>
</div>

<div class="grid" style="grid-template-columns:1.4fr 1fr;align-items:start">
  <div class="card">
    <div class="card-h"><h2>Recent Orders</h2><a href="orders.php" class="btn btn-ghost btn-sm">View all</a></div>
    <?php if (!$recent): ?>
      <div class="empty">No orders yet. When customers tap “Order on WhatsApp”, they’ll appear here.</div>
    <?php else: ?>
      <div class="table-wrap"><table>
        <thead><tr><th>Item</th><th>Size</th><th>Qty</th><th>Total</th><th>When</th></tr></thead>
        <tbody>
        <?php foreach ($recent as $o): ?>
          <tr>
            <td><b><?= e($o['product_name']) ?></b><?= $o['flavor'] ? '<br><span class="tiny muted">'.e($o['flavor']).'</span>' : '' ?></td>
            <td><?= e($o['size']) ?></td><td><?= (int)$o['qty'] ?></td>
            <td>Rs <?= number_format((int)$o['total']) ?></td>
            <td class="tiny muted"><?= e(date('d M, H:i', strtotime($o['created_at']))) ?></td>
          </tr>
        <?php endforeach; ?>
        </tbody></table></div>
    <?php endif; ?>
  </div>

  <div class="card">
    <div class="card-h"><h2>Top Sellers</h2></div>
    <?php if (!$top): ?><div class="empty">No data yet.</div><?php else: ?>
      <?php foreach ($top as $t): $max=max(array_map(fn($x)=>$x['c'],$top)); $pct=$max?round($t['c']/$max*100):0; ?>
        <div style="margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:5px">
            <b><?= e($t['product_name']) ?></b><span class="muted"><?= (int)$t['c'] ?> orders</span></div>
          <div style="height:8px;background:rgba(1,72,81,.08);border-radius:99px;overflow:hidden">
            <div style="height:100%;width:<?= $pct ?>%;background:linear-gradient(90deg,var(--gold),var(--teal))"></div>
          </div>
        </div>
      <?php endforeach; ?>
    <?php endif; ?>
  </div>
</div>

<?php require __DIR__ . '/partials/foot.php';
