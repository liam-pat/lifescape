import type { CollectionEntry } from 'astro:content';

export type PostEntry = CollectionEntry<'life'> | CollectionEntry<'reading'>;
