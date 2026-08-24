import { NextResponse } from 'next/server';

import { PROJECTS } from '@/config/projects';
import { USER } from '@/config/user';

// Force static generation at build time
export const dynamic = 'force-static';

function generateFullContent() {
  const projects = PROJECTS.map((project) => {
    const lines = [
      `### ${project.title}`,
      '',
      project.shortDescription ?? '',
      '',
      ...(project.link ? [`- Link: ${project.link}`] : []),
      `- Tech: ${project.skills.join(', ')}`,
      `- Period: ${project.period.start}${project.period.end ? ` - ${project.period.end}` : ' - present'}`,
    ];
    if (project.impact) {
      lines.push(`- Impact: ${project.impact}`);
    }
    return lines.join('\n');
  });

  return [
    `# ${USER.name}`,
    '',
    `> ${USER.description}`,
    '',
    `- Website: ${USER.website}`,
    ...Object.entries(USER.social)
      .filter(([, url]) => url)
      .map(([name, url]) => `- ${name}: ${url}`),
    '',
    '## Projects',
    '',
    ...projects,
    '',
  ].join('\n');
}

export function GET() {
  return new NextResponse(generateFullContent(), {
    headers: {
      'Content-Type': 'text/markdown;charset=utf-8',
    },
  });
}
