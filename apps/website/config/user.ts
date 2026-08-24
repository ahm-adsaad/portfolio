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
    profile: string;
  };
  flipSentences: string[];
  experiences?: Experience[];
};

const USER: User = {
  firstName: 'Ahmad',
  lastName: 'Saad',
  name: 'Ahmad Saad',
  email: 'mohammeddabbagh3@gmail.com',
  domain: 'ahmadsaad.dev',
  jobTitle: 'Software Engineer',
  username: 'ahm-adsaad',
  tagline: 'Ahmad Saad — Building software that feels effortless',
  twitterHandle: '',
  location: '',
  description:
    'Software engineer building polished products — from clean architecture to fast, thoughtful interfaces.',
  namePronunciationUrl: '',
  social: {
    twitter: '',
    github: 'https://github.com/ahm-adsaad',
    linkedin: '',
    bluesky: '',
  },
  flipSentences: [
    'Building software that feels effortless.',
    'Full-stack development, done thoughtfully.',
    'Turning rough ideas into polished products.',
  ],
  image: {
    profile: 'https://github.com/ahm-adsaad.png',
  },
  experiences: experiences,
};

USER.website = `https://${USER.domain}`;

export { USER };
