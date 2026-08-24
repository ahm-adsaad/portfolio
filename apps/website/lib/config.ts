import { Icons } from '@/components/icons';
import { SOURCE_CODE_GITHUB_URL } from '@/config/site';
import { USER } from '@/config/user';

export const DockConfig = {
  navbar: [
    { href: '/', icon: Icons.home, label: 'Home' },
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
      },
      // Re-enable once USER.social has the URLs:
      // LinkedIn: {
      //   name: 'LinkedIn',
      //   url: USER.social.linkedin,
      //   icon: Icons.linkedin,
      // },
      // X: {
      //   name: 'X',
      //   url: USER.social.twitter,
      //   icon: Icons.x,
      // },
      email: {
        name: 'Send Email',
        url: `mailto:${USER.email}`,
        icon: Icons.email,
      },
      // Bluesky: {
      //   name: 'Bluesky',
      //   url: USER.social.bluesky,
      //   icon: Icons.bluesky,
      // },
    },
  },
};
