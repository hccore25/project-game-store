import { createClient } from "@libsql/client";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "./schema";

/**
 * Cliente de base de datos (libSQL / Turso), inicializado de forma perezosa:
 * importar este módulo no abre ninguna conexión ni exige variables de entorno.
 * Eso mantiene el build limpio (el prerender de páginas estáticas atraviesa
 * el middleware, que importa esto) — el error por `DATABASE_URL` ausente solo
 * salta cuando se ejecuta una consulta de verdad.
 *
 * - Desarrollo: `DATABASE_URL=file:./local.db` (SQLite local, sin cuenta).
 * - Producción: `DATABASE_URL=libsql://<db>.turso.io` + `DATABASE_AUTH_TOKEN`.
 */
type DB = LibSQLDatabase<typeof schema>;

let instance: DB | null = null;

function connect(): DB {
  if (instance) return instance;

  const env =
    (import.meta as { env?: Record<string, string | undefined> }).env ??
    process.env;
  const url = env.DATABASE_URL ?? process.env.DATABASE_URL;
  const authToken = env.DATABASE_AUTH_TOKEN ?? process.env.DATABASE_AUTH_TOKEN;

  if (!url) {
    throw new Error(
      "Falta DATABASE_URL. Copiá .env.example a .env (usa file:./local.db para desarrollo).",
    );
  }

  instance = drizzle(createClient({ url, authToken }), { schema });
  return instance;
}

export const db: DB = new Proxy({} as DB, {
  get(_target, prop, receiver) {
    const real = connect() as unknown as Record<string | symbol, unknown>;
    const value = Reflect.get(real, prop, receiver);
    return typeof value === "function" ? value.bind(real) : value;
  },
});

export { schema };
