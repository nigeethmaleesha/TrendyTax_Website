# Chatbot UI implementation — TrendyTax_Website

## What's included

A branded, responsive **front-end-only** chat assistant preview on every page. Design theme: **Classic navy / teal**, selected to match this version's own visual identity.

- Compact floating help launcher visible throughout the website, including Insights article pages.
- Expandable panel with a branded header and introductory assistant messages.
- Four guided topics: Tax & compliance; Bookkeeping & payroll; Business advisory; Talk to our team.
- Preset frontend responses and useful links to the real Services and Contact pages (and existing online consultation booking link).
- Reset/start-over control, close button, Escape-to-close, focus handling, mobile layout, and reduced-motion support.
- Input area deliberately disabled and labelled **Messaging available soon**. This is a UI preview, **not a live chatbot**.
- No API credentials, AI integration, backend requests, message transmission, session storage, personal data collection, or third-party chat dependencies.

## Files added

- `assets/css/chatbot.css` — self-contained responsive styling, scoped to `.tt-chatbot`.
- `assets/js/chatbot.js` — standalone DOM widget, canned message choices and UI behaviour.
- `CHATBOT-IMPLEMENTATION.md` — this guide.

## Existing files updated

- `build_pages.py` — includes chatbot CSS and JS in future page regenerations.
- All 9 HTML pages (listed below) — include the new CSS/JS without changing their page content.
- `README.md` — documentation addition.
- `FILES_AND_CHANGES.md` — implementation manifest addition.

HTML pages:
- `about.html`
- `contact.html`
- `index.html`
- `insights.html`
- `insights/bookkeeping.html`
- `insights/cash-flow.html`
- `insights/tax-readiness.html`
- `privacy.html`
- `services.html`


## Preview

Open `index.html` with a web browser or use `python -m http.server 8000` from this project directory and open `http://localhost:8000`. The widget is launched using **How can we help?** at the bottom-right. It is closed by default to avoid distracting visitors.

## How to update the preset content

In `assets/js/chatbot.js`, edit the welcome message markup and the `topics` array (titles, subtitles, prewritten responses, destinations). Links are generated relative to the script's site root, so the widget works on both top-level pages and nested `insights/` pages, including deployments under a subdirectory.

For future chatbot integration, replace the frontend-only topic handlers and disabled input with the agreed messaging flow, secure server-side integration, privacy notices, and consent as appropriate. Do not put private API keys in frontend JavaScript.

## Scope and quality checks

Original navigation, forms, carousels, page layout, photography, styling and existing JavaScript were intentionally left alone. Browser-simulated UI tests covered opening, closing, all topic links, reset, Escape key and launcher visibility across all 9 pages at desktop and mobile widths for each version. `build_pages.py` re-generation was checked on a separate copy to confirm it retains original page content and gallery behaviour.
