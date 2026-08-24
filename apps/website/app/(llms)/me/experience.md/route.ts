import { MARKDOWN_HEADERS, formatExperienceMarkdown } from '@/lib/llms';

const content = `# Experience

${formatExperienceMarkdown(2)}
`;

export const dynamic = 'force-static';

export async function GET() {
  return new Response(content, { headers: MARKDOWN_HEADERS });
}
