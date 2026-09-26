import type { Project } from '@/config/projects';
import { USER } from '@/config/user';
import { SITE_URL } from '@/lib/server-url';
import type { Thing } from 'schema-dts';

/** Primary language per public repo; not derivable from the skills list. */
const PROJECT_LANGUAGE: Record<string, string> = {
  'trend-radar': 'TypeScript',
  localai: 'TypeScript',
  'mano-computer-simulator': 'Python',
  portfolio: 'TypeScript',
};

/**
 * Minimal Person node for subpages. The full Person lives on the homepage;
 * this only names the `@id` so validators on a single page can resolve it.
 */
export const personStub = () => ({
  '@type': 'Person' as const,
  '@id': `${SITE_URL}/#person`,
  name: USER.name,
  url: `${SITE_URL}/`,
});

export const projectPath = (project: Project) => `/projects/${project.id}`;

/**
 * One `@id` per project. Projects with a page use the page's fragment so the
 * homepage graph and the project page describe the same node.
 */
export const projectSchemaId = (project: Project) =>
  project.caseStudy
    ? `${SITE_URL}${projectPath(project)}#project`
    : `${SITE_URL}/#project-${project.id}`;

/** "Title: Summary | Ahmad Saad", with the summary capped near 45 characters. */
export function projectTitle(project: Project): string {
  const summary =
    project.titleSummary ?? trimToWord(project.shortDescription ?? '', 45);
  return summary ? `${project.title}: ${summary}` : project.title;
}

function trimToWord(text: string, max: number): string {
  if (text.length <= max) return text.replace(/\.$/, '');
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,:;.]$/, '');
}

/**
 * Schema node for a project, or null when there is nothing public to point
 * at (schema must never reference a dead link).
 */
export function projectSchema(project: Project): Thing | null {
  const pageUrl = project.caseStudy
    ? `${SITE_URL}${projectPath(project)}`
    : undefined;
  const image = project.image ? `${SITE_URL}${project.image}` : undefined;
  const base = {
    '@id': projectSchemaId(project),
    name: project.title,
    description: project.shortDescription,
    author: { '@id': `${SITE_URL}/#person` },
    ...(pageUrl ? { url: pageUrl, mainEntityOfPage: pageUrl } : {}),
    ...(image ? { image } : {}),
    keywords: project.skills.join(', '),
  };

  if (project.github) {
    return {
      '@type': 'SoftwareSourceCode',
      ...base,
      codeRepository: project.github,
      programmingLanguage: PROJECT_LANGUAGE[project.id],
    };
  }
  if (pageUrl) {
    return { '@type': 'CreativeWork', ...base };
  }
  return null;
}
