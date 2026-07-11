'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth-scroll provider.
 * Wraps the whole app and drives buttery momentum scrolling. Automatically
 * disables itself for users who prefer reduced motion, and syncs Lenis to the
 * browser RAF loop so Framer Motion scroll animations stay in lockstep.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 0.95,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false, // native (fast) scrolling on mobile
      touchMultiplier: 1.8,
      wheelMultiplier: 1.1,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smooth-scroll for in-page anchor links
    const handleAnchor = (e: Event) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute('href');
      if (id && id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -90 });
        }
      }
    };
    document.addEventListener('click', handleAnchor);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchor);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
