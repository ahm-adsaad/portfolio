# Implementation report: 2026-10-30 SEO and GEO plan

- Branch: `seo/geo-pass-2026-10`
- Base commit: `9af87a1` (Drive loop behind the home hero in colour, official Claude Certified Architect badge)
- Head after this run: `9c0a843`
- Plan: `ahmadsaad.dev-audit/2026-10-30/PLAN.md`, Tasks 1 to 12, executed in order. Nothing pushed, nothing deployed, main untouched.
- Overall: DONE_WITH_CONCERNS. All 11 code tasks are committed and pass their checks. The concern is in Task 12: the plan's smoke-test commands, run exactly as written, get a 301 from every Worker route on the local preview. This is the existing middleware and was not changed by this run (details under Task 12). With the header Cloudflare sends in production added, all 18 smoke checks pass.
- Every commit is authored by `ahm-ad-saad <ahmadd.saad02@gmail.com>`. The messages are the plan's exact text, with no trailer, no AI attribution and no emoji.
- `git add` named only the files each task lists. The untracked `ahmadsaad.dev-audit/2026-10-30/` folder was never staged.

## Per-task summary

| Task | Commit | Status | Note |
|---|---|---|---|
| 1 Real spaces in hero name and statement | `958415f` | done | h1 now reads "Ahmad Saad" on / and /about; the statement extracts as one sentence |
| 2 Named definition on the homepage About block | `be92b5a` | done | `PROFILE_DEFINITION` and `CONTENT_LAST_MODIFIED` (2026-10-31) moved into config; 0 `<article>` on /; no CSS targeted `article` |
| 3 Headshot and location on the home hero | `6c591ec` | done | 56 px headshot with `fetchPriority="high"`, eyebrow "AI Engineer · Sharjah, UAE" |
| 4 Name in every description, two shorter titles, card anchors | `fb85207` | done | All titles 60 characters or fewer; all descriptions name Ahmad Saad; "1 tool" |
| 5 Person graph and every JSON-LD reference resolved | `1f47291` | done (one deviation) | Numeric ImageObject sizes need a `pixels()` cast, because schema-dts types them as Text (see Deviations) |
| 6 Date the About page and link AUS News | `a7d9b8c` | done | "Last updated 31 October 2026" and the AUS News line render; GitHub pill added |
| 7 llms.txt and about.md around the definition | `dd2dadd` | done | `/llms.txt` is byte-identical to `verify/expected-llms.txt` |
| 8 noindex on the text endpoints | `4afdf9b` | done | All 5 endpoints send `x-robots-tag: noindex`; the HTML pages do not |
| 9 Preload the hero fonts | `2747cab` | done | 3 preload links; all three hashes still match `assets/fonts` by md5 |
| 10 Cache public media for a week, webp poster | `f8bc150` | done | 5 `_headers` rules; `poster={posterWebp ?? poster}` |
| 11 Headshot on the share card at about 150 KB | `9c0a843` | done | 148,752, 148,533 and 163,189 bytes, `200 image/jpeg` |
| 12 Worker build, preview smoke test, visual and LCP check | (no commit) | done with concern | Smoke test 18/18 with `X-Forwarded-Proto: https` added; 5/18 literal (local-preview 301, see below) |

## Task 1: Separate the hero name and statement words with real spaces (`958415f`)

Step 1 baseline, before any edit (`pnpm build` then the checks):
```
h1: AhmadSaad
1
```
Changes: added `{' '}` between the two `rise-name` spans in `hero.tsx` and `app/about/page.tsx`. `statement.tsx` imports `Fragment` and renders `{i > 0 ? ' ' : null}` before each word span. The `.word` base rule in `globals.css` is now `display: inline-block;` only. The `@supports` block and the reduced-motion block are untouched.

Verify (actual):
```
CHK page index.html | grep h1   -> h1: Ahmad Saad
CHK page about.html | grep h1   -> h1: Ahmad Saad
CHK text index.html "AhmadSaad" -> 0
CHK text index.html "I build systems that have to prove they work. An AI pipeline, a CPU, a circuit board." -> 1
CHK copy (4 files)              -> clean
```
Rendered markup: `<span class="word">I</span> <span class="word">build</span> ...` and `...>Ahmad</span> <span class="block rise-name"...>Saad</span></h1>`.
Visual check (done in Task 12): the measured gap between words is uniform. It is 6.9 px at a 32 px font (390 px viewport) and 15.6 px at a 72 px font (1440 px viewport), about 0.22em, against the old 0.25em margin. There are no doubled gaps and no touching words. Screenshots: `after-home-statement-390.png` and `after-home-statement-1440.png`.

## Task 2: Lead the homepage About block with a one-paragraph definition (`be92b5a`)

`article` selector check (Execution rule 2): `grep -rn "article" apps/website/app/globals.css` found nothing, and `packages/design-system/styles` (globals.css) also had no hits. A scan of every source `.css` under `apps/website` and `packages` (excluding node_modules, .next and .open-next) also found nothing. The cards are styled by the classes `.stack-card-inner` and `.position`, which were kept. No styling needed carrying over.

Verify (actual):
```
CHK text index.html "Ahmad Saad is an AI engineer and forward deployed engineer based between Abu Dhabi and Sharjah" -> 1
CHK text index.html "More about Ahmad Saad"       -> 1
CHK text about.html "Ahmad Saad is an AI engineer" -> 0
CHK text projects.html "Case studies by Ahmad Saad" -> 1
grep -c "<article" index.html                     -> 0
sitemap lastmod                                   -> 7 <lastmod>2026-10-31</lastmod>
CHK copy (7 changed files)                        -> clean
```

## Task 3: Show the headshot and the location on the home hero (`6c591ec`)

Verify (actual):
```
CHK text index.html "AI Engineer · Sharjah, UAE" -> 1
<img src="/ahmad-saad.jpg" alt="Ahmad Saad" width="56" height="56" decoding="async" fetchPriority="high" loading="eager" class="select-none rounded-full bg-muted object-cover ring-2 ring-apricot ring-offset-2 ring-offset-ink" style="width:56px;height:56px"/>
grep -c "FDE" index.html -> 0
CHK copy -> clean
```
/about is unchanged: its 160 px `<img>` has no `fetchPriority` and no `loading` attribute.
For Review Focus 2, see Task 12 Step 5.

## Task 4: Name Ahmad Saad in every meta description and shorten two project titles (`fb85207`)

Verify (actual, from `.next/server/app/*.html`):
```
== index
title (35): Ahmad Saad · AI Engineer in the UAE
description (150): Ahmad Saad is an AI engineer and forward deployed engineer in the UAE. Computer Engineering senior at AUS, Golden Visa holder, available January 2027.
canonical: https://ahmadsaad.dev
== about
title (56): About Ahmad Saad | AI Engineer, AUS Computer Engineering
description (159): Ahmad Saad, an AI engineer and Computer Engineering senior at the American University of Sharjah, formerly at Samsung Gulf Electronics. Available January 2027.
canonical: https://ahmadsaad.dev/about
== projects
title (22): Projects by Ahmad Saad
description (151): Case studies by Ahmad Saad: a production trend-detection platform, on-device RAG in the browser, a CPU simulator, and an energy harvesting sensor node.
canonical: https://ahmadsaad.dev/projects
== projects/trend-radar
title (59): Trend Radar: Production TikTok Trend Detection | Ahmad Saad
description (152): Trend Radar by Ahmad Saad: a production TikTok trend-detection platform where measurement decides and LLMs describe, with cost governance and 315 tests.
canonical: https://ahmadsaad.dev/projects/trend-radar
== projects/localai
title (54): LocalAI: Private AI for Company Documents | Ahmad Saad
description (148): LocalAI by Ahmad Saad: private AI for company documents that runs entirely in the browser, with page-level citations and a Playwright privacy audit.
canonical: https://ahmadsaad.dev/projects/localai
== projects/mano-computer-simulator
title (52): Mano Basic Computer Simulator in Python | Ahmad Saad
description (141): Ahmad Saad's cycle-accurate simulator of Mano's Basic Computer in Python, with full ISA support, micro-operation control, and a CLI debugger.
canonical: https://ahmadsaad.dev/projects/mano-computer-simulator
== projects/lorawan-sensor-node
title (54): Energy Harvesting LoRaWAN Sensor Node PCB | Ahmad Saad
description (147): Ahmad Saad's custom 2-layer PCB for an energy harvesting LoRaWAN sensor node: ATMEGA4809 MCU, LoRa radio, AEM10330 PMIC and PPK2 current profiling.
canonical: https://ahmadsaad.dev/projects/lorawan-sensor-node
CHK text index.html "Read the Trend Radar case study"  -> 1
CHK text mano.html "1 tool"                            -> 1
CHK text mano.html "1 tools"                           -> 0
CHK copy (6 files)                                     -> clean
```
All of these match the plan's expected values.

## Task 5: Fill out the Person graph and resolve every JSON-LD reference (`1f47291`)

Step 1 baseline (actual, before Task 5):
```
about.html:    types: AboutPage, BreadcrumbList, Person / dangling: https://ahmadsaad.dev/#website / image_dims: strings / exit=1
projects.html: types: CollectionPage, BreadcrumbList / dangling: #person, #website, and the 4 project #project ids (6 refs) / image_dims: ok / exit=1
```
The first build after the edits failed type checking:
```
./app/about/page.tsx:59:9
Type error: Type 'number' is not assignable to type 'SchemaValue<Distance | QuantitativeValue | IdReference, "width"> | undefined'.
```
Fix: see Deviations, item 1. The second build passed.

Verify (actual):
```
== index
types: CollegeOrUniversity, Organization, Organization, Organization, Person, WebSite, ProfilePage, SoftwareSourceCode, SoftwareSourceCode, SoftwareSourceCode, CreativeWork, SoftwareSourceCode
dangling: none
image_dims: ok
person.alternateName: Ahmad Atef Saad
person.sameAs: 3 ['https://github.com/ahm-adsaad', 'https://www.linkedin.com/in/ahmaddsaad', 'https://www.credly.com/badges/976e4176-241f-4870-83ea-c66f896f64ff']
person.knowsLanguage: English, Arabic
person.memberOf: Tau Beta Pi, American University of Sharjah chapter
person.subjectOf: https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship
ProfilePage created=2026-08-24 modified=2026-10-31
== about
types: AboutPage, BreadcrumbList, Person, WebSite
dangling: none / image_dims: ok
AboutPage created=2026-09-26 modified=2026-10-31
== projects
types: CollectionPage, BreadcrumbList, SoftwareSourceCode, SoftwareSourceCode, SoftwareSourceCode, CreativeWork, Person, WebSite
dangling: none / image_dims: ok
CollectionPage modified=2026-10-31
== projects/trend-radar        dangling: none / image_dims: ok
== projects/lorawan-sensor-node dangling: none / image_dims: ok
No FAIL lines. Rendered sizes: "width":748,"height":748 on index and about.
CHK copy (7 files) -> clean
```
The pasted validator.schema.org check (optional) was not run.

## Task 6: Date the About page and link the AUS News story (`a7d9b8c`)

Verify (actual):
```
CHK text about.html "Last updated 31 October 2026" -> 1
grep -c 'dateTime="2026-10-31"|datetime="2026-10-31"' -> 1
CHK text about.html "AUS News, 22 June 2026: AUS engineering student receives competitive Tau Beta Pi Scholarship." -> 1
grep -c AUS article href -> 1
grep -c 'href="https://github.com/ahm-adsaad"' -> 1
(extra) CHK text about.html "See my project case studies or go back to the homepage." -> 1
CHK copy app/about/page.tsx lib/format-long-date.ts -> clean
```

## Task 7: Rewrite llms.txt and the about.md profile around a named definition (`dd2dadd`)

Verify (actual):
```
CHK same llms.txt.body expected-llms.txt     -> MATCH   (cmp also reports byte-identical)
grep -c "ahmadd.saad02@gmail.com" about.md   -> 1
grep -c "]()" about.md                       -> 0
grep -ci "twitter|bluesky" about.md          -> 0
grep -c "^> Ahmad Saad is" llms-full.txt     -> 1
grep -c "...based in the United Arab Emirates" llms-full.txt -> 1
CHK copy (5 bodies)                          -> clean
grep -n "Samsung" llms.txt.body -> 9:- Most recent industry role: AI/ML Engineer at Samsung Gulf Electronics, Dubai, June to August 2026. Architected and solely built a production trend intelligence platform for the regional marketing team, at an estimated $60K in avoided tooling spend and a projected 20% increase in engagement rates.
```
This is the only Samsung line, and it does not mention Trend Radar.

## Task 8: Keep the llms and markdown endpoints out of search indexes (`4afdf9b`)

Verify (actual):
```
llms.txt: "x-robots-tag":"noindex"
llms-full.txt: "x-robots-tag":"noindex"
me/about.md: "x-robots-tag":"noindex"
me/experience.md: "x-robots-tag":"noindex"
me/projects.md: "x-robots-tag":"noindex"
.next/server/app/index.meta:0
.next/server/app/about.meta:0
CHK copy lib/llms.ts -> clean
```
The live preview headers were confirmed in Task 12, so no `next.config.mjs` fallback was needed.

## Task 9: Preload the display and body fonts so the hero name paints sooner (`2747cab`)

md5 check: `3b9a2d35...` = `bricolage-display.woff2`, `81982458...` = `bricolage-display-light.woff2`, `ae05c57c...` = `instrument-sans-latin-wght.woff2`. These are unchanged.
Verify (actual):
```
preload link count in index.html -> 3
<link rel="preload" href="/_next/static/media/3b9a2d35ca5574c2-s.p.woff2" as="font" type="font/woff2" crossorigin="anonymous"/>
<link rel="preload" href="/_next/static/media/81982458c8f63afe-s.p.woff2" as="font" type="font/woff2" crossorigin="anonymous"/>
<link rel="preload" href="/_next/static/media/ae05c57c271ebcb0-s.p.woff2" as="font" type="font/woff2" crossorigin="anonymous"/>
ls of all three .woff2 files -> all present
CHK copy app/layout.tsx -> clean
```

## Task 10: Cache public media for a week and reuse the preloaded webp poster (`f8bc150`)

Verify (actual):
```
grep -c "max-age=604800, stale-while-revalidate=86400" public/_headers -> 5
grep -n "poster={posterWebp ?? poster}" components/hero-video.tsx -> 110:          poster={posterWebp ?? poster}
pnpm build -> exit 0
CHK copy -> clean
```

## Task 11: Put the headshot on the share card and cut it to about 150 KB (`9c0a843`)

`Buffer` passed type checking (`@types/node` is installed and wrangler has `nodejs_compat`), so the `btoa` fallback was not used. The rendered fetch id is `aHR0cHM6Ly9haG1hZHNhYWQuZGV2L2FobWFkLXNhYWQuanBn`, which is the expected value.
Verify (actual):
```
index 200 image/jpeg 148752
about 200 image/jpeg 148533
projects/lorawan-sensor-node 200 image/jpeg 163189
CHK copy (4 files) -> clean
```
On the LoRaWAN card, "Energy Harvesting / LoRaWAN Sensor Node" wraps to two lines with no ellipsis and stays clear of the face. The face is a circle on the right, and the meta line reads "A project by Ahmad Saad". The downloaded card was saved to the scratchpad, not `/tmp`: `C:\Users\ahmad\AppData\Local\Temp\claude\C--Users-ahmad-Desktop-GitHubRepos-portfolio\b52c40fa-27e0-474c-a34e-5e890dc19dd7\scratchpad\impl\og-lorawan-sensor-node.jpg`.

## Task 12: Full build chain and preview smoke test (no commit)

### Step 1: Worker build
```
taskkill //F //IM workerd.exe; pnpm ensure-next-symlink && pnpm exec opennextjs-cloudflare build --dangerouslyUseUnsupportedNextVersion && pnpm assert-static-prerender
...
OpenNext build complete.
assert-static-prerender: 19 prerendered routes, none with ISR.
```

### Step 2: Worker size
```
Total Upload: 5479.58 KiB / gzip: 1120.13 KiB
```
1120.13 KiB gzip is well under the 3072 KiB free-plan limit.

### Step 3: Preview
`pnpm exec opennextjs-cloudflare preview` (wrangler 4.125.0) came up on `http://localhost:8787`.

### Step 4: Smoke test

The concern is that the preview answers every Worker route with `301 Moved Permanently` and `Location: http://localhost:8787/`, which points back to itself. This was not caused by this run. `wrangler.jsonc` routes `ahmadsaad.dev` as a custom domain, so the local preview passes `Host: ahmadsaad.dev` to the Worker over plain http. `middleware.ts` then applies its existing "plain http on the apex: 301 to https" rule, and wrangler rewrites the Location back to localhost. Files served directly as static assets (media, `_next/static`, fonts) are not affected. Production is not affected either, because Cloudflare sends `X-Forwarded-Proto: https`, which the middleware reads first.

To test the Worker, I ran the same commands a second time, adding `-H "X-Forwarded-Proto: https"` to every request that reaches the Worker. For the CHK checks, I saved the pages to files and ran CHK on the files, because CHK cannot send headers. No code was changed for this.

Both scripts are in `C:\Users\ahmad\AppData\Local\Temp\claude\C--Users-ahmad-Desktop-GitHubRepos-portfolio\b52c40fa-27e0-474c-a34e-5e890dc19dd7\scratchpad\impl\`: `smoke-literal.sh` (the plan's commands verbatim) and `smoke-https.sh` (with the header).

Run A: the plan's commands verbatim (actual output):
```
== / 301
title (0): None
description (0): None
canonical: None
h1: None
== /about 301            (same four None lines)
== /projects 301         (same)
== /projects/trend-radar 301 (same)
== /projects/localai 301 (same)
== /projects/mano-computer-simulator 301 (same)
== /projects/lorawan-sensor-node 301 (same)
   (CHK jsonld printed no dangling/image_dims lines for any page: the body was empty)
0
/llms.txt 301
/llms-full.txt 301
/me/about.md 301
/me/experience.md 301
/me/projects.md 301
0
                                   (sitemap lastmod: no output)
0
301
Cache-Control: public, max-age=604800, stale-while-revalidate=86400
Cache-Control: public, max-age=604800, stale-while-revalidate=86400
                                   (_next/static chunk: no output, because the chunk path came from the empty / body)
3b9a2d35ca5574c2 200
81982458c8f63afe 200
ae05c57c271ebcb0 200
clean                              (trivially: the scanned bodies were empty 301s)
```
Run A result: 5 of 18 checks match (the /about x-robots count of 0, webp cache, mp4 cache, the three fonts, and copy "clean"). The other 13 differ, all because of the 301 described above. The /about "0" and the "clean" match only trivially.

Run B: the same checks with `X-Forwarded-Proto: https` (actual output):
```
== / 200
title (35): Ahmad Saad · AI Engineer in the UAE
description (150): Ahmad Saad is an AI engineer and forward deployed engineer in the UAE. Computer Engineering senior at AUS, Golden Visa holder, available January 2027.
canonical: https://ahmadsaad.dev
h1: Ahmad Saad
dangling: none
image_dims: ok
== /about 200
title (56): About Ahmad Saad | AI Engineer, AUS Computer Engineering
description (159): Ahmad Saad, an AI engineer and Computer Engineering senior at the American University of Sharjah, formerly at Samsung Gulf Electronics. Available January 2027.
canonical: https://ahmadsaad.dev/about
h1: Ahmad Saad
dangling: none
image_dims: ok
== /projects 200
title (22): Projects by Ahmad Saad
description (151): Case studies by Ahmad Saad: a production trend-detection platform, on-device RAG in the browser, a CPU simulator, and an energy harvesting sensor node.
canonical: https://ahmadsaad.dev/projects
h1: Projects by Ahmad Saad
dangling: none
image_dims: ok
== /projects/trend-radar 200
title (59): Trend Radar: Production TikTok Trend Detection | Ahmad Saad
description (152): Trend Radar by Ahmad Saad: a production TikTok trend-detection platform where measurement decides and LLMs describe, with cost governance and 315 tests.
canonical: https://ahmadsaad.dev/projects/trend-radar
h1: Trend Radar
dangling: none
image_dims: ok
== /projects/localai 200
title (54): LocalAI: Private AI for Company Documents | Ahmad Saad
description (148): LocalAI by Ahmad Saad: private AI for company documents that runs entirely in the browser, with page-level citations and a Playwright privacy audit.
canonical: https://ahmadsaad.dev/projects/localai
h1: LocalAI
dangling: none
image_dims: ok
== /projects/mano-computer-simulator 200
title (52): Mano Basic Computer Simulator in Python | Ahmad Saad
description (141): Ahmad Saad's cycle-accurate simulator of Mano's Basic Computer in Python, with full ISA support, micro-operation control, and a CLI debugger.
canonical: https://ahmadsaad.dev/projects/mano-computer-simulator
h1: Mano Basic Computer Simulator
dangling: none
image_dims: ok
== /projects/lorawan-sensor-node 200
title (54): Energy Harvesting LoRaWAN Sensor Node PCB | Ahmad Saad
description (147): Ahmad Saad's custom 2-layer PCB for an energy harvesting LoRaWAN sensor node: ATMEGA4809 MCU, LoRa radio, AEM10330 PMIC and PPK2 current profiling.
canonical: https://ahmadsaad.dev/projects/lorawan-sensor-node
h1: Energy Harvesting LoRaWAN Sensor Node
dangling: none
image_dims: ok
1
/llms.txt 200 x-robots-tag: noindex
/llms-full.txt 200 x-robots-tag: noindex
/me/about.md 200 x-robots-tag: noindex
/me/experience.md 200 x-robots-tag: noindex
/me/projects.md 200 x-robots-tag: noindex
0
      7 <lastmod>2026-10-31</lastmod>
1
404
Cache-Control: public, max-age=604800, stale-while-revalidate=86400
Cache-Control: public, max-age=604800, stale-while-revalidate=86400
chunk: /_next/static/chunks/webpack-962bc6b938aa81c4.js
Cache-Control: public, max-age=31536000, immutable
3b9a2d35ca5574c2 200
81982458c8f63afe 200
ae05c57c271ebcb0 200
clean
```
Run B result: all 18 checks match the plan's expected values.
- All 7 pages return 200.
- All titles are 60 characters or fewer, and every description names Ahmad Saad.
- Each page has the correct canonical, and `h1: Ahmad Saad` appears on / and /about.
- All 7 pages report `dangling: none` and `image_dims: ok`.
- "Ahmad Saad is" appears once on /.
- The five text endpoints return 200 with noindex, and /about returns 0 (no noindex).
- The sitemap has 7 lastmod entries at 2026-10-31, and the about.md email count is 1.
- `/nonexistent` returns 404.
- The webp and mp4 both get the one-week Cache-Control, so the local preview does apply `_headers`.
- The `_next/static` chunk has exactly one Cache-Control line, `public, max-age=31536000, immutable`, with no second value appended (Review Focus 5).
- All three font URLs return 200, and the copy scan prints `clean`.
- Also checked: `/ahmad-saad.jpg` gets the one-week Cache-Control.

### Step 5: Visual and LCP check (Review Focus 1 and 2)

The Playwright script is `C:\Users\ahmad\AppData\Local\Temp\claude\C--Users-ahmad-Desktop-GitHubRepos-portfolio\b52c40fa-27e0-474c-a34e-5e890dc19dd7\scratchpad\impl\visual_check.py`. It runs Chromium from the claude-seo venv, with `X-Forwarded-Proto: https` set as an extra HTTP header for the reason given in Step 4. The 390 px run uses DPR 3 and mobile emulation; the 1440 px run uses DPR 1.

| Viewport | LCP element (the plan's `getEntries().at(-1).element` probe) | LCP entries | Headshot | Eyebrow | h1 | Pills (Email, LinkedIn, CV) |
|---|---|---|---|---|---|---|
| 390x844 | `span.block.rise-name` "Ahmad", 1456 ms, size 58128 | 1 (the same span) | top 281, bottom 337, 56x56, currentSrc `/ahmad-saad-320.webp` | "AI Engineer · Sharjah, UAE", top 300 | top 357, bottom 605 | top 741, bottom 785, all inside the 844 px viewport |
| 1440x900 | `span.block.rise-name` "Ahmad", 552 ms, size 129759 | 1 (the same span) | top 123, bottom 179, 56x56, `/ahmad-saad-320.webp` | top 142 | top 203, bottom 575 | top 793, bottom 837, inside 900 |

- At both sizes the headshot and the eyebrow sit above the name: the headshot's bottom edge (337 at 390 px, 179 at 1440 px) is above the h1's top edge (357 and 203).
- The three pills are fully inside the first viewport on mobile, with 59 px to spare below them.
- The LCP element is the `.rise-name` span at both sizes, never the headshot `<img>`.
- At DPR 3 the browser chose the 320w webp, as the plan expected.
- The statement word gaps are uniform (see Task 1).

Screenshots, in `ahmadsaad.dev-audit/2026-10-30/screenshots/`:
- `after-home-hero-390.png`
- `after-home-hero-1440.png`
- `after-home-statement-390.png`
- `after-home-statement-1440.png`

### Step 6: Shutdown
I stopped the preview. The Windows process tree outlived the background-task stop, and a surviving `wrangler dev` kept respawning workerd. I killed the whole tree with `taskkill //F //T` on its root `sh.exe` (PID 15660), then killed workerd. Final check: "no workerd, wrangler or opennext processes running", and `curl localhost:8787` returns `000`.

## Deviations from the plan text, and why

1. Task 5, numeric ImageObject sizes. The plan sets `width: USER.image.width, height: USER.image.height` (numbers). schema-dts 1.1.5 types `ImageObject.width/height` as `SchemaValue<Distance | QuantitativeValue | IdReference>`, where `Distance = DistanceLeaf | string`, so `next build` failed with the type error quoted above. This is why the old code used `String()`. To emit the numbers the plan asks for, I added a one-line typed cast, `export const pixels = (value: number) => value as unknown as string;`, with a doc comment, in `lib/seo/project-schema.ts`, which is already in Task 5's file list. Both sites use it: `width: pixels(USER.image.width)` and the same for height, in `app/page.tsx` and `app/about/page.tsx`. The rendered JSON is `"width":748,"height":748` (numbers), and CHK reports `image_dims: ok`.
2. Task 4, anchor markup. `Read the{' '}<span className="sr-only">{project.title} </span>case study` is split over three JSX lines instead of the plan's one line. The rendered text is identical: the visible text is "Read the case study", and the CHK count for "Read the Trend Radar case study" is 1.
3. Task 6, the outlet line. It is written as `{mention.outlet},{' '}` followed on the next line by `{formatLongDate(mention.datePublished)}:{' '}`, for line length only. The rendered text is exactly the plan's string (CHK count 1).
4. Task 7: the plan's literal sections are mapped to config as follows.
   - The `[LocalAI live demo]` line is built from the `localai` entry's `link` in `PROJECT_PAGES`, so it is emitted only when that link exists.
   - `formatProfileLinks()` and the "Contact and profiles" bullets share one private helper, `profileEntries()`.
   - `app/(llms)/llms-full.txt/route.ts` needed no code change, as the plan allows. It was passed to `git add` but is unchanged, so it is not in the commit.
   - The output matches the expected file byte for byte.
5. Task 9: each `<link rel="preload">` is written over several lines, with the same attributes and order as the plan.
6. Task 11:
   - `fetchId` fits on one line (73 characters) instead of the plan's two-line wrap.
   - The plan's verify loop writes to `/tmp/og-*.jpg`; the files went to the scratchpad `impl/` folder instead, per session rules.
7. Task 12, Step 4: the smoke test was run twice, verbatim and then with `X-Forwarded-Proto: https`, because of the local-preview 301 described above. Both outputs are recorded.
8. Task 12, Step 5: the plan says to take the screenshots with `pnpm dev` or the Task 12 preview. I used the preview, with the header added.
9. Line endings: git warned "LF will be replaced by CRLF" on a few files the Edit/Write tools touched (`core.autocrlf=true`). This does not affect the commits: `git show --stat` contains only the intended lines.

## Left for the coordinator

- Deploy (Phase 5): `pnpm exec opennextjs-cloudflare deploy` after the verifier's review. The build in `.open-next` is from head `9c0a843`, but rebuild before deploying if anything changes.
- After deploying, check these in production:
  - `X-Robots-Tag: noindex` on the five text endpoints, and none on HTML.
  - The one-week Cache-Control on `/ahmad-saad.webp` and `/about/drive-1080.mp4`.
  - A single immutable Cache-Control on `_next/static`.
  - `/nonexistent` returns 404.
  - The three font URLs return 200.
- Run the smoke test with plain curl against `https://ahmadsaad.dev`. The local-preview 301 cannot happen there, because Cloudflare sends `X-Forwarded-Proto: https`.
- For future local previews, add `-H "X-Forwarded-Proto: https"` (or Playwright `extra_http_headers`) to every Worker request. The alternative would be to make the middleware skip the http-to-https redirect when wrangler dev is serving, but that would be a code change outside this plan, so I did not make it.
- Purge the Cloudflare cache for `/llms.txt`, `/llms-full.txt` and `/me/*` after deploying, as in earlier deploys, so the new text and headers are served at once.
- The optional validator.schema.org paste of the home JSON-LD was not done.
- Owner actions 1 to 17 in the plan are untouched.
