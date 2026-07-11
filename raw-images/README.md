# raw-images — drop your exports here

Put your AI-generated / photographed images in this folder, named by **slug**,
then run:

```bash
npm run images
```

The script (`scripts/convert-images.sh`) resizes + optimizes them to WebP and
places each at the correct path under `public/images/`. Re-run any time you add
more. Files here are **not** part of the deployed site (git-ignored), so the
originals can stay large.

## Naming (any extension: .png .jpg .jpeg .webp)

### Products → `public/images/products/<slug>.webp`
```
blueberry-boba      iced-matcha          cold-frappe          mint-margarita
classic-milk-tea    taro-bubble-tea      brown-sugar-boba     mango-pearl-tea
spanish-latte       cappuccino           iced-caramel-macchiato   americano
hot-matcha-latte    quetta-tea           kashmiri-chai
nutty-pistachio     belgian-dark-chocolate  fresh-strawberry  blueberry-shake
blue-lagoon         passion-mojito
mango-tango-smoothie   mixed-berry-blast
```

### Gallery → `public/images/gallery/<id>.webp`
```
g1 g2 g3 g4 g5 g6 g7 g8 g9 g10 g11 g12
```

### Brand / social
```
og-cover          → public/images/og-cover.webp        (social share card)
co3-storefront    → public/images/co3-storefront.webp  (schema image)
co3-logo          → public/images/co3-logo.png         (kept transparent PNG)
```

> Need a WebP converter? `brew install webp` (gives you `cwebp`). The script
> falls back to macOS `sips` if available.
>
> Prompts for every image: see `public/images/AI-IMAGE-PROMPTS.md`.
