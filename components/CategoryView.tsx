import PageHero from './PageHero';
import LiveProductGrid from './LiveProductGrid';
import OrderCTA from './OrderCTA';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import GeoAnswers from './GeoAnswers';
import type { Category, Product } from '@/lib/products';

export interface CategoryFeature {
  icon: string;
  title: string;
  body: string;
}

/**
 * CategoryView — shared layout for Signature / Ice Cream / Coffee / Tea pages.
 * Hero → "why this category" feature band → product grid → closing CTA.
 * Keeps every category page on-brand while letting copy stay bespoke.
 */
export default function CategoryView({
  eyebrow,
  title,
  intro,
  breadcrumb,
  features,
  products,
  liveCategories,
  liveBadge,
  ctaTitle,
  showAnswers = false,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  breadcrumb: { name: string; href: string }[];
  features: CategoryFeature[];
  products: Product[];
  liveCategories?: Category[];
  liveBadge?: 'bestseller' | 'signature' | 'new' | 'seasonal';
  ctaTitle?: string;
  showAnswers?: boolean;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} breadcrumb={breadcrumb} />

      {/* Feature band */}
      <section className="bg-cream-warm py-16 sm:py-20">
        <div className="container-luxe grid gap-6 sm:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} i={i} as="article">
              <div className="flex h-full gap-4 rounded-3xl border border-teal/10 bg-cream p-6">
                <span className="text-3xl">{f.icon}</span>
                <div>
                  <h3 className="font-display text-lg text-teal">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{f.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="The Selection"
            title="Pick yours, order in seconds"
            intro="Tap any item to choose your size and quantity — it opens WhatsApp with your order pre-filled."
            align="left"
          />
          <div className="mt-12">
            <LiveProductGrid
              fallbackProducts={products}
              categories={liveCategories}
              badge={liveBadge}
            />
          </div>
        </div>
      </section>

      {showAnswers && <GeoAnswers />}

      <OrderCTA title={ctaTitle} />
    </>
  );
}
