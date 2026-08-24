import { InfoOverlay } from '@/components/info-overlay';
import { FloatingHeader } from '@/components/navigation/floating-header';
import { PronounceMyName } from '@/components/pronounce-my-name';
import { ScrollArea } from '@/components/scroll-area';
import { Section } from '@/components/section';
import Separator from '@/components/separator';
import { ShootingStarsLayer } from '@/components/ui/shooting-stars-layer';
import { WordmarkFooter } from '@/components/wordmark-footer';
import { EDUCATION } from '@/config/education';
import { experiences } from '@/config/experience';
import { PROJECTS } from '@/config/projects';
import { USER } from '@/config/user';
import { Education } from '@/features/home/components/education';
import { Experiences } from '@/features/home/components/experiences';
import { GitHubContribution } from '@/features/home/components/github-contribution';
import { ProjectCoverflow } from '@/features/home/components/project-coverflow';
import { TechStack } from '@/features/home/components/tech-stack';
import { createOgImage } from '@/lib/createOgImage';
import { JsonLd } from '@/lib/seo/json-ld';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/server-url';
import type { Metadata } from 'next/types';
import type { Graph, Thing } from 'schema-dts';

// Force static generation at build time
export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  const title = USER.tagline;
  const description = USER.metaDescription;
  const image = createOgImage({
    title: title,
    meta: description,
  });
  return createMetadata({
    title: title,
    description: description,
    image: image,
  });
}

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PROFILE_PAGE_ID = `${SITE_URL}/#profilepage`;
const orgId = (id: string) => `${SITE_URL}/#org-${id}`;
const AUS_ID = orgId('aus');

/** Primary language per public repo; not derivable from the skills list. */
const PROJECT_LANGUAGE: Record<string, string> = {
  'trend-radar': 'TypeScript',
  localai: 'TypeScript',
  'mano-computer-simulator': 'Python',
  portfolio: 'TypeScript',
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
  const projects: Thing[] = PROJECTS.flatMap((p): Thing[] => {
    const id = `${SITE_URL}/#project-${p.id}`;
    if (p.github) {
      return [
        {
          '@type': 'SoftwareSourceCode',
          '@id': id,
          name: p.title,
          description: p.shortDescription,
          codeRepository: p.github,
          programmingLanguage: PROJECT_LANGUAGE[p.id],
          author: { '@id': PERSON_ID },
        },
      ];
    }
    if (p.link) {
      return [
        {
          '@type': 'WebApplication',
          '@id': id,
          name: p.title,
          description: p.shortDescription,
          url: p.link,
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Any browser with WebGPU',
          author: { '@id': PERSON_ID },
        },
      ];
    }
    return [];
  });

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
        image: USER.image.profile,
        email: USER.email,
        jobTitle: USER.jobTitle,
        description: USER.description,
        sameAs: [USER.social.github, USER.social.linkedin],
        alumniOf: { '@id': AUS_ID },
        affiliation: { '@id': AUS_ID },
        worksFor: currentEmployers,
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
        name: `${USER.tagline} | ${USER.name}`,
        description: USER.metaDescription,
        inLanguage: 'en-US',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID },
        mainEntity: { '@id': PERSON_ID },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: USER.image.profile,
        },
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
      <InfoOverlay show={['time', 'screen', 'llms']} />

      {/* Shooting stars fill the empty margins; the opaque content column masks them. */}
      <ShootingStarsLayer />

      <ScrollArea useScrollAreaId className="relative z-10">
        <FloatingHeader scrollTitle={USER.name} />

        <Separator />

        {/* Hero Section. Painted at first frame (it is the LCP element); the
            CSS entrance only settles it, it never hides it. */}
        <Section>
          {/* Name and Title */}
          <div className="animate-hero-in space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-2xl">{USER.name}</h1>
              <PronounceMyName name={USER.name} />
            </div>
            <p className="font-mono text-sm tracking-wider text-muted-foreground uppercase">
              {USER.jobTitle}
            </p>
          </div>

          {/* Description */}
          <div
            className="animate-hero-in mt-6 space-y-3 text-foreground/70"
            style={{ animationDelay: '120ms' }}
          >
            <p className="leading-relaxed">
              I&apos;m Ahmad, a Computer Engineering senior at the American
              University of Sharjah who ships production systems. My work
              centers on applied AI: LLM systems with real cost governance,
              real evaluation, and real stakeholders. Most recently at Samsung
              Gulf Electronics, I architected and solely built a trend
              intelligence platform for the regional marketing team.
            </p>
            <p className="leading-relaxed">
              I work as a forward deployed engineer: technical enough to build
              the system, comfortable enough with stakeholders to scope it.
              That includes the product work: turning ambiguous requirements
              into a scoped roadmap, prioritizing what ships first, and
              measuring whether it worked.
            </p>
            <p className="leading-relaxed">
              I hold a UAE Golden Visa, so no employer sponsorship is required.
              I graduate in December 2026 and I am available to start January
              2027.
            </p>
          </div>
        </Section>

        <Separator />

        {/* Experiences Section */}
        <Section>
          <Experiences />
        </Section>

        <Separator />

        {/* Projects Section: coverflow carousel */}
        <Section>
          <div className="space-y-6">
            <h2 className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
              Projects
            </h2>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Drag, use the arrows, or press the arrow keys to move through the
              carousel.
            </p>
            <ProjectCoverflow />
          </div>
        </Section>

        <Separator />

        {/* Education Section */}
        <Section>
          <Education />
        </Section>

        <Separator />

        {/* Tech Stack Section */}
        <Section>
          <TechStack />
        </Section>

        <Separator />

        {/* GitHub Contribution Section */}
        <Section>
          <GitHubContribution />
        </Section>

        <Separator />

        {/* Wordmark Footer */}
        <Section className="px-0 py-0 sm:px-0 md:py-0">
          <WordmarkFooter brandName={USER.name} />
        </Section>

        <Separator />

        {/* Contact CTA */}
        <Section>
          <div className="space-y-2 text-center">
            <p className="text-foreground/70 leading-relaxed">
              Graduating December 2026, available from January 2027.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Reach me at{' '}
              <a
                href={`mailto:${USER.email}`}
                className="inline-block py-1 font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
              >
                {USER.email}
              </a>{' '}
              or on{' '}
              <a
                href={USER.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1 font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
        </Section>

        <Separator />
        {/* Bottom spacing — matches dock height */}
        <div className="h-[clamp(80px,10vh,200px)] shrink-0" />
      </ScrollArea>
    </>
  );
}
