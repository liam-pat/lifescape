# Repository Guidelines

## Project Context

Lifescape is a static Astro site with Chinese and English content, Tailwind CSS, and Pagefind search. Use `AGENTS.md` as the repository instruction entrypoint.

- Read [README.md](README.md) for setup and contributor guidance, and [docs/process.md](docs/process.md) for active handoff notes and past decisions.
- Read the files relevant to the task; source code and configuration define current behavior. If documentation disagrees, verify the implementation and correct the affected guidance.
- Content schema and loaders: `src/content.config.ts`.
- Article paths and translation matching: `src/lib/content.ts`; language labels and UI copy: `src/lib/i18n.ts`.
- Shared article rendering: `src/layouts/ArticlePage.astro`; SEO metadata: `src/layouts/Layout.astro`.
- Tailwind theme and utilities: `src/styles/global.css`; Vite integration: `astro.config.mjs`. There is no `tailwind.config.mjs`.

## Local Development and Verification

Use Node.js as specified by `package.json` (currently 24+). `package-lock.json` is committed: use `npm ci` for setup and `npm install` when intentionally changing dependencies.

| Action | Command |
| --- | --- |
| Build site and Pagefind index | `npm run build` |
| Check Astro and TypeScript diagnostics | `npm run check` |
| Start local development | `docker compose -f docker-compose.local.yml up -d` |
| Build inside the running dev container | `docker compose -f docker-compose.local.yml exec -T lifescape npm run build` |
| Restart the dev service | `docker compose -f docker-compose.local.yml restart lifescape` |
| Stop local development | `docker compose -f docker-compose.local.yml down` |

Use `docker-compose` as an equivalent spelling if the installed CLI requires it. Always specify the Compose file: `docker-compose.local.yml` runs the dev server; `docker-compose.yml` builds the production Nginx image.

- For source, content, or configuration changes, run `npm run build` first. Also run `npm run check` for component, TypeScript, or configuration changes; a build does not replace type checking.
- For UI changes, start the local container and verify affected pages at **http://life.orb.local**. Check the relevant languages, desktop/mobile layouts, and light/dark themes. Include screenshots in UI PRs.
- For documentation or skill-only changes, check references, commands, and skill metadata. A browser session is needed only if the task also requires checking site behavior.
- The dev container runs `npm ci` on startup and keeps its own `node_modules` volume. When host dependencies are unavailable, use the container for build/check commands. Avoid running host and container builds/checks concurrently: they share generated files.
- Source, Markdown, and `src/styles/global.css` changes normally hot reload. Restart after changes to `package.json`, `package-lock.json`, or `astro.config.mjs`. Recreate the service after Compose configuration changes with `docker compose -f docker-compose.local.yml up -d --force-recreate lifescape`.
- Pagefind is generated only by a build. Rebuild after searchable content changes; the dev middleware serves the resulting `dist/pagefind` directory.
- If a newly added article builds successfully but the running dev page stays stale, restart the dev service once and recheck. Investigate or report a persistent failure instead of repeatedly restarting.
- `npm run dev` and `npm run preview` are fallbacks when the Docker environment is unavailable. State the fallback and any verification that remains incomplete.

## Content and Skills

- For requested article translations or synchronization, use [.agents/skills/article-english/SKILL.md](.agents/skills/article-english/SKILL.md). Editing a Chinese article alone does not automatically request a translation.
- This repository uses `src/content/<collection>/en/` for English articles. Do not apply another blog's `src/pages/posts/` layout, filename rules, or `weekly` Docker service here.
- Keep existing published filenames and URLs unless a rename is requested; use lowercase, space-free names for new articles.
- Preserve functional media markers and asset URLs when editing content. Keep UI translations in `src/lib/i18n.ts`.

## Editing and Delivery

- Follow existing formatting: 2-space indentation in `.mjs`, `.ts`, and `.json`; tabs in `.astro` markup. Prefer shared components and Tailwind utilities for UI changes.
- Inspect `git status` before editing and preserve unrelated work. Create a task branch from the appropriate base; reuse the current branch when continuing the same task.
- Follow [README.md — Contributing](README.md#contributing) for commit and PR conventions. Stage only the task's files, review the diff, commit, push the branch, and open a PR as part of the normal repository workflow unless the user asks for local changes only. Merging and production deployment are separate actions.
- Update [docs/process.md](docs/process.md) for work that needs handoff, an unresolved follow-up, or a durable process decision. Keep completed work out of `Current` and preserve historical entries.
- Report what changed, checks run, and any unresolved findings. Distinguish existing failures from regressions caused by the change.
