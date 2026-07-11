'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { fetchLiveSettings } from '@/lib/api';

/**
 * BrandLogo — shows the admin-uploaded logo when one exists, otherwise the
 * elegant "CO₃" text lockup passed as `fallback`. Settings are fetched once and
 * shared across instances (navbar + footer) via a module-level cache.
 */
let cache: Record<string, string> | null | undefined;
let inflight: Promise<Record<string, string> | null> | null = null;

function getSettings() {
  if (cache !== undefined) return Promise.resolve(cache);
  if (!inflight) inflight = fetchLiveSettings().then((s) => (cache = s));
  return inflight;
}

export default function BrandLogo({
  variant,
  fallback,
  className = '',
}: {
  variant: 'nav' | 'footer';
  fallback: ReactNode;
  className?: string;
}) {
  const [logo, setLogo] = useState<string>('');
  useEffect(() => {
    let ok = true;
    getSettings().then((s) => {
      const url = s?.[variant === 'nav' ? 'logo_nav' : 'logo_footer'] || '';
      if (ok && url) setLogo(url);
    });
    return () => {
      ok = false;
    };
  }, [variant]);

  if (logo) {
    return (
      <img
        src={logo}
        alt="CO3 Premium Liquid Shop"
        className={`w-auto object-contain object-left ${
          variant === 'nav' ? 'h-10 max-w-[160px]' : 'h-12 max-w-[200px]'
        } ${className}`}
      />
    );
  }
  return <>{fallback}</>;
}
