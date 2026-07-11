import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import GalleryClient from '@/components/GalleryClient';
import OrderCTA from '@/components/OrderCTA';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';
import { GALLERY } from '@/lib/content';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Gallery — The CO3 Look',
  description:
    'A visual taste of CO3 Premium Liquid Shop: blueberry boba pours, whisked matcha, espresso extraction, pistachio scoops and more. Premium drinks, photographed in Rawalpindi.',
  alternates: { canonical: '/gallery/' },
};

export default function GalleryPage() {
  const imageGallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'CO3 Premium Liquid Shop Gallery',
    description: 'Premium bubble tea, coffee and ice cream at CO3 Premium Liquid Shop, Rawalpindi.',
    image: GALLERY.map((g) => `${SITE.domain}/images/gallery/${g.id}.webp`),
  };

  const schema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Gallery', path: '/gallery/' },
    ]),
    imageGallerySchema,
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />

      <PageHero
        eyebrow="In Pictures"
        title="Almost as good as tasting it"
        intro="Every cup is built to look as good as it tastes. Here’s a glimpse of the pours, swirls and scoops coming out of our bar — follow along on Instagram for the full reel."
        breadcrumb={[
          { name: 'Home', href: '/' },
          { name: 'Gallery', href: '/gallery/' },
        ]}
      />

      <section className="bg-cream py-16 sm:py-24">
        <div className="container-luxe">
          <GalleryClient />
          <p className="mt-10 text-center text-sm text-ink/50">
            Want your order to look like this? It will.{' '}
            <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal underline-gold">
              Follow @co3premium
            </a>
          </p>
        </div>
      </section>

      <OrderCTA title="Taste what you see" />
    </>
  );
}
