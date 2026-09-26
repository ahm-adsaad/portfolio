# Name SERP Plan: "Ahmad Saad" (2026-09-26)

Follow-up to `ACTION-PLAN.md` (2026-08-24). Most of that plan's Phase 1 has shipped. This one covers a single goal: **rank for the query "ahmad saad"** on web and image search.

File paths are relative to `apps/website/` unless stated otherwise.

---

## The goal, stated honestly

"Ahmed Saad" is an Egyptian singer with a Knowledge Panel, Wikipedia, YouTube and heavy Arabic news coverage. Google treats Ahmad and Ahmed as the same name, so for the bare query the singer's entity will hold the panel, the video carousel and top stories for the foreseeable future.

**Targets, in order:**

| # | Target | Measured by |
|---|--------|-------------|
| T1 | ahmadsaad.dev is the **#1 organic web result** for "ahmad saad" (incognito, `gl=ae` and `gl=us`) | Search Console → Performance → query "ahmad saad", avg position ≤ 1.5 |
| T2 | **4+ of the 10 page-1 results** are about you (site, LinkedIn, GitHub, project pages, write-ups) | Manual incognito check, monthly |
| T3 | A photo of you in the **top 3 image results** (today: LinkedIn photo at #11) | Manual incognito Google Images check |
| T4 | #1 for every qualified query: "ahmad saad aus", "ahmad saad engineer", "ahmad saad samsung", "ahmad saad github" | Search Console |
| T5 (long term) | Your own Knowledge Panel | Google "Get verified" once it appears |

Expected timeline: indexing of new pages takes 1–3 weeks, and rankings settle over 2–4 months.

---

## Current state (verified live 2026-09-26)

Working already:
- Apex canonical, with 301 redirects from http and www
- `robots.txt` is clean
- `Person` + `WebSite` + `ProfilePage` JSON-LD
- `<h1>Ahmad Saad</h1>`
- Meta description ≤ 160 characters
- Bing verified

Gaps that matter for this goal:

1. **No photo of you on the domain.** The only `<img>` elements are the 5 project covers. `Person.image` is `https://github.com/ahm-adsaad.png`, which lives on another domain and has a filename unrelated to your name. **This is the main reason the image results don't show you.**
2. **The OG image has neither your name nor your face.** The Cloudinary card reads "Building production AI systems".
3. **The page title puts your name last:** `Building production AI systems | Ahmad Saad`.
4. **The whole site is one page, so it can hold at most one search result.** The sitemap lists only `/`. Project cards link out to GitHub, which leaks the ranking signal to other domains.
5. **`sameAs` lists only GitHub and LinkedIn.** There's also no `disambiguatingDescription` to separate you from the singer.
6. **The GitHub account is empty.** The API returns `name: null`, `bio: null`, `blog: ""`, `location: null`. The profile README is good but stale: it still says "AI/ML Engineer @ Samsung", and that role ended 08.2026.

---

## Part A: Code changes (for the agent working in this repo)

**Ground rules**
- Build, test and commit after each task. Use human-style commit messages with no AI attribution or co-author lines.
- **Do not deploy and do not push.** The owner reviews first.
- Every route must stay statically prerendered: `export const dynamic = 'force-static'`. `pnpm assert-static-prerender` guards this.
- Never read files with `fs` at request time. It 500s on Cloudflare Workers, which is what happened with `/me/craft.md`. All content must come from `config/*.ts`.
- **Canonical trap:** `createMetadata` defaults `alternates.canonical` to `'/'`. Every new page MUST override it with its own path. Otherwise it canonicalises to the homepage and Google drops it.

Verify each task with `pnpm typecheck` and `pnpm build`. Then run `pnpm preview` (OpenNext on Workers) and curl the relevant route.

### A1. Name-first titles + disambiguation schema: High
- Home `<title>` should be exactly **`Ahmad Saad · AI Engineer in the UAE`**. Use `title: { absolute: ... }` so neither the layout template nor `createMetadata` appends a second `| Ahmad Saad`. Keep the meta description.
- Home OG image: `createOgImage({ title: 'Ahmad Saad', meta: 'AI Engineer · Computer Engineering @ AUS · UAE' })`.
- In `Person` (`app/page.tsx`):
  - add `disambiguatingDescription: 'Computer engineer and AI engineer based in the UAE, American University of Sharjah.'`
  - add `alternateName: ['Ahmad D. Saad']` only if the owner confirms that spelling. Otherwise omit it.
- Move the `sameAs` array into `USER.social` and keep it the single source of truth. Every new profile gets added there.
- **Done when:** the rendered `<title>` string matches exactly, and validator.schema.org shows 0 errors.

### A2. Headshot on the domain: Critical, but blocked until the owner supplies the photo
- The owner drops a real, well-lit, face-forward headshot at `public/ahmad-saad.jpg`, at least 800×800. It must be the **same photo** used on LinkedIn and GitHub.
- Generate `ahmad-saad.webp` and a 320px variant, following the pattern in `scripts/build-project-images.mts`.
- Render it next to the H1 with `<img src="/ahmad-saad.webp" alt="Ahmad Saad" width height>`. Load it eagerly, but don't make it the LCP bottleneck: keep it small, with fixed dimensions to avoid layout shift.
- Set `USER.image.profile` to `https://ahmadsaad.dev/ahmad-saad.jpg`. `Person.image` then points to your own domain. Make it an `ImageObject` with `url`, `width`, `height` and `caption: 'Ahmad Saad'`.
- Add the image to the sitemap: `images: ['https://ahmadsaad.dev/ahmad-saad.jpg']` on the `/` entry. Next's `MetadataRoute.Sitemap` supports this.
- Optional: a second OG variant with the face in it.
- **If the file doesn't exist, skip this task entirely.** Don't ship a broken image or a placeholder.

### A3. `/about` page: High
- Route: `app/about/page.tsx`, static. Title: **`About Ahmad Saad | Computer & AI Engineer`**. Canonical: `/about`.
- Content: a 300–500 word first-person bio built from `portfolio-context.md` (at the repo root, one level up; follow its Content Rules). Cover:
  - AUS, GPA and Tau Beta Pi President
  - Samsung Gulf, Chief Nest and the AUS roles
  - what you build, target roles, Golden Visa, and availability from January 2027
- The first sentence must contain "Ahmad Saad". Include the headshot if A2 has shipped.
- JSON-LD: an `AboutPage` whose `mainEntity` is `{ '@id': 'https://ahmadsaad.dev/#person' }`. Reference the Person by id; don't duplicate it. Add a `BreadcrumbList`.
- Link to `/about` from the homepage header or intro, and from the footer.

### A4. One page per project: High
- Route: `app/projects/[id]/page.tsx` with `generateStaticParams()` over `PROJECTS`, plus `dynamicParams = false` and force-static.
- Pages to create: `trend-radar`, `localai`, `mano-computer-simulator`, `lorawan-sensor-node`. Skip `portfolio`, which would be thin and circular.
- Title pattern: **`{Project title}: {shortDescription, trimmed to about 45 characters} | Ahmad Saad`**. Canonical: `/projects/{id}`.
- Body:
  - H1 = project title
  - a visible byline: "Built by Ahmad Saad", linking to `/about`
  - the period and the cover image, with alt `"{title}, a project by Ahmad Saad"`
  - the full `description`, the `impact` line and the skills
  - GitHub and live-demo links (`rel="noopener"`, no `nofollow`)
  - prev/next project links
- Aim for **at least 300 words** per page. `description` fields are about 100–200 words today, so add a `caseStudy?: string` field (Markdown) to `Project` in `config/projects.ts`. Write it from `portfolio-context.md` covering problem, approach, architecture, result and your role. Don't invent any metric that isn't in the context file.
- JSON-LD: `SoftwareSourceCode` or `CreativeWork` with `@id` = `https://ahmadsaad.dev/projects/{id}#project`, `author: { '@id': '.../#person' }`, `url`, `image` and `codeRepository`. Add a `BreadcrumbList` (Home › Projects › {title}). On the homepage, point the existing project nodes at these new `@id`s so everything resolves to one graph.
- Homepage: coverflow and project cards must link to `/projects/{id}` as the primary link, with GitHub as a secondary icon link. Internal links are what pass authority to these pages.
- Optional: an `/projects` index page listing all of them, titled `Projects by Ahmad Saad`.

### A5. Sitemap + llms: Medium
- `app/sitemap.ts`: add `/about`, `/projects` if built, and each `/projects/{id}`. Keep the hand-bumped `CONTENT_LAST_MODIFIED` constant (one per route is fine). Bump it in this commit.
- `app/(llms)/llms.txt`: add the new pages.

### A6. Final verification
- `pnpm build && pnpm preview`.
- `curl` each new route and confirm:
  - status 200
  - the correct canonical, as an absolute URL
  - a unique title that contains "Ahmad Saad"
  - JSON-LD present
- `curl /sitemap.xml` and confirm it lists every route.
- Run the home page and one project page through validator.schema.org. Paste the rendered JSON-LD if the site isn't deployed yet.
- Report back to the owner with a list of commits and a list of anything skipped (A2 in particular).

---

## Part B: Owner actions (off-site; an agent can't do these)

Do B1–B3 this week. They're as important as the code.

**B1. GitHub profile** (github.com/settings/profile)
- Name: `Ahmad Saad`
- Bio: `AI Engineer · Computer Engineering @ AUS · UAE`
- URL: `https://ahmadsaad.dev`
- Location: `United Arab Emirates`
- Avatar: the headshot

In the `ahm-adsaad/ahm-adsaad` README:
- change "AI/ML Engineer @ Samsung" to past tense
- add a plain-text line near the top: "Ahmad Saad, AI engineer and Computer Engineering senior at AUS. Portfolio: ahmadsaad.dev". The banner and typing SVG images aren't readable text for Google.

In each public repo (`trend-radar`, `LocalAI`, `manos-basic-computer-simulator`, `portfolio`), set Website to `https://ahmadsaad.dev/projects/{id}` once A4 is live.

**B2. LinkedIn** (linkedin.com/in/ahmaddsaad)
- Settings → Visibility → Edit your public profile: set it **visible to everyone**, and set **profile photo = Public**. If the photo isn't public, Google can't index it. This is likely why it sits at #11.
- Use the same headshot as the site.
- Headline starts with a role people search for, e.g. `AI Engineer | Computer Engineering @ AUS | ...`.
- Contact info → Website: `https://ahmadsaad.dev` (type "Portfolio").
- Put "Ahmad Saad" plus your stack and projects in the About section.
- Add Trend Radar and LocalAI under **Projects**, each with a link to its `/projects/{id}` page.

**B3. Google Search Console**
- Add a **Domain** property for `ahmadsaad.dev` using a DNS TXT record in Cloudflare.
- Submit `https://ahmadsaad.dev/sitemap.xml`.
- After deploying, use URL Inspection → Request indexing on `/`, `/about` and each project page.
- Every week, check Performance → Queries for "ahmad saad" and look at the position.

**B4. More profiles** (add each URL to `sameAs` via A1)

Create or claim these under the exact name "Ahmad Saad", with the same headshot and a link back to the site:
- X
- Devpost, if you've done hackathons
- dev.to or Medium
- Credly (Tau Beta Pi / certificates)
- Google Scholar, only if a paper exists

Skip any profile you won't maintain. An empty profile is noise.

**B5. Earned mentions, the strongest signal you can realistically get**
- Ask AUS Communications, CITL or the College of Engineering news to feature your Samsung work or Tau Beta Pi presidency, linking ahmadsaad.dev.
- Get listed as President on the Tau Beta Pi AUS chapter page, with a link.
- Publish the Trend Radar write-up ("measurement decides, LLMs describe") on dev.to or Medium, with the canonical link set to `ahmadsaad.dev/projects/trend-radar`. Share it on LinkedIn, Show HN and relevant subreddits.
- Submit LocalAI (with the live demo) to Product Hunt and to WebGPU and on-device-AI awesome lists.

**B6. Check honestly**
- Always use an incognito window. Check both `google.com/search?q=ahmad+saad&gl=ae` and `&gl=us`.
- Your normal logged-in results are personalised and overstate your position.
- Log T1–T4 monthly in this file.

---

## Order of work

```
Today:        B1, B2 (15 min total)  ·  A1  ·  owner drops headshot → A2
This week:    A3, A4, A5, A6  →  owner reviews → deploy  →  B3 request indexing
Weeks 2–6:    B4, B5 (write-up + AUS mention)
Monthly:      B6 check, log results here
```
