import dynamic from 'next/dynamic';

import { LazyBottomDock } from './dock/lazy';

const ScrollTop = dynamic(() =>
  import('@/components/scroll-top').then((mod) => mod.ScrollTop)
);

export default function Navigation() {
  return (
    <>
      <LazyBottomDock className="hidden lg:block" />
      <ScrollTop />
    </>
  );
}
