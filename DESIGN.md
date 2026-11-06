# Website Design

This document describes the website's implemented visual language. The design
combines a white-and-grey, NieR-inspired menu interface with compact, document-like
typography. Content stays in a narrow reading column; the cube provides the main
visual signature.

## Logo & Visual Identity

![The website's three-tone grey cube mark](devsamarth_v3/public/cube.svg)

The existing [cube SVG](devsamarth_v3/public/cube.svg) is the favicon, referenced
by [index.html](devsamarth_v3/index.html). Its `32 × 32` viewBox contains three
visible faces: a light-grey top (`#9a9a9a`), grey left (`#555`), and dark-grey
right (`#333`). Preserve its proportions and distinct face tones when reusing it.

The page header carries an animated CSS interpretation of this mark. “Samarth Dev”
appears as ordinary text rather than a separate graphical wordmark. Square menu
markers, timeline nodes, and rule endpoints repeat the cube's geometric language.

## Page Composition

```text
              centered shell: maximum 598px
              ┌─────────────────────────────────┐
              │ HOME   WORK   PRODUCTS   BLOG   │
              │ ▪─────────────────────────────▪ │
              │                                 │
              │   ◇  rotating cube              │
              │   ─  ground line                │
              │ Page title                      │
              │ Muted description               │
              │                                 │
              │ Biography / timeline / list /   │
              │ Markdown article                │
              │                                 │
              │ ─────────────────────────────── │
              │ Name or back link   Get in touch │
              └─────────────────────────────────┘
                  24px gutters on each side
```

The wireframe is schematic; the actual cube is three-dimensional. The shell uses
`max-width: 598px` including padding, leaving a maximum **550px content column**.
It fills at least the viewport height with `100svh`; flexible main content keeps
the footer toward the bottom on short pages.

Desktop top padding is 64px. Main content begins 49px below the header rule;
the page header has a 24px bottom margin. Biography paragraphs use 16px gaps,
work sections and content lists generally begin after 48px, and the footer has
a 72px top margin. Use these existing rhythms when extending a page.

## Color System

Tokens live in [src/index.css](devsamarth_v3/src/index.css):

- `--paper: #fafafa`: page background and inverted active text.
- `--surface: #efefef`: navigation backgrounds, hovered rows, and code surfaces.
- `--ink: #333333`: selected navigation, focus outlines, and dark cube faces.
- `--body: #565656`: inactive navigation text and front/back cube faces.
- `--muted: #707070`: small geometric markers and the cube's top face.
- `--line: #d6d6d6`: dividers, timeline tracks, and subtle underlines.
- `--text: #111111`: primary reading text.
- `--text-muted: rgba(0, 0, 0, 0.4)`: descriptions, dates, metadata, and footer.

The current theme is light. Reuse semantic tokens so repeated elements remain
consistent; the favicon has its own fixed SVG face colors.

## Typography

Inter is locally hosted in `public/inter-latin.woff2`, with its license alongside
it. The declared weight range is 400–700. Helvetica Neue and sans-serif are
fallbacks; code uses SFMono-Regular, Consolas, Liberation Mono, then monospace.

- Body: `0.875rem` (14px at the default root size), weight 460,
  `1.25rem` line height (20px), and `-0.00563rem` tracking.
- Page headings: inherit body size and line height, with weight 500.
- Section labels, product titles, and blog titles: weight 460.
- Strong emphasis: weight 600; footer: 12px with 1.2 line height.
- Navigation: uppercase; the remaining interface uses natural text casing.

Hierarchy comes mainly from whitespace, weight, and muted metadata. Keep new page
titles aligned with the existing compact heading treatment.

## Cube Construction & Motion

Markup lives in [src/App.tsx](devsamarth_v3/src/App.tsx); geometry and rotation live
in [src/App.css](devsamarth_v3/src/App.css).

- A `54 × 65px` scene provides `240px` perspective and a `26 × 1px` ground line.
- The jump wrapper contains a `22 × 22px` cube. Six absolutely positioned faces
  use 1px borders, hidden backfaces, and `translateZ(11px)` after face rotation.
- Front/back faces use `--body`; left/right/bottom use `--ink`; top uses `--muted`.
- The starting orientation is `rotateX(-24deg) rotateY(35deg)`.
- A linear 10-second loop adds a full rotation around `rotate3d(-1, 1, 0, …)`,
  creating the upper-left-to-lower-right diagonal motion.

Rotation and jumping use separate nested transforms so they can run together.
Ordinary same-tab navigation triggers a **320ms jump**: `0 → -28px → 0`, reaching
the apex at 42% of the animation. Ascent uses `cubic-bezier(.2,.7,.3,1)`;
descent uses `cubic-bezier(.6,0,.9,.5)`. Navigation completes after landing.
A newer click cancels the pending jump and replaces its destination.

Modifier clicks, downloads, new-tab link targets, and same-page anchors retain
native behavior. Browser back/forward also triggers the jump. Reduced-motion
preferences disable rotation and transitions and make navigation immediate.

## Reusable Interface Patterns

### Navigation & Rules

Four equal-flex links lead to Home, Work, Products, and Blog. Each has a 6px square
marker, a 40px minimum height, and an 8px gap from its neighbors. Inactive links
use `--surface` with `--body` text; hover uses `--line`; the current link uses
`--ink` with `--paper` text. Article routes keep Blog selected through
`aria-current="page"`.

The header divider is 1px high with 4px square endpoints. Links elsewhere use
thin underlines offset by 4px. Color and background transitions last 120ms.

### Content Patterns

- **Home:** short biography paragraphs followed by wrapping inline contact links.
- **Work:** muted section labels with 5px square markers and bottom rules.
  Timeline rows pair a 108px date column with content along a 1px vertical track;
  square nodes connect entries, with 20px content inset and 32px bottom spacing.
- **Products:** full-row links separated by horizontal rules, with a title and
  outward arrow, description, and wrapping muted technology labels.
- **Blog index:** ruled rows with title and muted description on the left and a
  non-wrapping date on the right. Hover highlights the whole row. The empty state
  uses the same divider and restrained text hierarchy.
- **Footer:** a ruled, two-ended row. Home shows the name; other pages offer a
  back link, with articles returning to Blog. “Get in touch” stays on the right.

These components live in [src/pages.tsx](devsamarth_v3/src/pages.tsx) and the shared
app shell. Prefer ruled rows and square details when adding similar content.

### Markdown Articles

Articles inherit body typography, with 16px between blocks. Article `h1` uses
15px/600; `h2` uses weight 560 and a 36px top margin. Quotes have a 2px grey left
rule and 20px inset. Code blocks use a grey surface, 18px padding, and horizontal
scrolling. Inline code has a small grey background.

Images fit their container and have 24px vertical margins. Tables use collapsed
1px borders, grey header cells, and a 420px minimum width inside a keyboard-focusable
horizontal scroll region. Keep wide content inside these local scroll containers.

## Responsive Behavior & Accessibility

At widths **580px and below**, shell top padding becomes 30px while horizontal
gutters stay 24px. Main top padding becomes 37px. Navigation uses 10px text, 4px
markers, 5px gaps, and 7px horizontal link padding. Work timelines stack dates
above content, blog dates move below descriptions, and footer top spacing becomes
54px. At **350px and below**, navigation link padding reduces to 4px per side.
The body has a 280px minimum width.

Preserve semantic links and headings, the keyboard skip link, visible 2px focus
outlines with 5px offset, and focus transfer to the page title after navigation.
Decorative cube geometry and markers are hidden from assistive technology.
Retain image alt text, scrollable-table labels, and reduced-motion behavior.

## Maintaining the Design

Update this document when changing tokens, type, cube geometry, motion, or shared
patterns. For visual changes, run `bun run lint` and `bun run build`, then inspect
affected routes locally on desktop and narrow screens, including keyboard and
reduced-motion behavior. Stop local servers after verification.
