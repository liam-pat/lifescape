# Lifescape

Personal blog built with Astro, focused on two content collections:

- `life`: life notes
- `reading`: book notes

This README is optimized for both humans and AI agents: concise, structured, and implementation-aligned.

## 1. Project Facts

- Runtime: Node.js + npm
- Framework: Astro (`astro@^5.4.2`)
- Styling: Tailwind CSS
- Search: Pagefind (generated during build)
- RSS: `/rss.xml`
- Site URL: `https://life.biyongyao.com`
- Package name: `lifescape`

## 2. Quick Start

Default workflow (required for AI agents unless explicitly overridden):

```bash
docker-compose -f docker-compose.local.yml up -d
```

Then open:

```text
http://life.orb.local 
#http://localhost:4321
```

Important:

- Do not default to host-level `npm run dev`.
- Use containerized workflow first to avoid local Node.js/npm environment mismatch.

Alternative (only when explicitly requested and local environment is ready):

```bash
npm install
npm run dev
```

Dev server: `http://localhost:4321`

## 3. Commands

| Command | Purpose |
| --- | --- |
| `docker-compose -f docker-compose.local.yml up -d` | Recommended default: start local dev containerized environment |
| `npm install` | Install dependencies |
| `npm run dev` | Start Astro dev server |
| `npm run build` | Build Astro site and run Pagefind index generation |
| `npm run preview` | Preview built site |
| `docker-compose up -d` | Start production-like container |
| `docker-compose down` | Stop containers |

Build script source of truth is `package.json`:

- `build`: `astro build && pagefind --site dist`

## 4. Repository Layout

```text
.
├── src/
│   ├── components/              # UI components (search, image modal, live photo)
│   ├── content/
│   │   ├── life/                # Life collection markdown
│   │   ├── reading/             # Reading collection markdown
│   │   └── config.ts            # Content schemas
│   ├── layouts/                 # Shared page layouts
│   ├── lib/                     # Utilities/plugins (date, EXIF, rehype transforms)
│   └── pages/                   # Routes
├── public/                      # Static assets
├── dist/                        # Build output (do not edit)
├── astro.config.mjs             # Astro config
├── tailwind.config.mjs          # Tailwind config
├── docker-compose.yml           # Production-like runtime
└── docker-compose.local.yml     # Local containerized dev
```

## 5. Content Model

Defined in `src/content/config.ts`.

### 5.1 `life` collection

Required:

- `title: string`
- `date: date`

Optional:

- `description: string`
- `tags: string[]` (default `[]`)
- `image: string`

Example:

```yaml
---
title: Tokyo Walk
date: 2026-04-14
description: Spring walk notes.
tags: [travel, life]
image: /images/life/tokyo.jpg
---
```

### 5.2 `reading` collection

Required:

- `title: string`
- `date: date`
- `book.title: string`
- `book.author: string`

Optional:

- `book.rating: number` (1-5)
- `tags: string[]` (default `[]`)
- `description: string`

Example:

```yaml
---
title: Notes on a Book
date: 2024-10-05
book:
  title: Give Up the Glass
  author: John Doe
  rating: 4
tags: [reading, notes]
description: Key takeaways.
---
```

## 6. Rendering and Behavior Notes

### 6.1 Markdown pipeline

Configured in `astro.config.mjs`:

- `remark-breaks`
- `rehype-raw`
- `rehype-external-links` with `noopener noreferrer`
- custom `rehypeLazyImages` plugin

### 6.2 Search

- UI component: `src/components/SearchPopup.astro`
- Index generation: `npm run build` via Pagefind
- Search script source: `/pagefind/pagefind.js`

### 6.3 Images and Live Photo

- `src/lib/rehype-lazy-images.mjs` adds lazy-loading and image metadata markers
- `src/components/LivePhotoRenderer.astro` handles inline LIVE/HDR behavior
- `src/components/ImageModal.astro` handles zoom modal + EXIF display
- `src/lib/exif.ts` parses and formats EXIF metadata

### 6.4 Date display policy

- Shared formatter: `src/lib/date.ts`
- Detail pages use fixed timezone rendering: `Asia/Shanghai`

## 7. Docker

### 7.1 Production-like (`docker-compose.yml`)

- Builds local image from current source
- Runs `npm run preview -- --host`
- Exposes `4321`

### 7.2 Local dev (`docker-compose.local.yml`)

- Uses `node:20`
- Mounts repo as volume
- Runs `npm install && npm run dev -- --host`
- Exposes `4321`

## 8. AI Collaboration Rules (Practical)

- Runtime policy is defined in **Section 2. Quick Start** (single source in this file).
- For strict AI execution constraints, refer to `AGENTS.md` (single source for agent rules).
- Prefer editing source under `src/`; do not edit `dist/`.
- Keep collection schema changes in sync with content frontmatter.

## 9. Git Commit Message Convention

Use Conventional Commit style consistent with repository history.

Format:

```text
<type>: <short summary>
```

Recommended `type` values:

- `feat`: new feature or user-visible enhancement
- `fix`: bug fix or behavior correction
- `docs`: documentation updates

Optional additional types:

- `refactor`: internal refactor without behavior change
- `chore`: maintenance tasks (deps/config/tooling)

Guidelines:

- Use lowercase type (`feat`, `fix`, `docs`).
- Keep summary short and specific.
- Prefer one logical change per commit.

Examples from this repository style:

```text
feat: implement LivePhotoRenderer to support playback of HEIC/MOV live photos with HDR badge indicators
fix: update image URLs to correct paths in travel markdown files
docs: update japan tour content in 2026-04-japan-tour.md
```
