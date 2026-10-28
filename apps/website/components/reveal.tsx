'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * One IntersectionObserver for every `[data-reveal]` element. Adds `js` to
 * <html> so the hiding rule only applies when this can actually un-hide.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)')
    );
    if (nodes.length === 0) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches || !('IntersectionObserver' in window)) {
      for (const node of nodes) node.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );
    for (const node of nodes) observer.observe(node);

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
