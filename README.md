# BÀM Bar — Miri

Official website for BÀM Bar, Miri, Sarawak. Single-page, mobile-first, built
with plain HTML + CSS + JS on [Vite](https://vitejs.dev/). No framework.

## Run it

```bash
npm install      # first time only
npm run dev      # start local dev server → http://localhost:5173
npm run build    # production build into /dist
npm run preview  # preview the production build
```

## Edit your content (no coding needed)

Almost everything you'll want to change lives in **two files**:

| I want to change…                    | Edit this file            |
| ------------------------------------ | ------------------------- |
| Menu items, prices, categories       | `src/menu.js`             |
| Weekly events / DJ nights            | `src/events.js`           |
| Phone / WhatsApp, booking email, socials, hours, address, map | `src/config.js` |
| Section wording, headlines           | `index.html`              |
| Colours, fonts, spacing              | `src/styles.css` (top of file: **DESIGN TOKENS**) |
| Photos                               | `public/img/`             |


## Weekly routine: updating the DJ line-up

1. Drop the new poster into `public/img/` (portrait, ~1080px wide is plenty).
2. Open `src/events.js` and edit the night's `name`, `desc`, `image` and `poster`.
3. Run `./deploy.sh`. Live in about a minute.

The booking form's date hint ("DJ night 🎧") reads from the same file, so it
stays in sync automatically.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repo.
2. Run `npm run build` and publish the `/dist` folder, **or** add the GitHub
   Pages Action. `vite.config.js` already uses a relative base (`./`) so it
   works from any repo path.

---

Built for BÀM Bar · ESTD 2026.
