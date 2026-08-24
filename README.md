# ahmadsaad.dev

Personal portfolio of **Ahmad Saad** — live at [ahmadsaad.dev](https://ahmadsaad.dev).

Based on the MIT-licensed [ruixenui/portfolio](https://github.com/ruixenui/portfolio) template, customized with a 3D coverflow project showcase and deployed to Cloudflare Workers.

## Tech Stack

- Next.js 15 (App Router) + React 19
- Tailwind CSS v4 + shadcn/ui
- Turborepo + pnpm workspaces
- Cloudflare Workers via [@opennextjs/cloudflare](https://opennext.js.org/cloudflare)

## Development

```bash
pnpm install
pnpm dev          # site at http://localhost:6969 (apps/website)
```

## Deployment

```bash
cd apps/website
pnpm run preview  # build + run locally on the Workers runtime
pnpm run deploy   # build + deploy to Cloudflare Workers
```

## Structure

- `apps/website` — the site itself
  - `config/user.ts` — identity, socials, tagline
  - `config/projects.ts` — projects (drives the hero carousel: cover `image`, `skills`, `period`, `impact`)
  - `config/experience.ts` — work experience
  - `components/ui/coverflow-carousel.tsx` — the 3D project carousel
- `packages/design-system` — shared shadcn/ui components and styles

## License

MIT — see [license.md](./license.md).
