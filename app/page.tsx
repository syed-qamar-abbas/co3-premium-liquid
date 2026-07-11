import Link from 'next/link';
import Hero from '@/components/Hero';
import WhySection from '@/components/WhySection';
import SectionHeading from '@/components/SectionHeading';
import LiveProductCarousel from '@/components/LiveProductCarousel';
import LuxuryShowcase from '@/components/LuxuryShowcase';
import MenuPreview from '@/components/MenuPreview';
import HomeOffers from '@/components/HomeOffers';
import Reels from '@/components/Reels';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import GeoAnswers from '@/components/GeoAnswers';
import OrderCTA from '@/components/OrderCTA';
import Reveal from '@/components/Reveal';

import { signatures, bestSellers } from '@/lib/products';
import { faqSchema, breadcrumbSchema, jsonLd } from '@/lib/schema';
import { FAQS } from '@/lib/content';

export default function HomePage() {
  const sig = signatures();
  const best = bestSellers();

  const schema = [
    breadcrumbSchema([{ name: 'Home', path: '/' }]),
    faqSchema(FAQS.slice(0, 6)),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />

      <Hero />

      {/* Menu categories + offers surfaced early on the home screen */}
      <MenuPreview />

      <HomeOffers />

      <WhySection />

      {/* Signature Collection — horizontal scroll */}
      <section className="bg-cream-warm py-24 sm:py-32" id="signature">
        <div className="container-luxe">
          <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
            <SectionHeading
              eyebrow="Signature Collection"
              title="The pours people come back for"
              intro="Five house originals that built our reputation. Each one balanced, beautiful and made to order."
              align="left"
            />
            <Reveal i={2}>
              <Link href="/signature-drinks/" className="btn-outline whitespace-nowrap">
                View all signatures →
              </Link>
            </Reveal>
          </div>
        </div>
        <div className="container-luxe mt-14">
          <LiveProductCarousel fallbackProducts={sig} badge="signature" />
        </div>
      </section>

      <Reels />

      <LuxuryShowcase />

      {/* Best Sellers */}
      <section className="bg-cream py-24 sm:py-32" id="best-sellers">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Most Loved"
            title="This week’s best sellers"
            intro="The crowd favourites flying out the door right now — order before they sell out."
          />
        </div>
        <div className="container-luxe mt-14">
          <LiveProductCarousel fallbackProducts={best} badge="bestseller" />
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-cream-warm py-24 sm:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Loved in Rawalpindi"
            title="4.9 stars from 1000+ happy customers"
            intro="Don’t take our word for it — here’s what the twin cities are saying."
          />
          <div className="mt-14">
            <ReviewsCarousel />
          </div>
        </div>
      </section>

      <GeoAnswers />

      <OrderCTA />
    </>
  );
}
