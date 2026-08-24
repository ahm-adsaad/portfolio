/**
 * Markdown renderers shared by the agent-facing endpoints
 * (/llms.txt, /llms-full.txt, /me/*.md). One source of truth: config/*.
 */
import { EDUCATION } from '@/config/education';
import { experiences } from '@/config/experience';
import { PROJECTS } from '@/config/projects';
import { USER } from '@/config/user';

const period = (start: string, end?: string) => `${start} - ${end ?? 'Present'}`;

const heading = (level: number) => '#'.repeat(level);

export function formatAboutMarkdown(level = 2): string {
  const h = heading(level);
  return [
    `${h} About`,
    '',
    USER.description.trim(),
    '',
    `- Name: ${USER.name}`,
    `- Title: ${USER.jobTitle}`,
    `- Location: ${USER.location}`,
    `- Email: ${USER.email}`,
    `- Website: ${USER.website}`,
    ...Object.entries(USER.social)
      .filter(([, url]) => url)
      .map(([name, url]) => `- ${name[0].toUpperCase()}${name.slice(1)}: ${url}`),
  ].join('\n');
}

export function formatExperienceMarkdown(level = 2): string {
  const h = heading(level);
  return experiences
    .flatMap((company) =>
      company.positions.map((position) => {
        const lines = [
          `${h} ${position.title} | ${company.companyName}`,
          '',
          `- Duration: ${period(position.employmentPeriod.start, position.employmentPeriod.end)}`,
          `- Location: ${company.city}`,
        ];
        if (position.employmentType) {
          lines.push(`- Type: ${position.employmentType}`);
        }
        if (company.companyUrl) {
          lines.push(`- Company: ${company.companyUrl}`);
        }
        if (position.skills?.length) {
          lines.push(`- Skills: ${position.skills.join(', ')}`);
        }
        if (position.description) {
          lines.push('', position.description.trim());
        }
        return lines.join('\n');
      })
    )
    .join('\n\n');
}

export function formatProjectsMarkdown(level = 2): string {
  const h = heading(level);
  return PROJECTS.map((project) => {
    const lines = [
      `${h} ${project.title}`,
      '',
      `- Period: ${period(project.period.start, project.period.end)}`,
    ];
    if (project.link) {
      lines.push(`- Link: ${project.link}`);
    }
    if (project.github && project.github !== project.link) {
      lines.push(`- Repository: ${project.github}`);
    }
    lines.push(`- Tech: ${project.skills.join(', ')}`);
    if (project.impact) {
      lines.push(`- Impact: ${project.impact}`);
    }
    if (project.shortDescription) {
      lines.push('', project.shortDescription.trim());
    }
    if (project.description) {
      lines.push('', project.description.trim());
    }
    return lines.join('\n');
  }).join('\n\n');
}

export function formatEducationMarkdown(level = 2): string {
  const h = heading(level);
  return [
    `${h} ${EDUCATION.degree} | ${EDUCATION.school}`,
    '',
    `- Period: ${EDUCATION.period}`,
    `- Location: ${EDUCATION.city}`,
    `- GPA: ${EDUCATION.gpa}`,
    `- Website: ${EDUCATION.url}`,
    '',
    ...EDUCATION.highlights.map((item) => `- ${item}`),
    '',
    `Coursework: ${EDUCATION.coursework.join(', ')}`,
  ].join('\n');
}

export const MARKDOWN_HEADERS = {
  'Content-Type': 'text/markdown;charset=utf-8',
};
