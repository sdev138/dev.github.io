# HANDOFF — devsamarth_v3 (Personal Website)

## Current architecture — September 28, 2026

This section supersedes the historical notes below for the website revamp.

- The repo root is now the Bun workspace for the website. Run `bun install`,
  `bun run dev`, `bun run lint`, and `bun run build` there. The old root
  `index.ts` is not the website entry point.
- The website remains React 18 + TypeScript + Vite, with the same
  gh-pages deployment and `public/CNAME` (`devsamarth.com`). The deploy command
  adds `--nojekyll` so gh-pages publishes the Jekyll opt-out file.
- `src/App.tsx` owns the shared shell, white/grey menu navigation, rotating CSS
  cube, 320 ms jump-before-navigation, route selection, metadata, and footer.
- `src/pages.tsx` renders Home, Work, Products, Blog, Markdown articles, and
  missing-page content. Existing portfolio text stays in `src/content.tsx`.
- `src/index.css` supplies the monochrome tokens and locally served Inter;
  `src/App.css` supplies layout and the responsive interface. The old Bootstrap,
  portrait, typewriter, and project-pod UI have been replaced.
- Typography matches benji.org: a 550px reading column, 14px/20px Inter at weight
  460, 14px page titles at weight 500, and 16px paragraph gaps. Markdown prose
  inherits the global type settings; code retains the utility font.
- Markdown posts live in `src/posts`. The draft template is unpublished.
  `vite.config.ts` parses front matter with `Bun.YAML.parse`, sorts posts by date,
  provides `virtual:posts`, and writes static HTML entry files for deep links.
- Samarth explicitly deferred shared blog-view counts. No backend is needed for
  this version. Do not add fake/local-only counters.
- See `README.md` in this app for authoring and deployment details, and
  `../docs/superpowers/plans/2026-09-28-website-revamp.md` for the execution record.
- Samarth requested no added tests; verification uses Bun build/lint and local
  browser inspection. Shut down local servers after verification. Do not commit,
  push, or deploy without permission.

---

## Historical handoff (pre-revamp)

This document is a complete handoff. A new agent should be able to pick up from here
without re-exploring the codebase. Read it fully before touching anything.

---

## 1. Project Overview

`devsamarth_v3/` is the live personal portfolio website for **Samarth Dev**, deployed at
**https://devsamarth.com** (custom domain, hosted on GitHub Pages via the `gh-pages`
branch). It is a **React 18 + TypeScript + Vite 6** single-page app. The site is one long
scrolling page with three sections:

1. **Hero / profile** (`#home`) — portrait, name, role, rotating typewriter titles,
   intro description, link row (CV / email / github / linkedin / bluesky / twitter /
   google scholar).
2. **Experiences / CV** (`#experiences`) — education, work experience, research
   experience, volunteering, research interests.
3. **Projects** (`#projects`) — a VStack of white project rows (Cresta-style) linking
   to GitHub repos, plus a closing contact blurb.

The repo root (`/home/samarthdev/Software_Engineering/Personal_Website/dev.github.io`)
also contains a trivial, **unrelated** Bun setup (`index.ts` printing "Hello via Bun!") —
ignore it entirely.

---

## 2. How to Run / Verify

Node is NOT on the default PATH. Always prefix with the local bin:

```bash
export PATH="$HOME/.local/bin:$PATH"
cd /home/samarthdev/Software_Engineering/Personal_Website/dev.github.io/devsamarth_v3

npm install          # deps are currently installed, but re-run if node_modules is missing
npm run lint         # eslint — must pass
npm run build        # tsc -b && vite build — must pass
npm run dev          # Vite dev server, hot reload, prints URL (default http://localhost:5173)
```

- `npm run dev` runs a dev server with hot module reload. Kill it with `pkill -f vite`
  (the port is 5173).
- **Production deploy** (per `build_directions.txt`): `git add *` → `git commit` →
  `git push origin` → `npm run build` → `npm run deploy` (gh-pages). Do NOT deploy
  unless explicitly asked.

---

## 3. Architecture — File Map

Everything lives in three files under `devsamarth_v3/src/`. There is **no components/
directory** — no nav bar and no footer exist.

| File              | Purpose                                                                              |
| ----------------- | ------------------------------------------------------------------------------------ |
| `src/main.tsx`    | React entry point (`createRoot` + StrictMode)                                        |
| `src/App.tsx`     | **All JSX/components** (~240 lines). One `App()` component.                          |
| `src/App.css`     | **All component styles** (~488 lines)                                                |
| `src/index.css`   | Theme variables (`:root` CSS custom properties) + global resets                      |
| `src/content.tsx` | **All site data** (no JSX): meta, intro, experience, volunteering, projects, contact |
| `src/assets/`     | Images: `sdevCropped.jpg` (portrait), 6 project images (**now unused**), resume PDFs |
| `public/CNAME`    | `devsamarth.com` — custom domain for GitHub Pages                                    |

**Data flow:** `index.html` → `main.tsx` → `App.tsx` (maps over arrays imported from
`content.tsx`). To change any text, edit `content.tsx` only.

---

## 4. Design System

### Colors (`src/index.css` `:root`)

- `--bg-color: #0c0c0c` (page background, near-black)
- `--primary-color: #0d0d0d` (page side borders, 10px solid left/right)
- `--secondary-color: #fff` (headings / accents)
- `--text-color: #fff` (body text)
- Project rows invert this: white `#ffffff` rows with `#111111` text on the black page.

### Typography

- Single font: **Roboto** (system fallback — there is NO font file, no Google Fonts
  import anywhere). Headings inherit it too.
- Section headings are lowercase white text (`h2`/`h3` with class `color_sec`).
- Type scale: hero name 30px bold, rotating title 48px, section headings inherit
  browser default (~1.5rem), entry titles 1.15rem bold, periods 0.9rem muted `#777777`,
  body 1rem.

### Layout

- Body has `padding-top: 60px` and 10px solid side borders.
- `.About-header` (in `App.css`): the shared content container — `max-width: 900px`,
  centered, `padding: 0 20px`. **Every section's content must stay inside this to keep
  the left alignment consistent.**
- `.sec_sp`: section bottom margin `calc(3rem + 5.128vw)` — the vertical rhythm between
  sections. Use it for spacing between the five experience blocks and before projects.

---

## 5. What Was Done in This Session (the redesign)

The user's complaint: the hero looked neat and "written on paper," but the experiences
section looked broken (dark cards on dark background, awkward two-column Bootstrap
split) and projects were a grid of bordered cards with images. The redesign made all
sections read as one consistent left-aligned "typeset document," with projects styled
after **https://cresta.com/careers** (white inverted rows with a small link bar in the
bottom-right corner).

### 5.1 `content.tsx`

- Removed the `image:` field from all 6 entries in `dataportfolio`.
- Removed the 6 now-unused image imports (`devimImage`, `deepMLImage`, `aocImage`,
  `leetImage`, `repoRecallImage`, `personalPortImage`).
- The 6 project image files still exist in `src/assets/` but are **dead files** —
  they were intentionally left in place; safe to delete but not required.

### 5.2 `App.tsx`

- **Experiences section (`#experiences`)**: replaced every Bootstrap `Row/Col lg={5}/lg={7}`
  split with a single left-aligned `<div className="sec_sp">` per block: an `<h3
className="color_sec">` heading followed by flat `.experience-entry` divs. The
  education `<table>` was converted to the same entry pattern (title, then
  "institution · dates" on the muted period line).
- **Projects section (`#projects`)**: the grid/card markup was replaced with stacked
  `.project-row` divs inside the same `<Container className="About-header">`. Each row:
  title `<h3>`, description `<p>`, `.project-row__tech` tag list, and an
  `<a className="project-row__link">` (arrow `&#8599;`) anchored bottom-right linking to
  `project.url` with `target="_blank"`. The whole-card `onClick` handler and `<img>`
  are gone.
- Contact blurb lost its stray `projects-grid` class.
- Import changed to `import { Container } from "react-bootstrap";` — `Row`/`Col` are no
  longer used anywhere.

### 5.3 `App.css`

- **Added** `.experience-entry`, `.experience-entry__title`, `.__period`, `.__desc`
  (flat typographic list; periods muted `#777777`; descriptions `max-width: 70ch`,
  `line-height: 1.6`).
- **Added** `.project-row` (white `#ffffff` bg, `#111111` text, 4px radius, 2px gap
  between rows, hover lifts `-3px`), `.project-row__tech` (pills: `#ececec` bg,
  `#111111` text, 20px radius), and `.project-row__link` (48×48px solid `#0c0c0c` bar
  with white arrow pinned `position: absolute; right: 0; bottom: 0`; hover inverts to
  white with black border and arrow nudges `translate(2px, -2px)`).
- **Removed** dead styles: `.projects-grid`, `.project-card`, `.project-card:hover`,
  `.tech-stack`, `.tech-tag`, `.repo-image`, `.service_`, `.service__title`,
  `.service_desc`, `.table td/.table th`.
- Kept legacy unused rules that predate this session: `.ac_btn*`, `.who_am_I`,
  `.progress*`, `.page-enter/exit`, `.h_bg-image` blocks, `fadeInUp` keyframes,
  `.service-section .service-category-title`, `.section-title`, `.t_border`. Do not
  delete them unless asked (surgical-changes rule).

### 5.4 Other session facts

- `npm install` was run (deps were missing). `node_modules/` now exists.
- `npm run lint` and `npm run build` both pass.
- Screenshots from verification live in `/tmp/opencode/` (`hero.png`,
  `experiences.png`, `projects.png`) — ephemeral, may be gone.
- Nothing has been committed. `git status` shows modified:
  `devsamarth_v3/src/App.css`, `App.tsx`, `content.tsx` (plus an untracked root
  `.gitignore` that predates/parallels this work — confirm before committing).

---

## 6. Verified Behavior (evidence)

Checked programmatically against the running dev server (viewport 1440×900 and
390×844):

- 5 section headings + 10 experience entries all left-aligned at x=270, flush with the
  container edge; single column.
- All 6 project rows: white bg `rgb(255,255,255)`, text `rgb(17,17,17)`, 900px wide
  matching the container, **0 images**, correct tag counts (4/5/4/2/2/1).
- Link bar: exactly 48×48px, anchored `right: 0, bottom: 0` on every row, black, with
  the correct `https://github.com/sdev138/...` href per row.
- Mobile (390px): rows span full width with the link bar visible.
- `npm run build` output confirms no project images are bundled anymore (only
  `sdevCropped` + the resume PDF remain in `dist/assets/`).

---

## 7. Known Gaps / Ideas Not Implemented (intentional)

These were consciously out of scope for this redesign — ask the user before doing any:

- **No navigation bar and no footer** exist on the page.
- **Hero section is untouched** and is the visual reference for the rest of the site.
- The `[data-theme="light"]` block in `index.css` is defined but never applied.
- `introdata.animated.eighth` ("Forza Lewis Hamilton") is in the data but not in the
  typewriter array in `App.tsx` (only first–seventh are used).
- Legacy/unused CSS and the unused `react.svg` asset exist (listed in 5.3 / 3).
- The `cv.pdf` and "Samarth Dev's CV.pdf" files in `assets/resume/` are unused; only
  "Samarth Dev's Resume.pdf" is imported.
- 6 project image files in `src/assets/` are now dead (imports removed).
- Potential follow-up: `npm audit` reports 13 vulnerabilities (3 low, 1 moderate,
  9 high) in dependencies — nothing was fixed.

---

## 8. Environment Quirks

- **Node/npm are not on PATH.** Use `export PATH="$HOME/.local/bin:$PATH"` first, or
  commands like `npm` will fail with "command not found".
- Shell is **zsh**.
- If a `curl`/port check against a dead server hangs, kill with
  `pkill -9 -f vite` rather than waiting for the tool timeout.
- The repo root package.json (Bun) is unrelated to the website — never run `bun` there
  expecting website behavior.

---

## 9. Session Update — Aug 16, 2026, 8:18pm

### 9.1 What was done in this session

Two CSS-only changes were made to `src/App.css` (no JSX or data changes). Both
`npm run lint` and `npm run build` pass.

1. **Thin white line under every section title.** Added:

   ```css
   .experiences .color_sec {
     border-bottom: 1px solid var(--text-color);
     padding-bottom: 0.75rem;
   }
   ```

   Applies to all six section headings (education, work experience, research
   experience, volunteering, research interests, projects) because every heading uses
   `color_sec` inside a section with class `experiences` (both `#experiences` and
   `#projects` sections carry `className="experiences"`).

2. **Gray divider line between experience entries.** Modified `.experience-entry`:
   ```css
   .experience-entry {
     margin-top: 1.5rem;
     padding-bottom: 1.5rem;
     border-bottom: 1px solid #444444;
   }
   .experience-entry:last-child {
     border-bottom: none;
   }
   ```
   The line sits below each entry's description and above the next entry's title.
   Because entries are rendered via `.map()` over the `content.tsx` arrays, this
   adapts automatically when entries are added/removed/edited — no markup changes
   needed. `:last-child` prevents a dangling line after the final entry of each block.
   The research interests block (single `<p>`, not wrapped in `.experience-entry`)
   correctly gets no divider.

### 9.2 Pending work — project pod redesign (BLOCKED)

The user requested the project pods be redesigned to match two reference screenshots:

- `devsamarth_v3/Pod_Design_Images/Cresta_Pod_Design.png` (how sections/pods are
  separated)
- `devsamarth_v3/Pod_Design_Images/Decagon_Pod_Design.png` (how compact rows should be)

**This work is NOT done.** The current model has no image input, so the two PNGs could
not be viewed. Do NOT attempt the pod redesign by guessing. The user was offered three
unblock paths and has not yet chosen one:

1. User describes the pod design in text (per-row layout, fields, link placement,
   padding/compactness, row separation).
2. User confirms working from the live sites (`cresta.com/careers`, `decagon.ai/careers`)
   fetched as HTML — may differ from the screenshots.
3. User pastes the images inline so they arrive as actual image data.

### 9.3 Current git state

- Modified: `devsamarth_v3/src/App.css` (this session's divider/underline changes on
  top of the earlier redesign), `devsamarth_v3/src/App.tsx`, `devsamarth_v3/src/content.tsx`
  (both from the earlier redesign session).
- Untracked: root `.gitignore` (predates/parallels this work — confirm before committing).
- `HANDOFF.md` itself is untracked/modified — commit it alongside the code when the
  user asks to commit.
- Nothing has been committed. Do not commit or deploy unless explicitly asked.

---

## 10. Project Pod Redesign Complete — Aug 17, 2026

This section supersedes the blocked status in section 9.2. The user reviewed the
mockup and approved the direction with two refinements: pods must be visibly more
light gray, and the CTA must use a white `>` inside the black pill with no circular
arrow control.

### 10.1 Visual reference artifacts

Two reviewable artifacts now live in `Pod_Design_Images/`:

- `Project_Pod_Mockup.png` — rendered desktop design preview.
- `Project_Pod_Mockup.svg` — editable source for the preview.

They show the final visual direction: Cresta-style individually separated cards and
spacing, constrained by Decagon-style compact content density.

### 10.2 Production implementation

Only `src/App.tsx` and `src/App.css` changed for the live pod redesign.

- `App.tsx` now renders one semantic `<article className="project-pod">` per
  `dataportfolio` item. It uses `project.url` as the React key, retains title,
  description, technologies, and repository URL, and uses a semantic `<ul>`/`<li>`
  list for technologies. No image or invented metadata was added.
- The old `.project-row*` structure is removed. The project heading now uses
  `.projects-heading` rather than `.sec_sp`, avoiding the oversized heading-to-pod gap.
- Each external CTA remains a safe anchor (`target="_blank"` and
  `rel="noopener noreferrer"`) and is labeled `Open <project> project in a new tab`.
- `.project-pod` is a two-column desktop grid: content on the left and CTA at the
  lower-right. Its final surface is `#e9ebef`, with a `#d2d6dc` 1px border, 22px radius,
  responsive `clamp()` padding, and 1.25rem separation between cards.
- Technology tags are compact pale-blue pills (`#d8e1f6`) and wrap for data-driven
  technology lists of any length.
- `.project-pod__cta` is a near-black (`#111318`) rounded pill with a 1px white outline.
  The arrow is the plain white `>` glyph in `.project-pod__arrow`; it has no background,
  border-radius, or separate circular element.
- At `max-width: 640px`, the pod collapses to one column and moves the CTA under the
  technology list. A scoped `prefers-reduced-motion` rule removes pod/CTA transitions.

### 10.3 Verification evidence

Fresh verification after implementation passed:

```bash
export PATH="$HOME/.local/bin:$PATH"
npm run lint
npm run build
git diff --check
```

A Playwright browser contract also passed at 1440px and 390px widths. It verifies six
semantic project pods, the computed light-gray `rgb(233, 235, 239)` surface, a plain
`>` arrow with a transparent background, and a mobile CTA positioned below the tag list.
