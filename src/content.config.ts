import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const games = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/games" }),
  schema: z.object({
    title: z.string(),
    edition: z.string(),
    description: z.string(),
    price: z.number().positive(),
    discountPercent: z.number().min(1).max(90).optional(),
    tag: z.enum(["new", "bestseller"]).optional(),
    isNew: z.boolean().default(false),
    featured: z.boolean().default(false),
    preorder: z.boolean().default(false),
    genres: z.array(z.string()),
    platforms: z.array(z.enum(["PC", "PS"])).min(1),
    developer: z.string(),
    releaseDate: z.string(),
    rating: z.string(),
    systemReq: z.object({
      min: z.string(),
      rec: z.string(),
    }),
    image: z.string().url(),
    gallery: z.array(z.string().url()).default([]),
  }),
});

export const collections = { games };
