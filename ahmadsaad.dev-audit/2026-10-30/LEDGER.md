# SEO + GEO run ledger (started 2026-10-30, coordinator session)

Scope: full SEO and GEO diagnosis of https://ahmadsaad.dev, then plan, then fixes, then independent verification, then commit and deploy. Subagent-driven: one fresh agent per role, coordinator keeps context clean.

## Coordinator baseline (verified live, 2026-10-30 ~20:00 UTC)

- All 7 HTML routes 200, canonical present, 7 URLs in sitemap (lastmod 2026-10-21), http and www 301 to apex, security headers present, HTML Cache-Control s-maxage=31536000 with x-opennext-cache HIT.
- robots.txt is prefixed by a Cloudflare Managed block (Content-Signal search=yes, ai-train=no) that disallows GPTBot, ClaudeBot, anthropic-ai, Claude-Web, CCBot, Google-Extended, Google-CloudVertexBot, Bytespider, Amazonbot, Applebot-Extended, meta-externalagent, GoogleOther and more. Edge test: GPTBot and ClaudeBot UAs get HTTP 403 from Cloudflare; OAI-SearchBot, PerplexityBot, ChatGPT-User, Googlebot, bingbot get 200. This is a Cloudflare dashboard setting, not in the repo.
- Wrangler OAuth token has zone:read only, so the bot block cannot be changed via wrangler; it is an Owner action (dashboard) or needs an API token with zone settings write.
- No Google API credentials for the plugin (no GSC or CrUX data). Backlink tier: Common Crawl only.
- The September 2026 NAME-SERP-PLAN items A1 to A5 are live (name-first title, headshot on domain, /about, /projects/*, sitemap, llms.txt). The August branch seo/action-plan is stale and superseded by main; leave it.
- Deploy path: `pnpm run deploy` fails on Next 15 support window since 2026-10-21; use the manual chain with `--dangerouslyUseUnsupportedNextVersion` (see memory). Verify /nonexistent returns 404 after deploy.

## Phase 1: diagnosis agents (dispatched 2026-10-30, parallel)

| Agent | Model | Findings file | Status |
|---|---|---|---|
| seo-technical | sonnet | findings/technical.md | done, score 86. Crawl/index/canonical/sitemap/security clean. Edge 403 only hits training crawlers (GPTBot, ClaudeBot, anthropic-ai, Claude-Web, CCBot, Bytespider, Amazonbot); retrieval bots (OAI-SearchBot, Claude-SearchBot, Claude-User, Perplexity) get 200. Two project titles 72-77 chars, three descriptions under 100 chars; recommend X-Robots-Tag noindex on /llms*.txt and /me/*.md; sitemap lastmod 2026-10-21 stale vs 2026-10-30 config commits; one-year s-maxage is a latent staleness risk |
| seo-geo | opus | findings/geo.md | done (after one resume), score 56. Edge 403 for GPTBot/ClaudeBot/CCBot/Amazonbot/Bytespider; Google-Extended disallow blocks Gemini grounding only; retrieval fetchers all 200. H1 on / and /about is two spans with no whitespace so extractors read "AhmadSaad" and the hero statement collapses to one word. No visible "Ahmad Saad is ..." sentence; main-content extraction keeps only 280 of 1,168 home words because of 12 article cards. Includes a 148-word definition paragraph, proposed robots.txt and llms.txt, platform scores (Gemini 30 lowest). Reddit/YouTube/LinkedIn presence partial |

Phase 1 complete 2026-10-31 00:12 local. All 8 findings files present (183 KB), 23 screenshots, lab-vitals.json. No em or en dashes in any findings file.
| seo-content | opus | findings/content.md | done (after one resume), score 74. Homepage body never says "Ahmad Saad" as text (bio says "I'm Ahmad"); meta descriptions on / and 4 project pages omit the name, three are 87-97 chars copied from project.description; Mano/LoRaWAN titles 72-77 chars; /me/about.md has empty twitter/bluesky links and no email; /projects thin. Correction to baseline: / has no visible headshot img (JSON-LD only), home meta description is 150 chars. Partial: config grep for dashes/LightGBM not run |
| seo-schema | sonnet | findings/schema.md | done, score 71. Dangling @id refs on /about and /projects; thin Person (sameAs x2, no knowsLanguage, memberOf, dates); ImageObject dims are strings |
| seo-performance | sonnet | findings/performance.md | done, score 74. Mobile LCP on / fails (2.82 s median, hero text waits on 4 non-preloaded woff2 + display:block); hydration long task 0.8-1.06 s on mobile (TBT ~900 ms); /public media served max-age=0 must-revalidate; poster jpg fetched on top of preloaded webp. Video handling itself is good |
| seo-sxo | opus | findings/sxo.md | done (after one resume), score 54. ahmadsaad.dev absent from the US WebSearch index for all 17 queries including "ahmadsaad.dev" (tool index, not Google UAE; Bing/DDG checks inconclusive). Only LinkedIn ranks (#1 "ahmad saad american university of sharjah"). AUS News article 2026-06-22 (aus.edu/node/126616) profiles "Ahmad Atef Saad" with no link back. Five Wikipedia-level namesakes incl. the singer. GitHub README still says Samsung and uses a banned term; middle name Atef absent from schema. Ceilings: T1/T2 unrealistic for bare name; T4 realistic 1-3 months for spelled-out AUS and Samsung queries; T5 12-24+ months low odds |
| seo-visual | sonnet | findings/visual.md | done, score 68. No face or location above the fold on /; OG images text-only at 2 MB; hero text is in raw HTML (not hidden); below-fold sections opacity 0 until scrolled (JS reveal) |
| seo-backlinks | sonnet | findings/backlinks.md | done, score 22. Domain absent from Common Crawl; only self-owned GitHub links; localai subdomain and Credly do not link back; GitHub bio vs README title mismatch |

Deploy facts: .next and .open-next caches warm (built 2026-10-30 23:42 local), main == origin/main, no workerd running. Only untracked path is ahmadsaad.dev-audit/2026-10-30/ (the audit folder is tracked in git, so today's output will be committed with the fixes).

## Phase 2: plan agent

Dispatched 2026-10-31 00:15 local, general-purpose on opus. Reads LEDGER + 8 findings + NAME-SERP-PLAN + repo files. Writes FULL-AUDIT-REPORT.md, PLAN.md, audit-data.json in this folder. Health score weights: Technical 22, Content 23, On-Page 20, Schema 10, Performance 10, AI Search 10, Images 5.

- Ruling: implement on branch `seo/geo-pass-2026-10` in the main checkout, not a git worktree. Why: the warm .next and .open-next caches live here and a worktree would need a fresh install and a cold typecheck of about 25 minutes. Cost if wrong: an interrupted run leaves uncommitted work on a branch, recoverable with git.
- Ruling: one implementer agent executes the whole plan sequentially with one commit per task, then one independent verifier agent reviews the full diff and runs the preview smoke test; no per-task reviewer loop. Why: the owner asked for exactly this flow (diagnose, plan, execute, verify with separate subagents, then commit and deploy); a per-task review loop would double the agent count. Cost if wrong: a defect in an early task is caught only at the end and costs one fix round.
- Ruling: add `alternateName: "Ahmad Atef Saad"` to the Person schema. Why: the September plan said to add an alternate spelling only with owner confirmation of a guessed form; the AUS News article (aus.edu/node/126616) is an official source for this spelling. Cost if wrong: one schema string, trivially removed.
- Ruling: the Cloudflare AI bot block stays an Owner action with exact steps; the coordinator cannot change it (wrangler token has zone:read only, Cloudflare MCP is unauthenticated). Cost if wrong: none, nothing changes until the owner acts.

Phase 2 complete 2026-10-31 ~00:45 local (after one stall and resume). PLAN.md (60 KB, 12 tasks), FULL-AUDIT-REPORT.md, audit-data.json, verify/seo_check.py, verify/expected-llms.txt. Health score 72/100 = 0.22x86 + 0.23x74 + 0.20x65 + 0.10x71 + 0.10x74 + 0.10x56 + 0.05x62.

### Pre-flight conflict scan (coordinator, before Task 1)

| Shared file | Tasks | Produces vs consumes | Finding |
|---|---|---|---|
| features/home/components/hero.tsx | T1 (name spans), T3 (eyebrow row, headshot) | T1 edits lines 29-36, T3 lines 25-27; T3 runs after T1 so line numbers drift | Distinct regions. Edit by symbol, not line. OK |
| app/about/page.tsx | T1 (h1), T4 (TITLE, DESCRIPTION), T5 (JSON-LD), T6 (closing block, date), T11 (og meta) | Five sequential edits in five regions | No overlap. OK |
| config/site.ts | T2 adds CONTENT_LAST_MODIFIED (moved from sitemap.ts), T5 adds publish dates | T6 displays a date on /about and sitemap consumes CONTENT_LAST_MODIFIED | Additive exports; names given in plan. OK |
| config/user.ts | T4 (jobTitle, metaDescription), T5 (social), T7 (description) | metaDescription feeds meta tag; description feeds Person.description and llms blockquote | Distinct keys. OK |
| config/about.ts | T2 (PROFILE_DEFINITION), T5 (PRESS_MENTIONS), T7 (LLMS_KEY_FACTS) | all new exports | Additive. OK |
| lib/seo/project-schema.ts | T4 (projectTitle), T5 (websiteStub) | T4 output consumed by app/projects/[id]/page.tsx | Distinct. OK |
| app/page.tsx, app/projects/page.tsx | T2 (lede on /projects), T5 (JSON-LD), T11 (og meta) | distinct regions | OK |
| features/home/components/project-stack.tsx | T2 (article to div), T4 (anchor text) | distinct lines | OK; implementer to grep globals.css for article selectors first |
| lib/llms.ts | T7 (formatAboutMarkdown), T8 (MARKDOWN_HEADERS) | T8 header must reach all five text endpoints including llms.txt (Review Focus 4 checks) | OK |
| app/layout.tsx | T9 only | hardcoded hashed woff2 URLs; no task changes fonts | Brittle by design, documented recompute step, T12 checks 200. Accepted |
| public/_headers | T10 only | prefixes /ahmad-saad*, /about/*, /projects/*, /credentials/*, /web-app-manifest-*; no overlap with /_next/static/* | HTML routes are Worker-served, so prefixes only hit static files. OK |
| lib/createOgImage.ts | T11 only | fetch overlay on third-party Cloudinary account "bucha"; planner live-tested 200 and 150-165 KB | Accepted; Owner action 17 covers moving to own account |

Self-consistency per task: each task's verification reads the artefact its edit produces (prerendered .next/server/app files or CHK output); no task asserts nothing. Scan clean.

- Ruling: accept Task 9's hardcoded font hashes rather than fixing the empty next-font-manifest root cause. Why: the manifest gap is an OpenNext-on-Windows build quirk outside this plan; the hashes only change when a font file changes and the plan documents the recompute step. Cost if wrong: a stale preload 404s harmlessly (console warning only).

## Phase 3: implementation agent

Dispatched 2026-10-31 ~00:50 local, general-purpose on opus, branch seo/geo-pass-2026-10 from 9af87a1. Executes Tasks 1-12 in order, one commit per task, writes IMPLEMENTATION-REPORT.md here. No push, no deploy.

Phase 3 complete 2026-10-31 ~09:10 local. DONE_WITH_CONCERNS. 11 commits 958415f..9c0a843 on seo/geo-pass-2026-10 (Tasks 1-11; Task 12 is the smoke test, no commit). One deviation: schema-dts types ImageObject width/height as Text, so a `pixels()` cast in lib/seo/project-schema.ts emits numbers. Smoke test 18/18 only with `X-Forwarded-Proto: https` because the local preview passes Host ahmadsaad.dev over http and middleware 301s (known wrangler quirk, production unaffected). Worker 1120 KiB gzip. LCP element is span.rise-name on both viewports. Report: IMPLEMENTATION-REPORT.md.

## Phase 4: verification agent

Dispatched 2026-10-31 ~09:15 local, general-purpose on opus. Inputs: PLAN.md, IMPLEMENTATION-REPORT.md, review package (scratchpad/review/diff-9af87a1-to-HEAD.patch, 71 KB). Rebuilds the preview, runs its own checks, writes VERIFICATION-REPORT.md here.

Phase 4 complete 2026-10-31 ~09:45 local. Verdict APPROVED WITH MINOR NOTES: 0 Critical, 0 Important, 7 Minor. Tasks 1-11 pass spec. Build 19 prerendered routes, no ISR; Worker 1117.68 KiB gzip. Smoke test 19/19 (with X-Forwarded-Proto https on the local preview). JSON-LD: no dangling refs on any of 7 pages, integer image dims, no conflicting entity values. Copy scan clean on 7 pages and 5 text endpoints. OG images 200 image/jpeg 148-163 KB with the face and legible title. Report: VERIFICATION-REPORT.md.

Minor findings, deferred (none block deploy):
- minor (deferred): `pixels()` cast in lib/seo/project-schema.ts is a type lie that emits the correct integer; schema-dts types ImageObject dims as Text.
- minor (deferred): font preload hashes hardcoded in app/layout.tsx:66-87; no build check catches them going stale (plan documents the recompute step).
- minor (deferred): `formatLongDate` does not validate its input.
- minor (deferred): Person.sameAs uses the Credly badge URL, not a profile URL (plan-mandated until the owner shares the public profile URL; Owner action 12).
- minor (deferred): share cards depend on Cloudinary fetching the live headshot (Owner action 17 covers moving to own account).
- minor (deferred): `loading="eager"` on the hero headshot is a no-op next to fetchpriority.
- minor (deferred): /me/about.md opens with an "About Ahmad Saad" heading followed directly by "## About".

## Phase 5: commit and deploy

Started 2026-10-31 ~09:50 local. Steps: commit audit folder on the branch, `git merge --ff-only` onto main, run the OpenNext chain with `--dangerouslyUseUnsupportedNextVersion` and deploy, push main to origin, run scratchpad/live-check.sh against production.

- Ruling: track only the before and after evidence screenshots (12 files) via screenshots/.gitignore; the other 20 captures stay local. Why: 44 MB of near-duplicate PNGs does not belong in a public repo. Cost if wrong: a capture is missing from history; it can be re-taken.
- Audit commit e99b33a "Record the October SEO and GEO audit, plan and verification" (38 files). main fast-forwarded to e99b33a.
- Deploy 2026-10-31 ~10:05 local: assert-static-prerender 19 routes none with ISR; Total Upload 5479.58 KiB, gzip 1117.66 KiB; Version ID d2766459-df98-4a00-b17a-80e21671e418; custom domains ahmadsaad.dev and www.ahmadsaad.dev.
- Live check (scratchpad/live-check.sh) FAIL count 0: 15 routes 200, /nonexistent 404, http and www 301 to apex, "Ahmad Saad is" present on /, no collapsed "AhmadSaad", eyebrow "Sharjah, UAE", headshot img on /, X-Robots-Tag noindex on the 5 text endpoints and absent on /about, media Cache-Control max-age=604800 on webp and mp4, static chunk single immutable value, 3 font preloads 200, sitemap 7 x lastmod 2026-10-31, og:image 200 image/jpeg 148752 B, JSON-LD dangling none and image_dims ok on 4 page types, copy scan clean. Crawler status unchanged (owner action): GPTBot 403, ClaudeBot 403, OAI-SearchBot 200, PerplexityBot 200, Claude-SearchBot 200, Googlebot 200.
- main pushed to origin.

Phase 5 complete. Engagement closed 2026-10-31.

## Rulings

- Ruling: write today's audit into `ahmadsaad.dev-audit/2026-10-30/` instead of overwriting the August files. Why: the August report and the September plan are the owner's history. Cost if wrong: none, a folder.
- Ruling: skip the seo-drift, seo-sitemap, seo-local, seo-ecommerce, seo-cluster, seo-image-gen and seo-google agents. Why: the site was redesigned since the only drift baseline, sitemap checks are inside the technical remit, OG image checks are inside the visual remit, there is no local or e-commerce business, no blog to cluster, and no Google credentials. Cost if wrong: a gap another agent did not cover; the verification agent re-checks sitemap and OG.
