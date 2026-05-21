# Repository Guidelines

## Commands
- `npm install`: install dependencies.
- `npm run build`: build the site and generate Pagefind search (`dist/` output).
- `docker-compose -f docker-compose.local.yml up -d`: start local dev container (preferred).
- `docker-compose -f docker-compose.local.yml restart`: restart after config changes.
- `docker-compose down`: stop containers.
- `docker-compose up -d`: run the production container.

## Local Development & Testing
1. Run `npm run build` to catch build errors first.
2. Run `docker-compose -f docker-compose.local.yml up -d` to start the local container.
3. Open **http://life.orb.local** for UI verification.

Key notes:
- The container runs `npm run dev --host` (hot reload). Code changes take effect on save — **no restart needed**.
- If you change `package.json`, `astro.config.mjs`, or `tailwind.config.mjs`, **restart the container** (`docker-compose -f docker-compose.local.yml restart`).
- Do NOT use `npm run dev` or `npm run preview` for UI acceptance; they are fallbacks only.

## Coding Style & Naming Conventions
- Follow existing formatting: 2-space indent in `.mjs/.ts/.json`, tabs in `.astro` markup.
- Keep Astro components small and reusable; prefer Tailwind utility classes over bespoke CSS.
- Collection slugs derive from filenames; avoid uppercase or spaces.

## Git Commit & Pull Request Guidelines
- Use Conventional Commit prefixes: `feat:`, `fix:`, etc.
- PRs should include a brief summary, linked issue (if any), and screenshots for UI changes.
- Include verification steps (e.g., `npm run build`).
