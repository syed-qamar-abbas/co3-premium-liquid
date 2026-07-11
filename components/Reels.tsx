'use client';

import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { WhatsAppIcon } from './OrderModal';
import { useSettings } from './SettingsProvider';

/**
 * Reels — real CO3 video reels in autoplay phone frames. Muted + looping +
 * playsInline so they behave on mobile and never block the main thread.
 */
const REELS = [
  { src: '/videos/strawberry-matcha.mp4', poster: '/images/brand/strawberry-matcha-poster.webp', label: 'Strawberry Matcha' },
  { src: '/videos/caramel-matcha.mp4', poster: '/images/brand/caramel-matcha-poster.webp', label: 'Caramel Iced Matcha' },
  { src: '/videos/icecream-shake.mp4', poster: '/images/brand/icecream-shake-poster.webp', label: 'Ice Cream Scoop Shake' },
];

export default function Reels() {
  const s = useSettings();
  return (
    <section className="bg-cream-warm py-24 sm:py-28">
      <div className="container-luxe">
        <SectionHeading
          eyebrow={s.vibe}
          title="Watch it come to life"
          intro="The real CO3 experience — fresh pours, thick shakes and matcha whisked to order. Tap any drink on the menu to order yours."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {REELS.map((r, i) => (
            <motion.div
              key={r.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-[2rem] border-[5px] border-teal bg-teal shadow-glass ${
                i === 2 ? 'col-span-2 mx-auto w-1/2 lg:col-span-1 lg:w-full' : ''
              }`}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={r.poster}
                className="block h-full w-full object-cover"
                style={{ aspectRatio: '9 / 16' }}
              >
                <source src={r.src} type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <span className="font-script text-2xl text-cream-warm">{r.label}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={s.waLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <WhatsAppIcon /> Order on WhatsApp
          </a>
          <a href={s.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline">
            Follow @co3premium
          </a>
        </div>
      </div>
    </section>
  );
}
