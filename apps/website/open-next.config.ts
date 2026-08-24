import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

/**
 * Every route is prerendered at build time and nothing needs ISR
 * revalidation, so the prerendered HTML is served straight from the Workers
 * static assets (`cdn-cgi/_next_cache`) and, with cache interception, without
 * invoking the Next server at all. Without this the default "dummy" cache made
 * every request a full SSR render (x-nextjs-cache: MISS, TTFB > 1 s).
 *
 * Trade-off: data fetched during prerender (the GitHub contribution graph)
 * only refreshes on deploy.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
