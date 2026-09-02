/**
 * Carrito y wishlist en el navegador, persistidos en localStorage.
 * No hay cuentas de comprador: el checkout es de invitado y el pedido
 * confirmado se guarda en la base (ver `src/lib/orders.ts`).
 */

export interface StoreItem {
  slug: string;
  title: string;
  price: number;
  image: string;
}

export interface CartItem extends StoreItem {
  qty: number;
}

const CART_KEY = "nexus-cart";
const WISHLIST_KEY = "nexus-wishlist";

export const CART_EVENT = "nexus:cart-updated";
export const WISHLIST_EVENT = "nexus:wishlist-updated";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown, event: string) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(event));
}

// --- Carrito ---

export const getCart = () => read<CartItem[]>(CART_KEY, []);

export function addToCart(item: StoreItem, qty = 1) {
  const cart = getCart();
  const existing = cart.find((i) => i.slug === item.slug);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...item, qty });
  }
  write(CART_KEY, cart, CART_EVENT);
}

export function setCartQty(slug: string, qty: number) {
  const cart = getCart()
    .map((i) => (i.slug === slug ? { ...i, qty } : i))
    .filter((i) => i.qty > 0);
  write(CART_KEY, cart, CART_EVENT);
}

export const removeFromCart = (slug: string) => setCartQty(slug, 0);

export const clearCart = () => write(CART_KEY, [], CART_EVENT);

export const cartCount = () => getCart().reduce((n, i) => n + i.qty, 0);

export const cartTotal = () =>
  getCart().reduce((sum, i) => sum + i.price * i.qty, 0);

// --- Wishlist ---

export const getWishlist = () => read<StoreItem[]>(WISHLIST_KEY, []);

export const isInWishlist = (slug: string) =>
  getWishlist().some((i) => i.slug === slug);

/** Añade o quita el juego; devuelve true si quedó guardado. */
export function toggleWishlist(item: StoreItem): boolean {
  const wishlist = getWishlist();
  const index = wishlist.findIndex((i) => i.slug === item.slug);
  if (index >= 0) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(item);
  }
  write(WISHLIST_KEY, wishlist, WISHLIST_EVENT);
  return index < 0;
}

export const removeFromWishlist = (slug: string) => {
  const wishlist = getWishlist().filter((i) => i.slug !== slug);
  write(WISHLIST_KEY, wishlist, WISHLIST_EVENT);
};

export const wishlistCount = () => getWishlist().length;
