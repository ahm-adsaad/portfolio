'use client';

import { DesignSystemProvider } from '@repo/design-system';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Provider as JotaiProvider } from 'jotai';

import { SoundProvider } from '@/lib/contexts/sound-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DesignSystemProvider>
      <JotaiProvider>
        <SoundProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </SoundProvider>
      </JotaiProvider>
    </DesignSystemProvider>
  );
}
