import { NextResponse } from 'next/server';

import { SITE_URL } from '@/lib/server-url';

// Static: never echo the request host, always point at the canonical sitemap.
export const dynamic = 'force-static';

/**
 * A route handler instead of app/robots.ts because Next's MetadataRoute.Robots
 * type has no slot for the Content Signals Policy line (contentsignals.org).
 * The owner allows search indexing, AI input (retrieval and grounding) and AI
 * training, and the Cloudflare AI bot policy for the zone is set to match.
 * If that policy changes, flip ai-train here in the same change.
 */
const ROBOTS_TXT = [
  '# Content Signals Policy: https://contentsignals.org',
  'User-Agent: *',
  'Content-Signal: search=yes, ai-input=yes, ai-train=yes',
  'Allow: /',
  // Never block /_next/: Googlebot needs the CSS/JS/font chunks to render.
  'Disallow: /api/',
  'Disallow: /admin',
  '',
  `Sitemap: ${SITE_URL}/sitemap.xml`,
  '',
].join('\n');

export function GET() {
  return new NextResponse(ROBOTS_TXT, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
