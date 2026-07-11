<?php
declare(strict_types=1);

$root = $argv[1] ?? dirname(__DIR__);
$adminDir = rtrim($root, '/') . '/admin';
$dbPath = $adminDir . '/data/co3.sqlite';
$seedPath = $adminDir . '/seed/seed.json';

if (!is_file($dbPath)) {
    fwrite(STDERR, "Missing database: {$dbPath}\n");
    exit(2);
}

if (!is_file($seedPath)) {
    fwrite(STDERR, "Missing seed: {$seedPath}\n");
    exit(2);
}

$seed = json_decode((string) file_get_contents($seedPath), true, 512, JSON_THROW_ON_ERROR);
$products = $seed['products'] ?? [];

$pdo = new PDO('sqlite:' . $dbPath);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->beginTransaction();

$update = $pdo->prepare(
    "UPDATE products SET
        name = ?, category = ?, tagline = ?, description = ?, ingredients = ?,
        flavors = ?, sizes = ?, toppings = ?, badges = ?, accent = ?, emoji = ?,
        image = ?, is_active = 1, sort = ?, updated_at = datetime('now')
      WHERE slug = ?"
);

$insert = $pdo->prepare(
    "INSERT INTO products
      (name, slug, category, tagline, description, ingredients, flavors, sizes, toppings, badges, accent, emoji, image, is_active, sort, updated_at)
     VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, datetime('now'))"
);

$seen = [];
$updated = 0;
$inserted = 0;

foreach ($products as $index => $p) {
    $slug = (string) ($p['slug'] ?? '');
    if ($slug === '') {
        continue;
    }

    $seen[] = $slug;
    $payload = [
        (string) ($p['name'] ?? ''),
        (string) ($p['category'] ?? ''),
        (string) ($p['tagline'] ?? ''),
        (string) ($p['description'] ?? ''),
        json_encode($p['ingredients'] ?? [], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
        json_encode($p['flavors'] ?? [], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
        json_encode($p['sizes'] ?? [], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
        json_encode($p['toppings'] ?? [], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
        json_encode($p['badges'] ?? [], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
        (string) ($p['accent'] ?? '#005F68'),
        (string) ($p['emoji'] ?? '🥤'),
        (string) ($p['image'] ?? ''),
        (int) (($p['sort'] ?? $index) + 1),
    ];

    $update->execute([...$payload, $slug]);

    if ($update->rowCount() > 0) {
        $updated++;
        continue;
    }

    $insert->execute([
        $payload[0],
        $slug,
        ...array_slice($payload, 1),
    ]);
    $inserted++;
}

if ($seen) {
    $placeholders = implode(',', array_fill(0, count($seen), '?'));
    $deactivate = $pdo->prepare("UPDATE products SET is_active = 0 WHERE slug NOT IN ({$placeholders})");
    $deactivate->execute($seen);
}

$pdo->commit();

$count = (int) $pdo->query("SELECT COUNT(*) FROM products WHERE is_active = 1")->fetchColumn();
$enhanced = (int) $pdo->query("SELECT COUNT(*) FROM products WHERE is_active = 1 AND image LIKE '/images/products-enhanced/%'")->fetchColumn();

echo "SYNCED_PRODUCTS={$count}\n";
echo "ENHANCED_PRODUCT_IMAGES={$enhanced}\n";
echo "UPDATED={$updated}\n";
echo "INSERTED={$inserted}\n";
