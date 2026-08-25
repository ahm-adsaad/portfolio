import { USER } from '@/config/user';
import type { Activity } from '@repo/design-system/components/ui/contribution-graph';

type GitHubContributionsResponse = {
  contributions: Activity[];
};

export async function getContributions() {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${USER.username}?y=last`,
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
