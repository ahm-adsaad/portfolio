# SXO (Search Experience Optimization) Findings — ahmadsaad.dev

**SXO Gap Score: 29/100** (separate from, and not to be confused with, any SEO Health Score elsewhere in this audit)

Page audited: `https://ahmadsaad.dev/` (single-page personal portfolio, Ahmad Saad — AI/ML engineer, forward-deployed engineer, Computer Engineering senior at American University of Sharjah).
Fetched via `render_page.py --mode auto` (mode_used: `raw`, `is_spa: false`, status 200; cached at `scratchpad/home-render.json`, full HTML at `scratchpad/home.html`, visible body text at `scratchpad/home-body.txt`).

---

## Lead finding: the page is not visible for the queries it most needs to win

This is the primary finding and it precedes and dominates every other issue below. Before scoring page-type fit or persona experience, the more basic fact is that **ahmadsaad.dev does not surface at all** for the most literal, lowest-competition queries tested:

| Query tested | What actually ranks (observed) | ahmadsaad.dev present? |
|---|---|---|
| `Ahmad Saad` | Wikipedia: Ahmed Saad (Egyptian singer), Ahmad Sa'di (Palestinian scholar); Saudi footballer Ahmad Saad Abdullah; a New Jersey cardiologist "Saad Ahmad, MD"; an Instagram/YouTube "Ahmed Saad" | No |
| `Ahmad Saad AI engineer AUS Sharjah` | `aihub.aus.edu/team/mr-ahmad/` (AUS's own team bio page, a *different* framing — "AI Hub Web Development Assistant"); a RocketReach contact card for the same AUS role; a Google Scholar profile page; an unrelated LinkedIn "Ahmad Saad — Image Processing Engineer" | No |
| `ahmadsaad.dev` (literal domain string) | `saadahmad.dev` (a different person, reversed name, "Product Engineer & Platform Owner"); Devpost, TikTok, GitHub profiles for unrelated people named Ahmad Saad | No |
| `site:ahmadsaad.dev` | No pages from the domain returned at all; the engine substituted unrelated "Ahmad Saad"/"Ahmad Sultan" Wikipedia entries | No |
| `forward deployed engineer UAE` | Dominated by actual job postings: OpenAI's "Forward Deployed Engineer – UAE" career page, InDebted's "Senior Software Engineer (Forward Deployed) – UAE" listing, fwddeploy.com job board | No (expected — see page-type note below) |
| `AI engineer Sharjah graduate 2026 portfolio` | Generic UAE job-board aggregator pages (Indeed, Bayt, GulfTalent, Glassdoor, a salary-guide article) — no individual portfolios of any kind rank for this phrasing | No (this is not a realistic query pattern; nobody searches this way) |

Two distinct problems are visible here:

1. **Non-indexation / zero entity footprint.** Even a query that is *only* the site's own domain name fails to surface the site. Combined with `site:ahmadsaad.dev` returning nothing, this points to the site not having meaningful presence in Google's index yet (consistent with dossier facts: sitemap has exactly one URL with a `lastmod` that changes on every build rather than on content change, and no canonical tag). This is fundamentally a technical-SEO/indexation issue, not something SXO copy changes can fix alone — flagging for `/seo technical` or `/seo audit` follow-up. It is documented here because it changes how every other SXO finding should be read: **none of the on-page experience gaps below can matter until the page is found at all.**
2. **Entity fragmentation on the queries that do work.** The one query where a "Ahmad Saad" + institution result set actually surfaces AUS-related people, the *candidate's own site* still loses to a third-party university bio page and a Google Scholar profile — pages he doesn't control, with framing he didn't choose. The page's own JSON-LD (`{"@type":"Organization","@context":"https://schema.org"}` — empty, no name/url/sameAs) gives Google nothing to consolidate the LinkedIn, GitHub, and AUS mentions into one verified Person entity. See Schema Gap below.

**Severity: CRITICAL.** This is the single highest-leverage fix available: correct Person schema with `sameAs` links to LinkedIn and GitHub, a real canonical tag, and getting the site properly indexed would do more for "does this page win the queries it should" than any copy or layout change.

---

## Page-type mismatch

Using the taxonomy in `page-type-taxonomy.md`, the target page best fits **Service Page** (individual variant): it has a methodology/process narrative (measurement-decides-LLMs-describe architecture), a case study (Trend Radar), credentials (education, honors), and a contact mechanism (mailto/LinkedIn) — closer to this than to Landing Page, Blog Post, or the other six catalog types.

The SERP for this page's realistic query families splits into two type-clusters neither of which the page currently satisfies well:

- **Name/entity queries** ("Ahmad Saad AI engineer AUS Sharjah") are won by **Profile/Directory pages** — a university team-bio page, a RocketReach contact card, a Google Scholar profile. These pages win largely on domain authority and structured entity data (a university domain, a scholarly-profile schema), not on content quality. The candidate's own Service-Page-style portfolio is structurally fine for this intent but is invisible to Google as an entity because of the empty Organization schema.
- **Role/skill queries** ("forward deployed engineer UAE") are won by **Landing/Job-listing pages** (OpenAI careers, InDebted careers) — transactional pages with a single CTA ("Apply"). A personal portfolio cannot and should not try to outrank employer job postings for this query family; this confirms the page's realistic non-branded discovery surface is effectively zero, and its only viable win condition is branded/entity search plus warm referral traffic (LinkedIn, recruiter forwards, in-person handoff of the URL).

**Mismatch severity: HIGH** for the branded/entity cluster (structurally close, but schema and indexation prevent it from competing), **not applicable / expected** for the transactional job-listing cluster (a portfolio was never going to win there — no fix needed, this is a useful negative-calibration finding, not a gap).

---

## User stories (SERP-signal-derived)

1. **As a hiring manager who just heard the name "Ahmad Saad,"** I want to Google it and land on his own site in the first few results, because I need to verify identity and pull up the portfolio fast, but I'm blocked by **zero visibility**: the bare `Ahmad Saad` SERP is dominated by an unrelated singer, footballer, scholar, and cardiologist; ahmadsaad.dev does not appear.
   *(Signal: WebSearch "Ahmad Saad" — no ahmadsaad.dev result anywhere in the returned links.)* — **Journey stage: awareness.**

2. **As a hiring manager cross-referencing the CV line "AI Hub Assistant, AUS,"** I want the personal portfolio to be the authoritative account of that work, because I want the candidate's own framing, but I'm blocked by **entity fragmentation**: AUS's own team page and a RocketReach card outrank ahmadsaad.dev for `Ahmad Saad AI engineer AUS Sharjah`, and the page's JSON-LD carries no name, url, or `sameAs` to consolidate identities.
   *(Signal: WebSearch "Ahmad Saad AI engineer AUS Sharjah" → aihub.aus.edu/team/mr-ahmad/ and rocketreach.co ranking, ahmadsaad.dev absent; dossier JSON-LD capture: empty Organization object.)* — **Journey stage: consideration.**

3. **As a forward-deployed/solutions-engineering lead verifying shipped code,** I want to click through to the flagship project's repository and inspect it, because unverifiable claims carry no weight, but I'm blocked by a **broken trust link**: the on-page "Trend Radar on GitHub" anchor points to `github.com/ahm-adsaad/trend-radar`, which is currently private per the author's own asset-status notes, so the click dead-ends.
   *(Signal: `home.html` anchor `href="https://github.com/ahm-adsaad/trend-radar"`; `portfolio-context.md` Asset Status: "Trend Radar repo: private as of now.")* — **Journey stage: decision/verification.**

4. **As a technical-PM or AI/ML lead skimming for track-specific proof,** I want to read what Ahmad did at Chief Nest, ONBRND, or as AUS AI Hub Assistant (stakeholder scoping, GTM restructuring, Figma prototyping) or the technical detail behind the LocalAI retrieval pipeline, because those are the entries most relevant to my hiring track, but I'm blocked by **empty content**: those experience accordions render zero description text in the server HTML even in principle (not merely visually collapsed — the text is absent from the DOM), and LocalAI is reduced to a tech-chip list with no architecture summary.
   *(Signal: `grep` of `home.html` for "SCADA," "ClickUp," "GTM strategy" returns zero matches anywhere on the page, despite this content existing in the author's own content brief; only the Samsung entry is `data-state="open"`, the other four are `data-state="closed"` with no description markup underneath.)* — **Journey stage: consideration.**

5. **As a recruiter skimming for 20 seconds on a phone,** I want one obvious, labeled way to grab the CV or start a conversation, because I'm triaging many candidates and won't hunt for hidden interactions, but I'm blocked by **unlabeled, drag-only interaction patterns**: the CV link is an icon-only button with no visible text, `aria-label`, or `sr-only` span, and the only instruction for browsing the 4 featured projects is "Drag through the carousel to explore," with no visible prev/next arrows (only dot pagination).
   *(Signal: `home.html` — `<a target="_blank" href="/Ahmad_Saad_CV.pdf">` wraps only an SVG icon, no accessible name, unlike the adjacent LinkedIn icon which has an inline `<title>LinkedIn</title>`; body text "Drag through the carousel to explore." is the sole navigation affordance; `aria-label` values are limited to pagination dots "1 of 5" … "5 of 5", no "next/previous slide" labels found.)* — **Journey stage: awareness / fast triage (decision-adjacent).**

---

## Persona scoring

Scored per `persona-scoring.md` (Relevance / Clarity / Trust / Action, 25 pts each). Personas match the author's own priority-ordered target roles plus the recruiter-triage and post-interview-verification realities exposed by the SERP tests above.

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| Post-interview / pre-offer name verifier (Googles "Ahmad Saad") | 3/25 | 2/25 | 5/25 | 3/25 | **13/100** | Critical Mismatch |
| Technical PM hiring manager | 14/25 | 12/25 | 14/25 | 10/25 | **50/100** | Needs Work |
| AI/ML engineering lead | 21/25 | 12/25 | 10/25 | 9/25 | **52/100** | Needs Work |
| Forward-deployed/solutions-engineering lead | 22/25 | 18/25 | 9/25 | 10/25 | **59/100** | Needs Work |
| Recruiter skimming for 20 seconds | 23/25 | 16/25 | 18/25 | 10/25 | **67/100** | Good |

### Weakest persona: Post-interview / pre-offer name verifier (13/100)
**Top issue:** the page has zero presence for `Ahmad Saad`, the single most obvious query this persona runs.
**Recommended fix:** this is an indexation + entity problem, not a copy problem — add correct `Person` JSON-LD (`name`, `url`, `jobTitle`, `alumniOf`, `sameAs: [linkedin, github]`), add a `<link rel="canonical">`, fix the sitemap `lastmod` to reflect real content changes, and get the URL submitted/crawled (Google Search Council submission, backlink from LinkedIn "Featured" section, GitHub profile README link). Not fixable by this SXO pass alone; hand off to `/seo technical` and `/seo schema`.

### Second-weakest, directly on-page-fixable: Technical PM hiring manager (50/100) and AI/ML engineering lead (52/100)
**Top issue (shared):** the experience entries most relevant to these two tracks (Chief Nest GTM work, ONBRND ops work, AUS AI Hub Figma/stakeholder work for the PM persona; LocalAI's retrieval architecture for the ML persona) render with **zero body text**, even though richer content exists in the author's own brief.
**Recommended fix:** write and ship the missing descriptions for the four collapsed roles (content already exists in `portfolio-context.md` — SCADA/switchgear scope for Electro-Mechanical, GTM restructuring for Chief Nest, ClickUp workflow rebuild + 25% efficiency figure for ONBRND, Figma redesign + faculty-adoption research for the AUS AI Hub role) and add a 2-3 line architecture summary to the LocalAI project card (hybrid retrieval, on-device WebGPU inference, no-remote-inference guarantee) instead of a bare tech-chip list.

### Systemic issues (all personas)
- **Trust dimension is the lowest-scoring dimension across every persona** (avg. ~11/25 excluding the verifier persona): the private Trend Radar GitHub link, the unlabeled/estimate-adjacent metrics presentation, and the lack of any schema-level entity verification all compound into a page that reads as under-substantiated even where the prose itself is honest (note: the $60K/20% figures *are* correctly framed on-page as "estimated" / "projected," which is a genuine trust positive that should be preserved).
- **Action dimension is uniformly weak** (10/25 for 4 of 5 personas): every on-page CTA is an unlabeled icon in a floating dock (CV, mail, GitHub, LinkedIn), with no visible CTA text anywhere on the page ("Download CV," "Email me," "View the code").

---

## UX / gap evidence log

| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| CRITICAL | Page has zero visible presence for `Ahmad Saad`, `Ahmad Saad AI engineer AUS Sharjah`, and even the literal domain string `ahmadsaad.dev` | WebSearch results for all three queries return only unrelated third parties or `site:ahmadsaad.dev` returns nothing from the domain | Add correct Person+ProfilePage JSON-LD with `sameAs` (LinkedIn, GitHub), add `<link rel="canonical">`, fix sitemap `lastmod` to reflect real deploys, submit URL for indexing. Hand off to `/seo technical`, `/seo schema`. |
| CRITICAL | JSON-LD is an empty `Organization` object with no `name`/`url`, and the wrong `@type` for a personal portfolio | `home.html`: `<script type="application/ld+json">{"@type":"Organization","@context":"https://schema.org"}</script>`; confirmed via `render_page.py` `structured_data.blocks[0]`: `types: ["Organization"]`, `size_bytes: 56` | Replace with `Person` schema (`name`, `jobTitle`, `alumniOf`, `worksFor`, `sameAs: [linkedin, github]`) at minimum; consider `ProfilePage`/`WebSite` wrapper. Route to `/seo schema`. |
| HIGH | 4 of 5 experience entries (Electro-Mechanical, Chief Nest, ONBRND, AUS AI Hub Assistant) have zero description text anywhere in the server-rendered DOM, not just visually collapsed | `grep -c "SCADA"`, `"ClickUp"`, `"GTM strategy"` on `home.html` all return 0; only "Samsung Gulf Electronics" has `data-state="open"`, the other four `<div data-slot="collapsible">` blocks are `data-state="closed"` with no description paragraph underneath | Port the existing descriptions from `portfolio-context.md` into `config/experience.ts` for all four roles; this serves the Technical PM and AI/ML personas directly (see persona table). |
| HIGH | Flagship project's GitHub link points to a private repository | `home.html` anchor `href="https://github.com/ahm-adsaad/trend-radar"`; `portfolio-context.md` Asset Status: "Trend Radar repo: private as of now" | Either make the repo public (per the brief's noted pending wording fixes) before linking, or remove/relabel the link until it is public, so the forward-deployed and AI/ML personas don't hit a dead end mid-verification. |
| HIGH | CV download link is icon-only with no visible text, `aria-label`, or `sr-only` span | `home.html`: `<a target="_blank" href="/Ahmad_Saad_CV.pdf">` wraps only an SVG `<path>` with no `<title>` (contrast with the adjacent LinkedIn icon, which has `<title>LinkedIn</title>`) | Add `aria-label="Download CV (PDF)"` at minimum; ideally add a visible "CV" or "Résumé" text label so a 20-second recruiter skim and screen-reader users both find it without guessing. |
| MEDIUM | Project carousel is drag-only with no visible prev/next controls, only dot pagination | Body text: "Drag through the carousel to explore." is the only navigation instruction; `aria-label` values found are limited to `"1 of 5"` … `"5 of 5"` (pagination dots) and `"Featured projects"` / `"Trend Radar on GitHub"` — no next/previous-slide label found | Add visible prev/next arrow buttons alongside the drag interaction so desktop mouse users and anyone unfamiliar with drag-to-scroll carousels aren't stuck on slide 1. |
| MEDIUM | LocalAI (the project the author's own brief flags as the best live-demo candidate, since it runs entirely client-side) is not surfaced on-page beyond a tech-chip list; no live-demo link observed in rendered body text | `home-body.txt` lists only "Trend Radar" with a description and impact line; LocalAI is not named in the visible body text extract at all, only inferred present via `grep` of the raw HTML for the project title string | Give LocalAI its own description line and a "Try the live demo" CTA analogous to Trend Radar's GitHub link, matching the brief's own recommendation. |
| MEDIUM | Entity/name disambiguation risk is unaddressed | "Ahmad Saad" is a common name; observed SERP for the bare name returns a singer, footballer, scholar, and cardiologist, none related to this candidate | Beyond schema fixes above, consider a more distinctive on-page identity signal set (consistent full-name + institution + "ahmadsaad.dev" string repeated in title/meta/schema/social bios) so Google has more anchor text to disambiguate against. |
| LOW | Metrics are honestly framed as estimates, which is a trust positive worth preserving | `home-body.txt`: "reducing an estimated $60K in spend... contributing to a projected 20% increase in engagement rates" | No fix needed — flagging so this framing is not accidentally "strengthened" into unqualified claims during future copy edits, per the brief's own Asset Status notes. |

---

## Limitations

- No Google Search Console, PSI/CrUX, or GA4 access was available (per dossier: none configured), so no first-party impression/click/CTR data exists for the queries above; all SERP observations come from live WebSearch calls performed during this audit and reflect a single snapshot in time (2026-08-24), not historical ranking data.
- Only 6 queries were tested (3 branded/entity, 1 exact-domain, 1 site: operator, 2 non-branded role queries), not an exhaustive query set; other branded variants (e.g., "Ahmad Saad Samsung," "Ahmad Saad LinkedIn," "Ahmad Saad GitHub") were not tested in this pass.
- No PAA boxes, featured snippets, or AI Overview content were present/observed for any of the tested queries in the WebSearch results returned, so the User Story Framework's PAA/featured-snippet/AI-Overview signal sources could not be used; stories above are derived instead from ranked-result composition and absence patterns.
- Backlink/authority data is Tier 0 only (Common Crawl + manual verification, no Moz/Bing/Ahrefs), so the Authority dimension of the SXO Gap Score is directional, not a hard link-graph measurement.
- No accessibility tree or screen-reader trace was captured (`accessibility_tree: null` in the render output); accessibility-adjacent findings (icon-only CV link, aria-label gaps) are inferred from static HTML markup, not a live assistive-technology pass.
- Wireframes (IST/SOLL) were not generated in this pass since they were not requested.

---

## Cross-skill references

- Missing/incorrect Person schema and `sameAs` entity signals → `/seo schema`
- Non-indexation and sitemap/canonical hygiene → `/seo technical`
- Thin/empty experience descriptions for 4 of 5 roles → `/seo content` or `/seo page`

---

## Structured summary (for audit-data.json — Search Experience category)

```json
{
  "category": "search_experience",
  "sxo_gap_score": 29,
  "sxo_gap_score_max": 100,
  "dimension_scores": {
    "page_type": 6,
    "content_depth": 5,
    "ux_signals": 5,
    "schema": 1,
    "media": 5,
    "authority": 2,
    "freshness": 5
  },
  "primary_finding": "zero_serp_visibility_for_branded_and_domain_queries",
  "mismatch_severity": "CRITICAL",
  "page_type_target": "Service Page (individual/portfolio variant)",
  "page_type_serp_dominant": {
    "branded_entity_queries": "Profile/Directory Page (university team bio, scholar profile, contact-card aggregator)",
    "role_queries": "Landing/Job-listing Page (employer career pages)"
  },
  "serp_queries_tested": [
    "Ahmad Saad",
    "Ahmad Saad AI engineer AUS Sharjah",
    "ahmadsaad.dev",
    "site:ahmadsaad.dev",
    "forward deployed engineer UAE",
    "AI engineer Sharjah graduate 2026 portfolio"
  ],
  "personas": [
    {"name": "Post-interview / pre-offer name verifier", "relevance": 3, "clarity": 2, "trust": 5, "action": 3, "total": 13, "rating": "Critical Mismatch"},
    {"name": "Technical PM hiring manager", "relevance": 14, "clarity": 12, "trust": 14, "action": 10, "total": 50, "rating": "Needs Work"},
    {"name": "AI/ML engineering lead", "relevance": 21, "clarity": 12, "trust": 10, "action": 9, "total": 52, "rating": "Needs Work"},
    {"name": "Forward-deployed/solutions-engineering lead", "relevance": 22, "clarity": 18, "trust": 9, "action": 10, "total": 59, "rating": "Needs Work"},
    {"name": "Recruiter skimming 20 seconds", "relevance": 23, "clarity": 16, "trust": 18, "action": 10, "total": 67, "rating": "Good"}
  ],
  "findings": [
    {"severity": "CRITICAL", "title": "Zero SERP presence for own name and own domain string", "evidence": "WebSearch: Ahmad Saad / Ahmad Saad AI engineer AUS Sharjah / ahmadsaad.dev / site:ahmadsaad.dev all return unrelated third parties or nothing from the domain"},
    {"severity": "CRITICAL", "title": "Empty, wrong-type JSON-LD schema", "evidence": "home.html: {\"@type\":\"Organization\",\"@context\":\"https://schema.org\"} - no name/url/sameAs"},
    {"severity": "HIGH", "title": "4 of 5 experience entries have no description text in the DOM", "evidence": "grep for SCADA/ClickUp/GTM strategy in home.html returns 0 matches; only Samsung entry is data-state=open"},
    {"severity": "HIGH", "title": "Flagship project GitHub link points to a private repo", "evidence": "home.html href=github.com/ahm-adsaad/trend-radar; portfolio-context.md: repo private as of now"},
    {"severity": "HIGH", "title": "CV link has no visible text or aria-label", "evidence": "home.html <a href=/Ahmad_Saad_CV.pdf> wraps icon-only SVG with no <title>, unlike adjacent LinkedIn icon"},
    {"severity": "MEDIUM", "title": "Drag-only project carousel with no visible prev/next controls", "evidence": "body text: 'Drag through the carousel to explore.'; aria-labels limited to pagination dots 1 of 5..5 of 5"},
    {"severity": "MEDIUM", "title": "LocalAI live-demo candidate not surfaced on page", "evidence": "home-body.txt visible text does not name or link LocalAI beyond carousel presence"},
    {"severity": "MEDIUM", "title": "Common-name disambiguation risk unaddressed", "evidence": "bare 'Ahmad Saad' SERP returns singer, footballer, scholar, cardiologist, none related"}
  ]
}
```
