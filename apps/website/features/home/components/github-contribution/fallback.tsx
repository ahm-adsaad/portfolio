import { LoaderIcon } from 'lucide-react';

export function GitHubContributionFallback() {
  return (
    <div className="flex h-[162px] items-center justify-center">
      <LoaderIcon className="animate-spin text-foreground" />
    </div>
  );
}
