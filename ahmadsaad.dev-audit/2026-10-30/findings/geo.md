# GEO / AI Search Readiness: ahmadsaad.dev

Audit date: 2026-10-30 (edge tests run 2026-10-30 20:00 to 20:10 UTC). Scope: 7 indexable HTML pages, /llms.txt, /llms-full.txt, /me/*.md, robots.txt, live edge behaviour per AI user agent, GitHub and Credly entity signals.
Status: complete except brand presence on Reddit, YouTube and LinkedIn content (marked "partial", gathering stopped by coordinator).

---

## 1. GEO Readiness Score: 56 / 100

Rationale: content is fully server-rendered, fact-dense and served to every search and user-triggered AI fetcher, but the Cloudflare policy opts the site out of Gemini grounding and GPT/Claude training, the entity name reaches text extractors as "AhmadSaad", there is no third-person "Ahmad Saad is ..." passage, and off-site entity signals are thin against a famous namesake.

| Dimension | Weight | Score | Weighted | Main drag |
|---|---|---|---|---|
| Citability | 25% | 62 | 15.5 | No third-person definition passage; only 1 paragraph site-wide in the 134-167 word band; certification only in an image alt |
| Structural Readability | 20% | 60 | 12.0 | H1 and hero sentence concatenate in textContent; 12 `<article>` cards on home make main-content extractors keep only the Samsung card; no question-based headings |
| Multi-Modal Content | 15% | 50 | 7.5 | Good alt text and image sitemap, but no explanatory video, diagrams or captions; homepage does not show the headshot its ProfilePage schema points to |
| Authority & Brand Signals | 20% | 40 | 8.0 | sameAs = 2; no visible or schema dates; GitHub bio 3 words, company empty, 2 followers; namesake (singer Ahmed Saad) owns the Knowledge Panel |
| Technical Accessibility | 20% | 65 | 13.0 | SSR complete and llms.txt valid, but GPTBot/ClaudeBot/CCBot/Amazonbot/Bytespider get 403 and robots.txt disallows Google-Extended, Applebot-Extended, meta-externalagent |
| **Total** | 100% | | **56** | |

---

## 2. What works

- **Full server rendering.** Raw HTML (no JS) holds every bio, role description and case study. Raw vs Playwright-rendered word sets differ only by the GitHub contribution-calendar legend ("Less", "More", "in the last year") and the decorative background `<video>` that is injected client-side. Evidence: `ssr_compare.py` output, all 6 non-home pages show 0 words that exist only after JS (home: 7, all decorative).
- **Retrieval-time AI fetchers all get 200**: OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Googlebot, Bingbot, Applebot, DuckAssistBot, YouBot, MistralAI-User, Meta-ExternalFetcher (see matrix in section 5).
- **llms.txt is spec-shaped** (H1, blockquote summary, H2 link lists, `## Optional`), served as `Content-Type: text/markdown;charset=utf-8`, and all 14 links resolve 200 except LinkedIn, which returns its normal bot wall (HTTP 999), not a broken link. Markdown companions (/me/about.md, /me/experience.md, /me/projects.md) exist.
- **Rich Person JSON-LD graph on the homepage**: stable `@id` (`https://ahmadsaad.dev/#person`), givenName/familyName, ImageObject headshot (748x748), disambiguatingDescription, knowsAbout (13 items), hasOccupation, hasCredential with a live Credly URL (HTTP 200), alumniOf/affiliation/worksFor pointing to Organization nodes, WebSite + ProfilePage + 5 project nodes, BreadcrumbList on inner pages.
- **Project case studies are citation-ready in shape**: each opens with "Built by Ahmad Saad" plus a date range, then Problem / Approach / Architecture / My role. Specific, verifiable numbers: 315 automated tests, 16 SQL migrations, 8 discovery lanes, 49-question golden set, eight embedders, five rerankers, 100% retrieval, 1.5B model, 16-bit machine with 4096 words.
- **/about opens with a first-person definition** in its first 25 words ("I'm Ahmad Saad, a Computer Engineering senior at the American University of Sharjah in the United Arab Emirates, and I build production AI systems.") and puts GPA 3.96 and the December 2026 graduation in paragraph 2.
- **Meta descriptions are entity-first** on /about ("Ahmad Saad is a Computer Engineering senior at AUS and an AI engineer in the UAE...") and titles carry the full name on every page.
- **GitHub entity alignment is started**: GitHub name "Ahmad Saad", blog "ahmadsaad.dev", location "United Arab Emirates"; 4 repos set a homepage pointing back to the site.

---

## 3. Findings

### F1. Cloudflare opts the site out of Gemini grounding and GPT/Claude/Common Crawl ingestion
- **Severity:** High
- **Evidence:**
  - `curl -s https://ahmadsaad.dev/robots.txt` returns a Cloudflare-managed block (`# BEGIN Cloudflare Managed content` ... `# END Cloudflare Managed Content`) with `Content-Signal: search=yes,ai-train=no,use=reference` and `Disallow: /` groups for Amazonbot, Applebot-Extended, Bytespider, CCBot, ClaudeBot, Diffbot, Google-Extended, GPTBot, omgili, anthropic-ai, Claude-Web, cohere-ai, MistralAI-Training, meta-externalagent, GoogleOther, Baiduspider, PetalBot, Google-CloudVertexBot, KimiBot and 13 others; then the repo block `User-Agent: * / Allow: / / Disallow: /api/ / Disallow: /admin`.
  - Edge test `curl -s -o /dev/null -w "%{http_code}" -A "<UA>" https://ahmadsaad.dev/{,about,llms.txt}`: GPTBot 403/403/403, ClaudeBot 403/403/403, Claude-Web 403, anthropic-ai 403, Amazonbot 403, CCBot 403, Bytespider 403 (body 25 bytes, `Server: cloudflare`). All other tested agents 200.
- **Impact by platform:**
  - **Gemini apps and Vertex "Grounding with Google Search": blocked.** Google-Extended is a robots.txt control token, not a crawler (it is never sent as a user agent, so the 200 edge result for it is meaningless). Google documents that it governs both Gemini model training and grounding in Gemini Apps. With `Disallow: /` for Google-Extended, Gemini can find the page in Google's index but may not use its content to ground an answer.
  - **Google AI Overviews and AI Mode: NOT affected.** Both are Google Search features that use Googlebot (200, allowed). Google-Extended has no effect on Search, AI Overviews, AI Mode or ranking.
  - **ChatGPT:** live search and user-triggered browsing work (OAI-SearchBot 200, ChatGPT-User 200). GPTBot (training) is blocked by robots.txt and by a 403 at the edge, so future OpenAI models will not learn about Ahmad from this site, and offline answers (no web search) depend on other sources.
  - **Claude:** Claude-SearchBot and Claude-User get 200 and are not named in robots.txt, so Claude web search and URL fetches work. ClaudeBot (training) gets robots Disallow plus 403.
  - **Perplexity:** fully open (PerplexityBot, Perplexity-User 200, not named in robots.txt).
  - **Apple Intelligence / Siri:** Applebot 200 (search), Applebot-Extended disallowed, so Apple may index but not use content for its foundation models.
  - **Meta AI:** meta-externalagent disallowed in robots.txt (edge still returns 200, so this is robots-only); Meta-ExternalFetcher (user-triggered) allowed.
  - **Open-weight models and many smaller assistants:** CCBot (Common Crawl) is blocked, removing the site from the most widely reused public crawl corpus.
- **Root cause:** Cloudflare dashboard features outside the repo: "Block AI bots" (edge 403 by user agent) and "Managed robots.txt" (prepends the opt-out list and Content-Signal line). The managed list is designed for publishers protecting paywalled content, the opposite of a personal brand site that wants to be known.
- **Fix (Owner action):**
  1. Cloudflare dashboard > ahmadsaad.dev > Security > Settings (older UI: Security > Bots) > **Block AI bots**: set to "Do not block (allow)".
  2. Cloudflare dashboard > ahmadsaad.dev > **AI Crawl Control** > Crawlers: set GPTBot, ClaudeBot, CCBot and Applebot-Extended to **Allow**; leave Bytespider blocked.
  3. Cloudflare dashboard > ahmadsaad.dev > AI Crawl Control (or Security > Settings) > **Managed robots.txt**: turn it off so the repo's robots.txt is served alone. (Dashboard labels as of 2026 may differ slightly; the setting is the one that injects "BEGIN Cloudflare Managed content".)
  4. Re-test: `curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot" https://ahmadsaad.dev/` must return 200, and `curl -s https://ahmadsaad.dev/robots.txt | grep -c "Cloudflare Managed"` must return 0.
- **Fix (repo):** replace the generated robots with the block in section 6a. Next.js `MetadataRoute.Robots` cannot emit a `Content-Signal` line, so serve it from a route handler: create `apps/website/app/robots.txt/route.ts` returning the section 6a text with `Content-Type: text/plain; charset=utf-8` and `Cache-Control: public, max-age=3600`, and delete the existing `apps/website/app/robots.ts` (the source of the current `Disallow: /api/` and `Disallow: /admin` block; confirm the location with `grep -rn "Disallow\|MetadataRoute.Robots" apps/website/app`). Do this only after step 3 or both blocks will be concatenated again.

### F2. The entity name and hero statement reach text extractors as concatenated words ("AhmadSaad")
- **Severity:** High
- **Evidence:** raw HTML of / and /about:
  `<h1 id="hero-name" ...><span class="block rise-name" style="--i:1">Ahmad</span><span class="block rise-name" style="--i:2">Saad</span></h1>` (about: `id="about-name"`, same pattern). BeautifulSoup `h1.get_text()` returns `'AhmadSaad'` on both pages. The statement line is `<span class="word">I</span><span class="word">build</span>...`, and Chromium's own `document.body.innerText` returns `Ibuildsystemsthathavetoprovetheywork.AnAIpipeline,aCPU,acircuitboard.`. A trafilatura pass over home (with article cards neutralised) starts with that same run-on string.
- **Root cause:** the name and the animated statement are split into sibling spans for the stagger animation with no whitespace text node between them. Browsers paint the gap because the spans are `display:block` or have margins, but any pipeline using textContent, tag stripping or HTML-to-markdown conversion (common in AI fetchers) joins them. The page's main entity name therefore appears as one token in the H1, the strongest on-page entity signal.
- **Fix (repo):** in the components rendering `#hero-name` (home hero, rendered from `apps/website/app/page.tsx`) and `#about-name` (`apps/website/app/about/page.tsx`), emit a literal space between the spans: `<span ...>Ahmad</span>{" "}<span ...>Saad</span>`. Do the same in the component that maps the statement into `<span class="word">` elements: render `{i > 0 && " "}` before each word span, or join with `{" "}`. For belt and braces add `aria-label="Ahmad Saad"` on the h1 only if the visual split must stay without whitespace. Find all instances with `grep -rn "rise-name\|className=\"word\"\|'word'" apps/website`. Verify with `curl -s https://ahmadsaad.dev/ | python -c "import sys,bs4;print(bs4.BeautifulSoup(sys.stdin.read(),'html.parser').h1.get_text())"` which must print `Ahmad Saad`.

### F3. No third-person definition passage: the site never says "Ahmad Saad is ..." in visible text
- **Severity:** High
- **Evidence (first 60 words of main text):**
  - Home: `AI Engineer · FDE Ahmad Saad Forward deployed. Builds the system, scopes it with the people who use it, ships it. Email LinkedIn CV Scroll I build systems that have to prove they work. An AI pipeline, a CPU, a circuit board. About Available January 2027 Forward Deployed I'm Ahmad, a Computer Engineering senior...` The first self-description starts around word 45 and uses the first name only.
  - /about: first-person ("I'm Ahmad Saad, a Computer Engineering senior...") within 25 words. Good, but first person.
  - /llms.txt, /llms-full.txt, /me/about.md blockquote: `Computer Engineering senior at the American University of Sharjah shipping production AI systems: ...` has no subject, so a lifted quote does not name who it describes.
  - The only "Ahmad Saad is" sentence on the site is in the /about meta description and AboutPage schema, which assistants rarely quote.
- **Root cause:** copy is written in a personal first-person voice (good for humans) with no self-contained third-person answer block for "who is Ahmad Saad" queries. AI answers favour a 134-167 word passage that names the subject, states role, place, institution, dates and proof points, and can be lifted without context.
- **Fix (repo):** add one canonical definition paragraph to `apps/website/config/user.ts` (new field, e.g. `definition`) and render it (a) on the homepage directly under the hero as a normal `<p>` inside the first content section (not inside the hero container), (b) as the first paragraph on /about before "I'm Ahmad Saad...", and (c) as the blockquote in `/llms.txt` and the opening of `/llms-full.txt` and `/me/about.md` via `apps/website/lib/llms.ts`. Proposed text (148 words, no dashes):

  > Ahmad Saad is an AI engineer and forward deployed engineer based in the United Arab Emirates. He is a Computer Engineering senior at the American University of Sharjah (AUS), where he holds a 3.96 GPA, is President of the Tau Beta Pi chapter, and graduates in December 2026. From June to August 2026 he was an AI/ML Engineer at Samsung Gulf Electronics in Dubai, where he architected and solely built a production trend intelligence platform with 315 automated tests, an estimated $60K in avoided tooling spend, and a projected 20% increase in engagement rates. He also built LocalAI, a private document assistant that runs entirely in the browser and scored 100% on its retrieval evaluation. He is a Claude Certified Architect: Foundations (Anthropic), speaks English and Arabic, holds a UAE Golden Visa, and is available to start full-time work in January 2027.

### F4. Main-content extractors lose the intro on /about and reduce the homepage to one job card
- **Severity:** Medium
- **Evidence:** trafilatura 2.2 (the boilerplate stripper used by the audit tooling and by many retrieval pipelines) on raw HTML:
  - Home: 280 words extracted of 1,168 in `<main>`; output starts `#### AI/ML Engineer\n\nArchitected and solely built...`, so the page is read as the Samsung role only. Home has 12 `<article>` elements (7 experience cards under `div`, 5 project cards under `li.stack-card`). Replacing `<article>` with `<div>` in a local copy raised extraction to 1,058 words including the intro paragraph.
  - /about: 469 words extracted, starting `About\n\n01 / 04\n\n## Education`. The opening definition paragraph (in `section.page-hero`) is dropped. Renaming the class to `page-intro` in a local copy did not restore it, so the cause is positional (first section before the article body is treated as header).
  - /projects: 37 words extracted of 233.
  - The render script's htmldate heuristic assigned the homepage a `publication_date` of `2026-06-01`, taken from the Samsung role dates, because no explicit date metadata exists (see F6).
- **Root cause:** repeated `<article>` cards signal "many independent items" to main-content heuristics; the hero section pattern looks like page chrome.
- **Fix (repo):**
  - Home (`apps/website/app/page.tsx` and the experience and project card components it renders): change experience and project card wrappers from `<article>` to `<div>` (or `<li>` inside the existing lists). Keep `<article>` for none of the cards on a page that is itself one profile.
  - /about (`apps/website/app/about/page.tsx`): wrap the intro paragraph and the four numbered sections in a single `<article>` element, with the definition paragraph from F3 as its first `<p>`, and keep only the H1 and badges in the hero section. Untested; re-run `trafilatura.extract()` on the deployed HTML and confirm the output starts with "Ahmad Saad is".
  - /projects: add a 2 to 3 sentence intro that names Ahmad Saad and summarises the four case studies with one number each.

### F5. llms.txt companions are thin and drift from the HTML
- **Severity:** Medium
- **Evidence:**
  - `/me/about.md` (644 bytes) contains no education, GPA, graduation date, certification, languages, target roles or email, and has two malformed empty links: `- [twitter]()` and `- [bluesky]()`.
  - `/llms-full.txt` (10,260 bytes) repeats the same summary twice (blockquote and `## About`), and carries only the one-paragraph project summaries. It omits the /about narrative (target roles: "technical product management, forward deployed or solutions engineering, AI/ML engineering, and management and strategy"; "English and Arabic"; "no employer sponsorship is required") and every case-study body (LocalAI "How I measured it": 49 questions, eight embedders, five rerankers, three bugs found; Trend Radar "This repository" note; Mano and LoRaWAN Problem/Approach/Why sections). Certification is listed without the Credly verification URL.
  - Title line `AI Engineer · Forward Deployed Engineer · Computer Engineering @ AUS` uses symbols that read poorly when quoted.
  - Experience order in llms-full.txt, experience.md and the homepage is not reverse-chronological: the AUS Web Design and Development Consultant role (08.2026 to Present) is listed 5th, after roles that ended in 2026.
  - Inconsistencies between surfaces: Mano period is `2025` on the case-study page vs `2025 - Present` in llms files and the projects index; LoRaWAN is `2026` vs `2026 - Present`; IEEE Solid-State Circuits Society Treasurer is present tense on home and in llms-full.txt but past tense on /about ("I was Treasurer"); the Mano page overview counter reads "1 tools".
  - `/.well-known/llms.txt` 404 and no RSL 1.0 license (`/license.xml` 404). Neither is required.
  - Note: Google does not use llms.txt for Search, AI Overviews or AI Mode. These files serve other assistants and agent tools only, so their value is moderate and their accuracy matters more than their size.
- **Root cause:** `apps/website/lib/llms.ts` and `apps/website/app/(llms)/*` render from the short `description` fields in `apps/website/config/*.ts` rather than from the long-form about and case-study content, and the social map is printed without filtering empty URLs.
- **Fix (repo):**
  - `apps/website/lib/llms.ts`: skip social entries with an empty URL; emit the F3 definition as the blockquote; add a "Key facts" list (section 6b); add the Credly URL after the certification; drop the duplicated `## About` paragraph in llms-full.txt.
  - `apps/website/lib/llms.ts` (llms-full builder) and `apps/website/app/(llms)/*`: append the full /about narrative from `apps/website/config/about.ts` and every case-study section body from `apps/website/config/projects.ts` (Problem, Approach, Architecture, How I measured it, My role) under each project heading.
  - `apps/website/config/user.ts`: remove empty `twitter` and `bluesky` keys or set real URLs; split the title into a plain string, for example "AI Engineer and Forward Deployed Engineer, Computer Engineering at the American University of Sharjah".
  - `apps/website/config/experience.ts`: sort roles by end date descending with "Present" first.
  - `apps/website/config/projects.ts` and the project page header: use one period format everywhere (decide "2025" or "2025 - Present" per project); pluralise the tool counter ("1 tool").
  - `apps/website/config/education.ts` and `apps/website/config/about.ts`: settle the IEEE role tense.

### F6. No dates anywhere a reader or a model can see them
- **Severity:** Medium
- **Evidence:** no `<time>` elements on any of the 7 pages; no `article:modified_time` meta; no `datePublished`, `dateModified` or `dateCreated` on ProfilePage, AboutPage, CollectionPage or the SoftwareSourceCode/CreativeWork project nodes. Sitemap `<lastmod>2026-10-21</lastmod>` exists for all 7 URLs but is invisible to readers and assistants. Date heuristics therefore guess: htmldate returned `2026-06-01` for the homepage.
- **Root cause:** static profile pages were treated as timeless; freshness is a ranking and citation input for AI answers about people ("currently", "available from").
- **Fix (repo):** add a single `lastUpdated` ISO date constant in `apps/website/config/user.ts` (set at build time or by hand on each content change). Render it in the footer as `<p>Last updated <time datetime="2026-10-21">21 October 2026</time></p>`, and emit it as `dateModified` on the ProfilePage node in `apps/website/app/page.tsx`, on AboutPage in `apps/website/app/about/page.tsx`, on CollectionPage in `apps/website/app/projects/page.tsx`, and on each project node in `apps/website/lib/seo/project-schema.ts`. Add `dateCreated` to ProfilePage (Google's ProfilePage documentation lists dateCreated and dateModified as recommended properties). Use the same value for sitemap lastmod so all three agree.

### F7. Certification and key credentials exist only as an image or in schema
- **Severity:** Medium
- **Evidence:** "Claude Certified Architect: Foundations" appears on / and /about only as `<img alt="Claude Certified Architect: Foundations, issued by Anthropic">` linked to Credly, under a "Certification" heading with no text. Main-text extraction of /about contains no mention of the certification.
- **Root cause:** badge-only presentation.
- **Fix (repo):** in the badge components on `apps/website/app/page.tsx` (Education section) and `apps/website/app/about/page.tsx` (hero badges), add a visible text line next to the badge: "Claude Certified Architect: Foundations, issued by Anthropic. Verify on Credly." with the Credly link on "Verify on Credly". Mention the certification in the /about Education paragraph (`apps/website/config/about.ts`).

### F8. Thin entity graph off-site: sameAs 2, GitHub profile under-filled, one repo homepage malformed
- **Severity:** Medium
- **Evidence:**
  - Person `sameAs`: `["https://github.com/ahm-adsaad", "https://www.linkedin.com/in/ahmaddsaad"]` only.
  - `curl -s https://api.github.com/users/ahm-adsaad`: `name: "Ahmad Saad"`, `bio: "Forward Deployed Engineer (FDE)"`, `blog: "ahmadsaad.dev"`, `location: "United Arab Emirates"`, `company: null`, `followers: 2`, `public_repos: 9`, `twitter_username: null`.
  - `curl -s https://api.github.com/repos/ahm-adsaad/trend-radar` homepage: `" https://ahmadsaad.dev/projects/trend-radar"` (leading space, renders as a broken or relative link on GitHub). LocalAI homepage points to the demo `https://localai.ahmadsaad.dev` (fine) but its README link to the case study was not verified. portfolio, trend-radar and manos-basic-computer-simulator have empty `topics`.
  - Credly badge URL returns 200. LinkedIn returns HTTP 999 to automated fetches (cannot verify headline or website field).
  - Reddit, YouTube, Wikipedia presence: partial, not checked before the coordinator stopped gathering. Wikipedia: the namesake "Ahmed Saad" (Egyptian singer) has the Knowledge Panel; a self-created Wikipedia or Wikidata entry would not meet notability and should not be attempted.
- **Root cause:** profiles were created but not written as entity anchors; most assistants resolve "which Ahmad Saad" from consistent descriptions across GitHub, LinkedIn, YouTube, Reddit and institutional pages, and brand mentions outweigh backlinks for AI visibility.
- **Fix (Owner action, ranked by expected AI-visibility impact):**
  1. **YouTube (strongest mention correlation, about 0.74):** publish a 2 to 4 minute LocalAI demo and a Trend Radar architecture walkthrough on a channel named "Ahmad Saad". First line of each description: "Ahmad Saad, AI engineer and Computer Engineering senior at the American University of Sharjah, demonstrates ..." plus a link to the matching case study. Then embed the video on `/projects/localai` with VideoObject schema and add the channel to sameAs.
  2. **LinkedIn:** headline "AI Engineer and Forward Deployed Engineer | Computer Engineering, American University of Sharjah | Available January 2027"; Contact info > Website: https://ahmadsaad.dev; Featured: LocalAI and Trend Radar case-study links; About section opens with the F3 definition paragraph.
  3. **Reddit and developer communities (Perplexity and ChatGPT cite these heavily):** a genuine write-up of the LocalAI evaluation (49-question golden set, embedder and reranker comparison) in r/LocalLLaMA or r/webgpu and a Show HN post, signed as Ahmad Saad with a link to the case study.
  4. **AUS institutional mentions:** ask the CITL AI Hub, the College of Engineering and the Tau Beta Pi chapter to name "Ahmad Saad" with a link to ahmadsaad.dev on their team, officer or credits pages. .edu-style institutional pages are strong disambiguators against the singer.
  5. **GitHub:** Settings > Profile: Bio "AI engineer and forward deployed engineer. Computer Engineering at the American University of Sharjah. Available January 2027."; Company "American University of Sharjah"; URL "https://ahmadsaad.dev". trend-radar repo > About (gear icon) > Website: remove the leading space. Add topics to portfolio, trend-radar and manos-basic-computer-simulator. Start the profile README (repo `ahm-adsaad/ahm-adsaad`, exists) with the F3 definition sentence.
  6. **Credly:** make the Credly user profile public and add its profile URL (not the badge URL) to sameAs.
- **Fix (repo):** in `apps/website/config/user.ts` (social links feeding sameAs in `apps/website/app/page.tsx`), add each new profile URL as it goes live: Credly user profile, YouTube channel, and any X or Hugging Face account that carries the same name and site link. Do not add profiles that do not link back.

### F9. No question-shaped headings or quick-answer block
- **Severity:** Low
- **Evidence:** all headings are labels: home `Forward Deployed`, `Experience`, `Projects`, `Education`, `Stack`, `GitHub`, `Let's Talk.`; /about `Education`, `Experience`, `What I build`, `What's next`; case studies `Overview`, `Problem`, `Approach`, `Architecture`, `My role` (LocalAI is closest: `The problem I found`, `How I measured it`).
- **Root cause:** design-led section labels.
- **Fix (repo):** add a "Quick facts" section at the end of /about (`apps/website/config/about.ts`, rendered by `apps/website/app/about/page.tsx`) with H3 questions and 40 to 60 word answers, without FAQPage schema (Google limits FAQ rich results to government and health sites, but the Q and A shape still helps passage retrieval):
  - "Who is Ahmad Saad?" Use the first two sentences of the F3 definition.
  - "Where does Ahmad Saad study?" "Ahmad Saad studies Computer Engineering at the American University of Sharjah in the UAE. He holds a 3.96 GPA, has made the Dean's List six times and the Chancellor's List three times, and graduates in December 2026."
  - "What has Ahmad Saad built?" One sentence each for Trend Radar and LocalAI with their headline numbers.
  - "When is Ahmad Saad available?" "Ahmad Saad is available to start full-time work in January 2027. He holds a UAE Golden Visa, so no employer sponsorship is required. He is open to forward deployed engineering, solutions engineering, AI/ML engineering and technical product management roles."

### F10. Minor multi-modal and consistency gaps
- **Severity:** Low
- **Evidence and fixes:**
  - Homepage ProfilePage `primaryImageOfPage` and the sitemap `<image:loc>https://ahmadsaad.dev/ahmad-saad.jpg</image:loc>` for `/` reference the headshot, but the homepage HTML has no `<img src="/ahmad-saad.jpg">` (images on home: drive-poster.jpg with empty alt, 5 project images, the badge). Fix: show the headshot on home (hero or About block in `apps/website/app/page.tsx`) with `alt="Ahmad Saad, AI engineer, American University of Sharjah"`, or drop it from the home sitemap entry.
  - Trend Radar case study never names Samsung Gulf Electronics while / and /about tie the same project and dates to Samsung. If the employer allows it, add "built during an AI/ML engineering role at Samsung Gulf Electronics in Dubai" to the first case-study sentence in `apps/website/config/projects.ts` so assistants connect the project to the role. If not allowed, leave as is.
  - The homepage "Stack" marquee prints all 37 tools twice in raw HTML. If the duplicate set lacks `aria-hidden="true"`, add it (not verified).
  - The GitHub contribution count "1,511 contributions" is frozen at build time. Label it with the as-of date or remove the number.

---

## 4. Platform breakdown

| Platform | Score /100 | What gates it today |
|---|---|---|
| Google AI Overviews | 52 | Googlebot has full access and the SSR Person graph is solid, but the singer Ahmed Saad owns the entity and the site has no third-person definition passage or visible dates to win the "who is" answer. |
| Google AI Mode | 50 | Same crawl path as AI Overviews; fan-out queries ("Ahmad Saad AUS", "Ahmad Saad AI engineer UAE") need more off-site corroboration (LinkedIn, AUS pages, YouTube) than exists. |
| ChatGPT search | 55 | OAI-SearchBot and ChatGPT-User get 200, so live citation works; GPTBot is blocked, so the model has no training-time knowledge of Ahmad, and Bing-index corroboration is thin. |
| Claude | 50 | Claude-SearchBot and Claude-User get 200; ClaudeBot is blocked at robots.txt and the edge, and the "AhmadSaad" H1 and missing definition paragraph weaken the extracted answer. |
| Perplexity | 60 | Fully open and llms.txt is valid; Perplexity leans on Reddit and community sources, where no presence was found (partial check). |
| Gemini (apps) | 30 | robots.txt `Disallow: /` for Google-Extended stops Gemini Apps grounding on this site, so Gemini falls back to other sources, mostly the singer. |
| Bing Copilot | 55 | bingbot gets 200 and the content is SSR, but Copilot answers about people rely on LinkedIn and other profile corroboration that is currently minimal. |

---

## 5. AI crawler access matrix

Edge results are from `curl -s -o /dev/null -w "%{http_code}" -A "<full published UA string>" https://ahmadsaad.dev/<path>` from a non-verified IP on 2026-10-30. Cloudflare's rule acts on the user-agent string here; verified-bot IPs could behave differently but are subject to the same "Block AI bots" setting.

| Crawler | Operator / purpose | robots.txt policy (effective) | Edge / | Edge /about | Edge /llms.txt | Net status |
|---|---|---|---|---|---|---|
| GPTBot | OpenAI, model training | Disallow / (CF managed) | 403 | 403 | 403 | Blocked |
| OAI-SearchBot | OpenAI, ChatGPT search index | Allow (falls to *) | 200 | 200 | 200 | Allowed |
| ChatGPT-User | OpenAI, user-triggered fetch | Allow (*) | 200 | 200 | 200 | Allowed |
| ClaudeBot | Anthropic, model training | Disallow / | 403 | 403 | 403 | Blocked |
| Claude-Web | Anthropic, legacy token | Disallow / | 403 | 403 | 403 | Blocked (legacy, low impact) |
| anthropic-ai | Anthropic, legacy token | Disallow / | 403 | 403 | 403 | Blocked (legacy, low impact) |
| Claude-User | Anthropic, user-triggered fetch | Allow (*) | 200 | 200 | 200 | Allowed |
| Claude-SearchBot | Anthropic, search index | Allow (*) | 200 | 200 | 200 | Allowed |
| PerplexityBot | Perplexity, search index | Allow (*) | 200 | 200 | 200 | Allowed |
| Perplexity-User | Perplexity, user-triggered fetch | Allow (*) | 200 | 200 | 200 | Allowed |
| Google-Extended | Google, Gemini training and Gemini Apps grounding (token only, no UA) | Disallow / | 200 (not meaningful) | 200 | 200 | Blocked by robots token |
| Googlebot | Google Search, AI Overviews, AI Mode | Allow (*) | 200 | 200 | 200 | Allowed |
| Bingbot | Bing, Copilot grounding | Allow (*) | 200 | 200 | 200 | Allowed |
| Applebot | Apple, Siri and Spotlight search | Allow (*) | 200 | 200 | 200 | Allowed |
| Applebot-Extended | Apple, foundation model use (token only) | Disallow / | 200 (not meaningful) | 200 | 200 | Blocked by robots token |
| Meta-ExternalAgent | Meta, AI training and indexing | Disallow / | 200 | 200 | 200 | robots-only block (edge open) |
| Meta-ExternalFetcher | Meta, user-triggered fetch | Allow (*) | 200 | 200 | 200 | Allowed |
| Amazonbot | Amazon, Alexa answers and training | Disallow / | 403 | 403 | 403 | Blocked |
| CCBot | Common Crawl, open corpus | Disallow / | 403 | 403 | 403 | Blocked |
| Bytespider | ByteDance, training | Disallow / | 403 | 403 | 403 | Blocked (keep) |
| DuckAssistBot | DuckDuckGo, AI answers | Allow (*) | 200 | 200 | 200 | Allowed |
| YouBot | You.com, search | Allow (*) | 200 | 200 | 200 | Allowed |
| MistralAI-User | Mistral Le Chat, user-triggered fetch | Allow (*) (MistralAI-Training is disallowed) | 200 | 200 | 200 | Allowed |
| cohere-ai, Diffbot, GoogleOther, Google-CloudVertexBot, KimiBot | Various | Disallow / | not tested | not tested | not tested | Blocked by robots |

---

## 6. Proposed files

### 6a. Proposed robots.txt (serve alone after the Owner turns off Cloudflare Managed robots.txt)

```
# robots.txt for ahmadsaad.dev
# This is a personal portfolio. Search engines and AI assistants are welcome
# to index, quote and cite it with a link back.

User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=yes
Allow: /
Disallow: /api/
Disallow: /admin

# Search indexes and user-triggered AI fetchers (must stay allowed)
User-agent: Googlebot
User-agent: Bingbot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Applebot
User-agent: DuckAssistBot
User-agent: MistralAI-User
User-agent: Meta-ExternalFetcher
User-agent: YouBot
Allow: /
Disallow: /api/
Disallow: /admin

# Model training and grounding tokens (allowed: being known to models helps a personal brand)
# Google-Extended also controls grounding in Gemini Apps, so it must be allowed for Gemini citations.
User-agent: Google-Extended
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Applebot-Extended
User-agent: CCBot
Allow: /
Disallow: /api/
Disallow: /admin

# No citation value for this site
User-agent: Bytespider
User-agent: Diffbot
User-agent: omgili
User-agent: GoogleOther
User-agent: Google-CloudVertexBot
Disallow: /

Sitemap: https://ahmadsaad.dev/sitemap.xml
```

Minimum acceptable variant, if the Owner prefers to keep a training opt-out: set `ai-train=no`, move GPTBot, ClaudeBot, Applebot-Extended and CCBot into the final `Disallow: /` group, but keep **Google-Extended allowed** (it also gates Gemini Apps grounding) and keep every agent in the "must stay allowed" group. Meta-ExternalAgent and Amazonbot are optional either way.

### 6b. Proposed /llms.txt

Note: Google does not read llms.txt for Search, AI Overviews or AI Mode. This file serves ChatGPT, Claude, Perplexity and agent tools that request it. Generate it from `apps/website/lib/llms.ts` and `apps/website/config/*.ts`, not by hand.

```
# Ahmad Saad

> Ahmad Saad is an AI engineer and forward deployed engineer based in the United Arab Emirates. He is a Computer Engineering senior at the American University of Sharjah (AUS) with a 3.96 GPA, graduating in December 2026 and available to start full-time work in January 2027. He holds a UAE Golden Visa, so no employer sponsorship is required.

Key facts:

- Most recent industry role: AI/ML Engineer at Samsung Gulf Electronics, Dubai, June to August 2026. Architected and solely built a production trend intelligence platform (Trend Radar) with 315 automated tests, an estimated $60K in avoided tooling spend and a projected 20% increase in engagement rates.
- Current roles: Web Design and Development Consultant, College of Engineering, AUS (since August 2026). AI Hub Assistant, Center of Innovation in Teaching and Learning, AUS (since November 2024). Account Manager, Chief Nest, remote (since September 2025).
- Certification: Claude Certified Architect: Foundations, issued by Anthropic. Verification: https://www.credly.com/badges/976e4176-241f-4870-83ea-c66f896f64ff
- Leadership and honours: President of the AUS Tau Beta Pi chapter (previously Vice President). Treasurer of the IEEE Solid-State Circuits Society [confirm current or former]. Academic Merit Scholarship, Dean's List six times, Chancellor's List three times.
- Languages: English and Arabic.
- Looking for: forward deployed or solutions engineering, AI/ML engineering, technical product management.
- Name note: this Ahmad Saad is a computer engineer in the UAE. He is not Ahmed Saad, the Egyptian singer.
- Contact: ahmadd.saad02@gmail.com

## Me

- [About](https://ahmadsaad.dev/me/about.md): Definition, education, credentials, languages, availability and contact.
- [Experience](https://ahmadsaad.dev/me/experience.md): Every role, newest first, with full description and skills.
- [Projects](https://ahmadsaad.dev/me/projects.md): Project case studies with problem, approach, architecture, measured results and role.

## Pages

- [About Ahmad Saad](https://ahmadsaad.dev/about): Bio, education, experience, target roles and availability.
- [Projects](https://ahmadsaad.dev/projects): Index of project case studies.
- [Trend Radar](https://ahmadsaad.dev/projects/trend-radar): Production TikTok trend-detection platform where deterministic measurement decides and LLMs only describe. 315 tests, 8 discovery lanes.
- [LocalAI](https://ahmadsaad.dev/projects/localai): Private document assistant that runs entirely in the browser on WebGPU. 100% retrieval on a 49-question evaluation, with a Playwright audit proving no data leaves the device.
- [Mano Basic Computer Simulator](https://ahmadsaad.dev/projects/mano-computer-simulator): Cycle-accurate Python simulator of Mano's Basic Computer with full ISA support and a CLI debugger.
- [Energy Harvesting LoRaWAN Sensor Node](https://ahmadsaad.dev/projects/lorawan-sensor-node): Custom 2-layer PCB with an ATMEGA4809 MCU, LoRa transceiver and an energy harvesting power path.

## Profiles

- [GitHub](https://github.com/ahm-adsaad): Source for Trend Radar (public extract), LocalAI, the Mano simulator and this site.
- [LinkedIn](https://www.linkedin.com/in/ahmaddsaad): Professional profile.
- [Credly](https://www.credly.com/badges/976e4176-241f-4870-83ea-c66f896f64ff): Claude Certified Architect: Foundations badge.

## Optional

- [Full text](https://ahmadsaad.dev/llms-full.txt): About, experience, full project case studies and education in one file.
- [Resume (PDF)](https://ahmadsaad.dev/Ahmad_Saad_CV.pdf): Full CV.
- [LocalAI live demo](https://localai.ahmadsaad.dev): Runs in any browser with WebGPU.
- [Site source](https://github.com/ahm-adsaad/portfolio): Source code for this site.
- [Sitemap](https://ahmadsaad.dev/sitemap.xml): Indexable pages.
```

---

## 7. Passage-level citability detail

Main-text word counts are from `<main>` on raw HTML; "extracted" is trafilatura main-content output.

| Page | Main words | Extracted words | "Ahmad Saad is" in first 60 words | Blocks of 134-167 words | Question headings | Key facts in first 30% |
|---|---|---|---|---|---|---|
| / | 1,168 | 280 | No (first-person "I'm Ahmad" at about word 45) | 0 (role text split into 40 to 55 word paragraphs) | 0 | Partly: availability and Samsung yes; GPA 3.96 sits at about 70% depth |
| /about | 532 | 469 (intro dropped) | First-person yes, third-person no | 0 (Experience paragraphs about 112 and 100 words) | 0 | Yes: GPA, graduation, Samsung in first 45% |
| /projects | 233 | 37 | No | 0 | 0 | Impact lines yes |
| /projects/trend-radar | 553 | 515 | No (byline only) | 0 (longest about 105 words) | 0 | Yes: impact line at top |
| /projects/localai | 644 | 589 | No (byline only) | 1 ("What I built", about 143 words) | 0 | Yes |
| /projects/mano-computer-simulator | 375 | 352 | No | 0 | 0 | Partly |
| /projects/lorawan-sensor-node | 370 | 339 | No | 0 | 0 | Yes: parts list at top |
| /llms-full.txt | about 1,450 | n/a | No (subjectless summary) | 1 to 2 (Samsung role description) | 0 | Yes |

Word counts marked "about" are hand counts on extracted text.

**Passages most likely to be lifted today**
1. /projects/localai, "How I measured it": "I built a golden set of 49 questions over four generated PDFs and a Node eval that runs in CI, then compared eight embedders and five rerankers before choosing... retrieval puts the right excerpt in the prompt for 100% of questions and the default 1.5B model answers 100% of single-turn questions correctly." Specific, numeric, self-contained.
2. /about, Education: "I study Computer Engineering at AUS, where I hold a 3.96 GPA and graduate in December 2026. I am President of the university's Tau Beta Pi chapter..." Direct answer to "where does he study".
3. /about, Experience paragraph 1: "From June to August 2026 I was an AI/ML Engineer at Samsung Gulf Electronics in Dubai. I architected and solely built a production trend intelligence platform..." with $60K and 20% figures.

**Passages that most need rewriting**
1. Home hero and statement (current: "AI Engineer · FDE / Ahmad / Saad / Forward deployed. Builds the system, scopes it with the people who use it, ships it." then the run-on word spans). Keep the visual, fix whitespace (F2), and place the F3 definition paragraph directly below.
2. llms.txt / llms-full.txt / about.md blockquote (current: "Computer Engineering senior at the American University of Sharjah shipping production AI systems: LLM pipelines with real cost governance, evaluation, and stakeholders. Forward deployed engineer: technical enough to build the system, comfortable enough to scope it."). Rewrite: "Ahmad Saad is an AI engineer and forward deployed engineer based in the United Arab Emirates. He is a Computer Engineering senior at the American University of Sharjah with a 3.96 GPA, graduating in December 2026 and available to start full-time work in January 2027."
3. Trend Radar opening (current: "Production TikTok trend-detection platform where measurement decides and LLMs describe."). Rewrite: "Trend Radar is a production TikTok trend-detection platform that Ahmad Saad architected and built alone in 2026. Deterministic measurements such as caption n-gram clustering, creator spread and adoption curves decide every verdict, and language models only describe what was measured. It runs 8 discovery lanes on a fixed single-digit-dollar daily budget and ships with 315 automated tests." Apply the same "<Project> is a ... that Ahmad Saad built in <year>" pattern to each case-study opener in `apps/website/config/projects.ts`.

---

## 8. Schema recommendations for AI discoverability

All in `apps/website/app/page.tsx` (homepage graph) unless noted.

1. **ProfilePage**: add `dateCreated` and `dateModified` (F6).
2. **Person.sameAs**: grow from 2 to every live profile that names Ahmad Saad and links back (Credly user profile, YouTube channel, X, Hugging Face, AUS staff or officer page if it exists).
3. **Person.jobTitle**: replace the compound string `AI Engineer · Forward Deployed Engineer · Computer Engineering @ AUS` with an array `["AI Engineer", "Forward Deployed Engineer"]`.
4. **Person.knowsLanguage**: `[{"@type":"Language","name":"English","alternateName":"en"},{"@type":"Language","name":"Arabic","alternateName":"ar"}]` (the site already states both).
5. **Person.award**: `["Academic Merit Scholarship, American University of Sharjah", "Dean's List (6 times), American University of Sharjah", "Chancellor's List (3 times), American University of Sharjah"]`.
6. **Person.memberOf**: Organization nodes for "Tau Beta Pi" (with `roleName` "Chapter President" via a Role wrapper) and "IEEE Solid-State Circuits Society".
7. **Person.alumniOf**: keep AUS and, once conferred, add an `EducationalOccupationalCredential` for the B.S. in Computer Engineering. Until December 2026, describe it in `description` only.
8. **Person.disambiguatingDescription**: make it a complete sentence that answers "which one": "Ahmad Saad is a UAE-based AI engineer and Computer Engineering student at the American University of Sharjah, class of 2026." Keep the singer disambiguation out of schema (it would create an association in Google's graph) and put it only in llms.txt.
9. **Person.nationality**: add only if the Owner wants it public; it is a strong disambiguator for name collisions but is personal data.
10. **AboutPage** (`apps/website/app/about/page.tsx`): emit the full Person node (same `@id`, same properties) instead of the 3-field stub, because assistants that fetch only /about see the stub.
11. **Project nodes** (`apps/website/lib/seo/project-schema.ts`): add `dateCreated` (project start), `dateModified`, `creator` (same `@id` as author), and for LocalAI a `SoftwareApplication` with `applicationCategory` "BusinessApplication", `operatingSystem` "Any (WebGPU browser)" and `url` https://localai.ahmadsaad.dev. Add `VideoObject` once a demo video exists.
12. **FAQ-shaped content without FAQPage schema**: the "Quick facts" block in F9.

---

## 9. Top 5 fixes ranked by impact over effort

| Rank | Fix | Type | Files or setting | Severity | Effort |
|---|---|---|---|---|---|
| 1 | Turn off "Block AI bots" and Cloudflare Managed robots.txt; allow GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot; then ship the section 6a robots.txt from a route handler | Owner action, then repo | Cloudflare: Security > Settings > Block AI bots; AI Crawl Control > Crawlers; Managed robots.txt. Repo: `apps/website/app/robots.txt/route.ts` (new), remove `apps/website/app/robots.ts` | High (F1) | 15 min Owner + 20 min repo |
| 2 | Put a space between the name spans and the statement word spans so text extractors read "Ahmad Saad" | Repo | Hero components rendered from `apps/website/app/page.tsx` and `apps/website/app/about/page.tsx` (grep `rise-name`, `word`) | High (F2) | 15 min |
| 3 | Add the 148-word "Ahmad Saad is ..." definition under the hero on / and first on /about, outside hero containers; change home cards from `<article>` to `<div>`; wrap /about body in one `<article>` | Repo | `apps/website/config/user.ts`, `apps/website/app/page.tsx`, `apps/website/app/about/page.tsx`, card components | High (F3, F4) | 1 to 2 h |
| 4 | Entity anchoring: GitHub bio, company and URL; fix trend-radar homepage leading space; public Credly profile; LinkedIn headline and website; then expand sameAs. Follow with a YouTube LocalAI demo (highest mention correlation) | Owner action, then repo | GitHub Settings > Profile; trend-radar > About > Website; LinkedIn > Edit intro and Contact info; `apps/website/config/user.ts` sameAs | Medium (F8) | 1 h (profiles), 1 day (video) |
| 5 | Rewrite llms.txt per 6b; make llms-full.txt include the full /about narrative and case-study bodies; fix about.md empty links; add visible "Last updated" plus dateModified/dateCreated schema; certification as text | Repo | `apps/website/lib/llms.ts`, `apps/website/app/(llms)/*`, `apps/website/config/*.ts`, `apps/website/lib/seo/project-schema.ts`, `apps/website/app/page.tsx`, `apps/website/app/about/page.tsx` | Medium (F5, F6, F7) | 2 to 3 h |

---

## Appendix: commands and raw evidence

- Crawler matrix: loop over 23 published UA strings with `curl -s -o /dev/null -w "%{http_code}" -A "$UA" https://ahmadsaad.dev/{,about,llms.txt}`.
- llms link check: every URL in /llms.txt fetched with `curl -L`; results: 13 x 200 (pages text/html, .md and .txt text/markdown, sitemap application/xml, CV application/pdf 362,435 bytes), LinkedIn 999.
- Other checks: `https://localai.ahmadsaad.dev` 200; GitHub repos trend-radar, LocalAI, manos-basic-computer-simulator 200; Credly badge 200; `/ahmad-saad.jpg` 200; `/.well-known/llms.txt` 404; `/license.xml` 404; `/.well-known/rsl.xml` 404.
- Response headers on /llms.txt: `Content-Type: text/markdown;charset=utf-8`, `Cache-Control: s-maxage=31536000, stale-while-revalidate=2592000`, `x-opennext-cache: HIT`.
- SSR parity: Playwright Chromium innerText vs raw HTML word sets per page (raw/rendered words): home 1,212/910 (difference is collapsed experience cards hidden after hydration, still present in raw HTML), about 559/551, projects 256/249, trend-radar 578/571, localai 669/662, mano 400/392, lorawan 394/387. Client-only text: GitHub calendar legend. Client-only media: background `<video>` on / and /about.
- Render script: `claude-seo run render_page.py https://ahmadsaad.dev/ --mode always --json` returned `is_spa: false`, `publication_date: "2026-06-01"`, one valid JSON-LD block (13 types).
