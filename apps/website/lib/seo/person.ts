import { PRESS_MENTIONS } from '@/config/about';
import { CERTIFICATIONS, EDUCATION } from '@/config/education';
import { experiences } from '@/config/experience';
import { USER } from '@/config/user';
import { SITE_URL } from '@/lib/server-url';
import type { ImageObject, Organization, Person, Thing } from 'schema-dts';

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const HEADSHOT_ID = `${SITE_URL}/#headshot`;
export const orgId = (id: string) => `${SITE_URL}/#org-${id}`;
export const AUS_ID = orgId('aus');
export const TBP_CHAPTER_ID = orgId('tbp-uae-alpha');
/** @id of a press article node, so pages can cite it by reference. */
export const articleId = (url: string) => `${url}#article`;

/**
 * ImageObject width or height as a plain integer (pixels). schema-dts types
 * these as Text, but the graph must carry numbers, not quoted strings.
 */
export const pixels = (value: number) => value as unknown as string;

export function headshotImage(): ImageObject {
  return {
    '@type': 'ImageObject',
    '@id': HEADSHOT_ID,
    url: USER.image.profile,
    contentUrl: USER.image.profile,
    width: pixels(USER.image.width),
    height: pixels(USER.image.height),
    caption: `${USER.name} (${USER.fullName}), AI engineer and Computer Engineering student at the American University of Sharjah`,
  };
}

export function ausOrganization(): Thing {
  return {
    '@type': 'CollegeOrUniversity',
    '@id': AUS_ID,
    name: EDUCATION.school,
    alternateName: EDUCATION.shortName,
    url: EDUCATION.url,
    sameAs: EDUCATION.sameAs,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sharjah',
      addressCountry: 'AE',
    },
  };
}

/** Parent companies with a verified public entity page. */
const PARENT_ORGANIZATION: Record<string, Organization> = {
  'samsung-gulf': {
    '@type': 'Organization',
    name: 'Samsung Electronics',
    url: 'https://www.samsung.com',
    sameAs: 'https://en.wikipedia.org/wiki/Samsung_Electronics',
  },
};

/** One node per employer with a public URL; AUS is emitted once, as the university. */
export function employerOrganizations(): Thing[] {
  return experiences
    .filter((e) => e.companyUrl && e.id !== 'aus')
    .map((e) => ({
      '@type': 'Organization' as const,
      '@id': orgId(e.id),
      name: e.companyName,
      url: e.companyUrl,
      ...(PARENT_ORGANIZATION[e.id]
        ? { parentOrganization: PARENT_ORGANIZATION[e.id] }
        : {}),
    }));
}

export function buildPerson(): Person {
  const flagship = experiences.find((e) => e.id === 'samsung-gulf')
    ?.positions[0];
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: USER.name,
    alternateName: [USER.fullName],
    additionalName: USER.middleName,
    givenName: USER.firstName,
    familyName: USER.lastName,
    url: `${SITE_URL}/`,
    image: headshotImage(),
    email: USER.email,
    jobTitle: USER.jobTitle,
    description: USER.description,
    disambiguatingDescription:
      'AI engineer and Computer Engineering senior at the American University of Sharjah, UAE, and President of Tau Beta Pi UAE Alpha.',
    sameAs: Object.values(USER.social).filter(Boolean),
    // Student until December 2026, so AUS is an affiliation, not alumniOf.
    // After graduation: add `alumniOf: { '@id': AUS_ID }` and turn the degree
    // credential below into the awarded degree.
    affiliation: { '@id': AUS_ID },
    // AUS employs him (AI Hub Assistant, College of Engineering consultant),
    // so it stays in worksFor beside Chief Nest.
    worksFor: experiences
      .filter((e) => e.isCurrentEmployer && e.companyUrl)
      .map((e) => ({ '@id': orgId(e.id) })),
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Bachelor of Science in Computer Engineering (in progress, expected December 2026)',
        credentialCategory: 'degree',
        recognizedBy: { '@id': AUS_ID },
      },
      ...CERTIFICATIONS.map((c) => ({
        '@type': 'EducationalOccupationalCredential' as const,
        name: c.name,
        credentialCategory: 'certification',
        recognizedBy: { '@type': 'Organization' as const, name: c.issuer },
        ...(c.url ? { url: c.url } : {}),
      })),
    ],
    knowsLanguage: [
      { '@type': 'Language', name: 'English', alternateName: 'en' },
      { '@type': 'Language', name: 'Arabic', alternateName: 'ar' },
    ],
    memberOf: {
      '@type': 'OrganizationRole',
      roleName: 'President',
      memberOf: {
        '@type': 'Organization',
        '@id': TBP_CHAPTER_ID,
        name: 'Tau Beta Pi UAE Alpha',
        url: 'https://www.tbp.org',
        parentOrganization: {
          '@type': 'Organization',
          name: 'Tau Beta Pi',
          url: 'https://www.tbp.org',
          sameAs: 'https://en.wikipedia.org/wiki/Tau_Beta_Pi',
        },
      },
    },
    award: [
      'Tau Beta Pi Scholarship, US$1,000 (2026)',
      'Academic Merit Scholarship, American University of Sharjah',
      "Dean's List (6 times), American University of Sharjah",
      "Chancellor's List (3 times), American University of Sharjah",
    ],
    // Every current mention is published by AUS.
    subjectOf: PRESS_MENTIONS.map((mention) => ({
      '@type': 'NewsArticle' as const,
      '@id': articleId(mention.url),
      headline: mention.headline,
      url: mention.url,
      datePublished: mention.datePublished,
      ...(mention.image ? { image: mention.image } : {}),
      about: { '@id': PERSON_ID },
      publisher: { '@id': AUS_ID },
      inLanguage: 'en',
    })),
    homeLocation: [
      {
        '@type': 'Place',
        name: 'Sharjah, United Arab Emirates',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Sharjah',
          addressCountry: 'AE',
        },
      },
      {
        '@type': 'Place',
        name: 'Abu Dhabi, United Arab Emirates',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Abu Dhabi',
          addressCountry: 'AE',
        },
      },
    ],
    knowsAbout: [
      'Large language model systems',
      'Retrieval-augmented generation',
      'Prompt engineering',
      'Computer vision',
      'Model fine-tuning',
      'Technical product management',
      'Forward deployed engineering',
      'Applied AI',
      'Cost governance for LLM systems',
      'WebGPU',
      'Embedded systems',
      'LoRaWAN',
      'Computer architecture',
      'Python',
      'TypeScript',
      'PostgreSQL',
      'Next.js',
      'Docker',
      'Cloudflare Workers',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'AI Engineer',
      occupationLocation: { '@type': 'Country', name: 'United Arab Emirates' },
      skills: flagship?.skills,
    },
  };
}

/** The Person plus every node it references by @id, so any page that spreads this resolves on its own. */
export function personGraph(): Thing[] {
  return [ausOrganization(), ...employerOrganizations(), buildPerson()];
}

/** Person for pages that do not carry the full node (case studies). */
export const personStub = () => ({
  '@type': 'Person' as const,
  '@id': PERSON_ID,
  name: USER.name,
  alternateName: [USER.fullName],
  additionalName: USER.middleName,
  url: `${SITE_URL}/`,
  sameAs: Object.values(USER.social).filter(Boolean),
});

/** Names the site's `@id` so `isPartOf` resolves on pages without the full WebSite node. */
export const websiteStub = () => ({
  '@type': 'WebSite' as const,
  '@id': WEBSITE_ID,
  name: USER.name,
  url: `${SITE_URL}/`,
});
