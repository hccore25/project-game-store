import type { APIRoute } from "astro";
import { listGames } from "../lib/games";
import { genres } from "../data/genres";

/**
 * Sitemap generado on-demand: incluye las páginas de juego y de género
 * del catálogo actual (que ya no existen en build). Excluye admin, API,
 * checkout y confirmaciones de pedido.
 */
export const prerender = false;

const STATIC_PATHS = [
  "/",
  "/wishlist",
  "/orders",
  "/faq",
  "/support",
  "/contact",
  "/terms",
  "/privacy",
  "/cookies",
];

export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL("https://project-game-store.vercel.app")).origin;
  const games = await listGames();

  const paths = [
    ...STATIC_PATHS,
    ...genres.map((g) => `/genre/${g.slug}`),
    ...games.map((g) => `/game/${g.id}`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${base}${path}</loc></url>`).join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
