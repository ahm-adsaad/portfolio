import { Chip } from '@/components/chip';
import { SectionHeader } from '@/components/section-header';
import { EDUCATION } from '@/config/education';

export function Education() {
  const [gpa, scale] = EDUCATION.gpa.split('/').map((s) => s.trim());

  return (
    <section
      className="section"
      data-tone="ink"
      aria-labelledby="education-title"
    >
      <SectionHeader
        id="education-title"
        eyebrow="Education"
        value={`GPA ${gpa}`}
      />

      <div className="grid-12">
        <div className="col-span-12 lg:col-span-5" data-reveal>
          <p className="flex flex-wrap items-baseline gap-x-4">
            <span className="display hero-size text-apricot">{gpa}</span>
            <span className="display-light counter-size text-bone/72">
              / {scale}
            </span>
          </p>
        </div>

        <div className="col-span-12 mt-8 lg:col-span-7 lg:mt-0">
          <div data-reveal>
            <h3 className="display h3-size text-bone">
              <a
                href={EDUCATION.url}
                className="transition-colors hover:text-apricot"
                target="_blank"
                rel="noopener noreferrer"
              >
                {EDUCATION.school}
              </a>
            </h3>
            <p className="body-lg mt-5 text-bone/88">{EDUCATION.degree}</p>
            <p className="mono-label mt-2 text-bone/56">
              {EDUCATION.period} · {EDUCATION.city}
            </p>
          </div>

          <ul
            className="prose-body mt-8 space-y-3 border-t border-line pt-6 text-bone/72"
            data-reveal
          >
            {EDUCATION.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-4">
                <span
                  className="mt-[0.65em] h-[2px] w-5 shrink-0 bg-apricot"
                  aria-hidden="true"
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8" data-reveal>
            <p className="eyebrow">Coursework</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {EDUCATION.coursework.map((course) => (
                <li key={course} className="flex">
                  <Chip>{course}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
