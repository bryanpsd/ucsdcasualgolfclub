import { defineConfig } from 'astro/config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import netlify from '@astrojs/netlify'
import svgr from 'vite-plugin-svgr'
import robotsTxt from 'astro-robots-txt'
import react from '@astrojs/react'
import icon from 'astro-icon'

import partytown from '@astrojs/partytown'

import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://ucsdcasualgolfclub.com',
  adapter: netlify(),
  output: 'server',
  integrations: [
    react(),
    icon(),
    partytown({ config: { forward: ['dataLayer.push'] } }),
    sitemap(),
    robotsTxt(),
  ],
  vite: {
    plugins: [viteTsconfigPaths(), vanillaExtractPlugin(), svgr()],
    assetsInclude: ['**/*.ttf'], // Ensure .ttf files are included as assets
  },
})
