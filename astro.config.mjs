// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  site: 'https://life.biyongyao.com',
  integrations: [
    tailwind()
  ],
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { 
        target: '_blank',
        rel: ['nofollow', 'noopener', 'noreferrer']
      }]
    ],
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  },
  server: {
    host: true, 
    allowedHosts: [
      'localhost',
      'lifescape.lifescape.orb.local',
      'life.biyongyao.com'
    ]
  }
});
