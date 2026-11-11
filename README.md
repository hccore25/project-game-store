<div align="center">
  <img src="public/favicon.svg" alt="Hernán Cubillos Logo" width="64" height="64" />
  <h1>Hernán Cubillos Store</h1>
  <p>A full-stack, dark-themed digital game storefront built with Astro 5, TypeScript, Tailwind CSS v4, and Turso (libSQL).</p>

  <p>
    <a href="https://store.hernancubillos.dev"><strong>Explore Live Demo &raquo;</strong></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Astro_5-BC52EE?style=flat-square&logo=astro&logoColor=white" alt="Astro 5" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
    <img src="https://img.shields.io/badge/Turso_/_libSQL-00E599?style=flat-square" alt="Turso libSQL" />
    <img src="https://img.shields.io/badge/Node.js_SSR-5FA04E?style=flat-square&logo=node.js&logoColor=white" alt="Node.js SSR" />
  </p>

  <p>
    <strong>English</strong> | <a href="README.es.md">Versión en Español</a>
  </p>
</div>

---

> [!NOTE]
> **Simulated Checkout:** Orders and payment processing are simulated for demonstration purposes. Use test card `4242 4242 4242 4242`. Confirmed orders generate demo license keys stored in the database, retrievable anytime at `/orders` using order code and email.

## Overview

Hernán Cubillos Store is an e-commerce portfolio application replicating the end-to-end user experience and backend logic of a modern digital gaming distribution platform.

It provides an interactive storefront, persistent cart and wishlist, real-time client-side search, an authenticated administrative dashboard for catalog management, and server-side order validation.

## Key Features

- **Database-Backed Catalog:** Games are persisted in a libSQL/SQLite database via Drizzle ORM. Product detail pages (`/game/[slug]`) and genre views (`/genre/[slug]`) render on-demand via SSR for instant content updates.
- **Admin Panel (`/admin`):** Secure administration dashboard to manage games (create, update, delete) and inspect customer orders with live status filtering.
- **Client-Side Reactive Cart & Wishlist:** Built with Nanostores and `localStorage` synchronization, featuring real-time badge counters, price subtotals, quantity controls, and empty-state messaging.
- **Server-Validated Checkout:** The checkout endpoint (`POST /api/checkout`) enforces strict data validation using Valibot, recalculates product prices directly from the database to prevent client manipulation, and issues unique digital license keys per item.
- **Optimized Media Assets:** High-resolution local WebP artwork with strict caching headers, prioritized hero loading (`fetchpriority="high"` on initial slide), and responsive lazy-loading for off-screen slides and gallery thumbnails.
- **Instant Search:** Fast client-side catalog search powered by an on-demand generated `/games.json` search index.
- **SEO & Accessibility:** Fully server-rendered metadata, Open Graph & Twitter Cards, dynamic `sitemap.xml`, visible focus rings, keyboard navigation, and `prefers-reduced-motion` compliance.

## Security & Architecture

- **Session Authentication:** Implements password hashing with `node:crypto` `scrypt` using unique cryptographically secure salts. Authentication checks utilize `timingSafeEqual` and dummy hash verification to neutralize user enumeration and timing attacks.
- **Route Protection & Middleware:** Astro server middleware guards all administrative routes (`/admin/*`) and API mutations (`/api/admin/*`) using secure, `httpOnly`, `sameSite: "lax"` session cookies.
- **Anti-CSRF Verification:** State-changing requests (`POST`, `PUT`, `DELETE`) are inspected at the middleware level, validating `Sec-Fetch-Site` and `Origin` headers before payload execution.
- **Brute-Force & Rate Limiting:** In-memory sliding-window rate limiters safeguard sensitive endpoints, including admin login attempts (`/api/admin/login`) and checkout submissions (`/api/checkout`).
- **Containerized Deployment:** Multi-stage `Dockerfile` executing under a non-root user (`USER node`) via the `@astrojs/node` standalone adapter.

## Tech Stack

| Layer                | Technology                                                                                                                |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **Framework**        | [Astro 5](https://astro.build) — On-demand SSR with standalone Node.js adapter                                            |
| **Language**         | TypeScript (Strict mode enabled)                                                                                          |
| **Styling**          | [Tailwind CSS v4](https://tailwindcss.com) — Semantic theme tokens and utility classes                                    |
| **Database**         | [libSQL](https://github.com/tursodatabase/libsql) / SQLite — Local file in dev, [Turso](https://turso.tech) in production |
| **ORM & Validation** | [Drizzle ORM](https://orm.drizzle.team) + [Valibot](https://valibot.dev) / [Zod](https://zod.dev) schemas                 |
| **State Management** | [Nanostores](https://github.com/nanostores/nanostores) (`persistentAtom`)                                                 |
| **Carousel**         | [Splide.js](https://splidejs.com)                                                                                         |
| **Typography**       | Montserrat & Nunito variable fonts (self-hosted via Fontsource)                                                           |

## Project Structure

```text
src/
├── components/          # Reusable UI components (HeroSlider, GameCard, Logo, etc.)
│   └── admin/           # Admin-specific components and form partials
├── data/                # Genre definitions and SVG icon registry
├── layouts/             # Base layouts (Storefront Layout and AdminLayout)
├── lib/
│   ├── auth.ts          # scrypt password hashing, session tokens, verification
│   ├── games.ts         # Catalog query helpers and mutation procedures
│   ├── orders.ts        # Checkout validation, key generation, order lookup
│   ├── rate-limit.ts    # Sliding-window IP rate limiting
│   ├── schema.ts        # Valibot schemas for product validation
│   └── db/              # Drizzle ORM client and database schema definitions
├── middleware.ts        # Global middleware: session auth and CSRF enforcement
├── pages/
│   ├── admin/           # Admin dashboard, catalog list, game editor, order review
│   ├── api/             # REST endpoints (checkout, admin auth, mutations)
│   ├── game/[slug].astro# Dynamic product detail page
│   ├── genre/[slug].astro Dynamic category/genre page
│   └── orders.astro     # Order verification lookup page
└── styles/              # Global styles and Tailwind v4 theme definitions

public/images/games/     # High-efficiency WebP game covers and screenshot galleries
seed/games/              # Initial catalog dataset (JSON definitions)
scripts/                 # Database migration and administrative seed utilities
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [pnpm](https://pnpm.io/) (v9+)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/hccore25/project-game-store.git
   cd project-game-store
   ```

2. Install dependencies:

   ```sh
   pnpm install
   ```

3. Set up environment variables:

   ```sh
   cp .env.example .env
   ```

   _(Default environment values use a local SQLite database at `local.db` and sample admin credentials)._

4. Initialize the database and load catalog seed data:

   ```sh
   pnpm db:migrate
   pnpm db:seed
   pnpm admin:create
   ```

5. Start the local development server:
   ```sh
   pnpm dev
   ```

The application will be accessible at `http://localhost:4321`. Access the administrative dashboard at `http://localhost:4321/admin/login`.

## Available Scripts

| Command             | Description                                                            |
| :------------------ | :--------------------------------------------------------------------- |
| `pnpm dev`          | Starts the local development server with hot-reload                    |
| `pnpm build`        | Builds the production bundle (`dist/`) using `@astrojs/node`           |
| `pnpm preview`      | Runs the production build locally for verification                     |
| `pnpm check`        | Runs Astro and TypeScript type checks across the codebase              |
| `pnpm format`       | Formats the codebase using Prettier                                    |
| `pnpm db:generate`  | Generates a new SQL migration from Drizzle schema definitions          |
| `pnpm db:migrate`   | Applies pending SQL migrations to the database                         |
| `pnpm db:seed`      | Populates the database with default catalog games                      |
| `pnpm admin:create` | Creates or resets the administrator account from environment variables |

## License & Notes

- All video games, publisher names, release dates, and product summaries featured in this demo are fictional.
- Designed and developed by **Hernán Cubillos**.
- Released under the [MIT License](LICENSE).
