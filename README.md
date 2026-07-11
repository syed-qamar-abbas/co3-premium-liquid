# CO3 Premium Liquid Shop — Luxury Website

A premium, conversion-focused website for **CO3 Premium Liquid Shop** — bubble
tea, ice cream, coffee & signature drinks in Rawalpindi. Built like a $50k
agency build: editorial design, cinematic motion, WhatsApp-first ordering, and
full SEO / GEO / SGE / LLMO optimisation.

## ✨ Stack
- **Next.js 14** (App Router) — **Static Export** (`output: 'export'`) for Hostinger shared hosting
- **Tailwind CSS** — design tokens for the brand palette
- **Framer Motion** — reveals, magnetic buttons, 3D card tilt, parallax
- **Lenis** — buttery smooth scrolling
- **Swiper** — signature/best-seller rails + reviews carousel
- **Brand typography** — Playfair Display, Montserrat, Allura with offline-safe CSS fallbacks for static builds

## 🎨 Brand tokens (`tailwind.config.ts`)
`teal #005F68` · `teal-dark #014851` · `cream #F4F0E6` · `cream-warm #FFFDF8` ·
`gold #D4A537` · `ink #111111`

## 🗂 Structure
```
app/                 Pages (home, menu, signature, ice-cream, coffee, tea,
                     offers, about, gallery, faq, contact, 404)
components/          UI + animation engine (Hero, ProductCard, OrderModal,
                     FloatingBubbles, SteamParticles, ParallaxIngredients,
                     MagneticButton, carousels, Navbar, Footer …)
lib/                 site.ts (config + WhatsApp engine), products.ts (catalogue),
                     content.ts (copy/reviews/FAQ/offers), schema.ts (JSON-LD)
public/              robots.txt, llms.txt, sitemap.xml, .htaccess, manifest,
                     images/ (placeholders + asset manifest)
```

## 🛒 WhatsApp ordering
Every product has an **Order** button → opens a luxe modal (size / quantity /
pickup-or-delivery) → launches WhatsApp at **+92 303 6303111** with a
pre-filled message. Logic lives in `lib/site.ts` (`whatsappOrderLink`) and
`components/OrderModal.tsx`. Change the number in one place: `lib/site.ts`.

## 🔍 SEO / GEO / SGE / LLMO
- Per-page `<title>`, meta description, canonical, Open Graph & Twitter cards
- JSON-LD: Restaurant/LocalBusiness, Organization, WebSite, Menu, Product,
  FAQPage, BreadcrumbList, Offer, ImageGallery (`lib/schema.ts`)
- `public/robots.txt` — explicitly allows GPTBot, ClaudeBot, PerplexityBot, etc.
- `public/llms.txt` — structured brand brief for LLMs/AI search
- `public/sitemap.xml` — all pages with priorities
- GEO answer blocks (`components/GeoAnswers.tsx`) written for AI Overviews

## 🚀 Develop
```bash
npm install
npm run dev          # http://localhost:3000
```

## 📦 Build (static export)
```bash
npm run build        # outputs /out (pure static HTML/CSS/JS)
npm run serve        # preview the production build locally
```

## 🖼 Add real images (AI-generated, on-brand)
1. Open `public/images/AI-IMAGE-PROMPTS.md` — a ready-to-paste prompt for every
   product (+ hero, gallery, offers), pre-tuned to the cream/teal/gold palette.
2. Generate each in ChatGPT / Midjourney / Flux at **4:5**, export PNG or JPG.
3. Drop them in `raw-images/` named by slug (e.g. `blueberry-boba.png`).
4. Run **`npm run images`** — resizes, optimizes and converts to WebP, placing
   each at the right path. Needs `cwebp` (`brew install webp`).
5. `npm run build`. Images you haven't made yet keep their branded gradient —
   no broken images, ever.

## 🎨 Brand graphics (generated, offline)
`npm run graphics` renders on-brand banners with headless Chrome → WebP:
- `public/images/og-cover.webp` — social share card (already wired into `<meta>`)
- `public/images/offers/offer-*.webp` — 4 seasonal offer banners (4:5, ready for
  Instagram/stories)

Edit the templates in `scripts/brand-templates/` (plain HTML/CSS) and re-run.
Needs Google Chrome + `cwebp`.

## ☁️ Deploy to Hostinger (shared hosting)
1. `npm run build`
2. Upload **everything inside `/out`** into `public_html` (the `.htaccess`
   ships inside it).
3. In `lib/site.ts` set `SITE.domain` to your live domain, and update
   `public/robots.txt` + `public/sitemap.xml` hostnames.
4. Set up the contact form: create a form at [Formspree](https://formspree.io)
   and paste the ID into `components/ContactForm.tsx` (`FORM_ID`).
5. Add real photography per `public/images/IMAGE-ASSETS.md` (optional — branded
   placeholders look great out of the box).

## ⚙️ Before launch — checklist
- [ ] Set `SITE.domain` and exact `geo` lat/lng in `lib/site.ts`
- [ ] Replace hostname in `robots.txt`, `sitemap.xml`, `llms.txt`
- [ ] Add Formspree form ID in `ContactForm.tsx`
- [ ] Add favicons + `og-cover.webp` in `/public`
- [ ] (Optional) add `public/videos/hero.webm` and uncomment the hero `<video>`
- [ ] Verify the WhatsApp number `923036303111`

---
Crafted fresh in Rawalpindi. 🥤
