import { MARKDOWN_HEADERS, formatProjectsMarkdown } from '@/lib/llms';

const content = `# Projects

${formatProjectsMarkdown(2)}
`;

export const dynamic = 'force-static';

export async function GET() {
  return new Response(content, { headers: MARKDOWN_HEADERS });
}
