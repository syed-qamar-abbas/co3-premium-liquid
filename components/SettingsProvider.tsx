'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { SITE } from '@/lib/site';
import { fetchLiveSettings } from '@/lib/api';

/**
 * SettingsProvider — makes admin-editable brand settings available across the
 * site. Fetches once from the PHP API and merges over the built-in SITE values,
 * so text/contact/logo edits in the admin appear live. If the backend is offline
 * the site keeps its built-in defaults (nothing breaks, no visible flash since
 * the defaults already match what's seeded in the panel).
 */
export interface LiveSettings {
  siteName: string;
  tagline: string;
  taglineScript: string;
  vibe: string;
  description: string;
  phoneDisplay: string;
  phoneIntl: string;
  whatsappNumber: string;
  email: string;
  address: string;
  hours: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  priceNote: string;
  logoNav: string;
  logoFooter: string;
}

const DEFAULTS: LiveSettings = {
  siteName: SITE.name,
  tagline: SITE.tagline,
  taglineScript: SITE.taglineScript,
  vibe: SITE.vibe,
  description: SITE.description,
  phoneDisplay: SITE.phoneDisplay,
  phoneIntl: SITE.phoneIntl,
  whatsappNumber: SITE.whatsappNumber,
  email: SITE.email,
  address: `${SITE.address.street}, ${SITE.address.city}`,
  hours: SITE.hours,
  instagram: SITE.social.instagram,
  facebook: SITE.social.facebook,
  tiktok: SITE.social.tiktok,
  priceNote: SITE.taxNote,
  logoNav: '',
  logoFooter: '',
};

// admin key → LiveSettings key
const MAP: Record<string, keyof LiveSettings> = {
  site_name: 'siteName', tagline: 'tagline', tagline_script: 'taglineScript', vibe: 'vibe',
  description: 'description', phone: 'phoneDisplay', phone_intl: 'phoneIntl', whatsapp: 'whatsappNumber',
  email: 'email', address: 'address', hours: 'hours', instagram: 'instagram', facebook: 'facebook',
  tiktok: 'tiktok', price_note: 'priceNote',
  logo_nav: 'logoNav', logo_footer: 'logoFooter',
};

interface Ctx extends LiveSettings {
  waLink: (message?: string) => string;
}

const SettingsCtx = createContext<Ctx | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<LiveSettings>(DEFAULTS);

  useEffect(() => {
    let ok = true;
    fetchLiveSettings().then((live) => {
      if (!ok || !live) return;
      const next = { ...DEFAULTS };
      for (const [k, v] of Object.entries(live)) {
        const key = MAP[k];
        if (key && typeof v === 'string' && v.trim() !== '') (next as any)[key] = v;
      }
      setS(next);
    });
    return () => {
      ok = false;
    };
  }, []);

  const waLink = (message?: string) => {
    const text = encodeURIComponent(
      message ?? "Hello CO3 👋\n\nI'd like to place an order. Could you share today's fresh menu?",
    );
    return `https://wa.me/${s.whatsappNumber}?text=${text}`;
  };

  return <SettingsCtx.Provider value={{ ...s, waLink }}>{children}</SettingsCtx.Provider>;
}

export function useSettings(): Ctx {
  const ctx = useContext(SettingsCtx);
  if (ctx) return ctx;
  // Safe fallback if used outside the provider (e.g. isolated tests)
  return {
    ...DEFAULTS,
    waLink: (m?: string) =>
      `https://wa.me/${DEFAULTS.whatsappNumber}?text=${encodeURIComponent(m ?? 'Hello CO3 👋')}`,
  };
}
