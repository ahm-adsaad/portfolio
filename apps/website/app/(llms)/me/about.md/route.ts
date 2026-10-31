import { CONTENT_LAST_MODIFIED } from '@/config/site';
import { USER } from '@/config/user';
import {
  MARKDOWN_HEADERS,
  formatAboutMarkdown,
  formatEducationMarkdown,
  formatFaqMarkdown,
} from '@/lib/llms';

const content = `# About ${USER.name}

> ${USER.description}

Last updated: ${CONTENT_LAST_MODIFIED}

${formatAboutMarkdown(2)}

## Education

${formatEducationMarkdown(3)}

${formatFaqMarkdown(2)}
`;

export const dynamic = 'force-static';

export async function GET() {
  return new Response(content, { headers: MARKDOWN_HEADERS });
}
