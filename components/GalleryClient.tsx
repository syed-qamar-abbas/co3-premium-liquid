'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GALLERY } from '@/lib/content';

/**
 * GalleryClient — Pinterest-style masonry with hover zoom + caption reveal.
 * Reads the generated `public/data/gallery.json` (built from raw-images/gallery/
 * via `npm run gallery`); falls back to the built-in tiles if that file is
 * absent. Each tile lazy-loads its photo over a soft brand-tint placeholder.
 */
const SPAN: Record<string, string> = {
  tall: 'row-span-2',
  wide: 'sm:col-span-2',
  normal: '',
};

interface Tile {
  id: string;
  label: string;
  src: string;
  span: string;
  accent: string;
  emoji?: string;
}

// built-in tiles → same shape (image path derived from id)
const BUILTIN: Tile[] = GALLERY.map((g) => ({
  id: g.id,
  label: g.label,
  src: `/images/gallery/${g.id}.webp`,
  span: g.span,
  accent: g.accent,
  emoji: g.emoji,
}));

function GalleryTile({ t, i }: { t: Tile; i: number }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl ${SPAN[t.span] || ''}`}
    >
      <div
        className="absolute inset-0 transition-transform duration-700 ease-luxe group-hover:scale-110"
        style={{ background: `radial-gradient(circle at 35% 30%, ${t.accent}, #013A41)` }}
      />
      {t.emoji && (
        <div className="absolute inset-0 flex items-center justify-center text-5xl drop-shadow-lg sm:text-6xl">
          {t.emoji}
        </div>
      )}

      {!failed && (
        <img
          src={t.src}
          alt={`${t.label} — CO3 Premium Liquid Shop`}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      <div className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      <figcaption className="absolute inset-x-0 bottom-0 z-10 translate-y-full bg-gradient-to-t from-black/70 to-transparent p-4 text-sm font-medium text-cream-warm transition-transform duration-500 group-hover:translate-y-0">
        {t.label}
      </figcaption>
    </motion.figure>
  );
}

export default function GalleryClient() {
  const [tiles, setTiles] = useState<Tile[]>(BUILTIN);

  useEffect(() => {
    let ok = true;
    fetch('/data/gallery.json', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (ok && Array.isArray(data) && data.length) {
          setTiles(data.map((d: Partial<Tile>) => ({ accent: '#005F68', span: 'normal', ...d } as Tile)));
        }
      })
      .catch(() => {});
    return () => {
      ok = false;
    };
  }, []);

  return (
    <div className="grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] lg:grid-cols-4">
      {tiles.map((t, i) => (
        <GalleryTile key={t.id} t={t} i={i} />
      ))}
    </div>
  );
}
