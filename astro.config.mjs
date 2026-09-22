// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  // URL del sitio (canónicas, sitemap y Open Graph).
  site: "https://store.hernancubillos.dev",

  // Modo híbrido/SSR en contenedor Node:
  adapter: node({
    mode: "standalone",
  }),

  // El sitemap se genera on-demand en `src/pages/sitemap.xml.ts` (incluye
  // las páginas de juego/género del catálogo, que ya no existen en build).

  vite: {
    plugins: [tailwindcss()],
  },
});
