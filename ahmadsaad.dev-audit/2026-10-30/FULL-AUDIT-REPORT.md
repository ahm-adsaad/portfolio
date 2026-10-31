# ahmadsaad.dev SEO and GEO Audit

Audit date: 2026-10-30 (consolidated 2026-10-31). Scope: the 7 indexable pages, /llms.txt, /llms-full.txt, /me/*.md, robots.txt, sitemap, the Cloudflare edge, and off-site entity signals. Sources: eight specialist reports in `findings/` (technical, content, schema, performance, GEO, SXO, visual, backlinks), 23 screenshots in `screenshots/`, lab vitals in `findings/lab-vitals.json`. The fix plan is `PLAN.md` in this folder.

Limits: no Google Search Console, CrUX or GA4 access; SERP evidence comes from a US-only search tool, not Google UAE; backlink data is Common Crawl only. Lab performance only.

---

## 1. Executive summary

### SEO Health Score: 72 / 100

| Category | Weight | Score | Weighted | Source |
|---|---|---|---|---|
| Technical | 22% | 86 | 18.92 | technical.md |
| Content Quality | 23% | 74 | 17.02 | content.md |
| On-Page | 20% | 65 | 13.00 | derived, see below |
| Schema | 10% | 71 | 7.10 | schema.md |
| Performance | 10% | 74 | 7.40 | performance.md |
| AI Search Readiness | 10% | 56 | 5.60 | geo.md |
| Images | 5% | 62 | 3.10 | derived, see below |
| **Total** | 100% | | **72.14, rounded 72** | |

Arithmetic: 0.22 x 86 + 0.23 x 74 + 0.20 x 65 + 0.10 x 71 + 0.10 x 74 + 0.10 x 56 + 0.05 x 62 = 18.92 + 17.02 + 13.00 + 7.10 + 7.40 + 5.60 + 3.10 = 72.14.

**On-Page 65 (derived).** Works: exactly one h1 per page, self-referencing canonicals on all 7 pages, every title carries the full name, no orphan pages (minimum 3 inbound links). Loses points: the h1 on / and /about reaches extractors as "AhmadSaad" (spans with no whitespace); 5 of 7 meta descriptions omit "Ahmad Saad" and 3 are 87 to 97 characters; 2 project titles are 72 and 77 characters, so the "| Ahmad Saad" suffix truncates; the homepage body never states the full name in prose; card anchors are a generic "Read the case study"; no question-shaped headings. Start from 100: minus 12 for the h1 bug, minus 10 for descriptions, minus 5 for titles, minus 5 for no named body sentence, minus 3 for anchors = 65.

**Images 62 (derived).** Works: every content image has descriptive alt text naming Ahmad Saad, explicit width and height (no CLS), right-sized WebP project covers (17 to 50 KB) with lazy loading, an image sitemap, and a 19 KB WebP headshot on /about. Loses points: no face anywhere on the homepage although ProfilePage schema declares the headshot as its primary image; all 7 share images are text-only 2 MB PNGs; the hero poster downloads twice (WebP plus an 81 KB JPEG); a 65 KB PNG badge is shown at 120 px.

**Separate scores (not in the health score):** SXO gap 54 / 100 (sxo.md), off-site presence 22 / 100 (backlinks.md, low confidence), visual 68 / 100 (visual.md).

### Business type

Personal portfolio of an individual professional: Ahmad Saad, AI engineer and forward deployed engineer, Computer Engineering senior at the American University of Sharjah, UAE. Goal: own the search and AI-answer results for his name and its qualified variants (AUS, Samsung, engineer, GitHub) and convert recruiters.

### Why the site underperforms

The site is technically clean and its content is specific and honest, but almost nothing outside it knows it exists. **Cannot change:** at least five Wikipedia-backed people share the name (a Knesset member, the Egyptian singer Ahmed Saad who owns the Knowledge Panel, a Saudi footballer, an AFL player, an Olympic weightlifter), Google treats Ahmad and Ahmed as one name, the domain is only 2 to 3 months old, "AUS" reads as Australia, and "LocalAI" and "Trend Radar" collide with existing products. **Off-site (the biggest lever):** the domain was not returned even for the query "ahmadsaad.dev" in the tested index, no third-party page links to it, it is absent from Common Crawl, the AUS News profile of "Ahmad Atef Saad" (22 June 2026) does not link to it, the GitHub README contradicts the site, and Cloudflare blocks GPTBot, ClaudeBot and CCBot and opts the site out of Gemini grounding. **On-site:** the hero name and statement collapse to "AhmadSaad" for text extractors, there is no "Ahmad Saad is ..." sentence and no face or location on the homepage, meta descriptions omit the name, the JSON-LD graph dangles on two pages and lacks the "Ahmad Atef Saad" name variant, and the mobile homepage LCP fails at 2.82 s. The on-site gaps are all fixable this week (PLAN.md); the off-site ones need the owner.

### Top 5 Critical and High issues

| # | Issue | Severity | Fix |
|---|---|---|---|
| 1 | Domain effectively absent from the search index, no inbound links (sxo.md section 2, backlinks.md) | High | Owner actions 5, 6, 11 |
| 2 | Cloudflare returns 403 to GPTBot, ClaudeBot, CCBot, Amazonbot; managed robots.txt disallows Google-Extended, which blocks Gemini Apps grounding (geo.md F1, technical.md F1) | High | Owner actions 1, 2 |
| 3 | h1 on / and /about reads "AhmadSaad"; the statement reads as one run-on word (geo.md F2) | High | PLAN Task 1 |
| 4 | No third-person "Ahmad Saad is ..." passage, no face and no location above the fold on / (geo.md F3, content.md F1, visual.md F1/F2) | High | PLAN Tasks 2, 3 |
| 5 | Thin, partly broken entity graph: dangling `@id` on /about and /projects, sameAs of 2, no alternateName "Ahmad Atef Saad", AUS article not referenced (schema.md F2/F3/F5, sxo.md S4) | High | PLAN Task 5, Owner 11, 12 |

Also High: meta descriptions omit the name (Task 4), /me/about.md has empty links and no email (Task 7), mobile LCP 2.82 s (Task 9), hydration long task 0.8 to 1.06 s on mobile (deferred).

### Top 5 quick wins

1. Real spaces between the h1 spans and statement words: 15 minutes, fixes the entity name for every extractor (Task 1).
2. Name in every meta description, two titles under 60 characters: 30 minutes, config only (Task 4).
3. Preload three woff2 fonts: next/font emits no preloads on this Windows build (its font manifest is empty), 15 minutes, targets the only failing Core Web Vital (Task 9).
4. Share card: `q_100` PNG to `q_auto,f_jpg` with the headshot, 2.0 MB to about 150 KB, verified against Cloudinary (Task 11).
5. Owner: Search Console domain property, sitemap submit, request indexing for 7 URLs: 30 minutes, unblocks every ranking target (Owner action 5).

---

## 2. Technical: 86 / 100

What works: all 7 pages 200 with self-referencing canonicals, http and www 301 to the apex, HSTS preload and security headers, valid 7-URL sitemap with image entries, real 404s with noindex, brotli, immutable `/_next/static`, full server rendering, Googlebot and Bingbot allowed.

| Finding | Severity | Evidence | Fix |
|---|---|---|---|
| Edge 403 for GPTBot, ClaudeBot, anthropic-ai, Claude-Web, CCBot, Bytespider, Amazonbot while robots.txt only advises | Medium (High in GEO terms) | technical.md F1 | Owner 1, 2 |
| HTML `s-maxage=31536000`: safe today (each deploy replaces prerendered HTML, Cloudflare does not cache Worker HTML), dangerous if "Cache Everything" is ever enabled | Medium, latent | technical.md F2 | Deferred; Owner 3 |
| Mano and LoRaWAN titles 72 and 77 characters | Medium | technical.md F3 | Task 4 |
| Three descriptions 87 to 97 characters | Medium | technical.md F4 | Task 4 |
| Text endpoints carry no X-Robots-Tag | Low | technical.md F5 | Task 8 |
| Sitemap lastmod 2026-10-21 behind the 2026-10-30 content | Low | technical.md F8 | Task 2 |
| og:image 2 MB | Low | technical.md F9 | Task 11 |
| Generic anchors, manifest colours, FID in config, unused image hosts | Low | technical.md F6, F10, F11 | Task 4 (anchors); rest deferred |

## 3. Content Quality: 74 / 100

What works: specific, first-person engineering copy with named employers, month-level dates and measured outcomes (315 tests, 49-question eval, 100% retrieval); estimates labelled as estimates; rendered pages already pass every copy rule (no dashes, no banned terms); /about opens with "I'm Ahmad Saad, a Computer Engineering senior at the American University of Sharjah".

| Finding | Severity | Evidence | Fix |
|---|---|---|---|
| Homepage prose never states "Ahmad Saad" or a self-contained definition | High | content.md F1 | Task 2 |
| Descriptions on / and 4 project pages omit the name | High | content.md F2 | Task 4 |
| /me/about.md: `[twitter]()`, `[bluesky]()`, no email | High | content.md F3 | Task 7 |
| /projects lede does not name him; thin index | Medium | content.md F4 | Task 2 (named lede) |
| Project periods differ between pages and endpoints; IEEE tense mismatch | Medium / Low | content.md F5, F10 | Owner 14 |
| No Result sections for Mano and LoRaWAN | Medium | content.md F6 | Deferred (needs owner figures) |
| Trend Radar impact repeats the Samsung figures (implicit link, rule met by name) | Medium | content.md F7 | Owner 14 |
| Generic anchors, "1 tools", /about title competes with / | Medium / Low | content.md F9, F12, F14 | Task 4, Task 6 |
| No question-led content, remote stance unstated | Low | content.md F11 | Deferred |

## 4. On-Page: 65 / 100

Derived above. Findings are the h1 concatenation (Task 1), unnamed descriptions and long titles (Task 4), no named body sentence (Task 2), generic anchors (Task 4). Canonicals and single h1s are correct and stay guarded by constraint 2.

## 5. Schema: 71 / 100

What works: one valid server-rendered JSON-LD block per page, stable `@id`s, Person with disambiguatingDescription, alumniOf, worksFor, hasCredential (Credly), BreadcrumbList on 6 pages, project nodes shared between home and project pages.

| Finding | Severity | Evidence | Fix |
|---|---|---|---|
| Dangling `@id`: /about (`#website`), /projects (6 refs) | High | schema.md F3 | Task 5 |
| sameAs only GitHub and LinkedIn | High | schema.md F2 | Task 5 (Credly), Owner 12 |
| Weak disambiguation: no alternateName "Ahmad Atef Saad", knowsLanguage, memberOf, award, subjectOf | High | schema.md F5, sxo.md S4 | Task 5 |
| ImageObject width and height are strings | Medium | schema.md F1 | Task 5 |
| ProfilePage and AboutPage lack dateCreated and dateModified | Medium | schema.md F4 | Task 5 |
| jobTitle with separators and "@" | Low | schema.md F7 | Task 4 |
| Unreferenced org nodes, project dates, WebPage nodes, credential detail | Low | schema.md F6, F8 to F10 | Deferred |

Rich results: breadcrumbs are eligible now; there is no Person rich result, and a Knowledge Panel is earned off-site, not by markup.

## 6. Performance: 74 / 100

What works: desktop passes everywhere (LCP 0.76 to 1.20 s, CLS about 0.001); hero text is in the server HTML and never held at opacity 0; the video mounts after hydration, respects reduced motion and Save-Data and pauses off-screen; self-hosted subset fonts (92 KB); right-sized WebP images.

| Finding | Severity | Evidence | Fix |
|---|---|---|---|
| Mobile home LCP 2.82 s: the hero name waits on fonts discovered after the CSS, `display: block`, no preload in the HTML | High | performance.md F1 | Task 9 |
| Hydration long task 0.8 to 1.06 s on mobile (TBT about 900 ms) | High | performance.md F2 | Deferred |
| Media under /public served `max-age=0, must-revalidate` | Medium | performance.md F3 | Task 10 |
| Poster fetched twice (webp preload plus 81 KB jpg) | Medium | performance.md F4 | Task 10 |
| 65 KB badge PNG shown at 120 px | Medium / Low | performance.md F5 | Deferred |

## 7. AI Search Readiness (GEO): 56 / 100

What works: full SSR; OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot and Googlebot all get 200; spec-shaped llms.txt with markdown companions; citation-ready case studies.

| Finding | Severity | Evidence | Fix |
|---|---|---|---|
| Cloudflare opts out of Gemini grounding (Google-Extended) and GPT, Claude and Common Crawl ingestion | High | geo.md F1 | Owner 1, 2; repo robots route deferred until then |
| Entity name reaches extractors as "AhmadSaad" | High | geo.md F2 | Task 1 |
| No third-person definition passage | High | geo.md F3 | Tasks 2, 7 |
| Extractors keep 280 of 1,168 home words because of 12 `<article>` cards | Medium | geo.md F4 | Task 2 |
| llms companions thin, subjectless summary, duplicate summary | Medium | geo.md F5 | Task 7 |
| No visible or schema dates | Medium | geo.md F6 | Tasks 5, 6 |
| Off-site entity graph thin (GitHub bio, LinkedIn, Credly, YouTube) | Medium | geo.md F8 | Owner 7 to 12, 15 |

Platform scores (geo.md section 4): Perplexity 60, ChatGPT 55, Bing Copilot 55, Google AI Overviews 52, Google AI Mode 50, Claude 50, Gemini 30.

## 8. Images: 62 / 100

Derived above. Findings: no face on / (Task 3), text-only 2 MB share cards (Task 11), double poster (Task 10), badge PNG (deferred). Alt text and dimensions are already correct everywhere.

## 9. Off-site, SXO and visual context

- Backlinks 22 / 100: only self-owned GitHub links; the LocalAI demo and Credly do not link back; trend-radar repo homepage has a leading space (backlinks.md).
- SXO 54 / 100: page type is right for qualified queries (portfolio sites rank for "ahmad saad ai engineer"); the gap is index presence and authority, not page type. LinkedIn already ranks #1 for "ahmad saad american university of sharjah" (sxo.md section 2).
- Visual 68 / 100: strong legible hero, but no face or location above the fold, 11 px labels and 18 px tap targets (design calls, deferred).

---

## 10. Realistic ceilings for the owner's targets

Judgements from US-index evidence (sxo.md section 7), assuming the plan and Owner actions 1 to 12 land within two weeks.

| Target | Ceiling | Horizon |
|---|---|---|
| T1: #1 organic for "ahmad saad" | Not realistic. Page 2 to 3 in UAE Google is plausible; page 1 needs independent press. | Page 2 to 3 in 6 to 12 months; page 1 18+ months, press-dependent |
| T2: 4+ of 10 page-1 results about him | Not for the bare name. Realistic for "ahmad saad american university of sharjah" (site, /about, LinkedIn, GitHub, AUS article). | 2 to 4 months after indexing |
| T3: his photo in the top 3 image results | Low for the bare name; plausible for the AUS-qualified queries if one headshot is used everywhere. | 3 to 6 months (qualified) |
| T4: #1 for the qualified queries | "...american university of sharjah" and "ahmad saad samsung": high. "ahmad saad aus": medium (the AFL player). "ahmad saad github": medium, and the #1 will be the GitHub profile. "ahmad saad engineer": medium-low. | 1 to 3 months (AUS full name, Samsung); 3 to 6 (aus, github); 6 to 12 (engineer) |
| T5: own Knowledge Panel | Low to medium; needs several independent sources (AUS, employer, press, ORCID) and steady name searches. | 12 to 24+ months |

## 11. Owner actions (full click paths in PLAN.md)

1. Cloudflare: allow GPTBot, ClaudeBot, CCBot, Applebot-Extended (Security > Settings or AI Crawl Control); keep Bytespider blocked.
2. Cloudflare: turn off Managed robots.txt, or at least allow Google-Extended.
3. Cloudflare: confirm no "Cache Everything" rule on HTML, never add one.
4. Cloudflare: turn on Crawler Hints (IndexNow).
5. Google Search Console: domain property, submit sitemap, request indexing for the 7 URLs.
6. Bing Webmaster Tools: submit the sitemap or import from GSC.
7. GitHub profile: bio, company, https URL, location, available for hire.
8. GitHub README: Samsung in past tense, remove the banned term, plain-text name and link.
9. GitHub repos: fix the trend-radar homepage space, set Website fields, topics, pins.
10. LinkedIn: public profile and photo, website field, headline, Featured, certification.
11. AUS outreach: link from aus.edu/node/126616, CITL AI Hub, Tau Beta Pi chapter page.
12. Credly: public profile with website; send the profile URL for sameAs.
13. LocalAI demo: "Built by Ahmad Saad" link back to /projects/localai.
14. Confirm facts: IEEE tense, project periods, remote stance, Trend Radar figures, LoRaWAN and Mano measurements.
15. Carried from September B4 and B5: dev.to or Medium write-up with canonical, Show HN and awesome list for LocalAI, a LocalAI demo video, ORCID.
16. Monthly incognito check of T1 to T5 (September B6).
17. Optional: move share cards off the template's third-party Cloudinary account.

September Part B status: B1 (GitHub) partly done (name, blog, location set; bio, README and repo homepages still open), B2 (LinkedIn) unverified (login wall), B3 (Search Console) not evidenced, B4 and B5 open, B6 ongoing. All open items are carried above.

## 12. What the plan defers

Hydration refactor, HTML s-maxage policy (never enable Cache Everything), repo robots.txt with Content-Signal until Owner action 2, case-study Result sections and recruiter Q&A (need owner facts), site-wide label and tap-target sizes, video mount timing, badge WebP, manifest and config hygiene. Reasons are in PLAN.md.
