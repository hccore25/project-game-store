import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { finalPrice } from "../utils/format";

/**
 * Índice estático del catálogo para la búsqueda client-side.
 * Se genera en build como /games.json.
 */
export const GET: APIRoute = async () => {
  const games = await getCollection("games");

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
