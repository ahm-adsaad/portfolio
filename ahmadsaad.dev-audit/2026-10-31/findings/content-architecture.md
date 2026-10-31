# Content architecture findings: ahmadsaad.dev (round 2, name and AUS queries)

Date: 2026-10-31. Specialist: content architecture (page set, query-to-URL mapping, internal links, sitemap and freshness).
Inputs read: 2026-10-30 findings/content.md, PLAN.md (Global Constraints, Deferred, Owner actions 14), today's LEDGER.md, every file in apps/website/config, app/page.tsx, app/about/page.tsx, app/projects/page.tsx, app/projects/[id]/page.tsx, app/sitemap.ts, lib/seo/metadata.tsx, lib/llms.ts, app/(llms)/llms.txt/route.ts, components/site-nav.tsx, components/site-footer.tsx, components/markdown.tsx, lib/rehype-add-query-params.tsx, features/home/components/*, public/_headers, scripts/assert-static-prerender.mjs, .next/prerender-manifest.json.
Live checks: server HTML of all 7 indexable URLs fetched today (all 200), sitemap.xml, llms.txt, llms-full.txt, me/about.md. AUS News article (2026-06-22) fetched raw and read in full. AUS News 2024-03-14 (aus.edu/node/105696) read for the chapter facts. aihub.aus.edu/about read. Three WebSearch intent probes.

---

## 1. Score: query coverage 54 / 100

Method: 17 target queries, each scored 1 (a page whose title or H1 carries the entity terms and whose body answers the intent), 0.5 (terms present in body copy only, no page built around them) or 0 (terms absent from visible text). The owner's two goals (the full name and the AUS cluster: rows 1 to 8 and 10 in section 3) are double weighted.

| Group | Queries | Raw | Weighted |
|---|---|---|---|
| Full name and AUS cluster (x2) | ahmad atef saad, ahmad aus, ahmad saad aus, ahmad atef saad aus, ahmad saad american university of sharjah, ahmad saad tau beta pi, tau beta pi aus president, ahmad saad ai hub aus, ahmad saad computer engineering aus | 0 + 0.5 + 1 + 0 + 0.5 + 0.5 + 0.25 + 0.5 + 1 = 4.25 of 9 | 8.5 of 18 |
| Role, project and recruiter queries (x1) | aus ai hub assistant, ahmad saad ai engineer uae, ahmad saad forward deployed engineer, ahmad saad samsung, ahmad saad trend radar, ahmad saad localai, ahmad saad golden visa, who is ahmad saad | 0.25 + 1 + 1 + 1 + 1 + 1 + 1 + 0.5 = 6.75 of 8 | 6.75 of 8 |
| Total | | | 15.25 of 26 = 59, minus 5 for the structural issue below = **54** |

Rationale:
- Role and project queries are well covered. "/" owns "ahmad saad ai engineer uae" and "forward deployed engineer"; each case study owns its project name; Samsung and the Golden Visa are stated plainly on "/" and "/about".
- The owner's two goals are the weakest part of the site. "Ahmad Atef Saad" appears in zero visible text on all 7 pages (measured today: only in the homepage JSON-LD `alternateName`, and in llms.txt, llms-full.txt and me/about.md, which are noindex). The AUS cluster exists only as body mentions scattered over "/" and "/about": visible "AUS" occurs 2 times on "/" and 5 on "/about"; "Tau Beta Pi" 2 and 2; "AI Hub" 2 and 2.
- Structural deduction (minus 5): no URL is about AUS, so nothing can carry "AUS", "Tau Beta Pi" or "AI Hub" in a title, H1 or H2. Facts that would make such a page unique are not on the site at all (grep of config, app, features, lib, components): the chapter name "UAE Alpha", the "US$1,000" scholarship amount, the "Undergraduate Research Grant", any link to aihub.aus.edu, and the AUS News quotes.
- Data error found while mapping: config/experience.ts and config/about.ts say "Center **of** Innovation in Teaching and Learning". AUS and aihub.aus.edu/about both say "Center **for** Innovation in Teaching and Learning (CITL)". Fix in both files before any AUS page ships (search for "Center of Innovation").

Ceiling, stated honestly: the bare query "ahmad aus" is dominated by Australia and by many Ahmads; no page on this domain will own it without a link from aus.edu (Owner action 11). The /aus URL below is the best page the site can offer that query; after it ships, the remaining gap for the whole cluster is authority (zero inbound links from aus.edu, indexation), not content. Expected coverage after P1 plus the /about and homepage changes: about 80 / 100.

---

## 2. Page inventory (today)

Main words = all words inside `<main>` of the live server HTML today (includes chips, card labels, the duplicated stack marquee on "/"). Prose words = yesterday's boilerplate-stripped count (trafilatura), closer to unique copy.

| URL | Title (chars) | Main words | Prose words | Primary query it can win | Secondary | Notes |
|---|---|---|---|---|---|---|
| / | Ahmad Saad · AI Engineer in the UAE (35) | 1,249 | 287 | ahmad saad | ahmad saad ai engineer uae, ahmad saad forward deployed engineer, who is ahmad saad, ahmad saad golden visa | ProfilePage + full Person graph. Full name only in JSON-LD. AUS in visible text 2 times. |
| /about | About Ahmad Saad \| AI Engineer, AUS Computer Engineering (56) | 554 | 472 | about ahmad saad | ahmad saad aus, ahmad saad computer engineering aus, ahmad saad samsung | Only page with "AUS" in the title. No question headings; TBP and AI Hub are unlinked plain strings (ABOUT_SECTIONS). |
| /projects | Projects by Ahmad Saad (22) | 261 | 44 | ahmad saad projects | none | Thin (yesterday F4). |
| /projects/trend-radar | Trend Radar: Production TikTok Trend Detection \| Ahmad Saad (59) | 553 | 517 | ahmad saad trend radar | trend radar tiktok | Must never name Samsung. |
| /projects/localai | LocalAI: Private AI for Company Documents \| Ahmad Saad (54) | 644 | 591 | ahmad saad localai | private document ai in browser | "LocalAI" is also the name of a large open-source inference server, so the bare query "localai" is not winnable; the name-qualified one is. |
| /projects/mano-computer-simulator | Mano Basic Computer Simulator in Python \| Ahmad Saad (52) | 375 | 353 | mano basic computer simulator python | ahmad saad mano | No AUS tie stated (correctly: config does not say it was coursework). |
| /projects/lorawan-sensor-node | Energy Harvesting LoRaWAN Sensor Node PCB \| Ahmad Saad (54) | 370 | 344 | energy harvesting lorawan sensor node pcb | ahmad saad lorawan | AUS News says this board was built in an AUS research group supported by the Undergraduate Research Grant; the page does not say so. |

Text endpoints (/llms.txt, /llms-full.txt, /me/*.md) are noindex since yesterday's Task 8 and are not ranking surfaces.

---

## 3. Keyword-to-URL map

"Today" is the best page now; "Target" is the page that should win after this plan. NEW means the page does not exist yet.

| # | Query | Intent | Today | Target | Why |
|---|---|---|---|---|---|
| 1 | ahmad atef saad | Navigational identity: someone holding the AUS spelling (from AUS News, a transcript or an AUS list) wants the person | none (0 visible mentions) | /about (title), supported by / (visible "Full name" fact) and NEW /aus (intro) | Only the AUS article carries this exact phrase on the web today (WebSearch: namesakes only, a Tunisian runner Atef Saad, footballers, an Egyptian director). Any of our pages with the phrase in the title will compete for the top spots; /about is the identity page, so it takes the title slot. Two of our URLs ranking together is fine for a name query. |
| 2 | ahmad aus | Ambiguous; the person-seeking share wants an Ahmad at AUS | / and /about weakly (tokens in body; /about title has "Ahmad" and "AUS") | NEW /aus | URL "ahmadsaad.dev/aus" literally carries both tokens; title starts "Ahmad Saad at AUS". Ceiling noted in section 1. |
| 3 | ahmad saad aus | Navigational | /about | NEW /aus primary, /about secondary | /aus title is the exact phrase "Ahmad Saad at AUS". |
| 4 | ahmad atef saad aus | Navigational, typically an AUS News reader | none | NEW /aus | /aus meta description and first sentence carry "Ahmad Atef Saad" next to "American University of Sharjah" and quote the article. |
| 5 | ahmad saad american university of sharjah | Navigational | /about (description) | NEW /aus | H1 is "Ahmad Saad at the American University of Sharjah". |
| 6 | ahmad saad tau beta pi | Verification | / and /about (body) | NEW /aus, section #tau-beta-pi | H2 "Tau Beta Pi UAE Alpha" plus the scholarship, sourced to AUS News. |
| 7 | tau beta pi aus president | Institutional: who leads the chapter | none | NEW /aus #tau-beta-pi | WebSearch found no page that names the current UAE Alpha president (results: AUS 2024 launch story, tbp.org, other chapters). A page saying "President of Tau Beta Pi UAE Alpha at AUS" can be the only direct answer. aus.edu and tbp.org will still outrank it for the head term. |
| 8 | ahmad saad ai hub aus | Navigational | / and /about (body) | NEW /aus, section #ai-hub | H2 "The AUS AI Hub" with a link to aihub.aus.edu. |
| 9 | aus ai hub assistant | Institutional or job seeker | none | NEW /aus #ai-hub (secondary) | aihub.aus.edu will win this; our page is the only one describing the role's work. Low priority. |
| 10 | ahmad saad computer engineering aus | Navigational | /about (title) | NEW /aus (H2 "Computer Engineering at AUS"), /about and NEW /cv support | |
| 11 | ahmad saad ai engineer uae | Recruiter navigational | / | / (keep) | Title and definition already match. |
| 12 | ahmad saad forward deployed engineer | Recruiter navigational | / | / (keep), /about support | Yesterday F12: /about lacks the literal phrase in body. |
| 13 | ahmad saad samsung | Verification of the internship | / (h3) and /about (body, description) | /about (keep), NEW /cv support | No Samsung role page (rejected in section 4). |
| 14 | ahmad saad trend radar | Navigational | /projects/trend-radar | keep | |
| 15 | ahmad saad localai | Navigational | /projects/localai | keep | Bare "localai" is owned by the open-source project of the same name. |
| 16 | ahmad saad golden visa | Recruiter verification | / and /about (body; / description) | /about Q&A ("Does Ahmad Saad need visa sponsorship?"), NEW /cv header | Low volume; any page with both strings wins once indexed. |
| 17 | who is ahmad saad | Informational identity | / (third-person definition) | / (keep), /about Q&A | The bare query shows the Egyptian singer Ahmed Saad; the qualified versions ("who is ahmad saad aus", "ahmad saad ai engineer") are the winnable ones. |
| extra | ahmad saad cv, ahmad saad resume | Recruiter | /Ahmad_Saad_CV.pdf (PDF, last changed 2026-08-24 per git) | NEW /cv | PDFs rank and render poorly; an HTML CV rendered from config cannot drift. |

---

## 4. New page specs (ranked, with verdicts)

Hard constraints verified in the repo, which every spec below obeys:
- Static only: every route file exports `dynamic = 'force-static'` and no `revalidate`. Caveat found: scripts/assert-static-prerender.mjs only fails on routes that carry an ISR interval in .next/prerender-manifest.json; it would NOT notice a new page that silently became dynamic (such a page is simply absent from the manifest). Add an expected-route assertion (section 7).
- No fs at request time: all copy in config/*.ts. Prose bodies can be Markdown strings rendered with the existing `components/markdown.tsx` (react-markdown is already in the Worker for the project pages, so no new dependency and no size cost beyond a few KiB of route code; Worker is 1117 KiB of 3 MiB gzipped).
- Markdown caveat: the shared `Markdown` component adds `rel="nofollow noopener noreferrer"` and UTM parameters to every external link (internal links starting with "/" are skipped, verified in lib/rehype-add-query-params.tsx). Render citation links to aus.edu and aihub.aus.edu in JSX, as /about does for PRESS_MENTIONS, so they stay clean followed links.
- Canonical: `createMetadata` defaults `alternates.canonical` to "/"; each new page passes `path`.
- Copy rules (PLAN.md Global Constraint 3): no em or en dashes, no banned model-library term, no data-vendor names, no banned data-collection wording, Trend Radar never on the same page as Samsung in /aus, $60K and 20% only as estimates (they do not appear on /aus at all).

### P1. /aus: ACCEPT (build first)

| Field | Value |
|---|---|
| URL | /aus |
| Title (51) | Ahmad Saad at AUS: Tau Beta Pi, AI Hub and Research |
| Alternate title (50) | Ahmad Saad at AUS (American University of Sharjah) |
| Meta description (140) | Ahmad Saad (Ahmad Atef Saad) at the American University of Sharjah: Tau Beta Pi UAE Alpha president, AI Hub Assistant, researcher, 3.96 GPA. |
| H1 | Ahmad Saad at the American University of Sharjah |
| Voice | Third person, like the homepage definition: quotable on its own and natural next to AUS News quotes. |
| Target words | 600 to 700 |
| Config export | new `config/aus.ts`: `AUS_PAGE = { title, description, h1, intro, sections: { id, heading, body }[], quotes: { text, source }[], sources: { label, url, date }[] }` |
| Schema | `WebPage` (not a second ProfilePage; "/" stays the only ProfilePage) with `about` and `mainEntity` the Person stub, `mentions` an inline `CollegeOrUniversity` AUS node and an `Organization` "Tau Beta Pi UAE Alpha" (`parentOrganization` Tau Beta Pi, tbp.org), `citation` the AUS News `NewsArticle`, `dateModified` from the page date, plus `BreadcrumbList` (Home > AUS). Every `@id` must resolve on this page's own graph. |
| Sitemap | include; lastmod from its own date; priority 0.8 if priority is emitted at all |
| Indexing | index, follow |

Why accept: it is the only way to put "AUS", "American University of Sharjah", "Tau Beta Pi" and "AI Hub" into a title, H1 and H2s, which is what the owner's top goal needs; it has a unique, third-party-corroborated fact base that no other page carries; and it gives AUS, CITL and the chapter one specific URL to link to (Owner action 11), which is the lever that can actually move "ahmad aus".

H2 outline, facts allowed, and sources (C = config, A26 = AUS News 2026-06-22 aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship, A24 = AUS News 2024-03-14 aus.edu/node/105696):

0. Intro under the H1 (about 60 words). Draft: "Ahmad Saad, published by AUS as Ahmad Atef Saad, is a Computer Engineering senior at the American University of Sharjah (AUS) in the United Arab Emirates. He holds a 3.96 GPA, is President of Tau Beta Pi UAE Alpha, works as an AI Hub Assistant at the Center for Innovation in Teaching and Learning, and graduates in December 2026." Sources: A26 (full name, senior, UAE Alpha president, AI Hub Assistant), C education.ts (GPA, graduation), C experience.ts (role), aus.edu/citl (correct center name).
1. H2 "Computer Engineering at AUS" (id computer-engineering, about 75 words). B.S. in Computer Engineering, August 2023 to December 2026 expected, GPA 3.96 / 4.0, Academic Merit Scholarship, Dean's List six times, Chancellor's List three times, coursework (machine learning, data structures and algorithms, computer architecture, computer networks, wireless communications). One link: "Computer architecture is also the subject of his [cycle-accurate simulator of Mano's Basic Computer](/projects/mano-computer-simulator)." Do not claim it was a course project (config does not say so). Sources: C education.ts; A26 confirms six and three.
2. H2 "Tau Beta Pi UAE Alpha" (id tau-beta-pi, about 110 words). Tau Beta Pi is the engineering honor society; UAE Alpha at AUS was installed on 3 March 2024 as the society's first international chapter (A24). Ahmad is an inductee and President (A26), previously chapter Vice President (C education.ts). In 2026 he received a Tau Beta Pi Scholarship, a US$1,000 partial award for his final semester of full-time undergraduate study, given through a competitive, merit-based process that weighs academic achievement, extracurricular involvement and potential to contribute to the engineering profession (A26). Do not say he was among the 2024 founding initiates (no source). IEEE line: "He has also served as Treasurer of the IEEE Solid-State Circuits Society" ("has served" is true whether the role is current or past, so it does not wait on Owner action 14).
3. H2 "The AUS AI Hub" (id ai-hub, about 80 words). AI Hub Assistant at CITL since November 2024, part-time (C). The AI Hub (link aihub.aus.edu) gives AUS faculty, staff and students vetted AI tools, guides and resources (A26). He led its HTML and CSS redesign against stakeholder requirements, prototyped it in Figma, maintains it on WordPress, and writes evaluations of emerging AI tools that shape faculty adoption (C experience.ts; A26 also says "led the redesign"). Do not cite the aihub.aus.edu team list: the served HTML has a "Meet the team" heading with no names (checked today); a search index snippet shows "Ahmad Saad, AI Hub Assistant", so it is probably client-rendered. Cite it only after a real browser check.
4. H2 "Research at AUS" (id research, about 105 words). Undergraduate Research Assistant in Computer Science and Engineering, October 2024 to July 2025: speech emotion recognition from log-mel spectrograms with fine-tuned ResNet and MobileNet models in TensorFlow, roughly 75% accuracy (C). "AUS News describes the system as analysing sound patterns in Arabic speech" (A26, attributed). "As part of a research group supported by the AUS Undergraduate Research Grant, he designed and fabricated a custom PCB for an energy harvesting [LoRaWAN sensor node](/projects/lorawan-sensor-node), from circuit design to measuring how efficiently the board uses power" (A26). Precision rule: the grant supported the research group; never write that he won or holds an Undergraduate Research Grant.
5. H2 "Web work for the College of Engineering" (id college-of-engineering, about 50 words). Web Design and Development Consultant since August 2026: WordPress and Elementor sites shipped to live domains in under 48 hours, built so non-technical teams maintain them, accessible to WCAG AA (C experience.ts).
6. H2 "In AUS News" (id aus-news, about 80 words). One line with outlet, date and headline linked (plain JSX link), then at most two quotes, attributed and in quotation marks. Recommended: "Working on both AI models and hardware taught me to think about the whole system. It is not enough for a model to perform well in testing. It also has to be efficient, reliable and suitable for the environment where it will be used." and "This scholarship is a proud moment for me because it recognizes the path I have been building at AUS." Quote no more than two of the eight quoted sentences: they are his words, but the page must not reproduce the article.
7. H2 "After AUS" (id after-aus, about 45 words). Graduates in December 2026, available to start in January 2027, UAE Golden Visa so no sponsorship (C). Links: [CV](/cv), [About Ahmad Saad](/about). Owner decision before publishing anything about further study: A26 says he plans a master's and a PhD before an AI engineering career, which sits awkwardly next to "available January 2027" and the job-seeking copy. Default: leave it out of site copy (the linked article still says it).
8. Footer of the page: "Sources" list (A26, A24, aihub.aus.edu) and "Last updated <date>" with a `<time>` element, like /about.

All eight A26 quote sentences, verbatim from the raw article HTML (for the implementer to copy exactly; quotes in the article use curly marks):
1. "This scholarship is a proud moment for me because it recognizes the path I have been building at AUS,"
2. "My interest has always been in engineering that connects strong technical ideas with systems that can actually perform in practical settings."
3. "Working on both AI models and hardware taught me to think about the whole system,"
4. "It is not enough for a model to perform well in testing. It also has to be efficient, reliable and suitable for the environment where it will be used."
5. "Leadership has shaped the way I understand engineering,"
6. "Through Tau Beta Pi, Student Residential Life Department and the AI Hub, I have learned that technical knowledge becomes stronger when it is connected to service, collaboration and responsibility."
7. "I want to keep working at the intersection of AI and hardware,"
8. "My goal is to help turn advanced AI research into technology that is efficient, dependable and ready for real use."
Quote 6 names the Student Residential Life Department; there is no role for him there in config, so do not describe one.

What /aus must not contain: Trend Radar (Samsung is mentioned by A26; keep the two apart by leaving Trend Radar off this page entirely), the $60K or 20% figures, the A26 description of the Samsung work as model optimisation for specialized AI hardware (it does not match config/experience.ts; restating it in site voice would create a conflicting fact for AI assistants). If Samsung is mentioned at all, one attributed clause: "AUS News also noted his 2026 internship as an AI and machine learning engineer at Samsung Gulf Electronics."

Internal links in: / (Education section and Experience ledger AUS entry), /about (Tau Beta Pi and AI Hub mentions, closing block), /cv (Leadership), /now, /projects/lorawan-sensor-node, footer on every page. Out: /projects/mano-computer-simulator, /projects/lorawan-sensor-node, /about, /cv, /, aus.edu (two articles), aihub.aus.edu, aus.edu/citl.

### P2. /cv: ACCEPT (build after /aus)

| Field | Value |
|---|---|
| URL | /cv (optional 301 from /resume in next.config redirects) |
| Title (52) | Ahmad Saad CV: AI Engineer, AUS Computer Engineering |
| Meta description (152) | Ahmad Saad's CV: AI engineer and forward deployed engineer, Computer Engineering at AUS (3.96 GPA), ex Samsung Gulf Electronics, available January 2027. |
| H1 | Ahmad Saad, CV |
| Target words | 550 to 700 |
| Config export | `CV_SUMMARY` (one 40 to 50 word summary, new copy built only from config facts) in config/about.ts; a new optional `highlights?: string[]` (2 to 3 short bullets) on `ExperiencePosition` in config/experience.ts, each rewritten from that position's existing description; everything else reused: USER, EDUCATION, CERTIFICATIONS, PROJECT_PAGES, LLMS_KEY_FACTS, tech-stack.ts |
| Schema | `WebPage` with `about` the Person stub, `BreadcrumbList`, `dateModified`. No second ProfilePage. |
| Sitemap | include; priority 0.7 |
| Indexing | index, follow. Add to public/_headers: `/Ahmad_Saad_CV.pdf` with `Link: <https://ahmadsaad.dev/cv>; rel="canonical"` so the PDF consolidates into the HTML page (a hint; Google may ignore it if the PDF content differs, so regenerate the PDF from the same facts when convenient). |

H2 outline: header block under H1 (full name "Ahmad Atef Saad" once, title AI Engineer and Forward Deployed Engineer, Abu Dhabi and Sharjah UAE, email, LinkedIn, GitHub, Golden Visa and no sponsorship, available January 2027, "Download the PDF"); "Summary"; "Experience" (title, company, city, period, highlights; Samsung bullets keep "estimated" and "projected" and do not name Trend Radar); "Education" (AUS, degree, period, GPA, coursework); "Leadership and honours" (Tau Beta Pi UAE Alpha President linked to /aus#tau-beta-pi, previously Vice President, Tau Beta Pi Scholarship US$1,000 2026, Academic Merit Scholarship, Dean's List x6, Chancellor's List x3, IEEE SSCS Treasurer with the owner's tense); "Projects" (one line plus link for each of the four case studies; Trend Radar here is fine because the page is a list, but do not put it in the Samsung entry); "Certification" (Claude Certified Architect: Foundations, Anthropic, Credly link); "Skills and languages".

Why accept: "[name] cv" and "[name] resume" are the recruiter queries this audience actually types; the PDF has not changed since 2026-08-24 (git) and its text could not be checked here; an HTML CV is a second strong page with the full name, AUS and the role terms in a different shape from the homepage. Condition: compact bullets only. If it renders the long homepage descriptions it becomes a near-duplicate of "/" and should not ship.

Links in: hero and contact pills on "/" (point them at /cv instead of the PDF), /about closing block, /aus "After AUS", footer. Out: /aus, every case study, /about, the PDF.

### P3. /now: ACCEPT ONLY WITH A MONTHLY UPDATE COMMITMENT (otherwise skip)

| Field | Value |
|---|---|
| URL | /now |
| Title (51) | Now: Ahmad Saad's Final Semester at AUS (Fall 2026) |
| Meta description (152) | What Ahmad Saad is working on now: his final Computer Engineering semester at AUS, Tau Beta Pi UAE Alpha, the AI Hub, LocalAI, and a January 2027 start. |
| H1 | What Ahmad Saad is doing now |
| Target words | 300 to 350 |
| Config export | new `config/now.ts`: `NOW = { updated: 'YYYY-MM-DD', title, description, items: { heading, body }[] }` |
| Schema | `WebPage` with `about` the Person stub, `dateModified` = `NOW.updated`, `BreadcrumbList` |
| Sitemap | include; lastmod = `NOW.updated`; priority 0.5 |
| Indexing | index while fresh; if it goes more than 60 days without an update, set noindex or delete it |

H2 outline (all from config or A26, dated in absolute terms): "Finishing Computer Engineering at AUS" (final semester, graduating December 2026, supported by the US$1,000 Tau Beta Pi Scholarship; "Fall 2026" is derived from the 12.2026 graduation, owner to confirm the term name); "Leading Tau Beta Pi UAE Alpha" (President); "Working at AUS" (AI Hub Assistant at CITL, Web Design and Development Consultant for the College of Engineering since August 2026); "Client work" (Account Manager at Chief Nest, remote with a Riyadh team, since September 2025); "Building" (LocalAI since August 2026, live demo link); "Next" (available January 2027, the roles from /about, Golden Visa). Visible "Updated <date>" at the top.

Why only conditional: freshness is a weak factor for name queries; the value of /now is a dated, quotable "what is he doing" answer for AI assistants and a real reason for monthly recrawl. A stale /now page ("final semester" in March 2027) is worse than none. It also needs a full rewrite in January 2027.

### Rejected or merged

| Candidate | Verdict | Reason |
|---|---|---|
| /press or /news | REJECT now; merge into /aus "In AUS News" and the existing /about press line | One independent mention exists (AUS News 2026). A hub of one item is thin. Build it when there are three or more mentions (the dev.to write-up, Show HN and AUS outreach in Owner actions 11 and 15 could get there). |
| /faq | MERGE into /about as "Questions recruiters ask" (H2 with H3 questions) | Answers would repeat /about and "/" nearly verbatim; FAQ rich results are limited to well-known government and health sites since 2023, so FAQPage markup buys no SERP feature here. On /about the same Q&A strengthens the identity page. Questions to ship now: "Is Ahmad Saad available for hire?", "Does Ahmad Saad need visa sponsorship?", "Where is Ahmad Saad based?", "Is Ahmad Atef Saad the same person as Ahmad Saad?" (answer: yes, AUS publishes the full name Ahmad Atef Saad; he uses Ahmad Saad professionally; he is not the Egyptian singer Ahmed Saad), "What did Ahmad Saad do at Samsung Gulf Electronics?". Hold the remote and relocation question until Owner action 14 answers it. |
| /tau-beta-pi | MERGE into /aus #tau-beta-pi | About 150 words of true, sourced content; alone it is thin and reads like an unofficial chapter page. As an H2 with an id it is still linkable and can earn a "jump to" link. |
| /ai-hub | MERGE into /aus #ai-hub | Same reasoning; about 100 words. |
| /experience and /experience/samsung-gulf (role pages) | REJECT | The Samsung role and the Trend Radar case study describe the same system; a Samsung page would either duplicate /projects/trend-radar or tie the two together, which breaks the Trend Radar rule (yesterday F7). The other employers have one or two sentences each. "ahmad saad samsung" is already served by "/" and /about. |
| /resume as a separate page | MERGE with /cv (301 /resume to /cv) | One page, two words. |
| /contact | REJECT | Email is in the nav and on every page, plus a full contact section on "/". A contact page adds a thin URL. |
| /uses, /stack | REJECT | Vanity for this goal; no target query; the stack is already on "/". |
| /ahmad-atef-saad (a name page) | REJECT | A page that exists only to rank for a name variant is a doorway page. The full name goes on /about (title), "/" (visible fact) and /aus (intro) instead. |

Noindex summary: no HTML page should be noindex. The five text endpoints stay noindex (yesterday's Task 8). /now becomes noindex only if it goes stale. The CV PDF gets a canonical header to /cv rather than noindex.

---

## 5. Homepage changes (copy and blocks only; design intact)

Today's order: Hero, Statement, About teaser ("Forward Deployed"), Experience ledger, Projects, Education, Stack, GitHub, Contact. Keep the order.

1. About teaser facts row (features/home/components/about-teaser.tsx `FACTS`): add a first fact `Full name` / `Ahmad Atef Saad`, making four facts in the existing `dl.facts` grid. This is the cleanest way to put the full name in visible homepage text without rewriting the definition sentence, which is reused by the agent endpoints. Coordinate with the name-entity findings: use one wording site-wide.
2. PROFILE_DEFINITION (config/about.ts): change "is President of the Tau Beta Pi chapter" to "is President of Tau Beta Pi UAE Alpha, the engineering honor society's AUS chapter". Adds the chapter name (absent site-wide today) to the most-quoted paragraph. Renders on "/", llms.txt, llms-full.txt and me/about.md.
3. Education section (config/education.ts `highlights` and features/home/components/education.tsx):
   - "President of Tau Beta Pi, previously chapter Vice President" becomes "President of Tau Beta Pi UAE Alpha, previously chapter Vice President".
   - Add "Tau Beta Pi Scholarship, US$1,000 for the final semester (2026)".
   - After the highlights, add one press line, rendered from PRESS_MENTIONS like /about: "AUS News, 22 June 2026: AUS engineering student receives competitive Tau Beta Pi Scholarship" (external link, no nofollow).
   - Add one internal text link styled like "More about Ahmad Saad": "Ahmad Saad at AUS: Tau Beta Pi, AI Hub and research" to /aus.
4. Experience ledger, AUS entry: add an optional `moreHref` / `moreLabel` on the `Experience` type and render "More on Ahmad Saad at AUS" to /aus under the American University of Sharjah block. Same component pattern for any future employer page (none proposed).
5. Hero: eyebrow "AI Engineer · Sharjah, UAE" becomes "AI Engineer · AUS, Sharjah, UAE" (31 characters; check it does not wrap beside the 56 px headshot at 390 px). The "CV" pill points at /cv once it exists; /cv carries the PDF download.
6. Contact: "CV (PDF)" pill becomes "CV" to /cv.
7. Homepage title (optional, coordinate with name-entity): "Ahmad Saad · AI Engineer, UAE · AUS Computer Engineering" (56) instead of "Ahmad Saad · AI Engineer in the UAE" (35). Puts AUS on the strongest page for "ahmad saad aus" and "ahmad aus" while keeping the exact "Ahmad Saad" phrase first.
8. Not recommended: moving Education above Experience, a separate "Press" block (one mention), or another Atef mention in the definition sentence on top of the facts row (over-optimisation).

/about changes that the keyword map depends on (small, listed here so the planner sees them together):
- Title "About Ahmad Saad (Ahmad Atef Saad) | AI Engineer, AUS" (53). Keep the description.
- Render ABOUT_SECTIONS paragraphs through the existing `Markdown` component so config strings can carry internal links (zero new dependencies; internal links skip the UTM plugin). This also unblocks yesterday's deferred F9 (links from "What I build" to the case studies).
- Link "Tau Beta Pi UAE Alpha" (rename from "the university's Tau Beta Pi chapter") to /aus#tau-beta-pi and "AI Hub" to /aus#ai-hub.
- Fix "Center of Innovation" to "Center for Innovation" (also in config/experience.ts).
- Add the "Questions recruiters ask" block from section 4 (FAQ merge).
- Closing block: add "Ahmad Saad at AUS" (to /aus) next to the case-study link and a "CV" pill (to /cv).

/projects/lorawan-sensor-node: append to "My role": "The board was built within an AUS research group supported by the Undergraduate Research Grant, working with AUS faculty and students. Read more about [Ahmad Saad's research at AUS](/aus#research)." Source A26. This is the first AUS tie on any project page and corroborates the case study with a third party.

---

## 6. Internal link table

| From | To | Anchor text | Placement | Status |
|---|---|---|---|---|
| / | /aus | Ahmad Saad at AUS: Tau Beta Pi, AI Hub and research | Education section, after highlights | new |
| / | /aus | More on Ahmad Saad at AUS | Experience ledger, AUS entry | new |
| / | aus.edu article (2026) | AUS engineering student receives competitive Tau Beta Pi Scholarship | Education section press line | new (external) |
| / | /cv | CV | Hero pill (was the PDF) | change |
| / | /cv | CV | Contact pill (was "CV (PDF)") | change |
| / | /about | More about Ahmad Saad | About teaser | exists |
| / | /projects and each case study | project names, "Read the X case study" | Projects section | exists |
| /about | /aus#tau-beta-pi | Tau Beta Pi UAE Alpha | Education paragraph | new |
| /about | /aus#ai-hub | AI Hub | Experience paragraph 2 | new |
| /about | /aus | Ahmad Saad at AUS | Closing block | new |
| /about | /cv | CV | Closing pill row | new |
| /about | /projects/localai | LocalAI | "What I build" | new (was deferred F9) |
| /about | /projects/mano-computer-simulator | a cycle-accurate simulator of Mano's Basic Computer | "What I build" | new (was deferred F9) |
| /about | /projects/lorawan-sensor-node | a custom PCB for an energy harvesting LoRaWAN sensor node | "What I build" | new (was deferred F9) |
| /aus | / | Home | Breadcrumb | new |
| /aus | /projects/mano-computer-simulator | cycle-accurate simulator of Mano's Basic Computer | Computer Engineering section | new |
| /aus | /projects/lorawan-sensor-node | LoRaWAN sensor node | Research section | new |
| /aus | /cv | CV | After AUS | new |
| /aus | /about | About Ahmad Saad | After AUS | new |
| /aus | aus.edu article (2026) | AUS engineering student receives competitive Tau Beta Pi Scholarship | In AUS News, Sources | new (external, JSX, no nofollow) |
| /aus | aus.edu/node/105696 | first international chapter | Tau Beta Pi section | new (external) |
| /aus | aihub.aus.edu | AI Hub | AI Hub section | new (external) |
| /aus | aus.edu/citl | Center for Innovation in Teaching and Learning | Intro or AI Hub section | optional (external) |
| /cv | /aus#tau-beta-pi | Tau Beta Pi UAE Alpha | Leadership and honours | new |
| /cv | each case study | project title | Projects | new |
| /cv | /Ahmad_Saad_CV.pdf | Download the PDF | Header | new |
| /cv | /about | About Ahmad Saad | End of page | new |
| /now | /aus | final semester at AUS | First item | new (if built) |
| /now | /projects/localai | LocalAI | Building | new (if built) |
| /now | /cv | CV | Next | new (if built) |
| /projects/lorawan-sensor-node | /aus#research | Ahmad Saad's research at AUS | My role | new |
| Footer (every page) | /aus | AUS | Footer ledger row | new |
| Footer (every page) | /cv | CV | Footer ledger row | new |
| Footer (every page) | /now | Now | Footer ledger row | new (if built) |
| Nav (every page) | /cv | CV | Primary nav, after Projects | owner design call |
| Nav (every page) | /aus | AUS | Primary nav | owner design call; footer link is the minimum |

Footer order proposal: About, Projects, AUS, CV, Now, llms.txt, Source. Anchor diversity into /aus is deliberate ("Ahmad Saad at AUS...", "More on Ahmad Saad at AUS", "Tau Beta Pi UAE Alpha", "AI Hub", "AUS"); do not make every anchor "Ahmad Saad AUS".

Agent endpoints: add /aus, /cv and /now (if built) to the "## Pages" list in app/(llms)/llms.txt/route.ts, and an "At AUS" block to llms-full.txt rendered from `AUS_PAGE`, so AI assistants see the same facts.

---

## 7. Sitemap, lastmod and freshness policy

Sitemap entries to add in app/sitemap.ts: /aus (image: the headshot), /cv (image: the headshot), /now (if built). Do not emit `changefreq`; Google ignores both `changefreq` and `priority`. If the coordinator wants `priority` for Bing anyway: / 1.0, /about 0.8, /aus 0.8, /cv 0.7, /projects 0.6, case studies 0.6, /now 0.5.

Proposed CONTENT_LAST_MODIFIED handling (today one constant in config/site.ts feeds every sitemap URL, so a monthly /now refresh would falsely bump the lastmod of every URL in the sitemap):

```ts
// config/site.ts
import { NOW } from './now';

/** Date of the last visible change per route (YYYY-MM-DD). Bump only the routes whose rendered copy changed. */
export const PAGE_LAST_MODIFIED = {
  '/': '2026-10-31',
  '/about': '2026-10-31',
  '/aus': '2026-11-DD', // the day it ships
  '/cv': '2026-11-DD',
  '/now': NOW.updated,
  '/projects': '2026-10-31',
} as const satisfies Record<string, string>;

/** Latest of the above; still used by the WebSite node and the agent endpoints. */
export const CONTENT_LAST_MODIFIED = Object.values(PAGE_LAST_MODIFIED).sort().at(-1)!;
```

Case studies get an optional `lastModified` on `Project` in config/projects.ts, falling back to the /projects date. Each page's schema `dateModified`, its visible "Last updated" line and its sitemap `lastmod` read the same value. Type the keys as a union of the sitemap paths so adding a route without a date fails the type check.

Which config edits bump which routes:

| Config edited | Routes to bump |
|---|---|
| about.ts PROFILE_DEFINITION | / |
| about.ts ABOUT_INTRO, ABOUT_SECTIONS, Q&A | /about |
| about.ts PRESS_MENTIONS | /, /about, /aus |
| about.ts CV_SUMMARY | /cv |
| education.ts | /, /cv, /aus |
| experience.ts (any position) | /, /cv; AUS positions also /aus |
| projects.ts | /, /projects, that case study, /cv |
| aus.ts | /aus |
| now.ts | /now |
| user.ts visible fields | /, /about, /cv |

Static guard extension (cheap, build-time only): in scripts/assert-static-prerender.mjs (or a sibling script run after it), also assert that every expected route (/, /about, /aus, /cv, /now, /projects and each case study) is present in `.next/prerender-manifest.json` `routes`, and print a warning when the /now page's date in `.next/server/app/now.html` is more than 45 days older than the build date.

Freshness calendar:
- /now: update monthly (first week), bump `NOW.updated`. Skip the page if that cadence is not realistic.
- /aus, /about, /cv, "/": a required update in the week after graduation (December 2026 to January 2027). Strings that flip: "senior", "graduates in December 2026", "is expected to graduate", "final semester", "available to start in January 2027", and possibly "President" and "AI Hub Assistant" if those roles end. Writing copy with absolute dates ("graduates in December 2026") rather than relative ones ("this semester") keeps most of it true until then.
- /aus: also on any new AUS fact (a link from aus.edu or CITL, a new article, a new role).
- Do not bump dates on deploys that change no visible copy.

---

## 8. Risks

1. Thin content and doorway risk. /aus is only worth building at 600 words or more of sourced substance; split into /tau-beta-pi and /ai-hub it becomes three thin pages. A name-only page (/ahmad-atef-saad) is a doorway. /now under 250 words or stale is thin. /projects is already thin (yesterday F4) and is not fixed by this plan.
2. Cannibalisation. "/", /about, /aus and /cv all carry "Ahmad Saad" and AUS terms. Mitigation: distinct titles and H1s (section 4), AUS H2s only on /aus, /about links to /aus with AUS anchors, "/" stays the only ProfilePage. For low-competition name queries two of our URLs ranking together is a gain, not a loss. Real duplication risk sits with /cv if it reuses the homepage's long descriptions: compact bullets only.
3. Over-optimisation. Visible "Ahmad Atef Saad" should appear about once per page (/about title plus one Q&A answer, "/" facts row, /aus intro, /cv header), never in alt text stuffing, hidden text or every heading. Keep the /aus title free of the full name; the description carries it.
4. Factual precision on AUS facts. The Undergraduate Research Grant supported a research group, not him personally. "First international chapter" and "3 March 2024" come from the 2024 AUS story, which does not name him. The Samsung description in A26 (model optimisation for specialized AI hardware) does not match config; do not restate it. The master's and PhD plan conflicts with the job-seeking copy; owner decides. "Center for Innovation" is the correct CITL name and the live site currently has it wrong.
5. Trend Radar and Samsung. /aus must not mention Trend Radar; /cv may list Trend Radar under Projects but not inside the Samsung entry; no Samsung role page.
6. Maintainability and tense. Graduation is about six weeks away. Every new page multiplies the strings that flip in January 2027. All copy lives in config so one edit flips every surface; the January update is a required owner task. IEEE tense still waits on Owner action 14 ("has served as" sidesteps it on /aus).
7. Link hygiene. The shared Markdown component would add nofollow and UTM parameters to aus.edu links; render citations in JSX. The aihub.aus.edu team list is not in its served HTML; do not cite it until checked in a browser.
8. Static and canonical traps. A new page that forgets `path` canonicalises to "/"; a page that becomes dynamic is not caught by today's guard (section 7 extension). Worker size impact is small (route code only; react-markdown already bundled), but measure after the build.
9. Expectation. Content alone will not make the site rank for "ahmad aus". The live baseline shows the domain is not returned even for "ahmadsaad.dev"; indexation (Search Console, Owner action 5) and a link from aus.edu to /aus (Owner action 11, now with a precise target URL) are the multipliers on everything above.

---

## 9. Owner decisions this plan depends on

None of these block P1 (/aus) except where marked; defaults are given so the planner can proceed.

| Decision | Blocks | Default if no answer |
|---|---|---|
| Mention the master's and PhD plan (from AUS News) in site copy? | /aus "After AUS" | Leave it out; the linked article still says it. |
| IEEE Solid-State Circuits Society Treasurer: current or former (Owner action 14) | /about, /cv wording | /aus uses "has served as Treasurer", true either way; /cv waits or uses the same phrasing. |
| Commit to updating /now monthly? | P3 | Do not build /now. |
| Term name "Fall 2026" for the final semester | /now title | Use "final semester, graduating December 2026" without the term name. |
| Add AUS and CV to the primary nav (design call) | nav | Footer links only. |
| Open to remote or relocation (Owner action 14) | /about Q&A | Ship the Q&A without that question. |
| Optional homepage title with AUS | "/" title | Keep today's title; /aus and /about carry AUS. |
