import type { CSSProperties } from 'react';

import { SectionHeader } from '@/components/section-header';
import { TECH_STACK } from '@/config/tech-stack';

const count = TECH_STACK.reduce((n, group) => n + group.items.length, 0);

/**
 * One CSS marquee per group, alternating direction. The track holds the list
 * twice so a `translateX(-50%)` loop is seamless; the copy is aria-hidden.
 * Under reduced motion the rows become static wrapped lists.
 */
export function TechMarquee() {
  return (
    <section className="section" data-tone="ink" aria-labelledby="stack-title">
      <SectionHeader
        id="stack-title"
        eyebrow="Stack"
        value={`${count} tools`}
      />

      <div data-reveal>
        {TECH_STACK.map((group, i) => (
          <div
            key={group.title}
            className="marquee"
            data-dir={i % 2 ? 'ltr' : 'rtl'}
            style={
              { '--dur': `${14 + group.items.length * 2.5}s` } as CSSProperties
            }
          >
            <p className="marquee-title mono-label text-sea">{group.title}</p>
            <ul className="marquee-track display-light marquee-size">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
              {group.items.map((item) => (
                <li key={`${item}-copy`} aria-hidden="true">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
