/**
 * Iconos SVG centralizados (set Lucide + marcas).
 * Cada entrada es el contenido interno del <svg> (viewBox 0 0 24 24).
 */
export const icons = {
  search: `<circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path>`,
  "user-circle": `<path d="M18 20a6 6 0 0 0-12 0"></path><circle cx="12" cy="10" r="4"></circle><circle cx="12" cy="12" r="10"></circle>`,
  cart: `<circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>`,
  menu: `<line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line>`,
  close: `<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>`,
  "chevron-right": `<path d="m9 18 6-6-6-6"></path>`,
  "chevron-left": `<path d="m15 18-6-6 6-6"></path>`,
  "chevron-up": `<path d="m18 15-6-6-6 6"></path>`,
  "chevron-down": `<path d="m6 9 6 6 6-6"></path>`,
  "arrow-left": `<path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path>`,
  "arrow-right": `<path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>`,
  bell: `<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>`,
  settings: `<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle>`,
  logout: `<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line>`,
  shield: `<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.5 0 4.5 1 6.5 2a1 1 0 0 1 1 1z"></path>`,
  swords: `<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"></polyline><line x1="13" x2="19" y1="19" y2="13"></line><line x1="16" x2="20" y1="16" y2="20"></line><line x1="19" x2="21" y1="21" y2="19"></line><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"></polyline><line x1="5" x2="9" y1="14" y2="18"></line><line x1="7" x2="4" y1="17" y2="20"></line><line x1="3" x2="5" y1="19" y2="21"></line>`,
  users: `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>`,
  gamepad: `<line x1="6" x2="10" y1="12" y2="12"></line><line x1="8" x2="8" y1="10" y2="14"></line><line x1="15" x2="15.01" y1="13" y2="13"></line><line x1="18" x2="18.01" y1="11" y2="11"></line><rect width="20" height="12" x="2" y="6" rx="2"></rect>`,
  trophy: `<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>`,
  check: `<polyline points="20 6 9 17 4 12"></polyline>`,
  star: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>`,
  playstation: `<path d="M22 13h-4v2h2v4h-2v-4h-4v6H2v-2h4v-8H2V9h12V7h4v2h2v4Z" opacity="0.8"></path>`,
  twitter: `<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>`,
  discord: `<path d="M14.82 2.41c5.92 1.35 9.18 5.76 9.18 5.76-1.84-3.14-5.18-4.32-5.18-4.32-6-2.16-11.53 1.25-11.53 1.25-1.57.94-2.82 2.37-3.69 4.14C.94 13.9.23 19.33 1.5 23.63c.53 1.83 2 3.86 4.3 4.11 0 0 1.21-1.37 2.18-2.61-2.9-.84-4-2.58-4-2.58 2.38 1.58 4.7 2.18 7.35 2.5 3 .37 6.13-.19 8.94-1.63.15-.08.3-.15.44-.24-.04.05-.09.11-.14.16-3.05 2.56-6.62 3.39-6.62 3.39 1.44 1.7 4.54 3.47 7.02 3.39 2.14-.07 3.52-1.92 3.98-3.52 1.58-5.32.74-11.23-2.15-16.14-.94-1.6-2.07-2.9-3.54-3.87-2.3-1.55-5.34-2.63-8.8-2.73 0 0-1.8.1-1.8.1z"></path><circle cx="8" cy="15" r="2"></circle><circle cx="16" cy="15" r="2"></circle>`,
  instagram: `<rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>`,
} as const;

export type IconName = keyof typeof icons;
