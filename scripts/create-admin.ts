/**
 * Crea (o actualiza la contraseña de) el usuario del panel de administración.
 * Lee ADMIN_EMAIL y ADMIN_PASSWORD del entorno / .env.
 * Uso: `pnpm admin:create`  —  o:  ADMIN_EMAIL=... ADMIN_PASSWORD=... pnpm admin:create
 */
export {};

process.loadEnvFile?.(".env");

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.error(
    "Faltan ADMIN_EMAIL y/o ADMIN_PASSWORD (ponelos en .env o pasalos en la línea).",
  );
  process.exit(1);
}

if (password.length < 8) {
  console.error("ADMIN_PASSWORD debe tener al menos 8 caracteres.");
  process.exit(1);
}

const { createAdminUser } = await import("../src/lib/auth.js");
await createAdminUser(email, password);

console.log(`✓ Admin listo: ${email}`);
process.exit(0);
