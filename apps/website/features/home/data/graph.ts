import { USER } from '@/config/user';
import type { Activity } from '@repo/design-system/components/ui/contribution-graph';

type GitHubContributionsResponse = {
  contributions: Activity[];
};

// `force-cache` persists across builds in .next/cache/fetch-cache, so without
// a changing key every deploy would re-serve the first fetch ever made. Keying
// on the build date gives one fresh fetch per day of deploys.
const BUILD_DATE = new Date().toISOString().slice(0, 10);

export async function getContributions() {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${USER.username}?y=last&build=${BUILD_DATE}`,
    // Fetched once at build time and baked into the prerendered page; the
    // graph refreshes on deploy. Do not add `next: { revalidate }` here: it
    // opts the homepage into ISR, which the Worker cannot serve (read-only
    // static-assets cache, no revalidation queue) and the route 500s once
    // the interval elapses. See scripts/assert-static-prerender.mjs.
    { cache: 'force-cache' }
  );
  const data = (await res.json()) as GitHubContributionsResponse;
  return data.contributions;
}
