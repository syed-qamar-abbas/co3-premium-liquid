<?php
// Dynamic manifest so the installed app name/icon follow admin settings.
require __DIR__ . '/lib/app.php';

$name = setting('site_name', 'CO3 Premium Liquid Shop');
$description = setting(
    'description',
    'Premium bubble tea, ice cream, coffee and signature drinks in Rawalpindi. Order on WhatsApp.'
);

$manifest = [
    'name' => $name,
    'short_name' => 'CO3',
    'description' => $description,
    'start_url' => '/',
    'scope' => '/',
    'display' => 'standalone',
    'background_color' => '#F4F0E6',
    'theme_color' => '#005F68',
    'icons' => [
        ['src' => '/icon.svg', 'sizes' => 'any', 'type' => 'image/svg+xml'],
        ['src' => '/admin/icon.php?size=192', 'sizes' => '192x192', 'type' => 'image/png'],
        ['src' => '/admin/icon.php?size=512', 'sizes' => '512x512', 'type' => 'image/png'],
        [
            'src' => '/admin/icon.php?size=512&maskable=1',
            'sizes' => '512x512',
            'type' => 'image/png',
            'purpose' => 'maskable',
        ],
    ],
];

header('Content-Type: application/manifest+json; charset=utf-8');
header('Cache-Control: public, max-age=120');
echo json_encode($manifest, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
