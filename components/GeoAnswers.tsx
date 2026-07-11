import { GEO_ANSWERS } from '@/lib/content';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

/**
 * GeoAnswers — GEO/SGE/LLMO answer blocks.
 * Each item is a self-contained, quotable Q→A written in the direct-answer
 * style that Google AI Overviews and LLMs love to cite. Rendered as semantic
 * <h3>/<p> so crawlers parse the question→answer relationship cleanly.
 */
export default function GeoAnswers() {
  return (
    <section className="bg-cream-warm py-24 sm:py-28" id="answers" aria-label="Frequently searched answers">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Good to know"
          title="Bubble tea, matcha & coffee in Rawalpindi — answered"
          intro="Everything people ask before they order. Straight answers, no fluff."
          align="left"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {GEO_ANSWERS.map((item, i) => (
            <Reveal key={item.q} i={i} as="article">
              <div className="h-full rounded-3xl border border-teal/10 bg-cream p-7">
                <h3 className="font-display text-xl text-teal">{item.q}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{item.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
