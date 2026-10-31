export const ENABLE_BUDDY = false;

export const META_THEME_COLORS = {
  light: '#f0ede7',
  dark: '#09090b',
};

export const SOURCE_CODE_GITHUB_REPO = 'ahm-adsaad/portfolio';
export const SOURCE_CODE_GITHUB_URL =
  'https://github.com/ahm-adsaad/portfolio';

export const UTM_PARAMS = {
  utm_source: 'ahmadsaad',
  utm_medium: 'portfolio_website',
  utm_campaign: 'referral',
};

export const COLLECTION_IDS = [
  48073561, 59718740, 59782917, 59843152, 59843461,
];

export const SCROLL_AREA_ID = 'scroll-area-id';
export const MOBILE_SCROLL_THRESHOLD = 20;

/**
 * Date of the last visible content change (YYYY-MM-DD). Feeds the sitemap
 * lastmod, schema dateModified and the "Last updated" line on /about. Bump it
 * by hand in the same commit that changes visible copy, NOT on every deploy:
 * a lastmod that churns with each build is a signal Google learns to ignore.
 */
export const CONTENT_LAST_MODIFIED = '2026-10-31';
