import localFont from 'next/font/local';

/**
 * Three self-hosted faces (DESIGN.md section 4). The display face is two
 * static instances baked out of the variable Bricolage Grotesque by
 * `pnpm fonts:display` (wght 800 / wdth 75 / opsz 96 and wght 300 / wdth 100 /
 * opsz 96, Latin subset), so the hero text waits on ~18 KiB instead of the
 * 129 KiB variable file. It blocks instead of swapping so the hero never
 * flashes a fallback; body and mono swap. `.display` / `.display-light` in
 * app/globals.css pick the instance through `font-weight` alone.
 */
export const fontDisplay = localFont({
  src: [
    {
      path: '../assets/fonts/bricolage-display.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../assets/fonts/bricolage-display-light.woff2',
      weight: '300',
      style: 'normal',
    },
  ],
  display: 'block',
  variable: '--font-bricolage',
});

export const fontSans = localFont({
  src: '../assets/fonts/instrument-sans-latin-wght.woff2',
  weight: '400 700',
  style: 'normal',
  display: 'swap',
  variable: '--font-instrument',
});

export const fontMono = localFont({
  src: '../assets/fonts/geist-mono-latin-wght.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-geist-mono',
});
