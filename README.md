

## Getting Started

1. Run `npm install`
2. Run `npm run dev`

## Lead tracking

- **GoHighLevel:** every accepted lead (contact page, `/check` forms, `/campaign`, SEO audit PIN request, partner referrals) is also POSTed by `server/index.js` (`forwardLeadToGHL`) to the GHL "Website ⇒SMS" Inbound Webhook, fire-and-forget with a 5 s timeout. The webhook URL defaults to the live one; override with `GHL_LEAD_WEBHOOK_URL` in `.env` (`off` disables). Results log as `GHL lead forwarded` / `GHL lead forward FAILED` in `pm2 logs boostify`.
- **Attribution:** `src/lib/attribution.ts` stores first-touch UTM tags, `gclid`, landing page and external referrer on the first page load; forms send it with the lead.
- **GA4:** set `VITE_GA_MEASUREMENT_ID=G-...` in `.env` before `npm run build` (it is baked in at build time). Unset = no GA tag at all. Events: `page_view` on every route change, `generate_lead` (form_name, service_requested, page) after a server-accepted submission, `click_to_call` and `click_email` on `tel:`/`mailto:` clicks. No PII is sent to GA.
