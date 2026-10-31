import { Breadcrumb } from '@/components/breadcrumb';
import { PillLink } from '@/components/pill-link';
import { RichText } from '@/components/rich-text';
import { SectionHeader } from '@/components/section-header';
import { AUS_PAGE } from '@/config/aus';
import { CONTENT_LAST_MODIFIED } from '@/config/site';
import { USER } from '@/config/user';
import { createOgImage } from '@/lib/createOgImage';
import { formatLongDate } from '@/lib/format-long-date';
import { formatIndex } from '@/lib/project-index';
import { JsonLd } from '@/lib/seo/json-ld';
import { createMetadata } from '@/lib/seo/metadata';
import {
  AUS_ID,
  PERSON_ID,
  TBP_CHAPTER_ID,
  WEBSITE_ID,
  articleId,
  personGraph,
  websiteStub,
} from '@/lib/seo/person';
import { SITE_URL } from '@/lib/server-url';
import { stagger } from '@/lib/stagger';
import type { Metadata } from 'next/types';
import type { Graph } from 'schema-dts';

export const dynamic = 'force-static';

const PAGE_URL = `${SITE_URL}${AUS_PAGE.path}`;

export function generateMetadata(): Metadata {
  return createMetadata({
    title: AUS_PAGE.title,
    absoluteTitle: true,
    description: AUS_PAGE.description,
    path: AUS_PAGE.path,
    image: createOgImage({ title: AUS_PAGE.ogTitle, meta: AUS_PAGE.ogMeta }),
  });
}

const jsonLd: Graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#page`,
      url: PAGE_URL,
      name: AUS_PAGE.title,
      description: AUS_PAGE.description,
      inLanguage: 'en-US',
      isPartOf: { '@id': WEBSITE_ID },
      about: [{ '@id': PERSON_ID }, { '@id': AUS_ID }],
      mainEntity: { '@id': PERSON_ID },
      mentions: [{ '@id': TBP_CHAPTER_ID }],
      citation: [{ '@id': articleId(AUS_PAGE.coverage.article.url) }],
      breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
      dateCreated: AUS_PAGE.published,
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
        { '@type': 'ListItem', position: 2, name: 'AUS', item: PAGE_URL },
      ],
    },
    ...personGraph(),
    websiteStub(),
  ],
};

const linkClass =
  'font-medium text-fg underline decoration-accent-strong underline-offset-4 transition-colors hover:text-accent-strong';

export default function AusPage() {
  const { sections, coverage } = AUS_PAGE;
  // The five topic sections plus the AUS News coverage.
  const total = sections.length + 1;

  return (
    <>
      <JsonLd code={jsonLd} />

      <section
        className="section page-hero"
        data-tone="ink"
        aria-labelledby="aus-title"
      >
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'AUS' }]}
          className="rise"
          style={stagger(0)}
        />

        <div className="grid-12 mt-10 md:mt-14">
          <div className="col-span-12 lg:col-span-10">
            <p className="eyebrow rise" style={stagger(1)}>
              {AUS_PAGE.eyebrow}
            </p>
            <h1
              id="aus-title"
              className="display h2-size rise mt-4 text-bone"
              style={stagger(2)}
            >
              {AUS_PAGE.h1}
            </h1>
          </div>
        </div>
      </section>

      <section
        className="section"
        data-tone="bone"
        aria-labelledby="aus-glance-title"
      >
        <SectionHeader as="p" eyebrow="AUS" value="At a glance" />

        <div className="grid-12">
          <div className="col-span-12 lg:col-span-5">
            <h2
              id="aus-glance-title"
              className="display h3-size text-fg"
              data-reveal
            >
              At a glance
            </h2>
          </div>

          <div className="col-span-12 mt-8 lg:col-span-7 lg:mt-0">
            <p className="prose-body body-lg text-fg/72" data-reveal>
              {AUS_PAGE.intro}
            </p>

            <dl className="facts mt-10" data-reveal>
              {AUS_PAGE.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {sections.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          className="section scroll-mt-[var(--nav)]"
          data-tone={i % 2 ? 'bone' : 'ink'}
          aria-labelledby={`${section.id}-title`}
        >
          <SectionHeader
            as="p"
            eyebrow="AUS"
            value={`${formatIndex(i + 1)} / ${formatIndex(total)}`}
          />

          <div className="grid-12">
            <div className="col-span-12 lg:col-span-5">
              <h2
                id={`${section.id}-title`}
                className="display h3-size text-fg"
                data-reveal
              >
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
      ))}

      <section
        id={coverage.id}
        className="section scroll-mt-[var(--nav)]"
        data-tone={sections.length % 2 ? 'bone' : 'ink'}
        aria-labelledby={`${coverage.id}-title`}
      >
        <SectionHeader
          as="p"
          eyebrow="AUS"
          value={`${formatIndex(total)} / ${formatIndex(total)}`}
        />

        <div className="grid-12">
          <div className="col-span-12 lg:col-span-5">
            <h2
              id={`${coverage.id}-title`}
              className="display h3-size text-fg"
              data-reveal
            >
              {coverage.heading}
            </h2>
          </div>

          <div className="col-span-12 mt-8 lg:col-span-7 lg:mt-0">
            <p className="prose-body body-lg text-fg/72" data-reveal>
              <RichText text={coverage.lead} linkClassName={linkClass} />
            </p>

            <div className="mt-10 space-y-10">
              {coverage.quotes.map((quote) => (
                <figure key={quote.text.slice(0, 32)} data-reveal>
                  <blockquote className="display-light intro-size max-w-[40ch] border-accent-strong border-l-2 pl-5 text-fg">
                    <p>{quote.text}</p>
                  </blockquote>
                  <figcaption className="mono-label mt-3 pl-5 text-fg/56">
                    <a
                      href={coverage.article.url}
                      className="text-link text-fg/72"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {coverage.citation}
                    </a>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div
              className="mt-12 border-line border-t pt-10"
              data-reveal
              style={stagger(1)}
            >
              <p className="prose-body body-lg text-fg/72">
                {AUS_PAGE.closing}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PillLink href="/about" variant="fill">
                  {`About ${USER.name}`}
                </PillLink>
                <PillLink href="/projects">Projects</PillLink>
                <PillLink href="/cv">CV</PillLink>
              </div>

              <p className="eyebrow mt-10">Sources</p>
              <ul className="prose-body mt-3 space-y-2 text-fg/72">
                {AUS_PAGE.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      className={linkClass}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>

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
