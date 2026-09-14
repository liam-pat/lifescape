---
name: article-english
description: Create or synchronize English versions of Chinese Lifescape articles in src/content/life, src/content/reading, or src/content/technology when requested. Do not use for UI copy, repository documentation, or posts in other blog layouts.
---

# Article English Version

Translate only the requested articles, preserving the author's meaning and the site's existing bilingual structure. Follow [AGENTS.md](../../../AGENTS.md) for repository commands and delivery; this skill adds translation-specific requirements.

## Identify the Article and Existing Translation

- Read the Chinese source, [content schema](../../../src/content.config.ts), and [path/key helpers](../../../src/lib/content.ts). Treat the Chinese article as authoritative unless the user says otherwise.
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
- Translate reader-facing `title`, `description`, and `subtitle` when present. Preserve existing frontmatter keys and types, except the language/key changes above; quote YAML strings when punctuation requires it.
- Preserve `date` and `book.rating` exactly. Use established English `book.title` and `book.author` values when confidently known; otherwise keep the originals.
- Translate Chinese tags into concise English, retain existing English tags, and add no tags absent from the source.
- On updates, revise or remove stale English material to match the current source. Flag unresolved ambiguities that materially affect meaning.

## Preserve Markdown and Media Behavior

- Preserve heading hierarchy, lists, quotations, tables, emphasis, footnotes, and raw HTML structure.
- Translate reader-facing link labels, captions, alt text, and accessibility text. Preserve functional HTML attributes such as `src`, `width`, and `data-*`, apart from necessary path adjustments.
- Preserve `#live` and `#hdr` markers in image URLs and alt text. The article layout also uses alt-text tokens for sizing: preserve `landscape`, `portrait`, and `square`, or map `横屏`, `竖屏`, and `正方` to those English tokens.
- Keep external and root-relative URLs unchanged. Check relative assets and links at the English output location and generated route; adjust only references whose resolution changes, rather than blindly adding `../`.
- Replace an internal page destination only when its English counterpart exists. Update fragment links affected by translated headings and preserve explicit anchor IDs.

## Verify and Report

- Compare source and translation section by section for omissions, altered meaning, terminology, and numbers. Check frontmatter, HTML/Markdown integrity, and media references.
- Run `npm run build` using the environment described in [AGENTS.md](../../../AGENTS.md#local-development-and-verification).
- Inspect the generated Chinese and English article pages: both routes must exist, each language switch must point to its counterpart, and canonical/`hreflang` URLs must use the expected production site URL and article paths.
- Verify association uniqueness using effective keys, not just matching explicit `translationKey` fields. For rendering or navigation changes, verify affected pages in the local browser as well.
- Follow the repository's one-restart recovery only if a newly built article stays stale in the running dev server. Report persistent failures or unavailable checks accurately.
- Report the output path, validation results, and any translation ambiguity needing the author's judgment in the user's conversational language; keep the article itself in English.
