# Data for Lawyers

Modern marketing site built with **Astro**, **Tailwind CSS v4**, and **Keystatic CMS**.

Design follows the Legal Edge Squarespace layout with Data for Lawyers brand colors:
- Teal `#095967`
- Orange `#d18850`
- Cyan `#10aac1`

## Commands

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
npm run preview
```

## CMS

Edit content at `/keystatic`:
- **Site Settings** — logos, shared CTA image, nav, company info
- **Homepage / page singletons** — copy and images for each page
- **Blog Posts** — create, edit, and publish articles

Content lives in `src/content/` as YAML and Markdoc files, version-controlled with the site.

### Images

Image fields use Keystatic uploads (Choose file). Uploaded assets are saved under `public/images/` and committed with the repo:

- `public/images/site/` — logos, shared CTA
- `public/images/homepage/` — hero, avatars, service cards
- `public/images/about/`, `services/`, `blog/`, `posts/` — page and post media

Inline blog images also upload to `public/images/blog/`.

### Writing blog posts

1. Start the dev server: `npm run dev`
2. Open **http://localhost:4321/keystatic**
3. Go to **Blog Posts** → **Create entry**
4. Fill in title, date, author, excerpt, cover image, and body content
5. Toggle **Published** on to show the post on the site
6. Save — the post appears at `/blog`

For production editing by multiple authors, switch Keystatic storage to GitHub in `keystatic.config.ts` so changes commit directly to the repo.

## Project structure

```
src/
  components/       Reusable UI sections
  content/          Keystatic-managed YAML + blog posts
  layouts/          Base and site layouts
  lib/              Content reader, posts helpers, shared nav
  pages/blog/       Blog listing and post pages
  scripts/          Accordion, testimonials, header behavior
  styles/global.css Design tokens and utilities
keystatic.config.ts
```
