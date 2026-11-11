import { asc, eq } from "drizzle-orm";
import { db } from "./db";
import { games } from "./db/schema";
import type { GameRow, NewGameRow } from "./db/schema";
import type { GameData } from "./schema";

/**
 * Entrada de catálogo con la misma forma que exponía la colección de
 * contenido de Astro (`{ id, data }`), para que los componentes que la
 * consumían sigan funcionando sin cambios de fondo.
 */
export interface GameEntry {
  id: string;
  data: GameData;
}

/** Fila plana de la DB → objeto anidado del dominio. */
function rowToEntry(row: GameRow): GameEntry {
  return {
    id: row.slug,
    data: {
      title: row.title,
      edition: row.edition,
      description: row.description,
      price: row.price,
      discountPercent: row.discountPercent ?? undefined,
      tag: row.tag ?? undefined,
      isNew: row.isNew,
      featured: row.featured,
      preorder: row.preorder,
      genres: row.genres,
      platforms: row.platforms,
      developer: row.developer,
      releaseDate: row.releaseDate,
      rating: row.rating,
      systemReq: { min: row.systemReqMin, rec: row.systemReqRec },
      image: row.image,
      gallery: row.gallery ?? [],
    },
  };
}

/** Objeto del dominio → columnas de la DB (para insertar / actualizar). */
export function dataToRow(slug: string, data: GameData): NewGameRow {
  return {
    slug,
    title: data.title,
    edition: data.edition,
    description: data.description,
    price: data.price,
    discountPercent: data.discountPercent ?? null,
    tag: data.tag ?? null,
    isNew: data.isNew,
    featured: data.featured,
    preorder: data.preorder,
    genres: data.genres,
    platforms: data.platforms,
    developer: data.developer,
    releaseDate: data.releaseDate,
    rating: data.rating,
    systemReqMin: data.systemReq.min,
    systemReqRec: data.systemReq.rec,
    image: data.image,
    gallery: data.gallery,
    updatedAt: new Date(),
  };
}

/** Juegos para el hero slider: featured → isNew → bestseller, dedup, max 6. */
export async function listHeroGames(
  prefetched?: GameEntry[],
): Promise<GameEntry[]> {
  const all = prefetched ?? (await listGames());
  const seen = new Set<string>();
  const result: GameEntry[] = [];
  const add = (g: GameEntry) => {
    if (!seen.has(g.id)) {
      seen.add(g.id);
      result.push(g);
    }
  };
  all.filter((g) => g.data.featured).forEach(add);
  all.filter((g) => g.data.isNew).forEach(add);
  all.filter((g) => g.data.tag === "bestseller").forEach(add);
  return result.slice(0, 6);
}

/** Todo el catálogo, ordenado alfabéticamente por título. */
export async function listGames(): Promise<GameEntry[]> {
  const rows = await db.select().from(games).orderBy(asc(games.title));
  return rows.map(rowToEntry);
}

/** Un juego por su slug, o `null` si no existe. */
export async function getGame(slug: string): Promise<GameEntry | null> {
  const row = await db.select().from(games).where(eq(games.slug, slug)).get();
  return row ? rowToEntry(row) : null;
}

/** Juegos que incluyen el género dado. */
export async function listGamesByGenre(genreSlug: string): Promise<GameEntry[]> {
  const all = await listGames();
  return all.filter((game) => game.data.genres.includes(genreSlug));
}

/** ¿Existe ya un juego con este slug? */
export async function gameExists(slug: string): Promise<boolean> {
  const row = await db
    .select({ slug: games.slug })
    .from(games)
    .where(eq(games.slug, slug))
    .get();
  return Boolean(row);
}

/** Alta (panel). Falla si el slug ya está tomado. */
export async function createGame(slug: string, data: GameData): Promise<void> {
  await db.insert(games).values({ ...dataToRow(slug, data), createdAt: new Date() });
}

/** Edición (panel). */
export async function updateGame(slug: string, data: GameData): Promise<void> {
  const row = dataToRow(slug, data);
  // El slug es la PK: no se reescribe al editar.
  const { slug: _omit, ...rest } = row;
  await db.update(games).set(rest).where(eq(games.slug, slug));
}

/** Baja (panel). */
export async function deleteGame(slug: string): Promise<void> {
  await db.delete(games).where(eq(games.slug, slug));
}
