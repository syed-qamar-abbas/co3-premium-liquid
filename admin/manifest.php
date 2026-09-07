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
        ['src' => '/images/brand/co3-app-icon-192.png', 'sizes' => '192x192', 'type' => 'image/png'],
        ['src' => '/images/brand/co3-app-icon-512.png', 'sizes' => '512x512', 'type' => 'image/png'],
        [
            'src' => '/images/brand/co3-app-icon-maskable-512.png',
            'sizes' => '512x512',
            'type' => 'image/png',
            'purpose' => 'maskable',
        ],
    ],
];

header('Content-Type: application/manifest+json; charset=utf-8');
header('Cache-Control: public, max-age=120');
echo json_encode($manifest, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
