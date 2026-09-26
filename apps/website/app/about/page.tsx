import { Headshot } from '@/components/headshot';
import { FloatingHeader } from '@/components/navigation/floating-header';
import { ScrollArea } from '@/components/scroll-area';
import { Section } from '@/components/section';
import Separator from '@/components/separator';
import { ShootingStarsLayer } from '@/components/ui/shooting-stars-layer';
import { ABOUT_INTRO, ABOUT_SECTIONS } from '@/config/about';
import { USER } from '@/config/user';
import { createOgImage } from '@/lib/createOgImage';
import { JsonLd } from '@/lib/seo/json-ld';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/server-url';
import Link from 'next/link';
import type { Metadata } from 'next/types';
import type { Graph } from 'schema-dts';

export const dynamic = 'force-static';

const PATH = '/about';
const TITLE = `About ${USER.name} | Computer & AI Engineer`;
const DESCRIPTION =
  'Ahmad Saad is a Computer Engineering senior at AUS and an AI engineer in the UAE. Golden Visa holder, available to start January 2027.';

export function generateMetadata(): Metadata {
  return createMetadata({
    title: TITLE,
    absoluteTitle: true,
    description: DESCRIPTION,
    path: PATH,
    image: createOgImage({
      title: `About ${USER.name}`,
      meta: 'Computer & AI Engineer · UAE',
    }),
  });
}

const jsonLd: Graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${SITE_URL}${PATH}#page`,
      url: `${SITE_URL}${PATH}`,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: 'en-US',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@id': `${SITE_URL}/#person` },
      about: { '@id': `${SITE_URL}/#person` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        '@id': `${SITE_URL}/#headshot`,
        url: USER.image.profile,
        width: String(USER.image.width),
        height: String(USER.image.height),
        caption: USER.name,
      },
      breadcrumb: { '@id': `${SITE_URL}${PATH}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}${PATH}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About',
          item: `${SITE_URL}${PATH}`,
        },
      ],
    },
  ],
};

const linkClass =
  'font-medium text-foreground underline underline-offset-4 hover:text-foreground/80';

export default function AboutPage() {
  return (
    <>
      <JsonLd code={jsonLd} />
      <ShootingStarsLayer />

      <ScrollArea useScrollAreaId className="relative z-10">
        <FloatingHeader scrollTitle={`About ${USER.name}`} />

        <Separator />

        <Section>
          <nav
            aria-label="Breadcrumb"
            className="mb-6 font-mono text-xs tracking-wider text-muted-foreground uppercase"
          >
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span aria-current="page">About</span>
          </nav>

          <div className="flex items-center gap-4">
            <Headshot size={96} />
            <div className="space-y-1">
              <h1 className="font-semibold text-2xl">About {USER.name}</h1>
              <p className="font-mono text-sm tracking-wider text-muted-foreground uppercase">
                Computer &amp; AI Engineer · UAE
              </p>
            </div>
          </div>

          <p className="mt-6 text-foreground/70 leading-relaxed">
            {ABOUT_INTRO}
          </p>
        </Section>

        {ABOUT_SECTIONS.map((section) => (
          <div key={section.heading}>
            <Separator />
            <Section>
              <div className="space-y-4">
                <h2 className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
                  {section.heading}
                </h2>
                <div className="space-y-3 text-foreground/70">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Section>
          </div>
        ))}

        <Separator />

        <Section>
          <div className="space-y-2 text-center">
            <p className="text-foreground/70 leading-relaxed">
              Back to the{' '}
              <Link href="/" className={linkClass}>
                homepage
              </Link>
              .
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Reach me at{' '}
              <a href={`mailto:${USER.email}`} className={linkClass}>
                {USER.email}
              </a>{' '}
              or on{' '}
              <a
                href={USER.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
        </Section>

        <Separator />
        <div className="h-[clamp(80px,10vh,200px)] shrink-0" />
      </ScrollArea>
    </>
  );
}
