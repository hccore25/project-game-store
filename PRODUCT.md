# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Astro 5 (static output) + Tailwind CSS 4, TypeScript estricto. pnpm como gestor de paquetes. Carousel con Splide, fuentes Montserrat + Nunito autohospedadas vía Fontsource, integración sitemap de Astro. CI con GitHub Actions. Despliegue en Vercel.

## Users

- **Visitante de portafolio / evaluador técnico** — quien revisa el proyecto para evaluar competencia en desarrollo web: messaging de ingeniería, arquitectura estática y stack. La experiencia de compra existe como demostración de destreza, no como producto comercial.
- El catálogo está poblado con títulos ficticios y no responde a un perfil de comprador real; el usuario confirmó que no está destinada a ser una tienda como producto final.

## Product Purpose

NEXUSSTORE es una tienda digital de videojuegos con temática neón oscura, construida como proyecto de portafolio. Su éxito es demostrar, de forma equilibrada, tanto la destreza técnica (Astro, Tailwind, arquitectura estática) como una experiencia de compra pulida: carrito, wishlist, checkout simulado, búsqueda y ofertas que funcionan end-to-end.

## Positioning

Toda la experiencia de tienda — catálogo, carrito, wishlist, checkout simulado y búsqueda — funciona de punta a punta **sin backend**, sobre un build estático con persistencia en `localStorage`. Es su mecanismo distintivo: la tienda completa en un sitio 100 % estático y desplegable en cualquier host de archivos.

## Operating Context

- Sitio estático generado en build (`astro build` → `dist/`), servido por Vercel en https://project-game-store.vercel.app.
- Catálogo definido como colección de contenido JSON (12 juegos) validada con un esquema Zod en `src/content/config.ts`.
- Estado de compra (carrito, wishlist, pedidos) persistido en `localStorage` del navegador; el checkout es simulado y los juegos "comprados" reciben claves demo generadas.
- Búsqueda instantánea client-side contra un índice estático `/games.json`.

## Capabilities and Constraints

- **Capacidades**: catálogo y géneros generados en build (`/game/[slug]`, `/genre/[slug]`); carrito y wishlist con badges en el header, steppers de cantidad, totales y estados vacíos; checkout validado con estado de procesamiento falso y confirmación de pedido con claves (una por unidad); búsqueda instantánea; descuentos por juego con precios tachados y badges; SEO (canónicas, Open Graph, Twitter Cards, sitemap, robots); accesibilidad (skip-link, focus rings, `prefers-reduced-motion`, regiones ARIA, galerías y menús accesibles por teclado); imágenes optimizadas a WebP en build con `astro:assets`.
- **Juegos ficticios**: todo el catálogo, desarrolladores, fechas y contenido son inventados para la demo; no representan productos reales.
- **Constraints técnicos**: sitio estático — sin autenticación, sin persistencia real de pedidos, sin pagos reales. Tarjeta de prueba `4242 4242 4242 4242`.
- **Decisión abierta**: el usuario deja abierto evaluar construir la parte completa de un backend real en el futuro. Hoy el producto es deliberadamente sin servidor.
- **Idioma**: la interfaz mezcla copy en inglés y comentarios/código con anotaciones en español; el idioma final deseado de la interfaz no se ha fijado explícitamente.

## Brand Commitments

- **Nombre**: NEXUSSTORE es el nombre de la marca.
- **Temática**: oscura y neón, sobre fondo ink black, es un compromiso fijo de identidad. Los detalles de expresión — tonos exactos, disposición, formas — quedan abiertos a evolución.
- **Tokens de color semánticos** definidos en `src/styles/global.css` (ink black, surface teal, pine teal, yellow-green primario, peach accent, text lavender, muted).

## Evidence on Hand

- Demo desplegable: https://project-game-store.vercel.app
- Catálogo completo de 12 juegos ficticios en `src/content/games/*.json`.
- README.md documenta features, stack, sistema de diseño y despliegue.
- No existen testimonios, clientes reales, precios de mercado, licencias ni reclamos comerciales reales; no deben inventarse.

## Product Principles

1. **La arquitectura estática es el producto**: la tienda completa sin backend es el punto a demostrar y preservar.
2. **Destreza técnica y experiencia pulida en equilibrio**: el código debe lucir y la compra debe sentirse real; ninguno opaca al otro.
3. **Identidad neón oscura fija, expresión evolutiva**: la marca sobrevive; los detalles de diseño pueden madurar.
4. **Contenido honestamente ficticio**: el catálogo y la demo son inventados y deben permanecer claros como tales.
5. **Accesibilidad y rendimiento como parte de la calidad**: focus, reducción de movimiento, CLS cero y cero bloqueos de render no son opcionales.

## Accessibility & Inclusion

- Compromiso del proyecto por una tienda accesible: skip-to-content, focus rings visibles, soporte de `prefers-reduced-motion` (CSS y autoplay del slider), regiones ARIA y navegación por teclado funcional.
- No se ha establecido un estándar (p. ej. WCAG 2.1 AA) como requisito explícito de producto.
