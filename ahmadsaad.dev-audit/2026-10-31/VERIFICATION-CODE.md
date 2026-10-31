# Round 2 code review (VERIFICATION-CODE)

Branch `seo/name-aus-2026-10-31` (0290595, bea34d0, 84e24f3 on top of main cd4ee5a), plus the uncommitted `ahmadsaad.dev-audit/2026-10-31/offsite/` files. Reviewer did not write the plan or the code. No app file was edited, nothing was built or served; the checks below ran read-only against the existing `.next` and `.open-next` output (timestamped 31 Oct 11:06 to 11:19).

**Verdict: APPROVED WITH MINOR NOTES.** Blocking 0, Important 1, Minor 12.

Nothing in the app code breaks static prerendering, hydration, the schema graph or the deploy guard. The one Important item is in an off-site draft the owner will send to a named person. The Minor items are hardening and maintainability; none needs to land before the deploy.

---

## Findings, by severity

### Important

**I1. `offsite/outreach.md:33` against `offsite/outreach.md:82`: the courtesy note promises one thing and the self-serve steps advise another.**
- Defect: draft (b) tells the CITL director "Nothing else on the site changes, and the other team members' entries stay as they are", while step (d)2 says "linking all five cards the same way helps every team member and keeps the cards consistent".
- Failure scenario: the owner sends (b) as written, then follows (d)2 and links all five "Meet the team" cards. The director has been told the other entries would not change, so the edit looks like it went beyond what was agreed, on a site the owner maintains for the university.
- Minimal fix (pick one): in (b) replace the two sentences with "I would also link the names on the About page team cards to each person's team page, so the cards are consistent. Nothing else on the site changes." or in (d)2 delete the sentence starting "Today no card links to its team page" and keep only the change to the owner's own card.

### Minor

**M1. `apps/website/components/rich-text.tsx:4`: a URL that contains parentheses is cut at the first `)`.**
- Defect: the href group `[^)\s]+` stops at the first closing parenthesis.
- Failure scenario (reproduced): `Wiki [Foo](https://en.wikipedia.org/wiki/Foo_(bar)) after` renders `<a href="https://en.wikipedia.org/wiki/Foo_(bar" ...>Foo</a>) after`: a broken link plus a stray `)`. No current config string hits this, but Wikipedia URLs are exactly the kind of citation this component exists for.
- Minimal fix (tested: same results on every current case, and the Wikipedia case now keeps the full URL):
  ```ts
  const LINK = /\[([^\]]+)\]\(((?:[^()\s]|\([^()\s]*\))+)\)/g;
  ```

**M2. `apps/website/components/rich-text.tsx:26`: the internal/external split only looks at the first character.**
- Defect: everything that is not `/...` or `#...` is treated as an external web link, and everything that starts with `/` goes through next/link.
- Failure scenarios (reproduced): `[me](mailto:a@b.c)` renders with `target="_blank"`, which opens and leaves an empty tab in some browsers (PillLink already avoids this for mailto). `[x](//evil.example/path)` and file paths such as `[PDF](/Ahmad_Saad_CV.pdf)` or `[llms](/llms.txt)` go through next/link; for a file, the app router prefetches it as a route when the link scrolls into view (the whole PDF downloads) and the click falls back to a full reload. The footer uses a plain `<a>` for `/llms.txt` for this reason.
- Minimal fix:
  ```ts
  const isFile = /\.[a-z0-9]+(?:[?#].*)?$/i.test(href);
  const internal =
    href.startsWith('#') ||
    (href.startsWith('/') && !href.startsWith('//') && !isFile);
  const web = /^https?:\/\//.test(href);
  // internal: <Link>; web: <a target="_blank" rel="noopener noreferrer">;
  // anything else (mailto:, tel:, /file.pdf): plain <a href>.
  ```

**M3. `apps/website/components/rich-text.tsx:51`: `plainText` is exported but has no caller.**
- Defect: dead export (the plan added it "for schema or text files", and no schema or text file uses it).
- Failure scenario: none at runtime; a later reader assumes some schema string is stripped through it when none is.
- Minimal fix: delete it, or keep it with a one-line comment that it is unused until a link-bearing string reaches JSON-LD or a text endpoint.

**M4. `apps/website/config/aus.ts:6-12` with `apps/website/app/aus/page.tsx:55`: the /aus `citation` @id only resolves because two copies of the AUS News URL are identical.**
- Defect: `citation: articleId(AUS_PAGE.coverage.article.url)` must equal the `@id` that `buildPerson()` builds from `PRESS_MENTIONS[0].url`, but the URL is a separate literal in `config/about.ts:13`, `config/aus.ts:11` and `config/cv.ts:60`.
- Failure scenario: AUS changes the article slug and the fix lands only in `PRESS_MENTIONS`; /aus then cites an `@id` that exists nowhere in its graph. `round2_check.py refs` would catch it, but only if someone runs it; `assert-static-prerender` does not.
- Minimal fix: export the constant once and import it.
  ```ts
  // config/about.ts
  export const AUS_NEWS_2026 = 'https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship';
  // config/aus.ts
  import { AUS_NEWS_2026 } from './about';
  const AUS_NEWS_ARTICLE = { outlet: 'AUS News', date: '2026-06-22', headline: '...', url: AUS_NEWS_2026 };
  ```
  Use the same import in the `CV_HONOURS` string. The 2024 chapter article URL is also written twice inside `config/aus.ts` (lines 48 and 105); a local constant fixes that.

**M5. `apps/website/lib/seo/person.ts:129-134`: the chapter node and the national society share one `url`.**
- Defect: `Tau Beta Pi UAE Alpha` (`@id` TBP_CHAPTER_ID) has `url: 'https://www.tbp.org'`, the same URL as its `parentOrganization` `Tau Beta Pi`.
- Failure scenario: entity resolvers that merge on URL treat the chapter and the national society as one entity, so "President of Tau Beta Pi UAE Alpha" can be read as President of Tau Beta Pi.
- Minimal fix: drop `url` from the chapter node and keep `parentOrganization` for the link. If the chapter needs a reference, add `subjectOf: 'https://www.aus.edu/media/news/aus-launches-first-international-chapter-of-tau-beta-pi-engineering-honor-society'`.

**M6. `apps/website/scripts/indexnow.mjs:17-19, 64-65`: dry run still makes a network call, and a missing `--sitemap` value crashes.**
- Defect 1: `pnpm indexnow --dry-run` with no `--sitemap` fetches `https://ahmadsaad.dev/sitemap.xml`. It never POSTs to IndexNow, so the header comment ("send nothing") holds, but the review requirement was "prints and exits 0 without a network call".
- Defect 2: `--sitemap` as the last argument passes `undefined` to `readFile` and Node prints a raw `ERR_INVALID_ARG_TYPE` stack (reproduced).
- Defect 3: on a non-2xx answer only the status line is printed; IndexNow puts the reason in the body.
- Failure scenario: someone runs the dry run offline or in CI to check the payload and it fails on DNS. A typo in the flag order shows a stack trace instead of a usage line. A 422 says nothing about which URL was rejected.
- Minimal fix:
  ```js
  const sitemap =
    sitemapAt >= 0
      ? args[sitemapAt + 1]
      : dryRun
        ? '.next/server/app/sitemap.xml.body'
        : `https://${HOST}/sitemap.xml`;
  if (!sitemap || sitemap.startsWith('--')) {
    console.error('indexnow: --sitemap needs a file path or URL');
    process.exit(2);
  }
  // after the POST:
  if (res.status !== 200 && res.status !== 202) console.error(await res.text());
  ```
  If the live-sitemap dry run is the behavior you want, keep the code and change the usage line to "fetch the live sitemap, print the payload, POST nothing".

**M7. `apps/website/scripts/assert-static-prerender.mjs:38-55`: the project routes are a second hand-kept copy of `PROJECT_PAGES`.**
- Defect: the four `/projects/<id>` entries are hardcoded.
- Failure scenario: a fifth case study is added and later picks up a `fetch` that makes it dynamic. Its route is not in the list, so the guard passes and the page is served by the Worker at request time, which is the failure the guard exists to catch. Going the other way, removing a project fails the deploy until someone edits the script.
- Minimal fix: keep the fixed routes (`/`, `/about`, `/aus`, `/cv`, `/projects` and the 7 text routes) and add every path found in `.next/server/app/sitemap.xml.body`:
  ```js
  const sitemapXml = readFileSync(path.join(root, '.next/server/app/sitemap.xml.body'), 'utf8');
  const fromSitemap = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1].trim()).pathname);
  const EXPECTED_ROUTES = [...new Set([...FIXED_ROUTES, ...fromSitemap])];
  ```

**M8. `apps/website/config/cv.ts:27` with `apps/website/app/cv/page.tsx:248`: `CV_HIGHLIGHTS` keys are unchecked strings.**
- Defect: a highlight keyed by a position id that no longer exists is silently ignored, the role falls back to `firstSentence(position.description)`, and a position with no description renders one empty bullet.
- Failure scenario: `samsung-ai-ml-engineer` is renamed in `experience.ts`. Typecheck and build pass, and /cv shows the long first sentence of the Samsung description instead of the four curated bullets. All 7 keys match today.
- Minimal fix (fails the build at module load):
  ```ts
  import { experiences } from './experience';
  const POSITION_IDS = new Set(experiences.flatMap((c) => c.positions.map((p) => p.id)));
  for (const id of Object.keys(CV_HIGHLIGHTS)) {
    if (!POSITION_IDS.has(id)) throw new Error(`CV_HIGHLIGHTS: unknown position id ${id}`);
  }
  ```
  In the page, use `[firstSentence(position.description)].filter(Boolean)` for the fallback.

**M9. `apps/website/features/home/components/education.tsx:86`: the link text hardcodes the name.**
- Defect: `Ahmad Saad at AUS: Tau Beta Pi, AI Hub and research` is a literal, while every other surface templates `USER.name`. It also nearly repeats `AUS_PAGE.title` with different capitalisation.
- Failure scenario: the display name changes in `config/user.ts` and this link keeps the old one.
- Minimal fix: `{`${USER.name} at AUS: Tau Beta Pi, AI Hub and research`}`, or import a shared label from `config/aus.ts`.

**M10. `config/aus.ts`, `config/about.ts`, `config/cv.ts`, `config/faq.ts`, `config/user.ts`: graduation, availability and GPA facts are repeated literals.**
- Defect: "December 2026" and "January 2027" each appear more than a dozen times, across those config files, `lib/seo/person.ts` and two home components (`contact.tsx`, `about-teaser.tsx`). "3.96" is also repeated, even though `EDUCATION.gpa` exists; `config/aus.ts:31` hardcodes `'3.96 / 4.0'`.
- Failure scenario: after graduation in December 2026, the owner follows the `alumniOf` comment in `person.ts`, updates the schema and a few strings, and /aus or the FAQ still says "graduates in December 2026" in January 2027.
- Minimal fix: template `EDUCATION.gpa` in `config/aus.ts` facts. Add a one-line checklist to the `alumniOf` comment in `lib/seo/person.ts`: `grep -rn "December 2026\|January 2027" apps/website/config apps/website/features`.

**M11. `apps/website/app/aus/page.tsx:183, 223` and `apps/website/app/about/page.tsx:229`: React keys are the first 32 characters of the text.**
- Defect: two paragraphs or quotes with the same 32-character prefix collide.
- Failure scenario: a second quote starting "This scholarship is a proud moment for me..." (or two paragraphs both starting "Since November 2024 I have worked") gives a duplicate-key warning at build time, and React may drop or reuse one node. Every current prefix is unique.
- Minimal fix: the content is static, so `key={i}` (with `(paragraph, i)`) or `key={paragraph}` is safe.

**M12. `ahmadsaad.dev-audit/2026-10-31/offsite/github-apply.sh:35, 113-123`: minor hardening.**
- Defect 1: `run()` echoes its full argument list, so the PUT step prints the entire base64 README on one line in both modes.
- Defect 2: `tr -d '\n'` before `base64 -d` keeps any `\r` that a Windows build of gh might emit, and GNU `base64 -d` rejects it.
- Defect 3: if the profile repo has no README.md, `gh api` returns 404 and `set -e` stops the script after the repo edits. This is safe, because the edits are idempotent and the script can be re-run, but the error is unexplained.
- Minimal fix: in `run()` print `local cmd="$*"; step "${cmd:0:200}"`. Note that `${*:0:200}` would slice the argument list, not the string. Use `tr -d '\r\n'` on line 114. Wrap the SHA read: `SHA="$(gh api ... --jq .sha 2>/dev/null || true)"`, and when it is empty, PUT without `-f sha=` (create).

### Notes (not counted)

- `/cv` lists companies in config order (Samsung, ELMEC, Chief Nest, ONBRND, AUS), not newest first. The current AUS roles come last on a page that recruiters and ATS parsers read as a CV. This is a content choice that mirrors the homepage ledger, so it is not a defect.
- `github-apply.sh` points the `sdp-sensor-nodes` homepage at the LoRaWAN case study. That repo's README calls the board a senior design project, while the site uses research-group framing and never calls it coursework. The script already flags this for the owner (lines 90-94). Resolve it before running the script, or leave the homepage edit commented out with the description.
- The `.next` output used for the runtime checks (11:19) is newer than every source file under app, components, config, lib, features and scripts, so it reflects the committed code. `.open-next/assets/_headers` (11:06) is byte-identical to `public/_headers` once line endings are ignored. Even so, the coordinator's final build should re-run `assert-static-prerender` and `round2_check.py refs` on all six HTML pages.

---

## Checked and fine

1. **Static prerender.** `/aus`, `/cv` and `/about` export `dynamic = 'force-static'`, with no `revalidate`. No changed route reads fs, `headers()`, `cookies()`, `searchParams` or `Date.now()`. `generateMetadata` is sync on the new pages and has no request data on `/`. `.next/prerender-manifest.json` keys are bare paths (`/aus`, `/cv`, `/me/about.md`, `/robots.txt`), and all 16 `EXPECTED_ROUTES` are present. `node scripts/assert-static-prerender.mjs` prints "21 prerendered routes, none with ISR, all 16 expected routes present." and exits 0. The ISR block is unchanged, and the failure path lists each missing route by name.
2. **Hydration and React.** All new pages and components are server components; none has `'use client'`. There is no `new Date()` in render: `formatLongDate` is pure string work, so the build timezone cannot shift the day. There is no `<a>` inside `<a>` and no `<p>` inside `<p>`: RichText emits only inline links, its parents are `<p>` or `<span>`, and the quotes use `<blockquote><p>`. Keys are unique today (`section.id`, `fact.label`, `source.url`, `item.question`, `position.id`, `project.id`, `credential.name`, `group.title`, and the link `start` index inside RichText). `rise`/`stagger` and `data-reveal` follow the existing pattern, including `data-reveal` with `stagger(1)` as on main's /about. `components/reveal.tsx` re-collects nodes per pathname, so client navigation to /aus and /cv reveals correctly. No `data-reveal` is nested. Fragment ids `#computer-engineering`, `#tau-beta-pi`, `#ai-hub`, `#research`, `#college-of-engineering` and `#aus-news` all exist, and `--nav` is defined for `scroll-mt`.
3. **RichText.** It has no `dangerouslySetInnerHTML`, and React escapes every text part. 14 inputs were rendered through the real file (transpiled with the app's TypeScript, `react-dom/server` 19.2.0); none threw and no key warning was printed. The script is `C:\Users\ahmad\AppData\Local\Temp\claude\C--Users-ahmad-Desktop-GitHubRepos-portfolio\907104f7-959c-403a-9267-0fb6950440d5\scratchpad\eval-code\richtext-test.mjs`, and the regex fix in M1 was checked with `regex-fix-test.mjs` in the same folder. Results:
   - Unclosed bracket, nested brackets, a literal `](`, a space in the URL and an empty label all degrade to plain text.
   - Internal and fragment links use next/link; `#faq` works.
   - External links get exactly `target="_blank" rel="noopener noreferrer"`, with no nofollow and no UTM.
   - Two links in one string work, and `$` in a label is kept.
   - `plainText` strips the markup correctly.
   - The parenthesis, mailto and file-path cases are M1 and M2.
4. **Schema.** The shapes are valid:
   - `memberOf` is an `OrganizationRole` with `roleName` and a nested `memberOf`, which carries `TBP_CHAPTER_ID` and a `parentOrganization`.
   - `homeLocation` is two `Place` nodes, each with a `PostalAddress`.
   - `occupationLocation` is a `Country`.
   - `hasCredential` holds a degree `EducationalOccupationalCredential` recognized by `AUS_ID`, plus the certifications.
   - `subjectOf` is a `NewsArticle` with an `@id` from `articleId()`, `about` set to `PERSON_ID` and `publisher` set to `AUS_ID`.
   - AUS is a `CollegeOrUniversity` with an address, the Wikipedia and Wikidata `sameAs`, and `alternateName` AUS.

   Other schema points:
   - `pixels()` is the only `as unknown as` cast in the diff, and it is documented. It moved from `project-schema.ts`, which re-exports it.
   - `alumniOf` is gone, and a comment says to add it back after graduation.
   - `worksFor` is built from `isCurrentEmployer && companyUrl`, which gives `#org-chief-nest` and `#org-aus`. Both are emitted, by `employerOrganizations()` and `ausOrganization()`.
   - "Atef" appears only in `config/user.ts`. The grep also hits `.open-next` build output, which is generated.
   - `isoMonth` maps `06.2026` to `2026-06` and keeps `2025` and `2026` as they are.
   - `round2_check.py refs` reports no dangling `@id` on /aus, /cv, /about or a case study. `persons` is ok on /, /about, /aus, /cv, /projects and /projects/localai; the case study carries the stub with `alternateName` and `additionalName`.
5. **Metadata.** /aus, /cv, /about and /projects pass `path` and `absoluteTitle: true`, and their OG images come from `createOgImage`. Each built page has exactly one `<title>`, and the canonicals are `/aus`, `/cv`, `/about` and `/projects`.
6. **indexnow.mjs.** The dry run against the built sitemap lists 9 URLs, prints the payload and exits 0 with no POST. `<image:loc>` is excluded, `<loc>` values are trimmed and the host is filtered. The script checks that the key file is live and correct before posting. The POST body has `host`, `key`, `keyLocation` and `urlList` with a JSON content type. 200 or 202 exits 0, anything else exits 1. It uses only `node:fs/promises`, global `fetch` and top-level await (Node 20+), and the `indexnow` script is added to package.json. The key file `public/b9f504812ee878b00a15106b08a1f9e1.txt` is 32 bytes with no newline and matches `KEY`.
7. **_headers.** The syntax is right: a path line followed by two-space indented headers. The `Link` value is `<https://ahmadsaad.dev/cv>; rel="canonical"`, and there is one PDF rule with no `X-Robots-Tag`. The key file matches only `/*`, which sets no Cache-Control, so it is not cached immutable. The rule reaches `.open-next/assets/_headers`.
8. **cv.ts.** The bullets are short rewrites, not copies of the Samsung description. Trend Radar is not named in any Samsung bullet or in the summary. The Projects list comes from `PROJECT_PAGES`. All 7 `CV_HIGHLIGHTS` keys match position ids. Dates match `experience.ts` and `projects.ts`: 06.2026 to 08.2026, 11.2024, 10.2024 to 07.2025, 08.2026, 08.2023 to 12.2026, Mano 2025 and LoRaWAN 2026.
9. **Off-site.** The README, script and outreach have no em or en dash, and `round2_check.py scan` prints `clean` over the offsite folder and the new app files. There is no banned library name. Samsung is in past tense ("Previously AI/ML Engineer"), and Trend Radar is only in the separate Projects section. The script uses `set -euo pipefail`, and every write goes through `run()`, so `--dry-run` writes nothing to GitHub. `gh repo edit` calls only set values or add topics, so they are idempotent. The README is compared after LF normalisation before any PUT. There are no secrets and no git commands; the only `rm -rf` is the trap on the script's own `mktemp -d` folder. Descriptions are double-quoted, and none contains an apostrophe. The outreach drafts are polite and factual and give the exact URLs.
10. **Typecheck and style.** A scoped `tsc --noEmit` exits 0. It was run on 14 changed entry files and everything they import. The entry files are `lib/seo/person.ts` and `project-schema.ts`, `components/rich-text.tsx` and `faq.tsx`, `config/aus.ts`, `cv.ts` and `faq.ts`, the pages for /aus, /cv, /about, /, /projects and `/projects/[id]`, and `lib/llms.ts`. No em or en dash appears in any changed file or offsite file, comments included.
