<?php
require_once __DIR__ . '/lib/app.php'; require_login();

// actions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $id = (int)($_POST['id'] ?? 0);
    if (($_POST['act'] ?? '') === 'delete' && $id) {
        db()->prepare('DELETE FROM products WHERE id=?')->execute([$id]);
        flash('Product deleted.');
    } elseif (($_POST['act'] ?? '') === 'toggle' && $id) {
        db()->prepare('UPDATE products SET is_active = 1 - is_active WHERE id=?')->execute([$id]);
        flash('Product visibility updated.');
    }
    redirect('products.php');
}

$search = trim($_GET['q'] ?? '');
if ($search !== '') {
    $st = db()->prepare("SELECT * FROM products WHERE name LIKE ? OR category LIKE ? ORDER BY sort, id");
    $st->execute(["%$search%", "%$search%"]); $rows = $st->fetchAll();
} else {
    $rows = db()->query('SELECT * FROM products ORDER BY sort, id')->fetchAll();
}

$PAGE='products'; $TITLE='Products';
$HEADER_CTA = '<a href="product-edit.php" class="btn btn-gold btn-sm">+ Add Product</a>';
require __DIR__ . '/partials/head.php';
?>
<form class="toolbar" method="get">
  <input class="search" type="text" name="q" value="<?= e($search) ?>" placeholder="Search products or category…">
  <button class="btn btn-teal btn-sm">Search</button>
  <?php if ($search): ?><a class="btn btn-ghost btn-sm" href="products.php">Clear</a><?php endif; ?>
  <span class="muted tiny" style="margin-left:auto"><?= count($rows) ?> item(s)</span>
</form>

<?php if (!$rows): ?>
  <div class="card empty">No products found. <a href="product-edit.php"><b>Add your first →</b></a></div>
<?php else: ?>
<div class="table-wrap"><table>
  <thead><tr><th>Item</th><th>Category</th><th>Price</th><th>Badges</th><th>Live</th><th></th></tr></thead>
  <tbody>
  <?php foreach ($rows as $p):
    $sizes = jarr($p['sizes']); $prices = array_map(fn($s)=>(int)($s['price']??0), $sizes);
    $from = $prices ? min($prices) : 0; $to = $prices ? max($prices) : 0;
    $badges = jarr($p['badges']);
  ?>
    <tr>
      <td style="display:flex;align-items:center;gap:12px">
        <?php if (!empty($p['image'])): ?>
          <img class="thumb" src="../<?= e(ltrim($p['image'], '/')) ?>" alt="">
        <?php else: ?>
          <span class="thumb emoji" style="background:linear-gradient(135deg,<?= e($p['accent']) ?>,#013A41)"><?= e($p['emoji']) ?></span>
        <?php endif; ?>
        <div><b><?= e($p['name']) ?></b><br><span class="tiny muted"><?= e($p['tagline']) ?></span></div>
      </td>
      <td><span class="tiny muted"><?= e($p['category']) ?></span></td>
      <td>Rs <?= $from ?><?= $to>$from ? '–'.$to : '' ?></td>
      <td><?php foreach ($badges as $b): ?><span class="pill <?= e($b) ?>" style="margin:1px"><?= e($b) ?></span> <?php endforeach; ?></td>
      <td>
        <form method="post" style="display:inline"><?= csrf_field() ?>
          <input type="hidden" name="act" value="toggle"><input type="hidden" name="id" value="<?= (int)$p['id'] ?>">
          <button class="pill <?= $p['is_active']?'teal':'off' ?>" title="Toggle visibility"><?= $p['is_active']?'Live':'Hidden' ?></button>
        </form>
      </td>
      <td><div class="row-actions">
        <a class="btn btn-ghost btn-sm" href="product-edit.php?id=<?= (int)$p['id'] ?>">Edit</a>
        <form method="post" onsubmit="return confirm('Delete <?= e(addslashes($p['name'])) ?>?')" style="display:inline">
          <?= csrf_field() ?><input type="hidden" name="act" value="delete"><input type="hidden" name="id" value="<?= (int)$p['id'] ?>">
          <button class="btn btn-danger btn-sm">Delete</button>
        </form>
      </div></td>
    </tr>
  <?php endforeach; ?>
  </tbody></table></div>
<?php endif; ?>
<?php require __DIR__ . '/partials/foot.php';
