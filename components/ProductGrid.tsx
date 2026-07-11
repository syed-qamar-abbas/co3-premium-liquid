import type { Product } from '@/lib/products';
import ProductCard from './ProductCard';

/**
 * ProductGrid — responsive masonry-style grid of ProductCards.
 * Mobile: 1 col → 640px: 2 → 1024px: 3 → 1280px: 4.
 */
export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 xl:grid-cols-5">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} i={i} />
      ))}
    </div>
  );
}
