import { Headshot } from '@/components/headshot';
import { HeroVideo } from '@/components/hero-video';
import { PillLink } from '@/components/pill-link';
import { USER } from '@/config/user';
import { stagger } from '@/lib/stagger';

export function Hero() {
  return (
    <section
      className="section hero has-media"
      data-tone="ink"
      aria-labelledby="hero-name"
    >
      <HeroVideo
        src="/about/drive-1080.mp4"
        srcMobile="/about/drive-720.mp4"
        poster="/about/drive-poster.jpg"
        posterWebp="/about/drive-poster.webp"
        width={1920}
        height={1080}
        tone="vivid"
        priority
      />

      <div className="hero-copy">
        <div className="rise flex items-center gap-4" style={stagger(0)}>
          <Headshot
            size={56}
            priority
            className="ring-2 ring-apricot ring-offset-2 ring-offset-ink"
          />
          <p className="eyebrow">AI Engineer · Sharjah, UAE</p>
        </div>

        <h1 id="hero-name" className="display hero-size mt-5 md:mt-6">
          <span className="block rise-name" style={stagger(1)}>
            {USER.firstName}
          </span>{' '}
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
          <PillLink href={USER.social.linkedin} variant="fill" external>
            LinkedIn
          </PillLink>
          <PillLink href="/Ahmad_Saad_CV.pdf" variant="fill" external>
            CV
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
