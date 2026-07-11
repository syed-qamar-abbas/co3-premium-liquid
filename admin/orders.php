<?php
require_once __DIR__ . '/lib/app.php'; require_login();
$STATUSES = ['new','preparing','done','cancelled'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check(); $id=(int)($_POST['id']??0); $act=$_POST['act']??'';
    if ($act==='status' && $id && in_array($_POST['status']??'',$STATUSES,true)) {
        db()->prepare('UPDATE orders SET status=? WHERE id=?')->execute([$_POST['status'],$id]); flash('Order updated.');
    } elseif ($act==='delete' && $id) { db()->prepare('DELETE FROM orders WHERE id=?')->execute([$id]); flash('Order removed.'); }
    redirect('orders.php'.(!empty($_POST['f'])?'?f='.urlencode($_POST['f']):''));
}

$f = $_GET['f'] ?? '';
if ($f && in_array($f,$STATUSES,true)) { $st=db()->prepare('SELECT * FROM orders WHERE status=? ORDER BY id DESC'); $st->execute([$f]); $rows=$st->fetchAll(); }
else { $rows = db()->query('SELECT * FROM orders ORDER BY id DESC')->fetchAll(); }

$PAGE='orders'; $TITLE='Orders';
require __DIR__ . '/partials/head.php';
?>
<div class="toolbar">
  <a class="btn <?= $f===''?'btn-teal':'btn-ghost' ?> btn-sm" href="orders.php">All</a>
  <?php foreach ($STATUSES as $s): ?>
    <a class="btn <?= $f===$s?'btn-teal':'btn-ghost' ?> btn-sm" href="orders.php?f=<?= $s ?>"><?= ucfirst($s) ?></a>
  <?php endforeach; ?>
  <span class="muted tiny" style="margin-left:auto"><?= count($rows) ?> order(s)</span>
</div>

<?php if (!$rows): ?>
  <div class="card empty">No orders here yet. Orders are logged automatically when a customer taps
    “Order on WhatsApp” on the website.</div>
<?php else: ?>
<div class="table-wrap"><table>
  <thead><tr><th>#</th><th>Item</th><th>Size</th><th>Qty</th><th>Total</th><th>Type</th><th>When</th><th>Status</th><th></th></tr></thead>
  <tbody>
  <?php foreach ($rows as $o): ?>
    <tr>
      <td class="muted tiny">#<?= (int)$o['id'] ?></td>
      <td><b><?= e($o['product_name']) ?></b>
        <?= $o['flavor']?'<br><span class="tiny muted">'.e($o['flavor']).'</span>':'' ?>
        <?= !empty($o['customer_name'])?'<br><span class="tiny" style="color:var(--teal)">👤 '.e($o['customer_name']).'</span>':'' ?>
        <?= !empty($o['address'])?'<br><span class="tiny muted">📍 '.e($o['address']).'</span>':'' ?>
      </td>
      <td><?= e($o['size']) ?></td><td><?= (int)$o['qty'] ?></td>
      <td>Rs <?= number_format((int)$o['total']) ?></td>
      <td class="tiny"><?= e($o['fulfilment']?:'—') ?></td>
      <td class="tiny muted"><?= e(date('d M, H:i', strtotime($o['created_at']))) ?></td>
      <td>
        <form method="post" style="display:inline"><?= csrf_field() ?>
          <input type="hidden" name="act" value="status"><input type="hidden" name="id" value="<?= (int)$o['id'] ?>"><input type="hidden" name="f" value="<?= e($f) ?>">
          <select name="status" onchange="this.form.submit()" style="padding:6px 10px;font-size:12px">
            <?php foreach ($STATUSES as $s): ?><option value="<?= $s ?>" <?= $o['status']===$s?'selected':'' ?>><?= ucfirst($s) ?></option><?php endforeach; ?>
          </select>
        </form>
      </td>
      <td><form method="post" onsubmit="return confirm('Delete order #<?= (int)$o['id'] ?>?')" style="display:inline">
        <?= csrf_field() ?><input type="hidden" name="act" value="delete"><input type="hidden" name="id" value="<?= (int)$o['id'] ?>"><input type="hidden" name="f" value="<?= e($f) ?>">
        <button class="btn btn-danger btn-sm">✕</button></form></td>
    </tr>
  <?php endforeach; ?>
  </tbody></table></div>
<?php endif; ?>
<?php require __DIR__ . '/partials/foot.php';
