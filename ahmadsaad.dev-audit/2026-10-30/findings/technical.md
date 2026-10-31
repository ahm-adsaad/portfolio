# Technical SEO findings: https://ahmadsaad.dev (audit date 2026-10-30)

## 1. Score

**Technical SEO score: 86 / 100.** Crawl, index, canonical, sitemap and security fundamentals are clean on all 7 pages; points are lost for an edge policy that blocks several AI crawlers by enforcement while robots.txt only asks, a latent one-year HTML cache lifetime, three over-long titles with three thin descriptions, and small hygiene items.

Category status: Crawlability PASS, Indexability PASS, Security PASS, URL structure PASS, Mobile PASS, Core Web Vitals (source inspection) PASS with notes, Structured data PASS (detected: Person, ProfilePage, AboutPage, BreadcrumbList, SoftwareSourceCode; deep validation belongs to the schema specialist), JS rendering PASS (SSR, one client bailout), IndexNow not applicable (no key file; optional).

Tooling note: the local curl and Git curl builds have no HTTP/2 support, so negotiated version showed as HTTP/1.1. HTTP/3 is advertised (`alt-svc: h3=":443"; ma=86400`) on every response, and Cloudflare serves h2/h3 to real browsers by default. Not independently confirmed as a negotiated h2/h3 session.

## 2. What works

- All 7 pages return 200 with a self-referencing canonical, og:url equal to canonical, `lang="en"`, `width=device-width, initial-scale=1`, exactly one `<h1>`, no meta robots (indexable by default) and no X-Robots-Tag.
- Googlebot and bingbot are fully allowed (verified with a robots parser, below). `/_next/` is not blocked, so CSS/JS render resources are fetchable.
- Sitemap is valid XML, 7 `<loc>` entries matching exactly the 7 pages, `lastmod` in `YYYY-MM-DD`, 6 `image:loc` entries all 200 `image/jpeg`. Sitemap line in robots.txt matches `https://ahmadsaad.dev/sitemap.xml`. No missing or extra URLs.
- Real 404s: `/nonexistent` and `/projects/portfolio` return 404 with `<meta name="robots" content="noindex">`, `Cache-Control: private, no-cache, no-store`, 16.9 KB raw (about 4 KB gzip).
- Compression: gzip and brotli both served (`Content-Encoding: br` when requested). Home HTML is 129 KB raw, 19.9 KB gzip.
- `/_next/static/*` returns `Cache-Control: public, max-age=31536000, immutable` (CSS and JS checked).
- Headshot on /about: `<picture>` with WebP source set (320w, 640w) and fallback `<img src="/ahmad-saad.jpg" alt="Ahmad Saad" width="160" height="160">`. Alt and dimensions present, no CLS risk.
- Project card images have descriptive alt, `width="640" height="640"`, `loading="lazy"`. The hero poster has `fetchPriority="high"` plus a `<link rel="preload" as="image">`.
- No horizontal overflow at 390 px or 1280 px on / and /about (scrollWidth equals clientWidth). The only elements wider than the viewport are the clipped marquee track.
- Repo and live behaviour agree (section 3, finding 11): robots.ts, sitemap.ts, middleware.ts, next.config.mjs and public/_headers explain what is served.
- Previously verified by the coordinator (cited, not re-derived): http and www 301 to https apex; HSTS preload, nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options DENY, CSP frame-ancestors none.

## 3. Findings

### 1. Cloudflare enforces a 403 on some AI crawler UAs while robots.txt only advises (Medium)

**Evidence.** `curl -s -o /dev/null -w '%{http_code} %{size_download}' -A "<UA>" https://ahmadsaad.dev/`

| User agent | Status |
|---|---|
| GPTBot/1.1, ClaudeBot/1.0, anthropic-ai, Claude-Web, CCBot/2.0, Bytespider, Amazonbot/0.1 | **403** (25 bytes) |
| Applebot-Extended, meta-externalagent/1.1, Diffbot, GoogleOther, Google-Extended | 200 (129,501 bytes raw) |
| Applebot/0.1, DuckDuckBot/1.1, Yandex, facebookexternalhit/1.1, LinkedInBot/1.0, Twitterbot/1.0, Slackbot-LinkExpanding, curl/8.0 | 200 |
| OAI-SearchBot, ChatGPT-User (coordinator), Claude-User/1.0, Claude-SearchBot/1.0, Perplexity-User/1.0, PerplexityBot, Googlebot/2.1, bingbot/2.0 | 200 (also 200 on /llms.txt) |

Also: `curl -A GPTBot https://ahmadsaad.dev/` (bare token, no version) returned 200, while `Mozilla/5.0 (compatible; GPTBot/1.1; +https://openai.com/gptbot)` returned 403 on both `/` and `/llms.txt`. The block matches on specific UA signatures, not on the robots token.

**Root cause.** Two separate layers, both configured in the Cloudflare dashboard, not in the repo:
- Advisory: robots.txt, begins with the "BEGIN Cloudflare Managed content" block (Content-Signal `search=yes,ai-train=no,use=reference`, `User-agent: *` Allow, then per-bot `Disallow: /` for Amazonbot, Applebot-Extended, Bytespider, CCBot, ClaudeBot, Diffbot, Google-Extended, GPTBot, anthropic-ai, Claude-Web, meta-externalagent, GoogleOther, Google-CloudVertexBot and others). Cloudflare prepends this to the repo's own robots.ts output at the edge ("Managed robots.txt" toggle). It is a request, honored only by well-behaved crawlers.
- Enforcement: the 403s. Likely Cloudflare Security > Bots > "Block AI bots" (AI Scrapers and Crawlers), or AI Crawl Control block rules, or a WAF custom rule. It blocks only a subset of the bots listed in robots.txt (Diffbot, GoogleOther, meta-externalagent and Applebot-Extended still get 200), so the two layers do not match.

**Practical effect.** Google (Googlebot, search) and Bing are unaffected. Training crawlers are refused, which matches `ai-train=no`. Retrieval and answer bots (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User) can fetch pages and the /llms.txt and /me/*.md endpoints, which supports the goal of being cited. Risk: anything that relies on GPTBot or ClaudeBot fetching (some assistants fall back to the training crawler's index) cannot see the site; and the "Google-Extended" and "Applebot-Extended" Disallow lines mean Gemini and Apple Intelligence training/grounding opt-out, which does not affect Google Search ranking.

**Fix (Owner action, decision needed).** Decide whether the intent is "no training, yes retrieval". If yes, nothing breaks today. If the goal is maximum assistant visibility, in Cloudflare dashboard open Security > Bots (or AI Crawl Control) and switch "Block AI bots" to "Allow" for GPTBot and ClaudeBot, and in the same area turn off "Managed robots.txt" or edit it so the block and the robots.txt agree. Either way keep both layers consistent so the policy is predictable.

### 2. HTML Cache-Control s-maxage is one year (Medium, latent)

**Evidence.** `curl -I https://ahmadsaad.dev/about` returns `Cache-Control: s-maxage=31536000, stale-while-revalidate=2592000`, `x-opennext-cache: HIT`, `x-nextjs-prerender: 1`, no `CF-Cache-Status`, no `Age`, no `ETag`, no `Last-Modified`. `/sitemap.xml` is `public, max-age=0, must-revalidate`; `/llms.txt` and `/me/*.md` share the one-year s-maxage.

**Root cause and interaction.** Next emits `s-maxage=31536000` for static prerenders. In this setup (apps/website/open-next.config.ts: `staticAssetsIncrementalCache` plus `enableCacheInterception`) the prerendered HTML ships inside the Workers static assets of each deployment, so a new `opennextjs-cloudflare deploy` replaces it atomically and the `x-opennext-cache: HIT` layer cannot go stale. The absence of `CF-Cache-Status` shows Cloudflare is not caching HTML at its edge today (Worker responses are not cached by default), and browsers ignore `s-maxage`. So users do not currently get year-old pages. The risk is latent: if anyone adds a Cloudflare Cache Rule ("Cache Everything"), enables Tiered Cache for HTML, or puts another CDN in front, the edge would hold HTML for a year and survive deploys. Also, search engines and AI crawlers sometimes honor shared-cache hints through intermediary proxies.

**Fix.** Two options, pick one:
- Repo (preferred, low effort): in apps/website/next.config.mjs `headers()`, add a rule after the security rule that overrides HTML responses: `{ source: '/((?!_next/static|_next/image).*)', headers: [{ key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' }] }`. If OpenNext's static-assets interception still sets its own value, instead set it in public/_headers for `/*` (only affects static assets) and verify with `curl -I` after deploy. Note the existing constraint in open-next.config.ts about ISR intervals: do not use `export const revalidate` to achieve this; use headers only.
- Owner action: add a post-deploy purge in the deploy script (apps/website package.json `deploy`): after `opennextjs-cloudflare deploy`, call `POST /zones/<zone_id>/purge_cache {"purge_everything":true}` using a scoped API token (Cache Purge permission). Dashboard path to verify there is no HTML cache rule: Caching > Cache Rules.

### 3. Three project titles exceed 60 characters (Medium)

**Evidence** (title length including suffix):
- /projects/mano-computer-simulator: 72 chars, "Mano Basic Computer Simulator: Cycle-Accurate CPU in Python | Ahmad Saad"
- /projects/lorawan-sensor-node: 77 chars, "Energy Harvesting LoRaWAN Sensor Node: Custom 2-Layer PCB Design | Ahmad Saad"
- /projects/trend-radar: 59 chars (ok). Others: / 35, /about 41, /projects 22, /projects/localai 54.

Google truncates around 580 px (about 55-60 chars), cutting the "| Ahmad Saad" suffix, which is the entity signal for name queries. Separator styles are inconsistent (home uses "·", about uses "|", projects use ":" then "|"); the home title is `Ahmad Saad · AI Engineer in the UAE`.

**Root cause.** Page titles are generated from project config in config/projects.ts plus the suffix in lib/seo/metadata.tsx.

**Fix.** Shorten the per-project title field in apps/website/config/projects.ts so title plus " | Ahmad Saad" is at most 60 characters, for example `Mano Computer Simulator in Python | Ahmad Saad` (45) and `LoRaWAN Energy Harvesting Sensor Node | Ahmad Saad` (50). Optionally change the home title separator to " | " for consistency (`Ahmad Saad | AI Engineer in the UAE`). For the name query, consider putting "AUS" in the home or about title, for example `Ahmad Saad | AI Engineer, AUS, UAE` (35).

### 4. Three meta descriptions are under 120 characters (Medium)

**Evidence** (characters): / 150, /about 134, /projects 151, /projects/localai 155 (all fine); /projects/trend-radar **87**, /projects/mano-computer-simulator **95**, /projects/lorawan-sensor-node **97**. These three reuse a one-line summary, e.g. `Production TikTok trend-detection platform where measurement decides and LLMs describe.`

**Fix.** In apps/website/config/projects.ts add or lengthen the description used for metadata to 120-155 chars, keeping the author name and the stack/outcome. Example for trend-radar: `Production trend-detection platform built solo by Ahmad Saad: measured signals decide what is rising and LLMs only describe it for the marketing team.` (about 150).

### 5. Text endpoints carry no X-Robots-Tag (Low, recommendation)

**Evidence.** `curl -I` on /llms.txt, /llms-full.txt, /me/about.md, /me/experience.md, /me/projects.md: `200`, `Content-Type: text/markdown;charset=utf-8`, `Cache-Control: s-maxage=31536000, stale-while-revalidate=2592000`, `X-Content-Type-Options: nosniff`, no `X-Robots-Tag`. Sitemap does not list them (good).

**Recommendation: yes, add `X-Robots-Tag: noindex`.** Reasoning: Google can index text-like files that are linked (home links to /llms.txt from every page), and these files restate the name, role and skills in a dense form that could win a "ahmad saad" snippet or sitelink instead of the HTML page, with no title, no styling and no conversion path. `noindex` removes them from Google and Bing results but does not block fetching: it is an indexing directive, not an access control, and does not affect robots.txt rules or the Cloudflare bot policy, so retrieval bots (OAI-SearchBot, Claude-SearchBot, Perplexity) still read them. Do not use `nofollow` and do not add a robots.txt Disallow for them (a Disallow would block the fetch). Small trade-off: crawlers that build answers from Bing's index will rely on the HTML pages, which are better citation targets anyway.

**Fix.** apps/website/next.config.mjs `headers()`: add `{ source: '/:path(llms.txt|llms-full.txt|me/:file*.md)', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] }`. If the multi-pattern is rejected by path-to-regexp, add three separate rules (`/llms.txt`, `/llms-full.txt`, `/me/:path*`). Alternatively set the header in each route handler Response in apps/website/app/(llms)/**/route.ts. Verify with `curl -I`.

### 6. Internal anchor text for project and About pages is generic (Low)

**Evidence.** Inbound links per page (same-host `<a href>`, counting every occurrence across the 7 pages; "from" lists distinct source pages):

| Target | Links | From pages |
|---|---|---|
| / | 14 | all 7 |
| /about | 30 | all 7 |
| /projects | 31 | all 7 |
| /projects/trend-radar | 3 | /, /projects, /projects/localai |
| /projects/localai | 4 | /, /projects, trend-radar, mano |
| /projects/mano-computer-simulator | 4 | /, /projects, localai, lorawan |
| /projects/lorawan-sensor-node | 3 | /, /projects, mano |
| /llms.txt | 7 | all 7 |
| /Ahmad_Saad_CV.pdf | 2 | / only |

No orphans and no page with fewer than 2 inbound links (minimum is 3). The header and footer link to Home, About and Projects (and footer to llms.txt and source); project pages are reached from /, /projects and previous/next links, not from the header (acceptable).

Anchor text to /about: "About" (21), "Ahmad Saad" (4), "About Ahmad Saad" (4), "More about me" (1). To project pages: "Read the case study" (2 each) plus "NextLocalAI", "PreviousTrend Radar" style prev/next labels (1 each). Nothing links to /about from the project cards with descriptive text, and /about links only to /projects (not directly to individual projects).

**Fix.** apps/website project card component: change the visible or aria anchor "Read the case study" to include the project name (`Read the Trend Radar case study`), keeping the same visual label via a visually hidden span. On /about, add a short "Selected work" sentence linking directly to the four project pages with their names. Add one more link to the CV from /about.

### 7. Rendering: one client-only block (Low)

**Evidence.** `claude-seo run render_page.py` on / and /about: `is_spa: false`, `render_engine` Playwright, no console errors, summary fields only (the script prints truncated content, so a Playwright diff was run separately at 390 px). Raw HTML text contains the full page except the GitHub contribution graph: the raw HTML for / contains `BAILOUT_TO_CLIENT_SIDE_RENDERING` and the graph data inside the RSC payload, while the rendered DOM adds the month labels (Nov to Oct), the legend (Less/More) and the heading `1511 CONTRIBUTIONS IN THE LAST YEAR`. /about renders no JS-only content beyond whitespace and entity differences. All other differences were CSS `text-transform: uppercase` and typographic characters, not real content. Hero name, `<h1 id="hero-name">`, experience, projects, education, skills all exist in the initial HTML.

**Impact.** The graph is decorative; the 1,511 contributions figure is not available to crawlers that do not execute JS. No ranking relevance.

**Fix (optional).** In the contribution graph component under apps/website, add a `<noscript>` or server-rendered sentence such as `1,511 GitHub contributions in the last year.` if the count should be indexable. Otherwise leave as is.

### 8. Sitemap lastmod is stale relative to content (Low)

**Evidence.** `CONTENT_LAST_MODIFIED = '2026-10-21'` in apps/website/app/sitemap.ts. `git log -3 --format="%h %ad %s" --date=short -- apps/website/config` returns `9af87a1 2026-10-30`, `5fe9dfc 2026-10-30` (both edit config/education.ts: Claude Certified Architect credential, visible on / and /about), `54001cb 2026-10-21`.

**Fix.** Set `CONTENT_LAST_MODIFIED = '2026-10-30'` in apps/website/app/sitemap.ts in the next commit. Per the file comment, bump by hand with each visible content change; consider a small test or a git-derived value in the build script to stop drift.

### 9. og:image is a 2 MB Cloudinary PNG built per page (Low)

**Evidence.** `og:image` is `https://res.cloudinary.com/bucha/image/upload/w_1600,h_836,q_100/l_text:Karla_72_bold:...` on all 7 pages: 200 `image/png`, 2,004,860 bytes. It is a third-party account (`bucha`) generating text overlays on a gradient, used for og and twitter cards.

**Root cause.** lib/seo/metadata.tsx builds the Cloudinary URL with `q_100` (no compression).

**Fix.** In apps/website/lib/seo/metadata.tsx change `q_100` to `q_auto,f_jpg` (or `q_80`) to bring the image under 300 KB so LinkedIn, WhatsApp and Slack previews reliably render it. Longer term, host one static 1200x630 `og-default.png` in apps/website/public (fully under owner control) so link previews do not depend on a third-party account. `og:image:width/height` should then be updated to 1200 and 630.

### 10. Manifest and icon hygiene (Low)

**Evidence.** manifest.json is valid JSON: `name: "Ahmad Saad"`, `short_name: "Ahmad"`, `theme_color` and `background_color` `#f0ede7`, `display: standalone`, two icons (`/web-app-manifest-192x192.png` and `-512x512.png`, both 200, `purpose: "maskable"` only). Page `<meta name="theme-color" content="#0E0C14">` and `color-scheme: dark` conflict with the manifest's light `#f0ede7`. Manifest is served with `Cache-Control: public, immutable, no-transform, max-age=31536000` at a non-hashed URL, so a future change would be invisible to returning browsers for a year. Favicon (`/favicon.ico` 200), `/icon.svg` 200, `apple-icon.png` 180x180 200 are present. `/icon.png` and `/apple-touch-icon.png` return 404 (not referenced, fine). `apps/website/app/android-chrome-512x512.png` is unreferenced.

**Fix.** In apps/website/app/manifest.json set `theme_color` and `background_color` to `#0E0C14`, and add `"purpose": "any"` as a second entry for each icon (a maskable-only icon can render with unwanted padding). Because the manifest is a static metadata file, immutable caching is Next's default for hashed files; to avoid a year-long stale manifest, convert it to apps/website/app/manifest.ts (served `Cache-Control: public, max-age=0, must-revalidate` by default). Remove the unused android-chrome-512x512.png if confirmed unreferenced.

### 11. Repo consistency check (Low drift items)

**Confirmed to explain live behaviour.** app/robots.ts (`* allow /`, `disallow /api/ /admin`, Sitemap from SITE_URL, static); lib/server-url.ts (hardcoded `https://ahmadsaad.dev`, so canonical/sitemap/robots cannot echo a request host); middleware.ts (www and plain http 301 to apex, matcher excludes `_next/static` and `_next/image`); next.config.mjs `securityHeaders` and `/_next/static/(.*)` immutable rule; public/_headers repeats the six security headers for assets served directly by Workers Static Assets plus `/_next/static/*` immutable. All five security headers and CSP appear on HTML and assets, so no header is set in one place and missing in the other today.

**Drift and nits.**
- `Disallow: /admin` has no trailing slash, so it also matches any path starting with `/admin` (no such routes exist). Harmless; no change needed.
- apps/website/next.config.mjs still lists `'FID'` in `experimental.webVitalsAttribution` (FID is retired; INP is the interactivity metric). Remove `'FID'`.
- `images.remotePatterns` has about 12 unused third-party hosts (ruixen, shadcnagents, simplifyingai, etc.) left over from the template. Prune to `res.cloudinary.com` (and `avatars.githubusercontent.com` if used) to reduce attack surface.
- public/projects/portfolio.jpg is a placeholder (comment at config/projects.ts line 248: "Placeholder cover; overwrite ... with a real screenshot"). It is served live (200, 56,801 bytes) and appears on / and /projects as the "ahmadsaad.dev" project card and in the home-page JSON-LD as `#project-portfolio`. The card does not link anywhere. No internal links to `/projects/portfolio` exist anywhere in apps/website (grep found only the image path in config/projects.ts), and the live 404 is correct. Replace the placeholder cover with a real screenshot, or drop the card if it is not meant to be public.
- Static assets that are not hashed (`/about/drive-poster.webp`, `/projects/*.jpg`, `/ahmad-saad.*`, CV PDF) are served `public, max-age=0, must-revalidate` with an ETag. That is safe but forces a conditional request on every view. Optional: in public/_headers add `/about/*`, `/projects/*` and `/*.webp` with `Cache-Control: public, max-age=86400, stale-while-revalidate=604800`.

## 4. Top 5 fixes (impact over effort)

1. **Shorten the two over-long project titles and extend the three short descriptions** (Findings 3 and 4). Config-only edit in config/projects.ts, protects the "| Ahmad Saad" entity suffix in SERPs. Effort: minutes.
2. **Add `X-Robots-Tag: noindex` to /llms.txt, /llms-full.txt and /me/*.md** (Finding 5). One rule in next.config.mjs `headers()`; keeps these files from competing with the HTML pages for the name query while staying fetchable by AI retrieval bots. Effort: minutes.
3. **Cap HTML shared-cache life** (Finding 2): `s-maxage=3600, stale-while-revalidate=86400` via `headers()`, or add a deploy-time purge; verify no Cloudflare Cache Rule caches HTML. Removes a latent year-long stale-page risk. Effort: low.
4. **Align the Cloudflare AI-bot policy with intent** (Finding 1, Owner action): Security > Bots / AI Crawl Control and the Managed robots.txt toggle. Decide on training versus retrieval and make robots.txt and the 403 enforcement match. Effort: low, but needs a decision.
5. **Fix og:image weight and sitemap lastmod together** (Findings 9 and 8): change `q_100` to `q_auto,f_jpg` in lib/seo/metadata.tsx and set `CONTENT_LAST_MODIFIED = '2026-10-30'` in app/sitemap.ts. Effort: minutes.
