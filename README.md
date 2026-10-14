# DETAIL MATTERS — Booking website

Next.js + Supabase starter for the DETAIL MATTERS Premium Auto Care website.

## Included
- Greek-language responsive landing page in premium dark styling
- Booking request form with vehicle and service selection
- Server-side API route that validates form values and writes to Supabase
- SQL schema with Row Level Security enabled
- Admin placeholder page (not a live, authenticated dashboard yet)

## Requirements
- Node.js 20+
- A Supabase project
- A Vercel account for deployment (recommended)
- Your domain, if already purchased

## 1. Run locally
1. Install Node.js 20 or newer.
2. Extract this project and open a terminal in the project directory.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local`.
5. Fill in your Supabase project URL and public anon key in `.env.local`.
6. Follow the database steps below and set the server-only service role key.
7. Run `npm run dev` and open `http://localhost:3000`.

## 2. Configure Supabase
1. Create a project at https://supabase.com/.
2. In Project Settings → API, copy the Project URL and anon/public key into `.env.local`.
3. Copy `supabase/schema.sql` into Supabase → SQL Editor and run it.
4. In Project Settings → API Keys, copy the `service_role` secret key. Add it to `.env.local` as:
   `SUPABASE_SERVICE_ROLE_KEY=...`
5. Never put `SUPABASE_SERVICE_ROLE_KEY` in a `NEXT_PUBLIC_` variable and never expose it in browser code.
6. Restart the local dev server.

Example `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVER_ONLY_SERVICE_ROLE_KEY
```

The public anon key is not sufficient to create bookings with this starter because writes happen through the server API. The server uses the service-role secret, validates allowed vehicle/service values, and inserts a pending request. Add rate limiting/CAPTCHA before production to reduce spam.

## 3. Test the booking form
1. Start `npm run dev`.
2. Fill in the booking form and submit.
3. In Supabase → Table Editor → `booking_requests`, check that a row is created.
4. If not configured, the form deliberately shows a service-not-configured message rather than pretending a booking succeeded.

Important: the current form creates a **booking request**, not a confirmed appointment. No real availability checks, automatic email/SMS, or double-booking prevention are included yet.

## 4. Deploy to Vercel
1. Create a private GitHub repository and upload the project files.
2. Sign in to https://vercel.com/ and import that repository.
3. Add these environment variables in Vercel → Project → Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only secret)
4. Deploy. Check the deployment build logs if anything fails.
5. Add your purchased domain in Vercel → Project → Settings → Domains.
6. Follow the DNS records Vercel displays at your domain registrar. DNS propagation can take time.
7. Submit a test booking and verify it appears in Supabase.

## 5. Production checklist — do not skip
This is a working starter for booking requests, **not yet a complete production booking system**:
- Implement Supabase Auth and enforce an admin allowlist before building any dashboard that can read customer data.
- Build protected admin routes and status updates; the current `/admin` page is informational only.
- Implement real availability slots, business hours, service durations, transactional conflict prevention, and double-booking protection.
- Add rate limiting and/or CAPTCHA to the public form.
- Configure email notifications and consent/privacy text reviewed for your business.
- Add a privacy policy and terms appropriate to your jurisdiction (GDPR).
- Configure backups, monitoring, and error reporting.
- Add server-side date validation and timezone handling for Europe/Athens.
- Test accessibility, mobile browsers, security, and deployment before advertising the site.
- Add business phone, address, social links, real images/logo, and final service/pricing list.

## Routes
- `/` public landing page and request form
- `/api/bookings` server-side booking request endpoint
- `/admin` placeholder; no customer data is exposed there

## Security notes
- Never commit `.env.local`.
- Never expose the service-role key in the browser or public repository.
- Keep the Supabase table private; RLS is enabled and no public read policy exists.
- The public API endpoint needs rate limiting/CAPTCHA before production use.
