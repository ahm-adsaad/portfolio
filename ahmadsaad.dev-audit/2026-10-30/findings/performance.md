# Performance findings: ahmadsaad.dev (2026-10-30/31)

## 1. Score: 74 / 100
Desktop passes everywhere and field-style weight is low, but mobile home LCP fails (median 2.82 s, 4x CPU + slow 4G lab) and mobile hydration blocks the main thread for 0.8-1.06 s (TBT 800-1000 ms, INP at risk); media under /public is served uncached.

Method: custom Playwright/Chromium script (scratchpad perf/measure.py; the plugin scripts lcp_subparts.py, pagespeed_check.py, render_page.py, unlighthouse_run.py exist but I needed throttling plus resource-level data). Mobile = 412x823, DPR 2.6, 4x CPU, 150 ms RTT, 1.6 Mbps; desktop = 1350x940, 40 ms RTT, 10 Mbps. Cache disabled, 2 runs each, medians below. Raw JSON: `ahmadsaad.dev-audit/2026-10-30/findings/lab-vitals.json`. Lab only (no CrUX pulled); INP cannot be measured without interaction so TBT is the proxy.

## 2. Results (median of 2 runs)

| Page | Device | LCP | LCP element | CLS | TBT | FCP | Transfer | Reqs | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| / | mobile | 2.82 s (3.07 / 2.58) | text span `.rise-name` (hero name) | 0 | ~990 ms | 1.80 s | 1.01 MB | 24 | LCP FAIL, INP at risk |
| /about | mobile | 2.05 s | text `p.rise.intro-size` | 0 | ~880 ms | 1.83 s | 1.08 MB | 26 | LCP pass (borderline-ish), INP at risk |
| /projects/trend-radar | mobile | 1.65 s | img /projects/trend-radar.webp | 0 | ~800 ms | 1.65 s | 312 KB | 25 | pass, INP at risk |
| / | desktop | 1.20 s | text `.rise-name` | 0.001 | ~40 ms | 0.95 s | 2.00 MB | 29 | PASS |
| /about | desktop | 0.99 s | img /about/drive-poster.webp | 0.001 | ~53 ms | 0.92 s | 2.03 MB | 28 | PASS |
| /projects/trend-radar | desktop | 0.76 s | img trend-radar.webp | 0.001 | ~32 ms | 0.75 s | 312 KB | 25 | PASS |

LCP subparts:
- Mobile /projects/trend-radar: TTFB 436 ms, load delay 73 ms, load time 396 ms, render delay 743 ms.
- Desktop /about (poster): TTFB 391 ms, delay 11, load 294, render 148 ms. Desktop trend-radar: TTFB 452, delay 12, load 220, render 145 ms.
- Text LCPs (home, about, mobile): TTFB ~430-450 ms, then ~1.6-2.6 s of render delay. That delay is the font/hydration gate (finding 1), not network.
- Speed Index not computed (no filmstrip); FCP and LCP above stand in. CLS shifts are 0.0006-0.001 (desktop nav `NAV.hidden md:block` links settling at ~1.1 s), negligible.
- Reduced-motion mobile: video never requested (verified), LCP 2.28 s on home (similar, text-bound).
- Longest tasks mobile: home 940 ms @3.09 s, about 1061 ms @2.5 s, trend-radar 814 ms @2.28 s, i.e. the first task after the framework chunks (135c3189 = react-dom 173 KB decoded, 493 = Next client 174 KB decoded) finish at ~2.2-2.5 s. Attribution is "unknown" (same-origin script); this is React hydration of the root plus layout/nav. Second/third tasks of ~120 ms follow at ~4.6-5.2 s on home (901 chunk = lazy GitHub graph, 49 KB, plus `?_rsc` prefetches).

## 3. What works
- HTML cached at the edge (s-maxage 1 y, HIT), TTFB ~430 ms from the lab location (ok), zstd compression, `/_next/static/*` immutable.
- Hero text is in the server HTML and is NOT held invisible: `.rise` starts at opacity 0.6 and `.rise-name` animates transform only (globals.css ~L698-712, L1232-1250); no opacity-0 gate. Reduced-motion disables the rise.
- Video is well handled: mounted only after hydration via useEffect, skipped for prefers-reduced-motion and saveData, autoplay muted loop playsinline, `poster` set, 720p (570 KB) variant for <768 px and 1080p (1.5 MB) for desktop, paused off-screen via IntersectionObserver, `width`/`height` set, so zero CLS. On mobile the mp4 starts ~4.1-4.9 s, after LCP, so it does not compete with it. Poster preloaded as webp with fetchpriority high.
- Fonts: 4 woff2 files, 92 KB total, subset, self-hosted, immutable. Only third party: Cloudflare Insights beacon (small, async). JS ~125-142 KB transferred (compressed) per page, no large third-party JS. Project cover images are right-sized webp (17-50 KB), lazy below the fold, eager+high priority on the detail page LCP, width/height set. Headshot is 160px webp (19 KB) with 320w variant used by DPR.
- Contribution graph is already `next/dynamic` ssr:false with fallback (lazy-graph.tsx). DOM 1043 on home is fine.

## 4. Findings

### F1. Hero text LCP gated by late-discovered, blocking display fonts (High; mobile / fails)
Evidence: home mobile LCP is the `.rise-name` span at 2.58-3.07 s, 2.2-2.6 s after TTFB. The four woff2 files (`81982458...`, `ae05c57c...`, `125b055e...`, `3b9a2d35...` -s.p.woff2) have initiatorType css and start at ~1.04-1.31 s (after the 22 KB CSS arrives at ~1.0 s) and finish at 1.8-2.3 s. The HTML contains no `<link rel="preload" as="font">` (only the poster image and a webpack script preload). Display face uses `display: 'block'` (lib/fonts.ts), so the h1 stays invisible until the font loads.
Root cause: fonts are only discovered after CSS is downloaded and parsed; the display font blocks text paint.
Fix: in `apps/website/lib/fonts.ts`, set `preload: true` explicitly on all three `localFont` calls and confirm they render preload links (they currently do not appear in the raw HTML, probably because the fonts are only referenced from a layout subtree or `preload` is being suppressed by the font being used in a route-scoped way). If Next will not emit them, add manual links in `app/layout.tsx` `<head>`: `<link rel="preload" href="/_next/static/media/<hash>.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />` for the two display faces (bricolage-display 800 and light, ~19-23 KB). Also change `display: 'block'` to `display: 'swap'` with `adjustFontFallback` (or `optional`) for `fontDisplay` so the name paints at FCP; expected mobile LCP gain 0.7-1.2 s, bringing home to ~1.8-2.1 s.

### F2. Hydration long task of 0.8-1.06 s on mobile; INP at risk (High)
Evidence: TBT 800-990 ms mobile on all three pages; one task of 814-1061 ms starts right as `135c3189-*.js` (173 KB) and `493-*.js` (174 KB) execute (~2.2-3.1 s) under 4x throttle. Desktop is fine (TBT 30-60 ms), so this is a low-end mobile risk; a click during this window would exceed 200 ms INP.
Root cause: whole-page hydration in one task: framework chunks (react-dom + next client ~350 KB decoded) plus root layout client components (nav, mobile menu, command menu, nav-hide, reveal) all hydrate synchronously.
Fix: (a) lazy-load non-critical client islands in `components/` and `features/`: `features/command-menu/components/command-menu.tsx` and `components/mobile-menu.tsx` via `next/dynamic` (load on first interaction / idle); (b) keep `features/cal/components/cal-embed.tsx` dynamic and below the fold; (c) confirm `framer-motion`/`motion` is imported as `motion/react` with `LazyMotion` + `domAnimation` and `m.*` in hero components under `features/home/components/*` to trim the 493/135c chunks; (d) run `ANALYZE=1 next build` (bundle analyzer) to see what is in the layout chunk (`app/layout-*.js` 10 KB, `327-*.js` 21 KB). Target TBT under 300 ms mobile.

### F3. Media under /public has no cache lifetime (Medium)
Evidence: `curl -I` for `/about/drive-1080.mp4` and `/about/drive-poster.webp` returns `Cache-Control: public, max-age=0, must-revalidate`. Every repeat visit revalidates a 570 KB-1.5 MB video, headshot, and project images. `public/_headers` only sets immutable for `/_next/static/*`.
Fix: append to `apps/website/public/_headers` (files are non-hashed, so use a long but not immutable cache, or rename with hashes):
```
/about/*
  Cache-Control: public, max-age=2592000, stale-while-revalidate=86400
/projects/*
  Cache-Control: public, max-age=2592000, stale-while-revalidate=86400
/ahmad-saad*
  Cache-Control: public, max-age=2592000, stale-while-revalidate=86400
/credentials/*
  Cache-Control: public, max-age=2592000
```
Note: `/about/*` also matches the HTML route `/about`? Workers static assets only apply to files; HTML for /about is served by the Worker, but to be safe use `/about/drive-*` explicit globs. Then update `scripts/build-about-video.mts` to emit content-hashed filenames if you want `immutable`.

### F4. Video poster is downloaded twice, and desktop video competes with page load (Medium)
Evidence: both `/about/drive-poster.webp` (63 KB, preloaded img) and `/about/drive-poster.jpg` (81 KB, fetched as the `<video poster>`) load on every visit; the jpg is a redundant 81 KB. On desktop the 1.5 MB `drive-1080.mp4` starts at ~1.2 s, immediately after first paint, with `preload="auto"` (desktop total 2.0 MB vs 312 KB on the detail page). LCP is not harmed (0.8-1.2 s) but it competes with chunk/image loading on constrained links; desktop with slower networks will see it contend with the LCP poster.
Fix in `components/hero-video.tsx`: remove the `poster={poster}` attribute from the `<video>` (the `<picture>` poster underneath already shows through until the first frame; the video is absolutely positioned) or point it at the webp. Change `preload="auto"` to `preload="metadata"` plus `video.play()` on `canplay`, and gate mounting with `requestIdleCallback`/`load` event + 1 s so it starts after LCP on all devices: in the first `useEffect` replace `setEnabled(true)` with `window.addEventListener('load', () => setTimeout(() => setEnabled(true), 800), { once: true })` (clean up on unmount). Optionally lower desktop to a ~900 KB encode in `scripts/build-about-video.mts`.

### F5. Credential badge is a 65 KB PNG shown at 88-120 px (Medium/Low)
Evidence: `/credentials/claude-certified-architect.png` 340x340, 65 KB, rendered at 88x88 (mobile) / 120x120; it is loaded early on /about at ~1.7 s (competing with fonts and the poster on mobile) even though lazy.
Fix: replace with a 240px webp (about 8-12 KB) in `public/credentials/` and update the `<img>` source in the About page (`app/about/page.tsx`) with `width/height` 120 and `loading="lazy"` plus `decoding="async"`. Saves ~55 KB on /about.

### F6. Headshot not prioritized, jpg src with webp via picture (Low)
Evidence: /about headshot `fetchpriority` null, `loading=auto`, LCP on /about is text so impact is small. It is 160x160 CSS px, 19 KB webp (desktop gets the 7.6 KB 320w).
Fix: if you want it painted with the hero, add `fetchPriority="high"` in the About hero image element (`app/about/page.tsx`); otherwise leave it. On mobile the 320w variant is chosen only for DPR<=1; verify `srcset="/ahmad-saad-320.webp 320w, /ahmad-saad.webp 640w"` with `sizes="160px"` so DPR 2.6 devices get the right file (they currently get the larger one, which is correct).

### F7. Post-load RSC prefetches and Cloudflare beacon (Low)
Evidence: `?_rsc=` fetches for `/`, `/about`, `/projects` start at ~3.5-4.1 s on mobile (6-14 KB each) and contribute to the 120 ms tasks at ~4.6-5.2 s. The Cloudflare Insights beacon (`static.cloudflareinsights.com/beacon.min.js`) is the only third party.
Fix: optional; set `prefetch={false}` on low-priority `Link`s in `components/nav-links.tsx`, or keep for snappier navigation. Beacon is fine; disable Web Analytics in Cloudflare if not used.

## 5. Top 5 fixes (impact over effort)
1. Preload display fonts and switch `fontDisplay` to `swap` (`lib/fonts.ts`, `app/layout.tsx`): fixes the only failing CWV (mobile home LCP); about 0.7-1.2 s gain; 15 minutes.
2. Add Cache-Control rules for `/about/drive-*`, `/projects/*`, `/ahmad-saad*`, `/credentials/*` in `public/_headers`: repeat-visit savings of up to 2 MB; 5 minutes.
3. Dynamic-import command menu and mobile menu, and use `LazyMotion`/`m` components: cuts hydration TBT (target below 300 ms mobile) and protects INP; 1-2 hours plus bundle analysis.
4. Defer video mount until after `load` plus delay, drop the redundant jpg `poster` on `<video>`, use `preload="metadata"` (`components/hero-video.tsx`): removes 81 KB and keeps desktop LCP safe on slower networks; 20 minutes.
5. Convert the credential PNG to a small webp (`public/credentials/`): saves ~55 KB on /about; 10 minutes.
