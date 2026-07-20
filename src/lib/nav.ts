export type NavLink = {
  href: string;
  label: string;
};

/** Fallback nav if CMS navLinks are empty. */
export const defaultNavLinks: NavLink[] = [
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/faqs', label: 'FAQs' },
  { href: '/about-us', label: 'About Us' },
];
