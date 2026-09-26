import { USER } from '@/config/user';
import { cn } from '@/lib/utils';

/**
 * The owner's headshot, served from this domain so image search can attribute
 * it. Files come from `pnpm images:headshot`. Small and fixed-size on purpose:
 * the hero text stays the LCP element and the box never shifts layout.
 */
export function Headshot({
  size,
  className,
}: {
  /** Rendered CSS pixel size of the square. */
  size: number;
  className?: string;
}) {
  return (
    <picture className="shrink-0">
      <source
        srcSet="/ahmad-saad-320.webp 320w, /ahmad-saad.webp 640w"
        sizes={`${size}px`}
        type="image/webp"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/ahmad-saad.jpg"
        alt={USER.name}
        width={size}
        height={size}
        decoding="async"
        className={cn(
          'select-none rounded-full bg-muted object-cover ring-1 ring-border ring-offset-2 ring-offset-background',
          className
        )}
        style={{ width: size, height: size }}
      />
    </picture>
  );
}
