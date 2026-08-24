import { NextResponse } from 'next/server';

import { SOURCE_CODE_GITHUB_URL } from '@/config/site';
import { USER } from '@/config/user';
import { MARKDOWN_HEADERS } from '@/lib/llms';

// Force static generation at build time
export const dynamic = 'force-static';

function generateLlmsContent() {
  return [
    `# ${USER.name}`,
    '',
    `> ${USER.description}`,
    '',
    '## Me',
    '',
    `- [About](${USER.website}/me/about.md): Who I am, where I am based, and how to reach me.`,
    `- [Experience](${USER.website}/me/experience.md): Every role with its full description and skills.`,
    `- [Projects](${USER.website}/me/projects.md): Selected projects with technical detail and measured impact.`,
    '',
    '## Social',
    '',
    ...Object.entries(USER.social)
      .filter(([, url]) => url)
      .map(([name, url]) => `- [${name}](${url})`),
    '',
    '## Optional',
    '',
    `- [Full text](${USER.website}/llms-full.txt): About, experience, projects, and education in one file.`,
    `- [Resume (PDF)](${USER.website}/Ahmad_Saad_CV.pdf): Full CV.`,
    `- [Repository](${SOURCE_CODE_GITHUB_URL}): Source code for this site.`,
    `- [Sitemap](${USER.website}/sitemap.xml): Indexable pages.`,
    '',
  ].join('\n');
}

export function GET() {
  return new NextResponse(generateLlmsContent(), { headers: MARKDOWN_HEADERS });
}
