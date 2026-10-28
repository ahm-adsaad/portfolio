import Link from 'next/link';

import { USER } from '@/config/user';
import { MobileMenu, type MenuLink } from './mobile-menu';

const LINKS: MenuLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Email', href: `mailto:${USER.email}` },
  { label: 'LinkedIn', href: USER.social.linkedin, external: true },
];

/**
 * Fixed header in bone with `mix-blend-mode: difference`, so it inverts by
 * itself over the bone sections. No background, no JS except the mobile menu.
 */
export function SiteNav() {
  return (
    <header className="site-nav">
      <Link href="/" className="nav-link" aria-label={`${USER.name}, home`}>
        {USER.name}
      </Link>

      <nav aria-label="Primary" className="hidden md:block">
        <ul className="flex items-center gap-7">
          {LINKS.map((link) => (
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
                <Link href={link.href} className="nav-link">
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <MobileMenu links={LINKS} />
    </header>
  );
}
