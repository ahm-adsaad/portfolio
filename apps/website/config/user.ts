import { type Experience, experiences } from './experience';

export type User = {
  firstName: string;
  /** Middle name; schema additionalName. */
  middleName: string;
  lastName: string;
  name: string;
  /** Full name as AUS publishes it. */
  fullName: string;
  email: string;
  location: string;
  domain: string;
  website?: string;
  description: string;
  /** SERP-length summary (<= 160 chars) for `<meta name="description">` / og:description. */
  metaDescription: string;
  jobTitle: string;
  twitterHandle: string;
  namePronunciationUrl: string;
  username: string;
  tagline: string;
  social: {
    github: string;
    linkedin: string;
    credly: string;
  };
  image: {
    /** Absolute URL of the headshot JPEG (Person.image, sitemap). */
    profile: string;
    width: number;
    height: number;
  };
  flipSentences: string[];
  experiences?: Experience[];
};

// The only place the full name is spelled out. AUS publishes it with the
// middle name (AUS News, 22 June 2026); every other surface templates
// USER.fullName / USER.middleName.
const FIRST_NAME = 'Ahmad';
const MIDDLE_NAME = 'Atef';
const LAST_NAME = 'Saad';
const NAME = `${FIRST_NAME} ${LAST_NAME}`;
const FULL_NAME = `${FIRST_NAME} ${MIDDLE_NAME} ${LAST_NAME}`;

const USER: User = {
  firstName: FIRST_NAME,
  middleName: MIDDLE_NAME,
  lastName: LAST_NAME,
  name: NAME,
  fullName: FULL_NAME,
  email: 'ahmadd.saad02@gmail.com',
  domain: 'ahmadsaad.dev',
  jobTitle: 'AI Engineer and Forward Deployed Engineer',
  username: 'ahm-adsaad',
  tagline: 'Building production AI systems',
  twitterHandle: '',
  location: 'Abu Dhabi / Sharjah, United Arab Emirates',
  description: `${NAME} (${FULL_NAME}) is an AI engineer, forward deployed engineer and Computer Engineering senior at the American University of Sharjah (AUS) in the United Arab Emirates, graduating in December 2026 and available to start work in January 2027. He holds a UAE Golden Visa, so no employer sponsorship is required.`,
  metaDescription:
    'Ahmad Saad is an AI and forward deployed engineer in the UAE and a Computer Engineering senior at the American University of Sharjah. Available January 2027.',
  namePronunciationUrl: '',
  social: {
    github: 'https://github.com/ahm-adsaad',
    linkedin: 'https://www.linkedin.com/in/ahmaddsaad',
    credly:
      'https://www.credly.com/badges/976e4176-241f-4870-83ea-c66f896f64ff',
  },
  flipSentences: [
    'Building production AI systems.',
    'Forward deployed: build it, scope it, ship it.',
    'Measurement decides, LLMs describe.',
    'From scoped idea to shipped system.',
  ],
  // Built from assets/headshot by `pnpm images:headshot`. Same photo as the
  // LinkedIn and GitHub avatars, so image search ties the profiles together.
  image: {
    profile: 'https://ahmadsaad.dev/ahmad-saad.jpg',
    width: 748,
    height: 748,
  },
  experiences: experiences,
};

USER.website = `https://${USER.domain}`;

export { USER };
