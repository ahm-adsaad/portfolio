/**
 * Windows-only guard for OpenNext builds.
 *
 * pnpm creates `node_modules/next` as a directory *junction* on Windows, whose
 * target is an absolute path into the pnpm store. OpenNext copies that link
 * verbatim into `.open-next/server-functions/...`, so esbuild follows it back
 * to the real, UNPATCHED `next-server.js` instead of the patched copy inside
 * `.open-next`. The deployed Worker then throws
 * `Dynamic require of "/.next/server/middleware-manifest.json"` on every
 * runtime render (404s, un-cached routes).
 *
 * A symlink with a *relative* target resolves inside the copied tree, so the
 * patched Next is bundled. This script swaps the junction for such a symlink.
 * It is a no-op on non-Windows platforms and when the link is already relative.
 */
import { existsSync, lstatSync, readlinkSync, realpathSync, rmSync, symlinkSync } from 'node:fs';
import { dirname, isAbsolute, join, relative } from 'node:path';

if (process.platform === 'win32') {
  const link = join(process.cwd(), 'node_modules', 'next');

  if (existsSync(link) && lstatSync(link).isSymbolicLink()) {
    const target = readlinkSync(link);

    if (isAbsolute(target)) {
      const real = realpathSync(link);
      const relTarget = relative(dirname(link), real);
      rmSync(link, { recursive: false, force: true });
      symlinkSync(relTarget, link, 'dir');
      console.log(`node_modules/next: junction replaced with relative symlink -> ${relTarget}`);
    }
  }
}
