// CO3 — client bridge to the PHP admin API.
// On the live Hostinger domain the site and /admin share an origin, so the
// default '/admin/api.php' just works. Override with NEXT_PUBLIC_API_BASE if the
// admin lives elsewhere. Every call fails soft: if the backend isn't there yet,
// the site silently uses its built-in data and ordering still works.

import type { Product } from './products';

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || '/admin/api.php';

export async function fetchLiveProducts(): Promise<Product[] | null> {
  try {
    const res = await fetch(`${API_BASE}?r=products`, { cache: 'no-store' });
    if (!res.ok) return null;
    const j = await res.json();
    const list = j?.products;
    return Array.isArray(list) && list.length ? (list as Product[]) : null;
  } catch {
    return null;
  }
}

export interface LiveOffer {
  id: string | number;
  badge: string;
  title: string;
  subtitle: string;
  body: string;
  terms: string;
  accent: string;
  emoji: string;
  image?: string;
  price_before?: string;
  price_after?: string;
}

export async function fetchLiveOffers(): Promise<LiveOffer[] | null> {
  try {
    const res = await fetch(`${API_BASE}?r=offers`, { cache: 'no-store' });
    if (!res.ok) return null;
    const j = await res.json();
    const list = j?.offers;
    return Array.isArray(list) && list.length ? (list as LiveOffer[]) : null;
  } catch {
    return null;
  }
}

export async function fetchLiveSettings(): Promise<Record<string, string> | null> {
  try {
    const res = await fetch(`${API_BASE}?r=settings`, { cache: 'no-store' });
    if (!res.ok) return null;
    const j = await res.json();
    return j?.settings && typeof j.settings === 'object' ? j.settings : null;
  } catch {
    return null;
  }
}

export interface TrackPayload {
  product: string;
  flavor?: string;
  size?: string;
  qty?: number;
  price?: number | string;
  fulfilment?: string;
  name?: string;
  address?: string;
}

/** Fire-and-forget order logging — never blocks the WhatsApp hand-off. */
export function trackOrder(payload: TrackPayload): void {
  try {
    const url = `${API_BASE}?r=track`;
    const body = JSON.stringify(payload);
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }));
    } else {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    /* never throw from tracking */
  }
}
