# ahmadsaad.dev

Personal portfolio of **Ahmad Saad**, live at [ahmadsaad.dev](https://ahmadsaad.dev).

Started from the MIT-licensed [ruixenui/portfolio](https://github.com/ruixenui/portfolio) template, since rebuilt on its own design system (see `apps/website/DESIGN.md`) and deployed to Cloudflare Workers.

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

- `apps/website`: the site itself
  - `config/user.ts`: identity, socials, tagline
  - `config/projects.ts`: projects (cover `image`, `skills`, `period`, `impact`, optional `caseStudy`)
  - `config/experience.ts`: work experience
  - `DESIGN.md`: the visual system (palette, type, layout, motion, performance budget)
  - `app/globals.css`: design tokens and component classes
  - `features/home/components`: the home page sections
- `packages/design-system`: shared shadcn/ui components (the site styles now live in `apps/website/app/globals.css`)

## License

MIT, see [license.md](./license.md).
