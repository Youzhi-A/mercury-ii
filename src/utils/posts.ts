import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export const CATEGORIES = ['随想', '随笔', '小论文'] as const;

export function publishedPosts(posts: Post[]) {
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function markdownText(body: string) {
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~]/g, ' ');
}

export function wordCount(body: string) {
  const text = markdownText(body);
  const cjk = text.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  const latin = text
    .replace(/[\u3400-\u9fff]/g, ' ')
    .match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)?.length ?? 0;

  return cjk + latin;
}

export function readingTime(body: string) {
  return Math.max(1, Math.ceil(wordCount(body) / 400));
}
