# Performance findings, ahmadsaad.dev, 2026-10-31

Raw data: findings/lab-vitals.json (3 runs x 3 pages x mobile/desktop, with resource and profiler data for run 1), findings/lab-vitals-no-cf-scripts.json (same on / with Cloudflare cdn-cgi and insights scripts blocked).

Method: Playwright Chromium, cold cache, 5 s settle. Mobile = Pixel 5 emulation, 4x CPU throttle, 150 ms RTT, 1.6 Mbps down (Lighthouse mobile equivalent). Desktop = 1350x940, no throttle, real network from this machine (Frankfurt edge). TBT = sum of (long task - 50 ms) for tasks after FCP, over a 5 s window. TBT is the INP proxy; no field INP was collected. No CrUX/PSI field data was pulled this round.

Score: estimated 76/100 mobile (yesterday 74). This is an estimate from the metrics below, not a Lighthouse-computed score. If the two Cloudflare scripts (section 3) are removed the estimate is about 88.

## 1. Medians of 3 runs

| Page | Device | LCP | FCP | TTFB | TBT | CLS |
|---|---|---|---|---|---|---|
| / | mobile | 2248 ms (runs 2248, 2660, 2192) | 2248 | 423 | 1538 | 0 |
| /about | mobile | 2064 (1964, 2064, 2392) | 2064 | 512 | 1554 | 0 |
| /projects/trend-radar | mobile | 1896 (2184, 1896, 1860) | 1896 | 540 | 1209 | 0 |
| / | desktop | 1108 (1340, 944, 1108) | 1108 | 590 | 58 | 0.001 |
| /about | desktop | 1012 | 1012 | 528 | 132 | 0.001 |
| /projects/trend-radar | desktop | 844 | 844 | 435 | 57 | 0.001 |

Status: CLS passes everywhere. Desktop passes everywhere. Mobile LCP median passes on all three pages (under 2.5 s) but one run on / hit 2.66 s, so the margin is thin. Mobile TBT fails (target 200 ms, measured 1.2 to 1.55 s on this harsh profile; yesterday's 900 ms was measured on a different harness, so do not read this as a regression).

LCP element:
- /: text, span.rise-name "Ahmad" (hero h1). No image or font request in its chain. FCP equals LCP.
- /about: mobile = ahmad-saad.webp (19 KB, discovered and loaded at about 1.5 s); desktop = about/drive-poster.webp (63 KB, 1920x1080).
- /projects/trend-radar: projects/trend-radar.webp (16.8 KB), loaded about 1.6 s on mobile.

## 2. Fonts and the LCP chain on /

- The three preloaded woff2 files (3b9a2d35..., 81982458..., ae05c57c...) all return 200, content-type font/woff2, cache-control public, max-age=31536000, immutable, cf-cache-status HIT. Sizes 18.5, 19.6, 30.1 KB.
- No console warnings after a 5 s settle, so no "preloaded but not used" warnings. They are used.
- Mobile font downloads finish at 1.19 to 1.47 s; first paint is at 2.25 s. The LCP text does not wait on fonts any more. A fourth font (125b055e..., 23 KB) is not preloaded and loads at 1.7 s, after the others; it is not on the LCP path.
- The real gate on first paint is main-thread script execution: the first long task is 619 ms starting at 1.54 s (ends about 2.15 s), which matches FCP/LCP at 2.2 to 2.3 s. CSS was ready at 1.38 s. Blocking the Cloudflare scripts did not change LCP (2248 to 2328 ms), so the paint delay is React and Next runtime evaluation under 4x CPU, not the third-party scripts.
- Bandwidth contention: the hero poster is preloaded with fetchpriority=high (about/drive-poster.webp, 63 KB, done at 1.6 s) on a page whose LCP is text. It shares the 1.6 Mbps link with CSS, fonts and the framework chunks.

## 3. Hydration long task and attribution (mobile, run 1, CDP sampling profile, self time)

Long tasks after FCP, in ms: 619 @1.54 s, 70, 601 @2.58 s, 888 @3.26 s, then four of 52 to 125.

Script self time over the 5 s window (ms, 4x throttled):
- cdn-cgi/challenge-platform/scripts/jsd/main.js: 808 (Cloudflare JS Detections, injected by the edge, not in the repo)
- chunks/135c3189 (react-dom, 173 KB raw): 702
- chunks/493 (Next client runtime/router, 173 KB raw): 281
- chunks/webpack runtime: 275
- chunks/app/global-error (1 KB file; profile attribution is most likely webpack/module bootstrapping): 193
- static.cloudflareinsights.com/beacon.min.js (Cloudflare Web Analytics, auto-injected): 99
- chunks/901 (lazy contribution graph, 49 KB raw): 89
- 310 (contribution graph loader): 29; app/page 11; app/layout 9; 401 14; 327 8.

Experiment: with /cdn-cgi/* and the insights beacon blocked, mobile TBT on / drops from 1538 to 615 ms median (580, 615, 687). So about 0.9 s of the TBT, and the 888 ms task at 3.3 s, comes from the Cloudflare jsd script. Desktop TBT 58 to 27 ms.

Important: the components named in the brief are not in the / bundle. app/layout.tsx and app/page.tsx import only Grain, Reveal, ScrollProgress, SiteNav (nav-hide, nav-links, mobile-menu), SiteFooter, and the home sections. There is no command menu (cmdk is in package.json but unused on /), no vaul drawer, no motion library chunk, no shooting stars and no coverflow carousel in the downloaded JS. The contribution graph is already next/dynamic (lazy-graph.tsx) and loads at about 4.8 s, after LCP. The first-party app code (page 2.1 KB, layout 3.6 KB gz) is negligible; the cost is the React 19 + Next 15.5 runtime itself.

Top 5 largest first-party JS chunks on / (transfer size, from the network log; fonts and CSS excluded from JS ranking):
1. chunks/135c3189-7749ebca5435a60b.js 56.1 KB (react-dom)
2. chunks/493-814d4b9f3428b5ce.js 46.6 KB (Next client)
3. chunks/901.8a25dbf02a40cde8.js 15.3 KB (lazy contribution graph, loads at 4.8 s)
4. chunks/327-d06f9dc85f21aa8f.js 7.5 KB
5. chunks/app/layout-621d240667687942.js 3.9 KB
Total JS about 146 KB gzip. CSS c54461d5... 22.2 KB.

## 4. Recommendations (smallest set, ranked)

1. Cloudflare dashboard, Security > Bots: turn off JavaScript Detections (the jsd script), and Analytics > Web Analytics: turn off automatic beacon injection (or accept the 99 ms). Expected: mobile TBT -0.9 s (1538 to about 615 ms measured). Risk: weaker bot scoring on JS-less signal; low for a static portfolio. File: none (dashboard). Then remove the two preconnect/dns-prefetch lines for static.cloudflareinsights.com in apps/website/app/layout.tsx (lines 89 to 90) if the beacon is off; saves a wasted connection.
2. Drop fetchpriority=high on the hero poster preload on / (it is not the LCP element there) or make it a plain preload / low priority. Expected: 100 to 300 ms less contention in the throttled window, LCP run-to-run variance down (the 2.66 s run). Risk: poster appears slightly later; it is not LCP. Untested this round. Files: apps/website/components/hero-video.tsx (react-dom preload call) and app/page.tsx if the preload is emitted there.
3. Preload or inline the fourth font (125b055e..., 23 KB, loads at 1.7 s) only if it is used above the fold; otherwise leave. Expected: avoids a late font swap; no LCP change. Risk: more bytes on the critical link, so net negative unless it is visible in the first viewport. File: app/layout.tsx. Low priority.
4. next/dynamic ssr:false for command menu and drawer, LazyMotion, idle shooting stars, idle contribution graph, fewer eager carousel images: expected gain approximately 0 ms on /, because none of those are in the / bundle (the graph is already lazy, mobile-menu is a tiny client component). Do not spend time here. If mobile-menu.tsx (imports only next/link and React) were made dynamic it would save under 2 KB.
5. Residual floor of about 600 ms TBT is React DOM + Next runtime evaluation. React 19.1 and Next 15.5.23 are already in use, so there is no further free upgrade win. To get under 200 ms TBT on this profile would need a framework change (static HTML with no hydration for sections, or reducing client components in layout: Grain, Reveal, ScrollProgress, SiteNav, SiteFooter each hydrate). Expected from trimming layout client components: 50 to 150 ms. Risk: moderate. File: apps/website/app/layout.tsx. Realistic outcome: TBT about 500 ms mobile lab after step 1; under 200 ms is not reachable without large changes. Field INP is likely fine because desktop TBT is under 60 ms and tasks after load are under 130 ms.

## 5. Image delivery

- Hero headshot on /: ahmad-saad-320.webp, 7.7 KB, width/height 56x56, loading eager, no srcset (served image is 320 px for a 56 px slot; fine, could be 112 px for roughly 5 KB saving, negligible). /about uses ahmad-saad.webp, 19.3 KB, no srcset.
- Project covers: webp sizes localai 35.8 KB, lorawan 37.7 KB, mano 50.4 KB, portfolio 26 KB, trend-radar 16.8 KB; 320 px variants 10.6 to 19.5 KB. On / the carousel images are width/height 640x640, loading lazy (not fetched at load), and the small avatars 120x120 lazy.
- Nothing over 150 KB in public/ images. Largest are about/drive-poster.webp 62.7 KB (1920x1080) and the CV pdf 362 KB (not page-loaded).
- Every img inspected on / has width and height attributes; CLS 0 to 0.001 confirms it. None use srcset or sizes (plain img elements); acceptable given the small files.
- Video: about/drive-720.mp4 (570 KB) is fetched on / at about 4.9 s on mobile, after LCP. It does not affect LCP but uses bandwidth; consider preload=none on mobile or Save-Data. File: components/hero-video.tsx.

## 6. Share image

og:image is a Cloudinary-composed JPEG, 1600x836, 148,752 bytes (under 300 KB), content-type image/jpeg, cache-control private, no-transform, max-age=2592000. Passes. Note Cloudinary labels it private, which only affects shared caches; crawlers fetch it fine.

## 7. Third-party requests on /

Only ahmadsaad.dev and static.cloudflareinsights.com. Specifically:
- static.cloudflareinsights.com/beacon.min.js (Cloudflare Web Analytics, auto-injected), plus its /cdn-cgi/rum POST.
- ahmadsaad.dev/cdn-cgi/challenge-platform/scripts/jsd/main.js (Cloudflare JS Detections, first-party origin path but a Cloudflare script).
No Google Fonts, no analytics vendor, no ads. Umami is only emitted when NEXT_PUBLIC_UMAMI_WEBSITE_ID is set and is not present. Fonts are self-hosted.

## 8. Cache headers

- /_next/static/* (chunks, css, fonts): public, max-age=31536000, immutable. Good.
- Public media (/ahmad-saad*, /about/*, /projects/*, /credentials/*, manifest icons): public, max-age=604800, stale-while-revalidate=86400 per public/_headers (confirmed in repo; the poster and mp4 are under /about/*).
- HTML: cache-control s-maxage=31536000, stale-while-revalidate=2592000 with x-opennext-cache HIT; no browser max-age, so browsers revalidate each visit (fine). TTFB from here 420 to 760 ms desktop; the mobile figure includes the 150 ms emulated RTT.
- Security headers present (HSTS, nosniff, frame-ancestors none).
