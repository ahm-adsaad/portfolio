import type { Project } from '@/config/projects';
import { USER } from '@/config/user';
import { cn } from '@/lib/utils';

type Props = {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** Square cover with its webp twins (from `pnpm images:projects`). */
export function ProjectCover({ project, sizes, priority, className }: Props) {
  if (!project.image) return null;
  const stem = project.image.replace(/\.jpe?g$/i, '');

  return (
    <picture className={cn('stack-cover', className)}>
      <source
        srcSet={`${stem}-320.webp 320w, ${stem}.webp 640w`}
        sizes={sizes}
        type="image/webp"
      />
      <img
        src={project.image}
        alt={`${project.title}, a project by ${USER.name}`}
        width={640}
        height={640}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className="h-full w-full object-cover"
      />
    </picture>
  );
}
