# CO3 Premium Liquid Shop — Image Asset Manifest

The site ships with **branded gradient placeholders** (rendered by
`components/ProductVisual.tsx`), so it looks finished today with zero photos.
When real photography is ready, drop the WebP files at the exact paths below
and the visuals upgrade automatically.

## How to switch a product to a real photo
**Automatic.** Each product in `lib/products.ts` has an `image` path. Just drop
the WebP at that path — `components/ProductVisual.tsx` fades it in over the
branded gradient on load, and falls back to the gradient if the file is missing.
No code change needed. See **AI-IMAGE-PROMPTS.md** for ready-to-use prompts.

## Export every image as WebP
Target: **≤ 80 KB** per card image, **≤ 200 KB** for hero/OG. Use
[squoosh.app](https://squoosh.app) or `cwebp -q 78 in.png -o out.webp`.

---

## Required files

### Brand / Social
| Path | Size | Purpose |
|------|------|---------|
| `/images/og-cover.webp` | 1200×630 | Open Graph / Twitter card |
| `/images/co3-storefront.webp` | 1600×1000 | LocalBusiness schema image |
| `/images/brand/co3-logo-transparent.png` | 512×512 | Exact transparent CO3 logo (navbar, footer, schema) |
| `/favicon.ico`, `/apple-touch-icon.png`, `/icon-192.png`, `/icon-512.png` | — | Favicons / PWA |
| `/videos/hero.webm` | 1080p, ≤ 2 MB | Optional hero loop (matcha pour / coffee swirl) |

### Products — `/images/products/`
`blueberry-boba.webp`, `iced-matcha.webp`, `cold-frappe.webp`,
`mint-margarita.webp`, `classic-milk-tea.webp`, `taro-bubble-tea.webp`,
`brown-sugar-boba.webp`, `mango-pearl-tea.webp`, `spanish-latte.webp`,
`cappuccino.webp`, `iced-caramel-macchiato.webp`, `americano.webp`,
`hot-matcha-latte.webp`, `quetta-tea.webp`, `kashmiri-chai.webp`,
`nutty-pistachio.webp`, `belgian-dark-chocolate.webp`, `fresh-strawberry.webp`,
`blueberry-shake.webp`, `blue-lagoon.webp`, `passion-mojito.webp`,
`mango-tango-smoothie.webp`, `mixed-berry-blast.webp`
→ each **1080×1350 (4:5)**.

### Gallery — `/images/gallery/`
`g1.webp` … `g12.webp` (mixed portrait/landscape, see `lib/content.ts`).

---

## Master product photography prompt (GPT Image / Midjourney)
> Ultra-premium beverage photography of **[PRODUCT NAME]**, cream textured
> background (#F4F0E6), deep teal (#005F68) accents, gold metallic (#D4A537)
> details, soft natural shadows, luxury café atmosphere, glass reflections,
> editorial food styling, shot on Sony A7R V, 85mm lens, minimal composition,
> floating ingredients ([INGREDIENTS]), high realism, 8k, 4:5 aspect ratio.

## Seasonal offer banner prompt (4:5)
> Premium luxury promotional banner for CO3 Premium Liquid Shop. Colors: deep
> teal #005F68, cream #F4F0E6, gold #D4A537. Headline "BUY 2 GET 1 FREE",
> subhead "Premium Bubble Tea Collection". Floating bubbles, soft shadows,
> minimal luxury, Apple-inspired aesthetic, editorial photography, 4:5.
