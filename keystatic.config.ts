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
    terms: fields.checkbox({ label: 'Master Service Agreement', defaultValue: true }),
  },
  { label: 'Published Pages' },
);

const serviceItem = fields.object({
  title: fields.text({ label: 'Title' }),
  description: fields.text({ label: 'Description', multiline: true }),
  bullets: fields.array(bulletItem, {
    label: 'Tags (shown on card)',
    itemLabel: (props) => props.value ?? 'Tag',
  }),
  image: imageField('Image', 'homepage/services'),
});

const faqItem = fields.object({
  question: fields.text({ label: 'Question' }),
  answer: fields.text({ label: 'Answer', multiline: true }),
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
  cta: fields.text({
    label: 'CTA Label',
    description: 'Button goes to the contact page.',
  }),
  features: fields.array(bulletItem, {
    label: 'Features',
    itemLabel: (props) => props.value ?? 'Feature',
  }),
});

const legalSection = fields.object({
  title: fields.text({ label: 'Heading' }),
  body: fields.text({
    label: 'Body',
    multiline: true,
    description:
      'Separate paragraphs with a blank line. Short lines without punctuation become subheadings. Lines starting with (a) or (i) become lists.',
  }),
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
        coverImage: imageField('Cover Image (full-width on post page)', 'posts'),
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
        signInUrl: fields.url({
          label: 'Sign In / Platform URL',
          description: 'Used for Log in and “See the platform”.',
        }),
        logoUrl: imageField('Logo', 'site'),
        logoLightUrl: imageField('Light Logo', 'site'),
        linkedInUrl: fields.url({ label: 'LinkedIn URL' }),
        headerCtaLabel: fields.text({
          label: 'Header CTA Label',
          defaultValue: 'Get in touch',
          description: 'Button goes to the contact page.',
        }),
        signInLabel: fields.text({ label: 'Sign In Label', defaultValue: 'Log in' }),
        demoCtaLabel: fields.text({
          label: 'Footer Contact CTA Label',
          defaultValue: 'Book a demo',
          description: 'Footer “Get started” link to the contact page.',
        }),
        termsLabel: fields.text({
          label: 'Footer MSA Label',
          defaultValue: 'Master Service Agreement',
        }),
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
        ctaPrimaryLabel: fields.text({
          label: 'Shared CTA Button Label',
          defaultValue: 'Get started',
          description: 'Button goes to the contact page.',
        }),
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
        heroCta: fields.text({
          label: 'Hero Primary CTA Label',
          description: 'Button goes to the contact page.',
        }),
        heroSecondaryCta: fields.text({
          label: 'Hero Secondary CTA Label',
          defaultValue: 'See the platform',
          description: 'Links to Site Settings → Sign In / Platform URL.',
        }),
        servicesEyebrow: fields.text({ label: 'Capabilities Kicker', defaultValue: 'Capabilities' }),
        servicesTitle: fields.text({ label: 'Capabilities Title' }),
        servicesDescription: fields.text({ label: 'Capabilities Description', multiline: true }),
        servicesHint: fields.text({
          label: 'Capabilities Rail Hint',
          defaultValue: 'Drag or scroll to explore',
        }),
        servicesCtaLabel: fields.text({
          label: 'Capabilities CTA Label',
          defaultValue: 'Explore all services',
        }),
        comparisonEyebrow: fields.text({ label: 'Comparison Kicker', defaultValue: 'Why Us' }),
        comparisonTitle: fields.text({ label: 'Comparison Title' }),
        comparisonDescription: fields.text({ label: 'Comparison Description', multiline: true }),
        comparisonOther: comparisonColumn,
        comparisonOurs: comparisonColumn,
        testimonialsEyebrow: fields.text({
          label: 'Testimonials Kicker',
          defaultValue: 'Testimonials',
        }),
        faqEyebrow: fields.text({ label: 'FAQ Kicker', defaultValue: 'FAQ' }),
        faqTitle: fields.text({ label: 'FAQ Title' }),
        faqDescription: fields.text({ label: 'FAQ Description', multiline: true }),
        faqBrowseAllLabel: fields.text({
          label: 'FAQ Browse All Label',
          defaultValue: 'Browse all FAQs →',
        }),
        ctaEyebrow: fields.text({ label: 'Bottom CTA Kicker', defaultValue: 'Get Started' }),
        ctaDescription: fields.text({ label: 'Bottom CTA Description', multiline: true }),
        services: fields.array(serviceItem, {
          label: 'Capability Cards',
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
        eyebrow: fields.text({ label: 'Hero Kicker' }),
        heroTitle: fields.text({ label: 'Hero Title' }),
        heroImage: imageField('Hero Image (full-width)', 'about'),
        introEyebrow: fields.text({ label: 'Overview Kicker', defaultValue: 'Overview' }),
        introTitle: fields.text({ label: 'Overview Title' }),
        intro: fields.text({ label: 'Overview Body', multiline: true }),
        missionLabel: fields.text({ label: 'Mission Kicker' }),
        missionTitle: fields.text({ label: 'Mission Title' }),
        missionBody: fields.text({ label: 'Mission Body', multiline: true }),
        missionImage: imageField('Mission Image', 'about'),
        visionLabel: fields.text({ label: 'Vision Kicker' }),
        visionTitle: fields.text({ label: 'Vision Title' }),
        visionBody: fields.text({ label: 'Vision Body', multiline: true }),
        visionImage: imageField('Vision Image', 'about'),
        ctaEyebrow: fields.text({ label: 'CTA Kicker', defaultValue: 'Get Started' }),
        ctaTitle: fields.text({ label: 'CTA Title Override (optional)' }),
        ctaDescription: fields.text({ label: 'CTA Description (optional)', multiline: true }),
      },
    }),
    services: singleton({
      label: 'Services Page',
      path: 'src/content/services/',
      schema: {
        title: fields.text({ label: 'Page Title' }),
        eyebrow: fields.text({ label: 'Hero Kicker' }),
        subtitle: fields.text({ label: 'Hero Title' }),
        introEyebrow: fields.text({ label: 'Overview Kicker', defaultValue: 'Overview' }),
        introTitle: fields.text({ label: 'Overview Title' }),
        intro: fields.text({ label: 'Overview Body', multiline: true }),
        introImage: imageField('Overview Image', 'services'),
        platformEyebrow: fields.text({ label: 'Platform Kicker', defaultValue: 'Platform' }),
        platformTitle: fields.text({
          label: 'Platform Title',
          defaultValue: 'From request to authenticated delivery',
        }),
        platformDescription: fields.text({
          label: 'Platform Description',
          multiline: true,
          defaultValue:
            'One workflow that keeps every records request organized, visible, and ready for legal review.',
        }),
        features: fields.array(servicesFeature, {
          label: 'Platform Steps',
          itemLabel: (props) => props.fields.title.value,
        }),
        pathwaysEyebrow: fields.text({ label: 'Pathways Kicker', defaultValue: 'Pathways' }),
        pathwaysTitle: fields.text({
          label: 'Pathways Title',
          defaultValue: 'Choose the process your jurisdiction requires',
        }),
        pathwaysDescription: fields.text({
          label: 'Pathways Description',
          multiline: true,
          defaultValue:
            'Whether you need a subpoena or a DWQ, Data for Lawyers helps you prepare, track, and manage the request end to end.',
        }),
        offeringsLabel: fields.text({
          label: 'Pathway Bullets Label',
          defaultValue: 'Data for Lawyers helps you',
        }),
        offerings: fields.array(servicesOffering, {
          label: 'Pathways',
          itemLabel: (props) => props.fields.title.value,
        }),
        ctaEyebrow: fields.text({ label: 'CTA Kicker', defaultValue: 'Get Started' }),
        ctaTitle: fields.text({ label: 'CTA Title' }),
        ctaDescription: fields.text({ label: 'CTA Description', multiline: true }),
      },
    }),
    pricing: singleton({
      label: 'Pricing Page',
      path: 'src/content/pricing/',
      schema: {
        title: fields.text({ label: 'Page Title' }),
        eyebrow: fields.text({ label: 'Hero Kicker' }),
        heroTitle: fields.text({ label: 'Hero Title' }),
        introTitle: fields.text({ label: 'Intro Title' }),
        intro: fields.text({ label: 'Intro', multiline: true }),
        description: fields.text({ label: 'Meta Description', multiline: true }),
        plans: fields.array(pricingPlan, {
          label: 'Plans',
          itemLabel: (props) => props.fields.name.value,
        }),
        ctaEyebrow: fields.text({ label: 'CTA Kicker', defaultValue: 'Get Started' }),
      },
    }),
    blog: singleton({
      label: 'Blog Page',
      path: 'src/content/blog/',
      schema: {
        title: fields.text({ label: 'Page Title' }),
        eyebrow: fields.text({ label: 'Hero Kicker' }),
        heroTitle: fields.text({ label: 'Hero Title' }),
        description: fields.text({ label: 'Meta Description', multiline: true }),
        emptyState: fields.text({ label: 'Empty State Message', multiline: true }),
        defaultCoverImage: imageField('Default Cover Image', 'blog'),
        featuredLabel: fields.text({ label: 'Featured Kicker', defaultValue: 'Featured' }),
        featuredCtaLabel: fields.text({
          label: 'Featured CTA Label',
          defaultValue: 'Read article',
        }),
        latestEyebrow: fields.text({ label: 'Latest Kicker', defaultValue: 'Latest' }),
        latestTitle: fields.text({
          label: 'Latest Title',
          defaultValue: 'More from the library',
        }),
        readMoreLabel: fields.text({ label: 'Card Read More Label', defaultValue: 'Read more' }),
        loadMoreLabel: fields.text({ label: 'Load More Label', defaultValue: 'Load More' }),
        backLabel: fields.text({ label: 'Back to Blog Label', defaultValue: '← Back to Blog' }),
        ctaEyebrow: fields.text({ label: 'CTA Kicker', defaultValue: 'Get Started' }),
      },
    }),
    faqs: singleton({
      label: 'FAQs Page',
      path: 'src/content/faqs/',
      schema: {
        title: fields.text({ label: 'Page Title' }),
        eyebrow: fields.text({ label: 'Hero Kicker' }),
        heroTitle: fields.text({ label: 'Hero Title' }),
        description: fields.text({ label: 'Description', multiline: true }),
        items: fields.array(faqItem, {
          label: 'FAQs',
          itemLabel: (props) => props.fields.question.value,
        }),
        footerNote: fields.text({ label: 'Footer Note', multiline: true }),
        ctaEyebrow: fields.text({ label: 'CTA Kicker', defaultValue: 'Get Started' }),
      },
    }),
    contact: singleton({
      label: 'Contact Page',
      path: 'src/content/contact/',
      schema: {
        title: fields.text({ label: 'Page Title' }),
        eyebrow: fields.text({ label: 'Hero Kicker' }),
        description: fields.text({ label: 'Description', multiline: true }),
        sectionEyebrow: fields.text({ label: 'Side Panel Kicker' }),
        formTitle: fields.text({ label: 'Side Panel Title' }),
        formPanelEyebrow: fields.text({ label: 'Form Kicker', defaultValue: 'Message' }),
        formPanelTitle: fields.text({
          label: 'Form Title',
          defaultValue: 'Send us a note',
        }),
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
        eyebrow: fields.text({ label: 'Hero Kicker' }),
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
      label: 'Master Service Agreement',
      path: 'src/content/terms/',
      schema: {
        title: fields.text({ label: 'Page Title' }),
        eyebrow: fields.text({ label: 'Hero Kicker' }),
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
