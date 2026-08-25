# Images — ahmadsaad.dev (audited 2026-08-24)

**Score: 58 / 100**

## What works
- All 5 images have descriptive alt text ("Trend Radar cover", "LocalAI cover", "Mano Basic Computer Simulator cover", "Energy Harvesting LoRaWAN Sensor Node cover", "ahmadsaad.dev cover").
- Reasonable source sizes (591–1080 px square) — nothing absurdly oversized.
- Images are served same-origin from Cloudflare's edge.

## Inventory (verified by download)

| File | Dimensions | Bytes | WebP q80 (est.) | Saving |
|---|---|---|---|---|
| /projects/trend-radar.jpg | 1080×1080 | 88 KB | ~35 KB | 61% |
| /projects/localai.jpg | 1024×1024 | 85 KB | ~68 KB | 20% |
| /projects/mano-computer-simulator.jpg | 640×640 | 74 KB | ~45 KB | 40% |
| /projects/lorawan-sensor-node.jpg | 591×586 | 84 KB | ~36 KB | 57% |
| /projects/portfolio.jpg | 640×640 | 55 KB | ~25 KB | 55% |
| **Total** | | **386 KB** | **~209 KB** | **~46%** |

## Findings

| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| Medium | No `width`/`height` (or CSS aspect-ratio) on any `<img>` → CLS risk inside the carousel | `<img src="/projects/trend-radar.jpg" alt="…" draggable="false" class="h-full w-full select-none object-cover"/>` — no intrinsic size attributes, no `srcset` | Use `next/image` (`<Image src fill sizes="(max-width: 768px) 80vw, 420px" />` inside a container with a fixed aspect ratio) or add explicit `width`/`height` + `aspect-square` on the wrapper |
| Medium | All 5 images eagerly `<link rel="preload" as="image">` in `<head>` | Five preloads compete with fonts/CSS for bandwidth during the critical window although only one slide is visible at a time and the carousel is below the fold | Preload only the first/active slide (`priority` on one `next/image`), `loading="lazy"` on the rest |
| Medium | JPEG only; no WebP/AVIF, no responsive variants | `/_next/image?…` with `Accept: image/webp` returns `image/jpeg` (image optimizer not active on OpenNext/Cloudflare) | Either pre-convert to WebP at build time (`sharp` script, keep JPEG fallback via `<picture>`), or enable Cloudflare Images / the OpenNext image loader so `next/image` can serve WebP with `srcset` |
| Low | Square 1080px sources for a card displayed at ~300–420px | Serving 2.5× the needed pixels on mobile | Generate 400/800px variants (or let `next/image` do it) |
| Info | No image sitemap / structured-data `image` on projects | Only relevant if project pages ever exist | Add `image` to the Person / CreativeWork schema (see schema findings) |

## Falsifiability / leading indicator
- After the fix, the carousel's largest image request on mobile should be < 40 KB and CLS in lab runs should stay ≤ 0.1 with the carousel in view.
- Lighthouse "Properly size images" / "Serve images in next-gen formats" / "Image elements do not have explicit width and height" audits should pass.
