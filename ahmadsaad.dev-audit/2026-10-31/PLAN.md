# Round 2 plan: own "Ahmad Atef Saad" and the AUS queries

Date: 2026-10-31. Author: planning agent, for the coordinator, three parallel execution agents (Streams A, B, C) and the fresh evaluation agents.
Inputs: LEDGER.md (rulings R1 to R12), findings/*.md of this folder, 2026-10-30/PLAN.md (Owner actions, Deferred), 2026-10-30/IMPLEMENTATION-REPORT.md, and the repo at main cd4ee5a.

Every path below is relative to `apps/website/` unless it starts with `ahmadsaad.dev-audit/`.

---

## 1. Goal, target queries, scores

Goal: make ahmadsaad.dev the page set that search engines and AI assistants match for the full name "Ahmad Atef Saad" (the form AUS publishes) and for "Ahmad" plus "AUS" / "American University of Sharjah", without doorway pages or stuffing.

Target queries (winnable in weeks): ahmad atef saad; ahmad saad aus; ahmad atef saad aus; ahmad saad american university of sharjah; ahmad saad tau beta pi; tau beta pi aus president; ahmad saad ai hub aus; ahmad saad ai engineer uae; ahmad saad cv. The bare query "ahmad aus" is lifted as far as on-page work can lift it; owning it needs links from aus.edu (Owner actions).

Query to URL map after this round:

| Query | Page that should win |
|---|---|
| ahmad atef saad | /about (title, definition, FAQ), / (title, byline) |
| ahmad saad aus, ahmad atef saad aus, ahmad aus | /aus |
| ahmad saad american university of sharjah | /aus (H1), /about |
| ahmad saad tau beta pi, tau beta pi aus president | /aus#tau-beta-pi |
| ahmad saad ai hub aus | /aus#ai-hub (plus the owner's own aihub.aus.edu team page linking here) |
| ahmad saad ai engineer uae, forward deployed engineer | / |
| ahmad saad cv / resume | /cv (the PDF consolidates into it by a Link canonical header) |

Scores (before from LEDGER.md; after is the planner's estimate once this plan ships, before any owner action):

| Dimension | Weight | Before | Expected after |
|---|---|---|---|
| Technical | 22 | 90 | 92 |
| Content (content architecture) | 23 | 54 | 80 |
| On-Page (name entity) | 20 | 46 | 88 |
| Schema | 10 | 78 | 90 |
| Performance | 10 | 76 | 77 (about 88 once the owner turns off JavaScript Detections) |
| AI Search (GEO) | 10 | 69 | 78 |
| Images | 5 | 62 | 64 |
| **Composite** | 100 | **67** | **84** |
| Search visibility (outside composite) | | 24 | 24 until reindexed; 40 to 55 within 2 to 4 weeks only with GSC and the AI Hub link |
| Off-site (outside composite) | | 38 | 38 until the owner runs the GitHub script and outreach; about 55 after |

Composite before = 0.22x90 + 0.23x54 + 0.20x46 + 0.10x78 + 0.10x76 + 0.10x69 + 0.05x62 = 66.8. It is lower than yesterday's 72 because Content and On-Page are now scored against the name and AUS goal.

---

## 2. Rulings applied, and where this plan deviates

All of R1 to R12 are applied. Deviations and interpretations, each small:

1. **Ownership moves (allowed by the brief):** `lib/llms.ts` and the five `app/(llms)` route files move from Stream A to Stream C, so the FAQ (owned by C) can be mirrored into /me/about.md and /llms-full.txt inside one stream, and so A, the heaviest stream, is lighter. A also takes `config/projects.ts` and four homepage components the brief did not list (`features/home/components/education.tsx`, `contact.tsx`) because they carry the CV pill and the homepage AUS link. B adds a small shared `components/rich-text.tsx`.
2. **Full Person node also on /aus and /cv**, not only on /about and /projects (R5 names those two). Reason: /aus is the page for the AUS queries and its graph should carry the Person's AUS affiliation, the Tau Beta Pi role and the AUS News subjectOf. Same @id and values everywhere, so this adds no conflict.
3. **/about title** is "About Ahmad Saad (Ahmad Atef Saad) | AI Engineer, AUS" (53). It meets R3 (full name in parentheses plus AUS). The meta description spells out the university, which disambiguates AUS from Australia.
4. **Homepage title unchanged from R3:** "Ahmad Saad (Ahmad Atef Saad) · AI Engineer · AUS, UAE" (53). No strictly better candidate under 60 keeps name first, the full name and AUS with UAE.
5. **Hero eyebrow** becomes "AI Engineer · UAE" (name-entity) rather than "AI Engineer · AUS, Sharjah, UAE" (content-architecture): the new byline right under the H1 already says "American University of Sharjah", so a second Sharjah in the hero is repetition.
6. **FAQ heading** is "Questions about Ahmad Saad" (geo) rather than "Questions recruiters ask" (content-architecture): a heading that names the subject extracts better. The 8 questions merge both lists (identity, availability, sponsorship, Tau Beta Pi, AUS roles, Samsung, projects, honours). "Who is Ahmad Atef Saad" and "is he the singer" are merged into one identity question so the full name appears once in the FAQ. "What has he built" omits Trend Radar because /about already has a Samsung answer on the same page.
7. **AUS News press line on /about stays as is** (geo proposed rewriting it with the full name). Reason: the visible full-name cap on /about is reached by the definition, the Education sentence and the FAQ identity question.
8. **Per-route lastmod (content-architecture section 7) is deferred**: every route's copy changes this round, so one CONTENT_LAST_MODIFIED is truthful. /aus and /cv carry their own `published` dates.
9. **Case-study overview openers (geo 6d)** are included as a P2 task (A9) with minimal edits (only the first sentence of each Overview changes).
10. **AUS News coverage on /aus quotes three sentences groups** (R6 allows 2 or 3), verbatim, verified against the live article today.

Facts verified live today by the planner: Wikipedia AUS 200, Wikidata Q4115992 200 (label "American University of Sharjah", description "university in the United Arab Emirates", enwiki sitelink matches), https://www.tbp.org 200, tbp_1_1.jpg 200, https://aihub.aus.edu/ 200, https://aihub.aus.edu/team/mr-ahmad/ 200, the 2026 AUS News article 200 (text read; quotes below copied from it), the 2024 chapter article 200 (canonical https://www.aus.edu/media/news/aus-launches-first-international-chapter-of-tau-beta-pi-engineering-honor-society, published 2024-03-14, says the UAE Alpha installation ceremony was held on March 3, 2024), https://www.aus.edu/citl 200, Samsung Electronics Wikipedia 200. Workers Static Assets `_headers` supports arbitrary custom headers on static responses (developers.cloudflare.com/workers/static-assets/headers), so a `Link` header on the PDF works; a header applied twice is joined with a comma, so declare it once.

---

## 3. Global constraints (every task, every stream)

1. Every route stays statically prerendered: `export const dynamic = 'force-static'`, never `revalidate`, no fs at request time, all copy from `config/*.ts`.
2. Every non-home page passes `path` to `createMetadata` (canonical trap) and uses `absoluteTitle: true` when the title already contains the name.
3. Copy rules for rendered text, metadata, schema strings, text endpoints, code comments and the offsite files: no em dash (U+2014) or en dash (U+2013) anywhere (use commas, colons, periods or the middle dot ·); never mention the gradient-boosting library banned in portfolio-context.md (round2_check.py scan flags it); no data-vendor names; no scraping vocabulary; Trend Radar is never tied to Samsung by name (never in the same sentence, list item or answer); $60K and 20% stay "estimated" / "projected"; first person in the /about and /aus bodies, third person in definition paragraphs, schema and llms files.
4. No invented facts. Allowed sources: config/*.ts, the live site, and the two AUS News articles (facts quoted in this plan). Never claim the Undergraduate Research Grant was his personally (say "a research group whose work was supported by an AUS Undergraduate Research Grant"). Never say Mano or the LoRaWAN board were AUS coursework. Never mention the master's/PhD plan (owner decision). Never emit "Ahmad A. Saad".
5. The literal full name lives in one place: `config/user.ts` (as the parts 'Ahmad', 'Atef', 'Saad'). Everything else templates `USER.fullName` / `USER.middleName`. Check: `grep -rln "Atef" apps/website --include=*.ts --include=*.tsx` prints only `apps/website/config/user.ts`.
6. CITL is "Center for Innovation in Teaching and Learning" everywhere.
7. No new dependencies (Worker gzip stays under 3 MiB; it is 1117 KiB today).
8. Visible full-name budget (visible text, alt excluded): / 2, /about 3, /aus 2, /cv 1, /projects and case studies 0. Alt text with the full name only on the two headshots (/ and /about).

---

## 4. Working rules for the three execution agents (read once)

- Three agents edit the same checkout at the same time. Edit ONLY files your stream owns (section 5). Never run `git checkout`, `git stash`, `git reset`, `git clean`, repo-wide `pnpm format` / `pnpm lint --fix`, or anything that rewrites files you do not own. Do not commit; the coordinator commits per stream.
- Do NOT run `next build`, `pnpm build`, `pnpm dev`, the OpenNext chain or wrangler (they share `.next`). The coordinator builds once after all streams land.
- Type gate (about 10 s, verified today): create `tsconfig.stream-<X>.json` in YOUR scratchpad directory:
  ```json
  {
    "extends": "C:/Users/ahmad/Desktop/GitHubRepos/portfolio/apps/website/tsconfig.json",
    "compilerOptions": { "noEmit": true, "incremental": false, "plugins": [] },
    "include": [
      "C:/Users/ahmad/Desktop/GitHubRepos/portfolio/apps/website/next-env.d.ts",
      "C:/Users/ahmad/Desktop/GitHubRepos/portfolio/apps/website/types/**/*.d.ts",
      "C:/Users/ahmad/Desktop/GitHubRepos/portfolio/apps/website/<each of your .ts/.tsx files>"
    ]
  }
  ```
  Run from `apps/website`: `node_modules/.bin/tsc -p "<scratchpad>/tsconfig.stream-<X>.json"`; expect no output and exit 0. tsc follows imports, so an import of a not-yet-existing contract file fails: use the fallback described in section 6 and re-run once the file exists.
- Optional formatting of your own files only: `node_modules/.bin/biome format --write <your files>` from the repo root.
- Copy scan before you finish: `python -I ../../ahmadsaad.dev-audit/2026-10-31/verify/round2_check.py scan <your files>` must print `clean`.
- Write files with the Write/Edit tools, not shell heredocs.
- Finish by writing `ahmadsaad.dev-audit/2026-10-31/impl/stream-<A|B|C>.md`: files touched, every new user-visible string, deviations with reasons, any fallback left in place (grep marker `round2-fallback`), the typecheck and scan output, and a suggested commit message (human style, no AI attribution, no Co-Authored-By).

---

## 5. File ownership (strictly disjoint)

| Stream | Owns (edit or create) |
|---|---|
| **A, identity and schema** | config/user.ts, config/about.ts, config/education.ts, config/experience.ts, config/site.ts, config/projects.ts; NEW lib/seo/person.ts; lib/seo/project-schema.ts; app/page.tsx, app/projects/page.tsx, app/projects/[id]/page.tsx; features/home/components/hero.tsx, statement.tsx, about-teaser.tsx, education.tsx, contact.tsx; components/headshot.tsx, components/hero-video.tsx |
| **B, new pages and plumbing** | NEW components/rich-text.tsx; NEW config/aus.ts, NEW app/aus/page.tsx; NEW config/cv.ts, NEW app/cv/page.tsx; app/sitemap.ts; components/site-nav.tsx, components/site-footer.tsx (mobile-menu.tsx and nav-links.tsx need no change; B owns them if a change turns out necessary); public/_headers; NEW public/b9f504812ee878b00a15106b08a1f9e1.txt; NEW scripts/indexnow.mjs; scripts/assert-static-prerender.mjs; package.json (apps/website); lib/media.ts (one comment character, B7) |
| **C, about page, FAQ, agent files, off-site** | app/about/page.tsx; NEW config/faq.ts; NEW components/faq.tsx; lib/llms.ts; app/(llms)/llms.txt/route.ts, app/(llms)/llms-full.txt/route.ts, app/(llms)/me/about.md/route.ts, app/(llms)/me/experience.md/route.ts, app/(llms)/me/projects.md/route.ts; NEW ahmadsaad.dev-audit/2026-10-31/offsite/github-profile-README.md, offsite/github-apply.sh, offsite/outreach.md |
| Nobody (do not touch) | app/layout.tsx, lib/seo/metadata.tsx, lib/createOgImage.ts, components/markdown.tsx, next.config.mjs, middleware.ts, every other file |

The single permitted cross-stream edit: if `config/user.ts` has no `fullName` yet when B or C needs it, B or C may add exactly the two fields in section 6 (idempotent: `grep -q "fullName" config/user.ts || <add>`), and must say so in its stream report. A then converts them to the constant form in A1.

---

## 6. Interface contract (shared symbols)

| Symbol | Defined by | Exact form | Used by |
|---|---|---|---|
| `USER.fullName: string` | A1, config/user.ts | `'Ahmad Atef Saad'` (built from name parts) | A, B, C |
| `USER.middleName: string` | A1, config/user.ts | `'Atef'` | A (schema), C (none) |
| `PERSON_ID` | A2, lib/seo/person.ts | `'https://ahmadsaad.dev/#person'` | B, C |
| `WEBSITE_ID` | A2 | `'https://ahmadsaad.dev/#website'` | B, C |
| `HEADSHOT_ID` | A2 | `'https://ahmadsaad.dev/#headshot'` | C |
| `AUS_ID` | A2 | `'https://ahmadsaad.dev/#org-aus'` | B |
| `TBP_CHAPTER_ID` | A2 | `'https://ahmadsaad.dev/#org-tbp-uae-alpha'` | B |
| `articleId(url: string): string` | A2 | `` `${url}#article` `` (the @id of each Person.subjectOf NewsArticle) | B |
| `personGraph(): Thing[]` | A2 | `[ausOrganization(), ...employerOrganizations(), buildPerson()]`: the full Person plus every node it references, so a page that spreads it resolves on its own | B (/aus, /cv), C (/about), A (/, /projects) |
| `personStub()`, `websiteStub()` | A2 (person.ts; project-schema.ts re-exports them) | stub Person with name, alternateName, additionalName, url, sameAs; WebSite stub | A (case studies), B, C |
| `buildPerson(): Person` | A2 | the full Person node | A |
| `RichText({ text, linkClassName? })` | B1, components/rich-text.tsx | renders `[label](href)` tokens in a config string; internal links via next/link, external links target _blank rel "noopener noreferrer" (followed, no UTM) | B (/aus, /cv), C (/about) |
| Link markup in `ABOUT_SECTIONS` paragraphs | A4 writes, C renders | `[label](href)` inside the strings | C must render paragraphs with RichText |
| `ABOUT_DEFINITION`, `FAQ_HEADING`, `ABOUT_FAQ`, `type FaqItem = { question: string; answer: string }` | C1, config/faq.ts | strings in section 9 | C only (about page, llms) |
| `FaqList({ items }: { items: FaqItem[] })`, `faqPageNode(items: FaqItem[], pageUrl: string): FAQPage` | C2, components/faq.tsx | | C only |
| `PROJECT_AUTHOR_PREDICATE` | A4, config/about.ts | `'is an AI engineer and Computer Engineering senior at the American University of Sharjah (AUS).'` | A only |
| Paths `/aus`, `/cv`, fragments `#computer-engineering`, `#tau-beta-pi`, `#ai-hub`, `#research`, `#college-of-engineering`, `#aus-news` | B5 | exact strings | A (homepage link, about.ts links), B (nav, footer, sitemap), C (closing links, llms Pages) |
| IndexNow key | B2 | `b9f504812ee878b00a15106b08a1f9e1` (32 hex, generated with node crypto today) | B, coordinator |

Fallbacks while a contract file is missing (mark each with a `// round2-fallback` comment and list it in your stream report):
- `lib/seo/person.ts` missing: import `personStub`, `websiteStub` from `@/lib/seo/project-schema` (they exist today) and hardcode the id strings from the table above; switch to `@/lib/seo/person` and `personGraph()` as soon as `test -f lib/seo/person.ts` succeeds. Check again before you write your report.
- `components/rich-text.tsx` missing (C only): wait for it; B creates it as its first task. If it is still missing when C reaches C3, copy the reference implementation from B1 into a local function in app/about/page.tsx with the fallback marker.
- `USER.fullName` missing: the idempotent add in section 5.

---

## 7. Stream A: identity and schema

Order matters: A1 and A2 first (they are the contract), then the rest.

### A1. config/user.ts: one source for the full name; new description and meta

- Above `const USER`, add:
  ```ts
  // The only place the full name is spelled out. AUS publishes it as
  // "Ahmad Atef Saad" (AUS News, 22 June 2026); every other surface templates
  // USER.fullName / USER.middleName.
  const FIRST_NAME = 'Ahmad';
  const MIDDLE_NAME = 'Atef';
  const LAST_NAME = 'Saad';
  const NAME = `${FIRST_NAME} ${LAST_NAME}`;
  const FULL_NAME = `${FIRST_NAME} ${MIDDLE_NAME} ${LAST_NAME}`;
  ```
- `type User`: add `middleName: string;` (doc: "Middle name; schema additionalName.") after `firstName`, and `fullName: string;` (doc: "Full name as AUS publishes it.") after `name`.
- `USER`: `firstName: FIRST_NAME, middleName: MIDDLE_NAME, lastName: LAST_NAME, name: NAME, fullName: FULL_NAME,` (if B or C already added literal fields, replace them with these).
- `description` (feeds Person.description and the llms blockquotes; its first sentence is the R8 one-sentence definition):
  ```ts
  description: `${NAME} (${FULL_NAME}) is an AI engineer, forward deployed engineer and Computer Engineering senior at the American University of Sharjah (AUS) in the United Arab Emirates, graduating in December 2026 and available to start work in January 2027. He holds a UAE Golden Visa, so no employer sponsorship is required.`,
  ```
- `metaDescription` (157 chars):
  `'Ahmad Saad is an AI and forward deployed engineer in the UAE and a Computer Engineering senior at the American University of Sharjah. Available January 2027.'`
- Verify: `grep -c "Atef" config/user.ts` = 1. Done when the type has both fields and the two strings match exactly.

### A2. NEW lib/seo/person.ts (the shared Person builder) and project-schema.ts

Create `lib/seo/person.ts`. It must NOT import from `lib/seo/project-schema.ts` (that file re-exports from here; avoid the cycle). Reference implementation (adjust only for type errors; keep every value):

```ts
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
        address: { '@type': 'PostalAddress', addressLocality: 'Sharjah', addressCountry: 'AE' },
      },
      {
        '@type': 'Place',
        name: 'Abu Dhabi, United Arab Emirates',
        address: { '@type': 'PostalAddress', addressLocality: 'Abu Dhabi', addressCountry: 'AE' },
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
```

Then in `lib/seo/project-schema.ts`:
- Delete the local `personStub`, `websiteStub` and `pixels` definitions and replace them with an import plus a re-export, so existing importers keep working and the file can still use `pixels` itself:
  ```ts
  import { CONTENT_LAST_MODIFIED } from '@/config/site';
  import { PERSON_ID, personStub, pixels, websiteStub } from './person';

  export { personStub, pixels, websiteStub };

  /** "06.2026" to "2026-06"; a bare year ("2025") stays as it is. */
  const isoMonth = (value: string) => {
    const [first, second] = value.split('.');
    return second ? `${second}-${first}` : first;
  };
  ```
- In `projectSchema()` add to `base`: `dateCreated: isoMonth(project.period.start), dateModified: CONTENT_LAST_MODIFIED,`. Expected: trend-radar 2026-06, localai 2026-08, mano-computer-simulator 2025, lorawan-sensor-node 2026, portfolio 2026-08.
- Change the author reference to `author: { '@id': PERSON_ID }` (same value as today).

Done when: tsc passes for person.ts, project-schema.ts and app/page.tsx; `grep -n "alumniOf" lib/seo/person.ts` shows only the comment.

### A3. config/education.ts and config/experience.ts

- `EDUCATION`: add `shortName: 'AUS',` and `sameAs: ['https://en.wikipedia.org/wiki/American_University_of_Sharjah', 'https://www.wikidata.org/wiki/Q4115992'],` (both verified 200 today).
- `EDUCATION.highlights` becomes, in order:
  1. `'President of Tau Beta Pi UAE Alpha, previously chapter Vice President'`
  2. `'Tau Beta Pi Scholarship, US$1,000 for the final semester (2026)'`
  3. `'Treasurer of the IEEE Solid-State Circuits Society'` (unchanged; tense waits on the owner)
  4. `"Academic Merit Scholarship, Dean's List (x6), Chancellor's List (x3)"` (unchanged)
- `config/experience.ts`: position `aus-ai-hub-assistant` title becomes `'AI Hub Assistant, Center for Innovation in Teaching and Learning'`. No other change.
- Verify: `grep -rn "Center of Innovation" config` prints nothing.

### A4. config/about.ts

Add `import { USER } from './user';` at the top (no cycle: user.ts imports only experience.ts). Add near the top:
```ts
const AUS_NEWS_2026 =
  'https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship';
```

1. `ABOUT_INTRO`: insert " (AUS)" after "American University of Sharjah". New first sentence: "I'm Ahmad Saad, a Computer Engineering senior at the American University of Sharjah (AUS) in the United Arab Emirates, and I build production AI systems." Second sentence unchanged.
2. `PROFILE_DEFINITION` (homepage About block and llms; third person; full name once):
   ```ts
   export const PROFILE_DEFINITION = `${USER.name}, full name ${USER.fullName}, is an AI engineer and forward deployed engineer based between Abu Dhabi and Sharjah in the United Arab Emirates. He is a Computer Engineering senior at the American University of Sharjah (AUS), where he holds a 3.96 GPA, is President of Tau Beta Pi UAE Alpha, and graduates in December 2026. From June to August 2026 he was an AI/ML Engineer at Samsung Gulf Electronics in Dubai, where he architected and solely built a production trend intelligence platform for the regional marketing team that replaced external tooling at an estimated $60K in avoided spend. He also built LocalAI, private AI for company documents that runs entirely in the browser. He holds the Claude Certified Architect: Foundations certification from Anthropic, speaks English and Arabic, holds a UAE Golden Visa, so no employer sponsorship is required, and is available to start in January 2027.`;
   ```
   Keep the doc comment, but change "/about keeps its first-person intro, so the two never duplicate" to "/about has its own third-person definition in config/faq.ts".
3. `ABOUT_SECTIONS` paragraphs may now contain `[label](href)` links (C renders them with RichText). Exact new strings:
   - Education:
     ```ts
     `I study Computer Engineering at AUS, where I hold a 3.96 GPA and graduate in December 2026. I am President of [Tau Beta Pi UAE Alpha](/aus#tau-beta-pi), the university's chapter of the engineering honor society, after serving as its Vice President, and I was Treasurer of the IEEE Solid-State Circuits Society. In 2026 I received a US$1,000 Tau Beta Pi Scholarship for my final semester, and [AUS News covered the award](${AUS_NEWS_2026}) under my full name, ${USER.fullName}. I study on an Academic Merit Scholarship and have made the Dean's List six times and the Chancellor's List three times. My coursework includes machine learning, data structures and algorithms, computer architecture, computer networks, and wireless communications.`
     ```
   - Experience paragraph 1: unchanged (it must NOT link to /projects/trend-radar).
   - Experience paragraph 2: replace "At AUS I am the AI Hub Assistant at the Center of Innovation in Teaching and Learning, where I led the redesign of the university's AI Hub website" with "At AUS I am the AI Hub Assistant at the Center for Innovation in Teaching and Learning, where I led the redesign of the university's [AI Hub website](/aus#ai-hub)". Rest unchanged.
   - What I build:
     ```ts
     "I like systems where the hard part is trust: knowing where every number came from, what a run costs, and what happens when a data source fails. [LocalAI](/projects/localai), my on-device document Q&A app, runs retrieval and generation entirely in the browser on WebGPU, so no document ever leaves the device. Outside of AI, I have written [a cycle-accurate simulator of Mano's Basic Computer](/projects/mano-computer-simulator) in Python and designed [a custom PCB for an energy harvesting LoRaWAN sensor node](/projects/lorawan-sensor-node)."
     ```
   - What's next: unchanged.
4. `PressMention` type: add `/** Article image (og:image), used in the NewsArticle node. */ image?: string;`. The single entry: `url: AUS_NEWS_2026`, `image: 'https://www.aus.edu/sites/default/files/news/tbp_1_1.jpg'`. Comment above `PRESS_MENTIONS` becomes `/** Third-party coverage. AUS publishes his full name (USER.fullName). */` (no literal).
5. `LLMS_KEY_FACTS` is replaced by exactly these 12 bullets, in order:
   ```ts
   export const LLMS_KEY_FACTS: string[] = [
     `Name: ${USER.name}. Full name: ${USER.fullName}, the form the American University of Sharjah uses (AUS News, 22 June 2026: ${AUS_NEWS_2026}).`,
     `Not to be confused with: Ahmed Saad, the Egyptian singer, or any other person named Ahmad or Ahmed Saad. This ${USER.name} is a computer engineer and AI engineer at AUS in the UAE.`,
     'Education: B.S. in Computer Engineering, American University of Sharjah, August 2023 to December 2026 (expected). GPA 3.96 of 4.0.',
     'Availability: available to start work in January 2027. UAE Golden Visa holder, so no employer sponsorship is required. Based in Abu Dhabi and Sharjah, United Arab Emirates.',
     'Tau Beta Pi: President of Tau Beta Pi UAE Alpha, the AUS chapter (previously Vice President). Received a US$1,000 Tau Beta Pi Scholarship for his final semester, reported by AUS News on 22 June 2026.',
     'Most recent industry role: AI/ML Engineer at Samsung Gulf Electronics, Dubai, June to August 2026. Architected and solely built a production trend intelligence platform for the regional marketing team, at an estimated $60K in avoided tooling spend and a projected 20% increase in engagement rates.',
     'Current roles: Web Design and Development Consultant, College of Engineering, AUS (since August 2026). AI Hub Assistant, Center for Innovation in Teaching and Learning, AUS (since November 2024), where he led the redesign of aihub.aus.edu. Account Manager, Chief Nest, remote (since September 2025).',
     'Research: Undergraduate Research Assistant in Computer Science and Engineering at AUS (October 2024 to July 2025), speech emotion recognition at roughly 75% accuracy. Designed a custom LoRaWAN sensor node PCB in an AUS research group whose work was supported by an AUS Undergraduate Research Grant.',
     'Certification: Claude Certified Architect: Foundations, issued by Anthropic. Verification: https://www.credly.com/badges/976e4176-241f-4870-83ea-c66f896f64ff',
     "Honours: Academic Merit Scholarship, Dean's List six times, Chancellor's List three times.",
     'Languages: English and Arabic.',
     'Looking for: technical product management, forward deployed or solutions engineering, AI/ML engineering, and management and strategy.',
   ];
   ```
6. New export (author line on case studies):
   ```ts
   /** Follows the linked name on every case study; describes the author only, never claims the project was AUS work. */
   export const PROJECT_AUTHOR_PREDICATE =
     'is an AI engineer and Computer Engineering senior at the American University of Sharjah (AUS).';
   ```
- Verify: `grep -c "Atef" config/about.ts` = 0; `grep -c "Center of Innovation" config/about.ts` = 0.

### A5. app/page.tsx (homepage title and graph)

- `HOME_TITLE = \`${USER.name} (${USER.fullName}) · AI Engineer · AUS, UAE\`` (53 chars). Keep the comment, reworded: "Name first for the bare query, then the full name AUS publishes, then AUS disambiguated by UAE."
- OG card unchanged (title USER.name, meta "AI Engineer · American University of Sharjah").
- Replace the local ids, HEADSHOT, organizations, Person and CollegeOrUniversity code with imports from `@/lib/seo/person` (`personGraph`, `PERSON_ID`, `WEBSITE_ID`, `HEADSHOT_ID`). `@graph` becomes: `...personGraph()`, the WebSite node, the ProfilePage node, `...projects`.
- WebSite node gains `alternateName: [USER.fullName, USER.domain]`. ProfilePage keeps `primaryImageOfPage: { '@id': HEADSHOT_ID }`, dateCreated SITE_PUBLISHED, dateModified CONTENT_LAST_MODIFIED.
- Done when the built / graph has: one Person with alternateName ["Ahmad Atef Saad"], additionalName "Atef", no alumniOf, memberOf OrganizationRole, two homeLocation Places, Country occupationLocation, #org-aus with alternateName "AUS" and two sameAs, no dangling @id.

### A6. Homepage components

1. `features/home/components/hero.tsx`
   - Eyebrow text: `AI Engineer · UAE`.
   - New byline between the `</h1>` and the tagline, as one template literal (avoids JSX whitespace issues):
     ```tsx
     <p className="mono-label rise mt-5 text-bone/56" style={stagger(3)}>
       {`${USER.fullName} · Computer Engineering · ${EDUCATION.school}`}
     </p>
     ```
     (import `EDUCATION` from `@/config/education`). Renders "Ahmad Atef Saad · Computer Engineering · American University of Sharjah" (71 chars). Shift the tagline to `stagger(4)`, the pill row to `stagger(5)`, the scroll cue to `stagger(6)`.
   - CV pill: `<PillLink href="/cv" variant="fill">CV</PillLink>` (internal, no `external`).
   - R10: remove `priority` from the `<HeroVideo>` on the homepage (the poster is not LCP here; LCP is the H1 text). This drops both the poster preload and its fetchpriority=high on / only; /about keeps `priority` (its desktop LCP is the poster). No change to hero-video.tsx.
2. `components/headshot.tsx`: add an optional prop `alt?: string` with doc "Defaults to the full-name alt; pass one on any page other than / and /about." and render `alt={alt ?? \`Headshot of ${USER.name} (${USER.fullName})\`}` ("Headshot of Ahmad Saad (Ahmad Atef Saad)", 40 chars). The / hero and /about pass nothing.
3. `features/home/components/education.tsx`: after the highlights `<ul>`, add (imports: `PRESS_MENTIONS` from `@/config/about`, `formatLongDate` from `@/lib/format-long-date`, `Link` from `next/link`):
   ```tsx
   {PRESS_MENTIONS.map((mention) => (
     <p key={mention.url} className="prose-body mt-6 text-bone/72" data-reveal>
       {`${mention.outlet}, ${formatLongDate(mention.datePublished)}: `}
       <a
         href={mention.url}
         className="underline decoration-apricot underline-offset-4 transition-colors hover:text-apricot"
         target="_blank"
         rel="noopener noreferrer"
       >
         {mention.headline}
       </a>
     </p>
   ))}
   <p className="mt-6" data-reveal>
     <Link href="/aus" className="text-link mono-label text-bone">
       Ahmad Saad at AUS: Tau Beta Pi, AI Hub and research
     </Link>
   </p>
   ```
   Visible result: "AUS News, 22 June 2026: AUS engineering student receives competitive Tau Beta Pi Scholarship" and the /aus link.
4. `features/home/components/contact.tsx`: `<PillLink href="/Ahmad_Saad_CV.pdf" external>CV (PDF)</PillLink>` becomes `<PillLink href="/cv">CV</PillLink>`.
5. `about-teaser.tsx`, `statement.tsx`, `hero-video.tsx`: no change (the definition updates through PROFILE_DEFINITION; do not add a "Full name" fact, that would exceed the / budget of 2).

Done when: built / has exactly 2 visible "Ahmad Atef Saad" (byline, definition), 1 alt with it, no `href="/Ahmad_Saad_CV.pdf"` (the PDF is reached from /cv), at least one `href="/aus"` and `href="/cv"` in main, and no `<link rel="preload"` for `/about/drive-poster.webp` in the head of index.html.

### A7. app/projects/page.tsx

- `TITLE = \`Projects by ${USER.name}, AUS Computer Engineering\`` (48). The H1 stays "Projects" / "by Ahmad Saad" (do not use TITLE in the H1; keep `by {USER.name}`). OG card title becomes `\`Projects by ${USER.name}\`` (unchanged look).
- `DESCRIPTION` (153): `'Case studies by Ahmad Saad, Computer Engineering at AUS: a production trend-detection platform, private in-browser AI, a CPU simulator and a sensor node.'`
- Intro: "...Computer Engineering senior at the American University of Sharjah (AUS): two AI systems, ..." (insert " (AUS)").
- JSON-LD: replace `personStub()` with `...personGraph()`; keep `websiteStub()`.

### A8. app/projects/[id]/page.tsx and config/projects.ts metas

- Bottom row: keep the "All projects" link; remove the "About {USER.name}" link; add directly after that `<p>`:
  ```tsx
  <p className="prose-body mt-6 max-w-[60ch] text-fg/72">
    <Link href="/about" className="text-link">
      {USER.name}
    </Link>{' '}
    {PROJECT_AUTHOR_PREDICATE}
  </p>
  ```
  Visible: "Ahmad Saad is an AI engineer and Computer Engineering senior at the American University of Sharjah (AUS)." on all four case studies (including Trend Radar: it names no employer).
- Person stub import from `@/lib/seo/person` (same function).
- `config/projects.ts` seoDescription:
  - mano-computer-simulator (150): `'Cycle-accurate Mano Basic Computer simulator in Python by Ahmad Saad, a Computer Engineering student at AUS, with full ISA support and a CLI debugger.'`
  - lorawan-sensor-node (149): `'Energy harvesting LoRaWAN sensor node on a custom 2-layer PCB by Ahmad Saad, a Computer Engineering student at AUS: ATMEGA4809 MCU and AEM10330 PMIC.'`
  - trend-radar and localai: unchanged.

### A9 (P2, do if time allows). Case-study Overview openers in config/projects.ts

Change only the first sentence of each `description` so each Overview opens with a self-contained passage naming the project and Ahmad Saad (geo 6d, minimal form):
- trend-radar: "A production trend-detection platform built on the official TikTok API for Business." becomes "Trend Radar is a production trend-detection platform that Ahmad Saad architected and built on his own in 2026, on the official TikTok API for Business."
- localai: "Private AI for company documents that runs entirely in the browser." becomes "LocalAI is private AI for company documents that Ahmad Saad has designed and built end to end since August 2026, and it runs entirely in the browser."
- mano-computer-simulator: the whole description becomes "The Mano Basic Computer Simulator is a cycle-accurate Python simulator of Mano's Basic Computer that Ahmad Saad wrote in 2025, with the full datapath, complete ISA support and micro-operation level control, plus a CLI debugger for stepwise execution and state inspection."
- lorawan-sensor-node: prepend "The Energy Harvesting LoRaWAN Sensor Node is a custom 2-layer PCB that Ahmad Saad designed and had fabricated in 2026, in a research group at the American University of Sharjah whose work was supported by an AUS Undergraduate Research Grant. " and change the existing opening "Designed and fabricated a 2-layer custom PCB integrating" to "The board integrates".
Do not touch `shortDescription`, `caseStudy` or `impact`.

### A10. config/site.ts

`CONTENT_LAST_MODIFIED` stays `'2026-10-31'` (all visible copy changes ship together). If the coordinator deploys on a later date it bumps this constant together with `published` in config/aus.ts and config/cv.ts. No other change.

### A11. Report

`impl/stream-A.md`. Suggested commit message: "Make the full name a single source and deepen the Person schema".

---

## 8. Stream B: new pages and plumbing

### B1 (first). NEW components/rich-text.tsx

```tsx
import Link from 'next/link';
import type { ReactNode } from 'react';

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * Renders a config string with inline `[label](href)` links. Internal links
 * ("/..." or "#...") go through next/link. External links open in a new tab
 * with rel="noopener noreferrer" and stay followed, with no UTM parameters:
 * the shared Markdown component adds nofollow and UTM, which citations to
 * aus.edu must not carry.
 */
export function RichText({
  text,
  linkClassName,
}: {
  text: string;
  linkClassName?: string;
}) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    const start = match.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    const internal = href.startsWith('/') || href.startsWith('#');
    parts.push(
      internal ? (
        <Link key={start} href={href} className={linkClassName}>
          {label}
        </Link>
      ) : (
        <a
          key={start}
          href={href}
          className={linkClassName}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      )
    );
    last = start + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

/** The same string with the link markup removed (for schema or text files). */
export const plainText = (text: string) => text.replace(LINK, '$1');
```
Done when tsc passes on it.

### B2. IndexNow: key file, script, package.json

1. `public/b9f504812ee878b00a15106b08a1f9e1.txt`, whole content exactly `b9f504812ee878b00a15106b08a1f9e1` (no trailing newline; write it with the Write tool). Served at https://ahmadsaad.dev/b9f504812ee878b00a15106b08a1f9e1.txt.
2. NEW `scripts/indexnow.mjs`:
   ```js
   // Submits every URL in the sitemap to IndexNow (Bing, Yandex, Seznam, Naver,
   // Yep). Google does not use IndexNow. Run after a production deploy:
   //   pnpm indexnow                      fetch the live sitemap and submit
   //   pnpm indexnow --dry-run            print the payload, send nothing
   //   pnpm indexnow --dry-run --sitemap .next/server/app/sitemap.xml.body
   // Responses: 200 or 202 accepted; 403 key file missing or wrong; 422 a URL
   // is not on this host; 429 too many requests.
   import { readFile } from 'node:fs/promises';

   const HOST = 'ahmadsaad.dev';
   const KEY = 'b9f504812ee878b00a15106b08a1f9e1';
   const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
   const ENDPOINT = 'https://api.indexnow.org/indexnow';

   const args = process.argv.slice(2);
   const dryRun = args.includes('--dry-run');
   const sitemapAt = args.indexOf('--sitemap');
   const sitemap =
     sitemapAt >= 0 ? args[sitemapAt + 1] : `https://${HOST}/sitemap.xml`;

   async function load(source) {
     if (/^https?:\/\//.test(source)) {
       const res = await fetch(source);
       if (!res.ok) throw new Error(`${source}: HTTP ${res.status}`);
       return res.text();
     }
     return readFile(source, 'utf8');
   }

   const xml = await load(sitemap);
   // `<loc>` only: image entries use `<image:loc>`, which this does not match.
   const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
     .map((m) => m[1].trim())
     .filter((url) => new URL(url).host === HOST);
   if (urlList.length === 0) {
     console.error(`indexnow: no ${HOST} URLs in ${sitemap}`);
     process.exit(1);
   }

   const payload = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };
   console.log(`indexnow: ${urlList.length} URLs from ${sitemap}`);
   for (const url of urlList) console.log(`  ${url}`);

   if (dryRun) {
     console.log(JSON.stringify(payload, null, 2));
     console.log('indexnow: dry run, nothing sent');
     process.exit(0);
   }

   // The key file must be live first, or IndexNow answers 403.
   const keyRes = await fetch(KEY_LOCATION);
   const keyBody = (await keyRes.text()).trim();
   if (!keyRes.ok || keyBody !== KEY) {
     console.error(
       `indexnow: ${KEY_LOCATION} returned ${keyRes.status} without the key; deploy first`
     );
     process.exit(1);
   }

   const res = await fetch(ENDPOINT, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json; charset=utf-8' },
     body: JSON.stringify(payload),
   });
   console.log(`indexnow: HTTP ${res.status} ${res.statusText}`);
   process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
   ```
3. `package.json` (apps/website) scripts: add `"indexnow": "node ./scripts/indexnow.mjs",` after `assert-static-prerender`. Touch nothing else in package.json.
- Verify now (no build needed): `node scripts/indexnow.mjs --dry-run --sitemap .next/server/app/sitemap.xml.body` lists the 7 current URLs and exits 0 (9 after the coordinator's build).

### B3. public/_headers: PDF consolidates into /cv

Append (one rule, declared once):
```
# The PDF CV points search engines at the HTML CV. A canonical hint, not a
# noindex: the PDF stays crawlable and downloadable.
/Ahmad_Saad_CV.pdf
  Link: <https://ahmadsaad.dev/cv>; rel="canonical"
```
Do NOT add X-Robots-Tag to the PDF (R7 overrides technical.md item 4).
- Verify after the coordinator's build: `grep -A1 "Ahmad_Saad_CV.pdf" .open-next/assets/_headers` shows the Link line; on the preview or live: `curl -sI https://ahmadsaad.dev/Ahmad_Saad_CV.pdf | grep -i "^link"` prints `link: <https://ahmadsaad.dev/cv>; rel="canonical"`.

### B4. scripts/assert-static-prerender.mjs: expected routes

Insert after the ISR block and before the final `console.log`:
```js
// Routes that must be prerendered. A page that silently turns dynamic (or is
// deleted) is simply absent from the manifest, which the ISR check above
// cannot see. Update this list when a page is added or removed.
const EXPECTED_ROUTES = [
  '/',
  '/about',
  '/aus',
  '/cv',
  '/projects',
  '/projects/trend-radar',
  '/projects/localai',
  '/projects/mano-computer-simulator',
  '/projects/lorawan-sensor-node',
  '/sitemap.xml',
  '/robots.txt',
  '/llms.txt',
  '/llms-full.txt',
  '/me/about.md',
  '/me/experience.md',
  '/me/projects.md',
];
const missing = EXPECTED_ROUTES.filter((route) => !(route in (manifest.routes ?? {})));
if (missing.length > 0) {
  console.error('Expected prerendered routes are missing from the manifest:');
  for (const route of missing) console.error(`  ${route}`);
  console.error('A page went dynamic or was removed. Restore force-static, or update EXPECTED_ROUTES.');
  process.exit(1);
}
```
and change the final message to `` `assert-static-prerender: ${Object.keys(manifest.routes ?? {}).length} prerendered routes, none with ISR, all ${EXPECTED_ROUTES.length} expected routes present.` ``
- Verify now against the stale `.next`: `node scripts/assert-static-prerender.mjs; echo $?` lists `/aus` and `/cv` as missing and prints 1 (proves the guard). After the coordinator's build it prints the success line and 0.

### B5. NEW config/aus.ts and NEW app/aus/page.tsx

`config/aus.ts` (copy is final; first person in sections, third person in `intro`; about 600 words in total):
```ts
import { USER } from './user';

export type AusSection = { id: string; heading: string; paragraphs: string[] };
export type AusQuote = { text: string };

const AUS_NEWS_2026 = {
  outlet: 'AUS News',
  date: '2026-06-22',
  headline: 'AUS engineering student receives competitive Tau Beta Pi Scholarship',
  url: 'https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship',
};

export const AUS_PAGE = {
  path: '/aus',
  /** First publication (YYYY-MM-DD). */
  published: '2026-10-31',
  title: `${USER.name} at AUS: Tau Beta Pi, AI Hub and Research`,
  description: `${USER.name} (${USER.fullName}) at the American University of Sharjah: Tau Beta Pi UAE Alpha President, AI Hub Assistant, researcher and 3.96 GPA.`,
  ogTitle: `${USER.name} at AUS`,
  ogMeta: 'Tau Beta Pi · AI Hub · Research',
  eyebrow: 'AUS · Sharjah, UAE',
  h1: `${USER.name} at the American University of Sharjah`,
  intro: `${USER.name}, published by AUS as ${USER.fullName}, is a Computer Engineering senior at the American University of Sharjah (AUS) in the United Arab Emirates. He holds a 3.96 GPA, is President of Tau Beta Pi UAE Alpha, works as an AI Hub Assistant at the Center for Innovation in Teaching and Learning, and graduates in December 2026.`,
  facts: [
    { label: 'Degree', value: 'B.S. Computer Engineering, December 2026' },
    { label: 'GPA', value: '3.96 / 4.0' },
    { label: 'Tau Beta Pi UAE Alpha', value: 'President' },
    { label: 'AI Hub Assistant', value: 'Since November 2024' },
  ],
  sections: [
    {
      id: 'computer-engineering',
      heading: 'Computer Engineering at AUS',
      paragraphs: [
        'I am completing a B.S. in Computer Engineering at AUS, which I started in August 2023 and expect to finish in December 2026, with a 3.96 GPA out of 4.0. I study on an Academic Merit Scholarship and have made the Dean\'s List six times and the Chancellor\'s List three times.',
        "My coursework includes machine learning, data structures and algorithms, computer architecture, computer networks and wireless communications. Computer architecture is also the subject of my [cycle-accurate simulator of Mano's Basic Computer](/projects/mano-computer-simulator), written in Python.",
      ],
    },
    {
      id: 'tau-beta-pi',
      heading: 'Tau Beta Pi UAE Alpha',
      paragraphs: [
        "Tau Beta Pi is the engineering honor society. Its AUS chapter, UAE Alpha, was installed on 3 March 2024 as the society's [first international chapter](https://www.aus.edu/media/news/aus-launches-first-international-chapter-of-tau-beta-pi-engineering-honor-society). I am the chapter's President, after serving as its Vice President, and I have also served as Treasurer of the IEEE Solid-State Circuits Society.",
        'In 2026 I received a Tau Beta Pi Scholarship, a US$1,000 award for my final semester of full-time undergraduate study. The society gives it to initiated members through a competitive, merit-based process that considers academic achievement, extracurricular involvement and potential to contribute to the engineering profession.',
      ],
    },
    {
      id: 'ai-hub',
      heading: 'The AUS AI Hub',
      paragraphs: [
        'Since November 2024 I have worked part-time as an AI Hub Assistant at the AUS Center for Innovation in Teaching and Learning (CITL). The [AI Hub](https://aihub.aus.edu/) gives AUS faculty, staff and students vetted AI tools, guides and resources.',
        'I led the redesign of the AI Hub website against stakeholder requirements, prototyped it in Figma and maintain it on WordPress, and I write evaluations of emerging AI tools that shape how faculty adopt them. My profile is on the [AI Hub team page](https://aihub.aus.edu/team/mr-ahmad/).',
      ],
    },
    {
      id: 'research',
      heading: 'Research at AUS',
      paragraphs: [
        'From October 2024 to July 2025 I was an Undergraduate Research Assistant in Computer Science and Engineering at AUS. I worked on speech emotion recognition, classifying emotion from audio with log-mel spectrograms and fine-tuned ResNet and MobileNet models in TensorFlow, and reached roughly 75% accuracy. AUS News describes the project as an emotion recognition system that analyzes sound patterns in the Arabic language.',
        'I also designed and fabricated the custom PCB for an [energy harvesting LoRaWAN sensor node](/projects/lorawan-sensor-node) in an AUS research group whose work was supported by an AUS Undergraduate Research Grant, from circuit design to measuring how efficiently the board uses power.',
      ],
    },
    {
      id: 'college-of-engineering',
      heading: 'Web work for the College of Engineering',
      paragraphs: [
        'Since August 2026 I have been a Web Design and Development Consultant for the AUS College of Engineering. I ship WordPress and Elementor sites to live domains in under 48 hours, build them so non-technical teams can maintain them on their own, and keep them accessible to WCAG AA.',
      ],
    },
  ] satisfies AusSection[],
  coverage: {
    id: 'aus-news',
    heading: 'In AUS News',
    article: AUS_NEWS_2026,
    lead: `On 22 June 2026, AUS News covered my Tau Beta Pi Scholarship under my full name, ${USER.fullName}, in [${AUS_NEWS_2026.headline}](${AUS_NEWS_2026.url}). Three of my answers from that article:`,
    /** Verbatim from the article (checked 2026-10-31); cite as "AUS News, 22 June 2026". */
    quotes: [
      { text: 'This scholarship is a proud moment for me because it recognizes the path I have been building at AUS.' },
      { text: 'Working on both AI models and hardware taught me to think about the whole system. It is not enough for a model to perform well in testing. It also has to be efficient, reliable and suitable for the environment where it will be used.' },
      { text: 'I want to keep working at the intersection of AI and hardware. My goal is to help turn advanced AI research into technology that is efficient, dependable and ready for real use.' },
    ] satisfies AusQuote[],
    citation: 'AUS News, 22 June 2026',
  },
  closing: 'I graduate in December 2026 and am available to start work in January 2027.',
  sources: [
    { label: `AUS News, 22 June 2026: ${AUS_NEWS_2026.headline}`, url: AUS_NEWS_2026.url },
    { label: 'AUS News, 14 March 2024: AUS launches first international chapter of Tau Beta Pi Engineering Honor Society', url: 'https://www.aus.edu/media/news/aus-launches-first-international-chapter-of-tau-beta-pi-engineering-honor-society' },
    { label: 'AI Hub, Center for Innovation in Teaching and Learning, AUS', url: 'https://aihub.aus.edu/' },
  ],
};
```
Rules for /aus: no Trend Radar, no Samsung, no $60K or 20%, no master's/PhD, no Student Residential Life role.

`app/aus/page.tsx` (server component, patterns from app/about/page.tsx):
- `export const dynamic = 'force-static';`
- Metadata: `createMetadata({ title: AUS_PAGE.title, absoluteTitle: true, description: AUS_PAGE.description, path: AUS_PAGE.path, image: createOgImage({ title: AUS_PAGE.ogTitle, meta: AUS_PAGE.ogMeta }) })`.
- JSON-LD (`const PAGE_URL = \`${SITE_URL}${AUS_PAGE.path}\``; do not name a constant `URL`):
  ```ts
  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${PAGE_URL}#page`,
        url: PAGE_URL,
        name: AUS_PAGE.title,
        description: AUS_PAGE.description,
        inLanguage: 'en-US',
        isPartOf: { '@id': WEBSITE_ID },
        about: [{ '@id': PERSON_ID }, { '@id': AUS_ID }],
        mainEntity: { '@id': PERSON_ID },
        mentions: [{ '@id': TBP_CHAPTER_ID }],
        citation: [{ '@id': articleId(AUS_PAGE.coverage.article.url) }],
        breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
        dateCreated: AUS_PAGE.published,
        dateModified: CONTENT_LAST_MODIFIED,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'AUS', item: PAGE_URL },
        ],
      },
      ...personGraph(),
      websiteStub(),
    ],
  };
  ```
  (`TBP_CHAPTER_ID` and the article @id resolve because personGraph() defines them inline.)
- Layout, top to bottom (reuse classes from /about: `section`, `page-hero`, `grid-12`, `SectionHeader`, `display h3-size`, `prose-body body-lg`, `dl.facts`, `PillLink`, `mono-label`):
  1. `<section className="section page-hero" data-tone="ink" aria-labelledby="aus-title">`: `<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'AUS' }]} />`, eyebrow `AUS_PAGE.eyebrow`, `<h1 id="aus-title" className="display h2-size mt-4 text-bone">` with `AUS_PAGE.h1`. No video, no headshot.
  2. At a glance, `data-tone="bone"`: SectionHeader `as="p"` eyebrow "AUS" value "At a glance"; left column `<h2>At a glance</h2>`; right column `<p>` with `AUS_PAGE.intro` (plain text, it has no links) and a `<dl className="facts mt-10">` from `AUS_PAGE.facts`. The intro must be in the body, not in the page-hero (extractors drop the hero).
  3. One `<section id={section.id} className="section scroll-mt-[var(--nav)]" aria-labelledby={\`${section.id}-title\`}>` per `AUS_PAGE.sections` entry, tones alternating starting with ink, SectionHeader eyebrow "AUS" value `` `${formatIndex(i + 1)} / ${formatIndex(total)}` `` where total counts the five sections plus coverage, `<h2 id={\`${section.id}-title\`}>`, paragraphs as `<p><RichText text={p} linkClassName={linkClass} /></p>` (same linkClass as /about).
  4. Coverage section `id="aus-news"`: H2 "In AUS News", the lead through RichText, then each quote as `<figure><blockquote className="display-light ..."><p>{quote.text}</p></blockquote><figcaption className="mono-label mt-3"><a href={article.url} target="_blank" rel="noopener noreferrer">{coverage.citation}</a></figcaption></figure>`.
  5. Closing block (inside the coverage section, after a `border-t`): `<p>{AUS_PAGE.closing}</p>`; pills `<PillLink href="/about" variant="fill">About Ahmad Saad</PillLink>`, `<PillLink href="/projects">Projects</PillLink>`, `<PillLink href="/cv">CV</PillLink>`; a "Sources" `<p className="eyebrow">` and `<ul>` of `AUS_PAGE.sources` as plain external `<a target="_blank" rel="noopener noreferrer">` (no nofollow); `Last updated <time dateTime={CONTENT_LAST_MODIFIED}>{formatLongDate(CONTENT_LAST_MODIFIED)}</time>` in `mono-label`.
- Done when (after the coordinator's build) `.next/server/app/aus.html` exists, title is exactly "Ahmad Saad at AUS: Tau Beta Pi, AI Hub and Research" (51), canonical https://ahmadsaad.dev/aus, H1 "Ahmad Saad at the American University of Sharjah", visible "Ahmad Atef Saad" count 2, the six anchors resolve (`id="tau-beta-pi"` etc. present), no visible "](".

### B6. NEW config/cv.ts and NEW app/cv/page.tsx

`config/cv.ts` (compact bullets, rewritten from config facts; no homepage long description is reused):
```ts
import { USER } from './user';

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
  status: 'Abu Dhabi and Sharjah, United Arab Emirates · UAE Golden Visa, no sponsorship required · Available January 2027',
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
```
`config/cv.ts` must not contain "Trend Radar" (the Samsung entry never names it; the Projects list comes from PROJECT_PAGES).

`app/cv/page.tsx`:
- `force-static`; metadata like /aus with `CV_PAGE` (path '/cv', absoluteTitle, OG `createOgImage({ title: CV_PAGE.ogTitle, meta: CV_PAGE.ogMeta })`).
- JSON-LD: `WebPage` (`@id` /cv#page, url, name CV_PAGE.title, description, inLanguage en-US, isPartOf WEBSITE_ID, about and mainEntity PERSON_ID, breadcrumb /cv#breadcrumb, dateCreated CV_PAGE.published, dateModified CONTENT_LAST_MODIFIED), `BreadcrumbList` Home > CV (`name: 'CV'`, item https://ahmadsaad.dev/cv), `...personGraph()`, `websiteStub()`.
- Layout:
  1. page-hero (ink): Breadcrumb Home > CV; eyebrow "Curriculum vitae"; `<h1>` `CV_PAGE.h1`; `<p className="mono-label">` `CV_PAGE.headline` (the only visible full name on the page); `<p>` `CV_PAGE.status`; pills: Email (mailto, fill), LinkedIn (external), GitHub (external), and `<PillLink href={CV_PAGE.pdf.href} external>{CV_PAGE.pdf.label}</PillLink>` (anchor text exactly "Download the PDF CV").
  2. Sections, alternating tones, each with SectionHeader eyebrow "CV" and an H2: "Summary" (`CV_PAGE.summary`); "Experience" (for each company in `experiences` order: `<h3>` company name with city in a mono line; for each position `<h4>` title, `formatPeriod(position.employmentPeriod)` and employmentType when set, `<ul>` of `CV_HIGHLIGHTS[position.id] ?? [firstSentence(position.description)]`); "Education" (`EDUCATION.school`, degree, period, `GPA ${EDUCATION.gpa}`, coursework joined with commas, and `<RichText text="More about my time there: [Ahmad Saad at AUS](/aus)." />`); "Leadership and honours" (`CV_HONOURS` through RichText); "Projects" (`PROJECT_PAGES`: `<Link href={projectPath(p)}>{p.title}</Link>`, `formatPeriod(p.period)`, `p.shortDescription`); "Certification" (`CERTIFICATIONS`: name, issuer, "Verify on Credly" external link when `url`); "Skills and languages" (`TECH_STACK` groups as "Title: a, b, c" lines, then "Spoken languages: English and Arabic").
  3. Closing line with Links to /about ("About Ahmad Saad"), /aus ("Ahmad Saad at AUS") and /projects ("project case studies"), and "Last updated" with a `<time>`.
- `firstSentence` is a local helper: `(text = '') => text.split('\n\n')[0].split(/(?<=\.)\s/)[0]`.
- Target 550 to 700 visible words in main. Done when built `cv.html` has the title (55 chars), canonical /cv, the "Download the PDF CV" link to /Ahmad_Saad_CV.pdf, exactly 1 visible "Ahmad Atef Saad", BreadcrumbList Home > CV.

### B7. Sitemap, nav, footer

- `app/sitemap.ts` routes become, in order: `{ path: '/', images: [USER.image.profile] }`, `{ path: '/about', images: [USER.image.profile] }`, `{ path: '/aus' }`, `{ path: '/cv' }`, `{ path: '/projects' }`, then the project pages. 9 URLs, all `lastModified: CONTENT_LAST_MODIFIED`.
- `components/site-nav.tsx` LINKS: About, Projects, `{ label: 'AUS', href: '/aus' }`, `{ label: 'CV', href: '/cv' }`, Email, LinkedIn (the mobile menu reads the same array).
- `components/site-footer.tsx` list: About, Projects, AUS (/aus), CV (/cv), llms.txt, Source.
- Done when the built sitemap has 9 `<loc>` entries including https://ahmadsaad.dev/aus and https://ahmadsaad.dev/cv, and every built page has `href="/aus"` and `href="/cv"` in the header and footer.
- Housekeeping (found by the planner's scan; nobody else owns the file): `lib/media.ts` line 35 has an em dash in a comment ("under the size limit [em dash] import it lazily"). Replace the dash and its spaces with ", so" giving "under the size limit, so import it lazily so it only". Comment only; no code change. Verify: `python -I ../../ahmadsaad.dev-audit/2026-10-31/verify/round2_check.py scan lib` prints `clean` once A has also finished (A owns nothing in lib/ outside lib/seo).

### B8. Report

`impl/stream-B.md`. Suggested commit message: "Add the AUS and CV pages, IndexNow and an expected-route guard".

---

## 9. Stream C: about page, FAQ, agent files, off-site deliverables

Order: C1, C2, C4, C3, then C5 to C7 (the code first; by C3 the A and B contract files exist).

### C1. NEW config/faq.ts

```ts
import { USER } from './user';

/** /about only: the third-person definition and the Questions block. */
export type FaqItem = { question: string; answer: string };

/** First body paragraph on /about (not in the page hero: extractors drop it). */
export const ABOUT_DEFINITION = `${USER.name}, full name ${USER.fullName}, is an AI engineer, forward deployed engineer and Computer Engineering senior at the American University of Sharjah (AUS) in the United Arab Emirates. He is President of Tau Beta Pi UAE Alpha and an AI Hub Assistant at the AUS Center for Innovation in Teaching and Learning, and in June 2026 AUS News reported his US$1,000 Tau Beta Pi Scholarship. He graduates in December 2026 and is available to start work in January 2027.`;

export const FAQ_HEADING = `Questions about ${USER.name}`;

/** Plain text only (no links): the FAQPage JSON-LD repeats it character for character. */
export const ABOUT_FAQ: FaqItem[] = [
  {
    question: `Is ${USER.fullName} the same person as ${USER.name}?`,
    answer: `Yes. ${USER.name} is the name he uses professionally, and the American University of Sharjah uses his full name, as AUS News did when it covered his Tau Beta Pi Scholarship in June 2026. He is an AI engineer and Computer Engineering senior at AUS in the United Arab Emirates. He is not Ahmed Saad, the Egyptian singer.`,
  },
  {
    question: `Is ${USER.name} available for hire?`,
    answer: `Yes. ${USER.name} graduates from the American University of Sharjah in December 2026 and is available to start work in January 2027. He is looking for roles in technical product management, forward deployed or solutions engineering, AI/ML engineering, and management and strategy.`,
  },
  {
    question: `Does ${USER.name} need visa sponsorship?`,
    answer: `No. ${USER.name} holds a UAE Golden Visa, so no employer sponsorship is required. He is based between Abu Dhabi and Sharjah in the United Arab Emirates and speaks English and Arabic.`,
  },
  {
    question: `What is ${USER.name}'s role in Tau Beta Pi?`,
    answer: `${USER.name} is President of Tau Beta Pi UAE Alpha, the engineering honor society's chapter at the American University of Sharjah, after serving as its Vice President. In 2026 he received a US$1,000 Tau Beta Pi Scholarship for his final semester, which AUS News reported on 22 June 2026.`,
  },
  {
    question: `What does ${USER.name} do at the American University of Sharjah besides his degree?`,
    answer: `Since November 2024 ${USER.name} has been an AI Hub Assistant at the AUS Center for Innovation in Teaching and Learning, where he led the redesign of the AI Hub website, aihub.aus.edu. Since August 2026 he has also built College of Engineering websites as a web design and development consultant. He also designed a LoRaWAN sensor node PCB in a research group whose work was supported by an AUS Undergraduate Research Grant.`,
  },
  {
    question: `What did ${USER.name} do at Samsung Gulf Electronics?`,
    answer: `From June to August 2026, ${USER.name} was an AI/ML Engineer at Samsung Gulf Electronics in Dubai. He architected and solely built a production trend intelligence platform for the regional marketing team, which replaced external tooling at an estimated $60K in avoided spend and supported launch campaigns with a projected 20% increase in engagement rates.`,
  },
  {
    question: `What has ${USER.name} built?`,
    answer: `${USER.name}'s projects include LocalAI, private AI for company documents that runs entirely in the browser and scored 100% retrieval on a 49-question evaluation, a cycle-accurate Mano Basic Computer simulator in Python, and a custom PCB for an energy harvesting LoRaWAN sensor node. Each has a case study on the projects page.`,
  },
  {
    question: `What certification and honours does ${USER.name} hold?`,
    answer: `${USER.name} holds the Claude Certified Architect: Foundations certification, issued by Anthropic and verifiable on Credly. At the American University of Sharjah he studies on an Academic Merit Scholarship, has made the Dean's List six times and the Chancellor's List three times, and received a Tau Beta Pi Scholarship in 2026.`,
  },
];
```
The full name appears once in the FAQ (question 1). Trend Radar is not named on /about (the Samsung answer and the projects answer stay apart).

### C2. NEW components/faq.tsx

```tsx
import type { FaqItem } from '@/config/faq';
import type { FAQPage } from 'schema-dts';

/** Question as H3, answer as one paragraph, text exactly as in config/faq.ts. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-10">
      {items.map((item) => (
        <div key={item.question}>
          <h3 className="body-lg font-medium text-fg">{item.question}</h3>
          <p className="prose-body body-lg mt-3 text-fg/72">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}

/** FAQPage node built from the same items, so markup and visible text cannot drift. */
export function faqPageNode(items: FaqItem[], pageUrl: string): FAQPage {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    url: pageUrl,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
```
(Styling may be adjusted to the design system; text and structure may not.)

### C4. Agent endpoints (R8): lib/llms.ts and the five routes

`lib/llms.ts`: add imports (`PRESS_MENTIONS` from `@/config/about`, `ABOUT_FAQ` from `@/config/faq`, `formatLongDate` from `@/lib/format-long-date`) and two exports:
```ts
/** `- [headline](url): outlet, date. Profiles <full name>.` per press mention. */
export function formatPressMarkdown(): string[] {
  return PRESS_MENTIONS.map(
    (m) => `- [${m.headline}](${m.url}): ${m.outlet}, ${formatLongDate(m.datePublished)}. Profiles ${USER.fullName}.`
  );
}

export function formatFaqMarkdown(level = 2): string {
  const h = heading(level);
  return [
    `${h} FAQ`,
    ...ABOUT_FAQ.flatMap((item) => ['', `${h}# ${item.question}`, '', item.answer]),
  ].join('\n');
}
```
`app/(llms)/llms.txt/route.ts` (import `CONTENT_LAST_MODIFIED` from `@/config/site`): output must start exactly
```
# Ahmad Saad

> {USER.description}

Last updated: {CONTENT_LAST_MODIFIED}

Key facts:

- {12 LLMS_KEY_FACTS}

## Press

- {formatPressMarkdown()}
```
then the existing `## Me` block, then `## Pages` with two new lines after the About line:
`- [${USER.name} at AUS](${USER.website}/aus): Tau Beta Pi UAE Alpha, the AUS AI Hub, research and AUS News coverage.` and `- [CV](${USER.website}/cv): Experience, education, projects, certification and skills on one page.`; rename the Optional line label "Resume (PDF)" to "CV (PDF)". Everything else unchanged.

`llms-full.txt/route.ts`: after the blockquote add `''`, `` `Last updated: ${CONTENT_LAST_MODIFIED}` ``; after `formatAboutMarkdown(2)` add `''`, `'## Press'`, `''`, `...formatPressMarkdown()`; at the end add `''`, `formatFaqMarkdown(2)`.

`me/about.md/route.ts`:
```ts
const content = `# About ${USER.name}

> ${USER.description}

Last updated: ${CONTENT_LAST_MODIFIED}

${formatAboutMarkdown(2)}

## Education

${formatEducationMarkdown(3)}

${formatFaqMarkdown(2)}
`;
```
`me/experience.md/route.ts`: H1 `# Experience: ${USER.name}`, blank line, `> Roles held by ${USER.name}, an AI engineer and Computer Engineering senior at the American University of Sharjah (AUS).`, blank line, then the existing body.
`me/projects.md/route.ts`: H1 `# Projects by ${USER.name}`, blank line, `> Selected projects by ${USER.name}, an AI engineer and Computer Engineering senior at the American University of Sharjah (AUS).`, blank line, existing body.
Keep `MARKDOWN_HEADERS` (X-Robots-Tag noindex) on all five.
- Done when: `sed -n 3p .next/server/app/llms.txt.body` contains "Ahmad Atef Saad" and "(AUS)"; line 5 is `Last updated: 2026-10-31`; `grep -c "UAE Alpha" llms.txt.body` at least 1; `grep -c "US\$1,000"` at least 1; `grep -c "Undergraduate Research Grant"` at least 1; `## Press` present; me/about.md lines 1 to 3 contain "Ahmad Saad" and "American University of Sharjah"; experience.md and projects.md line 1 contain "Ahmad Saad".

### C3. app/about/page.tsx

1. `TITLE = \`About ${USER.name} (${USER.fullName}) | AI Engineer, AUS\`` (53). `DESCRIPTION = \`${USER.name} (${USER.fullName}) is an AI engineer, a Computer Engineering senior at the American University of Sharjah and President of Tau Beta Pi UAE Alpha.\`` (155). OG card meta: `` `${USER.fullName} · AUS Computer Engineering` `` (title stays `About ${USER.name}`).
2. JSON-LD `@graph`: the AboutPage node with `primaryImageOfPage: { '@id': HEADSHOT_ID }` (no inline ImageObject; the full Person carries it) and `hasPart: { '@id': \`${SITE_URL}${PATH}#faq\` }`; the BreadcrumbList (unchanged); `faqPageNode(ABOUT_FAQ, \`${SITE_URL}${PATH}\`)`; `...personGraph()`; `websiteStub()`. Remove the `personStub` and `pixels` imports.
3. New Profile section right after the hero: `<section className="section" data-tone="bone" aria-labelledby="about-profile">`, SectionHeader `as="p"` eyebrow "About" value "Profile", left column `<h2 id="about-profile" className="display h3-size text-fg">Profile</h2>`, right column `<p className="prose-body body-lg text-fg/72">{ABOUT_DEFINITION}</p>`.
4. ABOUT_SECTIONS loop: tones flip to `i % 2 ? 'bone' : 'ink'` (sections now alternate after the bone Profile); each paragraph renders `<p key=...><RichText text={paragraph} linkClassName={linkClass} /></p>`; remove the `i === last` closing block from the loop.
5. New FAQ section after the loop, `data-tone` the opposite of the last loop section (ink with four sections), `aria-labelledby="about-questions"`: SectionHeader eyebrow "About" value "Questions", `<h2 id="about-questions">{FAQ_HEADING}</h2>`, right column `<FaqList items={ABOUT_FAQ} />`, then the moved closing block: `<p>See my <Link href="/projects">project case studies</Link>, <Link href="/aus">Ahmad Saad at AUS</Link> or the <Link href="/cv">CV</Link>, or go back to the <Link href="/">homepage</Link>.</p>` (linkClass), the PRESS_MENTIONS line exactly as today, pills Email (fill), LinkedIn, GitHub, `<PillLink href="/cv">CV</PillLink>`, and the "Last updated" line.
6. Do not pass `alt` to `<Headshot>` (the A default is the full-name alt). Keep `HeroVideo priority` on /about.
- Done when built about.html: title 53 chars as above; description 155; visible "Ahmad Atef Saad" exactly 3; FAQPage with 8 Questions whose texts all appear in visible text; links to /aus#tau-beta-pi, /aus#ai-hub, /aus, /cv, the three case studies and the AUS News URL (without rel nofollow); no visible "](".

### C5. offsite/github-profile-README.md

The full new README for the profile repo `ahm-adsaad/ahm-adsaad`. First read the current one (`gh api repos/ahm-adsaad/ahm-adsaad/readme --jq .content | base64 -d`) and keep its layout and any images that still fit, but:
- plain-text H1 `# Ahmad Saad`;
- first line under it is the site definition's first sentence: "Ahmad Saad, full name Ahmad Atef Saad, is an AI engineer and forward deployed engineer based between Abu Dhabi and Sharjah in the United Arab Emirates."; then first person: Computer Engineering senior at the American University of Sharjah (AUS), President of Tau Beta Pi UAE Alpha, AI Hub Assistant at the AUS Center for Innovation in Teaching and Learning, graduating December 2026 and available January 2027;
- a plain-text link line `Website: https://ahmadsaad.dev` (plus https://ahmadsaad.dev/aus and https://ahmadsaad.dev/cv);
- Samsung only in past tense, in an Experience block: "Previously AI/ML Engineer at Samsung Gulf Electronics, Dubai (June to August 2026)";
- remove every typing line or badge that says "@ Samsung" or names the banned model library;
- a Projects block, separated from the Experience block by its own heading, describing Trend Radar as "a production TikTok trend detection platform where measurement decides and LLMs describe" with links to the repo and https://ahmadsaad.dev/projects/trend-radar, never with Samsung in the same item or paragraph; LocalAI (live demo and case study), the Mano simulator;
- the AUS News article link with the date;
- no em or en dashes.

### C6. offsite/github-apply.sh

A bash script (Git Bash on Windows) that is safe to run once and safe to re-run:
- `#!/usr/bin/env bash`, `set -euo pipefail`, `OWNER=ahm-adsaad`, `SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"`, a `--dry-run` flag that only echoes, and `step() { echo "==> $*"; }` before every command.
- `gh auth status` first; abort with a message if not logged in.
- Repo edits from findings/offsite.md section 6, corrected: trend-radar homepage `https://ahmadsaad.dev/projects/trend-radar` (removes the leading space); trend-radar topics `typescript nodejs postgresql trend-detection llm forward-deployed-engineering` (NOT the banned library topic); LocalAI homepage https://localai.ahmadsaad.dev; manos-basic-computer-simulator topics `python computer-architecture simulator education`; portfolio topics `nextjs react tailwindcss cloudflare-workers portfolio turborepo`; claude-code-toolbar and placement-proof homepage https://ahmadsaad.dev. For `sdp-sensor-nodes` and `etto-labs` read each repo first (`gh repo view <repo> --json description,languages` and its README); write a description only from what the repo shows; for sdp-sensor-nodes the wording must be "... supported by an AUS Undergraduate Research Grant" style group wording, never "his grant". If unsure, leave the line commented with `# OWNER: confirm wording`.
- Profile README push: fetch `gh api repos/$OWNER/$OWNER/contents/README.md --jq .sha` and the current decoded content; if it already equals `$SCRIPT_DIR/github-profile-README.md`, echo "README already up to date" and skip; else `gh api -X PUT repos/$OWNER/$OWNER/contents/README.md -f message="Update profile README: role, full name and AUS" -f content="$(base64 -w0 "$SCRIPT_DIR/github-profile-README.md")" -f sha="$SHA"`.
- End with an echo of the manual steps the token cannot do (profile bio, company, blog with https, location, Available for hire, pins), pointing at Owner action 9.
- The script is NOT run in this round.

### C7. offsite/outreach.md

Four drafts, no dashes, signed as in findings/offsite.md section 7:
- (a) AUS Office of Communications: ask for one line under the 22 June 2026 article: "Portfolio: https://ahmadsaad.dev/aus" (the page that collects the AUS facts the article reports).
- (b) CITL / AI Hub director (courtesy note before (d), since he maintains the site): says he will add a link from his team page and team card to https://ahmadsaad.dev/aus unless they object.
- (c) Tau Beta Pi UAE Alpha page maintainer: as in offsite.md, link target https://ahmadsaad.dev/aus#tau-beta-pi.
- (d) Self-serve edits for aihub.aus.edu (WordPress), with the exact text:
  - Team page https://aihub.aus.edu/team/mr-ahmad/, bio field: "Ahmad Saad (Ahmad Atef Saad) is a Computer Engineering senior at the American University of Sharjah and an AI Hub Assistant at the Center for Innovation in Teaching and Learning, where he led the redesign of the AI Hub website. He is President of Tau Beta Pi UAE Alpha. Website: ahmadsaad.dev" with "ahmadsaad.dev" linked to https://ahmadsaad.dev/ and the words "AI Hub Assistant" (or a second line "More on his work at AUS") linked to https://ahmadsaad.dev/aus. Plain followed links (no rel="nofollow").
  - About page card (https://aihub.aus.edu/about/, fifth "Meet the team" card): make the name "Ahmad Saad" link to the team page https://aihub.aus.edu/team/mr-ahmad/ (the cards are JS-rendered; edit the data array or the team custom post type field that feeds them).
  - Check after saving: `curl -s https://aihub.aus.edu/team/mr-ahmad/ | grep -c "ahmadsaad.dev"` is at least 1.

### C8. Report

`impl/stream-C.md`. Suggested commit message: "Add an About profile and FAQ, and name the owner in the agent files". The offsite folder is committed by the coordinator with the audit files.

---

## 10. Coordinator: integration, build, commit, deploy

1. When all three reports exist: `git status --short` and confirm each changed file belongs to the stream that reports it (section 5). `grep -rn "round2-fallback" apps/website` must be empty; otherwise swap the fallback to the contract import.
2. Single-source checks: `grep -rln "Atef" apps/website --include=*.ts --include=*.tsx` prints only `apps/website/config/user.ts`; `grep -rn "Center of Innovation" apps/website --include=*.ts --include=*.tsx` prints nothing.
3. Build (apps/website, Git Bash): `taskkill //F //IM workerd.exe 2>/dev/null; true` then `pnpm ensure-next-symlink && pnpm exec opennextjs-cloudflare build --dangerouslyUseUnsupportedNextVersion && pnpm assert-static-prerender`. Expect the new success line naming 16 expected routes. Then `pnpm exec wrangler deploy --dry-run 2>&1 | grep -i "total upload"` (gzip under 3072 KiB).
4. Commit in the order A, B, C (each prefix builds: A references only paths of B; B imports A's person.ts; C imports both). Messages from the stream reports, human style, no AI attribution. Then commit the audit folder.
5. Dispatch the fresh evaluators with section 11.
6. Deploy (`pnpm exec opennextjs-cloudflare deploy`), purge the Cloudflare cache for /llms.txt, /llms-full.txt and /me/* (as on previous deploys), then `pnpm indexnow` (expect HTTP 200 or 202), then the live checks in section 11 with plain curl against https://ahmadsaad.dev.
7. If deploying after 2026-10-31: bump `CONTENT_LAST_MODIFIED` (config/site.ts), `AUS_PAGE.published` and `CV_PAGE.published` to the deploy date in one commit before the build.

---

## 11. Evaluation checklist (fresh evaluators)

Setup, from `apps/website` in Git Bash after the coordinator's build:
```bash
CHK="python -I ../../ahmadsaad.dev-audit/2026-10-30/verify/seo_check.py"
R2="python -I ../../ahmadsaad.dev-audit/2026-10-31/verify/round2_check.py"
O=.next/server/app
```
`CHK text` counts a needle in visible body text (script, style and tags removed, alt excluded). `R2` adds: `names`, `persons`, `faq`, `crumbs`, `refs`, `projects`, `links`, `scan` (run it without arguments for usage). For the local Worker preview use B=http://localhost:8787 (R2 sends `X-Forwarded-Proto: https` itself; for CHK and curl add `-H "X-Forwarded-Proto: https"`).

### 11.1 Per page: title, description, canonical, H1, key strings (built HTML)

| File | Title (chars) | Description (chars) | Canonical | H1 | Must appear in visible text (count) |
|---|---|---|---|---|---|
| $O/index.html | Ahmad Saad (Ahmad Atef Saad) · AI Engineer · AUS, UAE (53) | Ahmad Saad is an AI and forward deployed engineer in the UAE and a Computer Engineering senior at the American University of Sharjah. Available January 2027. (157) | https://ahmadsaad.dev | Ahmad Saad | "Ahmad Atef Saad · Computer Engineering · American University of Sharjah" (1); "Ahmad Saad, full name Ahmad Atef Saad, is an AI engineer and forward deployed engineer based between Abu Dhabi and Sharjah in the United Arab Emirates." (1); "AI Engineer · UAE" (1); "Ahmad Saad at AUS: Tau Beta Pi, AI Hub and research" (1) |
| $O/about.html | About Ahmad Saad (Ahmad Atef Saad) \| AI Engineer, AUS (53) | Ahmad Saad (Ahmad Atef Saad) is an AI engineer, a Computer Engineering senior at the American University of Sharjah and President of Tau Beta Pi UAE Alpha. (155) | https://ahmadsaad.dev/about | Ahmad Saad | "Ahmad Saad, full name Ahmad Atef Saad, is an AI engineer, forward deployed engineer and Computer Engineering senior at the American University of Sharjah (AUS) in the United Arab Emirates." (1); "under my full name, Ahmad Atef Saad" (1); "Is Ahmad Atef Saad the same person as Ahmad Saad?" (1); "Questions about Ahmad Saad" (1); "Center for Innovation in Teaching and Learning" (at least 1) |
| $O/aus.html | Ahmad Saad at AUS: Tau Beta Pi, AI Hub and Research (51) | Ahmad Saad (Ahmad Atef Saad) at the American University of Sharjah: Tau Beta Pi UAE Alpha President, AI Hub Assistant, researcher and 3.96 GPA. (143) | https://ahmadsaad.dev/aus | Ahmad Saad at the American University of Sharjah | "Ahmad Saad, published by AUS as Ahmad Atef Saad, is a Computer Engineering senior" (1); "Tau Beta Pi UAE Alpha" (at least 2); "US$1,000" (at least 1); "whose work was supported by an AUS Undergraduate Research Grant" (1); "AUS News, 22 June 2026" (at least 1); "It is not enough for a model to perform well in testing." (1) |
| $O/cv.html | Ahmad Saad CV: AI Engineer, Computer Engineering at AUS (55) | Ahmad Saad's CV: AI engineer and forward deployed engineer, Computer Engineering at AUS (3.96 GPA), ex Samsung Gulf Electronics, available January 2027. (152) | https://ahmadsaad.dev/cv | Ahmad Saad, CV | "Ahmad Atef Saad · AI Engineer and Forward Deployed Engineer" (1); "Download the PDF CV" (1) |
| $O/projects.html | Projects by Ahmad Saad, AUS Computer Engineering (48) | Case studies by Ahmad Saad, Computer Engineering at AUS: a production trend-detection platform, private in-browser AI, a CPU simulator and a sensor node. (153) | https://ahmadsaad.dev/projects | Projects by Ahmad Saad | "American University of Sharjah (AUS)" (1) |
| $O/projects/<id>.html (4) | unchanged (59, 54, 52, 54) | trend-radar and localai unchanged; mano (150) and lorawan (149) as in A8 | self | project title | "Ahmad Saad is an AI engineer and Computer Engineering senior at the American University of Sharjah (AUS)." (1 each) |

Commands: `$CHK page $O/<file>` for title, description, canonical, h1; `$CHK text $O/<file> "<needle>"` for each count; `$R2 names $O/<file>` prints title and description lengths and the counts below.

### 11.2 Full-name and alt budget

`$R2 names` on each file. Expected visible "Ahmad Atef Saad": index 2, about 3, aus 2, cv 1, projects 0, each case study 0; never more than 4 anywhere. Alt attributes containing it: index 1, about 1, all others 0. Exact alt on / and /about: "Headshot of Ahmad Saad (Ahmad Atef Saad)". Literal "](" in visible text: 0 on every page.

### 11.3 JSON-LD

For every HTML file: `$R2 refs $O/<file>` prints `dangling: none`; `$CHK jsonld $O/<file>` prints `image_dims: ok`.
`$R2 persons $O/<file>` on all 9 pages: every Person node has alternateName containing "Ahmad Atef Saad" and additionalName "Atef", none has alumniOf, and the string "Ahmad A. Saad" is absent. On index, about, aus, cv and projects the Person is the full node: memberOf is an OrganizationRole with roleName "President" whose memberOf has name "Tau Beta Pi UAE Alpha" and url https://www.tbp.org; affiliation is #org-aus; worksFor contains #org-aus and #org-chief-nest; homeLocation has 2 Places; hasOccupation.occupationLocation @type Country; hasCredential contains a credentialCategory "degree"; subjectOf[0] has about #person, image https://www.aus.edu/sites/default/files/news/tbp_1_1.jpg and publisher #org-aus; the CollegeOrUniversity #org-aus has alternateName "AUS" and sameAs both https://en.wikipedia.org/wiki/American_University_of_Sharjah and https://www.wikidata.org/wiki/Q4115992. Case studies carry the stub with sameAs (3 URLs).
Page types: index ProfilePage (only page with it); about AboutPage plus FAQPage; aus WebPage with about [#person, #org-aus]; cv WebPage; projects CollectionPage.
`$R2 faq $O/about.html`: 1 FAQPage, 8 Questions, every question and answer found verbatim in visible text. `$R2 faq` on every other page: 0 FAQPage.
`$R2 crumbs`: about "Home > About", aus "Home > AUS", cv "Home > CV", projects "Home > Projects", case studies "Home > Projects > <title>".
`$R2 projects $O/index.html`: dateCreated trend-radar 2026-06, localai 2026-08, mano-computer-simulator 2025, lorawan-sensor-node 2026, portfolio 2026-08; dateModified 2026-10-31 (or the bumped date) on all.
WebSite on index has alternateName ["Ahmad Atef Saad", "ahmadsaad.dev"].

### 11.4 Copy rules

```bash
$R2 scan $O ../../ahmadsaad.dev-audit/2026-10-31/offsite config app lib components features scripts public/_headers
```
must print `clean`. It flags U+2014, U+2013, the banned model-library name, scraping words, "Center of Innovation", "Ahmad A. Saad" and a list of TikTok data-vendor names. Plus:
- `$CHK text $O/projects/trend-radar.html "Samsung"` = 0; `$CHK text $O/aus.html "Trend Radar"` = 0 and `"Samsung"` = 0; `$CHK text $O/about.html "Trend Radar"` = 0; `grep -c "Trend Radar" config/cv.ts` = 0.
- `$CHK text $O/<every page> "master"` = 0 and `"PhD"` = 0.
- `$60K` and `20%` only next to "estimated" / "projected": `grep -rn "60K\|20%" config` and read each hit.
- Single source: `grep -rln "Atef" --include=*.ts --include=*.tsx .` prints only `./config/user.ts`.

### 11.5 Agent endpoints

```bash
sed -n 1,9p $O/llms.txt.body           # line 3 has "Ahmad Atef Saad" and "(AUS)"; line 5 "Last updated: 2026-10-31"
grep -c "## Press" $O/llms.txt.body     # 1
grep -c "UAE Alpha" $O/llms.txt.body    # at least 1
grep -c 'US\$1,000' $O/llms.txt.body    # at least 1
grep -c "Undergraduate Research Grant" $O/llms.txt.body  # at least 1
grep -c "ahmadsaad.dev/aus\|ahmadsaad.dev/cv" $O/llms.txt.body  # at least 2
sed -n 1,3p $O/me/about.md.body         # names Ahmad Saad and American University of Sharjah
head -1 $O/me/experience.md.body $O/me/projects.md.body   # both name Ahmad Saad
grep -c "## FAQ" $O/me/about.md.body $O/llms-full.txt.body  # 1 each
for f in llms.txt llms-full.txt me/about.md me/experience.md me/projects.md; do grep -o '"x-robots-tag":"[^"]*"' $O/$f.meta; done   # noindex x5
```

### 11.6 Routes, headers, sitemap (local Worker preview, then production)

```bash
B=http://localhost:8787; H='X-Forwarded-Proto: https'
for p in / /about /aus /cv /projects /projects/trend-radar /projects/localai /projects/mano-computer-simulator /projects/lorawan-sensor-node; do echo "$p $(curl -s -o /dev/null -w '%{http_code}' -H "$H" $B$p)"; done   # all 200
curl -s -o /dev/null -w "%{http_code}\n" -H "$H" $B/nonexistent          # 404
curl -s -H "$H" $B/sitemap.xml | grep -c "<loc>"                          # 9
curl -s -H "$H" $B/sitemap.xml | grep -o "<loc>https://ahmadsaad.dev/\(aus\|cv\)</loc>"   # both
curl -sI -H "$H" $B/Ahmad_Saad_CV.pdf | grep -i "^link"                   # link: <https://ahmadsaad.dev/cv>; rel="canonical"
curl -sI -H "$H" $B/Ahmad_Saad_CV.pdf | grep -ci "^x-robots-tag"          # 0 (not noindexed)
curl -s -H "$H" $B/b9f504812ee878b00a15106b08a1f9e1.txt                   # b9f504812ee878b00a15106b08a1f9e1
curl -sI -H "$H" $B/aus | grep -ci "^x-robots-tag"                        # 0
for p in /llms.txt /me/about.md; do curl -sI -H "$H" $B$p | grep -i "^x-robots-tag"; done   # noindex
```
If the local preview does not apply `_headers`, note it and re-run the PDF and key-file lines after the deploy against https://ahmadsaad.dev.
Route guard: the build log ends with `assert-static-prerender: N prerendered routes, none with ISR, all 16 expected routes present.`

### 11.7 IndexNow dry run and Worker size

```bash
node scripts/indexnow.mjs --dry-run --sitemap .next/server/app/sitemap.xml.body   # 9 URLs, host ahmadsaad.dev, keyLocation https://ahmadsaad.dev/b9f504812ee878b00a15106b08a1f9e1.txt, exit 0
grep -c '"indexnow"' package.json                                                 # 1
pnpm exec wrangler deploy --dry-run 2>&1 | grep -i "total upload"                 # gzip under 3072 KiB (was 1117 KiB)
```

### 11.8 Internal links and nav

`$R2 links $O/<file>` lists internal hrefs. Expected: every page has /aus and /cv (nav and footer); index.html also /aus in main (Education link) and /cv in main (hero and contact pills) and no `href="/Ahmad_Saad_CV.pdf"`; about.html has /aus#tau-beta-pi, /aus#ai-hub, /projects/localai, /projects/mano-computer-simulator, /projects/lorawan-sensor-node and the AUS News URL with rel exactly "noopener noreferrer"; aus.html has /projects/mano-computer-simulator, /projects/lorawan-sensor-node, /about, /projects, /cv and ids computer-engineering, tau-beta-pi, ai-hub, research, college-of-engineering, aus-news; cv.html has /Ahmad_Saad_CV.pdf, /aus#tau-beta-pi, the four case studies, /about.
Performance: index.html head has no `rel="preload"` for `/about/drive-poster.webp`; about.html still has it.

### 11.9 Visual check (Playwright, local preview)

- 390x844 on /: the byline is at most 2 lines, the three hero pills are fully inside the first viewport, the LCP element is the `.rise-name` span (PerformanceObserver as in the 2026-10-30 plan Task 12 Step 5).
- 768x1024 and 1440x900 on /: the header nav (About, Projects, AUS, CV, Email, LinkedIn) fits on one line without overlapping the name.
- /aus and /cv at 390 and 1440: no horizontal scroll, headings and pills readable; /aus#tau-beta-pi scrolls the heading clear of the fixed nav.

### 11.10 Live (after deploy)

Repeat 11.1 to 11.6 with `$CHK page https://ahmadsaad.dev/<path>` and `$R2 names https://ahmadsaad.dev/<path>`; `curl -s https://ahmadsaad.dev/llms.txt | sed -n 3p` shows the new definition (if not, the cache purge did not run); `pnpm indexnow` printed HTTP 200 or 202.

---

## 12. Owner actions (not for the executors)

1. **Google Search Console (highest value).** search.google.com/search-console > Add property > Domain > `ahmadsaad.dev` > copy the TXT value > dash.cloudflare.com > ahmadsaad.dev > DNS > Records > Add record: Type TXT, Name `@`, Content the value > back in GSC > Verify. Then Sitemaps > `https://ahmadsaad.dev/sitemap.xml` > Submit. Then URL Inspection > Request indexing for these 9, the new and retitled pages first: `/aus`, `/about`, `/`, `/cv`, `/projects`, `/projects/trend-radar`, `/projects/localai`, `/projects/mano-computer-simulator`, `/projects/lorawan-sensor-node` (about 10 requests a day are allowed). Check after 7 days: Pages report lists /aus and /cv as indexed; Performance > Queries, filter "atef" and "aus".
2. **Bing Webmaster Tools.** bing.com/webmasters > ahmadsaad.dev (already verified by BingSiteAuth.xml) > Sitemaps > Submit sitemap > `https://ahmadsaad.dev/sitemap.xml`; URL Inspection > `/aus` > Request indexing. Check: Site Explorer shows 9 URLs within two weeks.
3. **Cloudflare, JavaScript Detections off.** dash.cloudflare.com > ahmadsaad.dev > Security > Settings > filter "Bot traffic" > JavaScript detections > Off. Why: about 0.9 s of mobile TBT. Check: `curl -s https://ahmadsaad.dev/ | grep -c "challenge-platform"` returns 0.
4. **Cloudflare Web Analytics auto-injection (optional).** dash.cloudflare.com > Analytics & Logs > Web Analytics > ahmadsaad.dev > Manage site > turn off automatic injection (or keep it and accept about 100 ms). Check: `curl -s https://ahmadsaad.dev/ | grep -c "beacon.min.js"` returns 0. If you turn it off, tell the coordinator so the two `static.cloudflareinsights.com` preconnect lines in app/layout.tsx are removed.
5. **LinkedIn.** linkedin.com/in/ahmaddsaad > Contact info > Website: `https://ahmadsaad.dev` (type Portfolio); Featured > Add > Link: `https://ahmadsaad.dev/aus`; headline starting "AI Engineer and Forward Deployed Engineer | Computer Engineering, American University of Sharjah". Check: open the profile signed out.
6. **LocalAI footer link.** In the LocalAI repo add a visible "Built by Ahmad Saad" link to `https://ahmadsaad.dev/projects/localai` in the static HTML shell and the app footer; redeploy. Check: `curl -s https://localai.ahmadsaad.dev/ | grep -c "ahmadsaad.dev/projects/localai"` at least 1.
7. **Decide the plan after graduation.** AUS News says a master's and a PhD come before an AI engineering career; the site says available January 2027. Send one true sentence (for example "plans to start work in January 2027 and may pursue graduate study later") and the coordinator adds it to the /about "What's next" paragraph and FAQ question 2. Until then the site states only the January 2027 availability.
8. **Credly profile handle.** Make the Credly profile public and send its URL (credly.com/users/<handle>); it goes into USER.social beside the badge URL.
9. **GitHub.** Review `ahmadsaad.dev-audit/2026-10-31/offsite/github-profile-README.md` and `github-apply.sh`, then run `bash ahmadsaad.dev-audit/2026-10-31/offsite/github-apply.sh --dry-run` and then without the flag. By hand (the token has no user scope): github.com/settings/profile > Bio "AI engineer and forward deployed engineer. Computer Engineering at the American University of Sharjah. Available January 2027.", Company "American University of Sharjah", URL `https://ahmadsaad.dev` (with https), Location "Sharjah, United Arab Emirates", Available for hire on; pin trend-radar, LocalAI, the Mano simulator and portfolio.
10. **Your own aihub.aus.edu pages.** Send outreach draft (b) to the CITL director, then apply draft (d) in WordPress (team page bio with the link, About card name linked to the team page). This is the single strongest link available for "ahmad saad ai hub aus" and "ahmad aus". Check: `curl -s https://aihub.aus.edu/team/mr-ahmad/ | grep -c "ahmadsaad.dev"` at least 1.
11. **AUS Communications and Tau Beta Pi.** Send drafts (a) and (c) from outreach.md.
12. **Mano and LoRaWAN.** Were they built for AUS courses? Answer yes or no per project. Only a "yes" lets the site say so; the LoRaWAN page already states the AUS research-group context that AUS News reports.
13. **IEEE Solid-State Circuits Society Treasurer:** current or former (the /about Education paragraph says "was"; /aus and /cv say "has served as").
14. **Cloudflare Crawler Hints (low).** Caching > Configuration > Crawler Hints > On.
15. **Monthly check.** Incognito google.com with gl=ae and gl=us for: ahmad atef saad, ahmad saad aus, ahmad atef saad aus, ahmad saad american university of sharjah, ahmad saad tau beta pi, ahmad saad ai hub aus, ahmad aus; note where /aus, /about, LinkedIn and the AUS article land, or read GSC Performance.

---

## 13. Deferred, with reasons

| Item | Source | Why deferred |
|---|---|---|
| /now page | content-architecture P3 | R1: goes stale; needs a monthly update commitment. |
| /experience/*, /contact, /uses, /press, standalone /faq, /tau-beta-pi, /ai-hub, a name-only page | content-architecture section 4 | R1: thin or doorway; Tau Beta Pi, AI Hub and press are sections of /aus, the FAQ is on /about. |
| Per-route lastmod (PAGE_LAST_MODIFIED) | content-architecture section 7, technical item 14 | Every route's copy changes this round, so one date is truthful. Build it with the first single-page edit. |
| "Full name" fact in the homepage facts row; "More on Ahmad Saad at AUS" in the AUS ledger entry | content-architecture section 5 | The byline and definition already reach the / budget of 2 visible full names; the Education link, nav and footer already link /aus. |
| Master's/PhD sentence; remote or relocation FAQ | geo G4, content-architecture | Owner decisions (Owner actions 7, 13 of yesterday). |
| PDF Title metadata | technical item 4 | Needs regenerating the PDF; do it when the CV is next exported (title "Ahmad Saad CV"). The canonical header handles consolidation now. |
| /resume redirect to /cv | content-architecture P2 | No inbound links or queries to /resume; would touch next.config.mjs. |
| Mobile mp4 deferral, video preload changes | performance item 5 | Changes the drive-loop behaviour; small gain. |
| Trimming client components in app/layout.tsx | performance item 5 | Moderate risk for 50 to 150 ms; not this round. |
| Removing the cloudflareinsights preconnect | performance item 1 | Only after Owner action 4. |
| Fourth font preload | performance item 3 | Not above the fold; net negative. |
| Email in JSON-LD | schema item k | Owner choice; left as is. |
| Date ranges rendered as "06.2026 - 08.2026" | name-entity risk 8 | A spaced hyphen, not a dash character; cosmetic. |
| "At AUS" block in llms-full.txt rendered from config/aus.ts | content-architecture section 6 | Cross-stream import; llms.txt links /aus instead and the key facts carry the AUS facts. |
| ItemList for /press | schema.md section 4 | No /press page. |

---

## 14. Flip after graduation (January 2027 sweep)

Each string below is true today and must change after December 2026. One edit per row; all copy lives in config except the schema comment.

| File | Symbol | String today | After graduation |
|---|---|---|---|
| config/user.ts | USER.description | "Computer Engineering senior at the American University of Sharjah (AUS) ..., graduating in December 2026 and available to start work in January 2027" | "Computer Engineering graduate of the American University of Sharjah (AUS) (December 2026)" plus current availability |
| config/user.ts | USER.metaDescription | "Computer Engineering senior at ... Available January 2027." | "Computer Engineering graduate of ..." and the current availability |
| config/about.ts | ABOUT_INTRO | "a Computer Engineering senior at the American University of Sharjah (AUS)" | "a Computer Engineering graduate of ..." |
| config/about.ts | PROFILE_DEFINITION | "senior ... graduates in December 2026 ... available to start in January 2027" | "graduate (December 2026)"; availability |
| config/about.ts | ABOUT_SECTIONS Education | "graduate in December 2026"; "for my final semester" | past tense |
| config/about.ts | ABOUT_SECTIONS What's next | "available to start in January 2027" | current status |
| config/about.ts | LLMS_KEY_FACTS | Education "(expected)"; Availability "January 2027"; Tau Beta Pi "final semester" | awarded degree; current status |
| config/about.ts | PROJECT_AUTHOR_PREDICATE | "Computer Engineering senior at the American University of Sharjah (AUS)" | "Computer Engineering graduate of ..." |
| config/faq.ts | ABOUT_DEFINITION | "senior ... graduates in December 2026 and is available to start work in January 2027" | graduate; current status |
| config/faq.ts | ABOUT_FAQ answers 1, 2, 4, 8 | "senior at AUS"; "graduates ... December 2026 ... available January 2027"; "final semester"; "studies on an Academic Merit Scholarship" | past tense; current status |
| config/aus.ts | AUS_PAGE.intro, facts, sections, closing | "senior", "graduates in December 2026", "expect to finish in December 2026", "my final semester", "I graduate in December 2026 and am available ..." | past tense, "Graduated December 2026" |
| config/aus.ts | AUS_PAGE.description | "Tau Beta Pi UAE Alpha President, AI Hub Assistant" | update if those roles end |
| config/cv.ts | CV_PAGE.summary, status, description | "graduating in December 2026"; "Available January 2027" | graduated; current status |
| config/education.ts | EDUCATION.period, highlights | "08.2023 - 12.2026 (expected)"; "for the final semester (2026)" | "08.2023 - 12.2026" |
| config/projects.ts | mano and lorawan seoDescription | "a Computer Engineering student at AUS" | "a Computer Engineering graduate of AUS" |
| app/projects/page.tsx | intro | "Computer Engineering senior at the American University of Sharjah (AUS)" | graduate |
| app/about/page.tsx | DESCRIPTION | "a Computer Engineering senior at the American University of Sharjah" | graduate |
| features/home/components/about-teaser.tsx | FACTS, SectionHeader value | "Available January 2027" | current status |
| lib/seo/person.ts | disambiguatingDescription; hasCredential degree; affiliation | "senior"; "(in progress, expected December 2026)"; affiliation only | "graduate"; awarded degree; add `alumniOf: { '@id': AUS_ID }` (the comment marks the spot) |
| lib/seo/person.ts and config/experience.ts | worksFor, isCurrentEmployer, memberOf President | AUS current employer; President | drop AUS from worksFor if the campus roles end; roleName "Former President" or remove |
| app/(llms)/me/experience.md and projects.md | header blockquotes | "Computer Engineering senior at the American University of Sharjah (AUS)" | graduate |
| offsite/github-profile-README.md (and the live README) | intro | "senior ... graduating December 2026 ... available January 2027" | graduate; current status |
