// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // URL del despliegue en Vercel (canónicas, sitemap y Open Graph).
  // Si el proyecto en Vercel recibe otro nombre, actualizar esta línea.
  site: "https://project-game-store.vercel.app",
  integrations: [sitemap()],
  image: {
    // Permite optimizar las imágenes remotas del catálogo en build
    domains: ["images.unsplash.com"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
