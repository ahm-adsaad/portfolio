# SERP and indexation diagnosis: ahmadsaad.dev

Date: 2026-10-31 (checks run 10:10 to 10:40 local, UAE). Agent: serp-indexation (diagnosis only, no repo edits). Production at time of check: main cd4ee5a.

## Score: search visibility 24 / 100

Rationale: Google has indexed all 7 sitemap URLs plus localai.ahmadsaad.dev, so in Google the problem is ranking and relevance, not indexation. But no owned page was seen ranking for any of 15 name queries, Bing (seen through DuckDuckGo) holds only the homepage, and every query that does find him finds his LinkedIn instead.

Headline correction to yesterday's audit: the 2026-10-30 SXO finding that the domain is "absent from the index" holds for the WebSearch tool's US index only (engine not disclosed, not Google). In a real browser, Google `site:ahmadsaad.dev` returns "About 8 results" (evidence in the Google section below).

## 1. Baseline SERP table

Source: the WebSearch tool (US index, engine not disclosed, not Google, not UAE), 2026-10-31. Position means order in the returned list. "Own" means ahmadsaad.dev, ae.linkedin.com/in/ahmaddsaad, github.com/ahm-adsaad, or an aus.edu page about him.

| # | Query | Top 5 URLs (in order) | ahmadsaad.dev present | Best own-property result and position |
|---|---|---|---|---|
| 1 | ahmad atef saad | en.wikipedia.org/wiki/Atef_Saad; en.wikipedia.org/wiki/Atef_Sadat; village.ai/person/ahmed-atef-...; rankless.org/authors/ahmed-saad-3; rankless.org/authors/ahmed-s-saad | n | none in 22 results. The AUS article that uses this exact name does not appear. |
| 2 | ahmad atef saad aus | en.wikipedia.org/wiki/Ahmed_Saad_(Australian_footballer); en.wikipedia.org/wiki/Atef_Saad; en.wikipedia.org/wiki/Ahmed_Saad; 11v11.com/players/ahmad-ateef-82269; jp.soccerway.com/player/atef-ahmed | n | none in 12 results. "AUS" read as Australia. |
| 3 | ahmad aus | substack.com/@ahmadmalas; en.wikipedia.org/wiki/Ahmad_al-Muhajir; rankless.org/authors/ausaf-ahmad-2; ahmadiyya-islam.org (Australia clean-up video); ahmadiyya-islam.org (Ahmadiyya in Australia) | n | none in 19 results. Two unrelated aus.edu nodes (52959, 52685) at #14 and #18. |
| 4 | ahmad saad aus | stuttgarter-zeitung.de ("Ahmad Al Saadi aus Stuttgart"); en.wikipedia.org/wiki/Ahmad_Saad (Saudi footballer); kiwix mirror Ahmed_Saad_(Australian_footballer); statscrew.com aussiefootball; afl.com.au "saad named by saints" | n | LinkedIn #11 |
| 5 | ahmad saad american university of sharjah | ae.linkedin.com/in/ahmaddsaad; arab-reform.net (Ahmad Sukkar); aus.academia.edu/IrtishadAhmad; sharjah.ac.ae (Dr Ahmad Sukkar); arab-reform.net | n | LinkedIn #1 |
| 6 | ahmad saad tau beta pi | en.wikipedia.org/wiki/Ahmad_Sa'd; ae.linkedin.com/in/ahmaddsaad; tbp.uga.edu; Tau Beta Pi Wikipedia mirror; tbp.org/info-book.cfm | n | LinkedIn #2 |
| 7 | ahmad aus engineering student tau beta pi | ae.linkedin.com/in/ahmaddsaad; aus.edu/node/126616 (the AUS News scholarship article); aus.edu/about-us/; aus.edu/node/105696 (TBP chapter installation); aus.edu/node/www.linkedin.com/... | n | LinkedIn #1, AUS article #2 |
| 8 | ahmad saad ai hub aus | aihub.aus.edu/about/; arabnews.pk; ae.linkedin.com/in/abuelnour (a different Ahmed Saad, Dubai); dig.watch (Australian AI hub); counterpointresearch.com | n | aihub.aus.edu/about/ #1 (engine summary: lists "Ahmad Saad, AI Hub Assistant"); LinkedIn #10 |
| 9 | ahmad saad ai engineer uae | muhammadsaadkhankor.github.io CV pdf; same site, second CV pdf; ae.linkedin.com/in/ahmaddsaad; uk.linkedin.com/in/itsmsn; eg.linkedin.com/in/msaadeldin | n | LinkedIn #3 |
| 10 | ahmad saad forward deployed engineer | inferencejobs.com (FDE jobs Riyadh); hbku.edu.qa staff page (Ahmad Al Saadi); inferencejobs.com; sabbar.com FDE job; builtin.com FDE job | n | none in 20 results |
| 11 | ahmad saad trend radar | tradingview.com/u/ahmadsaad83; okaz.com.sa (singer); akhbarelyom.com (singer); emaratalyoum.com (UAE AI trend radar, not him); parlmany.com | n | none in 16 results |
| 12 | ahmad saad localai | en.wikipedia.org/wiki/Ahmad_Sa'd; en.wikipedia.org/wiki/Ahmad_Sa'di; pt.soccerway.com; village.ai; village.ai | n | none in 20 results |
| 13 | ahmad saad golden visa ai engineer | village.ai/person/fahd-ahmad-...; ai-in-arabia-v2.pages.dev; amca.ae; themedialine.org; getwherenext.com | n | none in 18 results |
| 14 | ahmad saad | en.wikipedia.org/wiki/Ahmad_Sa'd; en.wikipedia.org/wiki/Ahmed_Saad_(singer); IPFS Wikipedia mirror Ahmad_Saad; rankless.org/authors/ahmed-saad-3; rankless.org/authors/ahmed-saad-2 | n | none in 21 results |
| 15 | ahmadsaad.dev | gitlab.com/ahmadsaubani; github.com/Ahmadalsaad; scriptagc.wasmer.app; ahmedsaad.vercel.app; ahmadawais.com | n | none |

Tally: ahmadsaad.dev 0 of 15. LinkedIn 6 of 15 (#1 twice, #2, #3, #10, #11). AUS News article 1 of 15 (#2, and only when the query also says "engineering student tau beta pi"). aihub.aus.edu/about/ 1 of 15 (#1). GitHub 0 of 15.

Google positions for these queries could not be measured (see Gaps). In Google the site is indexed, so its positions there may differ from this table.

## 2. Indexation status per engine

### Google: indexed, 8 URLs (verified)

- Method: one `site:ahmadsaad.dev` query (hl=en) opened in the owner's own Chrome through the Claude in Chrome extension, 2026-10-31 about 10:25 local. Result header: "About 8 results". Google also showed its "Do you own ahmadsaad.dev? Try Google Search Console" promotion, which confirms no GSC property is linked.
- URLs and the titles Google shows:
  1. https://ahmadsaad.dev/ : "Ahmad Saad · AI Engineer in the UAE"
  2. https://ahmadsaad.dev/about : "About Ahmad Saad | Computer & AI Engineer"
  3. https://ahmadsaad.dev/projects : "Projects by Ahmad Saad"
  4. https://localai.ahmadsaad.dev/ : "LocalAI · on-device documents"
  5. https://ahmadsaad.dev/projects/localai : "LocalAI: Private AI for Company Documents - Ahmad Saad"
  6. https://ahmadsaad.dev/projects/trend-radar : "Trend Radar: Production TikTok Trend Detection - Ahmad Saad"
  7. https://ahmadsaad.dev/projects/mano-computer-simulator : "Mano Basic Computer Simulator: Cycle-Accurate CPU in Python"
  8. https://ahmadsaad.dev/projects/lorawan-sensor-node : "Energy Harvesting LoRaWAN Sensor Node - Ahmad Saad"
- Google's copy is older than today's deploy. It shows the /about title "About Ahmad Saad | Computer & AI Engineer" (live today: "About Ahmad Saad | AI Engineer, AUS Computer Engineering"). Its homepage snippet is the old meta description "Computer Engineering senior building and scoping production AI systems as a forward deployed engineer...", which commit fb85207 (2026-10-31 08:42) replaced. Google will pick up the new titles on its next crawl. Without GSC there is no way to ask for that crawl.
- Name-query positions in Google: not measured. Headless Playwright got HTTP 429 and the /sorry captcha. A scripted batch of name queries in the owner's browser was refused by the permission layer as bot-check circumvention, so I stopped and did not retry. The owner has to check these by hand (Gaps, item 1).
- The LocalAI subdomain is indexed but has no link back to ahmadsaad.dev and no canonical tag (curl of https://localai.ahmadsaad.dev/ checked 2026-10-31).

### Bing: at most the homepage (proxy evidence); direct check not possible

- Proxy: DuckDuckGo's lite endpoint, which draws its web results mainly from Bing, returned exactly 1 result for `site:ahmadsaad.dev`: "Ahmad Saad · AI Engineer in the UAE", https://ahmadsaad.dev/, ending "No more results found for site:ahmadsaad.dev". The snippet is the old meta description, so the crawl it reflects also predates today. Read this as: Bing knows the homepage and probably none of the 6 deeper URLs.
- A direct Bing check gave no usable evidence. WebFetch, curl with a Chrome UA, and a headless Playwright browser all got filler results. The control queries failed the same way: `site:aus.edu` returned VirtualBox and Lowyat forum pages, and "ahmad saad american university of sharjah" returned Google Translate pages. So the Bing "no results" pages are not evidence either way.
- Bing Webmaster Tools: https://ahmadsaad.dev/BingSiteAuth.xml returns 200, application/xml, a valid `<users><user>` file (served since commit f292a3a, 2026-08-24). Verification is in place. Memory notes say "Bing WMT sitemap" is still an open owner action, so the sitemap was probably never submitted there.

### DuckDuckGo: 1 URL (homepage)

- See the Bing proxy above. Follow-up DuckDuckGo queries, including `"ahmadsaad.dev"`, all got the bot challenge ("Unfortunately, bots use DuckDuckGo too"), even with 25 seconds between requests. The html.duckduckgo.com endpoint given in the brief also got the challenge.

### WebSearch tool index (US): 0 URLs

- No owned URL for `site:ahmadsaad.dev` (yesterday) or for the bare query `ahmadsaad.dev` (today). This index is the one the SERP table uses. It has the LinkedIn profile and the AUS article but not the site.

### Other engines: blocked, no evidence

- Yahoo returned HTTP 500 to curl. Brave returned 429. Mojeek, Startpage and Yandex served captcha pages.

## 3. Crawl signals (all clean; nothing found that blocks indexing)

- Googlebot UA and bingbot UA both get `/` as 200 text/html, 137,178 bytes. The two HTML bodies differ only in the Cloudflare challenge-platform inline script (`__CF$cv$params` with the request's ray id), which Cloudflare's JavaScript bot detection injects. Content is otherwise identical, so this is not cloaking.
- Server-rendered content: exactly one H1, text "Ahmad Saad". The paragraph "Ahmad Saad is an AI engineer and forward deployed engineer based between Abu Dhabi and Sharjah in the United Arab Emirates. He is a Computer Engineering senior at the American University of Sharjah (AUS), ..." is in the raw HTML outside scripts. No JavaScript is needed to read it.
- No meta robots tag on `/`. Canonical: `https://ahmadsaad.dev`.
- X-Robots-Tag: absent on all 7 sitemap HTML URLs. Present as `noindex` on /llms.txt, /llms-full.txt and /me/about.md, as intended.
- Redirects, each one hop: http://ahmadsaad.dev/ 301 to https://ahmadsaad.dev/; https://www.ahmadsaad.dev/ 301 to the apex; http://www.ahmadsaad.dev/ 301 to the apex; https://www.ahmadsaad.dev/about 301 to https://ahmadsaad.dev/about; https://ahmadsaad.dev/about/ 308 to /about.
- robots.txt: `User-Agent: *`, `Allow: /`, Disallow only /api/ and /admin, `Sitemap: https://ahmadsaad.dev/sitemap.xml`. The sitemap is discoverable.
- sitemap.xml: 200 application/xml, 7 URLs, every lastmod 2026-10-31 (one build-time constant, CONTENT_LAST_MODIFIED). Engines learn to ignore a lastmod that changes on every URL at once without real content changes, so bump it only on real edits.
- HTML responses carry no `cf-cache-status` header (OpenNext serves them from the Worker, `x-opennext-cache: HIT`). This matters for Cloudflare Crawler Hints (lever 6).
- Weak relevance signals (not crawl blockers):
  - "Atef" is in no visible text on /, /about, /projects, /projects/trend-radar or /projects/localai. It appears only twice in the homepage HTML, both in JSON-LD.
  - The homepage title "Ahmad Saad · AI Engineer in the UAE" has no AUS, Sharjah or Atef.
  - Visible "AUS" counts: 2 on /, 5 on /about, 0 on /projects.

## 4. What ranks instead, and why

### The three competing pages about him

| Page | Title and snippet (as indexed) | What it has that the site's pages lack |
|---|---|---|
| LinkedIn, ae.linkedin.com/in/ahmaddsaad (authwall: HTTP 999 to fetchers, sign-up wall in a browser) | Index title "Ahmad Saad". LinkedIn's pattern in the same index is "Name - School", e.g. "Omar Hamzeh - American University of Sharjah". The engine summaries describe the content as: computer engineering student at AUS graduating December, Tau Beta Pi inductee and President, Tau Beta Pi Scholarship, CITL Student Assistant in the AI Hub, IEEE Solid State Circuits Club treasurer, a GPA honor across five semesters, and a link to the AUS News item. | "American University of Sharjah" as the headline entity (school next to the name), the words Tau Beta Pi, AI Hub and CITL on one page, a link to aus.edu, and linkedin.com's domain authority. The site's home title has none of these. The /about title has only "AUS". |
| AUS News, https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship (also served at aus.edu/node/126616 with 200 and no redirect; this index lists the node URL) | Title "AUS engineering student receives competitive Tau Beta Pi Scholarship \| American University of Sharjah". Meta and og description: "When Ahmad Atef Saad talks about engineering, he often returns to one question: can an idea work reliably after it leaves the lab?" Published 2026-06-22T09:03+04:00. og:image tbp_1_1.jpg. | The full name "Ahmad Atef Saad", the only page anywhere that uses it, and the authority of the aus.edu domain. It never says "Ahmad Saad" (only "Saad"), and it links only to aihub.aus.edu and an aus.edu clubs page, not to the site. In this index it does not rank for "ahmad atef saad", so the full-name query has no strong owner yet. |
| GitHub, github.com/ahm-adsaad | Title "ahm-adsaad (Ahmad Saad) · GitHub". Description "Forward Deployed Engineer (FDE). ahm-adsaad has 9 repositories available. Follow their code on GitHub." 2 followers. The website field shows "ahmadsaad.dev". | Nothing name-relevant beyond the name. The description has no AUS, UAE or AI engineer. It ranks for none of the 15 queries, including "ahmad saad github" yesterday. |
| Ally: aihub.aus.edu/about/ | Title "About AI HUB \| AI Hub \| American University of Sharjah". His entry sits in an inline JavaScript array: `['Ahmad Saad','AI Hub Assistant', .../2026/04/Ahmad.jpeg]`. | It ranks #1 for "ahmad saad ai hub aus", so the index reads the JavaScript-built team list. A link from that card to ahmadsaad.dev would be the strongest single link the site could get for the AUS queries. |

### Namesakes, by entity type (for disambiguation)

- "ahmad saad":
  - Ahmad Sa'd: Israeli Arab journalist and Knesset member, 1945 to 2010 (Wikipedia #1).
  - Ahmed Saad: Egyptian singer, born 1981 (Wikipedia #2; holds the Knowledge Panel per yesterday's brief; London concert listings, heavy Arabic press).
  - Ahmad Saad Abdullah: Saudi footballer, holder of the exact Wikipedia title "Ahmad_Saad", with many IPFS and kiwix mirrors.
  - Ahmed Saad: Egyptian Olympic weightlifter.
  - Ahmed Saad: Australian rules footballer (St Kilda). He takes the "aus" queries.
  - Lesser results: academic author profiles on rankless.org, Shaykh Ahmad Saad (Islamic scholar), an Ahmad Saad at Zamil Air Conditioners (theorg.com), IMDb, people-data aggregators (village.ai, nyne.ai, connectplex.ai).
- "ahmad atef saad":
  - Atef Saad: Tunisian marathon runner, Wikipedia #1.
  - Atef Sadat: Egyptian pilot, Wikipedia #2.
  - Ahmed Atef: several Egyptian footballers (ESPN, fichajes, soccerway).
  - Ahmed Saad: the weightlifter.
  - Egyptian LinkedIn profiles and aggregators.
- Pattern: every namesake on page 1 is a Person with a Wikipedia article (athlete, politician, musician) or an aggregator stub. None is a computer or AI engineer at a UAE university. The terms that set him apart:
  - occupation: computer engineer, AI engineer, forward deployed engineer
  - affiliation: American University of Sharjah, Tau Beta Pi UAE Alpha, AUS AI Hub, Samsung Gulf Electronics
  - place: Sharjah, UAE
  - the full name "Ahmad Atef Saad"
- Same-field namesakes to watch:
  - Ahmed Saad, Dubai, enterprise AI deployment leader (ae.linkedin.com/in/abuelnour). Shows up on "ai hub aus", "ai engineer uae" and "golden visa".
  - Ahmed Saad, ahmed-saad-portfolio.pages.dev, a student with a resume PDF.
  - Ahmed Mohammed Saad, ahmedsaad.vercel.app, .NET developer. Takes the "ahmadsaad.dev" lookalike slot.

## 5. Levers ranked by expected impact and effort

1. **Google Search Console domain property.** Impact high, effort 10 minutes, owner only.
   - Why: the site is already in Google. GSC is the only way to see real Google positions for the name queries and to ask Google to recrawl the changed titles.
   - Steps: search.google.com/search-console, Add property, Domain `ahmadsaad.dev`, add the TXT record in Cloudflare DNS, Verify. Then Sitemaps: submit `https://ahmadsaad.dev/sitemap.xml`. Then URL Inspection, Request indexing, for `/` and `/about` first (their titles changed today), then the 5 others. After 3 to 7 days, read Performance, Queries, filtered by "saad" and "atef".
   - Also add the `localai.ahmadsaad.dev` URL-prefix view, or rely on the Domain property, which covers it.

2. **Links from the pages that already rank for his name.** Impact highest for ranking in both engines, effort is outreach, owner only.
   - aihub.aus.edu/about/ is #1 for "ahmad saad ai hub aus". Ask the AI Hub web admin (he helped redesign that site) to link his team card name to https://ahmadsaad.dev/about.
   - The AUS News article holds "Ahmad Atef Saad". Ask AUS Marketing and Communications for one line: "Read more about Ahmad's work at ahmadsaad.dev".
   - LinkedIn is #1 for "ahmad saad american university of sharjah". Set the Contact info website to https://ahmadsaad.dev and add a Featured link. These links are nofollow, but they help discovery and tie the entity together.
   - GitHub website field: already set. Make the profile description name AUS and UAE.
   - localai.ahmadsaad.dev, which is already indexed: add a visible footer link "Built by Ahmad Saad" pointing to https://ahmadsaad.dev/projects/localai. This one is a repo change.
   - Google plainly: Google has no URL submission path without GSC. The Indexing API is limited to JobPosting and BroadcastEvent pages, and the sitemap ping endpoint was retired in 2023. Until the owner adds the GSC property, the only Google levers are external links and on-page relevance.

3. **IndexNow (Bing, Yandex, Seznam, Naver, Yep).** Impact medium for Bing (Bing seems to hold only 1 of 7 URLs), effort about 15 minutes plus a deploy.
   - Protocol, confirmed today: a one-off probe `GET https://api.indexnow.org/indexnow?url=https%3A%2F%2Fahmadsaad.dev%2F&key=<unhosted test key>` returned **202 Accepted** (received, key validation pending). The endpoint accepts this host, and the only gate is the key file, which does not exist yet: no IndexNow key is in apps/website/public/, and the probe key's URL returned 404, so that probe cannot validate. Bing does not require Bing Webmaster Tools verification for IndexNow.
   - Steps:
     - `openssl rand -hex 16` gives KEY.
     - Create `apps/website/public/KEY.txt` whose whole body is KEY. Static assets serve it the same way they serve BingSiteAuth.xml, and the middleware only redirects www and http.
     - Deploy, then confirm with `curl -s https://ahmadsaad.dev/KEY.txt` that the body equals KEY.
   - Submit:
     ```
     curl -s -o /dev/null -w "%{http_code}\n" -X POST https://api.indexnow.org/indexnow \
       -H "Content-Type: application/json; charset=utf-8" \
       -d '{"host":"ahmadsaad.dev","key":"KEY","keyLocation":"https://ahmadsaad.dev/KEY.txt","urlList":["https://ahmadsaad.dev/","https://ahmadsaad.dev/about","https://ahmadsaad.dev/projects","https://ahmadsaad.dev/projects/trend-radar","https://ahmadsaad.dev/projects/localai","https://ahmadsaad.dev/projects/mano-computer-simulator","https://ahmadsaad.dev/projects/lorawan-sensor-node"]}'
     ```
   - Expected responses: 200 or 202 means OK. 403 means the key file is missing or wrong. 422 means a URL is not on the host. 429 means too many requests.
   - Re-run after each content deploy, for the changed URLs only. A post-deploy script step would do it.

4. **Bing Webmaster Tools: sitemap and URL submission.** Impact medium, effort 10 minutes, owner only.
   - Portal: Sitemaps, Submit `https://ahmadsaad.dev/sitemap.xml`. Then URL Inspection on `/about`, Request indexing. Then Site Explorer, which shows the true Bing index count and replaces the DuckDuckGo proxy.
   - API (needs an API key from BWT Settings, API access):
     ```
     curl -s -X POST "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=APIKEY" \
       -H "Content-Type: application/json; charset=utf-8" \
       -d '{"siteUrl":"https://ahmadsaad.dev","urlList":["https://ahmadsaad.dev/","https://ahmadsaad.dev/about"]}'
     ```
   - Check the quota first with `GET https://ssl.bing.com/webmaster/api.svc/json/GetUrlSubmissionQuota?siteUrl=https://ahmadsaad.dev&apikey=APIKEY`. The quota is adaptive and depends on verified age and impressions, so expect a small number for a 2-month-old site. 7 URLs fit any quota.
   - Feasible, but redundant with IndexNow. Do one or the other. IndexNow needs no API key.
   - Once GSC exists, BWT "Import from Google Search Console" also works.

5. **On-page relevance for the name and AUS queries.** Impact high, effort is a code change. Out of this agent's remit, flagged for the content and entity agents.
   - "Ahmad Atef Saad" in visible text, ideally in the /about H1 or its first sentence.
   - "AUS" or "American University of Sharjah" in the homepage or /about title.
   - A dedicated AUS page (see the intent map below).
   - Without these, links alone will not make the site match "ahmad atef saad" or "ahmad saad aus".

6. **Cloudflare Crawler Hints.** Impact low and uncertain, effort 1 toggle, owner only.
   - Path: dashboard, Caching, Configuration, Crawler Hints, On.
   - It sends IndexNow pings when Cloudflare's cache records a MISS. The HTML here comes from the Worker without a `cf-cache-status` header, so it may never fire for the pages that matter.
   - Harmless to turn on, but do not count on it instead of lever 3.

## 6. Query intent map

| Query | What the engine most likely wants | Natural landing page | Match today |
|---|---|---|---|
| ahmad atef saad | Navigational person lookup by the full name, typed by people who read the AUS article. Wants a person profile plus that article. | /about, once "Ahmad Atef Saad" is visible there | **Gap.** No page shows "Atef" in visible text. |
| ahmad atef saad aus | Same person plus the university. Wants a university-linked profile or news. | Proposed "Ahmad Saad at AUS" page, or /about | **Gap.** No page matches. |
| ahmad aus | Ambiguous. Read as Australia, Ahmadiyya or "aus" (German). Wants disambiguation. | Proposed AUS page, with "American University of Sharjah (AUS)" in its title | **Gap**, and not winnable outright as a bare two-word query. |
| ahmad saad aus | A person at "AUS", which engines read as Australia. Wants a person profile with the AUS expansion spelled out. | Proposed AUS page, or /about (title has "AUS Computer Engineering" since today) | Partial. /about title now says AUS, but Google still shows the old title. |
| ahmad saad american university of sharjah | Person profile at the university (LinkedIn wins). | /about | Partial. "American University of Sharjah" is in /about's meta description and body, not in its title. |
| ahmad saad tau beta pi | News or honor-society listing plus a profile (LinkedIn and AUS article). | Proposed AUS page, or an /about section with an anchor | **Gap.** No page or title is about Tau Beta Pi. The home and /about bodies mention it twice each. |
| ahmad aus engineering student tau beta pi | The AUS News article itself (it ranks #2). | The AUS article. Supporting page: proposed AUS page | **Gap.** Best served by the article linking to the site. |
| ahmad saad ai hub aus | University team page (aihub.aus.edu/about/ wins #1). | /about. A link from the AI Hub card is the real lever | **Gap.** Mentioned in body text only. |
| ahmad saad ai engineer uae | Portfolio or CV of a UAE AI engineer (SERP is personal sites and resume PDFs). | / (title is literally "AI Engineer in the UAE") | Good match. Needs authority. |
| ahmad saad forward deployed engineer | Portfolio. The SERP is FDE job ads, so there is no person owner. | / | Good match. Easy once the site has any authority. |
| ahmad saad golden visa ai engineer | Recruiter check of eligibility. | / (meta description has "Golden Visa holder") | Fair match. |
| ahmad saad trend radar | Project lookup. | /projects/trend-radar | Good match. Title "Trend Radar: ... \| Ahmad Saad". |
| ahmad saad localai | Project lookup ("LocalAI" collides with established products). | /projects/localai, and localai.ahmadsaad.dev | Good match. |
| ahmad saad | Entity disambiguation. Wikipedia namesakes own page 1. | / | Not winnable short term. |
| ahmadsaad.dev | Navigational. | / | Google: yes (site: shows it). WebSearch index: no. |

Pages that do not exist and would serve several gap queries at once:

- An "Ahmad Saad (Ahmad Atef Saad) at the American University of Sharjah" page. Title with AUS spelled out. Body covering Computer Engineering, Tau Beta Pi UAE Alpha president and scholarship, AI Hub Assistant, CITL, Dean's and Chancellor's Lists, and the Undergraduate Research Grant. It should cite and link the AUS News article and the AI Hub page.
- Optionally, a short news-style page about the Tau Beta Pi Scholarship that links the AUS article.

## 7. Gaps that could not be verified

1. **Google positions for every name query.** Automated Google queries are blocked (429 and captcha). A scripted batch in the owner's browser was refused by the permission layer, so I stopped and did not retry. Owner check, manual: open an incognito window, set google.com to English, region UAE, and run the 15 queries in section 1. Note where ahmadsaad.dev, LinkedIn and the AUS article land, or read GSC Performance once the property exists.
2. **Bing's true index count.** All automated Bing access is degraded, so the 1-URL count is a DuckDuckGo proxy. Owner check: BWT Site Explorer, and URL Inspection on /about.
3. **Whether the sitemap was ever submitted in BWT.** Memory lists it as open. Not visible from outside.
4. **LinkedIn's exact title and snippet.** HTTP 999 to fetchers and an authwall in a browser. Content was inferred from the WebSearch engine summaries.
5. **UAE-localised results** (google.ae, gl=ae), Knowledge Panel, People Also Ask, and AI Overviews. None could be observed.
6. **DuckDuckGo beyond the single `site:` query.** Every later query got the bot challenge.
7. **Whether the AUS article's duplicate node URL (aus.edu/node/126616, 200, canonical points to the alias) splits its signals in Google.** It is an AUS-side issue, not fixable from the repo.
