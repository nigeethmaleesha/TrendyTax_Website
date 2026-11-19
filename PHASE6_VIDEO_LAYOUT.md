# Trendy Tax Solutions — Phase 6: full-bleed, controls-free cinematic video

## Changes requested
- The Home page video section fills the entire viewport width, with no left/right padding, no rounded corners, and no white margins.
- The section behaves like a cinematic banner below the existing content, not a framed player card.
- No side text, buttons, links, play controls, timestamps or other site-authored overlays.
- Responsive height: on desktop it is roughly one viewport below the sticky header; on mobile a shorter but still edge-to-edge video area.
- Native HTML5 MP4 remains autoplaying, muted, inline and looping, with **no `controls` attribute**.
- The pre-existing Google Drive fallback has been visually cropped and pointer interaction disabled to reduce the appearance of Drive player chrome. This is **best effort only**.

## Exact modified code files
- `index.html`
- `build_pages.py` (source generator)
- `assets/css/style.css`
- `assets/js/main.js`

## Important: video source and limitations
- The original 625 MB video is **not included** in these ZIPs.
- If you use only Google Drive's iframe preview, its pause/progress/volume UI is owned by Google, not by this website. A cross-origin iframe cannot have its controls reliably removed. The temporary CSS zoom/crop reduces visible chrome but may crop parts of the image or fail if Drive changes its player. Drive autoplay and timing-based replay are also not guaranteed to work on every browser.
- For exactly the requested controls-free, seamless looping result, download and compress the original to `assets/video/hobart-loop.mp4`, place it in the website, and deploy. The page prefers that native MP4 source automatically.
- Alternatively use a publicly accessible **direct MP4/video-CDN URL**, replacing `assets/video/hobart-loop.mp4` in both `index.html` and `build_pages.py`. A Google Drive `/preview` or `/view` page URL is **not** a direct MP4 URL.
- For a native MP4 the setup is already `autoplay muted loop playsinline` with no controls; muted playback is important for browser autoplay policy.
- `assets/video/ADD_VIDEO_HERE.md` contains an FFmpeg conversion example.

## Checks performed
- Desktop (1440 px, 1920 px) and mobile (390 px, 320 px) full-width CSS layouts: section width matches viewport and no horizontal overflow.
- Syntax: Python builder compiles, JavaScript syntax validates.
- Generator test: `python build_pages.py` recreated all existing HTML files with **no difference**.
- Not tested: actual Google Drive playback across all browsers, since the original video is not available in this workspace.

## Installation
**Changed-files ZIP:** Extract into the root of your existing Phase 5 website, preserving directories and overwriting matching files.
**Complete ZIP:** Deploy the entire extracted folder as the website's Vercel project (or merge with your existing Git repository). Original video MP4 is not included.
