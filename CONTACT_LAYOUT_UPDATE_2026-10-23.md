# TrendyTax — Contact FAQ & Map Layout Update

## Request completed

The **Contact** page now displays two visually distinct panels in the lower section:

- **Left: Google Map** for 162 Macquarie Street, Hobart TAS 7000, in a warm neutral panel matching the existing enquiry form colour.
- **Right: Frequently Asked Questions**, in a white panel matching the existing contact-details column.
- The "Good To Know" label and FAQ title are now inside the FAQ panel.
- The original FAQ items, answers, interactive behaviour, address, Google Map embed and external Google Maps link remain unchanged.
- On screens 800px wide or below, the panels stack vertically with the map first.

## Changed files

1. `contact.html` — reorders the Google Map and FAQ markup and groups the FAQs in their own panel.
2. `assets/css/style.css` — adds styles for the reversed two-colour panel treatment and responsive layout.
3. `build_pages.py` — updates the page generator so regenerating the site keeps the same layout.

Other previously delivered website files remain byte-for-byte identical to the previous update.

## Deployment

For a full redeployment, use the **full project ZIP**. For a selective update to an existing deployed copy of the previous release, replace only the three modified source files above. Do not replace the site with only the contents of the changed-files ZIP.

**Testing:** Confirmed left/right position, warm/white panel backgrounds, mobile stacking, FAQ expand/collapse, and preservation of the upper contact section and footer using Chromium at desktop and mobile widths. Google Maps' live network response cannot be verified from the offline preview, but its original embed URL is unchanged.
