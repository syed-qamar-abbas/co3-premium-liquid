import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import MenuClient from '@/components/MenuClient';
import OrderCTA from '@/components/OrderCTA';
import { menuSchema, breadcrumbSchema, jsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Full Menu — Bubble Tea, Coffee, Ice Cream & More',
  description:
    'Explore the full CO3 Premium Liquid Shop menu: hand-shaken bubble tea, single-origin coffee, ceremonial matcha, slow-churned ice cream, mocktails and smoothies. Order any item on WhatsApp in Rawalpindi.',
  alternates: { canonical: '/menu/' },
  openGraph: {
    title: 'Full Menu | CO3 Premium Liquid Shop',
    description: 'Bubble tea, coffee, matcha, ice cream, mocktails & smoothies — crafted fresh in Rawalpindi.',
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
        intro="From creamy Boba Milk Tea and ceremonial matcha to a proper Quetta karak chai — boba, coffee, ice cream, shakes, bubble soda and more. Filter by category, then order your favourite straight to WhatsApp. All prices are exclusive of tax."
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
