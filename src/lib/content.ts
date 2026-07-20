import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';
import { resolveCmsImage, resolveCmsImages } from './images';
import { getVisibleNavLinks } from './nav';
import { DEFAULT_PAGES_ENABLED } from './pages';

const reader = createReader(process.cwd(), keystaticConfig);

function requireContent<T>(value: T | null, path: string): T {
  if (!value) {
    throw new Error(`Missing CMS content. Check ${path}.`);
  }
  return value;
}

function normalizeSite(site: NonNullable<Awaited<ReturnType<typeof reader.singletons.site.read>>>) {
  const pagesEnabled = {
    ...DEFAULT_PAGES_ENABLED,
    ...(site.pagesEnabled ?? {}),
  };

  return {
    ...site,
    pagesEnabled,
    logoUrl: resolveCmsImage(site.logoUrl, '/images/site/'),
    logoLightUrl: resolveCmsImage(site.logoLightUrl, '/images/site/'),
    ctaImageUrl: resolveCmsImage(site.ctaImageUrl, '/images/site/'),
    navLinks: getVisibleNavLinks(site.navLinks, pagesEnabled),
  };
}

function normalizeHomepage(
  homepage: NonNullable<Awaited<ReturnType<typeof reader.singletons.homepage.read>>>,
) {
  return {
    ...homepage,
    heroImage: resolveCmsImage(homepage.heroImage, '/images/homepage/'),
    heroAvatars: resolveCmsImages(homepage.heroAvatars, '/images/homepage/avatars/'),
    services: homepage.services.map((service) => ({
      ...service,
      image: resolveCmsImage(service.image, '/images/homepage/services/'),
    })),
    carriers: homepage.carriers.map((carrier) =>
      typeof carrier === 'string'
        ? { name: carrier, logo: '' }
        : {
            name: carrier.name,
            logo: resolveCmsImage(carrier.logo, '/images/carriers/'),
          },
    ),
    testimonials: homepage.testimonials.map((item) => ({
      ...item,
      image: resolveCmsImage(item.image, '/images/homepage/testimonials/'),
    })),
  };
}

function normalizeAbout(about: NonNullable<Awaited<ReturnType<typeof reader.singletons.about.read>>>) {
  return {
    ...about,
    heroImage: resolveCmsImage(about.heroImage, '/images/about/'),
    missionImage: resolveCmsImage(about.missionImage, '/images/about/'),
    visionImage: resolveCmsImage(about.visionImage, '/images/about/'),
  };
}

function normalizeServices(
  services: NonNullable<Awaited<ReturnType<typeof reader.singletons.services.read>>>,
) {
  return {
    ...services,
    features: services.features.map((feature) => ({
      ...feature,
      image: resolveCmsImage(feature.image, '/images/services/'),
    })),
    offerings: services.offerings.map((offering) => ({
      ...offering,
      image: resolveCmsImage(offering.image, '/images/services/'),
    })),
  };
}

function normalizeBlog(blog: NonNullable<Awaited<ReturnType<typeof reader.singletons.blog.read>>>) {
  return {
    ...blog,
    defaultCoverImage: resolveCmsImage(blog.defaultCoverImage, '/images/blog/'),
  };
}

export async function getSite() {
  return normalizeSite(requireContent(await reader.singletons.site.read(), 'src/content/site'));
}

export async function getSiteContent() {
  const [site, homepage] = await Promise.all([
    reader.singletons.site.read(),
    reader.singletons.homepage.read(),
  ]);

  return {
    site: normalizeSite(requireContent(site, 'src/content/site')),
    homepage: normalizeHomepage(requireContent(homepage, 'src/content/homepage')),
  };
}

export async function getAboutContent() {
  const [site, about] = await Promise.all([getSite(), reader.singletons.about.read()]);
  return { site, about: normalizeAbout(requireContent(about, 'src/content/about')) };
}

export async function getServicesContent() {
  const [site, services] = await Promise.all([getSite(), reader.singletons.services.read()]);
  return { site, services: normalizeServices(requireContent(services, 'src/content/services')) };
}

export async function getFaqsContent() {
  const [site, faqs] = await Promise.all([getSite(), reader.singletons.faqs.read()]);
  return { site, faqs: requireContent(faqs, 'src/content/faqs') };
}

export async function getContactContent() {
  const [site, contact] = await Promise.all([getSite(), reader.singletons.contact.read()]);
  return { site, contact: requireContent(contact, 'src/content/contact') };
}

export async function getPricingContent() {
  const [site, pricing] = await Promise.all([getSite(), reader.singletons.pricing.read()]);
  return { site, pricing: requireContent(pricing, 'src/content/pricing') };
}

export async function getBlogPageContent() {
  const [site, blog] = await Promise.all([getSite(), reader.singletons.blog.read()]);
  return { site, blog: normalizeBlog(requireContent(blog, 'src/content/blog')) };
}

export async function getPrivacyContent() {
  const [site, privacy] = await Promise.all([getSite(), reader.singletons.privacy.read()]);
  return { site, privacy: requireContent(privacy, 'src/content/privacy') };
}

export async function getTermsContent() {
  const [site, terms] = await Promise.all([getSite(), reader.singletons.terms.read()]);
  return { site, terms: requireContent(terms, 'src/content/terms') };
}

export function getSharedCta(site: Awaited<ReturnType<typeof getSite>>) {
  return {
    title: site.ctaTitle,
    primaryLabel: site.ctaPrimaryLabel,
    points: site.ctaPoints,
    imageUrl: site.ctaImageUrl,
  };
}
