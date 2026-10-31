import { Breadcrumb } from '@/components/breadcrumb';
import { Chip } from '@/components/chip';
import { Markdown } from '@/components/markdown';
import { PillLink } from '@/components/pill-link';
import { ProjectCover } from '@/components/project-cover';
import { SectionHeader } from '@/components/section-header';
import { PROJECT_PAGES, type Project } from '@/config/projects';
import { USER } from '@/config/user';
import { createOgImage } from '@/lib/createOgImage';
import { formatPeriod } from '@/lib/format-period';
import { formatIndex, projectIndex } from '@/lib/project-index';
import { JsonLd } from '@/lib/seo/json-ld';
import { createMetadata } from '@/lib/seo/metadata';
import {
  projectPath,
  personStub,
  projectSchema,
  projectTitle,
} from '@/lib/seo/project-schema';
import { SITE_URL } from '@/lib/server-url';
import { cn } from '@/lib/utils';
import { stagger } from '@/lib/stagger';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { preload } from 'react-dom';
import type { Metadata } from 'next/types';
import type { Graph } from 'schema-dts';

export const dynamic = 'force-static';
export const dynamicParams = false;

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return PROJECT_PAGES.map((project) => ({ id: project.id }));
}

const COVER_SIZES = '(min-width: 1024px) 40vw, 100vw';

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
    description:
      project.seoDescription ?? project.shortDescription ?? project.title,
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

function PagerCell({
  project,
  dir,
}: {
  project?: Project;
  dir: 'prev' | 'next';
}) {
  if (!project) {
    return <div className="pager-cell" data-dir={dir} aria-hidden="true" />;
  }
  return (
    <Link href={projectPath(project)} className="pager-cell" data-dir={dir}>
      <span className="mono-label text-fg/64">
        {dir === 'prev' ? 'Previous' : 'Next'}
      </span>
      <span className="display pager-title">{project.title}</span>
    </Link>
  );
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { id } = await params;
  const project = findProject(id);
  if (!project) notFound();

  const pageIndex = PROJECT_PAGES.indexOf(project);
  const prev = PROJECT_PAGES[pageIndex - 1];
  const next = PROJECT_PAGES[pageIndex + 1];
  // A live demo is a `link` that is not just the repository again.
  const demo =
    project.link && project.link !== project.github ? project.link : undefined;
  const paragraphs = project.description?.split('\n\n') ?? [];

  // The cover is this page's LCP element. Emit a <link rel=preload> in the
  // head for the webp twins (same srcset/sizes ProjectCover renders, so the
  // preload is the request the <picture> reuses) instead of letting the
  // browser discover the <img> after it has parsed the whole hero.
  if (project.image) {
    const stem = project.image.replace(/\.jpe?g$/i, '');
    preload(`${stem}.webp`, {
      as: 'image',
      fetchPriority: 'high',
      imageSrcSet: `${stem}-320.webp 320w, ${stem}.webp 640w`,
      imageSizes: COVER_SIZES,
    });
  }

  return (
    <>
      <JsonLd code={buildJsonLd(project)} />

      <section
        className="section page-hero"
        data-tone="ink"
        aria-labelledby="project-title"
      >
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects' },
            { label: project.title },
          ]}
          className="rise"
          style={stagger(0)}
        />

        <div className="grid-12 mt-10 md:mt-14">
          <div className="col-span-12 flex flex-col lg:col-span-7">
            <p className="mono-label rise text-apricot" style={stagger(1)}>
              {formatIndex(projectIndex(project))}
            </p>

            <h1
              id="project-title"
              className="display page-size rise-name mt-4 text-bone"
              style={stagger(2)}
            >
              {project.title}
            </h1>

            <p className="mono-label rise mt-6 text-bone/56" style={stagger(3)}>
              Built by{' '}
              <Link
                href="/about"
                className="text-bone/72 underline underline-offset-4 transition-colors hover:text-bone"
              >
                {USER.name}
              </Link>{' '}
              · {formatPeriod(project.period)}
            </p>

            {project.shortDescription ? (
              <p
                className="display-light intro-size rise mt-8 max-w-[40ch] text-bone/88"
                style={stagger(4)}
              >
                {project.shortDescription}
              </p>
            ) : null}

            {project.github || demo ? (
              <div
                className="rise mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-10"
                style={stagger(5)}
              >
                {demo ? (
                  <PillLink href={demo} variant="fill" external>
                    {project.ctaLabel ?? 'Visit the project'}
                  </PillLink>
                ) : null}
                {project.github ? (
                  <PillLink
                    href={project.github}
                    variant={demo ? 'outline' : 'fill'}
                    external
                  >
                    Source on GitHub
                  </PillLink>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="col-span-12 mt-10 lg:col-span-5 lg:mt-0">
            <ProjectCover
              project={project}
              sizes={COVER_SIZES}
              priority
              className="cover-hero"
            />
          </div>
        </div>
      </section>

      <section
        className="section"
        data-tone="bone"
        aria-labelledby="overview-title"
      >
        <SectionHeader
          id="overview-title"
          eyebrow="Overview"
          value={`${project.skills.length} ${project.skills.length === 1 ? 'tool' : 'tools'}`}
        />

        <div className="grid-12">
          <aside className="col-span-12 lg:sticky lg:col-span-5 lg:top-[calc(var(--nav)+2rem)] lg:self-start">
            {project.impact ? (
              <div data-reveal>
                <p className="eyebrow">Impact</p>
                <p className="display-light counter-size mt-3 max-w-[24ch] text-fg">
                  {project.impact}
                </p>
              </div>
            ) : null}

            <ul
              className={cn('flex flex-wrap gap-2', project.impact && 'mt-8')}
              data-reveal
              style={stagger(1)}
            >
              {project.skills.map((skill) => (
                <li key={skill} className="flex">
                  <Chip>{skill}</Chip>
                </li>
              ))}
            </ul>
          </aside>

          <div className="col-span-12 mt-10 lg:col-span-7 lg:mt-0">
            {paragraphs.length ? (
              <div
                className="prose-body body-lg space-y-5 text-fg/72"
                data-reveal
              >
                {paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            {/* The typography plugin's `prose` base plus the site's `prose-ink`
                skin. The design-system Prose wrapper is not used here: its
                `radix-ui` import drags the whole Radix barrel (~73 kB gz) into
                this otherwise static page. */}
            <div
              className={cn(
                'prose prose-ink',
                paragraphs.length && 'mt-12 border-line border-t pt-10'
              )}
            >
              <Markdown>{project.caseStudy}</Markdown>
            </div>
          </div>
        </div>

        <nav
          aria-label="More projects"
          className="pager mt-[clamp(4rem,10vh,7rem)]"
        >
          <PagerCell project={prev} dir="prev" />
          <PagerCell project={next} dir="next" />
        </nav>

        <p className="mono-label mt-8 flex flex-wrap gap-x-6 gap-y-2 text-fg/72">
          <Link href="/projects" className="text-link">
            All projects
          </Link>
          <Link href="/about" className="text-link">
            About {USER.name}
          </Link>
        </p>
      </section>
    </>
  );
}
