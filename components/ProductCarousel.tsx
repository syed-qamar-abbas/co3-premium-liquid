'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import type { Product } from '@/lib/products';
import ProductCard from './ProductCard';

/**
 * ProductCarousel — horizontal, momentum-scrolling product rail (Swiper).
 * Used for the "Signature Collection" and "Best Sellers" rows. Free-mode +
 * mousewheel for a tactile, Apple-style horizontal browse; snaps on mobile.
 */
export default function ProductCarousel({ products }: { products: Product[] }) {
  return (
    <Swiper
      modules={[FreeMode, Mousewheel, Pagination, A11y]}
      freeMode={{ enabled: true, momentum: true, momentumRatio: 0.6 }}
      mousewheel={{ forceToAxis: true }}
      grabCursor
      pagination={{ clickable: true }}
      spaceBetween={12}
      slidesPerView={2.3}
      breakpoints={{
        480: { slidesPerView: 2.6, spaceBetween: 14 },
        640: { slidesPerView: 3.2, spaceBetween: 18 },
        900: { slidesPerView: 4, spaceBetween: 20 },
        1200: { slidesPerView: 5, spaceBetween: 20 },
      }}
      className="!overflow-visible !pb-12"
    >
      {products.map((p, i) => (
        <SwiperSlide key={p.id} className="h-auto !flex">
          <div className="w-full">
            <ProductCard product={p} i={i} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
