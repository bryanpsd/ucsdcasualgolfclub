# Styles directory

This folder contains the project's design system and global styles.

Structure
- `tokens/` — design tokens (colors, typography, spacing, breakpoints, borders, duration). These are plain objects that back the global theme and sprinkles.
- `globals/` — global CSS, theme, reset, and other site-wide helpers. The `theme.css` file creates `vars` for runtime CSS variables via `createGlobalTheme`.
- `utilities/` — utilities such as the sprinkles helper (`designTokens.css.ts`) and breakpoint helpers.
- `index.ts` — public barrel that re-exports tokens, sprinkles, and the theme vars for convenient imports (import from `~styles`).

Usage
- Import the public barrel as the main entry point:

```ts
import { tokens, color, fontSize, vars } from "~styles"
```

- Use the `tokens` sprinkles helper in vanilla-extract style functions:

```ts
import { style } from "@vanilla-extract/css"
import { tokens } from "~styles"

export const card = style([
  tokens({
    padding: 12,
    backgroundColor: "surface-1",
  }),
])
```

Notes and recommendations
- Prefer importing from `~styles` (the top-level barrel). For internals inside `src/styles`, relative imports (e.g. `./tokens/colors`) are recommended.
- If you add new tokens, update `src/styles/tokens/index.ts` (if present) and ensure `src/styles/index.ts` re-exports them if they should be public.
- The reset and global styles live in `src/styles/globals` and are applied project-wide.

Commands
- Dev server: `pnpm dev` (or `npm run dev` if using npm)
- Build: `pnpm build`
- Typecheck: `pnpm run check`