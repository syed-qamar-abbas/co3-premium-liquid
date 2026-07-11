'use client';

import { motion } from 'framer-motion';
import { PILLARS, STATS } from '@/lib/content';
import Counter from './Counter';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const ICONS: Record<string, string> = {
  leaf: '🌿',
  fruit: '🍓',
  gem: '💎',
  heart: '🤍',
  star: '✨',
};

/**
 * WhySection — the "Why CO3" trust band: four brand pillars over an animated
 * counter strip (15+ categories, 40+ flavours, 1000+ customers).
 */
export default function WhySection() {
  return (
    <section className="relative bg-cream py-24 sm:py-32" id="why">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Why CO3"
          title="Obsessed with the details, generous with the flavour"
          intro="We treat every cup like it matters — because to the person drinking it, it does. Here’s the standard we hold, every single day."
        />

        {/* Pillars */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} i={i} as="article">
              <div className="glass-card group h-full p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/10 text-3xl transition-transform duration-500 group-hover:scale-110">
                  {ICONS[p.icon]}
                </div>
                <h3 className="mt-5 font-display text-xl text-teal">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Lifestyle proof — real photography keeps the promise human */}
        <div className="mt-8 grid items-start gap-4 sm:grid-cols-[1.15fr_0.85fr]">
          <div className="group relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-teal shadow-glass sm:aspect-[16/7]">
            <img
              src="/images/gallery/g-03.webp"
              alt="A refreshing mint lemonade on a sunny day"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-deep/75 via-transparent to-transparent" />
            <div className="absolute inset-y-0 left-5 flex max-w-[13rem] flex-col justify-center sm:left-8 sm:max-w-xs">
              <span className="eyebrow">Real refreshment</span>
              <p className="mt-2 font-display text-2xl leading-tight text-cream-warm sm:text-3xl">Made for golden-hour moods.</p>
            </div>
          </div>
          <div className="group relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-gold shadow-gold sm:aspect-[4/3]">
            <img
              src="/images/gallery/g-09.webp"
              alt="Colourful summer refresher drinks the CO3 way"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-5 font-script text-3xl text-cream-warm sm:bottom-6 sm:left-6">Summer the CO3 way.</p>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid grid-cols-3 divide-x divide-gold/20 overflow-hidden rounded-3xl bg-teal-luxe py-10 text-center text-cream-warm"
        >
          {STATS.map((s) => (
            <div key={s.label} className="px-3">
              <p className="font-display text-4xl font-bold text-gold sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-xs uppercase tracking-wide2 text-cream/70 sm:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
