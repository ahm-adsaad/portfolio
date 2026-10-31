# Stream A report: identity and schema

Date: 2026-10-31. Branch: seo/name-aus-2026-10-31 (not committed; the coordinator commits).
Tasks done: A1, A2, A3, A4, A5, A6, A7, A8, A9, A10 (no change needed), A11 (this file). Nothing skipped.

## Files touched (all paths under apps/website/)

| File | Task | Change |
|---|---|---|
| config/user.ts | A1 | FIRST_NAME / MIDDLE_NAME / LAST_NAME / NAME / FULL_NAME constants; `middleName` and `fullName` on the type and on USER; new `description` and `metaDescription` |
| lib/seo/person.ts (NEW) | A2 | PERSON_ID, WEBSITE_ID, HEADSHOT_ID, orgId, AUS_ID, TBP_CHAPTER_ID, articleId, pixels, headshotImage, ausOrganization, employerOrganizations, buildPerson, personGraph, personStub, websiteStub (reference implementation, every value kept) |
| lib/seo/project-schema.ts | A2 | local personStub / websiteStub / pixels removed; imported from ./person and re-exported; `isoMonth`; `dateCreated` and `dateModified` on every project node; `author: { '@id': PERSON_ID }` |
| config/education.ts | A3 | `shortName: 'AUS'`, `sameAs` (Wikipedia, Wikidata Q4115992), highlights reordered and extended |
| config/experience.ts | A3 | aus-ai-hub-assistant title: "Center for Innovation in Teaching and Learning" |
| config/about.ts | A4 | `import { USER }`, AUS_NEWS_2026 const, ABOUT_INTRO "(AUS)", PROFILE_DEFINITION, ABOUT_SECTIONS link markup, PressMention.image, LLMS_KEY_FACTS (12 bullets), PROJECT_AUTHOR_PREDICATE |
| app/page.tsx | A5 | HOME_TITLE; local ids, HEADSHOT, organizations and Person removed; `@graph` = `...personGraph()`, WebSite (new `alternateName: [USER.fullName, USER.domain]`), ProfilePage, `...projects` |
| features/home/components/hero.tsx | A6 | eyebrow, full-name byline, stagger shift 3 to 6, CV pill to /cv (internal), `priority` removed from HeroVideo |
| components/headshot.tsx | A6 | optional `alt` prop, default "Headshot of Ahmad Saad (Ahmad Atef Saad)" |
| features/home/components/education.tsx | A6 | AUS News press line and the /aus link after the highlights |
| features/home/components/contact.tsx | A6 | `CV (PDF)` external pill to `CV` pill on /cv |
| app/projects/page.tsx | A7 | TITLE, DESCRIPTION, OG card title kept as `Projects by Ahmad Saad`, intro "(AUS)", JSON-LD `...personGraph()` + websiteStub |
| app/projects/[id]/page.tsx | A8 | "About Ahmad Saad" link removed; author line `<Link>{USER.name}</Link> {PROJECT_AUTHOR_PREDICATE}`; personStub imported from @/lib/seo/person |
| config/projects.ts | A8, A9 | seoDescription for mano and lorawan; first sentence of each case-study `description` |

Unchanged (owned, checked, no edit needed): config/site.ts (CONTENT_LAST_MODIFIED is already '2026-10-31'), features/home/components/statement.tsx, features/home/components/about-teaser.tsx (picks up the new PROFILE_DEFINITION), components/hero-video.tsx.

## Every new user-visible string

Homepage (/):
- Title: `Ahmad Saad (Ahmad Atef Saad) · AI Engineer · AUS, UAE` (53)
- Meta description (also og:description, WebSite and ProfilePage description): `Ahmad Saad is an AI and forward deployed engineer in the UAE and a Computer Engineering senior at the American University of Sharjah. Available January 2027.` (157)
- Hero eyebrow: `AI Engineer · UAE`
- Hero byline: `Ahmad Atef Saad · Computer Engineering · American University of Sharjah` (71)
- Hero CV pill: label `CV`, now href /cv (internal Link). Contact pill: `CV` (was `CV (PDF)`), href /cv.
- Headshot alt (/ and /about): `Headshot of Ahmad Saad (Ahmad Atef Saad)` (40)
- About block (PROFILE_DEFINITION): `Ahmad Saad, full name Ahmad Atef Saad, is an AI engineer and forward deployed engineer based between Abu Dhabi and Sharjah in the United Arab Emirates. He is a Computer Engineering senior at the American University of Sharjah (AUS), where he holds a 3.96 GPA, is President of Tau Beta Pi UAE Alpha, and graduates in December 2026. From June to August 2026 he was an AI/ML Engineer at Samsung Gulf Electronics in Dubai, where he architected and solely built a production trend intelligence platform for the regional marketing team that replaced external tooling at an estimated $60K in avoided spend. He also built LocalAI, private AI for company documents that runs entirely in the browser. He holds the Claude Certified Architect: Foundations certification from Anthropic, speaks English and Arabic, holds a UAE Golden Visa, so no employer sponsorship is required, and is available to start in January 2027.`
- Education highlights: `President of Tau Beta Pi UAE Alpha, previously chapter Vice President`; `Tau Beta Pi Scholarship, US$1,000 for the final semester (2026)` (new); IEEE and Academic Merit lines unchanged.
- Press line: `AUS News, 22 June 2026: ` + link `AUS engineering student receives competitive Tau Beta Pi Scholarship` (target _blank, rel "noopener noreferrer")
- Link to /aus: `Ahmad Saad at AUS: Tau Beta Pi, AI Hub and research`
- Experience ledger position title: `AI Hub Assistant, Center for Innovation in Teaching and Learning`

/about (strings from config/about.ts; Stream C renders them):
- ABOUT_INTRO first sentence: `I'm Ahmad Saad, a Computer Engineering senior at the American University of Sharjah (AUS) in the United Arab Emirates, and I build production AI systems.`
- Education paragraph: exact plan string, with links `[Tau Beta Pi UAE Alpha](/aus#tau-beta-pi)` and `[AUS News covered the award](https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship)`, ending the sentence `under my full name, Ahmad Atef Saad.`
- Experience paragraph 2: `...AI Hub Assistant at the Center for Innovation in Teaching and Learning, where I led the redesign of the university's [AI Hub website](/aus#ai-hub) and write evaluations...`
- What I build: links `[LocalAI](/projects/localai)`, `[a cycle-accurate simulator of Mano's Basic Computer](/projects/mano-computer-simulator)`, `[a custom PCB for an energy harvesting LoRaWAN sensor node](/projects/lorawan-sensor-node)`.

/projects:
- Title: `Projects by Ahmad Saad, AUS Computer Engineering` (48); OG card title stays `Projects by Ahmad Saad`; H1 unchanged.
- Description: `Case studies by Ahmad Saad, Computer Engineering at AUS: a production trend-detection platform, private in-browser AI, a CPU simulator and a sensor node.` (153)
- Intro: `...Computer Engineering senior at the American University of Sharjah (AUS): two AI systems, ...`

Case studies (all four):
- Author line: `Ahmad Saad` (link to /about) + `is an AI engineer and Computer Engineering senior at the American University of Sharjah (AUS).`
- mano seoDescription (150): `Cycle-accurate Mano Basic Computer simulator in Python by Ahmad Saad, a Computer Engineering student at AUS, with full ISA support and a CLI debugger.`
- lorawan seoDescription (149): `Energy harvesting LoRaWAN sensor node on a custom 2-layer PCB by Ahmad Saad, a Computer Engineering student at AUS: ATMEGA4809 MCU and AEM10330 PMIC.`
- Overview openers (A9), exactly as in the plan:
  - trend-radar: `Trend Radar is a production trend-detection platform that Ahmad Saad architected and built on his own in 2026, on the official TikTok API for Business.`
  - localai: `LocalAI is private AI for company documents that Ahmad Saad has designed and built end to end since August 2026, and it runs entirely in the browser.`
  - mano: `The Mano Basic Computer Simulator is a cycle-accurate Python simulator of Mano's Basic Computer that Ahmad Saad wrote in 2025, with the full datapath, complete ISA support and micro-operation level control, plus a CLI debugger for stepwise execution and state inspection.`
  - lorawan: `The Energy Harvesting LoRaWAN Sensor Node is a custom 2-layer PCB that Ahmad Saad designed and had fabricated in 2026, in a research group at the American University of Sharjah whose work was supported by an AUS Undergraduate Research Grant. The board integrates an ATMEGA4809 MCU, ...` (rest unchanged)

Agent endpoints and schema (third person):
- USER.description (llms blockquotes, Person.description): `Ahmad Saad (Ahmad Atef Saad) is an AI engineer, forward deployed engineer and Computer Engineering senior at the American University of Sharjah (AUS) in the United Arab Emirates, graduating in December 2026 and available to start work in January 2027. He holds a UAE Golden Visa, so no employer sponsorship is required.`
- LLMS_KEY_FACTS: the 12 bullets of A4 item 5, verbatim.
- Person: disambiguatingDescription, awards, headshot caption `Ahmad Saad (Ahmad Atef Saad), AI engineer and Computer Engineering student at the American University of Sharjah`, degree credential name, as in the A2 reference.

## Deviations (all minor)

1. **config/user.ts comment.** The plan's comment spells `"Ahmad Atef Saad"`, which together with `const MIDDLE_NAME = 'Atef'` makes `grep -c "Atef" config/user.ts` print 2, but A1's own check expects 1. The comment now reads "AUS publishes it with the middle name (AUS News, 22 June 2026)". Constants and values are exactly as specified; the check prints 1.
2. **config/experience.ts line wrap.** "for" is one character longer than "of", which pushed the title line past Biome's width; the title is now on its own line under `title:` (Biome's output). The text is unchanged.
3. **Comments added.** hero.tsx has a JSX comment above `<HeroVideo>` saying why it has no `priority`; about.ts has a doc comment above ABOUT_SECTIONS noting the `[label](href)` markup and RichText. Neither renders.
4. **app/projects/page.tsx** imports `personGraph` and `websiteStub` from `@/lib/seo/person` (same function as the project-schema re-export).
5. **Line endings.** config/about.ts and lib/seo/person.ts were written with the Write tool and have LF line endings. The other files keep CRLF. `core.autocrlf=true` normalizes both on commit, and `git diff` shows only content changes. I did not run Biome `--write`, because it would rewrite the CRLF files in full. A stdin Biome format check on every edited file shows no formatting difference apart from a pre-existing long line at config/experience.ts:62, which is not mine and was left alone.

No plan string was found wrong. All plan character counts were confirmed: 157, 53, 48, 153, 150, 149, 71.

## round2-fallback markers

None. lib/seo/person.ts existed before any consumer needed it. `grep -rn "round2-fallback"` over app, lib, components, config and features prints nothing.

## Verification output (verbatim)

Type gate (`C:\Users\ahmad\AppData\Local\Temp\claude\C--Users-ahmad-Desktop-GitHubRepos-portfolio\907104f7-959c-403a-9267-0fb6950440d5\scratchpad\streamA\tsconfig.stream-A.json`, including next-env.d.ts, types/**/*.d.ts and all 18 owned files). It was run from apps/website after A2 and again at the end:
```
$ node_modules/.bin/tsc -p ".../scratchpad/streamA/tsconfig.stream-A.json"; echo "tsc exit $?"
tsc exit 0
```
(no diagnostics)

Extra read-only check: the other streams' consumers of the contract (app/about/page.tsx, app/aus/page.tsx, app/cv/page.tsx, lib/llms.ts) also typecheck against lib/seo/person.ts: `exit 0`, no output.

Copy scan, from apps/website:
```
$ python -I ../../ahmadsaad.dev-audit/2026-10-31/verify/round2_check.py scan config/user.ts config/about.ts config/education.ts config/experience.ts config/site.ts config/projects.ts lib/seo/person.ts lib/seo/project-schema.ts app/page.tsx app/projects/page.tsx "app/projects/[id]/page.tsx" features/home/components/hero.tsx features/home/components/statement.tsx features/home/components/about-teaser.tsx features/home/components/education.tsx features/home/components/contact.tsx components/headshot.tsx components/hero-video.tsx
clean
```

Greps:
```
$ grep -rln "Atef" --include=*.ts --include=*.tsx .   (excluding node_modules, .next, .open-next)
./config/user.ts
$ grep -c "Atef" config/user.ts config/about.ts
config/user.ts:1
config/about.ts:0
$ grep -rn "Center of Innovation" config app lib components features
(nothing)
$ grep -n "alumniOf" lib/seo/person.ts
95:    // Student until December 2026, so AUS is an affiliation, not alumniOf.
96:    // After graduation: add `alumniOf: { '@id': AUS_ID }` and turn the degree
$ grep -n "Ahmad_Saad_CV.pdf" features/home/components/*.tsx
(nothing)
```

Schema spot check without a build: esbuild bundled a scratch script that calls personGraph(), personStub() and projectSchema(). Its output:
- graph order: CollegeOrUniversity #org-aus, Organization #org-samsung-gulf (with parentOrganization Samsung Electronics), #org-elmec, #org-chief-nest, Person #person
- Person: alternateName ["Ahmad Atef Saad"], additionalName "Atef", no alumniOf, affiliation #org-aus, worksFor [#org-chief-nest, #org-aus], memberOf OrganizationRole "President" with memberOf "Tau Beta Pi UAE Alpha" / https://www.tbp.org, 2 homeLocation Places, occupationLocation Country, hasCredential[0] credentialCategory "degree", subjectOf[0] with @id `<article url>#article`, about #person, image tbp_1_1.jpg, publisher #org-aus; headshot width/height are the numbers 748
- #org-aus: alternateName "AUS", sameAs Wikipedia + Wikidata Q4115992
- personStub: alternateName, additionalName and 3 sameAs URLs
- projects dateCreated: trend-radar 2026-06, localai 2026-08, mano-computer-simulator 2025, lorawan-sensor-node 2026, portfolio 2026-08; dateModified 2026-10-31 on all

## Notes for the coordinator

- Visible full-name count on / by construction: byline 1 + PROFILE_DEFINITION 1 = 2. The Headshot alt adds 1. /about renders ABOUT_INTRO, which has no full name, plus the Education sentence, which has one; C supplies the other two.
- #org-elmec is emitted in personGraph() but not referenced, the same as before this round. It is not a dangling reference.
- The /aus link text on the homepage is the plan's literal string ("Ahmad Saad at AUS: ..."); it is not templated from USER.name.
- No build, dev server, wrangler, formatter or git write was run.

## Suggested commit message

```
Make the full name a single source and deepen the Person schema

Spell the full name once in config/user.ts and template it everywhere
else. Move the Person graph into lib/seo/person.ts so every page shares
one node: AUS as affiliation with Wikipedia and Wikidata sameAs, the
Tau Beta Pi UAE Alpha presidency as an OrganizationRole, the AUS News
article as subjectOf, two home locations and the degree in progress.

Retitle the homepage and /projects around the full name and AUS, add the
full-name byline, the AUS News line and the /aus link on the homepage,
point the CV pills at /cv, give case studies an author line and dates,
and fix the CITL name.
```
