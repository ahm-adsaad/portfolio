# Off-site entity signals, 2026-10-31

## Score: 38/100 for off-site entity strength

Rationale:
- Real, authoritative, third-party corroboration exists: an aus.edu news article names him in full ("Ahmad Atef Saad"), and an aihub.aus.edu team page plus About card name him. Both are on a high-authority .edu domain. (+)
- Neither AUS page links to ahmadsaad.dev, LinkedIn or GitHub. The article's only contextual outbound link is to http://aihub.aus.edu/. Zero entity-linking value flows to the domain. (-)
- The article spells him "Ahmad Atef Saad"; every other surface says "Ahmad Saad". Nothing on the open web ties the two spellings together. (-)
- GitHub README is stale and contradicts the site (says "AI/ML Engineer @ Samsung", site says "AI Engineer and Forward Deployed Engineer", Samsung was an internship per AUS). (-)
- LinkedIn could not be read (HTTP 999), so headline and website field are unverified from this machine. (unknown)
- The site's own JSON-LD sameAs lists GitHub, LinkedIn, Credly, so the outbound half of the identity loop exists; only the inbound half is missing.

## 1. aihub.aus.edu finding

He IS listed. Rendered with Playwright (Chromium, networkidle, scrolled 15x). Script: scratchpad\offsite\r.py, output scratchpad\offsite\aihub.txt.

Rendered innerText of https://aihub.aus.edu/about/ under "Meet the team" / "The people behind the AI Hub at CITL.":
- Dr. Norita Ahmad, Director, Center for Innovation in Teaching and Learning
- Dr. Mohamed Elhayany, Teaching and Learning AI Specialist
- Mr. Josiah Jodrey, Teaching and Learning Coordinator
- Prerana Ramkumar, AI Hub Assistant
- **Ahmad Saad, AI Hub Assistant**

So the cards are injected client-side (the served HTML only has the heading). Title there: "AI Hub Assistant". Name there: "Ahmad Saad" (no "Atef").

Links: none of the team cards render as anchors. Of all anchors on /about/, none point to ahmadsaad.dev, LinkedIn or GitHub, and none point to a /team/ page. The only mailto is citl_aihub@aus.edu.

Individual team page exists and is indexable: https://aihub.aus.edu/team/mr-ahmad/ (HTTP 200)
- Title: "Mr. Ahmad Saad | AI Hub | American University of Sharjah"
- Canonical: https://aihub.aus.edu/team/mr-ahmad/
- Body: "Mr. Ahmad Saad / AI Hub Assistant, Center for Innovation in Teaching and Learning", then Related News list. No bio text, no links to ahmadsaad.dev, LinkedIn or GitHub, no photo link found.
- Listed in https://aihub.aus.edu/wp-sitemap-posts-team-1.xml (the other entries: mr-josiah-jodrey, ms-cleof-krista-capili-afhea, dr-norita-ahmad-sfhea, ms-prerana-ramkumar).
- Note the About page cards do not link to these /team/ pages, so the team page is reachable only via sitemap/search.

og tags: the /about/ page exposes no og:image meta in the served HTML (only a title "About AI HUB | AI Hub | American University of Sharjah"). The sitemap is WordPress core (https://aihub.aus.edu/sitemap.xml 301s to wp-sitemap.xml).

Best outreach target: the team page (a WordPress "team" custom post type), where a website field or one line of bio text with a link is easy for CITL to add.

## 2. AUS pages that mention him

WebSearch with site:aus.edu returned no aus.edu hits for the two name queries (the engine ignored the operator); the Tau Beta Pi query surfaced node/105696 and node/126616. Verified directly by fetching.

| Page | Title | How he is named | Links to his site / LinkedIn / GitHub | og:image |
|---|---|---|---|---|
| https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship | AUS engineering student receives competitive Tau Beta Pi Scholarship | "Ahmad Atef Saad", then "Saad"; "inductee and President of Tau Beta Pi UAE Alpha at AUS"; "AI Hub Assistant" | None | https://www.aus.edu/sites/default/files/news/tbp_1_1.jpg (900x600; his headshot not confirmed) |
| https://aihub.aus.edu/about/ | About AI HUB | "Ahmad Saad", AI Hub Assistant (JS-rendered) | None | none in HTML |
| https://aihub.aus.edu/team/mr-ahmad/ | Mr. Ahmad Saad (AI Hub) | "Mr. Ahmad Saad", AI Hub Assistant, CITL | None | not checked |
| https://www.aus.edu/node/105696 | AUS launches first international chapter of Tau Beta Pi Engineering Honor Society (14 Mar 2024) | Not mentioned | n/a | n/a |

Tau Beta Pi chapter: no dedicated UAE Alpha page found. tbp.org/history.cfm confirms "United Arab Emirates Alpha ... installed as the 262nd Tau Beta Pi Chapter on March 3, 2024". The AUS announcement (node/105696) lists no officers and links nothing on tbp.org. The College of Engineering student-organizations anchor (https://www.aus.edu/cen/community/student#student-clubs-and-organizations) is the page the news article points readers to; I did not confirm it lists Tau Beta Pi UAE Alpha or officers. tbp.org officer directories are generally member-only; not verified.

## 3. The AUS News article

- URL: https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship (HTTP 200)
- Canonical: self (same URL). Shortlink: https://www.aus.edu/node/126616.
- node/126616 check: `curl -I https://www.aus.edu/node/126616` returns HTTP 200 directly with no redirect (Drupal serves the same content at both; canonical on the alias handles dedupe). Node id confirmed via the shortlink tag.
- Published: 2026-06-22 (visible "NEWS / June 22, 2026"); dateModified 2026-06-22; og:updated_time 2026-06-22T09:03:46+04:00.
- Byline: none. JSON-LD author is the Organization "American University of Sharjah". No named writer, no communications-office contact in the body.
- Structured data: one NewsArticle JSON-LD (headline, description, image tbp_1_1.jpg 900x600, author and publisher Organization with logo aus_logo_sq.jpg, datePublished, dateModified). No Person entity, no `about`/`mentions`, no sameAs for him.
- Meta description: "When Ahmad Atef Saad talks about engineering, he often returns to one question: can an idea work reliably after it leaves the lab?"
- Key body facts: US $1,000 partial scholarship, expected graduation December 2026, six Dean's List and three Chancellor's List distinctions, Samsung Gulf Electronics internship (AI/ML engineer), LoRaWAN energy-harvesting sensor node PCB, President of Tau Beta Pi UAE Alpha, AI Hub Assistant who "led the redesign of the university's AI website".
- Exact contextual outbound links in the article body: (1) "AI website" text to http://aihub.aus.edu/ ; (2) "www.aus.edu/cen/community/student#student-clubs-and-organizations". Nothing to him personally.

## 4. Other profiles (read-only)

GitHub (gh api users/ahm-adsaad): name "Ahmad Saad", bio "Forward Deployed Engineer (FDE)", blog "ahmadsaad.dev" (no scheme), location "United Arab Emirates", company null, public_repos 9. Profile README (ahm-adsaad/ahm-adsaad main): banner "AI/ML Engineer building intelligent, real-world systems", typing lines "AI/ML Engineer @ Samsung", about text "AI/ML Engineer at Samsung Gulf Electronics ... Computer Engineering senior at the American University of Sharjah", links to ahmadsaad.dev and linkedin.com/in/ahmaddsaad. Does not state "Atef".

Repos (name | description | homepage | topics):
- ahm-adsaad | none | none | none (profile repo)
- claude-code-toolbar | has description | none | 10 topics
- etto-labs | none | none | none
- LocalAI | has description | https://localai.ahmadsaad.dev | 10 topics
- manos-basic-computer-simulator | has description | https://ahmadsaad.dev/projects/mano-computer-simulator | none
- placement-proof | has description | none | none
- portfolio | has description | https://ahmadsaad.dev | none
- sdp-sensor-nodes | none | none | none
- trend-radar | has description | " https://ahmadsaad.dev/projects/trend-radar" (leading space, fix) | none

LinkedIn https://ae.linkedin.com/in/ahmaddsaad: curl returns HTTP 999 (LinkedIn bot block). WebSearch snippet only: lists the AUS Tau Beta Pi scholarship and Chancellor's List, and a mention of the AUS news article. Headline and website field NOT verified; owner must check manually.

Credly badge: HTTP 200. og:title "Claude Certified Architect - Foundations was issued by Anthropic to Ahmad Saad." Shows name "Ahmad Saad". Public profile link not confirmed from static HTML (page is JS-rendered). No ahmadsaad.dev link, no "Atef".

LocalAI https://localai.ahmadsaad.dev: HTTP 200, title "LocalAI · on-device documents". grep of served HTML for "ahmadsaad.dev" returns zero matches; no canonical, no meta description, no author name, no "Atef". It does not link back to the main site (SPA may add it at runtime; not rendered-tested). It is the same registrable domain so the subdomain is a free internal-link opportunity.

Site (reference): title "Ahmad Saad · AI Engineer in the UAE"; JSON-LD Person name "Ahmad Saad", jobTitle "AI Engineer and Forward Deployed Engineer", sameAs = GitHub, LinkedIn, Credly. "Atef" is not used.

## 5. Consistency matrix

| Attribute | ahmadsaad.dev | LinkedIn | GitHub | AUS News | Credly | aihub.aus.edu |
|---|---|---|---|---|---|---|
| Name | Ahmad Saad | Ahmad Saad (search snippet) | Ahmad Saad | Ahmad Atef Saad / Saad | Ahmad Saad | Ahmad Saad / Mr. Ahmad Saad |
| Headline/role | AI Engineer and Forward Deployed Engineer | unverified | "Forward Deployed Engineer (FDE)" bio; README says AI/ML Engineer @ Samsung | CE senior; ex-Samsung AI/ML intern; AI Hub Assistant; TBP UAE Alpha President | Claude Certified Architect - Foundations | AI Hub Assistant, CITL |
| Location | UAE | unverified (ae. subdomain) | United Arab Emirates | AUS, Sharjah | n/a | AUS, Sharjah |
| University | AUS, Computer Engineering senior | AUS (snippet) | README: AUS | AUS, expected Dec 2026 | n/a | AUS (CITL) |
| Photo | headshot | unverified | unverified | tbp_1_1.jpg, unverified | Anthropic badge art | none seen |
| Link to ahmadsaad.dev | n/a | unverified | yes (blog field, README, 3 repos) | NO | NO | NO |
| Links back via sameAs target | yes (outbound) | unverified | yes | no | no | no |

Mismatches to fix: "Atef" only appears at AUS; GitHub README still says Samsung AI/ML Engineer; "ahmadsaad.dev" blog field has no scheme; trend-radar homepage has a leading space.

## 6. Executable GitHub changes (gh CLI, not run)

Repo descriptions, homepages and topics (all supported by the repo scope):

```
gh repo edit ahm-adsaad/trend-radar --homepage "https://ahmadsaad.dev/projects/trend-radar"
gh repo edit ahm-adsaad/placement-proof --homepage "https://ahmadsaad.dev" --add-topic python --add-topic llm --add-topic pr --add-topic verification
gh repo edit ahm-adsaad/trend-radar --add-topic python --add-topic lightgbm --add-topic trend-detection --add-topic forward-deployed-engineering
gh repo edit ahm-adsaad/portfolio --add-topic nextjs --add-topic react --add-topic tailwindcss --add-topic cloudflare-workers --add-topic portfolio --add-topic turborepo
gh repo edit ahm-adsaad/manos-basic-computer-simulator --add-topic python --add-topic computer-architecture --add-topic simulator --add-topic education
gh repo edit ahm-adsaad/sdp-sensor-nodes --description "Energy-harvesting LoRaWAN sensor nodes with custom PCB design: AUS Undergraduate Research Grant project by Ahmad Saad" --homepage "https://ahmadsaad.dev" --add-topic lorawan --add-topic iot --add-topic energy-harvesting --add-topic pcb-design
gh repo edit ahm-adsaad/etto-labs --description "Etto Labs by Ahmad Saad" --homepage "https://ahmadsaad.dev"
gh repo edit ahm-adsaad/claude-code-toolbar --homepage "https://ahmadsaad.dev"
gh repo edit ahm-adsaad/LocalAI --homepage "https://localai.ahmadsaad.dev"
```
Adjust the etto-labs and sdp-sensor-nodes descriptions to the owner's actual wording first (I did not read those repos). The profile "blog" field cannot be fixed by API (needs user scope): set it to https://ahmadsaad.dev in the web UI.

Profile README (needs the current blob sha; the README is stale on role):
```
gh api repos/ahm-adsaad/ahm-adsaad/contents/README.md --jq .sha
curl -s https://raw.githubusercontent.com/ahm-adsaad/ahm-adsaad/main/README.md > README.md
# edit README.md: replace "AI/ML Engineer @ Samsung" typing line and banner desc with
# "AI Engineer and Forward Deployed Engineer"; change the About paragraph to
# "I am Ahmad Saad (Ahmad Atef Saad), an AI Engineer and Forward Deployed Engineer, and a Computer Engineering senior at the American University of Sharjah. Recent: AI/ML engineering internship at Samsung Gulf Electronics; Tau Beta Pi Scholarship recipient." and add a line linking the AUS News article.
gh api -X PUT repos/ahm-adsaad/ahm-adsaad/contents/README.md -f message="Update profile README role and full name" -f content="$(base64 -w0 README.md)" -f sha="<SHA_FROM_FIRST_COMMAND>"
```

Not possible via this token: profile bio, name, company, blog, pinned repos.

## 7. Outreach drafts (no dashes)

(a) To AUS Office of Communications (about 120 words)

Subject: Small addition to the June 22 Tau Beta Pi Scholarship story

Dear AUS Office of Communications team,

Thank you again for the news story "AUS engineering student receives competitive Tau Beta Pi Scholarship" (https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship), published on June 22, 2026. I am Ahmad Atef Saad, the student featured. Would it be possible to add one line under my name in the article, reading "Portfolio: https://ahmadsaad.dev"? It would help readers and employers find my projects and research, including the LoRaWAN sensor node and AI work the article describes. I am happy to send the exact wording or a short bio if that is easier. Thank you for your time and for supporting students like me.

Kind regards,
Ahmad Atef Saad
Computer Engineering, Class of 2026

(b) To CITL AI Hub team (about 60 words)

Subject: Link request for the AI Hub About page

Hello CITL AI Hub team,

I am Ahmad Saad, AI Hub Assistant. Could you link my name on https://aihub.aus.edu/about/ (and on my team page, https://aihub.aus.edu/team/mr-ahmad/) to https://ahmadsaad.dev/aus? If that page is not ready, the homepage https://ahmadsaad.dev works. It would help people find the AI Hub redesign work I led. Thank you.

Ahmad

(c) To Tau Beta Pi UAE Alpha page maintainer (about 60 words)

Subject: Officer listing for UAE Alpha

Hello,

I am Ahmad Atef Saad, current President of Tau Beta Pi UAE Alpha at AUS. If the chapter has a page on the AUS or tbp.org site, could you list me as President and link my name to https://ahmadsaad.dev? I can also supply a short bio and photo. If a student organizations page already lists the chapter, please let me know who edits it. Thank you.

Ahmad Atef Saad

## 8. Gaps

- LinkedIn headline, website field and photo unverified (HTTP 999). Owner should confirm headline matches "AI Engineer and Forward Deployed Engineer" and the Website field is https://ahmadsaad.dev.
- No page on the open web uses both "Ahmad Saad" and "Ahmad Atef Saad". Consider adding "Ahmad Atef Saad" as `alternateName` in the site Person JSON-LD and a visible "also written Ahmad Atef Saad (AUS)" line on /aus.
- The site's outbound sameAs omits the AUS article and the aihub team page; adding both (as sameAs or as `subjectOf`/`mentions`) closes the loop.
- LocalAI subdomain HTML has no link, canonical or description; a footer link to https://ahmadsaad.dev would be a free internal link.
- No UAE Alpha chapter page found; tbp.org officer lists not verified.
- WebSearch ignored site: operators, so a complete list of aus.edu pages mentioning him is not guaranteed. Other AUS pages (College of Engineering, Dean's List, Undergraduate Research Grant, Student Residential Life) may mention him; try Google Search Console-free methods such as a manual site:aus.edu query.
- og:image of the news article (tbp_1_1.jpg) and the team page image were not downloaded or compared with his headshot.
