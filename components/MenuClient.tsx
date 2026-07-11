'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, CATEGORIES, type Category, type Product } from '@/lib/products';
import { fetchLiveProducts } from '@/lib/api';
import ProductCard from './ProductCard';

type Filter = 'all' | Category;

/**
 * MenuClient — filterable, sticky-tab menu.
 * Tabs filter the full catalogue with an animated re-flow. The tab bar sticks
 * under the navbar so customers can switch categories while scrolling.
 */
export default function MenuClient() {
  const [filter, setFilter] = useState<Filter>('all');

  // Live data from the admin panel (falls back to the built-in menu offline).
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  useEffect(() => {
    let ok = true;
    fetchLiveProducts().then((live) => {
      if (ok && live) setProducts(live);
    });
    return () => {
      ok = false;
    };
  }, []);

  const tabs: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    ...CATEGORIES.map((c) => ({ id: c.id as Filter, label: c.label })),
  ];

  const visible = useMemo(
    () => (filter === 'all' ? products : products.filter((p) => p.category === filter)),
    [filter, products],
  );

  return (
    <div className="container-luxe">
      {/* Sticky tab bar — bleeds to the container edges without overflowing */}
      <div className="sticky top-[var(--nav-h)] z-30 -mx-5 mb-8 border-y border-teal/10 bg-cream/90 px-5 py-3 backdrop-blur-xl sm:-mx-8 sm:mb-12 sm:px-8 lg:-mx-12 lg:px-12">
        <div>
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  filter === t.id ? 'text-cream-warm' : 'text-ink/60 hover:text-teal'
                }`}
              >
                {filter === t.id && (
                  <motion.span
                    layoutId="menu-tab"
                    className="absolute inset-0 rounded-full bg-teal"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={filter}
          layout
          className="grid grid-cols-3 gap-3 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 xl:grid-cols-5"
        >
          {visible.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
            >
              <ProductCard product={p} i={i} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <p className="mt-10 text-center text-sm text-ink/50">
        Showing {visible.length} {visible.length === 1 ? 'item' : 'items'} · Tap any drink to
        order on WhatsApp in seconds.
      </p>
    </div>
  );
}
