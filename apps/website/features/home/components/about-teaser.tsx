import Link from 'next/link';

import { SectionHeader } from '@/components/section-header';

const FACTS = [
  { label: 'UAE Golden Visa', value: 'no sponsorship needed' },
  { label: 'Available', value: 'January 2027' },
  { label: 'Languages', value: 'English and Arabic' },
];

export function AboutTeaser() {
  return (
    <section className="section" data-tone="bone" aria-labelledby="about-title">
      <SectionHeader eyebrow="About" value="Available January 2027" as="p" />

      <div className="grid-12">
        <div className="col-span-12 lg:col-span-5">
          <h2 id="about-title" className="display h2-size text-fg" data-reveal>
            Forward
            <br />
            Deployed
          </h2>
        </div>

        <div className="col-span-12 mt-8 lg:col-span-7 lg:mt-0">
          <div className="prose-body body-lg space-y-5 text-fg/72" data-reveal>
            <p>
              I&apos;m Ahmad, a Computer Engineering senior at the American
              University of Sharjah who ships production systems. My work
              centers on applied AI: LLM systems with real cost governance, real
              evaluation, and real stakeholders. Most recently at Samsung Gulf
              Electronics, I architected and solely built a trend intelligence
              platform for the regional marketing team.
            </p>
            <p>
              I work as a forward deployed engineer: technical enough to build
              the system, comfortable enough with stakeholders to scope it. That
              includes the product work: turning ambiguous requirements into a
              scoped roadmap, prioritizing what ships first, and measuring
              whether it worked.
            </p>
            <p>
              I hold a UAE Golden Visa, so no employer sponsorship is required.
              I graduate in December 2026 and I am available to start January
              2027.
            </p>
          </div>

          <dl className="facts mt-10" data-reveal>
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-10" data-reveal>
            <Link href="/about" className="text-link mono-label text-fg">
              More about me
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
