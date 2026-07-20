import { isPageEnabled, type PagesEnabled } from './pages';

export type NavLink = {
  href: string;
  label: string;
  enabled?: boolean | null;
};

/** Fallback nav if CMS navLinks are empty. */
export const defaultNavLinks: NavLink[] = [
  { href: '/services', label: 'Services', enabled: true },
  { href: '/blog', label: 'Blog', enabled: true },
  { href: '/pricing', label: 'Pricing', enabled: true },
  { href: '/faqs', label: 'FAQs', enabled: true },
  { href: '/about-us', label: 'About Us', enabled: true },
];

export function getVisibleNavLinks(
  navLinks: readonly NavLink[] | null | undefined,
  pagesEnabled?: Partial<PagesEnabled> | null,
): NavLink[] {
  const links = navLinks?.length ? [...navLinks] : [...defaultNavLinks];
  return links.filter(
    (link) => link.enabled !== false && isPageEnabled(pagesEnabled, link.href),
  );
}
