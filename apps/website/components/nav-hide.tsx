'use client';

import { useEffect } from 'react';

/**
 * Hides the header on scroll down and brings it back on scroll up, so the
 * difference-blended links do not sit over long body copy. Transform only
 * (`.site-nav.is-hidden`), one passive listener, batched per frame. Always
 * visible within 80px of the top and while the mobile menu is open.
 */
export function NavHide() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>('header.site-nav');
    if (!nav) return;
    let last = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const menuOpen = nav.querySelector('dialog[open]') !== null;
      nav.classList.toggle('is-hidden', y > 80 && y > last && !menuOpen);
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
      nav.classList.remove('is-hidden');
    };
  }, []);

  return null;
}
