import Link from 'next/link';

import { cn } from '@/lib/utils';

export type Crumb = {
  label: string;
  /** Omit on the current page. */
  href?: string;
};

/** Mono breadcrumb for the secondary pages; the last item is the current page. */
export function Breadcrumb({
  items,
  className,
  style,
}: {
  items: Crumb[];
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('crumb', className)}
      style={style}
    >
      <ol>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label}>
              {item.href && !last ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current={last ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
