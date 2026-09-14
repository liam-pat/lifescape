# Lifescape

A personal blog built with [Astro](https://astro.build/) to share life experiences, book notes, and technology articles.

🔗 **Live Site**: [life.biyongyao.com](https://life.biyongyao.com)

## Features

- 📝 Markdown-based content collections (life posts, reading notes & technology articles)
- 🔍 Full-text search powered by [Pagefind](https://pagefind.app/)
- 🌐 Chinese and English routes with language-aware content, search, RSS, and SEO metadata
- 🌙 Dark mode with localStorage persistence
- 📡 Chinese and English RSS feeds
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
# Install the locked dependencies
npm ci

# Build the site (catches errors + generates Pagefind index)
npm run build

# Start local dev container (preferred)
docker compose -f docker-compose.local.yml up -d

# Open http://life.orb.local in your browser
```

The local domain requires OrbStack. With another Docker runtime, `http://localhost:4321` is a fallback; the preferred acceptance environment is `http://life.orb.local`. `docker-compose` is an equivalent CLI spelling where required.

The dev container installs its dependencies with `npm ci` on startup in a separate volume. If Node.js is unavailable on the host, start the container first, then build with `docker compose -f docker-compose.local.yml exec -T lifescape npm run build` once the service is ready. Pagefind reads the last build, so rebuild after changing searchable content.

For Astro/TypeScript diagnostics, run `npm run check` (or the equivalent command in the container). See [AGENTS.md](AGENTS.md#local-development-and-verification) for verification and restart rules.

## Configuration

Key settings in `astro.config.mjs`:

| Setting | Description |
|---|---|
| `site` | Production URL (currently `https://life.biyongyao.com`) |
| `server.allowedHosts` | Allowed hostnames; must include `life.orb.local` for local dev |

`docker-compose.local.yml` defines the local hostname label, port mapping, source mount, and dependency volume. `docker-compose.yml` and `Dockerfile` define production: the site is built with Node.js, then served as static files by Nginx. Neither Compose file configures a `NODE_ENV` variable.

Keep `server.allowedHosts` and the local Compose hostname label aligned when changing the local domain. The production `site` URL is separate and controls absolute site metadata and RSS links.

> No `.env` file is used at the moment. If env vars are added later, create a `.env.example` and document them here.

## Project Structure

```text
├── src/
│   ├── content.config.ts # Collection loaders and frontmatter schema
│   ├── components/      # Reusable UI components
│   ├── content/         # Markdown content collections
│   │   ├── life/        # Life posts; English versions live in life/en/
│   │   ├── reading/     # Reading posts; English versions live in reading/en/
│   │   └── technology/  # Tech posts; English versions live in technology/en/
│   ├── layouts/         # Page layouts
│   └── pages/           # Page routes
├── public/              # Static assets
├── .agents/skills/      # Repository-specific skills
├── AGENTS.md            # Agent execution rules and verification
├── docs/process.md      # Current handoff notes and decision history
└── docker-compose*.yml  # Dev & production containers
```

## Content Management

Content is managed through Markdown files in `src/content/`. The authoritative fields and validation rules are in [src/content.config.ts](src/content.config.ts); the following is a quick reference:

- **Life posts** (`src/content/life/`): require `title` and `date`; optional fields include `description`, `tags`, and `image`.
- **Reading posts** (`src/content/reading/`): require `title`, `date`, and `book.title`/`book.author`; `subtitle` and `book.rating` are optional.
- **Technology articles** (`src/content/technology/`): require `title` and `date`; optional fields include `description`, `tags`, and `image`.

Slugs derive from content entry IDs. Use lowercase filenames without spaces for new articles; preserve existing published paths when editing.

Chinese is the default language and keeps the existing routes. English pages use the `/en/` prefix. To add an English translation, create a Markdown file with the same filename under the collection's `en/` directory and add `lang: en` to its frontmatter. Matching entry IDs (after removing `en/`) link the translations automatically. An explicit `translationKey` overrides that default; use the same key on both files when translated filenames differ, with only one article per language for that key in the collection.

```text
src/content/life/2025-01-journey.md     → /life/2025-01-journey/
src/content/life/en/2025-01-journey.md  → /en/life/2025-01-journey/
```

For AI-assisted translation, use the repository's [article-english skill](.agents/skills/article-english/SKILL.md). It covers voice, frontmatter, media, and language-link verification.

## Contributing

Create a task branch (for Codex work, use `codex/<short-description>`) and keep each change focused. Use Conventional Commit messages such as `feat: add article filters`, `fix: correct language links`, or `docs: clarify local setup`.

Review and stage only the intended files, commit, push the branch, and open a pull request against the appropriate base in [liam-pat/lifescape](https://github.com/liam-pat/lifescape). Include the problem and resulting behavior, relevant verification results, a linked issue when applicable, and screenshots for UI changes. Report checks that could not run. PR creation can use the GitHub CLI or repository website; merging and production deployment are separate steps.

Repository execution rules live in [AGENTS.md](AGENTS.md); active handoff notes and historical decisions live in [docs/process.md](docs/process.md).

## License

MIT
