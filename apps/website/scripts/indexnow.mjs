// Submits every URL in the sitemap to IndexNow (Bing, Yandex, Seznam, Naver,
// Yep). Google does not use IndexNow. Run after a production deploy:
//   pnpm indexnow                      fetch the live sitemap and submit
//   pnpm indexnow --dry-run            print the payload, send nothing
//   pnpm indexnow --dry-run --sitemap .next/server/app/sitemap.xml.body
// Responses: 200 or 202 accepted; 403 key file missing or wrong; 422 a URL
// is not on this host; 429 too many requests.
import { readFile } from 'node:fs/promises';

const HOST = 'ahmadsaad.dev';
const KEY = 'b9f504812ee878b00a15106b08a1f9e1';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const sitemapAt = args.indexOf('--sitemap');
const sitemap =
  sitemapAt >= 0 ? args[sitemapAt + 1] : `https://${HOST}/sitemap.xml`;

async function load(source) {
  if (/^https?:\/\//.test(source)) {
    const res = await fetch(source);
    if (!res.ok) throw new Error(`${source}: HTTP ${res.status}`);
    return res.text();
  }
  return readFile(source, 'utf8');
}

const xml = await load(sitemap);
// `<loc>` only: image entries use `<image:loc>`, which this does not match.
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].trim())
  .filter((url) => new URL(url).host === HOST);
if (urlList.length === 0) {
  console.error(`indexnow: no ${HOST} URLs in ${sitemap}`);
  process.exit(1);
}

const payload = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };
console.log(`indexnow: ${urlList.length} URLs from ${sitemap}`);
for (const url of urlList) console.log(`  ${url}`);

if (dryRun) {
  console.log(JSON.stringify(payload, null, 2));
  console.log('indexnow: dry run, nothing sent');
  process.exit(0);
}

// The key file must be live first, or IndexNow answers 403.
const keyRes = await fetch(KEY_LOCATION);
const keyBody = (await keyRes.text()).trim();
if (!keyRes.ok || keyBody !== KEY) {
  console.error(
    `indexnow: ${KEY_LOCATION} returned ${keyRes.status} without the key; deploy first`
  );
  process.exit(1);
}

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});
console.log(`indexnow: HTTP ${res.status} ${res.statusText}`);
process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
