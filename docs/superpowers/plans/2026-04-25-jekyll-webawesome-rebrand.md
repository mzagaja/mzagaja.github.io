# Jekyll → Web Awesome Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Jekyll site from Foundation CSS to an editorial brand (rust/cream, Bebas Neue/DM Serif/DM Sans) powered by Web Awesome Pro, converting the home page to a 9-section editorial landing and adding a dedicated `/blog/` paginated index.

**Architecture:** A new `_layouts/base.html` shell replaces `_layouts/default.html`, extended by `home.html`, `blog-index.html`, `about.html`, and `post.html`. Web Awesome Pro (already in `node_modules/`) is committed under `assets/webawesome/dist-cdn/`. Design tokens are set on `:root` via `_sass/_tokens.scss` overriding WA custom properties. The landing is decomposed into `_includes/home/*.html` partials driven by Liquid.

**Tech Stack:** Jekyll 4 + jekyll-paginate-v2 + jekyll-redirect-from, Web Awesome Pro 3.x (dist-cdn), SCSS, Algolia InstantSearch v4, GoatCounter analytics, self-hosted woff2 fonts via @fontsource npm packages.

---

## File Map

### New files
| File | Purpose |
|---|---|
| `_layouts/base.html` | HTML shell — head, WA loader, nav, footer, analytics |
| `_layouts/home.html` | Editorial landing (extends base) |
| `_layouts/blog-index.html` | Paginated blog list (extends base) |
| `_layouts/about.html` | Narrative + résumé (extends base) |
| `_includes/nav.html` | Fixed nav with WA drawer for mobile |
| `_includes/footer.html` | Variant-aware footer (full vs minimal) |
| `_includes/analytics.html` | GoatCounter snippet |
| `_includes/search-dialog.html` | Algolia `<wa-dialog>` markup |
| `_includes/components/post-card.html` | Reusable post card partial |
| `_includes/components/skill-tag.html` | Skill `<wa-tag>` partial |
| `_includes/home/hero.html` | Hero section |
| `_includes/home/ticker.html` | Scrolling ticker |
| `_includes/home/about.html` | About + skills section |
| `_includes/home/credentials.html` | 4-column credentials strip |
| `_includes/home/work.html` | Selected work list |
| `_includes/home/essays.html` | Essays grid (Liquid-driven) |
| `_includes/home/blog.html` | Recent posts grid (Liquid-driven) |
| `_includes/home/connect.html` | Dark connect section |
| `_sass/_tokens.scss` | WA token overrides + dark mode |
| `_sass/_fonts.scss` | @font-face declarations |
| `_sass/_base.scss` | Reset + body defaults |
| `_sass/_nav.scss` | Nav styles |
| `_sass/_home.scss` | Home page section styles |
| `_sass/_blog.scss` | Blog index styles |
| `_sass/_post.scss` | Post reading page styles |
| `_sass/_about.scss` | About page styles |
| `assets/js/site.js` | Search dialog + drawer JS |
| `assets/webawesome/dist-cdn/` | Committed WA Pro bundle (copy from node_modules) |
| `assets/fonts/*.woff2` | Self-hosted font files |
| `_data/resume.yml` | Structured résumé data |
| `blog.html` | New paginated blog index page |
| `bin/sync-webawesome` | Script to resync WA from node_modules |

### Modified files
| File | Change |
|---|---|
| `_config.yml` | Add redirect-from plugin, fix algolia config, change pagination permalink |
| `Gemfile` | Add `jekyll-redirect-from` |
| `Gemfile.lock` | Updated by `bundle install` |
| `index.html` | Thin stub: `layout: home`, no content |
| `about.html` | Rewrite: `layout: about`, no inline HTML |
| `.github/workflows/algolia-search.yml` | Align ruby-version with `.ruby-version` |
| 6 `_posts/*.markdown` | Add `essay: true` + `essay_category` front matter |
| `assets/main.scss` | Rewrite: imports token/font/base/component SCSS files |

### Deleted files
| File | Reason |
|---|---|
| `_layouts/default.html` | Replaced by `base.html` |
| `_sass/_foundation.scss` | Foundation removed |
| `_sass/_main.scss` | Replaced by component SCSS files |
| `_sass/app.scss` | Replaced by new `assets/main.scss` |
| `_includes/algolia.html` | Content moves to `search-dialog.html` + `site.js` |
| `zagaja-new-landing.html` | Content migrated to `_layouts/home.html` + partials |
| `assets/fonts/Alice-Regular.ttf` | Not used in new design |

---

## Phase 1: Tooling Prep

### Task 1: Add jekyll-redirect-from to Gemfile

**Files:**
- Modify: `Gemfile`

- [ ] **Step 1: Edit Gemfile**

Open `Gemfile`. Change the `:jekyll_plugins` group to:

```ruby
source 'https://rubygems.org'
group :jekyll_plugins do
  gem 'jekyll-algolia'
  gem 'jekyll-sitemap'
  gem 'jekyll-feed'
  gem 'jekyll-paginate-v2'
  gem 'jekyll-redirect-from'
  gem "ffi", github: "ffi/ffi", submodules: true
end

gem "webrick", "~> 1.8"
```

- [ ] **Step 2: Run bundle install**

```bash
bundle install
```

Expected: Gemfile.lock updated with `jekyll-redirect-from`.

- [ ] **Step 3: Commit**

```bash
git add Gemfile Gemfile.lock
git commit -m "⬆️ add jekyll-redirect-from gem"
```

---

### Task 2: Align algolia-search.yml ruby version

**Files:**
- Modify: `.github/workflows/algolia-search.yml`

- [ ] **Step 1: Update the workflow**

Replace the `ruby-version: '3.1'` line with `ruby-version-file: '.ruby-version'`:

```yaml
on:
  push:
    branches:
      - master

name: algolia-search
jobs:
  algolia-search:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Algolia Jekyll Action
        uses: dieghernan/algolia-jekyll-action@main
        with:
          APIKEY: '${{ secrets.ALGOLIA_API_KEY }}'
          ruby-version-file: '.ruby-version'
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/algolia-search.yml
git commit -m "👷 align algolia workflow ruby version with .ruby-version"
```

---

### Task 3: Update _config.yml

**Files:**
- Modify: `_config.yml`

- [ ] **Step 1: Rewrite _config.yml**

```yaml
markdown: kramdown
title: Zagaja.com
description: "Matt Zagaja's personal blog. Musings on politics, technology, and other geeky things."
url: https://www.zagaja.com
incremental: true
permalink: /:year/:month/:title/
plugins:
  - jekyll-algolia
  - jekyll-feed
  - jekyll-paginate-v2
  - jekyll-sitemap
  - jekyll-redirect-from
author:
  twitter: mzagaja
defaults:
  -
    scope:
      path: "page"
    values:
      sitemap: false
algolia:
  application_id: ADZBG2997L
  index_name: jekyll
  search_only_api_key: b8c639bf58a56694e5b07d3b68d685b1
  files_to_exclude:
    - index.html
    - about.html
    - blog.html
  nodes_to_index: 'p,li,h2,h3,h4,h5,h6'
pagination:
  enabled: true
  debug: false
  collection: 'posts'
  per_page: 5
  permalink: /blog/page/:num/
  limit: 0
  sort_reverse: true
```

- [ ] **Step 2: Verify build still works**

```bash
bundle exec jekyll build
```

Expected: Build completes without errors. The site won't look right yet — that's fine.

- [ ] **Step 3: Commit**

```bash
git add _config.yml
git commit -m "🔧 update _config.yml: redirect-from plugin, algolia nodes, blog pagination"
```

---

## Phase 2: Assets — WebAwesome + Fonts

### Task 4: Commit WebAwesome dist-cdn

**Files:**
- Create: `assets/webawesome/dist-cdn/` (entire subtree)
- Create: `bin/sync-webawesome`
- Modify: `.gitignore`

- [ ] **Step 1: Create sync script**

```bash
mkdir -p bin
```

Create `bin/sync-webawesome`:

```bash
#!/usr/bin/env bash
set -euo pipefail
SRC="node_modules/@web.awesome.me/webawesome-pro/dist-cdn"
DEST="assets/webawesome/dist-cdn"

if [ ! -d "$SRC" ]; then
  echo "Error: $SRC not found. Run 'npm install' first."
  exit 1
fi

rm -rf "$DEST"
mkdir -p "$DEST"
cp -r "$SRC/." "$DEST/"
echo "Synced $SRC → $DEST"
```

```bash
chmod +x bin/sync-webawesome
```

- [ ] **Step 2: Run sync**

```bash
./bin/sync-webawesome
```

Expected: `assets/webawesome/dist-cdn/` is populated with ~10MB of files including `webawesome.loader.js` and `styles/webawesome.css`.

- [ ] **Step 3: Verify node_modules is gitignored**

Check `.gitignore` contains `node_modules/`. If not, add it:

```bash
echo "node_modules/" >> .gitignore
```

- [ ] **Step 4: Commit**

```bash
git add bin/sync-webawesome assets/webawesome/ .gitignore
git commit -m "✨ add WebAwesome Pro dist-cdn and sync script"
```

---

### Task 5: Download self-hosted fonts via @fontsource

**Files:**
- Create: `assets/fonts/*.woff2`
- Modify: `package.json`

- [ ] **Step 1: Install fontsource packages**

```bash
npm install @fontsource/dm-sans @fontsource/dm-serif-display @fontsource/dm-mono @fontsource/bebas-neue
```

Expected: packages appear in `node_modules/@fontsource/`.

- [ ] **Step 2: Copy woff2 files to assets/fonts/**

```bash
mkdir -p assets/fonts
# DM Sans weights: 300, 400, 500 (regular + italic)
for weight in 300 400 500; do
  cp node_modules/@fontsource/dm-sans/files/dm-sans-latin-${weight}-normal.woff2 assets/fonts/ 2>/dev/null || true
  cp node_modules/@fontsource/dm-sans/files/dm-sans-latin-${weight}-italic.woff2 assets/fonts/ 2>/dev/null || true
done
# DM Serif Display 400 (regular + italic)
cp node_modules/@fontsource/dm-serif-display/files/dm-serif-display-latin-400-normal.woff2 assets/fonts/ 2>/dev/null || true
cp node_modules/@fontsource/dm-serif-display/files/dm-serif-display-latin-400-italic.woff2 assets/fonts/ 2>/dev/null || true
# DM Mono weights: 400, 500
for weight in 400 500; do
  cp node_modules/@fontsource/dm-mono/files/dm-mono-latin-${weight}-normal.woff2 assets/fonts/ 2>/dev/null || true
done
# Bebas Neue 400
cp node_modules/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2 assets/fonts/ 2>/dev/null || true
```

- [ ] **Step 3: Verify font files exist**

```bash
ls -la assets/fonts/*.woff2
```

Expected: At least 8-10 woff2 files listed. If any are missing, check the exact filename in `node_modules/@fontsource/<name>/files/` and adjust the copy command.

- [ ] **Step 4: Remove old Alice font**

```bash
rm assets/fonts/Alice-Regular.ttf
```

- [ ] **Step 5: Commit**

```bash
git add assets/fonts/ package.json package-lock.json
git commit -m "✨ add self-hosted woff2 fonts via @fontsource"
```

---

## Phase 3: SCSS Architecture

### Task 6: Create _sass/_fonts.scss

**Files:**
- Create: `_sass/_fonts.scss`

- [ ] **Step 1: Write font-face declarations**

Create `_sass/_fonts.scss`:

```scss
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url('/assets/fonts/dm-sans-latin-300-normal.woff2') format('woff2');
}
@font-face {
  font-family: 'DM Sans';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: url('/assets/fonts/dm-sans-latin-300-italic.woff2') format('woff2');
}
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/assets/fonts/dm-sans-latin-400-normal.woff2') format('woff2');
}
@font-face {
  font-family: 'DM Sans';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url('/assets/fonts/dm-sans-latin-400-italic.woff2') format('woff2');
}
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/assets/fonts/dm-sans-latin-500-normal.woff2') format('woff2');
}
@font-face {
  font-family: 'DM Sans';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url('/assets/fonts/dm-sans-latin-500-italic.woff2') format('woff2');
}
@font-face {
  font-family: 'DM Serif Display';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/assets/fonts/dm-serif-display-latin-400-normal.woff2') format('woff2');
}
@font-face {
  font-family: 'DM Serif Display';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url('/assets/fonts/dm-serif-display-latin-400-italic.woff2') format('woff2');
}
@font-face {
  font-family: 'DM Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/assets/fonts/dm-mono-latin-400-normal.woff2') format('woff2');
}
@font-face {
  font-family: 'DM Mono';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/assets/fonts/dm-mono-latin-500-normal.woff2') format('woff2');
}
@font-face {
  font-family: 'Bebas Neue';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/assets/fonts/bebas-neue-latin-400-normal.woff2') format('woff2');
}
```

Note: Only declare @font-face entries for woff2 files that actually exist in `assets/fonts/`. If a file is missing, omit that declaration rather than leaving a broken reference.

---

### Task 7: Create _sass/_tokens.scss

**Files:**
- Create: `_sass/_tokens.scss`

- [ ] **Step 1: Write WA token overrides**

Create `_sass/_tokens.scss`:

```scss
:root {
  // Brand
  --wa-color-brand-fill-loud:    #b83a10;
  --wa-color-brand-on-loud:      #ffffff;
  --wa-color-brand-fill-quiet:   rgba(184, 58, 16, 0.08);

  // Surfaces
  --wa-color-surface-default:    #f5f0e8;
  --wa-color-surface-raised:     #ede8df;
  --wa-color-surface-border:     #ccc7bc;

  // Text
  --wa-color-text-normal:        #0e0e0e;
  --wa-color-text-quiet:         #4a4a4a;
  --wa-color-text-link:          var(--wa-color-brand-fill-loud);
  --wa-color-gray-50:            #888888;

  // Typography
  --wa-font-family-body:     'DM Sans', system-ui, sans-serif;
  --wa-font-family-heading:  'DM Serif Display', Georgia, serif;
  --wa-font-family-code:     'DM Mono', ui-monospace, monospace;
  --site-font-display:       'Bebas Neue', 'DM Serif Display', sans-serif;

  // Scale
  --wa-font-size-base:       1.0625rem;
  --wa-border-radius-scale:  0;

  // Site-local aliases (used in bespoke CSS)
  --bg:        #f5f0e8;
  --bg-subtle: #ede8df;
  --ink:       #0e0e0e;
  --ink-muted: #4a4a4a;
  --ink-faint: #888888;
  --rust:      #b83a10;
  --rust-hover:#d44820;
  --line:      #ccc7bc;
  --dark-bg:   #0e0e0e;
  --dark-text: #f0ebe0;
}

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

    --bg:        #111110;
    --bg-subtle: #1a1918;
    --ink:       #f0ebe0;
    --ink-muted: #b8b2a8;
    --ink-faint: #7a7670;
    --rust:      #e86030;
    --rust-hover:#f07848;
    --line:      #2e2d2b;
    --dark-bg:   #080807;
  }
}
```

---

### Task 8: Create _sass/_base.scss

**Files:**
- Create: `_sass/_base.scss`

- [ ] **Step 1: Write base reset and body defaults**

Create `_sass/_base.scss`:

```scss
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--wa-font-family-body);
  font-size: var(--wa-font-size-base);
  line-height: 1.6;
  overflow-x: hidden;
}

a {
  color: var(--wa-color-text-link);
}

img {
  max-width: 100%;
  height: auto;
}

// Shared button styles
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  font-family: var(--wa-font-family-code);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border: 1.5px solid;
  transition: all 0.2s;
  cursor: pointer;
  line-height: 1;
}

.btn-primary {
  background: var(--rust);
  border-color: var(--rust);
  color: #fff;
}

.btn-primary:hover {
  background: var(--rust-hover);
  border-color: var(--rust-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(180, 50, 10, 0.35);
}

.btn-outline {
  background: transparent;
  border-color: var(--ink);
  color: var(--ink);
}

.btn-outline:hover {
  background: var(--ink);
  color: var(--bg);
  transform: translateY(-2px);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

---

### Task 9: Create _sass/_nav.scss

**Files:**
- Create: `_sass/_nav.scss`

- [ ] **Step 1: Write nav styles**

Create `_sass/_nav.scss`:

```scss
nav.site-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 2.5rem;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--line);
}

.nav-logo {
  font-family: var(--wa-font-family-code);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--rust);
  letter-spacing: 0.05em;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  align-items: center;
}

.nav-links a {
  font-family: var(--wa-font-family-code);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--rust);
}

.nav-hamburger {
  display: none;
}

@media (max-width: 768px) {
  nav.site-nav {
    padding: 1rem 1.25rem;
  }

  .nav-links {
    display: none;
  }

  .nav-hamburger {
    display: block;
  }
}
```

---

### Task 10: Create remaining SCSS partials

**Files:**
- Create: `_sass/_home.scss`
- Create: `_sass/_blog.scss`
- Create: `_sass/_post.scss`
- Create: `_sass/_about.scss`

- [ ] **Step 1: Create _sass/_home.scss**

```scss
// ── HERO ──
.hero {
  min-height: 100svh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 5rem;
}

.hero-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 3rem 4rem 2.5rem;
  border-right: 1px solid var(--line);
}

.hero-eyebrow {
  font-family: var(--wa-font-family-code);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--rust);
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: fadeUp 0.6s 0.1s forwards;
}

.hero-name {
  font-family: var(--site-font-display);
  font-size: clamp(5rem, 11vw, 10rem);
  line-height: 0.9;
  letter-spacing: 0.02em;
  color: var(--ink);
  opacity: 0;
  animation: fadeUp 0.7s 0.25s forwards;
}

.hero-name .accent { color: var(--rust); }

.hero-tagline {
  font-family: var(--wa-font-family-heading);
  font-style: italic;
  font-size: clamp(1.1rem, 2vw, 1.45rem);
  color: var(--ink-muted);
  margin-top: 1.5rem;
  max-width: 32ch;
  opacity: 0;
  animation: fadeUp 0.7s 0.45s forwards;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  margin-top: 3rem;
  flex-wrap: wrap;
  opacity: 0;
  animation: fadeUp 0.7s 0.6s forwards;
}

.hero-right {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 4rem 2.5rem 2rem;
  position: relative;
  overflow: hidden;
}

.hero-num {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--site-font-display);
  font-size: 38vw;
  color: transparent;
  -webkit-text-stroke: 1px var(--line);
  line-height: 1;
  pointer-events: none;
  user-select: none;
  opacity: 0;
  animation: fadeIn 1.2s 0.8s forwards;
}

.hero-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5px;
  background: var(--line);
  border: 1.5px solid var(--line);
  opacity: 0;
  animation: fadeUp 0.7s 0.7s forwards;
  position: relative;
  z-index: 1;
}

.stat {
  background: var(--bg);
  padding: 1.75rem 1.5rem;
}

.stat-number {
  font-family: var(--site-font-display);
  font-size: 2.8rem;
  line-height: 1;
  color: var(--rust);
}

.stat-label {
  font-family: var(--wa-font-family-code);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-top: 0.25rem;
}

// ── TICKER ──
.ticker {
  background: var(--dark-bg);
  padding: 0.75rem 0;
  overflow: hidden;
  white-space: nowrap;
}

.ticker-inner {
  display: inline-flex;
  gap: 3rem;
  animation: scroll 28s linear infinite;
}

.ticker-item {
  font-family: var(--wa-font-family-code);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--dark-text);
}

.ticker-item .dot {
  color: var(--rust);
  margin-right: 1rem;
}

// ── ABOUT SECTION ──
.about-section {
  display: grid;
  grid-template-columns: 1fr 2fr;
  border-top: 1.5px solid var(--line);
}

.about-label {
  padding: 4rem 2rem 4rem 2.5rem;
  border-right: 1px solid var(--line);
  display: flex;
  align-items: flex-start;
}

.section-label-vert {
  font-family: var(--site-font-display);
  font-size: 5rem;
  line-height: 1;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  color: var(--line);
  user-select: none;
}

.about-content {
  padding: 4rem 3rem;
}

.about-content h2 {
  font-family: var(--wa-font-family-heading);
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  line-height: 1.25;
  margin-bottom: 1.5rem;
  color: var(--ink);
}

.about-content h2 em {
  color: var(--rust);
  font-style: italic;
}

.about-content p {
  color: var(--ink-muted);
  max-width: 60ch;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 2rem;
}

// ── CREDENTIALS STRIP ──
.credentials {
  border-top: 1.5px solid var(--line);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.cred {
  padding: 2rem 1.75rem;
  border-right: 1px solid var(--line);
}

.cred:last-child { border-right: none; }

.cred-org {
  font-family: var(--wa-font-family-code);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--rust);
  margin-bottom: 0.4rem;
}

.cred-title {
  font-family: var(--wa-font-family-heading);
  font-size: 1rem;
  line-height: 1.3;
  color: var(--ink);
  margin-bottom: 0.3rem;
}

.cred-detail {
  font-size: 0.82rem;
  color: var(--ink-muted);
  line-height: 1.4;
}

// ── WORK SECTION ──
.work-section { border-top: 1.5px solid var(--line); }

.work-header {
  padding: 3rem 2.5rem 2rem;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-bottom: 1px solid var(--line);
}

.work-header h2 {
  font-family: var(--site-font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  letter-spacing: 0.03em;
  color: var(--ink);
}

.work-header a {
  font-family: var(--wa-font-family-code);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--rust);
  text-decoration: none;
}

.work-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: start;
  gap: 2rem;
  padding: 2rem 2.5rem;
  border-bottom: 1px solid var(--line);
  transition: background 0.2s;
}

.work-item:hover { background: var(--bg-subtle); }

.work-num {
  font-family: var(--wa-font-family-code);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: var(--ink-faint);
  padding-top: 0.2rem;
}

.work-info h3 {
  font-family: var(--wa-font-family-heading);
  font-size: 1.25rem;
  margin-bottom: 0.3rem;
  color: var(--ink);
}

.work-info p {
  font-size: 0.9rem;
  color: var(--ink-muted);
  max-width: 55ch;
}

.work-tags {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: flex-end;
}

.work-tag {
  font-family: var(--wa-font-family-code);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--rust);
}

// ── WRITING / POSTS SECTIONS ──
.writing-section { border-top: 1.5px solid var(--line); }

.writing-header { display: grid; grid-template-columns: 1fr 1fr; }

.writing-title {
  padding: 3rem 2.5rem;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.writing-title h2 {
  font-family: var(--site-font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  letter-spacing: 0.03em;
  color: var(--ink);
}

.writing-intro {
  padding: 3rem 2.5rem;
  border-bottom: 1px solid var(--line);
}

.writing-intro p {
  font-family: var(--wa-font-family-heading);
  font-style: italic;
  font-size: 1.1rem;
  color: var(--ink-muted);
  max-width: 40ch;
}

.posts-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; }

.post-card {
  padding: 2.5rem 2rem;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: background 0.2s;
}

.post-card:nth-child(3n) { border-right: none; }
.post-card:hover { background: var(--bg-subtle); }

.post-date {
  font-family: var(--wa-font-family-code);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

.post-title {
  font-family: var(--wa-font-family-heading);
  font-size: 1.1rem;
  line-height: 1.35;
  color: var(--ink);
}

.post-arrow {
  margin-top: auto;
  font-family: var(--wa-font-family-code);
  font-size: 0.75rem;
  color: var(--rust);
  letter-spacing: 0.05em;
}

// ── CONNECT SECTION ──
.connect-section {
  border-top: 1.5px solid var(--line);
  background: var(--dark-bg);
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 50vh;
}

.connect-left {
  padding: 4rem 3rem 4rem 2.5rem;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.connect-left h2 {
  font-family: var(--site-font-display);
  font-size: clamp(3rem, 6vw, 6rem);
  letter-spacing: 0.03em;
  line-height: 0.95;
  color: var(--dark-text);
}

.connect-left h2 span { color: var(--rust); }

.connect-left p {
  font-size: 0.95rem;
  color: rgba(240, 235, 224, 0.62);
  max-width: 40ch;
  margin-top: 1.5rem;
}

.connect-right {
  padding: 4rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.25rem;
}

.connect-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border: 1px solid rgba(240, 235, 224, 0.14);
  text-decoration: none;
  transition: all 0.2s;
}

.connect-link:hover {
  border-color: var(--rust);
  background: rgba(230, 90, 40, 0.12);
  transform: translateX(4px);
}

.connect-link-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.connect-link-platform {
  font-family: var(--wa-font-family-code);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(240, 235, 224, 0.42);
}

.connect-link-handle {
  font-family: var(--wa-font-family-heading);
  font-size: 1rem;
  color: var(--dark-text);
}

.connect-arrow {
  color: var(--rust);
  font-size: 1.2rem;
}

// ── FOOTER ──
footer.site-footer {
  background: var(--dark-bg);
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  padding: 1.5rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

footer.site-footer p,
footer.site-footer a {
  font-family: var(--wa-font-family-code);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(240, 235, 224, 0.35);
}

footer.site-footer a {
  text-decoration: none;
  transition: color 0.2s;
}

footer.site-footer a:hover { color: var(--rust); }

// ── HOME RESPONSIVE ──
@media (max-width: 900px) {
  .credentials { grid-template-columns: 1fr 1fr; }
  .cred:nth-child(2) { border-right: none; }
  .cred:nth-child(3) { border-top: 1px solid var(--line); border-right: 1px solid var(--line); }
  .cred:nth-child(4) { border-top: 1px solid var(--line); }
}

@media (max-width: 768px) {
  .hero { grid-template-columns: 1fr; min-height: auto; padding-top: 4.5rem; }
  .hero-right { display: none; }
  .hero-left { padding: 2.5rem 1.25rem 3rem; border-right: none; }
  .about-section { grid-template-columns: 1fr; }
  .about-label { display: none; }
  .about-content { padding: 2.5rem 1.25rem; }
  .credentials { grid-template-columns: 1fr; }
  .cred { border-right: none !important; border-top: 1px solid var(--line); }
  .cred:first-child { border-top: none; }
  .work-item { grid-template-columns: auto 1fr; gap: 1rem; padding: 1.5rem 1.25rem; }
  .work-tags { display: none; }
  .work-header { padding: 2rem 1.25rem 1.5rem; }
  .posts-grid { grid-template-columns: 1fr; }
  .post-card { border-right: none !important; }
  .writing-header { grid-template-columns: 1fr; }
  .writing-title { border-right: none; padding: 2rem 1.25rem 1.5rem; }
  .writing-intro { border-right: none; padding: 1.5rem 1.25rem 2rem; }
  .connect-section { grid-template-columns: 1fr; }
  .connect-left { border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding: 3rem 1.25rem; }
  .connect-right { padding: 2.5rem 1.25rem; }
  footer.site-footer { flex-direction: column; gap: 0.5rem; text-align: center; }
}
```

- [ ] **Step 2: Create _sass/_blog.scss**

```scss
.blog-header {
  padding: 6rem 2.5rem 3rem;
  border-bottom: 1.5px solid var(--line);
}

.blog-header h1 {
  font-family: var(--site-font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  letter-spacing: 0.03em;
  color: var(--ink);
}

.blog-header p {
  font-family: var(--wa-font-family-heading);
  font-style: italic;
  font-size: 1.1rem;
  color: var(--ink-muted);
  margin-top: 1rem;
  max-width: 50ch;
}

.blog-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.blog-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 3rem 2.5rem;
  border-top: 1px solid var(--line);
  font-family: var(--wa-font-family-code);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.blog-pagination a {
  color: var(--rust);
  text-decoration: none;
}

.blog-pagination a:hover { text-decoration: underline; }

.blog-pagination .current-page {
  color: var(--ink-muted);
}

@media (max-width: 768px) {
  .blog-header { padding: 5rem 1.25rem 2rem; }
  .blog-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Create _sass/_post.scss**

```scss
.post-header {
  padding: 6rem 2.5rem 3rem;
  border-bottom: 1.5px solid var(--line);
  max-width: 75ch;
  margin: 0 auto;
}

.post-eyebrow {
  font-family: var(--wa-font-family-code);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--rust);
  margin-bottom: 1.5rem;
}

.post-header h1 {
  font-family: var(--wa-font-family-heading);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  line-height: 1.2;
  color: var(--ink);
}

.reading-column {
  max-width: 65ch;
  margin: 0 auto;
  padding: 3rem 2.5rem 4rem;

  p { margin-bottom: 1.25rem; color: var(--ink); }

  h2 {
    font-family: var(--wa-font-family-heading);
    font-size: 1.6rem;
    margin: 2.5rem 0 1rem;
    color: var(--ink);
  }

  h3 {
    font-family: var(--wa-font-family-heading);
    font-size: 1.25rem;
    margin: 2rem 0 0.75rem;
    color: var(--ink);
  }

  blockquote {
    border-left: 3px solid var(--rust);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: var(--ink-muted);
    background: var(--bg-subtle);
  }

  ul, ol {
    margin: 1rem 0 1.25rem 1.5rem;
    li { margin-bottom: 0.35rem; }
  }

  pre {
    background: var(--bg-subtle);
    border: 1px solid var(--line);
    padding: 1.25rem 1.5rem;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  code {
    font-family: var(--wa-font-family-code);
    font-size: 0.875em;
  }

  pre code { font-size: 0.85em; }

  img {
    max-width: 100%;
    height: auto;
    margin: 1.5rem 0;
    display: block;
  }

  hr {
    border: none;
    border-top: 1px solid var(--line);
    margin: 2.5rem 0;
  }

  a { color: var(--wa-color-text-link); }
}

.mailchimp-block {
  max-width: 65ch;
  margin: 0 auto;
  padding: 2rem 2.5rem 3rem;
  border-top: 1px solid var(--line);

  h3 {
    font-family: var(--wa-font-family-heading);
    font-size: 1.25rem;
    margin-bottom: 1.25rem;
    color: var(--ink);
  }

  .mailchimp-form {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    align-items: flex-end;
  }

  #mce-responses { width: 100%; }
  .response { font-size: 0.85rem; color: var(--ink-muted); margin-top: 0.5rem; }
}

.related-posts {
  border-top: 1.5px solid var(--line);
  padding: 3rem 2.5rem;
}

.related-posts h2 {
  font-family: var(--site-font-display);
  font-size: 2rem;
  letter-spacing: 0.03em;
  color: var(--ink);
  margin-bottom: 2rem;
}

.related-posts .posts-grid { grid-template-columns: 1fr 1fr 1fr; }

@media (max-width: 768px) {
  .post-header { padding: 5rem 1.25rem 2rem; }
  .reading-column { padding: 2rem 1.25rem 3rem; }
  .mailchimp-block { padding: 1.5rem 1.25rem 2rem; }
  .related-posts { padding: 2rem 1.25rem; }
  .related-posts .posts-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 4: Create _sass/_about.scss**

```scss
.about-page-header {
  padding: 6rem 2.5rem 3rem;
  border-bottom: 1.5px solid var(--line);
}

.about-page-header h1 {
  font-family: var(--site-font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  letter-spacing: 0.03em;
  color: var(--ink);
}

.about-narrative {
  max-width: 65ch;
  margin: 0 auto;
  padding: 3rem 2.5rem;

  p {
    margin-bottom: 1.25rem;
    color: var(--ink-muted);
    line-height: 1.7;
  }

  a { color: var(--wa-color-text-link); }
}

.resume-section {
  padding: 3rem 2.5rem;
  border-top: 1.5px solid var(--line);

  h2 {
    font-family: var(--site-font-display);
    font-size: 2.5rem;
    letter-spacing: 0.03em;
    color: var(--ink);
    margin-bottom: 2rem;
  }
}

.resume-item {
  margin-bottom: 2rem;

  .resume-item-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .resume-org {
    font-family: var(--wa-font-family-code);
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--rust);
  }

  .resume-role {
    font-family: var(--wa-font-family-heading);
    font-size: 1.1rem;
    color: var(--ink);
  }

  .resume-dates {
    font-family: var(--wa-font-family-code);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    color: var(--ink-faint);
  }

  .resume-summary {
    color: var(--ink-muted);
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 0.75rem;
  }

  .resume-highlights {
    margin-left: 1.25rem;
    li {
      color: var(--ink-muted);
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }
  }
}

@media (max-width: 768px) {
  .about-page-header { padding: 5rem 1.25rem 2rem; }
  .about-narrative { padding: 2rem 1.25rem; }
  .resume-section { padding: 2rem 1.25rem; }
}
```

---

### Task 11: Rewrite assets/main.scss

**Files:**
- Modify: `assets/main.scss`

- [ ] **Step 1: Rewrite main.scss**

```scss
---
# Only the main Sass file needs front matter (the dashes are enough)
---
@import "tokens";
@import "fonts";
@import "base";
@import "nav";
@import "home";
@import "blog";
@import "post";
@import "about";
@import "algolia";
```

Note: `_sass/_algolia.scss` is retained as-is; it still handles Algolia search result styles.

- [ ] **Step 2: Commit all SCSS**

```bash
git add _sass/ assets/main.scss
git commit -m "✨ add editorial SCSS architecture: tokens, fonts, base, components"
```

---

## Phase 4: Shell Layout

### Task 12: Create _layouts/base.html

**Files:**
- Create: `_layouts/base.html`

- [ ] **Step 1: Write base layout**

Create `_layouts/base.html`:

```html
<!doctype html>
<html class="wa-cloak" lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{% if page.title %}{{ page.title }} | {{ site.title }}{% else %}{{ site.title }}{% endif %}</title>

  <meta property="og:site_name" content="{{ site.title }}"/>
  <meta property="og:title" content="{% if page.title %}{{ page.title }}{% else %}{{ site.title }}{% endif %}" />
  <meta property="og:image" content="/images/fb_image.jpg">
  <link rel="alternate" type="application/rss+xml" title="{{ site.title }}" href="{{ site.url }}/feed.xml">
  <link href="{{ site.url }}/feed.xml" rel="alternate" type="application/rss+xml" title="{{ site.title }} Blog Posts" />

  <link rel="stylesheet" href="/assets/webawesome/dist-cdn/styles/webawesome.css" />
  <link rel="stylesheet" href="/assets/webawesome/dist-cdn/styles/native.css" />
  <link rel="stylesheet" href="/assets/main.css" />
  <script type="module" src="/assets/webawesome/dist-cdn/webawesome.loader.js"></script>
</head>
<body>
  {% include nav.html %}

  <main>
    {{ content }}
  </main>

  {% include footer.html %}
  {% include analytics.html %}
  {% include search-dialog.html %}
  <script type="module" src="/assets/js/site.js"></script>
</body>
</html>
```

---

### Task 13: Create _includes/nav.html

**Files:**
- Create: `_includes/nav.html`

- [ ] **Step 1: Write nav include**

Create `_includes/nav.html`:

```html
<nav class="site-nav" aria-label="Site navigation">
  <a class="nav-logo" href="/">hello@zagaja.com</a>

  <ul class="nav-links">
    <li><a href="/about">About</a></li>
    <li><a href="/blog">Blog</a></li>
    <li><a href="/#essays">Essays</a></li>
    <li><a href="/#connect">Connect</a></li>
    <li>
      <wa-button id="search-trigger" appearance="plain" aria-label="Search">
        <wa-icon name="magnifying-glass" slot="prefix"></wa-icon>
      </wa-button>
    </li>
    <li>
      <a href="/blog" class="btn btn-outline" style="padding:0.4rem 1rem;border-width:1px;font-size:0.72rem;">Blog</a>
    </li>
  </ul>

  <wa-button class="nav-hamburger" id="mobile-menu-trigger" appearance="plain" aria-label="Open menu">
    <wa-icon name="bars" slot="prefix"></wa-icon>
  </wa-button>
</nav>

<wa-drawer id="mobile-nav" label="Navigation" placement="end">
  <ul style="list-style:none;padding:1rem;display:flex;flex-direction:column;gap:1.5rem;">
    <li><a href="/about" style="font-family:var(--wa-font-family-code);font-size:0.9rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--ink);text-decoration:none;">About</a></li>
    <li><a href="/blog" style="font-family:var(--wa-font-family-code);font-size:0.9rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--ink);text-decoration:none;">Blog</a></li>
    <li><a href="/#essays" style="font-family:var(--wa-font-family-code);font-size:0.9rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--ink);text-decoration:none;">Essays</a></li>
    <li><a href="/#connect" style="font-family:var(--wa-font-family-code);font-size:0.9rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--ink);text-decoration:none;">Connect</a></li>
  </ul>
</wa-drawer>
```

---

### Task 14: Create _includes/footer.html

**Files:**
- Create: `_includes/footer.html`

- [ ] **Step 1: Write footer include**

The footer uses `page.layout` to determine variant. Layouts that extend `base.html` pass `page.layout` = their own layout name. Home and about use the full variant; blog-index and post use the minimal variant.

Create `_includes/footer.html`:

```html
{% assign full_footer = false %}
{% if page.layout == 'home' or page.layout == 'about' %}
  {% assign full_footer = true %}
{% endif %}

{% if full_footer %}
<section class="connect-section" id="connect">
  <div class="connect-left">
    <div>
      <h2>LET'S<br><span>CON</span>NECT.</h2>
      <p>I'm always interested in hearing from folks working on interesting problems — especially at the intersection of engineering, media, and the public good.</p>
    </div>
    <a href="https://mastodon.social/@mzagaja" class="btn btn-primary" style="align-self:flex-start;margin-top:2rem;" target="_blank" rel="me noopener">
      Find me on Mastodon →
    </a>
  </div>
  <div class="connect-right">
    <a href="https://mastodon.social/@mzagaja" class="connect-link" target="_blank" rel="me noopener">
      <div class="connect-link-info">
        <span class="connect-link-platform">Mastodon</span>
        <span class="connect-link-handle">@mzagaja@mastodon.social</span>
      </div>
      <span class="connect-arrow">→</span>
    </a>
    <a href="https://github.com/mzagaja" class="connect-link" target="_blank" rel="noopener">
      <div class="connect-link-info">
        <span class="connect-link-platform">GitHub</span>
        <span class="connect-link-handle">github.com/mzagaja</span>
      </div>
      <span class="connect-arrow">→</span>
    </a>
    <a href="/about" class="connect-link">
      <div class="connect-link-info">
        <span class="connect-link-platform">More about me</span>
        <span class="connect-link-handle">Full background &amp; résumé</span>
      </div>
      <span class="connect-arrow">→</span>
    </a>
    <a href="/feed.xml" class="connect-link">
      <div class="connect-link-info">
        <span class="connect-link-platform">RSS Feed</span>
        <span class="connect-link-handle">Subscribe to the blog</span>
      </div>
      <span class="connect-arrow">→</span>
    </a>
  </div>
</section>
{% endif %}

<footer class="site-footer">
  <p>&copy; {{ site.time | date: '%Y' }} Matt Zagaja. <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_US">CC BY-NC-SA 3.0</a></p>
  <p>
    <a rel="me" href="https://mastodon.social/@mzagaja">Mastodon</a> ·
    <a href="https://github.com/mzagaja">GitHub</a> ·
    <a href="/feed.xml">RSS</a>
  </p>
  {% unless full_footer %}
    <script src="https://pitwebring.billhunt.dev/webring.js"></script>
    <script>showWebring(true);</script>
  {% endunless %}
</footer>
```

---

### Task 15: Create _includes/analytics.html and search-dialog.html

**Files:**
- Create: `_includes/analytics.html`
- Create: `_includes/search-dialog.html`

- [ ] **Step 1: Create analytics include**

Create `_includes/analytics.html`:

```html
<!-- GoatCounter analytics — replace YOUR_SUBDOMAIN with real account before go-live -->
<script data-goatcounter="https://YOUR_SUBDOMAIN.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

- [ ] **Step 2: Create search dialog include**

The dialog contains stable IDs for Algolia to mount into. JS lazy-initializes on first open.

Create `_includes/search-dialog.html`:

```html
<wa-dialog id="search-dialog" label="Search">
  <div id="search-searchbar"></div>
  <div id="search-hits"></div>
  <div id="powered-by"></div>
</wa-dialog>
```

- [ ] **Step 3: Commit shell infrastructure**

```bash
git add _layouts/base.html _includes/nav.html _includes/footer.html _includes/analytics.html _includes/search-dialog.html
git commit -m "✨ add base layout shell with nav, footer, analytics, search dialog"
```

---

## Phase 5: Home Layout + Blog Index

### Task 16: Create home section partials

**Files:**
- Create: `_includes/home/hero.html`
- Create: `_includes/home/ticker.html`
- Create: `_includes/home/about.html`
- Create: `_includes/home/credentials.html`
- Create: `_includes/home/work.html`

- [ ] **Step 1: Create hero partial**

```bash
mkdir -p _includes/home _includes/components
```

Create `_includes/home/hero.html`:

```html
<section class="hero">
  <div class="hero-left">
    <p class="hero-eyebrow">Software Architect · Ruby · Media · Civic Tech</p>
    <h1 class="hero-name">MATT<br><span class="accent">Z</span>AGAJA</h1>
    <p class="hero-tagline">Engineer and attorney building software that matters — at TED, on civic infrastructure, and across the web.</p>
    <div class="hero-cta">
      <a href="#work" class="btn btn-primary">See My Work →</a>
      <a href="#connect" class="btn btn-outline">Get in Touch</a>
    </div>
  </div>
  <div class="hero-right" aria-hidden="true">
    <div class="hero-num">MZ</div>
    <div class="hero-stats">
      <div class="stat">
        <div class="stat-number">TED</div>
        <div class="stat-label">Software Architect</div>
      </div>
      <div class="stat">
        <div class="stat-number">Harvard</div>
        <div class="stat-label">Berkman Klein Fellow</div>
      </div>
      <div class="stat">
        <div class="stat-number">10+</div>
        <div class="stat-label">Years Shipping Code</div>
      </div>
      <div class="stat">
        <div class="stat-number">JD</div>
        <div class="stat-label">Intellectual Property Law</div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create ticker partial**

Create `_includes/home/ticker.html`:

```html
<div class="ticker" aria-hidden="true">
  <div class="ticker-inner">
    <span class="ticker-item"><span class="dot">◆</span>Ruby on Rails</span>
    <span class="ticker-item"><span class="dot">◆</span>Media Infrastructure</span>
    <span class="ticker-item"><span class="dot">◆</span>PostGIS &amp; Geospatial</span>
    <span class="ticker-item"><span class="dot">◆</span>AI &amp; LLMs</span>
    <span class="ticker-item"><span class="dot">◆</span>Civic Tech</span>
    <span class="ticker-item"><span class="dot">◆</span>Lumen Database</span>
    <span class="ticker-item"><span class="dot">◆</span>Code for Boston</span>
    <span class="ticker-item"><span class="dot">◆</span>Esri · Mapbox</span>
    <span class="ticker-item"><span class="dot">◆</span>Google Summer of Code</span>
    <span class="ticker-item"><span class="dot">◆</span>Open Source</span>
    <span class="ticker-item"><span class="dot">◆</span>Ruby on Rails</span>
    <span class="ticker-item"><span class="dot">◆</span>Media Infrastructure</span>
    <span class="ticker-item"><span class="dot">◆</span>PostGIS &amp; Geospatial</span>
    <span class="ticker-item"><span class="dot">◆</span>AI &amp; LLMs</span>
    <span class="ticker-item"><span class="dot">◆</span>Civic Tech</span>
    <span class="ticker-item"><span class="dot">◆</span>Lumen Database</span>
    <span class="ticker-item"><span class="dot">◆</span>Code for Boston</span>
    <span class="ticker-item"><span class="dot">◆</span>Esri · Mapbox</span>
    <span class="ticker-item"><span class="dot">◆</span>Google Summer of Code</span>
    <span class="ticker-item"><span class="dot">◆</span>Open Source</span>
  </div>
</div>
```

- [ ] **Step 3: Create about partial**

Create `_includes/home/about.html`:

```html
<section class="about-section" id="about">
  <div class="about-label">
    <div class="section-label-vert" aria-hidden="true">ABOUT</div>
  </div>
  <div class="about-content">
    <h2>Software architect, <em>attorney</em>,<br>and civic technologist.</h2>
    <p>I'm a Software Architect at TED, building the backend systems that power one of the world's most-watched video platforms. I work primarily in Ruby on Rails and care about shipping software that's fast, reliable, and built to last.</p>
    <p>Before TED, I was a Ford Foundation and Mozilla fellow at Harvard's Berkman Klein Center for Internet &amp; Society, where I worked on the Lumen Database — the world's largest archive of online content removal requests — and mentored two Google Summer of Code students. Earlier, as Lead Web Developer at MAPC (the Metropolitan Area Planning Council), I built geospatial planning tools using PostGIS, Esri vector tile services, Mapbox, and shapefile pipelines.</p>
    <p>My background is genuinely unusual: JD from UConn Law with a focus on Intellectual Property, years in Connecticut politics as a Deputy Data Director and campaign manager, and a career that found its fullest expression in code. I lead engineering for Code for Boston, write regularly about technology and its social implications, and care deeply about software that serves democracy, equity, and the public good.</p>
    <div class="skills-grid">
      {% assign skills = "Ruby,Rails,RSpec,PostgreSQL,PostGIS,ogr2ogr,Esri / ArcGIS,Mapbox,D3.js,Docker,REST APIs,AI / LLMs,Media Tech,Civic Tech,Security,Open Source" | split: "," %}
      {% for skill in skills %}
        {% include components/skill-tag.html skill=skill %}
      {% endfor %}
    </div>
  </div>
</section>
```

- [ ] **Step 4: Create credentials partial**

Create `_includes/home/credentials.html`:

```html
<div class="credentials">
  <div class="cred">
    <div class="cred-org">TED</div>
    <div class="cred-title">Software Architect</div>
    <div class="cred-detail">Backend systems powering global video distribution for one of the web's most recognized media platforms.</div>
  </div>
  <div class="cred">
    <div class="cred-org">Berkman Klein Center · Harvard</div>
    <div class="cred-title">Ford &amp; Mozilla Fellow</div>
    <div class="cred-detail">Lumen Database — the world's largest archive of online takedown requests. Mentored two Google Summer of Code students.</div>
  </div>
  <div class="cred">
    <div class="cred-org">MAPC</div>
    <div class="cred-title">Lead Web Developer</div>
    <div class="cred-detail">Geospatial tools for metropolitan planning — PostGIS, Esri vector tiles, Mapbox, and civic data pipelines.</div>
  </div>
  <div class="cred">
    <div class="cred-org">Code for Boston</div>
    <div class="cred-title">Leadership Team</div>
    <div class="cred-detail">Leading civic tech engineers on open-source projects for public benefit — voter tools, outreach apps, community infrastructure.</div>
  </div>
</div>
```

- [ ] **Step 5: Create work partial**

Create `_includes/home/work.html`:

```html
<section class="work-section" id="work">
  <div class="work-header">
    <h2>SELECTED WORK</h2>
    <a href="/about">Full background →</a>
  </div>
  <div class="work-list">
    <div class="work-item">
      <span class="work-num">01</span>
      <div class="work-info">
        <h3>TED — Media Platform Backend</h3>
        <p>Software Architect on TED.com's backend — serving millions of viewers globally. Ruby on Rails, API design, media infrastructure, and reliability at scale for one of the web's most recognized platforms for spreading ideas.</p>
      </div>
      <div class="work-tags">
        <span class="work-tag">Ruby / Rails</span>
        <span class="work-tag">Media Tech</span>
        <span class="work-tag">Scale</span>
      </div>
    </div>
    <div class="work-item">
      <span class="work-num">02</span>
      <div class="work-info">
        <h3>Lumen Database — Berkman Klein Center, Harvard</h3>
        <p>Ford Foundation &amp; Mozilla fellowship. Built and maintained the world's largest archive of DMCA and content-removal requests — research infrastructure used by academics, journalists, and policymakers studying online speech and platform accountability. Mentored two Google Summer of Code contributors.</p>
      </div>
      <div class="work-tags">
        <span class="work-tag">Fellowship</span>
        <span class="work-tag">Ruby</span>
        <span class="work-tag">Research Infra</span>
      </div>
    </div>
    <div class="work-item">
      <span class="work-num">03</span>
      <div class="work-info">
        <h3>MAPC — Geospatial Planning Tools</h3>
        <p>Lead Web Developer at the Metropolitan Area Planning Council. Built mapping applications for planners and policymakers using PostGIS, ogr2ogr, Esri vector tile services, Mapbox, and shapefile pipelines ingested into Rails + PostgreSQL. Also built D3.js election maps overlaying district geometries with live results.</p>
      </div>
      <div class="work-tags">
        <span class="work-tag">PostGIS</span>
        <span class="work-tag">Esri / Mapbox</span>
        <span class="work-tag">Geospatial</span>
      </div>
    </div>
    <div class="work-item">
      <span class="work-num">04</span>
      <div class="work-info">
        <h3>Code for Boston &amp; CTNewsJunkie Civic Projects</h3>
        <p>Heat Pump Accelerator for the Urban League (outreach tooling for underserved Boston neighborhoods). Voter guide and legislative tracker at vote.ctnewsjunkie.com and bills.ctnewsjunkie.com. Software that makes policy, elections, and public programs legible to ordinary residents.</p>
      </div>
      <div class="work-tags">
        <span class="work-tag">Civic Tech</span>
        <span class="work-tag">Public Benefit</span>
        <span class="work-tag">Open Source</span>
      </div>
    </div>
  </div>
</section>
```

---

### Task 17: Create shared components and essay/blog/connect partials

**Files:**
- Create: `_includes/components/post-card.html`
- Create: `_includes/components/skill-tag.html`
- Create: `_includes/home/essays.html`
- Create: `_includes/home/blog.html`
- Create: `_includes/home/connect.html`

- [ ] **Step 1: Create post-card component**

The `post` variable passed in should have `.url`, `.title`, `.date`, and optionally `.essay_category`.

Create `_includes/components/post-card.html`:

```html
<a href="{{ include.post.url }}" class="post-card">
  <span class="post-date">
    {% if include.post.essay_category %}{{ include.post.essay_category }} · {% endif %}{{ include.post.date | date: "%b %Y" }}
  </span>
  <span class="post-title">{{ include.post.title }}</span>
  <span class="post-arrow">Read →</span>
</a>
```

- [ ] **Step 2: Create skill-tag component**

Create `_includes/components/skill-tag.html`:

```html
<wa-tag appearance="outlined">{{ include.skill }}</wa-tag>
```

- [ ] **Step 3: Create essays partial**

Create `_includes/home/essays.html`:

```html
{% assign essays = site.posts | where: "essay", true | sort: "date" | reverse | slice: 0, 6 %}
{% if essays.size > 0 %}
<section class="writing-section" id="essays">
  <div class="writing-header">
    <div class="writing-title"><h2>SELECTED ESSAYS</h2></div>
    <div class="writing-intro">
      <p>Longer-form thinking on engineering, AI, infrastructure, and the systems that shape how we live and work.</p>
    </div>
  </div>
  <div class="posts-grid">
    {% for post in essays %}
      {% include components/post-card.html post=post %}
    {% endfor %}
  </div>
</section>
{% endif %}
```

- [ ] **Step 4: Create blog partial**

Create `_includes/home/blog.html`:

```html
{% assign recent = site.posts | slice: 0, 6 %}
<section class="writing-section" id="writing">
  <div class="writing-header">
    <div class="writing-title"><h2>FROM THE BLOG</h2></div>
    <div class="writing-intro">
      <p>Weekly dispatches on engineering, AI, civic tech, and whatever I'm currently thinking about.</p>
      <br>
      <a href="/blog" class="btn btn-outline" style="font-size:0.72rem;padding:0.5rem 1.2rem;">All Posts →</a>
    </div>
  </div>
  <div class="posts-grid">
    {% for post in recent %}
      {% include components/post-card.html post=post %}
    {% endfor %}
  </div>
</section>
```

- [ ] **Step 5: Create connect partial**

Create `_includes/home/connect.html`:

```html
<!-- connect section is rendered by footer.html for home layout -->
<!-- This partial exists as a marker; the connect section lives in footer.html -->
```

Note: The spec's "LET'S CONNECT" section is in the full footer variant (rendered by `footer.html` when `page.layout == 'home'`). No separate partial needed.

---

### Task 18: Create _layouts/home.html

**Files:**
- Create: `_layouts/home.html`

- [ ] **Step 1: Write home layout**

Create `_layouts/home.html`:

```html
---
layout: base
---
{% include home/hero.html %}
{% include home/ticker.html %}
{% include home/about.html %}
{% include home/credentials.html %}
{% include home/work.html %}
{% include home/essays.html %}
{% include home/blog.html %}
```

---

### Task 19: Create _layouts/blog-index.html

**Files:**
- Create: `_layouts/blog-index.html`

- [ ] **Step 1: Write blog-index layout**

Create `_layouts/blog-index.html`:

```html
---
layout: base
---
<div class="blog-header">
  <h1>FROM THE BLOG</h1>
  <p>Writing on engineering, AI, civic tech, and more.</p>
</div>

<div class="blog-grid">
  {% for post in paginator.posts %}
    {% include components/post-card.html post=post %}
  {% endfor %}
</div>

<nav class="blog-pagination" aria-label="Pagination">
  {% if paginator.previous_page %}
    {% if paginator.previous_page == 1 %}
      <a href="/blog/">&laquo; Newer</a>
    {% else %}
      <a href="/blog/page/{{ paginator.previous_page }}/">&laquo; Newer</a>
    {% endif %}
  {% else %}
    <span>&laquo; Newer</span>
  {% endif %}

  <span class="current-page">Page {{ paginator.page }} of {{ paginator.total_pages }}</span>

  {% if paginator.next_page %}
    <a href="/blog/page/{{ paginator.next_page }}/">Older &raquo;</a>
  {% else %}
    <span>Older &raquo;</span>
  {% endif %}
</nav>
```

---

### Task 20: Rewrite index.html and create blog.html

**Files:**
- Modify: `index.html`
- Create: `blog.html`

- [ ] **Step 1: Rewrite index.html**

```html
---
layout: home
title: Matt Zagaja — Software Architect
---
```

- [ ] **Step 2: Create blog.html**

```html
---
layout: blog-index
title: Blog
pagination:
  enabled: true
---
```

- [ ] **Step 3: Verify build**

```bash
bundle exec jekyll build
```

Expected: Build completes. Check `_site/index.html` renders the home layout and `_site/blog/index.html` renders the blog index. If build fails, check layout names and YAML front matter.

```bash
rg "hero-name" _site/index.html
rg "FROM THE BLOG" _site/blog/index.html
```

Expected: Both return a match.

- [ ] **Step 4: Commit**

```bash
git add _layouts/home.html _layouts/blog-index.html _includes/home/ _includes/components/ index.html blog.html
git commit -m "✨ add home layout, blog-index layout, and home section partials"
```

---

## Phase 6: Post Layout

### Task 21: Rewrite _layouts/post.html

**Files:**
- Modify: `_layouts/post.html`

- [ ] **Step 1: Rewrite post layout**

```html
---
layout: base
---
<article>
  <header class="post-header">
    <p class="post-eyebrow">{{ page.essay_category | default: "Blog" }} &middot; {{ page.date | date: "%b %Y" }}</p>
    <h1>{{ page.title }}</h1>
  </header>

  <div class="reading-column">
    {{ content }}
  </div>

  <div class="mailchimp-block">
    <h3>Want to get posts like this in your email?</h3>
    <form action="https://zagaja.us2.list-manage.com/subscribe/post?u=a6d8176ada6e5220a4fd7490b&amp;id=1f472c8860" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate mailchimp-form" target="_blank" novalidate>
      <div id="mc_embed_signup_scroll">
        <wa-input type="email" name="EMAIL" id="mce-EMAIL" placeholder="Email address" required style="flex:1;min-width:200px;"></wa-input>
        <div id="mce-responses">
          <div class="response" id="mce-error-response" style="display:none"></div>
          <div class="response" id="mce-success-response" style="display:none"></div>
        </div>
        <div style="position:absolute;left:-5000px;" aria-hidden="true">
          <input type="text" name="b_a6d8176ada6e5220a4fd7490b_1f472c8860" tabindex="-1" value="">
        </div>
        <wa-button type="submit" name="subscribe" id="mc-embedded-subscribe" variant="brand">Subscribe</wa-button>
      </div>
    </form>
  </div>

  {% assign related_posts = "" | split: "" %}
  {% if page.essay_category %}
    {% assign related_posts = site.posts | where: "essay_category", page.essay_category | where_exp: "p", "p.url != page.url" | slice: 0, 3 %}
  {% endif %}
  {% if related_posts.size == 0 %}
    {% assign related_posts = site.posts | where_exp: "p", "p.url != page.url" | slice: 0, 3 %}
  {% endif %}

  <div class="related-posts">
    <h2>RELATED POSTS</h2>
    <div class="posts-grid">
      {% for post in related_posts %}
        {% include components/post-card.html post=post %}
      {% endfor %}
    </div>
  </div>
</article>
```

- [ ] **Step 2: Verify a post builds correctly**

```bash
bundle exec jekyll build
rg "reading-column" _site/2020/08/09/how-to-find-changes-between-two-bills/index.html
```

Expected: Match found.

---

### Task 22: Audit and handle Foundation classes in posts

**Files:**
- Possibly modify: various `_posts/*.markdown`

- [ ] **Step 1: Audit Foundation classes**

```bash
rg "(\.row|\.columns|\.large-[0-9]|\.small-[0-9]|\.button|\.callout|\.medium-[0-9])" _posts/
```

Expected: Likely 0 or very few matches. If matches are found, open each post and remove or rewrite the Foundation-specific HTML inline. Most posts are prose-only and won't need changes.

- [ ] **Step 2: Remove old SCSS files and default layout**

```bash
rm _sass/_foundation.scss _sass/_main.scss _sass/app.scss
rm _layouts/default.html
rm _includes/algolia.html
```

- [ ] **Step 3: Verify build without Foundation**

```bash
bundle exec jekyll build
```

Expected: Clean build with no "not found" errors for removed files. If `assets/main.css` has `@import "app"` references, they're already gone (we rewrote `assets/main.scss` in Task 11).

- [ ] **Step 4: Commit**

```bash
git add -u _posts/ _sass/ _layouts/ _includes/ assets/main.scss
git commit -m "🔥 remove Foundation CSS, default layout, old algolia include"
```

---

## Phase 7: About Page

### Task 23: Create _data/resume.yml

**Files:**
- Create: `_data/resume.yml`

- [ ] **Step 1: Create resume data scaffold**

Create `_data/resume.yml`:

```yaml
experience:
  - org: TED
    role: Software Architect
    dates: "2022 – present"
    location: Remote
    summary: >
      Building the backend systems that power TED.com — one of the world's most-watched video platforms.
      Primary focus on Ruby on Rails, API design, media infrastructure, and reliability at scale.
    highlights:
      - Ruby on Rails backend serving millions of viewers globally
      - API design and media infrastructure
      - Reliability and performance at scale

  - org: Harvard Berkman Klein Center for Internet & Society
    role: Ford Foundation & Mozilla Fellow
    dates: "2018 – 2020"
    location: Cambridge, MA
    summary: >
      Fellowship working on the Lumen Database — the world's largest archive of online content removal requests.
      Mentored two Google Summer of Code students on open-source contributions.
    highlights:
      - Maintained and extended the Lumen Database Rails application
      - Mentored two Google Summer of Code contributors
      - Research on online speech, platform accountability, and DMCA requests

  - org: Metropolitan Area Planning Council (MAPC)
    role: Lead Web Developer
    dates: "2015 – 2018"
    location: Boston, MA
    summary: >
      Built geospatial planning tools for metropolitan planners and policymakers using PostGIS,
      Esri vector tile services, Mapbox, and shapefile pipelines ingested into Rails + PostgreSQL.
    highlights:
      - PostGIS spatial data pipelines and ogr2ogr workflows
      - Esri and Mapbox vector tile integration
      - D3.js election maps overlaying district geometries with live results

education:
  - school: University of Connecticut School of Law
    degree: Juris Doctor (JD)
    dates: "2012 – 2015"
    focus: Intellectual Property Law

speaking_writing:
  - title: "PLACEHOLDER — Add speaking engagements and notable articles"
    venue: ""
    date: ""
    url: ""

open_source_volunteering:
  - org: Code for Boston
    role: Engineering Lead / Leadership Team
    dates: "2016 – present"
    summary: >
      Leading civic tech engineers on open-source projects for public benefit — voter tools,
      outreach apps, and community infrastructure.

  - org: CTNewsJunkie
    role: Technical Collaborator
    dates: "2018 – present"
    summary: >
      vote.ctnewsjunkie.com and bills.ctnewsjunkie.com — tools for civic engagement through data and software.

recognition:
  - org: Google
    award: Google Summer of Code Mentor
    date: "2019, 2020"
```

---

### Task 24: Create _layouts/about.html and rewrite about.html

**Files:**
- Create: `_layouts/about.html`
- Modify: `about.html`

- [ ] **Step 1: Create about layout**

Create `_layouts/about.html`:

```html
---
layout: base
---
<div class="about-page-header">
  <h1>ABOUT</h1>
</div>

<div class="about-narrative">
  {{ content }}
</div>

{% if site.data.resume %}
  {% assign resume = site.data.resume %}

  {% if resume.experience %}
  <section class="resume-section">
    <h2>EXPERIENCE</h2>
    <wa-divider></wa-divider>
    {% for job in resume.experience %}
    <div class="resume-item">
      <div class="resume-item-header">
        <div>
          <div class="resume-org">{{ job.org }}</div>
          <div class="resume-role">{{ job.role }}</div>
        </div>
        <div class="resume-dates">{{ job.dates }}{% if job.location %} · {{ job.location }}{% endif %}</div>
      </div>
      <p class="resume-summary">{{ job.summary }}</p>
      {% if job.highlights %}
      <ul class="resume-highlights">
        {% for highlight in job.highlights %}
        <li>{{ highlight }}</li>
        {% endfor %}
      </ul>
      {% endif %}
    </div>
    <wa-divider></wa-divider>
    {% endfor %}
  </section>
  {% endif %}

  {% if resume.education %}
  <section class="resume-section">
    <h2>EDUCATION</h2>
    <wa-divider></wa-divider>
    {% for edu in resume.education %}
    <div class="resume-item">
      <div class="resume-item-header">
        <div>
          <div class="resume-org">{{ edu.school }}</div>
          <div class="resume-role">{{ edu.degree }}</div>
        </div>
        <div class="resume-dates">{{ edu.dates }}</div>
      </div>
      {% if edu.focus %}<p class="resume-summary">{{ edu.focus }}</p>{% endif %}
    </div>
    <wa-divider></wa-divider>
    {% endfor %}
  </section>
  {% endif %}

  {% if resume.open_source_volunteering %}
  <section class="resume-section">
    <h2>OPEN SOURCE &amp; VOLUNTEERING</h2>
    <wa-divider></wa-divider>
    {% for vol in resume.open_source_volunteering %}
    <div class="resume-item">
      <div class="resume-item-header">
        <div>
          <div class="resume-org">{{ vol.org }}</div>
          <div class="resume-role">{{ vol.role }}</div>
        </div>
        <div class="resume-dates">{{ vol.dates }}</div>
      </div>
      <p class="resume-summary">{{ vol.summary }}</p>
    </div>
    <wa-divider></wa-divider>
    {% endfor %}
  </section>
  {% endif %}

  {% if resume.recognition %}
  <section class="resume-section">
    <h2>RECOGNITION</h2>
    <wa-divider></wa-divider>
    {% for rec in resume.recognition %}
    <div class="resume-item">
      <div class="resume-item-header">
        <div>
          <div class="resume-org">{{ rec.org }}</div>
          <div class="resume-role">{{ rec.award }}</div>
        </div>
        <div class="resume-dates">{{ rec.date }}</div>
      </div>
    </div>
    <wa-divider></wa-divider>
    {% endfor %}
  </section>
  {% endif %}
{% endif %}
```

- [ ] **Step 2: Rewrite about.html**

```html
---
layout: about
title: About Matt Zagaja
---

<p>
  I'm Matt Zagaja, an attorney with background in politics, science, and
  technology residing in Massachusetts. I am a Software Architect at
  <a href="https://www.ted.com">TED</a> and am
  on the leadership team of
  <a href="http://www.codeforboston.org/">Code for Boston</a>.
</p>

<p>
  My first job was fixing and configuring computers and networks for individuals
  and small businesses in Connecticut. I taught myself HTML, CSS, and
  JavaScript. I built machines from parts, configured them for networks, and
  recovered data from broken hard drives.
</p>

<p>
  In politics I worked for every campaign that former Connecticut Governor
  Malloy ran since 2006. I helped Elizabeth Esty unseat an incumbent Republican
  state representative in 2008. Then in 2013 I
  <a href="https://www.newhavenindependent.org/index.php/archives/entry/matt_hires_matt/">managed Matthew Nemerson's mayoral race in New Haven</a>
  before he dropped out to endorse Mayor Toni Harp. In 2014 I worked for the
  Connecticut Democratic Party as its Deputy Data Director. I have also
  volunteered as treasurer for several campaigns and interned for the
  Connecticut State Elections Enforcement Commission.
</p>

<p>
  I have also consulted for numerous start-up companies in the technology
  sector. Some of that experience was through UConn Law's IP Clinic where I
  helped the companies secure trademarks and assisted in the drafting of
  patents. Other times it has been through individual contracts with the
  companies or through the UConn Business School's Innovation Accelerator
  program where I created market research reports that companies used to secure
  investments and plan their future. In January 2015 I
  <a href="http://lon.tv/ces2015">helped Lon Seidman cover CES 2015</a> for his
  YouTube Channel. I think technology start-ups are critical to the future of
  the country. Thus I am passionate and enjoy writing about legal and policy
  issues around them like network neutrality, patents, copyright, security and
  privacy.
</p>

<p>
  Besides serving as Software Architect at TED, I also collaborate with
  CTNewsJunkie on two projects:
  <a href="https://vote.ctnewsjunkie.com/">vote.ctnewsjunkie.com</a> and
  <a href="https://bills.ctnewsjunkie.com">bills.ctnewsjunkie.com</a>. I enjoy
  working on these projects as experiments in increasing civic engagement
  through data and software.
</p>
```

- [ ] **Step 3: Verify about page builds**

```bash
bundle exec jekyll build
rg "resume-section" _site/about/index.html
```

Expected: Match found. If `_site/about/index.html` doesn't exist, check that `about.html` has correct front matter.

- [ ] **Step 4: Commit**

```bash
git add _layouts/about.html about.html _data/resume.yml
git commit -m "✨ add about layout with structured résumé from _data/resume.yml"
```

---

## Phase 8: Essay Front Matter

### Task 25: Add essay front matter to 6 posts

The 6 posts from the landing page don't yet exist in the `_posts/` directory (the repo only has posts through 2021). Two options:

**Option A (preferred):** User creates the actual 2024 essay posts with real content and adds `essay: true` + `essay_category` front matter.

**Option B (stub approach for migration):** Create placeholder posts so the site builds correctly now; user replaces with real content later.

This plan implements Option B — stubs that the user replaces. The stub files match the URLs referenced in the landing.

- [ ] **Step 1: Create stub essay posts**

Create `_posts/2024-07-15-lessons-from-crowdstrike.markdown`:

```markdown
---
layout: post
title: "Lessons from Crowdstrike: The Case for a Digital Services Reserve"
date: 2024-07-15
essay: true
essay_category: "Infrastructure"
---

*This post is a placeholder. Replace with real content.*
```

Create `_posts/2024-02-15-civic-tech-stacks.markdown`:

```markdown
---
layout: post
title: "The Best Tech Stack is the One You Have"
date: 2024-02-15
essay: true
essay_category: "Engineering"
---

*This post is a placeholder. Replace with real content.*
```

Create `_posts/2024-03-10-ai-llm-shootout.markdown`:

```markdown
---
layout: post
title: "AI LLM Shootout: Where Frontier Models Actually Fail"
date: 2024-03-10
essay: true
essay_category: "AI"
---

*This post is a placeholder. Replace with real content.*
```

Create `_posts/2024-03-20-post-social-media-web.markdown`:

```markdown
---
layout: post
title: "AI Killed the Social Media Star"
date: 2024-03-20
essay: true
essay_category: "AI & Society"
---

*This post is a placeholder. Replace with real content.*
```

Create `_posts/2024-07-20-security-redux.markdown`:

```markdown
---
layout: post
title: "Security Redux: When Compliance Undermines Safety"
date: 2024-07-20
essay: true
essay_category: "Security"
---

*This post is a placeholder. Replace with real content.*
```

Create `_posts/2024-05-15-tech-job-bubble.markdown`:

```markdown
---
layout: post
title: "The End of the Tech Job Bubble"
date: 2024-05-15
essay: true
essay_category: "Industry"
---

*This post is a placeholder. Replace with real content.*
```

Note: The URLs generated will be `/2024/07/lessons-from-crowdstrike/`, `/2024/02/civic-tech-stacks/`, etc. — matching the landing's links.

- [ ] **Step 2: Verify essays grid populates**

```bash
bundle exec jekyll build
rg "essay_category" _site/index.html
```

Expected: The home page should contain essay post card content.

- [ ] **Step 3: Commit**

```bash
git add _posts/2024-*.markdown
git commit -m "✨ add 6 essay stub posts with essay:true front matter"
```

---

## Phase 9: JavaScript

### Task 26: Create assets/js/site.js

**Files:**
- Create: `assets/js/site.js`

- [ ] **Step 1: Write site.js**

The Algolia search JS is adapted from the old `_includes/algolia.html`. Init is lazy — only runs on first `wa-show` from the search dialog.

Create `assets/js/site.js`:

```javascript
// Algolia credentials injected via Jekyll (meta tags in base.html)
// We read them from data attributes on the search dialog element

const searchDialog = document.querySelector('#search-dialog');
const searchTrigger = document.querySelector('#search-trigger');
const mobileMenuTrigger = document.querySelector('#mobile-menu-trigger');
const mobileNav = document.querySelector('#mobile-nav');

// Mobile drawer
if (mobileMenuTrigger && mobileNav) {
  mobileMenuTrigger.addEventListener('click', () => {
    mobileNav.show();
  });
}

// Search dialog open
if (searchTrigger && searchDialog) {
  searchTrigger.addEventListener('click', () => {
    searchDialog.show();
  });
}

// Lazy Algolia init — only pay the cost on first open
let searchInitialized = false;

if (searchDialog) {
  searchDialog.addEventListener('wa-show', () => {
    if (searchInitialized) return;
    searchInitialized = true;
    initAlgolia();
  });
}

function initAlgolia() {
  const appId = 'ADZBG2997L';
  const apiKey = 'b8c639bf58a56694e5b07d3b68d685b1';
  const indexName = 'jekyll';

  // Load Algolia scripts dynamically
  const algoliaScript = document.createElement('script');
  algoliaScript.src = 'https://cdn.jsdelivr.net/npm/algoliasearch@4.14.2/dist/algoliasearch-lite.umd.js';
  algoliaScript.crossOrigin = 'anonymous';

  const instantsearchScript = document.createElement('script');
  instantsearchScript.src = 'https://cdn.jsdelivr.net/npm/instantsearch.js@4.49.1/dist/instantsearch.production.min.js';
  instantsearchScript.crossOrigin = 'anonymous';

  const momentScript = document.createElement('script');
  momentScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js';

  document.head.appendChild(algoliaScript);

  algoliaScript.onload = () => {
    document.head.appendChild(instantsearchScript);
    document.head.appendChild(momentScript);

    instantsearchScript.onload = () => {
      const searchClient = algoliasearch(appId, apiKey);

      const search = instantsearch({
        indexName,
        searchClient,
      });

      const hitTemplate = (hit) => {
        const date = hit.date ? moment.unix(hit.date).format('MMM D, YYYY') : '';
        const title = hit._highlightResult.title.value;
        const content = hit._highlightResult.html ? hit._highlightResult.html.value : '';
        return `
          <div class="post-item">
            <span class="post-meta">${date}</span>
            <h2><a class="post-link" href="${hit.url}">${title}</a></h2>
            <div class="post-snippet">${content}</div>
            <a class="read-more" href="${hit.url}">Read More</a>
          </div>
        `;
      };

      search.addWidgets([
        instantsearch.widgets.searchBox({
          container: '#search-searchbar',
          placeholder: 'Search posts...',
          showSubmit: false,
          showLoadingIndicator: false,
          showReset: false,
        }),
        instantsearch.widgets.hits({
          container: '#search-hits',
          templates: { item: hitTemplate },
          escapeHTML: false,
        }),
        instantsearch.widgets.poweredBy({
          container: '#powered-by',
          theme: 'dark',
        }),
      ]);

      search.start();
    };
  };
}
```

- [ ] **Step 2: Verify JS file is accessible after build**

```bash
bundle exec jekyll build
ls _site/assets/js/site.js
```

Expected: File exists.

- [ ] **Step 3: Commit**

```bash
git add assets/js/site.js
git commit -m "✨ add site.js: lazy Algolia search dialog + mobile drawer"
```

---

## Phase 10: Redirects + Cleanup

### Task 27: Create legacy /page/N/ redirect pages

**Files:**
- Create: `_pages/redirect-page-2.html` through `redirect-page-10.html`

The old pagination was at `/page/N/`. The new location is `/blog/page/N/`. Create redirect stubs using `jekyll-redirect-from`.

- [ ] **Step 1: Create redirect pages**

```bash
mkdir -p _pages
```

Create `_pages/redirect-page-2.html`:
```html
---
redirect_to: /blog/page/2/
sitemap: false
---
```

Do the same for pages 3 through 10:

```bash
for i in $(seq 3 10); do
cat > "_pages/redirect-page-${i}.html" << EOF
---
redirect_to: /blog/page/${i}/
sitemap: false
permalink: /page/${i}/
---
EOF
done
```

Fix page 2 to have a permalink:

```bash
cat > _pages/redirect-page-2.html << 'EOF'
---
redirect_to: /blog/page/2/
sitemap: false
permalink: /page/2/
---
EOF
```

- [ ] **Step 2: Verify redirects are generated**

```bash
bundle exec jekyll build
ls _site/page/
```

Expected: Directories `2/` through `10/` with redirect HTML files inside.

---

### Task 28: Final cleanup

**Files:**
- Delete: `zagaja-new-landing.html`

- [ ] **Step 1: Delete source landing file**

```bash
rm zagaja-new-landing.html
```

- [ ] **Step 2: Final full build and spot checks**

```bash
bundle exec jekyll build
```

Check key pages exist:
```bash
ls _site/index.html
ls _site/blog/index.html
ls _site/about/index.html
```

Check no Foundation classes in output:
```bash
rg "class=\"row\"" _site/index.html _site/blog/index.html _site/about/index.html || echo "Clean"
```

Check WA asset paths use dist-cdn (not dist):
```bash
rg "webawesome/dist/" _layouts/base.html || echo "Clean — no dist/ references"
rg "webawesome/dist-cdn/" _layouts/base.html && echo "dist-cdn references confirmed"
```

Check token link color in post body:
```bash
rg "wa-color-text-link" _sass/_tokens.scss && echo "Token exists"
```

- [ ] **Step 3: Commit final cleanup**

```bash
git add -u
git add _pages/
git commit -m "🔥 delete zagaja-new-landing.html; add /page/N/ redirect stubs"
```

---

## Post-Completion Checklist

These items require manual action after the migration:

- [ ] Set up GoatCounter account and replace `YOUR_SUBDOMAIN` in `_includes/analytics.html`
- [ ] Replace 6 stub essay posts in `_posts/2024-*.markdown` with real content
- [ ] Populate `_data/resume.yml` with complete dates and details (user supplies)
- [ ] Run Algolia re-index: `ALGOLIA_API_KEY=<key> bundle exec jekyll algolia`
- [ ] Visual QA: check home, blog index, a post, and about in both light and dark mode
- [ ] Verify no `<wa-*>` FOUCE on first paint (check `wa-cloak` is removed by autoloader)
- [ ] Check no console errors from WA loader
- [ ] Push to master and verify GitHub Actions builds succeed

---

## Self-Review Against Spec

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| `/` = editorial landing 9 sections | Tasks 16-20 |
| `/blog/` = paginated post list | Tasks 19-20 |
| `/blog/page/N/` pagination | `_config.yml` Task 3, layout Task 19 |
| `/about/` = narrative + résumé | Tasks 23-24 |
| Existing post URLs preserved | Permalink unchanged in `_config.yml` |
| WA design tokens on `:root` | Task 7 |
| Dark mode via `prefers-color-scheme` | Task 7 |
| Self-hosted fonts | Tasks 5-6 |
| Foundation CSS removed | Task 22 |
| WA dist-cdn committed | Task 4 |
| GoatCounter (Piwik PRO removed) | Task 15, old Piwik removed via `default.html` deletion |
| `jekyll-redirect-from` | Tasks 1, 27 |
| Algolia search in `<wa-dialog>` | Tasks 15, 26 |
| Mailchimp below post body | Task 21 |
| PIT Webring only in minimal footer | Task 14 |
| `wa-cloak` on `<html>` | Task 12 |
| essay front matter on 6 posts | Task 25 |
| essays grid = Liquid `where: "essay", true` | Task 17 |
| No standalone /essays/ page | N/A |
| Nav: `hello@zagaja.com` logo | Task 13 |
| Mobile: hamburger → `<wa-drawer>` | Task 13 |
| Search: lazy Algolia init on dialog open | Task 26 |
| `bin/sync-webawesome` script | Task 4 |
| `native.css` shipped | Task 12 (linked in base.html) |
| `--wa-border-radius-scale: 0` | Task 7 |
| No `<wa-badge>` — use `<wa-tag>` | Task 17 (`skill-tag.html`) |
| algolia `nodes_to_index` | Task 3 |
| algolia `files_to_exclude` | Task 3 |
| algolia-search.yml ruby version aligned | Task 2 |

**Gaps identified:** None — all spec requirements have corresponding tasks.
