# Repository Guidelines

## Project Structure & Module Organization

This Bun workspace contains a React + TypeScript website built with Vite. Application files live in `devsamarth_v3/`:

- `src/App.tsx`: shared shell, navigation, animation, and routing.
- `src/pages.tsx`: page components and Markdown rendering.
- `src/content.tsx`: biography, work, projects, and links.
- `src/posts/*.md`: blog posts; `template.md` is an unpublished starting point.
- `src/index.css` and `src/App.css`: global styles and page layouts.
- `public/`: static assets, fonts, licenses, and custom-domain `CNAME`.
- `vite.config.ts`: Markdown loading and static route generation.

Build output goes to `devsamarth_v3/dist/`. No automated test directory exists.

## Build, Test, and Development Commands

Use Bun 1.3.14 or newer. Run these commands from the repository root:

- `bun install --frozen-lockfile`: install dependencies reproducibly using `bun.lock`.
- `bun run dev`: start the local Vite development server.
- `bun run lint`: run ESLint, including TypeScript and React Hooks rules.
- `bun run build`: type-check with TypeScript and generate the production site.
- `bun run preview`: serve the production build locally after building.
- `bun run deploy`: publish `dist/` to `gh-pages`; build first and deploy only when requested.

## Coding Style & Naming Conventions

Match surrounding code: two-space indentation, double-quoted TypeScript strings, semicolons, functional React components, PascalCase component names, and camelCase functions and variables. Use descriptive, hyphenated CSS classes. Prettier is available; format only touched files.

Name posts `YYYY-MM-DD-short-slug.md`. Include YAML metadata with `title`, a date or filename date prefix, and optional `description` and `draft`. Keep slugs lowercase and hyphenated; `draft: true` excludes publication.

## Testing Guidelines

No test framework, test script, naming convention, or coverage threshold is configured. Run lint and build for code changes. Check affected routes locally on desktop and mobile, including direct-link refreshes, keyboard navigation, browser history, and reduced motion where relevant. Stop local servers afterward.

## Commit & Pull Request Guidelines

History commonly uses `feat:` and `fix:` prefixes; use concise, descriptive subjects. Keep changes focused. PRs should explain purpose, link relevant issues, list validation performed, and include screenshots for visual changes.

Work on a new branch, such as `repository-contributor-guide-codex`, and commit changes there. Never merge into `main` or `master`; the owner handles integration. When starting from a feature branch, merge verified work back there and delete the task branch.

## Agent Instructions

Begin user-facing messages with “Samarth,”. State assumptions before editing and avoid unrelated refactors. Prepend dated entries with separators to `MEMORY.md` for durable task context.
