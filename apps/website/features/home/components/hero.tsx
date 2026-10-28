import type { CSSProperties } from 'react';

import { PillLink } from '@/components/pill-link';
import { USER } from '@/config/user';
import { Radar } from './radar';

const stagger = (i: number) => ({ '--i': i }) as CSSProperties;

export function Hero() {
  return (
    <section
      className="section hero"
      data-tone="ink"
      aria-labelledby="hero-name"
    >
      <Radar />

      <div className="hero-copy">
        <p className="eyebrow rise" style={stagger(0)}>
          AI Engineer · FDE · Computer Engineering @ AUS · UAE
        </p>

        <h1 id="hero-name" className="display hero-size mt-5 md:mt-6">
          <span className="block rise-name" style={stagger(1)}>
            {USER.firstName}
          </span>
          <span className="block rise-name" style={stagger(2)}>
            {USER.lastName}
          </span>
        </h1>

        <p
          className="display-light counter-size rise mt-8 max-w-[30ch] text-bone/88 md:mt-10"
          style={stagger(3)}
        >
          Forward deployed. Builds the system, scopes it with the people who use
          it, ships it.
        </p>

        <div
          className="rise mt-8 flex flex-wrap gap-3 md:mt-10"
          style={stagger(4)}
        >
          <PillLink href={`mailto:${USER.email}`} variant="fill">
            Email
          </PillLink>
          <PillLink href={USER.social.linkedin} variant="outline" external>
            LinkedIn
          </PillLink>
        </div>
      </div>

      <p
        className="hero-cue rise hidden md:inline-flex"
        style={stagger(5)}
        aria-hidden="true"
      >
        Scroll
      </p>
    </section>
  );
}
