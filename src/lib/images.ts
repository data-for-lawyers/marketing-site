/**
 * Normalize Keystatic image field values to public URLs.
 * Supports seeded filenames (`hero.jpg`) and full paths (`/images/...`).
 */
export function resolveCmsImage(
  value: string | null | undefined,
  publicPath: string,
): string {
  if (!value) return '';
  if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/')) {
    return value;
  }
  const base = publicPath.endsWith('/') ? publicPath : `${publicPath}/`;
  return `${base}${value}`;
}

export function resolveCmsImages(
  values: readonly (string | null | undefined)[] | null | undefined,
  publicPath: string,
): string[] {
  return (values ?? []).map((value) => resolveCmsImage(value, publicPath)).filter(Boolean);
}
