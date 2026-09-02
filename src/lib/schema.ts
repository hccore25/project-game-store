import { z } from "zod";
import { es } from "zod/locales";

// Mensajes de validación en español (panel de administración).
z.config(es());

/**
 * Esquema canónico de un juego del catálogo.
 * Se comparte entre: el seed de la base de datos (`seed/games/*.json`)
 * y el panel de administración.
 */
export const gameSchema = z.object({
  title: z.string().min(1),
  edition: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  discountPercent: z.number().min(1).max(90).optional(),
  tag: z.enum(["new", "bestseller"]).optional(),
  isNew: z.boolean().default(false),
  featured: z.boolean().default(false),
  preorder: z.boolean().default(false),
  genres: z.array(z.string()).min(1),
  platforms: z.array(z.enum(["PC", "PS"])).min(1),
  developer: z.string().min(1),
  releaseDate: z.string().min(1),
  rating: z.string().min(1),
  systemReq: z.object({
    min: z.string().min(1),
    rec: z.string().min(1),
  }),
  image: z.url(),
  gallery: z.array(z.url()).default([]),
});

export type GameData = z.infer<typeof gameSchema>;

/** Slug URL-safe derivado del título (o editable a mano en el panel). */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
