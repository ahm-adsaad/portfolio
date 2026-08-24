import { addPathToBaseURL } from '@/lib/server-url';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

/**
 * Bump this by hand in the same commit that changes visible homepage content
 * (experience, projects, education, copy). NOT on every deploy: a lastmod that
 * churns with each build is a signal Google learns to ignore.
 */
export const CONTENT_LAST_MODIFIED = '2026-08-24';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ['/'];

  return Promise.all(
    routes.map(async (route) => ({
      url: await addPathToBaseURL(route),
      lastModified: CONTENT_LAST_MODIFIED,
    }))
  );
}
