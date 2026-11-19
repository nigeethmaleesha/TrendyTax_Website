# Trendy Tax Phase 10 – Hobart video replay and Skip overlay

## What changed
- HTML5 video continues to use `autoplay muted loop playsinline` with no native controls.
- Added a defensive `ended` listener that resets `currentTime` to zero and calls `play()` when playback ends. Native `loop` is the normal seamless repeat mechanism; this listener supports rare edge cases.
- The desktop Google Drive *fallback* now reloads its video iframe about every **35,000 ms**, while the section and tab are visible. It pauses that timer when the user scrolls away or switches tabs, preventing unnecessary background reloads. This is **approximate**: an iframe has no supported video-ended signal, so Google buffering may alter the visible restart point.
- The website's `Skip To Content` accessibility link now appears only under keyboard focus (`:focus-visible`) instead of every focus state, avoiding accidental overlays while preserving keyboard navigation.
- Google Drive's own UI/overlays cannot be suppressed directly because it is a third-party cross-origin player. For *fully reliable* invisible controls and exact looping, host a compressed MP4 in `assets/video/hobart-loop.mp4` (not included in this ZIP).

## Files updated
- `assets/js/main.js`
- `assets/css/style.css`
- `build_pages.py`
- `index.html` (regenerated from build_pages.py)

## Notes
The source file is 625 MB on the user's Google Drive and cannot be downloaded from the available workspace. This package does not include the video.
The existing Phase 9 mobile behavior is retained: mobile displays the clean poster until a playable MP4 is supplied. Desktop Google Drive fallback remains best-effort.
Run `python build_pages.py` to regenerate pages. Browser tab visibility and scroll position affect background playback as a performance optimization.
