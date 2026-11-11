import { createClient } from "@libsql/client";
import { existsSync, copyFileSync } from "node:fs";

const dbPath = process.env.DATABASE_URL?.replace("file:", "") || "/app/data/local.db";
const seedPath = process.env.SEED_DB_PATH || "/app/seed.db";

try {
  if (!existsSync(dbPath)) {
    if (existsSync(seedPath)) {
      console.log("→ Inicializando base de datos desde seed...");
      copyFileSync(seedPath, dbPath);
      console.log("✓ Base de datos inicializada.");
    }
  } else if (existsSync(seedPath)) {
    console.log("→ Sincronizando catálogo de juegos desde seed...");
    const client = createClient({ url: `file:${dbPath}` });
    await client.execute(`ATTACH DATABASE '${seedPath}' AS seed`);
    const res = await client.execute(`INSERT OR REPLACE INTO games SELECT * FROM seed.games`);
    await client.execute(`DETACH DATABASE seed`);
    console.log(`✓ Catálogo sincronizado (${res.rowsAffected} juegos procesados).`);
  }
} catch (err) {
  console.warn("⚠️ Aviso al sincronizar catálogo:", err.message);
}
