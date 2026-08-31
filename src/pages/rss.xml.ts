import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';
import { publishedPosts } from '../utils/posts';
import { sitePath } from '../utils/urls';

export async function GET(context: { site: URL }) {
  const posts = publishedPosts(await getCollection('posts'));
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: new URL(sitePath('/'), context.site),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      link: sitePath(`/posts/${post.id}/`),
      categories: post.data.tags,
    })),
    customData: '<language>zh-CN</language>',
  });
}
