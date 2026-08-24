'use client';

import { use } from 'react';

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
  contributions: Promise<Activity[]>;
}) {
  const data = use(contributions);

  return (
    <ContributionGraph
      className="mx-auto font-mono"
      data={data}
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

      <ContributionGraphFooter className="">
        <ContributionGraphTotalCount className="text-foreground" />
        <ContributionGraphLegend />
      </ContributionGraphFooter>
    </ContributionGraph>
  );
}
