# ahmadsaad.dev SEO and GEO Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship every repo-side Critical and High finding from the 2026-10-30 audit, plus the cheap Medium ones, so that text extractors, search engines and AI assistants read one unambiguous "Ahmad Saad is ..." entity with a face, a place, dates and third-party corroboration.

**Architecture:** All content stays in `apps/website/config/*.ts`; pages, JSON-LD and the agent text endpoints render from it at build time and every route stays statically prerendered on Cloudflare Workers (OpenNext). Changes are copy and config edits, small component edits, schema graph additions, two header policies (route-handler headers and `public/_headers`) and a new share-card URL.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, schema-dts, OpenNext for Cloudflare, Wrangler, Cloudinary URL transforms.

**Spec:** `ahmadsaad.dev-audit/2026-10-30/FULL-AUDIT-REPORT.md` and `ahmadsaad.dev-audit/2026-10-30/findings/*.md`. You should not need to open the findings: every value you need is pasted below.

## Global Constraints

1. Every route must stay statically prerendered: `export const dynamic = 'force-static'`; never set a numeric `revalidate` (it 500s on Cloudflare Workers with "Dummy queue is not implemented"); `pnpm assert-static-prerender` guards this. Never read files with fs at request time. All content comes from config/*.ts.
2. Canonical trap: `createMetadata` in lib/seo/metadata.tsx defaults `alternates.canonical`; every page must keep its own canonical path.
3. Copy rules for all rendered text, metadata, schema strings and .md/.txt endpoints: no em dashes or en dashes (U+2014, U+2013; use periods, commas or hyphens), never mention LightGBM, no data-vendor names, no scraping language, Trend Radar is never tied to Samsung by name, the 60K dollars and 20 percent figures stay framed as estimates. Do not invent facts: every fact must already exist on the live site, in config/*.ts, in /me/*.md, or in the AUS News article the SXO agent found (aus.edu/node/126616, which names him "Ahmad Atef Saad").
4. Commits: human-style messages, no AI attribution and no Co-Authored-By trailers. One commit per task. Work on a branch, not on main (the coordinator names the branch in the implementer dispatch).
5. Build and preview: `pnpm run deploy` and `pnpm preview` fail on the Next 15 support-window check since 2026-10-21; do NOT change package.json scripts. The verified manual chain, run in apps/website, is: `pnpm ensure-next-symlink && pnpm exec opennextjs-cloudflare build --dangerouslyUseUnsupportedNextVersion && pnpm assert-static-prerender` and then `pnpm exec opennextjs-cloudflare preview` for a local Worker or `pnpm exec opennextjs-cloudflare deploy` for production. `next build` runs type checking; the warm build is about 1 to 2 minutes; `pnpm typecheck` alone can take 25 minutes cold, so prefer `pnpm build` as the type gate. Kill any workerd.exe before rebuilding. The Worker must stay under 3 MiB gzipped (free plan).
6. Bump the sitemap `CONTENT_LAST_MODIFIED` constant in app/sitemap.ts to 2026-10-31 in the task that changes content.
7. Do not add new pages that need content the owner has not supplied. Do not touch the Cloudflare dashboard, DNS, GitHub profile, LinkedIn or Search Console; those are Owner actions.

Note on constraint 6: Task 2 (the first visible-copy task) bumps the date to 2026-10-31 and moves the constant from `app/sitemap.ts` into `config/site.ts`, which `app/sitemap.ts` then imports, so the sitemap, the /about "Last updated" line and schema `dateModified` share one value.

## Working conventions (read once)

- Run every command from `C:/Users/ahmad/Desktop/GitHubRepos/portfolio/apps/website` (Git Bash). All file paths below are relative to that folder unless they start with `../../`.
- `CHK` in verification steps means `python -I ../../ahmadsaad.dev-audit/2026-10-30/verify/seo_check.py`. It is a stdlib-only checker; `TARGET` is either a URL or a prerendered file. Commands: `page TARGET` (title, description with lengths, canonical, h1 text, og:image), `text TARGET "needle"` (count of the needle in visible body text, tags removed without adding spaces, which is how textContent-style extractors read it), `jsonld TARGET` (node types, dangling `@id` references, ImageObject dimension types, Person and page date summary; exits 1 on a dangling ref or string dimensions), `headers TARGET` (response headers; for a `.body` or `.html` file it reads the sibling `.meta`), `same FILE_A FILE_B` (prints MATCH or the first differing line), `copy TARGET...` (scans for the two dash code points, the banned model-library term and the banned data-collection words from Global Constraint 3; prints `clean` or the hits).
- Per-task gate: `pnpm build` (runs `next build` with type checking; warm about 1 to 2 minutes). After it, prerendered output is in `.next/server/app/`: `index.html`, `about.html`, `projects.html`, `projects/<id>.html`, `sitemap.xml.body`, `llms.txt.body`, `llms-full.txt.body`, `me/about.md.body`, `me/experience.md.body`, `me/projects.md.body`, each with a `.meta` file holding status and headers. Per-task checks read those files, so you do not need the Worker preview until Task 12.
- If `pnpm build` fails on a stale `.next`, run `pnpm build` once more before debugging; do not delete `.next/cache` unless asked.
- Before each commit run `CHK copy` on the files you changed and expect `clean`.

## Review Focus

1. Whitespace between inline-block word spans: the statement must keep its visual word spacing after the margin is replaced by real spaces (Task 1 includes a screenshot check).
2. The 56 px headshot must never become the LCP element or push the hero CTAs below the fold on a 390x844 phone (Task 3 checks size and position).
3. JSON-LD on /about and /projects must resolve every `@id` on its own page, because Google evaluates each page's graph alone (Task 5 runs `CHK jsonld` on all four page types).
4. `X-Robots-Tag: noindex` must reach the five text endpoints and must NOT reach any HTML page (Task 8 checks both).
5. `public/_headers` rules must not overlap `/_next/static/*`, or Cloudflare joins two Cache-Control values with a comma (Task 10 checks a static chunk still has exactly one immutable value).

---

### Task 1: Put real spaces between the hero name spans and the statement word spans

**Why:** GEO F2 (High): `<h1>` on / and /about is `<span>Ahmad</span><span>Saad</span>`, so textContent extractors read "AhmadSaad"; the statement reads "Ibuildsystemsthat...".

**Files:**
- Modify: `features/home/components/hero.tsx:29-36`
- Modify: `app/about/page.tsx:130-137`
- Modify: `features/home/components/statement.tsx:1-31`
- Modify: `app/globals.css:715-718` (the `.word` rule)

- [ ] **Step 1: Confirm the bug in the current build output**

Run: `pnpm build && CHK page .next/server/app/index.html | grep h1 && CHK text .next/server/app/index.html "AhmadSaad"`
Expected: `h1: AhmadSaad` and a count of at least `1`.

- [ ] **Step 2: Insert a literal space between the two name spans on / and /about**

In `hero.tsx` the h1 becomes:
```tsx
<h1 id="hero-name" className="display hero-size mt-5 md:mt-6">
  <span className="block rise-name" style={stagger(1)}>
    {USER.firstName}
  </span>{' '}
  <span className="block rise-name" style={stagger(2)}>
    {USER.lastName}
  </span>
</h1>
```
Make the identical change in `app/about/page.tsx` (h1 `#about-name`, spans with `stagger(2)` and `stagger(3)`). The spans are `display: block`, so the space renders nothing.

- [ ] **Step 3: Render a space text node before every statement word after the first**

In `statement.tsx`, import `Fragment` from `react` and change the map to:
```tsx
{words.map(({ key, word }, i) => (
  <Fragment key={key}>
    {i > 0 ? ' ' : null}
    <span className="word">{word}</span>
  </Fragment>
))}
```
In `app/globals.css` change the base rule to `.word { display: inline-block; }` (delete `margin-right: 0.25em;`, the real space now provides the gap). Leave the `@supports (animation-timeline: view())` block and the reduced-motion block untouched.

- [ ] **Step 4: Verify**

Run:
```bash
pnpm build
CHK page .next/server/app/index.html | grep h1
CHK page .next/server/app/about.html | grep h1
CHK text .next/server/app/index.html "AhmadSaad"
CHK text .next/server/app/index.html "I build systems that have to prove they work. An AI pipeline, a CPU, a circuit board."
```
Expected: `h1: Ahmad Saad` twice, `0`, `1`.
Visual check (Review Focus 1): with the Task 12 preview or `pnpm dev`, screenshot the Statement section at 1440 px and 390 px; word gaps must look like normal spaces (no doubled gaps, no words touching).

- [ ] **Step 5: Commit**
```bash
git add features/home/components/hero.tsx app/about/page.tsx features/home/components/statement.tsx app/globals.css
git commit -m "Separate the hero name and statement words with real spaces"
```

---

### Task 2: Lead the homepage About block with a named definition paragraph

**Why:** GEO F3 and content F1 (High): the homepage never says "Ahmad Saad is ..." in prose; GEO F4 (Medium): 12 `<article>` cards make extractors keep only one job card; content F4 (Medium): /projects lede does not name him. This is the first visible-copy task, so it also bumps the content date (constraint 6).

**Files:**
- Modify: `config/about.ts` (add `PROFILE_DEFINITION`)
- Modify: `config/site.ts` (add `CONTENT_LAST_MODIFIED`)
- Modify: `app/sitemap.ts:9-15,33` (import the constant instead of declaring it)
- Modify: `features/home/components/about-teaser.tsx:26-61`
- Modify: `features/home/components/project-stack.tsx:42,96` and `features/home/components/experience-ledger.tsx:84,117` (`<article>` to `<div>`)
- Modify: `app/projects/page.tsx:110-117` (lede)

**Interfaces:**
- Produces: `PROFILE_DEFINITION: string` exported from `@/config/about` (used again in Task 7); `CONTENT_LAST_MODIFIED: string` exported from `@/config/site` with value `'2026-10-31'` (used in Tasks 5 and 6).

- [ ] **Step 1: Add the constants**

`config/site.ts`, append:
```ts
/**
 * Date of the last visible content change (YYYY-MM-DD). Feeds the sitemap
 * lastmod, schema dateModified and the "Last updated" line on /about. Bump it
 * by hand in the same commit that changes visible copy, NOT on every deploy:
 * a lastmod that churns with each build is a signal Google learns to ignore.
 */
export const CONTENT_LAST_MODIFIED = '2026-10-31';
```
`config/about.ts`, add after `ABOUT_INTRO` (exact string, 144 words, third person, no dashes):
```ts
/**
 * Third-person definition for the homepage About block and the agent
 * endpoints. Written to be quoted on its own; /about keeps its first-person
 * intro, so the two never duplicate.
 */
export const PROFILE_DEFINITION =
  'Ahmad Saad is an AI engineer and forward deployed engineer based between Abu Dhabi and Sharjah in the United Arab Emirates. He is a Computer Engineering senior at the American University of Sharjah (AUS), where he holds a 3.96 GPA, is President of the Tau Beta Pi chapter, and graduates in December 2026. From June to August 2026 he was an AI/ML Engineer at Samsung Gulf Electronics in Dubai, where he architected and solely built a production trend intelligence platform for the regional marketing team that replaced external tooling at an estimated $60K in avoided spend. He also built LocalAI, private AI for company documents that runs entirely in the browser. He holds the Claude Certified Architect: Foundations certification from Anthropic, speaks English and Arabic, holds a UAE Golden Visa, so no employer sponsorship is required, and is available to start in January 2027.';
```

- [ ] **Step 2: Point the sitemap at the shared constant**

In `app/sitemap.ts` delete the doc comment and `export const CONTENT_LAST_MODIFIED = '2026-10-21';` (lines 9 to 15) and add `import { CONTENT_LAST_MODIFIED } from '@/config/site';` with the other imports. Line 33 (`lastModified: CONTENT_LAST_MODIFIED`) stays.

- [ ] **Step 3: Rewrite the About teaser copy**

In `about-teaser.tsx` import `PROFILE_DEFINITION` from `@/config/about` and replace the three `<p>` children of the `prose-body` div with exactly two:
```tsx
<p>{PROFILE_DEFINITION}</p>
<p>
  He works as a forward deployed engineer: technical enough to build the
  system, comfortable enough with stakeholders to scope it. That includes
  the product work: turning ambiguous requirements into a scoped roadmap,
  prioritizing what ships first, and measuring whether it worked.
</p>
```
(The old third paragraph, Golden Visa and availability, is now inside the definition.) Change the link text `More about me` to `More about Ahmad Saad`. Keep `FACTS`, the heading and all classes unchanged. Do not split the definition into per-word spans.

- [ ] **Step 4: Stop the home cards from looking like separate articles**

In `project-stack.tsx` change `<article className="stack-card-inner">` and its closing tag to `<div className="stack-card-inner">` / `</div>`. In `experience-ledger.tsx` change `<article key={position.id} className="position">` and its closing tag to `<div ...>` / `</div>`. No CSS targets the `article` element (`grep -n "article" app/globals.css` returns nothing), so nothing else changes.

- [ ] **Step 5: Name him in the /projects lede**

In `app/projects/page.tsx` replace the lede text inside the `intro-size` paragraph with (43 words):
```
Case studies by Ahmad Saad, an AI engineer and Computer Engineering senior at the American University of Sharjah: two AI systems, Trend Radar and LocalAI, and two hardware and architecture builds, a Mano Basic Computer simulator and an energy harvesting LoRaWAN sensor node.
```

- [ ] **Step 6: Verify**
```bash
pnpm build
CHK text .next/server/app/index.html "Ahmad Saad is an AI engineer and forward deployed engineer based between Abu Dhabi and Sharjah"
CHK text .next/server/app/index.html "More about Ahmad Saad"
CHK text .next/server/app/about.html "Ahmad Saad is an AI engineer"
CHK text .next/server/app/projects.html "Case studies by Ahmad Saad"
grep -c "<article" .next/server/app/index.html
grep -o "<lastmod>[^<]*</lastmod>" .next/server/app/sitemap.xml.body | sort | uniq -c
CHK copy config/about.ts features/home/components/about-teaser.tsx app/projects/page.tsx
```
Expected: `1`, `1`, `0` (no duplication on /about), `1`, `0`, `7 <lastmod>2026-10-31</lastmod>`, `clean`.

- [ ] **Step 7: Commit**
```bash
git add config/about.ts config/site.ts app/sitemap.ts features/home/components/about-teaser.tsx features/home/components/project-stack.tsx features/home/components/experience-ledger.tsx app/projects/page.tsx
git commit -m "Lead the homepage About block with a one-paragraph definition"
```

---

### Task 3: Show the headshot and the location on the home first screen

**Why:** Visual F1 and F2 (High), SXO S2/S3: no face and no location above the fold on /; the ProfilePage schema promises a headshot the page does not show.

**Files:**
- Modify: `components/headshot.tsx` (add a `priority` prop)
- Modify: `features/home/components/hero.tsx:25-27` (eyebrow row)

**Interfaces:**
- Produces: `Headshot({ size, className, priority }: { size: number; className?: string; priority?: boolean })`. With `priority`, the `<img>` gets `fetchPriority="high"` and `loading="eager"`; without it, behaviour is unchanged (/about keeps its current markup).

- [ ] **Step 1: Add `priority` to Headshot**

Add `priority?: boolean` to the props type and pass `fetchPriority={priority ? 'high' : undefined}` and `loading={priority ? 'eager' : undefined}` on the `<img>`. Keep `alt={USER.name}` ("Ahmad Saad"), `width`/`height` = `size`, and the `<source srcSet="/ahmad-saad-320.webp 320w, /ahmad-saad.webp 640w" sizes={`${size}px`}>` as they are (at 56 px and DPR 3 the browser picks the 7.6 KB 320w webp).

- [ ] **Step 2: Replace the eyebrow with a headshot plus location row**

In `hero.tsx` import `Headshot` from `@/components/headshot` and replace:
```tsx
<p className="eyebrow rise" style={stagger(0)}>
  AI Engineer · FDE
</p>
```
with:
```tsx
<div className="rise flex items-center gap-4" style={stagger(0)}>
  <Headshot
    size={56}
    priority
    className="ring-2 ring-apricot ring-offset-2 ring-offset-ink"
  />
  <p className="eyebrow">AI Engineer · Sharjah, UAE</p>
</div>
```
The hero is `min-height: 100svh` and bottom-aligned, so the extra 45 px grows upward into empty sky and does not push the CTA pills down.

- [ ] **Step 3: Verify**
```bash
pnpm build
CHK text .next/server/app/index.html "AI Engineer · Sharjah, UAE"
grep -o '<img[^>]*alt="Ahmad Saad"[^>]*>' .next/server/app/index.html
grep -c "FDE" .next/server/app/index.html
```
Expected: `1`; one `<img>` tag containing `width="56"`, `height="56"`, `src="/ahmad-saad.jpg"` and `fetchpriority="high"` (attribute case may be `fetchPriority`); `0`.
Review Focus 2 (run during Task 12 against the preview, record the result in the task report): on a 390x844 viewport the headshot sits above the eyebrow line of the name, the Email/LinkedIn/CV pills are fully visible without scrolling, and the LCP element reported by `new PerformanceObserver(...)` with type `largest-contentful-paint` is the `.rise-name` span or the poster image, not the headshot `<img>`.

- [ ] **Step 4: Commit**
```bash
git add components/headshot.tsx features/home/components/hero.tsx
git commit -m "Show the headshot and location on the home hero"
```

---

### Task 4: Name Ahmad Saad in every meta description, shorten two titles, fix card anchors

**Why:** Content F2 (High) and technical F3/F4 (Medium): descriptions on / and the four project pages omit the name, three are 87 to 97 chars; Mano and LoRaWAN titles are 72 and 77 chars; content F12 /about title; content F9 and technical F6 generic "Read the case study" anchors; content F14 "1 tools".

**Files:**
- Modify: `config/user.ts:41,48-49` (`jobTitle`, `metaDescription`)
- Modify: `config/projects.ts` (type: add `seoTitle?` and `seoDescription?`; values on the four case-study projects)
- Modify: `lib/seo/project-schema.ts:37-43` (`projectTitle`)
- Modify: `app/projects/[id]/page.tsx:53,236`
- Modify: `app/about/page.tsx:24-26` (`TITLE`, `DESCRIPTION`)
- Modify: `features/home/components/project-stack.tsx:77` (anchor)

**Interfaces:**
- Produces: `Project.seoTitle?: string` ("Full page title before the ' | Ahmad Saad' suffix; overrides title plus titleSummary") and `Project.seoDescription?: string` ("Meta description, 120 to 160 characters, names Ahmad Saad"). `projectTitle(project)` returns `project.seoTitle` when set, otherwise the current `title: summary` logic.

- [ ] **Step 1: Set the copy (all lengths measured; every description is 120 to 160 characters)**

| Where | Field | Exact value | Length |
|---|---|---|---|
| `config/user.ts` | `metaDescription` (home, also WebSite and ProfilePage description) | `Ahmad Saad is an AI engineer and forward deployed engineer in the UAE. Computer Engineering senior at AUS, Golden Visa holder, available January 2027.` | 150 |
| `config/user.ts` | `jobTitle` | `AI Engineer and Forward Deployed Engineer` | |
| `app/about/page.tsx` | `TITLE` | `` `About ${USER.name} | AI Engineer, AUS Computer Engineering` `` | 56 |
| `app/about/page.tsx` | `DESCRIPTION` | `Ahmad Saad, an AI engineer and Computer Engineering senior at the American University of Sharjah, formerly at Samsung Gulf Electronics. Available January 2027.` | 159 |
| `trend-radar` | `seoDescription` | `Trend Radar by Ahmad Saad: a production TikTok trend-detection platform where measurement decides and LLMs describe, with cost governance and 315 tests.` | 152 |
| `localai` | `seoDescription` | `LocalAI by Ahmad Saad: private AI for company documents that runs entirely in the browser, with page-level citations and a Playwright privacy audit.` | 148 |
| `mano-computer-simulator` | `seoTitle` | `Mano Basic Computer Simulator in Python` (page title 52) | |
| `mano-computer-simulator` | `seoDescription` | `Ahmad Saad's cycle-accurate simulator of Mano's Basic Computer in Python, with full ISA support, micro-operation control, and a CLI debugger.` | 141 |
| `lorawan-sensor-node` | `seoTitle` | `Energy Harvesting LoRaWAN Sensor Node PCB` (page title 54) | |
| `lorawan-sensor-node` | `seoDescription` | `Ahmad Saad's custom 2-layer PCB for an energy harvesting LoRaWAN sensor node: ATMEGA4809 MCU, LoRa radio, AEM10330 PMIC and PPK2 current profiling.` | 147 |

The /about description names Samsung on the page about Ahmad, not on the Trend Radar page, so Trend Radar is still never tied to Samsung by name. Home and project titles not listed above stay as they are.

- [ ] **Step 2: Wire the new fields**

`projectTitle` in `lib/seo/project-schema.ts`: first line `if (project.seoTitle) return project.seoTitle;`. In `app/projects/[id]/page.tsx` `generateMetadata`: `description: project.seoDescription ?? project.shortDescription ?? project.title`. In the same file, the Overview counter: `` value={`${project.skills.length} ${project.skills.length === 1 ? 'tool' : 'tools'}`} ``.

- [ ] **Step 3: Give the card anchor the project name**

In `project-stack.tsx` replace the link text `Read the case study` with:
```tsx
Read the <span className="sr-only">{project.title} </span>case study
```
Visible text stays "Read the case study"; crawlers and screen readers get "Read the Trend Radar case study".

- [ ] **Step 4: Verify**
```bash
pnpm build
for f in index about projects projects/trend-radar projects/localai projects/mano-computer-simulator projects/lorawan-sensor-node; do echo "== $f"; CHK page .next/server/app/$f.html | grep -E "^(title|description|canonical)"; done
CHK text .next/server/app/index.html "Read the Trend Radar case study"
CHK text .next/server/app/projects/mano-computer-simulator.html "1 tool"
```
Expected: every title length is 60 or less; `/projects/mano-computer-simulator` title `Mano Basic Computer Simulator in Python | Ahmad Saad (52)`; `/projects/lorawan-sensor-node` title `Energy Harvesting LoRaWAN Sensor Node PCB | Ahmad Saad (54)`; `/about` title length 56; every description contains `Ahmad Saad` and is 120 to 160 characters except `/projects` (151, unchanged, already named); canonicals are `https://ahmadsaad.dev`, `/about`, `/projects` and `/projects/<id>` respectively (constraint 2); the anchor count is `1`; "1 tool" count is at least `1` and `CHK text ... "1 tools"` is `0`.

- [ ] **Step 5: Commit**
```bash
git add config/user.ts config/projects.ts lib/seo/project-schema.ts "app/projects/[id]/page.tsx" app/about/page.tsx features/home/components/project-stack.tsx
git commit -m "Name Ahmad Saad in every meta description and shorten two project titles"
```

---

### Task 5: Fill out the Person graph and resolve every JSON-LD reference

**Why:** Schema F1 (Medium) string ImageObject sizes; schema F3 (High) dangling `@id` on /about and /projects; schema F4 and GEO F6 (Medium) no page dates; schema F2/F5 and SXO S4 (High) thin Person: no alternateName, sameAs 2, no knowsLanguage, memberOf, award or subjectOf.

**Files:**
- Modify: `config/site.ts` (add publish dates)
- Modify: `config/user.ts:19-24,51-56` (social: drop empty twitter and bluesky, add credly)
- Modify: `config/about.ts` (add `PRESS_MENTIONS`)
- Modify: `lib/seo/project-schema.ts` (add `websiteStub`)
- Modify: `app/page.tsx:49-57,91-168`
- Modify: `app/about/page.tsx:41-84`
- Modify: `app/projects/page.tsx:34-70`

**Interfaces:**
- Consumes: `CONTENT_LAST_MODIFIED` from `@/config/site` (Task 2).
- Produces: `SITE_PUBLISHED = '2026-08-24'` and `ABOUT_PUBLISHED = '2026-09-26'` in `@/config/site` (first commits of the site and of /about in git history); `PRESS_MENTIONS: PressMention[]` in `@/config/about` with `type PressMention = { outlet: string; headline: string; url: string; datePublished: string }` (used in Task 6); `websiteStub()` in `@/lib/seo/project-schema` returning `{ '@type': 'WebSite', '@id': 'https://ahmadsaad.dev/#website', name: 'Ahmad Saad', url: 'https://ahmadsaad.dev/' }`; `USER.social` typed `{ github: string; linkedin: string; credly: string }`.

- [ ] **Step 1: Confirm the current failures**

Run: `CHK jsonld .next/server/app/about.html; CHK jsonld .next/server/app/projects.html`
Expected: dangling `https://ahmadsaad.dev/#website` on /about; six dangling refs on /projects; `image_dims: strings` on /about; exit code 1.

- [ ] **Step 2: Config additions**

`config/site.ts`: `export const SITE_PUBLISHED = '2026-08-24';` and `export const ABOUT_PUBLISHED = '2026-09-26';` with a one-line comment "First publication dates, from git history."
`config/user.ts`: in the `User` type set `social: { github: string; linkedin: string; credly: string; };` and in `USER.social` delete `twitter: ''` and `bluesky: ''` and add `credly: 'https://www.credly.com/badges/976e4176-241f-4870-83ea-c66f896f64ff'`. (Nothing compiled references `social.twitter` or `social.bluesky`; `archive/` is excluded by tsconfig.)
`config/about.ts`, append:
```ts
export type PressMention = {
  outlet: string;
  headline: string;
  url: string;
  /** YYYY-MM-DD */
  datePublished: string;
};

/** Third-party coverage. AUS publishes his name as Ahmad Atef Saad. */
export const PRESS_MENTIONS: PressMention[] = [
  {
    outlet: 'AUS News',
    headline:
      'AUS engineering student receives competitive Tau Beta Pi Scholarship',
    url: 'https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship',
    datePublished: '2026-06-22',
  },
];
```
(The URL is the article's canonical; aus.edu/node/126616 redirects to the same page. Headline and date verified from its og:title and article:published_time.)

- [ ] **Step 3: `websiteStub` next to `personStub` in `lib/seo/project-schema.ts`**
```ts
/** Names the site's `@id` so `isPartOf` resolves on pages without the full WebSite node. */
export const websiteStub = () => ({
  '@type': 'WebSite' as const,
  '@id': `${SITE_URL}/#website`,
  name: USER.name,
  url: `${SITE_URL}/`,
});
```

- [ ] **Step 4: Homepage graph (`app/page.tsx`)**

`HEADSHOT`: `width: USER.image.width, height: USER.image.height` (numbers, drop `String()`).
Person node: keep every existing property and set or add these (values verbatim):
```ts
alternateName: 'Ahmad Atef Saad',
jobTitle: USER.jobTitle,
disambiguatingDescription:
  'AI engineer and Computer Engineering senior at the American University of Sharjah, UAE, and President of its Tau Beta Pi chapter.',
sameAs: Object.values(USER.social).filter(Boolean),
knowsLanguage: [
  { '@type': 'Language', name: 'English', alternateName: 'en' },
  { '@type': 'Language', name: 'Arabic', alternateName: 'ar' },
],
memberOf: {
  '@type': 'Organization',
  name: 'Tau Beta Pi, American University of Sharjah chapter',
},
award: [
  'Tau Beta Pi Scholarship (2026)',
  'Academic Merit Scholarship, American University of Sharjah',
  "Dean's List (6 times), American University of Sharjah",
  "Chancellor's List (3 times), American University of Sharjah",
],
// Every current mention is published by AUS, which is already in the graph.
subjectOf: PRESS_MENTIONS.map((mention) => ({
  '@type': 'NewsArticle' as const,
  headline: mention.headline,
  url: mention.url,
  datePublished: mention.datePublished,
  publisher: { '@id': AUS_ID },
})),
homeLocation: {
  '@type': 'Place',
  name: 'Abu Dhabi and Sharjah, United Arab Emirates',
  address: { '@type': 'PostalAddress', addressCountry: 'AE' },
},
```
ProfilePage node: add `dateCreated: SITE_PUBLISHED, dateModified: CONTENT_LAST_MODIFIED`. Do not mention the singer in schema.

- [ ] **Step 5: /about graph (`app/about/page.tsx`)**

`primaryImageOfPage`: `width: USER.image.width, height: USER.image.height` (numbers). AboutPage node: add `dateCreated: ABOUT_PUBLISHED, dateModified: CONTENT_LAST_MODIFIED`. Append `websiteStub()` to `@graph` (keep `personStub()`).

- [ ] **Step 6: /projects graph (`app/projects/page.tsx`)**

CollectionPage: add `dateModified: CONTENT_LAST_MODIFIED`. Append to `@graph`: `...PROJECT_PAGES.flatMap((project) => projectSchema(project) ?? [])`, `personStub()`, `websiteStub()`. The project nodes carry the same `@id`s as the project pages (`https://ahmadsaad.dev/projects/<id>#project`), so `hasPart` resolves.

- [ ] **Step 7: Verify**
```bash
pnpm build
for f in index about projects projects/trend-radar projects/lorawan-sensor-node; do echo "== $f"; CHK jsonld .next/server/app/$f.html || echo FAIL; done
```
Expected: every page prints `dangling: none` and `image_dims: ok`, no `FAIL`. For `index` the summary also prints `person.alternateName: Ahmad Atef Saad`, `person.sameAs: 3` including the credly URL, `person.knowsLanguage: English, Arabic`, `person.memberOf: Tau Beta Pi, American University of Sharjah chapter`, `person.subjectOf: https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship`, `ProfilePage created=2026-08-24 modified=2026-10-31`. For `about`: `AboutPage created=2026-09-26 modified=2026-10-31`. For `projects`: `CollectionPage modified=2026-10-31`. Optionally paste the home JSON-LD into validator.schema.org: 0 errors.

- [ ] **Step 8: Commit**
```bash
git add config/site.ts config/user.ts config/about.ts lib/seo/project-schema.ts app/page.tsx app/about/page.tsx app/projects/page.tsx
git commit -m "Fill out the Person graph and resolve every JSON-LD reference"
```

---

### Task 6: Date the About page and link the AUS News story

**Why:** GEO F6 (Medium) no visible dates; SXO S5 (Medium) no visible third-party proof; SXO S6 GitHub missing from /about; content F9 generic "projects" anchor.

**Files:**
- Create: `lib/format-long-date.ts`
- Modify: `app/about/page.tsx:192-217` (closing block of the last section)

**Interfaces:**
- Consumes: `CONTENT_LAST_MODIFIED` (`@/config/site`), `PRESS_MENTIONS` (`@/config/about`).
- Produces: `formatLongDate(iso: string): string`, `'2026-10-31'` to `'31 October 2026'`, pure string work (split on `-`, month names array), no `Date` and no `Intl`, so no timezone drift.

- [ ] **Step 1: Create `lib/format-long-date.ts`** with the signature above.

- [ ] **Step 2: Rewrite the closing block on /about**

Inside `{i === last ? ( <div ...> ... </div> ) : null}` render, in order:
```tsx
<p className="prose-body body-lg text-fg/72">
  See my{' '}
  <Link href="/projects" className={linkClass}>
    project case studies
  </Link>{' '}
  or go back to the{' '}
  <Link href="/" className={linkClass}>
    homepage
  </Link>
  .
</p>
{PRESS_MENTIONS.map((mention) => (
  <p key={mention.url} className="prose-body body-lg mt-5 text-fg/72">
    {mention.outlet}, {formatLongDate(mention.datePublished)}:{' '}
    <a
      href={mention.url}
      className={linkClass}
      target="_blank"
      rel="noopener noreferrer"
    >
      {mention.headline}
    </a>
    .
  </p>
))}
```
then the existing pill row with a third pill `<PillLink href={USER.social.github} external>GitHub</PillLink>` after LinkedIn, then:
```tsx
<p className="mono-label mt-8 text-fg/56">
  Last updated{' '}
  <time dateTime={CONTENT_LAST_MODIFIED}>
    {formatLongDate(CONTENT_LAST_MODIFIED)}
  </time>
</p>
```
Rendered text: "AUS News, 22 June 2026: AUS engineering student receives competitive Tau Beta Pi Scholarship." and "Last updated 31 October 2026".

- [ ] **Step 3: Verify**
```bash
pnpm build
CHK text .next/server/app/about.html "Last updated 31 October 2026"
grep -c 'dateTime="2026-10-31"\|datetime="2026-10-31"' .next/server/app/about.html
CHK text .next/server/app/about.html "AUS News, 22 June 2026: AUS engineering student receives competitive Tau Beta Pi Scholarship."
grep -c 'href="https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship"' .next/server/app/about.html
grep -c 'href="https://github.com/ahm-adsaad"' .next/server/app/about.html
CHK copy app/about/page.tsx lib/format-long-date.ts
```
Expected: `1`, `1`, `1`, `1`, at least `1`, `clean`.

- [ ] **Step 4: Commit**
```bash
git add lib/format-long-date.ts app/about/page.tsx
git commit -m "Date the About page and link the AUS News story"
```

---

### Task 7: Rewrite llms.txt and the about.md profile around a named definition

**Why:** GEO F3/F5 (High/Medium) and content F3 (High): the endpoint blockquote has no subject; /me/about.md has `- [twitter]()` and `- [bluesky]()` and no email; llms-full.txt repeats its summary twice; no key facts, no Credly link, no disambiguation line.

**Files:**
- Modify: `config/user.ts:46-47` (`description`)
- Modify: `config/about.ts` (add `LLMS_KEY_FACTS`)
- Modify: `lib/llms.ts` (`formatAboutMarkdown`, profile labels)
- Modify: `app/(llms)/llms.txt/route.ts`
- Modify: `app/(llms)/llms-full.txt/route.ts` (no code change needed if it keeps calling `formatAboutMarkdown(2)`; re-read after editing lib/llms.ts)
- Modify: `app/(llms)/me/about.md/route.ts`

**Interfaces:**
- Consumes: `PROFILE_DEFINITION` (Task 2), `USER.social` with `credly` (Task 5).
- Produces: `LLMS_KEY_FACTS: string[]` in `@/config/about`; `formatAboutMarkdown(level = 2): string` returning three sections (About, Key facts, Contact and profiles).

- [ ] **Step 1: Copy in config**

`config/user.ts` `description` (also becomes Person.description; 56 words):
```
Ahmad Saad is an AI engineer and forward deployed engineer based in the United Arab Emirates. He is a Computer Engineering senior at the American University of Sharjah (AUS) with a 3.96 GPA, graduating in December 2026 and available to start in January 2027. He holds a UAE Golden Visa, so no employer sponsorship is required.
```
`config/about.ts`, append `export const LLMS_KEY_FACTS: string[] = [ ... ]` with exactly these nine strings, in order (each becomes a `- ` bullet):
1. `Name: Ahmad Saad. AUS News publishes his name as Ahmad Atef Saad.`
2. `Based in: Abu Dhabi and Sharjah, United Arab Emirates.`
3. `Most recent industry role: AI/ML Engineer at Samsung Gulf Electronics, Dubai, June to August 2026. Architected and solely built a production trend intelligence platform for the regional marketing team, at an estimated $60K in avoided tooling spend and a projected 20% increase in engagement rates.`
4. `Current roles: Web Design and Development Consultant, College of Engineering, AUS (since August 2026). AI Hub Assistant, Center of Innovation in Teaching and Learning, AUS (since November 2024). Account Manager, Chief Nest, remote (since September 2025).`
5. `Certification: Claude Certified Architect: Foundations, issued by Anthropic. Verification: https://www.credly.com/badges/976e4176-241f-4870-83ea-c66f896f64ff`
6. `Leadership and honours: President of the AUS Tau Beta Pi chapter (previously Vice President). Tau Beta Pi Scholarship (2026). Academic Merit Scholarship, Dean's List six times, Chancellor's List three times.`
7. `Languages: English and Arabic.`
8. `Looking for: technical product management, forward deployed or solutions engineering, AI/ML engineering, and management and strategy.`
9. `Name note: this Ahmad Saad is a computer engineer and AI engineer in the UAE. He is not Ahmed Saad, the Egyptian singer.`

(Item 3 must not mention Trend Radar, 315 tests or any other Trend Radar figure: constraint 3. IEEE is left out until the owner confirms the tense.)

- [ ] **Step 2: `lib/llms.ts`**

Add `const PROFILE_LABELS: Record<keyof typeof USER.social, string> = { github: 'GitHub', linkedin: 'LinkedIn', credly: 'Credly' };` and export `formatProfileLinks(): string[]` returning `- [Label](url)` for every non-empty social entry, in object order. Rewrite `formatAboutMarkdown(level = 2)` to output:
```
{h} About

{PROFILE_DEFINITION}

{h} Key facts

- {each LLMS_KEY_FACTS item}

{h} Contact and profiles

- Email: ahmadd.saad02@gmail.com
- Website: https://ahmadsaad.dev
- GitHub: https://github.com/ahm-adsaad
- LinkedIn: https://www.linkedin.com/in/ahmaddsaad
- Credly: https://www.credly.com/badges/976e4176-241f-4870-83ea-c66f896f64ff
```
(the last three come from `USER.social` with `PROFILE_LABELS`; skip empty values). Leave the other formatters and `MARKDOWN_HEADERS` as they are (Task 8 edits the headers).

- [ ] **Step 3: `/llms.txt` route**

Make `generateLlmsContent()` produce exactly the text in `../../ahmadsaad.dev-audit/2026-10-30/verify/expected-llms.txt` (reproduced here; lines joined with `\n`, file ends with one newline):
```
# Ahmad Saad

> {USER.description}

Key facts:

- {LLMS_KEY_FACTS[0]}
  ... one bullet per item, 9 total ...

## Me

- [About](https://ahmadsaad.dev/me/about.md): Definition, key facts, education, certification and contact.
- [Experience](https://ahmadsaad.dev/me/experience.md): Every role with its full description and skills.
- [Projects](https://ahmadsaad.dev/me/projects.md): Selected projects with technical detail and measured impact.

## Pages

- [About Ahmad Saad](https://ahmadsaad.dev/about): Bio, education, experience, target roles and availability.
- [Projects](https://ahmadsaad.dev/projects): Index of project case studies.
- {one line per PROJECT_PAGES entry, unchanged format: [title](url): shortDescription}

## Profiles

- {formatProfileLinks()}

## Optional

- [Full text](https://ahmadsaad.dev/llms-full.txt): About, experience, projects, and education in one file.
- [Resume (PDF)](https://ahmadsaad.dev/Ahmad_Saad_CV.pdf): Full CV.
- [LocalAI live demo](https://localai.ahmadsaad.dev): Runs in any browser with WebGPU.
- [Repository](https://github.com/ahm-adsaad/portfolio): Source code for this site.
- [Sitemap](https://ahmadsaad.dev/sitemap.xml): Indexable pages.
```
The fully expanded expected file is the acceptance test; build the strings from config (`USER.website`, `PROJECT_PAGES`, `projectPath`, `SOURCE_CODE_GITHUB_URL`), do not paste the file into the route.

- [ ] **Step 4: `/me/about.md` route**

Replace the hand-built template with:
```ts
const content = `# About ${USER.name}

${formatAboutMarkdown(2)}

## Education

${formatEducationMarkdown(3)}
`;
```
and return it with `MARKDOWN_HEADERS` (import both formatters and the headers from `@/lib/llms`). This removes the empty twitter and bluesky links and adds the email.

- [ ] **Step 5: `/llms-full.txt`**

Keep `> ${USER.description}` and `formatAboutMarkdown(2)`; the About section now opens with the longer definition, so the summary is no longer printed twice. No other change.

- [ ] **Step 6: Verify**
```bash
pnpm build
CHK same .next/server/app/llms.txt.body ../../ahmadsaad.dev-audit/2026-10-30/verify/expected-llms.txt
grep -c "ahmadd.saad02@gmail.com" ".next/server/app/me/about.md.body"
grep -c "]()" ".next/server/app/me/about.md.body"
grep -ci "twitter\|bluesky" ".next/server/app/me/about.md.body"
grep -c "^> Ahmad Saad is" .next/server/app/llms-full.txt.body
grep -c "Ahmad Saad is an AI engineer and forward deployed engineer based in the United Arab Emirates" .next/server/app/llms-full.txt.body
CHK copy .next/server/app/llms.txt.body .next/server/app/llms-full.txt.body ".next/server/app/me/about.md.body" ".next/server/app/me/experience.md.body" ".next/server/app/me/projects.md.body"
grep -n "Samsung" .next/server/app/llms.txt.body
```
Expected: `MATCH`; `1` or more; `0`; `0`; `1`; `1` (the summary appears once, the definition separately); `clean`; the only Samsung line is key fact 3 and it contains no "Trend Radar".

- [ ] **Step 7: Commit**
```bash
git add config/user.ts config/about.ts lib/llms.ts "app/(llms)/llms.txt/route.ts" "app/(llms)/llms-full.txt/route.ts" "app/(llms)/me/about.md/route.ts"
git commit -m "Rewrite llms.txt and the about.md profile around a named definition"
```

---

### Task 8: Keep the llms and markdown endpoints out of search indexes

**Why:** Technical F5 (Low, recommended) and coordinator ruling: /llms.txt, /llms-full.txt and /me/*.md restate the profile densely and could outrank the HTML for the name query; `noindex` keeps them fetchable by AI retrieval bots but out of Google and Bing results. `public/_headers` cannot do this (it never applies to Worker responses).

**Files:**
- Modify: `lib/llms.ts:116-118` (`MARKDOWN_HEADERS`)

- [ ] **Step 1: Add the header**
```ts
export const MARKDOWN_HEADERS = {
  'Content-Type': 'text/markdown;charset=utf-8',
  // Fetchable by any agent, but kept out of search results: the HTML pages
  // are the citation targets. Not a robots.txt Disallow, which would block it.
  'X-Robots-Tag': 'noindex',
};
```
All five text routes already return `MARKDOWN_HEADERS` after Task 7 (`me/about.md` was switched there). Do not add `nofollow`.

- [ ] **Step 2: Verify**
```bash
pnpm build
for f in llms.txt llms-full.txt me/about.md me/experience.md me/projects.md; do echo "$f: $(grep -o '"x-robots-tag":"[^"]*"' .next/server/app/$f.meta)"; done
grep -c "x-robots-tag" .next/server/app/index.meta .next/server/app/about.meta
```
Expected: each of the five prints `"x-robots-tag":"noindex"`; both HTML `.meta` files print `0` (Review Focus 4). The live header is re-checked in Task 12; if the preview drops it, add a `headers()` rule in `next.config.mjs` for `/llms.txt`, `/llms-full.txt` and `/me/:path*` with the same header and re-verify.

- [ ] **Step 3: Commit**
```bash
git add lib/llms.ts
git commit -m "Keep the llms and markdown endpoints out of search indexes"
```

---

### Task 9: Preload the hero fonts

**Why:** Performance F1 (High): mobile home LCP 2.82 s; the hero name waits on woff2 files discovered only after the CSS, with no preload in the HTML. Root cause found during planning: `.next/server/next-font-manifest.json` is `{"pages":{},"app":{}}`, so Next emits no font preloads on this Windows build. The `display: 'block'` choice in `lib/fonts.ts` is a deliberate design decision (no fallback flash) and stays.

**Files:**
- Modify: `app/layout.tsx:60-73` (`<head>`)

- [ ] **Step 1: Add three preload links at the top of `<head>`**
```tsx
{/* next/font emits no preloads on this build (its font manifest is empty),
    so the hero waited on fonts found only after the CSS. These are content
    hashes of assets/fonts/*.woff2 (bricolage-display 800, bricolage-display
    light 300, instrument-sans); they change only if a font file changes,
    and Task 12 of the 2026-10-30 plan checks they resolve. */}
<link rel="preload" href="/_next/static/media/3b9a2d35ca5574c2-s.p.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
<link rel="preload" href="/_next/static/media/81982458c8f63afe-s.p.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
<link rel="preload" href="/_next/static/media/ae05c57c271ebcb0-s.p.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
```
Mapping verified by md5 during planning: `3b9a2d35...` = `bricolage-display.woff2` (h1, weight 800), `81982458...` = `bricolage-display-light.woff2` (tagline, weight 300), `ae05c57c...` = `instrument-sans-latin-wght.woff2` (body). Geist Mono (`125b055e...`) is not preloaded.

- [ ] **Step 2: Verify**
```bash
pnpm build
grep -o '<link rel="preload" href="/_next/static/media/[^"]*" as="font"[^>]*>' .next/server/app/index.html | wc -l
for h in 3b9a2d35ca5574c2 81982458c8f63afe ae05c57c271ebcb0; do ls .next/static/media/$h-s.p.woff2; done
```
Expected: `3`; all three files listed (if any is missing, a font file changed: recompute with `md5sum assets/fonts/*.woff2 .next/static/media/*.woff2` and update the hrefs).

- [ ] **Step 3: Commit**
```bash
git add app/layout.tsx
git commit -m "Preload the display and body fonts so the hero name paints sooner"
```

---

### Task 10: Cache public media for a week and reuse the preloaded webp poster

**Why:** Performance F3 (Medium): headshot, project images, video and posters are served `max-age=0, must-revalidate`; performance F4 (Medium): the `<video poster>` fetches an extra 81 KB jpg on top of the preloaded webp.

**Files:**
- Modify: `public/_headers` (append)
- Modify: `components/hero-video.tsx:149` (`poster`)

- [ ] **Step 1: Append to `public/_headers`** (exact block; prefixes, not global `/*.png`, so no rule overlaps `/_next/static/*`; Cloudflare joins duplicate headers with a comma):
```
# Media in public/ keeps stable, non-hashed names: cache for a week and
# revalidate in the background, never immutable.
/ahmad-saad*
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400
/about/*
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400
/projects/*
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400
/credentials/*
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400
/web-app-manifest-*
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400
```
`/about/*` and `/projects/*` never match the HTML routes: `_headers` applies only to files served from static assets, and those pages are served by the Worker. The CV PDF is left at the default so a new CV shows up at once.

- [ ] **Step 2: Poster** In `hero-video.tsx` change `poster={poster}` on the `<video>` to `poster={posterWebp ?? poster}` so the browser reuses the preloaded webp.

- [ ] **Step 3: Verify (source now, live headers in Task 12)**
```bash
grep -c "max-age=604800, stale-while-revalidate=86400" public/_headers
grep -n "poster={posterWebp ?? poster}" components/hero-video.tsx
pnpm build
```
Expected: `5`; one match; build passes.

- [ ] **Step 4: Commit**
```bash
git add public/_headers components/hero-video.tsx
git commit -m "Cache public media for a week and reuse the preloaded webp poster"
```

---

### Task 11: Put the headshot on the share card and cut it from 2 MB to about 150 KB

**Why:** Visual F4/F5 (Medium) and technical F9: every og:image is a 2,004,860 byte `q_100` PNG with a 72 px name and no face; previews on LinkedIn and WhatsApp are unreliable above about 300 KB. Tested during planning against the live Cloudinary account: `q_auto,f_jpg` gives 137 KB, adding the face via `l_fetch` gives 150 to 165 KB, HTTP 200, `image/jpeg` (`f_auto` returned a larger 198 KB webp to browsers, so JPEG is pinned for every crawler).

**Files:**
- Modify: `lib/createOgImage.ts` (whole file)
- Modify: `app/page.tsx:30-33`, `app/about/page.tsx:34-37`, `app/projects/page.tsx:27-30` (meta strings only)

- [ ] **Step 1: Replace `lib/createOgImage.ts`** (exact layout values; they were rendered and checked: a two-line project title at 88 px fits beside the 400 px face):
```ts
import { SITE_URL } from '@/lib/server-url';

// Double-encode: Cloudinary text layers need commas and slashes escaped twice.
const e = (str: string) => encodeURIComponent(encodeURIComponent(str));

// Cloudinary fetch layers take the remote URL as URL-safe base64.
const fetchId = (url: string) =>
  Buffer.from(url).toString('base64url');

/** The same headshot as Person.image, served from this domain. */
const HEADSHOT_URL = `${SITE_URL}/ahmad-saad.jpg`;

/**
 * 1600x836 share card: title and meta bottom left, round headshot on the
 * right. JPEG at automatic quality keeps it near 150 KB for every crawler.
 * Keep `meta` to one line (about 40 characters) so it never meets the title.
 */
export const createOgImage = ({
  title,
  meta,
}: {
  title: string;
  meta: string;
}) =>
  [
    'https://res.cloudinary.com/bucha/image/upload',
    'w_1600,h_836,q_auto,f_jpg',
    `l_fetch:${fetchId(HEADSHOT_URL)},w_400,h_400,c_fill,g_face,r_max`,
    'fl_layer_apply,g_east,x_100',
    `l_text:Karla_88_bold:${e(title)},co_rgb:ffe4e6,c_fit,w_960,h_340`,
    'fl_layer_apply,g_south_west,x_100,y_210',
    `l_text:Karla_44:${e(meta)},co_rgb:ffe4e6cc,c_fit,w_960,h_120`,
    'fl_layer_apply,g_south_west,x_100,y_110',
    'grain-gradient_ctrjnp.png',
  ].join('/');
```
If `Buffer` is flagged by the type check in this module, use `btoa(url).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')`; the expected id for the headshot is `aHR0cHM6Ly9haG1hZHNhYWQuZGV2L2FobWFkLXNhYWQuanBn`.

- [ ] **Step 2: One-line meta strings**

`app/page.tsx`: `meta: 'AI Engineer · American University of Sharjah'`. `app/about/page.tsx`: `meta: 'AI Engineer · Sharjah, UAE'`. `app/projects/page.tsx`: `meta: 'AI systems, hardware, and architecture'`. Project pages keep `A project by ${USER.name}`; the root layout keeps `USER.tagline`. Titles are unchanged. `OG_IMAGE_WIDTH/HEIGHT` in `lib/seo/metadata.tsx` stay 1600 and 836.

- [ ] **Step 3: Verify**
```bash
pnpm build
for f in index about projects/lorawan-sensor-node; do u=$(CHK page .next/server/app/$f.html | sed -n 's/^og:image: //p'); curl -s -o /tmp/og-$(basename $f).jpg -w "$f %{http_code} %{content_type} %{size_download}\n" "$u"; done
```
Expected: three lines with `200 image/jpeg` and a size under `300000` (about 150000 to 170000). Open `/tmp/og-lorawan-sensor-node.jpg`: the title wraps to two lines without an ellipsis and does not touch the face; the face is a circle on the right.

- [ ] **Step 4: Commit**
```bash
git add lib/createOgImage.ts app/page.tsx app/about/page.tsx app/projects/page.tsx
git commit -m "Put the headshot on the share card and cut it to about 150 KB"
```

---

### Task 12: Full build chain and preview smoke test

**Why:** Constraint 5: only the OpenNext chain proves the Worker serves what `next build` produced; `_headers` and route headers can only be checked on the Worker.

**Files:** none (no commit unless a fix is needed; a fix goes in its own commit with a message naming what it fixes).

- [ ] **Step 1: Build the Worker**
```bash
taskkill //F //IM workerd.exe 2>/dev/null; true
pnpm ensure-next-symlink && pnpm exec opennextjs-cloudflare build --dangerouslyUseUnsupportedNextVersion && pnpm assert-static-prerender
```
Expected: ends with `assert-static-prerender: N prerendered routes, none with ISR.`

- [ ] **Step 2: Worker size**

Run: `pnpm exec wrangler deploy --dry-run 2>&1 | grep -i "total upload"`
Expected: the gzip figure is under 3072 KiB (it was about 1.2 MiB in August).

- [ ] **Step 3: Start the preview** (background): `pnpm exec opennextjs-cloudflare preview`, wait until `http://localhost:8787` answers.

- [ ] **Step 4: Smoke test** (B = `http://localhost:8787`)
```bash
B=http://localhost:8787
for p in / /about /projects /projects/trend-radar /projects/localai /projects/mano-computer-simulator /projects/lorawan-sensor-node; do echo "== $p $(curl -s -o /dev/null -w '%{http_code}' -A 'Mozilla/5.0' $B$p)"; CHK page $B$p | grep -E "^(title|description|canonical|h1)"; CHK jsonld $B$p | grep -E "dangling|image_dims"; done
curl -s -A "Mozilla/5.0" $B/ | grep -c "Ahmad Saad is"
for p in /llms.txt /llms-full.txt /me/about.md /me/experience.md /me/projects.md; do echo "$p $(curl -s -o /dev/null -w '%{http_code}' $B$p) $(curl -sI $B$p | grep -i '^x-robots-tag' | tr -d '\r')"; done
curl -sI $B/about | grep -ci "^x-robots-tag"
curl -s $B/sitemap.xml | grep -o "<lastmod>[^<]*</lastmod>" | sort | uniq -c
curl -s $B/me/about.md | grep -c "ahmadd.saad02@gmail.com"
curl -s -o /dev/null -w "%{http_code}\n" $B/nonexistent
curl -sI $B/ahmad-saad.webp | grep -i "^cache-control"
curl -sI $B/about/drive-1080.mp4 | grep -i "^cache-control"
curl -sI "$B$(curl -s $B/ | grep -o '/_next/static/chunks/[^"]*\.js' | head -1)" | grep -i "^cache-control"
for h in 3b9a2d35ca5574c2 81982458c8f63afe ae05c57c271ebcb0; do curl -s -o /dev/null -w "$h %{http_code}\n" $B/_next/static/media/$h-s.p.woff2; done
CHK copy $B/ $B/about $B/projects $B/projects/trend-radar $B/llms.txt $B/llms-full.txt $B/me/about.md
```
Expected:
- All 7 pages `200`; titles as in Task 4 (all 60 characters or fewer); every description names Ahmad Saad; canonicals per page; `h1: Ahmad Saad` on / and /about; every page `dangling: none` and `image_dims: ok`.
- `Ahmad Saad is` count at least `1` on /.
- The five text endpoints `200` with `X-Robots-Tag: noindex`; /about `0` (HTML stays indexable).
- `7 <lastmod>2026-10-31</lastmod>`; about.md email count `1` or more; `/nonexistent` `404`.
- Media: `Cache-Control: public, max-age=604800, stale-while-revalidate=86400` on the webp and mp4 (if the local preview does not apply `_headers`, note it and re-check these two after the coordinator deploys); the `_next/static` chunk shows exactly `public, max-age=31536000, immutable` with no second value (Review Focus 5).
- Three font URLs `200`.
- `CHK copy` prints `clean`.

- [ ] **Step 5: Visual and LCP check (Review Focus 1 and 2)** With the preview running, use Playwright (MCP or script) at 390x844 and 1440x900 on `/`: screenshot the hero and the statement; confirm the headshot and "AI Engineer · Sharjah, UAE" sit above the name, the three pills are fully in the first viewport on mobile, and statement word spacing looks normal. Read LCP with `new PerformanceObserver(l => console.log(l.getEntries().at(-1).element)).observe({type: 'largest-contentful-paint', buffered: true})`: the element is the `.rise-name` span or the poster, not the headshot.

- [ ] **Step 6: Report** List the commits, every expected value that differed, and anything skipped. Stop the preview and kill workerd. Deployment is the coordinator's Phase 5, not part of this plan.

---

## Deferred (with reasons)

| Item | Finding | Why deferred |
|---|---|---|
| Hydration long task (lazy command menu and mobile menu, LazyMotion, bundle analysis) | Performance F2 (High) | Not an isolated sub-hour change: it needs `ANALYZE=true` bundle analysis, touches global nav behaviour on every page and needs interaction testing; desktop TBT is already 30 to 60 ms. Next plan, after the font preload is measured. |
| HTML `s-maxage=31536000` policy | Technical F2 (Medium, latent) | Changing it means `revalidate` (forbidden, constraint 1) or overriding Next's own header. Today it is safe: each deploy replaces the prerendered HTML and Cloudflare does not cache Worker HTML. Caveat for the owner: never add a "Cache Everything" Cache Rule or put another CDN in front of the site, or year-old HTML would survive deploys. |
| Repo robots.txt with `Content-Signal` (GEO section 6a) | GEO F1 | Only safe after the owner turns off Cloudflare Managed robots.txt (Owner action 2); otherwise the two blocks are concatenated again. |
| Case-study "Result" sections, "Questions recruiters ask" block, remote and relocation answer | Content F6, F11 | Need facts the owner has not supplied (measured LoRaWAN current, Mano validation, remote stance). |
| IEEE tense, Mano and LoRaWAN periods ("2025" vs "2025 - Present") | Content F5, F10 | Need the owner's answer; Owner action 14. |
| Trend Radar impact text that mirrors the Samsung figures | Content F7 | Owner decision; the rule "not tied by name" is met today. |
| Label size 11 to 12 px, 44 px tap targets, /about mobile compaction, GitHub in the header nav | Visual F3, F6, F7; SXO S6 | Site-wide design changes against DESIGN.md; owner design call. |
| Video mount after `load`, `preload="metadata"` | Performance F4 (second half) | Changes the drive-loop behaviour; small gain after the poster fix. |
| Credential badge PNG to a 240 px webp | Performance F5 | Needs a new asset build step; about 55 KB on /about only. |
| Manifest theme colour and `purpose: any`, remove `FID`, prune `images.remotePatterns`, placeholder covers | Technical F10, F11 | Low hygiene; batch later. |
| Links from /about "What I build" prose to each project page | Content F9 | `ABOUT_SECTIONS` paragraphs are plain strings; needs a rich-text structure change. |
| VideoObject, SoftwareApplication for LocalAI, WebPage nodes on project pages | GEO section 8, schema F9 | Need a demo video; project graphs already validate. |

## Owner actions (not for the implementer)

1. **Cloudflare, AI bot enforcement.** dash.cloudflare.com > ahmadsaad.dev > Security > Settings (older UI: Security > Bots) > "Block AI bots": set to allow, or in AI Crawl Control > Crawlers set GPTBot, ClaudeBot, CCBot and Applebot-Extended to Allow and keep Bytespider blocked. Why: GPTBot, ClaudeBot, CCBot and Amazonbot get HTTP 403 today. Check: `curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot" https://ahmadsaad.dev/` returns 200.
2. **Cloudflare, Managed robots.txt.** Same area: turn off "Managed robots.txt" (it prepends `Disallow: /` for Google-Extended, which stops Gemini Apps grounding on the site). Minimum: keep it but allow Google-Extended. Check: `curl -s https://ahmadsaad.dev/robots.txt | grep -c "Cloudflare Managed"` returns 0. Then tell the coordinator so the deferred robots route can ship.
3. **Cloudflare, cache rules.** Caching > Cache Rules: confirm no rule caches HTML ("Cache Everything"), and never add one (see Deferred).
4. **Cloudflare, Crawler Hints.** Caching > Configuration > Crawler Hints: on (IndexNow pings Bing and Yandex on change).
5. **Google Search Console.** Add a Domain property for ahmadsaad.dev (DNS TXT record in Cloudflare DNS), submit `https://ahmadsaad.dev/sitemap.xml`, then URL Inspection > Request indexing for `/`, `/about`, `/projects`, `/projects/trend-radar`, `/projects/localai`, `/projects/mano-computer-simulator`, `/projects/lorawan-sensor-node`. Why: the domain was not returned for its own name in the tested index. Check weekly: Performance > Queries "ahmad saad".
6. **Bing Webmaster Tools.** Site is verified (BingSiteAuth.xml): Sitemaps > submit the sitemap, or "Import from Google Search Console".
7. **GitHub profile** (github.com/settings/profile): Bio `AI engineer and forward deployed engineer. Computer Engineering at the American University of Sharjah. Available January 2027.`; Company `American University of Sharjah`; URL `https://ahmadsaad.dev` (with https); Location `Sharjah, United Arab Emirates`; tick Available for hire; same headshot as the site.
8. **GitHub README** (repo `ahm-adsaad/ahm-adsaad`): Samsung in past tense ("Previously AI/ML Engineer at Samsung Gulf Electronics, 06.2026 to 08.2026"); remove the banned model-library term; add a plain-text H1 "Ahmad Saad" and the first sentence of the site definition; a plain-text link `https://ahmadsaad.dev`; describe Trend Radar as "measurement decides, LLMs describe" without naming Samsung beside it.
9. **GitHub repos.** trend-radar > About (gear) > Website: remove the leading space before `https://ahmadsaad.dev/projects/trend-radar`; set Website on LocalAI (case study or demo), manos-basic-computer-simulator, portfolio and the other public repos; add topics; pin trend-radar, LocalAI, the Mano simulator and portfolio.
10. **LinkedIn** (linkedin.com/in/ahmaddsaad): Settings > Visibility > Edit your public profile: visible to everyone, profile photo public; Contact info > Website `https://ahmadsaad.dev` (type Portfolio); headline starting `AI Engineer and Forward Deployed Engineer | Computer Engineering, American University of Sharjah`; Featured: the site, /projects/trend-radar, /projects/localai; Licenses and certifications: the Claude Certified Architect badge with the Credly URL.
11. **AUS outreach.** Email AUS Office of Communications (or the article author) asking to add "Portfolio: https://ahmadsaad.dev" to aus.edu/node/126616; ask the CITL AI Hub (aihub.aus.edu) and the Tau Beta Pi chapter page to list him with a link.
12. **Credly.** Make the profile public, add the website, share the badge to LinkedIn; send the public profile URL (not the badge URL) so it can be added to `USER.social`.
13. **LocalAI demo** (localai.ahmadsaad.dev): add a visible "Built by Ahmad Saad" link to `https://ahmadsaad.dev/projects/localai` in the app footer and in the static HTML shell.
14. **Confirm facts** for the deferred copy: IEEE Solid-State Circuits Society Treasurer current or former; whether Mano and LoRaWAN are finished; open to remote and or relocation; whether the Trend Radar card may keep the same $60K and 20% figures as the Samsung entry; any measured LoRaWAN current or Mano validation figures.
15. **Carried from the September plan (B4, B5):** publish a Trend Radar or LocalAI write-up on dev.to or Medium with the canonical set to the case study; Show HN and a WebGPU or on-device AI awesome-list pull request for LocalAI; a 2 to 4 minute LocalAI demo video on a channel named "Ahmad Saad"; an ORCID iD listing "Ahmad Atef Saad" with "Ahmad Saad" as also known as. Skip any profile you will not maintain.
16. **Monthly honest check (September B6):** incognito `google.com/search?q=ahmad+saad&gl=ae` and `&gl=us`, plus the T4 queries; log T1 to T5 in NAME-SERP-PLAN.md.
17. **Cloudinary account (optional).** Share cards render from the template's third-party `bucha` Cloudinary account. Move the base image to your own account (change the prefix in `lib/createOgImage.ts`) so previews do not depend on someone else's account.
