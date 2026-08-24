'use client';

import dynamic from 'next/dynamic';

// Pure decoration: kept out of the prerendered HTML and off the hydration
// critical path so the hero text paints before this chunk even downloads.
const ShootingStars = dynamic(
  () =>
    import('@/components/ui/shooting-stars').then((mod) => mod.ShootingStars),
  { ssr: false }
);

export function ShootingStarsLayer() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-70 motion-reduce:hidden"
      aria-hidden="true"
    >
      <ShootingStars
        starColor="#7C3AED"
        trailColor="#2EB9DF"
        minDelay={1200}
        maxDelay={4200}
      />
      <ShootingStars
        starColor="#2EB9DF"
        trailColor="#7C3AED"
        minSpeed={8}
        maxSpeed={22}
        minDelay={2400}
        maxDelay={6000}
      />
    </div>
  );
}
