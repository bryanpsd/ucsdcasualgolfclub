import netlify from '@astrojs/netlify'
import partytown from '@astrojs/partytown'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import robotsTxt from 'astro-robots-txt'
import svgr from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'

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
