/**
 * Canonical origin for every absolute URL the app self-reports (sitemap,
 * robots, canonical, JSON-LD). Hardcoded on purpose: deriving it from the
 * request Host header made the www. and http variants describe themselves as
 * the canonical host.
 */
export const SITE_DOMAIN = 'ahmadsaad.dev';
export const SITE_URL = `https://${SITE_DOMAIN}`;

export const getDomain = async () => SITE_DOMAIN;

export const addPathToBaseURL = async (path: string) => `${SITE_URL}${path}`;
