'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { OFFERS } from '@/lib/content';
import { fetchLiveOffers, type LiveOffer } from '@/lib/api';
import { WhatsAppIcon } from './OrderModal';
import { useSettings } from './SettingsProvider';
import FloatingBubbles from './FloatingBubbles';

/**
 * OffersClient — seasonal offer cards with optional image and before/after
 * pricing. Reads live offers from the admin panel (falls back to the built-in
 * set). Images are cropped to a fixed banner ratio so tall uploads always fit.
 */
export default function OffersClient({ limit }: { limit?: number }) {
  const s = useSettings();
  const [offers, setOffers] = useState<LiveOffer[]>(OFFERS as unknown as LiveOffer[]);

  useEffect(() => {
    let ok = true;
    fetchLiveOffers().then((live) => {
      if (ok && live) setOffers(live);
    });
    return () => {
      ok = false;
    };
  }, []);

  const shown = limit ? offers.slice(0, limit) : offers;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {shown.map((offer, i) => (
        <motion.article
          key={offer.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="group relative flex flex-col overflow-hidden rounded-[2rem] text-cream-warm shadow-glass"
          style={{ background: `radial-gradient(circle at 80% 0%, ${offer.accent}, #013A41 80%)` }}
        >
          {/* image banner — fixed ratio so any image fits cleanly */}
          {offer.image ? (
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                src={offer.image}
                alt={offer.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-gold/40 bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide2 text-gold backdrop-blur-sm">
                {offer.badge}
              </span>
            </div>
          ) : (
            <div className="relative">
              <FloatingBubbles count={5} />
              <div className="pointer-events-none absolute -right-6 -top-6 text-[7rem] opacity-20">
                {offer.emoji}
              </div>
            </div>
          )}

          {/* body */}
          <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-8">
            {!offer.image && (
              <span className="inline-flex w-fit items-center rounded-full border border-gold/40 bg-black/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide2 text-gold">
                {offer.badge}
              </span>
            )}
            <h2 className="mt-3 font-display text-3xl font-bold leading-none sm:text-4xl">
              {offer.title}
            </h2>
            {offer.subtitle && <p className="mt-2 font-display text-lg text-gold">{offer.subtitle}</p>}
            {offer.body && <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/75">{offer.body}</p>}

            {/* before / after price */}
            {offer.price_after && (
              <div className="mt-4 flex items-baseline gap-3">
                {offer.price_before && (
                  <span className="text-base text-cream/50 line-through">{offer.price_before}</span>
                )}
                <span className="font-display text-2xl font-bold text-gold">{offer.price_after}</span>
              </div>
            )}

            {offer.terms && <p className="mt-3 text-xs text-cream/55">{offer.terms}</p>}

            <a
              href={s.waLink(
                `Hello CO3 👋\n\nI'd like to claim the offer: ${offer.title}${offer.subtitle ? ` (${offer.subtitle})` : ''}.\n\nName:\nPickup or Delivery:`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-6 w-fit"
            >
              <WhatsAppIcon /> Claim this offer
            </a>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
