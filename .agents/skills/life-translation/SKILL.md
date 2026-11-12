---
name: life-translation
description: Create or synchronize English versions of Chinese Lifescape articles in src/content/life, src/content/reading, or src/content/technology when requested. Do not use for UI copy, repository documentation, or posts in other blog layouts.
---

# Lifescape Article Translation

Translate only the requested articles, preserving the author's meaning and the site's existing bilingual structure.

Use the target project identified by the invoking session or the user. All
project paths below are relative to its root. Follow applicable `AGENTS.md`
instructions for commands and verification. This skill is specific to this
repository's content model; do not apply it to an unrelated project.

For text-only requests, return the translation in chat. Read project context
only as needed; do not write files, change repository metadata, run builds,
or restart servers. File placement, metadata synchronization, and build/route
checks below apply only to requested repository edits.

## Identify the Article and Existing Translation

- Read the Chinese source, content schema at `src/content.config.ts`, and path/key helpers at `src/lib/content.ts` (or their current equivalents in the target project). Treat the Chinese article as authoritative unless the user says otherwise.
- Search the same collection for an existing English counterpart before creating a file. Read it before updating; preserve its filename and faithful editorial improvements.
- Match articles using the implementation's effective key: `translationKey ?? getPostSlug(entry)`, where the default slug is the content entry ID with a leading `en/` removed. A key only matches within the same collection.
- Do not assume an explicit key is required on both sides for an existing association to work: one side can match the other's default slug. Check effective keys before changing metadata.
- If the source or counterpart is ambiguous, ask a focused clarification. Do not choose arbitrarily among multiple matches or overwrite an unrelated English article.

## Place and Link the English Article

- For a new translation of `src/content/<collection>/<filename>.md`, use `src/content/<collection>/en/<filename>.md`. Create the target directory if needed. Collections are `life`, `reading`, and `technology`.
- Set `lang: en`. Keep the source filename for a new pair, and do not add a `slug` field or rename collection directories. Preserve existing published filenames, including legacy capitalization.
- A new same-filename pair needs no `translationKey` when neither article has one. If the source has an explicit key, use it for the English version after checking for collisions.
- For different filenames, preserve an existing working association. When establishing or repairing an association, use the same explicit key on both articles if necessary.
- Check the effective key across the entire collection, including entries without explicit keys: each pair must resolve to exactly one Chinese and one English article. A successful build alone does not enforce this uniqueness.
- Leave the Chinese body unchanged. Change its `translationKey` only if needed to establish or repair the requested pair. Keep routing, site configuration, and unrelated articles outside the translation task.

## Translate the Content and Frontmatter

- Preserve perspective, tone, humor, formality, and degree of certainty. Write natural English without summarizing, embellishing, or adding unsupported claims.
- Keep every substantive detail, example, qualification, conclusion, and number. Translate cultural expressions by meaning, adding brief context only where comprehension requires it.
- Preserve product names, code identifiers, executable code, and commands. Use consistent English technical terminology.
- Use the current Chinese source as the frontmatter baseline, preserving its field types. Translate reader-facing `title`, `description`, and `subtitle` when present; quote YAML strings when punctuation requires it. On updates, synchronize added, changed, and removed source fields, including optional fields such as `description`. Preserve `lang: en` and the working `translationKey` association according to the pairing rules above. Honor any metadata differences explicitly requested by the user.
- Preserve `date` and `book.rating` exactly. Use established English `book.title` and `book.author` values when confidently known; otherwise keep the originals.
- Translate Chinese tags into concise English, retain existing English tags, and add no tags absent from the source.
- On updates, revise or remove stale English material to match the current source. Flag unresolved ambiguities that materially affect meaning.

## Preserve Markdown and Media Behavior

- Preserve heading hierarchy, lists, quotations, tables, emphasis, footnotes, and raw HTML structure.
- Translate reader-facing link labels, captions, alt text, and accessibility text. Preserve functional HTML attributes such as `src`, `width`, and `data-*`, apart from necessary path adjustments.
- Preserve `#live` and `#hdr` markers in image URLs and alt text. The article layout also uses alt-text tokens for sizing: preserve `landscape`, `portrait`, and `square`, or map `横屏`, `竖屏`, and `正方` to those English tokens.
- Keep external URLs unchanged. Keep media pointing to the same resources,
  preserving root-relative asset URLs, query strings, and media markers. Check
  relative assets and links at the English file location and generated route;
  adjust paths only when needed to preserve their targets, not by blindly adding `../`.
- For links to other articles in this site, switch to the English counterpart
  only after confirming that the current build generates its English page;
  the page need not already be deployed. An English source file alone is
  insufficient. This applies to relative, root-relative, and confirmed same-site
  absolute article URLs, not asset URLs.
  Preserve query strings. If the link has a fragment, confirm the corresponding
  English section and its actual anchor ID in the generated page before switching.
  If the complete English target cannot be established, retain the original
  target and report the unresolved mapping.
- Preserve explicit anchor IDs. When translated headings change generated IDs,
  update links within the translated article that target those headings using
  the site's actual anchor-generation behavior. Do not treat media markers as
  heading fragments.
- Fix references broken by the translation or relocation. Report pre-existing
  broken links separately unless repairing them is part of the request.

## Verify and Report

- Compare source and translation section by section for omissions, altered meaning, terminology, and numbers. Check frontmatter, HTML/Markdown integrity, and media references.
- For repository edits, run the content checks and build required by `AGENTS.md`
  in its documented environment. Validate multiple translations together.
- Inspect the generated Chinese and English pages: both article routes must
  exist, language switches must point to the counterpart, and canonical/
  `hreflang` URLs must use the configured production site and article paths.
- Verify association uniqueness using effective keys, not just matching explicit `translationKey` fields. For rendering or navigation changes, verify affected pages in the local browser as well.
- Check affected anchors and relative media/link targets in the generated output.
  If a newly built article stays stale in the running dev server, follow the
  one-restart recovery procedure in `AGENTS.md` and report persistent failures.
- If a check is unavailable or fails, state the reason and what remains unverified;
  never report it as passed.
- Report the output path, validation results, and any translation ambiguity needing the author's judgment in the user's conversational language; keep the article itself in English.
