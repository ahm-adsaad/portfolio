# Schema / Structured Data audit: ahmadsaad.dev

Audit date: 2026-10-30. Raw extracted JSON: ahmadsaad.dev-audit/2026-10-30/findings/schema-raw/<page>.json. Extraction script: scratchpad/schema/extract.py. The plugin ships only schema_ecommerce_validate.py and schema_generate.py, neither applicable (no ecommerce, and a generator rather than a validator), so validation was done manually against schema.org and Google documentation.

## 1. Score: 71 / 100

Valid, server-rendered, well-linked JSON-LD with correct breadcrumbs and per-page graph resolution, but the Person entity (the lever for beating the singer) is thin on sameAs and entity anchors, ProfilePage lacks dates, and ImageObject sizes are strings.

## 2. What works

- All 7 pages emit exactly one JSON-LD block, server-rendered, parses as valid JSON, @context is https://schema.org everywhere.
- Zero dangling @id references on the 5 pages where Google would evaluate a graph on its own (home, 4 project pages are self-contained via a Person stub). See finding 3 for /about and /projects, which do dangle.
- @id values are stable across pages (#person, #website, <project>#project are identical everywhere).
- url and mainEntityOfPage match each page canonical (canonical on home is https://ahmadsaad.dev without trailing slash, schema uses https://ahmadsaad.dev/; equivalent, harmless).
- BreadcrumbList on /about, /projects and all 4 project pages: positions 1..n, Home first, absolute URLs, names present.
- ProfilePage on home has mainEntity Person, a strong entity declaration.
- Person already has disambiguatingDescription, homeLocation (AE), alumniOf, worksFor, knowsAbout, hasOccupation, hasCredential with url, givenName/familyName, email, image with caption.
- All dates/URLs that exist are absolute. No deprecated types (no HowTo, FAQPage, SpecialAnnouncement).
- External URLs (curl, browser UA): Credly badge 200, aus.edu 200, samsung.com/ae 200, elmec.ae 200, chiefnest.com 200, github.com/ahm-adsaad 200, all 4 repo URLs 200, all schema image URLs 200. LinkedIn returns 999 (anti-bot block, not broken).

## 3. Per-page node inventory

| Page | Node types | Dangling @id refs | Errors | Warnings |
|---|---|---|---|---|
| / | CollegeOrUniversity, Organization x3, Person, WebSite, ProfilePage, SoftwareSourceCode x4 (3 projects + portfolio), CreativeWork (LoRaWAN) | 0 | 1 (ImageObject width/height strings) | 7 (no ProfilePage dates, 2 sameAs only, orgs lack sameAs, Samsung org unreferenced, portfolio node lacks url, no dateCreated on projects, noisy jobTitle) |
| /about | AboutPage, BreadcrumbList, Person (stub) | 1 (#website) | 1 (width/height strings) | 2 (stub Person, no dateModified) |
| /projects | CollectionPage, BreadcrumbList | 6 (#person, #website, 4 x project #project) | 0 | 3 (no ItemList, hasPart targets not defined, no Person) |
| /projects/trend-radar | SoftwareSourceCode, Person (stub), BreadcrumbList | 0 | 0 | 3 (breadcrumb not linked, no dateCreated, #website not present) |
| /projects/localai | same as above | 0 | 0 | 3 |
| /projects/mano-computer-simulator | same | 0 | 0 | 3 |
| /projects/lorawan-sensor-node | CreativeWork, Person (stub), BreadcrumbList | 0 | 0 | 3 (plus no codeRepository: no public repo) |

## 4. Findings

### F1. ImageObject width and height are strings (Medium)
Evidence: https://ahmadsaad.dev/ and /about, `"width": "748", "height": "748"`.
Root cause: `String(USER.image.width)` in both files. schema.org expects Number or QuantitativeValue/Distance.
Fix (apps/website/app/page.tsx lines 54-55 and apps/website/app/about/page.tsx lines 58-59): remove String().
```json
"width": 748,
"height": 748
```

### F2. Person sameAs has only GitHub and LinkedIn; thin entity anchoring versus the singer "Ahmed Saad" (High)
Evidence: home, `"sameAs": ["https://github.com/ahm-adsaad","https://www.linkedin.com/in/ahmaddsaad"]`.
Root cause: sameAs is `Object.values(USER.social).filter(Boolean)` (app/page.tsx line 105); config/user.ts lines 53-54 only has github and linkedin.
Fix: add confirmed (200) targets. The Credly badge page is verified; a Credly public profile URL was not confirmed so do not invent one. Add the AUS-hosted or other profile pages only if they exist. Also note the singer spells the name "Ahmed", so keep the "Ahmad Saad" string plus the extra context explicit.
```json
"sameAs": [
  "https://github.com/ahm-adsaad",
  "https://www.linkedin.com/in/ahmaddsaad",
  "https://www.credly.com/badges/976e4176-241f-4870-83ea-c66f896f64ff"
]
```
Files: apps/website/config/user.ts (add a `credly` social or an `extraSameAs` array), apps/website/app/page.tsx line 105. Also add a GitHub repo list is not recommended in the Person sameAs (repos are not the same entity); instead keep them as codeRepository on projects.

### F3. Dangling @id references on /about and /projects (High)
Evidence: /about references https://ahmadsaad.dev/#website (isPartOf) which is not defined there. /projects references #website, #person, and four `<project>#project` ids (hasPart) with no defining node. /about does define Person as a stub, but the headshot ImageObject is defined on /about as well, fine.
Root cause: app/about/page.tsx and app/projects/page.tsx graphs only include the page node plus breadcrumb. project pages already use the personStub pattern (lib/seo/project-schema.ts) which is why they pass.
Fix for /about, add WebSite stub; for /projects add WebSite stub, Person stub, and either embed the 4 projects (via projectSchema) or replace hasPart with an ItemList:
```json
{
  "@type": "WebSite",
  "@id": "https://ahmadsaad.dev/#website",
  "url": "https://ahmadsaad.dev/",
  "name": "Ahmad Saad"
}
```
```json
{
  "@type": "ItemList",
  "@id": "https://ahmadsaad.dev/projects#list",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "url": "https://ahmadsaad.dev/projects/trend-radar", "name": "Trend Radar" },
    { "@type": "ListItem", "position": 2, "url": "https://ahmadsaad.dev/projects/localai", "name": "LocalAI" },
    { "@type": "ListItem", "position": 3, "url": "https://ahmadsaad.dev/projects/mano-computer-simulator", "name": "Mano Basic Computer Simulator" },
    { "@type": "ListItem", "position": 4, "url": "https://ahmadsaad.dev/projects/lorawan-sensor-node", "name": "Energy Harvesting LoRaWAN Sensor Node" }
  ]
}
```
and on the CollectionPage `"mainEntity": {"@id": "https://ahmadsaad.dev/projects#list"}`. Files: apps/website/app/about/page.tsx (graph around lines 40-90), apps/website/app/projects/page.tsx (graph), reuse `personStub()` and `projectSchema()` from apps/website/lib/seo/project-schema.ts. Add a `websiteStub()` helper next to personStub.

### F4. ProfilePage lacks dateCreated and dateModified (Medium)
Evidence: home ProfilePage node has neither. Google recommends both, ISO 8601 with timezone.
Fix (apps/website/app/page.tsx line 158 block; keep dates as constants in config/site.ts so they are not regenerated on every build unless content changes):
```json
"dateCreated": "2025-01-01T00:00:00+04:00",
"dateModified": "2026-10-30T00:00:00+04:00"
```
Use the real first-publish date from git history, not the placeholder above. Add dateModified to AboutPage too.

### F5. Person disambiguation can be stronger (High)
Evidence: disambiguatingDescription is only "Computer engineer and AI engineer based in the UAE, American University of Sharjah." Not stated: Abu Dhabi/Sharjah base, languages, Tau Beta Pi role, IEEE role, certification detail. homeLocation has country only. Facts below are from config/about.ts and config/education.ts (about.ts line 18, 38; education.ts line 9-10).
Fix (apps/website/app/page.tsx lines 92-140, sourced from config):
```json
"disambiguatingDescription": "Ahmad Saad is a Computer Engineering student and AI engineer at the American University of Sharjah, UAE, and president of its Tau Beta Pi chapter. Not the Egyptian singer Ahmed Saad.",
"knowsLanguage": ["en", "ar"],
"homeLocation": {
  "@type": "Place",
  "name": "Abu Dhabi and Sharjah, United Arab Emirates",
  "address": { "@type": "PostalAddress", "addressLocality": "Sharjah", "addressCountry": "AE" }
},
"memberOf": [
  { "@type": "Organization", "name": "Tau Beta Pi, American University of Sharjah chapter" },
  { "@type": "Organization", "name": "IEEE Solid-State Circuits Society, American University of Sharjah" }
],
"award": ["Academic Merit Scholarship", "Dean's List (6 semesters)", "Chancellor's List (3 semesters)"]
```
Note: the explicit "not the singer" sentence is optional; it is a fair disambiguation but check it reads well beside the on-page copy. Do not add nationality (not stated on the site). Use memberOf for Tau Beta Pi president role (a Role wrapper with `roleName: "President"` is the precise form):
```json
"memberOf": { "@type": "ProgramMembership", "programName": "Tau Beta Pi, AUS chapter", "hostingOrganization": { "@type": "Organization", "name": "Tau Beta Pi" } }
```
Keep to the simpler Organization form unless you want Role precision.

### F6. Organization and CollegeOrUniversity nodes lack sameAs; Samsung org unreferenced (Low)
Evidence: home nodes `#org-aus`, `#org-samsung-gulf`, `#org-elmec`, `#org-chief-nest` have name and url only. #org-samsung-gulf and #org-elmec are never referenced by any property (Person.worksFor lists Chief Nest and AUS only).
Fix: either reference past employers (not worksFor, which means current) via a custom `hasOccupation`/`subjectOf` is poor; simplest is to remove unreferenced nodes or keep them for future use. If kept, add Wikipedia for AUS:
```json
"sameAs": ["https://en.wikipedia.org/wiki/American_University_of_Sharjah"]
```
(Confirm with curl before use.) File: apps/website/app/page.tsx org nodes.

### F7. jobTitle contains separators and an "@" shorthand (Low)
Evidence: `"jobTitle": "AI Engineer · Forward Deployed Engineer · Computer Engineering @ AUS"`.
Fix: single clean title, move the rest to description/hasOccupation:
```json
"jobTitle": "AI Engineer"
```
File: apps/website/config/user.ts (the jobTitle source) or the Person node in app/page.tsx. If config title is used for visible UI, add a separate `schemaJobTitle`.

### F8. Project nodes lack dateCreated; portfolio node lacks url and @id fragment convention (Low)
Evidence: all SoftwareSourceCode/CreativeWork nodes, no dateCreated/datePublished; `#project-portfolio` node has no url.
Fix in apps/website/lib/seo/project-schema.ts (base object): add `dateCreated` from a project config date, and for the portfolio node add `"url": "https://ahmadsaad.dev/"` (or the GitHub repo). Add the date field to Project type in config/projects.ts. Only use dates actually present in your records.
```json
"dateCreated": "2026-06-01",
"url": "https://ahmadsaad.dev/"
```
(Dates illustrative; take from config/experience.ts or git.)

### F9. Project page graphs: breadcrumb not linked, Person is a stub (Low)
Evidence: project pages define BreadcrumbList but no node points to it; Person is stub (@id, name, url only). Acceptable to Google (breadcrumb is detected standalone), but a WebPage node would connect them.
Fix (apps/website/app/projects/[id]/page.tsx graph): add
```json
{
  "@type": "WebPage",
  "@id": "https://ahmadsaad.dev/projects/trend-radar#page",
  "url": "https://ahmadsaad.dev/projects/trend-radar",
  "isPartOf": { "@id": "https://ahmadsaad.dev/#website" },
  "mainEntity": { "@id": "https://ahmadsaad.dev/projects/trend-radar#project" },
  "breadcrumb": { "@id": "https://ahmadsaad.dev/projects/trend-radar#breadcrumb" }
}
```
plus the WebSite stub from F3 so isPartOf resolves.

### F10. Credential detail (Low)
Evidence: hasCredential has name, category, recognizedBy (Anthropic, name only), url. Missing: dateCreated/validFrom, credentialId. Add only if shown on the Credly page; plus a url for recognizedBy: `"recognizedBy": {"@type":"Organization","name":"Anthropic","url":"https://www.anthropic.com/"}` (curl-verify before shipping). File: apps/website/app/page.tsx lines 109-120, CERTIFICATIONS in config/education.ts.

### F11. Email in public markup (Low, informational)
`"email": "ahmadd.saad02@gmail.com"` is on every crawl; it is a spam-harvest vector and gives no ranking benefit. Keep only if intentional (it is also visible on the site presumably).

## 5. Rich result eligibility

- Breadcrumb: attainable now on /about, /projects, 4 project pages. Valid. Blocker: none (Google shows breadcrumbs only when it chooses; the site is low-traffic and new, so display is not guaranteed).
- Profile page: markup valid and mainEntity Person present, but Google limits the profile page feature to forums/social-style creator pages and does not show a visible SERP rich result for a portfolio; fix dates (F4) for a clean pass. Blockers: dates missing, feature scope.
- Person / Knowledge Panel: no rich result type exists for Person. A Knowledge Panel is earned from entity corroboration, not markup alone. Blockers: only two sameAs, no Wikipedia/Wikidata presence, the singer "Ahmed Saad" holds the panel for the near-identical name, and low third-party coverage. Markup (F2, F5) helps AI assistants and disambiguation; it does not guarantee a panel.
- Software app / code: SoftwareSourceCode has no Google rich result. Not attainable.
- FAQ, HowTo: not applicable and not recommended.
- Sitelinks searchbox: retired, not applicable.

## 6. Top 5 fixes (impact over effort)

1. F3: define WebSite and Person stubs and an ItemList on /about and /projects (small code change, removes the only graph-integrity errors).
2. F2: broaden Person sameAs (a few lines in config/user.ts and app/page.tsx).
3. F5: richer disambiguatingDescription plus knowsLanguage, homeLocation, memberOf (all facts already in config).
4. F1: remove String() from the two ImageObject sizes (two-line change, clears the only type error).
5. F4: add dateCreated and dateModified to ProfilePage and AboutPage.
