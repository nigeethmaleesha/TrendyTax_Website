# Trendy Tax — Phase 7 Video Framing Fix

## Exact changes
- `assets/css/style.css`: Google Drive fallback uses a calculated overscan crop instead of fixed desktop/mobile scaling. Container stays full-width with zero gutters.
- `assets/js/main.js`: computes a responsive zoom from the actual video section dimensions (assuming the 16:9 Google Drive clip), with 13% extra overscan to push Drive letterboxing and its bottom timeline outside the visible frame. Responds to resizes.
- Native MP4 video is unchanged: `autoplay muted loop playsinline` and **no controls**.
- `index.html` / `build_pages.py` unchanged for this targeted fix.

## IMPORTANT: Google Drive limitations
The embedded Drive player's controls are inside Google's cross-origin iframe and cannot be removed by website code. Cropping them is a visual workaround that may cut off the edges of the video or change if Google updates its player. The 35-second Drive clip also uses a timed restart fallback rather than a guaranteed seamless loop. True full-bleed, controls-free, seamless autoplay requires an optimized, directly hosted MP4 at `assets/video/hobart-loop.mp4` (or a video CDN direct MP4 URL). The original 625 MB source is not included. The video source is 16:9; framing on narrow phones will inevitably crop some of the image to avoid bars.

## Install
Extract the Changed Files Only ZIP into the root of the **Phase 6** website, preserving file paths and overwriting matches. Or use the complete Phase 7 website ZIP.
