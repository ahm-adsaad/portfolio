# ahmadsaad.dev audit, 31 October 2026 (before round 2)

Goal: rank for the full name "Ahmad Atef Saad", the form the American University of Sharjah publishes, and for "ahmad aus" and its qualified variants. This is the before picture. The fixes are in PLAN.md and the numbers in audit-data.json.

## Scores

| Dimension | Weight | Score |
|---|---|---|
| Technical | 22 | 90 |
| Content (query coverage) | 23 | 54 |
| On-Page (name and AUS entity) | 20 | 46 |
| Schema | 10 | 78 |
| Performance (mobile, estimated) | 10 | 76 |
| AI Search (GEO) | 10 | 69 |
| Images (carried from 30 October) | 5 | 62 |
| **Composite** | | **67** |

Outside the composite: search visibility 24, off-site entity strength 38.

Yesterday's composite was 72, and nothing has regressed. The site is technically sound, but it barely says the name or the university the owner wants to be found for, and Content and On-Page are now scored against that goal.

## The five findings that matter

1. **The full name is in no indexable text.** "Ahmad Atef Saad" appears in 0 titles, 0 meta descriptions, 0 visible paragraphs and 0 alt texts across all 7 pages. It exists only as a hand-typed alternateName in the homepage JSON-LD and in the noindex text endpoints. Nothing ranks for the full name, not even the AUS article that uses it.
2. **No page is built around AUS.** The AUS facts are scattered across /about paragraphs: 3.96 GPA, President of Tau Beta Pi UAE Alpha, the US$1,000 scholarship, the AI Hub redesign, research and the AUS News coverage. AUS is missing from the homepage title and from all four case studies. Coverage of the AUS query cluster is 4.25 of 9.
3. **The gap is relevance and authority, not crawling.** Crawlers and AI retrieval bots get 200 responses with the full body. Still, the site ranks for none of 15 name queries, and LinkedIn wins 6 of them. Nothing on aus.edu or aihub.aus.edu links to the site, although the owner edits the AI Hub site himself. There is no Search Console property and no IndexNow.
4. **The identity graph is thin outside the homepage.**
   - The full Person node exists only on /.
   - Elsewhere the Person node is a stub without alternateName or sameAs.
   - alumniOf claims a degree that is not awarded until December 2026.
   - memberOf names a vague "chapter".
   - The university node has no Wikidata link.
   - The NewsArticle does not say it is about him.
5. **The agent-readable identity is incomplete.**
   - The opening sentence of llms.txt lacks the full name and AUS.
   - /about has no third-person definition and no questions block.
   - The key facts omit Tau Beta Pi UAE Alpha and the scholarship amount.
   - CITL is misnamed "Center of" instead of "Center for".
   - AUS News says he plans a master's and PhD, while the site says he is available in January 2027. Only the owner can settle that.

Also open: Cloudflare's edge-injected JavaScript Detections adds about 0.9 s of mobile blocking time. Only a dashboard switch can remove it.

## What Google has indexed

Running `site:ahmadsaad.dev` in the owner's own browser returned "About 8 results": /, /about, /projects, the four case studies and localai.ahmadsaad.dev. The titles and snippets are older than today's deploy. Google's "Try Google Search Console" prompt confirms that no property exists. Bing, seen through DuckDuckGo, appears to hold only the homepage. Positions in Google were not measured, because automated queries hit a captcha.

## The honest ceiling for "ahmad aus"

The bare two-word query is dominated by Australia, Ahmadiyya and thousands of people named Ahmad, and no single-person site wins it on content alone.

The site can still do two things:
- give the query one exact target, ahmadsaad.dev/aus, with a title that starts "Ahmad Saad at AUS";
- put the full name in every title, definition and schema node where it is true.

After Search Console and reindexing, these variants are winnable within weeks:
- "ahmad atef saad"
- "ahmad saad aus"
- "ahmad atef saad aus"
- "ahmad saad american university of sharjah"
- "ahmad saad tau beta pi"
- "ahmad saad ai hub aus"

Moving the bare query further needs a followed link to /aus from aus.edu: his own AI Hub team page, the AUS News article or the Tau Beta Pi chapter. Without such a link, expect the qualified variants on page one and the bare query to stay out of reach.
