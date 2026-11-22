# Webikode (React + Vite)

    npm install
    npm run dev      # http://localhost:5173
    npm run build    # production build in dist/

## Structure
- `src/styles/tokens.css`: ALL colors, fonts, spacing, radius, light/dark themes. Change the look here.
- `src/data/`: all copy and placeholder content (products, FAQ, nav, AI Lab). Replace with API data later.
- `src/components/ui/`: Button, Card/Tile, Section, Field. `layout/`: Navbar, Footer, Layout, theme toggle.
- `src/sections/home/`: one file per homepage section (AI Lab is its own folder). `src/pages/Home.jsx` sets the order.
- `src/pages/`: Home, About, Portfolio, FAQ, Contact, NotFound. Routes live in `src/App.jsx`.

## Notes
- Dark mode: toggle in the navbar; saved in localStorage; falls back to the OS setting.
- Contact, newsletter, and AI configurator submissions are sent by the serverless `api/submissions.js` endpoint using Resend.
- Configure `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `EMAIL_FROM` in your deployment's environment variables. Set `CONTACT_TO_EMAIL` to `kashafabdullah01@gmail.com`; `EMAIL_FROM` must use a sender domain verified in Resend. Keep the API key private and never add it to frontend code.
- Project call bookings use the same endpoint to check Google Calendar availability, create a 30-minute event, invite the requester, and email the booking details. To enable it, enable the Google Calendar API in Google Cloud, authorize the account whose calendar should receive bookings, and create an offline OAuth refresh token with the `https://www.googleapis.com/auth/calendar.events` and `https://www.googleapis.com/auth/calendar.freebusy` scopes. Configure `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, and optionally `GOOGLE_CALENDAR_ID` (`primary` by default) in Vercel. Store all credentials only as server environment variables. The booking form also requires the existing Resend variables above.
- The booking form posts to `/api/submissions`; its email field is used to invite the requester to the calendar event. The notification email is controlled by `CONTACT_TO_EMAIL`.
- Newsletter signups are emailed as notifications; no mailing list is created or managed by this app.
- Use `vercel dev` to test the API locally; plain `npm run dev` only starts the Vite frontend and does not provide the serverless endpoint.
- Run the submission API tests with `node --test api/submissions.test.js`.
- Login / Get Started currently point to /contact until auth pages exist.
- Deploying to Vercel/Netlify: add a rewrite of all paths to `/index.html` so routes like /about work on refresh.
