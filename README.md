# NEXUSSTORE 🎮

A dark, neon-themed digital game storefront built with **Astro 5** and **Tailwind CSS 4**. This is a portfolio project: the entire store experience — cart, wishlist, search, deals and checkout — works end to end **without a backend**, using a fully static build and `localStorage` persistence.

**Live demo:** https://project-game-store.vercel.app

> 💳 The checkout is simulated. Use test card `4242 4242 4242 4242` — no real payment is processed, and "purchased" games receive generated demo keys.

## Features

- 🗂️ **Content-driven catalog** — 12 games defined as JSON content collections, validated with a Zod schema. Game pages (`/game/[slug]`) and genre pages (`/genre/[slug]`) are generated at build time.
- 🛒 **Working cart & wishlist** — `localStorage`-backed store with live header badges, quantity steppers, totals and empty states.
- 💳 **Simulated checkout** — validated payment form, fake processing state, and an order confirmation page with generated game keys (one per unit).
- 🔍 **Instant search** — client-side search over a static `/games.json` index (title, edition, genre).
- 🏷️ **Deals** — per-game discount percentages with strikethrough pricing and badges.
- 🔎 **SEO** — canonical URLs, Open Graph + Twitter Cards (per-page image/description), sitemap and robots.txt.
- ♿ **Accessibility** — skip-to-content link, visible focus rings, `prefers-reduced-motion` support (CSS + slider autoplay), ARIA live regions, keyboard-accessible galleries and menus.
- ⚡ **Performance** — catalog images optimized to WebP at build time with `astro:assets` (explicit dimensions, zero CLS), self-hosted variable fonts, zero render-blocking CDNs.
- 🔐 **Supply-chain hardening** — pnpm with lifecycle scripts blocked by default, a 3-day minimum release age for new package versions, and pinned overrides for vulnerable transitive deps.

## Tech stack

| Layer     | Choice                                                                       |
| :-------- | :--------------------------------------------------------------------------- |
| Framework | [Astro 5](https://astro.build) (static output)                               |
| Styling   | [Tailwind CSS 4](https://tailwindcss.com) — CSS-first `@theme` design tokens |
| Language  | TypeScript (strict)                                                          |
| Carousel  | [Splide](https://splidejs.com) (bundled from npm)                            |
| Fonts     | Montserrat + Nunito variable, self-hosted via Fontsource                     |
| Tooling   | pnpm · Prettier · GitHub Actions CI                                          |

## Design system

The palette lives as semantic tokens in [`src/styles/global.css`](src/styles/global.css) — swapping the theme means editing seven lines:

| Token              | Color                   | Role                        |
| :----------------- | :---------------------- | :-------------------------- |
| `nexus-background` | Ink Black `#0c1618`     | Page background             |
| `nexus-surface`    | Derived teal `#11302d`  | Cards, borders, menus       |
| `nexus-teal`       | Pine Teal `#004643`     | Badges, secondary accents   |
| `nexus-primary`    | Yellow Green `#9fcc2e`  | CTAs, prices, active states |
| `nexus-accent`     | Peach Glow `#f6be9a`    | Tags, links, highlights     |
| `nexus-text`       | Lavender Mist `#ece5f0` | Headings and body text      |
| `nexus-muted`      | Derived `#94a8a5`       | Secondary text              |

## Getting started

```sh
git clone https://github.com/hccore25/project-game-store.git
cd project-game-store
pnpm install
pnpm dev
```

The dev server starts at `http://localhost:4321`.

| Command        | Action                               |
| :------------- | :----------------------------------- |
| `pnpm dev`     | Start the local dev server           |
| `pnpm build`   | Build the static site to `./dist/`   |
| `pnpm preview` | Preview the production build locally |
| `pnpm check`   | Type-check `.astro` and `.ts` files  |
| `pnpm format`  | Format the codebase with Prettier    |

## Project structure

```text
src/
├── components/      # Icon, GameCard, GenreCard, Toast, PriceDisplay...
├── content/games/   # Game catalog (one JSON per game, Zod-validated)
├── data/            # Genres and SVG icon registry
├── layouts/         # Base layout with SEO meta
├── pages/           # Home, game/genre pages, cart, checkout, wishlist, 404
├── styles/          # Tailwind v4 @theme design tokens
└── utils/           # Cart/wishlist/order store, price formatting
```

## Deploying to Vercel

1. Import the repository at [vercel.com/new](https://vercel.com/new) — the Astro preset is detected automatically and pnpm is used via the `packageManager` field.
2. Deploy. No environment variables or adapters are needed (fully static output).
3. If the assigned URL differs from `project-game-store.vercel.app`, update `site` in [`astro.config.mjs`](astro.config.mjs) and the sitemap URL in [`public/robots.txt`](public/robots.txt).
