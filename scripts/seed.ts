/**
 * Siembra la base de datos con los juegos de `seed/games/*.json`.
 * Idempotente: vuelve a insertar (upsert) por slug, así que se puede correr
 * las veces que haga falta. Uso: `pnpm db:seed`.
 */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

try {
  process.loadEnvFile?.(".env");
} catch {
  // En Docker o CI las variables vienen del entorno
}

const { db } = await import("../src/lib/db/index.js");
const { games } = await import("../src/lib/db/schema.js");
const { gameSchema } = await import("../src/lib/schema.js");
const { dataToRow } = await import("../src/lib/games.js");

const GAMES_DIR = "seed/games";

const files = (await readdir(GAMES_DIR)).filter((f) => f.endsWith(".json"));
if (files.length === 0) {
  console.error(`No hay JSON de juegos en ${GAMES_DIR}`);
  process.exit(1);
}

let inserted = 0;
for (const file of files) {
  const slug = file.replace(/\.json$/, "");
  const raw = JSON.parse(await readFile(join(GAMES_DIR, file), "utf-8"));
  const parsed = gameSchema.safeParse(raw);

  if (!parsed.success) {
    console.error(`✗ ${file} inválido:`, parsed.error.issues);
    process.exit(1);
  }

  const row = dataToRow(slug, parsed.data);
  await db
    .insert(games)
    .values({ ...row, createdAt: new Date() })
    .onConflictDoUpdate({ target: games.slug, set: row });

  inserted += 1;
  console.log(`✓ ${slug}`);
}

console.log(`\nListo: ${inserted} juego(s) sembrados.`);
process.exit(0);
