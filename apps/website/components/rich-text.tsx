import Link from 'next/link';
import type { ReactNode } from 'react';

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * Renders a config string with inline `[label](href)` links. Internal links
 * ("/..." or "#...") go through next/link. External links open in a new tab
 * with rel="noopener noreferrer" and stay followed, with no UTM parameters:
 * the shared Markdown component adds nofollow and UTM, which citations to
 * aus.edu must not carry.
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
    const internal = href.startsWith('/') || href.startsWith('#');
    parts.push(
      internal ? (
        <Link key={start} href={href} className={linkClassName}>
          {label}
        </Link>
      ) : (
        <a
          key={start}
          href={href}
          className={linkClassName}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      )
    );
    last = start + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

/** The same string with the link markup removed (for schema or text files). */
export const plainText = (text: string) => text.replace(LINK, '$1');
