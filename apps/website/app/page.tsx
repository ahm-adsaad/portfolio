import { PROJECTS } from '@/config/projects';
import { CERTIFICATIONS, EDUCATION } from '@/config/education';
import { experiences } from '@/config/experience';
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
import { projectSchema } from '@/lib/seo/project-schema';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/server-url';
import type { Metadata } from 'next/types';
import type { Graph, ImageObject, Thing } from 'schema-dts';

// Force static generation at build time
export const dynamic = 'force-static';

/** Name first: the page has to rank for the bare query "Ahmad Saad". */
const HOME_TITLE = `${USER.name} · AI Engineer in the UAE`;

export async function generateMetadata(): Promise<Metadata> {
  const description = USER.metaDescription;
  const image = createOgImage({
    title: USER.name,
    meta: 'AI Engineer · Computer Engineering @ AUS · UAE',
  });
  return createMetadata({
    title: HOME_TITLE,
    absoluteTitle: true,
    description: description,
    image: image,
  });
}

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PROFILE_PAGE_ID = `${SITE_URL}/#profilepage`;
const orgId = (id: string) => `${SITE_URL}/#org-${id}`;
const AUS_ID = orgId('aus');
const HEADSHOT_ID = `${SITE_URL}/#headshot`;

const HEADSHOT: ImageObject = {
  '@type': 'ImageObject',
  '@id': HEADSHOT_ID,
  url: USER.image.profile,
  contentUrl: USER.image.profile,
  width: String(USER.image.width),
  height: String(USER.image.height),
  caption: USER.name,
};

function buildJsonLd(): Graph {
  // One Organization node per employer with a public URL. AUS is emitted once,
  // as the university (it is both alma mater and employer).
  const organizations: Thing[] = experiences
    .filter((e) => e.companyUrl && e.id !== 'aus')
    .map((e) => ({
      '@type': 'Organization',
      '@id': orgId(e.id),
      name: e.companyName,
      url: e.companyUrl,
    }));

  const currentEmployers = experiences
    .filter((e) => e.isCurrentEmployer && e.companyUrl)
    .map((e) => ({ '@id': orgId(e.id) }));

  const flagship = experiences.find((e) => e.id === 'samsung-gulf')
    ?.positions[0];

  // Only projects with a live public URL: schema must never point at a dead link.
  const projects: Thing[] = PROJECTS.flatMap((p) => projectSchema(p) ?? []);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollegeOrUniversity',
        '@id': AUS_ID,
        name: EDUCATION.school,
        url: EDUCATION.url,
      },
      ...organizations,
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: USER.name,
        givenName: USER.firstName,
        familyName: USER.lastName,
        url: `${SITE_URL}/`,
        image: HEADSHOT,
        email: USER.email,
        jobTitle: USER.jobTitle,
        description: USER.description,
        disambiguatingDescription:
          'Computer engineer and AI engineer based in the UAE, American University of Sharjah.',
        // Every public profile lives in USER.social; empty entries are skipped.
        sameAs: Object.values(USER.social).filter(Boolean),
        alumniOf: { '@id': AUS_ID },
        affiliation: { '@id': AUS_ID },
        worksFor: currentEmployers,
        hasCredential: CERTIFICATIONS.map((c) => ({
          '@type': 'EducationalOccupationalCredential',
          name: c.name,
          credentialCategory: 'certification',
          recognizedBy: { '@type': 'Organization', name: c.issuer },
          ...(c.url ? { url: c.url } : {}),
        })),
        homeLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'AE',
          },
        },
        knowsAbout: [
          'Large language model systems',
          'Retrieval-augmented generation',
          'Prompt engineering',
          'Computer vision',
          'Model fine-tuning',
          'Technical product management',
          'Forward deployed engineering',
          'Python',
          'TypeScript',
          'PostgreSQL',
          'Next.js',
          'Docker',
          'Cloudflare Workers',
        ],
        hasOccupation: {
          '@type': 'Occupation',
          name: 'AI Engineer',
          occupationLocation: {
            '@type': 'AdministrativeArea',
            name: 'United Arab Emirates',
          },
          skills: flagship?.skills,
        },
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: USER.name,
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
