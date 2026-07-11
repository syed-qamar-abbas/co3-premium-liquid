<?php
require_once __DIR__ . '/lib/app.php'; $USER = require_login();

$FIELDS = [
  'site_name'=>'Site name','tagline'=>'Headline tagline','tagline_script'=>'Script tagline','vibe'=>'Vibe line',
  'description'=>'Short description','phone'=>'Phone (display)','phone_intl'=>'Phone (intl, e.g. +9230…)',
  'whatsapp'=>'WhatsApp number (e.g. 92303…)','email'=>'Email','address'=>'Address','hours'=>'Opening hours',
  'instagram'=>'Instagram URL','facebook'=>'Facebook URL','tiktok'=>'TikTok URL','price_note'=>'Price note',
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $what = $_POST['what'] ?? '';
    if ($what === 'brand') {
        foreach (array_keys($FIELDS) as $k) set_setting($k, trim($_POST[$k] ?? ''));
        if ($nav = upload_image('logo_nav', null)) set_setting('logo_nav', $nav);
        if ($_POST['clear_logo_nav'] ?? '') set_setting('logo_nav', '');
        if ($foot = upload_image('logo_footer', null)) set_setting('logo_footer', $foot);
        if ($_POST['clear_logo_footer'] ?? '') set_setting('logo_footer', '');
        flash('Brand settings saved.');
        redirect('settings.php');
    }
    if ($what === 'password') {
        $cur = $_POST['current'] ?? ''; $new = $_POST['new'] ?? ''; $conf = $_POST['confirm'] ?? '';
        if (!password_verify($cur, $USER['password_hash'])) flash('Current password is incorrect.');
        elseif (strlen($new) < 8) flash('New password must be at least 8 characters.');
        elseif ($new !== $conf) flash('New passwords do not match.');
        else {
            db()->prepare('UPDATE users SET password_hash=?, must_change=0 WHERE id=?')
               ->execute([password_hash($new, PASSWORD_DEFAULT), $USER['id']]);
            flash('Password updated.');
        }
        redirect('settings.php#password');
    }
}

$S = all_settings();
$g = fn($k) => e($S[$k] ?? '');
$PAGE='settings'; $TITLE='Settings';
require __DIR__ . '/partials/head.php';
?>
<form method="post" enctype="multipart/form-data" class="card" style="margin-bottom:22px">
  <div class="card-h"><h2>Brand & Content</h2><span class="muted tiny">Shown across the website</span></div>
  <?= csrf_field() ?><input type="hidden" name="what" value="brand">

  <div class="form-grid">
    <?php foreach ($FIELDS as $k=>$lbl): ?>
      <div class="field <?= in_array($k,['description','address'])?'full':'' ?>">
        <label><?= e($lbl) ?></label>
        <?php if (in_array($k,['description'])): ?><textarea name="<?= $k ?>"><?= $g($k) ?></textarea>
        <?php else: ?><input type="text" name="<?= $k ?>" value="<?= $g($k) ?>"><?php endif; ?>
      </div>
    <?php endforeach; ?>
  </div>

  <div class="card-h" style="margin-top:22px"><h2 style="font-size:16px">Logo</h2></div>
  <div class="form-grid">
    <?php foreach (['logo_nav'=>'Navbar logo','logo_footer'=>'Footer logo'] as $lk=>$llbl): $lv=$S[$lk]??''; ?>
    <div class="field">
      <label><?= $llbl ?> (PNG with transparency recommended)</label>
      <div class="img-pick">
        <span class="prev" style="background:var(--teal)"><?php if($lv): ?><img src="../<?= e(ltrim($lv, '/')) ?>" style="max-width:100%;max-height:100%;object-fit:contain"><?php else: ?>C₃<?php endif; ?></span>
        <div style="flex:1"><input type="file" name="<?= $lk ?>" accept="image/*">
          <?php if($lv): ?><label style="text-transform:none;font-weight:500;display:flex;gap:6px;align-items:center;margin-top:8px">
            <input type="checkbox" name="clear_<?= $lk ?>" value="1" style="width:auto"> Remove (use text logo)</label><?php endif; ?>
          <p class="hint">Leave empty to keep the elegant “CO₃” text mark.</p></div>
      </div>
    </div>
    <?php endforeach; ?>
  </div>

  <div class="actions-bar"><button class="btn btn-gold">Save settings</button></div>
</form>

<form method="post" class="card" id="password">
  <div class="card-h"><h2>Password</h2><span class="muted tiny">Signed in as <?= e($USER['username']) ?></span></div>
  <?= csrf_field() ?><input type="hidden" name="what" value="password">
  <div class="form-grid">
    <div class="field full"><label>Current password</label><input type="password" name="current" required></div>
    <div class="field"><label>New password</label><input type="password" name="new" required minlength="8"></div>
    <div class="field"><label>Confirm new password</label><input type="password" name="confirm" required minlength="8"></div>
  </div>
  <div class="actions-bar"><button class="btn btn-teal">Update password</button></div>
</form>
<?php require __DIR__ . '/partials/foot.php';
