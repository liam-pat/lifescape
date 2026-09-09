---
name: article-english
description: Translates or synchronizes Chinese Lifescape Markdown articles in src/content/life, src/content/reading, or src/content/technology into English. Use when the user requests an English article version or asks to update one from its Chinese source. Do not use for UI copy, README files, or unrelated documents.
---

# Article English Version

Translate the requested Chinese article into natural English and save it using this project's existing bilingual content structure. The site already supports Chinese and English.

## Identify the source

Before editing:

- Read applicable project instructions and `src/content.config.ts`.
- Treat the Chinese article as the content source of truth unless the user says otherwise.
- Read the existing English counterpart before updating it.
- If the source article cannot be uniquely identified from the request or context, ask for its path.

## Use the bilingual content structure

- Articles belong to one of the existing `life`, `reading`, or `technology` collections under `src/content/`.
- For a Chinese source at `src/content/<collection>/<filename>.md`, create or update its English version at `src/content/<collection>/en/<filename>.md`.
- Create `src/content/<collection>/en/` before writing when the target directory does not exist.
- Set `lang: en` in the English article's frontmatter. Do not add a `slug` field; routes derive from the collection and filename.
- Keep the same filename for the Chinese and English files by default. Matching filenames link the translations automatically, so do not introduce `translationKey` for a new same-filename pair.
- If an existing pair already uses `translationKey`, verify that both articles use the same value. Repair a missing or mismatched value instead of leaving a one-sided association.
- Use different filenames only when the user or existing content requires it. In that case, set the same `translationKey` value in both articles and ensure that the value identifies exactly one Chinese article and one English article within the collection.
- Do not translate or rename collection directory names.

## Preserve the author's voice

- Preserve meaning, perspective, tone, humor, and degree of certainty.
- Write clear, idiomatic English. Restructure sentences where needed without changing the argument or emphasis.
- Preserve all substantive details, examples, qualifications, and conclusions. Do not summarize, embellish, or add unsupported claims.
- Match the source's level of formality. Do not turn a personal article into marketing copy or an academic essay.
- Use established English technical terminology consistently. Preserve product names and code identifiers.
- Translate culturally specific expressions by meaning. Add brief context only when necessary for comprehension.
- Flag unresolved ambiguities that materially affect meaning instead of inventing an interpretation.

## Translate frontmatter correctly

- Translate reader-facing `title`, `description`, and `subtitle` values when present.
- Preserve `date` and `book.rating` exactly. Keep asset references pointing to the same files, adjusting only the relative path required by the English file's location.
- For reading articles, use established English values for `book.title` and `book.author` when confidently known. Otherwise preserve the original values rather than inventing them.
- Translate Chinese tags into concise English, preserve tags already written in English, and do not add new tags that are absent from the source.
- Preserve existing frontmatter keys and value types. Apply `lang` and `translationKey` exactly as described above; never add a `slug` field.

## Preserve Markdown integrity

- Preserve heading hierarchy, lists, quotations, tables, emphasis, and footnotes.
- Keep executable code, commands, and identifiers intact.
- Preserve raw HTML structure, tag order, and functional attributes such as `src`, `width`, and `data-*`. Translate only reader-facing text and appropriate accessibility text inside raw HTML.
- Preserve functional `#live` and `#hdr` markers wherever they appear in image URLs or alt text.
- Translate reader-facing image alt text and captions while preserving any functional markers. Because the English file is one directory deeper, verify and adjust relative asset paths when necessary.
- Translate link labels and preserve external URLs. Replace an internal destination only when a corresponding English page is confirmed.
- Check fragment links affected by translated headings. Preserve explicit anchor IDs when appropriate.

## Create or update the English article

- Process only the articles within the user's requested scope.
- Leave the Chinese article body unchanged. Updating its `translationKey` is allowed only when required to establish or repair the translation association.
- When updating an existing English article, preserve editorial improvements only when they remain faithful to the current Chinese source. Remove or revise stale translated content when the source has changed.
- Save the result in the established English location.
- Keep changes focused on article translation. Do not redesign localization, routing, or site configuration.

## Verify and report

- Compare source and translation section by section for omissions, altered meaning, inconsistent terminology, and incorrect numbers.
- Check frontmatter, Markdown syntax, asset paths, links, and language associations.
- Run `npm run build`.
- Do not restart the development container routinely.
- If the build generates the new route but the running local development page remains stale or empty, run `docker-compose -f docker-compose.local.yml restart` once to refresh Astro's content index, then recheck the page. If it remains stale, report the problem instead of repeatedly restarting.
- Confirm that both the Chinese and English routes are generated and that each language switch points to the other article.
- Confirm that canonical and `hreflang` URLs match the current and alternate articles.
- When `translationKey` is used, confirm that exactly one Chinese article and one English article in the collection share that value.
- Briefly report the output path, validation result, and any translation questions requiring the author's judgment.
- Use the user's conversational language for the completion report; keep the article itself in English.
