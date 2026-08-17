---
name: NEXUSSTORE
description: Escaparate digital de juegos neón — catálogo curado sobre vitrina oscura y premium.
colors:
  background: "#0c1618"
  surface: "#11302d"
  teal: "#004643"
  primary: "#9fcc2e"
  accent: "#f6be9a"
  text: "#ece5f0"
  muted: "#94a8a5"
typography:
  display:
    fontFamily: "Nunito Variable, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 900
    letterSpacing: "0.08em"
    textTransform: "uppercase"
  body:
    fontFamily: "Montserrat Variable, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 500
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  2: "8px"
  4: "16px"
  6: "24px"
  8: "32px"
  10: "40px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.md}"
    padding: "14px 22px"
    typography:
      fontFamily: "Montserrat Variable, sans-serif"
      fontWeight: 700
      letterSpacing: "0.1em"
      textTransform: "uppercase"
      fontSize: "14px"
  button-primary-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.primary}"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.surface}"
  card-game:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.surface}"
  card-genre:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.xl}"
  tag-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.sm}"
---

# Design System: NEXUSSTORE

## Overview

**Creative North Star: "La Vitrina Encendida"**

NEXUSSTORE es la vitrina de un coleccionista en la penumbra: el catálogo se ofrece como joyas digitales iluminadas bajo una superficie oscura de archivo. El fondo *ink black* y las superficies térmicas crean la vitrina; los acentos neón — el *yellow green* del precio y la acción, el *peach glow* de los enlaces y etiquetas — son la luz que enciende cada pieza expuesta. La electrónica es contenida y selectiva: brilla lo que merece ser comprado, el resto respira en penumbra.

El carácter es **elegante y premium**. La tipografía de titulares es pesada (Nunito, peso 900), casi siempre en MAYÚSCULAS con *tracking* amplio y agresivo, evocando los logotipos y gráficos de campaña de una store de alto nivel. El texto de cuerpo descansa en Montserrat, limpio y legible. Los acentos de color son pocos y consistentes: cada uno tiene un rol semántico claro (precio/CTAs, tags/links, estados activos) y no compite por protagonismo con el contenido.

Hay una intención confirmada de madurar hacia **formas más planas y sobrias**: reducir el glow difuso que hoy envuelve los acentos activos, priorizar jerarquía limpia y superficies sólidas sobre la acumulación de efectos de luz. El registro en este documento refleja el estado incumbente; los guardrails de la sección *Do's and Don'ts* marcan esa dirección.

**Key Characteristics:**
- Vitrina oscura con acentos neón que encienden las piezas valiosas
- Titulares de display pesados, MAYÚSCULAS, *tracking* amplio
- Glow como recompensa de estado activo e interactivo, no decoración de fondo
- Elegancia premium y sobriedad creciente sobre el efecto gratuito

## Colors

La paleta es una vitrina oscura con tres acentos de luz. Negro-tinta y verde pino definen la penumbra; amarillo-verde, melocotón y teal aportan la luz. El texto lava-mist mantiene la legibilidad sobre el fondo profundo.

### Primary
- **Yellow Green** (#9fcc2e): El acento de acción y valor. Precios finales, botones de compra, badges de descuento, diáforas de "estado vivo" (badges de carrito, puntos ONLINE). Es el amarillo-verde ácido de los CTAs; sobre él se usa texto *ink black* para el contraste.

### Secondary
- **Peach Glow** (#f6be9a): El acento cálido de conexión. Enlaces destacados, tags BESTSELLER, iconos de géneros, subtítulos de acento, y ciertos estados informativos. Da calidez al otro extremo del espectro frente al verde ácido.

### Tertiary
- **Pine Teal** (#004643): El accent de profundidad y el "verde pino". Badges secundarios, fondos de avisos informativos (como la nota de tarjeta de prueba en checkout) y acentos de bajo conflicto. Es el verde profundo que ancla la paleta.

### Neutral
- **Ink Black** (#0c1618): Fondo principal de la página y de las tarjetas de juego. Es la materialidad de la vitrina: casi negro con un matiz verde-marino mínimo.
- **Surface** (#11302d): Verde-marino derivado para tarjetas de género, menús, bordes y superficies elevadas. Un paso más claro que el fondo.
- **Lavender Mist** (#ece5f0): Texto principal y titulares. Blanco-lavanda suave, evita el blanco puro para reducir fatiga sobre fondo oscuro.
- **Muted** (#94a8a5): Texto secundario, placeholders, iconos de navegación en reposo, fechas y ediciones. Gris-verdoso desaturado.

### Named Rules

**The Rarity Rule.** El acento *yellow green* solo se usa en lo que invita a actuar o valora la compra (precios, CTAs, badges de estado). Si algo usa neón sin invitar a una acción, está fuera de voz.

**The Vitrine Rule.** El fondo *ink black* debe mantenerse mayoritario. El acento de superficie nunca debe abrumar al contenido: es vitrina oscura con piezas iluminadas, no un mosaico de colores.

## Typography

**Display Font:** Nunito Variable (con fallback `ui-sans-serif, system-ui, sans-serif`)
**Body Font:** Montserrat Variable (con fallback `ui-sans-serif, system-ui, sans-serif`)

**Character:** La combinación es de contraste redondeado-vs geométrico. Nunito (display) tiene formas redondeadas y amistosas que al pegarse en MAYÚSCULAS de peso 900 y *tracking* amplio se vuelven arquitectónicas y de campaña; Montserrat (body) aporta la geometría limpia y neutral para lectura cómoda. Juntos producen un tono "tienda premium de juegos": grandilocuente en el titular, funcional en el cuerpo.

### Hierarchy
- **Display** (900, ~2.5–3.75rem, 1.1): El hero "A NEW ERA OF ADVENTURE BEGINS." y los titulares tipo logotipo. Solo en momentos de máximo impacto. MAYÚSCULAS, tracking amplio (`0.08em`+), siempre con Nunito.
- **Headline** (900, ~1.875rem, tight): Secciones principales (STORE, DEALS, GENRES, WISHLIST). MAYÚSCULAS pesadas con tracking amplio.
- **Title** (700, ~1.125rem, tight): Títulos de tarjetas de juego. NUNCA se rompe a dos líneas; se trunca (`truncate`).
- **Body** (500, 0.875–1rem, normal): Descripciones, ediciones, fechas, contenido funcional. Máximo ~65ch en párrafos continuos.
- **Label** (700, 0.625–0.75rem, tracking ~0.1–0.4em, MAYÚSCULAS): Etiquetas de formulario, subtítulos de grupos (HELP/LEGAL/CONNECT), badges, enlaces de nav. La MAYÚSCULA con tracking amplio es la firma de etiquetado.

### Named Rules

**The Loud-Label Rule.** Todo texto de etiqueta de navegación, botón o subtítulo va en MAYÚSCULAS con *tracking* amplio. El cuerpo y las descripciones jamás se convierten a MAYÚSCULAS; el contraste entre gritar (labels) y susurrar (body) es el sistema.

## Layout

Un contenedor centrado con ancho máximo fijo de **1280px** (utility `container`) envuelve todo el contenido con padding lateral de `1rem` en móvil y `1.5rem` (lg) en escritorio. El ritmo vertical de secciones es generoso (`space-y-16`, 4rem) creando respiración de vitrina: cada bloque (hero, store, deals, genres) ocupa su propio ambiente sin amontonarse.

El grid del catálogo usa la disposición de tarjetas de producto responsive; el hero es una fila en escritorio (contenido a la izquierda, imagen a la derecha) que colapsa a una columna apilada sobre la imagen en móvil. Las secciones secundarias (summary, forms) usan grids de proporción 5/3 (contenido principal 3/5 del ancho en `lg`). La densidad general es aireada: padding de tarjetas a `1rem–1.5rem`, gaps de `1rem–2rem`.

El header es sticky (`top-0`, z-50) de **5rem** de alto en todas las vistas, con navegación horizontal (escritorio) que pasa a menú overlay lateral (móvil, con `translate-x` y transición). Los anclajes respetan el header con `scroll-margin-top: 6rem`.

## Elevation & Depth

El sistema es **predominantemente plano**, con profundidad expresada tradicionalmente a través de **luz neón** más que sombra proyectada. Las superficies se recortan por diferencia de tono (ink black vs. surface) y por bordes `1px solid surface`; la elevación interactiva se comunica con glow y transiciones, no con elevación de sombra dura.

La intención confirmada hacia la sobriedad favorece reducir la acumulación de glow. El glow debe permanecer como **recompensa puntual de estado activo** — hover, foco, precio, badge vivo — y no envolver todas las superficies.

### Shadow Vocabulary
- **Neon Lime** (`0 0 15px rgb(159 204 46 / .4), 0 0 5px rgb(159 204 46 / .2)`): Recompensa del acento *yellow green*. Botones primarios, badges de descuento, precio en display.
- **Neon Peach** (`0 0 15px rgb(246 190 154 / .4), 0 0 5px rgb(246 190 154 / .2)`): Recompensa del acento *peach*. Hover de tarjetas de género, tags BESTSELLER.
- **Neon Teal** (`0 0 18px rgb(0 70 67 / .8), 0 0 6px rgb(0 70 67 / .5)`): Eco profundo del verde pino en superficies teal.
- **Glass** (`0 8px 32px 0 rgb(0 0 0 / .37)`): Sombreo amplio y difuso para paneles flotantes (panel de búsqueda) con `backdrop-blur`.

### Named Rules

**The Dim-By-Default Rule.** Las superficies son planas y oscuras en reposo. El glow aparece solo en respuesta al estado (hover, foco, activo, precio vivo). Si un elemento no está activo o no invita a actuar, no emite luz.

## Shapes

La gramática de formas combina radios medianos con un lenguaje de esquinas recortadas en badges y tags. Los radios se escalan suavemente por jerarquía:

- **sm (6px)**: etiquetas y badges flotantes (`rounded-b-md` = esquinas inferiores 6px, "recorte" inferior deliberado).
- **md (8px)**: controles y campos — botones principales, inputs, enlaces de resultados de búsqueda, botones de utilidad (back-to-top).
- **lg (12px)**: tarjetas de juego (GameCard).
- **xl (16px)**: contenedores elevados — tarjetas de género, summary de compra.
- **full (9999px)**: avatares, chips de estado circular (punto ONLINE, badges de conteo).

Los **tags y badges** no se redondean simétricamente: la esquina inferior se recorta (rounded-b-md) para un efecto de "etiqueta adherida", mientras arriba remata en ángulo recto. Los bordes son de `1px solid surface` en tarjetas y campos, que se aclaran a *primary/accent* en hover.

## Components

### Buttons
- **Shape:** radios medianos (8px), etiqueta en MAYÚSCULAS con tracking amplio.
- **Primary (CTA de compra):** fondo *yellow green*, texto *ink black*, glow neón lime, padding `14px 22px`. Es el único botón de alto impacto por pantalla.
- **Hover:** transición a blanco (`hover:bg-white`, texto a *yellow green*) con `scale` suave y sombra neón. Es una inversión dramática: la superficie del botón se vuelve más clara al interactuar.
- **Disabled:** `opacity-50`, sin cursor (`disabled:cursor-not-allowed`).
- **Ghost/Utility (back-to-top):** fondo *yellow green* compacto (icono cuadrado 8px), glow lime tenue, hover invierte a surface con texto a *yellow green*.

### Chips / Badges / Tags
- **Tag NEW RELEASE:** fondo *yellow green*, texto *ink black*, glow lime, esquina inferior recortada (6px).
- **Tag BESTSELLER:** fondo *peach glow*, texto *ink black*, glow peach.
- **Badge de descuento:** *yellow green* sobre *ink black*, recortado abajo (`rounded-b-md`), texto `10px` bold tracking.
- **Badge de conteo (cart/wishlist):** círculo pequeño (`rounded-full`), *yellow green* o *peach*, número `10px` bold sobre *ink black*.

### Cards / Containers
- **GameCard:** fondo *ink black*, esquinas `xl` (12px), borde `1px solid surface`. Imagen `aspect-3/4` con overlays de gradiente hacia abajo. Hover: borde a *yellow green*, glow lime sutil, imagen hace zoom `1.05` y sube opacidad de `0.9` a `1`. Título display bold que cambia a *yellow green* en hover.
- **GenreCard:** fondo *surface*, esquinas `2xl` (16px), borde transparente en reposo. Icono *peach glow* con drop-shadow. Hover: glow peach, fondo más claro (`surface/80`), icono rota `12°` y escala `1.1`.
- **Summary panel:** fondo `surface/30`, esquinas `2xl`, borde `1px solid surface`, padding `1.5rem`.

### Inputs / Fields
- **Estilo:** fondo `surface/30`, borde `1px solid surface`, radio `md` (8px), padding `12px 16px`, texto *lavender*. Placeholder en *muted* al 60%.
- **Focus:** borde cambia a *yellow green* (`focus:border-nexus-primary`), sin outline extra (se elimina el predeterminado con `focus:outline-none`) — el borde de acento es el indicador de foco, junto con el anillo global de `focus-visible`.
- **Error:** borde a *peach glow* (`border-nexus-accent`), mensaje pequeño en *peach* bajo el campo.
- **Labels:** texto `xs` bold en MAYÚSCULAS con tracking amplio, en *muted*.

### Navigation
- **Header:** sticky de 5rem, fondo *ink black* con borde inferior `1px solid surface`. Logo NEXUS/GAMES apilado (Nunito black + tracking `0.4em` en *yellow green*). Nav horizontal en MAYÚSCULAS `xs` semibold tracking amplio; hover a blanco.
- **Mobile:** overlay lateral completo (`fixed inset-0`, z-60) con slide desde la derecha. Enlaces display `3xl` bold MAYÚSCULAS conectados por un borde izquierdo *yellow green*; sección "YOUR ACCOUNT" con avatar circular y acentos.
- **Footer:** borde superior con una línea de glow degradada peach. Columnas HELP/LEGAL/CONNECT tituladas en *yellow green* o *peach*, enlaces blancos que en hover van a *peach*.

### Signature Component: Precio con descuento
- **PriceDisplay:** En `sm`, precio final *yellow green* bold junto al original en *muted* `line-through` (solo si hay descuento). En `lg` (detalle), el precio final es display `3xl` black con drop-shadow lime tenue. Es la pieza que "enciende" el valor de cada juego en la vitrina.

## Do's and Don'ts

### Do:
- **Do** usar *ink black* como superficie mayoritaria; es la materialidad de la vitrina.
- **Do** aplicar la voz de titulares en Nunito 900, MAYÚSCULAS y tracking amplio en momenta de impacto (hero, secciones, logotipo).
- **Do** reservar el *yellow green* para precios, CTAs y estados activos que valen la acción.
- **Do** mantener la MAYÚSCULA con tracking amplio en toda etiqueta, botón y enlace de navegación; el cuerpo queda en caja de oración.

### Don't:
- **Don't** acumular glow neón en todas las superficies — el neón es recompensa puntual de estado activo o valor, no decoración de fondo (**The Dim-By-Default Rule**).
- **Don't** usar blanco puro como texto; prefiera *lavender mist*. El blanco se reserva para estados de hover/inversión de acento.
- **Don't** romper los títulos de tarjetas de juego en dos líneas — trúncalos.
- **Don't** convertir descripciones y cuerpo a MAYÚSCULAS; el contraste label/body es el sistema.
- **Don't** dejar que la superficie o los acentos abrumen el contenido: vitrina oscura con piezas iluminadas, no mosaico de color (**The Vitrine Rule**).
