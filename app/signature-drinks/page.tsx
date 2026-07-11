import type { Metadata } from 'next';
import CategoryView from '@/components/CategoryView';
import { signatures } from '@/lib/products';
import { breadcrumbSchema, jsonLd, productSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Signature Drinks — The CO3 Originals',
  description:
    'Meet the CO3 signature collection: Boba Milk Tea, Iced Matcha, Signature Shakes and Mint Margarita. House favourites crafted with real fruit and premium ingredients in Rawalpindi. Order on WhatsApp.',
  alternates: { canonical: '/signature-drinks/' },
};

export default function SignaturePage() {
  const products = signatures();
  const schema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Signature Drinks', path: '/signature-drinks/' },
    ]),
    ...products.map((p) => productSchema(p)),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <CategoryView
        eyebrow="House Originals"
        title="The signatures that built our name"
        intro="These are the pours people cross the city for — recipes we’ve refined obsessively until every sip lands exactly right. You won’t find them anywhere else."
        breadcrumb={[
          { name: 'Home', href: '/' },
          { name: 'Signature Drinks', href: '/signature-drinks/' },
        ]}
        features={[
          { icon: '🫐', title: 'Real-fruit forward', body: 'Wild blueberries, fresh mint and ceremonial matcha — never essence, never powder.' },
          { icon: '✋', title: 'Hand-built to order', body: 'Every signature is shaken, layered and finished the moment you order it.' },
          { icon: '🏆', title: 'Most-awarded by you', body: 'These five carry the most five-star reviews of anything on our menu.' },
        ]}
        products={products}
        liveBadge="signature"
        ctaTitle="Try a signature today"
      />
    </>
  );
}
