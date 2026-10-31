import { createOgImage } from '@/lib/createOgImage';
import { fontDisplay, fontMono, fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import type React from 'react';

import './globals.css';

import { Grain } from '@/components/grain';
import { Reveal } from '@/components/reveal';
import { ScrollProgress } from '@/components/scroll-progress';
import { SiteFooter } from '@/components/site-footer';
import { SiteNav } from '@/components/site-nav';
import { USER } from '@/config/user';
import Script from 'next/script';

export const viewport: Viewport = {
  themeColor: '#0E0C14',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export function generateMetadata(): Metadata {
  return {
    title: { template: `%s | ${USER.name}`, default: `${USER.name}` },
    metadataBase: new URL(`https://${USER.domain}`),
    openGraph: {
      title: USER.name,
      siteName: USER.name,
      type: 'website',
      url: `https://${USER.domain}`,
      images: [
        {
          url: createOgImage({ title: USER.name, meta: USER.tagline }),
          width: 1600,
          height: 836,
          alt: USER.name,
        },
      ],
    },
    twitter: {
      creator: USER.twitterHandle,
      card: 'summary_large_image',
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(fontDisplay.variable, fontSans.variable, fontMono.variable)}
      suppressHydrationWarning
    >
      <head>
        {/* next/font emits no preloads on this build (its font manifest is empty),
            so the hero waited on fonts found only after the CSS. These are content
            hashes of assets/fonts/*.woff2 (bricolage-display 800, bricolage-display
            light 300, instrument-sans); they change only if a font file changes,
            and Task 12 of the 2026-10-30 plan checks they resolve. */}
        <link
          rel="preload"
          href="/_next/static/media/3b9a2d35ca5574c2-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/81982458c8f63afe-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/ae05c57c271ebcb0-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Cloudflare Web Analytics injects its beacon at the edge; warm the
            connection so it stays off the LCP critical path. */}
        <link rel="preconnect" href="https://static.cloudflareinsights.com" />
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
        {/* Marks the document as scripted before first paint so `[data-reveal]`
            elements already in view do not flash visible, then hidden, then
            fade in once components/reveal.tsx hydrates. */}
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.classList.add("js")',
          }}
        />
      </head>
      <body>
        <ScrollProgress />
        <SiteNav />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <Grain />
        <Reveal />
        {/* Umami is only wired up when its website id is configured; otherwise
            the tag would 404 on every page load. */}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ? (
          <Script
            defer
            strategy="lazyOnload"
            src="/stats/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        ) : null}
      </body>
    </html>
  );
}
