# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 5 con adapter de Vercel (páginas estáticas + rutas on-demand), Tailwind CSS 4, TypeScript estricto. Base de datos libSQL/SQLite (archivo local en desarrollo, Turso en producción) con Drizzle ORM y validación Zod. Autenticación de sesión propia (`node:crypto` scrypt) para un único usuario administrador. Carousel con Splide, fuentes Montserrat + Nunito autohospedadas vía Fontsource. pnpm como gestor de paquetes. CI con GitHub Actions. Despliegue en Vercel.

## Users

- **Visitante de portafolio / evaluador técnico** — revisa el proyecto para evaluar competencia en desarrollo web full-stack: arquitectura Astro híbrida, modelado de datos con Drizzle, autenticación, endpoints, y una experiencia de compra que persiste de verdad.
- **Administrador del catálogo** (el propio autor) — entra a `/admin` para agregar, editar y borrar juegos, y para revisar los pedidos. Es el usuario operativo real del backend.
- El catálogo está poblado con títulos ficticios; no responde a un perfil de comprador real. No hay cuentas de comprador: el checkout es de invitado.

## Product Purpose

NEXUSSTORE es una tienda digital de videojuegos con temática neón oscura, construida como proyecto de portafolio. Su éxito es demostrar, de forma equilibrada, destreza técnica full-stack (Astro híbrido, base de datos, ORM, auth, endpoints) y una experiencia de compra pulida: catálogo administrable, carrito, wishlist, checkout de invitado y búsqueda que funcionan end-to-end.

## Positioning

El catálogo se administra desde un panel autenticado y se sirve desde una base de datos: los cambios se ven al instante en la tienda, sin rebuild. El checkout de invitado persiste pedidos reales (con claves de juego generadas) que el cliente puede volver a consultar con su código y email. No se procesan pagos reales y no hay cuentas de comprador — esa parte es deliberadamente cosmética.

## Operating Context

- Sitio Astro híbrido desplegado en Vercel: las páginas de marketing se pre-generan en build; el catálogo (`/`, `/game/[slug]`, `/genre/[slug]`, `/games.json`, `/sitemap.xml`), el panel `/admin/*` y el checkout se renderizan on-demand.
- Base de datos libSQL/SQLite: `file:./local.db` en desarrollo, Turso (`libsql://…` + token) en producción. Esquema y migraciones versionadas con Drizzle Kit en `drizzle/`.
- Tablas: `games` (catálogo), `admin_users` + `sessions` (auth), `orders` + `order_items` (pedidos, con snapshot de título/precio/imagen por ítem).
- El catálogo se siembra desde `seed/games/*.json` (12 juegos ficticios) con `pnpm db:seed`; esos archivos son solo semilla, no se leen en runtime.
- El estado de carrito y wishlist sigue en `localStorage` del navegador. Al confirmar el checkout, `POST /api/checkout` revalida cada juego y recalcula los precios contra la base antes de crear el pedido.
- Autenticación: contraseña con scrypt (`salt:hash`), sesión en cookie httpOnly (`nexus_admin_session`, 30 días), middleware que protege `/admin/*` y `/api/admin/*`. Usuario admin sembrado con `pnpm admin:create`.

## Capabilities and Constraints

- **Capacidades**: catálogo administrable (alta/edición/baja con formulario validado por Zod, mensajes en español); catálogo y géneros servidos desde la base con reflejo instantáneo; carrito y wishlist con badges, steppers, totales y estados vacíos; checkout de invitado validado con estado de procesamiento simulado; pedidos persistidos con claves (una por unidad), página de confirmación por URL y búsqueda de pedido por código + email; vista de pedidos en el panel; búsqueda instantánea; descuentos por juego; SEO (canónicas, Open Graph, Twitter Cards, `sitemap.xml` on-demand con todas las páginas de catálogo, robots); accesibilidad (skip-link, focus rings, `prefers-reduced-motion`, regiones ARIA, galerías y menús por teclado).
- **Juegos ficticios**: todo el catálogo, desarrolladores, fechas y contenido son inventados para la demo.
- **Constraints**: sin pagos reales (tarjeta de prueba `4242 4242 4242 4242`); sin cuentas de comprador (checkout de invitado); un solo usuario administrador.
- **Idioma**: la interfaz de la tienda está en inglés; el panel de administración y los mensajes de validación, en español. No se ha unificado deliberadamente.

## Brand Commitments

- **Nombre**: NEXUSSTORE es el nombre de la marca.
- **Temática**: oscura y neón, sobre fondo ink black, es un compromiso fijo de identidad. Los detalles de expresión — tonos exactos, disposición, formas — quedan abiertos a evolución.
- **Tokens de color semánticos** definidos en `src/styles/global.css` (ink black, surface teal, pine teal, yellow-green primario, peach accent, text lavender, muted).

## Evidence on Hand

- Demo desplegable: https://project-game-store.vercel.app
- Catálogo semilla de 12 juegos ficticios en `seed/games/*.json`.
- README.md documenta features, stack, estructura, sistema de diseño y despliegue en Vercel + Turso.
- No existen testimonios, clientes reales, precios de mercado, licencias ni reclamos comerciales reales; no deben inventarse.

## Product Principles

1. **Full-stack real, no maqueta**: el catálogo se administra y persiste de verdad; el checkout crea pedidos consultables. La parte simulada (pago, ausencia de cuentas) es explícita y acotada.
2. **Destreza técnica y experiencia pulida en equilibrio**: el código debe lucir y la compra debe sentirse real; ninguno opaca al otro.
3. **Identidad neón oscura fija, expresión evolutiva**: la marca sobrevive; los detalles de diseño pueden madurar.
4. **Contenido honestamente ficticio**: el catálogo y la demo son inventados y deben permanecer claros como tales.
5. **Accesibilidad y rendimiento como parte de la calidad**: focus, reducción de movimiento, CLS cero y cero bloqueos de render no son opcionales.

## Accessibility & Inclusion

- Compromiso del proyecto por una tienda accesible: skip-to-content, focus rings visibles, soporte de `prefers-reduced-motion` (CSS y autoplay del slider), regiones ARIA y navegación por teclado funcional.
- No se ha establecido un estándar (p. ej. WCAG 2.1 AA) como requisito explícito de producto.
