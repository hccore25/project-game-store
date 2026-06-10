const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatPrice(price: number): string {
  return usd.format(price);
}

/** Precio final tras aplicar el descuento (redondeado a centavos). */
export function finalPrice(price: number, discountPercent?: number): number {
  if (!discountPercent) return price;
  return Math.round(price * (100 - discountPercent)) / 100;
}
