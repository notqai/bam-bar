# Milus Cookies — website

Marketing site for **Milus Cookies** (wordmark "MiLUs", endorsement "by KopHjSarkawi"),
a soft-cookie brand. Vite + React + Tailwind CSS v4, static build, mobile-first.

> Status: **Phase 1 — homepage only.** Menu, Our Story, Gallery, Order & Find Us
> pages and the WhatsApp order builder come after the homepage direction is approved.

## Run it

```bash
npm install
npm run assets   # optimise images (+ video, if ffmpeg is installed) → public/
npm run dev      # http://localhost:5173/
npm run build    # production build → dist/
npm run preview
```

Deploy `dist/` to Netlify / Vercel / Cloudflare Pages. Because it is a single-page
app with client-side routing, add a rewrite of `/*` → `/index.html` on the host.

## Edit content without touching components

| I want to change…                                  | Edit                                   |
| -------------------------------------------------- | -------------------------------------- |
| Flavours, prices, bundle rule, "also in store"     | `src/data/menu.js`                     |
| WhatsApp number, Instagram, address, hours, copy   | `src/data/site.js`                     |
| Title, meta description, OG tags, JSON-LD          | `index.html`                           |
| Colours, fonts, animations                         | `src/index.css` (`@theme` block)       |
| Photos                                             | drop into `assets-source/`, run `npm run images` |
| Image crops (e.g. the S'mores card)                | `CROPS` list in `scripts/images.mjs`   |

Every unknown fact is a searchable **`TODO:`** in `src/data/`. Placeholders render
with a dashed outline in the UI so they are easy to spot during review.

## Assets pipeline

- `assets-source/` holds the untouched originals (ignore `assets-source/skip/`).
- `npm run images` writes WebP at 480/800/1200/1600 px (never upscaled; the native
  width is always included) to `public/images/`, plus favicon, apple-touch-icon and
  `og-image.jpg` derived from `logo.jpg`. It also writes
  `src/data/images.generated.json`, which the `<Pic>` component reads for
  `srcset`, `sizes`, `width`/`height` and lazy-loading.
- `npm run video` re-encodes `assets-source/display-case-pan.mp4` to a small MP4 +
  WebM with a poster frame (needs `ffmpeg` on PATH).
- A photo that has not arrived yet renders a labelled placeholder instead of
  breaking the layout.

### Assets still missing (as of the first commit)

Only `logo.jpg`, `crookie.jpg`, `display-case.jpg`, `four-flavours-rack.jpg` and
`smores-checkered.jpg` were received. Still needed, per the asset manifest:
`menu-graphic.jpg`, `hero-cookie-stack.jpg`, `basket-hazelnut-blackout.jpg`,
`blackout-rack.jpg`, `brownbutter-flatlay.jpg`, `brownbutter-basket.jpg`,
`brownbutter-box.jpg`, `red-velvet.jpg`, `cookie-pull-kitchen.jpg`,
`oven-raw-minis.jpg`, `oven-baked-minis.jpg`, `display-case-pan.mp4`.
Drop them into `assets-source/`, run `npm run assets`, then remove the
temporary `*-fallback` crops in `scripts/images.mjs` and point the flavour
cards / hero back at the real photos in `src/data/`.

## Brand rules baked into the theme

- Orange `#FC6418` primary; yellow `#FFFF05` accent only (badges, the dot), never a
  background and never under white text; maroon `#691F20` headings/dark sections;
  cream `#F9F5E9` page background; warm white `#FFF6ED` for large bold text on orange;
  dark chocolate `#2A0F0F` for small text on orange or yellow.
- Fredoka (rounded heavy sans) for the wordmark, buttons and playful headlines;
  Fraunces (chunky serif) in maroon for section headings and flavour names;
  DM Sans for body. All self-hosted via Fontsource with fallback stacks.
- Motion respects `prefers-reduced-motion`; the video also skips autoplay on
  data-saver connections.
