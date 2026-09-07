'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { fetchLiveSettings } from '@/lib/api';

export const DEFAULT_CO3_LOGO = '/images/brand/co3-logo-transparent.png';
export const DEFAULT_CO3_APP_ICON = '/images/brand/co3-app-icon-192.png';

/**
 * BrandLogo — shows the admin-uploaded logo when one exists, otherwise the
 * exact built-in CO3 transparent logo. Settings are fetched once and shared
 * across instances (navbar + footer) via a module-level cache.
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

  const src = logo || DEFAULT_CO3_LOGO;

  return (
    <img
      src={src}
      alt="CO3 Premium Liquid Shop"
      loading={variant === 'nav' ? 'eager' : 'lazy'}
      decoding="async"
      className={`w-auto object-contain object-left ${
        variant === 'nav'
          ? 'h-14 max-w-[112px] sm:h-16 sm:max-w-[140px]'
          : 'h-20 max-w-[160px] sm:h-24 sm:max-w-[210px]'
      } ${className}`}
      onError={(event) => {
        event.currentTarget.style.display = 'none';
      }}
    />
  );
}
