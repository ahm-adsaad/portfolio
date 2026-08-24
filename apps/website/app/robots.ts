import { SITE_URL } from '@/lib/server-url';
import type { MetadataRoute } from 'next';

// Static: never echo the request host, always point at the canonical sitemap.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Never block /_next/: Googlebot needs the CSS/JS/font chunks to render.
        disallow: ['/api/', '/admin'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
