# Phase 12 — Tablet video presentation

## Changes
- `assets/js/main.js`: adapts Google Drive fallback overscan to the viewport, with a stronger minimum for 801–1366px tablet/landscape viewports. It scales the iframe within a clipped wrapper to push the timeline/controls beyond the visible section.
- `assets/css/style.css`: updates default Drive iframe overscan, adds tablet-specific scale and keeps portrait-tablet video frames in a 16:9 ratio.

## Important limitation
Google Drive `/preview` is a third-party, cross-origin iframe. Its progress bar, centre play/pause UI and loading spinner cannot be directly hidden or controlled from this site. Scaling and clipping is best-effort; it crops part of the picture and may not hide every UI element on every device. The 35-second Drive timer is not synchronized to the video's true playback position and can cause buffering on replay.

## For truly smooth, controls-free autoplay and looping
Use a properly hosted, compressed H.264 MP4 at `assets/video/hobart-loop.mp4` (or replace the `<source>` URL with a stable video CDN URL); the existing `<video autoplay muted loop playsinline>` player is already configured and tested using a sample video. This original video asset is *not* bundled. Google Drive preview is a fallback until the video is supplied.

## Applying this patch
Overwrite `assets/js/main.js` and `assets/css/style.css` in the existing Phase 11 website folder. Clear browser cache. No other pages were modified.
