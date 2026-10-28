import localFont from 'next/font/local';

/**
 * Three self-hosted variable faces (DESIGN.md section 4). The display face
 * blocks instead of swapping so the hero never flashes a fallback; body and
 * mono swap. `font-variation-settings` lives on `.display` / `.display-light`
 * in app/globals.css, not here, because it is inherited and would override
 * `font-weight` on every descendant.
 */
export const fontDisplay = localFont({
  src: '../assets/fonts/bricolage-grotesque-latin-standard.woff2',
  weight: '200 800',
  style: 'normal',
  display: 'block',
  variable: '--font-bricolage',
  declarations: [{ prop: 'font-stretch', value: '75% 100%' }],
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
