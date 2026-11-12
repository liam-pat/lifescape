# Process Guide

## Purpose and Maintenance

Use this file for handoff state and durable decisions. Execution rules live in [AGENTS.md](../AGENTS.md), contributor guidance in [README.md](../README.md), and translation instructions in the [life-translation skill](../.agents/skills/life-translation/SKILL.md).

- `Current` contains unfinished work, its latest verified state, and a concrete next step. Update the same entry as a request evolves; create a separate entry only for independent work.
- Record work that spans sessions, needs handoff, exposes an unresolved follow-up, or changes an enduring process decision. Small completed edits and read-only answers do not need task-log entries.
- On completion, remove the active entry. Append a short dated summary to `History` when it preserves a useful decision; use commits and PRs for implementation detail.
- Keep historical entries unchanged. When a decision changes, append an entry naming the decision it supersedes. Historical paths and commands describe their date, not the current execution rules.
- `Current` must describe actual work. Keep examples in the fenced template below, not as active requests. Do not mark blocked or partially verified work complete.

## Source of Truth

| Topic                                                | Maintained Source                                                                                                                             |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Agent execution and verification                     | [AGENTS.md](../AGENTS.md)                                                                                                                     |
| Setup and commit/PR conventions                      | [README.md — Contributing](../README.md#contributing) and its setup sections                                                                  |
| Runtime version and npm commands                     | [package.json](../package.json), with locked dependencies in `package-lock.json`                                                              |
| Local service, hostname label, mounts, and ports     | [docker-compose.local.yml](../docker-compose.local.yml)                                                                                       |
| Production build and serving                         | [Dockerfile](../Dockerfile) and [docker-compose.yml](../docker-compose.yml)                                                                   |
| Production site URL, allowed hosts, and Vite plugins | [astro.config.mjs](../astro.config.mjs)                                                                                                       |
| Content fields and collection loaders                | [src/content.config.ts](../src/content.config.ts)                                                                                             |
| Article paths and translation keys                   | [src/lib/content.ts](../src/lib/content.ts)                                                                                                   |
| Language UI and article alternate links              | [src/lib/i18n.ts](../src/lib/i18n.ts), [ArticlePage.astro](../src/layouts/ArticlePage.astro), and [Layout.astro](../src/layouts/Layout.astro) |
| Translation workflow                                 | [life-translation/SKILL.md](../.agents/skills/life-translation/SKILL.md)                                                                        |
| Tailwind theme                                       | [src/styles/global.css](../src/styles/global.css)                                                                                             |

When these sources change, update affected documentation and references in the same task. The table identifies ownership; it does not override the implementation or repeat its full schema.

## Current

### [2026-11-12] Deliver life-translation Skill Update

- Status: blocked on remote-push approval; skill changes and validation are complete.
- Branch: codex/restore-translation-skill
- Completed and verified: Renamed and refined the skill, updated active references, and passed metadata, local-reference, and whitespace checks.
- Remaining / next step: Obtain explicit approval to push these changes to `liam-pat/lifescape`, then push the branch and open a PR. Automatic approval review rejected the push because it did not accept connected-account ownership evidence as destination authorization.

### [2026-09-14] License File Follow-up

- Status: queued; an audit finding outside the completed workflow update.
- Observed: README declares MIT, but the repository has no tracked LICENSE file.
- Next step: confirm the intended copyright attribution and year(s), then add the license file.

## Handoff Template

Copy only the fields useful to an actual unfinished task:

```markdown
### [YYYY-MM-DD] Short task name

- Goal and scope:
- Status: in progress | blocked | queued
- Branch / PR:
- Completed and verified:
- Remaining / next step:
- Blocker or decision needed: (only when applicable)
- Acceptance criteria:
```

## History

### [2026-04-29] Documentation Governance Baseline

- Goal:
  - Reduce rule drift between README and AGENTS
  - Define default AI execution workflow
- Decisions:
  - Runtime and verification baseline: `docker-compose -f docker-compose.local.yml up -d` + `http://life.orb.local`
  - Commit convention source of truth is `README.md`; `AGENTS.md` only references it
  - Content model source of truth is `src/content/config.ts`; docs provide explanation/reference only
- Impact:
  - Clear role split: README for explanation, AGENTS for strict execution constraints

---

### [2026-04-29] Reading Progress Indicator (Purple Top Bar)

- Goal: Add a purple reading progress bar in the browser viewport to indicate article reading progress.
- Decisions:
  - Implemented `ReadingProgress.astro` component with vanilla JS listening to `scroll` and `resize` events.
  - Used `fixed top-0`, `z-50`, and `pointer-events-none` to avoid interfering with existing UI.
  - Imported into `life` and `reading` slug pages.

---

### [2026-09-14] Agent and Workflow Documentation Alignment

- Supersedes the outdated paths/source mapping in the 2026-04-29 governance baseline and the previous requirement to log every request. Earlier entries remain historical records.
- AGENTS owns execution and verification rules; README's `Contributing` section owns commit/PR conventions; this file keeps unfinished handoffs and durable decisions. Current content configuration is `src/content.config.ts`, and the Tailwind theme is in `src/styles/global.css`.
- Local commands explicitly select the development Compose file. Verification distinguishes builds, type checks, UI review, and documentation-only checks; Pagefind must be rebuilt after searchable content changes.
- The repository's article-english skill uses effective translation keys, preserves existing pairs and media behavior, and avoids another blog's directory/service conventions. README's unsupported sitemap and `NODE_ENV` claims were corrected.
- Verification: `npm run build` passed (24 pages; Pagefind indexed 14 articles across two languages); `npm run check` reported no errors, warnings, or hints; skill validation, 31 local documentation links/anchors, historical-entry preservation, Compose configuration, and existing bilingual article SEO/navigation checks passed.

### [2026-11-12] Project-specific Translation Skill Ownership

- The article-english skill is maintained in this repository; Looma maintains general-purpose skills and no longer holds a parallel copy.
- Retained text-only scope, relative-reference and anchor handling, and bilingual association checks. Removed cross-project discovery and hypothetical draft/scheduling workflows after checking the current implementation.
- Repository commands and recovery procedures remain owned by AGENTS.md. Verified skill metadata, references, source consistency, and whitespace; no runtime/content changes or site build.

### [2026-11-12] Rename Translation Skill to life-translation

- Supersedes the skill name in the earlier translation workflow and ownership decisions: the repository skill is now life-translation at `.agents/skills/life-translation/SKILL.md`. Translation scope remains Chinese-to-English Lifescape articles.
- Frontmatter synchronization follows the current Chinese source, including removed optional fields, while preserving English language and working translation associations. English article links are verified against pages and anchors generated by the current build; prior deployment is not required.
- Updated active references in AGENTS.md, README.md, and this guide; preserved earlier historical entries.
- Verification: skill metadata validation, active-name and local reference checks, and git diff --check passed. Documentation-only changes require no site build.
