export const EDUCATION = {
  school: 'American University of Sharjah',
  shortName: 'AUS',
  url: 'https://www.aus.edu/',
  sameAs: [
    'https://en.wikipedia.org/wiki/American_University_of_Sharjah',
    'https://www.wikidata.org/wiki/Q4115992',
  ],
  city: 'Sharjah, UAE',
  degree: 'B.S. in Computer Engineering',
  period: '08.2023 - 12.2026 (expected)',
  gpa: '3.96 / 4.0',
  highlights: [
    'President of Tau Beta Pi UAE Alpha, previously chapter Vice President',
    'Tau Beta Pi Scholarship, US$1,000 for the final semester (2026)',
    'Treasurer of the IEEE Solid-State Circuits Society',
    "Academic Merit Scholarship, Dean's List (x6), Chancellor's List (x3)",
  ],
  coursework: [
    'Machine Learning',
    'Data Structures and Algorithms',
    'Computer Architecture',
    'Computer Networks',
    'Wireless Communications',
  ],
};

export type Certification = {
  name: string;
  issuer: string;
  /** Year awarded; shown after the issuer when set. */
  year?: string;
  /** Public verification link (Credly or the issuer's page); omit if none. */
  url?: string;
  /**
   * Path under /public to the issuer's official badge artwork, e.g.
   * '/credentials/claude-certified-architect.png'. When set, the badge is
   * shown instead of the typographic stamp.
   */
  image?: string;
};

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'Claude Certified Architect: Foundations',
    issuer: 'Anthropic',
    url: 'https://www.credly.com/badges/976e4176-241f-4870-83ea-c66f896f64ff',
    image: '/credentials/claude-certified-architect.png',
  },
];
