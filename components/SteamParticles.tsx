'use client';

import { useMemo } from 'react';

/**
 * SteamParticles — soft rising wisps for hot drinks (coffee, matcha, chai).
 * Place inside a relatively-positioned container above a cup graphic.
 */
export default function SteamParticles({
  count = 5,
  className = '',
}: {
  count?: number;
  className?: string;
}) {
  const wisps = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: 30 + i * (40 / count),
        duration: 4 + (i % 3),
        delay: -(i * 0.8),
      })),
    [count],
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-full h-40 ${className}`}
    >
      {wisps.map((w, i) => (
        <span
          key={i}
          className="steam"
          style={{
            left: `${w.left}%`,
            animationDuration: `${w.duration}s`,
            animationDelay: `${w.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
