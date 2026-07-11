'use client';

import { useMemo } from 'react';

/**
 * FloatingBubbles — ambient luxury particle field.
 * Renders a deterministic set of translucent, gold-tinted bubbles drifting
 * upward. Pure CSS animation (GPU-friendly), so it stays smooth on mobile and
 * costs nothing on the main thread.
 */
export default function FloatingBubbles({
  count = 14,
  className = '',
}: {
  count?: number;
  className?: string;
}) {
  // Deterministic pseudo-random so server & client markup match (no hydration mismatch)
  const bubbles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const seed = (i * 97) % 100;
      const size = 14 + ((seed * 7) % 60);
      return {
        left: (seed * 1.13) % 100,
        size,
        duration: 14 + ((seed * 3) % 16),
        delay: -((seed * 0.9) % 18),
        opacity: 0.25 + ((seed % 5) * 0.1),
      };
    });
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="bubble"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            opacity: b.opacity,
          }}
        />
      ))}
    </div>
  );
}
