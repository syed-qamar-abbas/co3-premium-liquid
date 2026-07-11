'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

/**
 * ParallaxIngredients — floating fruit/ingredient motifs that drift at
 * different speeds as the section scrolls, creating depth (the "Luxury
 * Showcase" effect). Each motif is its own component so hooks stay top-level.
 */
interface Ingredient {
  emoji: string;
  top: string;
  left: string;
  depth: number;
  size: string;
  i: number;
}

const INGREDIENTS: Omit<Ingredient, 'i'>[] = [
  { emoji: '🫐', top: '12%', left: '8%', depth: -80, size: 'text-5xl' },
  { emoji: '🍓', top: '20%', left: '82%', depth: 120, size: 'text-6xl' },
  { emoji: '☕', top: '64%', left: '12%', depth: 90, size: 'text-5xl' },
  { emoji: '🌿', top: '72%', left: '78%', depth: -110, size: 'text-4xl' },
  { emoji: '🥭', top: '40%', left: '90%', depth: 60, size: 'text-5xl' },
  { emoji: '🍃', top: '48%', left: '4%', depth: -60, size: 'text-4xl' },
];

function FloatingIngredient({
  ing,
  progress,
}: {
  ing: Ingredient;
  progress: MotionValue<number>;
}) {
  const y = useTransform(progress, [0, 1], [ing.depth, -ing.depth]);
  return (
    <motion.span
      style={{ y, top: ing.top, left: ing.left }}
      className={`absolute ${ing.size} select-none drop-shadow-[0_10px_25px_rgba(1,58,65,0.25)]`}
      animate={{ rotate: [0, 8, -6, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 8 + ing.i, repeat: Infinity, ease: 'easeInOut' }}
    >
      {ing.emoji}
    </motion.span>
  );
}

export default function ParallaxIngredients() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0">
      {INGREDIENTS.map((ing, i) => (
        <FloatingIngredient key={i} ing={{ ...ing, i }} progress={scrollYProgress} />
      ))}
    </div>
  );
}
