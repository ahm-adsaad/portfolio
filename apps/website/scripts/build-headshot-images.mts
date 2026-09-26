/**
 * Builds the served headshot files from the source PNG in assets/headshot:
 *   public/ahmad-saad.jpg       full-size square JPEG (Person.image, sitemap)
 *   public/ahmad-saad.webp      640px (2x DPR for the /about portrait)
 *   public/ahmad-saad-320.webp  320px (the small avatars)
 * The PNG stays out of public/ so it is never served. Run
 * `pnpm images:headshot` after replacing it and commit the outputs.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const source = path.join(process.cwd(), 'assets/headshot/ahmad-saad.png');
const out = path.join(process.cwd(), 'public');

const { width = 0, height = 0 } = await sharp(source).metadata();
const side = Math.min(width, height);

const targets: { file: string; build: () => sharp.Sharp }[] = [
  {
    file: 'ahmad-saad.jpg',
    build: () =>
      sharp(source)
        .resize(side, side, { fit: 'cover' })
        .jpeg({ quality: 85, mozjpeg: true }),
  },
  {
    file: 'ahmad-saad.webp',
    build: () =>
      sharp(source)
        .resize(640, 640, { fit: 'cover', withoutEnlargement: true })
        .webp({ quality: 80 }),
  },
  {
    file: 'ahmad-saad-320.webp',
    build: () =>
      sharp(source)
        .resize(320, 320, { fit: 'cover', withoutEnlargement: true })
        .webp({ quality: 80 }),
  },
];

for (const { file, build } of targets) {
  const target = path.join(out, file);
  const info = await build().toFile(target);
  const { size: bytes } = await fs.stat(target);
  console.log(
    `${file}: ${info.width}x${info.height} (${Math.round(bytes / 1024)} KB)`
  );
}
