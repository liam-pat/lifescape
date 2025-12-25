# Repository Guidelines

## Project Structure & Module Organization
- `src/components/`, `src/layouts/`, `src/pages/` hold Astro UI, layouts, and routes.
- `src/content/` stores Markdown content collections; schemas live in `src/content/config.ts`.
- `src/content/life/` and `src/content/reading/` are the two primary collections.
- `public/` contains static assets copied as-is to the build.
- `dist/` is the generated production output (do not edit).
- Deployment and runtime config lives in `astro.config.mjs`, `tailwind.config.mjs`, and `docker-compose*.yml`.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start the Astro dev server at `http://localhost:4321`.
- `npm run build`: build the site and generate Pagefind search (`dist/` output).
- `npm run preview`: serve the production build locally.
- `docker-compose up -d`: run the production container.
- `docker-compose -f docker-compose.local.yml up -d`: run the local container setup.
- `docker-compose down`: stop the container.

## Coding Style & Naming Conventions
- Follow existing formatting: 2-space indent in `.mjs/.ts/.json`, tabs in `.astro` markup.
- Keep Astro components small and reusable; prefer Tailwind utility classes over bespoke CSS.
- Collection slugs derive from filenames; avoid uppercase or spaces.

## Testing Guidelines
- No automated test runner is configured right now.
- Validate changes by running `npm run build` and spot-checking with `npm run preview` or `npm run dev`.

## Commit & Pull Request Guidelines
- Recent commits use Conventional Commit prefixes like `feat:` and `fix:`; follow the same pattern.
- PRs should include a brief summary, linked issue (if any), and screenshots for UI or content changes.
- Include verification steps (for example, `npm run build`).

## Content & Configuration Tips
- Life posts require `title` and `date`; optional fields include `description`, `tags`, and `image`.
- Reading posts require `title`, `date`, and `book.title`/`book.author`; `book.rating` is optional.
- If adding new domains, update `server.allowedHosts` and `site` in `astro.config.mjs`.