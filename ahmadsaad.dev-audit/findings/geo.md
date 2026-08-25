# GEO / AI Search Readiness Audit — ahmadsaad.dev

Audited: 2026-08-24. Method: live `curl` (UA-spoofed and cache-status probing) against `https://ahmadsaad.dev`, `https://www.ahmadsaad.dev`, `http://ahmadsaad.dev`; source review of `apps/website/{app,lib,config,features}`; rendered HTML/body-text captured via `render_page.py` (`is_spa: false`, full content present pre- and post-JS).

## GEO Health Score: 43 / 100 ("Needs Work")

| Dimension | Weight | Score /100 | Weighted |
|---|---|---|---|
| Citability | 25% | 48 | 12.0 |
| Structural Readability | 20% | 58 | 11.6 |
| Multi-Modal Content | 15% | 30 | 4.5 |
| Authority & Brand Signals | 20% | 35 | 7.0 |
| Technical Accessibility | 20% | 40 | 8.0 |
| **Total** | | | **43.1 ≈ 43** |

The site's biggest problem is not the robots.txt policy (that part is actually close to correct for a portfolio that wants to be *cited*, not *trained on* — see below). It's that the endpoints purpose-built for AI consumption (`/llms-full.txt`, `/me/craft.md`) are **broken in production right now** while the repo already contains fixed source for some of them, and that most of the site's real substance (5 of 6 job descriptions, all 5 project write-ups) never reaches the DOM at all.

---

## AI Crawler Access Matrix (verified against live `/robots.txt`, 2026-08-24)

Two rule groups exist on `/robots.txt`: a **Cloudflare-managed block** (`Content-Signal: search=yes,ai-train=no,use=reference` + a named-bot Disallow list) followed by the **Next.js app's own** `Allow: /` block. Named bots match the most specific group; everything else falls to the generic `User-agent: *` groups, which is `Allow: /`.

| Crawler | Owner / purpose | robots.txt rule | Live access | Notes |
|---|---|---|---|---|
| GPTBot | OpenAI — **training** crawler | `Disallow: /` (named) | Blocked (by policy) | Content-Signal `ai-train=no` reinforces this. Does **not** affect ChatGPT's ability to answer about the page in real time. |
| OAI-SearchBot | OpenAI — ChatGPT web **search/citation** | Not named → generic `Allow: /` | **Allowed** | Can retrieve the page live for ChatGPT search answers/citations. |
| ChatGPT-User | OpenAI — user-triggered browsing (plugins/agent mode) | Not named → generic `Allow: /` | **Allowed** | |
| ClaudeBot | Anthropic — **training** crawler | `Disallow: /` (named) | Blocked (by policy) | |
| Claude-User | Anthropic — user-triggered browsing (Claude fetching a URL on request) | Not named → generic `Allow: /` | **Allowed** | |
| Claude-SearchBot | Anthropic — Claude's search/citation indexer | Not named → generic `Allow: /` | **Allowed** | |
| PerplexityBot | Perplexity — crawl + real-time answer citation | Not named → generic `Allow: /` | **Allowed** | |
| Googlebot | Google Search indexing; also what grounds **AI Overviews / AI Mode** | Not named → generic `Allow: /` | **Allowed** | Confirmed: standard-UA fetch returns full 344KB prerendered HTML. |
| Google-Extended | Google — opt-out for Gemini app / Vertex AI **training** corpora | `Disallow: /` (named) | Blocked (by policy) | Per Google's own documentation this does **not** remove the page from Search or AI Overviews — those run on the regular Search index (Googlebot), which is unaffected. |
| Bingbot | Bing indexing; grounds Copilot/Bing Chat | Not named → generic `Allow: /` | **Allowed** | |
| CCBot | Common Crawl (feeds many third-party LLM training sets) | `Disallow: /` (named) | Blocked (by policy) | |
| Applebot-Extended | Apple — Apple Intelligence **training** opt-out (plain `Applebot`, used for Siri/Spotlight indexing, is *not* named and stays allowed) | `Disallow: /` (named) | Blocked (training only) | |
| Amazonbot | Amazon — Alexa/shopping-assistant crawler | `Disallow: /` (named) | Blocked (by policy) | Low relevance for this content, but note it also has retrieval use cases Amazon doesn't cleanly separate from training. |
| Bytespider | ByteDance — training crawler | `Disallow: /` (named) | Blocked (by policy) | |
| meta-externalagent | Meta — **blended** crawl (Meta has not published a separate real-time/citation UA the way OpenAI/Anthropic have) | `Disallow: /` (named) | Blocked | **Caveat**: unlike GPTBot/ClaudeBot, blocking this one plausibly *also* reduces Meta AI's ability to cite the page live, since Meta doesn't expose a distinct retrieval-only bot. Worth monitoring if Meta AI visibility matters to the target audience. |
| CloudflareBrowserRenderingCrawler | Cloudflare's own headless-render fetch service (used by third-party tools built on Cloudflare Browser Rendering) | `Disallow: /` (named) | Blocked | Niche; low impact. |
| anthropic-ai | Legacy Anthropic training UA | Not explicitly named | Not explicitly blocked, but `ai-train=no` Content-Signal applies broadly | Low practical risk since `ClaudeBot` is the active UA Anthropic uses today. |

**Net read:** the policy is already close to the right shape for a portfolio — *opt out of training, stay visible for live citation*. All of the user-triggered/real-time retrieval agents that actually let ChatGPT, Claude, Perplexity, and Google/Bing answer "who is Ahmad Saad" **can** reach the page. Only the training-only crawlers are blocked. This is consistent with the `Content-Signal: search=yes, ai-train=no, use=reference` line, which is a real, still-emerging web-policy standard (Cloudflare/RSL-adjacent "Content Signals"), not junk.

**Verification caveat:** I confirmed the *documented* policy (robots.txt Disallow list) and that unauthenticated `curl` with a spoofed UA is never blocked by Cloudflare (every UA I tried, including plain GPTBot, returned HTTP 200 — because Cloudflare's bot-management block matches **verified** bot traffic via IP range/JA3/reverse-DNS, not a literal User-Agent string). I could not spoof a Cloudflare-verified bot from this environment, so I cannot 100% confirm the edge WAF actively 403s *real* GPTBot/ClaudeBot traffic vs. relying on those crawlers' own robots.txt compliance — but both mechanisms point the same direction (blocked), so the practical conclusion holds either way.

**One accessibility bug that touches every crawler equally, including the allowed ones:** the Next.js-generated block of `/robots.txt` (`app/robots.ts`) sets `Disallow: /_next/`, which blocks all JS/CSS/font chunk requests for *every* UA, including Googlebot. Core content is prerendered into the initial HTML so this doesn't hide text today, but it's a latent risk (Search Console "blocked resource" warnings, and any future client-rendered content would be invisible to bots that don't already have the HTML). File: `apps/website/app/robots.ts`.

---

## llms.txt / llms-full.txt ecosystem — status: broken in production

This is the single biggest finding. The site has the right *idea* (`/llms.txt`, `/llms-full.txt`, `/me/about.md`, `/me/experience.md`, `/me/craft.md`) but three of five endpoints are currently unusable, and the repo already contains a fix for one of them that hasn't reliably rolled out.

| Endpoint | Live status (repeated, multi-PoP curl) | Source-of-truth (`app/(llms)/**/route.ts`) | Verdict |
|---|---|---|---|
| `/llms.txt` | Inconsistent: some Cloudflare edge PoPs (SIN, HKG) served a **stale, pre-rewrite** version (old tagline "Software engineer building polished products…", dead `Craft/Components/Examples` section, a `Bookmarks` link that 404s) on `CF-Cache-Status: HIT`; a cache-bypassing `MISS` request returned the correct, current content matching `config/user.ts`, and it then stayed correct on subsequent `HIT`s. | Generates correct, current content (name, real one-line description, About/Experience/Craft links, Social). | Self-healed during this audit, but confirms edge-cache entries from before the last deploy were being served with `Cache-Control: public, max-age=0, must-revalidate` — which should have prevented this. |
| `/llms-full.txt` | **Persistently stale on every request tested** (apex and `www`, 3+ PoPs, both cache MISS and HIT): 71,518 bytes of raw **template component source code** (`Book`, `Game of Life`, `Magical Mouse`, `View Magnifier`…) copy-pasted from the `srisomanaath` registry — zero information about Ahmad Saad. | Current route (`app/(llms)/llms-full.txt/route.ts`) generates a **Projects**-based file (title, `shortDescription`, link, tech, period, impact) from `config/projects.ts` — completely different, correct content. | **Production is serving the wrong file.** Any LLM fetching this URL today gets someone else's open-source UI library instead of a portfolio, which is actively harmful (wrong entity, wasted context, hallucination risk that "Ahmad Saad wrote a Book/Game-of-Life component library"). |
| `/me/about.md` | Correct, current content (real description, name, location, social links). | Matches. | OK. |
| `/me/experience.md` | Correct company/title/dates for all 6 positions, but **zero descriptions** — every entry is just a two-line header + duration. | Route deliberately strips descriptions: `route.ts` line 13 has the description interpolation **commented out** (`// \nSkills: ...\n\n${position.description?.trim()}`), even though `config/experience.ts` has full multi-paragraph descriptions for every position. | Current-code content gap (not a staleness issue) — trivial one-line fix. |
| `/me/craft.md` | **HTTP 500** on every request, reproduced from 3 continents (CF-RAY colos FRA, HKG, SIN). Response body is a generic Next.js **Pages Router** default error page (`buildId` present) — inconsistent with this being an App Router project, symptomatic of an unhandled runtime exception falling through to a framework default. | `route.ts` calls `getAllPosts()` → `features/craft/data/posts.ts`, which uses `fs.readdirSync`/`fs.readFileSync` against `features/craft/content/` at request time. That directory contains only a `.gitkeep` — no `.mdx` files — and, more importantly, Cloudflare Workers have no real filesystem at runtime; reading arbitrary source-tree files via `node:fs` inside a deployed Worker is not guaranteed to resolve, which is the likely cause of the 500. | **Real bug**, not caching. Breaks the 3rd link that `/llms.txt` itself advertises. |
| `/me/bookmarks.md` | HTTP 404 | No corresponding route exists in the repo at all. | Dead link only referenced by the **stale** cached `/llms.txt` copy — will disappear once that cache fully clears, but should be dropped from the content anyway (see corrected draft below). |
| `/craft/book`, `/craft/game-of-life`, etc. (linked from the stale `/llms.txt`) | HTTP 404 (confirmed) | No such routes exist; these are leftover links to the template's demo component pages. | Template leftovers — remove from any `llms.txt` regeneration. |

**Fix priority for this section:**
1. Redeploy / purge the Cloudflare cache for `/llms.txt` and `/llms-full.txt` immediately (`wrangler` deploy should be followed by an explicit cache purge for these paths — `Cache-Control: max-age=0, must-revalidate` is not reliably preventing stale edge copies from persisting across PoPs post-deploy).
2. Fix `/me/craft.md`'s underlying `getAllPosts()` — either move craft content to a build-time-generated static import (so nothing reads from `fs` at request time in the Workers runtime) or stop advertising `/me/craft.md` in `llms.txt` until it's real and stable.
3. Uncomment the description line in `app/(llms)/me/experience.md/route.ts` (one-line fix, data already exists in `config/experience.ts`).
4. Regenerate `/llms-full.txt`'s Projects section to include `project.description` (the rich multi-paragraph write-up), not just `shortDescription` — currently even the *correct* route only emits the one-liner (see Citability section below).

---

## Citability

**Strengths:**
- The homepage's lead paragraph is a strong, self-contained direct answer inside the first ~50 words: *"I'm Ahmad, a Computer Engineering senior at the American University of Sharjah who ships production systems. My work centers on applied AI: LLM systems with real cost governance, real evaluation, and real stakeholders."* — clear who/what/where, plus availability ("UAE Golden Visa… no employer sponsorship… available January 2027") a few sentences later. This is exactly the kind of extractable answer block AI answer engines quote.
- The Samsung Gulf Electronics role is well chunked: sub-paragraphs like "Two-stage screening…" (~40 words), "Cost governance…" (~45 words), "Full stack ownership…" (~55 words) sit near-optimal citation length, and each carries a specific, sourced statistic (315 automated tests, 16 SQL migrations, an estimated $60K in cost savings, a projected 20% engagement increase).

**Gaps (High severity):**
- **5 of the 6 experience entries have no description anywhere a crawler can reach.** Confirmed by grepping the rendered HTML for description text: `SCADA` (Elmec) and `Rebuilt client workflows` (Chief Nest) return **zero matches** in the fully-JS-rendered `home.html` — the text isn't in the DOM at all, presumably gated behind a click-to-expand interaction, not just CSS-hidden. `config/experience.ts` has real descriptions for Elmec, Chief Nest, ONBRND, and both AUS roles; none of it is citable today, on the page or in `/me/experience.md`.
- **All project long-form descriptions are similarly invisible.** Grepping rendered HTML for unique phrases from `config/projects.ts` (`"Privacy-preserving RAG"` for LocalAI, `"Cycle-accurate simulator"` for the Mano simulator, `"ATMEGA4809"` for the LoRaWAN node, even `"never invent"` from Trend Radar's *own* expanded description) all return **zero matches**. Only the short one-line `shortDescription` + tech chips + impact line render for the carousel's default-expanded card; everything else needs a user interaction the carousel gates behind. And as noted above, `/llms-full.txt`'s current route only emits `shortDescription` too — the detailed descriptions exist in source but are citable **nowhere** on the live surface.
- Headings are declarative ("Experience", "Projects", "Tech Stack"), not question-phrased. Low priority for a personal portfolio (unnatural to force into Q&A form), but a couple of the anchor sections (e.g., "Am I available to work?", "What has Ahmad shipped in production?") could be added as visually-integrated microcopy without hurting the design.

---

## Authority & Brand / Entity Signals

- **The page's only structured data is `{"@type":"Organization","@context":"https://schema.org"}` — completely empty (no `name`, `url`, `sameAs`, `logo`) and the wrong type.** Source: `apps/website/app/page.tsx` lines 39–46. For a single-person portfolio this should be `Person` (optionally nested under a minimal `WebSite`/`ProfilePage`), with `name`, `url`, `jobTitle`, `alumniOf`, and — most importantly for entity disambiguation — a `sameAs` array pointing at the GitHub and LinkedIn profiles. Right now there is **zero machine-readable link** between "ahmadsaad.dev" and "Ahmad Saad" the person, or between this domain and his GitHub/LinkedIn accounts. This is close to the highest-leverage single fix available: `sameAs` is the primary mechanism knowledge-graph-style entity resolution uses, and it costs a few lines of code.
- **Brand mention correlation signals** (YouTube ~0.737, Reddit, Wikipedia — the strongest predictors of AI citation per the correlation table): none detected. No YouTube presence, no Reddit presence, no Wikipedia entity. Expected for a student/early-career portfolio, not something to over-invest in, but worth naming since it's the largest single lever this report can't fix with code — it needs the person to actually publish somewhere (e.g., a short YouTube walkthrough of the Trend Radar project would plausibly do more for AI-citation odds than any on-page change here).
- Name consistency across surfaces is good but not perfect: GitHub handle `ahm-adsaad`, LinkedIn slug `ahmaddsaad` — both clearly resolve to "Ahmad Saad" but the string forms differ (hyphen vs. double letter). Not a real problem, just note it if a `sameAs`/Person schema is added so the display `name` field stays exactly "Ahmad Saad" everywhere.
- Author/publisher metadata exists in `lib/seo/metadata.tsx` (`authors: [{ name: 'Ahmad Saad', url: '...' }]`, `creator`, `publisher`) but has no structured-data counterpart — it's meta-tag-only, not reinforced by JSON-LD.
- No canonical tag, and 4 live duplicate URL variants (`http://`, `https://`, apex, `www.` — all return 200 with identical content, no redirect, no canonical). This dilutes whatever authority signal accrues to the domain across four separate URL identities instead of consolidating it onto one.

---

## Technical Accessibility

- **Positive:** the page is genuinely SSR/prerendered — `is_spa: false`, a plain UA fetch returns the full 344KB HTML with all core text present, no JS execution required to read the "Me" content. This is the correct foundation and the reason AI Overviews/Googlebot/Bingbot/Perplexity can already read the base page fine.
- **Negative:** the AI-specific endpoints are the least reliable part of the stack (see llms.txt section above) — ironic, since they exist specifically to be more machine-friendly than the HTML, and today they're less reliable than the HTML.
- `Disallow: /_next/` in the Next.js-managed robots group blocks JS/CSS/font assets for all crawlers (see crawler matrix note above).
- No canonical + 4 duplicate host/protocol variants (apex/www/http/https all 200).
- `sitemap.xml` has exactly one URL with `lastmod = dayjs()` at build time — it changes on *every* deploy regardless of whether content changed, which weakens it as a freshness signal (a crawler that trusts `lastmod` will think the page changes constantly, which is the same as it never being a useful signal at all).
- No `Strict-Transport-Security`, `X-Content-Type-Options`, `Content-Security-Policy`, or `Referrer-Policy` headers on the HTML response — not a direct AI-citation factor, but several AI-search crawlers (and increasingly, trust-scoring layers in answer engines) use baseline security hygiene as a weak trust signal.

---

## Platform-Specific Estimate (heuristic — no DataForSEO / live rank-tracking available)

No `DataForSEO` MCP tools or Google API credentials were available in this environment, so these are **structural estimates** based on crawler access + citability findings, not measured SERP/answer-engine appearances.

| Platform | Est. score /100 | Rationale |
|---|---|---|
| Google AI Overviews | 55 | Googlebot fully allowed and gets full prerendered HTML; `Google-Extended` block doesn't affect AIO eligibility. Held back by thin/inaccessible sub-content and empty structured data. |
| ChatGPT (OAI-SearchBot / ChatGPT-User) | 45 | Live retrieval allowed, but `/llms.txt`/`/llms-full.txt` — the files most likely to be preferentially fetched by an LLM-aware crawler — are the broken ones. |
| Perplexity | 48 | PerplexityBot fully allowed; same content-depth ceiling as above. |
| Bing Copilot | 50 | Bingbot fully allowed, same ceiling. |

---

## Top 5 Highest-Impact Fixes

1. **CRITICAL | Fix or purge the stale/broken `/llms-full.txt` and `/me/craft.md`.** Evidence: `/llms-full.txt` serves 71.5KB of unrelated UI-component source code on every PoP tested; `/me/craft.md` returns HTTP 500 from 3 continents. Effort: **Low** — `/llms-full.txt` likely just needs a redeploy + cache purge (the repo's route already generates correct content); `/me/craft.md` needs the `fs`-at-runtime bug fixed or the link temporarily removed from `llms.txt`.
2. **HIGH | Replace the empty `Organization` JSON-LD with a real `Person` schema including `sameAs`.** Evidence: `app/page.tsx:39-46` emits `{"@type":"Organization","@context":"https://schema.org"}` with no other properties. Effort: **Low** — a ~15-line change, data already exists in `config/user.ts`.
3. **HIGH | Surface the 5 missing experience descriptions and 4 missing project descriptions in crawlable form.** Evidence: grep of rendered HTML for `SCADA`, `Rebuilt client workflows`, `Privacy-preserving RAG`, `ATMEGA4809`, and even Trend Radar's own `never invent` passage all return 0 matches — this content exists in `config/experience.ts`/`config/projects.ts` but is unreachable without a UI interaction. Effort: **Medium** — render descriptions into the initial DOM (can stay visually collapsed via CSS) rather than gating them behind client-only state; separately, uncomment the description line in `app/(llms)/me/experience.md/route.ts` and add `project.description` to the `llms-full.txt` route.
4. **MEDIUM | Add a canonical tag and redirect apex/www/http duplicates to one canonical URL.** Evidence: `http://`, `https://`, `ahmadsaad.dev`, and `www.ahmadsaad.dev` all return 200 with identical content, no redirect, no `<link rel="canonical">`. Effort: **Low** — one Cloudflare redirect rule + a `metadataBase`/canonical addition.
5. **MEDIUM | Stabilize the `llms.txt` publish pipeline so a deploy can't leave stale edge-cached copies of these specific endpoints.** Evidence: `/llms.txt` was observed serving pre-rewrite content on `CF-Cache-Status: HIT` at SIN/HKG PoPs before self-correcting mid-audit. Effort: **Low** — add an explicit Cloudflare cache-purge step (by URL or cache-tag) for `/llms.txt`, `/llms-full.txt`, and `/me/*.md` to the deploy pipeline.

---

## Corrected `llms.txt` Draft

Built from the real, currently-deployed source of truth (`config/user.ts`, `config/experience.ts`, `config/projects.ts`), dropping the template-leftover Craft/Components/Examples section and the dead Bookmarks link, and holding back the Craft link until `/me/craft.md` actually works:

```
# Ahmad Saad

> Computer Engineering senior at the American University of Sharjah shipping production AI systems: LLM pipelines with real cost governance, evaluation, and stakeholders. Forward deployed engineer: technical enough to build the system, comfortable enough to scope it. UAE Golden Visa holder, available January 2027.

## Me

- [About](https://ahmadsaad.dev/me/about.md): Who I am, where I'm based, and how to reach me.
- [Experience](https://ahmadsaad.dev/me/experience.md): Career highlights and key roles, with full descriptions.
- [Projects](https://ahmadsaad.dev/me/projects.md): Selected projects with technical detail and measured impact.

## Social

- [github](https://github.com/ahm-adsaad)
- [linkedin](https://www.linkedin.com/in/ahmaddsaad)

## Optional

- [Resume (PDF)](https://ahmadsaad.dev/Ahmad_Saad_CV.pdf): Full CV.
- [Repository](https://github.com/ahm-adsaad/portfolio): Source code for this site.
- [Sitemap](https://ahmadsaad.dev/sitemap.xml): Indexable pages.
```

Notes on the draft:
- Adds a `Projects` link (currently missing from `/llms.txt` entirely — projects only surface via `/llms-full.txt`, which is both stale in production and, even once fixed, only carries `shortDescription`). Recommend a new `/me/projects.md` route mirroring the `experience.md` pattern, or simply fix `llms-full.txt` to include full `description` text and keep referencing that from `llms.txt`.
- Drops `Craft` and `Bookmarks` until `/me/craft.md` stops 500ing and has real content — an `llms.txt` that links to a 500 and a 404 actively costs trust with any agent that checks link health.
- Keeps the social block to only populated links (`twitter`/`bluesky` are empty strings in `config/user.ts` and are already correctly filtered out by the existing route logic).

---

## Files Reviewed

- `C:\Users\ahmad\Desktop\GitHubRepos\portfolio\apps\website\app\robots.ts`
- `C:\Users\ahmad\Desktop\GitHubRepos\portfolio\apps\website\app\sitemap.ts`
- `C:\Users\ahmad\Desktop\GitHubRepos\portfolio\apps\website\app\page.tsx`
- `C:\Users\ahmad\Desktop\GitHubRepos\portfolio\apps\website\app\(llms)\llms.txt\route.ts`
- `C:\Users\ahmad\Desktop\GitHubRepos\portfolio\apps\website\app\(llms)\llms-full.txt\route.ts`
- `C:\Users\ahmad\Desktop\GitHubRepos\portfolio\apps\website\app\(llms)\me\about.md\route.ts`
- `C:\Users\ahmad\Desktop\GitHubRepos\portfolio\apps\website\app\(llms)\me\experience.md\route.ts`
- `C:\Users\ahmad\Desktop\GitHubRepos\portfolio\apps\website\app\(llms)\me\craft.md\route.ts`
- `C:\Users\ahmad\Desktop\GitHubRepos\portfolio\apps\website\features\craft\data\posts.ts`
- `C:\Users\ahmad\Desktop\GitHubRepos\portfolio\apps\website\lib\seo\json-ld.tsx`
- `C:\Users\ahmad\Desktop\GitHubRepos\portfolio\apps\website\lib\seo\metadata.tsx`
- `C:\Users\ahmad\Desktop\GitHubRepos\portfolio\apps\website\config\user.ts`
- `C:\Users\ahmad\Desktop\GitHubRepos\portfolio\apps\website\config\experience.ts`
- `C:\Users\ahmad\Desktop\GitHubRepos\portfolio\apps\website\config\projects.ts`
- `C:\Users\ahmad\Desktop\GitHubRepos\portfolio\apps\website\wrangler.jsonc`
- `C:\Users\ahmad\AppData\Local\Temp\claude\C--Users-ahmad-Desktop-GitHubRepos-portfolio\a67f535a-6403-41fe-b0e8-a71d30cb55a9\scratchpad\home.html`
- `C:\Users\ahmad\AppData\Local\Temp\claude\C--Users-ahmad-Desktop-GitHubRepos-portfolio\a67f535a-6403-41fe-b0e8-a71d30cb55a9\scratchpad\home-body.txt`
