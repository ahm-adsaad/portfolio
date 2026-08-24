export type ExperiencePositionIcon =
  /** Icon key used to render the position category in the UI. */
  'code' | 'design' | 'education' | 'business' | 'idea';

export type ExperiencePosition = {
  id: string;
  title: string;
  /**
   * Employment period of the position.
   * Use "MM.YYYY" or "YYYY" format. Omit `end` for current roles.
   */
  employmentPeriod: {
    /** Start date (e.g., "10.2022" or "2020"). */
    start: string;
    /** End date; leave undefined for "Present". */
    end?: string;
  };
  /** Full-time | Part-time | Contract | Internship, etc. */
  employmentType?: string;
  description?: string;
  /** UI icon to represent the role type. */
  icon?: ExperiencePositionIcon;
  skills?: string[];
  /** Whether the position is expanded by default in the UI. */
  isExpanded?: boolean;
};

export type Experience = {
  id: string;
  companyName: string;
  /** Company website; omit when no reliable public URL exists. */
  companyUrl?: string;
  city: string;
  /** URL to the company logo (absolute URL or path under /public). */
  companyLogo?: string;
  /** Roles held at this company; keep newest first for display. */
  positions: ExperiencePosition[];
  /** Marks the company as a current employer (open-ended role). */
  isCurrentEmployer?: boolean;
  /** Expanded by default in the UI; all descriptions stay in the DOM either way. */
  isExpanded?: boolean;
};

export const experiences: Experience[] = [
  {
    id: 'samsung-gulf',
    companyName: 'Samsung Gulf Electronics',
    companyUrl: 'https://www.samsung.com/ae/',
    city: 'Dubai, UAE',
    // Role ended 08.2026; stays the flagship entry, so it opens by default.
    isExpanded: true,
    positions: [
      {
        id: 'samsung-ai-ml-engineer',
        title: 'AI/ML Engineer',
        employmentPeriod: {
          start: '06.2026',
          end: '08.2026',
        },
        icon: 'code',
        description:
          'Architected and solely built a production trend intelligence platform in TypeScript, Node.js, and PostgreSQL, running on the official TikTok API for Business alongside commercial data vendors. It measures rising sounds, formats, and topics across 8 discovery lanes and publishes an evidence-grounded dashboard for the regional marketing team.\n\nMeasurement decides, LLMs describe: deterministic signals such as caption n-gram clustering, creator spread, adoption curves, and freshness decide every verdict. A model can name a mechanic or demote a measured riser, but it can never admit an entity the measurements rejected, and it never writes URLs, IDs, counts, or provenance.\n\nTwo-stage screening: a Claude-based brand-fit gate applies voice and brand guardrails and returns structured go or no-go verdicts, followed by a computer vision and reasoning layer that scores GCC cultural applicability. Works in Arabic and English.\n\nCost governance: per-run spend meters plus a cross-process daily budget ledger in PostgreSQL, with balance-gated runs. Thresholds self-calibrate from each lane\'s trailing spend history rather than hand-tuned constants. Combined data and inference spend holds to a fixed single-digit-dollar daily budget.\n\nFull stack ownership: a Dockerized collector running 5 scheduled cron lanes, a Next.js dashboard on Cloudflare Workers behind Cloudflare Access, and custom edge middleware for per-IP rate limiting and CSP headers. 315 automated tests, 16 versioned SQL migrations, npm workspaces monorepo.\n\nForward deployed working style: scoped directly with marketing, creative, and innovation stakeholders and iterated in short feedback cycles. Replaced external tooling with internal trend research, reducing an estimated $60K in spend compared to similar platforms, and supported regional launch campaigns, contributing to a projected 20% increase in engagement rates and recognition from regional HQ.',
        skills: [
          'TypeScript',
          'Node.js',
          'PostgreSQL',
          'Docker',
          'Next.js',
          'Cloudflare Workers',
          'Anthropic Claude API',
        ],
      },
    ],
  },
  {
    id: 'elmec',
    companyName: 'Electro-Mechanical Company LLC',
    companyUrl: 'https://www.elmec.ae/',
    city: 'Abu Dhabi, UAE',
    positions: [
      {
        id: 'elmec-engineering-intern',
        title: 'Engineering Intern',
        employmentPeriod: {
          start: '12.2025',
          end: '01.2026',
        },
        employmentType: 'Internship',
        icon: 'code',
        description:
          'Supported SCADA and substation automation projects across Siemens medium-voltage switchgear platforms (NXAIR, NXPLUS C, 8DJEH). Covered EPC execution workflows, technical submittals, procurement, and on-site material inspections for large-scale water infrastructure.',
        skills: ['SCADA', 'Siemens switchgear', 'EPC workflows'],
      },
    ],
  },
  {
    id: 'chief-nest',
    companyName: 'Chief Nest',
    companyUrl: 'https://chiefnest.com',
    city: 'Remote (Riyadh, Saudi Arabia)',
    isCurrentEmployer: true,
    positions: [
      {
        id: 'chief-nest-account-manager',
        title: 'Account Manager',
        employmentPeriod: {
          start: '09.2025',
        },
        icon: 'business',
        description:
          'Directing a company-wide GTM strategy for a client, scaling operations and restructuring revenue streams. Rebuilt client workflows across process management tools.',
        skills: ['GTM strategy', 'Operations'],
      },
    ],
  },
  {
    id: 'onbrnd',
    companyName: 'ONBRND',
    city: 'Remote (California, USA)',
    positions: [
      {
        id: 'onbrnd-operations-associate',
        title: 'Operations Associate',
        employmentPeriod: {
          start: '09.2025',
          end: '02.2026',
        },
        icon: 'business',
        description:
          'Restructured client workflows in ClickUp, reducing operational inefficiencies by 25%. Supported the CEO with decision-ready operating insights.',
        skills: ['ClickUp', 'Operations'],
      },
    ],
  },
  {
    id: 'aus',
    companyName: 'American University of Sharjah',
    companyUrl: 'https://www.aus.edu/',
    city: 'Sharjah, UAE',
    isCurrentEmployer: true,
    positions: [
      {
        id: 'aus-ai-hub-assistant',
        title: 'AI Hub Assistant, Center of Innovation in Teaching and Learning',
        employmentPeriod: {
          start: '11.2024',
        },
        icon: 'design',
        description:
          'Led the HTML and CSS redesign of the university\'s AI website against stakeholder requirements, prototyping in Figma. Researched emerging AI tooling and produced written evaluations that shaped faculty adoption.',
        skills: ['HTML', 'CSS', 'Figma'],
      },
      {
        id: 'aus-research-assistant',
        title:
          'Undergraduate Research Assistant, Computer Science and Engineering',
        employmentPeriod: {
          start: '10.2024',
          end: '07.2025',
        },
        icon: 'code',
        description:
          'Speech emotion recognition: classified emotion from audio snippets using log-mel spectrogram representations, fine-tuning ResNet and EfficientNet backbones in TensorFlow and Scikit-Learn. Reached roughly 75% accuracy after augmentation and hyperparameter tuning.',
        skills: ['TensorFlow', 'Scikit-Learn', 'Python'],
      },
    ],
  },
];
