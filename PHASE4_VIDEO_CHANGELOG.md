# Phase 4: Home page Hobart video integration

## Video supplied
Original Google Drive file: https://drive.google.com/file/d/1W0QRiNsIpTZL0ui8Kmro1rOQlYNdckj2/view

## Implementation
- Added a home page section after the trust bar: 16:9 video player on the left, brand-aligned Hobart introduction on the right.
- Created `assets/img/hobart-video-preview.webp` from the user's screenshot (browser and player chrome cropped out). This is a small preview image, **not** the 625 MB video.
- Player is inserted only when someone selects the play button. Click-to-load minimizes third-party traffic on initial page load.
- Added a direct Google Drive link in case a visitor's browser blocks embedded playback.
- Mobile layout stacks the video before the text and retains the 16:9 video ratio.
- Kept `build_pages.py` updated so regenerating the site preserves these changes.

## Files modified or added
- `index.html`
- `build_pages.py`
- `assets/css/style.css`
- `assets/js/main.js`
- `assets/img/hobart-video-preview.webp` (new)

## Required Google Drive setup
1. Open the video file in Google Drive.
2. Share > General access > Anyone with the link > Viewer > Done.
3. Open the video link in an incognito/private window not signed into the owner's Google account.
4. Deploy the updated website and click the play button to verify the iframe.
5. For high traffic or greater player control, consider a video streaming service such as YouTube (unlisted), Vimeo or Mux.

IMPORTANT: The linked video could not be played from this coding environment. Google Drive public sharing and final live playback need verification by the owner. No large video file was uploaded or included in the website.

## Local verification performed
- Desktop layout preview generated; 390px mobile layout preview generated.
- No overflow at 390px viewport in the local test.
- JavaScript syntax checked with Node.
- Verified play handler constructs the correct Google Drive iframe and fullscreen permission without initiating an external network request in QA.
- Verified previously generated non-home HTML pages remain byte-for-byte unchanged.
- The actual Drive file's public availability and end-to-end playback remain unverified without owner sharing access.
