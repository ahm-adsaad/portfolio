// Fails the build if any prerendered route carries an ISR revalidate interval.
//
// The Worker serves prerendered pages from the read-only static-assets cache
// with no revalidation queue configured. When such a page's interval elapses
// (measured from the build timestamp), OpenNext's cache interceptor tries to
// enqueue a revalidation, the dummy queue throws, and the route 500s for
// every visitor. A single `fetch(..., { next: { revalidate: N } })` in a
// page is enough to opt that page into ISR, so guard the manifest instead of
// hoping nobody adds one. Run after `next build`.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(root, '.next', 'prerender-manifest.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

const isr = Object.entries(manifest.routes ?? {}).filter(
  ([, route]) => route.initialRevalidateSeconds !== false
);

if (isr.length > 0) {
  console.error(
    'Prerendered routes with an ISR revalidate interval (unsupported on this deployment):'
  );
  for (const [route, { initialRevalidateSeconds }] of isr) {
    console.error(`  ${route}  revalidate=${initialRevalidateSeconds}s`);
  }
  console.error(
    'Remove `next: { revalidate }` / `export const revalidate` from the route, or configure a real OpenNext queue and writable incremental cache.'
  );
  process.exit(1);
}

console.log(
  `assert-static-prerender: ${Object.keys(manifest.routes ?? {}).length} prerendered routes, none with ISR.`
);
