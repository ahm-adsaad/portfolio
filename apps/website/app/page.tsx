import { FloatingHeader } from '@/components/navigation/floating-header';
import { PronounceMyName } from '@/components/pronounce-my-name';
import { RevealOnLoad } from '@/components/reveal-on-load';
import { ScrollArea } from '@/components/scroll-area';
import { Section } from '@/components/section';
import Separator from '@/components/separator';
import { USER } from '@/config/user';
import { GitHubContribution } from '@/features/home/components/github-contribution';
import Info from '@/features/home/components/info';
import { Education } from '@/features/home/components/education';
import { Experiences } from '@/features/home/components/experiences';
import { ProjectCoverflow } from '@/features/home/components/project-coverflow';
import { TechStack } from '@/features/home/components/tech-stack';
import { WordmarkFooter } from '@/components/wordmark-footer';
import { createOgImage } from '@/lib/createOgImage';
import { JsonLd, Organization, WithContext } from '@/lib/seo/json-ld';
import { createMetadata } from '@/lib/seo/metadata';
import type { Metadata } from 'next/types';

// Force static generation at build time
export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  const title = USER.tagline;
  const description = USER.description;
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

export default async function Page() {
  const jsonLd: WithContext<Organization> = {
    '@type': 'Organization',
    '@context': 'https://schema.org',
  };

  return (
    <>
      <JsonLd code={jsonLd} />
      <Info show={['time', 'screen', 'llms']} />
      <ScrollArea useScrollAreaId className="">
        <FloatingHeader scrollTitle={USER.name} />

        <Separator />

        {/* Hero Section */}
        <Section>
          {/* Name and Title */}
          <RevealOnLoad delay={0} duration={0.5}>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-2xl">{USER.name}</h1>
                <PronounceMyName name={USER.name} />
              </div>
              <p className="font-mono text-sm tracking-wider text-muted-foreground uppercase">
                {USER.jobTitle}
              </p>
            </div>
          </RevealOnLoad>

          {/* Description */}
          <RevealOnLoad delay={0.15} duration={0.5}>
            <div className="mt-6 space-y-3 text-foreground/70">
              <p className="leading-relaxed">
                I&apos;m Ahmad, a Computer Engineering senior at the American
                University of Sharjah who ships production systems. My work
                centers on applied AI: LLM systems with real cost governance,
                real evaluation, and real stakeholders. Most recently at
                Samsung Gulf Electronics, I architected and solely built a
                trend intelligence platform for the regional marketing team.
              </p>
              <p className="leading-relaxed">
                I work as a forward deployed engineer: technical enough to
                build the system, comfortable enough with stakeholders to
                scope it.
              </p>
              <p className="leading-relaxed">
                I hold a UAE Golden Visa, so no employer sponsorship is
                required. I graduate in December 2026 and I am available to
                start January 2027.
              </p>
            </div>
          </RevealOnLoad>
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
              Drag through the carousel to explore.
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
                className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
              >
                {USER.email}
              </a>{' '}
              or on{' '}
              <a
                href={USER.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
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
