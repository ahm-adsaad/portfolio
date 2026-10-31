# Stream C report: about page, FAQ, agent files, off-site deliverables

Date: 2026-10-31. Branch: seo/name-aus-2026-10-31 (nothing committed).

Tasks done: C1, C2, C5, C6, C7, C4, C3, C8 (run in the order the coordinator gave: C1, C2, C5 to C7, C4, C3). Nothing skipped.

## Files touched

App (apps/website):
- NEW `config/faq.ts` (C1)
- NEW `components/faq.tsx` (C2)
- `lib/llms.ts` (C4)
- `app/(llms)/llms.txt/route.ts` (C4)
- `app/(llms)/llms-full.txt/route.ts` (C4)
- `app/(llms)/me/about.md/route.ts` (C4)
- `app/(llms)/me/experience.md/route.ts` (C4)
- `app/(llms)/me/projects.md/route.ts` (C4)
- `app/about/page.tsx` (C3)

Off-site deliverables (not app code, not run):
- NEW `ahmadsaad.dev-audit/2026-10-31/offsite/github-profile-README.md` (C5)
- NEW `ahmadsaad.dev-audit/2026-10-31/offsite/github-apply.sh` (C6)
- NEW `ahmadsaad.dev-audit/2026-10-31/offsite/outreach.md` (C7)

Not touched: `config/user.ts`. Stream A had already added `fullName` and `middleName` (A1) before C1 needed them, so the permitted cross-stream edit was not used.

Formatting: `biome format --write --line-ending=crlf` on the nine app files above only (the checkout is CRLF with core.autocrlf=true). It changed only wrapping (one `flatMap` in lib/llms.ts, a few JSX attribute breaks in app/about/page.tsx).

## round2-fallback markers

None. `lib/seo/person.ts` and `components/rich-text.tsx` both existed when C3 was written, so app/about/page.tsx imports `personGraph`, `PERSON_ID`, `WEBSITE_ID`, `HEADSHOT_ID`, `websiteStub` from `@/lib/seo/person` and `RichText` from `@/components/rich-text` directly. Re-checked before this report: both files present, `grep -rn "round2-fallback"` over my files prints nothing.

## Every new user-visible string

/about (rendered values; the code templates USER.name and USER.fullName):
- `<title>`: "About Ahmad Saad (Ahmad Atef Saad) | AI Engineer, AUS" (53)
- meta description: "Ahmad Saad (Ahmad Atef Saad) is an AI engineer, a Computer Engineering senior at the American University of Sharjah and President of Tau Beta Pi UAE Alpha." (155)
- OG card meta line: "Ahmad Atef Saad · AUS Computer Engineering" (OG title stays "About Ahmad Saad")
- New Profile section (bone, right after the hero): section-head value "Profile", H2 "Profile", paragraph: "Ahmad Saad, full name Ahmad Atef Saad, is an AI engineer, forward deployed engineer and Computer Engineering senior at the American University of Sharjah (AUS) in the United Arab Emirates. He is President of Tau Beta Pi UAE Alpha and an AI Hub Assistant at the AUS Center for Innovation in Teaching and Learning, and in June 2026 AUS News reported his US$1,000 Tau Beta Pi Scholarship. He graduates in December 2026 and is available to start work in January 2027."
- New Questions section (ink, after the four ABOUT_SECTIONS): section-head value "Questions", H2 "Questions about Ahmad Saad", then the eight FAQ items, each question an H3 and answer a paragraph, text exactly as in PLAN.md C1:
  1. Is Ahmad Atef Saad the same person as Ahmad Saad?
  2. Is Ahmad Saad available for hire?
  3. Does Ahmad Saad need visa sponsorship?
  4. What is Ahmad Saad's role in Tau Beta Pi?
  5. What does Ahmad Saad do at the American University of Sharjah besides his degree?
  6. What did Ahmad Saad do at Samsung Gulf Electronics?
  7. What has Ahmad Saad built?
  8. What certification and honours does Ahmad Saad hold?
- Closing line (moved into the Questions section): "See my project case studies, Ahmad Saad at AUS or the CV, or go back to the homepage." (links /projects, /aus, /cv, /)
- New pill: "CV" (to /cv), after Email, LinkedIn, GitHub.
- Unchanged but moved: the AUS News press line and the "Last updated" line.
- The ABOUT_SECTIONS paragraphs (Stream A copy) now render through RichText, so their `[label](href)` links show as links: /aus#tau-beta-pi, the AUS News article, /aus#ai-hub, /projects/localai, /projects/mano-computer-simulator, /projects/lorawan-sensor-node.

JSON-LD on /about: AboutPage (primaryImageOfPage by @id #headshot, hasPart #faq), BreadcrumbList (unchanged), FAQPage built from the same ABOUT_FAQ items, the full person graph (CollegeOrUniversity #org-aus, employer Organizations, Person), WebSite stub. The old personStub and inline ImageObject are gone.

Agent endpoints:
- /llms.txt: new line 5 "Last updated: 2026-10-31"; new "## Press" block with "- [AUS engineering student receives competitive Tau Beta Pi Scholarship](https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship): AUS News, 22 June 2026. Profiles Ahmad Atef Saad."; two new Pages lines "- [Ahmad Saad at AUS](https://ahmadsaad.dev/aus): Tau Beta Pi UAE Alpha, the AUS AI Hub, research and AUS News coverage." and "- [CV](https://ahmadsaad.dev/cv): Experience, education, projects, certification and skills on one page."; Optional label "Resume (PDF)" renamed "CV (PDF)".
- /llms-full.txt: "Last updated: 2026-10-31" after the blockquote, "## Press" after the About block, "## FAQ" (eight "### question" plus answer) at the end.
- /me/about.md: blockquote with USER.description, "Last updated: 2026-10-31", "## FAQ" at the end.
- /me/experience.md: H1 "# Experience: Ahmad Saad", blockquote "> Roles held by Ahmad Saad, an AI engineer and Computer Engineering senior at the American University of Sharjah (AUS)."
- /me/projects.md: H1 "# Projects by Ahmad Saad", blockquote "> Selected projects by Ahmad Saad, an AI engineer and Computer Engineering senior at the American University of Sharjah (AUS)."
- All five keep MARKDOWN_HEADERS (X-Robots-Tag: noindex).

## Verification done without a Next build

1. Type gate (scratchpad tsconfig per PLAN.md section 4, includes all nine app files):
   ```
   $ node_modules/.bin/tsc -p "C:/Users/ahmad/AppData/Local/Temp/claude/C--Users-ahmad-Desktop-GitHubRepos-portfolio/907104f7-959c-403a-9267-0fb6950440d5/scratchpad/streamC/tsconfig.stream-C.json"
   $ echo $?
   0
   ```
   No output, exit 0 (re-run after formatting, same result).

2. Copy scan:
   ```
   $ python -I ../../ahmadsaad.dev-audit/2026-10-31/verify/round2_check.py scan app/about/page.tsx config/faq.ts components/faq.tsx lib/llms.ts "app/(llms)/llms.txt/route.ts" "app/(llms)/llms-full.txt/route.ts" "app/(llms)/me/about.md/route.ts" "app/(llms)/me/experience.md/route.ts" "app/(llms)/me/projects.md/route.ts" ../../ahmadsaad.dev-audit/2026-10-31/offsite/github-profile-README.md ../../ahmadsaad.dev-audit/2026-10-31/offsite/github-apply.sh ../../ahmadsaad.dev-audit/2026-10-31/offsite/outreach.md
   clean
   ```
   `grep -ln "Atef"` over the nine app files prints nothing.

3. Rendered endpoints: the five route handlers bundled with esbuild (next/server shimmed to Response) and called in Node; output in the scratchpad (`scratchpad/streamC/out/*.body`). Section 11.5 checks on that output: line 3 of llms.txt has "Ahmad Atef Saad" and "(AUS)", line 5 is "Last updated: 2026-10-31"; "## Press" 1; "UAE Alpha" 2; "US$1,000" 1; "Undergraduate Research Grant" 1; /aus or /cv lines 2; about.md lines 1 to 3 name Ahmad Saad and the American University of Sharjah; experience.md and projects.md line 1 name Ahmad Saad; "## FAQ" once in about.md and once in llms-full.txt; all five send x-robots-tag noindex. No paragraph in any body names Trend Radar together with Samsung. Scan of the rendered bodies: clean.

4. Rendered /about: app/about/page.tsx server-rendered with react-dom/server (next/link shimmed to an anchor; no layout, so no nav or footer) to `scratchpad/streamC/out/about.html`, then round2_check.py:
   - names: title 53, description 155, h1 "Ahmad Saad", visible "Ahmad Atef Saad" 3, alt with it 1 ("Headshot of Ahmad Saad (Ahmad Atef Saad)"), visible "](" 0.
   - faq: 1 FAQPage, 8 questions, all 16 question and answer strings found verbatim in visible text.
   - crumbs: Home > About. refs: dangling none. persons: ok (full Person, alternateName, additionalName, OrganizationRole President of Tau Beta Pi UAE Alpha, #org-aus with both sameAs).
   - links: /aus#tau-beta-pi, /aus#ai-hub, /aus, /cv (x2), /projects, the three case studies, AUS News URL with rel "noopener noreferrer".
   - seo_check text: the definition sentence 1, "under my full name, Ahmad Atef Saad" 1, "Is Ahmad Atef Saad the same person as Ahmad Saad?" 1, "Questions about Ahmad Saad" 1, "Center for Innovation in Teaching and Learning" 3, "Trend Radar" 0, "master" 0, "PhD" 0.

5. github-apply.sh: `bash -n` syntax check only. Not run, no gh write command run. Read-only gh calls used to prepare it: `gh auth status`, `gh repo view` on the nine repos, `gh api .../readme` for sdp-sensor-nodes and etto-labs.

## Deviations, with reasons

1. **Order.** PLAN.md section 9 lists C1, C2, C4, C3, then C5 to C7; I followed the coordinator's order (C1, C2, C5 to C7, C4, C3).
2. **app/about/page.tsx imports `WEBSITE_ID` and `websiteStub` from `@/lib/seo/person`** (the plan names only personGraph, PERSON_ID, HEADSHOT_ID), and uses `PERSON_ID` / `WEBSITE_ID` for mainEntity, about and isPartOf instead of the old hand-built `${SITE_URL}/#...` strings. Same values, one source. Added a `PAGE_URL` constant.
3. **FAQ section tone is computed** from the loop (opposite of the last loop section's tone) instead of hard-coded "ink"; with four ABOUT_SECTIONS it is ink, as the plan says, and it stays correct if a section is added. The Profile and Questions sections use `data-reveal` like the loop sections.
4. **lib/llms.ts:** `formatFaqMarkdown` got a one-line doc comment; otherwise the two functions are as in the plan.
5. **llms.txt link labels left as they were** (plan: "Everything else unchanged"), although /me/about.md now also carries the FAQ and /llms-full.txt also carries Press and the FAQ. Optional follow-up for the coordinator: append ", FAQ" to the About and Full text descriptions.
6. **README (C5)** keeps the banner, typing animation, status badges, Tech Stack and Connect blocks. Changes beyond the plan bullets: banner subtitle is now "AI Engineer and Forward Deployed Engineer"; typing lines are "AI Engineer and Forward Deployed Engineer; Building Production AI Systems; Computer Vision & Applied ML; Sustainable IoT in the Background" (the "@ Samsung" line is gone); the banned-library badge and the old Samsung pipeline bullet are removed; TypeScript, PostgreSQL, Docker and Cloudflare Workers badges added (all on the site's knowsAbout list and project stacks); new "Certification and honours" and "In the news" sections; a LoRaWAN project line linking the case study (no grant claim there, see 7); an Undergraduate Research Assistant line from config/about.ts; alt text on the banner and typing images; LinkedIn URL normalized to USER.social.linkedin. Samsung appears only once, past tense, in the Experience block; Trend Radar only in the Projects block under its own heading.
7. **github-apply.sh (C6):**
   - placement-proof topic `pr` from findings/offsite.md became `public-relations` (on GitHub `pr` means pull request).
   - sdp-sensor-nodes: the repo README says "Firmware for the custom ATmega4809 energy-harvesting LoRaWAN sensor node (senior design project)". Calling it a senior design project would break the "never call the LoRaWAN board coursework" rule, and the repo does not mention the grant. So the live line sets a description from the README facts only ("Firmware for a custom ATmega4809 energy harvesting LoRaWAN sensor node: sensor drivers, a bring-up app and host unit tests, built with PlatformIO."), homepage https://ahmadsaad.dev/projects/lorawan-sensor-node (the board's case study, more specific than the site root), and topics; the grant-group wording is left commented under `# OWNER: confirm wording`.
   - etto-labs: the README is a marketing site for a GCC AI-workflow business with a "Before publish" checklist, and the site never mentions Etto Labs, so the whole line (description from the README) is commented under `# OWNER: confirm wording` and no homepage is set.
   - README push: compares and uploads with CR stripped (a Windows checkout of the audit folder may be CRLF) using temp files and `cmp -s`, instead of comparing strings. With `--dry-run` the script still runs the read-only calls (`gh auth status`, README sha and content) and only echoes the writes.
8. **outreach.md (C7):** (a) asks for "Portfolio: https://ahmadsaad.dev/aus" (findings/offsite.md had the homepage) and writes the date as 22 June 2026; (b) is addressed to Dr. Norita Ahmad, Director of CITL (named on aihub.aus.edu/about per findings/offsite.md section 1); no contact email addresses are guessed. (d) gives the bio text verbatim from the plan plus two paste-ready HTML options (A: "AI Hub Assistant" linked; B: second line "More on his work at AUS" linked) and a nofollow check.

No plan string was wrong; the FAQ, definition, title (53) and description (155) are used verbatim.

## Suggested commit message

```
Add an About profile and FAQ, and name the owner in the agent files

/about gets a third-person Profile paragraph with the full name and a
Questions section with eight answers that the FAQPage markup repeats word
for word. The page now carries the full Person graph, renders the linked
About copy, and points to /aus and /cv.

llms.txt, llms-full.txt and the /me files gain a last-updated line, the AUS
News press entry, the FAQ and links to /aus and /cv; experience.md and
projects.md name the owner in their headings.
```

The offsite folder (README, apply script, outreach drafts) is committed with the audit files.
