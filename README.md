# NEXUSSTORE 🎮

A dark, neon-themed digital game storefront built with **Astro 5**, **Tailwind CSS 4** and a small **SQLite/libSQL backend**. Portfolio project: the catalog is managed from an authenticated admin panel and served from a database, and guest checkout persists real orders (no real payment).

**Live demo:** https://project-game-store.vercel.app

> 💳 The checkout is simulated. Use test card `4242 4242 4242 4242` — no payment is processed. Confirmed orders get generated demo keys and are stored in the database; look one up again at `/orders` with its code + email.

## Features

- 🗂️ **Database-backed catalog** — games live in a libSQL/SQLite table (Drizzle ORM). Home, `/game/[slug]` and `/genre/[slug]` render on-demand, so catalog edits are live immediately.
- 🔐 **Admin panel** (`/admin`) — session auth (scrypt password hashing, httpOnly cookie, route middleware). Create / edit / delete games through a Zod-validated form; review orders.
- 🛒 **Cart & wishlist** — `localStorage`-backed, with live header badges, quantity steppers, totals and empty states.
- 💳 **Guest checkout with real orders** — `POST /api/checkout` re-validates every game and recomputes prices **server-side**, generates one key per unit, and persists the order. Confirmation page + `/orders` lookup read from the database.
- 🔍 **Instant search** — client-side over an on-demand `/games.json` index.
- 🏷️ **Deals** — per-game discount percentages with strikethrough pricing and badges.
- 🔎 **SEO** — canonical URLs, Open Graph + Twitter Cards, on-demand `sitemap.xml` (includes every catalog page), `robots.txt`.
- ♿ **Accessibility** — skip-to-content, visible focus rings, `prefers-reduced-motion`, ARIA live regions, keyboard-accessible galleries and menus.
- 🔐 **Supply-chain hardening** — pnpm with lifecycle scripts blocked by default, a 3-day minimum release age, pinned overrides for vulnerable transitive deps.

## Tech stack

| Layer      | Choice                                                                    |
| :--------- | :----------------------------------------------------------------------- |
| Framework  | [Astro 5](https://astro.build) — static pages + on-demand routes, Vercel adapter |
| Styling    | [Tailwind CSS 4](https://tailwindcss.com) — CSS-first `@theme` tokens     |
| Language   | TypeScript (strict)                                                       |
| Database   | [libSQL](https://github.com/tursodatabase/libsql) / SQLite — local file in dev, [Turso](https://turso.tech) in prod |
| ORM        | [Drizzle ORM](https://orm.drizzle.team) + [Zod](https://zod.dev) validation |
| Auth       | Hand-rolled session auth (`node:crypto` scrypt), single admin user        |
| Carousel   | [Splide](https://splidejs.com)                                            |
| Fonts      | Montserrat + Nunito variable, self-hosted via Fontsource                  |
| Tooling    | pnpm · Prettier · GitHub Actions CI                                       |

## Getting started

```sh
git clone https://github.com/hccore25/project-game-store.git
cd project-game-store
pnpm install

cp .env.example .env        # dev defaults: file:./local.db + an admin user
pnpm db:migrate             # create the schema in local.db
pnpm db:seed                # load the 12 sample games from seed/games/
pnpm admin:create           # create the admin user from ADMIN_EMAIL / ADMIN_PASSWORD

pnpm dev                    # http://localhost:4321  ·  admin at /admin/login
```

| Command            | Action                                        |
| :----------------- | :-------------------------------------------- |
| `pnpm dev`         | Start the local dev server                     |
| `pnpm build`       | Build for Vercel (`dist/` + serverless bundle) |
| `pnpm check`       | Type-check `.astro` and `.ts` files            |
| `pnpm format`      | Format with Prettier                           |
| `pnpm db:generate` | Generate a Drizzle migration from the schema   |
| `pnpm db:migrate`  | Apply pending migrations                        |
| `pnpm db:studio`   | Open Drizzle Studio                            |
| `pnpm db:seed`     | Seed the catalog from `seed/games/*.json`       |
| `pnpm admin:create`| Create / reset the admin user from env vars     |

## Project structure

```text
src/
├── components/        # Icon, GameCard, admin/GameForm...
├── data/              # Genres and SVG icon registry
├── layouts/           # Store layout + AdminLayout
├── lib/
│   ├── db/            # Drizzle client + schema
│   ├── schema.ts      # Shared Zod schema for a game
│   ├── games.ts       # Catalog reads + admin mutations
│   ├── auth.ts        # scrypt hashing, sessions
│   ├── orders.ts      # Checkout, order lookup
│   └── admin-form.ts  # Form <-> Zod glue for the panel
├── middleware.ts      # Guards /admin/* and /api/admin/*
├── pages/
│   ├── admin/         # login, catalog, game form, orders
│   ├── api/           # admin/*, checkout, sitemap
│   ├── game/[slug]    # on-demand catalog pages
│   ├── genre/[slug]
│   └── order-confirmation/[id]
├── styles/            # Tailwind v4 @theme tokens
└── utils/             # Cart/wishlist store, price formatting

seed/games/            # Sample catalog (seed data only; not read at runtime)
drizzle/               # Generated SQL migrations (committed)
scripts/               # seed.ts, create-admin.ts
```

## Deploying to Vercel + Turso

1. **Create a Turso database** at [turso.tech](https://turso.tech) and grab its URL and an auth token.
2. **Import the repo** at [vercel.com/new](https://vercel.com/new) — the Astro preset is detected automatically.
3. **Set environment variables** in the Vercel project:
   - `DATABASE_URL` — `libsql://<your-db>.turso.io`
   - `DATABASE_AUTH_TOKEN` — the Turso token
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD` — only needed to run `admin:create` (below)
4. **Initialise the production database** once, from your machine, pointing at Turso:
   ```sh
   DATABASE_URL=... DATABASE_AUTH_TOKEN=... pnpm db:migrate
   DATABASE_URL=... DATABASE_AUTH_TOKEN=... pnpm db:seed
   DATABASE_URL=... DATABASE_AUTH_TOKEN=... ADMIN_EMAIL=... ADMIN_PASSWORD=... pnpm admin:create
   ```
5. **Deploy.** If the assigned URL differs from `project-game-store.vercel.app`, update `site` in `astro.config.mjs` and the URL in `public/robots.txt`.

## Design system

Semantic color tokens live in [`src/styles/global.css`](src/styles/global.css) — swapping the theme means editing seven lines.

| Token              | Color                   | Role                        |
| :----------------- | :---------------------- | :-------------------------- |
| `nexus-background` | Ink Black `#0c1618`     | Page background             |
| `nexus-surface`    | Derived teal `#11302d`  | Cards, borders, menus       |
| `nexus-teal`       | Pine Teal `#004643`     | Badges, secondary accents   |
| `nexus-primary`    | Yellow Green `#9fcc2e`  | CTAs, prices, active states |
| `nexus-accent`     | Peach Glow `#f6be9a`    | Tags, links, highlights     |
| `nexus-text`       | Lavender Mist `#ece5f0` | Headings and body text      |
| `nexus-muted`      | Derived `#94a8a5`       | Secondary text              |

## Notes

- All games, developers, dates and content are fictional — a demo catalog, not real products.
- No real payments, no shopper accounts: checkout is guest-only and the "payment" step is cosmetic.
