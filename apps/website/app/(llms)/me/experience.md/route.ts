import { USER } from '@/config/user';
import { MARKDOWN_HEADERS, formatExperienceMarkdown } from '@/lib/llms';

const content = `# Experience: ${USER.name}

> Roles held by ${USER.name}, an AI engineer and Computer Engineering senior at the American University of Sharjah (AUS).

${formatExperienceMarkdown(2)}
`;

export const dynamic = 'force-static';

export async function GET() {
  return new Response(content, { headers: MARKDOWN_HEADERS });
}
