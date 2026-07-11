import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import OffersClient from '@/components/OffersClient';
import OrderCTA from '@/components/OrderCTA';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';
import { OFFERS } from '@/lib/content';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Seasonal Offers & Deals',
  description:
    'Current deals at CO3 Premium Liquid Shop: Buy 2 Get 1 Free bubble tea, Matcha Mondays 20% off, family scoop packs and a student special. Claim instantly on WhatsApp in Rawalpindi.',
  alternates: { canonical: '/offers/' },
};

export default function OffersPage() {
  const offerSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'CO3 Premium Liquid Shop — Current Offers',
    itemListElement: OFFERS.map((o, i) => ({
      '@type': 'Offer',
      position: i + 1,
      name: `${o.title} — ${o.subtitle}`,
      description: o.body,
      priceCurrency: SITE.currency,
      seller: { '@id': `${SITE.domain}/#business` },
      availability: 'https://schema.org/InStock',
    })),
  };

  const schema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Offers', path: '/offers/' },
    ]),
    offerSchema,
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />

      <PageHero
        eyebrow="Limited Time"
        title="Seasonal offers worth showing up for"
        intro="Sweeter together. Mix-and-match deals, weekday rituals and student perks — all claimable in one WhatsApp message. Offers rotate, so grab them while they’re pouring."
        breadcrumb={[
          { name: 'Home', href: '/' },
          { name: 'Offers', href: '/offers/' },
        ]}
      />

      <section className="bg-cream py-16 sm:py-24">
        <div className="container-luxe">
          <OffersClient />
        </div>
      </section>

      <OrderCTA title="Claim your offer now" />
    </>
  );
}
