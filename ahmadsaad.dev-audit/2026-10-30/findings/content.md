# Content Quality Findings: ahmadsaad.dev

Audit date: 2026-10-31 (folder 2026-10-30). Specialist: content quality (E-E-A-T, readability, query coverage, copy rules, AI citation readiness).
Method: server HTML of all 7 indexable pages fetched with a Chrome UA, parsed with BeautifulSoup (main element) and trafilatura (boilerplate-stripped prose). Flesch-Kincaid grade uses a heuristic syllable counter (textstat is not installed in the plugin venv), so treat grades as +/- 1. The 5 text endpoints were read in full.

Status: COMPLETE except two items marked "partial" (config file grep for copy rules, and full href mapping of internal anchors).

---

## 1. Score

**Content Quality: 74 / 100.** Rationale: unusually specific, honest, first-person engineering copy with clean copy-rule compliance, held back by a homepage that never states the full name in prose, meta descriptions that omit "Ahmad Saad", a thin /projects index, a broken /me/about.md, and no question-led content for recruiter queries.

| Component | Score | Notes |
|---|---|---|
| E-E-A-T (weighted) | 76 | Experience 78, Expertise 85, Authoritativeness 62, Trust 80 |
| AI citation readiness | 72 | Good llms.txt and llms-full.txt; weak /me/about.md; home lacks a self-contained "who is" sentence |
| Query coverage | 68 | Name, AUS, Samsung, FDE present in body copy; not in titles or descriptions; no Q&A headings |
| Copy-rule compliance | 95 | Zero dashes, zero LightGBM, zero scraping words on rendered pages; one rule-adjacent risk (see F7) |
| Thin content | 65 | /projects index has about 44 words of unique prose |

E-E-A-T breakdown (internal model weights 20/25/25/30, not Google's):

- **Experience 78/100.** Named employers with month-level dates, measured outcomes (315 automated tests, 16 SQL migrations, 49-question golden set, 8 embedders and 5 rerankers compared, roughly 75% accuracy, 25% inefficiency reduction), first-person problem narratives on LocalAI. Gaps: LoRaWAN and Mano have no measured result, Trend Radar has no Result section, no photos of the fabricated PCB or dashboard.
- **Expertise 85/100.** GPA 3.96, Tau Beta Pi President, Dean's List x6, Chancellor's List x3, Academic Merit Scholarship, Claude Certified Architect: Foundations badge, technically accurate depth (ISA details, PMIC part numbers, hybrid retrieval with cross-encoder reranking).
- **Authoritativeness 62/100.** Public repos (trend-radar sanitized extract, LocalAI, Mano), a live LocalAI demo, LinkedIn, CV PDF. Missing: credential verification URL for the Anthropic badge (none observed), any third-party mention, testimonials (config/testimonials.ts exists but nothing rendered on the 7 pages), and the "recognition from regional HQ" claim is unverifiable.
- **Trust 80/100.** Email visible on home, LinkedIn and CV linked, estimates labelled as estimates, an explicit disclosure that the Trend Radar repo is a sanitized extract. Deductions: empty social links and no email in /me/about.md, date and tense inconsistencies across surfaces (F5, F10).

---

## 2. What works

- /about opens with a model answer sentence: "I'm Ahmad Saad, a Computer Engineering senior at the American University of Sharjah in the United Arab Emirates, and I build production AI systems."
- Availability, visa and start date are stated plainly on / and /about: "I hold a UAE Golden Visa, so no employer sponsorship is required. I graduate in December 2026 and I am available to start January 2027."
- The $60K and 20% figures are correctly framed everywhere: "an estimated $60K" and "a projected 20% increase".
- Samsung role is correctly past tense with an end date (06.2026 - 08.2026) on /, /about, /me/experience.md and llms-full.txt; /about says "From June to August 2026 I was an AI/ML Engineer at Samsung Gulf Electronics in Dubai."
- Trend Radar copy never names Samsung; it says "A regional marketing team" and "The client is referred to only as 'the brand'".
- LocalAI is a model case study: "The problem I found", "What I did about it", "What I built", "How I measured it", "My role", with concrete numbers and bugs found by the eval.
- Every project page carries a visible byline ("Built by Ahmad Saad" plus dates), Previous/Next links with descriptive project-name anchors, and a "My role" section.
- One h1 per page; all project images have descriptive alt text naming Ahmad Saad; the badge alt is "Claude Certified Architect: Foundations, issued by Anthropic"; decorative video poster correctly uses alt="".
- Copy-rule scan of rendered HTML: 0 occurrences of U+2014 or U+2013 in visible text or raw HTML of all 7 pages; 0 "LightGBM"; 0 "scrape"/"scraping". The only vendor reference is the generic phrase "commercial data vendors" (no vendor names).
- Readability is appropriate for a technical recruiter audience (prose grade roughly 9 to 11).

---

## 3. Per-page table

Words = words inside the main element (includes tech chips, card labels and on the homepage a duplicated stack marquee and per-word hero spans). Prose = trafilatura boilerplate-stripped words (closer to unique copy). Grade = Flesch-Kincaid on the prose extract.

| URL | Words (main) | Prose words | FK grade | Title len | Desc len | First body sentence names "Ahmad Saad" |
|---|---|---|---|---|---|---|
| / | 1,189 | 287 | 11.3 | 35 | 150 | No. First sentence: "Forward deployed. Builds the system, scopes it with the people who use it, ships it." Bio says "I'm Ahmad" (first name only) |
| /about | 536 | 472 | 11.2 | 41 | 134 | Yes |
| /projects | 233 | 44 | n/a (5.8 on 37 words) | 22 | 151 | No. "Write-ups of the systems I have built..." (h1 does name him) |
| /projects/trend-radar | 555 | 517 | 10.3 | 59 | 87 | No (byline "Built by Ahmad Saad" yes) |
| /projects/localai | 646 | 591 | 9.3 | 54 | 155 | No (byline yes) |
| /projects/mano-computer-simulator | 377 | 353 | 10.4 | 72 | 95 | No (byline yes) |
| /projects/lorawan-sensor-node | 371 | 344 | 9.1 | 77 | 97 | No (byline yes) |

Note for coordinator: the homepage meta description measured 150 characters (not 158). I found no headshot `<img>` in the server HTML of `/`; `/ahmad-saad.jpg` appears there only inside the JSON-LD Person `image`. The headshot `<img alt="Ahmad Saad">` is on /about. Please re-verify the "headshot img present on homepage" note.

### Heading outlines (h1 to h3)

- **/**: h1 Ahmad Saad; h2 Forward Deployed; h2 Experience (h3 Samsung Gulf Electronics, Electro-Mechanical Company LLC, Chief Nest, ONBRND, American University of Sharjah; job titles are h4); h2 Projects (h3 Trend Radar, LocalAI, Mano Basic Computer Simulator, Energy Harvesting LoRaWAN Sensor Node, ahmadsaad.dev); h2 Education (h3 American University of Sharjah); h2 Stack; h2 GitHub; h2 Let's Talk.
- **/about**: h1 Ahmad Saad; h2 Education; h2 Experience; h2 What I build; h2 What's next.
- **/projects**: h1 Projects by Ahmad Saad; h2 Projects; h3 x5 project names.
- **/projects/trend-radar**: h1 Trend Radar; h2 Overview, Problem, Approach, Architecture, This repository, My role. (No Result h2.)
- **/projects/localai**: h1 LocalAI; h2 Overview, The problem I found, What I did about it, What I built, How I measured it, Stack, My role.
- **/projects/mano-computer-simulator**: h1 Mano Basic Computer Simulator; h2 Overview, Problem, Approach, Architecture, Why cycle accuracy, My role. (No Result h2.)
- **/projects/lorawan-sensor-node**: h1 Energy Harvesting LoRaWAN Sensor Node; h2 Overview, Problem, Approach, Architecture, Why measure, Process, My role. (No Result h2.)

### Top 3 recruiter takeaways per page

- **/**: (1) AI/ML Engineer at Samsung Gulf Electronics who solely built a production trend intelligence platform with an estimated $60K in avoided spend; (2) Golden Visa, no sponsorship, available January 2027; (3) AUS Computer Engineering, GPA 3.96, Tau Beta Pi President.
- **/about**: (1) Who he is and where he studies (first sentence); (2) Samsung platform built and scoped with stakeholders; (3) Target roles: technical product management, forward deployed or solutions engineering, AI/ML engineering, management and strategy.
- **/projects**: (1) Five builds spanning LLM pipelines to a PCB; (2) Trend Radar estimated $60K savings; (3) LocalAI 100% retrieval on a laptop GPU.
- **/projects/trend-radar**: (1) "Measurement decides, LLMs describe" design; (2) cost governance to a single-digit-dollar daily budget, 315 tests; (3) estimated $60K savings, projected 20% engagement.
- **/projects/localai**: (1) private document AI fully in the browser with a Playwright privacy audit; (2) requirements gathered like a forward deployed engineer; (3) 49-question CI eval, 100% retrieval and answers on an integrated GPU.
- **/projects/mano-computer-simulator**: (1) cycle-accurate model of the full datapath; (2) full ISA plus CLI debugger; (3) public source on GitHub.
- **/projects/lorawan-sensor-node**: (1) designed and fabricated a 2-layer PCB; (2) energy harvesting power path with named parts; (3) PPK2 headers for current profiling (but no measured result).

---

## 4. Findings

### F1. Homepage prose never states the full name or a self-contained "who is Ahmad Saad" answer
- **Severity:** High
- **Evidence:** https://ahmadsaad.dev/ first body sentence: "Forward deployed. Builds the system, scopes it with the people who use it, ships it." The bio paragraph begins "I'm Ahmad, a Computer Engineering senior at the American University of Sharjah who ships production systems." The full string "Ahmad Saad" appears in prose nowhere on `/` (only the split h1 "Ahmad" / "Saad", alt text and JSON-LD). The literal phrase "AI engineer" appears only in the eyebrow "AI Engineer · FDE".
- **Root cause:** The hero tagline and the "Forward Deployed" section copy (features/home/components, sourced from config/about.ts and/or config/user.ts) were written as brand copy, not as an entity-defining answer. For a name shared with the Egyptian singer Ahmed Saad, Google and AI assistants need one sentence that binds "Ahmad Saad" to "AI engineer", "UAE" and "American University of Sharjah".
- **Fix:** In the "Forward Deployed" section's first paragraph (the string starting "I'm Ahmad, a Computer Engineering senior" in config/about.ts or the home about component under features/home/components), replace it with the 60-word home opening in section 5.1. Keep the hero tagline as is. Do not split the new paragraph into per-word spans.

### F2. Meta descriptions on / and all 4 project pages omit "Ahmad Saad"; three project descriptions are short and reused verbatim
- **Severity:** High
- **Evidence:**
  - `/` description (150 chars): "Computer Engineering senior building and scoping production AI systems as a forward deployed engineer. UAE Golden Visa holder, available January 2027." No name, no AUS.
  - `/projects/trend-radar` (87): "Production TikTok trend-detection platform where measurement decides and LLMs describe."
  - `/projects/mano-computer-simulator` (95): "Cycle-accurate CPU simulator of Mano's Basic Computer with full ISA support and a CLI debugger."
  - `/projects/lorawan-sensor-node` (97): "Custom 2-layer PCB with an ATMEGA4809 MCU, LoRa transceiver, and an energy harvesting power path."
  - `/projects/localai` (155): name absent.
  - Each project description is identical to the card text on / and /projects and to the llms.txt line.
- **Root cause:** Project metadata reuses `project.description` from config/projects.ts (generateMetadata in app/projects/[id]/page.tsx and/or the helper in lib/seo/metadata.tsx). The homepage description is set in lib/seo/metadata.tsx (or config/site.ts) without the name.
- **Fix:** Add an optional `seoDescription` field to each project in config/projects.ts and have generateMetadata in app/projects/[id]/page.tsx use `project.seoDescription ?? project.description`. Use the strings in section 5.5. Update the homepage description in lib/seo/metadata.tsx (or config/site.ts, wherever the 150-char string lives) to the string in section 5.5. All titles and descriptions remain unique across the 7 pages.

### F3. /me/about.md is thin and contains empty links; it promises contact details it does not give
- **Severity:** High (AI citation surface)
- **Evidence:** https://ahmadsaad.dev/me/about.md (644 bytes) contains `- [twitter]()` and `- [bluesky]()` with empty URLs, and no email. llms.txt describes it as "Who I am, where I am based, and how to reach me." No education, GPA, availability detail or target roles beyond the summary paragraph.
- **Root cause:** The route that serves /me/about.md iterates every social key in config/user.ts, including ones with empty href, and does not include `email`, education or availability.
- **Fix:** In the /me/about.md route handler (search apps/website/app for "Personal Information" or "Social Links" to locate it): (a) filter out social links whose href is empty; (b) add `- Email: ahmadd.saad02@gmail.com`; (c) add an "Education" block (B.S. Computer Engineering, American University of Sharjah, 08.2023 - 12.2026 expected, GPA 3.96 / 4.0, Tau Beta Pi President) from config/education.ts; (d) add an "Availability" block: "Available to start January 2027. UAE Golden Visa holder, no employer sponsorship required. Based between Abu Dhabi and Sharjah. Languages: English and Arabic." Alternatively remove the empty `twitter` and `bluesky` entries from config/user.ts if they are unused anywhere else.

### F4. /projects index is thin: about 44 words of unique prose
- **Severity:** Medium
- **Evidence:** https://ahmadsaad.dev/projects intro is one sentence: "Write-ups of the systems I have built, from production LLM pipelines to a custom PCB. Each one covers the problem, the approach, the architecture, and my role." Everything else is card text duplicated verbatim from the homepage Projects section.
- **Root cause:** app/projects/page.tsx renders the same card grid component as the homepage with a one-line lede.
- **Fix:** In app/projects/page.tsx, replace the lede with the 95-word intro in section 5.4, and give each card a one-sentence outcome line that differs from the homepage card (or add a short "What to look at first" paragraph). Change the generic anchors as per F9.

### F5. Project dates differ between project pages and the AI text endpoints
- **Severity:** Medium
- **Evidence:** /projects/mano-computer-simulator byline shows "2025"; /me/projects.md and /llms-full.txt show "Period: 2025 - Present". /projects/lorawan-sensor-node byline shows "2026"; the endpoints show "Period: 2026 - Present". (Trend Radar and LocalAI match across surfaces.)
- **Root cause:** The project page byline in app/projects/[id]/page.tsx formats the period differently from the /me/projects.md and llms-full.txt generators (likely drops the "Present" end, or uses a separate start-year field in config/projects.ts).
- **Fix:** Decide the truth with Ahmad (are these still in progress?). If finished, set the end year in config/projects.ts (for example "2025" only) so every surface prints the same string. If ongoing, make the byline render "2025 - Present". One source string, rendered unchanged everywhere.

### F6. Three of four case studies lack a Result section; LoRaWAN and Mano have no measured outcome
- **Severity:** Medium
- **Evidence:**
  - /projects/lorawan-sensor-node: Impact chip says "Sustainable, battery-free environmental monitoring powered by harvested energy." but the page reports no measured current, harvested power, transmit interval or uptime, although the whole Problem section is about measuring power ("the power draw has to be measurable rather than assumed").
  - /projects/mano-computer-simulator: no test programs, validation method, or course context.
  - /projects/trend-radar: outcome appears only in the Overview impact chip; the body ends with "This repository" and "My role".
- **Root cause:** `caseStudy` objects in config/projects.ts have problem/approach/architecture/role fields but no `result` field.
- **Fix:** Add a `result` field to the caseStudy type in config/projects.ts and render it as an h2 "Result" before "My role" in app/projects/[id]/page.tsx. Fill it with the copy in section 5.3. For LoRaWAN and Mano, the copy contains bracketed placeholders that Ahmad must supply; do not publish placeholders, and if no figures exist, soften the LoRaWAN impact chip to describe the design goal rather than an achieved outcome (suggested text in 5.3).

### F7. Rule-adjacent risk: Trend Radar is implicitly tied to Samsung through identical dates and figures
- **Severity:** Medium (owner decision; the literal rule "not tied to Samsung by name" is complied with)
- **Evidence:** On https://ahmadsaad.dev/ the Samsung Gulf Electronics entry (06.2026 - 08.2026) ends "reducing an estimated $60K in spend ... a projected 20% increase in engagement rates", and two sections later the Trend Radar card shows "06.2026 - 08.2026" context and "An estimated $60K in cost savings and a projected 20% increase in engagement rates." /about's Samsung paragraph uses Trend Radar's tagline almost verbatim ("Deterministic measurements decide every verdict; language models only describe what the measurements found"). /llms-full.txt places both in one file with the same period and figures, so an AI assistant will connect them.
- **Root cause:** The impact string and period in config/projects.ts (Trend Radar) mirror config/experience.ts (Samsung).
- **Fix:** If the intent is that a reader should not be able to link them, (a) in config/projects.ts change Trend Radar's impact to an engineering outcome that does not repeat the Samsung figures, for example "Combined data and inference spend held to a fixed single-digit-dollar daily budget, with 315 automated tests." and (b) in app/about/page.tsx reword "Deterministic measurements decide every verdict; language models only describe what the measurements found" to "Deterministic signals decide every verdict and the language models only explain them." If the owner is comfortable with the implicit link, no change; record the decision.

### F8. Two project titles exceed about 60 characters and will truncate
- **Severity:** Medium
- **Evidence:** /projects/mano-computer-simulator title (72): "Mano Basic Computer Simulator: Cycle-Accurate CPU in Python | Ahmad Saad". /projects/lorawan-sensor-node title (77): "Energy Harvesting LoRaWAN Sensor Node: Custom 2-Layer PCB Design | Ahmad Saad". The "| Ahmad Saad" brand suffix is the part that gets cut.
- **Root cause:** Title template in app/projects/[id]/page.tsx or lib/seo/metadata.tsx concatenates a long project title with the suffix.
- **Fix:** Add a `seoTitle` field in config/projects.ts and use it in generateMetadata. Mano: "Mano Basic Computer Simulator in Python | Ahmad Saad" (52). LoRaWAN: "Energy Harvesting LoRaWAN Sensor Node PCB | Ahmad Saad" (54).

### F9. Generic internal link anchors waste relevance; /about prose mentions projects without linking them
- **Severity:** Medium
- **Evidence:** On / and /projects every card link reads "Read the case study" (4 times per page). /about ends "See the projects or go back to the homepage." with anchors "projects" and "homepage". /about's "What I build" names LocalAI, Mano's Basic Computer simulator and the LoRaWAN sensor node in plain text without links. Homepage link to /about reads "More about me". Good: project pages use "Previous Trend Radar" / "Next LocalAI" and a footer "About Ahmad Saad". (Partial: anchor texts verified from rendered text; href mapping per anchor not exhaustively verified.)
- **Root cause:** Project card component under features/home/components (shared by app/projects/page.tsx) hardcodes "Read the case study"; app/about/page.tsx has a static closing line.
- **Fix:** In the project card component, change the anchor to `Read the ${project.title} case study` (or keep the visible text and add a visually hidden span with the project title). Change "More about me" to "More about Ahmad Saad". In app/about/page.tsx, link "LocalAI" to /projects/localai, "a cycle-accurate simulator of Mano's Basic Computer" to /projects/mano-computer-simulator, "a custom PCB for an energy harvesting LoRaWAN sensor node" to /projects/lorawan-sensor-node, and change the closer to "See Ahmad Saad's project case studies or go back to the homepage."

### F10. Tense mismatch on the IEEE role
- **Severity:** Low
- **Evidence:** /about: "I was Treasurer of the IEEE Solid-State Circuits Society." / , /llms-full.txt: "Treasurer of the IEEE Solid-State Circuits Society" (reads as current).
- **Root cause:** config/education.ts bullet has no time marker; app/about/page.tsx prose was written separately.
- **Fix:** Confirm with Ahmad. If past, change the config/education.ts bullet to "Former Treasurer of the IEEE Solid-State Circuits Society". If current, change /about to "and I am Treasurer of the IEEE Solid-State Circuits Society".

### F11. No question-led headings; "open to remote" is never stated
- **Severity:** Low (High for AI-assistant citation of recruiter questions)
- **Evidence:** No page has a heading phrased as a question. Recruiter questions are answered only in prose: availability (/ and /about), location (/about only: "I am based between Abu Dhabi and Sharjah"), Samsung work (/ and /about). Nothing on any page or endpoint says whether he is open to remote or relocation, although the audience brief includes remote roles and he has worked remotely for Riyadh and California teams.
- **Root cause:** Narrative layout with numbered sections ("01 / 04") rather than answer blocks.
- **Fix:** Add a "Questions recruiters ask" section to app/about/page.tsx (after "What's next") using the copy in section 5.2, and mirror it as a "## Questions recruiters ask" block in /me/about.md and llms-full.txt. Ahmad must fill the bracketed remote/relocation answer before publishing.

### F12. /about does not contain the literal phrases "AI engineer" or "forward deployed engineer" in body copy; title competes with /
- **Severity:** Low
- **Evidence:** /about body uses "AI/ML Engineer" and "forward deployed or solutions engineering"; the literal phrases appear only in the meta description ("an AI engineer in the UAE"). Titles: / "Ahmad Saad · AI Engineer in the UAE" and /about "About Ahmad Saad | Computer & AI Engineer" both target "ahmad saad ai engineer"; neither title nor description on any page contains "AUS" or "American University of Sharjah" except the /about description ("at AUS").
- **Root cause:** No query-to-page mapping.
- **Fix:** Let / own "ahmad saad", "ahmad saad ai engineer", "ahmad saad forward deployed engineer". Let /about own "ahmad saad aus" and "ahmad saad samsung": change the /about title in lib/seo/metadata.tsx (or app/about/page.tsx metadata) to "About Ahmad Saad | AI Engineer, AUS Computer Engineering" (56) and the description to the string in 5.5. Use the /about opening in 5.1, which contains "AI engineer" and "American University of Sharjah (AUS)".

### F13. Certification is image-only on the homepage, with no verification link
- **Severity:** Low
- **Evidence:** On /, the Education block shows the heading "Certification" followed only by `<img alt="Claude Certified Architect: Foundations, issued by Anthropic">`; the credential name is not in visible text. No credential verification URL observed on / or /about.
- **Root cause:** Credential component renders the badge without a caption or link.
- **Fix:** In the education/credential component under features/home/components, add a visible caption "Claude Certified Architect: Foundations, Anthropic" and wrap the badge in a link to the credential verification URL (Ahmad to supply; do not publish without a real URL).

### F14. Minor copy defects
- **Severity:** Low
- **Evidence:** /projects/mano-computer-simulator shows "1 tools" (also "3 tools", "7 tools", "13 tools" on other pages are fine). Homepage Experience label reads "2024 to 2026" while three roles are "Present".
- **Fix:** In app/projects/[id]/page.tsx pluralize the tool counter (`${n} ${n === 1 ? "tool" : "tools"}`). In the experience section component, change the range label to "2024 to present".

### F15. Role-target list dilutes the AI engineer and FDE positioning
- **Severity:** Low (owner decision)
- **Evidence:** /about "What's next": "I am looking for roles in technical product management, forward deployed or solutions engineering, AI/ML engineering, and management and strategy."
- **Fix:** If the priority is AI engineer and FDE roles, reorder in app/about/page.tsx to lead with them: "I am looking for forward deployed engineer, AI engineer and solutions engineering roles, and I am also open to technical product management." Owner decides whether to keep "management and strategy".

### Copy-rule compliance detail
- Rendered pages (7): U+2014 = 0, U+2013 = 0 (visible text and raw HTML including RSC payload); "LightGBM" = 0; "scrape"/"scraping" = 0; vendor names = 0. Generic phrase "commercial data vendors" present on / ("running on the official TikTok API for Business alongside commercial data vendors"), /projects/trend-radar ("Collectors run on the official TikTok API for Business and commercial data vendors"), /me/experience.md and /llms-full.txt. Compliant, no names.
- Text endpoints (/llms.txt, /llms-full.txt, /me/about.md, /me/experience.md, /me/projects.md): read in full; no em or en dash, LightGBM or scraping wording observed. Partial: not machine-scanned for U+2013.
- Config files: **partial, not run** (time-box). Implementer should run from apps/website: `grep -rnP "\x{2014}|\x{2013}|LightGBM|[Ss]crap" config app features lib --include=*.ts --include=*.tsx --include=*.md` (exclude node_modules, .next, .open-next). Note the middle dot "·" used in titles and bylines is allowed.

### Images (alt text)
| Page | src | alt | Verdict |
|---|---|---|---|
| /, /about | /about/drive-poster.jpg | "" | Correct (decorative video poster) |
| /about | /ahmad-saad.jpg | "Ahmad Saad" | OK; better: "Ahmad Saad, AI engineer, headshot" |
| /, /projects, each project page | /projects/*.jpg (5) | "[Project], a project by Ahmad Saad" | Good, names Ahmad; could add what the image shows |
| /, /about | /credentials/claude-certified-architect.png | "Claude Certified Architect: Foundations, issued by Anthropic" | Good |
No missing alt attributes on any page.

### Query coverage
| Query | Best page | Key phrase in body copy? | In title/description? | Gap |
|---|---|---|---|---|
| ahmad saad | / | h1 only; prose says "I'm Ahmad" | Title yes, description no | F1, F2 |
| ahmad saad aus | /about | Yes: "American University of Sharjah", "AUS" | Description has "AUS"; title no | F12 |
| ahmad saad ai engineer | / | Eyebrow "AI Engineer · FDE" only; /about has "AI/ML Engineer" | / title yes; /about description yes | F1, F12 |
| ahmad saad samsung | /about | Yes: "Samsung Gulf Electronics", "Dubai" | No | Add Q&A heading (5.2) |
| ahmad saad forward deployed engineer | / | Yes: "I work as a forward deployed engineer" | / description yes | /about lacks literal phrase |
| Is he available? | / and /about | Yes | / and /about descriptions yes | Not a heading |
| Where is he based? | /about | Yes ("between Abu Dhabi and Sharjah") | No | Missing on / |
| Open to remote/relocation? | none | No | No | F11 |
| What did he do at Samsung? | /about | Yes, prose | No | Q&A heading |

---

## 5. Proposed copy (copy rules applied: no em or en dashes, no LightGBM, no vendor names, no scraping words, Trend Radar not named alongside Samsung, $60K and 20% as estimates; facts taken only from the live site and /me endpoints)

### 5.1 Opening paragraphs

**Homepage, first paragraph of the "Forward Deployed" section (60 words, first person):**

> I'm Ahmad Saad, an AI engineer and forward deployed engineer in the UAE, and a Computer Engineering senior at the American University of Sharjah with a 3.96 GPA. At Samsung Gulf Electronics I architected and solely built a production trend intelligence platform for the regional marketing team. I hold a UAE Golden Visa and I am available from January 2027.

**/about, opening paragraph (56 words, first person):**

> I'm Ahmad Saad, an AI engineer based between Abu Dhabi and Sharjah in the United Arab Emirates. I study Computer Engineering at the American University of Sharjah (AUS), hold a 3.96 GPA, and graduate in December 2026. I build production AI systems that run under real cost governance and answer to the stakeholders who use them.

### 5.2 "Questions recruiters ask" block for /about (h2 plus h3 questions)

**h2: Questions recruiters ask**

**h3: Is Ahmad Saad available for hire?**
> Yes. I graduate from the American University of Sharjah in December 2026 and I am available to start in January 2027. I hold a UAE Golden Visa, so no employer sponsorship is required.

**h3: Where is Ahmad Saad based?**
> I am based between Abu Dhabi and Sharjah in the United Arab Emirates. I have also worked remotely with teams in Riyadh and California. [Ahmad to confirm before publishing: "I am open to remote roles" and/or "open to relocation".]

**h3: What did Ahmad Saad do at Samsung Gulf Electronics?**
> From June to August 2026 I was an AI/ML Engineer at Samsung Gulf Electronics in Dubai. I architected and solely built a production trend intelligence platform in TypeScript, Node.js and PostgreSQL for the regional marketing team, and scoped it directly with marketing, creative and innovation stakeholders. It replaced external tooling at an estimated $60K in avoided spend compared to similar platforms.

**h3: What roles is Ahmad Saad looking for?**
> Forward deployed engineer, AI engineer and solutions engineering roles, plus technical product management. The common thread is working close to the people who use a system: scoping it with them, building it, and measuring whether it worked.

**h3: What languages does Ahmad Saad speak?**
> English and Arabic.

### 5.3 Result sections for case studies (new h2 "Result", placed before "My role")

**Trend Radar (facts already on the page; does not add Samsung linkage):**
> The platform runs within a fixed single-digit-dollar daily budget for combined data and inference spend, enforced by a cross-process budget ledger in PostgreSQL. It ships with 315 automated tests and 16 versioned SQL migrations, and its impact is an estimated $60K in cost savings and a projected 20% increase in engagement rates.

(If F7 is actioned, drop the final clause and keep the engineering outcome only.)

**LocalAI:** already has "How I measured it"; no change needed.

**Mano Basic Computer Simulator (needs Ahmad's input; do not publish brackets):**
> I checked the simulator against [number] hand-traced programs from [course name, if any], including [indirect addressing / subroutine call with BSA / interrupt cycle], and the register and memory state matched the hand trace at every timing step. [Ahmad to supply real validation details.]

**Energy Harvesting LoRaWAN Sensor Node (needs Ahmad's input; do not publish brackets):**
> With the PPK2 on the inline headers, the board drew [X mA] during a LoRaWAN transmission and [Y uA] while idle, and [the harvester sustained a transmission every Z minutes / result of the battery-free test]. [Ahmad to supply measured figures.]

If no measured figures exist, change the LoRaWAN impact chip in config/projects.ts from "Sustainable, battery-free environmental monitoring powered by harvested energy." to "Designed for battery-free environmental monitoring, with current profiling built into the board."

### 5.4 /projects intro (95 words, replaces the current lede)

> These are case studies by Ahmad Saad, an AI engineer and Computer Engineering senior at the American University of Sharjah. Two are AI systems: Trend Radar, a production TikTok trend-detection platform where measurement decides and LLMs describe, and LocalAI, private AI for company documents that runs entirely in the browser. Two are hardware and architecture builds: a cycle-accurate simulator of Mano's Basic Computer in Python, and a custom 2-layer PCB for an energy harvesting LoRaWAN sensor node. Each case study covers the problem, the approach, the architecture, and my role.

### 5.5 Titles and meta descriptions

| Page | Title (chars) | Description (approx chars) |
|---|---|---|
| / | keep "Ahmad Saad · AI Engineer in the UAE" (35) | "Ahmad Saad, AI engineer and forward deployed engineer in the UAE. Computer Engineering senior at AUS, UAE Golden Visa holder, available January 2027." (149) |
| /about | "About Ahmad Saad \| AI Engineer, AUS Computer Engineering" (56) | "Ahmad Saad is an AI engineer and Computer Engineering senior at the American University of Sharjah, formerly at Samsung Gulf Electronics. Available January 2027." (about 158) |
| /projects | keep "Projects by Ahmad Saad" (22) | keep |
| /projects/trend-radar | keep (59) | "Trend Radar by Ahmad Saad: a production TikTok trend-detection platform where measurement decides and LLMs describe, with cost governance and 315 tests." (about 151) |
| /projects/localai | keep (54) | "LocalAI by Ahmad Saad: private AI for company documents that runs entirely in the browser, with page-level citations and a Playwright privacy audit." (about 149) |
| /projects/mano-computer-simulator | "Mano Basic Computer Simulator in Python \| Ahmad Saad" (52) | "Ahmad Saad's cycle-accurate simulator of Mano's Basic Computer in Python, with full ISA support, micro-operation control, and a CLI debugger." (about 141) |
| /projects/lorawan-sensor-node | "Energy Harvesting LoRaWAN Sensor Node PCB \| Ahmad Saad" (54) | "Ahmad Saad's custom 2-layer PCB for an energy harvesting LoRaWAN sensor node: ATMEGA4809 MCU, LoRa radio, AEM10330 PMIC and PPK2 current profiling." (about 148) |

Note on the /about description: it names Samsung on the page about Ahmad, not on the Trend Radar page, so it does not tie Trend Radar to Samsung.

### 5.6 Anchor text replacements
- Card links: "Read the case study" to "Read the Trend Radar case study", "Read the LocalAI case study", "Read the Mano simulator case study", "Read the LoRaWAN sensor node case study".
- Home: "More about me" to "More about Ahmad Saad".
- /about closer: "See Ahmad Saad's project case studies or go back to the homepage."

---

## 6. Top 5 fixes (impact over effort)

1. **Rewrite the homepage bio opening (F1, 5.1).** One string in config/about.ts or the home about component; binds "Ahmad Saad" to AI engineer, UAE, AUS and Samsung for disambiguation from the singer. Effort: 10 minutes.
2. **Put "Ahmad Saad" in every meta description and shorten two titles (F2, F8, 5.5).** Add `seoTitle` and `seoDescription` to config/projects.ts and update the home and about descriptions. Effort: 30 minutes.
3. **Fix /me/about.md (F3).** Drop empty twitter and bluesky links, add email, education and availability. Highest-leverage AI citation fix. Effort: 20 minutes.
4. **Add the "Questions recruiters ask" block to /about and mirror it in /me/about.md and llms-full.txt (F11, 5.2).** Directly answers availability, location, Samsung and role questions in quotable form. Effort: 45 minutes plus Ahmad's remote/relocation answer.
5. **Expand /projects intro and replace generic anchors (F4, F9, 5.4, 5.6).** Lifts the thinnest page and passes project names as anchor text from / and /about. Effort: 30 minutes.

Next tier: unify project periods (F5), add Result sections once Ahmad supplies figures (F6), decide on the implicit Trend Radar and Samsung linkage (F7), IEEE tense (F10), credential link (F13), "1 tools" (F14).
