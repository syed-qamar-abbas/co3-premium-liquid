'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ParallaxIngredients from './ParallaxIngredients';
import FloatingBubbles from './FloatingBubbles';

/**
 * LuxuryShowcase — the brand-story moment: real place, real people, real craft.
 * Photography carries the emotion while the teal panel keeps the page grounded.
 */
export default function LuxuryShowcase() {
  return (
    <section className="relative overflow-hidden bg-teal-luxe py-28 sm:py-36">
      <FloatingBubbles count={10} />
      <ParallaxIngredients />

      <div className="container-luxe relative z-10 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow"
          >
            The CO3 Standard
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-2xl text-fluid-h2 font-semibold leading-[1.05] text-cream-warm"
          >
            Real ingredients. <span className="text-shimmer">Real craft.</span> No shortcuts.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 max-w-xl text-cream/75"
          >
            Lychee, strawberry, fresh mint, single-origin beans and sun-ripe mango — sourced with
            intent, prepared with patience, served at their peak.
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/about/" className="btn-gold">Our story</Link>
            <Link href="/signature-drinks/" className="font-semibold text-cream-warm underline decoration-gold/70 underline-offset-8 transition hover:text-gold">
              Discover signatures →
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[23rem] sm:min-h-[31rem]"
        >
          <div className="absolute inset-x-0 bottom-0 top-8 overflow-hidden rounded-[2rem] border border-gold/35 shadow-lift sm:left-12">
            <img
              src="/images/gallery/g-05.webp"
              alt="The CO3 storefront and friends sharing drinks"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/80 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 max-w-xs font-display text-2xl leading-tight text-cream-warm sm:bottom-7 sm:left-7 sm:text-3xl">
              Your favourite corner of the city.
            </p>
          </div>
          <div className="absolute left-0 top-0 w-32 overflow-hidden rounded-2xl border-4 border-teal shadow-lift sm:w-44">
            <div className="aspect-[4/5]">
              <img
                src="/images/gallery/g-02.webp"
                alt="Three friends enjoying drinks at CO3"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="bg-cream-warm px-2 py-2 text-center font-script text-lg leading-none text-teal">Good vibes only.</div>
          </div>
          <span className="absolute bottom-5 right-4 rounded-full border border-gold/45 bg-teal/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide2 text-gold backdrop-blur-sm sm:right-7">
            Made in Rawalpindi
          </span>
        </motion.div>
      </div>
    </section>
  );
}
