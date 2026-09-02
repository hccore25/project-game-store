import { defineConfig } from "drizzle-kit";

// Carga .env sin dependencias extra (Node 20.6+).
process.loadEnvFile?.(".env");

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
});
