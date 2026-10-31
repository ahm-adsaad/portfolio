# Technical SEO findings: https://ahmadsaad.dev (audit date 2026-10-31)

## 1. Score

**Technical SEO score: 90 / 100** (yesterday 86). No regressions. Gains: title lengths fixed, robots.txt clean with no Cloudflare managed prefix. Points still lost for the AI-crawler 403 policy (unchanged, open from 2026-10-30 finding 1, not re-tested today) and small metadata gaps below.

Category status: Crawlability PASS, Indexability PASS, Security PASS, URL structure PASS, Mobile PASS, Core Web Vitals (source) PASS, Structured data PASS (2 JSON-LD blocks on every page, no validity errors seen), JS rendering PASS (SSR, content in raw HTML).

## 2. New checks

1. robots.txt: PASS. Served by app/robots.txt/route.ts, 200, text/plain; charset=utf-8. Body: comment line, `User-Agent: *`, `Content-Signal: search=yes, ai-input=yes, ai-train=yes`, `Allow: /`, `Disallow: /api/`, `Disallow: /admin`, blank, `Sitemap: https://ahmadsaad.dev/sitemap.xml`. No Cloudflare managed block present. Note: Content-Signal sits inside the group before Allow, which is the form contentsignals.org documents. Note: ai-train=yes in robots is only advisory; the Cloudflare edge still 403s some training UAs (see open items).
2. /.well-known/security.txt: PASS, 200 text/plain.
3. /BingSiteAuth.xml: PASS, 200 application/xml.
4. CV PDF: /Ahmad_Saad_CV.pdf is 200 application/pdf, NOT in the sitemap (good). PDF has no /Title metadata (Info dictionary only has empty Author/Creator), so it would show as the filename in results. Linked from home twice (hero pill anchor text "CV", and "CV (PDF)"), opens in new tab. Anchors are short; better "Ahmad Saad CV (PDF)". Recommendation: add `X-Robots-Tag: noindex` for `/Ahmad_Saad_CV.pdf` via public/_headers (note: noindex still lets users download it). It contains name plus contact data and could outrank /about for the name query. Also set a PDF Title ("Ahmad Saad - CV") when regenerating. Low priority, Medium value for name-query control.
5. Canonicals: PASS on all 7, self-referencing and absolute. Home canonical is `https://ahmadsaad.dev` (no trailing slash; equivalent to `/`, fine).
6. Duplicate titles or descriptions: none. 7 distinct titles, 7 distinct descriptions.
7. Title and description lengths: PASS. Titles 35, 56, 22, 59, 54, 52, 54 chars (all at or under 60; yesterday's 72 to 77 char project titles are FIXED). Descriptions 150, 159, 151, 152, 148, 151, 152 chars (inside 120 to 160). Only the /about title at 56 and trend-radar at 59 are near the roughly 580 px limit; no truncation expected.
8. Lang and hreflang: `lang="en"` on all pages, zero hreflang anywhere. PASS.
9. Headers: HTML `Cache-Control: s-maxage=31536000, stale-while-revalidate=2592000`, `x-opennext-cache: HIT`. HSTS (1y, includeSubDomains, preload), CSP `frame-ancestors 'none'`, X-Frame-Options DENY, nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy present. No X-Robots-Tag and no meta robots on HTML pages. Static public files use `max-age=0, must-revalidate` (fine). Fresh-deploy invalidation was not re-proven today; ledger records the deploy-time purge from the previous pass.
10. 404: PASS. /nonexistent returns 404, page has title "Ahmad Saad..." and a `href="/"` link home.
11. Redirects: PASS, each single-hop to canonical: http://ahmadsaad.dev/ (1), https://www.ahmadsaad.dev/ (1), /about/ to /about (1), /projects/ to /projects (1), http://www.ahmadsaad.dev/about to https apex /about (1).
12. Mobile: viewport `width=device-width` present on all 7 pages. PASS.
13. Structured data: 2 ld+json blocks per page, no parse errors or missing-required-field problems detected.
14. Sitemap: valid XML, 7 URLs, `lastmod` in YYYY-MM-DD (all 2026-10-31, comes from CONTENT_LAST_MODIFIED so they all move together, which is a mild signal-dilution risk), image extension used on 6 of 7 (all `image:loc` absolute). No 404 URLs. How app/sitemap.ts builds entries: `export const dynamic = 'force-static'`; a local `routes: Route[]` array of `{path, images?}`: `/` and `/about` (image USER.image.profile), `/projects`, then `PROJECT_PAGES.map(...)` from `@/config/projects` using `projectPath(project)` and `${SITE_URL}${project.image}`. A final `Promise.all` maps each to `{url: await addPathToBaseURL(path), lastModified: CONTENT_LAST_MODIFIED, images?}`. To add /aus, /faq, /now, /press: append `{ path: '/aus' }` etc. to the `routes` array (after `/projects`, before the PROJECT_PAGES spread or after it), only once the pages exist. For /now, use its own date instead of the shared CONTENT_LAST_MODIFIED (extend Route with `lastModified?`). New pages must also emit self-canonical and be added to llms.txt if relevant.
15. /api/revalidate: PASS. GET returns 401, POST returns 405 without a secret. `Disallow: /api/` in robots.txt.
16. IndexNow readiness: not present. To add: (a) generate a key (8 to 128 chars, a-z A-Z 0-9 -), (b) create `apps/website/public/<key>.txt` whose entire content is the key, served at https://ahmadsaad.dev/<key>.txt (confirm that file is excluded from the 7-page sitemap and reachable with 200), (c) submit with `POST https://api.indexnow.org/indexnow`, `Content-Type: application/json; charset=utf-8`, body `{"host":"ahmadsaad.dev","key":"<key>","keyLocation":"https://ahmadsaad.dev/<key>.txt","urlList":["https://ahmadsaad.dev/","https://ahmadsaad.dev/about", ...]}`. 200 or 202 means accepted. Optionally call it from the deploy script after a successful deploy. Google ignores IndexNow; it benefits Bing, Yandex, Naver.

## 3. Open and unchanged items

- Medium (unchanged from 2026-10-30, not re-tested): Cloudflare dashboard policy returns 403 to GPTBot, ClaudeBot, CCBot, Bytespider, Amazonbot UAs while robots.txt now says ai-train=yes. These contradict each other; either relax the Cloudflare AI-bot setting or set `ai-train=no` in the route.
- Low: CV PDF has no title and no noindex (check 4).
- Low: all sitemap lastmod values identical (check 14).
- Low: IndexNow not set up (check 16).

## 4. Priorities

1. Medium: reconcile Content-Signal ai-train=yes with the Cloudflare 403s.
2. Medium: noindex header plus PDF title for the CV.
3. Low: IndexNow key file and submit step.
4. Low: per-page lastmod when /now, /aus, /faq, /press are added.
5. Low: descriptive "Ahmad Saad CV (PDF)" anchor text.
