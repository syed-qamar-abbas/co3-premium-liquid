<?php
require_once __DIR__ . '/lib/app.php'; require_login();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check(); $act=$_POST['act']??''; $id=(int)($_POST['id']??0);
    if ($act==='delete' && $id) { db()->prepare('DELETE FROM offers WHERE id=?')->execute([$id]); flash('Offer deleted.'); }
    elseif ($act==='toggle' && $id) { db()->prepare('UPDATE offers SET is_active=1-is_active WHERE id=?')->execute([$id]); flash('Offer updated.'); }
    elseif ($act==='save') {
        $existing = null;
        if ($id) { $st=db()->prepare('SELECT image FROM offers WHERE id=?'); $st->execute([$id]); $existing=$st->fetchColumn() ?: null; }
        $image = upload_image('image', $existing);
        if (($_POST['clear_image'] ?? '') === '1') $image = '';
        $d=[trim($_POST['badge']??''),trim($_POST['title']??''),trim($_POST['subtitle']??''),trim($_POST['body']??''),
            trim($_POST['terms']??''),$_POST['accent']?:'#005F68',trim($_POST['emoji']??'🎁'),(int)($_POST['sort']??0),
            trim($_POST['price_before']??''),trim($_POST['price_after']??''),$image];
        if ($id){ $d[]=$id; db()->prepare('UPDATE offers SET badge=?,title=?,subtitle=?,body=?,terms=?,accent=?,emoji=?,sort=?,price_before=?,price_after=?,image=? WHERE id=?')->execute($d); flash('Offer saved.'); }
        else { db()->prepare('INSERT INTO offers(badge,title,subtitle,body,terms,accent,emoji,sort,price_before,price_after,image,is_active) VALUES(?,?,?,?,?,?,?,?,?,?,?,1)')->execute($d); flash('Offer added.'); }
    }
    redirect('offers.php');
}
$edit=null; if($eid=(int)($_GET['edit']??0)){ $st=db()->prepare('SELECT * FROM offers WHERE id=?'); $st->execute([$eid]); $edit=$st->fetch(); }
$rows = db()->query('SELECT * FROM offers ORDER BY sort,id')->fetchAll();
$v=fn($k,$d='')=>e($edit[$k]??$d);
$PAGE='offers'; $TITLE='Seasonal Offers';
require __DIR__ . '/partials/head.php';
?>
<div class="grid" style="grid-template-columns:1fr 360px;align-items:start">
  <div>
    <?php if(!$rows): ?><div class="card empty">No offers yet — add one on the right →</div><?php endif; ?>
    <?php foreach ($rows as $o): ?>
      <div class="card" style="margin-bottom:14px;border-left:5px solid <?= e($o['accent']) ?>">
        <div style="display:flex;align-items:flex-start;gap:12px">
          <?php if(!empty($o['image'])): ?>
            <img src="../<?= e(ltrim($o['image'], '/')) ?>" class="thumb" style="width:56px;height:56px" alt="">
          <?php else: ?><span style="font-size:30px"><?= e($o['emoji']) ?></span><?php endif; ?>
          <div style="flex:1">
            <span class="pill gold"><?= e($o['badge']) ?></span> <?= $o['is_active']?'':'<span class="pill off">Hidden</span>' ?>
            <h3 style="font:600 18px Georgia,serif;color:var(--teal);margin:6px 0 2px"><?= e($o['title']) ?></h3>
            <div class="muted" style="font-size:14px"><?= e($o['subtitle']) ?></div>
            <?php if(!empty($o['price_after'])): ?>
              <div style="margin-top:4px;font-size:15px">
                <?php if(!empty($o['price_before'])): ?><span style="text-decoration:line-through;color:#aaa"><?= e($o['price_before']) ?></span> <?php endif; ?>
                <b style="color:var(--gold)"><?= e($o['price_after']) ?></b>
              </div>
            <?php endif; ?>
            <p class="tiny muted" style="margin-top:6px"><?= e($o['body']) ?></p>
          </div>
          <div class="row-actions" style="flex-direction:column">
            <a class="btn btn-ghost btn-sm" href="offers.php?edit=<?= (int)$o['id'] ?>">Edit</a>
            <form method="post"><?= csrf_field() ?><input type="hidden" name="act" value="toggle"><input type="hidden" name="id" value="<?= (int)$o['id'] ?>"><button class="btn btn-ghost btn-sm"><?= $o['is_active']?'Hide':'Show' ?></button></form>
            <form method="post" onsubmit="return confirm('Delete offer?')"><?= csrf_field() ?><input type="hidden" name="act" value="delete"><input type="hidden" name="id" value="<?= (int)$o['id'] ?>"><button class="btn btn-danger btn-sm">Delete</button></form>
          </div>
        </div>
      </div>
    <?php endforeach; ?>
  </div>

  <form method="post" enctype="multipart/form-data" class="card">
    <div class="card-h"><h2><?= $edit?'Edit Offer':'Add Offer' ?></h2></div>
    <?= csrf_field() ?><input type="hidden" name="act" value="save"><?php if($edit): ?><input type="hidden" name="id" value="<?= (int)$edit['id'] ?>"><?php endif; ?>
    <div class="field"><label>Badge</label><input type="text" name="badge" value="<?= $v('badge') ?>" placeholder="Summer Campaign"></div>
    <div class="field"><label>Title</label><input type="text" name="title" value="<?= $v('title') ?>" placeholder="Buy 2 Get 1 Free"></div>
    <div class="field"><label>Subtitle</label><input type="text" name="subtitle" value="<?= $v('subtitle') ?>"></div>
    <div class="field"><label>Description</label><textarea name="body"><?= $v('body') ?></textarea></div>
    <div class="form-grid">
      <div class="field"><label>Price before (was)</label><input type="text" name="price_before" value="<?= $v('price_before') ?>" placeholder="Rs 1050"></div>
      <div class="field"><label>Price after (now)</label><input type="text" name="price_after" value="<?= $v('price_after') ?>" placeholder="Rs 700"></div>
    </div>
    <div class="field"><label>Offer image (optional)</label>
      <div class="img-pick">
        <?php $oi=$edit['image']??''; ?>
        <span class="prev" style="background:linear-gradient(135deg,<?= $v('accent','#005F68') ?>,#013A41)">
          <?php if($oi): ?><img src="../<?= e($oi) ?>" style="width:100%;height:100%;object-fit:cover;border-radius:14px"><?php else: ?><?= $v('emoji','🎁') ?><?php endif; ?>
        </span>
        <div style="flex:1"><input type="file" name="image" accept="image/*">
          <?php if($oi): ?><label style="text-transform:none;font-weight:500;display:flex;gap:6px;align-items:center;margin-top:8px"><input type="checkbox" name="clear_image" value="1" style="width:auto"> Remove image</label><?php endif; ?>
          <p class="hint">Shown on the offer card. Auto-optimised.</p></div>
      </div>
    </div>
    <div class="field"><label>Terms</label><input type="text" name="terms" value="<?= $v('terms') ?>"></div>
    <div class="form-grid">
      <div class="field"><label>Emoji (fallback)</label><input type="text" name="emoji" value="<?= $v('emoji','🎁') ?>" maxlength="4"></div>
      <div class="field"><label>Accent</label><input type="text" name="accent" value="<?= $v('accent','#005F68') ?>"></div>
    </div>
    <div class="field"><label>Sort</label><input type="number" name="sort" value="<?= (int)($edit['sort']??0) ?>"></div>
    <div class="actions-bar"><?php if($edit): ?><a href="offers.php" class="btn btn-ghost">Cancel</a><?php endif; ?><button class="btn btn-gold"><?= $edit?'Save':'Add offer' ?></button></div>
  </form>
</div>
<?php require __DIR__ . '/partials/foot.php';
