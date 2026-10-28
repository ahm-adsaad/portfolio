'use client';

import type { Activity } from '@repo/design-system/components/ui/contribution-graph';
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from '@repo/design-system/components/ui/contribution-graph';

export function GitHubContributionGraph({
  contributions,
}: {
  contributions: Activity[];
}) {
  return (
    <ContributionGraph
      className="font-mono"
      data={contributions}
      fontSize={11}
      blockSize={9}
      blockMargin={3}
      labels={{
        totalCount: '{{count}} contributions in the last year',
      }}
    >
      <ContributionGraphCalendar className="no-scrollbar">
        {({ activity, dayIndex, weekIndex }) => (
          <ContributionGraphBlock
            activity={activity}
            dayIndex={dayIndex}
            weekIndex={weekIndex}
          />
        )}
      </ContributionGraphCalendar>

      <ContributionGraphFooter className="mono-label pt-2">
        <ContributionGraphTotalCount className="text-bone/48" />
        <ContributionGraphLegend />
      </ContributionGraphFooter>
    </ContributionGraph>
  );
}
