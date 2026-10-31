# Schema findings, ahmadsaad.dev, 2026-10-31

Score: 78/100 (yesterday 71). Raw extracted JSON-LD per page: findings/schema-raw/*.json (home, about, projects, projects_*).

## 1. Graph validation (live fetch of all 7 pages, one JSON-LD script per page, all parse)

| Page | Top-level types | Result |
|---|---|---|
| / | CollegeOrUniversity, Organization x3, Person, WebSite, ProfilePage, SoftwareSourceCode x4, CreativeWork | pass |
| /about | AboutPage, BreadcrumbList, Person, WebSite | pass |
| /projects | CollectionPage, BreadcrumbList, 4 projects, Person, WebSite | pass |
| /projects/* (4) | project node, Person, BreadcrumbList | pass |

- Dangling refs: none. The #headshot id is flagged by a naive top-level check but is defined inline (Person.image on /, primaryImageOfPage on /about). Fine.
- Consistent @id: #person, #website, #org-aus are identical in meaning everywhere. No conflicting values for the same @id.
- Gap, not conflict: only / carries the full Person. Every other page carries a 3-property stub (@type, @id, name, url). /projects/* has no WebSite node at all. Parsers that read one page in isolation see a thin entity. Fix: on /about and /projects emit the full Person (same builder as home), and on /projects/* keep the stub but add sameAs (GitHub, LinkedIn) so an isolated read still resolves.
- /projects/* have no WebPage/ItemPage node; the project node carries mainEntityOfPage as a bare URL string. Acceptable.
- WebSite has no potentialAction/SearchAction and /search is 404. Correct, nothing to remove. Do not add one.
- Validator: schema.org validator and Google Rich Results Test need a browser session and were not reachable from this runner. Local structural check (JSON parse, @id resolution, absolute URLs, ISO dates, https context) found 0 errors, 0 warnings. Please run https://validator.schema.org on / once by hand. Expected Google rich result eligibility: BreadcrumbList on /about and /projects/*, ProfilePage on /. No others apply.

## 2. Person depth (current node on /)

Present now: alternateName "Ahmad Atef Saad" (string), givenName, familyName, image, email, jobTitle, description, disambiguatingDescription, sameAs (3), alumniOf, affiliation, worksFor, hasCredential, knowsLanguage, memberOf (inline Organization without url), award (4 strings), subjectOf (NewsArticle, publisher by id), homeLocation, knowsAbout (14), hasOccupation (Occupation with occupationLocation and skills).

Corrections and additions, with exact JSON:

a) REMOVE alumniOf. He graduates December 2026, so alumniOf is factually wrong today and conflicts with the "senior" copy. Keep affiliation. Re-add alumniOf in January 2027.

b) worksFor currently lists AUS. A student is not employed by AUS unless he has a campus job. Use affiliation for AUS, worksFor for Chief Nest only (confirm current status with owner). Samsung Gulf Electronics is past, so it is not in worksFor (correct); model it in the project/experience copy and as an Organization node only.

c) alternateName array. The AUS form "Ahmad Atef Saad" is published (AUS article and university listing). "Ahmad A. Saad" is a guess: omit unless the owner confirms he uses it publicly.
```json
"alternateName": ["Ahmad Atef Saad"],
"additionalName": "Atef"
```
(If confirmed: ["Ahmad Atef Saad", "Ahmad A. Saad"].) honorificPrefix: none, do not add. nationality: unknown, do not add.

d) homeLocation as two Places (current value is one Place with a combined name, which is less machine-readable):
```json
"homeLocation": [
  {"@type": "Place", "name": "Sharjah, United Arab Emirates", "address": {"@type": "PostalAddress", "addressLocality": "Sharjah", "addressCountry": "AE"}},
  {"@type": "Place", "name": "Abu Dhabi, United Arab Emirates", "address": {"@type": "PostalAddress", "addressLocality": "Abu Dhabi", "addressCountry": "AE"}}
]
```

e) hasOccupation: already valid. Change the Occupation name to match jobTitle semantics and add description:
```json
"hasOccupation": {"@type": "Occupation", "name": "AI Engineer", "occupationLocation": {"@type": "Country", "name": "United Arab Emirates"}}
```
(Country is more precise than AdministrativeArea. Occupation.skills is valid; keep.)

f) knowsAbout: current list is 14 items and good. Add the owner's requested terms that are missing: "Applied AI", "Cost governance for LLM systems", "WebGPU", "Embedded systems", "LoRaWAN", "Computer architecture". Check the live list first and only add missing ones.

g) Student status and role. memberOf currently has no url. Replace with an OrganizationRole so the President role is machine-readable (memberOf accepts Organization or ProgramMembership; role goes through the Role type):
```json
"memberOf": {
  "@type": "OrganizationRole",
  "roleName": "President",
  "memberOf": {
    "@type": "Organization",
    "@id": "https://ahmadsaad.dev/#org-tbp-aus",
    "name": "Tau Beta Pi, American University of Sharjah chapter",
    "url": "https://www.tbp.org",
    "parentOrganization": {"@type": "Organization", "name": "Tau Beta Pi", "url": "https://www.tbp.org", "sameAs": "https://en.wikipedia.org/wiki/Tau_Beta_Pi"}
  },
  "startDate": "2026"
}
```
Verify startDate with the owner or drop it. For the degree in progress, use one hasCredential entry (no endDate in the past, no "awarded" claim):
```json
{"@type": "EducationalOccupationalCredential", "name": "Bachelor of Science in Computer Engineering (in progress, expected December 2026)", "credentialCategory": "degree", "recognizedBy": {"@id": "https://ahmadsaad.dev/#org-aus"}}
```

h) award: keep strings; the dated one is already "Tau Beta Pi Scholarship (2026)". No change needed. Strings are valid for award.

i) subjectOf NewsArticle: currently publisher is an @id reference, which resolves, but the target #org-aus has no logo. Make the article self-contained and point back:
```json
"subjectOf": [{
  "@type": "NewsArticle",
  "@id": "https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship#article",
  "headline": "AUS engineering student receives competitive Tau Beta Pi Scholarship",
  "url": "https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship",
  "datePublished": "2026-06-22",
  "image": "https://www.aus.edu/sites/default/files/news/tbp_1_1.jpg",
  "about": {"@id": "https://ahmadsaad.dev/#person"},
  "publisher": {"@id": "https://ahmadsaad.dev/#org-aus"},
  "inLanguage": "en"
}]
```
og:image confirmed live: https://www.aus.edu/sites/default/files/news/tbp_1_1.jpg (it is the article photo, not an AUS logo; do not use it as Organization.logo). No verified AUS logo URL was fetched; omit logo rather than guess.

j) sameAs. Keep GitHub, LinkedIn, Credly badge. The AUS article must NOT be in sameAs (it is subjectOf). https://www.credly.com/users/ahmad-saad returns 200 but I cannot prove it is his profile, so do not add. Ask the owner for his real Credly profile handle; the existing badge URL is real (200). Other real URLs worth asking for: a Google Scholar/ORCID/Wikidata item only if they exist. Do not add Wikipedia or Wikidata for Ahmad.

k) email: ahmadd.saad02@gmail.com is exposed in JSON-LD on / (harvestable). Optional: remove from schema, keep on the visible contact link.

## 3. ProfilePage on / and /about

- / already has ProfilePage with mainEntity #person, about, dateCreated 2026-08-24, dateModified 2026-10-31. Valid. Keep ProfilePage on /; it is the page Google documents for person profile pages. Add `"@id": "https://ahmadsaad.dev/#profilepage"` already present. Gap: dateModified is hardcoded or build-time; make it the real last content change, not the deploy date, or Google may ignore it.
- /about is AboutPage with mainEntity #person. Keep AboutPage there. Do not add a second ProfilePage (two profile pages for one person dilutes the signal). Recommendation: ProfilePage on /, AboutPage on /about.
- Google ProfilePage requires mainEntity Person/Organization with name; recommended: alternateName, image, sameAs, interactionStatistic (n/a). Met.

## 4. BreadcrumbList templates

Present and valid on /about, /projects, /projects/*. Home needs none. New pages (404 today, /aus, /faq, /now, /press do not exist yet; ship markup with the pages):

```json
{"@type": "BreadcrumbList", "@id": "https://ahmadsaad.dev/aus#breadcrumb", "itemListElement": [
  {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://ahmadsaad.dev/"},
  {"@type": "ListItem", "position": 2, "name": "AUS", "item": "https://ahmadsaad.dev/aus"}]}
```
Repeat with /faq ("FAQ"), /now ("Now"), /press ("Press"). Page node for each: `{"@type": "WebPage", "@id": "<url>#page", "url": "<url>", "isPartOf": {"@id": "https://ahmadsaad.dev/#website"}, "about": {"@id": "https://ahmadsaad.dev/#person"}, "breadcrumb": {"@id": "<url>#breadcrumb"}, "dateModified": "<ISO date>"}`. For /aus use about [{"@id": "#person"}, {"@id": "#org-aus"}]. /now: WebPage with dateModified refreshed each update.

/faq (Google retired FAQ rich results for all sites on May 7, 2026: no SERP feature, any AI benefit unconfirmed; low-cost, ship only if the owner accepts that; Info priority):
```json
{"@type": "FAQPage", "@id": "https://ahmadsaad.dev/faq#page", "url": "https://ahmadsaad.dev/faq", "mainEntity": [
  {"@type": "Question", "name": "Who is Ahmad Atef Saad?", "acceptedAnswer": {"@type": "Answer", "text": "Ahmad Atef Saad is the name AUS uses for Ahmad Saad, an AI engineer and Computer Engineering senior at the American University of Sharjah."}},
  {"@type": "Question", "name": "Is Ahmad Saad at AUS the same person as Ahmad Atef Saad?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Ahmad Saad and Ahmad Atef Saad are the same person, a Computer Engineering student at AUS and President of its Tau Beta Pi chapter."}}]}
```
Answer text must match visible page text exactly.

/press, ItemList of NewsArticle:
```json
{"@type": "ItemList", "@id": "https://ahmadsaad.dev/press#list", "itemListElement": [
  {"@type": "ListItem", "position": 1, "item": {"@type": "NewsArticle", "headline": "AUS engineering student receives competitive Tau Beta Pi Scholarship", "url": "https://www.aus.edu/media/news/aus-engineering-student-receives-competitive-tau-beta-pi-scholarship", "datePublished": "2026-06-22", "about": {"@id": "https://ahmadsaad.dev/#person"}, "publisher": {"@id": "https://ahmadsaad.dev/#org-aus"}}}]}
```

## 5. WebSite SearchAction
Not present; no site search exists. Leave it out. WebSite on / is complete (name, url, inLanguage, publisher). Add `"alternateName": ["Ahmad Atef Saad", "ahmadsaad.dev"]` for site-name signals.

## 6. Project pages
All four resolve author to https://ahmadsaad.dev/#person, same id on every page. Trend Radar sample has name, description, author, url, image, keywords, codeRepository, programmingLanguage. Gaps:
- No dateCreated / dateModified on SoftwareSourceCode. Add ISO dates from the git history of each repo.
- LoRaWAN project is a CreativeWork (hardware), fine, but has no codeRepository; if a repo exists use SoftwareSourceCode, otherwise add `"creator"` plus `"about": "LoRaWAN sensor node"`.
- Add `"isAccessibleForFree": true` and `"license"` only if the repos carry one.
- Add `"sameAs"` or `"isBasedOn"` only where real.
- #project-portfolio on / is a SoftwareSourceCode wrapper for the list. An ItemList or CollectionPage is semantically better; low priority.

## 7. Employer Organizations
Present on /: #org-aus (CollegeOrUniversity), #org-samsung-gulf, #org-elmec, #org-chief-nest, each with name and url only. Add sameAs:
```json
{"@type": "CollegeOrUniversity", "@id": "https://ahmadsaad.dev/#org-aus", "name": "American University of Sharjah", "alternateName": "AUS", "url": "https://www.aus.edu/", "sameAs": ["https://en.wikipedia.org/wiki/American_University_of_Sharjah"], "address": {"@type": "PostalAddress", "addressLocality": "Sharjah", "addressCountry": "AE"}}
{"@type": "Organization", "@id": "https://ahmadsaad.dev/#org-samsung-gulf", "name": "Samsung Gulf Electronics", "url": "https://www.samsung.com/ae/", "parentOrganization": {"@type": "Organization", "name": "Samsung Electronics", "url": "https://www.samsung.com", "sameAs": "https://en.wikipedia.org/wiki/Samsung_Electronics"}}
```
Wikipedia AUS URL returns 200. Samsung Gulf Electronics (the regional subsidiary) has no verified Wikipedia article, so do not put Samsung Wikipedia on it; put it on the parent only. Chief Nest: no Wikipedia; sameAs only if a real LinkedIn company page is given by the owner. AUS Wikidata Q-number was not verified; skip.

## Priority list
1. High: remove alumniOf until January 2027; revisit worksFor containing AUS.
2. High: emit the full Person on /about and /projects (and sameAs on the stub elsewhere).
3. Medium: alternateName as array only if second form confirmed; add additionalName "Atef"; split homeLocation into Sharjah and Abu Dhabi.
4. Medium: memberOf as OrganizationRole (President) with url https://www.tbp.org; degree in progress via hasCredential.
5. Medium: subjectOf NewsArticle gets about #person, image, @id; AUS Organization gets sameAs Wikipedia.
6. Low: dateCreated/dateModified on project nodes; real dateModified on ProfilePage; consider removing exposed email; FAQPage only as Info (no Google SERP benefit).
