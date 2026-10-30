/**
 * Encodes the About hero background loop from the source clip in
 * assets/video/ into the sizes the page serves from public/about/:
 *
 *   drive-1080.mp4   H.264, 1920 wide, CRF 28, no audio   (tablet and up)
 *   drive-720.mp4    H.264, 1280 wide, CRF 30, no audio   (phones)
 *   drive-poster.jpg frame at POSTER_AT seconds, 1920 wide (painted before JS)
 *   drive-poster.webp same frame as WebP
 *
 * Usage: pnpm video:about [path/to/source.mp4]
 * Defaults to the first .mp4 or .mov in assets/video/. Needs ffmpeg on PATH.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = path.join(root, 'assets', 'video');
const outDir = path.join(root, 'public', 'about');
/* Poster timestamp: the first frame has the car half out of shot. */
const POSTER_AT = '1.5';

function pickSource(): string {
  const arg = process.argv[2];
  if (arg) return path.resolve(arg);
  if (!existsSync(assetsDir)) {
    throw new Error(`No source given and ${assetsDir} does not exist.`);
  }
  const candidate = readdirSync(assetsDir).find((f) =>
    /\.(mp4|mov|webm)$/i.test(f)
  );
  if (!candidate) throw new Error(`No video file found in ${assetsDir}.`);
  return path.join(assetsDir, candidate);
}

function run(args: string[]) {
  execFileSync(
    'ffmpeg',
    ['-hide_banner', '-loglevel', 'error', '-y', ...args],
    {
      stdio: 'inherit',
    }
  );
}

const source = pickSource();
mkdirSync(outDir, { recursive: true });

// Shared H.264 settings: faststart so playback begins before the download
// ends, yuv420p for Safari, even dimensions, no audio track at all.
const h264 = (width: number, crf: number, out: string) =>
  run([
    '-i',
    source,
    '-an',
    '-vf',
    `scale=${width}:-2:flags=lanczos`,
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    String(crf),
    '-pix_fmt',
    'yuv420p',
    '-profile:v',
    'high',
    '-level',
    '4.1',
    '-movflags',
    '+faststart',
    out,
  ]);

h264(1920, 28, path.join(outDir, 'drive-1080.mp4'));
h264(1280, 30, path.join(outDir, 'drive-720.mp4'));

run([
  '-ss',
  POSTER_AT,
  '-i',
  source,
  '-frames:v',
  '1',
  '-vf',
  'scale=1920:-2:flags=lanczos',
  '-q:v',
  '4',
  path.join(outDir, 'drive-poster.jpg'),
]);
run([
  '-ss',
  POSTER_AT,
  '-i',
  source,
  '-frames:v',
  '1',
  '-vf',
  'scale=1920:-2:flags=lanczos',
  '-quality',
  '82',
  path.join(outDir, 'drive-poster.webp'),
]);

for (const f of [
  'drive-1080.mp4',
  'drive-720.mp4',
  'drive-poster.jpg',
  'drive-poster.webp',
]) {
  const size = statSync(path.join(outDir, f)).size;
  console.log(`${f.padEnd(18)} ${(size / 1024).toFixed(0).padStart(6)} KiB`);
}
