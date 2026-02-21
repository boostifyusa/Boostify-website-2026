# Boostify Partner & Referral Data Management

This document outlines how the Partner Referral portal handles user sessions and where all the data is stored on the server for manual extraction via SSH.

## 1. Login Sessions

The partner login session is designed to be **persistent until manual logout**, utilizing a lightweight approach specific to local marketing affiliates.

*   **Authentication Flow:** When a partner logs in via their email, a 6-digit PIN is generated. **This PIN expires in exactly 15 minutes** if unused.
*   **Session Storage:** Once the valid PIN is entered, the server returns the partner's unique ID and basic information. This data is stored directly in the browser's `localStorage` (`boostify_partner_id` and `boostify_partner_info`).
*   **Session Duration:** Because it relies on `localStorage` instead of expiring HTTP cookies or short-lived JWTs, **the partner will remain logged in indefinitely** on that specific browser/device until they explicitly click the **"Log Out"** button on the dashboard or manually clear their browser cache. This prevents partners from having to repeatedly request PINs.

## 2. Data Storage Architecture

All partner information, PINs, and submitted leads are stored natively on the backend in local JSON flat files. This avoids the overhead of a database for this specific micro-feature while ensuring data survives server restarts.

The data is physically located in the `server/data/` directory relative to the project root:
*   `server/data/partners.json` - Stores all registered partner profiles.
*   `server/data/partner_leads.json` - Stores all leads submitted across all partners.
*   `server/data/partner_pins.json` - Stores active/recently expired PIN mappings.

## 3. Extracting Data via SSH

If you need to manually pull this data from your live DigitalOcean droplet or server for reporting or backups, SSH into your server and use the following commands.

### Viewing the Data in the Terminal
To quickly inspect the contents of the partner or leads database directly in your terminal, run:

```bash
# Navigate to the project root (adjust path if your project is elsewhere on the droplet)
cd /var/www/boostify # Example path, replace with your actual server path

# View all Partners
cat server/data/partners.json

# View all submitted Leads
cat server/data/partner_leads.json
```

### Exporting/Downloading the Data Securely (SCP)
To download the JSON files directly to your local computer (e.g., your Mac), open a **new terminal tab on your local machine (DO NOT run this inside the SSH session)** and use the `scp` (Secure Copy) command:

```bash
# Download the Leads database
scp root@YOUR_SERVER_IP:/path/to/project/server/data/partner_leads.json ~/Desktop/boostify_leads_export.json

# Download the Partners database
scp root@YOUR_SERVER_IP:/path/to/project/server/data/partners.json ~/Desktop/boostify_partners_export.json
```
*(Replace `root@YOUR_SERVER_IP` with your actual SSH user and IP, and `/path/to/project/` with where the app lives on the droplet, likely `/var/www/...`)* 

You can then open `boostify_leads_export.json` on your desktop or convert it to a CSV using an online JSON-to-CSV tool if you need it formatted for Excel.
