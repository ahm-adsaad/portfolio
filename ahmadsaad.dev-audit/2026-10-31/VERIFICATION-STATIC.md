# Round 2 static verification

Evaluator: fresh static evaluator (did not write the plan or the code), 2026-10-31.
Scope: PLAN.md 11.1, 11.2, 11.3, 11.4, 11.5, 11.7 (dry run and package.json line), 11.8, plus a fact audit against config on `main` and the two AUS News articles, an extended rule scan of visible text, a copy review and a tense-trap inventory.
Input: built output in `apps/website/.next/server/app` (written 11:19 +04; no file under config, app, lib, components, features, scripts or public is newer than the build; branch `seo/name-aus-2026-10-31` at 84e24f3). Nothing was rebuilt, served, edited or committed.

**Verdict: APPROVED WITH MINOR NOTES.** Blocking 0, Important 1, Minor 13.

Every checklist line in scope passes. No unsourced claim was found. The one Important finding is an overstatement in FAQ answer 1 and in the first llms key fact ("the American University of Sharjah uses his full name"), which an AUS page the site links to contradicts. It is a one-line copy fix.

---

## 1. Checklist results

### 11.1 Per page (built HTML)

| Page | Title (chars) | Description (chars) | Canonical | H1 | Result |
|---|---|---|---|---|---|
| index | Ahmad Saad (Ahmad Atef Saad) · AI Engineer · AUS, UAE (53) | expected text (157) | https://ahmadsaad.dev | Ahmad Saad | match |
| about | About Ahmad Saad (Ahmad Atef Saad) \| AI Engineer, AUS (53) | expected text (155) | https://ahmadsaad.dev/about | Ahmad Saad | match |
| aus | Ahmad Saad at AUS: Tau Beta Pi, AI Hub and Research (51) | expected text (143) | https://ahmadsaad.dev/aus | Ahmad Saad at the American University of Sharjah | match |
| cv | Ahmad Saad CV: AI Engineer, Computer Engineering at AUS (55) | expected text (152) | https://ahmadsaad.dev/cv | Ahmad Saad, CV | match |
| projects | Projects by Ahmad Saad, AUS Computer Engineering (48) | expected text (153) | https://ahmadsaad.dev/projects | Projects by Ahmad Saad | match |
| trend-radar | unchanged (59) | unchanged (152) | self | Trend Radar | match |
| localai | unchanged (54) | unchanged (148) | self | LocalAI | match |
| mano-computer-simulator | unchanged (52) | A8 text (150) | self | Mano Basic Computer Simulator | match |
| lorawan-sensor-node | unchanged (54) | A8 text (149) | self | Energy Harvesting LoRaWAN Sensor Node | match |

Exactly one `<h1>` per page. No `robots` meta on the 9 pages (only `_not-found` has `noindex`). `og:url` equals the canonical on index, about, aus, cv and projects.

Key strings (`CHK text`, actual vs expected):

| Page | String | Actual | Expected |
|---|---|---|---|
| index | "Ahmad Atef Saad · Computer Engineering · American University of Sharjah" | 1 | 1 |
| index | "Ahmad Saad, full name Ahmad Atef Saad, is an AI engineer and forward deployed engineer based between Abu Dhabi and Sharjah in the United Arab Emirates." | 1 | 1 |
| index | "AI Engineer · UAE" | 1 | 1 |
| index | "Ahmad Saad at AUS: Tau Beta Pi, AI Hub and research" | 1 | 1 |
| about | about definition sentence | 1 | 1 |
| about | "under my full name, Ahmad Atef Saad" | 1 | 1 |
| about | "Is Ahmad Atef Saad the same person as Ahmad Saad?" | 1 | 1 |
| about | "Questions about Ahmad Saad" | 1 | 1 |
| about | "Center for Innovation in Teaching and Learning" | 3 | at least 1 |
| aus | "Ahmad Saad, published by AUS as Ahmad Atef Saad, is a Computer Engineering senior" | 1 | 1 |
| aus | "Tau Beta Pi UAE Alpha" | 3 | at least 2 |
| aus | "US$1,000" | 1 | at least 1 |
| aus | "whose work was supported by an AUS Undergraduate Research Grant" | 1 | 1 |
| aus | "AUS News, 22 June 2026" | 4 | at least 1 |
| aus | "It is not enough for a model to perform well in testing." | 1 | 1 |
| cv | "Ahmad Atef Saad · AI Engineer and Forward Deployed Engineer" | 1 | 1 |
| cv | "Download the PDF CV" | 1 | 1 |
| projects | "American University of Sharjah (AUS)" | 1 | 1 |
| each case study (4) | "Ahmad Saad is an AI engineer and Computer Engineering senior at the American University of Sharjah (AUS)." | 1 each | 1 each |

### 11.2 Full-name and alt budget (`R2 names`)

| Page | Visible "Ahmad Atef Saad" (expected) | Alt with full name (expected) | Visible "](" | "Ahmad A. Saad" |
|---|---|---|---|---|
| index | 2 (2) | 1 (1): "Headshot of Ahmad Saad (Ahmad Atef Saad)" | 0 | 0 |
| about | 3 (3) | 1 (1): same alt | 0 | 0 |
| aus | 2 (2) | 0 (0) | 0 | 0 |
| cv | 1 (1) | 0 (0) | 0 | 0 |
| projects | 0 (0) | 0 (0) | 0 | 0 |
| 4 case studies | 0 each (0) | 0 (0) | 0 | 0 |

### 11.3 JSON-LD

| Check | Actual | Expected |
|---|---|---|
| `R2 refs` on 9 pages | `dangling: none` on all 9 | none |
| `CHK jsonld` | `image_dims: ok` on all 9 | ok |
| `R2 persons` on 9 pages | `persons: ok` on all 9; alternateName ["Ahmad Atef Saad"], additionalName "Atef", no alumniOf, no "Ahmad A. Saad" | as stated |
| Full Person (index, about, aus, cv, projects) | memberOf OrganizationRole "President", memberOf.name "Tau Beta Pi UAE Alpha", url https://www.tbp.org; affiliation #org-aus; worksFor [#org-chief-nest, #org-aus]; homeLocation 2 Places; occupationLocation Country; credential categories [degree, certification]; subjectOf[0] about #person, image tbp_1_1.jpg, publisher #org-aus; #org-aus alternateName "AUS", sameAs Wikipedia and Wikidata Q4115992 | as stated |
| Case-study Person stub | name, alternateName, additionalName, url, sameAs (GitHub, LinkedIn, Credly: 3 URLs) | stub with 3 sameAs |
| Page types | index ProfilePage (only page with it); about AboutPage + FAQPage; aus WebPage about [#person, #org-aus]; cv WebPage; projects CollectionPage | as stated |
| `R2 faq about` | 1 FAQPage, 8 Questions, all 8 questions and 8 answers `[ok]` (visible verbatim) | 1 / 8 / all ok |
| `R2 faq` other 8 pages | 0 FAQPage each | 0 |
| `R2 crumbs` | about "Home > About", aus "Home > AUS", cv "Home > CV", projects "Home > Projects", case studies "Home > Projects > <title>"; index none | as stated |
| `R2 projects index` | trend-radar 2026-06, localai 2026-08, mano 2025, lorawan 2026, portfolio 2026-08; dateModified 2026-10-31 on all 5 | as stated |
| WebSite on index | alternateName ["Ahmad Atef Saad", "ahmadsaad.dev"] | as stated |

### 11.4 Copy rules

| Check | Actual | Expected |
|---|---|---|
| `R2 scan $O offsite config app lib components features scripts public/_headers` | `clean` (exit 0) | clean |
| Extra: `R2 scan public offsite` (whole public folder) | `clean` | clean |
| `CHK text trend-radar "Samsung"` | 0 | 0 |
| `CHK text aus "Trend Radar"` / `"Samsung"` | 0 / 0 | 0 / 0 |
| `CHK text about "Trend Radar"` | 0 | 0 |
| `grep -c "Trend Radar" config/cv.ts` | 0 | 0 |
| "master" / "Master" / "PhD" on all 9 pages | 0 / 0 / 0 everywhere | 0 |
| `$60K` and `20%` hits in config | 7 hits (about.ts x3, cv.ts, experience.ts, faq.ts, projects.ts); every one reads "estimated $60K" and "projected 20%" | estimated / projected |
| `grep -rln "Atef" --include=*.ts --include=*.tsx .` | `./config/user.ts` only (also true for every other file type outside build folders) | config/user.ts only |

### 11.5 Agent endpoints

| Check | Actual | Expected |
|---|---|---|
| llms.txt line 3 | "> Ahmad Saad (Ahmad Atef Saad) is an AI engineer, ... (AUS) ..." | has full name and "(AUS)" |
| llms.txt line 5 | "Last updated: 2026-10-31" | same |
| `grep -c "## Press"` | 1 | 1 |
| `grep -c "UAE Alpha"` | 2 | at least 1 |
| `grep -c 'US\$1,000'` | 1 | at least 1 |
| `grep -c "Undergraduate Research Grant"` | 1 | at least 1 |
| `grep -c "ahmadsaad.dev/aus\|ahmadsaad.dev/cv"` | 2 | at least 2 |
| about.md lines 1 to 3 | "# About Ahmad Saad" and a summary naming the American University of Sharjah | names both |
| head -1 experience.md / projects.md | "# Experience: Ahmad Saad" / "# Projects by Ahmad Saad" | both name him |
| `grep -c "## FAQ"` about.md / llms-full.txt | 1 / 1 | 1 each |
| x-robots-tag in 5 .meta files | noindex x5 | noindex x5 |
| Extra: page URLs in llms.txt | 8: /about, /aus, /cv, /projects and the 4 case studies; the homepage is not linked (Minor M10, pre-existing) | 9 per the coordinator |
| Extra: contradictions text vs HTML | none on dates, roles, availability, Tau Beta Pi or the grant; only the project period display differs (Minor M11) | none |

### 11.7 IndexNow dry run and Worker size

| Check | Actual | Expected |
|---|---|---|
| `node scripts/indexnow.mjs --dry-run --sitemap .next/server/app/sitemap.xml.body` | 9 URLs, host ahmadsaad.dev, key b9f504812ee878b00a15106b08a1f9e1, keyLocation https://ahmadsaad.dev/b9f504812ee878b00a15106b08a1f9e1.txt, "dry run, nothing sent", exit 0 | 9 / host / keyLocation / exit 0 |
| `grep -c '"indexnow"' package.json` | 1 (`"indexnow": "node ./scripts/indexnow.mjs"`) | 1 |
| Key file content | `b9f504812ee878b00a15106b08a1f9e1` (no newline) | key |
| Sitemap | 9 `<loc>`, all lastmod 2026-10-31, /aus and /cv present | 9 |
| Worker gzip | not re-measured (instruction); coordinator measured 1150.67 KiB | under 3072 KiB |

### 11.8 Internal links and nav

| Check | Actual | Expected |
|---|---|---|
| /aus and /cv on every page | nav and footer carry both on all 9 pages (and on 404) | yes |
| index: /aus in main | 1 (Education link) | yes |
| index: /cv in main | 2 (hero pill, contact pill) | yes |
| index: `href="/Ahmad_Saad_CV.pdf"` | 0 | 0 |
| about | /aus#tau-beta-pi, /aus#ai-hub, /projects/localai, /projects/mano-computer-simulator, /projects/lorawan-sensor-node present; AUS News link rel "noopener noreferrer" | yes |
| aus | /projects/mano-computer-simulator, /projects/lorawan-sensor-node, /about, /projects, /cv present; ids computer-engineering, tau-beta-pi, ai-hub, research, college-of-engineering, aus-news present | yes |
| cv | /Ahmad_Saad_CV.pdf, /aus#tau-beta-pi, all 4 case studies, /about present | yes |
| External links | every external `<a>` on the 9 pages has rel exactly "noopener noreferrer" | yes |
| drive-poster preload | index 0, about 1 | index 0, about 1 |

---

## 2. Fact audit

Sources: "main:<file>" is the config on `main` before this round; "Art26" is the AUS News article of 22 June 2026 (curl 200, published_time 2026-06-22T09:03:09+04:00, text read in full; WebFetch only returned a summary, which confirms the same facts and that the article mentions a master's and PhD plan the site correctly omits); "Art24" is the 14 March 2024 chapter article (curl 200, canonical matches, published 2024-03-14).

### /aus (config/aus.ts)

| Sentence (start) | Source | Verdict |
|---|---|---|
| "Ahmad Saad, published by AUS as Ahmad Atef Saad, is a Computer Engineering senior at the American University of Sharjah (AUS) in the United Arab Emirates." | Art26 ("Ahmad Atef Saad", "senior computer engineering student"); main:about.ts | sourced (wording: M5) |
| "He holds a 3.96 GPA, is President of Tau Beta Pi UAE Alpha, works as an AI Hub Assistant at the Center for Innovation in Teaching and Learning, and graduates in December 2026." | main:about.ts, main:education.ts, Art26 | sourced |
| Facts card: B.S. Computer Engineering, December 2026; 3.96 / 4.0; President; Since November 2024 | main:education.ts, main:experience.ts | sourced |
| "I am completing a B.S. ... started in August 2023 and expect to finish in December 2026, with a 3.96 GPA ... Academic Merit Scholarship ... Dean's List six times and the Chancellor's List three times." | main:education.ts (08.2023 to 12.2026 expected), main:about.ts; Art26 (six and three) | sourced |
| "My coursework includes machine learning, ... wireless communications." | main:education.ts | sourced |
| "Computer architecture is also the subject of my cycle-accurate simulator of Mano's Basic Computer, written in Python." | main:projects.ts | sourced (placement: M4) |
| "Tau Beta Pi is the engineering honor society." | Art26 ("Tau Beta Pi, the engineering honor society") | sourced |
| "Its AUS chapter, UAE Alpha, was installed on 3 March 2024 as the society's first international chapter." | Art24 ("installation ceremony ... United Arab Emirates Alpha, was held at AUS campus on March 3, 2024"; headline and lead "first international chapter") | sourced, verified |
| "I am the chapter's President, after serving as its Vice President, and I have also served as Treasurer of the IEEE Solid-State Circuits Society." | main:about.ts, main:education.ts; Art26 ("inductee and President of Tau Beta Pi UAE Alpha") | sourced (placement and scope: M9) |
| "In 2026 I received a Tau Beta Pi Scholarship, a US$1,000 award for my final semester of full-time undergraduate study." | Art26 ("received the US $1,000 partial scholarship for his final semester of full-time undergraduate study") | sourced, verified |
| "The society gives it to initiated members through a competitive, merit-based process that considers academic achievement, extracurricular involvement and potential to contribute to the engineering profession." | Art26 ("supports initiated members of Tau Beta Pi ... awarded through a competitive merit-based process that considers academic achievement, extracurricular involvement and the applicant's potential to contribute to the engineering profession") | sourced, accurate close paraphrase |
| "Since November 2024 I have worked part-time as an AI Hub Assistant at the AUS Center for Innovation in Teaching and Learning (CITL)." | main:experience.ts (11.2024, Part-time, CITL) | sourced |
| "The AI Hub gives AUS faculty, staff and students vetted AI tools, guides and resources." | Art26 ("providing vetted AI tools, guides and resources" to "faculty, staff and students") | sourced |
| "I led the redesign of the AI Hub website against stakeholder requirements, prototyped it in Figma and maintain it on WordPress, and I write evaluations of emerging AI tools that shape how faculty adopt them." | main:experience.ts | sourced |
| "My profile is on the AI Hub team page." | https://aihub.aus.edu/team/mr-ahmad/ (200, "Mr. Ahmad Saad, AI Hub Assistant, Center for Innovation in Teaching and Learning") | sourced |
| "From October 2024 to July 2025 I was an Undergraduate Research Assistant ... log-mel spectrograms and fine-tuned ResNet and MobileNet models in TensorFlow, and reached roughly 75% accuracy." | main:experience.ts | sourced |
| "AUS News describes the project as an emotion recognition system that analyzes sound patterns in the Arabic language." | Art26 verbatim ("an emotion recognition system that analyzes sound patterns in the Arabic language") and attributed | sourced, verified |
| "I also designed and fabricated the custom PCB for an energy harvesting LoRaWAN sensor node in an AUS research group whose work was supported by an AUS Undergraduate Research Grant, from circuit design to measuring how efficiently the board uses power." | Art26 ("As part of a research group supported by the Undergraduate Research Grant at AUS, he designed and fabricated a custom-printed circuit board ... from circuit design to measuring how efficiently the device uses power"); main:projects.ts ("I designed and fabricated") | sourced; grant wording correct (group, not him); see M3 |
| "Since August 2026 I have been a Web Design and Development Consultant ... under 48 hours ... WCAG AA." | main:experience.ts | sourced |
| "On 22 June 2026, AUS News covered my Tau Beta Pi Scholarship under my full name, Ahmad Atef Saad, in [headline]." | Art26 (date, headline, name) | sourced |
| Quote 1 "This scholarship is a proud moment for me because it recognizes the path I have been building at AUS." | Art26 | words verbatim; final "." is "," in the article before "said Saad" (M1) |
| Quote 2 "Working on both AI models and hardware ... the whole system. It is not enough ... testing. It also has to be ... used." | Art26 | words verbatim; "system," becomes "system." and the attribution between the two fragments is removed (M1) |
| Quote 3 "I want to keep working at the intersection of AI and hardware. My goal is ... ready for real use." | Art26 | words verbatim; "hardware," becomes "hardware." across the attribution (M1) |
| "I graduate in December 2026 and am available to start work in January 2027." | main:about.ts, main:user.ts | sourced |
| Sources list: AUS News 22 June 2026; AUS News 14 March 2024; AI Hub | Art26, Art24, aihub.aus.edu (200) | verified |

### FAQ (config/faq.ts) and the /about definition

| Sentence (start) | Source | Verdict |
|---|---|---|
| ABOUT_DEFINITION: "... AI engineer, forward deployed engineer and Computer Engineering senior at the American University of Sharjah (AUS) in the United Arab Emirates. He is President of Tau Beta Pi UAE Alpha and an AI Hub Assistant at the AUS Center for Innovation in Teaching and Learning, and in June 2026 AUS News reported his US$1,000 Tau Beta Pi Scholarship. He graduates in December 2026 and is available to start work in January 2027." | main:about.ts, main:user.ts, Art26 | sourced |
| Q1 A: "Yes. Ahmad Saad is the name he uses professionally, and the American University of Sharjah uses his full name, as AUS News did when it covered his Tau Beta Pi Scholarship in June 2026." | Art26 shows AUS News used it; the AUS AI Hub team page titles him "Mr. Ahmad Saad" | **overstated (I1)** |
| Q1 A: "He is not Ahmed Saad, the Egyptian singer." | main:about.ts LLMS_KEY_FACTS ("He is not Ahmed Saad, the Egyptian singer.") | sourced |
| Q2 A: graduates December 2026, available January 2027, target roles | main:about.ts | sourced |
| Q3 A: UAE Golden Visa, no sponsorship, Abu Dhabi and Sharjah, English and Arabic | main:about.ts | sourced |
| Q4 A: President after Vice President; US$1,000 Tau Beta Pi Scholarship for his final semester, reported 22 June 2026 | main:about.ts, Art26 | sourced |
| Q5 A: AI Hub Assistant since November 2024, led the AI Hub redesign (aihub.aus.edu); College of Engineering web consultant since August 2026; "He also designed a LoRaWAN sensor node PCB in a research group whose work was supported by an AUS Undergraduate Research Grant." | main:experience.ts, Art26 | sourced; grant wording correct |
| Q6 A: Samsung June to August 2026, Dubai, "production trend intelligence platform", estimated $60K, projected 20% | main:about.ts, main:experience.ts | sourced; no Trend Radar in the answer |
| Q7 A: "LocalAI ... scored 100% retrieval on a 49-question evaluation" | main:projects.ts ("a golden set of 49 questions ... retrieval puts the right excerpt in the prompt for 100% of questions", on an integrated Intel laptop GPU) | sourced (hardware condition omitted, acceptable) |
| Q7 A: Mano simulator, LoRaWAN PCB, "Each has a case study on the projects page." | main:projects.ts | sourced; Trend Radar omitted as planned |
| Q8 A: Claude Certified Architect: Foundations via Credly; Academic Merit Scholarship; Dean's List x6, Chancellor's List x3; Tau Beta Pi Scholarship 2026 | main:education.ts, main:about.ts, Art26 | sourced |

### PROFILE_DEFINITION (config/about.ts)

| Sentence (start) | Source | Verdict |
|---|---|---|
| "Ahmad Saad, full name Ahmad Atef Saad, is an AI engineer and forward deployed engineer based between Abu Dhabi and Sharjah in the United Arab Emirates." | main:about.ts plus the full name (Art26) | sourced |
| "... is President of Tau Beta Pi UAE Alpha, and graduates in December 2026." | main:about.ts ("President of the Tau Beta Pi chapter"), Art26 (chapter name) | sourced |
| Samsung, LocalAI, certification, languages, visa, availability sentences | unchanged from main:about.ts | sourced |

### /cv (config/cv.ts)

| Item | Source | Verdict |
|---|---|---|
| headline, status line, summary | main:user.ts, main:about.ts, main:education.ts | sourced |
| Samsung bullets 1 to 4 (platform, deterministic signals, single-digit-dollar budget and 315 tests, stakeholders with estimated $60K and projected 20%) | main:experience.ts | sourced (proximity note: M2) |
| ELMEC, Chief Nest, ONBRND, AUS web consultant, AI Hub, research bullets | main:experience.ts | sourced |
| Honours: President UAE Alpha (previously VP); Tau Beta Pi Scholarship US$1,000 final semester 2026; Academic Merit; Dean's and Chancellor's Lists; IEEE SSCS Treasurer | main:education.ts, main:about.ts, Art26 | sourced |
| Skills and languages | main:tech-stack.ts | sourced |

### LLMS_KEY_FACTS (config/about.ts)

| Bullet | Source | Verdict |
|---|---|---|
| "Name: Ahmad Saad. Full name: Ahmad Atef Saad, the form the American University of Sharjah uses (AUS News, 22 June 2026: ...)" | Art26 | **overstated, same as I1** |
| "Not to be confused with: Ahmed Saad, the Egyptian singer, or any other person named Ahmad or Ahmed Saad. ..." | main:about.ts | sourced |
| Education August 2023 to December 2026 (expected), GPA | main:education.ts | sourced |
| Availability, visa, location | main:about.ts | sourced |
| Tau Beta Pi bullet (President, VP, US$1,000, final semester, 22 June 2026) | main:about.ts, Art26 | sourced |
| Samsung bullet | main:about.ts (unchanged) | sourced; no Trend Radar |
| Current roles (CITL name corrected), "led the redesign of aihub.aus.edu" | main:about.ts, main:experience.ts | sourced |
| Research bullet (October 2024 to July 2025, 75%, LoRaWAN PCB in an AUS research group supported by a URG) | main:experience.ts, Art26 | sourced; grant wording correct |
| Certification, honours, languages, looking for | main:about.ts | sourced |

### Watch items, explicitly

| Item | Result |
|---|---|
| "fabricated" the PCB | sourced twice (Art26 "designed and fabricated"; main:projects.ts "I designed and fabricated"); wording differs from "had the board fabricated" elsewhere (M3) |
| "analyzes sound patterns in the Arabic language" | verbatim from Art26 and attributed to AUS News |
| Scholarship selection criteria | accurate paraphrase of Art26 |
| LocalAI "100% retrieval on a 49-question evaluation" | main:projects.ts |
| "first international chapter", 3 March 2024 | Art24, verified |
| US$1,000 and "final semester" | Art26, verified |
| Research Grant wording | all 4 distinct sentences (10 occurrences across pages and endpoints) say a group's work was supported; none says he received it |
| Trend Radar and Samsung | never in the same sentence, bullet, card or FAQ answer on any page or endpoint; see M2 for a figures-level tie on /cv |
| Unsourced claims | none found |

---

## 3. Rule scan beyond the script

Visible text of all 9 pages (plus 404) was extracted block by block (script, style, svg and head removed) and scanned, together with llms.txt, llms-full.txt, the three /me files, robots.txt, sitemap.xml and manifest.json.

| Rule | Result |
|---|---|
| U+2014, U+2013, and the other dash code points U+2012, U+2015, U+2212, U+FE58, U+FE63, U+FF0D | 0 everywhere |
| Spaced hyphen | only in date ranges such as "06.2026 - 08.2026" (index, cv, two case studies, all md endpoints); the format predates this round and is not a dash character |
| Gradient-boosting library names (LightGBM, XGBoost, CatBoost) | 0 |
| Scraping vocabulary (scrap*, crawl, unofficial, reverse engineer, headless) | 0 |
| Data-vendor names (script list plus about 20 more trend and social-data vendors) | 0; "commercial data vendors" appears generically on index, trend-radar and llms-full (pre-existing, no name) |
| "Center of Innovation" | 0 |
| "Ahmad A. Saad" | 0 |
| "master", "PhD", "graduate school" | 0 (one false positive: "undergraduate study") |
| Samsung and Trend Radar in one sentence, bullet, card or FAQ answer | 0 on every page and endpoint; /projects/trend-radar "Samsung" = 0; /aus and /about "Trend Radar" = 0 |

---

## 4. Copy review

### Full-name density and naturalness

| Place | Reading | Note |
|---|---|---|
| Hero byline "Ahmad Atef Saad · Computer Engineering · American University of Sharjah" | reads as a name card line under the H1 | fine |
| Home definition "Ahmad Saad, full name Ahmad Atef Saad, is an AI engineer and forward deployed engineer ..." | natural enough; the "full name" appositive is a common Wikipedia-style opener | fine |
| /about definition | same opener as the homepage ("Ahmad Saad, full name Ahmad Atef Saad, is an AI engineer"), and the same opener again in about.md and llms-full.txt | near-duplicate opener across two indexable pages; acceptable, not stuffing |
| /aus intro "Ahmad Saad, published by AUS as Ahmad Atef Saad, is ..." | a person is not "published"; reads as machine phrasing | M5 |
| FAQ Q1 "Is Ahmad Atef Saad the same person as Ahmad Saad?" | a disambiguation question a recruiter or an assistant would plausibly ask | fine; answer overstates (I1) |
| Counts | / 2, /about 3, /aus 2, /cv 1, elsewhere 0 visible | within budget; no stuffing |

### Titles and snippets (concerns only, not blockers)

| Page | Recruiter appeal | Rewrite risk |
|---|---|---|
| / | clear role and place; "AUS" disambiguated only by the description | medium: the parenthetical repeats "Ahmad" and "Saad"; Google sometimes collapses such titles to the H1 "Ahmad Saad" plus the site name. Middle dots are fine |
| /about | fine | medium for the same parenthetical; the pipe is fine |
| /aus | strong for the AUS queries; title, H1 and anchor agree | low. Description ends "AI Hub Assistant, researcher and 3.96 GPA": a GPA listed as if it were a role (M6) |
| /cv | strong; "available January 2027" is a good hook | low. "ex Samsung Gulf Electronics" reads like a typo (M7) |
| /projects | clear | low |
| trend-radar (59) | strong | near the mobile truncation width; unchanged this round |
| localai, mano, lorawan | fine | low |

---

## 5. Findings, by severity

### Important

**I1. FAQ answer 1 and the first llms key fact say AUS uses his full name; an AUS page linked from /aus does not.**
- Files: `apps/website/config/faq.ts` (ABOUT_FAQ[0].answer), `apps/website/config/about.ts` (LLMS_KEY_FACTS[0]).
- Exact strings: "and the American University of Sharjah uses his full name, as AUS News did when it covered his Tau Beta Pi Scholarship in June 2026." and "Full name: Ahmad Atef Saad, the form the American University of Sharjah uses (AUS News, 22 June 2026: ...)".
- Why: the only source is one AUS News article. The AUS AI Hub team page, which /aus links to as "My profile", is titled "Mr. Ahmad Saad". The FAQ answer is repeated verbatim in the FAQPage JSON-LD, /me/about.md and /llms-full.txt, so assistants will quote the overstatement as fact.
- Minimal fix: FAQ: "Yes. Ahmad Saad is the name he uses professionally, and AUS News used his full name when it covered his Tau Beta Pi Scholarship in June 2026." (141 characters, keeps the rest of the answer). Key fact: "Full name: Ahmad Atef Saad, the form AUS News used (AUS News, 22 June 2026: ...)". `R2 faq` stays green because the visible text and the schema both come from the same config string.

### Minor

**M1. The three quotes are verbatim word for word but not character for character.** `config/aus.ts` coverage.quotes. In each quote the article has a comma before "said Saad" where the site has a period ("...at AUS," / "...whole system," / "...AI and hardware,"). Quotes 2 and 3 also join two fragments the article separates with `," said Saad. "`, with no marker. This is accepted editorial practice and does not change the meaning, but it fails the brief's strict test, and the config comment says "Verbatim". Minimal fix: keep the quotes and change the comment to "Words verbatim; the comma before each attribution is rendered as a period." If strict matching is required, cite quote 2 and quote 3 as their second fragments only ("It is not enough for a model to perform well in testing. It also has to be efficient, reliable and suitable for the environment where it will be used." and "My goal is to help turn advanced AI research into technology that is efficient, dependable and ready for real use."). Both match the article exactly; the 11.1 string "It is not enough for a model to perform well in testing." still holds.

**M2. /cv ties the Samsung role to Trend Radar by figures and dates, though not by name.** `config/cv.ts` CV_HIGHLIGHTS['samsung-ai-ml-engineer'][2]: "Held combined data and inference spend to a fixed single-digit-dollar daily budget, with 315 automated tests." 315 tests is the Trend Radar meta description figure, and the same /cv page lists Trend Radar with the same "06.2026 - 08.2026" dates. The by-name rule holds. But the note in about.ts says "Keep Trend Radar and its figures out of the Samsung line", and this bullet does not. The homepage Samsung entry already carried both figures before this round, so this is owner awareness, not a regression. The bullet also reads oddly: a budget held "with" tests. Minimal fix: "Held combined data and inference spend to a fixed single-digit-dollar daily budget." (drop the tests), or drop the bullet.

**M3. "designed and fabricated" and "designed and had fabricated" are both used for the same board.** /aus and the case study Approach say "designed and fabricated". The new case study Overview sentence (`config/projects.ts` lorawan description), its "My role" paragraph and llms-full say "designed and had fabricated" / "had the board fabricated". Both are sourced, but a reader sees two versions. Minimal fix: in `config/aus.ts` change "designed and fabricated the custom PCB" to "designed the custom PCB, and had it fabricated," or accept the article's wording everywhere. The owner decides which is true.

**M4. The Mano simulator sits inside the coursework paragraph on /aus.** `config/aus.ts` computer-engineering paragraph 2: "My coursework includes ... Computer architecture is also the subject of my cycle-accurate simulator of Mano's Basic Computer". The case study already says "it would hide the part the course is about", and the new meta description says "by Ahmad Saad, a Computer Engineering student at AUS". No sentence says it was coursework. Taken together, though, they invite the reading that PLAN 3.4 forbids. Minimal fix: replace that sentence with "Separately, I wrote a [cycle-accurate simulator of Mano's Basic Computer](/projects/mano-computer-simulator) in Python."

**M5. /aus intro wording.** `config/aus.ts` intro: "Ahmad Saad, published by AUS as Ahmad Atef Saad, is ...". A person is not "published". Suggested: "Ahmad Saad, named in AUS News as Ahmad Atef Saad, is ...". This would require updating the 11.1 needle; low priority.

**M6. /aus meta description list.** `config/aus.ts` description: "... Tau Beta Pi UAE Alpha President, AI Hub Assistant, researcher and 3.96 GPA." Suggested: "... Tau Beta Pi UAE Alpha President, AI Hub Assistant and researcher, with a 3.96 GPA." (150 characters).

**M7. /cv meta description.** `config/cv.ts` description: "ex Samsung Gulf Electronics". Suggested: "ex-Samsung Gulf Electronics" (152 characters; a hyphen is not a banned dash).

**M8. "Three of my answers from that article:"** `config/aus.ts` coverage.lead. The article is a feature that quotes him, not a Q&A. Suggested: "Three of my quotes from that article:".

**M9. The IEEE SSCS sentence sits in the Tau Beta Pi section.** `config/aus.ts` tau-beta-pi paragraph 1: "and I have also served as Treasurer of the IEEE Solid-State Circuits Society." The role belongs to a different organisation. As worded on every page, it can also read as treasurer of the global IEEE society rather than of a student chapter (pre-existing wording in education.ts). Minimal fix: move the clause to the Computer Engineering section. The owner should confirm whether it was the AUS student chapter before anyone changes the noun.

**M10. llms.txt does not link the homepage.** `app/(llms)/llms.txt/route.ts` "## Pages" lists 8 URLs (/about, /aus, /cv, /projects and the 4 case studies). https://ahmadsaad.dev/ is not linked anywhere in llms.txt; this predates the round. Minimal fix: add `- [Home](https://ahmadsaad.dev/): Profile, experience, projects and education.` as the first Pages entry.

**M11. Project period display disagrees between the markdown endpoints and the HTML.** llms-full.txt and /me/projects.md show "Period: 2025 - Present" (Mano) and "Period: 2026 - Present" (LoRaWAN). /cv and the case studies show "2025" and "2026", and the new Overview sentences say "wrote in 2025" and "had fabricated in 2026", which read as finished. The formatter predates this round. Minimal fix: give both projects an `end` in config/projects.ts (owner decision), or make the md formatter print a year-only start without "Present".

**M12. WebSite node differs between pages.** Index emits `#website` with alternateName ["Ahmad Atef Saad", "ahmadsaad.dev"]. About, aus, cv and projects emit the same @id with only name and url. This is harmless, because graphs merge by @id, but it is inconsistent. Optional fix: emit the same full WebSite node everywhere, or reference it by @id only.

**M13. Tense-sensitive copy lives outside config.** `app/about/page.tsx` (DESCRIPTION "senior"), `app/projects/page.tsx` (intro "senior"), `app/(llms)/me/experience.md/route.ts` ("senior"), `lib/seo/person.ts` ("senior", "in progress, expected December 2026"), `features/home/components/about-teaser.tsx` ("January 2027" x2) and `features/home/components/contact.tsx` ("Graduating December 2026, available from January 2027."). The code reviewer owns the "all copy from config" rule; listed here so the January 2027 sweep does not miss these files.

---

## 6. Tense trap inventory (for the January 2027 sweep)

Visible body text of the built pages (block-split; counts are occurrences):

| Page | senior | graduating | graduates / "I graduate" | expected / "expect to" | final semester | January 2027 |
|---|---|---|---|---|---|---|
| index.html | 1 (definition) | 1 (contact: "Graduating December 2026, available from January 2027.") | 1 (definition) | 1 (Education "08.2023 - 12.2026 (expected)") | 1 (Education highlight) | 4 (about teaser label and value, definition, contact) |
| about.html | 3 (intro, definition, FAQ 1) | 0 | 2 (definition, FAQ 2) | 0 | 2 (Education, FAQ 4) | 3 (definition, What's next, FAQ 2) |
| aus.html | 1 (intro) | 0 | 2 (intro "graduates", closing "I graduate") | 1 ("expect to finish in December 2026") | 1 (Tau Beta Pi) | 1 (closing) |
| cv.html | 0 | 1 (summary) | 0 | 1 (Education "(expected)") | 1 (honours) | 1 (status line) |
| projects.html | 1 (intro) | 0 | 0 | 0 | 0 | 0 |
| projects/trend-radar.html | 1 (author line) | 0 | 0 | 0 | 0 | 0 |
| projects/localai.html | 1 (author line) | 0 | 0 | 0 | 0 | 0 |
| projects/mano-computer-simulator.html | 1 (author line) | 0 | 0 | 0 | 0 | 0 |
| projects/lorawan-sensor-node.html | 1 (author line) | 0 | 0 | 0 | 0 | 0 |

Not visible but indexed or read by agents:

| Surface | Terms |
|---|---|
| index head (title, meta, og, twitter) | senior x3, January 2027 x3 |
| about head | senior x3 |
| cv head | January 2027 x3 |
| JSON-LD Person (index, about, aus, cv, projects) | description "senior", "graduating in December 2026", "January 2027"; disambiguatingDescription "senior"; hasCredential "(in progress, expected December 2026)"; about.html FAQPage adds graduates, final semester, January 2027 |
| llms.txt | senior 1, graduating 1, expected 1, final semester 1, January 2027 2 |
| llms-full.txt and /me/about.md | senior 3, graduating 1, graduates 2, expected 2, final semester 3, January 2027 4 (each) |
| /me/experience.md, /me/projects.md | senior 1 each |
| Not scanned | public/Ahmad_Saad_CV.pdf (binary) |

Source locations: config/user.ts (description, metaDescription), config/about.ts (ABOUT_INTRO, PROFILE_DEFINITION, ABOUT_SECTIONS, LLMS_KEY_FACTS, PROJECT_AUTHOR_PREDICATE), config/faq.ts, config/aus.ts, config/cv.ts, config/education.ts (period "(expected)", "final semester" highlight), plus the six non-config files in M13.

---

## 7. Method notes

- Commands were run from `apps/website` in Git Bash with `python -I` (the coordinator's CHK and R2). The ad hoc scripts are in the session scratchpad `eval-static` folder: extract.py, rulescan.py, ldcheck.py, navcheck.py, quotecheck.py and tense_nonvisible.py.
- Both AUS articles were fetched with curl into separate folders and parsed as data. Quotes were compared sentence by sentence against the article's UTF-8 text.
- Not done (out of scope): wrangler dry run (Worker size taken from the coordinator), 11.6 headers and routes, 11.9 visual, and the code diff review.
