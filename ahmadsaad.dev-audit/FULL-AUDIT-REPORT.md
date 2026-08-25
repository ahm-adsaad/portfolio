# Full SEO Audit — https://ahmadsaad.dev
**Date:** 2026-08-24 · **Business type:** Personal portfolio / personal brand (AI engineer, UAE) · **Pages:** 1 HTML page (+ agent-facing `llms.txt` / `/me/*.md` endpoints) · **Stack:** Next.js 15 App Router (static prerender) → OpenNext on Cloudflare Workers, built from the ruixenui "srisomanaath" template.

## SEO Health Score: **46 / 100**

| Category | Weight | Score | Weighted | Source |
|---|---|---|---|---|
| Technical SEO | 22% | 38 | 8.4 | findings/technical.md |
| Content Quality (E-E-A-T) | 23% | 58 | 13.3 | findings/content.md |
| On-Page SEO | 20% | 55 | 11.0 | synthesized (title/meta/headings/links from content + technical + visual) |
| Schema / Structured Data | 10% | 12 | 1.2 | findings/schema.md |
| Performance (CWV, lab) | 10% | 51 | 5.1 | findings/performance.md + lab-vitals.json |
| AI Search Readiness (GEO) | 10% | 43 | 4.3 | findings/geo.md |
| Images | 5% | 58 | 2.9 | findings/images.md |
| **Total** | | | **46.2** | |

Supplementary (not in the weighted score): Sitemap 82/100 (findings/sitemap.md) · SXO gap score 29/100 (findings/sxo.md) · Backlinks: **insufficient data** — Common Crawl has not crawled the domain yet (findings/backlinks.md) · Visual/mobile 74/100 (findings/visual.md).

## Executive summary

**Context that reframes everything:** the repository's first commit is 2026-08-24 — the site launched *today*. So "not in Google" (confirmed: `site:ahmadsaad.dev` and `"ahmadsaad.dev"` return only unrelated people, incl. a competing developer at **saadahmad.dev**) is expected, not a defect. The audit's job is to make sure the *first* indexing pass lands on one clean URL with a correct entity, and that the proof-of-work content is actually crawlable when it does.

**What's genuinely good:** the copy is strong (content_quality.py 95/100: no filler, no AI-pattern markers, claims hedged honestly); mobile above-the-fold is exemplary (H1, role, full intro, availability line all visible without scrolling); the page is fully prerendered (344 KB HTML with content, no SPA dependency); title tag (44 chars), OG/Twitter cards, icons, manifest and single-URL sitemap are all in place; the robots.txt policy is already the right shape for a portfolio (training crawlers blocked; live-retrieval agents — Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, Claude-User, Claude-SearchBot, PerplexityBot — allowed).

**Top issues (highest leverage first)**
1. **No canonical URL: 4 duplicate variants live** — `http://`, `https://`, apex and `www.` all return 200 with no redirect, no `<link rel="canonical">`; `www`'s own sitemap and robots self-report `www` URLs (host-derived in `lib/server-url.ts`). Compounded by a latent bug: `lib/seo/metadata.tsx` builds `metadataBase` as `new URL("https://https://ahmadsaad.dev/")`, so any *relative* canonical would resolve to `https://https//ahmadsaad.dev/`. *(Critical — Technical)*
2. **JSON-LD is an empty, wrong-type entity** — `{"@type":"Organization"}` with no name/url/sameAs (`app/page.tsx:39-46`). For a common name with an active look-alike domain, the missing `Person` + `sameAs` graph is the single biggest entity-disambiguation gap. *(Critical — Schema)*
3. **~80% of the proof-of-work content never reaches the DOM** — the four non-Samsung role descriptions and four non-Trend-Radar project captions are unmounted (Radix `CollapsibleContent` without `forceMount`; carousel renders only the active caption). Grep of the rendered HTML for their text = 0 matches. Crawlers and AI agents see titles and dates only. *(Critical — Content/On-page)*
4. **The AI-facing endpoints are broken in production** — `scripts/build-registry.mts` writes a template `public/llms.txt` + `public/llms-full.txt` at build time that shadow the real route handlers (live `llms.txt` links 7 dead `/craft/*` URLs; `llms-full.txt` is 71 KB of template component source); `/me/craft.md` returns **HTTP 500** (`getAllPosts()` uses `fs.readdirSync` on the Workers runtime); `/me/bookmarks.md` 404s; `/me/experience.md` is title-only because the description interpolation is commented out. *(Critical — GEO)*
5. **Mobile performance is gated by one JS chunk and a slow origin** — under Lighthouse 4× CPU throttling, `224-b51a9b702c283363.js` (174 KB) runs a single ~7 s main-thread task before the LCP paragraph paints (mobile LCP 6.0–13.4 s, TBT 0.3–6.6 s); TTFB is 1.1–1.9 s on every run with `x-nextjs-cache: MISS`; 400 KB of eagerly-preloaded, 30×-oversized carousel JPEGs compete for bandwidth; three dead analytics requests (`/stats/script.js`, `/_vercel/insights/script.js`, `/_vercel/speed-insights/script.js`) fire on every load. *(Critical — Performance)*
6. **`robots.txt` disallows `/_next/` for every crawler** — the Cloudflare-managed `User-agent: *` group and the app's `User-agent: *` group merge, so Googlebot cannot fetch CSS/JS/font chunks. Muted (content is prerendered) but it degrades Google's render pass and the client-fetched GitHub graph. *(High — Technical)*

**Top 5 quick wins (≤ 1 hour each)**
1. Cloudflare "Always Use HTTPS" + a redirect rule `www.ahmadsaad.dev/* → https://ahmadsaad.dev/…` (301); hardcode `https://ahmadsaad.dev` in `lib/server-url.ts`; fix `metadataBase`; add `alternates: { canonical: '/' }`.
2. Paste the `Person`/`WebSite`/`ProfilePage` graph from findings/schema.md §5 into `app/page.tsx` (data already exists in `config/user.ts`).
3. Remove `'/_next/'` from `disallow` in `app/robots.ts`.
4. Shorten `USER.description` for the meta tag to ≤ 160 chars (proposed rewrite in findings/content.md) and decouple it from `/me/about.md`.
5. Delete `buildLlmsFiles()` from `scripts/build-registry.mts` so the route handlers serve `llms.txt`; drop the `Craft`/`Bookmarks` links until those endpoints exist; remove the Vercel analytics scripts and gate Umami on its env var; purge Cloudflare cache for `/llms.txt`, `/llms-full.txt`.

## Synthesis (10-principle walk)

**PERCEIVE.** External: one prerendered page, 635 visible words, 39–44 requests / ~950 KB, clean metadata, empty schema, 4 URL variants, broken AI endpoints, zero search presence. Internal assumptions checked: (a) "not indexed = broken" — rejected, the site is hours old; (b) "AI crawlers blocked = bad for a portfolio" — rejected after reading the matrix: only *training* UAs are blocked, retrieval UAs are allowed, which matches the owner's evident intent (Content-Signal `ai-train=no, search=yes`); (c) "single-page = thin" — rejected, the portfolio-page floor is 500 words and the copy passes; the problem is what is *hidden*, not what is written; (d) "images are the LCP" — rejected by 7/7 lab runs: the LCP element is always the intro/role *text*, so the image work is a bandwidth/CLS fix, not the LCP fix. Listen: the author's brief (portfolio-context.md) targets technical-PM roles first — and the page never says "product" once.

**ANALYZE.** Page type: navigational/branded profile (people searching the name, the university, or the Samsung project). Eligibility floor: not yet indexed → the highest-leverage constraint is *clean first indexation*: one host, one canonical, a correct entity. Lateral connections: the empty schema × the saadahmad.dev name collision × zero backlinks = an entity Google cannot yet distinguish; the collapsed content × title-only `experience.md` × llms.txt pointing at 500/404s = one root cause (template scaffolding never wired to the real data) surfacing in three audits; the `metadataBase` bug × the missing canonical = fixing one without the other ships a broken canonical; the reveal-on-load animation × the 174 KB blocking chunk = the LCP text waits for hydration *and* an animation. System sequencing: host canonicalization and `metadataBase` must precede the canonical tag; schema `sameAs` and owned-profile backlinks are reciprocal and should ship together; content un-hiding must precede any GEO/citability work because agents currently cannot read it.

**VALIDATE.** Feel: none of the fixes touch the brand voice or the deliberately hedged claims (keep "estimated $60K" / "projected 20%"). The reveal animation is a design choice — the recommendation keeps it but stops it from gating the LCP text. Operator capacity: a solo developer; every Phase-1 item is a ≤ 1-hour change. Accept: each recommendation in ACTION-PLAN.md carries a falsification check.

**ACT.** See ACTION-PLAN.md — four phases, dependency-ordered, with leading indicators the owner can watch in Search Console without re-running this audit.

## Technical SEO (38/100) — findings/technical.md
- **Critical** No canonical + 4 duplicate variants (evidence above). Fix: Cloudflare redirect rule / `middleware.ts` host+scheme redirect; hardcode base URL; fix `metadataBase`; add canonical.
- **High** `/_next/` disallowed for all UAs via merged `User-agent: *` groups. Fix: drop from `app/robots.ts`.
- **High** No security headers (HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy all absent). Fix: `headers()` in `next.config.mjs` or `public/_headers`; enable HSTS in Cloudflare.
- **Medium** Hashed `/_next/static/*` served `max-age=0, must-revalidate` (no `immutable`). **Medium** Dead `/stats/script.js` (404) requested on every load (`NEXT_PUBLIC_UMAMI_WEBSITE_ID` unset). **Medium** `og:image:width/height` say 1200×630 but the Cloudinary asset is 1600×836. **Medium** Sitemap `lastmod` changes on every *request* (dynamic route + `dayjs()`), which Google may treat as untrustworthy. **Low** No IndexNow (fine to skip). **Info** HTML served with `x-nextjs-cache: MISS` on every fetch observed → TTFB 1.1–1.9 s in lab; check OpenNext ISR/cache config.

## Content Quality (58/100) — findings/content.md
- **Critical** Collapsed content unmounted from DOM (details above). **Critical** `/me/experience.md` is 71 words of titles/dates. **High** Meta description 313 chars (SERP truncates ~155). **Medium** No PM/management-audience language despite being target #1. **Medium** `$60K` claim uncorroborated (correctly hedged — keep the hedge, link a case study when the repo is public). **Medium** 9/14 links have no accessible name. **Low** Samsung role flagged `isCurrentEmployer` though its end date (08.2026) has passed; Chief Nest / AUS AI Hub are the open-ended ones. E-E-A-T: Experience 65, Expertise 72, Authoritativeness 45, Trust 55. Proposed title/meta rewrites are in the file.

## On-Page SEO (55/100, synthesized)
Works: `<title>Building production AI systems | Ahmad Saad</title>` (44 chars), single H1 = name, H2 per section, H3 per role, `lang="en"`, OG/Twitter complete, external links to employers/university. Gaps: no canonical; meta description 2× too long; ~80% of section body text absent from DOM; 9 icon-only links unnamed (home, GitHub, CV, mailto, 5 company logos); flagship project links to a repo that is currently private; LocalAI (the best live-demo project) not described on-page; only one internal link (`/`) — acceptable for a one-pager, but the CV PDF deserves a visible text link.

## Schema (12/100) — findings/schema.md
Current: one `<script type="application/ld+json">` containing `{"@type":"Organization","@context":"https://schema.org"}` — syntactically valid, semantically empty, wrong type. Recommended graph (ready-to-paste TypeScript in §5 of the file, typed with `schema-dts` `Graph`): `Person` (name, givenName/familyName, jobTitle, url, image, email, `sameAs` [GitHub, LinkedIn], `alumniOf` → CollegeOrUniversity AUS, `worksFor`/affiliation, `knowsAbout`, `homeLocation` at region level) + `WebSite` + `ProfilePage` (`mainEntity` → Person) + optional `SoftwareSourceCode` per public repo. Also widen the `JsonLd` prop type to `WithContext<Thing> | Graph`. No FAQPage/HowTo anywhere (correct). Verify with the Rich Results Test + Schema Markup Validator after deploy.

## Performance (51/100, LAB) — findings/performance.md, lab-vitals.json
No field data (no CrUX yet; no PageSpeed API key, and the keyless PSI endpoint was rate-limited). Lighthouse 13.4.1: 2 mobile runs (4× CPU throttle) + 1 desktop, cross-checked against 4 Playwright runs (unthrottled). The LCP element is the intro/role **text `<p>`** in all 7 runs — never an image.

| Metric (lab) | Mobile Lighthouse (2 runs) | Desktop Lighthouse | Playwright desktop | Playwright mobile | Good ≤ |
|---|---|---|---|---|---|
| TTFB | 1.62 / 1.19 s | 1.43 s | 1.92 / 1.17 s | 1.35 / 1.61 s | 0.8 s |
| LCP | **13.4 / 6.0 s (Poor)** | 1.36 s | 2.49 / 1.69 s | 3.10 / 3.18 s | 2.5 s |
| TBT (INP proxy) | **6.6 / 0.32 s** | **1.91 s** | — | — | 0.2 s |
| CLS | 0.069 | 0.106 | 0.077 | 0 | 0.1 |
| Transfer / requests | 973 KB / 44 | 992 KB / 43 | 953 KB / 39 | 953 KB / 39 | — |

Root causes: chunk `224-b51a9b702c283363.js` (174 KB) executes one long task (≈7 s throttled, 2.1 s desktop) that the LCP paragraph waits behind, compounded by the `RevealOnLoad` opacity animation; TTFB above 1 s on every run (`x-nextjs-cache: MISS` — the prerendered page appears to render per request); 5 carousel JPEGs (400 KB, ~41 % of page weight) eagerly `<link rel=preload>`-ed and 30×+ oversized (347 KB wasted per Lighthouse) although they are never the LCP; 3 dead analytics requests per load (`/stats/script.js`, `/_vercel/insights/script.js`, `/_vercel/speed-insights/script.js` — Vercel scripts on a Cloudflare deployment); no `preconnect` hints; 23 KB render-blocking CSS; Cloudflare Insights beacon ≈ 0.66 s avoidable LCP delay; ~12 KB legacy polyfills; desktop CLS 0.097 of 0.106 from the unsized carousel, mobile CLS from an accordion hydration race + font swap; hashed assets served `max-age=0`.

## Images (58/100) — findings/images.md
5 JPEGs, 386 KB total, all with good alt text; no `next/image`, no width/height (CLS in the carousel), no `srcset`, no lazy-loading, all 5 preloaded; WebP would save ~46 % (386 → ~209 KB). The `/_next/image` optimizer returns the original JPEG on Cloudflare (not configured).

## AI Search Readiness (43/100) — findings/geo.md
Crawler policy: correct shape (training UAs blocked, retrieval UAs allowed; `Google-Extended` does not affect Search/AI Overviews). Broken: `llms.txt` template leftovers (7 dead `/craft/*` links, links to a 500 and a 404), `llms-full.txt` is template code, `experience.md` title-only, no Projects endpoint; the build script shadows the route handlers; the edge cache served stale copies at some PoPs. Citability 48/100: the intro passages are quotable (who / what / where / when-available all stated) but the evidence passages (architecture, cost governance, results) are hidden in unmounted DOM. A corrected `llms.txt` draft is in the file.

## Visual / mobile (74/100) — findings/visual.md, screenshots/
Mobile above-the-fold excellent; no horizontal overflow; reduced-motion respected. Issues: hero invisible for the first ~1–2 s on desktop (animation), 5 unnamed 24×24 company-logo links + unnamed CV icon, tap targets < 24 px (pronounce button 16×16), drag-only carousel with no arrows, desktop lab CLS from the hero reveal / carousel, low-contrast muted text in the light theme (unmeasured), a dev-style clock/viewport/llms overlay visible to all desktop visitors.

## SXO (gap score 29/100) — findings/sxo.md
Branded and semi-branded SERPs (`Ahmad Saad`, `Ahmad Saad AI engineer AUS Sharjah`, `ahmadsaad.dev`) are owned by unrelated people (singer, footballer, cardiologist, AUS staff page) and by saadahmad.dev. Persona scores: post-interview name verifier 13/100, technical-PM hiring manager 50, AI/ML lead 52, forward-deployed lead 59, 20-second recruiter skim 67. Fixable on-page: expand the four hidden roles, describe LocalAI + live demo, visible CV text link, carousel arrows, one PM-framing sentence.

## Backlinks (insufficient data) — findings/backlinks.md
Common Crawl `cc-main-2026-jan-feb-mar`: domain not in crawl or rankings (site is newer than the snapshot) — reported as *no data*, not "zero authority". Owned links missing: GitHub profile `blog` field empty; `trend-radar` and `manos-basic-computer-simulator` repos have `homepage: null`; `github.com/ahm-adsaad/LocalAI` (referenced in the brief) does not publicly exist. LinkedIn website field unverifiable by automation.

## Sitemap (82/100) — findings/sitemap.md
Valid single-URL sitemap, declared in robots.txt. Defect: `lastmod` is generated per request. Correct: agent-facing `.md`/`.txt` endpoints and the CV PDF are rightly excluded. Corrected `app/sitemap.ts` in the file; set up Search Console (domain property) and submit; skip IndexNow.

## Limitations
No Google API credentials (no CrUX field data, no GSC/GA4), no DataForSEO/Firecrawl, backlink data at Tier 0 only. All CWV numbers are lab, single-location. SERP observations come from a US-routed web search on 2026-08-24. Three subagents (technical, content, performance) initially stopped before writing and were re-run; the visual analysis was executed inline with the plugin's Playwright runtime.

## Artifacts
`findings/*.md` (10 files) · `screenshots/` (8 PNGs: desktop/mobile × light/dark × above-fold/full) · `lab-vitals.json` · `audit-data.json` · `ACTION-PLAN.md`
