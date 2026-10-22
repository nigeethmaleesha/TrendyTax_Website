# Trendy Tax Solutions — Clean Public Website (Phase 1)

A clean, client-review-ready public website with no admin panel, accounts, or database. Built with pre-rendered **HTML, CSS and JavaScript** to run unchanged on **Vercel static hosting** and any standard **Apache/PHP web host** that serves HTML files.

## Included Pages
- `index.html` — Home
- `about.html` — About and team introduction
- `services.html` — All nine services carried over from the existing site
- `insights.html` — Filterable article listing
- `insights/*.html` — Three editorial sample articles
- `contact.html` — Contact form, click-to-call/email, map, booking link, FAQs
- `privacy.html` — Clearly marked preview notice pending client-approved policy

## Launch Locally
No build step or database required. Open `index.html`, or run a local server for best link and script behaviour:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy To Vercel
1. Put this directory in a GitHub repository or use the Vercel Dashboard project upload workflow.
2. **Framework Preset:** Other; **Root Directory:** repository root.
3. **Build Command:** leave empty; **Output Directory:** leave empty (root).
4. Deploy and share the preview URL with the client. No environment variables are needed for the static website.

`vercel.json` sets non-breaking security headers. It does not redirect `.html` paths.

## Deploy To PHP Hosting
1. Upload `index.html`, all other `.html` files, `assets/`, and `insights/` to `public_html` (or the host's document root).
2. Confirm direct routes such as `/services.html`, `/insights/cash-flow.html`, and `/contact.html` load.
3. Verify SSL, links, and any caching rules. **No PHP is executed in the current phase.** The files are compatible with PHP hosting because they are standard static pages; backend PHP can be added later.
4. When the client approves backend email delivery, connect an approved SMTP/form service separately. No mailbox password or third-party endpoint is included here.

## Forms — Important Behaviour
For the **client preview**, both forms intentionally use an **email-draft workflow**:
- Contact form validates required fields, email format and consent; it opens an email draft addressed to `info@trendytaxsolutions.com.au` with the submitted information. The visitor must press **Send** in their email app. Nothing is stored or silently delivered by the site.
- Newsletter form validates the email and opens an opt-in request email draft. It does **not** store subscriptions or send a campaign.

This is a clearly disclosed preview mode, not an automated email or newsletter backend. For actual public use, implement server-side delivery using client-approved SMTP/service, rate limiting, spam prevention, an approved privacy policy and newsletter consent workflow. `mailto:` requires the visitor to have an email client configured.

## Client-Supplied Assets
- `assets/img/brand-mark.png` — transparent icon extracted from the client-provided logo PDF
- `assets/img/brand-logo.png` — transparent logo derived from that PDF
- `assets/img/team-portrait.jpg` — client-supplied portrait; person's name/position must be confirmed before a public biography is added

## External Photography
Real-photo images are loaded directly from `images.unsplash.com`, **not AI-generated images**. See `IMAGE-SOURCES.md`. These remote photos require internet access and are not bundled in the ZIP. For final production we recommend downloading the selected photos from Unsplash, verifying the photographer/licence, optimising them, and hosting locally after client approval. Some networks may block remote photo requests. The design uses neutral fallback backgrounds.

## Before Production
- Finalise/about text, team name/title/photographs, service descriptions, awards and membership/logo usage rights.
- Replace the three illustrative Insights articles with reviewed client-approved content.
- Obtain an approved privacy policy and confirm any Australian privacy/disclosure obligations.
- Set up a production-safe inquiry form and an appropriate newsletter system if those features are required.
- Confirm whether the booking link should keep pointing to the existing Wix page or be replaced.
- Verify remote images, contact details, mobile layouts and accessibility in real browsers.

## Editing Content
Pages are generated from `build_pages.py` so shared navigation and footer stay consistent. Modify the templates and run `python build_pages.py`, or edit the HTML files directly if preferred. This build script is only for local authoring; neither Vercel nor the PHP host needs Python to serve the prebuilt site.

## Frontend chatbot preview (October 2026)

A floating **Trendy Tax Assistant** UI is available on all nine pages, including Insights articles. It has welcome messages, four useful topic choices, guided replies, service/contact links, reset/close controls and responsive mobile styling. It is **frontend-only**: free-text messaging and backend/API integration are intentionally not enabled. No visitor chat data is collected or sent. See [`CHATBOT-IMPLEMENTATION.md`](CHATBOT-IMPLEMENTATION.md) for details, file list and setup.
