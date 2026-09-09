import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { getPostPath, type PostEntry } from './content';
import { localeLanguageTags, ui, type Locale } from './i18n';

export const createLocalizedRss = async (context: APIContext, locale: Locale) => {
  const lifeEntries = await getCollection('life', ({ data }) => data.lang === locale);
  const readingEntries = await getCollection('reading', ({ data }) => data.lang === locale);
  const technologyEntries = await getCollection('technology', ({ data }) => data.lang === locale);
  const allPosts: PostEntry[] = [...lifeEntries, ...readingEntries, ...technologyEntries]
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: locale === 'zh' ? 'Mr.Pat Lifescape' : 'Mr.Pat Lifescape in English',
    description: ui[locale].siteDescription,
    site: context.site ?? new URL('https://life.biyongyao.com'),
    items: allPosts.map((post) => ({
      title: post.collection === 'reading' && post.data.subtitle
        ? `${post.data.title}: ${post.data.subtitle}`
        : post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: getPostPath(post),
      categories: post.data.tags,
    })),
    customData: `
      <language>${localeLanguageTags[locale]}</language>
      <image>
        <url>https://s21.ax1x.com/2025/05/23/pEztyvQ.png</url>
        <title>Mr.Pat Lifescape</title>
        <link>https://life.biyongyao.com</link>
      </image>
      <follow_challenge>
        <feedId>148564006964797440</feedId>
        <userId>83722505120690176</userId>
      </follow_challenge>
    `,
  });
};
