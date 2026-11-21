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
- Forms (contact, newsletter, AI configurator) are front-end only. Search for `TODO` to wire APIs.
- Login / Get Started currently point to /contact until auth pages exist.
- Deploying to Vercel/Netlify: add a rewrite of all paths to `/index.html` so routes like /about work on refresh.
