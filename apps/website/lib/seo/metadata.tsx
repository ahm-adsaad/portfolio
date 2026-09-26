import merge from 'lodash.merge';
import type { Metadata } from 'next';

type MetadataGenerator = Omit<Metadata, 'description' | 'title'> & {
  title: string;
  description: string;
  image?: string;
  /**
   * Route path for the canonical URL and og:url (e.g. '/about'). Every page
   * other than the homepage must pass its own path, or it canonicalises to '/'.
   */
  path?: string;
  /** Use `title` verbatim instead of appending "| Ahmad Saad". */
  absoluteTitle?: boolean;
};

const applicationName = 'Ahmad Saad';
const author: Metadata['authors'] = {
  name: 'Ahmad Saad',
  url: 'https://ahmadsaad.dev/',
};
const publisher = 'Ahmad Saad';
const twitterHandle = '';
const productionUrl = 'https://ahmadsaad.dev/';

/** `createOgImage` renders a 1600x836 canvas (see lib/createOgImage.ts). */
const OG_IMAGE_WIDTH = 1600;
const OG_IMAGE_HEIGHT = 836;

export const createMetadata = ({
  title,
  description,
  image,
  path = '/',
  absoluteTitle = false,
  ...properties
}: MetadataGenerator): Metadata => {
  const parsedTitle = absoluteTitle ? title : `${title} | ${applicationName}`;
  const defaultMetadata: Metadata = {
    // `absolute` keeps the root layout's title template from appending the
    // name a second time on nested routes.
    title: { absolute: parsedTitle },
    description,
    applicationName,
    metadataBase: new URL(productionUrl),
    // Relative on purpose: resolves against metadataBase to the apex URL.
    alternates: { canonical: path },
    authors: [author],
    creator: author.name,
    formatDetection: {
      telephone: false,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: parsedTitle,
    },
    openGraph: {
      title: parsedTitle,
      description,
      type: 'website',
      siteName: applicationName,
      locale: 'en_US',
      url: path,
    },
    publisher,
    twitter: {
      card: 'summary_large_image',
      creator: twitterHandle,
    },
  };

  const metadata: Metadata = merge(defaultMetadata, properties);

  if (image && metadata.openGraph) {
    metadata.openGraph.images = [
      {
        url: image,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: title,
      },
    ];
  }

  return metadata;
};
