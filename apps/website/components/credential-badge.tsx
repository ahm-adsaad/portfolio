import type { Certification } from '@/config/education';
import { cn } from '@/lib/utils';

/**
 * A typographic credential stamp: apricot ring, a check glyph, the credential
 * name in mono 500 and the issuer below it. No vendor artwork is used, so it
 * stays inside the site's own system. Links out when a verification URL is
 * set in config/education.ts.
 */
export function CredentialBadge({
  credential,
  className,
}: {
  credential: Certification;
  className?: string;
}) {
  const body = (
    <>
      <span className="credential-mark" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
          <path
            d="M3.5 8.5l3 3 6-7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="credential-text">
        <span className="credential-name">{credential.name}</span>
        <span className="credential-issuer">
          {credential.issuer}
          {credential.year ? ` · ${credential.year}` : ''}
        </span>
      </span>
    </>
  );

  if (credential.url) {
    return (
      <a
        href={credential.url}
        className={cn('credential', 'credential-link', className)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {body}
      </a>
    );
  }

  return <span className={cn('credential', className)}>{body}</span>;
}
