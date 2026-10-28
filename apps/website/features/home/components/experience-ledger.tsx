import type { CSSProperties } from 'react';

import { Chip } from '@/components/chip';
import { SectionHeader } from '@/components/section-header';
import { type Experience, experiences } from '@/config/experience';
import { formatPeriod } from '@/lib/format-period';

/** "MM.YYYY" or "YYYY" -> sortable YYYYMM. */
const dateKey = (value: string) => {
  const [a, b] = value.split('.');
  return b ? Number(b) * 100 + Number(a) : Number(a) * 100 + 1;
};

const yearOf = (value: string) => Number(value.split('.').pop());

/** Company span from its positions: earliest start to latest end or Present. */
function companyPeriod(experience: Experience) {
  const starts = experience.positions.map((p) => p.employmentPeriod.start);
  const start = starts.reduce((a, b) => (dateKey(a) <= dateKey(b) ? a : b));
  const open = experience.positions.some((p) => !p.employmentPeriod.end);
  if (open) return `${start} - Present`;
  const ends = experience.positions.flatMap(
    (p) => p.employmentPeriod.end ?? []
  );
  const end = ends.reduce((a, b) => (dateKey(a) >= dateKey(b) ? a : b));
  return start === end ? start : `${start} - ${end}`;
}

/** "2024 to 2026": the measured value in the section header. */
function yearSpan() {
  const years = experiences.flatMap((e) =>
    e.positions.flatMap((p) => [
      yearOf(p.employmentPeriod.start),
      ...(p.employmentPeriod.end ? [yearOf(p.employmentPeriod.end)] : []),
    ])
  );
  return `${Math.min(...years)} to ${Math.max(...years)}`;
}

export function ExperienceLedger() {
  return (
    <section
      className="section"
      data-tone="ink"
      aria-labelledby="experience-title"
    >
      <SectionHeader
        id="experience-title"
        eyebrow="Experience"
        value={yearSpan()}
      />

      <div className="ledger">
        {experiences.map((experience, i) => (
          <details
            key={experience.id}
            className="ledger-row"
            open={experience.isExpanded}
            data-reveal
            style={{ '--i': Math.min(i, 3) } as CSSProperties}
          >
            <summary className="ledger-summary">
              <h3 className="ledger-title display h3-size">
                {experience.companyName}
              </h3>
              <p className="ledger-meta">
                {companyPeriod(experience)} · {experience.city}
              </p>
              <span className="glyph" aria-hidden="true" />
            </summary>

            <div className="ledger-body">
              <div>
                {experience.positions.map((position) => (
                  <article key={position.id} className="position">
                    <h4 className="font-medium text-fg">{position.title}</h4>
                    <p className="mono-label mt-2 text-fg/48">
                      {formatPeriod(position.employmentPeriod)}
                      {position.employmentType
                        ? ` · ${position.employmentType}`
                        : null}
                    </p>

                    {position.description ? (
                      <div className="prose-body mt-5 space-y-4 text-fg/72">
                        {position.description.split('\n\n').map((paragraph) => (
                          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                        ))}
                      </div>
                    ) : null}

                    {position.skills?.length ? (
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {position.skills.map((skill) => (
                          <li key={skill} className="flex">
                            <Chip>{skill}</Chip>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
