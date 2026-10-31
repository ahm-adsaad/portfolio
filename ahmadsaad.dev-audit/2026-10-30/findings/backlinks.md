# Backlinks / Off-site Findings: ahmadsaad.dev (2026-10-31)

## 1. Score: 22/100 (confidence: low, Tier 0 data only)

Rationale: the domain has no measurable link graph presence and only self-owned GitHub properties link to it; no third-party editorial, institutional or directory link was confirmed. A numeric health score per the plugin rubric is INSUFFICIENT DATA (fewer than 4 factors have a source), so this 22 is an off-site presence estimate from direct page checks, not a Backlink Health Score.

## 2. Common Crawl result (domain-level, confidence 0.50)
- Source: Common Crawl web graph release cc-main-2026-jan-feb-mar (quarterly; cached response dated 2026-08-24).
- in_crawl: false, in_rankings: false. PageRank, harmonic centrality and host counts: null.
- Domain is absent from the graph. Expected: the release predates the site (live since about August 2026). Re-check after the next web graph release.
- Moz, Bing and paid-tier sources not available. Referring domain count, anchor mix, spam score and velocity cannot be measured.

## 3. Expected referring pages (direct checks, Parsed confidence 0.95)

| Page | Status | Anchor / form | rel |
|---|---|---|---|
| github.com/ahm-adsaad (profile blog field) | Links | blog = "ahmadsaad.dev" (no scheme stored) | GitHub profile links render nofollow-style (not verified in HTML) |
| github.com/ahm-adsaad/ahm-adsaad README | Links (several) | Badge image links "ahmadsaad.dev" and "Portfolio", plus text link "ahmadsaad.dev" in "Full project writeups and case studies" | not visible via raw README; GitHub typically applies nofollow |
| repo portfolio (HTTP 200) | Links | homepage https://ahmadsaad.dev | n/a |
| repo trend-radar (HTTP 200) | Links, malformed | homepage " https://ahmadsaad.dev/projects/trend-radar" has a leading space | n/a |
| repo LocalAI (HTTP 200, exists) | Links to subdomain only | homepage https://localai.ahmadsaad.dev | n/a |
| repo manos-basic-computer-simulator (HTTP 200) | Links | homepage https://ahmadsaad.dev/projects/mano-computer-simulator | n/a |
| Credly badge page (HTTP 200, "Claude Certified Architect - Foundations") | Does not link (no ahmadsaad.dev string in served HTML; page may be partly JS-rendered, so cannot rule out) | none | n/a |
| localai.ahmadsaad.dev (HTTP 200) | Does not link back in raw HTML (810-byte SPA shell, zero "ahmadsaad" mentions); a JS-rendered link was not checked | none | n/a |
| linkedin.com/in/ahmaddsaad | Cannot fetch (login wall) | unverified | n/a |

Other public repos with no homepage field: claude-code-toolbar, etto-labs, placement-proof, sdp-sensor-nodes, ahm-adsaad.

## 4. Findings

**High: No third-party referring domains detected.** Evidence: absent from Common Crawl; every confirmed link is from github.com under the owner's own account. Fix (Owner action): execute the opportunities in section 5.

**High: LocalAI demo does not link to the main site in raw HTML.** Evidence: served HTML is a JS shell with no anchors to ahmadsaad.dev. Subdomain links are lower value than external ones but cheap, and they help entity association. Fix (Owner action): add a visible footer link "Built by Ahmad Saad" to https://ahmadsaad.dev/projects/localai in the LocalAI app and in its static HTML shell.

**Medium: Credly badge does not point to the site.** Fix (Owner action): in Credly profile settings, add the website to the public profile and the badge share text; also link the badge from the site (outbound) so the two cross-reference.

**Medium: Entity inconsistency across profiles.** Evidence: GitHub bio says "Forward Deployed Engineer (FDE)", README typing banner says "AI/ML Engineer @ Samsung", site context says student AI engineer. Mixed identity weakens entity signals that backlinks reinforce. Fix (Owner action): pick one current descriptor and use the same name, title and site URL on GitHub bio, README, LinkedIn and Credly.

**Low: trend-radar homepage field has a leading space.** Fix (Owner action): edit the repo About box and remove the space; add https://ahmadsaad.dev as homepage on claude-code-toolbar, etto-labs, placement-proof and sdp-sensor-nodes, or link each to its matching project page.

**Low: GitHub profile blog field has no scheme.** Fix (Owner action): set it to https://ahmadsaad.dev.

**Low: Verification limits.** LinkedIn unreachable; rel attributes of GitHub-rendered links not inspected; JS-rendered links on Credly and LocalAI not checked (Playwright not run).

## 5. Top 5 link or mention opportunities (next 60 days)

1. **AUS chapter or college page (Owner action).** Email the Tau Beta Pi chapter officer or the College of Engineering communications office with a two-line summary and the project URL, asking for a student spotlight or member directory entry linking https://ahmadsaad.dev. Institutional, high trust.
2. **Write-up on dev.to or Medium with canonical (Owner action).** Publish a build-log for LocalAI or Trend Radar, set the canonical URL to the matching page on ahmadsaad.dev, and link to the repo and demo in the first paragraph. Gives a topical link plus discovery.
3. **Certification directory and Credly profile (Owner action).** Add the site to the Credly profile and list the Claude Certified Architect credential on any official directory or community list that accepts public submissions, with the portfolio URL as the profile link.
4. **Show HN, Product Hunt or an awesome list for LocalAI (Owner action).** Submit the browser-only private document AI demo to a relevant awesome list (local-first or on-device AI) via pull request, and post a Show HN. Use the project page, not only the subdomain, as the link target.
5. **Hackathon or conference project pages (Owner action).** Register the project on Devpost or the event's gallery for a UAE or regional AI event, with the site as the team website, and ask organizers to list student projects on the event page.

Sequencing note: also pin LocalAI and Trend Radar on the GitHub profile so the existing repo-to-site links get more visibility. Re-run Common Crawl lookup after the next web graph release.
