'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CATEGORIES } from '@/lib/products';
import SectionHeading from './SectionHeading';

/**
 * MenuPreview — quick category tiles shown high on the home page so visitors
 * jump straight into the menu. Maps each category to its page (or the filtered
 * full menu). Horizontal scroll on mobile, grid on desktop.
 */
const EMOJI: Record<string, string> = {
  boba: '🧋', matcha: '🍵', 'iced-coffee': '🧊', 'hot-coffee': '☕', 'ice-cream': '🍨',
  'boba-ice-cream': '🍧', shakes: '🥤', 'bubble-soda': '🫧', soda: '🥤', mocktails: '🍹',
  'quetta-tea': '🫖', 'iced-tea': '🧋', smoothies: '🥭',
};

const HREF: Record<string, string> = {
  'ice-cream': '/ice-cream/',
  'iced-coffee': '/coffee/',
  'hot-coffee': '/coffee/',
  matcha: '/coffee/',
  boba: '/signature-drinks/',
  'quetta-tea': '/tea/',
  'iced-tea': '/tea/',
};

const CATEGORY_IMAGE: Record<string, string> = {
  boba: '/images/products-enhanced/boba-milk-tea.webp',
  'bubble-soda': '/images/products-enhanced/bubble-soda.webp',
  soda: '/images/products-enhanced/co3-soda.webp',
  mocktails: '/images/products-enhanced/mocktail-soda.webp',
};

export default function MenuPreview() {
  return (
    <section className="bg-cream py-20 sm:py-24" id="menu-preview">
      <div className="container-luxe">
        <div className="flex flex-col items-end justify-between gap-4 sm:flex-row">
          <SectionHeading
            eyebrow="Explore the Menu"
            title="What are you craving?"
            intro="Boba, matcha, coffee, ice cream, shakes, soda and more — tap a category to dive in."
            align="left"
          />
          <Link href="/menu/" className="btn-outline whitespace-nowrap">
            Full menu →
          </Link>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-[2rem] bg-teal shadow-glass sm:grid-cols-[1.05fr_0.95fr]">
          <div className="relative aspect-[16/8] sm:aspect-auto">
            <img
              src="/images/gallery/g-00.webp"
              alt="Three colourful CO3 summer drinks on a tray"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-teal/45" />
          </div>
          <div className="flex flex-col justify-center p-6 text-cream-warm sm:p-8">
            <span className="eyebrow">Start with something cold</span>
            <p className="mt-2 font-display text-2xl leading-tight sm:text-3xl">Good vibes. Great drinks.</p>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">A little sip of everything we do best — fresh, playful and made for your mood.</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 sm:mt-10 sm:grid-cols-4 sm:gap-4 lg:grid-cols-7">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: (i % 7) * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={HREF[c.id] || '/menu/'}
                className="group relative flex min-h-[8.5rem] flex-col items-center justify-end gap-2 overflow-hidden rounded-2xl border border-teal/10 bg-cream-warm p-3 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-glass sm:min-h-[9.5rem] sm:p-4"
              >
                {CATEGORY_IMAGE[c.id] && (
                  <img
                    src={CATEGORY_IMAGE[c.id]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover opacity-30 transition duration-500 group-hover:scale-105 group-hover:opacity-50"
                  />
                )}
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-cream-warm/85 text-2xl shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 sm:text-3xl">
                  {EMOJI[c.id] || '🥤'}
                </span>
                <span className="relative z-10 text-[11px] font-semibold leading-tight text-teal sm:text-sm">
                  {c.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
