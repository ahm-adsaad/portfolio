# Schema / Structured Data Audit — ahmadsaad.dev

**Score: 12 / 100**

Rationale: the page emits exactly one JSON-LD block, and it is an empty,
wrong-typed stub (`Organization` with zero properties). Format choice
(JSON-LD, correct `@context`) and the existing `schema-dts`-typed
`JsonLd` component are sound infrastructure (a few points), but there is
currently **no functional entity, site, or profile markup at all** for a
site whose entire value proposition is a named individual (Ahmad Saad).

---

## 1. Detection — what schema exists today

Source: `apps/website/app/page.tsx` lines 39–46 (verified against the
rendered HTML in the shared dossier scratchpad, `home.html`, which
contains exactly one `<script type="application/ld+json">` block).

```json
{ "@type": "Organization", "@context": "https://schema.org" }
```

No Microdata or RDFa markup was found anywhere in the rendered HTML.

## 2. Validation of the existing block

| Check | Result |
|---|---|
| `@context` is `https://schema.org` | ✅ Pass |
| `@type` is valid, non-deprecated | ✅ Pass (`Organization` is a valid, active type) — but **semantically wrong** for this site (see Findings #1) |
| Required/recommended properties present | ❌ Fail — **zero** properties. No `name`, no `url`, no `logo`, no `sameAs`. Google's Organization/Logo guidance expects at minimum `name` + `url` to produce any entity signal; this block has neither. |
| No placeholder text | ✅ N/A (worse than a placeholder — it's empty) |
| URLs absolute | ✅ N/A (no URL present) |
| Dates ISO 8601 | ✅ N/A (no dates present) |

**Net effect:** this block is a no-op. It does not make the page eligible
for any Google rich result, and it gives Google/AI answer engines no
entity signal about who Ahmad Saad is. It should be replaced, not patched.

## 3. Missing opportunities (grounded in verified page content)

The homepage is a single-page personal portfolio (`apps/website/app/page.tsx`)
that already renders, in visible HTML, everything needed for a solid
`Person` + `WebSite` + `ProfilePage` graph:

- **Person** — name, job title, description, and social links are all in
  `apps/website/config/user.ts` and are rendered as the `<h1>`, tagline,
  bio paragraphs, and footer contact links on the page. Currently none of
  this reaches structured data.
- **WebSite** — the site has a name, URL, and single canonical entry point
  but no `WebSite` node.
- **ProfilePage** — this page *is* a profile page (bio + experience +
  education + projects for one named person); Google's Profile Page
  guidance is designed for exactly this shape of content, and schema-dts
  supports the type directly.
- **SoftwareSourceCode (optional)** — four of the five projects rendered in
  the carousel (`apps/website/config/projects.ts`, confirmed present in
  raw SSR HTML, not just the visible-text extract) link to public GitHub
  repos: LocalAI, Mano's Basic Computer Simulator, this portfolio repo, and
  Trend Radar (see caveat in Finding #5 below). These are candidates for
  `SoftwareSourceCode` authored by the `Person`.
- **Occupation (optional)** — the Samsung Gulf Electronics role is the only
  experience entry with a full expanded description in the rendered HTML,
  making it a well-grounded candidate for `Person.hasOccupation`.

Not recommended / not applicable:
- **FAQPage** — no FAQ content exists on the page. Nothing to flag; even if
  added later it carries no Google SERP benefit (rich results retired
  Google-wide May 7, 2026 per the plugin's schema-types reference).
- **HowTo / SpecialAnnouncement / CourseInfo / EstimatedSalary /
  LearningVideo** — none present, and none should be added (deprecated).
- **BreadcrumbList** — not applicable; the site is a single page with no
  navigation hierarchy.
- **Article/BlogPosting** — not applicable; there is no blog.

## 4. Findings

| Severity | Title | Evidence | Fix |
|---|---|---|---|
| **Critical** | JSON-LD block is empty and mistyped | `apps/website/app/page.tsx:39-46` emits exactly `{"@type":"Organization","@context":"https://schema.org"}` — zero properties, wrong type for a one-person portfolio | Replace with the `Person` + `WebSite` + `ProfilePage` graph in §5 below |
| **High** | No `Person` entity markup | Verified: only JSON-LD on the page is the empty Organization stub; `config/user.ts` already holds name, jobTitle, email, image, and `sameAs` (GitHub + LinkedIn) that are never wired into structured data | Add `Person` with `name`, `jobTitle`, `url`, `image`, `email`, `sameAs`, `alumniOf`, `worksFor`, `knowsAbout` (code below) |
| **High** | No `WebSite` / `ProfilePage` markup | Same evidence as above | Add `WebSite` + `ProfilePage` nodes, with `ProfilePage.mainEntity` → the `Person` node, matching Google's Profile Page structured-data pattern |
| **Medium** | No `SoftwareSourceCode` markup for public project repos | `apps/website/config/projects.ts` + raw `home.html` confirm working `<a href="https://github.com/ahm-adsaad/...">` links for all 5 projects (all server-rendered, not just the first carousel slide) | Optional: add `SoftwareSourceCode` nodes authored by the `Person` for the confirmed-public repos (included in generated code) |
| **Info** | Trend Radar repo may currently be private | `portfolio-context.md` "Asset Status" section states *"Trend Radar repo: private as of now… Do not link to it from the portfolio until it is public"*, yet the live page already contains two `github.com/ahm-adsaad/trend-radar` anchors and `config/projects.ts` sets `link`/`github` to that URL | Before shipping the `SoftwareSourceCode` node for Trend Radar (or keeping the live anchor links), confirm the repo's actual public/private status. If still private, drop both the anchor links and that `SoftwareSourceCode` node so nothing — schema or otherwise — points to an inaccessible URL |
| **Info** | `worksFor` target may go stale | `apps/website/config/experience.ts:44-56` flags Samsung Gulf Electronics as `isCurrentEmployer: true`, but that role's `employmentPeriod.end` is `"08.2026"`, which is at/past today's date (2026-08-24) per the audit context; Chief Nest and the AUS "AI Hub Assistant" role are both open-ended (`no end`) in the same file | Confirm with the site owner whether Samsung is still the intended `worksFor` target before shipping, or whether it should be swapped/supplemented with the still-open-ended roles |
| **Info** | `JsonLd` component only types a single node | `lib/seo/json-ld.tsx:1-14` — `type JsonLdProps = { code: WithContext<Thing> }` cannot accept a multi-node `Graph` | Widen to `code: WithContext<Thing> | Graph` (one-line change, included below) |
| **Info** | No FAQPage present | Verified: no FAQ content anywhere on the page | No action needed; note only, per plugin policy on FAQ rich-result retirement |

## 5. Generated JSON-LD / TypeScript replacement

### 5a. Type note (correcting the requested `WithContext<Graph>` shape)

`schema-dts`'s `Graph` type already embeds its own `@context`:

```ts
export interface Graph {
  "@context": "https://schema.org";
  "@graph": readonly Thing[];
}
```

and `WithContext<T>` is constrained to `T extends Thing` — `Graph` does not
extend `Thing` (it has no `@type`), so `WithContext<Graph>` does not
type-check. The correct annotation is the bare `Graph` type. Verified
directly against `node_modules/.pnpm/schema-dts@1.1.5/.../dist/schema.d.ts`
in this repo.

### 5b. `lib/seo/json-ld.tsx` — widen the prop type (minimal diff)

```tsx
import type { Graph, Thing, WithContext } from 'schema-dts';

type JsonLdProps = {
  code: WithContext<Thing> | Graph;
};

export const JsonLd = ({ code }: JsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(code) }}
  />
);

export * from 'schema-dts';
```

### 5c. `app/page.tsx` — replacement for the `jsonLd` object (lines 1–46)

Only the import block and the `jsonLd` construction change; the rest of
the component (lines 47–201) is untouched.

```tsx
import { FloatingHeader } from '@/components/navigation/floating-header';
import { PronounceMyName } from '@/components/pronounce-my-name';
import { RevealOnLoad } from '@/components/reveal-on-load';
import { ScrollArea } from '@/components/scroll-area';
import { Section } from '@/components/section';
import Separator from '@/components/separator';
import { USER } from '@/config/user';
import { GitHubContribution } from '@/features/home/components/github-contribution';
import Info from '@/features/home/components/info';
import { ShootingStars } from '@/components/ui/shooting-stars';
import { Education } from '@/features/home/components/education';
import { Experiences } from '@/features/home/components/experiences';
import { ProjectCoverflow } from '@/features/home/components/project-coverflow';
import { TechStack } from '@/features/home/components/tech-stack';
import { WordmarkFooter } from '@/components/wordmark-footer';
import { createOgImage } from '@/lib/createOgImage';
import { JsonLd } from '@/lib/seo/json-ld';
import type { Graph } from 'schema-dts';
import { createMetadata } from '@/lib/seo/metadata';
import type { Metadata } from 'next/types';

// Force static generation at build time
export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  const title = USER.tagline;
  const description = USER.description;
  const image = createOgImage({
    title: title,
    meta: description,
  });
  return createMetadata({
    title: title,
    description: description,
    image: image,
  });
}

const SITE_URL = 'https://ahmadsaad.dev';
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PROFILE_PAGE_ID = `${SITE_URL}/#profilepage`;
const AUS_ID = `${SITE_URL}/#org-aus`;
const SAMSUNG_ID = `${SITE_URL}/#org-samsung`;

export default async function Page() {
  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollegeOrUniversity',
        '@id': AUS_ID,
        name: 'American University of Sharjah',
        url: 'https://www.aus.edu/',
      },
      {
        '@type': 'Organization',
        '@id': SAMSUNG_ID,
        name: 'Samsung Gulf Electronics',
        url: 'https://www.samsung.com/ae/',
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: USER.name,
        givenName: USER.firstName,
        familyName: USER.lastName,
        url: `${SITE_URL}/`,
        image: USER.image.profile,
        email: USER.email,
        jobTitle: USER.jobTitle,
        description: USER.description,
        sameAs: [USER.social.github, USER.social.linkedin],
        alumniOf: { '@id': AUS_ID },
        affiliation: { '@id': AUS_ID },
        worksFor: { '@id': SAMSUNG_ID },
        homeLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'AE',
          },
        },
        knowsAbout: [
          'Large language model systems',
          'Retrieval-augmented generation',
          'Prompt engineering',
          'Computer vision',
          'Model fine-tuning',
          'Python',
          'TypeScript',
          'PostgreSQL',
          'Next.js',
          'Docker',
          'Cloudflare Workers',
        ],
        hasOccupation: {
          '@type': 'Occupation',
          name: 'AI/ML Engineer',
          occupationLocation: {
            '@type': 'AdministrativeArea',
            name: 'Dubai, United Arab Emirates',
          },
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
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: USER.name,
        description: USER.description,
        inLanguage: 'en-US',
        publisher: { '@id': PERSON_ID },
      },
      {
        '@type': 'ProfilePage',
        '@id': PROFILE_PAGE_ID,
        url: `${SITE_URL}/`,
        name: `${USER.tagline} | ${USER.name}`,
        description: USER.description,
        inLanguage: 'en-US',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID },
        mainEntity: { '@id': PERSON_ID },
        primaryImageOfPage: USER.image.profile,
      },
      // --- Optional: public project repos, only where a real repo exists ---
      {
        '@type': 'SoftwareSourceCode',
        '@id': `${SITE_URL}/#project-trend-radar`,
        name: 'Trend Radar',
        description:
          'Production TikTok trend-detection platform where measurement decides and LLMs describe.',
        codeRepository: 'https://github.com/ahm-adsaad/trend-radar',
        programmingLanguage: 'TypeScript',
        author: { '@id': PERSON_ID },
      },
      {
        '@type': 'SoftwareSourceCode',
        '@id': `${SITE_URL}/#project-localai`,
        name: 'LocalAI',
        description:
          'On-device RAG document Q&A that runs entirely in the browser.',
        codeRepository: 'https://github.com/ahm-adsaad/LocalAI',
        programmingLanguage: 'TypeScript',
        author: { '@id': PERSON_ID },
      },
      {
        '@type': 'SoftwareSourceCode',
        '@id': `${SITE_URL}/#project-mano-simulator`,
        name: 'Mano Basic Computer Simulator',
        description:
          "Cycle-accurate CPU simulator of Mano's Basic Computer with full ISA support and a CLI debugger.",
        codeRepository:
          'https://github.com/ahm-adsaad/manos-basic-computer-simulator',
        programmingLanguage: 'Python',
        author: { '@id': PERSON_ID },
      },
      {
        '@type': 'SoftwareSourceCode',
        '@id': `${SITE_URL}/#project-portfolio`,
        name: 'ahmadsaad.dev',
        description:
          'This site: a personal portfolio with a 3D coverflow project showcase, deployed on Cloudflare Workers.',
        codeRepository: 'https://github.com/ahm-adsaad/portfolio',
        programmingLanguage: 'TypeScript',
        author: { '@id': PERSON_ID },
      },
    ],
  };

  return (
    <>
      <JsonLd code={jsonLd} />
      {/* ... rest of the component is unchanged (lines 47-201 of the original file) ... */}
```

**Important caveat before pasting:** per Finding "Trend Radar repo may
currently be private" above, drop the `trend-radar` `SoftwareSourceCode`
node (and the corresponding live anchor links) if that repo is not
actually public at ship time — schema should never point to an
inaccessible URL.

### 5d. Why `Person` was chosen over `Organization`

The site is one named individual's portfolio (Ahmad Saad), not a company.
`Person` is Google's recommended type for author/individual entity pages,
and it correctly carries `jobTitle`, `alumniOf`, `worksFor`, and `sameAs`
— none of which have a natural home on `Organization` for a solo site.

## 6. How to verify

1. **Google Rich Results Test** — https://search.google.com/test/rich-results
   — paste the rendered page URL (or the raw HTML after the change ships)
   and confirm the `Person`, `WebSite`, and `ProfilePage` nodes parse with
   no errors. Note: personal `Person`/`ProfilePage` markup on a portfolio
   site is not expected to unlock a visible SERP rich result by itself;
   the test's purpose here is syntax/property validation and entity
   verification, not rich-result eligibility.
2. **Schema Markup Validator** — https://validator.schema.org/ — paste the
   full `<script type="application/ld+json">` output and confirm 0 errors
   across all 9 `@graph` nodes (or fewer if the Trend Radar node is
   dropped per the caveat above).
3. **Manual JSON validation** — run the generated object through
   `JSON.stringify`/`JSON.parse` in a Node REPL (or `node -e`) before
   shipping to confirm there are no circular references from the `@id`
   cross-links.
4. **TypeScript compile check** — `pnpm typecheck` (or `tsc --noEmit`) in
   `apps/website` after applying both file changes, to confirm the
   `Graph` type and the widened `JsonLdProps` compile cleanly.
5. **Re-fetch and diff** — after deploy, re-run
   `claude-seo run render_page.py https://ahmadsaad.dev --mode auto --json --json-ld-output <path>`
   and confirm the extracted JSON-LD matches the intended graph (SSR′d,
   not just client-injected).
