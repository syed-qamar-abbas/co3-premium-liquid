export type AgencyAttributionType = 'homepage' | 'portfolio' | 'case-study';

export interface AgencyAttributionConfig {
  agencyName: string;
  agencyUrl: string;
  attributionType: AgencyAttributionType;
  clientSlug: string;
  logoPath: string;
  contact: {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      region: string;
      postalCode: string;
      country: string;
    };
  };
  founder?: {
    name: string;
    jobTitle: string;
  };
  sameAs: string[];
}

export const AGENCY_ATTRIBUTION: AgencyAttributionConfig = {
  agencyName: 'Crea8iv Media',
  agencyUrl: 'https://crea8ivmedia.com',
  attributionType: 'homepage',
  clientSlug: 'co3-premium-liquid-shop',
  logoPath: '/images/agency/crea8iv-media-logo.png',
  contact: {
    email: 'info@crea8ivmedia.com',
    phone: '+923135147935',
    address: {
      street: 'Office No 01, 1st Floor, Plaza 54, Phase 4 Civic Center, Bahria Town',
      city: 'Rawalpindi',
      region: 'Punjab',
      postalCode: '46220',
      country: 'PK',
    },
  },
  founder: {
    name: 'Syed Qamar Abbas',
    jobTitle: 'Founder & CEO',
  },
  sameAs: [],
};

export function getAgencyAttributionUrl(config = AGENCY_ATTRIBUTION): string {
  const baseUrl = config.agencyUrl.replace(/\/+$/, '');
  const slug = config.clientSlug.trim().replace(/^\/+|\/+$/g, '');

  if (!slug || config.attributionType === 'homepage') {
    return baseUrl;
  }

  const encodedSlug = slug
    .split('/')
    .map((part) => encodeURIComponent(part))
    .join('/');

  if (config.attributionType === 'portfolio') {
    return `${baseUrl}/portfolio/${encodedSlug}`;
  }

  return `${baseUrl}/case-studies/${encodedSlug}`;
}
