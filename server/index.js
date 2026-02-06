import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
