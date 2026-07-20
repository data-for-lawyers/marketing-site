/** Prefix an internal path with the Astro `base` (needed for GitHub project Pages). */
export function withBase(path: string): string {
  if (!path || path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = path.replace(/^\//, '');
  return `${normalizedBase}${normalizedPath}`;
}
