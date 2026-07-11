'use client';

import { useState } from 'react';

/**
 * ProductVisual — branded image surface for a product.
 *
 * It renders a premium gradient "plate" (motif + glass sweep + gold rim) as the
 * permanent base layer, then fades a real photo in OVER it when one exists at
 * `image`. If that file isn't there yet (404) the `onError` handler keeps the
 * gradient showing — so you can drop AI images in one at a time with zero
 * broken images. Static-export friendly: native <img loading="lazy">.
 */
export default function ProductVisual({
  accent,
  emoji,
  name,
  image,
  className = '',
  rounded = 'rounded-2xl',
}: {
  accent: string;
  emoji: string;
  name: string;
  image?: string;
  className?: string;
  rounded?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(image) && !failed;

  return (
    <div
      role="img"
      aria-label={`${name} — CO3 Premium Liquid Shop`}
      className={`group relative flex h-full w-full items-center justify-center overflow-hidden ${rounded} ${className}`}
      style={{
        background: `radial-gradient(circle at 32% 28%, ${accent}cc, ${accent} 55%, #013A41)`,
      }}
    >
      {/* soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_85%,rgba(0,0,0,0.35),transparent_60%)]" />

      {/* product motif (shows until a real photo loads) */}
      <span className="relative z-10 text-[clamp(3rem,9vw,6rem)] drop-shadow-[0_12px_30px_rgba(0,0,0,0.4)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110">
        {emoji}
      </span>

      {/* real photo — fades in over the gradient once loaded */}
      {showImage && (
        <img
          src={image}
          alt={`${name} — CO3 Premium Liquid Shop`}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 z-20 h-full w-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* gold rim */}
      <div className="pointer-events-none absolute inset-2 z-30 rounded-[inherit] border border-gold/30" />

      {/* glass reflection sweep */}
      <div className="pointer-events-none absolute inset-0 z-30 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
    </div>
  );
}
