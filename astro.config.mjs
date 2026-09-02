// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  // URL del despliegue en Vercel (canónicas, sitemap y Open Graph).
  // Si el proyecto en Vercel recibe otro nombre, actualizar esta línea.
  site: "https://project-game-store.vercel.app",

  // Modo híbrido: por defecto las páginas se pre-generan en build; las rutas
  // que dependen de la base de datos (catálogo, admin, checkout real) se
  // marcan con `export const prerender = false` y se renderizan on-demand.
  adapter: vercel(),

  // El sitemap se genera on-demand en `src/pages/sitemap.xml.ts` (incluye
  // las páginas de juego/género del catálogo, que ya no existen en build).

  vite: {
    plugins: [tailwindcss()],
  },
});
