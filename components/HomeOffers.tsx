'use client';

import Link from 'next/link';
import SectionHeading from './SectionHeading';
import OffersClient from './OffersClient';

/**
 * HomeOffers — a taste of current offers, shown high on the home page. Reads
 * live offers from the admin (via OffersClient) and links to the full page.
 */
export default function HomeOffers() {
  return (
    <section className="relative overflow-hidden bg-cream-warm py-20 sm:py-24" id="home-offers">
      <div className="container-luxe">
        <div className="flex flex-col items-end justify-between gap-4 sm:flex-row">
          <SectionHeading
            eyebrow="Limited Time"
            title="Today’s offers"
            intro="Sweeter together. Grab a deal before it’s gone — claim any of them on WhatsApp."
            align="left"
          />
          <Link href="/offers/" className="btn-gold whitespace-nowrap">
            See all offers →
          </Link>
        </div>
        <div className="mt-10">
          <OffersClient limit={2} />
        </div>
      </div>
    </section>
  );
}
