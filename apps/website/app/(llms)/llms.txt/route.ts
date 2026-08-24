import { NextResponse } from 'next/server';

import { USER } from '@/config/user';

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
    `- [About](${USER.website}/me/about.md): Who I am and how to reach me.`,
    `- [Experience](${USER.website}/me/experience.md): My work experience.`,
    `- [Craft](${USER.website}/me/craft.md): A collection of my work.`,
    '',
    '## Social',
    '',
    ...Object.entries(USER.social)
      .filter(([, url]) => url)
      .map(([name, url]) => `- [${name}](${url})`),
    '',
  ].join('\n');
}

export function GET() {
  return new NextResponse(generateLlmsContent(), {
    headers: {
      'Content-Type': 'text/markdown;charset=utf-8',
    },
  });
}
