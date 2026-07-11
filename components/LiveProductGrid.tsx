'use client';

import { useEffect, useMemo, useState } from 'react';
import { fetchLiveProducts } from '@/lib/api';
import type { Category, Product } from '@/lib/products';
import ProductGrid from './ProductGrid';

type LiveProductGridProps = {
  fallbackProducts: Product[];
  categories?: Category[];
  badge?: 'bestseller' | 'signature' | 'new' | 'seasonal';
};

/**
 * Reads admin products on public category pages while preserving the built-in
 * menu as the static-export fallback.
 */
export default function LiveProductGrid({
  fallbackProducts,
  categories,
  badge,
}: LiveProductGridProps) {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);

  useEffect(() => {
    let ok = true;
    fetchLiveProducts().then((live) => {
      if (!ok || !live) return;
      setProducts(live);
    });
    return () => {
      ok = false;
    };
  }, []);

  const visible = useMemo(() => {
    const scoped = products.filter((p) => {
      const categoryMatch = categories?.length ? categories.includes(p.category) : true;
      const badgeMatch = badge ? p.badges?.includes(badge) : true;
      return categoryMatch && badgeMatch;
    });
    return scoped.length ? scoped : fallbackProducts;
  }, [badge, categories, fallbackProducts, products]);

  return <ProductGrid products={visible} />;
}
