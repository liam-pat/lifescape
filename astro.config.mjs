// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import tailwindcss from '@tailwindcss/vite';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
import rehypeLazyImages from './src/lib/rehype-lazy-images.mjs';
import remarkBreaks from 'remark-breaks';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  site: 'https://life.biyongyao.com',
  markdown: {
    processor: unified({
      remarkPlugins: [remarkBreaks],
      rehypePlugins: [
        rehypeRaw,
        [rehypeExternalLinks, { 
          target: '_blank',
          rel: ['nofollow', 'noopener', 'noreferrer']
        }],
        rehypeLazyImages
      ]
    }),
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  },
  server: {
    host: true,
    allowedHosts: ['localhost', 'life.orb.local','life.biyongyao.com','apartment.life.orb.local']
  },
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'serve-pagefind',
        configureServer(server) {
          const pagefindRoot = path.resolve(process.cwd(), 'dist', 'pagefind');

          server.middlewares.use((req, res, next) => {
            if (req.url && req.url.startsWith('/pagefind/')) {
              const requestPath = req.url.split('?')[0].slice('/pagefind/'.length);
              let filePath;

              try {
                filePath = path.resolve(pagefindRoot, decodeURIComponent(requestPath));
              } catch {
                res.statusCode = 400;
                res.end('Bad Request');
                return;
              }

              if (!filePath.startsWith(`${pagefindRoot}${path.sep}`)) {
                res.statusCode = 403;
                res.end('Forbidden');
                return;
              }

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
