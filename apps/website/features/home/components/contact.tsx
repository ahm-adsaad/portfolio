import { PillLink } from '@/components/pill-link';
import { USER } from '@/config/user';
import { stagger } from '@/lib/stagger';

export function Contact() {
  return (
    <section
      className="section contact"
      data-tone="ink"
      aria-labelledby="contact-title"
    >
      <h2
        id="contact-title"
        className="display hero-size text-bone"
        data-reveal
      >
        Let&apos;s
        <br />
        Talk.
      </h2>

      <p
        className="display-light counter-size mt-8 max-w-[30ch] text-bone/88 md:mt-10"
        data-reveal
        style={stagger(1)}
      >
        Graduating December 2026, available from January 2027.
      </p>

      <p className="mt-10 md:mt-14" data-reveal style={stagger(2)}>
        <a href={`mailto:${USER.email}`} className="email-link">
          {USER.email}
        </a>
      </p>

      <div
        className="mt-10 flex flex-wrap gap-3"
        data-reveal
        style={stagger(3)}
      >
        <PillLink href={USER.social.linkedin} external>
          LinkedIn
        </PillLink>
        <PillLink href={USER.social.github} external>
          GitHub
        </PillLink>
        <PillLink href="/Ahmad_Saad_CV.pdf" external>
          CV (PDF)
        </PillLink>
      </div>
    </section>
  );
}
