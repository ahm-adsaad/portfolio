import { addPathToBaseURL } from '@/lib/server-url';
import dayjs from 'dayjs';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ['/'];

  return Promise.all(
    routes.map(async (route) => ({
      url: await addPathToBaseURL(route),
      lastModified: dayjs().toISOString(),
    }))
  );
}
