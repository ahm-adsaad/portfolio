import { SITE_URL } from '@/lib/server-url';

// Double-encode: Cloudinary text layers need commas and slashes escaped twice.
const e = (str: string) => encodeURIComponent(encodeURIComponent(str));

// Cloudinary fetch layers take the remote URL as URL-safe base64.
const fetchId = (url: string) => Buffer.from(url).toString('base64url');

/** The same headshot as Person.image, served from this domain. */
const HEADSHOT_URL = `${SITE_URL}/ahmad-saad.jpg`;

/**
 * 1600x836 share card: title and meta bottom left, round headshot on the
 * right. JPEG at automatic quality keeps it near 150 KB for every crawler.
 * Keep `meta` to one line (about 40 characters) so it never meets the title.
 */
export const createOgImage = ({
  title,
  meta,
}: {
  title: string;
  meta: string;
}) =>
  [
    'https://res.cloudinary.com/bucha/image/upload',
    'w_1600,h_836,q_auto,f_jpg',
    `l_fetch:${fetchId(HEADSHOT_URL)},w_400,h_400,c_fill,g_face,r_max`,
    'fl_layer_apply,g_east,x_100',
    `l_text:Karla_88_bold:${e(title)},co_rgb:ffe4e6,c_fit,w_960,h_340`,
    'fl_layer_apply,g_south_west,x_100,y_210',
    `l_text:Karla_44:${e(meta)},co_rgb:ffe4e6cc,c_fit,w_960,h_120`,
    'fl_layer_apply,g_south_west,x_100,y_110',
    'grain-gradient_ctrjnp.png',
  ].join('/');
