# Verification report: branch `seo/geo-pass-2026-10`

- Verifier run: 2026-10-31, independent of the implementer. Every number below was produced in this run; none is copied from IMPLEMENTATION-REPORT.md.
- Range verified: base `9af87a1` to head `9c0a843` (11 commits). `main` is at `9af87a1`, which is also the merge base, so the branch fast-forwards cleanly.
- Inputs read in full: PLAN.md (912 lines), IMPLEMENTATION-REPORT.md, and the review patch (1,723 lines). I also read these changed files in full beyond the diff context: `components/hero-video.tsx`, `lib/seo/project-schema.ts`, `features/home/components/hero.tsx`, `app/page.tsx` (graph), `app/projects/[id]/page.tsx` (graph), `lib/seo/metadata.tsx`, `middleware.ts`, `next.config.mjs` (headers), all five `app/(llms)` routes, `public/_headers`, `lib/server-url.ts`, and `app/globals.css` (`.word`, `.eyebrow`, `.hero`, reduced-motion block).
- Nothing tracked was modified. The working tree still shows only `?? ahmadsaad.dev-audit/2026-10-30/`. I made no commits, pushes or deploys.

## 1. Verdict

**APPROVED WITH MINOR NOTES.**

- Findings: 0 Critical, 0 Important, 7 Minor. None of the Minor findings blocks deploy.
- Tasks 1 to 11 all pass spec. Task 12 passes, with one environment caveat: the plan's literal curl commands get a 301 on the local preview (section 4.1).
- The Worker builds, type-checks and prerenders 19 routes with no ISR. It is 1,117.68 KiB gzipped.
- On the preview, all 19 smoke-test expectations pass when the request carries the `X-Forwarded-Proto: https` header that production sends.

## 2. Per-task spec table

| Task | Result | Evidence (observed in this run) |
|---|---|---|
| 1. Real spaces in hero name and statement | Pass | `hero.tsx:38` and `app/about/page.tsx:137` have `</span>{' '}`. `statement.tsx` uses `Fragment` with `{i > 0 ? ' ' : null}`. `globals.css:715-717` `.word` is now just `display: inline-block`; the `@supports` and reduced-motion blocks are untouched. Served `h1: Ahmad Saad` on `/` and `/about`. "AhmadSaad" count is 0 on both. The full statement sentence counts 1. Playwright: statement `textContent` is the exact sentence, `margin-right: 0px`, and all 13 gaps are 0.22em (6.9 px at 32 px, 15.6 px at 72 px), so there are no doubled or collapsed gaps. |
| 2. Named definition in the home About block | Pass | `PROFILE_DEFINITION` matches the plan character for character (exact-string check). `CONTENT_LAST_MODIFIED = '2026-10-31'` is in `config/site.ts`. `app/sitemap.ts` imports it, and no other importer of the old export remains. The teaser has exactly two `<p>`, and the second matches the plan verbatim (count 1). "More about Ahmad Saad" counts 1. `<article` count is 0 on `/` and on `/projects`. The /projects lede matches verbatim (count 1). Sitemap shows `7 <lastmod>2026-10-31</lastmod>`. "Ahmad Saad is" on /about counts 0. |
| 3. Headshot and location on the home first screen | Pass | `Headshot` has an optional `priority` prop that emits `fetchPriority="high"` and `loading="eager"`. Served `<img src="/ahmad-saad.jpg" alt="Ahmad Saad" width="56" height="56" ... fetchPriority="high" loading="eager">`. The /about 160 px `<img>` has neither attribute (unchanged). The eyebrow "AI Engineer · Sharjah, UAE" counts 1, and "FDE" counts 0. |
| 4. Name in descriptions, two titles, anchors | Pass | Titles: 35, 56, 22, 59, 54, 52, 54 characters (all 60 or fewer). Mano is `Mano Basic Computer Simulator in Python \| Ahmad Saad` (52) and LoRaWAN is `Energy Harvesting LoRaWAN Sensor Node PCB \| Ahmad Saad` (54). Descriptions are 150, 159, 151, 152, 148, 141, 147 characters, and every one contains "Ahmad Saad". Each page's canonical is its own path. "Read the Trend Radar case study" counts 1. Mano shows "1 tool" 1 and "1 tools" 0. All 47 mandated strings across Tasks 2 to 11 match the source exactly (`exact_strings.py`). |
| 5. Person graph, every `@id` resolved | Pass, with the declared deviation | Every page reports `dangling: none` and `image_dims: ok` (CHK exit 0). Index: `alternateName` Ahmad Atef Saad; `sameAs` 3 including Credly; `knowsLanguage` English, Arabic; `memberOf` Tau Beta Pi, AUS chapter; `subjectOf` is the AUS URL; `ProfilePage created=2026-08-24 modified=2026-10-31`. /about: `AboutPage created=2026-09-26 modified=2026-10-31`. /projects: `CollectionPage modified=2026-10-31`. The publish dates match git history: the first commit is 2026-08-24, and `02a7908 Add an About page` is 2026-09-26. The rendered `width`/`height` are integers (748). |
| 6. Date /about and link the AUS story | Pass | Rendered text counts 1 for "Last updated 31 October 2026", 1 for "AUS News, 22 June 2026: AUS engineering student receives competitive Tau Beta Pi Scholarship.", and 1 for "See my project case studies or go back to the homepage.". Count is 1 for `datetime="2026-10-31"`, 1 for the AUS href, and 1 for the GitHub href. The order is the plan's: links paragraph, press line, pills (Email, LinkedIn, GitHub), then Last updated. I fetched the live AUS article: og:title is the exact headline, `article:published_time` is `2026-06-22T09:03:09+04:00`, and the page names "Ahmad Atef Saad". |
| 7. llms.txt and about.md around the definition | Pass | `CHK same` gives MATCH, and `cmp` confirms the build output and the served `/llms.txt` are byte-identical to `verify/expected-llms.txt`. about.md: email count 1, `]()` 0, twitter/bluesky 0, sections About, Key facts, Contact and profiles, Education. llms-full: `^> Ahmad Saad is` 1, and the description sentence appears once. The only Samsung line in llms.txt is key fact 3, which has 0 mentions of Trend Radar. |
| 8. noindex on the text endpoints | Pass | In `.meta`, `x-robots-tag: noindex` appears only on `llms.txt`, `llms-full.txt`, `me/about.md`, `me/experience.md` and `me/projects.md`. The other 14 `.meta` files (all HTML, sitemap, robots, icons, manifest, `_not-found`) do not have it. Preview: the five endpoints return 200 with `x-robots-tag: noindex`; the 7 HTML pages, sitemap, robots and the 404 have none. The header is set only in `MARKDOWN_HEADERS`, which only those five route handlers import. |
| 9. Font preloads | Pass | 3 `as="font"` preloads in `/` and `/about`. All three files exist in `.next/static/media`, and md5 confirms 3b9a… is bricolage-display, 8198… is bricolage-display-light and ae05… is instrument-sans. Each hash is referenced by the built CSS. Served URLs return 200 `font/woff2` (18,496, 19,648 and 30,092 bytes). `crossorigin="anonymous"` is present. |
| 10. Media cache rules and webp poster | Pass | The `_headers` block matches the plan exactly, giving 5 rules (wrangler: "Parsed 7 valid header rules"). `poster={posterWebp ?? poster}` is at `hero-video.tsx:110`; `posterWebp` is a typed optional prop (line 14), and `/about/drive-poster.webp` is served with 200. |
| 11. Share card with headshot | Pass | `createOgImage.ts` layout values match the plan exactly. Meta strings: home `AI Engineer · American University of Sharjah`, about `AI Engineer · Sharjah, UAE`, projects `AI systems, hardware, and architecture`. The fetch id decodes to `https://ahmadsaad.dev/ahmad-saad.jpg`. Cards: 200 `image/jpeg`, 1600x836, 140 to 163 KB (table in 4.5). |
| 12. Build chain and smoke test | Pass | Build, type check and `assert-static-prerender: 19 prerendered routes, none with ISR.` Size: `Total Upload: 5479.58 KiB / gzip: 1117.68 KiB`. Smoke test 19/19 with the header; see 4.1 for the literal-command caveat. |

Binding constraints, checked against the whole diff:

- Static rendering: every changed page and route still exports `dynamic = 'force-static'`. The diff adds no numeric `revalidate` (the only `revalidate` hits are the pre-existing `app/api/revalidate` route and a comment). It adds no fs reads.
- Canonicals: `createMetadata` defaults the path to `/`, and every non-home page passes its own path. The served canonicals are per page.
- Commits: all 11 messages are the plan's exact text, with no body, no trailer and no AI attribution. The author is `ahm-ad-saad <ahmadd.saad02@gmail.com>`. One commit per task.
- Configuration: `package.json`, `pnpm-lock.yaml`, `wrangler.jsonc`, `next.config.mjs` and `middleware.ts` are unchanged. The Worker is 1,117.68 KiB gzipped, under the 3,072 KiB limit.
- Scope: the 25 changed files are exactly the union of the plan's per-task file lists. Each commit's `--stat` shows only that task's files.
- Copy rules: there are no em or en dashes, no "LightGBM", no scraping words and no vendor names in the added lines or in any served page or endpoint (section 4.3).
- No invented facts: each new fact traces to `config/*.ts`, git history, or the live AUS article (Task 6 row above).

Present but not asked for (all judged acceptable):

- The `pixels()` helper, the declared deviation; see M1.
- `profileEntries()`, a private helper in `lib/llms.ts:23`.
- The LocalAI demo line in llms.txt is derived from `PROJECT_PAGES` instead of hardcoded. The output is byte-identical to the expected file.
- A code comment above `LLMS_KEY_FACTS`. It is not rendered.
- Multi-line JSX for the anchor and press line. The rendered text is identical.

## 3. Code quality findings

| # | Severity | File:line | Observation | Expected or recommendation |
|---|---|---|---|---|
| M1 | Minor | `lib/seo/project-schema.ts:37` (used at `app/page.tsx:56-57`, `app/about/page.tsx:60-61`) | `pixels = (value: number) => value as unknown as string` tells the type checker the value is a string when it is a number. Runtime output is correct: `"width":748,"height":748` (ints) on both pages, and CHK reports `image_dims: ok`. The cast is narrow, documented, and only flows into `JSON.stringify`. | Acceptable as is. A type-honest alternative would be to type `HEADSHOT` without the `ImageObject` annotation, or to emit `QuantitativeValue`. No change needed before deploy. |
| M2 | Minor | `app/layout.tsx:66-87` | The three font preload hrefs are hardcoded content hashes. If a font file or Next's media hashing changes, they will 404 with no build failure, only a console warning and a wasted request. In the served `<head>` they come after Next's two stylesheets (byte offsets 1123 to 1377 against 177 to 270), so they are early but not first. | Add a check to `scripts/assert-static-prerender.mjs` that the three `.next/static/media/<hash>-s.p.woff2` files exist. This can come in a follow-up. |
| M3 | Minor | `lib/format-long-date.ts:20-23` | There is no input validation: a malformed string such as `2026-13-01` renders `1 undefined 2026`. Today's inputs are config constants, so the risk is low. | Optional: throw on a month outside 1 to 12 so a bad constant fails the build. |
| M4 | Minor (plan-level) | `config/user.ts:53-54` and `app/page.tsx:108` | `sameAs` includes a Credly badge URL. `sameAs` should point at profiles that identify the person, and a badge page is weaker. The plan mandates this. | Owner action 12 already covers replacing it with the public Credly profile URL. |
| M5 | Minor | `lib/createOgImage.ts:10,25,27` | Every share card now depends at render time on Cloudinary fetching the live `https://ahmadsaad.dev/ahmad-saad.jpg`, on top of the existing third-party `bucha` account. If either fails on first render, the whole card errors. Cloudinary caches derived images, which limits the exposure. | Keep `/ahmad-saad.jpg` stable. Owner action 17 (move to an owned Cloudinary account) still applies. Re-check the cards live (section 5). |
| M6 | Minor | `components/headshot.tsx:35` | `loading="eager"` is the browser default for `<img>`, so it is a no-op. It is harmless and plan-mandated. `fetchPriority="high"` on a 7.6 KB image did not displace the LCP (section 4.6). | None. |
| M7 | Minor | `app/(llms)/me/about.md/route.ts:8-10` | The document opens with `# About Ahmad Saad` and immediately `## About`. This is cosmetic, per the plan's template. | None. It could be renamed `## Definition` in a later pass. |

The specific checks requested in the brief:

- **`pixels()` cast**: sound at runtime (M1). `next build` type-checks with no errors.
- **Headshot `priority` prop**: typed `priority?: boolean`, emitting `'high' | undefined` and `'eager' | undefined`, which are valid React 19 `img` attribute types. The build type check passes.
- **`<article>` to `<div>`**: I found no `article` selector in any `.css` or `.scss` under `apps/website` or `packages/` (excluding build dirs), and no `article` in any ts/tsx selector, `querySelector` or `closest`. The cards are styled by `.stack-card-inner` (`globals.css:870,881,910`) and `.position` (`globals.css:837,850`), and both classes are kept. Nothing is lost.
- **Whitespace and `.word`**: the real space plus `display: inline-block` gives uniform 0.22em gaps, against the old 0.25em margin. There are no double spaces, and the extracted text is the exact sentence. On the h1, the space node between two `display: block` spans renders nothing; the screenshots show the same two-line name.
- **`poster={posterWebp ?? poster}`**: the prop exists, and the file is served (200, one-week Cache-Control). The `<picture>` fallback still uses the JPEG for browsers without webp.
- **Sitemap constant move**: the old export is removed. All four consumers (`app/sitemap.ts`, `app/page.tsx`, `app/about/page.tsx`, `app/projects/page.tsx`) import from `@/config/site`, and the build passes.
- **About date block**: it uses `CONTENT_LAST_MODIFIED`. Schema has `dateModified: "2026-10-31"` (ISO), `<time dateTime="2026-10-31">` is present, and the visible text reads "31 October 2026". `formatLongDate` does no Date or Intl work, so the timezone cannot shift the day.
- **JSON-LD graph**: see the cross-page table in 4.2. The same `@id` carries the same values on every page; there is 0 conflict and 0 duplicate. On typing:
  - `alternateName` is Text.
  - `knowsLanguage` uses `Language` nodes.
  - `subjectOf` uses a `NewsArticle` (`'NewsArticle' as const`) whose publisher is `@id` AUS, which is defined on the same page.
  - `memberOf` is `Organization`, `award` is Text[], and `homeLocation.name` is on a `Place`.
  - All of these compile under schema-dts.
- **X-Robots-Tag leakage**: the header is set only in `MARKDOWN_HEADERS` (`lib/llms.ts:137-142`), which only the five text route handlers import. Neither `next.config.mjs` nor `middleware.ts` sets it. Verified on the build (`.meta`) and on the preview for all 7 HTML pages, sitemap, robots and the 404 (count 0). It cannot reach HTML responses.
- **`_headers` leakage**: on the preview, the HTML routes `/about` and `/projects/*` keep Next's `s-maxage=31536000, stale-while-revalidate=2592000`, not the one-week rule. Each media file has exactly one Cache-Control line. The CV stays at `public, max-age=0, must-revalidate`.

Observation, not a finding: the homepage definition names Samsung and an "estimated $60K", and the Trend Radar card on the same page carries the same estimate. No sentence or JSON-LD property ties the two by name (section 4.3), so the rule is met. The proximity is the owner decision deferred as Content F7.

## 4. Functional results (Worker preview)

Environment:

- Built from head `9c0a843` with `pnpm ensure-next-symlink && pnpm exec opennextjs-cloudflare build --dangerouslyUseUnsupportedNextVersion && pnpm assert-static-prerender`, which exited 0.
- The preview was `pnpm exec opennextjs-cloudflare preview` (wrangler 4.125.0, "Parsed 7 valid header rules").
- CHK cannot send headers, so each Worker response was saved with `-H "X-Forwarded-Proto: https"` and CHK was run on the saved file.
- Scripts and outputs are in `C:\Users\ahmad\AppData\Local\Temp\claude\C--Users-ahmad-Desktop-GitHubRepos-portfolio\b52c40fa-27e0-474c-a34e-5e890dc19dd7\scratchpad\verify\`: `smoke.sh`, `smoke-output.txt`, `smoke\*`, `jsonld_consistency.py`, `overlap.py`, `rules.py`, `exact_strings.py`, `build.log`, `dryrun.log`.

Build tail:
```
 ✓ Compiled successfully in 5.5s
   Linting and checking validity of types ...
 ✓ Generating static pages (22/22)
OpenNext build complete.
assert-static-prerender: 19 prerendered routes, none with ISR.
```
Worker size: `Total Upload: 5479.58 KiB / gzip: 1117.68 KiB`. The limit is 3,072 KiB; the implementer reported 1,120.13 KiB.

### 4.1 Smoke test (plan Task 12 Step 4)

The plan's literal command, with no header, returns `/ without header: 301 Location=http://localhost:8787/`. The cause is environmental:

- `wrangler.jsonc` routes `ahmadsaad.dev` as a custom domain, so the preview passes `Host: ahmadsaad.dev` over plain http.
- `middleware.ts:37-44` then applies its existing http-to-https redirect.
- Production is unaffected, because Cloudflare sends `X-Forwarded-Proto: https`.
- The branch did not change `middleware.ts`.

With the header added, the output is:
```
== / 200
title (35): Ahmad Saad · AI Engineer in the UAE
description (150): Ahmad Saad is an AI engineer and forward deployed engineer in the UAE. Computer Engineering senior at AUS, Golden Visa holder, available January 2027.
canonical: https://ahmadsaad.dev
h1: Ahmad Saad
dangling: none
image_dims: ok
== /about 200
title (56): About Ahmad Saad | AI Engineer, AUS Computer Engineering
description (159): Ahmad Saad, an AI engineer and Computer Engineering senior at the American University of Sharjah, formerly at Samsung Gulf Electronics. Available January 2027.
canonical: https://ahmadsaad.dev/about
h1: Ahmad Saad
dangling: none
image_dims: ok
== /projects 200
title (22): Projects by Ahmad Saad
description (151): Case studies by Ahmad Saad: a production trend-detection platform, on-device RAG in the browser, a CPU simulator, and an energy harvesting sensor node.
canonical: https://ahmadsaad.dev/projects
h1: Projects by Ahmad Saad
dangling: none
image_dims: ok
== /projects/trend-radar 200
title (59): Trend Radar: Production TikTok Trend Detection | Ahmad Saad
description (152): Trend Radar by Ahmad Saad: a production TikTok trend-detection platform where measurement decides and LLMs describe, with cost governance and 315 tests.
canonical: https://ahmadsaad.dev/projects/trend-radar
h1: Trend Radar
dangling: none
image_dims: ok
== /projects/localai 200
title (54): LocalAI: Private AI for Company Documents | Ahmad Saad
description (148): LocalAI by Ahmad Saad: private AI for company documents that runs entirely in the browser, with page-level citations and a Playwright privacy audit.
canonical: https://ahmadsaad.dev/projects/localai
h1: LocalAI
dangling: none
image_dims: ok
== /projects/mano-computer-simulator 200
title (52): Mano Basic Computer Simulator in Python | Ahmad Saad
description (141): Ahmad Saad's cycle-accurate simulator of Mano's Basic Computer in Python, with full ISA support, micro-operation control, and a CLI debugger.
canonical: https://ahmadsaad.dev/projects/mano-computer-simulator
h1: Mano Basic Computer Simulator
dangling: none
image_dims: ok
== /projects/lorawan-sensor-node 200
title (54): Energy Harvesting LoRaWAN Sensor Node PCB | Ahmad Saad
description (147): Ahmad Saad's custom 2-layer PCB for an energy harvesting LoRaWAN sensor node: ATMEGA4809 MCU, LoRa radio, AEM10330 PMIC and PPK2 current profiling.
canonical: https://ahmadsaad.dev/projects/lorawan-sensor-node
h1: Energy Harvesting LoRaWAN Sensor Node
dangling: none
image_dims: ok
'Ahmad Saad is' on /: 1
/llms.txt 200 x-robots-tag: noindex
/llms-full.txt 200 x-robots-tag: noindex
/me/about.md 200 x-robots-tag: noindex
/me/experience.md 200 x-robots-tag: noindex
/me/projects.md 200 x-robots-tag: noindex
/about x-robots-tag count: 0
      7 <lastmod>2026-10-31</lastmod>
about.md email count: 1
/nonexistent: 404
/ahmad-saad.webp     Cache-Control: public, max-age=604800, stale-while-revalidate=86400
/about/drive-1080.mp4 Cache-Control: public, max-age=604800, stale-while-revalidate=86400
chunk /_next/static/chunks/webpack-962bc6b938aa81c4.js  Cache-Control: public, max-age=31536000, immutable   (1 line)
3b9a2d35ca5574c2 200 / 81982458c8f63afe 200 / ae05c57c271ebcb0 200
CHK copy (plan set of 7) -> clean
```

| # | Expectation | Result |
|---|---|---|
| 1 | All 7 pages return 200 | Pass |
| 2 | Titles as in Task 4, all 60 characters or fewer | Pass |
| 3 | Every description names Ahmad Saad, 120 to 160 characters | Pass |
| 4 | Canonical is each page's own path | Pass |
| 5 | `h1: Ahmad Saad` on / and /about | Pass |
| 6 | `dangling: none` on all 7 | Pass |
| 7 | `image_dims: ok` on all 7 | Pass |
| 8 | "Ahmad Saad is" at least 1 on / | Pass (1) |
| 9 | Five text endpoints return 200 | Pass |
| 10 | Five text endpoints send `X-Robots-Tag: noindex` | Pass |
| 11 | /about X-Robots-Tag count is 0 | Pass |
| 12 | Sitemap has 7 lastmod entries at 2026-10-31 | Pass |
| 13 | about.md email count at least 1 | Pass |
| 14 | /nonexistent returns 404 | Pass |
| 15 | webp has the one-week Cache-Control | Pass |
| 16 | mp4 has the one-week Cache-Control | Pass |
| 17 | `_next/static` chunk has exactly one immutable value | Pass |
| 18 | Three font URLs return 200 | Pass |
| 19 | `CHK copy` prints clean | Pass |

**Smoke test: 19 pass, 0 fail** with the production header. The plan's literal commands give 301s, which is the environmental cause above, not a defect.

### 4.2 JSON-LD on all 7 pages (`CHK jsonld`, every exit code 0)

| Page | Node types | Dangling | image_dims | Dates |
|---|---|---|---|---|
| / | CollegeOrUniversity, Organization x3, Person, WebSite, ProfilePage, SoftwareSourceCode x3, CreativeWork, SoftwareSourceCode | none | ok | ProfilePage created=2026-08-24 modified=2026-10-31 |
| /about | AboutPage, BreadcrumbList, Person, WebSite | none | ok | AboutPage created=2026-09-26 modified=2026-10-31 |
| /projects | CollectionPage, BreadcrumbList, SoftwareSourceCode x3, CreativeWork, Person, WebSite | none | ok | CollectionPage modified=2026-10-31 |
| /projects/trend-radar | SoftwareSourceCode, Person, BreadcrumbList | none | ok | (none, by plan) |
| /projects/localai | SoftwareSourceCode, Person, BreadcrumbList | none | ok | (none, by plan) |
| /projects/mano-computer-simulator | SoftwareSourceCode, Person, BreadcrumbList | none | ok | (none, by plan) |
| /projects/lorawan-sensor-node | CreativeWork, Person, BreadcrumbList | none | ok | (none, by plan) |

The home Person summary: `alternateName` Ahmad Atef Saad; `sameAs` 3 (GitHub, LinkedIn, Credly); `knowsLanguage` English, Arabic; `memberOf` Tau Beta Pi, American University of Sharjah chapter; `subjectOf` is the AUS article URL; `description` is the new `USER.description`.

Cross-page consistency (`jsonld_consistency.py`, 0 problems):

- `#person` appears on all 7 pages, `#website` on 3, `#headshot` on 2 (ints 748 on both), and each `projects/<id>#project` on 3 (index, /projects, own page).
- Every shared property has an identical value wherever it appears.
- No `@id` is defined twice on one page.

### 4.3 Copy scan

- `CHK copy` across all 7 pages and all 5 text endpoints (12 targets) prints `clean`. The same scan over all 364 added diff lines is also `clean`.
- I grepped the 12 targets for 18 common TikTok data-vendor names (Apify, Bright Data, Exolyt, Pentos, Tokboard, Kalodata, FastMoss, TikAPI, RapidAPI, EnsembleData and others) and found 0. The only vendor reference is the pre-existing generic phrase "commercial data vendors", which the audit already allows.
- Trend Radar and Samsung appear in the same sentence 0 times, in visible text and in every endpoint. In the home JSON-LD, the Samsung `Organization` and the Trend Radar node share the graph, but no property links them: the project node's only reference is `author: #person`.
- Every visible sentence with $60K or 20% carries "estimated" or "projected" (6 distinct sentences). Example: "An estimated $60K in cost savings and a projected 20% increase in engagement rates."
- Overlap between the home definition and /about (`overlap.py`): the definition does not appear verbatim on /about (False). The longest shared word run is 10 words ("a Computer Engineering senior at the American University of Sharjah"), a noun phrase rather than copied prose. "Ahmad Saad is" counts 1 on `/` and 0 on `/about`.

### 4.4 Headers on the preview

| Path | X-Robots-Tag | Cache-Control |
|---|---|---|
| /, /about, /projects, 4 project pages | none | `s-maxage=31536000, stale-while-revalidate=2592000` (Next default, pre-existing) |
| /sitemap.xml, /robots.txt | none | `public, max-age=0, must-revalidate` |
| 5 text endpoints | `noindex` | `s-maxage=31536000, stale-while-revalidate=2592000` |
| /nonexistent (404) | none | `private, no-cache, no-store, max-age=0, must-revalidate` |
| /ahmad-saad.webp, /ahmad-saad.jpg, /ahmad-saad-320.webp, /about/drive-1080.mp4, /about/drive-poster.webp, /projects/trend-radar.jpg, /web-app-manifest-192x192.png | none | one line: `public, max-age=604800, stale-while-revalidate=86400` |
| /Ahmad_Saad_CV.pdf | none | `public, max-age=0, must-revalidate` (default, as intended) |

The served font preload URLs (all three) return 200 `font/woff2`.

### 4.5 OG images

The files are saved in `ahmadsaad.dev-audit/2026-10-30/screenshots/` and I viewed each one with Read.

| Page | Status | Type | Bytes | Saved as | Visual judgement |
|---|---|---|---|---|---|
| / | 200 | image/jpeg | 148,752 | verify-og-home.jpg | Round headshot on the right, face centred. "Ahmad Saad" in large bold at the bottom left, the meta line "AI Engineer · American University of Sharjah" below it. No overlap and no ellipsis. |
| /about | 200 | image/jpeg | 148,533 | verify-og-about.jpg | Same layout. "About Ahmad Saad" ends well left of the circle. Meta "AI Engineer · Sharjah, UAE". No overlap and no ellipsis. |
| /projects/lorawan-sensor-node | 200 | image/jpeg | 163,189 | verify-og-lorawan-sensor-node.jpg | The title wraps cleanly to two lines, "Energy Harvesting / LoRaWAN Sensor Node", the longest card. The second line ends about 80 px left of the circle. Meta "A project by Ahmad Saad". No overlap and no ellipsis. |

All three are 1600x836 progressive JPEGs. The other four cards also return 200 `image/jpeg`: /projects 154,164, trend-radar 143,888, localai 140,278 and mano 155,909 bytes. All are well under 300 KB; before this branch the card was a 2,004,860-byte PNG.

### 4.6 Screenshots and hero geometry

I looked at the implementer's screenshots with Read:

- `after-home-hero-390.png`: the hero reads correctly. The round headshot with its apricot ring sits left of the mono eyebrow "AI ENGINEER · SHARJAH, UAE". Below them is the two-line name "AHMAD / SAAD", then the tagline, then the three pills (Email, LinkedIn, CV), all in the first screen with room below. Nothing overlaps.
- `after-home-statement-390.png`: "I build systems that have to prove they work. An AI pipeline, a CPU, a circuit board." The word spacing is normal and even, with no touching words and no double gaps.

I also ran my own Playwright probe through the Playwright MCP, with the `X-Forwarded-Proto` header, DPR 1 and no throttling:

| Viewport | Headshot (top to bottom) | Eyebrow top | h1 (top to bottom) | Pills (top to bottom) | LCP element | Statement gaps |
|---|---|---|---|---|---|---|
| 390x844 | 281 to 337, 56x56, `ahmad-saad-320.webp` | 300 | 357 to 605 | 741 to 785, inside 844 | `span.block.rise-name` "Ahmad" (only entry) | 13 x 6.9 px = 0.22em |
| 1440x900 | 123 to 179 | 142 | 203 to 575 | 793 to 837, inside 900 | `span.block.rise-name` "Ahmad" (only entry) | 13 x 15.6 px = 0.22em |

The h1 `textContent` is "Ahmad Saad". The headshot never becomes the LCP element, and the pills stay above the fold (Review Focus 1 and 2 pass).

Shutdown: I stopped the preview and killed the surviving `wrangler dev` and workerd tree with `taskkill /T`. Final state: no wrangler, opennext or workerd processes, and localhost:8787 does not answer.

## 5. Deploy readiness and live re-checks

**Safe to fast-forward and deploy.**

- `main` is at `9af87a1`, the branch's merge base, and the 11 commits are linear on top, so `git merge --ff-only seo/geo-pass-2026-10` applies.
- The `.open-next` output on disk was rebuilt from `9c0a843` in this run, so `pnpm exec opennextjs-cloudflare deploy` can run directly from `apps/website`.
- Rebuild with the same chain if anything changes first. Do not use `pnpm run deploy`, which hits the Next 15 support-window check.

After deploy, re-check these on `https://ahmadsaad.dev` with plain curl (no header needed there):

1. **Redirects:**
   - `curl -sI http://ahmadsaad.dev/about` should return 301 to `https://ahmadsaad.dev/about`.
   - `curl -sI https://www.ahmadsaad.dev/about` should return 301 to the apex.
   - `curl -sI https://ahmadsaad.dev/about` should return 200.
   - The local preview cannot test the www host.
2. **`_headers` media caching:**
   - `/ahmad-saad.webp`, `/ahmad-saad.jpg`, `/about/drive-1080.mp4`, `/about/drive-poster.webp` and `/projects/trend-radar.jpg` should each show exactly one `Cache-Control: public, max-age=604800, stale-while-revalidate=86400`.
   - A `/_next/static/chunks/*.js` file should show exactly one `public, max-age=31536000, immutable`, with no comma-joined second value.
   - `/about` and `/projects/trend-radar` HTML must NOT get the one-week value.
   - `/Ahmad_Saad_CV.pdf` should stay at `max-age=0`.
3. **X-Robots-Tag:** `noindex` on `/llms.txt`, `/llms-full.txt`, `/me/about.md`, `/me/experience.md` and `/me/projects.md`. None on `/`, `/about`, `/projects`, the four project pages, `/sitemap.xml` or `/robots.txt`.
4. **Cache purge:** purge the Cloudflare cache for `/llms.txt`, `/llms-full.txt` and `/me/*` so the new bodies and the noindex header are served at once. The edge may hold the old bodies.
5. **Fonts:** the three font URLs under `/_next/static/media/` should return 200 from production.
6. **Sitemap:** `curl -s https://ahmadsaad.dev/sitemap.xml | grep -c "2026-10-31"` should print 7. Then resubmit the sitemap in GSC and Bing (Owner actions 5 and 6).
7. **Share cards:**
   - Fetch the og:image of `/`, `/about` and `/projects/lorawan-sensor-node`; each should return 200 `image/jpeg` under 300 KB.
   - Refresh cached previews with LinkedIn Post Inspector and the Facebook Sharing Debugger.
   - If a card errors, check `https://ahmadsaad.dev/ahmad-saad.jpg` first (M5).
8. **Rich results:** paste the home and /about JSON-LD into validator.schema.org and Google's Rich Results Test; expect 0 errors (section 6).
9. **Spot check:** `curl -s https://ahmadsaad.dev/ | grep -c "Ahmad Saad is"` should be at least 1, and `curl -s https://ahmadsaad.dev/llms.txt | cmp - <expected-llms.txt>` should be byte-identical.

## 6. Not verified, and why

- **External schema validators** (validator.schema.org, Google Rich Results Test) were not run. They need the public URL or a manual paste. My structural checks (dangling refs, numeric dimensions, `@id` consistency, schema-dts compilation) all pass. That covers the graph's own consistency, not Google's rules for rich-result eligibility.
- **Production behaviour of `_headers`, the http-to-https redirect and the www-to-apex redirect.** The local preview applied the 7 header rules. However, a `Host: www.ahmadsaad.dev` override did not reach the middleware, and the preview cannot reproduce Cloudflare's edge, so these are on the live list.
- **Field LCP timing.** My probe ran at DPR 1 on desktop Chromium without network throttling. It confirms which element is the LCP and the layout geometry, not real-device timings. The implementer's DPR 3 mobile-emulation run reports the same element and geometry.
- **How LinkedIn, WhatsApp and X render the cards** cannot be tested before deploy.
- **The implementer's 1440 px screenshots** (`after-home-hero-1440.png`, `after-home-statement-1440.png`) were not opened, as the brief asked only for the 390 px pair. I measured the 1440 px geometry and gaps myself instead (4.6).
