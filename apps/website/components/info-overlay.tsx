'use client';

import dynamic from 'next/dynamic';

// Desktop-only corner overlay (clock, viewport size, llms links). Client-only:
// it renders nothing below 1000px anyway and pulls in `motion`.
const Info = dynamic(() => import('@/features/home/components/info'), {
  ssr: false,
});

export function InfoOverlay({ show }: { show: string[] }) {
  return <Info show={show} />;
}
