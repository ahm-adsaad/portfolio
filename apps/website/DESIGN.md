# ahmadsaad.dev design system: "Dusk Radar"

The visual brief for the 2026 redesign. Everything in `app/`, `components/`,
and `features/` follows this document. Content lives in `config/*` and does
not change with the design.

## 1. Who this is for, and the one job

Ahmad Saad: AI engineer and forward deployed engineer, Computer Engineering
senior at AUS, UAE Golden Visa, available January 2027. Readers are hiring
managers and recruiters at AI companies who skim fast and have seen a
thousand Vercel-template portfolios. The page has one job: make them think
"this person builds real systems and has taste", then click email or
LinkedIn. Everything that does not serve that job is cut.

## 2. Reference and twist

Reference: the STC Intercâmbio redesign concept (dark cinematic one-pager:
condensed uppercase display type at enormous sizes, italic counterpoint,
mono micro-labels, grain, section inversions from near-black to warm
white, pinned horizontal scroll, GSAP stacking cards, double marquee, a
giant one-word contact section). We keep its energy and its section rhythm.

What we do NOT copy (these are what made it slow or generic):

- No loader screen, no Lenis smooth scroll, no GSAP, no Three.js, no WebGL.
- No custom cursor. Ever.
- No scroll hijacking: no pinned horizontal scroll section.
- No Bebas Neue, no Playfair, no Inter.
- No full-screen SVG `feTurbulence` filter (repaints the whole viewport).
- No theme toggle. The site is one art-directed composition.

The twist, in one sentence: the reference is a travel brochure; this is an
instrument. Ahmad's thesis is "measurement decides, LLMs describe", so the
page borrows the language of instruments and ledgers: a radar sweep, measured
values as section metadata, condensed type that reads like a gauge label.

## 3. Palette (hex, use as CSS variables)

Dark ground with warm text, one warm accent, one cool accent for labels.

| Token          | Hex       | Role                                                     |
| -------------- | --------- | -------------------------------------------------------- |
| `--ink`        | `#0E0C14` | Page ground. Violet-black, warmer than pure black.       |
| `--ink-2`      | `#17141F` | Raised surfaces on ink (cards, chips, details body).     |
| `--ink-3`      | `#231F2E` | Borders and hairlines on ink (use at 100%, not alpha).   |
| `--bone`       | `#F1ECE4` | Text on ink. Also the ground of inverted sections.       |
| `--bone-2`     | `#E6DFD3` | Raised surfaces on bone.                                 |
| `--apricot`    | `#FF9E5E` | Primary accent on ink: numbers, CTAs, radar, selection.  |
| `--apricot-ink`| `#AE3E19` | Apricot for use ON BONE (text and lines). 5.1:1 on bone, 4.5:1 on bone-2. |
| `--sea`        | `#7FD6C2` | Cool accent, mono eyebrows and labels on ink only.       |
| `--sea-ink`    | `#1C6E5C` | Sea for use ON BONE.                                     |

Text opacity steps on ink: `--bone` at 100% for display and headings, 72%
for body, 56% for muted (11px mono needs it to clear 4.5:1), 24% for dim rules. On bone, `--ink` at the same
steps except muted, which is 64% (`--ink` at 56% on bone is only 4.2:1; 64% is 5.5:1). Never put `--apricot` or `--sea` text on bone: use the `-ink`
variants. Selection: apricot background, ink text.

Rationale: apricot is the Gulf sun at dusk, sea is the water, ink is the sky
after it. Apricot and sea sit roughly opposite on the wheel at similar
lightness, so they read as one system instead of two accents fighting.

## 4. Type

Three faces, all self-hosted woff2 via `next/font/local` (no Google Fonts
request at runtime). Source files come from the `@fontsource-variable/*`
packages and are copied into `assets/fonts/`.

| Role    | Face                                   | Settings                                                        |
| ------- | -------------------------------------- | --------------------------------------------------------------- |
| Display | Bricolage Grotesque (static instance)  | `wght 800`, `wdth 75`, `opsz 96`, uppercase, `line-height .86`, `letter-spacing -0.01em` |
| Display light | Bricolage Grotesque (static instance) | `wght 300`, `wdth 100`, `opsz 96`, sentence case, `line-height 1`, the "counterpoint" where the reference used italic serif |
| Body    | Instrument Sans (variable)             | `wght 400/500`, `line-height 1.6`, 16 to 18px                   |
| Mono    | Geist Mono (variable)                  | `wght 400/500`, 11 to 13px, `letter-spacing .18em`, uppercase for eyebrows |

One family carries both display voices: condensed black for the shout and
extended light for the whisper. That contrast replaces the reference's
Bebas + Playfair pairing, and it is the typographic signature. The two
voices ship as two static instances (`assets/fonts/bricolage-display*.woff2`,
about 18 KiB each, Latin subset) baked out of the variable file by
`pnpm fonts:display` (`scripts/build-display-fonts.mts`); the 129 KiB
variable file delayed the hero LCP by over a second on 4G.

Scale (desktop / mobile):

- Hero name: `clamp(5.5rem, 17vw, 20rem)` / fills the width in two lines
- Section display (h2): `clamp(3rem, 8vw, 8.5rem)`
- Card title (h3): `clamp(2.25rem, 5vw, 5rem)`
- Display light counterpoint: `clamp(1.5rem, 3.2vw, 3rem)`
- Body: 17px desktop, 16px mobile. Max line length 64ch.
- Eyebrow mono: 11px, `.2em` tracking, uppercase, `--sea` on ink / `--sea-ink` on bone.

## 5. Layout

Full-bleed sections, no boxed content column. Page padding
`--pad: clamp(20px, 5vw, 80px)`. Section padding `--section: clamp(96px, 14vh, 200px)`.
Content grid is 12 columns with `gap: clamp(16px, 2vw, 32px)`; editorial
splits are 5/7 (display left, text right) on desktop, stacked on mobile.

Every section starts with the same header row, which is the ledger idea:

```
EYEBROW (mono, sea)                                  measured value (mono, right)
```

The right-hand value is real data about that section, never decoration:
Experience shows the span of years, Projects shows the count, Education shows
the GPA, Tech stack shows the item count, GitHub shows the contribution total.

Section sequence on the home page (order matters, it is a narrative):

1. **Hero** (ink). Name as h1 in display, two lines: `AHMAD` / `SAAD`.
   Under it, the counterpoint in display light: "Forward deployed. Builds the
   system, scopes it with the people who use it, ships it." Eyebrow above the
   name: `AI ENGINEER · FDE · COMPUTER ENGINEERING @ AUS · UAE`. Two
   pill links: `Email` (apricot fill) and `LinkedIn` (outline). A small
   `scroll` cue bottom-left. The radar (section 6) sits behind the name.
2. **Statement** (ink, min-height 80vh, centered). The reference's word-by-word
   opacity scroll. Text in display light at `clamp(2rem, 5vw, 5.5rem)`:
   "Technical enough to build the system. Comfortable enough to scope it.
   Measurement decides. Models describe." Words start at 12% opacity and
   reach 100% as they cross the viewport middle. Pure CSS scroll-driven
   animation (`animation-timeline: view()`); where unsupported the words are
   simply fully visible.
3. **About** (bone, inverted). 5/7 split. Left: eyebrow `ABOUT`, display
   `FORWARD` / `DEPLOYED`. Right: the three hero paragraphs from the current
   `app/page.tsx` (keep the copy verbatim), then a three-item facts row that
   replaces the reference's numbered values with real facts: `UAE Golden Visa /
   no sponsorship needed`, `Available / January 2027`, `Languages / English and
   Arabic`. Link "More about me" to `/about`.
4. **Experience** (ink). Eyebrow `EXPERIENCE`, value `2024 to 2026`. A ledger
   list: one row per company from `config/experience.ts`, newest first as the
   config orders them. Row = company name in display at the card-title size,
   period and city in mono at the right, a plus/minus glyph. Rows are native
   `<details>` elements so the content is always in the DOM and crawlable, and
   there is no JS. Samsung is open by default (`isExpanded`). Inside: each
   position title in body 500, employment type, description with paragraph
   breaks, skills as mono chips. Hairline between rows in `--ink-3`.
5. **Projects** (bone). Eyebrow `PROJECTS`, value `5 BUILDS`. Stacking cards
   built with `position: sticky` (each card sticks at `top: calc(var(--nav) + i * 12px)`
   so the next one slides over the last, pure CSS, no pinning library). Card:
   ink background, bone text, radius 24px, 7/5 split: left has the index in
   mono apricot (`01` to `05`, the order is chronological so the number means
   something), title in display, `shortDescription`, `impact` line labelled
   `IMPACT` in mono, skills as chips, and a link `Read the case study` when a
   case study exists or `Source` otherwise; right has the cover image
   (`project.image`, with the `-320.webp` and `.webp` twins via `<picture>`)
   filling the column with `object-fit: cover`. Cards are `min-height: 72vh`
   on desktop, auto on mobile where stacking still works. Below the stack,
   a link to `/projects`.
6. **Education** (ink). Eyebrow `EDUCATION`, value `GPA 3.96`. 5/7 split:
   left the GPA huge in display (`3.96`), with `/ 4.0` in display light; right
   the school, degree, period, the three highlights as a list, and the
   coursework as mono chips. All from `config/education.ts`.
7. **Tech stack** (ink). Eyebrow `STACK`, value `37 TOOLS` (compute from
   config). Three marquee rows, one per group in `config/tech-stack.ts`, each
   row prefixed by its group title in mono. Rows alternate direction. Items in
   display light at `clamp(1.75rem, 3.5vw, 3.25rem)` separated by an apricot
   dot. Pure CSS `@keyframes` translateX on a duplicated track, pauses on
   hover, and under `prefers-reduced-motion` the rows become static wrapped
   lists.
8. **GitHub** (ink). Eyebrow `GITHUB`, value the contribution total. Keep the
   existing contribution graph component; recolor its levels to an apricot
   ramp on ink (`#231F2E`, `#5A3A2A`, `#9E5F3A`, `#D8854A`, `#FF9E5E`).
9. **Contact** (ink, min-height 90vh). Display at the hero size: `LET'S` /
   `TALK.` Under it in display light: "Graduating December 2026, available
   from January 2027." Then the email as a large underlined link in body
   500, and pill links for LinkedIn, GitHub, and the CV PDF
   (`/Ahmad_Saad_CV.pdf`).
10. **Footer** (bone). Left: the name in display with its lower 35% clipped
    (the half-cut wordmark, done with `overflow: hidden` on a fixed-height
    box, no JS). Right: `© 2026 Ahmad Saad`, links to `/about`, `/projects`,
    `/llms.txt`, and the source repo. Mono.

Secondary pages use the same nav, footer, and section header row:

- `/about`: ink hero with eyebrow `ABOUT`, display `AHMAD` / `SAAD`, the
  headshot at 160px with an apricot ring, `ABOUT_INTRO` in display light.
  Then one bone section per `ABOUT_SECTIONS` entry, alternating ink/bone,
  heading in display at card-title size, paragraphs in body.
- `/projects`: ink hero with display `PROJECTS`, the description, then the
  list as the same stacking cards as the home page.
- `/projects/[id]`: ink hero with index, title, period, cover, and the two
  pill links. Then a bone section with the overview, impact, chips, and the
  case study prose (`Markdown` + `Prose`), max 68ch. Prev/next in a two-cell
  row at the end. Breadcrumb in mono.

## 6. Signature: the radar

Behind the hero name sits a radar: three concentric rings and a cross-hair in
`--bone` at 8% opacity, and a sweep (a `conic-gradient` from transparent to
apricot at 22% back to transparent over 70 degrees) rotating once every 14
seconds with a linear timing function. Five blips sit on the rings, one per
project, each a 6px apricot dot with a mono label (`Trend Radar`, `LocalAI`,
`Mano CPU`, `LoRaWAN node`, `ahmadsaad.dev`) that brightens from 25% to
100% opacity for a moment as the sweep passes (an opacity keyframe with the
same 14s period and a per-blip `animation-delay` matching its angle). The
whole thing is a few divs and two keyframes; it never touches the main
thread. Under `prefers-reduced-motion` the sweep stops at a fixed angle and
the blips stay at 60%.

It is the one memorable element. Nothing else on the page animates
continuously except the tech marquee.

## 7. Motion

- Page load: eyebrow, the two name lines, the counterpoint, and the buttons
  rise 24px and fade in with a 70ms stagger over 700ms, `cubic-bezier(.16,1,.3,1)`.
  The h1 is the LCP element and must be painted on the first frame, so the
  animation starts from `opacity: .6` (never near zero: on About and the
  project pages the intro paragraph is the LCP candidate and has to count as
  painted on its first frame) on the decorative pieces; the name itself
  animates `transform` only, from `translateY(24px)`.
- Scroll reveals: elements with `data-reveal` get `is-visible` from one
  `IntersectionObserver` in a 30-line client component (`components/reveal.tsx`);
  CSS transitions opacity and a 20px translate. Threshold 0.15, unobserve
  after reveal. Stagger children with `--i` custom property.
- Scroll progress: a 2px apricot bar at the top driven by
  `animation-timeline: scroll()`, no JS, hidden where unsupported.
- Nav: fixed, `mix-blend-mode: difference` in bone so it auto-inverts over
  bone sections. Links in mono with an underline that grows from the left.
- Hover: links and chips transition color only, 200ms. Cards do not lift.
- `prefers-reduced-motion: reduce` disables every animation and transition
  above; content is always visible without motion.

## 8. Grain

A 128x128 PNG noise tile (generated once by `scripts/build-grain.mts`, or
an inline SVG data URI of the same size) as `background-image` on a fixed
`pointer-events: none` layer at `opacity: .05` with `mix-blend-mode:
overlay`. Tiled images cost nothing; a viewport-sized filter costs a repaint
every frame.

## 9. Performance budget

The site is prerendered to static HTML on Cloudflare Workers via OpenNext.

- Client JS on the home page: the Next runtime plus at most 10KB gzipped of
  our own code (reveal observer, mobile menu, the lazy contribution graph).
- No `motion`, `react-use`, `jotai`, `next-themes`, `react-wrap-balancer`,
  `react-fast-marquee`, `canvas-confetti`, `html2canvas`, `jspdf` on the home
  page bundle. Remove the imports; leave unused packages in `package.json`
  for a later cleanup commit if removing them breaks the registry build.
- Fonts: four woff2 files (two static display instances, body, mono),
  preloaded via `next/font/local`, `display: swap` for body and mono,
  `display: block` for the display face (the hero must not flash a fallback).
- Images: the project covers and headshot already exist as jpg + webp twins
  under `public/`; use `<picture>` with explicit width/height. Lazy-load
  everything below the fold, eager the hero only.
- Lighthouse mobile targets: Performance 95+, CLS 0, LCP under 1.8s on a
  simulated 4G.

## 10. Accessibility floor

Visible keyboard focus (2px apricot outline, offset 3px), real `<a>` and
`<button>` elements, `<details>` for accordions, text contrast 4.5:1 for body
and 3:1 for display sizes, every decorative element `aria-hidden`, the radar
labels are real text so screen readers hear the project names once.

## 11. What stays untouched

- `config/*` (all content), `lib/seo/*`, JSON-LD graphs, `generateMetadata`,
  OG images, `app/(llms)/*`, `sitemap.ts`, `robots.ts`, `manifest.json`,
  `scripts/*`, `wrangler.jsonc`, `open-next.config.ts`, `next.config.mjs`
  headers, `public/_headers`.
- `export const dynamic = 'force-static'` on every page.
- The `registry/` folder and its build step (not shipped on any page).

## 12. Things we tried and rejected

- Keeping the dark/light toggle: it fought the ink/bone section inversion.
- A serif italic counterpoint (Instrument Serif): it is the current default
  of AI-generated pages and reads as a template.
- Pinned horizontal scroll for projects: scroll hijacking is what made the
  reference feel slow.
