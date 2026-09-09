# Lifescape

A personal blog built with [Astro](https://astro.build/) to share life experiences, book notes, and technology articles.

🔗 **Live Site**: [life.biyongyao.com](https://life.biyongyao.com)

## Features

- 📝 Markdown-based content collections (life posts, reading notes & technology articles)
- 🔍 Full-text search powered by [Pagefind](https://pagefind.app/)
- 🌐 Chinese and English routes with language-aware content, search, RSS, and SEO metadata
- 🌙 Dark mode with localStorage persistence
- 📡 RSS feed & sitemap
- 📱 Responsive design
- 🐳 Docker-based local development

## Tech Stack

- [Astro](https://astro.build/) — content-driven web framework
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [Pagefind](https://pagefind.app/) — static search
- [Docker](https://www.docker.com/) — containerized dev & deployment

## Getting Started

Requires Node.js 24 or newer.

```bash
# Install dependencies
npm install

# Build the site (catches errors + generates Pagefind index)
npm run build

# Start local dev container (preferred)
docker-compose -f docker-compose.local.yml up -d

# Open http://life.orb.local in your browser
```

## Configuration

Key settings in `astro.config.mjs`:

| Setting | Description |
|---|---|
| `site` | Production URL (currently `https://life.biyongyao.com`) |
| `server.allowedHosts` | Allowed hostnames; must include `life.orb.local` for local dev |

Docker environment variables (`docker-compose.yml`):

| Variable | Default | Description |
|---|---|---|
| `NODE_ENV` | `production` | Set automatically in the production container; not needed for local dev |

> No `.env` file is used at the moment. If env vars are added later, create a `.env.example` and document them here.

## Project Structure

```text
├── src/
│   ├── components/      # Reusable UI components
│   ├── content/         # Markdown content collections
│   │   ├── life/        # Life posts; English versions live in life/en/
│   │   ├── reading/     # Reading posts; English versions live in reading/en/
│   │   └── technology/  # Tech posts; English versions live in technology/en/
│   ├── layouts/         # Page layouts
│   └── pages/           # Page routes
├── public/              # Static assets
└── docker-compose*.yml  # Dev & production containers
```

## Content Management

Content is managed through Markdown files in `src/content/`:

- **Life posts** (`src/content/life/`): require `title` and `date`; optional fields include `description`, `tags`, and `image`.
- **Reading posts** (`src/content/reading/`): require `title`, `date`, and `book.title`/`book.author`; `subtitle` and `book.rating` are optional.
- **Technology articles** (`src/content/technology/`): require `title` and `date`; optional fields include `description`, `tags`, and `image`.

Slugs derive from filenames — avoid uppercase or spaces.

Chinese is the default language and keeps the existing routes. English pages use the `/en/` prefix. To add an English translation, create a Markdown file with the same filename under the collection's `en/` directory and add `lang: en` to its frontmatter. Matching filenames are linked automatically by the language switcher. Use the optional `translationKey` field on both files only when translated filenames need to differ.

```text
src/content/life/2025-01-journey.md     → /life/2025-01-journey/
src/content/life/en/2025-01-journey.md  → /en/life/2025-01-journey/
```

## License

MIT
