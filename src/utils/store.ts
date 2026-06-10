/**
 * Estado de la tienda en el navegador (carrito, wishlist y última orden),
 * persistido en localStorage. Sin backend: esta es la simulación de la
 * tienda para el portafolio.
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

export interface OrderItem extends CartItem {
  keys: string[];
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
}

const CART_KEY = "nexus-cart";
const WISHLIST_KEY = "nexus-wishlist";
const ORDER_KEY = "nexus-last-order";

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

// --- Órdenes (checkout simulado) ---

const KEY_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomBlock(length: number): string {
  return Array.from(
    { length },
    () => KEY_CHARS[Math.floor(Math.random() * KEY_CHARS.length)],
  ).join("");
}

/** Clave de juego ficticia estilo XXXX-XXXX-XXXX-XXXX. */
const generateGameKey = () => [4, 4, 4, 4].map((n) => randomBlock(n)).join("-");

/**
 * Convierte el carrito actual en una orden confirmada (con claves de juego
 * generadas), la persiste como última orden y vacía el carrito.
 */
export function placeOrder(): Order {
  const items: OrderItem[] = getCart().map((item) => ({
    ...item,
    keys: Array.from({ length: item.qty }, generateGameKey),
  }));

  const order: Order = {
    id: `NX-${randomBlock(8)}`,
    date: new Date().toISOString(),
    items,
    total: cartTotal(),
  };

  localStorage.setItem(ORDER_KEY, JSON.stringify(order));
  clearCart();
  return order;
}

export const getLastOrder = () => read<Order | null>(ORDER_KEY, null);
