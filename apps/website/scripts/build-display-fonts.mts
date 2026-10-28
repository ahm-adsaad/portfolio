import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

/**
 * Bakes the two display voices (DESIGN.md section 4) out of the variable
 * Bricolage Grotesque into static woff2 instances. The site only ever uses
 * two points on the wght/wdth/opsz design space, so shipping the full
 * variable file (129 KiB) just to render them delayed the LCP text.
 *
 *   pnpm --filter website fonts:display
 */
const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const source = require.resolve(
  '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-standard-normal.woff2'
);
const outDir = path.join(here, '../assets/fonts');

/** Basic Latin, Latin-1 Supplement, the dashes and quotes, ellipsis, bullet. */
const ranges: [number, number][] = [
  [0x0020, 0x007e],
  [0x00a0, 0x00ff],
  [0x2013, 0x2014],
  [0x2018, 0x201d],
  [0x2026, 0x2026],
  [0x2022, 0x2022],
];
const text = ranges
  .flatMap(([from, to]) =>
    Array.from({ length: to - from + 1 }, (_, i) =>
      String.fromCodePoint(from + i)
    )
  )
  .join('');

const instances = [
  { file: 'bricolage-display.woff2', wght: 800, wdth: 75, opsz: 96 },
  { file: 'bricolage-display-light.woff2', wght: 300, wdth: 100, opsz: 96 },
];

const input = await readFile(source);
await mkdir(outDir, { recursive: true });

for (const { file, ...axes } of instances) {
  const out = await subsetFont(input, text, {
    targetFormat: 'woff2',
    variationAxes: axes,
  });
  await writeFile(path.join(outDir, file), out);
  console.log(
    `${file}  ${(out.byteLength / 1024).toFixed(1)} KiB  (wght ${axes.wght}, wdth ${axes.wdth}, opsz ${axes.opsz}, ${text.length} glyphs requested)`
  );
}
