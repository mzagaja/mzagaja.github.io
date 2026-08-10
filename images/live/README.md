# Live Photo demo assets

This directory holds the JPG + MOV pair required by LivePhotoKit JS.

## What you need
- `photo.jpg` — the still image (JPG/HEIC). Must be same dimensions / orientation as the video's first frame.
- `photo.mov` — the 3-second video component (QuickTime MOV, H.264 or HEVC). Live Photo videos are ~3s.

## How to export from iPhone / Photos.app
1. Take a Live Photo on iPhone (Live button ON in Camera).
2. On Mac, open Photos.app → select the Live Photo → File → Export → Export Unmodified Original.
   - This yields two files: `IMG_XXXX.JPG` and `IMG_XXXX.MOV` with matching basename.
   - Alternative: use Image Capture, AirDrop (choose original), or iCloud Photos download.
3. Copy both to `images/live/` (or any `images/` subfolder) with web-friendly names:
   ```
   images/live/sunset.jpg
   images/live/sunset.mov
   ```
4. Reference them in frontmatter or include:
   ```yaml
   live_photo:
     photo: /images/live/sunset.jpg
     video: /images/live/sunset.mov
     alt: Sunset over Long Island Sound — press and hold to play
     caption: Exported via Photos → Export Unmodified Original
   ```

## Placeholder
`demo-photo.jpg` is a copy of `fb_image.jpg` as a visual placeholder. No real MOV ships with the repo — replace `demo.mov` (see draft) with a real MOV exported as above. Until then the demo shows the fallback static image and badge; video will 404 gracefully with console error and fallback image.

## Tips
- Keep MOV < 10 MB for web performance (re-encode with HandBrake if needed, but keep .mov container).
- Ensure photo and video share aspect ratio; LivePhotoKit handles rotation via `videoRotation` metadata.
- For multiple per post use `live_photos:` array; for inline placement use `{% include live-photo.html %}`.
- `proactively_loads_video: false` (default) defers video fetch until hover/press — good for performance.
