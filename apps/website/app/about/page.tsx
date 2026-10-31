import { Breadcrumb } from '@/components/breadcrumb';
import { CredentialBadge } from '@/components/credential-badge';
import { FaqList, faqPageNode } from '@/components/faq';
import { Headshot } from '@/components/headshot';
import { HeroVideo } from '@/components/hero-video';
import { PillLink } from '@/components/pill-link';
import { RichText } from '@/components/rich-text';
import { SectionHeader } from '@/components/section-header';
import { ABOUT_INTRO, ABOUT_SECTIONS, PRESS_MENTIONS } from '@/config/about';
import { CERTIFICATIONS } from '@/config/education';
import { ABOUT_DEFINITION, ABOUT_FAQ, FAQ_HEADING } from '@/config/faq';
import { ABOUT_PUBLISHED, CONTENT_LAST_MODIFIED } from '@/config/site';
import { USER } from '@/config/user';
import { createOgImage } from '@/lib/createOgImage';
import { formatLongDate } from '@/lib/format-long-date';
import { formatIndex } from '@/lib/project-index';
import { JsonLd } from '@/lib/seo/json-ld';
import { createMetadata } from '@/lib/seo/metadata';
import {
  HEADSHOT_ID,
  PERSON_ID,
  WEBSITE_ID,
  personGraph,
  websiteStub,
} from '@/lib/seo/person';
import { SITE_URL } from '@/lib/server-url';
import { stagger } from '@/lib/stagger';
import Link from 'next/link';
import type { Metadata } from 'next/types';
import type { Graph } from 'schema-dts';

export const dynamic = 'force-static';

const PATH = '/about';
const PAGE_URL = `${SITE_URL}${PATH}`;
const TITLE = `About ${USER.name} (${USER.fullName}) | AI Engineer, AUS`;
const DESCRIPTION = `${USER.name} (${USER.fullName}) is an AI engineer, a Computer Engineering senior at the American University of Sharjah and President of Tau Beta Pi UAE Alpha.`;

export function generateMetadata(): Metadata {
  return createMetadata({
    title: TITLE,
    absoluteTitle: true,
    description: DESCRIPTION,
    path: PATH,
    image: createOgImage({
      title: `About ${USER.name}`,
      meta: `${USER.fullName} · AUS Computer Engineering`,
    }),
  });
}

const jsonLd: Graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${PAGE_URL}#page`,
      url: PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: 'en-US',
      isPartOf: { '@id': WEBSITE_ID },
      mainEntity: { '@id': PERSON_ID },
      about: { '@id': PERSON_ID },
      // The full Person (personGraph) carries the headshot ImageObject.
      primaryImageOfPage: { '@id': HEADSHOT_ID },
      hasPart: { '@id': `${PAGE_URL}#faq` },
      breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
      dateCreated: ABOUT_PUBLISHED,
      dateModified: CONTENT_LAST_MODIFIED,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About',
          item: PAGE_URL,
        },
      ],
    },
    faqPageNode(ABOUT_FAQ, PAGE_URL),
    ...personGraph(),
    websiteStub(),
  ],
};

const linkClass =
  'font-medium text-fg underline decoration-accent-strong underline-offset-4 transition-colors hover:text-accent-strong';

const slug = (heading: string) =>
  heading.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const sectionTone = (i: number) => (i % 2 ? 'bone' : 'ink');

export default function AboutPage() {
  // The Profile section is bone, so the loop starts on ink and the FAQ takes
  // the tone opposite to the last loop section.
  const questionsTone =
    sectionTone(ABOUT_SECTIONS.length - 1) === 'ink' ? 'bone' : 'ink';

  return (
    <>
      <JsonLd code={jsonLd} />

      <section
        className="section page-hero has-media"
        data-tone="ink"
        aria-labelledby="about-name"
      >
        <HeroVideo
          src="/about/drive-1080.mp4"
          srcMobile="/about/drive-720.mp4"
          poster="/about/drive-poster.jpg"
          posterWebp="/about/drive-poster.webp"
          width={1920}
          height={1080}
          tone="muted"
          priority
        />

        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'About' }]}
          className="rise"
          style={stagger(0)}
        />

        <div className="grid-12 mt-10 md:mt-14">
          <div className="col-span-12 lg:col-span-5">
            <Headshot
              size={160}
              className="rise ring-2 ring-apricot ring-offset-4 ring-offset-ink"
            />
            <p className="eyebrow rise mt-10" style={stagger(1)}>
              About
            </p>
            <h1 id="about-name" className="display h2-size mt-4 text-bone">
              <span className="block rise-name" style={stagger(2)}>
                {USER.firstName}
              </span>{' '}
              <span className="block rise-name" style={stagger(3)}>
                {USER.lastName}
              </span>
            </h1>
            {CERTIFICATIONS.length > 0 && (
              <ul className="rise mt-8 flex flex-wrap gap-3" style={stagger(4)}>
                {CERTIFICATIONS.map((credential) => (
                  <li key={credential.name} className="flex">
                    <CredentialBadge credential={credential} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="col-span-12 mt-8 lg:col-span-7 lg:mt-0 lg:self-end">
            <p
              className="display-light intro-size rise max-w-[44ch] text-bone/88"
              style={stagger(4)}
            >
              {ABOUT_INTRO}
            </p>
          </div>
        </div>
      </section>

      <section
        className="section"
        data-tone="bone"
        aria-labelledby="about-profile"
      >
        <SectionHeader as="p" eyebrow="About" value="Profile" />

        <div className="grid-12">
          <div className="col-span-12 lg:col-span-5">
            <h2
              id="about-profile"
              className="display h3-size text-fg"
              data-reveal
            >
              Profile
            </h2>
          </div>

          <div className="col-span-12 mt-8 lg:col-span-7 lg:mt-0">
            <p className="prose-body body-lg text-fg/72" data-reveal>
              {ABOUT_DEFINITION}
            </p>
          </div>
        </div>
      </section>

      {ABOUT_SECTIONS.map((section, i) => {
        const id = `about-${slug(section.heading)}`;
        return (
          <section
            key={section.heading}
            className="section"
            data-tone={sectionTone(i)}
            aria-labelledby={id}
          >
            <SectionHeader
              as="p"
              eyebrow="About"
              value={`${formatIndex(i + 1)} / ${formatIndex(ABOUT_SECTIONS.length)}`}
            />

            <div className="grid-12">
              <div className="col-span-12 lg:col-span-5">
                <h2 id={id} className="display h3-size text-fg" data-reveal>
                  {section.heading}
                </h2>
              </div>

              <div className="col-span-12 mt-8 lg:col-span-7 lg:mt-0">
                <div
                  className="prose-body body-lg space-y-5 text-fg/72"
                  data-reveal
                >
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>
                      <RichText text={paragraph} linkClassName={linkClass} />
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section
        className="section"
        data-tone={questionsTone}
        aria-labelledby="about-questions"
      >
        <SectionHeader as="p" eyebrow="About" value="Questions" />

        <div className="grid-12">
          <div className="col-span-12 lg:col-span-5">
            <h2
              id="about-questions"
              className="display h3-size text-fg"
              data-reveal
            >
              {FAQ_HEADING}
            </h2>
          </div>

          <div className="col-span-12 mt-8 lg:col-span-7 lg:mt-0">
            <div data-reveal>
              <FaqList items={ABOUT_FAQ} />
            </div>

            <div
              className="mt-12 border-line border-t pt-10"
              data-reveal
              style={stagger(1)}
            >
              <p className="prose-body body-lg text-fg/72">
                See my{' '}
                <Link href="/projects" className={linkClass}>
                  project case studies
                </Link>
                ,{' '}
                <Link href="/aus" className={linkClass}>
                  {USER.name} at AUS
                </Link>{' '}
                or the{' '}
                <Link href="/cv" className={linkClass}>
                  CV
                </Link>
                , or go back to the{' '}
                <Link href="/" className={linkClass}>
                  homepage
                </Link>
                .
              </p>
              {PRESS_MENTIONS.map((mention) => (
                <p
                  key={mention.url}
                  className="prose-body body-lg mt-5 text-fg/72"
                >
                  {mention.outlet}, {formatLongDate(mention.datePublished)}:{' '}
                  <a
                    href={mention.url}
                    className={linkClass}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {mention.headline}
                  </a>
                  .
                </p>
              ))}
              <div className="mt-8 flex flex-wrap gap-3">
                <PillLink href={`mailto:${USER.email}`} variant="fill">
                  Email
                </PillLink>
                <PillLink href={USER.social.linkedin} external>
                  LinkedIn
                </PillLink>
                <PillLink href={USER.social.github} external>
                  GitHub
                </PillLink>
                <PillLink href="/cv">CV</PillLink>
              </div>
              <p className="mono-label mt-8 text-fg/56">
                Last updated{' '}
                <time dateTime={CONTENT_LAST_MODIFIED}>
                  {formatLongDate(CONTENT_LAST_MODIFIED)}
                </time>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
