# UCSD Casual Golf Club website

This repository contains the Astro + React site for the UCSD Casual Golf Club.

## Quick start

This project uses pnpm as the preferred package manager (see `preinstall` in
`package.json`). You can use npm or yarn, but pnpm is recommended for
consistency.

### Environment setup

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Fill in your environment variables:
   - **Contentful**: Get credentials from your Contentful space settings
     - Set `CONTENTFUL_USE_PREVIEW=true` to see draft/unpublished content in local dev
     - Set `CONTENTFUL_USE_PREVIEW=false` (or omit) to see only published content
     - **Preview mode uses a 10-second cache** (vs 1 hour in production) so you can see changes quickly
     - Run `pnpm dev:preview` to start dev server with preview mode enabled
     - **Webhook setup**: Add `CONTENTFUL_WEBHOOK_SECRET` for automatic cache invalidation (see below)
   - **Google Analytics**: Control event tracking verbosity
     - Set `GA_TRACKING_MODE="minimal"` for only critical events (form submissions, conversions)
     - Set `GA_TRACKING_MODE="all"` to track everything (all clicks, navigation, etc.)
     - Set `GA_TRACKING_MODE="none"` to disable tracking entirely
   - **Google reCAPTCHA**: Create a reCAPTCHA site at [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
   - **Google Maps**: Get API key from [Google Cloud Console](https://console.cloud.google.com/)
   - **GCP Credentials**: Service account JSON for reCAPTCHA Enterprise

See `.env.example` for all required variables.

### Install and run

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
- `pnpm dev:preview` — start dev server with Contentful preview mode (see draft content with 10s cache)
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
import { tokens } from "~styles";
import { Button } from "~components/Button";
```

If your editor doesn't resolve these aliases, ensure your editor plugin or
Vite/IDE plugin (e.g. `vite-tsconfig-paths`) is enabled.

## Contentful

There are helper scripts in `package.json` to export a Contentful space and to
generate types. These commands require Contentful credentials (see
`src/services/contentful/export-config.json`).

### Content Delivery Architecture

This project uses a **proxy-based architecture** for Contentful content delivery:

1. **API Proxy Route** (`/api/contentful/[...path]`):
   - All Contentful requests go through this local API route
   - Automatically switches between preview and delivery APIs
   - Adds HTTP cache headers (10s in preview, 1 hour in production)
   - Centralizes authentication and error handling

2. **Webhook-Based Cache Invalidation** (`/api/contentful/revalidate`):
   - Contentful can trigger this endpoint when content is published/unpublished
   - Allows you to see content changes immediately without waiting for cache expiration
   - Secure with `CONTENTFUL_WEBHOOK_SECRET` environment variable

### Setting Up Contentful Webhooks

To enable automatic cache invalidation when you publish content:

1. Go to your Contentful space → **Settings** → **Webhooks**
2. Click **Add Webhook**
3. Configure:
   - **Name**: `Production Cache Invalidation`
   - **URL**: `https://your-site.netlify.app/api/contentful/revalidate`
   - **Triggers**: Select "Entry publish" and "Entry unpublish"
   - **Headers**: Add `x-contentful-webhook-secret` with a secure random string
4. Save the webhook
5. Add the same secret to your Netlify environment variables as `CONTENTFUL_WEBHOOK_SECRET`

**For local development**: Content changes will appear within 10 seconds in preview mode without needing webhooks.

### Development Workflow

**See published content only** (production mode):

```bash
# Set CONTENTFUL_USE_PREVIEW=false in .env
pnpm dev
```

**See draft/unpublished content** (preview mode with 10s cache):

```bash
# Set CONTENTFUL_USE_PREVIEW=true in .env
pnpm dev:preview
```

**Force immediate refresh**: Restart the dev server or wait for the cache TTL (10s in preview, 1 hour in production).

## Contributing / development notes

- The project prefers `pnpm` (preinstall checks enforce this).
- Keep new tokens in `src/styles/tokens/` and update the public barrel if they
  should be exposed.
- There are compatibility wrapper files in `src/styles/` for backward
  compatibility during refactors — you can consolidate imports to `~styles`.
