'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WhatsAppIcon } from './OrderModal';
import { useSettings } from './SettingsProvider';

/**
 * MobileBottomBar — app-style sticky action bar (mobile only).
 * Always within thumb reach: browse the menu, call, or fire a WhatsApp order.
 * Respects the iOS safe-area inset so it clears the home indicator.
 */
export default function MobileBottomBar() {
  const pathname = usePathname();
  const s = useSettings();
  const onMenu = pathname?.startsWith('/menu');

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-gold/25 bg-cream-warm/95 shadow-[0_-18px_45px_-28px_rgba(1,58,65,0.65)] backdrop-blur-xl md:hidden"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center gap-2 px-3 pt-2">
        <Link
          href="/menu/"
          className={`flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-1.5 text-[10px] font-bold transition ${
            onMenu ? 'text-gold' : 'text-teal'
          }`}
        >
          <span className="text-lg leading-none">🍹</span>
          Menu
        </Link>

        <a
          href={`tel:${s.phoneIntl}`}
          className="flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-1.5 text-[10px] font-bold text-teal transition"
        >
          <span className="text-lg leading-none">📞</span>
          Call
        </a>

        <a
          href={s.waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-[2.2] items-center justify-center gap-2 rounded-full bg-teal py-3 text-sm font-extrabold text-cream-warm shadow-gold ring-1 ring-gold/25"
        >
          <WhatsAppIcon className="h-4 w-4" /> Order Now
        </a>
      </div>
    </div>
  );
}
