/**
 * Writes WebP variants next to every JPEG in public/projects:
 *   <name>.webp      640px (2x DPR for the <= 260 CSS px carousel card)
 *   <name>-320.webp  320px (1x DPR)
 * Run `pnpm images:projects` after adding or replacing a cover and commit
 * the .webp files alongside the .jpg.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const VARIANTS: { size: number; suffix: string }[] = [
  { size: 640, suffix: '' },
  { size: 320, suffix: '-320' },
];
const dir = path.join(process.cwd(), 'public/projects');

const files = (await fs.readdir(dir)).filter((file) => /\.jpe?g$/i.test(file));

for (const file of files) {
  const source = path.join(dir, file);
  const stem = file.replace(/\.jpe?g$/i, '');

  for (const { size, suffix } of VARIANTS) {
    const target = path.join(dir, `${stem}${suffix}.webp`);

    await sharp(source)
      .resize(size, size, { fit: 'cover', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(target);

    const { size: bytes } = await fs.stat(target);
    console.log(`${file} -> ${path.basename(target)} (${Math.round(bytes / 1024)} KB)`);
  }
}
