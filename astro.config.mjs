// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
import rehypeLazyImages from './src/lib/rehype-lazy-images.mjs';

export default defineConfig({
  site: 'https://life.biyongyao.com',
  integrations: [
    tailwind()
  ],
  markdown: {
    rehypePlugins: [
      rehypeRaw,
      [rehypeExternalLinks, { 
        target: '_blank',
        rel: ['nofollow', 'noopener', 'noreferrer']
      }],
      rehypeLazyImages
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
      'life.orb.local',
      'life.biyongyao.com'
    ]
  }
});
