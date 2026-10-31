import { USER } from '@/config/user';
import { MARKDOWN_HEADERS, formatProjectsMarkdown } from '@/lib/llms';

const content = `# Projects by ${USER.name}

> Selected projects by ${USER.name}, an AI engineer and Computer Engineering senior at the American University of Sharjah (AUS).

${formatProjectsMarkdown(2)}
`;

export const dynamic = 'force-static';

export async function GET() {
  return new Response(content, { headers: MARKDOWN_HEADERS });
}
