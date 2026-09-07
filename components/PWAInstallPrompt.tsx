'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_CO3_APP_ICON } from './BrandLogo';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

const DISMISSED_KEY = 'co3-install-dismissed';

export default function PWAInstallPrompt() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone || window.localStorage.getItem(DISMISSED_KEY) === '1') return;

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
      setHidden(false);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
  }, []);

  const install = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome === 'accepted') {
      setHidden(true);
      setInstallEvent(null);
    }
  };

  const dismiss = () => {
    window.localStorage.setItem(DISMISSED_KEY, '1');
    setHidden(true);
  };

  if (hidden || !installEvent) return null;

  return (
    <div className="fixed inset-x-3 bottom-[5.6rem] z-[85] md:hidden">
      <div className="mx-auto flex max-w-sm items-center gap-3 rounded-2xl border border-gold/25 bg-cream-warm/95 p-2.5 shadow-lift backdrop-blur-xl">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gold/35 bg-teal text-gold">
          <img
            src={DEFAULT_CO3_APP_ICON}
            alt="CO3"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-1"
          />
        </div>
        <button
          type="button"
          onClick={install}
          className="flex-1 rounded-xl bg-teal px-4 py-2.5 text-sm font-bold text-cream-warm shadow-gold"
        >
          Install CO3
        </button>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss install prompt"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-teal/10 text-lg leading-none text-teal"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
