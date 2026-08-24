import Link from 'next/link';
import { ArrowUpRightIcon, GraduationCapIcon } from 'lucide-react';

import { EDUCATION } from '@/config/education';
import { Tag } from '@repo/design-system/components/ui/tag';

export function Education() {
  return (
    <div className="space-y-6">
      <h2 className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
        Education
      </h2>

      <div className="flex items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <GraduationCapIcon className="size-5" />
        </div>

        <div className="flex-1 space-y-2 pt-1">
          <div className="flex items-center gap-1">
            <h3 className="font-medium text-foreground">{EDUCATION.school}</h3>
            <Link
              href={EDUCATION.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${EDUCATION.school} website`}
              className="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ArrowUpRightIcon className="size-4" />
            </Link>
          </div>

          <p className="text-sm text-foreground/60 leading-relaxed">
            {EDUCATION.degree} · {EDUCATION.period} · GPA {EDUCATION.gpa}
          </p>

          <ul className="space-y-1 text-sm text-foreground/60 leading-relaxed">
            {EDUCATION.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {EDUCATION.coursework.map((course) => (
              <Tag key={course}>{course}</Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
