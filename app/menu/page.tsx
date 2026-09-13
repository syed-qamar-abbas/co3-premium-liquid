import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import MenuClient from '@/components/MenuClient';
import OrderCTA from '@/components/OrderCTA';
import { menuSchema, breadcrumbSchema, jsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Full Menu — Bubble Tea, Coffee, Ice Cream & More in Bahria Town',
  description:
    'Explore the full CO3 menu: bubble tea, coffee, matcha, ice cream, mocktails and smoothies. Order on WhatsApp across Bahria Town Phase 1–8, Rawalpindi and Islamabad.',
  alternates: { canonical: '/menu/' },
  openGraph: {
    title: 'Full Menu | CO3 Premium Liquid Shop',
    description:
      'Bubble tea, coffee, matcha, ice cream, mocktails & smoothies — crafted fresh in Bahria Town Rawalpindi.',
  },
};

export default function MenuPage() {
  const schema = [
    menuSchema(),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Menu', path: '/menu/' },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />

      <PageHero
        eyebrow="The Full Menu"
        title="Every pour, scoop and shake — in one place"
        intro="From creamy Boba Milk Tea and ceremonial matcha to a proper Quetta karak chai — boba, coffee, ice cream, shakes, bubble soda and more for Bahria Town Phase 1–8, Rawalpindi and nearby Islamabad. Filter by category, then order your favourite straight to WhatsApp. All prices are exclusive of tax."
        breadcrumb={[
          { name: 'Home', href: '/' },
          { name: 'Menu', href: '/menu/' },
        ]}
      />

      <section className="bg-cream py-16 sm:py-20">
        <MenuClient />
      </section>

      <OrderCTA title="Found your favourite?" />
    </>
  );
}
