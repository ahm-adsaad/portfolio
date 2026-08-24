'use client';

import { DesignSystemProvider } from '@repo/design-system';
import { Provider as JotaiProvider } from 'jotai';

import { SoundProvider } from '@/lib/contexts/sound-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DesignSystemProvider>
      <JotaiProvider>
        <SoundProvider>{children}</SoundProvider>
      </JotaiProvider>
    </DesignSystemProvider>
  );
}
