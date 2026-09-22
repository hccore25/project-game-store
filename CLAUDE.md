# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # dev server at http://localhost:4321
pnpm build        # production build (Vercel serverless)
pnpm check        # type-check .astro + .ts (run before committing)
pnpm format       # Prettier (astro + tailwindcss plugins)

pnpm db:generate  # generate a Drizzle migration from schema changes
pnpm db:migrate   # apply pending migrations to local.db
pnpm db:push      # push schema directly without a migration file (dev only)
pnpm db:studio    # open Drizzle Studio GUI
pnpm db:seed      # load seed/games/*.json into the database
pnpm admin:create # create/reset the admin user from ADMIN_EMAIL + ADMIN_PASSWORD env vars
```

There are no test files; type-checking (`pnpm check`) is the primary correctness gate.

## Environment

Copy `.env.example` to `.env`. Required variables:
- `DATABASE_URL` — `file:./local.db` for dev, `libsql://<db>.turso.io` for prod
- `DATABASE_AUTH_TOKEN` — empty string for local SQLite, Turso token for prod
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — only needed to run `admin:create`

## Architecture

**Astro 5 SSR** with the `@astrojs/node` adapter (for VPS/Docker) and `@astrojs/vercel` for Vercel. All pages under `src/pages/game/`, `src/pages/genre/`, `src/pages/order-confirmation/`, and all API routes are on-demand (server-rendered). Static pages (`/`, `/cart`, `/wishlist`, etc.) are pre-rendered.

**Data layer** — Drizzle ORM over libSQL/SQLite. The single schema file is `src/lib/db/schema.ts` (tables: `games`, `admin_users`, `sessions`, `order_items`, `orders`). The db client is exported from `src/lib/db/index.ts`. Business logic lives in:
- `src/lib/games.ts` — catalog reads and admin mutations
- `src/lib/orders.ts` — guest checkout and order lookup
- `src/lib/auth.ts` — scrypt password hashing, session CRUD, cookie helpers
- `src/lib/schema.ts` — shared Zod schema for a game (used by API and admin form)
- `src/lib/admin-form.ts` — bridges the HTML form to the Zod schema for the admin panel

**Auth** is hand-rolled: scrypt via `node:crypto`, 30-day httpOnly session cookies. `src/middleware.ts` guards every `/admin/*` and `/api/admin/*` path and performs CSRF checks (Origin + `Sec-Fetch-Site` headers) for non-GET mutations. `context.locals.admin` holds the authenticated identity or `null`.

**Cart and wishlist** are `localStorage`-only (no server state). The store logic is in `src/utils/store.ts`.

**Checkout** (`POST /api/checkout`) is the only stateful public endpoint: it re-validates prices server-side, generates fictional game keys, and persists an order. The confirmation page and `/orders` lookup read from the database.

**Styling** — Tailwind CSS v4 using the CSS-first `@theme` API. Semantic design tokens (`nexus-*`) are defined in `src/styles/global.css`. The palette is dark/neon; do not introduce hardcoded hex values — use the token names.

**Schema changes** require running `pnpm db:generate` followed by `pnpm db:migrate`. Never edit files in `drizzle/` by hand; always regenerate them.
