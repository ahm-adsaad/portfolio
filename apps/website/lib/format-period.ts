import type { Project } from '@/config/projects';

/** "06.2026 - 08.2026", "08.2026 - Present", or just "2025". */
export function formatPeriod({ start, end }: Project['period']): string {
  if (end === start) return start;
  if (!end) return start.includes('.') ? `${start} - Present` : start;
  return `${start} - ${end}`;
}
