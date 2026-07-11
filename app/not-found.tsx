import Link from 'next/link';
import { genericWhatsAppLink } from '@/lib/site';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-teal-luxe pt-[var(--nav-h)]">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/10 blur-[100px]" />
      <div className="container-luxe relative z-10 text-center">
        <p className="font-display text-[8rem] font-bold leading-none text-shimmer">404</p>
        <h1 className="mt-2 font-display text-3xl text-cream-warm sm:text-4xl">
          This cup seems to be empty
        </h1>
        <p className="mx-auto mt-4 max-w-md text-cream/70">
          The page you’re after has melted away. Let’s get you back to something delicious.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn-gold">Back to home</Link>
          <Link href="/menu/" className="btn-outline !border-cream/30 !text-cream hover:!bg-cream hover:!text-teal">
            Browse the menu
          </Link>
          <a href={genericWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            Order on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
