# Phase 9 — Mobile Video Layout Fix

## What changed
- On phone/tablet widths (up to 800px), uses a responsive, full-width **16:9** video area instead of 62svh (an excessively tall frame).
- Uses subtle rounded lower corners like the supplied mobile reference.
- Maintains the desktop edge-to-edge cinematic video.
- Prevents the oversized Google Drive play/pause interface from being rendered on mobile. When the actual MP4 is missing or fails, the clean Hobart thumbnail is displayed rather than the uncontrolled Google player.
- Keeps native MP4 muted autoplay, loop, playsinline and no controls, with support for Safari `webkit-playsinline`.
- No other page layouts, chatbot content or business copy changed.

## Important limitation
The supplied Google Drive link is a *preview page*, not a clean direct MP4 URL. It cannot be used as a reliable autoplay/loop background without proprietary player overlays. This package **does not include** the user's 625 MB movie. **Until an MP4 is provided, mobile shows the static Hobart thumbnail** — not a working animated video. Desktop retains the existing Google Drive fallback.

## To get the requested autoplay, moving background, without controls
1. Download the original video locally from Google Drive.
2. Export as H.264 MP4, preferably 720p or 1080p, web optimised, no audio necessary. Target a manageable file size (a 35-second clip should be far below 625 MB).
3. Name it `hobart-loop.mp4` and place it at `assets/video/hobart-loop.mp4` or provide an HTTPS streaming MP4 from a suitable video hosting provider.
4. Redeploy to Vercel. The browser can then autoplay/mute/loop the video with no UI, including mobile (subject to device power-saving restrictions).

## Files changed
- `assets/css/style.css`
- `assets/js/main.js`
- `build_pages.py`
- `index.html` (regenerated)

## Test
Use a phone browser, 393px Chrome DevTools and a real device. Native-video autoplay can vary in power-save mode; check after uploading the optimised MP4.
