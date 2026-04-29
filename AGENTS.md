# AGENTS Guide (Lifescape)

This file defines the default execution rules for AI agents working in this repository.

## 1) Runtime & Verification: Container First (Required)

- MUST use:
  - `docker-compose -f docker-compose.local.yml up -d`
- MUST verify in browser at:
  - `http://life.orb.local`
- MUST verify responsive behavior (Mobile/Desktop) after any UI changes.
- MUST NOT default to host-level `npm run dev` / `npm run build`.
- Host `npm` commands are allowed only when container mode is unavailable or explicitly requested.

## 2) High-Impact Paths

- App code: `src/`
- Content: `src/content/life/`, `src/content/reading/`
- Content schema: `src/content/config.ts`
- Runtime config: `astro.config.mjs`, `tailwind.config.mjs`, `docker-compose*.yml`
- Build output: `dist/` (do not edit directly)

## 3) Content Model Rules

- Source of truth: `src/content/config.ts`
- Detailed examples and writing guide: `README.md` Section `5. Content Model`
- If schema changes, update related markdown frontmatter accordingly.

## 4) Code Style & Efficiency

- Keep existing style:
  - 2-space indent in `.mjs/.ts/.json`
  - tabs in `.astro` markup
- Prefer small reusable Astro components.
- Prefer Tailwind utility classes over ad-hoc CSS unless needed.
- Slugs come from filenames; avoid uppercase and spaces.
- **Search First**: Before implementing new utilities, search `src/lib/` to reuse existing logic (e.g., date formatting, EXIF parsing).

## 5) Commit Message Convention

- Source of truth: `README.md` Section `9. Git Commit Message Convention`
- Use Conventional Commit style defined there.
- Do not introduce a conflicting local style in agent outputs.

## 6) Config Change Reminder

If adding a new domain or host, update both:

- `site` in `astro.config.mjs`
- `server.allowedHosts` in `astro.config.mjs`

## 7) Safe Execution & Guardrails

- **No Guessing**: Before complex refactoring or bug fixing, prioritize using `console.log` or temporary test logic to verify assumptions. DO NOT attempt to fix bugs via "guessing" on production paths.
- **Config Guard**: DO NOT modify global base configurations in `tailwind.config.mjs` or `astro.config.mjs` unless explicitly requested.
- **Search Refresh**: If modifying content rendering, remember that Pagefind search index requires `npm run build` to update.
