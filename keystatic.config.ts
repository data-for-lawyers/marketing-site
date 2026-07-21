import { config, fields, collection, singleton } from '@keystatic/core';

/** Uploadable image stored under `public/images/{folder}/`. */
const imageField = (label: string, folder: string) =>
  fields.image({
    label,
    directory: `public/images/${folder}`,
    publicPath: `/images/${folder}/`,
  });

const bulletItem = fields.text({ label: 'Bullet' });

const navLink = fields.object({
  label: fields.text({ label: 'Label' }),
  href: fields.text({ label: 'URL path' }),
  enabled: fields.checkbox({ label: 'Show in navigation', defaultValue: true }),
});

const pagesEnabled = fields.object(
  {
    services: fields.checkbox({ label: 'Services', defaultValue: true }),
    about: fields.checkbox({ label: 'About Us', defaultValue: true }),
    pricing: fields.checkbox({ label: 'Pricing', defaultValue: true }),
    blog: fields.checkbox({ label: 'Blog', defaultValue: true }),
    faqs: fields.checkbox({ label: 'FAQs', defaultValue: true }),
    contact: fields.checkbox({ label: 'Contact', defaultValue: true }),
    privacy: fields.checkbox({ label: 'Privacy Policy', defaultValue: true }),
    terms: fields.checkbox({ label: 'Terms of Service', defaultValue: true }),
  },
  { label: 'Published Pages' },
);

const serviceItem = fields.object({
  title: fields.text({ label: 'Title' }),
  description: fields.text({ label: 'Description', multiline: true }),
  bullets: fields.array(bulletItem, {
    label: 'Bullet Points',
    itemLabel: (props) => props.value ?? 'Bullet',
  }),
  image: imageField('Image', 'homepage/services'),
});

const whyItem = fields.object({
  title: fields.text({ label: 'Title' }),
  description: fields.text({ label: 'Description', multiline: true }),
});

const faqItem = fields.object({
  question: fields.text({ label: 'Question' }),
  answer: fields.text({ label: 'Answer', multiline: true }),
});

const aboutSection = fields.object({
  title: fields.text({ label: 'Title' }),
  body: fields.text({ label: 'Body', multiline: true }),
  bullets: fields.array(bulletItem, {
    label: 'Bullet Points',
    itemLabel: (props) => props.value ?? 'Bullet',
  }),
});

const servicesFeature = fields.object({
  title: fields.text({ label: 'Title' }),
  description: fields.text({ label: 'Description', multiline: true }),
  image: imageField('Image', 'services'),
});

const servicesOffering = fields.object({
  title: fields.text({ label: 'Title' }),
  description: fields.text({ label: 'Description', multiline: true }),
  image: imageField('Image', 'services'),
  bullets: fields.array(bulletItem, {
    label: 'Bullet Points',
    itemLabel: (props) => props.value ?? 'Bullet',
  }),
});

const testimonialItem = fields.object({
  name: fields.text({ label: 'Name' }),
  role: fields.text({ label: 'Role' }),
  quote: fields.text({ label: 'Quote', multiline: true }),
  image: imageField('Photo (optional)', 'homepage/testimonials'),
});

const comparisonColumn = fields.object({
  title: fields.text({ label: 'Title' }),
  description: fields.text({ label: 'Description', multiline: true }),
  bullets: fields.array(bulletItem, {
    label: 'Bullet Points',
    itemLabel: (props) => props.value ?? 'Bullet',
  }),
});

const pricingPlan = fields.object({
  name: fields.text({ label: 'Plan Name' }),
  description: fields.text({ label: 'Description', multiline: true }),
  price: fields.text({ label: 'Price' }),
  period: fields.text({ label: 'Period', defaultValue: '/month' }),
  badge: fields.text({ label: 'Badge (optional)' }),
  featured: fields.checkbox({ label: 'Featured plan', defaultValue: false }),
  cta: fields.text({ label: 'CTA Label' }),
  features: fields.array(bulletItem, {
    label: 'Features',
    itemLabel: (props) => props.value ?? 'Feature',
  }),
});

const legalSection = fields.object({
  title: fields.text({ label: 'Heading' }),
  body: fields.text({ label: 'Body', multiline: true }),
});

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishedDate: fields.date({ label: 'Published Date' }),
        author: fields.text({ label: 'Author', defaultValue: 'Data for Lawyers' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        coverImage: imageField('Cover Image', 'posts'),
        published: fields.checkbox({ label: 'Published', defaultValue: false }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'public/images/blog',
              publicPath: '/images/blog/',
            },
          },
        }),
      },
    }),
  },
  singletons: {
    site: singleton({
      label: 'Site Settings',
      path: 'src/content/site/',
      schema: {
        companyName: fields.text({ label: 'Company Name' }),
        tagline: fields.text({ label: 'Tagline', multiline: true }),
        phone: fields.text({ label: 'Phone' }),
        email: fields.text({ label: 'Email' }),
        demoUrl: fields.url({ label: 'Demo URL' }),
        signInUrl: fields.url({ label: 'Sign In URL' }),
        logoUrl: imageField('Logo', 'site'),
        logoLightUrl: imageField('Light Logo', 'site'),
        privacyUrl: fields.url({ label: 'Privacy Policy URL' }),
        termsUrl: fields.url({ label: 'Terms URL' }),
        linkedInUrl: fields.url({ label: 'LinkedIn URL' }),
        headerCtaLabel: fields.text({ label: 'Header CTA Label', defaultValue: 'Get in touch' }),
        headerCtaUrl: fields.text({ label: 'Header CTA URL', defaultValue: '/contact-us' }),
        signInLabel: fields.text({ label: 'Sign In Label', defaultValue: 'Log in' }),
        demoCtaLabel: fields.text({ label: 'Demo CTA Label', defaultValue: 'Book a demo' }),
        footerCompanyHeading: fields.text({ label: 'Footer Company Heading', defaultValue: 'Company' }),
        footerResourcesHeading: fields.text({
          label: 'Footer Resources Heading',
          defaultValue: 'Resources',
        }),
        footerGetStartedHeading: fields.text({
          label: 'Footer Get Started Heading',
          defaultValue: 'Get started',
        }),
        copyrightSuffix: fields.text({
          label: 'Copyright Suffix',
          defaultValue: 'All rights reserved.',
        }),
        ctaTitle: fields.text({ label: 'Shared CTA Title' }),
        ctaPrimaryLabel: fields.text({ label: 'Shared CTA Button Label', defaultValue: 'Get started' }),
        ctaImageUrl: imageField('Shared CTA Image', 'site'),
        ctaPoints: fields.array(bulletItem, {
          label: 'Shared CTA Points',
          itemLabel: (props) => props.value ?? 'Point',
        }),
        pagesEnabled,
        navLinks: fields.array(navLink, {
          label: 'Primary Navigation',
          itemLabel: (props) => props.fields.label.value,
        }),
      },
    }),
    homepage: singleton({
      label: 'Homepage',
      path: 'src/content/homepage/',
      schema: {
        heroTitle: fields.text({ label: 'Hero Title', multiline: true }),
        heroSubtitle: fields.text({ label: 'Hero Subtitle', multiline: true }),
        heroImage: imageField('Hero Image', 'homepage'),
        heroCta: fields.text({ label: 'Hero CTA Label' }),
        heroCtaUrl: fields.text({ label: 'Hero CTA URL', defaultValue: '/contact-us' }),
        heroTrustCount: fields.text({ label: 'Hero Trust Count', defaultValue: '10k+' }),
        heroTrustCopy: fields.text({ label: 'Hero Trust Copy', multiline: true }),
        heroFloatLabel: fields.text({ label: 'Hero Float Label' }),
        heroFloatMeta: fields.text({ label: 'Hero Float Meta' }),
        heroAvatars: fields.array(imageField('Avatar', 'homepage/avatars'), {
          label: 'Hero Trust Avatars',
          itemLabel: () => 'Avatar',
        }),
        servicesTitle: fields.text({ label: 'Services Title' }),
        servicesDescription: fields.text({ label: 'Services Description', multiline: true }),
        carriersEyebrow: fields.text({ label: 'Carriers Eyebrow', defaultValue: 'Coverage' }),
        servicesEyebrow: fields.text({ label: 'Services Eyebrow', defaultValue: 'Capabilities' }),
        whyEyebrow: fields.text({ label: 'How It Works Eyebrow' }),
        whyTitle: fields.text({ label: 'How It Works Title' }),
        whyDescription: fields.text({ label: 'How It Works Description', multiline: true }),
        whyCtaLabel: fields.text({ label: 'How It Works CTA Label', defaultValue: 'Get started' }),
        aboutEyebrow: fields.text({ label: 'About Eyebrow' }),
        aboutTitle: fields.text({ label: 'About Title' }),
        aboutDescription: fields.text({ label: 'About Description', multiline: true }),
        aboutCta: fields.text({ label: 'About CTA Label' }),
        comparisonEyebrow: fields.text({ label: 'Comparison Eyebrow', defaultValue: 'Why Us' }),
        comparisonTitle: fields.text({ label: 'Comparison Title' }),
        comparisonDescription: fields.text({ label: 'Comparison Description', multiline: true }),
        comparisonOther: comparisonColumn,
        comparisonOurs: comparisonColumn,
        testimonialsEyebrow: fields.text({ label: 'Testimonials Eyebrow', defaultValue: 'Testimonials' }),
        testimonialsTitle: fields.text({ label: 'Testimonials Title' }),
        testimonialsDescription: fields.text({
          label: 'Testimonials Description',
          multiline: true,
        }),
        faqEyebrow: fields.text({ label: 'FAQ Eyebrow', defaultValue: 'FAQ' }),
        faqTitle: fields.text({ label: 'FAQ Title' }),
        faqDescription: fields.text({ label: 'FAQ Description', multiline: true }),
        faqBrowseAllLabel: fields.text({
          label: 'FAQ Browse All Label',
          defaultValue: 'Browse all FAQs →',
        }),
        ctaEyebrow: fields.text({ label: 'Bottom CTA Eyebrow', defaultValue: 'Get Started' }),
        ctaDescription: fields.text({ label: 'Bottom CTA Description', multiline: true }),
        contactEyebrow: fields.text({ label: 'Contact Eyebrow' }),
        contactTitle: fields.text({ label: 'Contact Title' }),
        contactDescription: fields.text({ label: 'Contact Description', multiline: true }),
        contactCta: fields.text({ label: 'Contact CTA Label' }),
        services: fields.array(serviceItem, {
          label: 'Service Cards',
          itemLabel: (props) => props.fields.title.value,
        }),
        whyItems: fields.array(whyItem, {
          label: 'How It Works Steps',
          itemLabel: (props) => props.fields.title.value,
        }),
        carriers: fields.array(
          fields.object({
            name: fields.text({ label: 'Carrier Name' }),
            logo: imageField('Logo', 'carriers'),
          }),
          {
            label: 'Carrier Logos',
            itemLabel: (props) => props.fields.name.value,
          },
        ),
        testimonials: fields.array(testimonialItem, {
          label: 'Testimonials',
          itemLabel: (props) => props.fields.name.value,
        }),
        faqs: fields.array(faqItem, {
          label: 'Homepage FAQs',
          itemLabel: (props) => props.fields.question.value,
        }),
      },
    }),
    about: singleton({
      label: 'About Page',
      path: 'src/content/about/',
      schema: {
        title: fields.text({ label: 'Page Title' }),
        eyebrow: fields.text({ label: 'Hero Eyebrow' }),
        heroTitle: fields.text({ label: 'Hero Title' }),
        introTitle: fields.text({ label: 'Intro Title' }),
        intro: fields.text({ label: 'Intro', multiline: true }),
        missionLabel: fields.text({ label: 'Mission Label' }),
        missionTitle: fields.text({ label: 'Mission Title' }),
        visionLabel: fields.text({ label: 'Vision Label' }),
        visionTitle: fields.text({ label: 'Vision Title' }),
        heroImage: imageField('Hero Image', 'about'),
        missionImage: imageField('Mission Image', 'about'),
        visionImage: imageField('Vision Image', 'about'),
        sections: fields.array(aboutSection, {
          label: 'Sections',
          itemLabel: (props) => props.fields.title.value,
        }),
        ctaTitle: fields.text({ label: 'CTA Title Override (optional)' }),
        ctaDescription: fields.text({ label: 'CTA Description (optional)', multiline: true }),
      },
    }),
    services: singleton({
      label: 'Services Page',
      path: 'src/content/services/',
      schema: {
        title: fields.text({ label: 'Page Title' }),
        eyebrow: fields.text({ label: 'Hero Eyebrow' }),
        subtitle: fields.text({ label: 'Hero Title' }),
        introTitle: fields.text({ label: 'Intro Title' }),
        intro: fields.text({ label: 'Intro', multiline: true }),
        offeringsLabel: fields.text({
          label: 'Offerings Panel Label',
          defaultValue: 'Data for Lawyers helps you',
        }),
        loadMoreLabel: fields.text({ label: 'Load More Label', defaultValue: 'Load More' }),
        features: fields.array(servicesFeature, {
          label: 'Core Features',
          itemLabel: (props) => props.fields.title.value,
        }),
        offerings: fields.array(servicesOffering, {
          label: 'Service Offerings',
          itemLabel: (props) => props.fields.title.value,
        }),
        ctaTitle: fields.text({ label: 'CTA Title' }),
        ctaDescription: fields.text({ label: 'CTA Description', multiline: true }),
      },
    }),
    pricing: singleton({
      label: 'Pricing Page',
      path: 'src/content/pricing/',
      schema: {
        title: fields.text({ label: 'Page Title' }),
        eyebrow: fields.text({ label: 'Hero Eyebrow' }),
        heroTitle: fields.text({ label: 'Hero Title' }),
        introTitle: fields.text({ label: 'Intro Title' }),
        intro: fields.text({ label: 'Intro', multiline: true }),
        description: fields.text({ label: 'Meta Description', multiline: true }),
        plans: fields.array(pricingPlan, {
          label: 'Plans',
          itemLabel: (props) => props.fields.name.value,
        }),
      },
    }),
    blog: singleton({
      label: 'Blog Page',
      path: 'src/content/blog/',
      schema: {
        title: fields.text({ label: 'Page Title' }),
        eyebrow: fields.text({ label: 'Hero Eyebrow' }),
        heroTitle: fields.text({ label: 'Hero Title' }),
        introTitle: fields.text({ label: 'Intro Title' }),
        intro: fields.text({ label: 'Intro', multiline: true }),
        description: fields.text({ label: 'Meta Description', multiline: true }),
        emptyState: fields.text({ label: 'Empty State Message', multiline: true }),
        defaultCoverImage: imageField('Default Cover Image', 'blog'),
        loadMoreLabel: fields.text({ label: 'Load More Label', defaultValue: 'Load More' }),
        backLabel: fields.text({ label: 'Back to Blog Label', defaultValue: '← Back to Blog' }),
      },
    }),
    faqs: singleton({
      label: 'FAQs Page',
      path: 'src/content/faqs/',
      schema: {
        title: fields.text({ label: 'Page Title' }),
        eyebrow: fields.text({ label: 'Hero Eyebrow' }),
        heroTitle: fields.text({ label: 'Hero Title' }),
        description: fields.text({ label: 'Description', multiline: true }),
        items: fields.array(faqItem, {
          label: 'FAQs',
          itemLabel: (props) => props.fields.question.value,
        }),
        footerNote: fields.text({ label: 'Footer Note', multiline: true }),
      },
    }),
    contact: singleton({
      label: 'Contact Page',
      path: 'src/content/contact/',
      schema: {
        title: fields.text({ label: 'Page Title' }),
        eyebrow: fields.text({ label: 'Hero Eyebrow' }),
        description: fields.text({ label: 'Description', multiline: true }),
        sectionEyebrow: fields.text({ label: 'Form Section Eyebrow' }),
        formTitle: fields.text({ label: 'Form Section Title' }),
        sideCtaLabel: fields.text({ label: 'Side CTA Label' }),
        formSubmitLabel: fields.text({ label: 'Form Submit Label' }),
        namePlaceholder: fields.text({ label: 'Name Placeholder', defaultValue: 'Name' }),
        phonePlaceholder: fields.text({ label: 'Phone Placeholder', defaultValue: 'Phone' }),
        emailPlaceholder: fields.text({
          label: 'Email Placeholder',
          defaultValue: 'Email Address',
        }),
        messagePlaceholder: fields.text({ label: 'Message Placeholder', defaultValue: 'Message' }),
      },
    }),
    privacy: singleton({
      label: 'Privacy Policy',
      path: 'src/content/privacy/',
      schema: {
        title: fields.text({ label: 'Page Title' }),
        eyebrow: fields.text({ label: 'Hero Eyebrow' }),
        description: fields.text({ label: 'Meta Description', multiline: true }),
        introTitle: fields.text({ label: 'Intro Title' }),
        intro: fields.text({ label: 'Intro', multiline: true }),
        sections: fields.array(legalSection, {
          label: 'Sections',
          itemLabel: (props) => props.fields.title.value,
        }),
      },
    }),
    terms: singleton({
      label: 'Terms of Service',
      path: 'src/content/terms/',
      schema: {
        title: fields.text({ label: 'Page Title' }),
        eyebrow: fields.text({ label: 'Hero Eyebrow' }),
        description: fields.text({ label: 'Meta Description', multiline: true }),
        introTitle: fields.text({ label: 'Intro Title' }),
        intro: fields.text({ label: 'Intro', multiline: true }),
        sections: fields.array(legalSection, {
          label: 'Sections',
          itemLabel: (props) => props.fields.title.value,
        }),
      },
    }),
  },
});
