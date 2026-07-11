'use client';

import { motion } from 'framer-motion';
import FloatingBubbles from './FloatingBubbles';
import MagneticButton from './MagneticButton';
import { WhatsAppIcon } from './OrderModal';
import { useSettings } from './SettingsProvider';

/**
 * Hero — bright, real-brand opener.
 * Cream canvas with teal + gold accents, the "Scoop into Happiness" script and
 * the brand headline "Refresh Your Mood, Fuel Your Day" — alongside a real CO3
 * storefront photography in a rounded editorial frame. Mobile-first.
 */
export default function Hero() {
  const s = useSettings();
  // Split the headline tagline on its comma → first line + gold second line.
  const parts = s.tagline.split(',');
  const line1 = parts.length > 1 ? parts.slice(0, -1).join(',') + ',' : s.tagline;
  const line2 = parts.length > 1 ? parts[parts.length - 1].trim() : '';

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-cream pt-[var(--nav-h)]">
      {/* soft brand glows */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[55vh] w-[55vh] rounded-full bg-teal/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[45vh] w-[45vh] rounded-full bg-gold/15 blur-[110px]" />
      <FloatingBubbles count={10} className="opacity-60" />

      {/* palm-shadow vibe */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(0,95,104,0.06),transparent_45%)]" />

      <div className="container-luxe relative z-10 grid items-center gap-12 py-16 lg:grid-cols-2">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-script text-4xl text-teal sm:text-5xl"
          >
            {s.taglineScript}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 font-display text-fluid-hero font-bold leading-[0.95] text-teal"
          >
            {line1}
            {line2 && (
              <>
                <br />
                <span className="text-shimmer">{line2}.</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg lg:mx-0"
          >
            {s.description}{' '}
            <span className="font-semibold text-teal">{s.vibe}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <MagneticButton href="/menu/" as="a" className="btn-teal">
              Explore Menu
            </MagneticButton>
            <MagneticButton
              href={s.waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <WhatsAppIcon /> Order on WhatsApp
            </MagneticButton>
          </motion.div>

          {/* trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink/60 lg:justify-start"
          >
            <span className="flex items-center gap-1.5">
              <span className="text-gold">★★★★★</span> 4.9 · 1000+ orders
            </span>
            <span>🍓 Real fruits & flavours</span>
            <span>⚡ Fast WhatsApp ordering</span>
          </motion.div>
        </div>

        {/* Real storefront portrait — a calmer, faster hero visual than autoplay video */}
        <div className="relative flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[29rem]"
          >
            <div className="absolute -inset-4 rounded-[3rem] border border-dashed border-gold/45 sm:-inset-6" />

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-teal bg-teal shadow-lift"
            >
              <div className="relative aspect-[4/5] w-full">
                <img
                  src="/images/gallery/g-05.webp"
                  alt="The CO3 storefront glowing at night with friends holding drinks"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/75 via-transparent to-white/5" />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-cream-warm sm:inset-x-7 sm:bottom-7">
                  <div>
                    <p className="eyebrow text-gold">Bahria Town · Rawalpindi</p>
                    <p className="mt-1 font-display text-2xl leading-none sm:text-3xl">Meet us after dark.</p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-teal/50 text-gold backdrop-blur-sm" aria-hidden>
                    ↗
                  </span>
                </div>
              </div>
              {/* gloss */}
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
            </motion.div>

            <div className="absolute -right-4 -top-5 hidden w-32 overflow-hidden rounded-2xl border-4 border-cream-warm shadow-lift sm:block sm:-right-10 sm:-top-8 sm:w-40">
              <div className="aspect-[4/5]">
                <img
                  src="/images/gallery/g-02.webp"
                  alt="Friends enjoying drinks together at CO3"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="bg-cream-warm px-2 py-2 text-center font-script text-lg leading-none text-teal">Good times, guaranteed.</p>
            </div>

            {/* floating script badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: 'spring', stiffness: 200, damping: 14 }}
              className="absolute -bottom-4 left-3 rounded-2xl bg-cream-warm px-4 py-2.5 shadow-lift sm:-left-10"
            >
              <span className="font-script text-2xl text-teal">tiny bubbles,</span>
              <span className="block font-script text-2xl leading-none text-gold">big mood ♡</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-teal/40">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-luxe"
        >
          Scroll
          <span className="h-8 w-px bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
