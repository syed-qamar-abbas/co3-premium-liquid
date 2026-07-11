'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { type Product, fromPrice } from '@/lib/products';
import { useOrder } from './OrderModal';
import ProductVisual from './ProductVisual';

const BADGE_STYLES: Record<string, string> = {
  bestseller: 'bg-gold text-ink',
  signature: 'bg-teal text-cream-warm',
  new: 'bg-[#C84B5A] text-white',
  seasonal: 'bg-[#2F8F6B] text-white',
};

const BADGE_LABEL: Record<string, string> = {
  bestseller: 'Best',
  signature: 'Signature',
  new: 'New',
  seasonal: 'Seasonal',
};

/**
 * ProductCard — compact, tap-to-order tile.
 * Mobile-first: three fit comfortably per row, the whole card opens the order
 * modal, and a gold "+" chip signals "add / order". Desktop gets the tagline,
 * "from" pricing, glass sheen and a subtle cursor tilt.
 */
export default function ProductCard({ product, i = 0 }: { product: Product; i?: number }) {
  const { openOrder } = useOrder();
  const ref = useRef<HTMLDivElement>(null);

  // cursor tilt (desktop / mouse only — never fires on touch)
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-5, 5]), { stiffness: 200, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const badge = product.badges?.[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="perspective h-full"
    >
      <button
        onClick={() => openOrder(product)}
        aria-label={`Order ${product.name}`}
        className="group block h-full w-full rounded-[1.15rem] bg-cream-warm/80 p-1 text-left shadow-[0_16px_40px_-32px_rgba(1,58,65,0.75)] ring-1 ring-teal/10 transition duration-300 focus:outline-none active:scale-[0.985] sm:rounded-3xl sm:p-1.5 sm:hover:-translate-y-1 sm:hover:ring-gold/35"
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={reset}
          style={{ rotateX: rx, rotateY: ry }}
          className="preserve-3d flex h-full flex-col"
        >
          {/* image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-[0.95rem] shadow-sm ring-1 ring-gold/20 transition-shadow duration-500 group-hover:shadow-lift sm:rounded-2xl">
            <ProductVisual
              accent={product.accent}
              emoji={product.emoji}
              name={product.name}
              image={product.image}
            />

            {badge && (
              <span
                className={`absolute left-1.5 top-1.5 rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide shadow-sm sm:text-[10px] ${BADGE_STYLES[badge]}`}
              >
                {BADGE_LABEL[badge]}
              </span>
            )}

            {/* add / order chip */}
            <span className="absolute bottom-1.5 right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-lg font-bold text-ink shadow-gold transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9">
              +
            </span>
          </div>

          {/* body */}
          <div className="flex flex-1 flex-col px-1 pb-1 pt-2 sm:px-1.5 sm:pb-1.5">
            <h3 className="font-display text-[12px] font-bold leading-tight text-teal line-clamp-2 sm:text-lg">
              {product.name}
            </h3>
            <p className="mt-0.5 hidden text-xs leading-snug text-ink/55 line-clamp-1 sm:block">
              {product.tagline}
            </p>
            <p className="mt-1 text-[11px] font-extrabold text-ink sm:mt-2 sm:text-sm">
              <span className="hidden text-ink/45 sm:inline">from </span>Rs {fromPrice(product)}
            </p>
          </div>
        </motion.div>
      </button>
    </motion.article>
  );
}
