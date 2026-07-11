'use client';

import { motion } from 'framer-motion';
import FloatingBubbles from './FloatingBubbles';
import MagneticButton from './MagneticButton';
import { WhatsAppIcon } from './OrderModal';
import { useSettings } from './SettingsProvider';

/**
 * OrderCTA — the closing conversion band. "Ready for your next sip?"
 * Reused at the bottom of the home page and category pages.
 */
export default function OrderCTA({
  title = 'Ready for your next sip?',
  subtitle = 'Place your order in seconds and we’ll prepare it fresh. Pickup or delivery across Rawalpindi & Islamabad.',
}: {
  title?: string;
  subtitle?: string;
}) {
  const s = useSettings();
  return (
    <section className="relative overflow-hidden bg-cream py-24 sm:py-28">
      <div className="container-luxe">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-teal-luxe px-6 py-16 text-center sm:px-12 sm:py-20">
          <FloatingBubbles count={12} />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(212,165,55,0.25),transparent_55%)]" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-fluid-h2 font-semibold leading-tight text-cream-warm"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-5 max-w-xl text-cream/75"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <MagneticButton
                href={s.waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <WhatsAppIcon /> Order on WhatsApp
              </MagneticButton>
              <a href={`tel:${s.phoneIntl}`} className="btn-outline !border-cream/30 !text-cream hover:!bg-cream hover:!text-teal">
                Call {s.phoneDisplay}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
