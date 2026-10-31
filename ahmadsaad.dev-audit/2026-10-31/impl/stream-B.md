# Stream B report: new pages and plumbing

Date: 2026-10-31. Branch: seo/name-aus-2026-10-31 (not committed). Tasks B1 to B8 done; nothing skipped.
Paths are relative to `apps/website/`.

## Files touched

New:
- components/rich-text.tsx (B1, reference implementation from PLAN.md, unchanged)
- public/b9f504812ee878b00a15106b08a1f9e1.txt (B2, 32 bytes, no trailing newline, checked with `wc -c` and `od -c`)
- scripts/indexnow.mjs (B2, as planned, `--dry-run` and `--sitemap` flags)
- config/aus.ts, app/aus/page.tsx (B5)
- config/cv.ts, app/cv/page.tsx (B6)

Edited:
- package.json: one script line, `"indexnow": "node ./scripts/indexnow.mjs"` after `assert-static-prerender` (B2)
- public/_headers: appended the `/Ahmad_Saad_CV.pdf` Link canonical rule, declared once, no X-Robots-Tag (B3)
- scripts/assert-static-prerender.mjs: EXPECTED_ROUTES guard (16 routes) and the new final message (B4)
- app/sitemap.ts: `/aus` and `/cv` after `/about`, 9 URLs in total (B7)
- components/site-nav.tsx: LINKS now About, Projects, AUS, CV, Email, LinkedIn (mobile menu reads the same array) (B7)
- components/site-footer.tsx: About, Projects, AUS, CV, llms.txt, Source (B7)
- lib/media.ts: line 35 comment only, the em dash and its spaces replaced with ", so" (B7)

Not touched: components/mobile-menu.tsx, components/nav-links.tsx (no change needed). No cross-stream edit: `config/user.ts` already had `fullName` and `middleName` from Stream A when B5 started, and `lib/seo/person.ts` already existed, so /aus and /cv import `personGraph`, `PERSON_ID`, `WEBSITE_ID`, `AUS_ID`, `TBP_CHAPTER_ID`, `articleId`, `websiteStub` from `@/lib/seo/person` directly.

## round2-fallback markers

None. `grep -rn "round2-fallback"` over every Stream B file prints nothing. `test -f lib/seo/person.ts` succeeded before this report.

## New user-visible strings

### Config copy (byte-identical in value to PLAN.md B5 and B6)

config/aus.ts `AUS_PAGE`:
- title: "Ahmad Saad at AUS: Tau Beta Pi, AI Hub and Research" (51)
- description: "Ahmad Saad (Ahmad Atef Saad) at the American University of Sharjah: Tau Beta Pi UAE Alpha President, AI Hub Assistant, researcher and 3.96 GPA." (143)
- ogTitle "Ahmad Saad at AUS"; ogMeta "Tau Beta Pi · AI Hub · Research"; eyebrow "AUS · Sharjah, UAE"
- h1: "Ahmad Saad at the American University of Sharjah"
- intro: "Ahmad Saad, published by AUS as Ahmad Atef Saad, is a Computer Engineering senior at the American University of Sharjah (AUS) in the United Arab Emirates. He holds a 3.96 GPA, is President of Tau Beta Pi UAE Alpha, works as an AI Hub Assistant at the Center for Innovation in Teaching and Learning, and graduates in December 2026."
- facts: Degree / "B.S. Computer Engineering, December 2026"; GPA / "3.96 / 4.0"; Tau Beta Pi UAE Alpha / "President"; AI Hub Assistant / "Since November 2024"
- sections (headings): "Computer Engineering at AUS", "Tau Beta Pi UAE Alpha", "The AUS AI Hub", "Research at AUS", "Web work for the College of Engineering"; the nine paragraphs exactly as in PLAN.md B5 (links: /projects/mano-computer-simulator, the 2024 AUS News chapter article, https://aihub.aus.edu/, https://aihub.aus.edu/team/mr-ahmad/, /projects/lorawan-sensor-node)
- coverage heading "In AUS News"; lead "On 22 June 2026, AUS News covered my Tau Beta Pi Scholarship under my full name, Ahmad Atef Saad, in AUS engineering student receives competitive Tau Beta Pi Scholarship. Three of my answers from that article:" (headline is the link); the three verbatim quotes; citation "AUS News, 22 June 2026"
- closing: "I graduate in December 2026 and am available to start work in January 2027."
- sources: "AUS News, 22 June 2026: AUS engineering student receives competitive Tau Beta Pi Scholarship"; "AUS News, 14 March 2024: AUS launches first international chapter of Tau Beta Pi Engineering Honor Society"; "AI Hub, Center for Innovation in Teaching and Learning, AUS"

config/cv.ts:
- title: "Ahmad Saad CV: AI Engineer, Computer Engineering at AUS" (55)
- description: "Ahmad Saad's CV: AI engineer and forward deployed engineer, Computer Engineering at AUS (3.96 GPA), ex Samsung Gulf Electronics, available January 2027." (152)
- h1 and ogTitle "Ahmad Saad, CV"; ogMeta "AI Engineer · AUS Computer Engineering"
- headline: "Ahmad Atef Saad · AI Engineer and Forward Deployed Engineer"
- status: "Abu Dhabi and Sharjah, United Arab Emirates · UAE Golden Visa, no sponsorship required · Available January 2027"
- pdf label: "Download the PDF CV"
- summary, the 14 CV_HIGHLIGHTS bullets and the 5 CV_HONOURS lines exactly as in PLAN.md B6; languages "English and Arabic"
- `grep -c "Trend Radar" config/cv.ts` = 0; "$60K" sits next to "estimated" and "20%" next to "projected" (one line, config/cv.ts:32).

### Page-level strings (written in the page files)

/aus (app/aus/page.tsx):
- Breadcrumb "Home" > "AUS"
- At a glance block: SectionHeader eyebrow "AUS", value "At a glance"; H2 "At a glance"
- Section ledger values "01 / 06" to "05 / 06" for the five sections, "06 / 06" for the coverage section, eyebrow "AUS"
- Pills: "About Ahmad Saad" (/about, fill), "Projects" (/projects), "CV" (/cv)
- "Sources" eyebrow
- "Last updated 31 October 2026" (`<time dateTime="2026-10-31">`)

/cv (app/cv/page.tsx):
- Breadcrumb "Home" > "CV"; eyebrow "Curriculum vitae"
- Pills: "Email" (mailto, fill), "LinkedIn", "GitHub", "Download the PDF CV" (all three external, new tab)
- H2s: "Summary", "Experience", "Education", "Leadership and honours", "Projects", "Certification", "Skills and languages"; SectionHeader eyebrow "CV", values "01 / 07" to "07 / 07"
- Experience: company name (H3), city (mono line), position title (H4), "MM.YYYY - MM.YYYY" or "MM.YYYY - Present" plus " · Internship" / " · Part-time" when employmentType is set
- Education: school, degree, "08.2023 - 12.2026 (expected) · GPA 3.96 / 4.0" (from config/education.ts), "Coursework: Machine Learning, Data Structures and Algorithms, Computer Architecture, Computer Networks, Wireless Communications.", "More about my time there: Ahmad Saad at AUS." (link /aus)
- Projects: each PROJECT_PAGES title linked to its case study, its period, its shortDescription
- Certification: "Claude Certified Architect: Foundations, Anthropic. Verify on Credly"
- Skills: "Languages: ...", "AI / ML: ...", "Tools & Infrastructure: ..." from TECH_STACK, then "Spoken languages: English and Arabic"
- Closing: "Read more in About Ahmad Saad, Ahmad Saad at AUS and the project case studies." (links /about, /aus, /projects); "Last updated 31 October 2026"

Nav and footer: "AUS" (/aus), "CV" (/cv).

Name budget from config strings (scratch tsx check): /aus visible "Ahmad Atef Saad" = 2 (intro, coverage lead), "Tau Beta Pi UAE Alpha" = 3, "Samsung" = 0, "Trend Radar" = 0, about 740 words of copy; /cv visible full name = 1 (headline), about 340 words from config/cv.ts, an estimated 600 to 680 words in main once experience, education, projects and skills are rendered.

## Deviations, with reasons

1. **assert-static-prerender stays strict** (no "skip when .next is stale"). The guard only runs after a build in `preview`/`deploy`, so `.next` is always fresh there, and a staleness skip could hide a real regression. Consequence: against this morning's `.next` it exits 1 listing `/aus` and `/cv`, exactly the plan's "proves the guard" check. It passes once the coordinator builds.
2. **/aus hero H1** has `rise` and `style={stagger(2)}` in addition to the planned `display h2-size mt-4 text-bone`, and sits in a `grid-12` / `lg:col-span-10` column, matching the entrance animation of the other secondary heroes. No video, no headshot.
3. **/aus quote styling** (plan left it open): blockquote `display-light intro-size max-w-[40ch] border-l-2 border-accent-strong pl-5 text-fg`; figcaption `mono-label` with a `text-link` anchor to the article (`target="_blank" rel="noopener noreferrer"`). Source links use the same `linkClass` as /about.
4. **/cv section ledgers** carry "NN / 07" values (plan only named the eyebrow "CV"), the same pattern as /about and /aus.
5. **/cv Education coursework** renders as "Coursework: a, b, c." (plan: "coursework joined with commas"); a label makes the line readable on its own.
6. **/cv closing sentence wording** was not given in the plan (only the three links and anchors): "Read more in [About Ahmad Saad](/about), [Ahmad Saad at AUS](/aus) and the [project case studies](/projects)." rendered through RichText. The "More about my time there" line and the closing template `USER.name` instead of the literal name (same output).
7. **/cv certification link label** is "Verify on Credly" when the URL is on credly.com and "Verify" otherwise, so a future non-Credly credential is not mislabelled. Output today: "Verify on Credly".
8. **/cv bullets** go through one local `Bullets` component that renders every item with RichText (so CV_HONOURS links work and Experience bullets render as plain text), with the accent rule from the homepage Education block.
9. **Doc comments added** to config/aus.ts ("Copy for /aus. First person in the sections, third person in `intro`. AUS topics only: no employer work outside the university on this page.") and config/cv.ts (Samsung entry never names its project). Neither names Trend Radar. In config/aus.ts the Dean's List paragraph uses a double-quoted string instead of an escaped single quote (same value).
10. **biome format** applied to the five new TS/TSX files only (line wrapping). Not applied to sitemap.ts, site-nav.tsx, site-footer.tsx: their working copies are CRLF and biome would have rewritten every line.
11. scripts/indexnow.mjs, the key file, the `_headers` rule, the EXPECTED_ROUTES block, RichText and the sitemap/nav/footer changes follow the plan text exactly.

No plan string needed a fix: titles 51 and 55 characters, descriptions 143 and 152, OG meta lines 31 and 38 (under the 40 character limit of createOgImage).

## Checks (verbatim)

Typecheck, from apps/website, tsconfig at `C:\Users\ahmad\AppData\Local\Temp\claude\C--Users-ahmad-Desktop-GitHubRepos-portfolio\907104f7-959c-403a-9267-0fb6950440d5\scratchpad\streamB\tsconfig.stream-B.json` (includes rich-text.tsx, config/aus.ts, app/aus/page.tsx, config/cv.ts, app/cv/page.tsx, app/sitemap.ts, site-nav.tsx, site-footer.tsx, lib/media.ts; follows imports into Stream A's person.ts and user.ts):
```
$ node_modules/.bin/tsc -p ".../streamB/tsconfig.stream-B.json"; echo "tsc exit $?"
tsc exit 0
```

Copy scan:
```
$ python -I ../../ahmadsaad.dev-audit/2026-10-31/verify/round2_check.py scan components/rich-text.tsx config/aus.ts app/aus/page.tsx config/cv.ts app/cv/page.tsx app/sitemap.ts components/site-nav.tsx components/site-footer.tsx public/_headers public/b9f504812ee878b00a15106b08a1f9e1.txt scripts/indexnow.mjs scripts/assert-static-prerender.mjs package.json lib/media.ts
clean
$ python -I ../../ahmadsaad.dev-audit/2026-10-31/verify/round2_check.py scan lib
clean
$ grep -rln "Atef" --include=*.ts --include=*.tsx . | grep -v node_modules
./config/user.ts
```

IndexNow dry run against this morning's build (7 URLs; 9 after the coordinator's build):
```
$ node scripts/indexnow.mjs --dry-run --sitemap .next/server/app/sitemap.xml.body; echo "exit $?"
indexnow: 7 URLs from .next/server/app/sitemap.xml.body
  https://ahmadsaad.dev/
  https://ahmadsaad.dev/about
  https://ahmadsaad.dev/projects
  https://ahmadsaad.dev/projects/trend-radar
  https://ahmadsaad.dev/projects/localai
  https://ahmadsaad.dev/projects/mano-computer-simulator
  https://ahmadsaad.dev/projects/lorawan-sensor-node
{
  "host": "ahmadsaad.dev",
  "key": "b9f504812ee878b00a15106b08a1f9e1",
  "keyLocation": "https://ahmadsaad.dev/b9f504812ee878b00a15106b08a1f9e1.txt",
  "urlList": [
    "https://ahmadsaad.dev/",
    "https://ahmadsaad.dev/about",
    "https://ahmadsaad.dev/projects",
    "https://ahmadsaad.dev/projects/trend-radar",
    "https://ahmadsaad.dev/projects/localai",
    "https://ahmadsaad.dev/projects/mano-computer-simulator",
    "https://ahmadsaad.dev/projects/lorawan-sensor-node"
  ]
}
indexnow: dry run, nothing sent
exit 0
```

Prerender guard against the stale `.next` (expected to fail until the coordinator builds):
```
$ node scripts/assert-static-prerender.mjs; echo "exit $?"
Expected prerendered routes are missing from the manifest:
  /aus
  /cv
A page went dynamic or was removed. Restore force-static, or update EXPECTED_ROUTES.
exit 1
```

Key file: `wc -c public/b9f504812ee878b00a15106b08a1f9e1.txt` = 32, last byte `1`, no newline. package.json parses as JSON.

## For the coordinator after the build

- `node scripts/assert-static-prerender.mjs` should print "assert-static-prerender: N prerendered routes, none with ISR, all 16 expected routes present."
- `node scripts/indexnow.mjs --dry-run --sitemap .next/server/app/sitemap.xml.body` should list 9 URLs including /aus and /cv.
- Not verifiable without a build: rendered counts in 11.1, 11.2 and 11.8 for aus.html and cv.html, `_headers` in `.open-next/assets/_headers`, and the 390/1440 visual check of /aus and /cv (long uppercase H1 "Ahmad Saad at the American University of Sharjah" at h2-size; `.display` has `overflow-wrap: anywhere`, the display face is condensed at wdth 75).

## Suggested commit message

```
Add the AUS and CV pages, IndexNow and an expected-route guard

/aus gathers Tau Beta Pi UAE Alpha, the AI Hub, research and the AUS News
coverage under the name AUS publishes, and /cv is an HTML CV that the PDF
now points at with a Link canonical header. Both are in the nav, footer and
sitemap. A RichText helper renders [label](href) links in config copy.

IndexNow gets a key file and a pnpm indexnow script with a dry run, and
assert-static-prerender now fails when an expected route is missing from
the prerender manifest.
```
