import type { Metadata } from 'next';
import CategoryView from '@/components/CategoryView';
import { byCategories } from '@/lib/products';
import { breadcrumbSchema, jsonLd, productSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Coffee — Single-Origin Espresso, Hot & Iced',
  description:
    'Specialty coffee near Bahria Town, Rawalpindi: Spanish Latte, Cappuccino, Iced Caramel Macchiato and Americano, pulled from single-origin espresso. Hot or iced. Order on WhatsApp.',
  alternates: { canonical: '/coffee/' },
};

export default function CoffeePage() {
  const products = byCategories('iced-coffee', 'hot-coffee', 'matcha');
  const schema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Coffee', path: '/coffee/' },
    ]),
    ...products.map((p) => productSchema(p)),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <CategoryView
        eyebrow="Single-Origin"
        title="Coffee, pulled with precision"
        intro="Single-origin beans, dialled-in shots and properly steamed milk. From a velvet Spanish Latte to a clean, honest Americano — the best coffee near Bahria Town, hot or over ice."
        breadcrumb={[
          { name: 'Home', href: '/' },
          { name: 'Coffee', href: '/coffee/' },
        ]}
        features={[
          { icon: '☕', title: 'Single-origin beans', body: 'Sourced for character and freshly ground per shot — bold, balanced, never burnt.' },
          { icon: '🌡️', title: 'Dialled-in daily', body: 'Grind, dose and yield calibrated every morning so the shot tastes right all day.' },
          { icon: '🥛', title: 'Microfoam milk', body: 'Steamed to a glossy velvet for lattes and cappuccinos that actually hold their art.' },
        ]}
        products={products}
        liveCategories={['iced-coffee', 'hot-coffee', 'matcha']}
        ctaTitle="Get your coffee fix"
        showAnswers
      />
    </>
  );
}
