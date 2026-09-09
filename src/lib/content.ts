import type { CollectionEntry } from 'astro:content';
import type { Locale } from './i18n';

export type PostEntry =
  | CollectionEntry<'life'>
  | CollectionEntry<'reading'>
  | CollectionEntry<'technology'>;

export const getPostSlug = (entry: PostEntry) => entry.id.replace(/^en\//, '');

export const getTranslationKey = (entry: PostEntry) =>
  entry.data.translationKey ?? getPostSlug(entry);

export const getPostPath = (entry: PostEntry) => {
  const prefix = entry.data.lang === 'en' ? '/en' : '';
  return `${prefix}/${entry.collection}/${getPostSlug(entry)}/`;
};

export const isPostLocale = (entry: PostEntry, locale: Locale) => entry.data.lang === locale;
