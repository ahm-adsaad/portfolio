'use client';

import dynamic from 'next/dynamic';

import type { Activity } from '@repo/design-system/components/ui/contribution-graph';
import { GitHubContributionFallback } from './fallback';

// ~370 SVG nodes with no text worth indexing: hydrate it after the page, not
// as part of the initial chunk.
const GitHubContributionGraph = dynamic(
  () => import('./graph').then((mod) => mod.GitHubContributionGraph),
  { ssr: false, loading: () => <GitHubContributionFallback /> }
);

export function LazyGitHubContributionGraph({
  contributions,
}: {
  contributions: Promise<Activity[]>;
}) {
  return <GitHubContributionGraph contributions={contributions} />;
}
