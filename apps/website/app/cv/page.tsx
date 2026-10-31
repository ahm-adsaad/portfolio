import { Breadcrumb } from '@/components/breadcrumb';
import { PillLink } from '@/components/pill-link';
import { RichText } from '@/components/rich-text';
import { SectionHeader } from '@/components/section-header';
import { CV_HIGHLIGHTS, CV_HONOURS, CV_PAGE } from '@/config/cv';
import { CERTIFICATIONS, EDUCATION } from '@/config/education';
import { experiences } from '@/config/experience';
import { PROJECT_PAGES } from '@/config/projects';
import { CONTENT_LAST_MODIFIED } from '@/config/site';
import { TECH_STACK } from '@/config/tech-stack';
import { USER } from '@/config/user';
import { createOgImage } from '@/lib/createOgImage';
import { formatLongDate } from '@/lib/format-long-date';
import { formatPeriod } from '@/lib/format-period';
import { formatIndex } from '@/lib/project-index';
import { JsonLd } from '@/lib/seo/json-ld';
import { createMetadata } from '@/lib/seo/metadata';
import {
  PERSON_ID,
  WEBSITE_ID,
  personGraph,
  websiteStub,
} from '@/lib/seo/person';
import { projectPath } from '@/lib/seo/project-schema';
import { SITE_URL } from '@/lib/server-url';
import { stagger } from '@/lib/stagger';
import Link from 'next/link';
import type { Metadata } from 'next/types';
import type { ReactNode } from 'react';
import type { Graph } from 'schema-dts';

export const dynamic = 'force-static';

const PAGE_URL = `${SITE_URL}${CV_PAGE.path}`;

export function generateMetadata(): Metadata {
  return createMetadata({
    title: CV_PAGE.title,
    absoluteTitle: true,
    description: CV_PAGE.description,
    path: CV_PAGE.path,
    image: createOgImage({ title: CV_PAGE.ogTitle, meta: CV_PAGE.ogMeta }),
  });
}

const jsonLd: Graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#page`,
      url: PAGE_URL,
      name: CV_PAGE.title,
      description: CV_PAGE.description,
      inLanguage: 'en-US',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': PERSON_ID },
      mainEntity: { '@id': PERSON_ID },
      breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
      dateCreated: CV_PAGE.published,
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
        { '@type': 'ListItem', position: 2, name: 'CV', item: PAGE_URL },
      ],
    },
    ...personGraph(),
    websiteStub(),
  ],
};

const linkClass =
  'font-medium text-fg underline decoration-accent-strong underline-offset-4 transition-colors hover:text-accent-strong';

/** First sentence of the first paragraph: the fallback bullet for a role. */
const firstSentence = (text = '') =>
  text.split('\n\n')[0].split(/(?<=\.)\s/)[0];

const SECTIONS = [
  'Summary',
  'Experience',
  'Education',
  'Leadership and honours',
  'Projects',
  'Certification',
  'Skills and languages',
] as const;

type SectionName = (typeof SECTIONS)[number];

const sectionId = (name: SectionName) =>
  `cv-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

/** One CV section: ledger row, H2 on the left, content on the right. */
function CvSection({
  name,
  children,
}: {
  name: SectionName;
  children: ReactNode;
}) {
  const i = SECTIONS.indexOf(name);
  const id = sectionId(name);
  return (
    <section
      className="section"
      data-tone={i % 2 ? 'ink' : 'bone'}
      aria-labelledby={id}
    >
      <SectionHeader
        as="p"
        eyebrow="CV"
        value={`${formatIndex(i + 1)} / ${formatIndex(SECTIONS.length)}`}
      />

      <div className="grid-12">
        <div className="col-span-12 lg:col-span-5">
          <h2 id={id} className="display h3-size text-fg" data-reveal>
            {name}
          </h2>
        </div>

        <div className="col-span-12 mt-8 lg:col-span-7 lg:mt-0">{children}</div>
      </div>
    </section>
  );
}

/**
 * Bullet list with the accent rule used by the homepage Education block.
 * Items are config strings; `[label](href)` links render through RichText.
 */
function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="prose-body space-y-3 text-fg/72">
      {items.map((item) => (
        <li key={item} className="flex gap-4">
          <span
            className="mt-[0.65em] h-[2px] w-5 shrink-0 bg-accent-strong"
            aria-hidden="true"
          />
          <span>
            <RichText text={item} linkClassName={linkClass} />
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function CvPage() {
  return (
    <>
      <JsonLd code={jsonLd} />

      <section
        className="section page-hero"
        data-tone="ink"
        aria-labelledby="cv-title"
      >
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'CV' }]}
          className="rise"
          style={stagger(0)}
        />

        <div className="grid-12 mt-10 md:mt-14">
          <div className="col-span-12 lg:col-span-6">
            <p className="eyebrow rise" style={stagger(1)}>
              Curriculum vitae
            </p>
            <h1
              id="cv-title"
              className="display h2-size rise mt-4 text-bone"
              style={stagger(2)}
            >
              {CV_PAGE.h1}
            </h1>
          </div>

          <div className="col-span-12 mt-8 lg:col-span-6 lg:mt-0 lg:self-end">
            <p className="mono-label rise text-bone/88" style={stagger(3)}>
              {CV_PAGE.headline}
            </p>
            <p className="body-lg rise mt-4 text-bone/72" style={stagger(4)}>
              {CV_PAGE.status}
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={stagger(5)}>
              <PillLink href={`mailto:${USER.email}`} variant="fill">
                Email
              </PillLink>
              <PillLink href={USER.social.linkedin} external>
                LinkedIn
              </PillLink>
              <PillLink href={USER.social.github} external>
                GitHub
              </PillLink>
              <PillLink href={CV_PAGE.pdf.href} external>
                {CV_PAGE.pdf.label}
              </PillLink>
            </div>
          </div>
        </div>
      </section>

      <CvSection name="Summary">
        <p className="prose-body body-lg text-fg/72" data-reveal>
          {CV_PAGE.summary}
        </p>
      </CvSection>

      <CvSection name="Experience">
        <div className="space-y-12">
          {experiences.map((company) => (
            <div
              key={company.id}
              className="border-line border-t pt-6"
              data-reveal
            >
              <h3 className="body-lg font-medium text-fg">
                {company.companyName}
              </h3>
              <p className="mono-label mt-2 text-fg/56">{company.city}</p>

              {company.positions.map((position) => (
                <div key={position.id} className="mt-6">
                  <h4 className="font-medium text-fg">{position.title}</h4>
                  <p className="mono-label mt-1 text-fg/56">
                    {[
                      formatPeriod(position.employmentPeriod),
                      position.employmentType,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                  <div className="mt-3">
                    <Bullets
                      items={
                        CV_HIGHLIGHTS[position.id] ?? [
                          firstSentence(position.description),
                        ]
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </CvSection>

      <CvSection name="Education">
        <div data-reveal>
          <h3 className="body-lg font-medium text-fg">{EDUCATION.school}</h3>
          <p className="prose-body mt-2 text-fg/72">{EDUCATION.degree}</p>
          <p className="mono-label mt-2 text-fg/56">
            {EDUCATION.period} · {`GPA ${EDUCATION.gpa}`}
          </p>
          <p className="prose-body mt-5 text-fg/72">
            {`Coursework: ${EDUCATION.coursework.join(', ')}.`}
          </p>
          <p className="prose-body mt-5 text-fg/72">
            <RichText
              text={`More about my time there: [${USER.name} at AUS](/aus).`}
              linkClassName={linkClass}
            />
          </p>
        </div>
      </CvSection>

      <CvSection name="Leadership and honours">
        <div data-reveal>
          <Bullets items={CV_HONOURS} />
        </div>
      </CvSection>

      <CvSection name="Projects">
        <ul className="space-y-8">
          {PROJECT_PAGES.map((project) => (
            <li
              key={project.id}
              className="border-line border-t pt-6"
              data-reveal
            >
              <h3 className="body-lg">
                <Link href={projectPath(project)} className={linkClass}>
                  {project.title}
                </Link>
              </h3>
              <p className="mono-label mt-2 text-fg/56">
                {formatPeriod(project.period)}
              </p>
              {project.shortDescription ? (
                <p className="prose-body mt-3 text-fg/72">
                  {project.shortDescription}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </CvSection>

      <CvSection name="Certification">
        <ul className="prose-body space-y-3 text-fg/72" data-reveal>
          {CERTIFICATIONS.map((credential) => (
            <li key={credential.name}>
              <span className="font-medium text-fg">{credential.name}</span>
              {`, ${credential.issuer}${credential.year ? `, ${credential.year}` : ''}. `}
              {credential.url ? (
                <a
                  href={credential.url}
                  className={linkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {credential.url.includes('credly.com')
                    ? 'Verify on Credly'
                    : 'Verify'}
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </CvSection>

      <CvSection name="Skills and languages">
        <div className="prose-body space-y-3 text-fg/72" data-reveal>
          {TECH_STACK.map((group) => (
            <p key={group.title}>
              <span className="font-medium text-fg">{`${group.title}:`}</span>
              {` ${group.items.join(', ')}`}
            </p>
          ))}
          <p>
            <span className="font-medium text-fg">Spoken languages:</span>
            {` ${CV_PAGE.languages}`}
          </p>
        </div>

        <div
          className="mt-12 border-line border-t pt-10"
          data-reveal
          style={stagger(1)}
        >
          <p className="prose-body body-lg text-fg/72">
            <RichText
              text={`Read more in [About ${USER.name}](/about), [${USER.name} at AUS](/aus) and the [project case studies](/projects).`}
              linkClassName={linkClass}
            />
          </p>
          <p className="mono-label mt-8 text-fg/56">
            Last updated{' '}
            <time dateTime={CONTENT_LAST_MODIFIED}>
              {formatLongDate(CONTENT_LAST_MODIFIED)}
            </time>
          </p>
        </div>
      </CvSection>
    </>
  );
}
