# Trendy Tax Solutions — Client Changes (23 October 2026)

## Implemented

1. **Decorative dashes:** Removed the short teal lines preceding the uppercase headings/subheadings site-wide, plus the dash before the short tagline in the home hero. This is a visual change only; legitimate hyphens in words (such as “Hobart-based” and “long-term”) remain intact.
2. **Home service cards:** Made the three cards below “Essential Support, Without The Complexity” shorter, while keeping matched card heights and the original text and links.
3. **Inner-page banners:** Removed the large introductory banner (`.page-hero`) from About Us, Services, Insights, Contact, and Privacy. The actual content, links, forms, and article title headers are retained. Accessible hidden page-level headings remain.
4. **About Us introductory image:** Replaced the large founder portrait with a different professional teamwork image from the existing project's Unsplash photo set. Added the original client-provided portrait below in a smaller “Our Founder” block, without inventing the founder's name or credentials.
5. **About Us gallery:** Compact desktop/tablet styles keep the five gallery selections visible together beside the active photo. The original photos, carousel behaviour, controls, and responsive mobile horizontal thumbnail strip are preserved.
6. **Contact FAQs and map:** Added a two-column desktop layout with FAQs on the left and a Google Maps iframe for **162 Macquarie Street, Hobart TAS 7000** on the right. On mobile the map stacks below the FAQs. The iframe includes a text address and a direct Google Maps link as a fallback.
7. **Newsletter:** Changed the footer title to **“Subscribe to our newsletter”**, updated its supporting text and button to **“Subscribe”** on every page. Adjusted the email-draft feedback/subject to say newsletter subscription.
8. **Generator alignment:** Updated `build_pages.py` as well as the generated HTML, so rerunning the generator preserves these edits and the site's existing chatbot includes.

## Edited file inventory

- `build_pages.py`
- `index.html`, `about.html`, `services.html`, `insights.html`, `contact.html`, `privacy.html`
- `insights/bookkeeping.html`, `insights/cash-flow.html`, `insights/tax-readiness.html` — shared footer update only
- `assets/css/style.css`
- `assets/css/about-gallery.css`
- `assets/js/main.js` — newsletter email-draft wording only

New documentation file: `UPDATE_NOTES_2026-10-23.md`.

## Important preview notes

- The newsletter still uses the existing `mailto:` preview workflow: **Subscribe does not automatically register an email or store subscriber data**. The visible footer disclosure is retained. A production newsletter needs a client-approved subscription provider or secure backend.
- The contact form, chatbot, and photo gallery retain their existing frontend functionality; chatbot integration is still frontend-only.
- The new main About Us collaboration photo is from the existing Unsplash image set and, like the website's other Unsplash images, requires an internet connection. The original founder image and the five gallery images remain local files.
- The Google Map also needs internet access, and an embed can be restricted by a visitor's browser/network; a direct map link is provided.
- Static files run on Vercel or a PHP-capable web server without any PHP runtime dependency or build step. `build_pages.py` is for authoring only.

## Smoke checks completed

- Verified 9 HTML pages, shared newsletter CTA, stylesheet and script references, and absence of page banners on the five identified pages.
- Verified that the responsive layout has no horizontal overflow at 1440px and 390px widths in browser-rendered previews.
- Verified equal-height compact home cards, five gallery entries and next-photo action, and FAQ expand/collapse interaction in the local render.
- Live Google Maps and remote Unsplash image loading could not be validated in the restricted preview environment; please check them in the deployed browser preview.
