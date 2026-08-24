import { FloatingHeader } from '@/components/navigation/floating-header';
import { PronounceMyName } from '@/components/pronounce-my-name';
import { RevealOnLoad } from '@/components/reveal-on-load';
import { ScrollArea } from '@/components/scroll-area';
import { Section } from '@/components/section';
import Separator from '@/components/separator';
import { USER } from '@/config/user';
import { GitHubContribution } from '@/features/home/components/github-contribution';
import Info from '@/features/home/components/info';
import { Experiences } from '@/features/home/components/experiences';
import { ProjectCoverflow } from '@/features/home/components/project-coverflow';
import { Projects } from '@/features/home/components/projects';
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
                I&apos;m Ahmad — a software engineer who enjoys turning rough
                ideas into polished products. I care about the details: clean
                architecture, fast interfaces, and software that feels
                effortless to use.
              </p>
              <p className="leading-relaxed">
                Below is a selection of things I&apos;ve built — drag through
                the carousel to explore.
              </p>
            </div>
          </RevealOnLoad>

          {/* Featured Projects Carousel */}
          <RevealOnLoad delay={0.3} duration={0.6}>
            <ProjectCoverflow className="mt-8" />
          </RevealOnLoad>
        </Section>

        <Separator />

        {/* GitHub Contribution Section */}
        <Section>
          <GitHubContribution />
        </Section>

        <Separator />

        {/* Projects Section */}
        <Section>
          <Projects />
        </Section>

        <Separator />

        {/* Experiences Section */}
        <Section>
          <Experiences />
        </Section>

        <Separator />

        {/* Wordmark Footer */}
        <Section className="px-0 py-0 sm:px-0 md:py-0">
          <WordmarkFooter brandName={USER.name} />
        </Section>

        <Separator />
        {/* Bottom spacing — matches dock height */}
        <div className="h-[clamp(80px,10vh,200px)] shrink-0" />
      </ScrollArea>
    </>
  );
}
