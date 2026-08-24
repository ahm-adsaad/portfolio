import { TECH_STACK } from '@/config/tech-stack';
import { Tag } from '@repo/design-system/components/ui/tag';

export function TechStack() {
  return (
    <div className="space-y-6">
      <h2 className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
        Tech Stack
      </h2>

      <div className="space-y-5">
        {TECH_STACK.map((group) => (
          <div key={group.title} className="space-y-2">
            <h3 className="text-sm font-medium text-foreground">
              {group.title}
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item} className="flex">
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
