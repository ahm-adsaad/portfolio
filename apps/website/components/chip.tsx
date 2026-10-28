import { cn } from '@/lib/utils';

export function Chip({ className, ...props }: React.ComponentProps<'span'>) {
  return <span className={cn('chip', className)} {...props} />;
}
