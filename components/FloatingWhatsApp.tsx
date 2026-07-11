'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WhatsAppIcon } from './OrderModal';
import { useSettings } from './SettingsProvider';

/**
 * FloatingWhatsApp — the always-present mobile conversion anchor.
 * A pulsing gold-ringed WhatsApp button fixed bottom-right, with a one-time
 * "Order in seconds" nudge bubble. Core to the "maximise mobile orders" goal.
 */
export default function FloatingWhatsApp() {
  const [showTip, setShowTip] = useState(false);
  const s = useSettings();

  useEffect(() => {
    const t = setTimeout(() => setShowTip(true), 3500);
    const t2 = setTimeout(() => setShowTip(false), 11000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[90] hidden flex-col items-end gap-3 md:flex">
      <AnimatePresence>
        {showTip && (
          <motion.button
            onClick={() => setShowTip(false)}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-[200px] rounded-2xl rounded-br-sm bg-cream-warm px-4 py-3 text-left text-xs font-medium text-ink shadow-lift"
          >
            <span className="font-semibold text-teal">Hungry?</span> Order your favourite in
            seconds — we reply fast. 👋
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href={s.waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 18 }}
        className="relative flex h-15 w-15 items-center justify-center rounded-full bg-[#25D366] text-white shadow-gold"
        style={{ height: 60, width: 60 }}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
        <span className="absolute -inset-1 rounded-full border border-gold/40" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </motion.a>
    </div>
  );
}
