'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { WhatsAppIcon } from './OrderModal';
import BrandLogo from './BrandLogo';
import { useSettings } from './SettingsProvider';

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu/' },
  { label: 'Signature', href: '/signature-drinks/' },
  { label: 'Ice Cream', href: '/ice-cream/' },
  { label: 'Coffee', href: '/coffee/' },
  { label: 'Tea', href: '/tea/' },
  { label: 'Offers', href: '/offers/' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Contact', href: '/contact/' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const s = useSettings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-all duration-500 ease-luxe ${
          scrolled
            ? 'border-gold/15 bg-cream/90 shadow-[0_4px_30px_-12px_rgba(1,58,65,0.25)]'
            : 'border-transparent bg-cream/70'
        }`}
      >
        <nav className="container-luxe flex h-[var(--nav-h)] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5" aria-label="CO3 Premium Liquid Shop home">
            <BrandLogo
              variant="nav"
              fallback={
                <>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 bg-teal font-display text-lg font-bold text-gold transition-transform duration-500 group-hover:rotate-[12deg]">
                    C3
                  </span>
                  <span className="flex flex-col leading-none">
                    <span className="font-display text-lg font-semibold text-teal">CO₃</span>
                    <span className="text-[8px] font-semibold uppercase tracking-luxe text-gold">
                      Premium Liquid Shop
                    </span>
                  </span>
                </>
              }
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 xl:flex">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors duration-300 ${
                      active ? 'text-gold' : 'text-ink/80 hover:text-teal'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA + burger */}
          <div className="flex items-center gap-3">
            <a
              href={s.waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden btn-whatsapp !px-5 !py-2.5 !text-[13px] sm:inline-flex"
            >
              <WhatsAppIcon /> Order Now
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-teal/20 text-teal xl:hidden"
            >
              <div className="flex flex-col gap-1.5">
                <span className={`h-0.5 w-5 bg-current transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
                <span className={`h-0.5 w-5 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 w-5 bg-current transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 xl:hidden"
          >
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-cream-warm px-7 pt-[calc(var(--nav-h)+1rem)] shadow-lift"
            >
              <ul className="flex flex-col gap-1">
                {NAV.map((item, idx) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + idx * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      className={`block border-b border-ink/5 py-3.5 font-display text-2xl ${
                        pathname === item.href ? 'text-gold' : 'text-teal'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <a
                href={s.waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-8 w-full"
              >
                <WhatsAppIcon /> Order on WhatsApp
              </a>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
