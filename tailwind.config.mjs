/** @type {import('tailwindcss').Config} */
export default {
  // Le dice a Tailwind dónde buscar las clases que uses
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Agrupamos nuestros colores personalizados bajo el prefijo "nexus"
        nexus: {
          background: '#0B0E14', // Fondo principal oscuro profundo
          surface: '#161B22',    // Fondo para tarjetas, dropdowns y menú mobile
          purple: '#7C3AED',     // Púrpura eléctrico (botones principales, hover)
          cyan: '#06B6D4',       // Cian vibrante (tags, bordes activos, links)
          green: '#10B981',      // Verde neón (precios, estado online)
          text: '#F9FAFB',       // Blanco humo para títulos legibles
          muted: '#9CA3AF',      // Gris claro para descripciones y footer
        }
      },
      fontFamily: {
        // Inter para lectura fluida, Space Grotesk para el toque tech/gaming
        sans: ['Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        // Sombras personalizadas para los efectos de resplandor neón
        'neon-purple': '0 0 15px rgba(124, 58, 237, 0.4), 0 0 5px rgba(124, 58, 237, 0.2)',
        'neon-cyan': '0 0 15px rgba(6, 182, 212, 0.4), 0 0 5px rgba(6, 182, 212, 0.2)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)', // Para el menú overlay
      }
    },
  },
  plugins: [],
}
