# UCSD Casual Golf Club website

This repository contains the Astro + React site for the UCSD Casual Golf Club.

## Quick start

This project uses pnpm as the preferred package manager (see `preinstall` in
`package.json`). You can use npm or yarn, but pnpm is recommended for
consistency.

Install dependencies

```bash
pnpm install
# or if you must use npm
# npm install
```

Start local dev server

```bash
pnpm dev
# or
# npm run dev
```

Build and preview

```bash
pnpm build
pnpm preview
```

Run typecheck / project checks

```bash
pnpm run check
```

## Available scripts

The `package.json` exposes several useful scripts (shorthand):

- `pnpm dev` — start Astro dev server
- `pnpm build` — build the production site
- `pnpm preview` — preview the production build
- `pnpm run check` — run Astro checks / typechecks
- `pnpm run astro -- ...` — run Astro CLI commands
- `pnpm run cf-export` — export Contentful space (requires env variables)
- `pnpm run cf-generate-types` — regenerate Contentful content type types

See `package.json` for exact script definitions and required environment
variables for Contentful commands.

## Project structure (high level)

- `src/` — source code
	- `components/`, `layouts/`, `pages/` — site code
	- `styles/` — design tokens, global styles, and sprinkles utilities
	- `services/` — contentful and other backend integrations
	- `types/` — generated and handwritten TypeScript types

## Styles / design system

The styles are organized under `src/styles`. A short README describing the
tokens/globals/utilities layout lives at `src/styles/README.md`.

Key points:
- Use the public barrel `~styles` when importing tokens, sprinkles or `vars`.
- Tokens live in `src/styles/tokens/` and are the source of truth for colors,
	spacing, typography, etc.
- Global CSS and the theme live in `src/styles/globals/`.
- Sprinkles utilities are in `src/styles/utilities/`.

## TypeScript path aliases

This project uses the `~` alias for `src` (configured in `tsconfig.json`).
Examples:

```ts
import { tokens } from "~styles"
import { Button } from "~components/Button"
```

If your editor doesn't resolve these aliases, ensure your editor plugin or
Vite/IDE plugin (e.g. `vite-tsconfig-paths`) is enabled.

## Contentful

There are helper scripts in `package.json` to export a Contentful space and to
generate types. These commands require Contentful credentials (see
`src/services/contentful/export-config.json`).

## Contributing / development notes

- The project prefers `pnpm` (preinstall checks enforce this).
- Keep new tokens in `src/styles/tokens/` and update the public barrel if they
	should be exposed.
- There are compatibility wrapper files in `src/styles/` for backward
	compatibility during refactors — you can consolidate imports to `~styles`.
