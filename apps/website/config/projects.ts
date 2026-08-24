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
    id: 'portfolio',
    title: 'ahmadsaad.dev',
    period: {
      start: '08.2026',
    },
    link: 'https://ahmadsaad.dev',
    github: 'https://github.com/ahm-adsaad/portfolio',
    // TODO: replace with a real screenshot of the site
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=640&h=640&fit=crop&q=70&auto=format',
    skills: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
    shortDescription:
      'This site — a personal portfolio with a 3D coverflow project showcase.',
    isExpanded: true,
  },
  {
    id: 'mano-computer-simulator',
    title: 'Mano Basic Computer Simulator',
    period: {
      start: '02.2026',
    },
    link: 'https://github.com/ahm-adsaad/manos-basic-computer-simulator',
    github: 'https://github.com/ahm-adsaad/manos-basic-computer-simulator',
    // TODO: replace with a real screenshot of the simulator
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=640&h=640&fit=crop&q=70&auto=format',
    skills: ['Python'],
    shortDescription:
      "A simulator for Mano's basic computer architecture — registers, memory, and instruction cycle.",
  },
];
