import { cn } from '@/lib/utils';

type Props = {
  eyebrow: string;
  /** Real data about the section, never decoration (DESIGN.md section 5). */
  value?: string;
  as?: 'h2' | 'p';
  id?: string;
  className?: string;
};

/** The ledger row every section opens with: EYEBROW left, measured value right. */
export function SectionHeader({
  eyebrow,
  value,
  as = 'h2',
  id,
  className,
}: Props) {
  const Eyebrow = as;

  return (
    <div className={cn('section-head', className)} data-reveal>
      <Eyebrow id={id} className="eyebrow">
        {eyebrow}
      </Eyebrow>
      {value ? <p className="section-head-value">{value}</p> : null}
    </div>
  );
}
