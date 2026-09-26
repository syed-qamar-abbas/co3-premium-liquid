import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import OrderCTA from '@/components/OrderCTA';
import Reveal from '@/components/Reveal';
import { breadcrumbSchema, faqSchema, serviceAreaPageSchema, jsonLd } from '@/lib/schema';
import { SITE, genericWhatsAppLink } from '@/lib/site';

const phaseAreas = [
  'Phase 1',
  'Phase 2',
  'Phase 3',
  'Phase 4',
  'Phase 5',
  'Phase 6',
  'Phase 7',
  'Phase 8',
];

const localFaqs = [
  {
    q: 'Does CO3 deliver to Bahria Town Phase 1 to 8?',
    a: 'CO3 Premium Liquid Shop is based in Bahria Town Phase 4, Rawalpindi and serves customers across Bahria Town Phase 1–8 through pickup and WhatsApp ordering. Delivery availability and rider fee depend on the exact address and are confirmed before the order is dispatched.',
  },
  {
    q: 'What can I order from CO3 in Bahria Town Rawalpindi?',
    a: 'Customers can order boba milk tea, ceremonial matcha, hot and iced coffee, premium ice cream, shakes, bubble soda, mocktails, mojitos, margaritas, lassi and tea. The live menu is available on the website, and every product card opens a pre-filled WhatsApp order.',
  },
  {
    q: 'Is CO3 relevant for Islamabad customers?',
    a: 'Yes. CO3 primarily serves Bahria Town Rawalpindi and nearby Rawalpindi/Islamabad customers who want premium drinks, coffee, bubble tea and ice cream. Islamabad customers should confirm delivery availability by sharing their exact location on WhatsApp before placing the order.',
  },
];

export const metadata: Metadata = {
  title: 'Bubble Tea, Coffee & Ice Cream in Bahria Town Phase 1–8',
  description:
    'Order CO3 bubble tea, coffee, matcha, ice cream, shakes and sodas across Bahria Town Phase 1–8, Rawalpindi and nearby Islamabad areas. Pickup and WhatsApp ordering available.',
  alternates: { canonical: '/bahria-town-rawalpindi/' },
  openGraph: {
    title: 'CO3 in Bahria Town Phase 1–8 | Rawalpindi & Islamabad',
    description:
      'A premium local drinks and dessert shop serving Bahria Town Rawalpindi, nearby Rawalpindi areas and Islamabad customers through pickup and WhatsApp ordering.',
    images: [
      {
        url: '/images/gallery/g-05.webp',
        width: 1200,
        height: 900,
        alt: 'CO3 Premium Liquid Shop storefront in Bahria Town Rawalpindi',
      },
    ],
  },
};

export default function BahriaTownRawalpindiPage() {
  const schema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Bahria Town Rawalpindi', path: '/bahria-town-rawalpindi/' },
    ]),
    serviceAreaPageSchema(),
    faqSchema(localFaqs),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />

      <PageHero
        eyebrow="Bahria Town Rawalpindi"
        title="Bubble tea, coffee & ice cream for Bahria Phase 1–8"
        intro="CO3 Premium Liquid Shop is based in Bahria Town Phase 4 and serves Bahria Town Phase 1–8, nearby Rawalpindi areas and Islamabad customers with fresh premium drinks, scoops and WhatsApp ordering."
        breadcrumb={[
          { name: 'Home', href: '/' },
          { name: 'Bahria Town Rawalpindi', href: '/bahria-town-rawalpindi/' },
        ]}
      />

      <section className="bg-cream-warm py-16 sm:py-24">
        <div className="container-luxe grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-gold/20 bg-teal-luxe p-3 shadow-lift sm:rounded-[2.75rem]">
              <img
                src="/images/gallery/g-05.webp"
                srcSet="/images/gallery/g-05-480.webp 480w, /images/gallery/g-05-768.webp 768w, /images/gallery/g-05.webp 1000w"
                sizes="(max-width: 1024px) 92vw, 580px"
                alt="CO3 Premium Liquid Shop storefront in Bahria Town Rawalpindi at night"
                width={1000}
                height={1250}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-[1.5rem] object-cover sm:rounded-[2.25rem]"
              />
              <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] ring-1 ring-cream/25 sm:rounded-[2.25rem]" />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Local answer"
              title="Where CO3 fits in the twin-cities market"
              intro="CO3 is a premium beverage and dessert-drink shop for people in Bahria Town Rawalpindi and nearby Islamabad who want café-level drinks without a complicated ordering flow."
              align="left"
            />
            <div className="mt-7 space-y-4 text-[15px] leading-relaxed text-ink/70">
              <p>
                The shop’s confirmed location is {SITE.address.street}, {SITE.address.city}. From
                there, CO3 serves customers around Bahria Town Phase 1–8 with boba milk tea,
                ceremonial matcha, espresso drinks, ice cream, bubble soda, mocktails, shakes and
                tea.
              </p>
              <p>
                Every product on the menu has an order button that opens WhatsApp with the item,
                flavour, size and quantity ready to send. For delivery, share your exact address so
                the team can confirm availability and any rider fee before dispatch.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={genericWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                Order on WhatsApp
              </a>
              <Link href="/menu/" className="btn-outline">
                View full menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Service area"
            title="Bahria Town Phase 1–8, clearly served"
            intro="One real Bahria Town location, clear ordering, and no fake branch claims."
          />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {phaseAreas.map((phase) => (
              <Reveal key={phase} as="div">
                <div className="rounded-2xl border border-teal/10 bg-cream-warm px-4 py-5 text-center shadow-soft">
                  <p className="font-display text-xl text-teal">{phase}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide2 text-ink/45">Bahria Town</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-warm py-16 sm:py-24">
        <div className="container-luxe grid gap-6 lg:grid-cols-3">
          {localFaqs.map((item, i) => (
            <Reveal key={item.q} i={i} as="article">
              <div className="h-full rounded-3xl border border-teal/10 bg-cream p-7 shadow-soft">
                <h2 className="font-display text-2xl leading-tight text-teal">{item.q}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{item.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <OrderCTA
        title="Ordering from Bahria Town or Islamabad?"
        subtitle="Tap WhatsApp, send your favourite product and exact location, and CO3 will confirm pickup or delivery before preparing it fresh."
      />
    </>
  );
}
