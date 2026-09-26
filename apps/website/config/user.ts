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
    twitter: string;
    github: string;
    linkedin: string;
    bluesky: string;
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
  jobTitle: 'AI Engineer · Forward Deployed Engineer · Computer Engineering @ AUS',
  username: 'ahm-adsaad',
  tagline: 'Building production AI systems',
  twitterHandle: '',
  location: 'Abu Dhabi / Sharjah, United Arab Emirates',
  description:
    'Computer Engineering senior at the American University of Sharjah shipping production AI systems: LLM pipelines with real cost governance, evaluation, and stakeholders. Forward deployed engineer: technical enough to build the system, comfortable enough to scope it. UAE Golden Visa holder, available January 2027.',
  metaDescription:
    'Computer Engineering senior building and scoping production AI systems as a forward deployed engineer. UAE Golden Visa holder, available January 2027.',
  namePronunciationUrl: '',
  social: {
    twitter: '',
    github: 'https://github.com/ahm-adsaad',
    linkedin: 'https://www.linkedin.com/in/ahmaddsaad',
    bluesky: '',
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
