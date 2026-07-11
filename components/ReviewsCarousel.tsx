'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, A11y } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import { REVIEWS } from '@/lib/content';

/**
 * ReviewsCarousel — auto-advancing testimonial slider with an animated quote
 * mark. Social proof, presented like a luxury editorial pull-quote.
 */
export default function ReviewsCarousel() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, A11y]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={{ 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
      className="!pb-14"
    >
      {REVIEWS.map((r, i) => (
        <SwiperSlide key={i} className="h-auto">
          <div className="glass-card flex h-full flex-col p-7">
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              className="font-display text-6xl leading-none text-gold/70"
            >
              “
            </motion.span>
            <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink/75">{r.quote}</p>
            <div className="mt-5 flex items-center justify-between">
              <div>
                <p className="font-display text-lg text-teal">{r.name}</p>
                <p className="text-xs text-ink/50">{r.location}</p>
              </div>
              <span className="text-sm text-gold">{'★'.repeat(r.rating)}</span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
