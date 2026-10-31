# GEO / AI Search Readiness: ahmadsaad.dev (round 2)

Audit date: 2026-10-31 (live checks run against production, sitemap lastmod 2026-10-31). Baseline: `2026-10-30/findings/geo.md` (score 56). Items fixed since then are listed once in section 2 and not repeated. Items from yesterday that are still open and not part of this round's focus (YouTube, GitHub profile fields, case-study bodies missing from llms-full.txt, non-chronological experience order, IEEE tense) stay as written in the 2026-10-30 file.

Scope: owner focus questions 1 to 7. Live AI-answer checks were not possible from this environment: no DataForSEO tools were available, DuckDuckGo HTML returned no results to curl, and Bing returned unrelated results. Section 3 is therefore an inference from what each engine can retrieve, not a measured answer.

---

## 1. GEO Readiness Score: 69 / 100 (was 56; expected about 75 after the top 5)

| Dimension | Weight | Score (was) | Weighted | Main drag now |
|---|---|---|---|---|
| Citability | 25% | 72 (62) | 18.0 | Home definition is good (144 words, in band, extracted). /about and all four case studies have no third-person passage that names Ahmad Saad; full name and singer disambiguation are not in any indexable text; no Q&A block |
| Structural Readability | 20% | 68 (60) | 13.6 | H1 fixed; home extraction went from 280 to 1,140 words and now contains the definition. /about extraction still drops the hero intro; no question headings |
| Multi-Modal Content | 15% | 55 (50) | 8.25 | Headshot now on home, but alt is only "Ahmad Saad"; no video or diagrams |
| Authority & Brand Signals | 20% | 54 (40) | 10.8 | Person schema now has alternateName, subjectOf NewsArticle, award, memberOf, knowsLanguage, 3 sameAs, ProfilePage dates. But /about and project pages emit a 2-field Person stub, the AUS article does not link to the site, and the AUS article states a master's and PhD plan the site contradicts |
| Technical Accessibility | 20% | 90 (65) | 18.0 | All 17 tested agents get 200 with the real page; robots.txt clean with Content-Signal. Only nit: agent files carry `X-Robots-Tag: noindex` (correct, but see G1) |
| **Total** | | | **68.65, shown as 69** | |

---

## 2. Fixed since 2026-10-30 (verified live)

- Cloudflare AI-bot block and managed robots.txt are gone. robots.txt is 208 bytes: `User-Agent: *`, `Content-Signal: search=yes, ai-input=yes, ai-train=yes`, `Allow: /`, `Disallow: /api/`, `Disallow: /admin`, sitemap. Google-Extended and Applebot-Extended are now allowed by the wildcard.
- H1 reads `Ahmad Saad` on / and /about (BeautifulSoup `h1.get_text()`).
- Home: third-person definition (`PROFILE_DEFINITION` in `apps/website/config/about.ts`), 144 words, rendered in `<main>` and kept by trafilatura (1,140 extracted words, was 280).
- /llms.txt rebuilt: subject-first blockquote, Key facts, Name note, Credly URL, empty social links removed. /me/about.md now 3,113 bytes with education and contact.
- Schema: Person alternateName `Ahmad Atef Saad`, subjectOf AUS NewsArticle (2026-06-22), award incl. Tau Beta Pi Scholarship (2026), memberOf, knowsLanguage, Credly in sameAs; ProfilePage dateCreated 2026-08-24 and dateModified 2026-10-31; AboutPage dates; /about shows `Last updated <time datetime="2026-10-31">`.
- /about shows a visible press line: `AUS News, 22 June 2026: AUS engineering student receives competitive Tau Beta Pi Scholarship.`
- /projects has a named intro (43 words, "Case studies by Ahmad Saad, an AI engineer and Computer Engineering senior at the American University of Sharjah: ...").

---

## 3. Will the site be retrieved and cited for the owner's four queries? (focus 1)

Retrieval paths: Google AI Overviews and AI Mode use Googlebot's index; ChatGPT search uses OAI-SearchBot plus Bing; Perplexity uses its own index; Claude web search fetches with Claude-SearchBot and Claude-User; Gemini grounds on Google Search (Google-Extended now allowed). None of these index `/llms.txt` or `/me/*.md` for answers, and those files send `X-Robots-Tag: noindex`, so anything that exists only there is invisible to search-grounded answers.

| Query | Competing source | Site passage an engine can quote today | Likely outcome today | After the fixes below |
|---|---|---|---|---|
| "who is Ahmad Atef Saad" | AUS News (exact full-name match, .edu, dated) | None. The string "Atef" exists only in home JSON-LD alternateName and in noindexed llms.txt / about.md / llms-full.txt (grep on all 7 HTML pages: 0 visible hits) | AUS News is the cited source and the quote is AUS's: "When Ahmad Atef Saad talks about engineering, he often returns to one question..." and "Saad, who is expected to graduate in December 2026, received the US $1,000 partial scholarship...". Google may add ahmadsaad.dev via alternateName; ChatGPT, Perplexity and Claude probably will not | /about FAQ Q1 (section 6) is an exact-match, self-contained answer and should be co-cited with AUS News |
| "Ahmad Saad AUS" | AUS News; LinkedIn | Home definition, first two sentences (52 words, quoted in section 5) | Site likely retrieved and cited; this is the strongest query today | Same, plus /about |
| "Ahmad Saad American University of Sharjah Tau Beta Pi" | AUS News (uses "Tau Beta Pi UAE Alpha") | Home definition ("is President of the Tau Beta Pi chapter") and /about Education paragraph (first person) | AUS News primary, site secondary | /about FAQ Q3 matches "Tau Beta Pi UAE Alpha" and the US$1,000 scholarship with its date |
| "is Ahmad Saad the singer" | Wikipedia and fan pages for Ahmed Saad (Egyptian singer) | None. The only disambiguation sentence ("He is not Ahmed Saad, the Egyptian singer.") lives in noindexed llms.txt and about.md | Site not retrieved; answer is about the singer only | /about FAQ Q2 gives engines an indexable "No, ..." passage |

Risk found in the AUS article (see G4): AUS News says "Looking ahead, Saad plans to pursue a master's degree and a PhD before building his career as an AI engineer." An assistant asked "is Ahmad Saad available for hire" or "what are Ahmad Atef Saad's plans" will quote this, and it conflicts with the site's "available to start in January 2027".

---

## 4. Findings

### G1. The full name and the singer disambiguation are not in any text a search-grounded assistant can quote
- **Severity:** High
- **Evidence:** visible-text grep of `<main>` on all 7 HTML pages: `Atef` 0, `singer` 0, `Ahmed` 0. Raw HTML hits for `Atef` are only the home JSON-LD (`"alternateName":"Ahmad Atef Saad"`) and its RSC copy. Text hits: `llms.txt`, `llms-full.txt`, `me/about.md` (one bullet each, "AUS News publishes his name as Ahmad Atef Saad."), and all three return `x-robots-tag: noindex`. The headshot on home has `alt="Ahmad Saad"`.
- **Root cause:** the name variant and the disambiguation were added to agent endpoints and schema but not to page copy; passage retrieval quotes visible text.
- **Fix (repo):**
  1. `apps/website/config/about.ts`: add `ABOUT_DEFINITION` (exact copy in section 6a) and render it in `apps/website/app/about/page.tsx` as the first paragraph of the body, not inside `section.page-hero` (trafilatura drops that section, see G2).
  2. Same file: add `ABOUT_FAQ` (section 6b) and render it on /about under an H2 "Questions about Ahmad Saad" with each question as an H3.
  3. Rewrite the /about press line (`PRESS_MENTIONS` render in `apps/website/app/about/page.tsx`, around line 214) as a sentence: "On 22 June 2026, AUS News profiled Ahmad Atef Saad after he received a US$1,000 Tau Beta Pi Scholarship for his final semester." followed by the linked headline.
  4. Headshot alt on home (`apps/website/app/page.tsx`, the `/ahmad-saad.jpg` img): `Ahmad Atef Saad (Ahmad Saad), AI engineer and Computer Engineering senior at the American University of Sharjah`.
  5. Home definition (`PROFILE_DEFINITION`): change only the first clause to "Ahmad Saad, full name Ahmad Atef Saad, is an AI engineer ..." [owner confirm that "full name" is accurate; otherwise use "published by AUS News as Ahmad Atef Saad"]. Rest unchanged; it stays 147 words, inside the 134 to 167 band.

### G2. /about has no third-person definition and its intro is still dropped by extractors
- **Severity:** High
- **Evidence:** `grep -c "Ahmad Saad is"` on /about HTML = 0 for every user agent (the brief assumed it exists there; it does not: the `about.ts` comment says "/about keeps its first-person intro, so the two never duplicate"). trafilatura on /about: 499 words, output starts `About / 01 / 04 / Education / I study Computer Engineering at AUS...`, so `ABOUT_INTRO` ("I'm Ahmad Saad, ...") is lost and the extracted page never names its subject. /about meta description also lost its "is" sentence: now `Ahmad Saad, an AI engineer and Computer Engineering senior at the American University of Sharjah, formerly at Samsung Gulf Electronics. Available January 2027.`
- **Fix (repo):** `apps/website/app/about/page.tsx`: render `ABOUT_DEFINITION` (section 6a) as the first `<p>` inside the content article, before section 01 Education; keep `ABOUT_INTRO` in the hero for humans. Meta description in the same file: `Ahmad Atef Saad is an AI engineer, Computer Engineering senior at the American University of Sharjah and President of Tau Beta Pi UAE Alpha.` (137 characters). Verify after deploy: `trafilatura.extract()` on /about must contain "Ahmad Atef Saad, who goes by Ahmad Saad, is".

### G3. Case-study pages have no self-contained passage that names both the project and Ahmad Saad
- **Severity:** Medium
- **Evidence:** every case study names him only in the byline (`Built by Ahmad Saad · <dates>`). Overview paragraphs start with a noun phrase ("Private AI for company documents that runs...", "A production trend-detection platform built on...", "Designed and fabricated a 2-layer custom PCB...", "Cycle-accurate simulator of Mano's Basic Computer..."). Full table in section 5. The LoRaWAN page never mentions AUS or the Undergraduate Research Grant that AUS News credits.
- **Fix (repo):** replace each project's `description` (the Overview paragraph) in `apps/website/config/projects.ts` with the openers in section 6d. Keep the existing paragraphs below them.

### G4. The AUS article states a graduate-study plan that the site contradicts
- **Severity:** High (owner decision, not a code bug)
- **Evidence:** AUS News, 2026-06-22: "Looking ahead, Saad plans to pursue a master's degree and a PhD before building his career as an AI engineer." Site, llms.txt and schema: "available to start in January 2027". The AUS page is the most authoritative source for the full name, so assistants will weight it above the site.
- **Fix (Owner action):** decide the true current plan, then publish one dated sentence on /about "What's next" and in FAQ Q4. If work comes first and study later is still planned, a sentence such as "Ahmad Saad plans to start work in January 2027 and may pursue graduate study later." [owner confirm or rewrite; do not publish unless accurate]. Optionally ask AUS Communications to append an update line or a link to ahmadsaad.dev; a link from the article would also be the single strongest off-site entity anchor available.

### G5. /llms.txt line by line (focus 3)
- **Severity:** Medium (helps agent tools only; Google ignores llms.txt and the file is noindex)
- **Evidence and verdict:**
  - `# Ahmad Saad`: fine.
  - Blockquote: 3 sentences. Sentence 1 ("Ahmad Saad is an AI engineer and forward deployed engineer based in the United Arab Emirates.") has neither "Atef" nor AUS. **Fails** the "one sentence, both spellings, AUS" test.
  - No "Last updated" line; dates in the file are relative to an unknown as-of date. **Missing.**
  - `Name: ... AUS News publishes his name as Ahmad Atef Saad.`: correct, but no date and no link to the article. No `## Press` section anywhere in llms.txt or llms-full.txt (grep `aus.edu/media` = 0).
  - Name note: present ("He is not Ahmed Saad, the Egyptian singer."). Good; covers the singer only.
  - Dated facts present: graduation December 2026, availability January 2027, Samsung June to August 2026, role start months. Good.
  - Tau Beta Pi: says "AUS Tau Beta Pi chapter" and "Tau Beta Pi Scholarship (2026)". AUS uses "Tau Beta Pi UAE Alpha" and states US$1,000; neither appears (grep `UAE Alpha` = 0).
  - Missing AUS-corroborated facts: Undergraduate Research Grant (0 hits), AI Hub redesign of aihub.aus.edu (role listed, redesign not).
  - Cache: `s-maxage=31536000` on all agent files. Fine only if each deploy purges or revalidates; confirm after the next content change with `curl -s https://ahmadsaad.dev/llms.txt | head -5`.
- **Fix (repo):** `apps/website/config/about.ts` (`LLMS_KEY_FACTS`, new `LLMS_SUMMARY`, `PRESS_MENTIONS`) and `apps/website/app/(llms)/llms.txt/route.ts` plus `apps/website/lib/llms.ts` (`formatAboutMarkdown`): emit the block in section 6c; append `ABOUT_FAQ` as `## FAQ` in `/me/about.md` and `/llms-full.txt`; add a `## Press` list built from `PRESS_MENTIONS`.

### G6. Person entity is a stub everywhere except the homepage
- **Severity:** Medium
- **Evidence:** /about and /projects/localai JSON-LD Person keys: `@id, @type, name, url` only. No alternateName, disambiguatingDescription, sameAs or subjectOf. An engine that fetches only /about (the page most likely to rank for "about Ahmad Saad") sees no link to the full name or the AUS article.
- **Fix (repo):** export one `buildPersonNode()` from the homepage schema code (`apps/website/app/page.tsx`, or move it to `apps/website/lib/seo/`) and use it in `apps/website/app/about/page.tsx` and `apps/website/app/projects/[id]/page.tsx`. Minimum on every page: `alternateName`, `disambiguatingDescription`, `sameAs`, `subjectOf`.

### G7. FAQPage schema: worth emitting on /about, for assistants, not for Google rich results (focus 5)
- Since August 2023 Google shows FAQ rich results only for well-known government and health sites, so ahmadsaad.dev will get no SERP feature. The markup is still valid, cheap, and gives parsers that read JSON-LD (Bing has said its LLM features use structured data) clean question and answer pairs.
- Rules: emit only on /about, as a separate node `{"@type":"FAQPage","@id":"https://ahmadsaad.dev/about#faq","mainEntity":[{"@type":"Question","name":"...","acceptedAnswer":{"@type":"Answer","text":"..."}}]}` in the existing AboutPage graph; text must match the visible copy character for character; generate it from `ABOUT_FAQ` so the two cannot drift. Do not emit FAQPage on the homepage or create a /faq page (a thin second URL would compete with /about for the same entity queries and starts with no links).
- Keep the singer sentence out of the Person node (as decided yesterday). In FAQ Q2 it is fine: it answers a real query and does not assert a sameAs or relation.

---

## 5. Passage-level citability (focus 4)

Word counts from `<main>` paragraphs on the live HTML. "Self-contained" means quotable without the page around it: names the subject and carries a fact.

| Page | Best 40 to 80 word passage today | Words | Self-contained? |
|---|---|---|---|
| / | "Ahmad Saad is an AI engineer and forward deployed engineer based between Abu Dhabi and Sharjah in the United Arab Emirates. He is a Computer Engineering senior at the American University of Sharjah (AUS), where he holds a 3.96 GPA, is President of the Tau Beta Pi chapter, and graduates in December 2026." (first two sentences of the 144-word definition) | 52 | Yes. Best passage on the site |
| /about | Education paragraph: "I study Computer Engineering at AUS, where I hold a 3.96 GPA and graduate in December 2026. I am President of the university's Tau Beta Pi chapter, after serving as its Vice President, ..." | 80 | Partly: first person, never names him, and the extracted page loses the H1 context. **No third-person passage** |
| /projects | "Case studies by Ahmad Saad, an AI engineer and Computer Engineering senior at the American University of Sharjah: two AI systems, Trend Radar and LocalAI, and two hardware and architecture builds, ..." | 43 | Yes |
| /projects/trend-radar | Cost governance paragraph: "Cost governance sits in PostgreSQL: per-run spend meters, a cross-process daily budget ledger, and balance-gated runs. ... 315 automated tests in an npm workspaces monorepo." | 53 | No: names neither Trend Radar nor Ahmad Saad. **Page has none** |
| /projects/localai | Overview: "Private AI for company documents that runs entirely in the browser. Built after conversations with people who were barred from, or afraid of, putting work data into hosted AI: ... a CI eval that scores 100% retrieval and 100% single-turn answers on an integrated laptop GPU." | 70 | No: no "LocalAI is", no name. **Page has none** ("How I measured it" is strong but 112 words and first person) |
| /projects/mano-computer-simulator | Architecture: "The simulator is written in Python and models the full datapath: the registers, memory, and common bus, plus micro-operation level control ..." | 56 | No subject name. **Page has none** |
| /projects/lorawan-sensor-node | Approach: "I designed and fabricated a custom 2-layer PCB around a low-power microcontroller and a long-range radio, with an energy harvesting power path and a switched sensor rail. ..." | 56 | No: first person, no project name, no AUS. **Page has none** |

Pages with no self-contained named passage: /about (third person), and all four case studies. Section 6d fixes the case studies; 6a and 6b fix /about.

---

## 6. Exact copy (no em or en dashes; estimates marked; no vendor names)

### 6a. /about definition paragraph (`ABOUT_DEFINITION`, first `<p>` of the /about body), 74 words

> Ahmad Atef Saad, who goes by Ahmad Saad, is an AI engineer and forward deployed engineer in the United Arab Emirates. He is a Computer Engineering senior at the American University of Sharjah (AUS), where he holds a 3.96 GPA, is President of Tau Beta Pi UAE Alpha, and graduates in December 2026. In June 2026 AUS News reported his US$1,000 Tau Beta Pi Scholarship. He is available to start work in January 2027.

### 6b. FAQ block for /about (`ABOUT_FAQ`), H2 "Questions about Ahmad Saad", H3 per question

1. **Who is Ahmad Atef Saad?**
   Ahmad Atef Saad, who goes by Ahmad Saad, is an AI engineer and forward deployed engineer in the United Arab Emirates. He is a Computer Engineering senior at the American University of Sharjah (AUS), holds a 3.96 GPA and graduates in December 2026. His website is ahmadsaad.dev. (47 words)

2. **Is Ahmad Saad of AUS the singer Ahmed Saad?**
   No. Ahmad Saad, published by AUS News as Ahmad Atef Saad, is a computer engineer and AI engineer at the American University of Sharjah in the UAE. He is not Ahmed Saad, the Egyptian singer, and this site does not describe any other person with the same name. (48 words)

3. **What is Ahmad Saad's role in Tau Beta Pi?**
   Ahmad Atef Saad is President of Tau Beta Pi UAE Alpha, the engineering honor society chapter at the American University of Sharjah, after serving as its Vice President. On 22 June 2026 AUS News reported that he received a US$1,000 Tau Beta Pi Scholarship for his final semester. (48 words)

4. **When does Ahmad Saad graduate, and when can he start work?**
   Ahmad Saad graduates from the American University of Sharjah with a B.S. in Computer Engineering in December 2026 and is available to start work in January 2027. He holds a UAE Golden Visa, so no employer sponsorship is required, and he is based between Abu Dhabi and Sharjah. (48 words) [add the G4 sentence here once the owner confirms it]

5. **What has Ahmad Saad built?**
   Ahmad Saad's projects include Trend Radar, a production TikTok trend detection platform with 315 automated tests; LocalAI, private AI for company documents that runs entirely in the browser and scored 100% retrieval on a 49-question evaluation; a cycle-accurate Mano Basic Computer simulator in Python; and an energy harvesting LoRaWAN sensor node PCB. (52 words)

6. **What certification and honors does Ahmad Saad hold?**
   Ahmad Saad holds the Claude Certified Architect: Foundations certification, issued by Anthropic and verifiable on Credly. At AUS he studies on an Academic Merit Scholarship, has made the Dean's List six times and the Chancellor's List three times, and received a Tau Beta Pi Scholarship in 2026. (47 words)

7. **What did Ahmad Saad do at Samsung Gulf Electronics?**
   From June to August 2026, Ahmad Saad was an AI/ML Engineer at Samsung Gulf Electronics in Dubai. He architected and solely built a production trend intelligence platform for the regional marketing team, which replaced external tooling at an estimated $60K in avoided spend and supported launch campaigns with a projected 20% increase in engagement rates. (55 words)

8. **What does Ahmad Saad do at the American University of Sharjah besides his degree?**
   Ahmad Atef Saad is the AI Hub Assistant at the AUS Center of Innovation in Teaching and Learning, where he led the redesign of the AI Hub website, aihub.aus.edu. He also builds College of Engineering websites as a web design and development consultant, and designed a LoRaWAN sensor node in a research group supported by an AUS Undergraduate Research Grant. (60 words)

Placement: /about only, after "What's next" and before the press line and footer. Mirror the same array into `/me/about.md` and `/llms-full.txt` as `## FAQ`. FAQPage JSON-LD per G7. Keep Q5 (projects) and Q7 (Samsung) as separate answers so Trend Radar is never named in the Samsung answer.

### 6c. /llms.txt opening (replace the H1, blockquote and Key facts; leave the link sections as they are)

```
# Ahmad Saad

> Ahmad Saad (Ahmad Atef Saad) is an AI engineer, forward deployed engineer and Computer Engineering senior at the American University of Sharjah (AUS) in the United Arab Emirates, graduating in December 2026 and available to start work in January 2027.

Last updated: 2026-10-31

Key facts:

- Name: Ahmad Saad. AUS News published his name as Ahmad Atef Saad on 22 June 2026.
- Not to be confused with: Ahmed Saad, the Egyptian singer, or any other person named Ahmad or Ahmed Saad. This Ahmad Saad is a computer engineer and AI engineer at AUS in the UAE.
- Education: B.S. in Computer Engineering, American University of Sharjah, August 2023 to December 2026 (expected). GPA 3.96 of 4.0.
- Availability: available to start work in January 2027. UAE Golden Visa holder, so no employer sponsorship is required. Based in Abu Dhabi and Sharjah.
- Tau Beta Pi: President of Tau Beta Pi UAE Alpha, the AUS chapter (previously Vice President). Received a US$1,000 Tau Beta Pi Scholarship for his final semester, reported by AUS News on 22 June 2026.
- Most recent industry role: AI/ML Engineer at Samsung Gulf Electronics, Dubai, June to August 2026. Architected and solely built a production trend intelligence platform for the regional marketing team, at an estimated $60K in avoided tooling spend and a projected 20% increase in engagement rates.
- Current roles: Web Design and Development Consultant, College of Engineering, AUS (since August 2026). AI Hub Assistant, Center of Innovation in Teaching and Learning, AUS (since November 2024), where he led the redesign of aihub.aus.edu. Account Manager, Chief Nest, remote (since September 2025).
- Research: designed a custom LoRaWAN sensor node PCB in an AUS research group supported by the Undergraduate Research Grant.
- Certification: Claude Certified Architect: Foundations, issued by Anthropic. Verification: https://www.credly.com/badges/976e4176-241f-4870-83ea-c66f896f64ff
- Honours: Academic Merit Scholarship, Dean's List six times, Chancellor's List three times.
- Languages: English and Arabic.
- Looking for: technical product management, forward deployed or solutions engineering, AI/ML engineering, and management and strategy.

## Press

- [AUS engineering student receives competitive Tau Beta Pi Scholarship](https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship): AUS News, 22 June 2026. Profiles Ahmad Atef Saad.
```

Render `Last updated` from the same constant that feeds sitemap lastmod and ProfilePage dateModified so all four agree.

### 6d. Case-study Overview openers (`description` in `apps/website/config/projects.ts`)

- **Trend Radar (60 words):** Trend Radar is a production TikTok trend detection platform that Ahmad Saad architected and built on his own in 2026. Deterministic measurements such as caption n-gram clustering, creator spread and adoption curves decide every verdict, and language models only describe what was measured. It runs 8 discovery lanes on a fixed single-digit-dollar daily budget and ships with 315 automated tests.
- **LocalAI (71 words):** LocalAI is private AI for company documents that Ahmad Saad has designed and built end to end since August 2026. It runs the language model, embeddings and a reranker inside the browser on WebGPU, so no document leaves the device, and a Playwright audit proves it. On a 49-question evaluation it puts the right excerpt in the prompt for 100% of questions and cites the file and page for every answer.
- **Mano Basic Computer Simulator (54 words):** The Mano Basic Computer Simulator is a cycle-accurate Python simulator that Ahmad Saad wrote in 2025 of the 16-bit accumulator machine from M. Morris Mano's Computer System Architecture. It models the full datapath one micro-operation at a time, supports the complete instruction set, and adds a command-line debugger for stepwise execution and state inspection.
- **Energy Harvesting LoRaWAN Sensor Node (61 words):** The Energy Harvesting LoRaWAN Sensor Node is a custom 2-layer PCB that Ahmad Saad designed and had fabricated in 2026, in an American University of Sharjah research group supported by the Undergraduate Research Grant. It pairs an ATMEGA4809 microcontroller with an XL1276 LoRa transceiver, an AEM10330 energy harvesting PMIC and BME680 and CO sensors, with inline PPK2 headers for current profiling.

---

## 7. AI crawler access re-check (focus 6)

`curl -A "<published UA string>"` from a non-verified IP, 2026-10-31. "Real page" = body size matches the normal page and the home body contains "Ahmad Saad is" (1 hit; /about has 0 hits for every agent because the sentence is not on that page, see G2; /llms.txt has 2).

| Agent | / | /about | /llms.txt | Real page | robots.txt | Net |
|---|---|---|---|---|---|---|
| GPTBot | 200 (137,178 B) | 200 (45,831 B) | 200 (3,583 B) | Yes | Allow (*) | Allowed (was 403) |
| OAI-SearchBot | 200 | 200 | 200 | Yes | Allow | Allowed |
| ChatGPT-User | 200 | 200 | 200 | Yes | Allow | Allowed |
| ClaudeBot | 200 | 200 | 200 | Yes | Allow | Allowed (was 403) |
| Claude-SearchBot | 200 | 200 | 200 | Yes | Allow | Allowed |
| Claude-User | 200 | 200 | 200 | Yes | Allow | Allowed |
| PerplexityBot | 200 | 200 | 200 | Yes | Allow | Allowed |
| Perplexity-User | 200 | 200 | 200 | Yes | Allow | Allowed |
| Google-Extended | token only | | | n/a | Allow (*) | Gemini grounding allowed (was Disallow) |
| Googlebot | 200 | 200 | 200 | Yes | Allow | Allowed |
| Bingbot | 200 | 200 | 200 | Yes | Allow | Allowed |
| Applebot | 200 | 200 | 200 | Yes | Allow | Allowed (Applebot-Extended token now allowed too) |
| Amazonbot | 200 | 200 | 200 | Yes | Allow | Allowed (was 403) |
| Bytespider | 200 | 200 | 200 | Yes | Allow | Allowed (was 403; owner chose ai-train=yes, so acceptable) |
| CCBot | 200 | 200 | 200 | Yes | Allow | Allowed (was 403) |
| meta-externalagent | 200 | 200 | 200 | Yes | Allow | Allowed (was robots Disallow) |
| Meta-ExternalFetcher | 200 | 200 | 200 | Yes | Allow | Allowed |

All 17 agents receive byte-identical bodies to a browser request. Crawler access is no longer a constraint. `/.well-known/llms.txt` and RSL `/license.xml` remain absent; neither is needed.

---

## 8. Platform scores (focus 7)

| Platform | 2026-10-30 | Today | Expected after top 5 | What moves it |
|---|---|---|---|---|
| Google AI Overviews | 52 | 60 | 68 | Home definition now extractable; full-name query still owned by AUS News until /about carries "Ahmad Atef Saad" in text |
| Google AI Mode | 50 | 58 | 67 | Fan-out queries ("Tau Beta Pi UAE Alpha", "is he the singer") need the FAQ answers |
| ChatGPT search | 55 | 65 | 74 | GPTBot now allowed (future model knowledge); Bing-backed retrieval needs visible full name and FAQ |
| Perplexity | 60 | 65 | 74 | Open access; benefits most from short self-contained Q&A passages and case-study openers |
| Claude | 50 | 64 | 74 | ClaudeBot now allowed; Claude-User reading /about today gets a first-person page whose extract never names him |
| Gemini (apps) | 30 | 58 | 66 | Google-Extended no longer disallowed, so grounding on the site is permitted; still competes with the singer entity |
| Bing Copilot | 55 | 60 | 68 | FAQPage JSON-LD and the full Person node on /about help Bing's structured parsing |

---

## 9. Top 5 changes (impact over effort)

| Rank | Change | Files or owner step | Fixes | Effort |
|---|---|---|---|---|
| 1 | Add `ABOUT_DEFINITION` (6a) as the first body paragraph on /about, the 8-question FAQ (6b) on /about, the /about meta description, and the full-name press sentence | `apps/website/config/about.ts`, `apps/website/app/about/page.tsx` | G1, G2 | 1 to 2 h |
| 2 | Reconcile the AUS "master's and PhD" sentence with "available January 2027"; publish one confirmed, dated sentence; ask AUS Communications for a link to ahmadsaad.dev | Owner decision, then `apps/website/config/about.ts` | G4 | 15 min owner, 10 min repo |
| 3 | Rewrite the four case-study Overview openers (6d) so each names the project, Ahmad Saad and a date | `apps/website/config/projects.ts` | G3 | 30 min |
| 4 | Full Person node (alternateName, disambiguatingDescription, sameAs, subjectOf) on /about and project pages; FAQPage node on /about generated from `ABOUT_FAQ`; headshot alt with full name; home definition opens with the full name | `apps/website/app/page.tsx` (extract builder to `apps/website/lib/seo/`), `apps/website/app/about/page.tsx`, `apps/website/app/projects/[id]/page.tsx` | G1, G6, G7 | 45 min |
| 5 | Replace the llms.txt opening with 6c (one-sentence definition with both spellings and AUS, Last updated, expanded disambiguation, Tau Beta Pi UAE Alpha and US$1,000, Research Grant, Press section); append FAQ to about.md and llms-full.txt | `apps/website/config/about.ts`, `apps/website/lib/llms.ts`, `apps/website/app/(llms)/llms.txt/route.ts` | G5 | 30 min |

Verification after deploy:
- `curl -s https://ahmadsaad.dev/about | grep -c "Ahmad Atef Saad"` returns at least 3 (definition, FAQ, press line), and the trafilatura extract of /about starts with or contains the 6a paragraph.
- `curl -s https://ahmadsaad.dev/llms.txt | sed -n 3p` prints the one-sentence definition containing "Ahmad Atef Saad" and "(AUS)".
- Google Rich Results Test on /about shows valid FAQPage and Person (no rich result expected).
- Re-run section 3 queries in ChatGPT, Perplexity, Claude, Gemini and Google AI Mode two to four weeks after reindexing and record which URL and passage each cites.

## Appendix: evidence files

Live HTML, agent files and the passage script are in the session scratchpad (not part of the repo): `live/page_*.html`, `live/llms.txt`, `live/llms-full.txt`, `live/me_about.md`, `scripts/passages.py` (BeautifulSoup paragraph word counts plus trafilatura 2.2 extraction, run with the claude-seo venv Python).
