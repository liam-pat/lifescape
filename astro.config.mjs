// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
import rehypeLazyImages from './src/lib/rehype-lazy-images.mjs';
import remarkBreaks from 'remark-breaks';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  site: 'https://life.biyongyao.com',
  integrations: [
    tailwind()
  ],
  markdown: {
    remarkPlugins: [remarkBreaks],
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
  },
  vite: {
    plugins: [
      {
        name: 'serve-pagefind',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url && req.url.startsWith('/pagefind/')) {
              const urlPath = req.url.split('?')[0];
              const filePath = path.join(process.cwd(), 'dist', urlPath);
              if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                const ext = path.extname(filePath);
                const contentType = {
                  '.js': 'application/javascript',
                  '.css': 'text/css',
                  '.json': 'application/json',
                  '.wasm': 'application/wasm',
                }[ext] || 'application/octet-stream';
                res.setHeader('Content-Type', contentType);
                res.end(fs.readFileSync(filePath));
                return;
              }
            }
            next();
          });
        }
      }
    ]
  }
});

