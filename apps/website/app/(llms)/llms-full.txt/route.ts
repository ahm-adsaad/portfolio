import { NextResponse } from 'next/server';

import { USER } from '@/config/user';
import {
  MARKDOWN_HEADERS,
  formatAboutMarkdown,
  formatEducationMarkdown,
  formatExperienceMarkdown,
  formatProjectsMarkdown,
} from '@/lib/llms';

// Force static generation at build time
export const dynamic = 'force-static';

function generateFullContent() {
  return [
    `# ${USER.name}`,
    '',
    `> ${USER.description}`,
    '',
    formatAboutMarkdown(2),
    '',
    '## Experience',
    '',
    formatExperienceMarkdown(3),
    '',
    '## Projects',
    '',
    formatProjectsMarkdown(3),
    '',
    '## Education',
    '',
    formatEducationMarkdown(3),
    '',
  ].join('\n');
}

export function GET() {
  return new NextResponse(generateFullContent(), { headers: MARKDOWN_HEADERS });
}
