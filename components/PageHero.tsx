'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import FloatingBubbles from './FloatingBubbles';

/**
 * PageHero — compact teal hero band used at the top of every interior page,
 * with breadcrumb, eyebrow, display title and intro. Keeps inner pages on the
 * same luxe footing as the homepage.
 */
export default function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  breadcrumb: { name: string; href: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-teal-luxe pb-16 pt-[calc(var(--nav-h)+3rem)] sm:pb-20 sm:pt-[calc(var(--nav-h)+4rem)]">
      <FloatingBubbles count={9} />
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-gold/10 blur-[100px]" />

      <div className="container-luxe relative z-10">
        {/* breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-cream/55">
          {breadcrumb.map((b, i) => (
            <span key={b.href} className="flex items-center gap-2">
              {i > 0 && <span className="text-gold/60">/</span>}
              {i < breadcrumb.length - 1 ? (
                <Link href={b.href} className="transition-colors hover:text-gold">
                  {b.name}
                </Link>
              ) : (
                <span className="text-cream/80">{b.name}</span>
              )}
            </span>
          ))}
        </nav>

        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow"
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 max-w-3xl font-display text-fluid-h2 font-bold leading-[1.05] text-cream-warm"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-5 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg"
        >
          {intro}
        </motion.p>
      </div>
    </section>
  );
}
