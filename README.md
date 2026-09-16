# Sai Koushik — Portfolio

**Live at [koushikmediboyina.github.io](https://koushikmediboyina.github.io)**

Backend developer in Hyderabad. I build the parts of software nobody sees — the APIs, the data model, the access rules, the real-time updates — and make sure they hold up.

Currently a software developer at Leap India, working on the backend of a construction project management platform: REST APIs in Node.js and Express, a PostgreSQL schema, role-based access control, and a WebSocket layer that keeps every site and office in sync. Graduating 2026 with a B.Tech in CSE from SRM University AP, and looking for a backend role.

This repository is the source for that site.

## Built with

Plain HTML, CSS and JavaScript. No framework, no build step, no dependencies — the repository is what ships, served straight from GitHub Pages as static files.

The whole site is about 170 KB including the portrait and resume PDF, so it loads in one round trip on a slow connection.

A few things I cared about while building it:

- **Cyanotype blueprint theme** — a portrait that develops its colour on hover, a timeline drawn as you scroll, and project cards that tilt like sheets on a drafting table.
- **Motion is optional** — every animation is gated behind `prefers-reduced-motion`, in both the stylesheet and the JavaScript.
- **Works without JavaScript** — content is in the markup; JS only adds the interactions.
- **Responsive** at 900px and 640px breakpoints, down to phone width.

## Structure

```
index.html        all page content, one section per comment block
css/style.css     styles — design tokens are declared at the top
js/main.js        interactions: portrait, nav, timeline, project sheets
assets/           portrait, resume PDF, favicon
```

## Running it locally

Open `index.html` directly in a browser, or serve the folder:

```bash
npx serve .
```

## Contact

- **Email** — [saikoushik2k4@gmail.com](mailto:saikoushik2k4@gmail.com)
- **LinkedIn** — [saikoushikmediboyina](https://www.linkedin.com/in/saikoushikmediboyina)
- **Resume** — [PDF](assets/Sai_Koushik_Resume.pdf)
