# Verification, runtime, headers and visual (round 2)

**Verdict: APPROVED WITH MINOR NOTES.** Blocking 0, Important 0, Minor 1 (plus 4 notes that are not counted).

Evaluator: fresh runtime evaluator, 2026-10-31. Build under test: `apps/website/.open-next` as built from branch `seo/name-aus-2026-10-31` (HEAD 84e24f3; the only untracked change is the audit folder). It was served with `pnpm exec opennextjs-cloudflare preview --port 8787`, with no rebuild. Wrangler 4.125.0 reported "Parsed 8 valid header rules", so `_headers` is applied locally. Every curl and browser request sent `X-Forwarded-Proto: https`. Browser: Playwright 1.62.0 Chromium (claude-seo venv), device scale factor 1. The preview was stopped afterwards: workerd and all wrangler/opennext node processes were killed, port 8787 is free, and the git tree is unchanged.

## 11.6 Routes, sitemap, headers

| Check | Expected | Actual | Result |
|---|---|---|---|
| GET / | 200 | 200 | PASS |
| GET /about | 200 | 200 | PASS |
| GET /aus | 200 | 200 | PASS |
| GET /cv | 200 | 200 | PASS |
| GET /projects | 200 | 200 | PASS |
| GET /projects/trend-radar | 200 | 200 | PASS |
| GET /projects/localai | 200 | 200 | PASS |
| GET /projects/mano-computer-simulator | 200 | 200 | PASS |
| GET /projects/lorawan-sensor-node | 200 | 200 | PASS |
| GET /nonexistent | 404 | 404 | PASS |
| sitemap.xml `<loc>` count | 9 | 9 | PASS |
| sitemap has /aus and /cv | both | both (`https://ahmadsaad.dev/aus`, `https://ahmadsaad.dev/cv`) | PASS |
| PDF `Link` header | `<https://ahmadsaad.dev/cv>; rel="canonical"` | `<http://localhost:8787/cv>; rel="canonical"` | PASS locally, verify live (see N1) |
| PDF `X-Robots-Tag` count | 0 | 0 | PASS |
| key file body | `b9f504812ee878b00a15106b08a1f9e1` | `b9f504812ee878b00a15106b08a1f9e1` (200, text/plain; charset=utf-8) | PASS |
| /aus `X-Robots-Tag` count | 0 | 0 | PASS |
| /llms.txt `X-Robots-Tag` | noindex | noindex | PASS |
| /me/about.md `X-Robots-Tag` | noindex | noindex | PASS |
| /llms-full.txt, /me/experience.md, /me/projects.md | noindex | noindex on all three | PASS |
| /api/revalidate | 401 or 405 | GET 401, POST 405 | PASS |
| no proto header, GET / | 301 (known quirk) | 301 | as expected |

### Titles and H1 over HTTP (11.1 values, checked on the served HTML)

| Page | Title (chars) | Matches 11.1 | H1 | Canonical |
|---|---|---|---|---|
| / | Ahmad Saad (Ahmad Atef Saad) · AI Engineer · AUS, UAE (53) | yes | Ahmad Saad | https://ahmadsaad.dev |
| /about | About Ahmad Saad (Ahmad Atef Saad) \| AI Engineer, AUS (53) | yes | Ahmad Saad | https://ahmadsaad.dev/about |
| /aus | Ahmad Saad at AUS: Tau Beta Pi, AI Hub and Research (51) | yes | Ahmad Saad at the American University of Sharjah | https://ahmadsaad.dev/aus |
| /cv | Ahmad Saad CV: AI Engineer, Computer Engineering at AUS (55) | yes | Ahmad Saad, CV | https://ahmadsaad.dev/cv |
| /projects | Projects by Ahmad Saad, AUS Computer Engineering (48) | yes | Projects by Ahmad Saad | https://ahmadsaad.dev/projects |
| case studies | 59, 54, 52, 54 chars | yes (unchanged) | project title | self |

Description lengths on the served HTML were 157, 155, 143, 152 and 153, which match 11.1.

## Headers (HEAD requests)

| Path | Content-Type | Cache-Control | X-Robots-Tag | Other |
|---|---|---|---|---|
| / | text/html; charset=utf-8 | s-maxage=31536000, stale-while-revalidate=2592000 | absent | x-nextjs-prerender: 1, x-opennext-cache: HIT, HSTS |
| /about | text/html; charset=utf-8 | same as / | absent | same |
| /aus | text/html; charset=utf-8 | same as / | absent | same |
| /cv | text/html; charset=utf-8 | same as / | absent | same |
| /projects, /projects/localai | text/html; charset=utf-8 | same as / | absent | same |
| /llms.txt, /me/about.md | text/markdown;charset=utf-8 | same as / | noindex | |
| /robots.txt | text/plain; charset=utf-8 | same as / | absent | |
| /.well-known/security.txt | text/plain; charset=utf-8 | public, max-age=0, must-revalidate | absent | static asset |
| /Ahmad_Saad_CV.pdf | application/pdf | public, max-age=0, must-revalidate | absent | Link canonical (host rewritten locally), HSTS, nosniff, XFO DENY, CSP frame-ancestors |
| /b9f504812ee878b00a15106b08a1f9e1.txt | text/plain; charset=utf-8 | public, max-age=0, must-revalidate | absent | |

/aus and /cv are prerendered (x-nextjs-prerender: 1) and served from the OpenNext cache, with the same Cache-Control as every other HTML page. Neither has ISR.

## Links, anchors, headshot (served HTML)

| Check | Result |
|---|---|
| /aus ids: computer-engineering, tau-beta-pi, ai-hub, research, college-of-engineering, aus-news | all 6 present, PASS |
| Header nav on all 9 pages: About, Projects, AUS, CV (plus Email, LinkedIn) | present on all 9, PASS |
| Mobile menu at 390 on /aus and /cv | About, Projects, AUS, CV, Email, LinkedIn all inside the viewport; `aria-current="page"` on the current page, PASS |
| Footer has /aus and /cv | all 9 pages, PASS |
| Headshot alt on / and /about | "Headshot of Ahmad Saad (Ahmad Atef Saad)", image loaded (naturalWidth > 0) on both, PASS |
| `href="/Ahmad_Saad_CV.pdf"` | 0 on index, 1 on /cv only, PASS |
| Broken images after a full scroll | 0 on every page and width tested, PASS |

## Console and network

Collected with Playwright on /, /about, /aus and /cv at 390 and 1440 (and / at 768), after a full scroll so that lazy content and viewport prefetches ran.

| Page | Console errors | Hydration warnings (React 418/423/425 or "hydrat") | Console warnings | First-party responses >= 400 | Failed requests | Third-party hosts |
|---|---|---|---|---|---|---|
| / (390, 768, 1440) | 0 | 0 | 0 | 0 | 0 | none |
| /about (390, 1440) | 0 | 0 | 3 per load, "preloaded but not used" (M1) | 0 | 0 | none |
| /aus (390, 1440) | 0 | 0 | 2 per load (M1) | 0 | 0 | none |
| /cv (390, 1440) | 0 | 0 | 4 per load (M1) | 0 | 0 | none |

The wrangler log for the whole session has 682 responses with 200. The other responses were all ones I triggered on purpose: 404 x2 (/nonexistent), 301 x1 (the no-proto probe), 401 x1 and 405 x1 (/api/revalidate). No font, image, chunk or RSC request returned 404.

## 11.9 Visual (Playwright)

Screenshots are full page, in `ahmadsaad.dev-audit/2026-10-31/screenshots/`: `home-390.png`, `home-768.png`, `home-1440.png`, `about-390.png`, `about-1440.png`, `aus-390.png`, `aus-1440.png`, `cv-390.png`, `cv-1440.png`.

| Check | Expected | Actual | Screenshot | Result |
|---|---|---|---|---|
| / at 390: full-name byline lines | at most 2 | 2 (11px mono, 35px tall) | home-390.png | PASS |
| / at 390: Email, LinkedIn, CV pills in first viewport | fully inside 390x844 | top 741, bottom 785 of 844; right edge 297 of 390 | home-390.png | PASS |
| / at 768: header nav on one line, no overlap with the wordmark | one line | 1 distinct row; 190px gap after the wordmark; no overflow | home-768.png | PASS |
| / at 1440: header nav on one line, no overlap | one line | 1 row; 795px gap; no overflow | home-1440.png | PASS |
| / at 768 and 1440: pills in first viewport | inside | bottom 952 of 1024; bottom 847 of 900 | home-768.png, home-1440.png | PASS |
| LCP on / at 390 | `.rise-name` span | SPAN `block rise-name` ("Ahmad"), 512 ms, the only LCP entry | home-390.png | PASS |
| /aus no horizontal scroll at 390 | scrollWidth <= 390 | 390 | aus-390.png | PASS |
| /cv no horizontal scroll at 390 | scrollWidth <= 390 | 390 | cv-390.png | PASS |
| /aus, /cv, /, /about at 1440 | no horizontal scroll | scrollWidth 1440 on all | *-1440.png | PASS |
| /aus#tau-beta-pi, direct load | heading top >= nav height | 390: heading 236 vs nav 56 (section top 55.5, scroll-margin-top 56px); 1440: heading 284 vs nav 64 | aus-390.png | PASS |
| /aus#tau-beta-pi, in-app link from /about | same | 390: 238 vs 56; 1440: 286 vs 64 | n/a | PASS |
| /about FAQ visible, 8 questions readable | 8 | 8 h3 questions, each followed by a visible answer paragraph; 17px at 390, 18.72px at 1440; contrast from pixels: questions about 16.3:1, answers about 8.6:1 on ink | about-390.png, about-1440.png | PASS |
| /aus quote block renders | renders | 3 blockquotes in #aus-news, all visible, 2px accent left border, 22px at 390 and 34px at 1440, each cited "AUS News, 22 June 2026"; includes "It is not enough for a model to perform well in testing." | aus-390.png, aus-1440.png | PASS |

**Design read (I looked at each screenshot).** /aus and /cv use the same system as /about: an ink hero with breadcrumb, an apricot-green eyebrow and a condensed display H1 (48px at 390, 115.2px at 1440, the same as /about). H2s are 36px at 390 and 72px at 1440 on all three pages. Every section has the "AUS 01 / 06" or "CV 01 / 07" counter rule like /about's "ABOUT 01 / 04". The two-column layout (heading left, body right) holds at 1440 and stacks cleanly at 390. Tones alternate through the body: /aus is ink, bone, ink, bone, ink, bone, ink, bone; /cv is ink, bone, ink, bone, ink, bone, ink, bone. Pills, link underlines, the "Last updated 31 October 2026" stamp and the footer wordmark all match the rest of the site. Nothing is orphaned, overlaps or is cut off. The /cv hero meta line looks tight around the "·" separators, but the HTML has normal spaces (`Emirates · UAE Golden Visa`), so that is just the font's narrow spaces and not a defect.

## Findings, by severity

### Blocking
None.

### Important
None.

### Minor

**M1. Viewport prefetch of case-study routes adds unused image preloads on /about, /aus and /cv.** After scrolling, Chrome logs "The resource /projects/<id>.webp was preloaded using link preload but not used within a few seconds" three times on /about (localai, mano, lorawan), twice on /aus (mano, lorawan) and four times on /cv (all four). These are warnings, not errors.

- **Cause** (confirmed by probe): `next/link` prefetches each in-body case-study link as it scrolls into view. Each case study's RSC payload carries a preload hint for its priority hero image, and React applies that hint to the current document.
- **Not new:** the same warning already appears live today on https://ahmadsaad.dev/projects/trend-radar (for localai.webp). Round 2 spreads it to three more pages.
- **Cost:** about 140 KB of speculative image downloads on /cv after a full scroll (16 to 50 KB each). They load after the load event and only after the reader scrolls, so there is no LCP or CLS impact.
- **Minimal fix (optional):** add `prefetch={false}` to the in-body case-study `<Link>`s on /about, /aus and /cv, or leave it, since the prefetch also makes the click instant. Accepting it is reasonable.

### Notes (not counted)

- **N1.** The PDF `Link` rule is applied by the local preview, but wrangler dev rewrites the configured route host in response headers to the request origin. It came back as `<http://localhost:8787/cv>`, and as `<http://ahmadsaad.dev/cv>` when sent with `Host: ahmadsaad.dev`. The `_headers` file in `.open-next/assets` has the correct `https://ahmadsaad.dev/cv`. The exact value has to be confirmed in production.
- **N2.** On a direct load of /aus#tau-beta-pi, the hide-on-scroll hook hides the nav (`is-hidden`), because the anchor jump counts as a downward scroll. The heading is clear of the nav whether the nav is shown or hidden: section `scroll-margin-top` equals `--nav`, and the heading sits about 180px lower because of section padding.
- **N3.** /aus and /cv end on a bone section that runs into the always-bone footer, with only a hairline between them. The four case studies already end the same way (ink, ink, bone, footer bone), so this is consistent with the site and not a regression.
- **N4.** My automated contrast reading for the FAQ answers came back as 1.08. That was a parsing artifact: the computed color is not in rgb() form. A pixel sample of the screenshot gives about 8.6:1, and the text is plainly readable.

## Verify live after deploy

1. `curl -sI https://ahmadsaad.dev/Ahmad_Saad_CV.pdf | grep -i "^link"` should print exactly `link: <https://ahmadsaad.dev/cv>; rel="canonical"`, and `grep -ci "^x-robots-tag"` on the same response should print 0.
2. `curl -s https://ahmadsaad.dev/b9f504812ee878b00a15106b08a1f9e1.txt` should print the key, with status 200 and text/plain.
3. `curl -sI https://ahmadsaad.dev/aus | grep -ci "^x-robots-tag"` should print 0. `/llms.txt` and `/me/about.md` should still show `x-robots-tag: noindex`.
4. `curl -s https://ahmadsaad.dev/sitemap.xml | grep -c "<loc>"` should print 9, including /aus and /cv.
5. HEAD on /aus and /cv should show text/html with the same Cache-Control as /about, and a 200 status (no 404 or 500 from a stale route manifest).
6. Optional: on live /cv, scroll to the bottom with DevTools open. M1's preload warnings are expected unless `prefetch={false}` was applied, and there should be no other console output.
