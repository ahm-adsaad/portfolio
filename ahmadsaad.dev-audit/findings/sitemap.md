# Sitemap Architecture Audit — ahmadsaad.dev

**Score: 82 / 100**

Site type: single-page personal portfolio (one canonical HTML URL: `/`). Scored proportionately — most checks in the standard sitemap rubric (URL-count limits, index files, priority/changefreq, coverage gaps) are trivially satisfied or not applicable at this scale. The score is held back by one real defect: an inaccurate `lastmod` value.

## Method
- `claude-seo run sitemap_discovery.py https://ahmadsaad.dev --json` (via `CLAUDE_SEO_PYTHON`) — 1 declared sitemap found via `robots.txt`, valid `urlset`, HTTP 200. No `sitemap_index.xml`, `sitemap-index.xml`, or `wp-sitemap.xml` present (expected/clean).
- `curl -s https://ahmadsaad.dev/sitemap.xml` — raw XML fetched and inspected directly.
- Source review: `apps/website/app/sitemap.ts`, `apps/website/app/robots.ts`, `apps/website/lib/server-url.ts`, `apps/website/config/user.ts`.
- `git log` on `app/page.tsx` and `config/experience.ts` to establish what "last significant change" should actually resolve to.
- Repo file listing to confirm which non-sitemap URLs exist (`public/`, `app/(llms)/`) and what they are.

## Live sitemap (fetched)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>https://ahmadsaad.dev/</loc>
<lastmod>2026-08-24T15:45:56.531Z</lastmod>
</url>
</urlset>
```

## Validation checklist

| Check | Result | Notes |
|---|---|---|
| XML well-formed / valid `urlset` | PASS | Confirmed by `sitemap_discovery.py` (`"valid": true`, `"kind": "urlset"`) and manual fetch. |
| Declared in `robots.txt` | PASS | `Sitemap: https://ahmadsaad.dev/sitemap.xml` present in the Next.js robots block. |
| URL count ≤ 50,000 / file size ≤ 50MB | PASS | 1 URL. Nowhere near the limit; no index file needed. |
| `<loc>` URLs return 200, canonical form | PASS | `https://ahmadsaad.dev/` returns 200 and is the correct canonical host (apex, https). |
| Deprecated `priority` / `changefreq` tags | PASS (N/A) | Not emitted — `sitemap.ts` only sets `url` and `lastModified`. Nothing to strip. |
| `lastmod` valid W3C datetime | PASS (format) / **FAIL (accuracy)** | `2026-08-24T15:45:56.531Z` is syntactically valid but is the **build timestamp**, not a content-change date. See Finding 1. |
| Coverage: crawled HTML pages vs. sitemap | PASS | One-page site; the sole HTML page is listed. No missing HTML pages. |
| Extra/orphaned URLs in sitemap (404/redirected) | PASS | None — the single listed URL is live and correct. |
| Non-HTML/agent-only endpoints kept out of sitemap | PASS | `/llms.txt`, `/llms-full.txt`, `/me/about.md`, `/me/experience.md` are correctly **not** in the sitemap. See Finding 2 (confirms this is the right call, not a gap). |
| Location-page doorway-content quality gates | N/A | Zero location pages exist; gate does not apply. |

## Findings

### Finding 1 — `lastmod` is a build timestamp, not a content-change date (Medium)
**Evidence:** `apps/website/app/sitemap.ts`:
```ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ['/'];
  return Promise.all(
    routes.map(async (route) => ({
      url: await addPathToBaseURL(route),
      lastModified: dayjs().toISOString(),   // <- current time at build, every build
    }))
  );
}
```
Two consecutive fetches of `/sitemap.xml` after any deploy — including deploys that touch nothing on the homepage (dependency bumps, CI config, unrelated docs) — will show a different `lastmod`. The repo's commit history shows several same-day deploys, so this field is effectively "time of last build," not "time the page last meaningfully changed."

**Why it matters:** Google's own guidance is explicit that `lastmod` should only be included if it is accurate, because an unreliable value can cause Google to disregard `lastmod` for the sitemap (Search Central sitemap guidance). Since this sitemap has exactly one URL, "unreliable at the sitemap level" and "unreliable for this specific page" are the same thing — there's no averaging-out effect across many URLs to dilute the noise. Practically, the downside is bounded (Google will still crawl a 1-page personal site on its own cadence regardless of this signal), but it's a correctness/hygiene defect worth fixing since the fix is essentially free.

**Fix:** Replace the build-time timestamp with a value that only changes when the page's actual content changes. For a one-page personal site maintained by a single developer, the simplest, lowest-risk option is a manually-bumped constant — update it by hand in the same commit where you change the visible homepage content (experience, projects, copy). This avoids depending on git history being present/deep enough in the Cloudflare/OpenNext build environment.

```ts
// apps/website/app/sitemap.ts
import { addPathToBaseURL } from '@/lib/server-url';
import type { MetadataRoute } from 'next';

/**
 * Bump this by hand whenever the homepage content actually changes
 * (experience, projects, education, copy) — NOT on every deploy.
 * Previously this used dayjs().toISOString(), which set lastmod to the
 * build timestamp on every deploy regardless of whether content changed;
 * Google may disregard an inaccurate lastmod, so a stable, intentional
 * date is preferable to a churning one for a single-URL sitemap.
 */
const CONTENT_LAST_MODIFIED = '2026-08-24';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ['/'];

  return Promise.all(
    routes.map(async (route) => ({
      url: await addPathToBaseURL(route),
      lastModified: CONTENT_LAST_MODIFIED,
    }))
  );
}
```

Optional automated alternative (only worth the added build-environment risk if you don't want to remember to bump it manually — Cloudflare/OpenNext builds must check out full git history, not a shallow clone, or this silently falls back):
```ts
import { execSync } from 'node:child_process';

function lastContentCommitDate(paths: string[]): string {
  try {
    return execSync(`git log -1 --format=%aI -- ${paths.join(' ')}`, {
      cwd: process.cwd(),
    })
      .toString()
      .trim();
  } catch {
    return '2026-08-24'; // fallback if git history isn't available at build time
  }
}

const CONTENT_LAST_MODIFIED = lastContentCommitDate([
  'app/page.tsx',
  'config/user.ts',
  'config/experience.ts',
]);
```
Note this still fires on trivial commits (formatting, typo fixes) to those paths, so it's an improvement over a build timestamp but not a perfect "significant change" detector. The manual-constant approach is recommended as primary; a plain `YYYY-MM-DD` string is a valid W3C datetime, so there's no need to keep the millisecond-precision ISO timestamp either.

### Finding 2 — Non-HTML / agent-facing endpoints correctly excluded from the sitemap (Info, no action needed)
**Evidence:** Live URLs exist outside the sitemap: `/Ahmad_Saad_CV.pdf`, `/llms.txt`, `/llms-full.txt`, `/me/about.md`, `/me/experience.md`. Source confirms `llms.txt`, `llms-full.txt`, and the `/me/*.md` files are route handlers under `app/(llms)/` — i.e., deliberately-built plain-text/markdown endpoints for the `llms.txt` convention (LLM-agent consumption), not HTML landing pages.

**Assessment:** These should **not** be added to `sitemap.xml`:
- `/llms.txt`, `/llms-full.txt`, `/me/about.md`, `/me/experience.md` — XML sitemaps (sitemaps.org protocol) exist to help search engines discover and prioritize crawling of indexable *web pages*. The `llms.txt` convention is a separate, unrelated discovery mechanism (agents fetch it directly by well-known path) that doesn't use or need XML sitemap listing. Adding plain-text/markdown files to the sitemap would invite Google to index them as thin, low-value duplicate-content text pages (per the shared dossier, `experience.md` is currently just titles + durations — exactly the kind of thin content this skill's quality gates flag). Leave them out.
- `/Ahmad_Saad_CV.pdf` — Google can and does index PDFs, but this file is already linked directly from the homepage (`<a href="/Ahmad_Saad_CV.pdf">`), so it's fully discoverable through normal crawling without sitemap inclusion. Sitemap listing exists to aid discovery/priority signaling for pages that might otherwise be missed or need freshness hints; neither applies here. Optional either way, not a defect — no action required.

**No fix needed.** This finding documents that the current sitemap scope (homepage only) is correct, not a coverage gap.

### Finding 3 — Single-URL sitemap has low marginal SEO value, but zero cost to keep (Info)
For a one-page personal site, an XML sitemap doesn't do the job it does on larger sites (crawl-budget triage, discovery of pages buried deep in a link graph, freshness prioritization across many URLs). Google will find and (re)crawl a single homepage through normal means — direct history, external backlinks (GitHub profile, LinkedIn), and periodic re-crawl of a known domain — independent of whether a sitemap exists. That said, serving a valid sitemap costs nothing, is standard practice, and gives a clean anchor for Search Console's coverage report, so keep it. Don't expect it to move rankings; the lastmod-accuracy fix (Finding 1) is about correctness, not about unlocking crawl gains that don't exist at this scale.

### Finding 4 — Search Console: worth doing; IndexNow: skip for now (Info)
- **Google Search Console:** Recommended. One-time setup, free, and gives index-coverage status, crawl stats, and a manual "request indexing" trigger for after genuine content updates (useful given this site anchors a job search / personal brand per the site's own positioning doc). Submit the sitemap once verified. Note: per the shared dossier, `https://www.ahmadsaad.dev/` and `http://ahmadsaad.dev/` both currently return 200 without redirecting to the canonical `https://ahmadsaad.dev/` — that's a host-canonicalization issue outside this sitemap audit's scope, but worth fixing (elsewhere in the broader audit) before/alongside GSC verification so there's one unambiguous canonical property.
- **IndexNow:** Not worth implementing right now. IndexNow is consumed by Bing/Yandex (not Google), and its value is pushing instant reindex pings on genuine changes. Wiring it up on top of the current `dayjs()`-driven build timestamp would just amplify Finding 1 — pinging "this page changed" on every deploy even when the visible content didn't. Fix `lastmod` accuracy first; if IndexNow is added later, trigger it from the same manual-bump (or git-diff) signal used for `lastmod`, not from every build.

## Missing / extra pages summary
- **Missing (in crawl but not in sitemap):** None. Single-page site; the one HTML page is listed.
- **Extra (in sitemap but 404/redirected):** None. The sole `<url>` is live and correct.

## Corrected `app/sitemap.ts`
See Finding 1 for the full recommended file (manual-constant version, primary recommendation) and the optional git-log-based automated variant.
