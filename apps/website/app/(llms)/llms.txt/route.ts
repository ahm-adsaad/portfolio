import { NextResponse } from 'next/server';

import { LLMS_KEY_FACTS } from '@/config/about';
import { PROJECT_PAGES } from '@/config/projects';
import { CONTENT_LAST_MODIFIED, SOURCE_CODE_GITHUB_URL } from '@/config/site';
import { USER } from '@/config/user';
import {
  MARKDOWN_HEADERS,
  formatPressMarkdown,
  formatProfileLinks,
} from '@/lib/llms';
import { projectPath } from '@/lib/seo/project-schema';

// Force static generation at build time
export const dynamic = 'force-static';

function generateLlmsContent() {
  const localaiDemo = PROJECT_PAGES.find(
    (project) => project.id === 'localai'
  )?.link;

  return [
    `# ${USER.name}`,
    '',
    `> ${USER.description}`,
    '',
    `Last updated: ${CONTENT_LAST_MODIFIED}`,
    '',
    'Key facts:',
    '',
    ...LLMS_KEY_FACTS.map((fact) => `- ${fact}`),
    '',
    '## Press',
    '',
    ...formatPressMarkdown(),
    '',
    '## Me',
    '',
    `- [About](${USER.website}/me/about.md): Definition, key facts, education, certification and contact.`,
    `- [Experience](${USER.website}/me/experience.md): Every role with its full description and skills.`,
    `- [Projects](${USER.website}/me/projects.md): Selected projects with technical detail and measured impact.`,
    '',
    '## Pages',
    '',
    `- [Home](${USER.website}/): Profile, experience, projects, education and contact.`,
    `- [About ${USER.name}](${USER.website}/about): Bio, education, experience, target roles and availability.`,
    `- [${USER.name} at AUS](${USER.website}/aus): Tau Beta Pi UAE Alpha, the AUS AI Hub, research and AUS News coverage.`,
    `- [CV](${USER.website}/cv): Experience, education, projects, certification and skills on one page.`,
    `- [Projects](${USER.website}/projects): Index of project case studies.`,
    ...PROJECT_PAGES.map(
      (project) =>
        `- [${project.title}](${USER.website}${projectPath(project)}): ${project.shortDescription ?? 'Case study.'}`
    ),
    '',
    '## Profiles',
    '',
    ...formatProfileLinks(),
    '',
    '## Optional',
    '',
    `- [Full text](${USER.website}/llms-full.txt): About, experience, projects, and education in one file.`,
    `- [CV (PDF)](${USER.website}/Ahmad_Saad_CV.pdf): Full CV.`,
    ...(localaiDemo
      ? [
          `- [LocalAI live demo](${localaiDemo}): Runs in any browser with WebGPU.`,
        ]
      : []),
    `- [Repository](${SOURCE_CODE_GITHUB_URL}): Source code for this site.`,
    `- [Sitemap](${USER.website}/sitemap.xml): Indexable pages.`,
    '',
  ].join('\n');
}

export function GET() {
  return new NextResponse(generateLlmsContent(), { headers: MARKDOWN_HEADERS });
}
