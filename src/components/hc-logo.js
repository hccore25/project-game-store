/**
 * <hc-logo> — HC monogram Web Component.
 *
 * Attributes:
 *   accent     CSS color for the C and its animation  (default: #fab56b)
 *   h-color    CSS color for the H bars               (default: #FAFAF8)
 *   text       Name text shown to the right           (omit for icon-only)
 *   size       sm | md | lg | xl | any CSS length     (default: md)
 *
 * CSS custom properties (inheritable from any ancestor):
 *   --logo-accent       accent color
 *   --logo-h-color      H bars color
 *   --logo-text-color   text color   (default: #FAFAF8)
 *   --logo-text-size    text size    (default: 1rem)
 *
 * Portable: no framework dependencies. Copy the file and import it.
 */

const SIZES = { sm: '1.75rem', md: '2.25rem', lg: '2.75rem', xl: '3.5rem' }

const STYLES = `
:host {
  display: inline-flex;
  align-items: center;
  gap: 0.625em;
}

svg {
  height: var(--logo-size, 2.25rem);
  width: auto;
  flex-shrink: 0;
  display: block;
  overflow: visible;
}

.h { fill: var(--logo-h-color, #FAFAF8); }
.c { fill: var(--logo-accent,  #fab56b); }

.c-stem {
  animation: cursor-glow 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
.c-arm {
  transform-box: fill-box;
  transform-origin: left center;
  animation: smooth-expand 3.2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}
.c-arm.bottom {
  animation-delay: -2.9s;
}

.text {
  font-family: 'Montserrat Variable', Montserrat, Arial, sans-serif;
  font-weight: 500;
  font-size: var(--logo-text-size, 1rem);
  color: var(--logo-text-color, #FAFAF8);
  white-space: nowrap;
  line-height: 1;
}
.text:empty { display: none; }

@keyframes cursor-glow {
  0%,  12% { opacity: 1;    }
  18%      { opacity: 0.15; }
  24%, 78% { opacity: 1;    }
  84%      { opacity: 0.15; }
  90%, 100%{ opacity: 1;    }
}

@keyframes smooth-expand {
  0%,  22% { transform: scaleX(0); opacity: 0.2; }
  26%      { opacity: 1; }
  40%, 70% { transform: scaleX(1); opacity: 1;   }
  82%, 100%{ transform: scaleX(0); opacity: 0.2; }
}

@media (prefers-reduced-motion: reduce) {
  .c-stem, .c-arm { animation: none; }
}
`

const MARKUP = `
<svg viewBox="0 0 66 70" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect class="h" x="0"  y="5"  width="13" height="60"/>
  <rect class="h" x="0"  y="28" width="38" height="13"/>
  <rect class="c c-stem"       x="46" y="0"  width="13" height="70"/>
  <rect class="c c-arm top"    x="46" y="0"  width="20" height="13"/>
  <rect class="c c-arm bottom" x="46" y="57" width="20" height="13"/>
</svg>
<span class="text" part="text"></span>
`

class HCLogo extends HTMLElement {
  static observedAttributes = ['accent', 'h-color', 'text', 'size']

  #root

  constructor() {
    super()
    this.#root = this.attachShadow({ mode: 'open' })
    this.#root.innerHTML = `<style>${STYLES}</style>${MARKUP}`
  }

  connectedCallback()          { this.#sync() }
  attributeChangedCallback()   { this.#sync() }

  #sync() {
    const accent = this.getAttribute('accent')
    const hColor = this.getAttribute('h-color')
    const size   = this.getAttribute('size') ?? 'md'
    const text   = this.getAttribute('text') ?? ''

    if (accent) this.style.setProperty('--logo-accent',  accent)
    if (hColor) this.style.setProperty('--logo-h-color', hColor)
    this.style.setProperty('--logo-size', SIZES[size] ?? size)

    const el = this.#root.querySelector('.text')
    if (el) el.textContent = text
  }
}

if (!customElements.get('hc-logo')) {
  customElements.define('hc-logo', HCLogo)
}
