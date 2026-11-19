# Trendy Tax Solutions – Phase 5: video-only autoplay and loop

## What's changed
- Home page video section now contains **only the video** (no headings, descriptive text, play button, time badge, or Drive links).
- The single video frame is centred and expanded horizontally, while staying responsive on mobile.
- Native HTML5 player is configured with `autoplay muted loop playsinline` and no native controls. Uses `assets/video/hobart-loop.mp4` once you supply it.
- Existing poster image is retained as a loading/background state.
- A Google Drive iframe is used as a temporary fallback **if the MP4 is absent**. The embed attempts muted autoplay and resets roughly every 38 seconds, but Drive autoplay and exact looping cannot be guaranteed.
- Other pages, founder, achievements, and chatbot were not modified.

## Changed files
- `index.html`
- `build_pages.py`
- `assets/css/style.css`
- `assets/js/main.js`
- `assets/video/ADD_VIDEO_HERE.md` (new)
- `PHASE5_CHANGELOG.md` (this document, new)

## Required to achieve perfect autoplay + seamless loop
1. Download the original video from Google Drive to your computer (625 MB is too big to include in this package).
2. Compress it with FFmpeg according to `assets/video/ADD_VIDEO_HERE.md`.
3. Add the output as `assets/video/hobart-loop.mp4` then deploy the updated site.

> Note: Web browser autoplay normally requires mute, so the native player has no sound.
