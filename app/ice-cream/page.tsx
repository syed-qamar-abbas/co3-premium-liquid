import type { Metadata } from 'next';
import CategoryView from '@/components/CategoryView';
import { byCategories } from '@/lib/products';
import { breadcrumbSchema, jsonLd, productSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Premium Ice Cream — Slow-Churned Scoops & Shakes',
  description:
    'Slow-churned premium ice cream in Rawalpindi: Nutty Pistachio, Belgian Dark Chocolate, Fresh Strawberry and thick ice-cream shakes. Made with real fruit and Belgian chocolate. Order on WhatsApp.',
  alternates: { canonical: '/ice-cream/' },
};

export default function IceCreamPage() {
  const products = byCategories('ice-cream', 'boba-ice-cream', 'shakes');
  const schema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Ice Cream', path: '/ice-cream/' },
    ]),
    ...products.map((p) => productSchema(p)),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <CategoryView
        eyebrow="Slow-Churned"
        title="Ice cream worth the spoon"
        intro="Dense, slow-churned scoops made with real fruit, roasted nuts and Belgian couverture chocolate. Served as single scoops, double waffle cones, or blended into shakes thick enough to stand a spoon in."
        breadcrumb={[
          { name: 'Home', href: '/' },
          { name: 'Ice Cream', href: '/ice-cream/' },
        ]}
        features={[
          { icon: '🍫', title: 'Belgian chocolate', body: 'We use proper couverture — deep, glossy and bittersweet, never cocoa shortcuts.' },
          { icon: '🥜', title: 'Whole roasted nuts', body: 'Real roasted pistachios and almonds folded through, for texture in every bite.' },
          { icon: '🍓', title: 'Real fruit ribbons', body: 'Strawberries macerated fresh and swirled in — no artificial flavour, ever.' },
        ]}
        products={products}
        liveCategories={['ice-cream', 'boba-ice-cream', 'shakes']}
        ctaTitle="Build your scoop box"
      />
    </>
  );
}
