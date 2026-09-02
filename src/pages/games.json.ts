import type { APIRoute } from "astro";
import { listGames } from "../lib/games";
import { finalPrice } from "../utils/format";

/**
 * Índice del catálogo para la búsqueda client-side (`/games.json`).
 * On-demand: refleja los cambios del panel al instante.
 */
export const prerender = false;

export const GET: APIRoute = async () => {
  const games = await listGames();

  const index = games.map((game) => ({
    slug: game.id,
    title: game.data.title,
    edition: game.data.edition,
    image: game.data.image,
    price: game.data.price,
    discountPercent: game.data.discountPercent ?? null,
    finalPrice: finalPrice(game.data.price, game.data.discountPercent),
    genres: game.data.genres,
  }));

  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json" },
  });
};
