import { type Experience, experiences } from './experience';

export type User = {
  firstName: string;
  lastName: string;
  name: string;
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

const USER: User = {
  firstName: 'Ahmad',
  lastName: 'Saad',
  name: 'Ahmad Saad',
  email: 'ahmadd.saad02@gmail.com',
  domain: 'ahmadsaad.dev',
  jobTitle: 'AI Engineer and Forward Deployed Engineer',
  username: 'ahm-adsaad',
  tagline: 'Building production AI systems',
  twitterHandle: '',
  location: 'Abu Dhabi / Sharjah, United Arab Emirates',
  description:
    'Ahmad Saad is an AI engineer and forward deployed engineer based in the United Arab Emirates. He is a Computer Engineering senior at the American University of Sharjah (AUS) with a 3.96 GPA, graduating in December 2026 and available to start in January 2027. He holds a UAE Golden Visa, so no employer sponsorship is required.',
  metaDescription:
    'Ahmad Saad is an AI engineer and forward deployed engineer in the UAE. Computer Engineering senior at AUS, Golden Visa holder, available January 2027.',
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
