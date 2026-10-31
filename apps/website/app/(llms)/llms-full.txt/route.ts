import { NextResponse } from 'next/server';

import { CONTENT_LAST_MODIFIED } from '@/config/site';
import { USER } from '@/config/user';
import {
  MARKDOWN_HEADERS,
  formatAboutMarkdown,
  formatEducationMarkdown,
  formatExperienceMarkdown,
  formatFaqMarkdown,
  formatPressMarkdown,
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
    `Last updated: ${CONTENT_LAST_MODIFIED}`,
    '',
    formatAboutMarkdown(2),
    '',
    '## Press',
    '',
    ...formatPressMarkdown(),
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
    formatFaqMarkdown(2),
    '',
  ].join('\n');
}

export function GET() {
  return new NextResponse(generateFullContent(), { headers: MARKDOWN_HEADERS });
}
