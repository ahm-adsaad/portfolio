import { Breadcrumb } from '@/components/breadcrumb';
import { PROJECT_PAGES, PROJECTS } from '@/config/projects';
import { CONTENT_LAST_MODIFIED } from '@/config/site';
import { USER } from '@/config/user';
import { ProjectStack } from '@/features/home/components/project-stack';
import { createOgImage } from '@/lib/createOgImage';
import { JsonLd } from '@/lib/seo/json-ld';
import { createMetadata } from '@/lib/seo/metadata';
import {
  personStub,
  projectSchema,
  projectSchemaId,
  websiteStub,
} from '@/lib/seo/project-schema';
import { SITE_URL } from '@/lib/server-url';
import { stagger } from '@/lib/stagger';
import type { Metadata } from 'next/types';
import type { Graph } from 'schema-dts';

export const dynamic = 'force-static';

const PATH = '/projects';
const TITLE = `Projects by ${USER.name}`;
const DESCRIPTION =
  'Case studies by Ahmad Saad: a production trend-detection platform, on-device RAG in the browser, a CPU simulator, and an energy harvesting sensor node.';

export function generateMetadata(): Metadata {
  return createMetadata({
    title: TITLE,
    absoluteTitle: true,
    description: DESCRIPTION,
    path: PATH,
    image: createOgImage({
      title: TITLE,
      meta: 'AI systems, embedded hardware, and computer architecture',
    }),
  });
}

const jsonLd: Graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}${PATH}#page`,
      url: `${SITE_URL}${PATH}`,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: 'en-US',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      author: { '@id': `${SITE_URL}/#person` },
      hasPart: PROJECT_PAGES.map((project) => ({
        '@id': projectSchemaId(project),
      })),
      breadcrumb: { '@id': `${SITE_URL}${PATH}#breadcrumb` },
      dateModified: CONTENT_LAST_MODIFIED,
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
          name: 'Projects',
          item: `${SITE_URL}${PATH}`,
        },
      ],
    },
    ...PROJECT_PAGES.flatMap((project) => projectSchema(project) ?? []),
    personStub(),
    websiteStub(),
  ],
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd code={jsonLd} />

      <section
        className="section page-hero"
        data-tone="ink"
        aria-labelledby="projects-name"
      >
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'Projects' }]}
          className="rise"
          style={stagger(0)}
        />

        <div className="grid-12 mt-10 md:mt-14">
          <div className="col-span-12 lg:col-span-5">
            <p className="eyebrow rise" style={stagger(1)}>
              AI systems, embedded hardware, and computer architecture
            </p>
            <h1 id="projects-name" className="mt-4 text-bone">
              <span
                className="display h2-size block rise-name"
                style={stagger(2)}
              >
                Projects
              </span>{' '}
              <span
                className="display-light counter-size rise mt-3 block text-bone/88"
                style={stagger(3)}
              >
                by {USER.name}
              </span>
            </h1>
          </div>

          <div className="col-span-12 mt-8 lg:col-span-7 lg:mt-0 lg:self-end">
            <p
              className="display-light intro-size rise max-w-[40ch] text-bone/88"
              style={stagger(4)}
            >
              Case studies by Ahmad Saad, an AI engineer and Computer
              Engineering senior at the American University of Sharjah: two AI
              systems, Trend Radar and LocalAI, and two hardware and
              architecture builds, a Mano Basic Computer simulator and an energy
              harvesting LoRaWAN sensor node.
            </p>
          </div>
        </div>
      </section>

      <ProjectStack projects={PROJECTS} />
    </>
  );
}
