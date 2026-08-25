# Content Quality / E-E-A-T Audit — ahmadsaad.dev

Page type evaluated: **personal portfolio, single page** (not a blog/article; homepage
content-minimum floor of 500 words applies, not the 1,500-word blog floor). Scored against
`references/eeat-framework.md` and `references/quality-gates.md` from the claude-seo
`seo` skill, Sept 2025 QRG criteria.

## Content Quality Score: 58 / 100

Composite of E-E-A-T (weighted below), AI citation readiness, keyword/intent alignment,
and content-minimum compliance. The visible prose is genuinely strong (specific,
first-hand, rule-compliant, no AI-boilerplate markers) — the score is dragged down by a
systemic engineering defect that hides roughly 80% of the site's actual proof-of-work
content from anything that doesn't execute JavaScript and click through the UI, plus an
empty structured-data entity and a priority-audience gap.

## E-E-A-T Breakdown

| Factor | Weight | Score | Rationale |
|---|---|---|---|
| Experience | 20% | 65/100 | Where visible (Samsung role, hero paragraph), signals are strong: first-hand narrative, specific architecture decisions, hedged metrics. But 4 of 5 employers and 4 of 5 projects have zero experience evidence in the rendered DOM (see Finding 1). |
| Expertise | 25% | 72/100 | Correct, specific technical vocabulary; real credentials (GPA, Tau Beta Pi, coursework) visible. Docked for an empty/wrong-type JSON-LD entity and for silence on the #1 priority audience (technical PM). |
| Authoritativeness | 25% | 45/100 | No external citations, testimonials, press mentions, or corroboration for any claim. GitHub contribution graph is the only third-party-verifiable signal. Real employer domains are linked, which lends some borrowed authority. |
| Trustworthiness | 30% | 55/100 | Contact info, CV, and LinkedIn present (good). Undermined by: empty JSON-LD entity, 9/14 anchors with no accessible name, apex/www serving duplicate 200s with no canonical, no security headers, and a llms.txt file with 404ing template leftovers that make the site look less curated than it is. |

**Weighted E-E-A-T score: ≈59/100** (0.20×65 + 0.25×72 + 0.25×45 + 0.30×55).

## AI Citation Readiness: ~40/100

- `content_quality.py` on the visible body text (`home-body.txt`, 629 words by this
  tool's tokenizer): `overall_quality: 95`, `filler_score: 0`, `ai_pattern_score: 0`,
  `information_density: 1.0` — the prose that *is* visible has no low-quality-AI-content
  markers. This is a genuine strength.
- `content_verify.py` on the same text: 2 uncited quantitative claims (`$60K`, appearing
  twice — Samsung role description and Trend Radar project "Impact" line),
  `uncited_ratio: 1.0`. Both are correctly hedged as "estimated"/"projected" per the
  author's own content rules, but neither links to any corroborating source.
- The single most citation-critical URL on the site, `/me/experience.md` (built
  specifically for LLM/agent consumption per `llms.txt`), returns only 71 words —
  every position's description and skills list is stripped out by a code-level bug (see
  Finding 2). An LLM citing this URL can learn *that* Ahmad worked at Samsung Gulf
  Electronics for two months, and nothing about what he built there.
- 80% of the Projects carousel (LocalAI, Mano's Basic Computer Simulator, the Energy
  Harvesting LoRaWAN node, and the portfolio site itself as a project entry) exposes only
  `<img alt="{title} cover">` in the DOM — no tech stack, no description, no impact line,
  no link text (see Finding 1). LocalAI in particular is a live, working, publicly linked
  demo (`localai.ahmadsaad.dev`) that is maximally relevant to the AI/ML-engineering
  audience and currently has zero citable text.
- JSON-LD is an empty `Organization` (no `name`, no `url`, no `sameAs`) — no structured
  entity for an AI answer engine to anchor facts to (Finding 3).

## Readability (directional, not precise)

A crude Flesch calculation on the extracted body text gave Reading Ease ≈25 / grade
≈15.8 (graduate level), but this figure is inflated by the extraction mixing prose with
unpunctuated UI strings (tag chips like "TypeScript Node.js PostgreSQL...", nav labels
like "Scroll to top") that the sentence splitter treats as run-on sentences — it is not a
clean measurement of the actual prose. Read qualitatively, the hero and Samsung
description use genuinely technical vocabulary (n-gram clustering, Reciprocal Rank
Fusion, quantization) appropriate for the stated audiences (AI/ML engineering, forward
deployed engineering); this is expected and correct for that audience, not a defect.

## What Works

- The Samsung role description and hero paragraph read as real first-hand experience:
  specific architecture decisions, named technologies, and numbers with correct epistemic
  hedging ("an estimated $60K," "a projected 20%") — exactly the kind of Experience/
  Expertise signal Sept 2025 QRG rewards and that scaled/AI content cannot fabricate.
- `content_quality.py` found zero filler and zero AI-pattern matches in the visible copy;
  information density scored 1.0.
- Content rules from `portfolio-context.md` are followed correctly in the visible text:
  0 em/en dashes found (verified by direct character count), no mention of LightGBM, no
  named third-party data vendors ("commercial data vendors" used correctly), no scraping
  language.
- Real trust anchors: working `mailto:` link, LinkedIn link, downloadable CV PDF, real
  linked employer domains (samsung.com/ae, elmec.ae, chiefnest.com, aus.edu), a live
  GitHub contribution graph (a genuine, hard-to-fake activity signal), and a live
  interactive product (`localai.ahmadsaad.dev`) linked from a project card.
- The page clears the homepage content-minimum floor (500 words) with 635 visible words,
  before even counting the ~300 additional words of real content currently trapped in
  collapsed/inactive UI state (see Finding 1) — the underlying content model is not thin,
  only its exposure is.
- Heading hierarchy is clean: h1 → h2 (Experience, Projects, Education, Tech Stack,
  GitHub Contribution) → h3, no skipped levels.

## Findings

| Severity | Title | Evidence | Fix |
|---|---|---|---|
| CRITICAL | Client-side collapse hides ~80% of proof-of-work content from the DOM | Grepped the full rendered `home.html` (345KB) for the description text of every non-Samsung company (Elmec, Chief Nest, ONBRND, both AUS positions) and every non-Trend-Radar project (LocalAI, Mano's simulator, LoRaWAN node, the portfolio project entry itself): **0 matches for all of them**. Root cause traced in source: `experiences.tsx`/`project-item.tsx` use Radix `CollapsiblePrimitive.Content` with `defaultOpen={experience.isCurrentEmployer}` / `project.isExpanded` — only Samsung (`isCurrentEmployer: true`) and Trend Radar (`isExpanded: true`) default open, and Radix unmounts `CollapsibleContent` children entirely when closed (no `forceMount`). Separately, `coverflow-carousel.tsx` line ~338-378 renders `active?.title`/`active.subtitle`/`active.meta` for only the currently centered carousel slide, so the other 4 project cards expose nothing but `<img alt="{title} cover">` in markup — confirmed by searching for "LocalAI", "Mano", "lorawan-sensor-node", "portfolio.jpg" in the HTML: each appears exactly once, and only inside the `<img alt=...>` attribute, never as visible/heading text. Quantified: ~300 words of real, already-written description content (127 words across 5 hidden experience descriptions + 173 words across 3 hidden project descriptions) never reaches any non-interactive crawler. | For `CollapsibleContent`, pass `forceMount` and hide the closed state with CSS (`height:0`/`visibility:hidden`) instead of unmounting, so descriptions stay in the DOM for crawlers while remaining visually collapsed for users. For the coverflow, render an `sr-only` caption block (title, tech, impact) per slide instead of a single block bound to the active slide only. |
| CRITICAL | `/me/experience.md` (the dedicated AI-citation endpoint) is functionally empty | Fetched the live endpoint: 71 words total, only `## {title} \| {company}` + `Duration: ...` per position, for all 6 positions. Root cause in `app/(llms)/me/experience.md/route.ts`: the line that would interpolate description and skills is commented out — `return \`## ${position.title} \| ${item.companyName}\n\nDuration: ...\n\`;` followed by a dead `// \nSkills: ${skills}\n\n${position.description?.trim()}` comment; the `skills` const is computed and then never used. | Restore the description/skills interpolation into the actual template string (remove the `//` and merge it into the `return` line) so `/me/experience.md` carries the same substance as `config/experience.ts`. |
| HIGH | JSON-LD is an empty, wrong-type entity | `app/page.tsx` lines 39-46 emit exactly `{"@type":"Organization","@context":"https://schema.org"}` — no `name`, `url`, or `sameAs`. This is both the wrong schema type for a personal portfolio (should be `Person`, optionally wrapped in `WebSite`/`ProfilePage`) and functionally empty, giving search/AI answer engines no structured entity to anchor facts about Ahmad Saad to. (Cross-reference: `seo-schema` sub-skill owns the fix; flagged here because it directly weakens the Expertise/Authoritativeness machine-readability signal this skill scores.) | Replace with a `Person` schema: `name`, `jobTitle`, `url: https://ahmadsaad.dev`, `email`, `alumniOf` (American University of Sharjah), `worksFor`/`hasOccupation` (Samsung Gulf Electronics), `sameAs: [LinkedIn, GitHub]`. |
| HIGH | Meta description is 313 characters, ~2x Google's truncation point | Computed length of `USER.description` (`config/user.ts`), used verbatim as both the `<meta name="description">` and the `og:description`: 313 characters. Google truncates SERP snippets at roughly 155-160 characters, so the live snippet cuts off mid-word around "...evaluation, and stake" (from "stakeholders"). The same string is also reused verbatim as the entire `# About` body of `/me/about.md` — fine for that endpoint (no truncation concern there), but the shared string means shortening the meta tag would also shorten the about.md content unless decoupled. | Shorten the meta description to ~150-160 characters for the `<meta>`/`og:description` tag specifically; keep the longer version for `/me/about.md` by giving that route its own dedicated string. Suggested rewrite below. |
| MEDIUM | Zero surface presence for the #1 and #4 priority target audiences (technical PM, management/strategy) | Per `portfolio-context.md`, target roles in priority order are: (1) technical product management, (2) forward deployed engineering, (3) AI/ML engineering, (4) management/strategy. Grepped the full visible body text for `product manag\|technical PM\|roadmap\|prioritiz`: **0 matches**. Title, meta description, and hero paragraph all frame the author only as "AI Engineer · Forward Deployed Engineer · Computer Engineering @ AUS" — audience #1 (the top priority) has no explicit textual anchor anywhere on the page. | Add one explicit sentence (hero paragraph or a dedicated Skills line) that surfaces PM-adjacent framing directly, e.g. "scopes and ships against ambiguous stakeholder requirements" or "roadmaps AI features from idea to production" — something a technical-PM hiring manager's search/skim would actually match on. |
| MEDIUM | Signature "$60K" claim is repeated twice with zero corroboration | `content_verify.py` flagged both occurrences (Samsung role description, Trend Radar project "Impact" line) as uncited quantity claims, `uncited_ratio: 1.0`. Both are correctly hedged as estimates per the site's own content rules (a real strength, not a factual-accuracy problem) — but on a single-author page, a repeated, unlinked dollar figure with no third-party corroboration (LinkedIn post, manager quote, case-study link) is a weaker Authoritativeness/Trustworthiness signal than the same claim with even one external anchor. | Once the Trend Radar repo is public again (per Asset Status in `portfolio-context.md`), link "$60K" and "20%" to the relevant case-study section as the corroborating source. |
| MEDIUM | 9 of 14 links on the page have no accessible name | Parsed every `<a>` tag in the rendered HTML programmatically: 9 have empty inner text, no `aria-label`, and no `title` attribute — the header logo-link to `/`, the CV PDF link, the mailto link, the GitHub repo link, and the company-logo links for Samsung, Elmec, Chief Nest, and AUS (×2). Only one link site-wide (`Trend Radar on GitHub`) has an `aria-label`. | Add `aria-label` to each icon-only link, e.g. `aria-label="Samsung Gulf Electronics website"`, `aria-label="Download CV (PDF)"`, `aria-label="Email Ahmad Saad"`. |
| LOW | Freshness: the one auto-expanded, "current employer" role has already reached its stated end date | `config/experience.ts` marks Samsung Gulf Electronics `isCurrentEmployer: true` (the only card expanded by default, and the only one exposed as full text — see Finding 1), with `employmentPeriod` 06.2026 to 08.2026. Today's date is 2026-08-24 — the role's own stated end month has arrived. Chief Nest (09.2025 - Present) and the AUS AI Hub Assistant role (11.2024 - Present) are the positions actually still open-ended, but neither is flagged current nor auto-expanded. No "last updated" indicator exists anywhere on the page; `sitemap.xml`'s `lastmod` is a build timestamp that changes on every deploy, not a content-freshness signal (per dossier). | Revisit `isCurrentEmployer`/`isExpanded` flags against real employment end dates on a recurring basis (this also determines which single role gets full-text exposure under Finding 1's current architecture, making the flag doubly important until that fix ships). Optionally add a lightweight "Updated {month year}" indicator near the hero. |
| LOW | `llms.txt` contains 404ing template leftovers | Per dossier: `llms.txt` (200, 3.8KB) has a correct intro and links to the real `/me/*.md` endpoints, followed by an unrelated template-leftover "Craft / Components / Examples" section (`/craft/book`, `/craft/game-of-life`, etc., all 404), and `/llms-full.txt` is entirely unrelated template component source code. Not independently re-verified in this pass beyond the dossier's status codes, included for completeness since it is a trust/curation signal for any agent that actually follows the file. | Remove the template Craft section from `llms.txt` and regenerate `/llms-full.txt` from real site content, or delete it if not needed. |

## Suggested Rewrites

**Title tag** (current: `Building production AI systems | Ahmad Saad`, 43 characters —
technically fine length-wise, well under the ~60-char truncation point, but has room to
work in the audience gap):

> `Ahmad Saad — AI Engineer & Forward Deployed Engineer`
> (54 characters, keeps both currently-covered audiences, drops the generic tagline
> which is already carried by the hero `flipSentences`, and leads with the name for
> personal-brand recognition.)

Keep the current title if brand-recall-via-tagline is intentional; it is not broken, just
narrow relative to the 4-audience positioning brief.

**Meta description** (current: 313 characters, truncates mid-word at ~155-160 chars in
SERP):

> `Computer Engineering senior at AUS shipping production AI systems and scoping them with stakeholders as a forward deployed engineer. UAE Golden Visa holder, available Jan 2027.`
> (179 characters — still slightly over the 160-char guideline; tightened further:)

> `Computer Engineering senior building and scoping production AI systems as a forward deployed engineer. UAE Golden Visa holder, available January 2027.`
> (153 characters, fits Google's snippet window without mid-word truncation, keeps the
> two strongest current differentiators — production AI systems shipped, and the UAE
> Golden Visa/no-sponsorship fact the author's own brief calls a "material
> differentiator.")

Give this shortened string its own field separate from `USER.description` (used by
`/me/about.md`) rather than sharing one string, so `/me/about.md` can keep the fuller
313-character version if that additional detail is wanted there.

## Not Independently Re-Verified This Pass

- `llms.txt`/`llms-full.txt` 404 status and content (relied on dossier; not re-fetched).
- Precise readability grade (flagged above as directional only, given extraction
  artifacts from mixed prose/UI-string content).
