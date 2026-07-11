import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { WhatsAppIcon } from '@/components/OrderModal';
import { breadcrumbSchema, restaurantSchema, jsonLd } from '@/lib/schema';
import { SITE, genericWhatsAppLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact & Location — Order, Visit or Enquire',
  description:
    'Contact CO3 Premium Liquid Shop in Bahria Town, Rawalpindi. Order on WhatsApp at 0303 6303111, call us, or send an enquiry. Open daily from noon until late. Pickup & delivery available.',
  alternates: { canonical: '/contact/' },
};

const CONTACTS = [
  { icon: '💬', label: 'WhatsApp (fastest)', value: SITE.phoneDisplay, href: genericWhatsAppLink() },
  { icon: '📞', label: 'Call us', value: SITE.phoneDisplay, href: `tel:${SITE.phoneIntl}` },
  { icon: '✉️', label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: '📍', label: 'Visit', value: `${SITE.address.street}, ${SITE.address.city}`, href: SITE.social.googleMaps },
];

export default function ContactPage() {
  const schema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact/' },
    ]),
    restaurantSchema(),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />

      <PageHero
        eyebrow="Say Hello"
        title="Order, visit or just say hi"
        intro="The fastest way to order is WhatsApp — tap below and we’ll prepare your drink fresh. For events, catering or anything else, the form reaches our team directly."
        breadcrumb={[
          { name: 'Home', href: '/' },
          { name: 'Contact', href: '/contact/' },
        ]}
      />

      <section className="bg-cream py-16 sm:py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-2">
          {/* Left: details */}
          <div>
            <a href={genericWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full sm:w-auto">
              <WhatsAppIcon /> Order on WhatsApp — {SITE.phoneDisplay}
            </a>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {CONTACTS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 rounded-2xl border border-teal/10 bg-cream-warm p-5 transition hover:border-gold/40 hover:shadow-glass"
                >
                  <span className="text-2xl">{c.icon}</span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide2 text-ink/50">
                      {c.label}
                    </span>
                    <span className="mt-1 block font-display text-lg text-teal">{c.value}</span>
                  </span>
                </a>
              ))}
            </div>

            {/* Hours */}
            <div className="mt-6 rounded-2xl border border-teal/10 bg-cream-warm p-6">
              <h3 className="font-display text-lg text-teal">Opening Hours</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-ink/65">
                <li className="flex justify-between"><span>Monday – Thursday & Sunday</span> <span className="font-medium">12:00 PM – 12:00 AM</span></li>
                <li className="flex justify-between"><span>Friday – Saturday</span> <span className="font-medium">12:00 PM – 2:00 AM</span></li>
              </ul>
              <p className="mt-3 text-xs text-ink/45">Pickup & delivery across Rawalpindi and Islamabad.</p>
            </div>

            {/* Map */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-teal/10">
              <iframe
                title="CO3 Premium Liquid Shop location"
                src="https://www.google.com/maps?q=Bahria+Town+Rawalpindi&output=embed"
                width="100%"
                height="260"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full grayscale-[20%]"
              />
            </div>
          </div>

          {/* Right: form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
