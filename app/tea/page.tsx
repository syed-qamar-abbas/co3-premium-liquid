import type { Metadata } from 'next';
import CategoryView from '@/components/CategoryView';
import { byCategories } from '@/lib/products';
import { breadcrumbSchema, jsonLd, productSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Tea — Ceremonial Matcha, Quetta Chai & Kashmiri Pink',
  description:
    'From ceremonial-grade matcha lattes to a slow-boiled Quetta doodh patti and rose-pink Kashmiri chai. Authentic tea, brewed fresh in Rawalpindi. Order on WhatsApp.',
  alternates: { canonical: '/tea/' },
};

export default function TeaPage() {
  const products = byCategories('quetta-tea', 'iced-tea');
  const schema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Tea', path: '/tea/' },
    ]),
    ...products.map((p) => productSchema(p)),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <CategoryView
        eyebrow="Brewed With Ritual"
        title="Tea, from Tokyo to Quetta"
        intro="A tea menu with range: stone-ground ceremonial matcha whisked to a jade froth, a proper full-cream Quetta doodh patti, and the famous rose-pink Kashmiri chai crowned with nuts."
        breadcrumb={[
          { name: 'Home', href: '/' },
          { name: 'Tea', href: '/tea/' },
        ]}
        features={[
          { icon: '🍵', title: 'Ceremonial matcha', body: 'Authentic stone-ground Japanese matcha, whisked fresh — never sweetened powder.' },
          { icon: '🫖', title: 'Slow-boiled chai', body: 'Quetta-style doodh patti simmered low and long in full-cream milk until rich and golden.' },
          { icon: '🌸', title: 'Kashmiri pink', body: 'Traditional pink chai finished with crushed pistachio and almond — pure nostalgia.' },
        ]}
        products={products}
        liveCategories={['quetta-tea', 'iced-tea']}
        ctaTitle="Brew up an order"
      />
    </>
  );
}
