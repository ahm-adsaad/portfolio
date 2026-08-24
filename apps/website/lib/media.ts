import fs from 'node:fs/promises';
import path from 'node:path';

type MediaConfig = {
  quality?: number;
  size?: { width: number; height: number };
};

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.avi', '.mkv', '.ogg'];

export async function generateBlurUrl(
  mediaPath: string,
  config: MediaConfig = { quality: 10, size: { width: 16, height: 16 } }
) {
  try {
    // Skip video files - they can't be processed for blur placeholders
    const extension = path.extname(mediaPath).toLowerCase();
    if (VIDEO_EXTENSIONS.includes(extension)) {
      return null;
    }

    // Handle both local and remote paths
    let buffer: Buffer;

    if (mediaPath.startsWith('http')) {
      const res = await fetch(mediaPath);
      buffer = Buffer.from(await res.arrayBuffer());
    } else {
      // Assuming local paths are relative to public directory
      const fullPath = path.join(process.cwd(), 'public', mediaPath);
      buffer = await fs.readFile(fullPath);
    }

    // plaiceholder (and its sharp native dependency) was dropped to keep the
    // Cloudflare Worker under the size limit — import it lazily so it only
    // loads if a blur placeholder is ever actually requested at build time.
    const { getPlaiceholder } = await import('plaiceholder');
    const { base64: blurDataURL } = await getPlaiceholder(buffer, {
      size: config.size?.width,
    });

    return blurDataURL;
  } catch (error) {
    console.error(`Error generating blur-sm URL for ${mediaPath}:`, error);
    return null;
  }
}
