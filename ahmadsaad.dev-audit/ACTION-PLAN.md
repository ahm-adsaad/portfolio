# Action Plan — ahmadsaad.dev (2026-08-24)

Ordered as a dependency graph, not a checklist. Each item carries: **Why** (first-principle observation), **Depends on / unblocks**, **Failed if** (falsification check), **Watch** (leading indicator you can read without re-running the audit). File paths are relative to `apps/website/`.

---

## Phase 1 — Get indexed correctly (Week 1, ~half a day total)

### 1.1 One canonical URL — `https://ahmadsaad.dev` · **Critical**
- **Do:** Cloudflare dashboard → SSL/TLS → Edge Certificates → *Always Use HTTPS* ON; Rules → Redirect Rules → `(http.host eq "www.ahmadsaad.dev")` → 301 to `https://ahmadsaad.dev` + original path. (Alternative: host/scheme redirect in `middleware.ts`.) Then in code: `lib/server-url.ts` → return the constant `ahmadsaad.dev` instead of the request host; `lib/seo/metadata.tsx` → `metadataBase: new URL(productionUrl)` (drop the `${protocol}://` prefix — today it yields `https://https//ahmadsaad.dev/`); add `alternates: { canonical: '/' }` to `createMetadata`'s defaults.
- **Why:** four 200-status variants of one page dilute the very first crawl; `www`'s sitemap/robots currently self-describe as `www`.
- **Depends on:** nothing. **Unblocks:** 1.3, 1.4, every schema `url`/`@id`.
- **Failed if:** `curl -sI http://ahmadsaad.dev/` or `https://www.ahmadsaad.dev/` returns anything but a 301 to the apex; or the rendered `<link rel="canonical">` is not exactly `https://ahmadsaad.dev/`.
- **Watch:** Search Console → Pages → "Duplicate without user-selected canonical" stays at 0.

### 1.2 Stop blocking `/_next/` · **High**
- **Do:** `app/robots.ts` → `disallow: ['/api/', '/admin']` (drop `/_next/` and `/public/`, which isn't a real URL prefix). Keep the Cloudflare-managed AI-training block — it is already the right policy for a portfolio.
- **Why:** both `User-agent: *` groups merge, so Googlebot can't fetch CSS/JS/fonts → degraded rendering and mobile-friendliness evaluation.
- **Failed if:** Search Console URL Inspection → *Tested page* → "Page resources" lists blocked `/_next/static/*` files.
- **Watch:** URL Inspection screenshot matches the real page.

### 1.3 Real `Person` schema · **Critical**
- **Do:** apply findings/schema.md §5b (widen `JsonLd` prop type to `WithContext<Thing> | Graph`) and §5c (replace the `jsonLd` object in `app/page.tsx` with the `Person` + `WebSite` + `ProfilePage` graph; `sameAs` = GitHub + LinkedIn; `alumniOf` = AUS; decide `worksFor` — Samsung ended 08.2026, Chief Nest / AUS AI Hub are current).
- **Why:** an empty `Organization` tells Google nothing; a populated `Person` with `sameAs` is the main lever against the common-name / saadahmad.dev collision.
- **Depends on:** 1.1 (absolute `url`/`@id`s). **Unblocks:** 3.2 (reciprocal links), GEO entity signals.
- **Failed if:** Rich Results Test / validator.schema.org shows errors, or `Person.sameAs` is missing either profile.
- **Watch:** the "Ahmad Saad" SERP starts showing the site with GitHub/LinkedIn alongside it (weeks).

### 1.4 Search Console + honest sitemap · **High**
- **Do:** verify a *Domain* property for `ahmadsaad.dev` (DNS TXT in Cloudflare), submit `https://ahmadsaad.dev/sitemap.xml`, request indexing for `/`. In `app/sitemap.ts` replace `dayjs().toISOString()` with a constant you bump when content changes (code in findings/sitemap.md). Skip IndexNow.
- **Why:** the site is hours old — this is how it gets discovered; a `lastmod` that changes every request is a signal Google may ignore.
- **Depends on:** 1.1. **Failed if:** GSC shows the URL as "Discovered – currently not indexed" after 2 weeks with no crawl.
- **Watch:** GSC Pages → Indexed = 1; Performance → impressions for "ahmad saad" queries > 0.

### 1.5 Meta description ≤ 160 chars · **High**
- **Do:** add a separate `USER.metaDescription` (rewrite proposed in findings/content.md, ~150 chars, keep "Golden Visa" + "available January 2027") and use it in `generateMetadata`; keep the long form for `/me/about.md`.
- **Failed if:** the SERP snippet truncates mid-sentence. **Watch:** GSC CTR on branded queries.

---

## Phase 2 — Make the proof of work crawlable, and fix what's broken (Weeks 2–3)

### 2.1 Put the hidden content in the DOM · **Critical**
- **Do:** experiences — render `CollapsibleContent` with `forceMount` and hide with CSS (`data-[state=closed]:hidden`), or render the description text server-side in a visually-hidden block; carousel — render every slide's caption (title, description, tech, impact) in the markup, visually hidden when inactive. Port the four missing role descriptions from `portfolio-context.md` into `config/experience.ts` if not already there.
- **Why:** grep of the rendered HTML for any non-Samsung role text or any non-Trend-Radar project caption = 0 matches; crawlers and AI agents see titles + dates only.
- **Depends on:** nothing. **Unblocks:** 2.2 (experience.md), 3.1, all citability work.
- **Failed if:** `curl https://ahmadsaad.dev/ | grep -c "SCADA"` (or any Elmec/ONBRND/LocalAI phrase) is still 0.
- **Watch:** GSC impressions for project/company-specific queries (e.g. "TikTok trend intelligence Samsung").

### 2.2 Repair the AI-facing endpoints · **Critical**
- **Do:** (a) delete `buildLlmsFiles()` from `scripts/build-registry.mts` (it writes template `public/llms.txt` + `public/llms-full.txt` that shadow the route handlers); (b) in `app/(llms)/me/experience.md/route.ts` restore the description/skills interpolation; (c) either delete `app/(llms)/me/craft.md` (it 500s — `getAllPosts()` reads MDX with `fs` at runtime on Workers) or make it truly static; (d) drop the `Craft`/`Bookmarks` links from `llms.txt`, add a `Projects` endpoint, adopt the draft in findings/geo.md; (e) purge Cloudflare cache for `/llms.txt`, `/llms-full.txt`, `/me/*` after deploy.
- **Failed if:** `/llms.txt` still contains `craft/`, `/me/craft.md` still returns 500, or `/me/experience.md` is < 300 words.
- **Watch:** ask ChatGPT / Perplexity / Claude "who is Ahmad Saad, AUS?" monthly and note whether the answer cites ahmadsaad.dev.

### 2.3 Security headers · **High**
- **Do:** `next.config.mjs` `headers()` (or `public/_headers` for the assets binding): `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `X-Frame-Options: DENY` (or CSP `frame-ancestors 'none'`). Consider a full CSP once the inline theme script is nonce'd. Enable HSTS in Cloudflare too.
- **Failed if:** `curl -sI https://ahmadsaad.dev/` lacks any of the above. **Watch:** securityheaders.com grade ≥ A.

### 2.4 Performance: un-gate the LCP text; fix the origin; trim the critical path · **Critical**
- **Do (in this order):**
  1. **Main thread** — profile `224-b51a9b702c283363.js` (174 KB, one ~7 s throttled task) in DevTools; move the heavy client-only components (motion-driven carousel, shooting-stars canvas, GitHub contribution graph, dock) behind `next/dynamic(..., { ssr: false })` so the prerendered intro paints before they hydrate; tighten `browserslist` to drop ~12 KB of legacy polyfills.
  2. **Hero** — render the H1/intro visible by default and animate only non-LCP decoration (or animate opacity 0.6→1, `motion-safe:` only).
  3. **Origin** — find out why HTML is `x-nextjs-cache: MISS` on every request (OpenNext cache/ISR config on Cloudflare); target TTFB < 0.8 s.
  4. **Images** — `next/image` (or `<picture>` + WebP) with `width/height`, `sizes`, `priority` only on the active slide, `loading="lazy"` elsewhere; remove the 5 eager `<link rel=preload as=image>`; reserve the carousel's aspect ratio (desktop CLS 0.097 comes from it).
  5. **Requests** — remove the `/_vercel/insights` and `/_vercel/speed-insights` scripts (wrong platform); render the Umami `<Script>` only when `NEXT_PUBLIC_UMAMI_WEBSITE_ID` is set; defer the Cloudflare Insights beacon; add `preconnect` for any remaining third-party origin; keep ≤ 2 font preloads (drop the `.otf` if not above the fold); `Cache-Control: public, max-age=31536000, immutable` for `/_next/static/:path*`.
- **Why:** 7/7 lab runs show the LCP is the intro *text*, waiting on hydration + animation, not on images — so image work alone will not move LCP.
- **Depends on:** nothing (parallel with 2.1). **Failed if:** Lighthouse mobile (4× throttle) LCP > 2.5 s or TBT > 600 ms after the change; desktop CLS > 0.05.
- **Watch:** once traffic exists, CrUX / PageSpeed field LCP p75; until then, a monthly `claude-seo run lcp_subparts.py`.

### 2.5 Accessibility names, tap targets, carousel controls · **Medium**
- **Do:** `aria-label` on the 5 company-logo links (`"Samsung Gulf Electronics website"` …), the CV dock icon (`"Download CV (PDF)"`), the home/GitHub/mailto dock icons; ≥ 24×24 px targets (pronounce button, inline links); visible prev/next buttons + keyboard support on the carousel; fix the `og:image:width/height` (1600×836) mismatch while in `createMetadata`.
- **Failed if:** Lighthouse "Links do not have a discernible name" still lists any link. **Watch:** none needed — one-off.

---

## Phase 3 — Content depth & authority (Month 2)

### 3.1 Speak to the #1 audience and surface LocalAI · **Medium**
- **Do:** one sentence in the hero or skills block that names product/roadmap/stakeholder work (technical-PM framing — zero occurrences today); give LocalAI a description line + "Try the live demo" CTA; either make `trend-radar` public before linking it or relabel the link ("case study coming"); resolve whether `github.com/ahm-adsaad/LocalAI` exists (404 today); revisit `isCurrentEmployer` (Samsung ended 08.2026).
- **Failed if:** grep of visible text for "product" is still 0. **Watch:** recruiter replies mentioning the demo.

### 3.2 Owned-profile links (reciprocal with `sameAs`) · **Medium**
- **Do:** GitHub profile → Website = `https://ahmadsaad.dev`; set `homepage` on `trend-radar`, `manos-basic-computer-simulator`, `portfolio`; LinkedIn → Contact info → Website; Tau Beta Pi / IEEE SSCS AUS chapter pages if self-serve. Skip Scholar/ORCID/Dev.to until there is content for them.
- **Depends on:** 1.3. **Failed if:** GitHub API `blog` still empty. **Watch:** GSC Links report → top linking sites.

### 3.3 Two earned-mention pieces · **Low**
- **Do:** a write-up on Trend Radar's "measurement decides, LLMs describe" architecture (Show HN / r/MachineLearning) and one on LocalAI's on-device RAG (WebGPU/RAG curated lists); author bio + canonical link back to the site. Mentions matter more than links for AI citation.
- **Watch:** brand-mention search for "ahmadsaad.dev" monthly.

---

## Phase 4 — Monitor (ongoing)
- Capture a drift baseline now: `/seo drift baseline https://ahmadsaad.dev`, then `/seo drift compare` after each deploy.
- Weekly: GSC Pages (indexed = 1, no duplicates), Performance (branded impressions/CTR), Enhancements (no schema errors).
- Monthly: AI-assistant citation spot-check (2.2), lab CWV re-run, `isCurrentEmployer`/dates freshness.
- Re-run `/seo audit` after Phases 1–2 ship; target Health Score ≥ 75.

## Parallelization
Can run simultaneously: {1.1, 1.2, 1.5}, {2.1, 2.3, 2.4, 2.5}. Must be sequential: 1.1 → 1.3 → 3.2; 1.1 → 1.4; 2.1 → 2.2(b).
