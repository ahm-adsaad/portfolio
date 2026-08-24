'use client';

import dynamic from 'next/dynamic';

// The dock is interactive chrome with no SEO value; loading it after
// hydration keeps `motion` and the buddy store out of the critical path.
const BottomDock = dynamic(() => import('@/components/navigation/dock'), {
  ssr: false,
});

export function LazyBottomDock({ className }: { className: string }) {
  return <BottomDock className={className} />;
}
