import Link from 'next/link';

import { USER } from '@/config/user';
import { MobileMenu, type MenuLink } from './mobile-menu';
import { NavHide } from './nav-hide';
import { NavLinks } from './nav-links';

const LINKS: MenuLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'AUS', href: '/aus' },
  { label: 'CV', href: '/cv' },
  { label: 'Email', href: `mailto:${USER.email}` },
  { label: 'LinkedIn', href: USER.social.linkedin, external: true },
];

/**
 * Fixed header in bone with `mix-blend-mode: difference`, so it inverts by
 * itself over the bone sections. No background; the only JS is the mobile
 * menu, the current-page marker on the links and the hide-on-scroll hook.
 */
export function SiteNav() {
  return (
    <header className="site-nav">
      <Link href="/" className="nav-link" aria-label={`${USER.name}, home`}>
        {USER.name}
      </Link>

      <nav aria-label="Primary" className="hidden md:block">
        <NavLinks links={LINKS} />
      </nav>

      <MobileMenu links={LINKS} />
      <NavHide />
    </header>
  );
}
