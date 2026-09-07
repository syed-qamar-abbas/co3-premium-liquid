// CO3 Premium Liquid Shop — Structured data (JSON-LD).
// Schema is the backbone of GEO/SGE/LLMO: it lets Google, AI Overviews and
// LLMs read the business as structured facts, not just prose.

import { SITE } from './site';
import { PRODUCTS, CATEGORIES, fromPrice, type Product } from './products';
import { AGENCY_ATTRIBUTION, getAgencyAttributionUrl } from './agency';

const url = (path = '') => `${SITE.domain}${path}`;
const agencyUrl = (path = '') => `${AGENCY_ATTRIBUTION.agencyUrl.replace(/\/+$/, '')}${path}`;

// ── Restaurant / LocalBusiness (sitewide, lives in <head>) ──────────
export function restaurantSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Restaurant', 'CafeOrCoffeeShop', 'LocalBusiness'],
    '@id': url('/#business'),
    name: SITE.name,
    legalName: SITE.legalName,
    description: SITE.description,
    url: url('/'),
    telephone: SITE.phoneIntl,
    email: SITE.email,
    image: url('/images/gallery/g-05.webp'),
    logo: url('/images/brand/co3-logo-transparent.png'),
    priceRange: SITE.priceRange,
    currenciesAccepted: SITE.currency,
    paymentAccepted: 'Cash, Card, JazzCash, EasyPaisa, Bank Transfer',
    servesCuisine: ['Bubble Tea', 'Coffee', 'Ice Cream', 'Desserts', 'Beverages'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed: SITE.areasServed.map((name) => ({ '@type': 'Place', name })),
    hasMap: SITE.social.googleMaps,
    openingHoursSpecification: SITE.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: SITE.rating.value,
      reviewCount: SITE.rating.count,
      bestRating: SITE.rating.best,
    },
    sameAs: [
      SITE.social.instagram,
      SITE.social.facebook,
      SITE.social.tiktok,
    ],
    potentialAction: {
      '@type': 'OrderAction',
      target: SITE.social.whatsapp,
      deliveryMethod: ['http://purl.org/goodrelations/v1#DeliveryModePickUp', 'http://purl.org/goodrelations/v1#DeliveryModeOwnFleet'],
    },
    hasMenu: url('/menu/'),
  };
}

// ── Organization + WebSite (knowledge-graph anchors) ────────────────
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': url('/#organization'),
    name: SITE.name,
    url: url('/'),
    logo: url('/images/brand/co3-logo-transparent.png'),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phoneIntl,
      contactType: 'sales',
      areaServed: 'PK',
      availableLanguage: ['English', 'Urdu'],
    },
    sameAs: [SITE.social.instagram, SITE.social.facebook, SITE.social.tiktok],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': url('/#website'),
    url: url('/'),
    name: SITE.name,
    description: SITE.description,
    inLanguage: 'en-PK',
    publisher: { '@id': url('/#organization') },
    creator: { '@id': agencyUrl('/#organization') },
  };
}

// ── Agency attribution schema ──────────────────────────────────────
// A single credited organization node for the website creator. This keeps the
// branded footer attribution machine-readable without duplicating CO3's own
// Organization schema or using manipulative anchor text.
export function agencyOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': agencyUrl('/#organization'),
    name: AGENCY_ATTRIBUTION.agencyName,
    url: AGENCY_ATTRIBUTION.agencyUrl,
    logo: url(AGENCY_ATTRIBUTION.logoPath),
    email: AGENCY_ATTRIBUTION.contact.email,
    telephone: AGENCY_ATTRIBUTION.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: AGENCY_ATTRIBUTION.contact.address.street,
      addressLocality: AGENCY_ATTRIBUTION.contact.address.city,
      addressRegion: AGENCY_ATTRIBUTION.contact.address.region,
      postalCode: AGENCY_ATTRIBUTION.contact.address.postalCode,
      addressCountry: AGENCY_ATTRIBUTION.contact.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: AGENCY_ATTRIBUTION.contact.phone,
      email: AGENCY_ATTRIBUTION.contact.email,
      areaServed: 'PK',
      availableLanguage: ['English', 'Urdu'],
    },
    ...(AGENCY_ATTRIBUTION.founder
      ? {
          founder: {
            '@type': 'Person',
            name: AGENCY_ATTRIBUTION.founder.name,
            jobTitle: AGENCY_ATTRIBUTION.founder.jobTitle,
          },
        }
      : {}),
    ...(AGENCY_ATTRIBUTION.sameAs.length ? { sameAs: AGENCY_ATTRIBUTION.sameAs } : {}),
  };
}

export function websiteAttributionSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': url('/#website-credit'),
    name: `${SITE.name} website design and development`,
    url: url('/'),
    creator: { '@id': agencyUrl('/#organization') },
    about: { '@id': url('/#business') },
    creditText: `Website designed & developed by ${AGENCY_ATTRIBUTION.agencyName}`,
    isBasedOn: getAgencyAttributionUrl(),
  };
}

// ── Full Menu schema ────────────────────────────────────────────────
export function menuSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': url('/menu/#menu'),
    name: `${SITE.name} Menu`,
    description: 'Bubble tea, coffee, tea, ice cream, mocktails and smoothies — crafted fresh in Rawalpindi.',
    inLanguage: 'en-PK',
    hasMenuSection: CATEGORIES.map((cat) => ({
      '@type': 'MenuSection',
      name: cat.label,
      description: cat.blurb,
      hasMenuItem: PRODUCTS.filter((p) => p.category === cat.id).map((p) => ({
        '@type': 'MenuItem',
        name: p.name,
        description: p.description,
        offers: p.sizes.map((s) => ({
          '@type': 'Offer',
          name: s.label,
          price: s.price,
          priceCurrency: SITE.currency,
          availability: 'https://schema.org/InStock',
        })),
        suitableForDiet: 'https://schema.org/VegetarianDiet',
      })),
    })),
  };
}

// ── Single Product schema ───────────────────────────────────────────
export function productSchema(p: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: url(p.image),
    category: p.category,
    brand: { '@type': 'Brand', name: SITE.name },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: fromPrice(p),
      highPrice: Math.max(...p.sizes.map((s) => s.price)),
      priceCurrency: SITE.currency,
      offerCount: p.sizes.length,
      availability: 'https://schema.org/InStock',
      seller: { '@id': url('/#business') },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: SITE.rating.value,
      reviewCount: 120,
      bestRating: 5,
    },
  };
}

// ── FAQ schema ──────────────────────────────────────────────────────
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

// ── Breadcrumbs ─────────────────────────────────────────────────────
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: url(t.path),
    })),
  };
}

// ── Helper: render JSON-LD safely into a page ───────────────────────
export function jsonLd(schema: object | object[]) {
  return { __html: JSON.stringify(schema) };
}
