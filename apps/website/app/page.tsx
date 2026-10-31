import { PROJECTS } from '@/config/projects';
import { CONTENT_LAST_MODIFIED, SITE_PUBLISHED } from '@/config/site';
import { USER } from '@/config/user';
import { AboutTeaser } from '@/features/home/components/about-teaser';
import { Contact } from '@/features/home/components/contact';
import { Education } from '@/features/home/components/education';
import { ExperienceLedger } from '@/features/home/components/experience-ledger';
import { GitHubContribution } from '@/features/home/components/github-contribution';
import { Hero } from '@/features/home/components/hero';
import { ProjectStack } from '@/features/home/components/project-stack';
import { Statement } from '@/features/home/components/statement';
import { TechMarquee } from '@/features/home/components/tech-marquee';
import { createOgImage } from '@/lib/createOgImage';
import { JsonLd } from '@/lib/seo/json-ld';
import { createMetadata } from '@/lib/seo/metadata';
import {
  HEADSHOT_ID,
  PERSON_ID,
  WEBSITE_ID,
  personGraph,
} from '@/lib/seo/person';
import { projectSchema } from '@/lib/seo/project-schema';
import { SITE_URL } from '@/lib/server-url';
import type { Metadata } from 'next/types';
import type { Graph, Thing } from 'schema-dts';

// Force static generation at build time
export const dynamic = 'force-static';

/**
 * Name first for the bare query, then the full name AUS publishes, then AUS
 * disambiguated by UAE.
 */
const HOME_TITLE = `${USER.name} (${USER.fullName}) · AI Engineer · AUS, UAE`;

export async function generateMetadata(): Promise<Metadata> {
  const description = USER.metaDescription;
  const image = createOgImage({
    title: USER.name,
    meta: 'AI Engineer · American University of Sharjah',
  });
  return createMetadata({
    title: HOME_TITLE,
    absoluteTitle: true,
    description: description,
    image: image,
  });
}

const PROFILE_PAGE_ID = `${SITE_URL}/#profilepage`;

function buildJsonLd(): Graph {
  // Only projects with a live public URL: schema must never point at a dead link.
  const projects: Thing[] = PROJECTS.flatMap((p) => projectSchema(p) ?? []);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      // AUS, every employer and the full Person (lib/seo/person.ts).
      ...personGraph(),
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: USER.name,
        alternateName: [USER.fullName, USER.domain],
        description: USER.metaDescription,
        inLanguage: 'en-US',
        publisher: { '@id': PERSON_ID },
      },
      {
        '@type': 'ProfilePage',
        '@id': PROFILE_PAGE_ID,
        url: `${SITE_URL}/`,
        name: HOME_TITLE,
        description: USER.metaDescription,
        inLanguage: 'en-US',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID },
        mainEntity: { '@id': PERSON_ID },
        primaryImageOfPage: { '@id': HEADSHOT_ID },
        dateCreated: SITE_PUBLISHED,
        dateModified: CONTENT_LAST_MODIFIED,
      },
      ...projects,
    ],
  };
}

export default async function Page() {
  const jsonLd = buildJsonLd();

  return (
    <>
      <JsonLd code={jsonLd} />
      <Hero />
      <Statement />
      <AboutTeaser />
      <ExperienceLedger />
      <ProjectStack projects={PROJECTS} showAllLink />
      <Education />
      <TechMarquee />
      <GitHubContribution />
      <Contact />
    </>
  );
}
