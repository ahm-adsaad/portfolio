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

// Routes that must be prerendered. A page that silently turns dynamic (or is
// deleted) is simply absent from the manifest, which the ISR check above
// cannot see. Update this list when a page is added or removed.
const EXPECTED_ROUTES = [
  '/',
  '/about',
  '/aus',
  '/cv',
  '/projects',
  '/projects/trend-radar',
  '/projects/localai',
  '/projects/mano-computer-simulator',
  '/projects/lorawan-sensor-node',
  '/sitemap.xml',
  '/robots.txt',
  '/llms.txt',
  '/llms-full.txt',
  '/me/about.md',
  '/me/experience.md',
  '/me/projects.md',
];
const missing = EXPECTED_ROUTES.filter(
  (route) => !(route in (manifest.routes ?? {}))
);
if (missing.length > 0) {
  console.error('Expected prerendered routes are missing from the manifest:');
  for (const route of missing) console.error(`  ${route}`);
  console.error(
    'A page went dynamic or was removed. Restore force-static, or update EXPECTED_ROUTES.'
  );
  process.exit(1);
}

console.log(
  `assert-static-prerender: ${Object.keys(manifest.routes ?? {}).length} prerendered routes, none with ISR, all ${EXPECTED_ROUTES.length} expected routes present.`
);
