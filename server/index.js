import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

import compression from 'compression';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(compression());
app.use(cors());
app.use(express.json());

// Serve static files from the React app
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '../dist');

// Load Audit Configuration
// Load Audit Configuration
let auditConfig = {
    business: { maxRuns: 1, limitResetDays: 30 },
    pin: { maxRuns: 1, expiryDays: 180 },
    audit: { gridRadiusMiles: 5 }
};
const CONFIG_PATH = path.join(__dirname, 'audit-config.json');

function loadAuditConfig() {
    try {
        if (fs.existsSync(CONFIG_PATH)) {
            const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
            auditConfig = JSON.parse(raw);
            console.log('Loaded audit configuration:', auditConfig);
        }
    } catch (e) {
        console.error('Error loading audit-config.json', e);
    }
}
// Initial load
loadAuditConfig();

// Watch for changes
// Config watcher included in central watcher below
app.use(express.static(DIST_DIR, {
    maxAge: '1d', // Default to 1 day
    setHeaders: (res, path) => {
        if (path.includes('assets')) {
            // Hashed assets (JS/CSS) get 1 year cache
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else {
            // Other static files (images, etc) get 1 day
            res.setHeader('Cache-Control', 'public, max-age=86400');
        }
    }
}));

// Main Contact Route
app.post('/api/contact', async (req, res) => {
    try {

        // Extract consents too
        const { name, email, phone, service, message, recaptchaToken, consentPromo, consentService } = req.body;

        console.log('Received Form Data:', { name, email, service, consentPromo, consentService });

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (!recaptchaToken) {
            return res.status(400).json({ error: 'Please complete the ReCAPTCHA check.' });
        }

        // Verify ReCAPTCHA
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
        const verifyResponse = await fetch(verifyUrl, { method: 'POST' });
        const verifyData = await verifyResponse.json();

        console.log('ReCAPTCHA Verification Result:', verifyData);

        if (!verifyData.success || verifyData.score < 0.5) {
            console.log('ReCAPTCHA Failed:', verifyData);
            return res.status(400).json({ error: 'System detected potential spam. Please try again.' });
        }

        if (!process.env.BREVO_API_KEY) {
            console.error('Missing BREVO_API_KEY in .env');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Prepare Brevo Payload
        const payload = {
            sender: {
                name: "Boostify Website",
                email: process.env.BREVO_SENDER_EMAIL || "no-reply@boostifyusa.com"
            },
            to: [
                {
                    email: process.env.DESTINATION_EMAIL || "hello@boostifyusa.com",
                    name: "Boostify Admin"
                }
            ],
            subject: `New Lead: ${name} - ${service || 'General Inquiry'}`,
            htmlContent: `
        <html>
          <body>
            <h2>New Website Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Service Interest:</strong> ${service || 'Not specified'}</p>
            
            <hr />
            <h3>SMS Consents</h3>
            <p><strong>Marketing SMS:</strong> ${consentPromo ? '✅ CONSTENTED' : '❌ Opt-out'}</p>
            <p><strong>Non-Marketing SMS:</strong> ${consentService ? '✅ CONSENTED' : '❌ Opt-out'}</p>
            <hr />

            <h3>Message:</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </body>
        </html>
      `
        };

        // Send to Brevo
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': process.env.BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Brevo API Error:', data);
            return res.status(500).json({ error: 'Failed to send email', details: data });
        }

        console.log('Email sent successfully:', data);
        res.status(200).json({ success: true, messageId: data.messageId });

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Google Places Search Proxy
app.post('/api/places/search', async (req, res) => {
    try {
        console.log('--- Places Search Request ---');
        const { query } = req.body;
        console.log('Query:', query);

        if (!query) {
            return res.status(400).json({ error: 'Missing query' });
        }

        // Use the variable name the user actually set
        const apiKey = process.env.GOOGLE_PLACES_API || process.env.GOOGLE_PLACES_API_KEY;

        if (!apiKey) {
            console.error('Missing GOOGLE_PLACES_API in .env');
            return res.status(500).json({ error: 'Server configuration error' });
        }
        console.log('API Key Found (length):', apiKey.length);

        // Text Search (New) API
        const url = 'https://places.googleapis.com/v1/places:searchText';

        console.log('Fetching from Google Places API...');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.id,places.rating,places.userRatingCount,places.types,places.location'
            },
            body: JSON.stringify({
                textQuery: query,
                maxResultCount: 3
            })
        });

        const data = await response.json();
        console.log('Google Response Status:', response.status);

        if (!response.ok) {
            console.error('Google Places API Error Full:', JSON.stringify(data, null, 2));
            return res.status(500).json({ error: 'Failed to fetch places', details: data });
        }

        if (data.places && data.places.length > 0) {
            console.log('Sample Place[0]:', JSON.stringify(data.places[0], null, 2));
        }
        console.log('Places Found:', data.places ? data.places.length : 0);
        res.status(200).json(data);

    } catch (error) {
        console.error('Places Search Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// All other GET requests not handled before will return the React app

// Google AI Keyword Suggestion Proxy



// Google AI Keyword Suggestion Proxy
app.post('/api/ai/suggest-keywords', async (req, res) => {
    try {
        console.log('--- AI Keyword Suggestion Request ---');
        const { businessName, businessType, location, description } = req.body;
        console.log('Business:', { businessName, businessType, location });

        if (!businessName) {
            return res.status(400).json({ error: 'Missing business details' });
        }

        const apiKey = process.env.GOOGLE_AI_STUDIO;
        if (!apiKey) {
            console.error('Missing GOOGLE_AI_STUDIO in .env');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        let prompt = `Act as a Local SEO Expert. Suggest 3 distinct, high-intent "near me" or "in [city]" keywords for this business:\n`;
        prompt += `- Name: ${businessName}\n`;
        prompt += `- Type: ${businessType}\n`;
        prompt += `- Location: ${location}\n`;
        if (description) prompt += `- Description: ${description}\n`;
        prompt += `\nReturn ONLY the 3 keywords separated by commas. No numbering, no quotes.`;

        console.log('Sending prompt to Gemini...');
        console.log('Sending prompt to Gemini...');
        // Use gemini-3-flash as requested by user
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        console.log('Gemini Response Status:', response.status);

        if (!response.ok) {
            console.error('Gemini API Error:', JSON.stringify(data, null, 2));
            return res.status(500).json({ error: 'Failed to generate keywords' });
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        console.log('Gemini Raw Text:', text);

        const keywords = text ? text.split(',').map(k => k.trim()) : [`${businessType} in ${location}`];
        console.log('Parsed Keywords:', keywords);

        res.status(200).json({ keywords });

    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ─── Audit PIN Verification System ───
// pin → { email, createdAt, expiresAt, name, phone, businessName, runsUsed, maxRuns }
const PIN_STORE_PATH = path.join(__dirname, 'pin-store.json');

// Load from disk on startup
// Load from disk
const pinStore = new Map();
function loadPinStore() {
    try {
        if (fs.existsSync(PIN_STORE_PATH)) {
            const fileContent = fs.readFileSync(PIN_STORE_PATH, 'utf-8');
            console.log('PIN store file content length:', fileContent.length);

            if (!fileContent.trim()) {
                console.log('PIN store file is empty. Clearing in-memory store.');
                pinStore.clear();
                return;
            }

            const data = JSON.parse(fileContent);
            pinStore.clear();
            for (const [key, value] of Object.entries(data)) {
                // Ensure key is string
                pinStore.set(String(key).trim(), value);
            }
            console.log(`Loaded ${pinStore.size} PINs from disk (Keys: ${Array.from(pinStore.keys()).join(', ')})`);
        } else {
            console.error('PIN Store file not found at:', PIN_STORE_PATH);
        }
    } catch (err) {
        console.error('Failed to load pin store:', err.message);
        // Optional: If parse fails (e.g. valid file but bad JSON), do we clear?
        // Safer to keep old memory state so we don't lose data on simple syntax error.
    }
}
loadPinStore();

// Watch Pin Store
// Pin watcher included in central watcher below

// Save to disk
function savePinStore() {
    try {
        const obj = Object.fromEntries(pinStore);
        fs.writeFileSync(PIN_STORE_PATH, JSON.stringify(obj, null, 2));
    } catch (err) {
        console.error('Failed to save pin store:', err.message);
    }
}

// ─── Business (Place ID) Rate Limiting ───
// placeId → { businessName, runsUsed, maxRuns }
const BIZ_STORE_PATH = path.join(__dirname, 'biz-store.json');

const bizStore = new Map();
function loadBizStore() {
    try {
        console.log(`Loading Biz Store from: ${BIZ_STORE_PATH}`);
        if (fs.existsSync(BIZ_STORE_PATH)) {
            const fileContent = fs.readFileSync(BIZ_STORE_PATH, 'utf8');

            if (!fileContent.trim()) {
                console.log('Biz Store file is empty. Clearing in-memory store.');
                bizStore.clear();
                return;
            }

            const data = JSON.parse(fileContent);
            bizStore.clear();
            for (const [key, value] of Object.entries(data)) {
                bizStore.set(key, value);
            }
            console.log(`Loaded ${bizStore.size} businesses from disk`);
        } else {
            console.log('Biz Store file not found, starting fresh.');
        }
    } catch (err) {
        console.error('Failed to load biz store:', err.message);
    }
}
loadBizStore();

// Watch Biz Store
// Central Watcher for all JSON files
try {
    console.log('Starting directory watcher on:', __dirname);
    fs.watch(__dirname, (eventType, filename) => {
        if (!filename) return;

        if (filename === 'audit-config.json') {
            console.log('Config file changed, reloading...');
            loadAuditConfig();
        }
        else if (filename === 'pin-store.json') {
            try {
                // Debounce or just catch read errors
                console.log('PIN store file changed, reloading...');
                loadPinStore();
            } catch (e) {
                console.error('Error reloading pin store:', e);
            }
        }
        else if (filename === 'biz-store.json') {
            try {
                console.log('Biz store file changed, reloading...');
                loadBizStore();
            } catch (e) {
                console.error('Error reloading biz store:', e);
            }
        }
    });
} catch (err) { console.log('Watch error:', err.message); }

function saveBizStore() {
    try {
        const obj = Object.fromEntries(bizStore);
        console.log(`Saving Biz Store to: ${BIZ_STORE_PATH}`);
        // console.log(`Biz Store Content: ${JSON.stringify(obj)}`); // Reduce noise
        fs.writeFileSync(BIZ_STORE_PATH, JSON.stringify(obj, null, 2));
        console.log('Biz Store saved successfully.');
    } catch (err) {
        console.error('Failed to save biz store:', err.message);
    }
}

// Check if a business (by placeId) has exhausted its runs
app.post('/api/audit/check-business', (req, res) => {
    const { placeId } = req.body;
    console.log(`Checking business: ${placeId || 'No Place ID Provided'}`);
    if (!placeId) return res.status(200).json({ allowed: true });

    const stored = bizStore.get(placeId);
    if (stored) {
        // Check for limit reset (rolling window from config)
        const resetMs = (auditConfig.business.limitResetDays || 30) * 24 * 60 * 60 * 1000;
        const lastUpdated = stored.lastUpdated || 0;

        if (Date.now() - lastUpdated > resetMs) {
            console.log(`Resetting limits for business ${placeId} (> ${auditConfig.business.limitResetDays} days)`);
            stored.runsUsed = 0;
            stored.lastUpdated = Date.now();
            saveBizStore();
        }

        // Use configured max runs as minimum base
        const limit = auditConfig.business.maxRuns || 3;

        // DYNAMIC CONFIG ENFORCEMENT (Business - Runtime Check Only - NO SYNC)
        // Use the higher of the two: Config Limit vs Stored Limit.
        const configLimit = auditConfig.business.maxRuns || 3;
        const effectiveLimit = Math.max(configLimit, stored.maxRuns);

        if (stored.runsUsed >= effectiveLimit) {
            return res.status(403).json({
                allowed: false,
                error: 'This business has already hit its audit limit for the month. Contact us for a limit extension.'
            });
        }
    }
    res.status(200).json({ allowed: true });
});

// Quick email check — does this email already have an exhausted PIN?
app.post('/api/audit/check-email', (req, res) => {
    const { email } = req.body;
    console.log(`Checking email status for: ${email}`);
    if (!email) return res.status(200).json({ allowed: true });

    const emailLower = email.toLowerCase();

    // Iterate all pins to find ANY valid logical session
    // Logic: If they have ANY active PIN that is NOT exhausted, they are good.
    // If they have conflicting PINs, we should ideally consolidate, but for now just prioritize the "good" one.

    let hasExhaustedPin = false;
    let validPinFound = false;
    let existingName = '';

    for (const [, pinData] of pinStore.entries()) {
        if (pinData.email === emailLower && Date.now() < pinData.expiresAt) {
            const effectiveLimit = auditConfig.pin.maxRuns || pinData.maxRuns || 5;

            if (pinData.runsUsed < effectiveLimit) {
                // Found a valid, usable PIN!
                validPinFound = true;
                existingName = pinData.name;
                // If we find at least one good one, we don't care about bad ones.
                break;
            } else {
                hasExhaustedPin = true;
            }
        }
    }

    if (validPinFound) {
        return res.status(200).json({ allowed: true, hasExistingPin: true, name: existingName });
    }

    if (hasExhaustedPin) {
        console.log(`Blocking email ${email} due to exhausted PIN runs.`);
        return res.status(403).json({
            allowed: false,
            error: 'Sorry, this email has already received a PIN and all runs have been used. Reach out to us for additional runs.'
        });
    }

    res.status(200).json({ allowed: true });
});

// Send PIN to user's email
app.post('/api/audit/send-pin', async (req, res) => {
    try {
        console.log('--- Send Audit PIN ---');
        const { email, name, phone, businessName } = req.body;

        if (!email) return res.status(400).json({ error: 'Email is required' });

        if (!process.env.BREVO_API_KEY) {
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Check if this email already has an active PIN
        const emailLower = email.toLowerCase();
        let existingPin = null;
        for (const [pinKey, pinData] of pinStore.entries()) {
            if (pinData.email === emailLower && Date.now() < pinData.expiresAt) {
                existingPin = { pin: pinKey, data: pinData };
                break;
            }
        }

        let pin;
        if (existingPin) {
            // DYNAMIC CONFIG ENFORCEMENT (Send PIN - Runtime Check Only - NO SYNC)
            const configMaxRuns = auditConfig.pin.maxRuns || 5;
            const effectiveMaxRuns = Math.max(existingPin.data.maxRuns, configMaxRuns);

            if (existingPin.data.runsUsed >= effectiveMaxRuns) {
                // Runs exhausted — block them
                console.log(`PIN for ${email} already exhausted (${existingPin.data.runsUsed}/${effectiveMaxRuns})`);
                return res.status(403).json({ error: 'Sorry, you\'ve hit your limit! Reach out to us for additional runs.' });
            }
            // Has runs left — resend the same PIN
            console.log(`Resending existing PIN for ${email}: ${existingPin.pin} (${effectiveMaxRuns - existingPin.data.runsUsed} runs left)`);
            pin = existingPin.pin;
        } else {
            // Generate new 6-digit PIN
            pin = String(Math.floor(100000 + Math.random() * 900000));
            const now = Date.now();
            // Use config for expiry
            const expiryDays = auditConfig.pin.expiryDays || 180;
            const expiresAt = now + expiryDays * 24 * 60 * 60 * 1000;

            // Store PIN (keyed by PIN for lookup from both paths)
            pinStore.set(pin, {
                email: emailLower,
                createdAt: now,
                expiresAt,
                name,
                phone,
                businessName,
                runsUsed: 0,
                maxRuns: auditConfig.pin.maxRuns || 1
            });
            savePinStore();
            console.log(`PIN generated for ${email}: ${pin} (${auditConfig.pin.maxRuns} run(s), ${expiryDays}-day expiry)`);
        }

        // Send branded email to user
        const emailPayload = {
            sender: {
                name: "Boostify",
                email: process.env.BREVO_SENDER_EMAIL || "no-reply@boostifyusa.com"
            },
            to: [{ email, name }],
            subject: `Your Boostify Audit Code: ${pin}`,
            htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Verification Code</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F5F7;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;color:#111111;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#F5F5F7;padding:40px 20px;">
    <tr>
      <td align="center">
        <div style="margin-bottom:32px;">
          <img src="https://boostifyusa.com/Group-116.png" alt="Boostify" width="280" style="display:block;width:280px;height:auto;border:0;">
        </div>
        
        <!-- Card -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:480px;background-color:#FFFFFF;border-radius:24px;box-shadow:0 4px 24px rgba(0,0,0,0.04);overflow:hidden;">
          <tr>
            <td style="padding:48px 40px;text-align:center;">
              <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#111111;letter-spacing:-0.5px;">Verify Your Email</h1>
              <p style="margin:0 0 32px;font-size:16px;line-height:1.5;color:#666666;">
                Use the verification code below to <strong style="color:#111111;">see your rankings</strong>.
              </p>
              
              <!-- PIN Box -->
              <div style="background-color:#FFF5F0;border:1px solid #FFE0D1;border-radius:16px;padding:24px;margin-bottom:32px;text-align:center;">
                <div style="font-family:monospace;font-size:36px;font-weight:700;letter-spacing:8px;color:#E8590C;line-height:1;">
                  ${pin}
                </div>
              </div>
              
              <p style="margin:0;font-size:14px;color:#888888;">
                This code will expire in 15 minutes.
              </p>
            </td>
          </tr>
          
          <!-- Footer in Card -->
          <tr>
            <td style="background-color:#FAFAFA;padding:24px;text-align:center;border-top:1px solid #EEEEEE;">
              <p style="margin:0;font-size:12px;color:#999999;">
                If you didn't request this code, you can safely ignore this email.
              </p>
            </td>
          </tr>
        </table>
        
        <!-- Bottom Footer -->
        <div style="margin-top:32px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#999999;">
            &copy; ${new Date().getFullYear()} Boostify USA LLC
          </p>
          <div style="margin-top:8px;">
            <a href="https://boostifyusa.com" style="color:#E8590C;text-decoration:none;font-size:12px;font-weight:600;">boostifyusa.com</a>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`
        };

        const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': process.env.BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify(emailPayload)
        });

        if (!emailRes.ok) {
            const errData = await emailRes.json();
            console.error('Brevo PIN Email Error:', errData);
            // Still continue — PIN is in memory and visible in server logs for dev
            console.log(`⚠️  Email failed but PIN is available: ${pin} (for ${email})`);
        }

        // Also notify admin about the new lead
        const adminPayload = {
            sender: {
                name: "Boostify Audit",
                email: process.env.BREVO_SENDER_EMAIL || "no-reply@boostifyusa.com"
            },
            to: [{
                email: process.env.DESTINATION_EMAIL || "hello@boostifyusa.com",
                name: "Boostify Admin"
            }],
            subject: `🔍 New Audit Lead: ${name} - ${businessName}`,
            htmlContent: `
<html><body>
  <h2>New SEO Audit Lead</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
  <p><strong>Business:</strong> ${businessName}</p>
  <p><em>PIN sent at ${new Date().toLocaleString()}</em></p>
</body></html>`
        };

        // Fire and forget — don't block user flow
        fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': process.env.BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify(adminPayload)
        }).catch(err => console.error('Admin notify error:', err));

        console.log('PIN email sent successfully');
        res.status(200).json({ success: true });

    } catch (error) {
        console.error('Send PIN Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DEV: View Email Template Route
app.get('/api/test-email-view', (req, res) => {
    const pin = "123456";
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Verification Code</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F5F7;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;color:#111111;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#F5F5F7;padding:40px 20px;">
    <tr>
      <td align="center">
        <div style="margin-bottom:32px;">
          <img src="https://boostifyusa.com/Group-116.png" alt="Boostify" width="280" style="display:block;width:280px;height:auto;border:0;">
        </div>
        
        <!-- Card -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:480px;background-color:#FFFFFF;border-radius:24px;box-shadow:0 4px 24px rgba(0,0,0,0.04);overflow:hidden;">
          <tr>
            <td style="padding:48px 40px;text-align:center;">
              <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#111111;letter-spacing:-0.5px;">Verify Your Email</h1>
              <p style="margin:0 0 32px;font-size:16px;line-height:1.5;color:#666666;">
                Use the verification code below to <strong style="color:#111111;">see your rankings</strong>.
              </p>
              
              <!-- PIN Box -->
              <div style="background-color:#FFF5F0;border:1px solid #FFE0D1;border-radius:16px;padding:24px;margin-bottom:32px;text-align:center;">
                <div style="font-family:monospace;font-size:36px;font-weight:700;letter-spacing:8px;color:#E8590C;line-height:1;">
                  ${pin}
                </div>
              </div>
              
              <p style="margin:0;font-size:14px;color:#888888;">
                This code will expire in 15 minutes.
              </p>
            </td>
          </tr>
          
          <!-- Footer in Card -->
          <tr>
            <td style="background-color:#FAFAFA;padding:24px;text-align:center;border-top:1px solid #EEEEEE;">
              <p style="margin:0;font-size:12px;color:#999999;">
                If you didn't request this code, you can safely ignore this email.
              </p>
            </td>
          </tr>
        </table>
        
        <!-- Bottom Footer -->
        <div style="margin-top:32px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#999999;">
            &copy; ${new Date().getFullYear()} Boostify USA LLC
          </p>
          <div style="margin-top:8px;">
            <a href="https://boostifyusa.com" style="color:#E8590C;text-decoration:none;font-size:12px;font-weight:600;">boostifyusa.com</a>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
    res.send(html);
});




// Diagnostic Endpoint removed for security


// Verify PIN — supports PIN-only lookup (bypass) or email+PIN
app.post('/api/audit/verify-pin', async (req, res) => {
    try {
        console.log('--- Verify Audit PIN ---');
        console.log('Request Body Type:', typeof req.body);
        console.log('Request Body Keys:', Object.keys(req.body || {}));

        // Sanitize input
        const pin = String(req.body.pin || '').trim();
        console.log(`Pin received (sanitized): '${pin}' (Store size: ${pinStore.size})`);

        if (!pin) {
            return res.status(400).json({ error: 'Missing PIN' });
        }

        const stored = pinStore.get(pin);
        console.log(`Lookup result for PIN '${pin}':`, stored ? 'Found' : 'Not Found');

        if (!stored) {
            console.log('Available PINs:', Array.from(pinStore.keys()));
            return res.status(400).json({ error: 'Invalid PIN. Please check and try again.' });
        }

        if (Date.now() > stored.expiresAt) {
            console.log(`PIN expired: ${pin} (Expired at ${new Date(stored.expiresAt).toISOString()})`);
            // Do NOT delete. Keep it so user sees "Expired" consistently.
            // pinStore.delete(pin); 
            return res.status(400).json({ error: 'PIN has expired. Please request a new one.' });
        }

        // Check for 30-day Rollover Reset (Auto-unblock)
        if (!stored.lastUpdated) {
            stored.lastUpdated = stored.createdAt; // Default for old data
        }
        const limitResetDays = auditConfig.pin.limitResetDays || 30;
        const diffDays = (Date.now() - stored.lastUpdated) / (1000 * 60 * 60 * 24);

        if (diffDays > limitResetDays) {
            console.log(`PIN limit reset due to time window (${diffDays.toFixed(1)} days > ${limitResetDays})`);
            stored.runsUsed = 0;
            stored.lastUpdated = Date.now();
            savePinStore();
        }

        // DYNAMIC CONFIG ENFORCEMENT (Runtime Check Only - NO SYNC):
        // Use the higher of the two: Config Limit vs Stored Limit.
        const configLimit = auditConfig.pin.maxRuns || 5;
        const effectiveLimit = Math.max(configLimit, stored.maxRuns);

        if (stored.runsUsed >= effectiveLimit) {
            console.log(`PIN exhausted: ${pin} (${stored.runsUsed}/${effectiveLimit})`);
            return res.status(400).json({ error: `This PIN has been used ${effectiveLimit} times. Contact us for more scans.` });
        }

        const remainingRuns = effectiveLimit - stored.runsUsed;
        console.log(`PIN ${pin} verified for ${stored.email} — ${remainingRuns} runs remaining (Limit: ${effectiveLimit})`);
        res.status(200).json({ success: true, remainingRuns, email: stored.email, name: stored.name, businessName: stored.businessName });

    } catch (error) {
        console.error('Verify PIN Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Use a run — call this when audit actually starts
app.post('/api/audit/use-run', async (req, res) => {
    try {
        console.log('--- Use Audit Run ---');
        const { pin, placeId, businessName } = req.body;

        if (!pin) {
            return res.status(400).json({ error: 'Missing PIN' });
        }

        const stored = pinStore.get(pin);

        if (!stored) {
            return res.status(400).json({ error: 'Invalid PIN' });
        }

        // DYNAMIC CONFIG ENFORCEMENT (PIN - Use Run - Runtime Check Only - NO SYNC)
        const configMaxRuns = auditConfig.pin.maxRuns || 5;
        const effectiveMaxRuns = Math.max(stored.maxRuns, configMaxRuns);

        if (stored.runsUsed >= effectiveMaxRuns) {
            return res.status(400).json({ error: 'No runs remaining on this PIN.' });
        }

        // Check business limit if placeId provided
        if (placeId) {
            const limit = auditConfig.business.maxRuns || 3;
            if (!bizStore.has(placeId)) {
                bizStore.set(placeId, {
                    businessName: businessName || 'Unknown',
                    runsUsed: 0,
                    maxRuns: limit,
                    lastUpdated: Date.now()
                });
            }
            const bizEntry = bizStore.get(placeId);

            // DYNAMIC CONFIG ENFORCEMENT (Business - Use Run - Runtime Check Only - NO SYNC)
            const bizConfigLimit = auditConfig.business.maxRuns || 3;
            const bizEffectiveLimit = Math.max(bizConfigLimit, bizEntry.maxRuns);

            if (bizEntry.runsUsed >= bizEffectiveLimit) {
                return res.status(403).json({ error: 'This business has already hit its audit limit. Contact us for a limit extension.' });
            }

            bizEntry.runsUsed += 1;
            bizEntry.lastUpdated = Date.now();
            saveBizStore();
            console.log(`Business ${placeId} (${businessName}): ${bizEntry.runsUsed}/${bizEffectiveLimit} runs used`);
        } else {
            console.log(`Use Run: Skipping business check (No Place ID)`);
        }

        stored.runsUsed += 1;
        savePinStore();
        const effectiveMax = Math.max(auditConfig.pin.maxRuns || 5, stored.maxRuns);
        const remainingRuns = effectiveMax - stored.runsUsed;
        res.status(200).json({ success: true, runsUsed: stored.runsUsed, remainingRuns });

    } catch (error) {
        console.error('Use Run Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Google Places Geogrid Audit Proxy
app.post('/api/audit/grid', async (req, res) => {
    try {
        console.log('--- Geogrid Audit Request ---');
        const { lat, lng, keyword, businessName, radius = 5 } = req.body;
        console.log('Params:', { lat, lng, keyword, businessName, radius });

        if (!lat || !lng || !keyword || !businessName) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const apiKey = process.env.GOOGLE_PLACES_API || process.env.GOOGLE_PLACES_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // 1. Generate 4x4 Grid (16 points)
        // Simple logic: Create a grid around the center point.
        // 1 degree lat ~ 69 miles. 1 degree lng ~ 69 miles (at equator).
        // For 5 mile radius, we need roughly +/- 0.07 degrees.
        // Let's do a dynamic delta based on radius.
        const R = 3958.8; // Earth radius in miles
        const latDelta = (radius / R) * (180 / Math.PI);
        const lngDelta = (radius / R) * (180 / Math.PI) / Math.cos(lat * Math.PI / 180);

        const gridSize = 4;
        const gridPoints = [];

        // Create 4x4 grid centered on lat/lng
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                // Normalize i,j to -0.5 to 0.5 range to center
                const latOffset = (i / (gridSize - 1) - 0.5) * 2 * latDelta;
                const lngOffset = (j / (gridSize - 1) - 0.5) * 2 * lngDelta;

                gridPoints.push({
                    lat: lat + latOffset,
                    lng: lng + lngOffset,
                    row: i,
                    col: j
                });
            }
        }

        console.log(`Generated ${gridPoints.length} grid points.`);

        // 2. Fetch Rankings for each point
        // We need to limit concurrency to avoid hitting rate limits or timeouts
        // Google Places "Text Search" with bias

        const fetchRank = async (point) => {
            const url = 'https://places.googleapis.com/v1/places:searchText';
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Goog-Api-Key': apiKey,
                        'X-Goog-FieldMask': 'places.displayName,places.id'
                    },
                    body: JSON.stringify({
                        textQuery: keyword,
                        locationBias: {
                            circle: {
                                center: { latitude: point.lat, longitude: point.lng },
                                radius: 500 // 500 meters bias
                            }
                        },
                        maxResultCount: 20 // Check top 20
                    })
                });

                if (!response.ok) return { ...point, rank: 21, topCompetitors: [], error: true };

                const data = await response.json();
                const places = data.places || [];

                // Find rank
                const index = places.findIndex(p =>
                    p.displayName?.text?.toLowerCase().includes(businessName.toLowerCase())
                );

                // Get top 3 competitors (excluding the target business)
                const topCompetitors = places
                    .filter(p => !p.displayName?.text?.toLowerCase().includes(businessName.toLowerCase()))
                    .slice(0, 3)
                    .map(p => p.displayName?.text || 'Unknown');

                return {
                    ...point,
                    rank: index !== -1 ? index + 1 : 21, // >20 if not found
                    topCompetitors
                };

            } catch (err) {
                console.error('Grid Point Error:', err);
                return { ...point, rank: 21, topCompetitors: [], error: true };
            }
        };

        // Run in batches of 4 to be safe (16 total = 4 batches)
        const results = [];
        for (let i = 0; i < gridPoints.length; i += 4) {
            const batch = gridPoints.slice(i, i + 4);
            const batchResults = await Promise.all(batch.map(fetchRank));
            results.push(...batchResults);
            // Small delay between batches
            await new Promise(r => setTimeout(r, 200));
        }

        console.log('Audit Complete.');
        res.status(200).json({ results });

    } catch (error) {
        console.error('Geogrid Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Google Static Map Proxy
app.get('/api/static-map', async (req, res) => {
    try {
        const { center, zoom = 12, size = '600x400', scale = 1 } = req.query;

        if (!center) {
            return res.status(400).send('Missing center parameter');
        }

        const apiKey = process.env.GOOGLE_PLACES_API || process.env.GOOGLE_PLACES_API_KEY;
        if (!apiKey) {
            return res.status(500).send('Server configuration error');
        }

        const url = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(center)}&zoom=${zoom}&size=${size}&scale=${scale}&key=${apiKey}&style=feature:all|element:labels|visibility:off&style=feature:road|element:geometry|color:0xffffff&style=feature:road|element:labels|visibility:on`;

        const response = await fetch(url);

        if (!response.ok) {
            console.error('Static Map Error:', await response.text());
            return res.status(404).send('Failed to fetch map');
        }

        // Pipe the image to the client
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        res.send(buffer);

    } catch (error) {
        console.error('Static Map Proxy Error:', error);
        res.status(500).send('Internal server error');
    }
});

// All other GET requests not handled before will return the React app
app.use((req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
