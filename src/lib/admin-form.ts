import { z } from "zod";
import { genres } from "../data/genres";
import { gameSchema, slugify } from "./schema";
import type { GameData } from "./schema";

export const GENRE_OPTIONS = genres.map((g) => ({
  value: g.slug,
  label: g.name,
}));
export const PLATFORM_OPTIONS = ["PC", "PS"] as const;
export const TAG_OPTIONS = ["", "new", "bestseller"] as const;

/** Valores crudos de un formulario del panel (todo string / string[]). */
export interface GameFormValues {
  slug: string;
  title: string;
  edition: string;
  description: string;
  price: string;
  discountPercent: string;
  tag: string;
  isNew: boolean;
  featured: boolean;
  preorder: boolean;
  genres: string[];
  platforms: string[];
  developer: string;
  releaseDate: string;
  rating: string;
  systemReqMin: string;
  systemReqRec: string;
  image: string;
  gallery: string;
}

export function emptyGameForm(): GameFormValues {
  return {
    slug: "",
    title: "",
    edition: "",
    description: "",
    price: "",
    discountPercent: "",
    tag: "",
    isNew: false,
    featured: false,
    preorder: false,
    genres: [],
    platforms: [],
    developer: "",
    releaseDate: "",
    rating: "",
    systemReqMin: "",
    systemReqRec: "",
    image: "",
    gallery: "",
  };
}

/** Entrada del dominio (DB) → valores de formulario para precargar la edición. */
export function gameDataToForm(slug: string, data: GameData): GameFormValues {
  return {
    slug,
    title: data.title,
    edition: data.edition,
    description: data.description,
    price: String(data.price),
    discountPercent:
      data.discountPercent != null ? String(data.discountPercent) : "",
    tag: data.tag ?? "",
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
    gallery: data.gallery.join("\n"),
  };
}

/** FormData del navegador → valores tipados del formulario. */
export function readGameForm(form: FormData): GameFormValues {
  const str = (k: string) => String(form.get(k) ?? "").trim();
  return {
    slug: str("slug"),
    title: str("title"),
    edition: str("edition"),
    description: str("description"),
    price: str("price"),
    discountPercent: str("discountPercent"),
    tag: str("tag"),
    isNew: form.get("isNew") != null,
    featured: form.get("featured") != null,
    preorder: form.get("preorder") != null,
    genres: form.getAll("genres").map(String),
    platforms: form.getAll("platforms").map(String),
    developer: str("developer"),
    releaseDate: str("releaseDate"),
    rating: str("rating"),
    systemReqMin: str("systemReqMin"),
    systemReqRec: str("systemReqRec"),
    image: str("image"),
    gallery: str("gallery"),
  };
}

export interface ParseResult {
  ok: boolean;
  slug: string;
  data?: GameData;
  errors: Record<string, string>;
}

/**
 * Valores del formulario → `GameData` validado.
 * Devuelve errores por campo listos para pintar bajo cada input.
 */
export function parseGameForm(values: GameFormValues): ParseResult {
  const candidate = {
    title: values.title,
    edition: values.edition,
    description: values.description,
    price: values.price === "" ? NaN : Number(values.price),
    discountPercent:
      values.discountPercent === ""
        ? undefined
        : Number(values.discountPercent),
    tag: values.tag === "" ? undefined : values.tag,
    isNew: values.isNew,
    featured: values.featured,
    preorder: values.preorder,
    genres: values.genres,
    platforms: values.platforms,
    developer: values.developer,
    releaseDate: values.releaseDate,
    rating: values.rating,
    systemReq: { min: values.systemReqMin, rec: values.systemReqRec },
    image: values.image,
    gallery: values.gallery
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean),
  };

  const parsed = gameSchema.safeParse(candidate);
  const slug = values.slug ? slugify(values.slug) : slugify(values.title);

  if (!parsed.success) {
    return { ok: false, slug, errors: flattenErrors(parsed.error) };
  }
  if (!slug) {
    return {
      ok: false,
      slug,
      errors: { slug: "No se pudo derivar un slug; escribí uno." },
    };
  }
  return { ok: true, slug, data: parsed.data, errors: {} };
}

/** ZodError → { campo: primer mensaje }. Aplana `systemReq.min` a `systemReqMin`. */
function flattenErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.join(".");
    const key =
      path === "systemReq.min"
        ? "systemReqMin"
        : path === "systemReq.rec"
          ? "systemReqRec"
          : (path.split(".")[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}
