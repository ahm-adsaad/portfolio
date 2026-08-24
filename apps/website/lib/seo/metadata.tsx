import merge from 'lodash.merge';
import type { Metadata } from 'next';

type MetadataGenerator = Omit<Metadata, 'description' | 'title'> & {
  title: string;
  description: string;
  image?: string;
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
  ...properties
}: MetadataGenerator): Metadata => {
  const parsedTitle = `${title} | ${applicationName}`;
  const defaultMetadata: Metadata = {
    title: parsedTitle,
    description,
    applicationName,
    metadataBase: new URL(productionUrl),
    // Relative on purpose: resolves against metadataBase to the apex URL.
    alternates: { canonical: '/' },
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
      url: '/',
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
