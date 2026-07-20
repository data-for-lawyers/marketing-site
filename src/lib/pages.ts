export type PageKey =
  | 'services'
  | 'about'
  | 'pricing'
  | 'blog'
  | 'faqs'
  | 'contact'
  | 'privacy'
  | 'terms';

export type PagesEnabled = Record<PageKey, boolean>;

export const DEFAULT_PAGES_ENABLED: PagesEnabled = {
  services: true,
  about: true,
  pricing: true,
  blog: true,
  faqs: true,
  contact: true,
  privacy: true,
  terms: true,
};

const PATH_TO_PAGE: Record<string, PageKey> = {
  '/services': 'services',
  '/about-us': 'about',
  '/pricing': 'pricing',
  '/blog': 'blog',
  '/faqs': 'faqs',
  '/contact-us': 'contact',
  '/privacy-policy': 'privacy',
  '/terms-of-service': 'terms',
};

export function normalizePath(path: string): string {
  if (!path) return '/';
  const bare = path.split('?')[0].split('#')[0];
  if (bare.length > 1 && bare.endsWith('/')) return bare.slice(0, -1);
  return bare;
}

export function getPageKey(path: string): PageKey | null {
  const normalized = normalizePath(path);
  if (PATH_TO_PAGE[normalized]) return PATH_TO_PAGE[normalized];
  if (normalized.startsWith('/blog/')) return 'blog';
  return null;
}

export function isPageEnabled(
  pagesEnabled: Partial<PagesEnabled> | null | undefined,
  path: string,
): boolean {
  const key = getPageKey(path);
  if (!key) return true;
  return pagesEnabled?.[key] !== false;
}

export function notFoundIfDisabled(
  pagesEnabled: Partial<PagesEnabled> | null | undefined,
  path: string,
): Response | null {
  if (isPageEnabled(pagesEnabled, path)) return null;
  return new Response(null, { status: 404, statusText: 'Not found' });
}
