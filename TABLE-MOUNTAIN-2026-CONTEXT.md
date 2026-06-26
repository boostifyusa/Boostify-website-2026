# Table Mountain 2026 — event context & what's at stake

**For the next agent/dev touching this repo.** Written 2026-06-25.

Boostify (Victor) speaks at the **Central Valley Native Economic Summit @ Table Mountain on 2026-06-26** (talk: "Get Seen. Get Hired."). The talk deck and a booth banner both drive the audience to a free "Online-Presence Check." This file records the live risks so nothing gets missed before the event.

## 🚨 TOP RISK — `boostifyusa.com/check` is a 404

- The talk deck's QR code (slide 20) and the spoken offer point to **`boostifyusa.com/check`**.
- **That URL returns HTTP 404.** There is no `/check` route in `src/App.tsx` and no `/check` rule in `public/_redirects`.
- The real, working "Online-Presence Check" tool is **`/seo-audit`** (`src/pages/SEOAuditPage.tsx`, "Free Fresno SEO Audit. Instant Results.", lead-capture form → `/api/audit/check-email`, `/api/audit/check-business`).
- **Recommended fix (then it needs a deploy — handled by Victor, not automatically):**
  add to `public/_redirects`:
  ```
  /check  /seo-audit  301
  ```
  This makes the already-embedded/printed QR codes work without re-exporting the deck. (Alternative: build a dedicated `/check` landing page, or re-point the QR — slower.)
- **Status as of 2026-06-25: UNRESOLVED.**

## Asset status

- **Talk deck** — QR is now embedded on slide 20; PDF regenerated. Lives in Google Drive: `My Drive / Boostify USA / Documents / Table Mountain 2026/` (and local working copy `~/Documents/Projects/Boostify/Table Mountain 2026/`). Open: rebuild as editable `.pptx` (Victor, via Canva/Figma).
- **Retractable booth banner** (`Boostify-Retractable-Banner-33x78`) — in the same Drive folder; has its own QR → `boostifyusa.com` (homepage, resolves). Print PDF ready; needs physical printing for the booth.
- **Second "Get Found. Get Customers" banner** (sent to Banner on the Cheap) — NOT in this repo, this Drive, or this machine; believed to live on Victor's other Mac / Canva / the Banner-on-the-Cheap account. Track it down before the event.

## This repo's sync status

As of 2026-06-25 `main` is fully synced with GitHub (the stranded "Best Web Design Agencies in Fresno" blog post was committed + pushed — commit `4c0e224`).
