'use client';

import { Collapsible as CollapsiblePrimitive } from 'radix-ui';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { cn } from '@repo/design-system/lib/utils';
import type { ChevronsDownUpIconHandle } from '../animated-icons/chevrons-down-up-icon';
import { ChevronsDownUpIcon } from '../animated-icons/chevrons-down-up-icon';

function Collapsible(
  props: React.ComponentProps<typeof CollapsiblePrimitive.Root>
) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger(
  props: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>
) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

function CollapsibleContent(
  props: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>
) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  );
}

type CollapsibleContextType = {
  open: boolean;
};

const CollapsibleContext = createContext<CollapsibleContextType | null>(null);

const useCollapsible = () => {
  const context = useContext(CollapsibleContext);

  if (!context) {
    throw new Error(
      'Collapsible components must be used within a CollapsibleWithContext'
    );
  }

  return context;
};

function CollapsibleWithContext({
  defaultOpen,
  ...props
}: React.ComponentProps<typeof Collapsible>) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <CollapsibleContext.Provider value={{ open }}>
      <Collapsible open={open} onOpenChange={setOpen} {...props} />
    </CollapsibleContext.Provider>
  );
}

/**
 * Always-mounted panel driven by `CollapsibleWithContext`.
 *
 * Radix `CollapsibleContent` drops its children from the tree while closed
 * (even with `forceMount`), so collapsed text never reaches the server-rendered
 * HTML. This panel keeps the children in the DOM for crawlers and AI agents and
 * collapses visually with a CSS grid-rows transition; `inert` keeps the hidden
 * links out of the tab order.
 */
function CollapsibleStaticContent({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  const { open } = useCollapsible();

  return (
    <div
      data-slot="collapsible-static-content"
      data-state={open ? 'open' : 'closed'}
      inert={!open}
      className={cn(
        'grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none',
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        className
      )}
      {...props}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

function CollapsibleChevronsIcon() {
  const { open } = useCollapsible();

  const ref = useRef<ChevronsDownUpIconHandle>(null);

  useEffect(() => {
    const controls = ref.current;
    if (!controls) return;

    if (open) {
      controls.startAnimation();
    } else {
      controls.stopAnimation();
    }
  }, [open]);

  return <ChevronsDownUpIcon ref={ref} />;
}

export {
  Collapsible,
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleStaticContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
  useCollapsible,
};
