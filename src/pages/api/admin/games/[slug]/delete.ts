import type { APIRoute } from "astro";
import { deleteGame, getGame } from "../../../../../lib/games";

export const prerender = false;

export const POST: APIRoute = async ({ params, redirect }) => {
  const slug = params.slug;
  if (!slug) return redirect("/admin", 303);

  const game = await getGame(slug);
  if (game) await deleteGame(slug);

  return redirect(`/admin?deleted=${slug}`, 303);
};
