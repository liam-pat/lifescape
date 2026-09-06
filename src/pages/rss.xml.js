import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const lifeEntries = await getCollection('life');
  const readingEntries = await getCollection('reading');
  const technologyEntries = await getCollection('technology');

  // Sort all posts by date.
  const allPosts = [...lifeEntries, ...readingEntries, ...technologyEntries]
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Mr.Pat lifescape',
    description: '分享生活点滴、读书心得与技术实践',
    site: context.site,
    items: allPosts.map((post) => ({
      title: post.collection === 'reading' && post.data.subtitle
        ? `${post.data.title}：${post.data.subtitle}`
        : post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/${post.collection}/${post.id}/`,
      categories: post.data.tags || [],
    })),
    customData: `
      <language>zh-CN</language>
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
}
