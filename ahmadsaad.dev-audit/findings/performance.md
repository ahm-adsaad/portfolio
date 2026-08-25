# Performance / Core Web Vitals -- https://ahmadsaad.dev

**All numbers on this page are LAB data.** No Google API key is configured in this environment, so PSI Lighthouse-via-API, CrUX field data, and `lcp_subparts.py` (CrUX) all failed outright -- see "Failed measurements" below. INP has no lab equivalent; **Total Blocking Time (TBT)** is used as the INP proxy throughout, per standard Lighthouse-lab practice. FID is never referenced (deprecated).

## Score: 51 / 100 (Needs Improvement, leaning Poor on mobile)

Composite = 0.7 x mobile Lighthouse Performance category (avg of two runs: 34, 65 -> 49.5) + 0.3 x desktop Lighthouse Performance category (55) = **51.15 -> 51**. Mobile is weighted higher because Google's CWV assessment and CrUX are phone-dominant. The wide 34-65 spread between the two mobile runs is itself a finding (see F1) -- treat 51 as directional, not a precise score.

| View | Tool / run | Performance score |
|---|---|---|
| Mobile (Moto G Power emulation, 4x CPU throttle, Lighthouse default) | Lighthouse 13.4.1 run 1 | 34 / 100 |
| Mobile (same profile) | Lighthouse 13.4.1 run 2 | 65 / 100 |
| Desktop (Lighthouse `--preset=desktop`, no throttle) | Lighthouse 13.4.1 | 55 / 100 |

## Methodology

- **Lighthouse 13.4.1** (via `npx lighthouse`, HeadlessChrome/151), performance category only, run against the live production URL, 3 total runs: 2x mobile default emulation (390x844, 4x CPU throttle -- Lighthouse's Dec-2024-increased mobile throttle), 1x desktop preset (1350x940, no throttle). Raw JSON preserved at `C:/Users/ahmad/AppData/Local/Temp/claude/C--Users-ahmad-Desktop-GitHubRepos-portfolio/a67f535a-6403-41fe-b0e8-a71d30cb55a9/scratchpad/lh/lh-mobile.json`, `lh-mobile-run2.json`, `lh-desktop.json`.
- **Auxiliary Playwright measurement** (pre-existing, produced by the orchestrator's own script, read directly rather than re-run by me): `C:/Users/ahmad/Desktop/GitHubRepos/portfolio/ahmadsaad.dev-audit/lab-vitals.json` -- 4 runs via PerformanceObserver/Navigation Timing, no CPU throttle: desktop-1440 (light+dark) and mobile-390 (light+dark), 4s settle. This is unthrottled-CPU-at-viewport-width, i.e. closer to a high-end phone than average CrUX mobile hardware -- used here to cross-check the Lighthouse numbers and to confirm the LCP element identity.
- **`claude-seo run preload_check.py`** -- succeeded, lab DOM/header inspection, no CrUX dependency.
- **`claude-seo run lcp_subparts.py`** (CrUX) and **`claude-seo run pagespeed_check.py`** (PSI + CrUX) -- both **failed**, see below. LCP subparts in this report instead come from Lighthouse's `lcp-breakdown-insight` (lab, not CrUX; only reports TTFB + element-render-delay for a text LCP element -- resource-load-delay/time are N/A because the LCP element is not an image, see F3).

### Failed measurements (explicit)

| Command | Result |
|---|---|
| `claude-seo run lcp_subparts.py https://ahmadsaad.dev --form-factor PHONE --json` | `Error: Google API key not configured.` |
| `claude-seo run lcp_subparts.py https://ahmadsaad.dev --form-factor DESKTOP --json` | `Error: Google API key not configured.` |
| `claude-seo run pagespeed_check.py https://ahmadsaad.dev --strategy mobile --json` | `PSI rate limit exceeded (240 QPM / 25,000 QPD). Wait and retry.` |
| `claude-seo run pagespeed_check.py https://ahmadsaad.dev --strategy mobile --psi-only --json` | same rate-limit error (retried once) |
| `claude-seo run pagespeed_check.py https://ahmadsaad.dev --strategy desktop --psi-only --json` | same rate-limit error (retried once, not persisted further) |

No PageSpeed Insights or CrUX field data (28-day real-user percentiles) could be obtained in this environment. **Everything below is lab data; real-world 75th-percentile pass/fail cannot be directly confirmed.**

## Core Web Vitals -- LAB metrics table

| Metric | Mobile LH run 1 (4x throttle) | Mobile LH run 2 (4x throttle) | Desktop LH (no throttle) | PW desktop-1440 (light/dark) | PW mobile-390 (light/dark) | Good threshold |
|---|---|---|---|---|---|---|
| TTFB | 1617 ms | 1188 ms | 1431 ms | 1922 / 1174 ms | 1349 / 1606 ms | <=800 ms |
| FCP | 1638 ms | 2195 ms | 968 ms | 2476 / 1664 ms | 1712 / 2024 ms | -- |
| **LCP** | **13,389 ms (Poor)** | **5,961 ms (Poor)** | **1,357 ms (Good)** | 2488 / 1692 ms (Good) | 3096 / 3176 ms (Needs Improvement) | <=2500 ms |
| **TBT (INP proxy)** | **6631 ms** | 321 ms | **1913 ms** | n/a (not captured) | n/a (not captured) | <=200 ms* |
| **CLS** | 0.069 (Good) | 0.069 (Good) | **0.106 (Needs Improvement)** | 0.077 / 0.079 (Good, borderline) | **0 / 0** | <=0.1 |
| Total transfer | 973 KB / 44 req | -- | 992 KB / 43 req | 953 KB / 39 req | 953 KB / 39 req | -- |

\*TBT good threshold is a lab heuristic (<=200 ms roughly maps to good INP), not an official CWV threshold -- INP itself is field-only.

**LCP element identity -- confirmed identical across all 7 independent measurements**: a `<p>` text node (the intro bio paragraph on mobile viewports, the expanded role-description paragraph on the wider desktop preset), **never one of the 5 project images**. See F3.

## Findings

**CRITICAL | Unstable, JS-blocked LCP: one oversized synchronous JS chunk drives TBT to 1.9-6.6s and LCP as high as 13.4s on throttled mobile | Evidence:** Lighthouse `long-tasks` shows a single main-thread task inside `/_next/static/chunks/224-b51a9b702c283363.js` (47 KB gzip / 174 KB raw) blocking for **7028 ms** in mobile run 1, 427+227 ms in run 2, and **2123 ms even on unthrottled desktop** -- this scales almost exactly with Lighthouse's 4x mobile CPU multiplier, confirming it's real synchronous work, not a throttling artifact. `lcp-breakdown-insight` attributes 8813 ms (run 1) / 1650 ms (run 2) of "element render delay" to the LCP paragraph -- i.e., the browser has the text ready to paint but the main thread is busy running this chunk. `legacy-javascript-insight` also flags ~12 KB of unnecessary `Array.prototype.at/flat/flatMap` polyfills inside this same chunk. Production source maps aren't available to identify the exact module, but the dossier's known facts (animated shooting-stars canvas, motion/animation library, drag carousel, GitHub contribution graph SVG with 368 child nodes) are the most likely contributors. **Fix:** (1) profile in DevTools Performance panel (bottom-up view) against the live site to name the exact culprit; (2) code-split it with `next/dynamic(() => import(...), { ssr: false })` and mount after `requestIdleCallback`/`useEffect` rather than in the critical hydration path; (3) tighten `next.config`/browserslist target to drop the unneeded array-method polyfills; (4) never gate the initial LCP paragraph's opacity/reveal animation behind this chunk -- let text paint immediately, animate in a way that doesn't delay first paint (e.g., CSS `@starting-style` or a class toggle that doesn't block).

**CRITICAL | Server response (TTFB) fails the LCP-subpart target on 7 of 7 measured runs | Evidence:** TTFB ranged **1066-1921 ms** across every single run (Lighthouse root-document `server-response-time` audit: 1066 ms mobile / 990 ms desktop; full navigation TTFB metric: 1188-1617 ms Lighthouse, 1174-1922 ms Playwright) -- 100% failure against the <800 ms CrUX LCP-subpart target, and this is *before* any client-side JS runs. `network-rtt` shows 0 ms RTT to `ahmadsaad.dev` (i.e., Cloudflare's edge is close/fast) while `network-server-latency` attributes 436 ms of "server response time" to the origin -- so this is compute time in the Worker/OpenNext SSR path, not network distance. **Fix:** confirm the OpenNext Cloudflare adapter is actually serving the prerendered static HTML from cache/KV rather than re-invoking the SSR render function per request (the response already carries `x-nextjs-prerender: 1`, so the content is static -- the ~1-1.9s should not be needed to serve a build-time-static page); check for synchronous data fetches or cold Worker starts; consider Cloudflare Cache Reserve or an explicit Cache API `put`/`match` for the HTML route.

**CRITICAL | 5 preloaded project JPEGs (400 KB, ~41% of page weight) are not the LCP element and are 30x+ oversized for their display size | Evidence:** `image-delivery-insight` (mobile): `trend-radar.jpg` delivered at 1080x1080 but displayed at 259x259 -> 85.9 KB wasted of 91.1 KB; `localai.jpg` delivered at 1024x1024, displayed 259x259 -> 81.9 KB wasted of 87.5 KB; total est. savings **347 KB**. All 5 are `<link rel=preload as=image>` (confirmed by `preload_check.py`: 13 preload hints, `fetchpriority_high: 0`) yet the confirmed LCP element in every run is a text `<p>`, not an image -- the preloads compete for bandwidth/HTTP priority against the document, render-blocking CSS, and fonts that actually gate LCP, for zero LCP benefit. **Fix:** remove `preload` from all 5 carousel images (or keep it only on the first slide if/when a redesign makes an image the true LCP candidate -- current data says it isn't); migrate all 5 `<img>` to `next/image` with `sizes` matching the rendered carousel-slide width (~259px) and let Next.js generate a responsive `srcset`/AVIF-WebP; add explicit `width`/`height`; `loading="lazy"` + no `priority` on slides 2-5, since the carousel already sits below the fold at typical viewport heights.

**HIGH | CLS is inconsistent across runs, failing "Good" in the worst case (0.106 desktop) | Evidence:** Lighthouse `cls-culprits-insight` -- desktop: PROJECTS carousel `<section>` shift scores **0.097** of the total 0.106 (i.e., 92% of the desktop shift is the unsized image carousel, corroborating F3); mobile: an Experience "Electro-Mechanical Company LLC" `data-state="closed"` collapsible shifts (score 0.062) plus a web-font swap under the Samsung entry (`bb3ef058b751a6ad-s.p.woff2`, score 0.0076) despite 4 fonts already being preloaded. The Playwright cross-check (`lab-vitals.json`) recorded CLS **0** on both mobile-390 runs but **0.077-0.079** on both desktop-1440 runs (shift nodes are unlabeled `DIV`s at t=~1.6-2.4s, consistent with post-hydration layout settling) -- CLS is present in 4 of 6 total independent runs and is race-condition-prone, tied to the same hydration-timing instability as F1. **Fix:** reserve space for collapsible/accordion panels (min-height or CSS grid-rows animation instead of true height:auto reflow); give the project-carousel container a fixed aspect-ratio/min-height so it doesn't reflow as images/JS finish; verify `font-display: swap` + a size-matched fallback font (`size-adjust`/`ascent-override`) to shrink the font-swap shift under Samsung.

**HIGH | No preconnect anywhere; render-blocking CSS delays first paint | Evidence:** `network-dependency-tree-insight`: "no origins were preconnected"; it estimates preconnecting to `static.cloudflareinsights.com` (Cloudflare Web Analytics beacon, on the critical dependency chain, 3102 ms navStart-to-end) would save **~659 ms of LCP**. `render-blocking-insight`: 3 blocking stylesheets (main one 23.2-23.3 KB) cost ~150 ms before first paint. **Fix:** add `<link rel="preconnect" href="https://static.cloudflareinsights.com">` (or load the beacon `defer`/after the `load` event since it's non-critical); inline critical above-the-fold CSS and defer the rest, or split the 23 KB bundle so only intro-section styles block.

**MEDIUM | Three dead analytics requests fire on every single page load | Evidence:** Lighthouse `network-requests` shows 404s on **all three** runs for `/stats/script.js` (Umami -- matches dossier), and two previously-unrecorded ones: `/_vercel/insights/script.js` and `/_vercel/speed-insights/script.js` (Vercel Analytics/Speed Insights scripts, despite the site being hosted on Cloudflare Workers, not Vercel). **Fix:** remove the Vercel Analytics/Speed Insights `<script>`/component injections entirely (wrong platform), and gate the Umami tag behind `if (process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID)` until that env var is actually set in the Cloudflare Workers deployment.

**MEDIUM | Unnecessary legacy JS polyfills bundled | Evidence:** `legacy-javascript-insight` flags ~11.8 KB of `Array.prototype.at`/`flat`/`flatMap` polyfills inside chunk 224 -- unnecessary for the evergreen-browser audience this portfolio targets. **Fix:** tighten the Next.js/browserslist target (drop legacy/IE-era transpilation) to shrink this chunk further, compounding the F1 fix.

**LOW | Static asset caching not fully re-verified at header level this pass; Lighthouse's cache audit only flagged the Cloudflare beacon (4.6 KB wasted) | Evidence:** `cache-insight` shows the only under-cached resource is `static.cloudflareinsights.com/beacon.min.js` (cache TTL only 86,400,000 ms/1 day; 4.6 KB wasted on repeat views) -- the `_next/static/*` JS/font/CSS chunks were **not** flagged as under-cached by this audit, which is a milder picture than the dossier's header-level note (`Cache-Control: public, max-age=0, must-revalidate` on the CSS chunk). Since Lighthouse's cache audit and a raw response-header check can disagree (the audit only measures observed repeat-view savings within a single run, not the literal header value), **this needs a direct header check** (`curl -I` on a hashed `/_next/static/...` URL) to confirm/refute the dossier's claim before prioritizing a fix. **Fix (if confirmed):** add a Cloudflare cache rule forcing `Cache-Control: public, max-age=31536000, immutable` on `/_next/static/*` (hashed filenames make this safe), and separately raise the beacon's effective cache lifetime if self-hosting or proxying it isn't an option.

## Prioritized recommendation summary (expected impact)

1. **Split/defer chunk 224 and stop gating the LCP paragraph's paint behind it** -- highest expected impact; this single change plausibly moves mobile LCP from Poor (6-13s) toward the 2-3s the unthrottled Playwright runs already show, and directly cuts TBT (INP proxy) from 1.9-6.6s toward the sub-500ms desktop-class numbers.
2. **Investigate/fix Worker TTFB (1.0-1.9s)** -- every millisecond here is added directly to LCP regardless of client-side fixes; confirm the prerendered HTML is actually being served from cache, not re-rendered per request.
3. **Drop `preload` from the 5 project images, move to `next/image` with correct `sizes`** -- recovers ~347 KB of transfer with zero LCP downside (confirmed the images aren't the LCP element) and removes the priority contention with the resources that do gate LCP.
4. **Reserve layout space for the Experience accordions and the project carousel** -- removes the CLS regressions seen in 4 of 6 runs.
5. **Add preconnect for the Cloudflare Insights beacon origin, trim/inline the 23 KB render-blocking CSS** -- ~150-660 ms of LCP.
6. **Remove the two Vercel Analytics/Speed Insights dead requests (wrong platform) and gate Umami on its env var.**
7. **Confirm and fix `_next/static/*` cache headers via a Cloudflare cache rule (immutable, 1-year max-age)** -- pending the header-level re-check noted in the LOW finding.

## Sources / raw data

- `C:/Users/ahmad/AppData/Local/Temp/claude/C--Users-ahmad-Desktop-GitHubRepos-portfolio/a67f535a-6403-41fe-b0e8-a71d30cb55a9/scratchpad/lh/lh-mobile.json`
- `C:/Users/ahmad/AppData/Local/Temp/claude/C--Users-ahmad-Desktop-GitHubRepos-portfolio/a67f535a-6403-41fe-b0e8-a71d30cb55a9/scratchpad/lh/lh-mobile-run2.json`
- `C:/Users/ahmad/AppData/Local/Temp/claude/C--Users-ahmad-Desktop-GitHubRepos-portfolio/a67f535a-6403-41fe-b0e8-a71d30cb55a9/scratchpad/lh/lh-desktop.json`
- `C:/Users/ahmad/Desktop/GitHubRepos/portfolio/ahmadsaad.dev-audit/lab-vitals.json` (auxiliary Playwright measurement, orchestrator-produced)
