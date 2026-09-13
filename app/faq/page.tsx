import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Accordion from '@/components/Accordion';
import OrderCTA from '@/components/OrderCTA';
import SectionHeading from '@/components/SectionHeading';
import { breadcrumbSchema, faqSchema, jsonLd } from '@/lib/schema';
import { FAQS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'FAQ — Bahria Town Delivery, Freshness, Toppings & More',
  description:
    'Answers about CO3 Premium Liquid Shop: Bahria Town Phase 1–8 delivery, Rawalpindi & Islamabad ordering, WhatsApp orders, fresh ingredients, toppings and pricing.',
  alternates: { canonical: '/faq/' },
};

export default function FAQPage() {
  const schema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'FAQ', path: '/faq/' },
    ]),
    faqSchema(FAQS),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />

      <PageHero
        eyebrow="Questions, Answered"
        title="Everything you need to know"
        intro="Bahria Town Phase 1–8 delivery, freshness, toppings, timings — the things people ask us most, answered clearly. Still stuck? We’re one WhatsApp message away."
        breadcrumb={[
          { name: 'Home', href: '/' },
          { name: 'FAQ', href: '/faq/' },
        ]}
      />

      <section className="bg-cream py-16 sm:py-24">
        <div className="container-luxe max-w-3xl">
          <Accordion items={FAQS} />
        </div>
      </section>

      <OrderCTA title="Still thirsty for answers?" subtitle="Message us on WhatsApp — we usually reply within minutes during opening hours." />
    </>
  );
}
