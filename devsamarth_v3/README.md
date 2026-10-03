# Samarth Dev's website

A small React + TypeScript site with a white-and-grey, NieR-inspired interface.
Bun runs the tooling; Vite produces the static site deployed to GitHub Pages.

## Run locally

Install **Bun 1.3.14 or newer**. From the repository root (`dev.github.io`):

```sh
bun install
bun run dev
```

Vite prints the local URL. `bun run dev`, `bun run build`, `bun run lint`,
`bun run preview`, and `bun run deploy` also work from this app directory.
The root `bun.lock` is the only dependency lockfile. For a reproducible install,
use `bun install --frozen-lockfile` at the repository root.

```sh
bun run lint       # ESLint
bun run build      # TypeScript + Vite, using Bun
bun run preview    # Inspect the production build locally
```

## Edit the content and design

| File              | Responsibility                                                     |
| ----------------- | ------------------------------------------------------------------ |
| `src/content.tsx` | Biography, social links, CV, work, research, education, projects   |
| `src/App.tsx`     | Shared navigation, cube, route selection, page headers, footer     |
| `src/pages.tsx`   | Home, work timeline, products, blog index, Markdown article        |
| `src/index.css`   | Neutral colour tokens, fonts, base styles, reduced motion          |
| `src/App.css`     | Layout, cube faces/rotation, responsive pages, Markdown typography |
| `src/posts/*.md`  | Blog posts with YAML front matter                                  |
| `vite.config.ts`  | Markdown loading and static route entry generation                 |
| `public/CNAME`    | Existing custom domain, `devsamarth.com`                           |

The cube rotates with CSS. For ordinary same-tab links, navigation waits for its
320 ms jump to land. A newer click replaces the pending jump. Keyboard navigation,
browser history, and standard modifier-click/new-tab behaviour are supported.
Reduced-motion preferences stop rotation and make navigation immediate.

Inter is served locally from `public/inter-latin.woff2`; its SIL Open
Font License is included in `public/inter-OFL.txt`. No font service is contacted
by visitors.

Text follows benji.org's compact typography: a 550px reading column, 14px Inter
at weight 460, a 20px line height, and 16px paragraph gaps. Markdown prose
inherits these global settings.

## Publish a blog post

Copy `src/posts/template.md` to a new file, for example
`src/posts/2026-09-28-my-first-post.md`:

```markdown
---
title: "My first post"
date: "2026-09-28"
description: "A short introduction shown in the blog index."
draft: false
---

Write your post in **Markdown**.

## A section

Paragraphs, lists, links, images, quotes, code blocks, and tables are supported.
```

- `title` is required and is rendered as the page heading.
- `date` must be `YYYY-MM-DD`. It may be omitted when the filename begins with a
  date, as above. Dates are stable publishing dates, not file modification times.
- `description` is optional.
- `draft: true` excludes the post from both the site bundle and generated routes.
  Set it to `false` (or remove it) to publish.
- The filename becomes the slug after removing the optional date prefix and
  `.md`: the example above is available at `/blog/my-first-post`.
- Slugs use lowercase letters, numbers, and single hyphens. Slugs must be unique.
- Posts appear newest first; ties are ordered by slug. Invalid metadata produces
  a build error naming the file.
- Use fenced code blocks and GitHub-flavoured Markdown tables/task lists. Raw HTML
  is not executed. For local images, place files in `public/` and use a root-relative
  path, such as `![Description](/writing/diagram.png)`.
- The development server picks up added, edited, and removed Markdown files.

The included template is unpublished, so the blog has an empty state until you
add your own writing. Universal view counts are deferred at Samarth's request.

## Deploy to GitHub Pages

The deployment destination and custom-domain setup are the same as before:

```sh
bun run build
bun run deploy
```

`deploy` runs `gh-pages -d dist --nojekyll` from this app, publishing to the existing
`gh-pages` branch. The extra flag ensures the generated `.nojekyll` is published
(gh-pages normally excludes dotfiles). The build copies `public/CNAME` and generates
`work/index.html`, `products/index.html`, `blog/index.html`, and an entry file for
every published post. This makes direct links and refreshes work on GitHub Pages
without hash URLs or a special server rewrite. GitHub Pages may add a trailing
slash to directory URLs; the app accepts both forms.

`404.html` renders the site's missing-page screen for unknown paths. Vite's base
stays `/` because the website is hosted at the root of `devsamarth.com`.
