import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const lifeEntries = await getCollection('life');
  const readingEntries = await getCollection('reading');

  // 合併所有文章並按日期排序
  const allPosts = [...lifeEntries, ...readingEntries]
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: '我的生活與閱讀分享',
    description: '分享生活點滴與讀書心得',
    site: context.site,
    items: allPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/${post.collection}/${post.slug}/`,
      categories: post.data.tags || [],
    })),
    customData: `<language>zh-CN</language>`,
  });
} 