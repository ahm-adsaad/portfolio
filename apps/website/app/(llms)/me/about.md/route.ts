import { USER } from '@/config/user';
import {
  MARKDOWN_HEADERS,
  formatAboutMarkdown,
  formatEducationMarkdown,
} from '@/lib/llms';

const content = `# About ${USER.name}

${formatAboutMarkdown(2)}

## Education

${formatEducationMarkdown(3)}
`;

export const dynamic = 'force-static';

export async function GET() {
  return new Response(content, { headers: MARKDOWN_HEADERS });
}
