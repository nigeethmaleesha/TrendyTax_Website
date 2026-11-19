# Phase 8 — Responsive Chat & Video Playback

## Changes
- Chat mobile launcher is now a compact circular button, avoiding overlap with page content.
- Opening chat on screens up to 640px displays a safe-area-aware fixed panel that fits the viewport.
- Chat message bubbles wrap, the conversation scrolls independently, and page scrolling is locked while mobile chat is open.
- Chat open/close controls and topic navigation remain keyboard accessible.
- Optimised video startup: begin playback only when the video nears the viewport, pause native playback when offscreen/hidden, and removed the 38-second Google Drive reload timer.
- Native MP4 uses `autoplay muted loop playsinline` and is the reliable controls-free autoplay solution; browser policies can still affect playback.
- Google Drive embed remains a fallback. Autoplay and seamless looping **cannot** be guaranteed with Drive's player. Its controls cannot be reliably hidden by this website.

## Required to finish real autoplay/loop
Optimise the original clip as H.264 MP4 and put it at `assets/video/hobart-loop.mp4`. The current ZIP does **not** include the original 625 MB video. Recommended output: 720p, H.264, 2–4 Mbps, no audio (video is muted anyway), faststart/web-optimised MP4. Store with a suitable video host/CDN or include if within your deployment limit.

## Files modified
- assets/css/chatbot.css
- assets/js/chatbot.js
- assets/js/main.js
- assets/css/style.css
- build_pages.py
- index.html (regenerated with `preload=none`)

A small pre-existing proportional grid overflow at desktop sizes was also corrected. Existing chatbot answers, all other pages, navigation and the overall visual design are unchanged.
