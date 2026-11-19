# Hobart video – source file needed for guaranteed autoplay and seamless looping

The full-resolution 625 MB client video was not available in this workspace, so it is NOT bundled.

Save a web-optimised, silent MP4 video here using the exact filename:

`assets/video/hobart-loop.mp4`

Windows / macOS / Linux example using FFmpeg (run in the folder with the source video):

```bash
ffmpeg -i "original-hobart-video.mp4" -vf "scale=1280:-2,fps=30" -c:v libx264 -preset medium -crf 27 -pix_fmt yuv420p -an -movflags +faststart "hobart-loop.mp4"
```

Then copy `hobart-loop.mp4` into `assets/video/`, include it in your deployment, and redeploy. The website will then use HTML5 `autoplay muted loop playsinline`, with a true repeat on the video element and no text or video buttons.

Until this file is supplied, the site attempts Google Drive autoplay and timed replay. Drive may display its own controls and may block autoplay or fail to restart. The site code cannot override Drive's proprietary player. If video size is larger than the hosting static asset limits, use a video CDN and change the `<source src>` value in the home page builder and generated index.html.
