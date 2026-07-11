<?php
// Runtime PWA icon. Uses the uploaded nav/footer logo when available, with a
// branded CO3 fallback so the install icon is never empty.
require __DIR__ . '/lib/app.php';

$size = (int)($_GET['size'] ?? 192);
$size = in_array($size, [180, 192, 512], true) ? $size : 192;

if (!extension_loaded('gd')) {
    header('Location: /icon.svg', true, 302);
    exit;
}

function icon_source_path(): string {
    $logo = setting('logo_nav') ?: setting('logo_footer');
    $logo = ltrim((string)$logo, '/');
    if ($logo === '') return '';
    $path = dirname(__DIR__) . '/' . $logo;
    return is_file($path) ? $path : '';
}

function image_from_path(string $path) {
    $info = @getimagesize($path);
    if (!$info) return null;
    return match ($info['mime']) {
        'image/jpeg' => function_exists('imagecreatefromjpeg') ? @imagecreatefromjpeg($path) : null,
        'image/png' => function_exists('imagecreatefrompng') ? @imagecreatefrompng($path) : null,
        'image/webp' => function_exists('imagecreatefromwebp') ? @imagecreatefromwebp($path) : null,
        'image/gif' => function_exists('imagecreatefromgif') ? @imagecreatefromgif($path) : null,
        default => null,
    };
}

$canvas = imagecreatetruecolor($size, $size);
imagealphablending($canvas, true);
imagesavealpha($canvas, true);
$teal = imagecolorallocate($canvas, 0, 95, 104);
$gold = imagecolorallocate($canvas, 212, 165, 55);
$cream = imagecolorallocate($canvas, 244, 240, 230);
imagefilledrectangle($canvas, 0, 0, $size, $size, $teal);

$pad = max(10, (int)round($size * 0.08));
imagerectangle($canvas, $pad, $pad, $size - $pad, $size - $pad, $gold);

$src = ($path = icon_source_path()) ? image_from_path($path) : null;
if ($src) {
    $sw = imagesx($src);
    $sh = imagesy($src);
    $max = (int)round($size * 0.72);
    $scale = min($max / max(1, $sw), $max / max(1, $sh));
    $dw = max(1, (int)round($sw * $scale));
    $dh = max(1, (int)round($sh * $scale));
    $dx = (int)(($size - $dw) / 2);
    $dy = (int)(($size - $dh) / 2);
    imagecopyresampled($canvas, $src, $dx, $dy, 0, 0, $dw, $dh, $sw, $sh);
    imagedestroy($src);
} else {
    $font = 5;
    $label = 'CO3';
    $tw = imagefontwidth($font) * strlen($label);
    $th = imagefontheight($font);
    imagestring($canvas, $font, (int)(($size - $tw) / 2), (int)(($size - $th) / 2), $label, $cream);
}

header('Content-Type: image/png');
header('Cache-Control: public, max-age=300');
imagepng($canvas);
imagedestroy($canvas);
