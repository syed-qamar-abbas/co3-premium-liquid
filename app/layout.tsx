import type { Metadata, Viewport } from 'next';
import './globals.css';

import { SITE } from '@/lib/site';
import {
  restaurantSchema,
  organizationSchema,
  websiteSchema,
  agencyOrganizationSchema,
  websiteAttributionSchema,
  jsonLd,
} from '@/lib/schema';

import LenisProvider from '@/components/LenisProvider';
import { SettingsProvider } from '@/components/SettingsProvider';
import { OrderProvider } from '@/components/OrderModal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import MobileBottomBar from '@/components/MobileBottomBar';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';

export const viewport: Viewport = {
  themeColor: '#005F68',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: 'CO3 Premium Liquid Shop | Bubble Tea, Ice Cream & Coffee in Rawalpindi',
    template: '%s | CO3 Premium Liquid Shop',
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  generator: 'Next.js',
  keywords: [
    'bubble tea Rawalpindi',
    'boba Rawalpindi',
    'best matcha Rawalpindi',
    'ice cream Rawalpindi',
    'coffee Bahria Town',
    'Spanish latte Islamabad',
    'premium drinks Rawalpindi',
    'CO3 Premium Liquid Shop',
    'milk tea near me',
    'WhatsApp food order Rawalpindi',
  ],
  category: 'Food & Beverage',
  alternates: { canonical: '/' },
  manifest: '/admin/manifest.php',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/admin/icon.php?size=192', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/admin/icon.php?size=180', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.domain,
    siteName: SITE.name,
    title: 'CO3 Premium Liquid Shop | Bubble Tea, Ice Cream & Coffee in Rawalpindi',
    description: SITE.description,
    images: [
      {
        url: '/images/og-cover.webp',
        width: 1200,
        height: 630,
        alt: 'CO3 Premium Liquid Shop — premium bubble tea, ice cream and coffee',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CO3 Premium Liquid Shop | Rawalpindi',
    description: SITE.description,
    images: ['/images/og-cover.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteSchema = [
    restaurantSchema(),
    organizationSchema(),
    websiteSchema(),
    agencyOrganizationSchema(),
    websiteAttributionSchema(),
  ];

  return (
    <html
      lang="en-PK"
      className="co3-fonts"
    >
      <head>
        <link rel="preconnect" href="https://wa.me" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(siteSchema)}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <SettingsProvider>
          <OrderProvider>
            <LenisProvider>
              <Navbar />
              <main id="main">{children}</main>
              <Footer />
              {/* spacer so the mobile bottom bar never covers footer content */}
              <div className="h-16 md:hidden" aria-hidden />
              <FloatingWhatsApp />
              <MobileBottomBar />
              <PWAInstallPrompt />
              <ServiceWorkerRegister />
            </LenisProvider>
          </OrderProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
