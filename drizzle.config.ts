import { defineConfig } from "drizzle-kit";

// Carga .env si existe sin romper el build si no está presente
try {
  process.loadEnvFile?.(".env");
} catch {
  // En Docker o CI las variables vienen del entorno del sistema
}

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
});
