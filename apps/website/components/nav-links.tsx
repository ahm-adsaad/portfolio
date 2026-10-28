'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { isCurrentPath } from '@/lib/is-current-path';
import type { MenuLink } from './mobile-menu';

/** The desktop link row; `aria-current` drives the underline in globals.css. */
export function NavLinks({ links }: { links: MenuLink[] }) {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-7">
      {links.map((link) => (
        <li key={link.href}>
          {link.external ? (
            <a
              href={link.href}
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ) : link.href.startsWith('mailto:') ? (
            <a href={link.href} className="nav-link">
              {link.label}
            </a>
          ) : (
            <Link
              href={link.href}
              className="nav-link"
              aria-current={isCurrentPath(pathname, link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
