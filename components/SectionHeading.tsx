import Reveal from './Reveal';

/**
 * SectionHeading — consistent eyebrow + display title + intro used across
 * every section, so the typographic rhythm stays disciplined site-wide.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  light = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'center' | 'left';
  light?: boolean;
}) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start';
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal i={1}>
        <h2
          className={`text-fluid-h2 font-semibold leading-[1.05] ${
            light ? 'text-cream-warm' : 'text-teal'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal i={2}>
          <p className={`text-base leading-relaxed sm:text-lg ${light ? 'text-cream/75' : 'text-ink/65'}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
