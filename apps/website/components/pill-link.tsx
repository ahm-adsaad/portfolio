import Link from 'next/link';

import { cn } from '@/lib/utils';

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: 'fill' | 'outline';
  external?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function PillLink({
  href,
  children,
  variant = 'outline',
  external = false,
  className,
  style,
}: Props) {
  const classes = cn(
    'pill',
    variant === 'fill' ? 'pill-fill' : 'pill-outline',
    className
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        style={style}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  if (!href.startsWith('/')) {
    return (
      <a href={href} className={classes} style={style}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} style={style}>
      {children}
    </Link>
  );
}
