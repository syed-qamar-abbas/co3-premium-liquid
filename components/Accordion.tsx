'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Accordion — accessible expand/collapse FAQ list with smooth height animation.
 * The visible text mirrors the FAQPage schema 1:1 for SGE/AI-Overview trust.
 */
export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-teal/10 overflow-hidden rounded-3xl border border-teal/10 bg-cream-warm">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-cream"
            >
              <span className="font-display text-lg text-teal sm:text-xl">{item.q}</span>
              <span
                className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border border-gold/40 text-gold transition-transform duration-300 ${
                  isOpen ? 'rotate-45' : ''
                }`}
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink/70">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
