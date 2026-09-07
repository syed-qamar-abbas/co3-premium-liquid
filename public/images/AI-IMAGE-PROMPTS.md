# CO3 Premium Liquid Shop — AI Image Prompt Kit

Generate each image, export as **WebP**, and save it at the exact path shown.
The site auto-detects it and fades the photo in over the branded gradient — so
you can add them **one at a time** with zero broken images. No code changes
needed.

## Tools that work well
- **ChatGPT (GPT-Image / "create image")** — paste a prompt, ask for 4:5, download.
- **Midjourney v6+** — append `--ar 4:5 --style raw --v 6` to any prompt below.
- **Flux 1.1 Pro / Ideogram / Leonardo** — paste prompt, set ratio 4:5.

## Export settings
- Product & gallery: **4:5 portrait**, then WebP at quality ~78, target ≤ 90 KB.
  Optimize free at [squoosh.app](https://squoosh.app), or `cwebp -q 78 in.png -o out.webp`.
- Hero/OG: **16:9 / 1200×630**, WebP ≤ 200 KB.

## 🎨 Brand style block (paste at the END of every product prompt)
> …on a cream textured background (#F4F0E6) with deep teal (#005F68) accents and
> brushed gold (#D4A537) metallic details, soft natural shadows, luxury café
> atmosphere, subtle glass reflections, editorial food styling, shot on Sony
> A7R V, 85mm f/1.8 lens, minimal composition, ultra realistic, 8k, vertical 4:5.

## 🚫 Negative prompt (where supported)
> text, watermark, logo, hands, cluttered background, plastic look, oversaturated,
> low resolution, deformed cup, messy spills, harsh flash.

---

# 1 · Signature Drinks

**`/images/products/blueberry-boba.webp`**
> A tall clear glass of blueberry bubble milk tea, deep violet-blue gradient, dark
> brown-sugar tapioca pearls settled at the bottom, a few fresh blueberries and a
> blueberry splash beside the glass, condensation on the glass, [STYLE BLOCK]

**`/images/products/iced-matcha.webp`**
> A clear glass of iced matcha latte showing layered jade-green matcha over creamy
> milk and ice cubes, a dusting of matcha powder and a bamboo whisk nearby,
> [STYLE BLOCK]

**`/images/products/cold-frappe.webp`**
> A blended coffee frappé in a tall glass topped with a swirl of whipped cream and
> a caramel drizzle, frosty texture, coffee beans scattered, [STYLE BLOCK]

**`/images/products/mint-margarita.webp`**
> A frozen mint margarita mocktail, vivid green slush in a stemmed glass, fresh
> mint sprig and lime wheel garnish, crushed ice, droplets of condensation,
> [STYLE BLOCK]

# 2 · Bubble Tea

**`/images/products/classic-milk-tea.webp`**
> A classic milk tea in a clear cup with a wide straw, warm caramel-brown colour,
> glossy black tapioca pearls at the base, [STYLE BLOCK]

**`/images/products/taro-bubble-tea.webp`**
> A taro bubble tea in a clear glass, soft pastel lilac-purple milk, tapioca pearls
> at the bottom, a piece of taro root beside it, [STYLE BLOCK]

**`/images/products/brown-sugar-boba.webp`**
> A brown sugar boba milk drink in a clear glass with dramatic caramel "tiger
> stripes" of brown sugar running up the inside walls, fresh milk, dark pearls,
> [STYLE BLOCK]

**`/images/products/mango-pearl-tea.webp`**
> A mango bubble tea, bright golden-orange, in a clear glass with mango popping
> boba and fresh ripe mango slices, ice, [STYLE BLOCK]

# 3 · Coffee

**`/images/products/spanish-latte.webp`**
> A Spanish latte in a clear glass, silky golden-brown coffee with a creamy layer
> and delicate rosetta latte art on top, a small jug of condensed milk nearby,
> [STYLE BLOCK]

**`/images/products/cappuccino.webp`**
> A cappuccino in an elegant ceramic cup with dense velvet microfoam and a light
> dusting of cocoa, saucer and spoon, coffee beans, [STYLE BLOCK]

**`/images/products/iced-caramel-macchiato.webp`**
> An iced caramel macchiato in a tall clear glass, clearly layered cold milk and
> espresso over ice with a caramel lattice drizzle on top, [STYLE BLOCK]

**`/images/products/americano.webp`**
> A black americano in a clear glass cup, rich dark coffee with a thin golden crema,
> a few coffee beans beside it, [STYLE BLOCK]

# 4 · Tea

**`/images/products/hot-matcha-latte.webp`**
> A hot matcha latte in a ceramic cup, steamed milk with jade-green matcha and
> simple leaf latte art, gentle rising steam, bamboo whisk, [STYLE BLOCK]

**`/images/products/quetta-tea.webp`**
> A traditional Pakistani doodh patti milk tea, rich golden-tan colour, served in a
> small clear glass cup, cardamom pods and a kettle in soft focus behind, gentle
> steam, [STYLE BLOCK]

**`/images/products/kashmiri-chai.webp`**
> A cup of Kashmiri pink chai, rosy-pink milk tea topped with crushed pistachios
> and slivered almonds, served in a fine ceramic cup, [STYLE BLOCK]

# 5 · Ice Cream

**`/images/products/nutty-pistachio.webp`**
> A scoop of pistachio gelato in a waffle cone, pale green, studded with roasted
> pistachio pieces, a few whole pistachios scattered, [STYLE BLOCK]

**`/images/products/belgian-dark-chocolate.webp`**
> A scoop of glossy dark Belgian chocolate gelato in a waffle cone with chocolate
> shavings and a fudgy texture, a square of dark chocolate beside it, [STYLE BLOCK]

**`/images/products/fresh-strawberry.webp`**
> A scoop of fresh strawberry ice cream, soft pink with real strawberry ribbons, in
> a waffle cone, fresh strawberries beside it, [STYLE BLOCK]

**`/images/products/blueberry-shake.webp`**
> A thick blueberry ice cream shake in a tall glass topped with whipped cream and a
> few tapioca pearls, deep blue-purple, fresh blueberries, [STYLE BLOCK]

# 6 · Mocktails

**`/images/products/blue-lagoon.webp`**
> A blue lagoon mocktail, electric-blue drink over crushed ice in a tall glass, lime
> wheel garnish, soda bubbles, fresh and vibrant, [STYLE BLOCK]

**`/images/products/passion-mojito.webp`**
> A passion fruit mojito mocktail in a tall glass, golden passion fruit pulp, fresh
> mint, lime wedges and soda over ice, a halved passion fruit beside it, [STYLE BLOCK]

# 7 · Smoothies

**`/images/products/mango-tango-smoothie.webp`**
> A thick mango smoothie in a tall glass, bright golden-orange, creamy yoghurt
> texture, fresh mango chunks on top, [STYLE BLOCK]

**`/images/products/mixed-berry-blast.webp`**
> A thick mixed berry smoothie in a tall glass, deep purple, topped with fresh
> strawberries, blueberries and raspberries, [STYLE BLOCK]

---

# 8 · Brand & social images

**`/images/og-cover.webp`** (1200×630)
> Editorial flat-lay hero banner for a luxury beverage brand: a premium bubble tea,
> an iced matcha and a scoop of pistachio ice cream arranged on a cream textured
> surface (#F4F0E6) with deep teal (#005F68) and brushed gold (#D4A537) accents,
> floating fruit and mint, soft cinematic light, lots of negative space on the
> left for a logo, editorial food photography, 8k, 16:9.

**`/images/co3-storefront.webp`** (1600×1000)
> A modern minimal luxury café interior in Rawalpindi, cream and deep-teal palette
> with gold detailing, warm ambient lighting, marble counter, plants, premium and
> inviting, architectural photography, 16:10.

**`/images/brand/co3-logo-transparent.png`** (512×512, transparent)
> A minimal luxury monogram logo "C3" in brushed gold on a transparent background,
> elegant serif, premium café branding, vector style.

**`/videos/hero.webm`** (optional loop, ≤ 2 MB)
> Use a stock or filmed slow-motion clip of matcha being poured / coffee swirling /
> tea steam rising. Export 1080p WebM, then uncomment the `<video>` in
> `components/Hero.tsx`.

---

# 9 · Gallery (`/images/gallery/g1.webp` … `g12.webp`)
Use the same STYLE BLOCK. Subjects (match the captions in `lib/content.ts`):
1. `g1` Blueberry boba mid-pour, splash frozen in motion (portrait)
2. `g2` Matcha being whisked in a bowl, jade froth (landscape)
3. `g3` Espresso extraction from a portafilter, golden crema
4. `g4` Single pistachio scoop close-up with crumble
5. `g5` Brown sugar tiger-stripes running down a glass (portrait)
6. `g6` Mint margarita splash with lime and mint (landscape)
7. `g7` Fresh mangoes and a mango drink, summer mood
8. `g8` Kashmiri pink chai with crushed nuts, overhead
9. `g9` Cold frappé with whipped-cream crown (portrait)
10. `g10` Strawberry ice cream with fresh berries (landscape)
11. `g11` Taro lilac swirl close-up
12. `g12` Blue lagoon mocktail fizzing with bubbles

# 10 · Offer banners (4:5, for /offers and Instagram)
> Premium luxury promotional banner for CO3 Premium Liquid Shop. Palette: deep teal
> #005F68, cream #F4F0E6, gold #D4A537. Bold headline "[OFFER TITLE]", subhead
> "[SUBTITLE]". Floating bubbles, a hero drink, soft shadows, minimal luxury,
> Apple-inspired aesthetic, editorial photography, 4:5.

Fill `[OFFER TITLE]` / `[SUBTITLE]` from `lib/content.ts` → OFFERS, e.g.
"BUY 2 GET 1 FREE" / "Premium Bubble Tea Collection".

---

### How the site picks them up
`components/ProductVisual.tsx` already points at each product's `image` path
(defined in `lib/products.ts`). Drop the WebP at that path → rebuild
(`npm run build`) or refresh in dev → the photo fades in automatically. Any image
you haven't made yet keeps showing its branded gradient. No edits required.
