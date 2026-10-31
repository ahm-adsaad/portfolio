import { USER } from './user';

/**
 * Copy for /cv. Compact bullets rewritten from config facts. The Samsung
 * entry never names the project it describes, and the Projects list comes
 * from PROJECT_PAGES.
 */
export const CV_PAGE = {
  path: '/cv',
  /** First publication (YYYY-MM-DD). */
  published: '2026-10-31',
  title: `${USER.name} CV: AI Engineer, Computer Engineering at AUS`,
  description: `${USER.name}'s CV: AI engineer and forward deployed engineer, Computer Engineering at AUS (3.96 GPA), ex Samsung Gulf Electronics, available January 2027.`,
  h1: `${USER.name}, CV`,
  ogTitle: `${USER.name}, CV`,
  ogMeta: 'AI Engineer · AUS Computer Engineering',
  headline: `${USER.fullName} · ${USER.jobTitle}`,
  status:
    'Abu Dhabi and Sharjah, United Arab Emirates · UAE Golden Visa, no sponsorship required · Available January 2027',
  pdf: { href: '/Ahmad_Saad_CV.pdf', label: 'Download the PDF CV' },
  summary:
    'AI engineer and forward deployed engineer who scopes systems with the people who will use them, then builds, ships and measures them. Computer Engineering at the American University of Sharjah with a 3.96 GPA, graduating in December 2026. Most recently built a production trend intelligence platform at Samsung Gulf Electronics.',
  languages: 'English and Arabic',
};

/** Two to four bullets per position id in config/experience.ts. */
export const CV_HIGHLIGHTS: Record<string, string[]> = {
  'samsung-ai-ml-engineer': [
    'Architected and solely built a production trend intelligence platform for the regional marketing team in TypeScript, Node.js and PostgreSQL.',
    'Deterministic signals decide every verdict; language models only describe what the measurements found.',
    'Held combined data and inference spend to a fixed single-digit-dollar daily budget, with 315 automated tests.',
    'Scoped it with marketing, creative and innovation stakeholders; it replaced external tooling at an estimated $60K in avoided spend and supported launch campaigns with a projected 20% increase in engagement rates.',
  ],
  'elmec-engineering-intern': [
    'Supported SCADA and substation automation projects on Siemens medium-voltage switchgear platforms.',
    'Covered EPC execution workflows, technical submittals, procurement and on-site material inspections.',
  ],
  'chief-nest-account-manager': [
    'Directs a company-wide go-to-market strategy for a client, scaling operations and restructuring revenue streams.',
  ],
  'onbrnd-operations-associate': [
    'Restructured client workflows in ClickUp, reducing operational inefficiencies by 25%.',
  ],
  'aus-web-consultant': [
    'Ships WordPress and Elementor sites for the College of Engineering to live domains in under 48 hours.',
    'Builds sites that non-technical teams maintain themselves, accessible to WCAG AA.',
  ],
  'aus-ai-hub-assistant': [
    'Led the HTML and CSS redesign of the CITL AI Hub (aihub.aus.edu), prototyped in Figma, and maintains it on WordPress.',
    'Writes evaluations of emerging AI tools that shape faculty adoption.',
  ],
  'aus-research-assistant': [
    'Speech emotion recognition from log-mel spectrograms with fine-tuned ResNet and MobileNet models in TensorFlow, at roughly 75% accuracy.',
  ],
};

/** Rendered with RichText. */
export const CV_HONOURS: string[] = [
  "President of [Tau Beta Pi UAE Alpha](/aus#tau-beta-pi), the engineering honor society's chapter at AUS; previously Vice President.",
  'Tau Beta Pi Scholarship, US$1,000 for the final semester (2026), [covered by AUS News](https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship).',
  'Academic Merit Scholarship, American University of Sharjah.',
  "Dean's List six times and Chancellor's List three times.",
  'Has served as Treasurer of the IEEE Solid-State Circuits Society.',
];
