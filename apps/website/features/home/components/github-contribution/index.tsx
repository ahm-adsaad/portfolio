import { Suspense } from 'react';

import { getContributions } from '@/features/home/data/graph';
import { GitHubContributionFallback } from './fallback';
import { LazyGitHubContributionGraph } from './lazy-graph';

export function GitHubContribution() {
  const contributions = getContributions();

  return (
    <>
      <h2 className="sr-only">GitHub Contribution</h2>

      <Suspense fallback={<GitHubContributionFallback />}>
        <LazyGitHubContributionGraph contributions={contributions} />
      </Suspense>
    </>
  );
}
