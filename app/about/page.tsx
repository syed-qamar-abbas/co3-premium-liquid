import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import OrderCTA from '@/components/OrderCTA';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';
import { STATS } from '@/lib/content';
import Counter from '@/components/Counter';

export const metadata: Metadata = {
  title: 'About CO3 — Our Story',
  description:
    'CO3 Premium Liquid Shop was created for people who appreciate moments, flavours and experiences. Learn the story behind Rawalpindi’s premium bubble tea, coffee and ice cream destination.',
  alternates: { canonical: '/about/' },
};

const VALUES = [
  { icon: '🌿', title: 'Freshness is non-negotiable', body: 'We prep daily and make to order. If it’s not fresh, it doesn’t leave the bar.' },
  { icon: '💎', title: 'Premium, not pretentious', body: 'The best ingredients, served warmly and priced fairly. Luxury you can order on a Tuesday.' },
  { icon: '🤍', title: 'Hospitality first', body: 'Fast replies, kind service and a drink made exactly how you like it. Every time.' },
];

export default function AboutPage() {
  const schema = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />

      <PageHero
        eyebrow="Our Story"
        title="Created for people who savour the moment"
        intro="CO3 Premium Liquid Shop was built on a simple belief: an everyday drink can be an experience worth remembering."
        breadcrumb={[
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about/' },
        ]}
      />

      {/* Story */}
      <section className="bg-cream-warm py-20 sm:py-28">
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gold/10 blur-2xl" />
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#016873] to-[#013A41] shadow-lift">
                <span className="text-[9rem]">🥤</span>
                <div className="pointer-events-none absolute inset-4 rounded-[2rem] border border-gold/30" />
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Why we exist"
              title="Every drink, crafted like it matters"
              align="left"
            />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink/70">
              <p>
                CO3 Premium Liquid Shop was created for people who appreciate moments, flavours and
                experiences. We started with a question: why should a bubble tea, a coffee or a
                scoop of ice cream feel ordinary?
              </p>
              <p>
                So we built the opposite. Every drink is crafted fresh using premium ingredients,
                real fruits and carefully selected toppings to deliver a memorable experience — the
                kind you photograph before you sip.
              </p>
              <p>
                From ceremonial-grade matcha to single-origin espresso and slow-churned Belgian
                chocolate ice cream, we sweat the details most places skip. Because to the person
                holding the cup, the details are the whole point.
              </p>
            </div>
            <Link href="/menu/" className="btn-gold mt-8">
              Explore the menu
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="What we stand for"
            title="Three things we refuse to compromise on"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} i={i} as="article">
                <div className="glass-card h-full p-8">
                  <span className="text-4xl">{v.icon}</span>
                  <h3 className="mt-5 font-display text-xl text-teal">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 divide-x divide-gold/20 rounded-3xl bg-teal-luxe py-10 text-center text-cream-warm">
            {STATS.map((s) => (
              <div key={s.label} className="px-3">
                <p className="font-display text-4xl font-bold text-gold sm:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs uppercase tracking-wide2 text-cream/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OrderCTA />
    </>
  );
}
