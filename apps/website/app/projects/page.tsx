import { FloatingHeader } from '@/components/navigation/floating-header';
import { ScrollArea } from '@/components/scroll-area';
import { Section } from '@/components/section';
import Separator from '@/components/separator';
import { ShootingStarsLayer } from '@/components/ui/shooting-stars-layer';
import { PROJECT_PAGES } from '@/config/projects';
import { USER } from '@/config/user';
import { createOgImage } from '@/lib/createOgImage';
import { formatPeriod } from '@/lib/format-period';
import { JsonLd } from '@/lib/seo/json-ld';
import { createMetadata } from '@/lib/seo/metadata';
import { projectPath, projectSchemaId } from '@/lib/seo/project-schema';
import { SITE_URL } from '@/lib/server-url';
import Link from 'next/link';
import type { Metadata } from 'next/types';
import type { Graph } from 'schema-dts';

export const dynamic = 'force-static';

const PATH = '/projects';
const TITLE = `Projects by ${USER.name}`;
const DESCRIPTION =
  'Case studies by Ahmad Saad: a production trend-detection platform, on-device RAG in the browser, a CPU simulator, and an energy harvesting sensor node.';

export function generateMetadata(): Metadata {
  return createMetadata({
    title: TITLE,
    absoluteTitle: true,
    description: DESCRIPTION,
    path: PATH,
    image: createOgImage({
      title: TITLE,
      meta: 'AI systems, embedded hardware, and computer architecture',
    }),
  });
}

const jsonLd: Graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}${PATH}#page`,
      url: `${SITE_URL}${PATH}`,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: 'en-US',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      author: { '@id': `${SITE_URL}/#person` },
      hasPart: PROJECT_PAGES.map((project) => ({
        '@id': projectSchemaId(project),
      })),
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
          name: 'Projects',
          item: `${SITE_URL}${PATH}`,
        },
      ],
    },
  ],
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd code={jsonLd} />
      <ShootingStarsLayer />

      <ScrollArea useScrollAreaId className="relative z-10">
        <FloatingHeader scrollTitle={TITLE} />

        <Separator />

        <Section>
          <nav
            aria-label="Breadcrumb"
            className="mb-6 font-mono text-xs tracking-wider text-muted-foreground uppercase"
          >
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span aria-current="page">Projects</span>
          </nav>

          <h1 className="font-semibold text-2xl">{TITLE}</h1>
          <p className="mt-6 text-foreground/70 leading-relaxed">
            Write-ups of the systems I have built, from production LLM
            pipelines to a custom PCB. Each one covers the problem, the
            approach, the architecture, and my role.
          </p>
        </Section>

        <Separator />

        <Section>
          <ul className="space-y-6">
            {PROJECT_PAGES.map((project) => {
              const stem = project.image?.replace(/\.jpe?g$/i, '');
              return (
                <li key={project.id}>
                  <Link
                    href={projectPath(project)}
                    className="group flex items-start gap-4"
                  >
                    {stem && (
                      <picture className="shrink-0">
                        <source srcSet={`${stem}-320.webp`} type="image/webp" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.image}
                          alt={`${project.title}, a project by ${USER.name}`}
                          width={64}
                          height={64}
                          loading="lazy"
                          decoding="async"
                          className="size-16 rounded-lg bg-muted object-cover"
                        />
                      </picture>
                    )}
                    <div className="flex-1 space-y-1">
                      <h2 className="font-medium text-foreground group-hover:underline">
                        {project.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {formatPeriod(project.period)}
                      </p>
                      {project.shortDescription && (
                        <p className="text-sm text-foreground/60 leading-relaxed">
                          {project.shortDescription}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Section>

        <Separator />
        <div className="h-[clamp(80px,10vh,200px)] shrink-0" />
      </ScrollArea>
    </>
  );
}
