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
| Phone / WhatsApp, socials, hours, address, map | `src/config.js` |
| Section wording, events, headlines   | `index.html`              |
| Colours, fonts, spacing              | `src/styles.css` (top of file: **DESIGN TOKENS**) |
| Photos                               | `public/img/`             |

### ⚠️ Before going live — replace these placeholders (all marked `TODO`)

In `src/config.js`:
- **`whatsapp`** — the venue's WhatsApp number, international format, digits only
  (e.g. `60128889999`). Powers the "Book on WhatsApp" button, the floating
  button, and the form.
- **`tiktok`** — paste the TikTok profile URL, or leave `''` to hide the link.
- **`formspreeId`** — optional. Make a free form at
  [formspree.io](https://formspree.io) and paste its ID to have the reservation
  form email you. **Until you do, the form still works** — it opens a pre-filled
  WhatsApp message instead.
- **`address` / `mapsUrl` / `mapsEmbed`** — swap in the exact street address and
  the real Google Maps link/embed for the venue.

## Photos

The six venue photos in `public/img/` were cropped from phone screenshots.
For the sharpest result, replace them with the original full-resolution images
from the venue's own camera / Instagram — keep the same filenames and they'll
drop straight in.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repo.
2. Run `npm run build` and publish the `/dist` folder, **or** add the GitHub
   Pages Action. `vite.config.js` already uses a relative base (`./`) so it
   works from any repo path.

---

Built for BÀM Bar · ESTD 2026.
