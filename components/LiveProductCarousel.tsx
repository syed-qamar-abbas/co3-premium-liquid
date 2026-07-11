'use client';

import { useEffect, useMemo, useState } from 'react';
import { fetchLiveProducts } from '@/lib/api';
import type { Product } from '@/lib/products';
import ProductCarousel from './ProductCarousel';

export default function LiveProductCarousel({
  fallbackProducts,
  badge,
}: {
  fallbackProducts: Product[];
  badge: 'bestseller' | 'signature' | 'new' | 'seasonal';
}) {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);

  useEffect(() => {
    let ok = true;
    fetchLiveProducts().then((live) => {
      if (ok && live) setProducts(live);
    });
    return () => {
      ok = false;
    };
  }, []);

  const visible = useMemo(() => {
    const scoped = products.filter((p) => p.badges?.includes(badge));
    return scoped.length ? scoped : fallbackProducts;
  }, [badge, fallbackProducts, products]);

  return <ProductCarousel products={visible} />;
}
