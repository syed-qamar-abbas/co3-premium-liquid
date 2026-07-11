<?php
require_once __DIR__ . '/lib/app.php'; require_login();

$CATS = [
  'boba'=>'Boba Milk Tea','matcha'=>'Matcha','iced-coffee'=>'Iced Coffee','hot-coffee'=>'Hot Coffee',
  'ice-cream'=>'Ice Cream','boba-ice-cream'=>'Boba Ice Cream Cup','shakes'=>'Shakes & Frappé',
  'bubble-soda'=>'Bubble Soda','soda'=>'Soda & Slush','mocktails'=>'Mocktails','quetta-tea'=>'Quetta Tea',
  'iced-tea'=>'Iced Tea','smoothies'=>'Smoothies & Lassi',
];
$BADGES = ['bestseller','signature','new','seasonal'];

$id = (int)($_GET['id'] ?? 0);
$p = null;
if ($id) { $st = db()->prepare('SELECT * FROM products WHERE id=?'); $st->execute([$id]); $p = $st->fetch(); if(!$p) redirect('products.php'); }

function slugify($s){ $s=strtolower(trim($s)); $s=preg_replace('/[^a-z0-9]+/','-',$s); return trim($s,'-'); }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $name = trim($_POST['name'] ?? '');
    // sizes: "Label|Price" per line
    $sizes = [];
    foreach (preg_split('/\r?\n/', trim($_POST['sizes'] ?? '')) as $line) {
        if (!trim($line)) continue;
        [$lbl,$pr] = array_pad(explode('|', $line, 2), 2, '0');
        $sizes[] = ['label'=>trim($lbl), 'price'=>(int)preg_replace('/[^0-9]/','',$pr)];
    }
    $listify = fn($k) => array_values(array_filter(array_map('trim', explode(',', $_POST[$k] ?? ''))));
    $badges = array_values(array_intersect($BADGES, $_POST['badges'] ?? []));
    $slug = trim($_POST['slug'] ?? '') ?: slugify($name);
    $image = upload_image('image', $p['image'] ?? '');
    if (($_POST['clear_image'] ?? '') === '1') $image = '';

    $data = [$name, $slug, $_POST['category'] ?? '', trim($_POST['tagline'] ?? ''), trim($_POST['description'] ?? ''),
        json_encode($listify('ingredients')), json_encode($listify('flavors')), json_encode($sizes),
        json_encode($listify('toppings')), json_encode($badges), $_POST['accent'] ?? '#005F68',
        trim($_POST['emoji'] ?? '🥤'), $image, (int)($_POST['is_active'] ?? 1), (int)($_POST['sort'] ?? 0)];

    if ($id) {
        $data[] = $id;
        db()->prepare('UPDATE products SET name=?,slug=?,category=?,tagline=?,description=?,ingredients=?,flavors=?,sizes=?,toppings=?,badges=?,accent=?,emoji=?,image=?,is_active=?,sort=?,updated_at=datetime(\'now\') WHERE id=?')->execute($data);
        flash('“'.$name.'” updated.');
    } else {
        db()->prepare('INSERT INTO products(name,slug,category,tagline,description,ingredients,flavors,sizes,toppings,badges,accent,emoji,image,is_active,sort) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)')->execute($data);
        flash('“'.$name.'” added to the menu.');
    }
    redirect('products.php');
}

// defaults / values
$v = fn($k,$d='') => e($p[$k] ?? $d);
$sizesText = '';
foreach (jarr($p['sizes'] ?? '') as $s) $sizesText .= ($s['label']??'').'|'.($s['price']??'')."\n";
$cur = fn($k) => implode(', ', jarr($p[$k] ?? ''));
$curBadges = jarr($p['badges'] ?? '');

$PAGE='products'; $TITLE = $id ? 'Edit Product' : 'Add Product';
require __DIR__ . '/partials/head.php';
?>
<form method="post" enctype="multipart/form-data" class="card">
  <?= csrf_field() ?>
  <div class="form-grid">
    <div class="field"><label>Name *</label><input type="text" name="name" value="<?= $v('name') ?>" required></div>
    <div class="field"><label>Category</label>
      <select name="category"><?php foreach ($CATS as $k=>$lbl): ?>
        <option value="<?= $k ?>" <?= ($p['category']??'')===$k?'selected':'' ?>><?= e($lbl) ?></option>
      <?php endforeach; ?></select></div>

    <div class="field full"><label>Tagline (one line)</label><input type="text" name="tagline" value="<?= $v('tagline') ?>" placeholder="The one everyone comes back for."></div>
    <div class="field full"><label>Description</label><textarea name="description"><?= $v('description') ?></textarea></div>

    <div class="field"><label>Sizes — one per line as <code>Label|Price</code></label>
      <textarea name="sizes" placeholder="Small|550&#10;Large|650"><?= e(trim($sizesText)) ?></textarea></div>
    <div class="field"><label>Flavours (comma separated)</label>
      <textarea name="flavors" placeholder="Coffee, Vanilla, Caramel"><?= e($cur('flavors')) ?></textarea></div>

    <div class="field"><label>Ingredients (comma separated)</label><input type="text" name="ingredients" value="<?= e($cur('ingredients')) ?>"></div>
    <div class="field"><label>Toppings / add-ons (comma separated)</label><input type="text" name="toppings" value="<?= e($cur('toppings')) ?>"></div>

    <div class="field"><label>Badges</label>
      <div style="display:flex;gap:14px;flex-wrap:wrap;padding-top:4px">
        <?php foreach ($BADGES as $b): ?>
          <label style="text-transform:none;font-weight:500;display:flex;gap:6px;align-items:center">
            <input type="checkbox" name="badges[]" value="<?= $b ?>" style="width:auto" <?= in_array($b,$curBadges)?'checked':'' ?>> <?= ucfirst($b) ?></label>
        <?php endforeach; ?>
      </div></div>
    <div class="field"><label>Sort order</label><input type="number" name="sort" value="<?= (int)($p['sort']??0) ?>"></div>

    <div class="field"><label>Fallback emoji</label><input type="text" name="emoji" value="<?= $v('emoji','🥤') ?>" maxlength="4"></div>
    <div class="field"><label>Accent colour</label><input type="text" name="accent" value="<?= $v('accent','#005F68') ?>"></div>

    <div class="field full"><label>Product image (optional — replaces the gradient tile)</label>
      <div class="img-pick">
        <?php $img=$p['image']??''; ?>
        <span class="prev" style="background:linear-gradient(135deg,<?= $v('accent','#005F68') ?>,#013A41)">
          <?php if ($img): ?><img src="../<?= e(ltrim($img, '/')) ?>" style="width:100%;height:100%;object-fit:cover;border-radius:14px"><?php else: ?><?= $v('emoji','🥤') ?><?php endif; ?>
        </span>
        <div style="flex:1">
          <input type="file" name="image" accept="image/*">
          <?php if($img): ?><label style="text-transform:none;font-weight:500;display:flex;gap:6px;align-items:center;margin-top:8px">
            <input type="checkbox" name="clear_image" value="1" style="width:auto"> Remove image</label><?php endif; ?>
          <p class="hint">JPG / PNG / WebP up to 6 MB. Auto-optimised to WebP.</p>
        </div>
      </div></div>

    <div class="field"><label>Visible on site</label>
      <select name="is_active"><option value="1" <?= ($p['is_active']??1)?'selected':'' ?>>Live</option>
        <option value="0" <?= isset($p['is_active'])&&!$p['is_active']?'selected':'' ?>>Hidden</option></select></div>
  </div>

  <div class="actions-bar">
    <a href="products.php" class="btn btn-ghost">Cancel</a>
    <button class="btn btn-gold"><?= $id ? 'Save changes' : 'Add product' ?></button>
  </div>
</form>
<?php require __DIR__ . '/partials/foot.php';
