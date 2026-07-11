'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MagneticButton — the cursor "pulls" the element toward it within a radius,
 * then springs back on leave. A signature luxury micro-interaction (Aesop /
 * Apple style). Falls back to a normal element on touch devices.
 */
export default function MagneticButton({
  children,
  className = '',
  href,
  as = 'a',
  target,
  rel,
  strength = 0.4,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  as?: 'a' | 'button';
  target?: string;
  rel?: string;
  strength?: number;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner =
    as === 'button' ? (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    ) : (
      <a className={className} href={href} target={target} rel={rel} onClick={onClick}>
        {children}
      </a>
    );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {inner}
    </motion.div>
  );
}
