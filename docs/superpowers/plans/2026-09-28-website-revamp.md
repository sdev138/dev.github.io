# Website Revamp Implementation Plan

> **For agentic workers:** Use the executing-plans skill to implement this plan task-by-task in this session. Track completion with the checkboxes below.

**Goal:** Migrate Samarth's portfolio to Bun and implement the supplied white-and-grey NieR-inspired design, routed Work/Products/Blog pages, and Markdown publishing.

**Architecture:** Keep React, TypeScript, Vite, and the existing `gh-pages -d dist` deployment. A shared page shell owns the CSS cube and navigation; a small Vite plugin loads dated Markdown files and emits static entry files for every route. Existing portfolio data stays in `src/content.tsx`.

**Tech Stack:** Bun 1.3.14, React 18, TypeScript, Vite, CSS 3D transforms, react-markdown, remark-gfm.

**Spec:** `Website_Revamp.md`, with Samarth's explicit update on 2026-09-28: “Hold off on the blog-view counts, just continue with the rest of the implementation”.

## Global Constraints

- Keep GitHub Pages, `public/CNAME` (`devsamarth.com`), and the gh-pages deployment command.
- Use white and grey, flat rectangular UI, quiet typography, thin dividers, and generous whitespace, grounded in all three supplied portfolio references and the NieR screenshots.
- Place a small rotating dark-grey cube above-left of each page introduction. Unmodified same-tab link navigation completes when its quick jump lands.
- Keep the app small: a shared shell, page components, content data, Markdown files, and CSS; no framework migration or component library.
- Samarth explicitly requested no added tests. Verify with Bun build/lint and local browser inspection; stop local servers afterward.
- Shared blog-view counters are deferred. Do not show fabricated counts or add backend infrastructure.
- Preserve existing biographical, experience, project, and contact content. The blog starts empty with an unpublished authoring template.
- Do not commit, push, or deploy. `Website_Revamp.md` has pre-existing user edits.

## Review Focus

1. Direct links and refreshes on `/work`, `/products`, `/blog`, and `/blog/<slug>` must work using files in `dist`, without a development-server fallback.
2. Cube landing must precede route replacement; rapid clicks, browser history, keyboard links, and reduced-motion preferences must work.
3. Markdown dates must remain stable, posts must sort newest first, drafts must stay unpublished, and malformed metadata must identify its file.
4. Narrow screens must preserve legibility and fit navigation, timelines, code blocks, and Markdown tables without document overflow.
5. Existing CV, social links, project links, and all current experience entries must remain accessible.

---

## Task 1: Bun tooling

**Files:** root `package.json`, `bun.lock`; app `package.json`, `package-lock.json`.

- [x] Add the app as the root Bun workspace and provide root commands forwarding into it:
  ```json
  {
    "workspaces": ["devsamarth_v3"],
    "scripts": {
      "dev": "bun run --cwd devsamarth_v3 dev",
      "build": "bun run --cwd devsamarth_v3 build"
    }
  }
  ```
- [x] Use Bun to run the app's Vite, TypeScript, ESLint, and gh-pages binaries. Replace Bootstrap/typewriter/Helmet dependencies made obsolete by the redesign with `react-markdown` and `remark-gfm`; align React types with React 18.
- [x] Install with `bun install`, keep a single root `bun.lock`, and remove the superseded app npm lockfile.
- [x] Verify dependency installation and the final build as part of Task 4.

## Task 2: Page shell, design, and navigation

**Files:** `devsamarth_v3/src/App.tsx`, `src/pages.tsx`, `src/App.css`, `src/index.css`, `src/content.tsx`, `index.html`, `public/cube.svg`.

- [x] Replace the old scrolling layout with a persistent shell and route-selected page content. Normalize `/work/` to `/work` for matching:
  ```ts
  const currentPath = () => window.location.pathname.replace(/\/+$/, "") || "/";
  ```
- [x] Put the cube above-left of the intro on every route, including post and missing-page screens. Create its six faces with CSS transforms; rotate the inner cube and animate a separate outer wrapper for the jump.
- [x] Gate same-tab anchor navigation on the Web Animations `finished` promise. Cancel superseded jumps, preserve modifier-click/new-tab behavior, handle popstate, and skip animation for reduced motion. Update titles, scroll position, and heading focus after navigation.
- [x] Render Home from existing intro/contact content; Work as a dated timeline including research, education, volunteering, and research interests; Products as flat, divided repository rows with technology text.
- [x] Apply a neutral palette, restrained square menu indicators, a narrow reading column, accessible link/focus styles, and mobile layouts. Replace the Vite favicon with a simple grey cube.
- [x] Inspect all routes locally at desktop and mobile widths in Task 4, including CV and product URLs.

## Task 3: Markdown publishing and static route entries

**Files:** `devsamarth_v3/vite.config.ts`, `src/vite-env.d.ts`, `src/pages.tsx`, `src/posts/template.md`.

**Interface:** `virtual:posts` exports a date-descending array of `{ slug: string; title: string; date: string; description: string; body: string }`.

- [x] Load `.md` files in `src/posts` through a small Vite plugin. Parse YAML front matter with Bun, exclude `draft: true`, derive slugs from filenames, and take dates from metadata or a `YYYY-MM-DD-` filename prefix.
- [x] Reject invalid dates, missing titles, invalid slugs, duplicate slugs, and invalid metadata with filenames in build errors. Watch Markdown changes in the local Vite server.
- [x] Add a draft-only authoring template:
  ```markdown
  ---
  title: "Your post title"
  date: "2026-09-28"
  description: "A short introduction."
  draft: true
  ---

  Write your post in Markdown here.
  ```
- [x] Render the blog index with dates and descriptions, and articles with `react-markdown` plus `remark-gfm`. Include readable headings, links, lists, quotes, code, images, and horizontally scrollable tables. Show a quiet empty state until Samarth publishes a post.
- [x] After Vite builds, copy the entry HTML into `work/index.html`, `products/index.html`, `blog/index.html`, and `blog/<slug>/index.html`, plus `404.html` and `.nojekyll`. Use per-page titles and descriptions in generated HTML.
- [x] Verify rendered Markdown with a temporary local post; inspect the resulting static page directly, then remove the temporary post before the final build.

## Task 4: Documentation and local verification

**Files:** root `README.md`, app `README.md`, `build_directions.txt`, `HANDOFF.md`, root `MEMORY.md`.

- [x] Document `bun install`, `bun run dev`, `bun run build`, `bun run preview`, and the existing `bun run deploy` flow, including the custom domain and generated deep-link files.
- [x] Document Markdown metadata, filename-derived dates/slugs, newest-first ordering, draft publishing, and the deferred counter.
- [x] Run `bun run lint`, `bun run build`, and `git diff --check`.
- [x] Serve the build locally and inspect Home, Work, Products, Blog, a temporary Markdown post, and missing routes on desktop/mobile. Check cube timing, history, reduced motion, links, layout overflow, and runtime console errors.
- [x] Rebuild after removing the temporary post; confirm CNAME and all public route entry files exist, and that the draft is excluded.
- [x] Stop every server started for verification. Record exact results and any remaining limitations in `MEMORY.md` and this plan.

## Execution record

- Samarth requested proceeding directly after deferring counters. Implementation was carried out in the existing checkout; there are no commits or deployment changes on the remote.
- Palette: paper `#fafafa`, surface `#efefef`, ink `#333333`, body `#565656`, muted `#707070`, rules `#d6d6d6`. Locally served IBM Plex Sans supplies headings/body; system monospace supplies dates and technology labels. The jump/rotation cube is the signature; decoration is limited to square menu markers and fine rules.
- The Vite configuration bundler could not resolve `import { YAML } from "bun"`. Direct inspection confirmed Bun exposes the same parser globally, so the config uses `Bun.YAML.parse`. The next and final builds passed.
- gh-pages excludes dotfiles by default (confirmed in the installed CLI/library). Deployment adds `--nojekyll` to the existing command so the static site's opt-out is actually published. Branch, destination, custom domain, and workflow are otherwise the same.
- `bun install --frozen-lockfile`, `bun run lint`, and `bun run build` all exited 0 after the temporary posts were removed. The final JS bundle is 317.29 kB / 101.08 kB gzip; CSS is 9.08 kB / 2.70 kB gzip.
- Full `git diff --check` reports pre-existing trailing whitespace in the user's `Website_Revamp.md`. `git diff --check -- . ':!Website_Revamp.md'` passes. The user-owned brief was not edited.
- Local Chromium inspection covered 1440px desktop, 390px mobile, and 320px article layouts. All four main pages rendered without document overflow or page errors. Code and tables scroll within their containers.
- Recorded jump: approximately 346 ms including frame sampling, minimum Y `-27.9996`, old URL while airborne, destination URL at Y `0`. Rapid-click last destination, browser back/forward, keyboard focus, Ctrl-click, and reduced-motion behavior were confirmed.
- A Bun static-file server (no SPA fallback for known routes) returned 200 on direct entry and reload of all pages and two temporary posts. Unknown routes returned 404 and rendered the missing-page UI. The CV returned 200 with `application/pdf`.
- Temporary posts verified date-prefix extraction, newest-first order, Markdown headers, emphasis, lists, quotes, task lists, tables, and code. They were removed; the final bundle excludes both previews and the unpublished template. Final blog has zero post links and the empty-state text.
- Final output contains `index.html`, `work/index.html`, `products/index.html`, `blog/index.html`, `404.html`, `.nojekyll`, and `CNAME` with `devsamarth.com`.
- Visual screenshots are in `/tmp/opencode/website-revamp-desktop.png` and `/tmp/opencode/website-revamp-mobile.png` (ephemeral).
- Independent read-only code review found no critical or important issues. It found that `font-synthesis: none` made Markdown italics visually identical to plain text. This was treated as a required Markdown rendering correction: local screenshots reproduced the issue, `.markdown em { font-synthesis: style; }` fixed it, and the subsequent screenshots were visibly distinct. Fresh build/lint/scoped diff-check all passed. No unresolved findings remain.
- Review boundaries: the reviewer independently checked main-route static hosting and navigation; published-post behavior was covered by the implementer's temporary-post exercise. Live deployment and third-party destination availability were not exercised because verification was explicitly local. Counters and automated tests were excluded by Samarth's instructions.
- Both task-owned servers (Bun/Vite on 5173 and Bun static hosting on 4173) were explicitly stopped and their background commands completed. No commits, pushes, or deployments were performed.
