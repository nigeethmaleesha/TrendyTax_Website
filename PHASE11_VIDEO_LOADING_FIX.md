# Phase 11 — Prevent black player/spinner flashes during video replays

## What changed
- Kept a real Hobart poster overlay above the Google Drive iframe while the third-party player is starting or restarting. This prevents the page from visibly switching to Google's black loading canvas during the masking interval.
- After Google Drive signals that its iframe has loaded, allow a short warm-up window, then fade out the poster to reveal the video. This is a *visual workaround*; a cross-origin iframe load event cannot prove video frames are actually playing.
- Show the poster **before** resetting the iframe at the approximate 35-second replay cycle, preventing an immediate black flash.
- Removed the `tt_cycle` cache-busting URL parameter to avoid needlessly fetching another video-player shell with every replay.
- Kept the existing responsive layout and existing native autoplay/muted/loop settings. Changed MP4 preload from `metadata` to `auto` to encourage smoother native playback if the optimized file is supplied.

## Changed source files
- `assets/js/main.js` — poster/replay masking and Drive URL behaviour
- `assets/css/style.css` — poster overlay and fade styling
- `index.html` — optimized MP4 preload preference
- `build_pages.py` — keeps regenerated HTML consistent with the change

## Important playback limitation
The 625 MB source video is **not** bundled. Google Drive's embedded player may still take time to buffer, may ignore autoplay requests, and does not provide reliable playback-start or video-ended events to your page. The poster masks Google's loading UI during a warm-up interval; it does NOT make the 35-second iframe restart truly seamless or guarantee no buffering flashes on a very slow connection.

**For truly uninterrupted looping without third-party UI or reloads**, create an optimized H.264 MP4 (e.g. in HandBrake with 720p/1080p and Web Optimized), name it `hobart-loop.mp4`, and copy it to `assets/video/hobart-loop.mp4` before Vercel deployment. The page will prefer the native HTML5 video and the 35-second iframe workaround will not be used.

## QA performed
- JavaScript syntax check passed (Node.js `--check`).
- Isolated browser mock: poster visible initially; hidden after load warm-up; immediately visible again when replay starts.
- Native HTML5 video with an original short synthetic QA clip: autoplay and looping tested; test media excluded from deliverable.
- Ran `python build_pages.py` in a separate test copy; regenerated pages exactly matched the source files.

## Installation
Extract the changed-files archive and copy the four source files over the corresponding files in your current Phase 10 project, maintaining their folders. Or extract the full website archive to deploy it as a complete static site. After deploy use hard refresh.
