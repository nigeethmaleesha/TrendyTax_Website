# Hobart homepage video

The web-optimised file is now included at `assets/video/hobart-loop.mp4`. The homepage uses the native HTML video element with muted autoplay, inline playback, looping and no controls. The original CapCut edit is preserved; the output is 720p H.264 at 30 fps, with no audio and fast-start metadata.

To replace it later, run FFmpeg:

```bash
ffmpeg -i "1125.mp4" -vf "scale=1280:-2:flags=lanczos" -c:v libx264 -preset medium -crf 25 -pix_fmt yuv420p -an -movflags +faststart "hobart-loop.mp4"
```

Copy the output here and redeploy. No Google Drive link or iframe is needed.
