/**
 * Markdown renderers shared by the agent-facing endpoints
 * (/llms.txt, /llms-full.txt, /me/*.md). One source of truth: config/*.
 */
import {
  LLMS_KEY_FACTS,
  PRESS_MENTIONS,
  PROFILE_DEFINITION,
} from '@/config/about';
import { CERTIFICATIONS, EDUCATION } from '@/config/education';
import { experiences } from '@/config/experience';
import { ABOUT_FAQ } from '@/config/faq';
import { PROJECTS } from '@/config/projects';
import { USER } from '@/config/user';
import { formatLongDate } from '@/lib/format-long-date';

const period = (start: string, end?: string) =>
  `${start} - ${end ?? 'Present'}`;

const heading = (level: number) => '#'.repeat(level);

const PROFILE_LABELS: Record<keyof typeof USER.social, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  credly: 'Credly',
};

/** Non-empty `USER.social` entries, in object order. */
const profileEntries = () =>
  (Object.keys(USER.social) as (keyof typeof USER.social)[])
    .filter((key) => USER.social[key])
    .map((key) => ({ label: PROFILE_LABELS[key], url: USER.social[key] }));

/** `- [Label](url)` for every public profile. */
export function formatProfileLinks(): string[] {
  return profileEntries().map(({ label, url }) => `- [${label}](${url})`);
}

export function formatAboutMarkdown(level = 2): string {
  const h = heading(level);
  return [
    `${h} About`,
    '',
    PROFILE_DEFINITION,
    '',
    `${h} Key facts`,
    '',
    ...LLMS_KEY_FACTS.map((fact) => `- ${fact}`),
    '',
    `${h} Contact and profiles`,
    '',
    `- Email: ${USER.email}`,
    `- Website: ${USER.website}`,
    ...profileEntries().map(({ label, url }) => `- ${label}: ${url}`),
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
    ...(CERTIFICATIONS.length > 0
      ? [
          '',
          `Certifications: ${CERTIFICATIONS.map(
            (c) => `${c.name} (${c.issuer}${c.year ? `, ${c.year}` : ''})`
          ).join(', ')}`,
        ]
      : []),
  ].join('\n');
}

/** `- [headline](url): outlet, date. Profiles <full name>.` per press mention. */
export function formatPressMarkdown(): string[] {
  return PRESS_MENTIONS.map(
    (m) =>
      `- [${m.headline}](${m.url}): ${m.outlet}, ${formatLongDate(m.datePublished)}. Profiles ${USER.fullName}.`
  );
}

/** The /about FAQ, word for word, as `### question` plus answer. */
export function formatFaqMarkdown(level = 2): string {
  const h = heading(level);
  return [
    `${h} FAQ`,
    ...ABOUT_FAQ.flatMap((item) => [
      '',
      `${h}# ${item.question}`,
      '',
      item.answer,
    ]),
  ].join('\n');
}

export const MARKDOWN_HEADERS = {
  'Content-Type': 'text/markdown;charset=utf-8',
  // Fetchable by any agent, but kept out of search results: the HTML pages
  // are the citation targets. Not a robots.txt Disallow, which would block it.
  'X-Robots-Tag': 'noindex',
};
