# SXO Findings: ahmadsaad.dev

Audit date: 2026-10-30/31. Analyst: SXO (search experience). Scope: why the site underperforms in search and AI answers for the owner's name queries, and the realistic ceiling.

Method notes and limitations come first because they change how the numbers below should be read:

- The SERP evidence came from the agent WebSearch tool. Its index is **US-only** and the backend engine is not disclosed. **This is not a Google SERP and not a UAE SERP.** "Position" means the order of the returned link list. Treat it as a rough rank in one US index. It is not a Google position.
- The tool does not expose Knowledge Panels, People Also Ask, AI Overviews, image packs or ads. Those SERP features could not be observed directly. The singer's Knowledge Panel comes from the coordinator brief.
- The tool ignored the `site:` operator at least once (`"Ahmad Saad" site:aus.edu` returned no aus.edu pages). So `site:ahmadsaad.dev` alone is weak evidence. The stronger evidence is that the bare query `ahmadsaad.dev` also returned no page from the domain.
- No Google Search Console or Bing Webmaster data was available.
- Bing via WebFetch returned an empty result page for `site:ahmadsaad.dev` and for `ahmadsaad.dev`. It also returned an empty page for "ahmad saad american university of sharjah" and unrelated junk for the control query "ahmed saad singer". The fetcher is getting a degraded Bing page, so **the Bing result is inconclusive**. It does not prove that Bing has zero pages indexed.
- DuckDuckGo (html endpoint) served a bot challenge. **Blocked. Not retried.**
- The Credly badge page renders as a JavaScript shell to non-browser fetchers, and its public `.json` endpoint returned HTTP 500. Badge details could not be verified off-site.
- Google Images position (T3) could not be measured.
- Section status: all sections complete except (2) Bing and DuckDuckGo rows (inconclusive or blocked) and (5) persona scoring (desk-based, no user testing). Both are marked **partial**.

---

## 1. SXO Gap Score: 54 / 100

**Rationale in one line:** the on-site content answers "who is Ahmad Saad, the AUS computer engineer" well. But the home page reads as a landing page with no face and no third-party proof, and the domain is absent from the tested US index even for its own name. So the match with search intent is never tested.

This SXO Gap Score is separate from the SEO Health Score.

| Dimension | Score | Evidence |
|---|---|---|
| Page type | 9 / 15 | Qualified queries ("ahmad saad ai engineer", "ahmad saad portfolio") reward personal portfolio sites and resume PDFs, so the site type is right. The bare name rewards entity and Wikipedia pages, so the type fits poorly there. The `/` hero is landing-page styled (slogan plus 3 CTAs). |
| Content depth | 12 / 15 | `/` and `/about` cover education, roles with dates and places, GPA, honors and projects. `/projects/trend-radar` has about 620 visible words with problem, approach, architecture and role sections. |
| UX signals | 10 / 15 | Nav and CTAs are clear (Email, LinkedIn, CV). GitHub is missing from the header and from `/about`. The identity sentence sits below the fold on `/`. |
| Schema | 11 / 15 | Strong `@graph`: Person, ProfilePage, WebSite, organizations, credential, SoftwareSourceCode. Missing: `alternateName` ("Ahmad Atef Saad", used by AUS), Credly in `sameAs`, `subjectOf` for the AUS news article, `award` and `memberOf` for Tau Beta Pi. |
| Media | 6 / 15 | The headshot `/ahmad-saad.jpg` appears only on `/about`. The `/` hero is a video poster with `alt=""`. The og:image for `/` and `/about` is a text-only card with no face. |
| Authority | 2 / 15 | Not returned for its own domain name. The GitHub profile has 2 followers. The AUS article about him does not link to the site. No third-party page linking to the domain was found. |
| Freshness | 4 / 10 | Content is current (dates through 10.2026). The domain is about 2 to 3 months old. The off-site GitHub README is stale and contradicts the site (see section 6). |

---

## 2. SERP evidence (US index via WebSearch, not Google, not UAE)

"Present" means some URL on ahmadsaad.dev appeared anywhere in the returned list (10 to 24 results). Positions are approximate list positions.

| # | Query | ahmadsaad.dev present | URL | Approx rank | Dominant result types | Note |
|---|---|---|---|---|---|---|
| 1 | ahmad saad | **No** | none | not in top ~21 | Wikipedia entities: Ahmad Sa'd (Knesset politician, #1), Ahmed Saad (singer, #2), Ahmad Saad (Saudi footballer, via mirrors); Wikipedia mirrors on IPFS and kiwix; rankless.org academic author pages; sports profiles (sofascore, livesoccertv); concert listing (Eventim Apollo); Islamic scholar page; theorg.com executive; IMDb; people-data aggregators (village.ai, nyne.ai) | His LinkedIn is also absent. Page 1 is entirely entity and directory pages. |
| 2 | ahmed saad | **No** | none | not in top ~23 | Wikipedia singer (#1), Wikipedia disambiguation, weightlifter, academics (rankless, EJUST), aggregators, concert, footballers, one Egyptian LinkedIn (#14) | The singer is the primary entity. |
| 3 | ahmad saad aus | **No** | LinkedIn only: ae.linkedin.com/in/ahmaddsaad | LinkedIn ~#11 | Australian rules footballer Ahmed Saad (Wikipedia, AFL.com.au), German "aus Stuttgart" news, Saudi footballer mirrors | "AUS" is read as Australia, and as German "aus". |
| 4 | ahmad saad american university of sharjah | **No** | LinkedIn: ae.linkedin.com/in/ahmaddsaad | LinkedIn **#1** | Other Ahmads at AUS and University of Sharjah, AUS Wikipedia, academia.edu | The fully qualified query is winnable. LinkedIn already wins it. |
| 5 | ahmad saad ai engineer | **No** | none | n/a | Other people's portfolio sites (github.io, vercel.app), resume PDFs, village.ai, Fiverr | The SERP rewards exactly the site's page type (personal portfolio). The site is simply missing. |
| 6 | ahmad saad samsung | **No** | none | n/a | Aggregators (village.ai, mob4me), samsung.com contact pages, Wikipedia namesakes, Arab News | Weak SERP with no entity owner. Easy once indexed. |
| 7 | ahmad saad uae | **No** | none | n/a | Aggregators (village.ai, manhom, connectplex), Wikipedia namesakes, other UAE LinkedIns (including a Dubai enterprise-AI Ahmed Saad), marketscreener, theorg | A direct same-field, same-country namesake is present. |
| 8 | ahmad saad github | **No** | none (github.com/ahm-adsaad also absent) | n/a | 7 other GitHub profiles (AhmedSaadi0, ahmedsaad123456, saadahmadhere, ahmedsaad94, saadahmed540, others) | His GitHub profile does not rank for its own name. |
| 9 | ahmad saad linkedin | **No** | none (his LinkedIn also absent) | n/a | Other LinkedIns (Austria, Egypt), weekday.works, marketscreener, theorg, village.ai | |
| 10 | ahmad saad forward deployed engineer | **No** | none | n/a | FDE job postings (OpenAI UAE, Armada, others), other Ahmed Saads, another person's resume PDF | No person owns this pairing. |
| 11 | ahmad saad portfolio | **No** | none | n/a | Namesake portfolios (ahmedsaad.vercel.app, ahmed-saad-portfolio.pages.dev, saadahmedcs.github.io), archinect, issuu, Bain bios, Unsplash | |
| 12 | ahmadsaad.dev | **No** | none | n/a | Lookalikes: GitLab, GitHub "Ahmadalsaad", ahmedsaad.vercel.app, ahmadawais.com, Fiverr | **Strongest signal:** the index does not return the domain for its own exact name. |
| 13 | site:ahmadsaad.dev | **No** | none | 0 pages | Lookalike developer profiles (same as #12) | The operator may be ignored, but with #12 this is consistent with zero indexed pages. |
| 14 | who is ahmad saad ai engineer | **No** | LinkedIn: ae.linkedin.com/in/ahmaddsaad | LinkedIn ~#16 | Other Saads (Muhammad, Mahmoud, Mohammed), aggregators, Fiverr | The tool's own AI answer named the LinkedIn profile as "a computer engineering student at AUS ... doesn't show an AI engineering role". |
| 15 | ahm-adsaad | **No** | LinkedIn: ae.linkedin.com/in/ahmaddsaad | LinkedIn ~#7 | Singer (Wikipedia, concerts), Iraqi footballer, scholar | The handle is not tied to him. GitHub absent. |
| 16 | trend radar tiktok ahmad saad | **No** | none | n/a | TikTok influencer analytics pages, the singer's viral TikTok dances, a commercial "viral radar" tool | The singer captures "tiktok + saad". |
| 17 | localai browser private ai ahmad saad | **No** | none | n/a | local.ai (louisgv), BrowserAI, Chrome and Firefox local-AI extensions, Product Hunt | "LocalAI" collides with established products. |
| 18 | "Ahmad Saad" "Tau Beta Pi" AUS | No | LinkedIn #1; aus.edu/node/105696 (chapter installation) #2 | LinkedIn #1 | LinkedIn, aus.edu, other Tau Beta Pi chapter pages | AUS pages exist, but none links to the site. |
| 19 | "Ahmad Saad" site:aus.edu | No | LinkedIn #1 | n/a | LinkedIn, rankless.org | The tool ignored the `site:` operator. |
| 20 | "Ahmad Saad" "American University of Sharjah" computer engineering | No | LinkedIn #1 | LinkedIn #1 | LinkedIn, other AUS people | |
| 21 | aus.edu Tau Beta Pi scholarship engineering student 2026 | No | aus.edu/node/126616 at #2 | n/a | Tau Beta Pi scholarship listings | **Found the AUS profile article:** "AUS engineering student receives competitive Tau Beta Pi Scholarship" (22 June 2026). It names him **"Ahmad Atef Saad"**, has 4 quotes, and links nowhere personal. |
| 22 | "Ahmad Saad" "Claude Certified Architect" | No | none | n/a | Certification explainers, unrelated people | The credential is not tied to his name anywhere in the index. |
| 23 | "Ahmad Saad" "Samsung Gulf Electronics" | No | none | n/a | Samsung corporate pages, directories | No third-party page connects him to Samsung. |
| 24 | Bing: site:ahmadsaad.dev (WebFetch) | **partial / inconclusive** | none | empty page | n/a | The control queries also came back empty or junk, so the fetcher gets a degraded page. Verify in Bing Webmaster Tools. |
| 25 | DuckDuckGo: site:ahmadsaad.dev (WebFetch) | **partial / blocked** | none | n/a | Bot challenge page | Blocked. Not retried. |

**Answer to the core question:** in the US index tested, ahmadsaad.dev does **not** appear for the bare name "ahmad saad" (not in about 21 results). It does not appear for any of the 17 required queries, including its own domain name. The owner's only indexed self-asset is the LinkedIn profile: #1 for "ahmad saad american university of sharjah", about #7 for "ahm-adsaad", about #11 for "ahmad saad aus" and about #16 for "who is ahmad saad ai engineer".

---

## 3. Competing entities on page 1

| Entity | Who | Signals that put them there | Queries they occupy |
|---|---|---|---|
| Ahmed Saad (singer) | Egyptian singer and actor, born 1981 | English Wikipedia, Knowledge Panel (per brief), concert listings (Eventim Apollo), heavy Arabic news, YouTube, TikTok dance trends | ahmed saad (#1), ahmad saad (#2), ahm-adsaad, trend radar tiktok ahmad saad |
| Ahmad Sa'd | Israeli Arab journalist and Knesset member (1945-2010) | English Wikipedia | ahmad saad (#1), ahmad saad linkedin |
| Ahmad Saad Abdullah | Saudi footballer | Holds the exact-match Wikipedia title "Ahmad_Saad", many Wikipedia mirrors, sports stats sites | ahmad saad, ahmad saad aus, ahmad saad uae, ahmad saad samsung |
| Ahmed Saad (AFL) | Australian rules footballer, St Kilda | Wikipedia, AFL.com.au news | ahmad saad aus (wins it, because AUS is read as Australia) |
| Ahmed Saad (weightlifter) | Egyptian Olympic weightlifter | Wikipedia | ahmad saad, ahmed saad |
| Academic namesakes | Several researchers (medicine, pharmacy; EJUST associate professor) | rankless.org author pages, university profiles | ahmad saad, ahmed saad, site:aus.edu |
| Shaykh Ahmad Saad | Islamic scholar | Institutional pages (SimplyIslam.sg) | ahmad saad, ahmad saad uae |
| Ahmad Saad (Zamil) | Deputy GM, Zamil Air Conditioners | theorg.com org chart | ahmad saad, ahmad saad uae, ahmad saad linkedin |
| Ahmed Saad (Dubai, enterprise AI) | Enterprise AI deployment leader, UAE | LinkedIn (ae.linkedin.com/in/abuelnour) | ahmad saad uae, who is ahmad saad ai engineer, ahm-adsaad. **Same field, same country: the most confusable namesake.** |
| Ahmed Saad (Bain) | Partner, Bain Middle East | bain.com team bios | ahmad saad portfolio |
| Developer namesakes | ahmedsaad.vercel.app (.NET), ahmed-saad-portfolio.pages.dev (AI resume), several GitHub accounts, amdsaad | Exact-match subdomains and handles, GitHub profile pages | ahmad saad portfolio, ahmad saad github, ahmadsaad.dev, site:ahmadsaad.dev |
| People-data aggregators | village.ai, whitebridge, connectplex, nyne.ai, marketscreener | Large programmatic profile sets | Nearly every qualified query |

Takeaway: the bare name is shared by at least five Wikipedia-backed entities. Every qualified query is filled by aggregators and namesakes because no strong page for this Ahmad Saad exists in the index yet.

---

## 4. Page-type mismatch findings

**Primary finding: there is no page-type mismatch to fix first. There is an index-presence gap.** For qualified queries ("ahmad saad ai engineer", "ahmad saad portfolio"), the results are personal portfolio sites and resume PDFs, which is the site's page type, so the site is **ALIGNED** on type. For the bare name, the results are entity pages (Wikipedia, institutional bios, sports and data profiles). That is a **HIGH** mismatch, and no page type can close it without independent notability.

Taxonomy classification (seo-sxo page-type taxonomy):
- `/` is classified as **Landing Page** (single value-prop hero, 3 CTAs above the fold, minimal nav). The SERP for person-name intent rewards a profile or bio. Severity: **MEDIUM**.
- `/about` is classified as a long-form bio (closest type: Blog Post, with ProfilePage schema). This matches person intent. Severity: **ALIGNED**.
- `/projects/trend-radar` is classified as a case study (Blog Post type). The SERP for "trend radar tiktok ahmad saad" belongs to the singer and to tools. Severity: **MEDIUM** (the name collision cannot be fixed on-page).

Specific mismatches against what person-name SERPs reward (photo, one-line identity, dates, location, third-party proof):

1. **The `/` hero is a slogan, not an identity.** The H1 "Ahmad Saad" is fine. The supporting line is "Forward deployed. Builds the system, scopes it with the people who use it, ships it.", and the eyebrow reads "AI Engineer · FDE". The first sentence naming AUS and the UAE is below the fold, in the About teaser. Searchers and AI summarizers need "who, where, what" in the first 50 words.
2. **There is no face on `/`.** The hero image is a video poster with `alt=""`. The headshot `/ahmad-saad.jpg` (748x748, alt "Ahmad Saad") appears only on `/about`. Yet the `/` ProfilePage schema declares it as `primaryImageOfPage`, so the schema promises an image the page does not show. The og:image on `/` and `/about` is a text-on-gradient card. Each social share and AI preview is a missed face impression (this hurts T3).
3. **No third-party corroboration is visible.** Nothing links to the AUS News profile (aus.edu/node/126616, 22 June 2026), the CITL AI Hub site he maintains (aihub.aus.edu), or the Tau Beta Pi UAE Alpha chapter. The Credly badge is linked only as an image.
4. **A name variant is missing.** AUS publishes him as "Ahmad Atef Saad". The site and its schema never use the middle name, so Google cannot easily reconcile the strongest institutional source with the site.
5. **GitHub is missing from the header nav and from `/about`.** Only Email and LinkedIn appear there. GitHub appears only in the `/` footer contact block and as a "Source" link.
6. **Location is scattered.** Per-role places (Dubai, Abu Dhabi, Sharjah) are visible, but no single "Based in Abu Dhabi and Sharjah, UAE" line sits near the hero. That line appears only at the end of `/about`.
7. **Facts are inconsistent across pages and profiles.**
   - `/about` omits the Electro-Mechanical Company and ONBRND roles that `/` lists.
   - The GitHub README still says he "is an AI/ML Engineer at Samsung Gulf Electronics" (present tense, but the role ended 08.2026), and its typing banner reads "AI/ML Engineer @ Samsung".
   - The README describes the Samsung system with a different technical approach than the site's "measurement decides, LLMs describe" story. It also names a model-library term that the copy rules ban.
   - Conflicting facts weaken entity reconciliation.
8. **Project names collide.** "LocalAI" collides with established products (local.ai, the LocalAI open-source project, several browser extensions). "Trend Radar" is generic. The project pages will rank only for "<project> + ahmad saad" style queries, never for the project name alone.

---

## 5. User stories and persona scoring (partial: desk-based, no user testing)

User stories (each cites the SERP signal it comes from):

1. **Recruiter verifying a candidate.** As a UAE tech recruiter, I want to confirm that the Ahmad Saad on a CV is the AUS computer engineer with Samsung experience, because many people share the name. I'm blocked because his name search returns Wikipedia singers and footballers, and "ahmad saad samsung" returns only aggregators. *(Signals: aggregators on every qualified query; LinkedIn #1 only for the fully qualified AUS query.)* Stage: consideration.
2. **Hiring manager assessing depth.** As an AI hiring manager, I want evidence that he built production systems, because portfolio claims are cheap. I'm blocked because the impact numbers are labeled "estimated" and "projected" with no method shown. *(Signal: "ahmad saad ai engineer" and "portfolio" SERPs are full of portfolio sites and resume PDFs, so the comparison set is other portfolios.)* Stage: decision.
3. **Fellow engineer checking a project.** As an engineer who heard about the browser-only private AI app, I want to find it and run it. I'm blocked because "LocalAI" returns other products. *(Signal: the "localai browser private ai ahmad saad" SERP.)* Stage: awareness.
4. **AUS faculty or student.** As an AUS faculty member, I want to find the student from the Tau Beta Pi article and see his work. I'm blocked because the AUS article does not link anywhere, and AUS calls him "Ahmad Atef Saad". *(Signals: aus.edu/node/126616; LinkedIn #1 for the AUS queries.)* Stage: awareness.
5. **Journalist or event organiser.** As an event organiser, I want a short bio and a headshot to list him as a speaker. I'm blocked because no press-ready bio or downloadable photo exists. *(Signal: the bare-name SERP rewards bio and speaker pages such as arabnet.me speaker pages, Wikipedia and institutional bios.)* Stage: consideration.
6. **AI assistant answering "who is Ahmad Saad".** As an AI answer engine, I want an authoritative, unambiguous source. I'm blocked because the domain is not in the index, GPTBot and ClaudeBot get 403 at the edge (see the crawler-access findings), and nothing disambiguates him from the singer. *(Signal: the search tool's own answer for "who is ahmad saad ai engineer" listed several namesakes and could cite only LinkedIn.)* Stage: awareness.

Persona scores. Per the coordinator, scores are 0-10 per page. They compress the reference rubric of relevance, clarity, trust and action.

| Persona | `/` | `/about` | `/projects/trend-radar` | One-line reasons | Single most important missing element |
|---|---|---|---|---|---|
| Recruiter verifying | 7 | 8 | 5 | `/`: availability, Golden Visa, CV and dated roles are all above or near the fold, but no face. `/about`: full narrative with a photo. Trend Radar: impact is clear but it is not a verification page. | A headshot plus a one-sentence identity line (AUS, UAE, Samsung) above the fold on `/` |
| Hiring manager | 7 | 6 | 7 | `/`: dense, dated experience bullets. `/about`: prose with less evidence. Trend Radar: strong problem, approach and architecture, but no visuals, and "estimated" and "projected" metrics without a method. | An architecture diagram or real screenshots, plus one line on how the $60K and 20% figures were derived |
| Fellow engineer | 5 | 3 | 7 | `/`: a stack list, not proof. `/about`: no repo links. Trend Radar: source link to a sanitized repo, design principles stated. | A "run it" path (demo link or quick-start) on each case study, linked from the H1 area |
| AUS faculty or student | 6 | 6 | 3 | AUS, GPA, Tau Beta Pi and CITL are all visible, but none links to an AUS source. Trend Radar is not relevant to them. | A link to the AUS News article and the CITL AI Hub site, plus the "Ahmad Atef Saad" name variant |
| Journalist or organiser | 4 | 6 | 3 | `/`: landing-page tone. `/about`: usable bio, but long and with no short version. Trend Radar: too technical. | A press block with a 50-word and a 100-word bio and a downloadable high-res headshot |
| AI assistant | 5 | 6 | 5 | Content, schema and llms.txt are well structured. But the domain is not indexed, AI crawlers get 403, and there is no disambiguation against the singer. | Crawler access plus index presence, then one explicit disambiguation sentence in llms.txt and the schema |

Weakest persona: **journalist or organiser** (average about 4.3), then **AI assistant** (about 5.3). Systemic issue across personas: **trust**. Every claim is self-asserted on the site, and no third-party source is linked.

---

## 6. Root-cause ranking: why the site underperforms

Overall order by weight (category in brackets):

1. [off-site] The domain is effectively absent from the search index: no discovery and no inbound links.
2. [cannot change] At least five Wikipedia-backed entities share the name, and Google treats Ahmad and Ahmed as one name.
3. [off-site] Entity signals are fragmented and contradictory across AUS, GitHub, LinkedIn and Credly.
4. [on-site / edge config] AI crawlers are blocked (other agent's finding), so AI answers cannot cite the site.
5. [cannot change] The domain is about 2 to 3 months old (registered 08.2026, redesigned 10.2026).
6. [on-site] The `/` hero is landing-page style, with no face, no third-party proof, no name variant and a text-only og:image.
7. [cannot change] "AUS" is ambiguous (Australia, German "aus"), and the project names collide with existing products.

### 6a. Cannot change

| # | Cause | Evidence | What to do instead |
|---|---|---|---|
| C1 | Name collision with entities that have Wikipedia pages and a Knowledge Panel | "ahmad saad" top 3: Wikipedia (Knesset politician), Wikipedia (singer), Wikipedia mirror (Saudi footballer). The singer is #1 for "ahmed saad". | Do not compete for the bare name now. Target qualified queries (AUS, Samsung, engineer, GitHub) where no entity holds the top spot. |
| C2 | Domain age about 2 to 3 months | Registered August 2026. The tested index has not picked up the domain at all. | Speed up discovery (see O1). Expect 3 to 6 months before rankings stabilise. |
| C3 | "AUS" ambiguity | "ahmad saad aus" is won by the Australian rules footballer and German "aus" news. | Use "American University of Sharjah" spelled out in titles and H1-adjacent text, and keep "AUS" as a secondary token. |
| C4 | Generic or colliding project names | The "LocalAI" and "trend radar tiktok" SERPs belong to other products and to the singer's TikTok trends. | Keep "by Ahmad Saad" in project titles (Trend Radar already has it). Do not expect project-name traffic. |

### 6b. Off-site gaps (owner actions)

| # | Cause | Evidence | Owner action (exact steps) |
|---|---|---|---|
| O1 | No discovery and no inbound links | The domain is not returned for "ahmadsaad.dev" or "site:ahmadsaad.dev". No third-party page linking to it was found. The GitHub profile has 2 followers. | **Owner action:** (1) In Google Search Console, add a Domain property for ahmadsaad.dev and verify it with the DNS TXT record in Cloudflare DNS. (2) Submit https://ahmadsaad.dev/sitemap.xml. (3) Use URL Inspection, then Request indexing, for `/`, `/about` and `/projects`. (4) In Bing Webmaster Tools, choose "Import from Google Search Console", then submit the sitemap. (5) In the Cloudflare dashboard, enable Crawler Hints (IndexNow). (6) Recheck "site:ahmadsaad.dev" in Google and Bing after 7 to 14 days. |
| O2 | The strongest institutional source does not link and uses a different name form | aus.edu/node/126616 (22 June 2026) profiles "Ahmad Atef Saad" with 4 quotes and links nowhere personal. | **Owner action:** email AUS Office of Communications (or the article's author) asking them to add "Portfolio: https://ahmadsaad.dev" to the article, or a link on his name. Ask the CITL AI Hub team to list him on aihub.aus.edu with a link. Ask the Tau Beta Pi UAE Alpha chapter and the IEEE SSCS AUS chapter pages to list officers with links. |
| O3 | The GitHub profile is stale, contradicts the site, and does not rank for "ahmad saad github" | API: company null, hireable null, blog "ahmadsaad.dev" (no scheme). The README says he is currently at Samsung and names a model-library term the copy rules ban. github.com/ahm-adsaad is absent from "ahmad saad github". | **Owner action:** (1) In GitHub Settings > Profile, set Company to "American University of Sharjah", Website to "https://ahmadsaad.dev" and Location to "Sharjah, United Arab Emirates", and tick "Available for hire". (2) Rewrite the README to match the site: past tense for Samsung ("Previously AI/ML Engineer at Samsung Gulf Electronics, 06.2026 to 08.2026"), the "measurement decides, LLMs describe" description, and no banned terms. Add a plain-text H1 "Ahmad Saad", because the current name sits only inside an image banner. (3) For each public repo, set the About > Website field to its case study URL, for example https://ahmadsaad.dev/projects/trend-radar. (4) Pin trend-radar, LocalAI, the Mano simulator and portfolio. |
| O4 | LinkedIn is the only indexed self-asset but does not visibly pass people to the site | LinkedIn is #1 for the AUS-qualified query, and the site is absent everywhere. | **Owner action:** set Contact info > Website to https://ahmadsaad.dev (type "Portfolio"). Add a Featured section with ahmadsaad.dev, /projects/trend-radar and /projects/localai. Add the Claude Certified Architect badge under Licenses & certifications with the Credly URL. Make the profile photo visible to "All LinkedIn members" and the public profile fully visible. Use the same headshot file as the site. |
| O5 | The credential is not tied to the name in the index | '"Ahmad Saad" "Claude Certified Architect"' returned no match. The Credly page is a JS shell to fetchers. | **Owner action:** in Credly, confirm the badge and profile are public. Share the badge to LinkedIn (this creates an indexed LinkedIn post that names him). |
| O6 | No independent profiles carry the middle name or a consistent photo | Only LinkedIn is indexed. AUS uses "Ahmad Atef Saad". | **Owner action:** create an ORCID iD (free, fits his research assistant work) listing "Ahmad Atef Saad" as the name, "Ahmad Saad" as also-known-as, AUS employment and education, and the website link. Cross-post one case study to dev.to or Hashnode with a canonical URL pointing to ahmadsaad.dev. Use the same headshot everywhere (GitHub avatar, LinkedIn, Credly, ORCID). |

### 6c. On-site gaps (files in apps/website)

| # | Cause | Evidence | Fix (file) |
|---|---|---|---|
| S1 | AI crawlers blocked at the edge | GPTBot and ClaudeBot get 403 (crawler-access agent's finding). AI answers cannot ground on the site. | Cloudflare dashboard (AI bot rules), not a repo file. Allow at least the AI search crawlers (OAI-SearchBot, Claude-SearchBot, PerplexityBot) and, if desired, GPTBot and ClaudeBot. Keep `app/robots.ts` consistent with that decision. |
| S2 | The hero is a slogan, not an identity | `/` subline: "Forward deployed. Builds the system, ...". The eyebrow "AI Engineer · FDE" uses an abbreviation. | `features/home/components/hero.tsx`: replace the subline with "Ahmad Saad is an AI engineer and Computer Engineering senior at the American University of Sharjah, UAE. Previously AI/ML Engineer at Samsung Gulf Electronics. Available January 2027." Spell the eyebrow out as "AI Engineer, Forward Deployed Engineer". |
| S3 | No face on `/` and text-only og:image | Hero `alt=""`. `/ahmad-saad.jpg` appears only on `/about`. og:image is a gradient text card. | `features/home/components/hero.tsx` or `features/home/components/about-teaser.tsx`: render `/ahmad-saad.jpg` with alt "Ahmad Saad, AI engineer and Computer Engineering student at the American University of Sharjah". `lib/seo/metadata.tsx`: switch the og:image for `/` and `/about` to a card that includes the headshot. |
| S4 | No name variant or third-party links in schema | `sameAs` has only GitHub and LinkedIn. There is no `alternateName` and no `subjectOf`. | `lib/seo/json-ld.tsx`: add `alternateName: ["Ahmad Atef Saad"]` (and his Arabic full name, after the owner confirms the spelling). Add the Credly badge URL to `sameAs`. Add `subjectOf: { "@type": "NewsArticle", "url": "https://www.aus.edu/node/126616", "headline": "AUS engineering student receives competitive Tau Beta Pi Scholarship", "datePublished": "2026-06-22", "publisher": { "@id": "https://ahmadsaad.dev/#org-aus" } }`. Add `award: "Tau Beta Pi Scholarship (2026)"` and `memberOf` Tau Beta Pi (UAE Alpha chapter). Add ORCID to `sameAs` once it exists. |
| S5 | No visible third-party proof or press block | `/about` links only Email and LinkedIn. | `app/about/page.tsx`: add an "Elsewhere" block linking the AUS News article ("Featured in AUS News, June 2026"), aihub.aus.edu, GitHub, LinkedIn and the Credly badge. Add a short "Press bio" with a 50-word and a 100-word version, plus a "Download headshot" link to a high-res file. |
| S6 | GitHub missing from the header nav | Header nav: About, Projects, Email, LinkedIn. | The site header component that renders the Email and LinkedIn nav links (grep for `ahmaddsaad` under `apps/website/components` and `apps/website/features`): add a GitHub link to https://github.com/ahm-adsaad. |
| S7 | No disambiguation for AI answers | `disambiguatingDescription` exists in the schema, but nothing explicit appears in llms.txt. | `lib/llms.ts` (feeds `app/(llms)/llms.txt/route.ts` and `/me/about.md`): add the line "Ahmad Saad (full name Ahmad Atef Saad) is a computer engineer and AI engineer at the American University of Sharjah, UAE. He is not the Egyptian singer Ahmed Saad." |
| S8 | Inconsistent role list | `/about` omits Electro-Mechanical Company and ONBRND, which `/` shows. | `app/about/page.tsx`: add one sentence covering both roles with dates, so every page tells the same story. |
| S9 | Location not near the hero, "AUS" not spelled out in the home title | Home title "Ahmad Saad · AI Engineer in the UAE". | `lib/seo/metadata.tsx`: home title "Ahmad Saad, AI Engineer at American University of Sharjah, UAE" (about 60 characters). `features/home/components/hero.tsx`: add a "Based in Abu Dhabi and Sharjah, UAE" line. |

---

## 7. Realistic ceiling per target

Horizons assume O1 to O4 and S1 to S5 are done within the next 2 weeks. All of this is a judgement from the US-index evidence, not measured Google or UAE positions.

| Target | Realistic ceiling | Horizon | Top levers |
|---|---|---|---|
| T1: #1 organic for "ahmad saad" | **Not realistic.** Best case is page 2 to 3 in UAE Google. Page 1 (bottom half) is possible only with independent press. #1 needs notability comparable to the Wikipedia entities. | Page 2 to 3: 6 to 12 months. Page 1: 18+ months and press-dependent. #1: no realistic horizon | O1, O2, independent press (AUS News follow-ups, Samsung or event coverage), S4 |
| T2: 4+ of 10 page-1 results about him | **Not realistic for the bare name.** Realistic for qualified queries: "ahmad saad american university of sharjah" can show the site, /about, LinkedIn, GitHub and the AUS article (4 to 5 of 10). | Qualified: 2 to 4 months after indexing. Bare name: none | O1, O2, O3, O4, O6 |
| T3: his photo in the top 3 image results | **Low for "ahmad saad"** (singer imagery dominates). **Plausible for "ahmad saad aus" or "ahmad saad american university of sharjah"** if one headshot is used across the site, LinkedIn, GitHub, Credly and ORCID. | Qualified: 3 to 6 months. Bare name: unlikely within 12 months | S3, O4, O6, consistent filename and alt text |
| T4: #1 for "ahmad saad aus", "ahmad saad engineer", "ahmad saad samsung", "ahmad saad github" | "...american university of sharjah": **high** (LinkedIn already #1). "ahmad saad samsung": **high** (only aggregators compete). "ahmad saad aus": **medium** (the AFL footballer holds it; the UAE locale helps). "ahmad saad engineer": **medium-low** (many engineering namesakes). "ahmad saad github": **medium**, but the realistic #1 is his GitHub profile, not the site. | 1 to 3 months (AUS full name, Samsung). 3 to 6 months (aus, github). 6 to 12 months (engineer) | O1, O3, S2, S9 |
| T5: own Knowledge Panel | **Low to medium.** It needs a consistent entity hub (the site), several independent corroborating sources (AUS, employer, press, ORCID) and steady searches for his name. Students rarely get one before a public role or press. | 12 to 24+ months | S4, O2, O6, press mentions, a later employer bio page linking to the site |

---

## 8. Top 5 fixes ranked by impact over effort

1. **Get indexed (O1).** Verify the site in Search Console and Bing Webmaster Tools, submit the sitemap, request indexing for `/` and `/about`, and enable IndexNow via Cloudflare Crawler Hints. About 30 minutes. This unblocks every other target.
2. **Turn existing profiles into inbound links that agree with the site (O3 and O4).** GitHub: Website with https, Company, plain-text H1, README rewritten to match the site with no banned terms, and repo About links to each case study. LinkedIn: Website field and Featured section. About 1 to 2 hours, for 5 to 10 links from high-authority domains.
3. **Use the AUS article (O2 and S4).** Ask AUS to add a link. Add `alternateName` "Ahmad Atef Saad" and `subjectOf` for the article in `lib/seo/json-ld.tsx`, and link the article from `/about` (`app/about/page.tsx`). One email and about 30 minutes of code.
4. **Make `/` read as a person profile (S2, S3, S9).** Put an identity sentence and the headshot above the fold (`features/home/components/hero.tsx`), use a face-based og:image and an AUS-explicit title (`lib/seo/metadata.tsx`). About 1 to 2 hours.
5. **Let AI answer engines in and tell them who he is (S1 and S7).** Allow AI search crawlers in Cloudflare and add the disambiguation line to `lib/llms.ts`. About 30 minutes. This is the only path to AI-answer visibility.

---

## Sources

- https://en.wikipedia.org/wiki/Ahmad_Sa%27d
- https://en.wikipedia.org/wiki/Ahmed_Saad_(singer)
- https://en.wikipedia.org/wiki/Ahmad_Saad
- https://en.wikipedia.org/wiki/Ahmed_Saad
- https://en.wikipedia.org/wiki/Ahmed_Saad_(Australian_footballer)
- https://www.wikipedia.com/wiki/Ahmed_Saad_(weightlifter)
- https://www.afl.com.au/news/453146/on-the-rise-ahmed-saad
- https://www.eventimapollo.com/events/ahmed-saad
- https://www.rankless.org/authors/ahmed-saad-3
- https://simplyislam.sg/our-scholars/shaykh-ahmad-saad/
- https://theorg.com/org/zamil-air-conditioners/org-chart/ahmad-saad
- https://village.ai/person/ahmad-saad-MjY3Mzg1MzE
- https://ae.linkedin.com/in/ahmaddsaad
- https://ae.linkedin.com/in/abuelnour
- https://www.aus.edu/node/126616
- https://www.aus.edu/node/105696
- https://www.bain.com/ko/our-team/ahmed-saad/
- https://ahmedsaad.vercel.app
- https://ahmed-saad-portfolio.pages.dev/assets/Ahmed_Saad_Resume.pdf
- https://github.com/ahmedsaad123456
- https://github.com/AhmedSaadi0
- https://Www.GitHub.com/louisgv/local.ai
- https://github.com/j33l/BrowserAI
- https://jobs.thrivecap.com/companies/openai/jobs/83378167-forward-deployed-engineer-uae
- https://api.github.com/users/ahm-adsaad
- https://raw.githubusercontent.com/ahm-adsaad/ahm-adsaad/main/README.md
- https://www.credly.com/badges/976e4176-241f-4870-83ea-c66f896f64ff (JS shell; details not verifiable)
- https://www.bing.com/search?q=site%3Aahmadsaad.dev (empty page; inconclusive)
- https://html.duckduckgo.com/html/?q=site%3Aahmadsaad.dev (bot challenge; blocked)
- https://ahmadsaad.dev/ , https://ahmadsaad.dev/about , https://ahmadsaad.dev/projects/trend-radar (fetched with the claude-seo renderer in rendered mode and with curl -A "Mozilla/5.0" on 2026-10-30)
