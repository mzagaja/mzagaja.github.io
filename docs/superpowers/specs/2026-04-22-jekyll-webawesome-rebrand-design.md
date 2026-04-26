# Jekyll → New Landing + Web Awesome Rebrand — Design

**Status:** Approved for planning
**Date:** 2026-04-22
**Project root:** `/Users/mzagaja/Developer/mzagaja.github.io`

## Context

The current site is a Jekyll blog built on Foundation CSS (~161 KB of
vendored SCSS), with pages: paginated `/` (blog firehose), `about.html`,
and `_posts/` at `/:year/:month/:title/`. It uses Algolia search, a
Mailchimp signup embedded in every post, the PIT Webring script in the
footer, and Piwik PRO analytics inlined into the default layout.

A new editorial landing design (`zagaja-new-landing.html`, ~920 lines of
single-file HTML + CSS) defines a stronger brand: rust (`#b83a10`) on
warm off-white (`#f5f0e8`), Bebas Neue display, DM Serif Display
headlines, DM Sans body, DM Mono eyebrows, a 9-section landing (hero,
ticker, about, credentials, work, essays, from-the-blog, connect,
footer), and auto light/dark mode via `prefers-color-scheme`.

This spec migrates the existing Jekyll site to that aesthetic and
simultaneously adopts **Web Awesome Pro** (user has a license) as the
component and theming foundation.

## Goals

1. `/` becomes the new editorial landing, rendered from a Jekyll layout
   (not a single HTML file).
2. Every page — blog index, post, about — gets the same editorial brand:
   typography, tokens, components consistent.
3. Web Awesome design tokens replace custom CSS variables as the theming
   substrate; WA components are used where they naturally fit (buttons,
   badges, icons, cards, drawer, dialog, input, divider, tooltip, copy
   button).
4. Foundation CSS is fully removed.
5. Privacy posture improves: self-hosted fonts, GoatCounter analytics
   (replacing Piwik PRO).
6. Existing URLs (`/:year/:month/:title/`) are preserved; pagination
   URLs get redirect coverage from old paths.

## Non-Goals

- Manual dark-mode toggle at launch (deferred; tokens structured to
  allow later addition with no refactor).
- Rewriting post bodies beyond Foundation-class cleanup where it breaks
  layout.
- Rewriting `_drafts/` — excluded from `_posts/` build, unchanged.
- Résumé content — spec provides scaffolding/schema; user supplies dates
  and specifics as fill-ins.
- RSS feed restyling (XML only, no visual layer).
- Lighthouse / performance budget enforcement.
- Formal accessibility audit (relies on semantic HTML + WA's built-in
  a11y; deeper audit is a follow-up project).

---

## 1. Site Structure & URL Map

| Route | Source | Layout | Purpose |
|---|---|---|---|
| `/` | `index.html` (rewritten) | `home.html` (new) | Editorial landing, 9 sections from `zagaja-new-landing.html` |
| `/blog/` | `blog.html` (new) | `blog-index.html` (new) | Paginated post firehose, `.post-card` grid |
| `/blog/page/N/` | jekyll-paginate-v2 | `blog-index.html` | Pagination for `/blog/` |
| `/about/` | `about.html` (rewritten) | `about.html` (new) | Narrative + structured résumé |
| `/:year/:month/:title/` | `_posts/*.markdown` | `post.html` (rewritten) | Editorial reading page |
| `/feed.xml` | jekyll-feed | — | Unchanged |
| `/sitemap.xml` | jekyll-sitemap | — | Unchanged |

**Key mechanics:**

- `jekyll-paginate-v2` pagination moves from paginating `/` to
  paginating `/blog/`. `pagination.permalink` in `_config.yml` changes
  from `/page/:num/` to `/blog/page/:num/`.
- `jekyll-redirect-from` is added to map legacy `/page/N/` URLs to
  `/blog/page/N/`.
- Individual post URLs stay unchanged — every existing post keeps its
  address.
- Landing's "SELECTED ESSAYS" grid = liquid:
  `site.posts | where: "essay", true | sort: "date" | reverse | slice: 0, 6`.
- Landing's "FROM THE BLOG" grid = liquid: `site.posts | limit: 6`.
- There is **no standalone `/essays/` page**. "Essay" is a curatorial
  front-matter flag on blog posts; the landing grid is the only
  dedicated surface.

---

## 2. Theming & Design Tokens

The brand layer overrides a curated set of Web Awesome design tokens
(CSS custom properties) on `body`. WA components and our bespoke CSS
consume them consistently. A `@media (prefers-color-scheme: dark)`
override swaps token values for dark mode. The display font (Bebas
Neue) is a custom variable outside WA's token set, consumed only by our
own SCSS.

### Light mode token mapping (from landing → WA)

Token overrides are scoped to `:root` (not `body`) so they propagate to
portal'd / shadow-hosted Pro components (e.g. `<wa-toast>`) added later.
Hover states are derived automatically by WA via `color-mix()` against
`--wa-color-mix-hover` — there is no separate `-fill-loud-hover` token,
so we don't try to set one. Setting `--wa-color-text-link` once gives
us rust links everywhere (nav, post body, dialog, footer) without
per-selector rules. `--wa-border-radius-scale: 0` is one line that
zeros every WA component's radius (s/m/l) instead of overriding each
size variant.

```scss
:root {
  --wa-color-brand-fill-loud:    #b83a10;                  // --rust
  --wa-color-brand-on-loud:      #ffffff;
  --wa-color-brand-fill-quiet:   rgba(184, 58, 16, 0.08);

  --wa-color-surface-default:    #f5f0e8;                  // --bg
  --wa-color-surface-raised:     #ede8df;                  // --bg-subtle
  --wa-color-surface-border:     #ccc7bc;                  // --line
  --wa-color-text-normal:        #0e0e0e;                  // --ink
  --wa-color-text-quiet:         #4a4a4a;                  // --ink-muted
  --wa-color-text-link:          var(--wa-color-brand-fill-loud);
  --wa-color-gray-50:            #888888;                  // --ink-faint role

  --wa-font-family-body:     'DM Sans', system-ui, sans-serif;
  --wa-font-family-heading:  'DM Serif Display', Georgia, serif;
  --wa-font-family-code:     'DM Mono', ui-monospace, monospace;
  --site-font-display:       'Bebas Neue', 'DM Serif Display', sans-serif;

  --wa-font-size-base:       1.0625rem;   // 17px body
  --wa-border-radius-scale:  0;           // editorial: zero all radii
}
```

`--site-font-display` is intentionally **not** prefixed with `--wa-`
because it isn't a Web Awesome token; it's a site-local custom property
consumed only by our own SCSS (hero name, eyebrows, ticker).

### Dark mode override

```scss
@media (prefers-color-scheme: dark) {
  :root {
    --wa-color-surface-default: #111110;
    --wa-color-surface-raised:  #1a1918;
    --wa-color-surface-border:  #2e2d2b;
    --wa-color-text-normal:     #f0ebe0;
    --wa-color-text-quiet:      #b8b2a8;
    --wa-color-gray-50:         #7a7670;
    --wa-color-brand-fill-loud: #e86030;
    --wa-color-text-link:       var(--wa-color-brand-fill-loud);
  }
}
```

### Fonts — self-hosted

`/assets/fonts/` holds `.woff2` files for DM Sans (300, 400, 500 +
italics), DM Serif Display (400 + italic), DM Mono (400, 500), Bebas
Neue (400). `_sass/_fonts.scss` declares `@font-face` with
`font-display: swap`. No runtime Google Fonts dependency. Use
google-webfonts-helper once during setup to assemble the files.

### Foundation removed

`_sass/_foundation.scss` (161 KB), `_sass/_main.scss`, `_sass/app.scss`,
`_sass/main.scss` are all deleted. Any Foundation-specific classes
inline in old post bodies (`.row`, `.columns`, `.large-N`, `.button`,
`.callout`, etc.) are audited during implementation and rewritten
case-by-case. Most posts are prose-only; impact expected to be small.

---

## 3. Layouts & Component Breakdown

### Layout files

#### `_layouts/base.html` — Shell

The only layout with `<html>`, `<head>`, `<body>`. Everything else
extends it. Responsibilities:

- `@font-face` declarations (via main stylesheet)
- Web Awesome autoloader `<script type="module">` + WA stylesheets
  (see §4 "Delivery" for exact `<link>`/`<script>` set)
- `class="wa-cloak"` on `<html>` to suppress FOUCE — the autoloader
  removes it once all `<wa-*>` elements register (or after a 2s
  safety timeout)
- Main site stylesheet (`/assets/main.css`)
- `{% include nav.html %}` — fixed nav on every page
- `{{ content }}` — rendered by extending layouts
- `{% include footer.html %}` — variant-aware (full on landing/about,
  minimal on blog/post)
- `{% include analytics.html %}` — GoatCounter snippet
- `{% include search-dialog.html %}` — Algolia `<wa-dialog>` present on
  every page (lazy-initialized on first `wa-show` event, not
  `DOMContentLoaded` — see §4 "JavaScript layer")

**`<wa-page>` evaluation.** Web Awesome ships a `<wa-page>` component
explicitly for "scaffolding entire page layouts using minimal markup"
(header/main/footer/aside slots, sticky-nav behavior, view-transitions
support). Worth a 30-minute spike during implementation — if it cleanly
absorbs the nav/main/footer wiring without fighting the editorial
layout, use it; otherwise fall back to hand-rolled markup. Decision
deferred to implementation.

#### `_layouts/home.html` (extends `base.html`)

The editorial landing. Content split into partials under
`_includes/home/` for maintainability:

- `_includes/home/hero.html` — hero-left (eyebrow, name, tagline, CTAs)
  and hero-right (stats grid with `MZ` watermark)
- `_includes/home/ticker.html` — scrolling marquee
- `_includes/home/about.html` — bio paragraphs + skills grid
- `_includes/home/credentials.html` — 4-column credentials strip
- `_includes/home/work.html` — 4 selected-work items
- `_includes/home/essays.html` — liquid loop rendering 6 essays
- `_includes/home/blog.html` — liquid loop rendering 6 recent posts
- `_includes/home/connect.html` — dark "LET'S CONNECT" section

#### `_layouts/blog-index.html` (extends `base.html`)

Paginated list. Header echoes `.writing-header` pattern from landing
("FROM THE BLOG" title + intro). Grid of post cards (shared component
with landing). Pagination controls below using standard `paginator.*`
liquid variables.

#### `_layouts/about.html` (extends `base.html`)

Two blocks:

1. **Narrative** — existing four paragraphs re-typeset in editorial
   style (DM Serif headlines, reading column ≤65ch).
2. **Structured résumé** — sections rendered from `_data/resume.yml`
   (new data file):
   - **Experience** — array of `{org, role, dates, location, summary,
     highlights[]}` → rendered as stacked `<wa-card>` blocks.
   - **Education** — array of `{school, degree, dates, focus}`.
   - **Speaking & Writing** — array of `{title, venue, date, url}`.
   - **Open Source & Volunteering** — array of
     `{org, role, dates, summary}`.
   - **Recognition** — array of `{org, award, date}`.

**No Skills section** in the résumé; skills grid stays only on the
home page's About section. User will tweak content later.

#### `_layouts/post.html` (extends `base.html`)

Editorial reading page:

- **Article header** — DM Mono eyebrow
  (`{{ page.essay_category | default: "Blog" }} · {{ page.date | date: "%b %Y" }}`),
  DM Serif Display `<h1>`, optional `.post-subtitle` if provided.
- **No categories/tags displayed** in header.
- **Article body** — `{{ content }}` inside `.reading-column`
  (max-width ~65ch, DM Sans body, DM Serif for `h2/h3`, DM Mono for
  code, rust for links). Custom prose CSS covers `h2`, `h3`,
  `blockquote`, `ul/ol`, `img`, `pre > code`, `hr`.
- **Mailchimp block** — single block below article body (not sidebar),
  re-themed with `<wa-input>` + `<wa-button>`. Form field IDs
  (`mc-embedded-subscribe-form`, `mce-EMAIL`,
  `mc_embed_signup_scroll`, etc.) and the `action` URL preserved
  verbatim. `<wa-input>` is a form-associated custom element (FACE)
  and submits its `name`/`value` pair as part of native `<form>` POST
  — set `name="EMAIL"` and the existing Mailchimp endpoint receives
  it unchanged. No native-input fallback needed.
- **Related posts** — grid of 3 post cards. Source: other posts in the
  same `essay_category` if current post has one, else 3 most recent
  posts excluding current.
- **Footer** — minimal variant (no "LET'S CONNECT" section).

### Shared includes

| Include | Used by |
|---|---|
| `_includes/components/post-card.html` | home/essays, home/blog, blog-index, post-related |
| `_includes/components/skill-tag.html` | home/about skills grid |
| `_includes/nav.html` | every page (via `base.html`) |
| `_includes/footer.html` | every page (variant-aware) |
| `_includes/analytics.html` | every page |
| `_includes/search-dialog.html` | every page |
| `_includes/home/*.html` | `home.html` only |

### Nav

Fixed top nav:

- Logo: `hello@zagaja.com` (DM Mono, rust)
- Links: About, Blog, Essays, Connect. The "Essays" and "Connect"
  entries always link to `/#essays` and `/#connect` respectively — on
  the home page the browser smooth-scrolls; on other pages the browser
  navigates to `/` and scrolls.
- Search icon: `<wa-button appearance="plain">` with
  `<wa-icon name="magnifying-glass">` (Font Awesome name), triggers
  `<wa-dialog id="search-dialog">`
- Blog button (outlined)
- Mobile: hamburger icon opens `<wa-drawer>` with the link cluster

### Footer

Two variants controlled by a layout-level variable:

- **Full** (landing + about): dark "LET'S CONNECT" section (Mastodon,
  GitHub, More about me, RSS Feed link cards) + minimal footer strip
  (copyright, social, webring)
- **Minimal** (blog + post): copyright, social links, PIT Webring
  script only

PIT Webring script lives only in the minimal variant — it is **not**
present on landing or about.

---

## 4. Web Awesome Integration

### Component inventory

| Component | Where | Notes |
|---|---|---|
| `<wa-page>` | `_layouts/base.html` (if spike validates) | See §3 base.html note |
| `<wa-button>` | Hero CTAs, "All Posts", Mailchimp submit, résumé actions | `variant="brand"` maps to rust |
| `<wa-tag>` | Skills grid (home) | Tags = labels (per WA's own copy); supports `appearance="outlined"`, sizes, removable variant. Replaces the earlier `<wa-badge>` choice — badges are for status/counts |
| `<wa-icon>` | Nav search, hamburger, social links, post-card arrow, footer | Font Awesome (default WA library); 2,000+ free icons + animations baked in |
| `<wa-card>` | Résumé experience blocks | Zero radius via `--wa-border-radius-scale: 0` |
| `<wa-callout>` | Optional: tip/note blocks in post bodies | Free, themed; cheaper than bespoke prose styling |
| `<wa-divider>` | About-page section breaks, between résumé blocks | Inherits `--wa-color-surface-border` |
| `<wa-drawer>` | Mobile nav | Right-side slide-in |
| `<wa-dialog>` | Algolia search modal | Triggered by nav search icon |
| `<wa-input>` | Mailchimp email field | Form-associated; `name="EMAIL"` submits natively |
| `<wa-tooltip>` | Social link hovers in footer | Optional |
| `<wa-copy-button>` | Email links, codeblocks in post body | Optional polish; cut if it complicates the prose CSS |
| `<wa-switch>` | **Deferred** — manual dark-mode toggle | Not at launch |

### Bespoke (NOT Web Awesome)

- Ticker (custom CSS animation)
- Vertical section labels (rotated "ABOUT")
- Post cards (plain markup; `<wa-card>` would fight the borderless grid)
- `MZ` watermark in hero

### Use WA layout utilities to shrink the bespoke pile

WA ships layout utility classes — `wa-stack`, `wa-cluster`, `wa-grid`,
`wa-flank`, `wa-split`, `wa-frame`, plus `wa-gap-*` spacing. Apply them
to skip writing custom flex/grid CSS where the design is a stock
arrangement:

| Section | Utility |
|---|---|
| Hero left/right (2-column with content + stats) | `wa-split` |
| Hero stats grid (2×2) | `wa-grid` with `--wa-grid-columns: 2` |
| Credentials strip (4-column) | `wa-grid` with `--wa-grid-columns: 4` |
| Skills grid (home about) | `wa-cluster` |
| "Selected Essays" + "From the Blog" grids | `wa-grid` |
| Footer link clusters | `wa-cluster` |

Rule: **WA components for interactive/primitive elements; WA layout
utilities for stock arrangements; bespoke CSS only for the genuinely
custom typography-driven sections (ticker, watermark, vertical labels,
post cards).**

### Icon library

**Font Awesome** — WA's `default` icon library, bundled. 2,000+ free
icons, plus first-class animations (`beat`, `fade`, `bounce`,
`spin-pulse`, etc.) via `<wa-icon animation="...">`. No registration
or extra setup — `<wa-icon name="magnifying-glass">` works out of the
box. Pro families (`sharp`, `duotone`, `chisel`, `etch`, `graphite`,
`jelly`, `notdog`, `slab`, `thumbprint`, `utility`, `whiteboard`)
remain available later via `setKitCode()` if a kit is purchased.

### Delivery

Web Awesome Pro is installed via npm (`@web.awesome.me/webawesome-pro`)
and the **`dist-cdn/`** subtree is committed to the repo under
`/assets/webawesome/dist-cdn/` for GitHub Pages to serve directly.

`dist-cdn/` is the browser-ready bundle (deps inlined). The `dist/`
subtree is for bundlers (Webpack/Vite) only and **will fail in
production** if linked directly from a static site — its modules
expect a bundler to resolve dependencies. We are static, so always use
`dist-cdn/`.

Loaded in `<head>` (`_layouts/base.html`):

```html
<link rel="stylesheet" href="/assets/webawesome/dist-cdn/styles/webawesome.css" />
<link rel="stylesheet" href="/assets/webawesome/dist-cdn/styles/native.css" />
<script type="module" src="/assets/webawesome/dist-cdn/webawesome.loader.js"></script>
```

Two stylesheets:

- `webawesome.css` — components, themes, utilities (required).
- `native.css` (33 KB) — restyles native HTML elements
  (`<table>`, `<hr>`, `<blockquote>`, `<input>`, `<select>`,
  `<details>`) to match the active theme. **Shipped** so Markdown-
  rendered post bodies (which render to native HTML, not WA
  components) inherit the editorial brand without per-element CSS.

The autoloader auto-detects its own base path from the `<script src>`,
so `<wa-icon>` and other asset-using components resolve correctly with
no `setBasePath()` call needed — as long as the loader stays at
`/assets/webawesome/dist-cdn/webawesome.loader.js`.

Reasons for self-hosting: no CDN outage risk, no third-party request
(privacy-consistent), Pro license handling becomes a non-issue (the Pro
bundle is license-gated at download time; no runtime key in the repo).
Files are public anyway once served from GitHub Pages.

**Repo / .gitignore strategy.** GitHub Pages does not run
`npm install`, so the `dist-cdn/` files must be committed. Plan:

- `.gitignore`: `node_modules/`
- Committed: `assets/webawesome/dist-cdn/` (full subtree)
- `package.json` keeps `@web.awesome.me/webawesome-pro` as a
  dependency for local upgrades; a `bin/sync-webawesome` script (or
  Rake task) copies `node_modules/@web.awesome.me/webawesome-pro/dist-cdn/`
  into `assets/webawesome/dist-cdn/` after each `npm install`.

Bundle size note: the full `dist-cdn/` is in the multi-MB range. If
the committed footprint becomes objectionable, the autoloader can be
swapped for explicit per-component imports — but at launch the
autoloader is the simpler call.

### JavaScript layer

`/assets/js/site.js` (plain ES module, no framework):

- Algolia InstantSearch — lifted from current `_includes/algolia.html`,
  adapted to mount inside the `<wa-dialog>`. **Init lazily on the
  dialog's `wa-show` event** (or `wa-after-show` if the search input
  must be focusable on first render), not on `DOMContentLoaded`. This
  avoids paying Algolia's bootstrap cost for users who never open the
  dialog. Mount the InstantSearch root nodes inside the dialog's
  default slot using stable IDs that don't collide with WA's
  internal slot names.
- Dialog open/close trigger on nav search icon
- Drawer open/close trigger on mobile hamburger
- (Deferred) Dark-mode `<wa-switch>` handler + `localStorage`
  persistence

---

## 5. Tooling, Build & Deploy

### `_config.yml` changes

```yaml
plugins:
  - jekyll-algolia
  - jekyll-feed
  - jekyll-paginate-v2
  - jekyll-sitemap
  - jekyll-redirect-from    # NEW

pagination:
  enabled: true
  collection: 'posts'
  per_page: 5
  permalink: /blog/page/:num/     # was /page/:num/
  sort_reverse: true

algolia:
  application_id: ADZBG2997L
  index_name: jekyll
  search_only_api_key: b8c639bf58a56694e5b07d3b68d685b1
  files_to_exclude:
    - index.html
    - about.html
    - blog.html
  nodes_to_index: 'p,li,h2,h3,h4,h5,h6'
```

The `nodes_to_index` rule restricts indexing to prose-bearing elements
only — it keeps navigation, footer, hero copy, and other chrome out of
the index.

### `Gemfile` changes

Add `jekyll-redirect-from` to the `:jekyll_plugins` group. No other
changes.

### New directory structure

```
_data/
  resume.yml                         # NEW
_includes/
  nav.html                           # NEW
  footer.html                        # NEW
  analytics.html                     # NEW (GoatCounter)
  search-dialog.html                 # NEW
  components/
    post-card.html                   # NEW
    skill-tag.html                   # NEW
  home/
    hero.html                        # NEW
    ticker.html                      # NEW
    about.html                       # NEW
    credentials.html                 # NEW
    work.html                        # NEW
    essays.html                      # NEW
    blog.html                        # NEW
    connect.html                     # NEW
_layouts/
  base.html                          # NEW
  home.html                          # NEW
  blog-index.html                    # NEW
  about.html                         # REWRITTEN
  post.html                          # REWRITTEN
_sass/
  _tokens.scss                       # NEW
  _fonts.scss                        # NEW
  _base.scss                         # NEW
  _nav.scss                          # NEW
  _home.scss                         # NEW
  _blog.scss                         # NEW
  _post.scss                         # NEW
  _about.scss                        # NEW
  _algolia.scss                      # KEEP, adapted
assets/
  main.scss                          # REWRITTEN
  fonts/                             # NEW — .woff2 files
  webawesome/
    dist-cdn/                        # NEW — committed self-hosted Pro bundle
      webawesome.loader.js
      styles/
        webawesome.css
        native.css
      ...                            # rest of dist-cdn subtree
  js/
    site.js                          # NEW
```

### Files removed

- `_sass/_foundation.scss`
- `_sass/_main.scss`
- `_sass/app.scss`
- `_sass/main.scss`
- `_includes/algolia.html` (content migrates to
  `search-dialog.html` + `site.js`)
- `zagaja-new-landing.html` (content migrates to `home.html` + partials)

### CI — GitHub Actions

Current workflows (`.github/workflows/pages.yml`,
`algolia-search.yml`) continue to work with the new directory
structure — Jekyll auto-discovers `_includes`, `_layouts`, `_sass`,
`_data`, `assets/`.

Small alignment fix during migration: `algolia-search.yml` pins
`ruby-version: 3.1` explicitly; update it to honor `.ruby-version` to
match `pages.yml`.

GitHub Pages does **not** run `npm install` for this repo, so the
WebAwesome `dist-cdn/` files are committed directly under
`assets/webawesome/dist-cdn/`. Local upgrades flow:
`npm install` → `bin/sync-webawesome` (copies
`node_modules/@web.awesome.me/webawesome-pro/dist-cdn/` to
`assets/webawesome/dist-cdn/`) → commit. `node_modules/` stays in
`.gitignore`.

### GoatCounter analytics

`_includes/analytics.html`:

```html
<script data-goatcounter="https://YOUR_SUBDOMAIN.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

User creates GoatCounter account + supplies subdomain before go-live.
Placeholder ships in the spec — acceptable to deploy with placeholder
and swap in the real subdomain post-merge.

### Content — front-matter migration

6 posts currently linked from the landing's "SELECTED ESSAYS" grid:

- `/2024/07/lessons-from-crowdstrike/` — `essay_category: "Infrastructure"`
- `/2024/02/civic-tech-stacks/` — `essay_category: "Engineering"`
- `/2024/03/ai-llm-shootout/` — `essay_category: "AI"`
- `/2024/03/post-social-media-web/` — `essay_category: "AI & Society"`
- `/2024/07/security-redux/` — `essay_category: "Security"`
- `/2024/05/tech-job-bubble/` — `essay_category: "Industry"`

Each gets `essay: true` and its `essay_category` added to front matter
during migration. Mechanical edit, per-file.

---

## 6. Migration Sequence, Risk, & Acceptance Criteria

### Sequence

One long-lived feature branch with phase commits (or one PR per phase):

1. **Tooling prep.** Add `jekyll-redirect-from` to `Gemfile`,
   `bundle install`, commit lockfile. Align `algolia-search.yml`
   Ruby version with `.ruby-version`. No visual change.
2. **Design tokens + fonts.** Add `/assets/fonts/`,
   `_sass/_fonts.scss`, `_sass/_tokens.scss`, new `assets/main.scss`
   shell. Unpack WA Pro dist into `/assets/webawesome/`. New stylesheet
   linked but not yet consumed — no visual change.
3. **Shell migration.** Create `_layouts/base.html`,
   `_includes/nav.html`, `_includes/footer.html`,
   `_includes/analytics.html`. Transition existing layouts to extend
   `base.html`. "Brown-out" phase — interim visual inconsistency is
   expected.
4. **Home layout.** Port `zagaja-new-landing.html` into
   `_layouts/home.html` + `_includes/home/*` partials. Replace
   `index.html` with thin stub declaring `layout: home`. Paginated list
   moves to `blog.html` declaring `layout: blog-index`. Update
   `pagination.permalink`. Verify `/` shows new landing; `/blog/` shows
   post list.
5. **Post layout.** Rewrite `_layouts/post.html` as editorial reading
   page. Mailchimp block moves below article body. Audit posts for
   Foundation class usage — grep first, fix inline. Delete
   `_sass/_foundation.scss` + related old SCSS.
6. **About page.** Rewrite `about.html` with narrative + structured
   résumé. Populate `_data/resume.yml` scaffolding from existing
   content.
7. **Essay front matter.** Add `essay: true` + `essay_category` to the
   6 linked posts. Verify landing's essays grid populates correctly.
8. **Analytics swap.** Set up GoatCounter, add snippet to
   `_includes/analytics.html`, remove Piwik PRO block from old
   `default.html` (or wherever it survived).
9. **Redirects + cleanup.** Add `redirect_from` to cover legacy
   `/page/N/` routes. Delete `zagaja-new-landing.html`. Final pass.

### Risk & mitigation

| Risk | Likelihood | Mitigation |
|---|---|---|
| Foundation classes in old post bodies break visually | Medium | Grep audit pre-cutover; fix case-by-case. Most posts are prose-only. |
| Linking `dist/` instead of `dist-cdn/` (works locally with bundler, breaks on Pages) | Medium | Spec mandates `dist-cdn/` for all asset paths; reviewer must check `_layouts/base.html` before merge. |
| GoatCounter signup blocks deploy | Low | Placeholder snippet with TODO; can ship without analytics. |
| Algolia indexing breaks after layout changes | Medium | Configure `algolia.files_to_exclude` + `nodes_to_index` before cutover. |
| Legacy `/page/N/` URLs break for external linkers | Low | `jekyll-redirect-from` handles it. |
| Mailchimp form breaks | Low | Preserve all form field IDs verbatim; reskin visually only. |
| Dark-mode contrast issues in long-form prose | Medium | Manual visual QA on a real post (text, quotes, images, code) in both schemes. |
| FOUCE on first paint (autoloader registers components after parse) | Medium | `wa-cloak` on `<html>`; autoloader lifts it on register or after 2s. |
| Self-hosted font files bust cache / cause FOUT | Low | Same-origin, `font-display: swap`, preload critical faces. |

### Acceptance criteria

- [ ] `/` renders the new landing with all 9 sections, typography
      matches `zagaja-new-landing.html`
- [ ] `/blog/` renders paginated list using `.post-card` components;
      pagination works
- [ ] `/blog/page/2/` renders; legacy `/page/2/` redirects to it
- [ ] `/about/` renders narrative + populated résumé sections from
      `_data/resume.yml`
- [ ] Existing post (e.g. `/2024/07/lessons-from-crowdstrike/`) renders
      in new editorial reading layout
- [ ] 6 curated posts have `essay: true` and appear in landing's
      "SELECTED ESSAYS" with correct categories
- [ ] Algolia search opens in `<wa-dialog>` from nav icon, returns
      results, styled consistently with editorial aesthetic
- [ ] Mailchimp signup renders below post body, submits to Mailchimp
      successfully
- [ ] PIT Webring appears only in minimal footer (blog + post pages,
      not landing or about)
- [ ] GoatCounter snippet loads on every page (placeholder subdomain
      OK until real account exists)
- [ ] `_sass/_foundation.scss`, `_main.scss`, `app.scss`, `main.scss`
      are deleted
- [ ] `zagaja-new-landing.html` is deleted
- [ ] Dark mode renders cleanly on home, blog index, about, and post
      pages (spot-check)
- [ ] GH Actions build succeeds on `master`; deployed site matches
      local preview
- [ ] No broken links on home/about/post pages
- [ ] No flash of undefined `<wa-*>` elements on first paint
      (`wa-cloak` removed cleanly by autoloader)
- [ ] No console errors from WA loader (base path, kit code, missing
      icon, missing component)
- [ ] `--wa-color-text-link` resolves to rust on a real `<a>` inside
      a post body (verifies token cascade reached prose CSS)
- [ ] Asset paths under `_layouts/base.html` reference
      `/assets/webawesome/dist-cdn/`, not `/assets/webawesome/dist/`

---

## Out of Scope

- Manual dark-mode toggle (deferred; tokens structured for easy later
  addition)
- Post body content rewrites beyond Foundation-class cleanup
- `_drafts/` migration — stays excluded from build
- New content beyond scaffolding (essays, résumé copy) — user supplies
- RSS feed restyling
- Performance budget / Lighthouse targets
- Formal accessibility audit

---

## Decision Log

Decisions made during brainstorming, for later reference:

| # | Decision | Rationale |
|---|---|---|
| 1 | Full rebrand (option B of 3 scopes) | Editorial consistency; avoid Foundation/new-brand split |
| 2 | Web Awesome design-token-first integration (B of 3) | Full use of Pro license; editorial feel preserved |
| 3 | Keep Algolia, Mailchimp, PIT Webring; drop Piwik PRO for GoatCounter; drop old banner | User-specified |
| 4 | Essays via front-matter flag (A of 4 options) | Keeps essays in main chronology; promotion is 1-line FM edit |
| 5 | Editorial blog-post reading page (A of 3 layouts) | Matches landing aesthetic; no sidebar |
| 6 | About page = narrative + structured résumé (B of 3) | Earns "Full background & résumé" nav label |
| 7 | Nav logo text: `hello@zagaja.com` | User preference |
| 8 | No résumé Skills section (user will tweak later) | User preference |
| 9 | No categories/tags on post pages | User preference |
| 10 | Font Awesome (WA's bundled `default` icon library) | 2,000+ free icons + animations; zero setup. (Earlier draft incorrectly named Phosphor as bundled — Phosphor is not a built-in WA library.) |
| 11 | Auto dark mode only at launch; manual toggle deferred | YAGNI at launch |
| 12 | Self-hosted fonts | Privacy-consistent, perf |
| 13 | Self-hosted WA `dist-cdn/` from day one | Avoid CDN dependency + Pro-key concerns; `dist-cdn/` (not `dist/`) is the browser-ready bundle |
| 14 | `jekyll-redirect-from` added | Cheap insurance for URL moves |
| 15 | No standalone `/essays/` page | Essays are a view into blog posts, not a separate section |
| 16 | `_drafts/` excluded from `_posts/` | Confirmed by user |
| 17 | Default WA theme + custom token overrides (no Pro theme) | Pro themes (Active, Brutalist, Glossy, Matter, Mellow, Playful, Premium, Tailspin) evaluated; none match the rust/cream editorial brand. Custom tokens on top of `default` give us the look without fighting a preset. |
| 18 | `<wa-tag>` (not `<wa-badge>`) for skill chips | Per WA's own docs: tags = labels, badges = status/counts. Skills are labels. |
| 19 | Ship WA `native.css` | Markdown post bodies render to native HTML (`<table>`, `<blockquote>`, `<hr>`, etc.); `native.css` themes them for free. |
| 20 | Token overrides scoped to `:root`, not `body` | Some Pro components (e.g. `<wa-toast>`) portal outside `<body>`. Root scoping survives that. |
