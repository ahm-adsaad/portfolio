# Visual / above-the-fold audit: ahmadsaad.dev (2026-10-30)

## 1. Score: 68 / 100
Strong, legible, fast-rendering hero with clear name, CTAs and working reduced-motion, but the home first screen has no face photo and no location, and all 7 OG images are text-only on an abstract gradient with no face.

## 2. Screenshot index
All in C:/Users/ahmad/Desktop/GitHubRepos/portfolio/ahmadsaad.dev-audit/2026-10-30/screenshots/

| File | Page | Viewport | Shows |
|---|---|---|---|
| home-desktop.png | / | 1440x900 | Settled hero over road video: eyebrow, huge name, tagline, Email/LinkedIn/CV pills, nav |
| home-desktop-immediate.png | / | 1440x900 | Right after DOMContentLoaded: all text already visible, tagline and pills slightly dimmer/lower (mid rise) |
| home-desktop-3s.png | / | 1440x900 | Settled state |
| home-desktop-reduced.png / -reduced-immediate.png | / | 1440x900, reduced motion | Identical byte-for-byte: static, fully readable hero |
| home-desktop-nojs.png | / | 1440x900, JS disabled | Static render without JS |
| home-mobile.png, -immediate, -3s, -reduced | / | 390x844 @3x | Hero on phone |
| home-mobile-full.png | / | 390 full page | Whole home page |
| about-desktop.png, about-mobile.png, about-mobile-full.png | /about | 1440x900, 390x844, full | Headshot, name, Claude badge, bio over darkened video |
| trend-radar-desktop.png, trend-radar-mobile.png | /projects/trend-radar | 1440x900, 390x844 | Project page |
| og-home, og-about, og-projects, og-trend-radar, og-localai, og-mano, og-lorawan (.png) | 7 pages | 1600x836 | OG images |
| ../dom.json | all | | Raw DOM metrics (font sizes, small tap targets, overflow) |

## 3. Above-the-fold checklist (settled state)

| Page x device | Name | Role | Location | Photo | CTA | Nav |
|---|---|---|---|---|---|---|
| / desktop | yes | yes ("AI ENGINEER · FDE", jargon) | NO | NO | yes (Email, LinkedIn, CV) | yes (About, Projects, Email, LinkedIn) |
| / mobile | yes | yes | NO | NO | yes (3 pills, in the fold at y~900-940 of 844? see F3) | MENU button only |
| /about desktop | yes | partial (bio sentence says Computer Engineering senior; no "AI engineer" label) | yes in bio paragraph (Sharjah, UAE) | yes (circular headshot) | no (only nav Email/LinkedIn) | yes |
| /about mobile | yes | partial, bio starts at y~770 and is cut at the fold | partly (bio line is at fold bottom) | yes | NO | MENU only |
| /trend-radar desktop | yes ("Built by Ahmad Saad") | project, not role | no | no | "Source on GitHub" | yes |
| /trend-radar mobile | yes (byline) | no | no | no | Source on GitHub | MENU only |

Horizontal overflow: none on any page (scrollWidth equals clientWidth at 1440 and 390).

## 4. OG image table
All are PNG, 1600x836, about 2.0 MB each. Source: Cloudinary base `grain-gradient_ctrjnp.png` plus two text overlays (72 px bold title, 36 px subtitle), left aligned, bottom-left.

| Page | Dimensions | Bytes | Name visible | Face | Verdict |
|---|---|---|---|---|---|
| / | 1600x836 | 2,004,860 | yes ("Ahmad Saad", subtitle role + AUS + UAE) | no | Readable but 72 px on 1600 is small in a 400 px preview; top 55% is empty gradient |
| /about | 1600x836 | 2,001,763 | yes ("About Ahmad Saad") | no | Same |
| /projects | 1600x836 | 2,011,786 | yes ("Projects by Ahmad Saad") | no | Same |
| /projects/trend-radar | 1600x836 | 2,001,820 | yes (subtitle only, "A project by Ahmad Saad") | no | Topic ok, name is small subtitle |
| /projects/localai | 1600x836 | 2,000,972 | subtitle only | no | Same |
| /projects/mano-computer-simulator | 1600x836 | 2,000,769 | subtitle only | no | Same |
| /projects/lorawan-sensor-node | 1600x836 | 2,001,365 | subtitle only | no | Same |

(Viewed og-home.png directly; the others differ only in the text string per the Cloudinary URL.)

## 5. Findings

### F1. No face photo on the home first screen (High)
Evidence: home-desktop.png and home-mobile.png show only video, name, tagline, pills. The headshot only appears on /about. A recruiter landing on / from a "ahmad saad" search sees no face.
Root cause: hero in features/home/components has no portrait; headshot /ahmad-saad.webp is used only in app/about/page.tsx.
Fix: add a small circular headshot (about 56 px mobile, 88 px desktop, orange ring like /about) next to the eyebrow in the home hero component under apps/website/features/home/components/, using the same image and an alt of "Ahmad Saad, AI engineer".

### F2. Location absent from the home hero (High)
Evidence: eyebrow reads "AI ENGINEER · FDE"; "UAE" and "Sharjah" appear nowhere above the fold on /. "FDE" is unexplained jargon to recruiters.
Fix: change eyebrow to "AI Engineer · Sharjah, UAE" (and keep Forward Deployed in the tagline). File: features/home/components hero (eyebrow string).

### F3. About page mobile: bio and CTA below the fold, ~770 px of chrome before text (Medium)
Evidence: about-mobile.png: breadcrumb, 200 px headshot, ABOUT label, name, badge consume the screen; the bio is cut at the fold; no Email/CV button anywhere on top.
Fix in apps/website/app/about/page.tsx: shrink headshot to about 120 px on mobile, put the badge beside the name, add Email and CV pill buttons right under the name (reuse the home pill component).

### F4. OG images have no face and weak legibility (Medium)
Evidence: og-home.png: tiny 72 px title bottom-left, huge empty gradient, no photo; project OGs show the project name big but "Ahmad Saad" only as a 36 px subtitle.
Root cause: lib/createOgImage.ts only chains two l_text layers on grain-gradient_ctrjnp.png.
Fix: add a layer for the headshot, for example `l_<public_id_of_headshot>,w_360,h_360,c_fill,g_face,r_max,bo_6px_solid_rgb:ff9a5c/fl_layer_apply,g_east,x_100` and raise sizes to title 96 to 110 px, subtitle 44 px. Layout: face circle on the right, name large on the left, role line "AI Engineer · Sharjah, UAE" under it. On project OGs use the project name as the title and "Ahmad Saad, AI Engineer" as a 56 px subtitle, with the face. Also add `f_auto,q_auto` (or q_80) and a JPEG/WebP format: files are about 2 MB, over the roughly 600 KB that some platforms (WhatsApp, LinkedIn) handle reliably. 

### F5. OG image file size about 2 MB (Medium)
Evidence: byte counts above (q_100 PNG, grain noise defeats compression).
Fix: createOgImage.ts: replace `q_100` with `q_auto` and append `.jpg`, target under 300 KB.

### F6. Many 11 px labels (Medium)
Evidence: dom.json: 139 text nodes at 11 px on / (nav, eyebrow, pill text, "Scroll", dt labels, tech chips, dates), 24 on /about, 32 on project page. Body text is 16 to 17 px (ok).
Root cause: mono "label" utility in app/globals.css (and design-system tokens) set to 11 px.
Fix: raise the label size token to 12 px minimum, 13 px for chips and dates, in app/globals.css.

### F7. Small tap targets (Medium)
Evidence: dom.json: "More about me" and "Read the case study" links 18 px tall, footer links (About, Projects, llms.txt, Source) 18 px tall, breadcrumb "Home" 34x14, "Projects" 69x14, "Ahmad Saad" 86x14 on project pages. Hero pills (about 44 px) and MENU are fine.
Fix: add `min-height: 44px; display: inline-flex; align-items: center` to inline text links and footer links, or add vertical padding (py-3) in app/globals.css and components for breadcrumb/footer.

### F8. Hero text is not hidden for crawlers or no-JS visitors (Low, positive)
Evidence: raw HTML has the `<h1 id="hero-name">` with "AHMAD SAAD" in markup; no opacity-0 classes; `.rise` / `.rise-name` use `animation: rise 0.7s ... backwards` (app/globals.css lines 704 to 710, keyframes at 1232 and 1243), so the final state is visible, and the start state only applies while animating. home-desktop-immediate.png shows all text legible at DOMContentLoaded (tagline dimmer only). Reduced motion: `.rise` rules overridden at globals.css line 1532; reduced screenshots are static and fully readable. Static HTML therefore contains the hero text.
Caveat: below-the-fold sections (section-head, prose, ledger rows) compute opacity 0 until scrolled into view (reveal pattern), so a no-scroll DOM snapshot reports them as opacity 0. Ensure the reveal class is applied by JS only, so no-JS and crawlers see them. Verify in features/home/components reveal wrapper.

### F9. Contrast over video (Low)
Evidence: name and tagline are cream on a dark gradient (strong). Mobile top bar "AHMAD SAAD / MENU" at 60% opacity over a grey sky (home-mobile.png) is weak, about 3:1. The eyebrow teal text over the guard-rail strip on mobile also sits on a busier area.
Fix: strengthen the top gradient scrim in the hero overlay (features/home/components hero, or app/globals.css) to about 55% black at the top 160 px, and raise header opacity to 100%.

### F10. Video dominance (Low)
Evidence: on / the road video is bright and visible at right, but the text column is on dark; it does not obscure content. On /about it is dimmed to near-black. Video is decorative; fine.

### F11. Layout shift (Low)
Evidence: immediate vs 3 s captures show the hero text offset downward by about 12 px (tagline y 650 vs 638 in desktop) due to the rise transform only; no reflow, h1 position stays identical. No CLS observed.

## 6. Top 5 fixes by impact over effort
1. Add the headshot to the home hero (F1). High impact, low effort.
2. Change the eyebrow to "AI Engineer · Sharjah, UAE" (F2). High impact, one-line change.
3. Redesign the OG image with a face and larger name, compressed to a JPEG under 300 KB (F4, F5) in lib/createOgImage.ts.
4. Compact the About mobile top section and add Email/CV pills (F3).
5. Raise label font to 12 px and tap targets to 44 px (F6, F7) in app/globals.css.
