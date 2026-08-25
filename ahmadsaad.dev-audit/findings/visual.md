# Visual, Mobile & Above-the-Fold — ahmadsaad.dev (audited 2026-08-24)

**Score: 74 / 100**

Method: Playwright Chromium (plugin runtime), desktop 1440×900 @1x and iPhone-class mobile 390×844 @2x, light + dark colour schemes, screenshot 1.5 s after `load`. Accessibility names and tap-target sizes read from the live DOM. Screenshots in `screenshots/`:
`desktop-1440-light-above-fold.png`, `desktop-1440-light-full.png`, `desktop-1440-dark-above-fold.png`, `desktop-1440-dark-full.png`, `mobile-390-light-above-fold.png`, `mobile-390-light-full.png`, `mobile-390-dark-above-fold.png`, `mobile-390-dark-full.png`. Lab vitals per run in `../lab-vitals.json`.

## What works
- **Mobile above-the-fold is exemplary**: H1 "Ahmad Saad", role line, all three intro paragraphs *including* the availability/visa line are visible on a 390×844 screen without scrolling; the Experience section starts right below (mobile-390-light-above-fold.png).
- No horizontal overflow on either viewport (`scrollWidth <= innerWidth`). Viewport meta correct.
- Both themes render consistently; dark mode has strong text contrast.
- Shooting-stars background is `aria-hidden` and hidden under `prefers-reduced-motion` (`motion-reduce:hidden` in page.tsx) — verified in source.
- The floating dock (home / GitHub / LinkedIn / CV / email / pronounce / theme) is reachable on desktop; mobile collapses it into a "Toggle drawer" control with a name.
- Headings are semantic (single H1, H2 per section, H3 per entry).

## Findings

| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| High | Reveal-on-load animation hides the hero for the first ~1–2 s on desktop, pushing LCP to the intro paragraph at 2.5 s (desktop) / 3.1 s (mobile, lab) | `desktop-1440-light-above-fold.png` taken 1.5 s after `load` still shows the name/tagline at ~20 % opacity and no intro paragraphs; LCP element reported as `P.leading-relaxed` (the intro). `RevealOnLoad delay={0.15} duration={0.5}` in app/page.tsx wraps the LCP text | Render hero text visible by default and animate only *decoration* (or animate from opacity 0.6→1 instead of 0→1); or gate the animation with `motion-safe:` and skip it entirely on first paint. Keep the H1 out of any opacity animation |
| Medium | 5 company-logo links have no accessible name | DOM probe: `<a href="https://www.samsung.com/ae/">`, elmec.ae, chiefnest.com, aus.edu ×2 — 24×24 px, empty text, no `aria-label`/`title`; CV dock icon similarly unnamed (per SXO probe) | Add `aria-label="Samsung Gulf Electronics website"` etc. (`config/experience.ts` → experience card component), and `aria-label="Download CV (PDF)"` on the dock link |
| Medium | Tap targets below 24 px on mobile | "Pronounce my name" button 16×16; "Trend Radar" caption link 78×23; contact links 22 px tall | Pad to ≥ 24×24 (WCAG 2.2 2.5.8) — `p-1`/`min-h-6` on the icon button, `py-1` on inline links |
| Medium | Project carousel is drag-only with no visible prev/next controls; only the active slide's caption exists in the DOM | Visible copy: "Drag through the carousel to explore."; no arrow buttons in screenshots; content agent confirmed non-active captions are not rendered | Add visible prev/next buttons + keyboard handling; render every slide's caption (visually hidden when inactive) so the content is discoverable and indexable |
| Medium | Lab CLS 0.077 on desktop (both themes) from a shift at ~2.4 s; mobile 0 | `layout-shift` entries: 0.069 at 2449 ms on three `DIV` nodes plus 0.008 on a `SECTION` — coincides with hero reveal / Samsung collapsible opening | Reserve space for the revealed hero block (no height animation), and open the default-expanded Collapsible server-side (`forceMount` + CSS) so nothing shifts after hydration. Target: < 0.05 |
| Low | Light theme uses low-contrast muted text for the role line, dates and captions | `text-muted-foreground` on the warm paper background appears ~3:1 in desktop-1440-light-above-fold.png (not instrument-measured) | Check with a contrast tool; aim ≥ 4.5:1 for body-size text, ≥ 3:1 for the uppercase mono labels |
| Info | Developer-style overlay (clock, "1440 × 900", "llms-full.txt / llms.txt" links) is visible to every desktop visitor | Corners of both desktop screenshots; from `<Info show={['time','screen','llms']} />` in page.tsx | Intentional easter-egg is fine; if not, drop `screen`/`time` in production |
| Info | Dark-mode screenshots at identical timing show the hero fully revealed — the reveal race depends on TTFB (1.2 s vs 1.9 s in these runs), so real users on slow networks see the blank hero longer | lab-vitals.json | Same fix as the High item |

## How we'd know it worked (ACCEPT) / leading indicator (GROW)
- Screenshot at 1.0 s after `load` on desktop shows H1 + intro at full opacity.
- Lab LCP on mobile ≤ 2.5 s and the LCP element is still the intro paragraph (not an image); CLS ≤ 0.05.
- axe/Lighthouse "Links do not have a discernible name" and "Tap targets" audits pass.
