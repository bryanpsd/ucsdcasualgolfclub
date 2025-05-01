import { defineConfig } from 'astro/config';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import netlify from '@astrojs/netlify';
import svgr from 'vite-plugin-svgr';

import react from '@astrojs/react';
import icon from 'astro-icon';

export default defineConfig({
  adapter: netlify(),
  integrations: [react(), icon()],
  vite: {
    plugins: [viteTsconfigPaths(), vanillaExtractPlugin(), svgr()],
    assetsInclude: ['**/*.ttf'], // Ensure .ttf files are included as assets
  },
});
