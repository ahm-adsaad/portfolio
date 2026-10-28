import Link from 'next/link';

import { SOURCE_CODE_GITHUB_URL } from '@/config/site';
import { USER } from '@/config/user';

/** Bone footer: mono ledger row on top, the half-cut wordmark along the bottom. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="section section-tight pb-0" data-tone="bone">
      <div className="mono-label flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-t border-line pt-5 text-fg/72">
        <p className="text-fg/48">
          © {year} {USER.name}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          <li>
            <Link href="/about" className="text-link">
              About
            </Link>
          </li>
          <li>
            <Link href="/projects" className="text-link">
              Projects
            </Link>
          </li>
          <li>
            <a href="/llms.txt" className="text-link">
              llms.txt
            </a>
          </li>
          <li>
            <a
              href={SOURCE_CODE_GITHUB_URL}
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>
          </li>
        </ul>
      </div>

      <div className="mt-12 lg:mt-16">
        <div className="wordmark-clip display" aria-hidden="true">
          {USER.name}
        </div>
      </div>
    </footer>
  );
}
