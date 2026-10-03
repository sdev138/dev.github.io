# Memory

2026-10-01 — Grey blog-entry descriptions
---

- Samarth requested that blog-list description metadata use the same grey as the homepage's “Product Manager @ Five9” subtitle.
- Added `color: var(--text-muted)` to `.post-link p` in `devsamarth_v3/src/App.css`, reusing the homepage subtitle's existing color token.
- Local Chromium reproduced the original mismatch and verified both blog-entry descriptions now match the subtitle's `rgba(0, 0, 0, 0.4)` color at 1440px and 390px, including hover. No browser errors; `bun run build` passed.
- The task-owned verification server on 5180 was stopped after checking. No tests added or commits, pushes, or deployments performed.

2026-09-29 — Match benji.org's full text presentation
---

- Samarth reported that the font/tracking-only changes were barely noticeable and requested a thorough rendered comparison with `https://benji.org/`. Markdown styling changes are explicitly permitted because the renderer inherits global CSS. No added tests, commits, pushes, or deployments were requested.
- Compared actual browser styles, screenshots, font rendering, and shared-text metrics. The reference uses 14px/20px Inter at weight 460, `-0.09008px` tracking (`-0.00563rem`), #111 text, 14px/500-weight page headings, a 550px desktop reading column, 24px mobile gutters, and 16px paragraph gaps. The previous local text was 16px/28px at weight 400 with a 680px column and 30px headings.
- Updated `devsamarth_v3/src/index.css` and `src/App.css` to use those type metrics, compact headings, paragraph/list spacing, matching secondary text, and consistent Inter labels/dates. Updated the current README/handoff with the typography baseline.
- Matching the font-family name and CSS still produced differing glyph advances. An isolated browser comparison of the two variable Inter files confirmed the mismatch; both have a weight axis from 100–900. Replaced the local `public/inter-latin.woff2` with the reference's same Inter font build from `https://benji.org/_next/static/media/e4af272ccee01ff0-s.p.woff2`, retaining the existing Inter OFL. Font remains locally hosted. SHA-256: `c940764593d0fe5d596be327ca7558855e018039fb78509aa21921fd3644c3e4`.
- Markdown prose inherits the new global size, weight, leading, tracking, and color. Its prose gaps and heading sizes were adjusted in `.markdown`; code keeps its utility font. Blog source text was not edited.
- Verification: `bun run build` and `bun run lint` passed. Local Chromium verified Home, Work, Products, Blog, and `/blog/welcome` at 1440px, 768px, 580px, 390px, 320px, and 280px (30 page/viewport combinations): no overflow, browser errors, or prose metric mismatches. The actual loaded webfont is Inter; shared strings have identical measured advances to the reference. Reduced-motion behavior and navigation/history passed.
- Verification evidence: `/tmp/opencode/typography-verification.json` and `/tmp/opencode/typography-final-*-1440.png` / `*-390.png` (ephemeral). Runtime checks were local; the reference was inspected read-only. Changes remain local and uncommitted.
- Confirmed the production output contains the matching Inter font and current stylesheet in all five route entries. The task-owned local server on 5180 was stopped after verification.
- Independent review found no Critical/Important issues. Its suggested uniform 500-weight headings were declined: the inspected reference actually uses 460 for list/section labels and 15px/600 and 14px/560 for article h1/h2, matching the intentional overrides here.
- Reproduced the review's narrow-screen navigation finding: at 280px, the last button extended 7.2px beyond the reading column. Reduced navigation padding to 4px per side at widths up to 350px. Local Chromium confirmed all buttons stay inside the 24px gutters at 280px, 320px, 350px, and 390px. Final `bun run build` and `bun run lint` passed. Supplemental evidence: `/tmp/opencode/typography-navigation-verification.json` and `/tmp/opencode/typography-final-home-280.png` (ephemeral).

2026-09-29 — Compact letter spacing
---

- Samarth requested the compact, document-like letter spacing of `https://benji.org/`. Inspected its rendered typography: Inter, 14px body text, and `-0.09008px` tracking (approximately `-0.0064em`).
- Added `letter-spacing: -0.0064em` to the site body in `src/index.css`. Removed the expanded letter-spacing rules from page titles, navigation, section labels, and responsive navigation in `src/App.css` so they inherit the compact tracking.
- Verified `bun run build` and `git diff --check`. Local Chromium confirmed compact spacing on all four main pages at 1440px, 390px, and 320px, with no overflow or browser errors. Screenshots: `/tmp/opencode/tight-tracking-1440.png` and `/tmp/opencode/tight-tracking-390.png` (ephemeral).
- The task's local server on 5180 was stopped. Inter font changes from the preceding request remain in the working tree. No tests, commits, pushes, or deployments were added/performed for this change.

2026-09-29 — Inter typography
---

- Samarth requested Inter as the website font. Replaced the primary font declaration and preload with locally hosted `public/inter-latin.woff2`, supporting weights 400–700. Replaced the obsolete Plex font assets with Inter and its SIL Open Font License, and updated the current README/handoff.
- Verified `bun run build` and `git diff --check`. Local Chromium confirmed actual Inter webfont rendering on Home, Work, Products, and Blog at 1440px, 390px, and 320px, with no horizontal overflow or page errors.
- Desktop/mobile screenshots: `/tmp/opencode/inter-1440.png` and `/tmp/opencode/inter-390.png` (ephemeral). The task-owned Bun/Vite server on 5180 was stopped. No tests added or commits/pushes/deployments performed for this font change.

2026-09-29 — Cube diagonal direction corrected
---

- Samarth requested upper-left-to-lower-right rotation and authorized a local commit without pushing. Changed the rotation axis in `devsamarth_v3/src/App.css` from `(1, 1, 0)` to `(-1, 1, 0)`.
- Local Chromium measurements confirmed the front face moves right and down. The cube is still 22px with a 10-second rotation, and reduced motion disables the animation.
- `bun run build` and the CSS diff-check passed; local browser inspection reported no page errors. The task's Bun/Vite server on port 5180 was stopped. Existing edits in `src/App.tsx` and `src/pages.tsx` belong to the user and are excluded from this commit.

2026-09-28 — Cube motion refinement
---

- Samarth requested a smaller cube with a faster diagonal rotation. Updated `devsamarth_v3/src/App.css`: 22px sides (previously 26px), a 10-second loop (previously 18 seconds), and `rotate3d(1, 1, 0, ...)` for diagonal-axis rotation.
- Adjusted face depth to 11px and recentered the smaller cube and ground line. The shared animation applies across all pages.
- Verified `bun run build` and CSS diff-check, inspected four rotation phases in local Chromium, and confirmed navigation, reduced motion, and zero browser errors. The local Bun/Vite server was stopped afterward. No tests added or commits/deployments performed.

2026-09-28 — Revamp complete and verified locally
---

- Bun workspace is configured at the repo root with one `bun.lock`; root commands forward to the app. Use `bun install`, `bun run dev`, `bun run lint`, `bun run build`, `bun run preview`, and `bun run deploy`.
- New app structure: `src/App.tsx` for shell/cube/navigation, `src/pages.tsx` for page bodies/Markdown, existing `src/content.tsx` for portfolio text/links, `src/posts/*.md` for writing, and `vite.config.ts` for Markdown loading/static route entries.
- White/grey NieR menu styling uses locally served IBM Plex Sans, a small CSS 3D cube, and a 320 ms jump before same-tab navigation. Reduced motion, keyboard focus, modified clicks, and browser history are supported.
- Blog supports YAML metadata, filename-derived dates/slugs, newest-first order, and GFM rendering. The template is an unpublished draft. Temporary verification posts were removed. Shared view counts remain deferred by Samarth.
- GitHub Pages still uses the existing gh-pages branch and `devsamarth.com`. Deploy adds `--nojekyll` because gh-pages excludes dotfiles by default. Builds emit real route entry HTML, `404.html`, `.nojekyll`, and CNAME.
- Verified `bun install --frozen-lockfile`, `bun run lint`, and `bun run build` (all exit 0). Scoped `git diff --check -- . ':!Website_Revamp.md'` passes; full diff-check only flags pre-existing whitespace in the user-owned brief.
- Local Bun-driven Chromium checks: main routes at 1440/390px, Markdown at 320px, no document overflow or page errors, cube reaches Y=0 before URL change, history/rapid clicks/Ctrl-click/keyboard/reduced motion work, and CV returns 200 PDF. Static deep links and refreshes returned 200; missing paths returned a styled 404.
- Final build excludes draft/template content and temporary preview posts. Screenshot files: `/tmp/opencode/website-revamp-desktop.png`, `/tmp/opencode/website-revamp-mobile.png` (ephemeral).
- Independent read-only reviewer (`ses_f14e6244effe9zEOPNhtlEf7HS`) found no critical or important issues, and one Markdown italics issue. Reproduced pixel-identical plain/emphasized text, then fixed `.markdown em` with `font-synthesis: style`; local screenshots confirmed visibly distinct italics. Fresh build, lint, and scoped diff-check passed after the correction.
- Verification servers on 5173 (Bun/Vite PID 188903) and 4173 (Bun static PID 194064) were stopped. Both background commands completed after the explicit shutdown.
- No tests added, commits, pushes, or deployments performed. The current execution record is in `docs/superpowers/plans/2026-09-28-website-revamp.md`.

2026-09-28 — Website revamp in progress
---

- Samarth supplied `Website_Revamp.md` and requested implementation: Bun, existing gh-pages deployment, white/grey NieR-inspired design, rotating/jumping cube, and Work/Products/Markdown Blog routes.
- Samarth explicitly deferred universal blog-view counts: “Hold off on the blog-view counts, just continue with the rest of the implementation”. No counter/backend work is in the active scope.
- No added tests; verify with Bun and local desktop/mobile browser checks. Do not commit or deploy; stop local servers afterward.
- App lives in `devsamarth_v3`; existing deployment is `gh-pages -d dist`, Vite base `/`, and `public/CNAME` is `devsamarth.com`.
- Existing `Website_Revamp.md` modifications belong to the user. Current biography, jobs, projects, resume, and social links are the migration's content source.
- Execution checklist: `docs/superpowers/plans/2026-09-28-website-revamp.md`.
- All three portfolio references and the supplied NieR screenshots were inspected. Desktop browser tool is disconnected; local Bun-driven Playwright is available from `/home/samarthdev/.bun/install/cache/playwright@1.58.2@@@1/index.mjs`, using cached Chromium headless shell 1208.

2026-09-28
---

- Markdown content in this workspace may use YAML front matter; Markdown tables require pipe syntax.
