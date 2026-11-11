<div align="center">
  <img src="public/favicon.svg" alt="Hernán Cubillos Logo" width="64" height="64" />
  <h1>Hernán Cubillos Store</h1>
  <p>Tienda digital de videojuegos full-stack con temática oscura construida con Astro 5, TypeScript, Tailwind CSS v4 y Turso (libSQL).</p>

  <p>
    <a href="https://store.hernancubillos.dev"><strong>Ver Demo en Vivo &raquo;</strong></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Astro_5-BC52EE?style=flat-square&logo=astro&logoColor=white" alt="Astro 5" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
    <img src="https://img.shields.io/badge/Turso_/_libSQL-00E599?style=flat-square" alt="Turso libSQL" />
    <img src="https://img.shields.io/badge/Node.js_SSR-5FA04E?style=flat-square&logo=node.js&logoColor=white" alt="Node.js SSR" />
  </p>

  <p>
    <a href="README.md">English Version</a> | <strong>Español</strong>
  </p>
</div>

---

> [!NOTE]
> **Checkout Simulado:** Los pedidos y el procesamiento de pagos son simulados con fines de demostración. Puedes utilizar la tarjeta de prueba `4242 4242 4242 4242`. Los pedidos confirmados generan claves de licencia digitales persistidas en la base de datos, consultables en `/orders` mediante el código de orden y correo electrónico.

## Descripción General

Hernán Cubillos Store es una aplicación de comercio electrónico full-stack desarrollada para portafolio que replica el flujo completo y la lógica de backend de una plataforma moderna de distribución digital de videojuegos.

Proporciona un catálogo interactivo con renderizado del lado del servidor (SSR), carrito y lista de deseos persistentes en el cliente, búsqueda en tiempo real, panel de administración con autenticación de sesiones y validación de pedidos en el servidor.

## Características Principales

- **Catálogo Conectado a Base de Datos:** Los juegos se almacenan en una base de datos libSQL/SQLite gestionada con Drizzle ORM. La página principal, las vistas de detalle (`/game/[slug]`) y de géneros (`/genre/[slug]`) se renderizan bajo demanda mediante SSR.
- **Panel de Administración (`/admin`):** Dashboard administrativo protegido para crear, editar y eliminar juegos del catálogo, además de consultar pedidos de clientes con filtros de estado.
- **Carrito y Lista de Deseos Reactivos:** Implementados con Nanostores y persistencia en `localStorage`, con contadores en tiempo real en la cabecera, cálculo de subtotales, selectores de cantidad y estados vacíos.
- **Checkout Validado en Servidor:** El endpoint `POST /api/checkout` valida estrictamente los esquemas de datos con Valibot, recalcula los precios directamente desde la base de datos (evitando manipulación del cliente) y genera una clave digital por unidad adquirida.
- **Optimización de Recursos Gráficos:** Portadas y galerías en formato WebP local de alta resolución, cabeceras de caché estrictas, carga priorizada en el primer slide del hero (`fetchpriority="high"`) y carga diferida (`lazy-loading`) en slides y miniaturas secundarias.
- **Búsqueda Instantánea:** Búsqueda rápida en el cliente sobre un índice `/games.json` generado dinámicamente bajo demanda.
- **SEO y Accesibilidad:** Metadatos completos en SSR, tarjetas Open Graph y Twitter Cards, `sitemap.xml` dinámico, anillos de foco visibles, navegación completa por teclado y soporte para `prefers-reduced-motion`.

## Seguridad y Arquitectura

- **Autenticación con Sesiones:** Hashing de contraseñas con `node:crypto` `scrypt` utilizando sales criptográficas únicas. Las verificaciones de contraseña emplean `timingSafeEqual` y validación contra un hash simulado para neutralizar ataques de temporización y enumeración de usuarios.
- **Protección de Rutas y Middleware:** Middleware global de Astro que protege las rutas administrativas (`/admin/*`) y las mutaciones de API (`/api/admin/*`) mediante cookies de sesión seguras con atributos `httpOnly` y `sameSite: "lax"`.
- **Protección Anti-CSRF:** Las solicitudes que modifican estado (`POST`, `PUT`, `DELETE`) son inspeccionadas a nivel de middleware, validando los encabezados `Sec-Fetch-Site` y `Origin` antes de permitir la ejecución.
- **Límites de Peticiones (Rate Limiting):** Control de tasa por ventana deslizante en memoria para proteger endpoints sensibles contra ataques de fuerza bruta, tanto en el inicio de sesión del administrador (`/api/admin/login`) como en el checkout (`/api/checkout`).
- **Despliegue en Contenedores:** `Dockerfile` multi-etapa optimizado que ejecuta la aplicación bajo un usuario sin privilegios (`USER node`) con el adaptador independiente de `@astrojs/node`.

## Stack Tecnológico

| Capa                 | Tecnología                                                                                                                          |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**        | [Astro 5](https://astro.build) — SSR bajo demanda con adaptador independiente para Node.js                                          |
| **Lenguaje**         | TypeScript (Modo estricto activado)                                                                                                 |
| **Estilos**          | [Tailwind CSS v4](https://tailwindcss.com) — Tokens de diseño semánticos y clases de utilidad                                       |
| **Base de Datos**    | [libSQL](https://github.com/tursodatabase/libsql) / SQLite — Archivo local en desarrollo, [Turso](https://turso.tech) en producción |
| **ORM y Validación** | [Drizzle ORM](https://orm.drizzle.team) + Esquemas con [Valibot](https://valibot.dev) y [Zod](https://zod.dev)                      |
| **Estado Reactivo**  | [Nanostores](https://github.com/nanostores/nanostores) (`persistentAtom`)                                                           |
| **Carruseles**       | [Splide.js](https://splidejs.com)                                                                                                   |
| **Tipografía**       | Fuentes variables Montserrat y Nunito (auto-hospedadas vía Fontsource)                                                              |

## Estructura del Proyecto

```text
src/
├── components/          # Componentes de UI reutilizables (HeroSlider, GameCard, Logo, etc.)
│   └── admin/           # Componentes específicos y formularios del panel admin
├── data/                # Definiciones de géneros y registro de iconos SVG
├── layouts/             # Plantillas base (tienda y panel de administración)
├── lib/
│   ├── auth.ts          # Hashing scrypt, tokens de sesión y verificación segura
│   ├── games.ts         # Consultas al catálogo y mutaciones administrativas
│   ├── orders.ts        # Validación de checkout, generación de claves y búsqueda de pedidos
│   ├── rate-limit.ts    # Control de límite de peticiones por IP
│   ├── schema.ts        # Esquemas de validación de juegos con Valibot
│   └── db/              # Cliente de Drizzle ORM y esquema de base de datos
├── middleware.ts        # Middleware global: sesiones de admin y protección Anti-CSRF
├── pages/
│   ├── admin/           # Vistas del dashboard, catálogo, editor de juegos y pedidos
│   ├── api/             # Endpoints REST (checkout, autenticación, mutaciones)
│   ├── game/[slug].astro# Página dinámica de detalle de producto
│   ├── genre/[slug].astro Vista dinámica por categoría/género
│   └── orders.astro     # Consulta de pedidos confirmados
└── styles/              # Estilos globales y tokens semánticos de Tailwind v4

public/images/games/     # Portadas y galerías de capturas optimizadas en WebP
seed/games/              # Datos iniciales del catálogo en formato JSON
scripts/                 # Scripts de migración, seeding y creación de administrador
```

## Puesta en Marcha Local

### Prerrequisitos

- [Node.js](https://nodejs.org/) (v20 o superior recomendado)
- [pnpm](https://pnpm.io/) (v9 o superior)

### Instalación

1. Clonar el repositorio:

   ```sh
   git clone https://github.com/hccore25/project-game-store.git
   cd project-game-store
   ```

2. Instalar dependencias:

   ```sh
   pnpm install
   ```

3. Configurar variables de entorno:

   ```sh
   cp .env.example .env
   ```

   _(Los valores predeterminados apuntan a una base de datos local `local.db` y credenciales de prueba)._

4. Inicializar la base de datos y cargar los datos de prueba:

   ```sh
   pnpm db:migrate
   pnpm db:seed
   pnpm admin:create
   ```

5. Iniciar el servidor de desarrollo:
   ```sh
   pnpm dev
   ```

La tienda estará disponible en `http://localhost:4321` y el panel de administración en `http://localhost:4321/admin/login`.

## Comandos Disponibles

| Comando             | Descripción                                                             |
| :------------------ | :---------------------------------------------------------------------- |
| `pnpm dev`          | Inicia el servidor de desarrollo con recarga en vivo                    |
| `pnpm build`        | Compila el paquete de producción (`dist/`) usando `@astrojs/node`       |
| `pnpm preview`      | Ejecuta la compilación de producción localmente para verificación       |
| `pnpm check`        | Ejecuta validación estática de tipos en archivos Astro y TypeScript     |
| `pnpm format`       | Formatea el código con Prettier                                         |
| `pnpm db:generate`  | Genera una nueva migración SQL basada en el esquema de Drizzle          |
| `pnpm db:migrate`   | Aplica las migraciones SQL pendientes en la base de datos               |
| `pnpm db:seed`      | Llena la base de datos con los juegos predeterminados del catálogo      |
| `pnpm admin:create` | Crea o restablece la cuenta de administrador desde variables de entorno |

## Notas y Licencia

- Todos los videojuegos, empresas desarrolladoras, fechas y textos presentados en esta demo son ficticios.
- Diseñado y desarrollado por **Hernán Cubillos**.
