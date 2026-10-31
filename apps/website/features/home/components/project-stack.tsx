import Link from 'next/link';

import { Chip } from '@/components/chip';
import { ProjectCover } from '@/components/project-cover';
import { SectionHeader } from '@/components/section-header';
import type { Project } from '@/config/projects';
import { formatIndex, projectIndex } from '@/lib/project-index';
import { stagger } from '@/lib/stagger';

type Props = {
  projects: Project[];
  showAllLink?: boolean;
};

/**
 * Stacking cards with `position: sticky`: each card sticks 12px lower than
 * the one before, so the next slides over the last. Pure CSS.
 */
export function ProjectStack({ projects, showAllLink = false }: Props) {
  return (
    <section
      className="section"
      data-tone="bone"
      aria-labelledby="projects-title"
    >
      <SectionHeader
        id="projects-title"
        eyebrow="Projects"
        value={`${projects.length} builds`}
      />

      <ol className="stack">
        {projects.map((project, i) => {
          const source = project.github ?? project.link;
          return (
            <li
              key={project.id}
              className="stack-card"
              style={stagger(i)}
              data-tone="ink"
            >
              <div className="stack-card-inner">
                <div className="stack-copy">
                  <p className="mono-label text-apricot">
                    {formatIndex(projectIndex(project))}
                  </p>

                  <h3 className="display h3-size text-bone">{project.title}</h3>

                  {project.shortDescription ? (
                    <p className="body-lg max-w-[56ch] text-bone/72">
                      {project.shortDescription}
                    </p>
                  ) : null}

                  {project.impact ? (
                    <div className="max-w-[56ch]">
                      <p className="eyebrow">Impact</p>
                      <p className="mt-2 text-bone/88">{project.impact}</p>
                    </div>
                  ) : null}

                  <ul className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <li key={skill} className="flex">
                        <Chip>{skill}</Chip>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-auto pt-2">
                    {project.caseStudy ? (
                      <Link
                        href={`/projects/${project.id}`}
                        className="text-link mono-label text-apricot"
                      >
                        Read the case study
                      </Link>
                    ) : source ? (
                      <a
                        href={source}
                        className="text-link mono-label text-apricot"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Source
                      </a>
                    ) : null}
                  </p>
                </div>

                <ProjectCover
                  project={project}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </li>
          );
        })}
      </ol>

      {showAllLink ? (
        <p className="-mt-[10vh]" data-reveal>
          <Link href="/projects" className="text-link mono-label text-fg">
            All projects
          </Link>
        </p>
      ) : null}
    </section>
  );
}
