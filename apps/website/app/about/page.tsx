import { Breadcrumb } from '@/components/breadcrumb';
import { CredentialBadge } from '@/components/credential-badge';
import { Headshot } from '@/components/headshot';
import { HeroVideo } from '@/components/hero-video';
import { PillLink } from '@/components/pill-link';
import { SectionHeader } from '@/components/section-header';
import { ABOUT_INTRO, ABOUT_SECTIONS } from '@/config/about';
import { CERTIFICATIONS } from '@/config/education';
import { USER } from '@/config/user';
import { createOgImage } from '@/lib/createOgImage';
import { formatIndex } from '@/lib/project-index';
import { JsonLd } from '@/lib/seo/json-ld';
import { createMetadata } from '@/lib/seo/metadata';
import { personStub } from '@/lib/seo/project-schema';
import { SITE_URL } from '@/lib/server-url';
import { stagger } from '@/lib/stagger';
import Link from 'next/link';
import type { Metadata } from 'next/types';
import type { Graph } from 'schema-dts';

export const dynamic = 'force-static';

const PATH = '/about';
const TITLE = `About ${USER.name} | AI Engineer, AUS Computer Engineering`;
const DESCRIPTION =
  'Ahmad Saad, an AI engineer and Computer Engineering senior at the American University of Sharjah, formerly at Samsung Gulf Electronics. Available January 2027.';

export function generateMetadata(): Metadata {
  return createMetadata({
    title: TITLE,
    absoluteTitle: true,
    description: DESCRIPTION,
    path: PATH,
    image: createOgImage({
      title: `About ${USER.name}`,
      meta: 'Computer & AI Engineer · UAE',
    }),
  });
}

const jsonLd: Graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${SITE_URL}${PATH}#page`,
      url: `${SITE_URL}${PATH}`,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: 'en-US',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@id': `${SITE_URL}/#person` },
      about: { '@id': `${SITE_URL}/#person` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        '@id': `${SITE_URL}/#headshot`,
        url: USER.image.profile,
        width: String(USER.image.width),
        height: String(USER.image.height),
        caption: USER.name,
      },
      breadcrumb: { '@id': `${SITE_URL}${PATH}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}${PATH}#breadcrumb`,
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
          item: `${SITE_URL}${PATH}`,
        },
      ],
    },
    personStub(),
  ],
};

const linkClass =
  'font-medium text-fg underline decoration-accent-strong underline-offset-4 transition-colors hover:text-accent-strong';

const slug = (heading: string) =>
  heading.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export default function AboutPage() {
  const last = ABOUT_SECTIONS.length - 1;

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

      {ABOUT_SECTIONS.map((section, i) => {
        const id = `about-${slug(section.heading)}`;
        return (
          <section
            key={section.heading}
            className="section"
            data-tone={i % 2 ? 'ink' : 'bone'}
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
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                </div>

                {i === last ? (
                  <div
                    className="mt-12 border-line border-t pt-10"
                    data-reveal
                    style={stagger(1)}
                  >
                    <p className="prose-body body-lg text-fg/72">
                      See the{' '}
                      <Link href="/projects" className={linkClass}>
                        projects
                      </Link>{' '}
                      or go back to the{' '}
                      <Link href="/" className={linkClass}>
                        homepage
                      </Link>
                      .
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <PillLink href={`mailto:${USER.email}`} variant="fill">
                        Email
                      </PillLink>
                      <PillLink href={USER.social.linkedin} external>
                        LinkedIn
                      </PillLink>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
