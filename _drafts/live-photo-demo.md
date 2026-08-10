---
layout: post
title: "Live Photo Kit Demo"
date: 2026-08-10
live_photo:
  photo: /images/live/demo-photo.jpg
  video: /images/live/demo.mov
  alt: Demo Live Photo — white 640×480 still with 3s video
  caption: Placeholder Live Photo (replace with real JPG+MOV pair)
---

Live Photo Kit JS demo. The hero Live Photo above is rendered from **frontmatter** (`page.live_photo`).

This post also shows inline usage and the array syntax.

## What you see

- **Badge** (top-left, "LIVE" / "BOUNCE" etc.) — automatically rendered by LivePhotoKit JS. Hover or press-and-hold to play.
- **Lazy load** — video (`demo.mov`, 4.6 KB) is *not* fetched until interaction (`data-proactively-loads-video="false"`). Check DevTools Network — no MOV request until hover.
- **Fallback** — with JS disabled you see the static JPG. The include renders a `<noscript>` + visible fallback `<img>` that LivePhotoKit hides once upgraded.

## Frontmatter: single

```yaml
live_photo:
  photo: /images/live/demo-photo.jpg
  video: /images/live/demo.mov
  alt: Demo Live Photo
  caption: Optional caption below player
```

Post layout (`_layouts/post.html:5`) auto-renders this at the top of the article.

## Frontmatter: multiple

```yaml
live_photos:
  - photo: /images/live/sunset.jpg
    video: /images/live/sunset.mov
    alt: Sunset over the Sound
    caption: First of several
  - photo: /images/live/market.jpg
    video: /images/live/market.mov
    alt: Farmers market
```

Loop in layout renders each via the same include.

## Inline include (anywhere in markdown)

{% include live-photo.html photo="/images/live/demo-photo.jpg" video="/images/live/demo.mov" alt="Inline demo Live Photo" caption="Inline via include tag" %}

```liquid
{% raw %}{% include live-photo.html photo="/images/live/sunset.jpg" video="/images/live/sunset.mov" alt="Sunset" caption="Inline caption" %}{% endraw %}
```

Additional params: `effect="live|bounce|loop|exposure"`, `proactively_loads_video="true"`, `photo_time="1.2"`, `frame_times="0,0.033,..."`, `width`, `height`, `class`.

## Replacing placeholder assets

Real Live Photos are two files with **matching basename and dimensions**:

1. iPhone: Camera → Live ON → shoot.
2. Mac Photos.app: select Live Photo → File → Export → Export Unmodified Original → yields `IMG_1234.JPG` + `IMG_1234.MOV`.
3. Copy both to `images/live/` (e.g. `sunset.jpg` + `sunset.mov`) and reference as above.
4. Keep MOV < 10 MB; keep `.mov` container (H.264/HEVC QuickTime). Do not transcode to MP4.

See `images/live/README.md` for full export instructions.

## How it works

- Jekyll include `_includes/live-photo.html` emits `<div data-live-photo data-photo-src="…" data-video-src="…" data-proactively-loads-video="false">` + fallback `<img>`.
- CSS `_sass/_live-photo.scss` (imported in `assets/main.scss:10`) handles responsive sizing, border, caption, and hides fallback once `LivePhotosKit` upgrades the element (`lpk-live-photo-player` class).
- JS `assets/js/live-photo.js` lazy-augments via `LivePhotosKit.augmentElementAsPlayer` and listens for `livephotoskitloaded`. Loaded from CDN `https://cdn.apple-livephotoskit.com/lpk/1/livephotoskit.js` (v1.5.8) conditionally in `_layouts/base.html` when the page contains a Live Photo.
- Licensing: Apple LivePhotosKit JS is © Apple, AS-IS, only for displaying Live Photos you are authorized to embed. Do not modify the CDN file. Self-hosting an unmodified copy in `assets/js/livephotoskit.js` is permitted but CDN is recommended.

## Fallback verification

Disable JS and reload — you should see the static JPG at full width with no badge or video. With JS enabled, badge appears and DevTools shows no MOV fetch until hover/press.

---

*Demo MOV/JPG are synthetic 640×480 white placeholders generated via `ffmpeg` to verify the pipeline builds. Replace with real exported Live Photos before publishing.*
