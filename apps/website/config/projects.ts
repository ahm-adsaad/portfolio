export type Project = {
  /** Stable unique identifier (used as list key/anchor). */
  id: string;
  title: string;
  /**
   * Project period for display and sorting.
   * Use "MM.YYYY" format. Omit `end` for ongoing projects.
   */
  period: {
    /** Start date (e.g., "05.2025"). */
    start: string;
    /** End date; leave undefined for "Present". */
    end?: string;
  };
  /** Public URL (site, repository, demo, or video). */
  link: string;
  /** Github repository URL. */
  github?: string;
  /** Tags/technologies for chips or filtering. */
  skills: string[];
  /** Short one-line description for list view. */
  shortDescription?: string;
  /** Optional rich description; Markdown and line breaks supported. */
  description?: string;
  /** Logo image URL (absolute or path under /public). */
  logo?: string;
  /** Square cover image for the hero carousel (absolute or path under /public). */
  image?: string;
  /** One-line outcome or result, shown as "Impact" in the hero carousel. */
  impact?: string;
  /** Whether the project card is expanded by default in the UI. */
  isExpanded?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: 'palettebox',
    title: 'PaletteBox',
    period: {
      start: '03.2025',
    },
    link: 'https://palettebox.design/',
    logo: '/project_images/ruixen_ui_logo.jpeg',
    image:
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=640&h=640&fit=crop&q=70&auto=format',
    impact: 'Cut design-to-code handoff time in half',
    skills: [
      'Next.js',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Figma API',
    ],
    shortDescription:
      'A design token manager that syncs Figma variables to code in real time.',
    description: `A bridge between design and engineering workflows.

Features include:
- Two-way sync between Figma variables and CSS/Tailwind tokens
- Visual diff viewer for design changes
- CLI for CI/CD integration
- Team collaboration with role-based access`,
    isExpanded: true,
  },
  {
    id: 'hookshelf',
    title: 'HookShelf',
    period: {
      start: '09.2024',
    },
    link: 'https://hookshelf.dev/',
    logo: '/project_images/shadcnagents.png',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=640&h=640&fit=crop&q=70&auto=format',
    impact: '10k+ weekly npm downloads',
    skills: ['React', 'TypeScript', 'Storybook', 'Vitest', 'npm'],
    shortDescription:
      'A curated collection of production-ready React hooks with interactive docs.',
  },
  {
    id: 'tablewise',
    title: 'Tablewise',
    period: {
      start: '01.2024',
      end: '08.2024',
    },
    link: 'https://tablewise.app/',
    logo: '/project_images/source_of_truth.png',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=640&fit=crop&q=70&auto=format',
    impact: 'Adopted by 40+ non-technical teams',
    skills: [
      'Next.js',
      'PostgreSQL',
      'Prisma',
      'tRPC',
      'Stripe',
    ],
    shortDescription:
      'A lightweight database explorer and query builder for non-technical teams.',
  },
];
