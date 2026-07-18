import { AGENCY_ATTRIBUTION, getAgencyAttributionUrl } from '@/lib/agency';

interface FooterAttributionProps {
  className?: string;
}

export default function FooterAttribution({ className = '' }: FooterAttributionProps) {
  const agencyUrl = getAgencyAttributionUrl();

  return (
    <p className={`text-center text-[11px] leading-relaxed tracking-[0.16em] text-cream/40 ${className}`}>
      Website designed &amp; developed by{' '}
      <a
        href={agencyUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${AGENCY_ATTRIBUTION.agencyName} website — opens in a new tab`}
        className="rounded-sm font-semibold text-cream/60 underline decoration-gold/35 underline-offset-4 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-teal"
      >
        {AGENCY_ATTRIBUTION.agencyName}
      </a>
    </p>
  );
}
