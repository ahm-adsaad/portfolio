'use client';

import { fontDisplay, fontMono, fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import type NextError from 'next/error';

import './globals.css';

type GlobalErrorProperties = {
  readonly error: NextError & { digest?: string };
  readonly reset: () => void;
};

const GlobalError = ({ reset }: GlobalErrorProperties) => {
  return (
    <html
      lang="en"
      className={cn(fontDisplay.variable, fontSans.variable, fontMono.variable)}
    >
      <body>
        <section
          className="section flex min-h-svh flex-col justify-end"
          data-tone="ink"
        >
          <p className="eyebrow">Error</p>
          <h1 className="display hero-size mt-5 text-bone">
            Something
            <br />
            Broke.
          </h1>
          <div className="mt-10">
            <button
              type="button"
              className="pill pill-fill"
              onClick={() => reset()}
            >
              Try again
            </button>
          </div>
        </section>
      </body>
    </html>
  );
};

export default GlobalError;
