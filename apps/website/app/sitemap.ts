import { PROJECT_PAGES } from '@/config/projects';
import { CONTENT_LAST_MODIFIED } from '@/config/site';
import { USER } from '@/config/user';
import { projectPath } from '@/lib/seo/project-schema';
import { SITE_URL, addPathToBaseURL } from '@/lib/server-url';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

type Route = { path: string; images?: string[] };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: Route[] = [
    { path: '/', images: [USER.image.profile] },
    { path: '/about', images: [USER.image.profile] },
    { path: '/projects' },
    ...PROJECT_PAGES.map((project) => ({
      path: projectPath(project),
      images: project.image ? [`${SITE_URL}${project.image}`] : undefined,
    })),
  ];

  return Promise.all(
    routes.map(async ({ path, images }) => ({
      url: await addPathToBaseURL(path),
      lastModified: CONTENT_LAST_MODIFIED,
      ...(images ? { images } : {}),
    }))
  );
}
