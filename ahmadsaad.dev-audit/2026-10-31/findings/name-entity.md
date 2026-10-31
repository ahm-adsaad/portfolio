# Name and AUS entity coverage: ahmadsaad.dev

Agent: name-entity diagnosis. Date: 2026-10-31. Live fetch of every indexable URL plus the agent endpoints, read against the repo at main (cd4ee5a). Read only; nothing in the repo was changed.

Target entities:
- (A) the full name "Ahmad Atef Saad", the form the American University of Sharjah publishes. Verified live: the AUS News article (2026-06-22) opens "When Ahmad Atef Saad talks about engineering..." in its body, meta description and og:description.
- (B) Ahmad paired with "AUS" / "American University of Sharjah".

## Score: 46 / 100 for name and AUS entity coverage

| Check | Points | Score | Why |
|---|---|---|---|
| A1. Full name in schema on the entity home | 10 | 7 | Person.alternateName "Ahmad Atef Saad" on / (app/page.tsx:97). No `additionalName: "Atef"`; hardcoded literal. |
| A2. Full name in schema on subpages | 5 | 0 | personStub (lib/seo/project-schema.ts:18) carries only `name`. /about, /projects and 4 case studies have 0 hits. |
| A3. Full name in visible HTML | 15 | 0 | 0 visible occurrences on all 7 HTML pages. |
| A4. Full name in title, meta, OG, alt, caption | 10 | 0 | 0 on every page. Headshot alt and ImageObject caption are "Ahmad Saad". |
| A5. Full name in agent endpoints | 10 | 6 | Present once per file as a key fact (llms.txt line 7, llms-full.txt line 9, about.md line 9). Not in the blockquote or the definition sentence. /me/experience.md and /me/projects.md never name Ahmad at all. |
| B1. AUS in title and meta of / and /about | 10 | 7 | / meta has "AUS"; /about title "AUS" and meta spelled out. / title has neither. |
| B2. AUS prominence on / | 10 | 6 | Hero eyebrow says "Sharjah, UAE", not AUS. First AUS at about word 85 (definition paragraph). Two H3s say "American University of Sharjah". |
| B3. AUS in first sentence of /about and /projects | 10 | 10 | Both lead with "Computer Engineering senior at the American University of Sharjah". |
| B4. AUS on case studies | 10 | 0 | 0 occurrences of AUS, Sharjah or the university on all 4 project pages (page, schema, OG). |
| B5. AUS in schema | 10 | 10 | CollegeOrUniversity node, alumniOf, affiliation, memberOf, awards, NewsArticle publisher. Gaps (no alternateName "AUS", no sameAs) cost little here and are listed under Proposals. |
| **Total** | **100** | **46** | Pairing B is solid on / and /about and missing elsewhere. The full name A lives in schema and agent key facts only, so for a "Ahmad Atef Saad" query the site offers search engines no visible text to match. |

## Page table (live, 2026-10-31)

Method: curl of each URL with a desktop Chrome user agent, parsed with Python html.parser. "Visible" text strips script, style, noscript and template, so JSON-LD and the RSC flight payload are excluded. The separator in titles is U+00B7 middle dot, not a dash.

| URL | title | meta description | og:title / og:image text | H1 | H2 | img alt | canonical |
|---|---|---|---|---|---|---|---|
| / | Ahmad Saad · AI Engineer in the UAE (35) | Ahmad Saad is an AI engineer and forward deployed engineer in the UAE. Computer Engineering senior at AUS, Golden Visa holder, available January 2027. (150) | og:title = title. Card: "Ahmad Saad" / "AI Engineer · American University of Sharjah" + round headshot | Ahmad Saad (two spans) | Forward Deployed; Experience; Projects; Education; Stack; GitHub; Let's Talk. | headshot "Ahmad Saad"; 5 covers "X, a project by Ahmad Saad"; badge "Claude Certified Architect: Foundations, issued by Anthropic"; video poster "" | https://ahmadsaad.dev |
| /about | About Ahmad Saad \| AI Engineer, AUS Computer Engineering (56) | Ahmad Saad, an AI engineer and Computer Engineering senior at the American University of Sharjah, formerly at Samsung Gulf Electronics. Available January 2027. (159) | og:title = title. Card: "About Ahmad Saad" / "AI Engineer · Sharjah, UAE" | Ahmad Saad (two spans) | Education; Experience; What I build; What's next | headshot "Ahmad Saad"; badge; poster "" | /about |
| /projects | Projects by Ahmad Saad (22) | Case studies by Ahmad Saad: a production trend-detection platform, on-device RAG in the browser, a CPU simulator, and an energy harvesting sensor node. (151) | Card: "Projects by Ahmad Saad" / "AI systems, hardware, and architecture" | Projects by Ahmad Saad | Projects | 5 covers "X, a project by Ahmad Saad" | /projects |
| /projects/trend-radar | Trend Radar: Production TikTok Trend Detection \| Ahmad Saad (59) | Trend Radar by Ahmad Saad: a production TikTok trend-detection platform where measurement decides and LLMs describe, with cost governance and 315 tests. (152) | Card: "Trend Radar" / "A project by Ahmad Saad" | Trend Radar | Overview; Problem; Approach; Architecture; This repository; My role | "Trend Radar, a project by Ahmad Saad" | /projects/trend-radar |
| /projects/localai | LocalAI: Private AI for Company Documents \| Ahmad Saad (54) | LocalAI by Ahmad Saad: private AI for company documents that runs entirely in the browser, with page-level citations and a Playwright privacy audit. (148) | Card: "LocalAI" / "A project by Ahmad Saad" | LocalAI | Overview; The problem I found; What I did about it; What I built; How I measured it; Stack; My role | "LocalAI, a project by Ahmad Saad" | /projects/localai |
| /projects/mano-computer-simulator | Mano Basic Computer Simulator in Python \| Ahmad Saad (52) | Ahmad Saad's cycle-accurate simulator of Mano's Basic Computer in Python, with full ISA support, micro-operation control, and a CLI debugger. (141) | Card: "Mano Basic Computer Simulator" / "A project by Ahmad Saad" | Mano Basic Computer Simulator | Overview; Problem; Approach; Architecture; Why cycle accuracy; My role | "Mano Basic Computer Simulator, a project by Ahmad Saad" | /projects/mano-computer-simulator |
| /projects/lorawan-sensor-node | Energy Harvesting LoRaWAN Sensor Node PCB \| Ahmad Saad (54) | Ahmad Saad's custom 2-layer PCB for an energy harvesting LoRaWAN sensor node: ATMEGA4809 MCU, LoRa radio, AEM10330 PMIC and PPK2 current profiling. (147) | Card: "Energy Harvesting LoRaWAN Sensor Node" / "A project by Ahmad Saad" | Energy Harvesting LoRaWAN Sensor Node | Overview; Problem; Approach; Architecture; Why measure; Process; My role | "Energy Harvesting LoRaWAN Sensor Node, a project by Ahmad Saad" | /projects/lorawan-sensor-node |

Note: the / canonical is emitted without a trailing slash while every schema `url` uses "https://ahmadsaad.dev/". Both resolve to the same URL, so this is a consistency nit for the technical agent, not an entity problem.

First 60 words of visible main text (breadcrumb and eyebrow included, since crawlers see them first):

- /: "AI Engineer · Sharjah, UAE Ahmad Saad Forward deployed. Builds the system, scopes it with the people who use it, ships it. Email LinkedIn CV Scroll I build systems that have to prove they work. An AI pipeline, a CPU, a circuit board. About Available January 2027 Forward Deployed Ahmad Saad is an AI engineer and forward deployed engineer based ..." AUS first appears at about word 85.
- /about: "Home About About Ahmad Saad I'm Ahmad Saad, a Computer Engineering senior at the American University of Sharjah in the United Arab Emirates, and I build production AI systems. My work centers on applied AI: ..."
- /projects: "Home Projects AI systems, embedded hardware, and computer architecture Projects by Ahmad Saad Case studies by Ahmad Saad, an AI engineer and Computer Engineering senior at the American University of Sharjah: two AI systems, ..."
- /projects/trend-radar: "Home Projects Trend Radar 01 Trend Radar Built by Ahmad Saad · 06.2026 - 08.2026 Production TikTok trend-detection platform where measurement decides and LLMs describe. Source on GitHub Overview 7 tools Impact An estimated $60K ..."
- /projects/localai: "Home Projects LocalAI 02 LocalAI Built by Ahmad Saad · 08.2026 - Present Private AI for company documents that runs entirely in the browser, ..."
- /projects/mano-computer-simulator: "Home Projects Mano Basic Computer Simulator 03 Mano Basic Computer Simulator Built by Ahmad Saad · 2025 Cycle-accurate CPU simulator of Mano's Basic Computer ..."
- /projects/lorawan-sensor-node: "Home Projects Energy Harvesting LoRaWAN Sensor Node 04 Energy Harvesting LoRaWAN Sensor Node Built by Ahmad Saad · 2026 Custom 2-layer PCB ..."

### (a) Where "Ahmad Atef Saad" appears

| URL | title | meta | visible text | schema | img alt | OG |
|---|---|---|---|---|---|---|
| / | no | no | no | yes, 1 (Person.alternateName). The second raw hit is the same JSON-LD serialized again inside the RSC flight payload. | no | no |
| /about | no | no | no | no (personStub has no alternateName) | no | no |
| /projects | no | no | no | no | no | no |
| /projects/trend-radar | no | no | no | no | no | no |
| /projects/localai | no | no | no | no | no | no |
| /projects/mano-computer-simulator | no | no | no | no | no | no |
| /projects/lorawan-sensor-node | no | no | no | no | no | no |
| /llms.txt | n/a | n/a | yes, line 7 (first key fact) | n/a | n/a | n/a |
| /llms-full.txt | n/a | n/a | yes, line 9 (first key fact) | n/a | n/a | n/a |
| /me/about.md | n/a | n/a | yes, line 9 (first key fact) | n/a | n/a | n/a |
| /me/experience.md, /me/projects.md | n/a | n/a | no (and "Ahmad" appears 0 times in either file) | n/a | n/a | n/a |

The coordinator baseline is confirmed: on / the string appears exactly twice in the raw HTML, once in the ld+json script and once in the RSC copy of the same object.

### (b) Where "AUS" / "American University of Sharjah" appears

| URL | title | meta | H1 / H2 | first paragraph |
|---|---|---|---|---|
| / | no | yes ("AUS") | no. Only two H3s: the AUS ledger row and the Education school name, both "American University of Sharjah". | Hero: no (eyebrow is "Sharjah, UAE"). About definition paragraph: yes, sentence 2. |
| /about | yes ("AUS") | yes (spelled out) | no | yes, sentence 1 |
| /projects | no | no | no | yes, sentence 1 |
| /projects/trend-radar | no | no | no | no (0 on page) |
| /projects/localai | no | no | no | no (0 on page) |
| /projects/mano-computer-simulator | no | no | no | no (0 on page) |
| /projects/lorawan-sensor-node | no | no | no | no (0 on page) |
| /llms.txt | n/a | n/a | n/a | yes, line 3 (blockquote) |
| /llms-full.txt | n/a | n/a | n/a | yes, line 3 (blockquote) |
| /me/about.md | n/a | n/a | n/a | yes, line 5 (definition). Lines 1 to 3 have neither entity. |

Raw-count note: the coordinator saw "American University of Sharjah" 20 times and AUS about 25 times in the / HTML. I count 20 and 18 (word-boundary, case-sensitive AUS). Raw counts roughly double the real figure because the RSC flight payload repeats both the JSON-LD and the rendered text. Visible counts (3 and 2 on /) are what matter for density.

## Emission map

Where the name and the university are written today, so the planner knows which constants to change. Line numbers are at cd4ee5a.

### Name ("Ahmad Saad", "Ahmad", "Saad", "Ahmad Atef Saad")

| File:line | What it emits | Reaches |
|---|---|---|
| apps/website/config/user.ts:35-37 | firstName, lastName, name | Everything below that reads USER |
| apps/website/config/user.ts:46 | USER.description ("Ahmad Saad is an AI engineer...") | Person.description (/), llms.txt line 3, llms-full.txt line 3 |
| apps/website/config/user.ts:48 | USER.metaDescription | / meta, og:description, WebSite.description, ProfilePage.description |
| apps/website/config/user.ts:65 | headshot file name ahmad-saad.jpg | Person.image, OG card fetch layer, sitemap image |
| apps/website/config/about.ts:12 | ABOUT_INTRO (first person, "I'm Ahmad Saad") | /about intro |
| apps/website/config/about.ts:20 | PROFILE_DEFINITION ("Ahmad Saad is...") | / About block, llms-full.txt, /me/about.md |
| apps/website/config/about.ts:59 | comment naming "Ahmad Atef Saad" | nothing (comment) |
| apps/website/config/about.ts:75 | LLMS_KEY_FACTS[0], the only text emission of "Ahmad Atef Saad" (hardcoded) | llms.txt, llms-full.txt, /me/about.md |
| apps/website/config/about.ts:83 | Name note (disambiguation from Ahmed Saad) | same three endpoints |
| apps/website/config/projects.ts:57, 111, 172, 213 | seoDescription strings with hardcoded "Ahmad Saad" | case study meta and og:description |
| apps/website/lib/seo/metadata.tsx:17-22 | applicationName, author.name, publisher hardcoded 'Ahmad Saad' (not USER.name) | title suffix, application-name, author, publisher meta on every page |
| apps/website/lib/seo/project-schema.ts:18-23 | personStub: name only | Person node on /about, /projects, 4 case studies |
| apps/website/lib/seo/project-schema.ts:26-31 | websiteStub name | WebSite node on subpages |
| apps/website/app/layout.tsx:26-38 | title template, default og:title, siteName, default OG card, OG alt | fallback for every page |
| apps/website/app/page.tsx:28 | HOME_TITLE | / title, og:title, ProfilePage.name |
| apps/website/app/page.tsx:32-35 | OG card title USER.name | / share card |
| apps/website/app/page.tsx:58 | HEADSHOT.caption = USER.name | ImageObject on / |
| apps/website/app/page.tsx:96-99 | Person name, alternateName 'Ahmad Atef Saad' (hardcoded literal), givenName, familyName | / schema |
| apps/website/app/page.tsx:178, 187 | WebSite.name, ProfilePage.name | / schema |
| apps/website/app/about/page.tsx:26, 28 | TITLE, DESCRIPTION | /about title, meta, OG, AboutPage schema |
| apps/website/app/about/page.tsx:37 | OG card title "About Ahmad Saad" | /about share card |
| apps/website/app/about/page.tsx:62 | primaryImageOfPage caption USER.name | /about schema |
| apps/website/app/about/page.tsx:137-140 | H1 spans firstName / lastName | /about H1 |
| apps/website/app/projects/page.tsx:23, 25 | TITLE, DESCRIPTION (hardcoded name) | /projects |
| apps/website/app/projects/page.tsx:114, 124 | H1 "by Ahmad Saad", intro (hardcoded) | /projects |
| apps/website/app/projects/[id]/page.tsx:58 | OG card meta "A project by Ahmad Saad" | 4 case study cards |
| apps/website/app/projects/[id]/page.tsx:176-183 | "Built by Ahmad Saad" link to /about | 4 case studies |
| apps/website/app/projects/[id]/page.tsx:303-305 | "About Ahmad Saad" link | 4 case studies |
| apps/website/components/headshot.tsx:30 | alt={USER.name} | / and /about headshot |
| apps/website/components/project-cover.tsx:26 | "X, a project by Ahmad Saad" | every cover |
| apps/website/components/site-nav.tsx:23-24 | home link text and aria-label | every page |
| apps/website/components/site-footer.tsx:14, 47 | copyright line, aria-hidden wordmark | every page |
| apps/website/features/home/components/hero.tsx:36-41 | H1 spans firstName / lastName | / H1 |
| apps/website/features/home/components/about-teaser.tsx:49 | "More about Ahmad Saad" (hardcoded) | / |
| apps/website/app/(llms)/llms.txt/route.ts:19, 21, 25, 35 | H1, blockquote (USER.description), key facts, About link | /llms.txt |
| apps/website/app/(llms)/llms-full.txt/route.ts:17, 19 | H1, blockquote | /llms-full.txt |
| apps/website/app/(llms)/me/about.md/route.ts:8 | H1 "About Ahmad Saad" | /me/about.md |
| apps/website/app/(llms)/me/experience.md/route.ts:3 | H1 "Experience" (no name) | /me/experience.md |
| apps/website/app/(llms)/me/projects.md/route.ts:3 | H1 "Projects" (no name) | /me/projects.md |

### University ("American University of Sharjah", "AUS", "Sharjah")

| File:line | What it emits | Reaches |
|---|---|---|
| apps/website/config/education.ts:2-4 | school, url, city | CollegeOrUniversity node, / Education H3 link (features/home/components/education.tsx:40), /me/about.md and llms-full Education heading |
| apps/website/config/experience.ts:137-139 | AUS employer name, url, city | / ledger H3, experience.md headings |
| apps/website/config/experience.ts:162 | "used by AUS faculty" | / ledger, experience.md |
| apps/website/config/user.ts:44 | location "Abu Dhabi / Sharjah" | not rendered in HTML today |
| apps/website/config/user.ts:46 | "(AUS)" in USER.description | Person.description, llms blockquotes |
| apps/website/config/user.ts:48 | "senior at AUS" in metaDescription | / meta, OG, WebSite and ProfilePage descriptions |
| apps/website/config/about.ts:12 | ABOUT_INTRO, spelled out | /about first sentence |
| apps/website/config/about.ts:20 | PROFILE_DEFINITION "(AUS)" | / About block, agent endpoints |
| apps/website/config/about.ts:26, 33 | "at AUS" in Education and Experience paragraphs | /about |
| apps/website/config/about.ts:62-65 | PRESS_MENTIONS outlet "AUS News", headline, URL | /about press line, / subjectOf |
| apps/website/config/about.ts:75, 78, 80 | key facts naming AUS | agent endpoints |
| apps/website/app/page.tsx:34 | OG card meta "AI Engineer · American University of Sharjah" | / share card |
| apps/website/app/page.tsx:87-91 | CollegeOrUniversity node (name, url only) | / schema |
| apps/website/app/page.tsx:106 | disambiguatingDescription (hardcoded) | / schema |
| apps/website/app/page.tsx:109-110 | alumniOf, affiliation | / schema |
| apps/website/app/page.tsx:125, 129-131 | memberOf and award strings (hardcoded) | / schema |
| apps/website/app/page.tsx:139 | NewsArticle publisher AUS | / schema |
| apps/website/app/about/page.tsx:26, 28 | "AUS" in TITLE, spelled out in DESCRIPTION | /about |
| apps/website/app/about/page.tsx:38 | OG card meta "AI Engineer · Sharjah, UAE" (no AUS) | /about share card |
| apps/website/app/projects/page.tsx:124-125 | intro, spelled out (hardcoded) | /projects |
| apps/website/features/home/components/hero.tsx:32 | eyebrow "AI Engineer · Sharjah, UAE" (hardcoded, no AUS) | / hero |
| (none) | app/projects/[id]/page.tsx and config/projects.ts emit no university string | 4 case studies have 0 |

### Single-source-of-truth gap

There is no `USER.fullName`, `USER.middleName` or alternate-names field. "Ahmad Atef Saad" is typed by hand in two live places (app/page.tsx:97, config/about.ts:75) plus a comment (config/about.ts:59). lib/seo/metadata.tsx:17-22, features/home/components/about-teaser.tsx:49, app/projects/page.tsx:25 and 124, and the four seoDescription strings also hardcode "Ahmad Saad" instead of reading USER.name. EDUCATION has no short-name field for "AUS".

Adding the field means touching:

1. apps/website/config/user.ts: add `middleName: string` and `fullName: string` to the `User` type (lines 3-32) and set `middleName: 'Atef'`, `fullName: 'Ahmad Atef Saad'`. Declare `const FULL_NAME = 'Ahmad Atef Saad'` above the literal if `description` (line 46) should template it.
2. apps/website/app/page.tsx:97: `alternateName: USER.fullName`, and add `additionalName: USER.middleName` (the schema.org property for a middle name).
3. apps/website/lib/seo/project-schema.ts:18-23: add `alternateName: USER.fullName` to personStub so /about, /projects and every case study carry the full name in schema.
4. apps/website/config/about.ts:75 (and the comment at 59): template from USER.fullName. about.ts does not import user.ts today. Importing it is safe: user.ts imports only experience.ts, so no cycle.
5. apps/website/components/headshot.tsx:30, app/page.tsx:58, app/about/page.tsx:62: alt and caption (see Image proposals).
6. apps/website/features/home/components/hero.tsx: new byline line (see Proposals).
7. apps/website/app/(llms)/me/about.md/route.ts, me/experience.md/route.ts, me/projects.md/route.ts: headers (see Agent endpoint rewrites).
8. Optional consistency: lib/seo/metadata.tsx:17-22 and about-teaser.tsx:49 should read USER.name.
9. apps/website/config/education.ts: add `shortName: 'AUS'` and `sameAs: ['https://en.wikipedia.org/wiki/American_University_of_Sharjah', 'https://www.wikidata.org/wiki/Q4115992']` (Wikidata Q4115992 confirmed via the Wikidata API as "university in the United Arab Emirates"; the Wikipedia URL returns 200). Use them in app/page.tsx:87-91 as `alternateName` and `sameAs` on the CollegeOrUniversity node.

The repo has no unit or e2e tests that assert these strings, so no test needs updating.

## Proposals per page

Every string below was checked for the content rules: no em or en dashes, no banned model-library term, no vendor names, no scraping language, no Samsung near Trend Radar, and the $60K and 20% figures stay estimates. The middle dot (·) is already used in live titles and is not a dash. Character counts include spaces.

### / (homepage)

Title candidates (current: "Ahmad Saad · AI Engineer in the UAE", 35):

| # | Candidate | Chars | Verdict |
|---|---|---|---|
| 1 | Ahmad Saad (Ahmad Atef Saad) · AI Engineer, AUS | 47 | Both entities. But "AI Engineer, AUS" reads as if AUS employs him as an AI engineer, AUS alone can be read as Australia, and it drops UAE. |
| 2 | Ahmad Saad (Ahmad Atef Saad) · AI Engineer · AUS, UAE | 53 | **Pick.** Name first, exact AUS spelling of the full name, role, and AUS disambiguated by UAE. Fits under 60 with room for pixel width. |
| 3 | Ahmad Saad · AI Engineer, American University of Sharjah | 56 | Strong B, but no A. Use it if the owner rejects the parenthetical. |
| 4 | Ahmad Saad (Ahmad Atef Saad) · AI Engineer in the UAE | 53 | Strong A and keeps the current geo phrase, but no AUS. |
| 5 | Ahmad Atef Saad · AI Engineer, AUS Computer Engineering | 55 | Rejected: loses the exact "Ahmad Saad" bigram at position 0, which is the page's primary query. |

Meta description, pick (157): "Ahmad Saad is an AI and forward deployed engineer in the UAE and a Computer Engineering senior at the American University of Sharjah. Available January 2027."
- Alternative (149): "Ahmad Saad is an AI engineer and forward deployed engineer in the UAE, and a Computer Engineering senior at the American University of Sharjah (AUS)."
- The title carries the full name and "AUS". The meta spells the university out, so the two complement each other without repeating the alias.

H1: unchanged (two spans "Ahmad" "Saad"). It is the design anchor, and the exact display name is right for the H1.

Hero eyebrow (hero.tsx:32), next to the 56 px headshot: change "AI Engineer · Sharjah, UAE" to "AI Engineer · UAE" (17). This stops "Sharjah" from appearing twice in the hero once the byline is added.

New hero byline: a `<p className="mono-label ...">` between the H1 and the tagline, styled like the "Built by" line on case studies (text-bone/56, mt-5). It is not part of the H1.
- Pick (71): "Ahmad Atef Saad · Computer Engineering · American University of Sharjah"
- Compact fallback if the designer wants one line on phones (43): "Ahmad Atef Saad · Computer Engineering, AUS"
- Design notes: at 375 px the 71-character version wraps to two mono lines, which is acceptable for a label. Shift the tagline and pills down one stagger step. The LCP element stays the H1 text, and nothing new is fetched.

About-teaser H2 "Forward Deployed": unchanged. It is a design headline, and forcing AUS into it would read as stuffing.

Definition paragraph (config/about.ts:20, third person), first sentence (151): "Ahmad Saad, full name Ahmad Atef Saad, is an AI engineer and forward deployed engineer based between Abu Dhabi and Sharjah in the United Arab Emirates."
- Keep sentence 2 as is ("He is a Computer Engineering senior at the American University of Sharjah (AUS), where he holds a 3.96 GPA, is President of the Tau Beta Pi chapter, and graduates in December 2026.").
- Keep the Samsung sentence as is. It never names Trend Radar, and this proposal adds no link from it.
- This is the visible "also published as" line for the homepage. "Full name" reads more naturally than "also published as" for a person, and an "X, full name Y, is a Z" sentence quotes well on its own.

Education section (features/home/components/education.tsx and config/education.ts:8-12): add a highlight "Tau Beta Pi Scholarship (2026), covered by AUS News", with "covered by AUS News" linking to the AUS article. Today the scholarship that AUS News wrote about is not visible anywhere on / (it is only in schema `award`). The link also gives / an outbound citation to the one third-party page that uses the full name.

Schema (app/page.tsx):
- Person: `additionalName: 'Atef'`.
- CollegeOrUniversity: `alternateName: 'AUS'` and `sameAs` (Wikipedia, Wikidata Q4115992).
- HEADSHOT.caption: see Image proposals.
- ProfilePage.name follows HOME_TITLE automatically.

### /about

Title: keep "About Ahmad Saad | AI Engineer, AUS Computer Engineering" (56). It already pairs the name with AUS. Two alternatives fail: "About Ahmad Atef Saad | AI Engineer, AUS Computer Engineering" is 61 and "About Ahmad Saad (Ahmad Atef Saad) | AUS Computer Engineering" is 61, both over the cap. The homepage title owns the full name.

Meta description (153): "Ahmad Saad (Ahmad Atef Saad), an AI engineer and Computer Engineering senior at the American University of Sharjah, formerly at Samsung Gulf Electronics."
- This drops "Available January 2027." to make room. Availability stays in the body copy.

H1: unchanged (two spans). Eyebrow "About": unchanged.

H2s: unchanged. Optional: "Education" becomes "Education at AUS" (16). If the planner takes this, change the paragraph opener to "I study Computer Engineering at the American University of Sharjah" so the paragraph does not echo the H2. The section id changes from about-education to about-education-at-aus; nothing in the repo links to that fragment.

Intro, first sentence (config/about.ts:12, first person, 153): "I'm Ahmad Saad, a Computer Engineering senior at the American University of Sharjah (AUS) in the United Arab Emirates, and I build production AI systems."
- The only change is "(AUS)". It introduces the acronym the later paragraphs use.

Education paragraph (config/about.ts:26), the visible "also published as" sentence in first person. Insert after the President sentence: "In 2026 I received the Tau Beta Pi Scholarship, and AUS News covered the award under my full name, Ahmad Atef Saad."
- Link "AUS News covered the award" to the AUS article.
- Keep the bottom press line as it is. It scales to future mentions, and a second link to the same URL is harmless.

"What I build" paragraph (config/about.ts:39): see Internal anchor proposals.

OG card meta (app/about/page.tsx:38): change "AI Engineer · Sharjah, UAE" to "Ahmad Atef Saad · AUS Computer Engineering" (42; the live home card fits 44 characters on one line).

Schema: personStub gains alternateName (Emission map step 3). primaryImageOfPage.caption follows Image proposals.

### /projects

Title (48): "Projects by Ahmad Saad, AUS Computer Engineering". The current 22-character title wastes the slot.

Meta description (153): "Case studies by Ahmad Saad, Computer Engineering at AUS: a production trend-detection platform, private in-browser AI, a CPU simulator and a sensor node."

H1: keep "Projects by Ahmad Saad". Eyebrow: keep.

Intro first sentence: add "(AUS)" after "American University of Sharjah". No other change.

### Case studies (all four)

Titles: keep all four (59, 54, 52, 54 chars). None has room for AUS under 60, and AUS is not the query intent for a project page.

Byline "Built by Ahmad Saad · period": keep.

New author line, replacing the "About Ahmad Saad" link at app/projects/[id]/page.tsx:303-305 so the visible name count does not rise (third person, 105): "Ahmad Saad is an AI engineer and Computer Engineering senior at the American University of Sharjah (AUS)."
- "Ahmad Saad" becomes the link to /about. Keep "All projects" beside it.
- This gives every case study one natural AUS pairing. It describes the author and makes no claim that the project was AUS work.

Meta descriptions:
- Trend Radar: keep. Do not add AUS: the project was not university work, and the page must stay free of any employer reference.
- LocalAI: keep.
- Mano (150): "Cycle-accurate Mano Basic Computer simulator in Python by Ahmad Saad, a Computer Engineering student at AUS, with full ISA support and a CLI debugger."
- LoRaWAN (149): "Energy harvesting LoRaWAN sensor node on a custom 2-layer PCB by Ahmad Saad, a Computer Engineering student at AUS: ATMEGA4809 MCU and AEM10330 PMIC."
- Owner question: were Mano and the LoRaWAN node built for AUS courses (for example Computer Architecture)? If yes, a "My role" sentence such as "I built it for the Computer Architecture course at AUS." is a stronger and natural pairing. If not confirmed, do not imply it.

H1 and H2: unchanged on all four.

## Internal anchor proposals

Current internal anchors (deduplicated, live):

| Where | Anchor text | Target |
|---|---|---|
| Nav, every page | "Ahmad Saad" (aria-label "Ahmad Saad, home") | / |
| Nav, every page | "About", "Projects" | /about, /projects |
| Footer, every page | "About", "Projects", "llms.txt" | /about, /projects, /llms.txt |
| Breadcrumb, subpages | "Home", "Projects" | /, /projects |
| / About teaser | "More about Ahmad Saad" | /about |
| / and /projects cards | "Read the {Project} case study" (project name in sr-only span) | /projects/{id} |
| / project section | "All projects" | /projects |
| /about closing block | "project case studies", "homepage" | /projects, / |
| Case studies | "Ahmad Saad" (Built by), "About Ahmad Saad", "All projects", pager "Previous/Next {Project}" | /about, /projects, siblings |

Proposals:
1. /about "What I build" (config/about.ts:39): link project names in context.
   - "LocalAI" to /projects/localai.
   - "a cycle-accurate simulator of Mano's Basic Computer" to /projects/mano-computer-simulator.
   - "a custom PCB for an energy harvesting LoRaWAN sensor node" to /projects/lorawan-sensor-node.

   These are the only project-name anchors on the entity's own page. config/about.ts paragraphs are plain strings today, so this needs a small renderer change (Markdown or a link map).
2. /about Experience paragraph: do NOT link "a production trend intelligence platform" to /projects/trend-radar. That link would tie Trend Radar to Samsung.
3. / Education: the new "covered by AUS News" outbound link (see above).
4. /about Education: the new "AUS News covered the award" outbound link (see above).
5. Case studies: the author line's "Ahmad Saad" link to /about replaces "About Ahmad Saad". The anchor is still the name, now inside an AUS sentence.
6. Keep "More about Ahmad Saad". Do not change it to "Ahmad Saad at AUS": /about is not an AUS page, and that anchor reads as forced.
7. Nav, footer, breadcrumbs: no change. Putting the full name or AUS into site-wide anchors is the over-optimisation path, because it repeats on every page.
8. Project cards: keep "Read the {Project} case study". Do not add the owner's name to the sr-only span.

## Image and alt proposals

| Asset | File | Current alt / caption | Proposal |
|---|---|---|---|
| Headshot (/ hero 56 px, /about 160 px) | /ahmad-saad.jpg, /ahmad-saad.webp, /ahmad-saad-320.webp | alt "Ahmad Saad"; schema caption "Ahmad Saad" on / and /about | alt (40): "Headshot of Ahmad Saad (Ahmad Atef Saad)". ImageObject caption (112): "Ahmad Saad (Ahmad Atef Saad), AI engineer and Computer Engineering student at the American University of Sharjah". Keep the file name: it matches the LinkedIn and GitHub avatar, the OG fetch layer and the sitemap, and renaming would reset image indexing. |
| Project covers | /projects/{id}.jpg | "{Project}, a project by Ahmad Saad" | Keep. No full name or AUS on covers: five more alias hits per page would be stuffing. |
| Credential badge | /credentials/claude-certified-architect.png | "Claude Certified Architect: Foundations, issued by Anthropic" | Keep. |
| Hero video poster | /about/drive-poster.jpg | alt "", container aria-hidden | Keep. It is decorative. The video carries no name, caption or track, which is correct. |
| OG card / | Cloudinary, 1600x836 | Viewed: "Ahmad Saad" in large type, "AI Engineer · American University of Sharjah" below, round headshot on the right, dark purple grain | Keep. It already pairs the name with the university. |
| OG card /about | same template | Viewed: "About Ahmad Saad" / "AI Engineer · Sharjah, UAE" + headshot | Meta line becomes "Ahmad Atef Saad · AUS Computer Engineering" (42). |
| OG card /projects | same template | "Projects by Ahmad Saad" / "AI systems, hardware, and architecture" | Keep. |
| OG card case studies | same template | "{Project}" / "A project by Ahmad Saad" (Trend Radar card viewed) | Keep. |

og:image:alt is set to the page title by lib/seo/metadata.tsx:81, so it follows the title changes automatically.

## Agent endpoint rewrites

Today:
- /llms.txt has AUS in line 3 (blockquote) but the full name only at line 7.
- /llms-full.txt is the same, with the full name at line 9.
- /me/about.md lines 1 to 3 are "# About Ahmad Saad", blank, "## About", so neither entity appears in the first 3 lines.
- No endpoint has a quotable definition sentence that contains the full name.
- /me/experience.md and /me/projects.md never name Ahmad, so an agent that fetches one of them alone cannot tell whose roles or projects they are.

1. USER.description (config/user.ts:46). This feeds llms.txt line 3, llms-full.txt line 3 and Person.description:
   "Ahmad Saad, full name Ahmad Atef Saad, is an AI engineer and forward deployed engineer based in the United Arab Emirates. He is a Computer Engineering senior at the American University of Sharjah (AUS) with a 3.96 GPA, graduating in December 2026 and available to start in January 2027. He holds a UAE Golden Visa, so no employer sponsorship is required."
   Result: both entities in line 3 of llms.txt and llms-full.txt, inside a quotable definition sentence.
2. PROFILE_DEFINITION (config/about.ts:20), first sentence as proposed for the homepage. It flows to llms-full.txt and /me/about.md.
3. /me/about.md (app/(llms)/me/about.md/route.ts:8): insert `> ${USER.description}` and a blank line directly under "# About Ahmad Saad". Line 3 then carries both entities, matching llms.txt.
4. LLMS_KEY_FACTS[0] (config/about.ts:75), with the source URL so an agent can verify and cite it:
   "Name: Ahmad Saad. Full name: Ahmad Atef Saad, the form the American University of Sharjah uses (AUS News, 22 June 2026: https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship)."
5. LLMS_KEY_FACTS name note (config/about.ts:83):
   "Name note: this Ahmad Saad is an AI engineer and AUS Computer Engineering student in the UAE. He is not Ahmed Saad, the Egyptian singer."
6. /me/experience.md (route.ts:3): replace the H1 with `# Experience: ${USER.name}`, followed by "> Roles held by Ahmad Saad, an AI engineer and Computer Engineering senior at the American University of Sharjah (AUS)."
7. /me/projects.md (route.ts:3): replace the H1 with `# Projects by ${USER.name}`, followed by "> Selected projects by Ahmad Saad, an AI engineer and Computer Engineering senior at the American University of Sharjah (AUS)." This describes the author only; it does not say the projects were AUS work.
8. Keep "# Ahmad Saad" as the llms.txt H1. The spec treats it as the site name, and the alias belongs in the blockquote.

After these changes "Ahmad Atef Saad" appears 3 times in llms-full.txt (about 1,700 words) and twice in llms.txt and about.md. That is acceptable for an agent file, since each hit sits in a different role: definition, key fact and source.

## Co-occurrence table (visible text only)

Counts are case-sensitive word-boundary matches, except "Computer Engineering", "AI engineer" and "forward deployed", which are case-insensitive. Scripts, JSON-LD and the RSC payload are excluded; site-wide nav and footer are included. Words = total visible words.

| Page | Words | Ahmad | Saad | Atef | AUS | American University of Sharjah | Sharjah | Tau Beta Pi | AI Hub | Computer Engineering | AI engineer | forward deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| / | 1291 | 6 | 6 | 0 | 2 | 3 | 7 | 2 | 2 | 2 | 2 | 5 |
| /about | 581 | 5 | 5 | 0 | 4 | 1 | 2 | 2 | 2 | 2 | 0 | 1 |
| /projects | 283 | 5 | 5 | 0 | 0 | 1 | 1 | 0 | 0 | 1 | 1 | 0 |
| /projects/trend-radar | 577 | 5 | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| /projects/localai | 668 | 5 | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| /projects/mano-computer-simulator | 398 | 5 | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 |
| /projects/lorawan-sensor-node | 393 | 5 | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| /llms.txt | 434 | 6 | 7 | 1 | 5 | 1 | 2 | 2 | 1 | 1 | 2 | 2 |
| /llms-full.txt | 1674 | 6 | 7 | 1 | 7 | 6 | 12 | 4 | 3 | 3 | 3 | 4 |
| /me/about.md | 443 | 5 | 6 | 1 | 5 | 2 | 5 | 4 | 1 | 2 | 2 | 2 |
| /me/experience.md | 709 | 0 | 0 | 0 | 1 | 3 | 6 | 0 | 2 | 0 | 0 | 1 |
| /me/projects.md | 466 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

Of the 5 "Ahmad" hits on each subpage, 3 are site-wide (nav link, footer copyright, aria-hidden footer wordmark). Inside `<main>` the count is 3 on / and 2 on every other page.

Observations:
- /about never says "AI engineer" in visible text. It is only in the title and meta; the body says "production AI systems" and "AI/ML Engineer". Using the phrase once in the "What's next" paragraph would align the body with the title. This is optional and not an entity item.
- "Tau Beta Pi Scholarship", the award behind the AUS News story, is absent from visible text on / and from the /about body. It appears only as the press headline at the bottom of /about.

Projected counts after the proposals:

| Page | Ahmad | Atef | AUS | American University of Sharjah | Sharjah | Tau Beta Pi |
|---|---|---|---|---|---|---|
| / | 8 | 2 | 3 | 4 | 7 | 3 |
| /about | 6 | 1 | 6 | 1 | 2 | 3 |
| each case study | 5 (unchanged) | 0 | 1 | 1 | 1 | 0 |

Every projected density stays under about 1.5 percent of visible words for the name and about 1 percent for the university terms.

## Risks and guard rails

1. Alias stuffing. Cap "Ahmad Atef Saad" at 1 per title, at most 2 in visible text per page, and only on /, /about, the agent endpoints and schema. Never use it in nav, footer, project titles, project meta, cover alts or anchors. The proposals above stay within this cap.
2. "AUS" ambiguity. AUS also means Australia. On each page, the first AUS must sit next to "UAE" or follow the spelled-out university. The pick title "· AUS, UAE" and the "(AUS)" introductions follow this rule; candidate 1 ("AI Engineer, AUS") does not.
3. Stale "senior". After December 2026 every "senior at" string becomes wrong. That covers config/user.ts:46 and 48, config/about.ts:12 and 20, app/about/page.tsx:28, app/projects/page.tsx:124, app/page.tsx:106, and the proposed /about meta, /projects meta and case study author line. The pick titles avoid "senior" ("AUS Computer Engineering", "AUS, UAE"), so they stay true after graduation. The planner should schedule a January 2027 sweep ("graduate of" or "Computer Engineering graduate").
4. Trend Radar and Samsung. Do not link the Samsung text on /about or on the homepage definition to /projects/trend-radar. Do not add the author line's employer history or any AUS claim to the Trend Radar page.
5. Unconfirmed AUS attribution. Do not say Mano or the LoRaWAN node were AUS coursework until the owner confirms.
6. Title rewriting. Google may rewrite or truncate a title. The pick is 53 characters and keeps "Ahmad Saad" at position 0, so a truncation still leads with the primary query. Watch the / title in Search Console for 4 weeks after deploy.
7. Raw versus visible counts. JSON-LD and rendered text are serialized twice in the HTML (ld+json plus the RSC flight payload), so raw counts look inflated. Search engines read ld+json as structured data, not body text, so this is not a stuffing signal. Use visible counts for density checks.
8. Existing rule nit, not introduced here. Date ranges render with a spaced hyphen ("06.2026 - 08.2026" from lib/format-period.ts, "08.2023 - 12.2026 (expected)" in config/education.ts:6, and "start - end" in lib/llms.ts:12). Under "hyphens inside compound words only" this is a hyphen used as a dash. The planner should decide whether to render "06.2026 to 08.2026".
9. Hero layout. The byline adds one mono line (two on phones) above the tagline. It is server-rendered text, so no CLS. The H1 stays the LCP element. Verify on a 375 px viewport before shipping.
10. Live scan. All 7 HTML pages and all 5 agent endpoints currently contain 0 en dashes, 0 em dashes, 0 hits for the banned model-library term and 0 "scrap" strings. The proposals keep that true.
