// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // URL final del sitio (canónicas, sitemap y Open Graph).
  // Ajustar cuando se defina la plataforma de despliegue en la fase 4.
  site: "https://project-game-store.netlify.app",
  integrations: [sitemap()],
  image: {
    // Permite optimizar las imágenes remotas del catálogo en build
    domains: ["images.unsplash.com"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
