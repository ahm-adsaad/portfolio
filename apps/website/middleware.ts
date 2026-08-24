import { type NextRequest, NextResponse } from 'next/server';

import { SITE_DOMAIN } from '@/lib/server-url';

export const config = {
  // Everything except Next's hashed build assets, which the assets binding
  // serves without touching the Worker.
  matcher: ['/((?!_next/static|_next/image).*)'],
};

/** Scheme the visitor used, as seen through Cloudflare. */
function requestScheme(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-proto');
  if (forwarded) return forwarded.split(',')[0].trim().toLowerCase();

  const visitor = request.headers.get('cf-visitor');
  if (visitor) {
    try {
      const scheme = (JSON.parse(visitor) as { scheme?: string }).scheme;
      if (scheme) return scheme.toLowerCase();
    } catch {
      // fall through to the URL scheme
    }
  }

  return request.nextUrl.protocol.replace(':', '').toLowerCase();
}

/**
 * One canonical URL: `https://ahmadsaad.dev`. The www host and plain http both
 * 301 to the apex over https, preserving path and query. Unknown hosts
 * (localhost, *.workers.dev previews) are left alone.
 */
export default function middleware(request: NextRequest) {
  const host = (request.headers.get('host') ?? '').toLowerCase();
  const isWww = host === `www.${SITE_DOMAIN}`;
  const isPlainHttp = host === SITE_DOMAIN && requestScheme(request) === 'http';

  if (isWww || isPlainHttp) {
    const target = new URL(
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
      `https://${SITE_DOMAIN}`
    );
    return NextResponse.redirect(target, 301);
  }

  return NextResponse.next();
}
