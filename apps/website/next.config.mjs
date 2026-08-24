import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bundleAnalyzer from '@next/bundle-analyzer';
const withBundleAnalyzer = bundleAnalyzer;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Baseline security headers for every response the Worker serves. Static
// assets bypass the Worker, so public/_headers repeats these for them.
// No full CSP yet: the inline theme script in app/layout.tsx is not nonce'd.
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
];

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname, '../../'),
  transpilePackages: ['@repo/design-system'],
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
  devIndicators: false,
  experimental: {
    optimizePackageImports: ['motion'],
    webVitalsAttribution: ['FCP', 'LCP', 'CLS', 'FID', 'TTFB', 'INP'],
  },
  outputFileTracingIncludes: {
    '/*': ['./registry/**/*'],
  },
  webpack: (config, { webpack, isServer }) => {
    if (isServer) {
      config.plugins.push(
        // mute errors for unused typeorm deps
        new webpack.IgnorePlugin({
          resourceRegExp:
            /(^@google-cloud\/spanner|^@mongodb-js\/zstd|^aws-crt|^aws4$|^pg-native$|^mongodb-client-encryption$|^@sap\/hana-client$|^@sap\/hana-client\/extension\/Stream$|^snappy$|^react-native-sqlite-storage$|^bson-ext$|^cardinal$|^kerberos$|^hdb-pool$|^sql.js$|^sqlite3$|^better-sqlite3$|^ioredis$|^typeorm-aurora-data-api-driver$|^pg-query-stream$|^oracledb$|^mysql$|^snappy\/package\.json$|^cloudflare:sockets$)/,
        })
      );
    }

    config.module = {
      ...config.module,
      exprContextCritical: false,
    };

    return config;
  },
  images: {
    deviceSizes: [390, 435, 768, 1024, 1280],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'api.microlink.io',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'www.ruixen.com',
      },
      {
        protocol: 'https',
        hostname: 'shadcnagents.com',
      },
      {
        protocol: 'https',
        hostname: 'sourceoftruth.com',
      },
      {
        protocol: 'https',
        hostname: 'simplifyingai.com',
      },
      {
        protocol: 'https',
        hostname: 'opencv.org',
      },
      {
        protocol: 'https',
        hostname: 'techarion.com',
      },
      {
        protocol: 'https',
        hostname: 'www.agneyas.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.SriSomanaath',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        // Content-hashed build output: safe to cache forever.
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/craft/:slug.mdx',
        destination: '/blog.mdx/:slug',
      },
    ];
  },
};

if (process.env.ANALYZE === 'true') {
  nextConfig = withBundleAnalyzer(nextConfig);
}

export default nextConfig;
