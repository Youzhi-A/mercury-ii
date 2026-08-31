import { getCollection } from 'astro:content';
import { SITE } from '../consts';
import { publishedPosts } from '../utils/posts';
import { sitePath } from '../utils/urls';

export async function GET(context: { site: URL }) {
  const posts = publishedPosts(await getCollection('posts'));
  const absolute = (pathname: string) => new URL(sitePath(pathname), context.site ?? SITE.url).href;
  const body = [
    `# ${SITE.title}`,
    '',
    `> ${SITE.description}`,
    '',
    '主要内容使用简体中文。文章正文以 Markdown 保存。',
    '',
    '## 页面',
    '',
    `- [首页](${absolute('/')})`,
    `- [About](${absolute('/about/')})`,
    `- [文章](${absolute('/posts/')})`,
    `- [标签](${absolute('/tags/')})`,
    `- [随机文章](${absolute('/random/')})`,
    `- [RSS](${absolute('/rss.xml')})`,
    '',
    '## 文章',
    '',
    ...posts.map((post) => `- [${post.data.title}](${absolute(`/posts/${post.id}/`)}): ${post.data.summary}`),
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
