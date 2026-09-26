import { USER } from '@/config/user';
import { addPathToBaseURL } from '@/lib/server-url';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

/**
 * Bump this by hand in the same commit that changes visible homepage content
 * (experience, projects, education, copy). NOT on every deploy: a lastmod that
 * churns with each build is a signal Google learns to ignore.
 */
export const CONTENT_LAST_MODIFIED = '2026-09-26';

type Route = { path: string; images?: string[] };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: Route[] = [{ path: '/', images: [USER.image.profile] }];

  return Promise.all(
    routes.map(async ({ path, images }) => ({
      url: await addPathToBaseURL(path),
      lastModified: CONTENT_LAST_MODIFIED,
      ...(images ? { images } : {}),
    }))
  );
}
