'use client';

import {
  CoverflowCarousel,
  type CoverflowSlide,
} from '@/components/ui/coverflow-carousel';
import { PROJECTS, type Project } from '@/config/projects';
import { cn } from '@/lib/utils';

/** "05.2025" → "2025"; with an end date, "2023–2025" (or just the year if equal). */
function periodLabel(period: Project['period']): string {
  const startYear = period.start.slice(-4);
  const endYear = period.end?.slice(-4);
  if (!endYear || endYear === startYear) return startYear;
  return `${startYear}–${endYear}`;
}

function toSlide(project: Project): CoverflowSlide {
  return {
    // The filter below guarantees `image` is set.
    src: project.image as string,
    alt: `${project.title} cover`,
    title: project.title,
    subtitle: project.shortDescription,
    href: project.link,
    meta: [
      { label: 'Tech', value: project.skills.slice(0, 3).join(' · ') },
      { label: 'Year', value: periodLabel(project.period) },
      ...(project.impact ? [{ label: 'Impact', value: project.impact }] : []),
    ],
  };
}

export function ProjectCoverflow({ className }: { className?: string }) {
  const slides = PROJECTS.filter((project) => project.image).map(toSlide);

  if (slides.length === 0) return null;

  return (
    <CoverflowCarousel
      slides={slides}
      showCaption
      // With few slides the loop fold hides the neighbours (a card is faded
      // out by half a turn round the ring), so fall back to a bounded strip.
      loop={slides.length > 3}
      label="Featured projects"
      className={cn(className)}
    />
  );
}
