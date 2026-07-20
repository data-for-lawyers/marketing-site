// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

import node from '@astrojs/node';

// GitHub Pages is static-only. Keep Keystatic + Node adapter for local CMS editing.
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

// https://astro.build/config
export default defineConfig({
  site: 'https://data-for-lawyers.github.io',
  base: '/marketing-site',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: isGitHubPages
    ? [react(), markdoc()]
    : [react(), markdoc(), keystatic()],
  ...(isGitHubPages
    ? {}
    : {
        adapter: node({
          mode: 'standalone',
        }),
      }),
});
