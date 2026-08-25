# Backlink Profile — ahmadsaad.dev (audited 2026-08-24)

**Score: INSUFFICIENT DATA** (Tier 0 — 0 of 7 scoring factors have real profile-level data; a numeric 0-100 score would be misleading and is deliberately withheld. See Method and Data Availability.)

## Data availability statement
- **Credential tier:** 0 (`claude-seo run backlinks_auth.py --check --json`) — Common Crawl web graph + local verification crawler only. No Moz, Bing Webmaster, or DataForSEO configured (`moz.available: false`, `bing.available: false`).
- **Common Crawl:** queried and returned **no data** for this domain (see below) — reported honestly as "not found in this crawl," not as "zero/low authority" and not as "no backlinks." Common Crawl's web graph only reflects sites its crawler has already indexed and ranked; absence means "not yet observed by CC," which is expected for a domain that only went live mid-2026.
- **Verification crawler:** used against a small set of **candidate owned-profile URLs** (GitHub profile + 4 repos, LinkedIn), not a discovered backlink list — because no third party currently links to ahmadsaad.dev in any known source. This produced real, load-bearing evidence (below) and is the most useful Tier-0 output for this domain.
- **Confidence:** Common Crawl domain metrics = 0.50 (per skill convention, domain-level, quarterly snapshot). Verification-crawler results = 0.95 (direct HTTP fetch + HTML parse of the actual page). GitHub REST API cross-checks (used to corroborate/disambiguate two crawler results) = 0.95 (first-party API, not scraped).

## Method
- `claude-seo run backlinks_auth.py --check --json` — confirmed Tier 0.
- `claude-seo run commoncrawl_graph.py --info --json` — latest available release: **`cc-main-2026-jan-feb-mar`**.
- `claude-seo run commoncrawl_graph.py ahmadsaad.dev --json --timeout 180` — domain-level lookup against that release.
- `claude-seo run verify_backlinks.py --target https://ahmadsaad.dev --links <candidates.json> --json` — run twice against 6 candidate owned-profile source URLs (GitHub profile, `portfolio`, `trend-radar`, `manos-basic-computer-simulator`, `LocalAI` repos; LinkedIn profile).
- `GET https://api.github.com/users/ahm-adsaad/repos` and `GET https://api.github.com/users/ahm-adsaad` — first-party GitHub API cross-check, used to disambiguate whether a link lives in a repo's README (content) versus its structured "Website"/"homepage" metadata field, and to confirm which repos actually exist publicly.
- `claude-seo run validate_backlink_report.py --report report_data.json --json` — pre-delivery validator. Result: **PASS** (1 info note, 0 errors, 0 warnings — the info note is the standard "don't call CC absence 'low authority'" reminder, already reflected in this report's wording).
- Source review: `apps/website/config/user.ts`, `apps/website/lib/seo/json-ld.tsx`, `portfolio-context.md`, `apps/website/config/experience.ts`.

## Common Crawl — no data (honest reporting)
```json
{
  "domain": "ahmadsaad.dev",
  "in_crawl": false,
  "in_rankings": false,
  "pagerank": null,
  "harmonic_centrality": null,
  "note": "Domain not found in Common Crawl data. It may be too new, too small, or not yet crawled."
}
```
**Snapshot checked:** `cc-main-2026-jan-feb-mar` (the latest release the tool knows about at run time; Common Crawl web graphs are produced roughly quarterly — see https://commoncrawl.org/web-graphs).

**Correct interpretation:** the site (per the shared dossier) only went live around mid-2026. `in_crawl: false` and `in_rankings: false` mean Common Crawl's most recent web-graph build has no record of this host at all — not that it was crawled and scored poorly. This is the expected, unremarkable state for a brand-new personal domain; it is **not** evidence of "zero backlinks" or "low authority," and should not be read as either. Re-check after the next quarterly release (expected `cc-main-2026-apr-may-jun`) once a few of the owned-profile links below are live, since Common Crawl needs to both crawl the domain and observe inbound links to it before it will appear.

## Verified findings: owned-profile candidate links
Real, directly-observed backlink status for the profiles/repos that plausibly should link to ahmadsaad.dev today. `homepage`/`blog` columns are the first-party GitHub API metadata fields (distinct from a link inside README body content).

| Source | Crawler result | Link found? | Where | GitHub API `homepage`/`blog` field |
|---|---|---|---|---|
| github.com/ahm-adsaad (profile) | verified, HTTP 200 | Yes — `<a href="https://ahmadsaad.dev" rel="nofollow">` wrapping a shields.io badge image | README badge content | `blog: ""` (empty — **not** set) |
| github.com/ahm-adsaad/portfolio | verified, HTTP 200 | Yes — anchor text `ahmadsaad.dev`, `rel="nofollow"` | README content | `homepage: null` (**not** set) |
| github.com/ahm-adsaad/trend-radar | `link_removed`, HTTP 200 | **No** | — | `homepage: null` (**not** set) |
| github.com/ahm-adsaad/manos-basic-computer-simulator | `link_removed`, HTTP 200 | **No** | — | `homepage: null` (**not** set) |
| github.com/ahm-adsaad/LocalAI | `lost`, HTTP 404 | N/A — repo does not resolve | — | N/A — **not in the account's public repo list at all** (confirmed via `GET /users/ahm-adsaad/repos`; only `ahm-adsaad`, `manos-basic-computer-simulator`, `portfolio`, `trend-radar` exist publicly) |
| linkedin.com/in/ahmaddsaad | `error`, HTTP 405 | Unverifiable | — | N/A |

Note on `trend-radar`: the local context brief marks it "private, do not link yet," but git history (`700a7cd … link the now-public Trend Radar repo`) and this crawl (HTTP 200, present in the public repo API list) confirm it is now public — the brief is stale on that point, not the site.

## Findings

| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| Medium | The two most substantial public repos with no confirmed private/republish caveat — `trend-radar` (the flagship project) and `manos-basic-computer-simulator` — have **zero** link back to ahmadsaad.dev anywhere (no README mention, no Website field), while `portfolio` and the profile README do link back. | `verify_backlinks.py`: both return `status: link_removed`, HTTP 200, `target_found: false`. Cross-checked via GitHub API: `homepage: null` for both. | Set each repo's "Website" field (repo → Settings → General → Website = `https://ahmadsaad.dev`) and add a one-line "Portfolio / live case study: ahmadsaad.dev" link near the top of each README, matching the pattern already used on `portfolio`. |
| Low | Existing ahmadsaad.dev links (profile README badge, `portfolio` README) live only in README *content*; the structured GitHub metadata fields that surface the link more prominently (profile "Website" field, repo "Website"/homepage field) are empty across the entire account. | GitHub API: `GET /users/ahm-adsaad` → `blog: ""`; `GET /users/ahm-adsaad/repos` → `homepage: null` for all 4 public repos. | Set the GitHub profile's own Website field (Settings → Public profile → Website = `ahmadsaad.dev`) in addition to the README badge. This is what populates the link/globe icon under the avatar and is machine-readable via the API/OpenGraph — a second, more conventional discovery surface beyond a README-embedded badge. |
| Low | `github.com/ahm-adsaad/LocalAI`, the repo referenced for the LocalAI project in the site's own content-source brief, does not currently exist as a public repo under this account (404; absent from the account's public repo API listing). | Direct fetch of `https://github.com/ahm-adsaad/LocalAI` → HTTP 404 (checked both `LocalAI` and `localai` casing). `GET https://api.github.com/users/ahm-adsaad/repos` lists only `ahm-adsaad`, `manos-basic-computer-simulator`, `portfolio`, `trend-radar`. | Confirm whether the repo is intentionally private, was renamed, or simply hasn't been pushed yet, before pursuing any earned-link outreach or curated-list submission tied to it (see Earned-link idea 1 below). This is informational for the link-building plan, not a claim that the homepage itself has a broken link — the dossier's captured outbound-link list from the homepage does not include a LocalAI GitHub URL. |
| Info | LinkedIn backlink status could not be automatically verified. | `verify_backlinks.py` → `status: error`, `http_status: 405` for `linkedin.com/in/ahmaddsaad`. LinkedIn blocks unauthenticated automated requests; this is expected platform behavior, not a finding about the link's actual presence/absence. | Manually check LinkedIn → Contact Info → Website for `ahmadsaad.dev`, since this can't be confirmed by any Tier 0/1/2 automated source. |
| Info | Reciprocal link pattern: the homepage links out to `github.com/ahm-adsaad/portfolio`, and that repo's README links back to the homepage. | Homepage outbound links (dossier) ∩ verified inbound sources = `github.com/ahm-adsaad/portfolio`. | No action needed — this is normal owned-identity cross-linking (author's own site ↔ author's own repo), not a manipulative reciprocal-link scheme. Flagged here only because the pre-delivery validator explicitly checks for and surfaces this pattern. |
| Info | Homepage JSON-LD carries no `sameAs` array to formally connect the domain to the GitHub/LinkedIn profiles that already link to it. | `apps/website/app/page.tsx`: `jsonLd = { '@type': 'Organization', '@context': 'https://schema.org' }` — no `name`, `url`, or `sameAs`. (Entity-type correctness is tracked separately in this audit's schema/structured-data findings — not re-litigated here.) | Once the entity type is corrected, add `sameAs: ["https://github.com/ahm-adsaad", "https://www.linkedin.com/in/ahmaddsaad"]`. This doesn't create a backlink by itself, but reinforces the same "same entity" signal the reciprocal README links already establish, for engines that read structured data. |

## Owned-profile link-authority plan
Proportionate to a single-page personal portfolio — no directory submissions, no link-building vendors, no paid placements. In priority order:

1. **GitHub (already partially done — close the gaps above).**
   - Profile: README badge → ahmadsaad.dev already live (verified). Add: profile "Website" field (currently empty).
   - `portfolio` repo: README link already live (verified). Add: repo "Website" field (currently empty), for consistency and because GitHub surfaces this field prominently in the sidebar and in search-result cards.
   - `trend-radar` repo (now public): no link anywhere. Add both a Website field and a README mention — this is the flagship project referenced throughout the site's positioning, it should point back.
   - `manos-basic-computer-simulator`: same gap, lower priority given it's a smaller project.
   - All GitHub-hosted links carry `rel="nofollow"` by platform policy (UGC) — expected, not a defect. The value here is entity/trust-graph consolidation and referral traffic, not PageRank flow.

2. **LinkedIn (`linkedin.com/in/ahmaddsaad`).** Cannot be automatically verified (platform blocks the crawler). Manually confirm Contact Info → Website is set to ahmadsaad.dev. High-value, low-effort — this is one of the primary surfaces for the target audience (recruiters, technical PMs) named in the site's own positioning doc.

3. **University / society pages (manual — no URLs available to this Tier-0 crawl).** Per the verified bio (Tau Beta Pi chapter President, previously VP; former Treasurer, IEEE Solid-State Circuits Society AUS chapter): if either organization publishes an editable officers/leadership roster, add ahmadsaad.dev to the name entry. Legitimate, on-topic, low-effort — but only worth chasing if the page is actually self-serve editable; not worth emailing a chapter webmaster for a single roster link.

4. **Google Scholar / ORCID — skip for now.** There's an undergraduate research assistantship (speech emotion recognition) in the bio, but no published or preprinted output anywhere in the site content or its source brief. Nothing exists yet to attach a scholarly-identity link to. Revisit only if that work is ever published.

5. **Dev.to / Medium — not applicable yet.** The site has no blog (confirmed single-page site), so there's no canonical post to link from today. Relevant only once a write-up exists (see earned-link ideas below).

6. **Schema `sameAs`** — see Findings table above; sequence this after the entity-type fix already tracked elsewhere in the audit.

## Earned-link ideas (realistic, tied to actual projects)
1. **LocalAI (on-device RAG, WebGPU/WebLLM, no backend).** The most naturally link-worthy project here — genuinely novel (fully in-browser retrieval-augmented generation, no server, no document leaving the device) and demoable. First confirm the public-repo situation (Finding above — the repo the project references doesn't currently resolve). Once a public repo and live demo both exist, a short technical write-up (Dev.to/Medium; author bio linking to ahmadsaad.dev) on the "no-backend, on-device RAG" architecture is realistically the kind of project picked up by curated "awesome-webllm" / "awesome-rag" GitHub lists and on-device-AI newsletters — those link to the author's site when profiling a project, not just the bare repo.
2. **Trend Radar (measurement-first LLM production system).** The "measurement decides, LLMs describe" architecture — deterministic signals gating LLM verdicts, cost-governed multi-lane pipeline — is a distinctive engineering story rather than a generic tutorial, so a write-up has a real shot at organic pickup (Show HN, r/MachineLearning, LLM-ops newsletters), respecting the project's existing client-confidentiality content rules. The write-up's author bio/canonical link is the actual earned-link mechanism here; the sanitized repo alone is unlikely to attract links without something driving traffic to it first.

## Falsifiability / leading indicator
- After the GitHub Website-field and README fixes ship, re-run `verify_backlinks.py` against the same candidate list — `trend-radar` and `manos-basic-computer-simulator` should flip from `link_removed` to `verified`.
- Re-run `commoncrawl_graph.py ahmadsaad.dev --json` against the next quarterly release (`cc-main-2026-apr-may-jun` or later) — expect `in_crawl` to flip to `true` once Common Crawl has both crawled the domain and observed at least one of these inbound links; do not expect a `pagerank`/ranking presence yet at this link-profile size.
- If Moz or DataForSEO credentials are added later, re-run this audit at Tier 1/3 to get real Domain Authority, referring-domain counts, and a defensible numeric Backlink Health Score — none of that exists yet at Tier 0 and none was fabricated here.
