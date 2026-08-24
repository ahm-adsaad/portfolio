import { Icons } from '@/components/icons';
import { SOURCE_CODE_GITHUB_URL } from '@/config/site';
import { USER } from '@/config/user';

export const DockConfig = {
  navbar: [
    { href: '/', icon: Icons.home, label: 'Home', ariaLabel: 'Home' },
    // Re-enable once real posts exist:
    // { href: '/craft', icon: Icons.craft, label: 'Craft' },
    // { href: '/blog', icon: Icons.bookmark, label: 'Blog' },
    // Re-enable with your own cal.com link (features/cal):
    // { href: '/cal', icon: Icons.calendar, label: 'Book a Meeting' },
  ],
  contact: {
    social: {
      GitHub: {
        name: 'GitHub',
        url: SOURCE_CODE_GITHUB_URL,
        icon: Icons.github,
        // Icon-only links need an accessible name (WCAG 2.4.4).
        ariaLabel: 'Source code of this site on GitHub',
      },
      LinkedIn: {
        name: 'LinkedIn',
        url: USER.social.linkedin,
        icon: Icons.linkedin,
        ariaLabel: `${USER.name} on LinkedIn`,
      },
      // X: {
      //   name: 'X',
      //   url: USER.social.twitter,
      //   icon: Icons.x,
      // },
      CV: {
        name: 'CV',
        // Opens the PDF in a new tab for viewing (no forced download).
        url: '/Ahmad_Saad_CV.pdf',
        icon: Icons.resume,
        ariaLabel: 'Download CV (PDF)',
      },
      email: {
        name: 'Send Email',
        url: `mailto:${USER.email}`,
        icon: Icons.email,
        ariaLabel: `Email ${USER.name}`,
      },
      // Bluesky: {
      //   name: 'Bluesky',
      //   url: USER.social.bluesky,
      //   icon: Icons.bluesky,
      // },
    },
  },
};
