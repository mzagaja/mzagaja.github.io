# Live Photo assets

This directory holds the JPG + MOV pair required by LivePhotoKit JS (`_includes/live-photo.html`, `_sass/_live-photo.scss`, `assets/js/live-photo.js`).

## What you need
- `photo.jpg` — still image (JPEG). **Do not use HEIC** for `photo:` — only Safari renders HEIC; LivePhotosKit's fallback `<img>` will break in Chrome/Firefox.
- `photo.mov` — 3-second video component (QuickTime `.mov`, H.264 or HEVC). Keep `.mov` container; do not transcode to `.mp4`.

Live Photo videos are ~3s. Photo and video must share `ContentIdentifier` (set by iPhone) and aspect ratio. LivePhotosKit handles rotation via `videoRotation` metadata — maintain the original orientation and crop to the target aspect rather than baking rotation.

## How to export from iPhone / Photos.app
1. Take a Live Photo on iPhone (Live button ON in Camera).
2. On Mac, open Photos.app → select the Live Photo → File → Export → Export Unmodified Original.
   - This yields two files: `IMG_XXXX.HEIC` (or `.JPG`) and `IMG_XXXX.MOV` with matching basename.
   - Alternative: use Image Capture, AirDrop (choose original), or iCloud Photos download.
3. Copy both to `images/live/` with web-friendly names:
   ```
   images/live/sunset.jpg
   images/live/sunset.mov
   ```
4. Optimize for web (see below), then reference in frontmatter:
   ```yaml
   live_photo:
     photo: /images/live/sunset-1200w.jpeg
     video: /images/live/sunset-1200w.mov
     alt: Sunset over Long Island Sound — press and hold to play
     width: 1200
     height: 1600
   ```
   `width`/`height` are required to set `aspect-ratio` inline and avoid the `zero width or height` warning.

## Why hover stopped playing after re-encoding

`IMG_7230.MOV` contains Apple's Live Photo edit list: an `elst` box with `photoTime = 879/600 = 1.465s` (the still frame) and an `stts` table of 44 frame times (`0.000,0.050,0.102,...2.677`). FFmpeg's `libx264` transcode bakes the rotation and recompresses to H.264 but **drops those metadata tracks** (tracks 3–5 in `mp4box -info`). Without `photoTime`/`frameTimes`, LivePhotosKit has no keyframe to seek to, so hover does nothing.

Fix: provide timing explicitly via frontmatter, which `_includes/live-photo.html` passes as `data-photo-time` / `data-frame-times` (wired in `_layouts/post.html:27-28`):

```yaml
live_photo:
  photo: /images/live/IMG_7230-1200w.jpeg
  video: /images/live/IMG_7230-1200w.mov
  width: 1200
  height: 1600
  photo_time: 1.465
  frame_times: 0.000,0.050,0.101,0.151,0.202,0.252,0.303,0.353,0.403,0.454,0.504,0.555,0.605,0.655,0.706,0.756,0.807,0.857,0.908,0.958,1.008,1.059,1.109,1.160,1.210,1.261,1.311,1.412,1.513,1.613,1.714,1.815,1.866,1.966,2.067,2.168,2.269,2.370,2.420,2.471,2.521,2.571,2.622,2.672
```

Or keep `video:` pointed at the original `IMG_XXXX.MOV` (HEVC) and only optimize the JPEG — timing is then read from the MOV itself and no extra fields are needed. Largest saving is the JPEG anyway (3.5 MB → 250 KB).

To extract your own values:

```bash
# photoTime: elst trackDuration where mediaTime == -1, divided by movie timescale (600 for original)
python3 -c "print(879/600)"  # -> 1.465
# or inspect: exiftool -v3 IMG_XXXX.MOV | grep -A2 elst

# frameTimes: stts deltas / timescale
python3 << 'PY' | tr -d '\n'
import struct
p="images/live/IMG_XXXX.MOV"
d=open(p,'rb').read()
idx=d.find(b'stts')
# find the vide stts (entry_count 31, 44 samples) and accumulate cur/timescale
PY
```

## Optimizing for web (recommended dimensions)

Source `IMG_7230.HEIC` 4284×5712 (3:4 portrait, 1.8 MB) + `IMG_7230.MOV` 1920×1440 HEVC @ -90° (display 1440×1920 portrait, 3.8 MB) → 7 MB total. Reading column is `max-width: 65ch` (~700–800 px CSS, ~2× retina = 1400–1600 px physical), so no need to ship 4000 px.

Helper script (requires ImageMagick 7, ffmpeg, exiftool):

```bash
bin/optimize-live-photo images/live/IMG_7230 1200          # hero 1200×1600 (width 1200)
bin/optimize-live-photo images/live/IMG_7230 800 --square  # card thumb 800×800
```

Manual equivalents (maintain orientation — crop, don't bake rotation):

```bash
# Hero portrait 1200×1600 display (stored 1600×1200 + rotation 90) — 245 KB + 1.4 MB (was 3.5 + 3.8 MB). Saves ~80%.
magick IMG_7230.HEIC -auto-orient -resize 1200x -quality 82 -sampling-factor 4:2:0 -interlace JPEG -strip IMG_7230-1200w.jpeg
exiftool -overwrite_original -TagsFromFile IMG_7230.HEIC -ContentIdentifier -MediaGroupUUID -ImageUniqueID IMG_7230-1200w.jpeg  # selective copy, no Orientation
ffmpeg -noautorotate -i IMG_7230.MOV -vf "scale=1600:1200:flags=lanczos" -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -movflags faststart -c:a aac -b:a 128k IMG_7230-1200w.mov
exiftool -overwrite_original -Rotation=90 IMG_7230-1200w.mov  # restore display matrix (stored landscape -> display portrait)

# Square card 800×800 — 104 KB + 551 KB, for post-card thumbnail (rotation irrelevant for square)
magick IMG_7230.HEIC -auto-orient -resize 800x800^ -gravity center -extent 800x800 -quality 82 -strip IMG_7230-800sq.jpeg
ffmpeg -noautorotate -i IMG_7230.MOV -vf "scale=800:800:flags=lanczos:force_original_aspect_ratio=increase,crop=800:800:(ow-iw)/2:(oh-ih)/2" -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -movflags faststart -c:a aac -b:a 64k IMG_7230-800sq.mov

# 16:9 social — crop to 1200×675 display (stored 675×1200 would be portrait crop; for landscape social use stored 1600×900)
magick IMG_7230.HEIC -auto-orient -resize 1200x^ -gravity center -extent 1200:675 -quality 82 -strip IMG_7230-1200x675.jpeg
ffmpeg -noautorotate -i IMG_7230.MOV -vf "scale=1600:1200:flags=lanczos:force_original_aspect_ratio=increase,crop=1600:900:(ow-iw)/2:(oh-ih)/2,scale=1600:900" -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -movflags faststart -c:a aac -b:a 128k IMG_7230-16x9.mov
# then set rotation if needed: exiftool -Rotation=90 IMG_7230-16x9.mov
```

| Use | Display | Stored | Photo ops | Video filter | Why |
|-----|---------|--------|-----------|--------------|-----|
| **Hero portrait** (default) | **1200×1600** (3:4) | 1600×1200 + rotate 90 | `magick -resize 1200x` | `scale=1600:1200` + `Rotation=90` | Fits `reading-column` at 1.5× retina, < 1.6 MB total. `width/height` (display) → `aspect-ratio:1200/1600` prevents zero-size warning. Maintain orientation, crop. |
| Hero retina | 1500×2000 | 2000×1500 + rotate 90 | `-resize 1500x` | `scale=2000:1500` | 2× retina, ~450 KB + 2 MB. |
| Card thumb square | 800×800 | 800×800 | `resize 800x800^` + `extent 800x800` | `scale=800:800:...crop=800:800` | Matches `_includes/components/post-card.html` thumbnail. |
| Social 16:9 | 1200×675 | 675×1200 + rotate 90 or 1600×900 | `extent 1200:675` | `crop=1600:900` | Open Graph / sharing. |

Notes:
- Keep `.mov` container; H.264 `avc1` plays in Chrome/Firefox where HEVC `hvc1` does not. Maintain `Rotation=90` (`Matrix 0 1 -1 0`) so stored landscape displays portrait — matches original.
- Ensure even dimensions (`%2==0`) or `libx264` errors (`height not divisible by 2`).
- `ContentIdentifier` links photo+video (e.g. `8A565FA8-6579-43C0-834D-39378EAA16C5`). Restore selectively after `-strip`; ` -All:All` would reintroduce `Orientation Rotate 90 CW` and double-rotate the baked JPEG.
- If you re-encode MOV, add `photo_time` + `frame_times` to frontmatter or keep original MOV for Safari visitors (H.264 fallback is optional; static JPEG shows where video can't play).

## Frontmatter fields

```yaml
live_photo:
  photo: /images/live/sunset-1200w.jpeg   # required, JPEG
  video: /images/live/sunset-1200w.mov    # required, QuickTime MOV
  alt: Accessible description
  caption: Optional figcaption (omit to hide)
  width: 1200          # intrinsic width of optimized JPEG (for aspect-ratio)
  height: 1600         # intrinsic height
  photo_time: 1.465    # only if MOV was re-encoded
  frame_times: 0.000,0.050,... # only if MOV was re-encoded
```

## Placeholder

`demo-photo.jpg` is a copy of `fb_image.jpg` as a visual placeholder. No real MOV ships with the repo — replace `demo.mov` (see draft) with a real MOV exported as above. Until then the demo shows the fallback static image and badge; video will 404 gracefully with console error and fallback image.

## Tips
- Keep MOV < 2 MB for hero (1200w H.264 ~1.4 MB, stored 1600×1200); > 10 MB will stall on mobile.
- Photo and video must share display aspect ratio (both 3:4 portrait here). Video stored may be landscape with `Rotation=90`; LivePhotoKit reads `videoRotation`.
- For multiple per post use `live_photos:` array; for inline placement use `{% include live-photo.html %}`.
- `proactively_loads_video: false` (default) defers video fetch until hover/press — good for performance.
