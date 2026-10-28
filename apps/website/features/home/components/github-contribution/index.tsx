import { SectionHeader } from '@/components/section-header';
import { getContributions } from '@/features/home/data/graph';
import { LazyGitHubContributionGraph } from './lazy-graph';

export async function GitHubContribution() {
  const data = await getContributions();
  const total = data.reduce((sum, day) => sum + day.count, 0);

  return (
    <section className="section" data-tone="ink" aria-labelledby="github-title">
      <SectionHeader
        id="github-title"
        eyebrow="GitHub"
        value={
          data.length > 0
            ? `${total.toLocaleString('en-US')} contributions`
            : undefined
        }
      />

      <div className="gh-graph" data-reveal>
        {data.length > 0 ? (
          <LazyGitHubContributionGraph contributions={data} />
        ) : (
          <p className="mono-label text-bone/48">
            Contribution data was unavailable when this page was built.
          </p>
        )}
      </div>
    </section>
  );
}
