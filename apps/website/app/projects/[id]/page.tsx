import { Icons } from '@/components/icons';
import { Markdown } from '@/components/markdown';
import { FloatingHeader } from '@/components/navigation/floating-header';
import { ScrollArea } from '@/components/scroll-area';
import { Section } from '@/components/section';
import Separator from '@/components/separator';
import { ShootingStarsLayer } from '@/components/ui/shooting-stars-layer';
import { PROJECT_PAGES, type Project } from '@/config/projects';
import { USER } from '@/config/user';
import { createOgImage } from '@/lib/createOgImage';
import { formatPeriod } from '@/lib/format-period';
import { JsonLd } from '@/lib/seo/json-ld';
import { createMetadata } from '@/lib/seo/metadata';
import {
  projectPath,
  personStub,
  projectSchema,
  projectTitle,
} from '@/lib/seo/project-schema';
import { SITE_URL } from '@/lib/server-url';
import { Tag } from '@repo/design-system/components/ui/tag';
import { Prose } from '@repo/design-system/components/ui/typography';
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import type { Graph } from 'schema-dts';

export const dynamic = 'force-static';
export const dynamicParams = false;

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return PROJECT_PAGES.map((project) => ({ id: project.id }));
}

const findProject = (id: string) =>
  PROJECT_PAGES.find((project) => project.id === id);

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const project = findProject((await params).id);
  if (!project) return {};

  return createMetadata({
    title: projectTitle(project),
    description: project.shortDescription ?? project.title,
    path: projectPath(project),
    image: createOgImage({
      title: project.title,
      meta: `A project by ${USER.name}`,
    }),
  });
}

function buildJsonLd(project: Project): Graph {
  const url = `${SITE_URL}${projectPath(project)}`;
  const node = projectSchema(project);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...(node ? [node] : []),
      personStub(),
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
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
            item: `${SITE_URL}/projects`,
          },
          { '@type': 'ListItem', position: 3, name: project.title, item: url },
        ],
      },
    ],
  };
}

/** WebP twins of each cover come from `pnpm images:projects`. */
function Cover({ project }: { project: Project }) {
  if (!project.image) return null;
  const stem = project.image.replace(/\.jpe?g$/i, '');

  return (
    <picture>
      <source
        srcSet={`${stem}-320.webp 320w, ${stem}.webp 640w`}
        sizes="(min-width: 640px) 320px, 100vw"
        type="image/webp"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.image}
        alt={`${project.title}, a project by ${USER.name}`}
        width={640}
        height={640}
        decoding="async"
        className="aspect-square w-full max-w-xs rounded-2xl bg-muted object-cover shadow-xl"
      />
    </picture>
  );
}

const linkClass =
  'font-medium text-foreground underline underline-offset-4 hover:text-foreground/80';

const buttonClass =
  'inline-flex min-h-8 items-center gap-1.5 rounded-full border border-border bg-background px-3.5 text-[13px] font-medium text-foreground transition-colors hover:bg-muted';

export default async function ProjectPage({ params }: { params: Params }) {
  const { id } = await params;
  const project = findProject(id);
  if (!project) notFound();

  const index = PROJECT_PAGES.indexOf(project);
  const prev = PROJECT_PAGES[index - 1];
  const next = PROJECT_PAGES[index + 1];
  const demo = project.link && project.link !== project.github;

  return (
    <>
      <JsonLd code={buildJsonLd(project)} />
      <ShootingStarsLayer />

      <ScrollArea useScrollAreaId className="relative z-10">
        <FloatingHeader scrollTitle={project.title} />

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
            <Link href="/projects" className="hover:text-foreground">
              Projects
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span aria-current="page">{project.title}</span>
          </nav>

          <div className="space-y-1">
            <h1 className="font-semibold text-2xl">{project.title}</h1>
            <p className="font-mono text-sm tracking-wider text-muted-foreground uppercase">
              Built by{' '}
              <Link href="/about" className="hover:text-foreground underline underline-offset-4">
                {USER.name}
              </Link>{' '}
              · {formatPeriod(project.period)}
            </p>
          </div>

          {project.shortDescription && (
            <p className="mt-6 text-foreground/70 leading-relaxed">
              {project.shortDescription}
            </p>
          )}

          <div className="mt-6 flex justify-center sm:justify-start">
            <Cover project={project} />
          </div>

          {(project.github || demo) && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener"
                  className={buttonClass}
                >
                  <Icons.github className="size-3.5" aria-hidden="true" />
                  Source on GitHub
                </a>
              )}
              {demo && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener"
                  className={buttonClass}
                >
                  {project.ctaLabel ?? 'Visit the project'}
                  <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </Section>

        <Separator />

        <Section>
          <div className="space-y-4">
            <h2 className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
              Overview
            </h2>
            {project.description && (
              <div className="space-y-3 text-foreground/70">
                {project.description.split('\n\n').map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
            {project.impact && (
              <p className="text-foreground/70 leading-relaxed">
                <span className="font-medium text-foreground">Impact: </span>
                {project.impact}
              </p>
            )}
            <ul className="flex flex-wrap gap-1.5 pt-1">
              {project.skills.map((skill) => (
                <li key={skill} className="flex">
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Separator />

        <Section>
          <Prose className="text-foreground/80 prose-h2:font-mono prose-h2:text-sm prose-h2:font-normal prose-h2:tracking-widest prose-h2:text-muted-foreground prose-h2:uppercase">
            <Markdown>{project.caseStudy}</Markdown>
          </Prose>
        </Section>

        <Separator />

        <Section>
          <nav
            aria-label="More projects"
            className="flex items-start justify-between gap-4 text-sm"
          >
            {prev ? (
              <Link
                href={projectPath(prev)}
                className="group flex items-center gap-1.5 text-foreground/70 hover:text-foreground"
              >
                <ArrowLeftIcon className="size-4 shrink-0" aria-hidden="true" />
                <span>
                  <span className="block font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    Previous
                  </span>
                  <span className="font-medium group-hover:underline">
                    {prev.title}
                  </span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={projectPath(next)}
                className="group flex items-center gap-1.5 text-right text-foreground/70 hover:text-foreground"
              >
                <span>
                  <span className="block font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    Next
                  </span>
                  <span className="font-medium group-hover:underline">
                    {next.title}
                  </span>
                </span>
                <ArrowRightIcon className="size-4 shrink-0" aria-hidden="true" />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </Section>

        <Separator />

        <Section>
          <p className="text-center text-foreground/70 leading-relaxed">
            See{' '}
            <Link href="/projects" className={linkClass}>
              all projects
            </Link>{' '}
            or read{' '}
            <Link href="/about" className={linkClass}>
              about {USER.name}
            </Link>
            .
          </p>
        </Section>

        <Separator />
        <div className="h-[clamp(80px,10vh,200px)] shrink-0" />
      </ScrollArea>
    </>
  );
}
