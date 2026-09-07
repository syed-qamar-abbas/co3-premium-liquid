'use client';

import Link from 'next/link';
import { WhatsAppIcon } from './OrderModal';
import BrandLogo from './BrandLogo';
import { useSettings } from './SettingsProvider';
import FooterAttribution from './FooterAttribution';

const COLS = [
  {
    title: 'Menu',
    links: [
      { label: 'Full Menu', href: '/menu/' },
      { label: 'Signature Drinks', href: '/signature-drinks/' },
      { label: 'Ice Cream', href: '/ice-cream/' },
      { label: 'Coffee', href: '/coffee/' },
      { label: 'Tea', href: '/tea/' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Seasonal Offers', href: '/offers/' },
      { label: 'Gallery', href: '/gallery/' },
      { label: 'About Us', href: '/about/' },
      { label: 'FAQ', href: '/faq/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
];

export default function Footer() {
  const s = useSettings();
  return (
    <footer className="relative overflow-hidden bg-teal-luxe text-cream/80">
      <div className="container-luxe relative z-10 grid gap-12 py-16 md:grid-cols-12">
        {/* Brand */}
        <div className="md:col-span-4">
          <div className="inline-flex items-center rounded-3xl border border-gold/25 bg-cream-warm/95 px-4 py-3 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.55)]">
            <BrandLogo
              variant="footer"
              fallback={
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 font-display text-xl font-bold text-gold">
                    C3
                  </span>
                  <div>
                    <p className="font-display text-2xl text-cream-warm">CO₃</p>
                    <p className="text-[10px] uppercase tracking-luxe text-gold">Premium Liquid Shop</p>
                  </div>
                </>
              }
            />
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/65">
            {s.description}
          </p>
          <a
            href={s.waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-6"
          >
            <WhatsAppIcon /> Order on WhatsApp
          </a>
        </div>

        {/* Link columns */}
        {COLS.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <h4 className="font-display text-lg text-gold">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream/65 transition-colors hover:text-cream-warm"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div className="md:col-span-4">
          <h4 className="font-display text-lg text-gold">Visit & Order</h4>
          <ul className="mt-4 space-y-3 text-sm text-cream/70">
            <li>📍 {s.address}</li>
            <li>
              📞{' '}
              <a href={`tel:${s.phoneIntl}`} className="hover:text-cream-warm">
                {s.phoneDisplay}
              </a>
            </li>
            <li>
              ✉️{' '}
              <a href={`mailto:${s.email}`} className="hover:text-cream-warm">
                {s.email}
              </a>
            </li>
            <li>🕑 {s.hours}</li>
          </ul>
          <div className="mt-5 flex gap-3">
            {[
              { label: 'Instagram', href: s.instagram },
              { label: 'Facebook', href: s.facebook },
              { label: 'TikTok', href: s.tiktok },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center rounded-full border border-cream/20 px-4 text-xs font-medium text-cream/70 transition hover:border-gold hover:text-gold"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="divider-gold" />
      <div className="container-luxe flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/50 lg:flex-row">
        <p>© {new Date().getFullYear()} {s.siteName}. All rights reserved.</p>
        <FooterAttribution />
        <p>Crafted fresh in Rawalpindi, Pakistan · Made with 🤍 + 🥤</p>
      </div>
    </footer>
  );
}
