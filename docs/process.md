# Process Guide

## Purpose

This file uses a `History + Current` model to support continuous AI handoff:

- `History`: Preserve confirmed process decisions. Do not rewrite old entries.
- `Current`: Track only what is actively being executed or queued next.

---

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

## Current

> Append all new requests under this section. Do not directly edit `History`.
> If a request is completed, move a short summary into `History` and reset the active `Current` entry.

### [CURRENT] Active Request Template

- Background:
- Goal:
- Scope:
- Non-goals:
- Acceptance Criteria:
- Status:
- Notes:

---

## Current Maintenance Rules

1. New request arrives: add a new entry under `Current` (do not overwrite previous entries).  
2. After completion: move a short summary into `History` and include completion date.  
3. If a process rule changes: append a new decision entry in `History` instead of rewriting old decisions.  

---

## Source of Truth

| Topic | Source of Truth | Strategy for Other Docs |
| --- | --- | --- |
| AI runtime constraints | `AGENTS.md` | `README.md` keeps reader-facing guidance only |
| Commit message convention | `README.md` Section `9` | `AGENTS.md` references only |
| Content model fields | `src/content/config.ts` | Docs provide examples, do not duplicate schema |
| Domain/host configuration | `astro.config.mjs` | Other docs only mention synchronization |
