import { createReader } from '@keystatic/core/reader';
import Markdoc from '@markdoc/markdoc';
import keystaticConfig from '../../keystatic.config';
import { resolveCmsImage } from './images';

const reader = createReader(process.cwd(), keystaticConfig);

export type PostSummary = {
  slug: string;
  title: string;
  publishedDate: Date;
  author: string;
  excerpt: string;
  coverImage?: string;
};

export type PostPageData = PostSummary & {
  html: string;
};

export async function getPublishedPostSummaries(): Promise<PostSummary[]> {
  const entries = await reader.collections.posts.all();

  return entries
    .filter(({ entry }) => entry?.published !== false)
    .map(({ slug, entry }) => ({
      slug,
      title: entry!.title,
      publishedDate: new Date(entry!.publishedDate as string),
      author: entry!.author,
      excerpt: entry!.excerpt,
      coverImage: resolveCmsImage(entry!.coverImage, '/images/posts/') || undefined,
    }))
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());
}

export async function getPostPageData(slug: string): Promise<PostPageData | null> {
  const entry = await reader.collections.posts.read(slug);

  if (!entry || entry.published === false) {
    return null;
  }

  const content = await entry.content();
  const html = Markdoc.renderers.html(Markdoc.transform(content.node));

  return {
    slug,
    title: entry.title,
    publishedDate: new Date(entry.publishedDate as string),
    author: entry.author,
    excerpt: entry.excerpt,
    coverImage: resolveCmsImage(entry.coverImage, '/images/posts/') || undefined,
    html,
  };
}

export function formatPostDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/** Zerovant-style card date: "12 September 2026" */
export function formatBlogCardDate(date: Date) {
  const day = date.getUTCDate();
  const month = date.toLocaleDateString('en-GB', { month: 'long', timeZone: 'UTC' });
  const year = date.getUTCFullYear();
  return `${day} ${month} ${year}`;
}
