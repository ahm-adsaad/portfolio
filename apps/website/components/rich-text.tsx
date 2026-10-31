import Link from 'next/link';
import type { ReactNode } from 'react';

// The href may contain one level of parentheses (Wikipedia-style URLs).
const LINK = /\[([^\]]+)\]\(((?:[^()\s]|\([^()\s]*\))+)\)/g;

/** A path that ends in a file extension (/x.pdf, /llms.txt): not an app route. */
const FILE_PATH = /\.[a-z0-9]+(?:[?#].*)?$/i;

/**
 * Renders a config string with inline `[label](href)` links. App routes
 * ("/..." or "#...", not files) go through next/link. Web links open in a
 * new tab with rel="noopener noreferrer" and stay followed, with no UTM
 * parameters: the shared Markdown component adds nofollow and UTM, which
 * citations to aus.edu must not carry. Anything else (mailto:, tel:, a file
 * under /public) is a plain anchor in the same tab.
 */
export function RichText({
  text,
  linkClassName,
}: {
  text: string;
  linkClassName?: string;
}) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    const start = match.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    const internal =
      href.startsWith('#') ||
      (href.startsWith('/') &&
        !href.startsWith('//') &&
        !FILE_PATH.test(href));
    const web = /^https?:\/\//.test(href);
    parts.push(
      internal ? (
        <Link key={start} href={href} className={linkClassName}>
          {label}
        </Link>
      ) : web ? (
        <a
          key={start}
          href={href}
          className={linkClassName}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      ) : (
        <a key={start} href={href} className={linkClassName}>
          {label}
        </a>
      )
    );
    last = start + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
