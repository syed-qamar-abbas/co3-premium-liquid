// CO3 Premium Liquid Shop — Global site configuration.
// Single source of truth for brand facts, contact details, and the WhatsApp
// ordering engine. Changing a value here updates the whole site + schema.

export const SITE = {
  name: 'CO3 Premium Liquid Shop',
  shortName: 'CO3',
  legalName: 'CO3 Premium Liquid Shop',
  tagline: 'Refresh Your Mood, Fuel Your Day',
  taglineScript: 'Scoop into Happiness',
  vibe: 'Good Vibes. Great Drinks.',
  domain: 'https://co3premium.com', // ← replace with the live Hostinger domain
  description:
    'Premium boba milk tea, ceremonial matcha, coffee, ice cream, bubble soda, shakes and signature drinks — crafted fresh daily in Rawalpindi. Order instantly on WhatsApp.',
  locale: 'en_PK',
  currency: 'PKR',
  currencySymbol: 'Rs',
  priceRange: 'Rs 140 – Rs 800',
  taxNote: 'All prices are exclusive of tax.',

  // ── Location ──────────────────────────────────────────────
  address: {
    street: 'Bahria Town, Phase 4',
    city: 'Rawalpindi',
    region: 'Punjab',
    postalCode: '46000',
    country: 'PK',
  },
  geo: { lat: 33.5217, lng: 73.0716 }, // approx — set exact pin before launch
  areasServed: [
    'Bahria Town Rawalpindi',
    'DHA Islamabad',
    'Gulberg Greens',
    'Saddar Rawalpindi',
    'Islamabad',
  ],

  // ── Hours ─────────────────────────────────────────────────
  hours: 'Mon–Sun · 12:00 PM – 2:00 AM',
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'], opens: '12:00', closes: '00:00' },
    { days: ['Friday', 'Saturday'], opens: '12:00', closes: '02:00' },
  ],

  // ── Contact ───────────────────────────────────────────────
  phoneDisplay: '0303 6303111',
  phoneIntl: '+923036303111',
  whatsappNumber: '923036303111',
  email: 'orders@co3premium.com',

  social: {
    instagram: 'https://instagram.com/co3premium',
    facebook: 'https://facebook.com/co3premium',
    tiktok: 'https://tiktok.com/@co3premium',
    whatsapp: 'https://wa.me/923036303111',
    googleMaps: 'https://maps.google.com/?q=CO3+Premium+Liquid+Shop+Rawalpindi',
  },

  rating: { value: 4.9, count: 1000, best: 5 },
} as const;

// ── WhatsApp ordering engine ─────────────────────────────────
// Builds the deep link that pre-fills the exact message format requested by
// the brand and opens WhatsApp directly (mobile app or WhatsApp Web).

export type Fulfilment = 'Pickup' | 'Delivery';

export interface OrderPayload {
  product: string;
  quantity?: number;
  size?: string;
  flavor?: string;
  fulfilment?: Fulfilment;
  name?: string;
  address?: string;
}

export function buildWhatsAppMessage({
  product,
  quantity = 1,
  size,
  flavor,
  fulfilment,
  name,
  address,
}: OrderPayload): string {
  const isDelivery = fulfilment === 'Delivery';
  const lines = [
    'Hello CO3 👋',
    '',
    "I'd like to order",
    `• Product: ${product}`,
    flavor ? `• Flavour: ${flavor}` : null,
    size ? `• Size: ${size}` : null,
    `• Quantity: ${quantity}`,
    `• Pickup or Delivery: ${fulfilment ?? '—'}`,
    '',
    `Name: ${name?.trim() ? name.trim() : ''}`,
    isDelivery ? `Delivery address: ${address?.trim() ? address.trim() : ''}` : null,
    'Preferred time:',
  ].filter(Boolean);

  return lines.join('\n');
}

export function whatsappOrderLink(payload: OrderPayload): string {
  const text = encodeURIComponent(buildWhatsAppMessage(payload));
  return `https://wa.me/${SITE.whatsappNumber}?text=${text}`;
}

// Generic "say hi / general order" link used by hero + nav CTAs.
export const WHATSAPP_HELLO = whatsappOrderLink({ product: '' }).replace(
  encodeURIComponent('• Product: '),
  encodeURIComponent('• Product: '),
);

export function genericWhatsAppLink(message?: string): string {
  const text = encodeURIComponent(
    message ??
      "Hello CO3 👋\n\nI'd like to place an order. Could you share today's fresh menu?",
  );
  return `https://wa.me/${SITE.whatsappNumber}?text=${text}`;
}
