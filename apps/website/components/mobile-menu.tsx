'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { isCurrentPath } from '@/lib/is-current-path';
import { stagger } from '@/lib/stagger';

export type MenuLink = {
  label: string;
  href: string;
  external?: boolean;
};

/**
 * The small-screen menu. A native <dialog> sits in the top layer, which is the
 * one place that escapes the header's `mix-blend-mode: difference`.
 */
export function MobileMenu({ links }: { links: MenuLink[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // The dialog lives inside the `md:hidden` wrapper: left open across the
  // 768px breakpoint it would turn display:none while still modal, leaving
  // the page inert. Close it when the viewport grows, and on navigation.
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) dialogRef.current?.close();
    };
    wide.addEventListener('change', onChange);
    return () => wide.removeEventListener('change', onChange);
  }, []);
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const show = () => {
    const dialog = dialogRef.current;
    // The header may be hidden by the scroll hook; bring it back first.
    dialog?.closest('.site-nav')?.classList.remove('is-hidden');
    dialog?.showModal();
    setOpen(true);
  };
  const close = () => dialogRef.current?.close();

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="nav-link"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={show}
      >
        Menu
      </button>

      <dialog
        id="site-menu"
        ref={dialogRef}
        className="site-menu"
        aria-label="Site menu"
        onClose={() => setOpen(false)}
      >
        <div className="site-menu-inner" data-tone="ink">
          <div className="site-menu-bar">
            <span className="mono-label text-bone/56">Menu</span>
            <button type="button" className="nav-link" onClick={close}>
              Close
            </button>
          </div>

          <nav aria-label="Primary, mobile">
            <ul className="site-menu-links">
              {links.map((link, i) => (
                <li key={link.href} style={stagger(i)}>
                  {link.external ? (
                    <a
                      href={link.href}
                      className="site-menu-link display-light"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={close}
                    >
                      {link.label}
                    </a>
                  ) : link.href.startsWith('mailto:') ? (
                    <a
                      href={link.href}
                      className="site-menu-link display-light"
                      onClick={close}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="site-menu-link display-light"
                      aria-current={
                        isCurrentPath(pathname, link.href) ? 'page' : undefined
                      }
                      onClick={close}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </dialog>
    </div>
  );
}
