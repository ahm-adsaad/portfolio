import type { CSSProperties } from 'react';

/** Sets `--i`, the index the rise and reveal CSS multiplies into a delay. */
export const stagger = (i: number) => ({ '--i': i }) as CSSProperties;
