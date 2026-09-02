import { randomInt } from "node:crypto";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "./db";
import { orderItems, orders } from "./db/schema";
import { getGame } from "./games";
import { finalPrice } from "../utils/format";
import type { OrderItemRow, OrderRow } from "./db/schema";

const KEY_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomBlock(length: number): string {
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += KEY_CHARS[randomInt(KEY_CHARS.length)];
  }
  return out;
}

/** Clave de juego ficticia estilo XXXX-XXXX-XXXX-XXXX. */
const generateGameKey = () => [4, 4, 4, 4].map((n) => randomBlock(n)).join("-");

/** Código de pedido legible y difícil de adivinar (sirve de "secreto"). */
const generateOrderId = () => `NX-${randomBlock(12)}`;

export const checkoutSchema = z.object({
  email: z.email(),
  name: z.string().trim().min(2).max(120),
  items: z
    .array(
      z.object({
        slug: z.string().min(1),
        qty: z.number().int().min(1).max(10),
      }),
    )
    .min(1)
    .max(50),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export interface OrderView {
  id: string;
  email: string;
  customerName: string;
  total: number;
  createdAt: Date;
  items: Array<Pick<OrderItemRow, "title" | "unitPrice" | "qty" | "image" | "keys" | "gameSlug">>;
}

/**
 * Confirma un pedido: revalida cada juego y su precio **contra la base**
 * (nunca se confía en el precio del cliente), genera claves y persiste.
 */
export async function createOrder(input: CheckoutInput): Promise<OrderView> {
  const lines: Array<typeof orderItems.$inferInsert> = [];
  let total = 0;

  for (const line of input.items) {
    const game = await getGame(line.slug);
    if (!game) {
      throw new Error(`El juego «${line.slug}» ya no está disponible.`);
    }
    const unitPrice = finalPrice(game.data.price, game.data.discountPercent);
    total += unitPrice * line.qty;
    lines.push({
      orderId: "", // se completa abajo
      gameSlug: game.id,
      title: game.data.title,
      unitPrice,
      qty: line.qty,
      image: game.data.image,
      keys: Array.from({ length: line.qty }, generateGameKey),
    });
  }

  total = Math.round(total * 100) / 100;
  const id = generateOrderId();
  const createdAt = new Date();

  await db.insert(orders).values({
    id,
    email: input.email.toLowerCase(),
    customerName: input.name,
    total,
    createdAt,
  });
  await db
    .insert(orderItems)
    .values(lines.map((line) => ({ ...line, orderId: id })));

  return {
    id,
    email: input.email.toLowerCase(),
    customerName: input.name,
    total,
    createdAt,
    items: lines.map(({ title, unitPrice, qty, image, keys, gameSlug }) => ({
      title,
      unitPrice,
      qty,
      image,
      keys,
      gameSlug,
    })),
  };
}

function toView(order: OrderRow, items: OrderItemRow[]): OrderView {
  return {
    id: order.id,
    email: order.email,
    customerName: order.customerName,
    total: order.total,
    createdAt: order.createdAt,
    items: items.map(({ title, unitPrice, qty, image, keys, gameSlug }) => ({
      title,
      unitPrice,
      qty,
      image,
      keys,
      gameSlug,
    })),
  };
}

/** Pedido por código (el código ya es el secreto del enlace de confirmación). */
export async function getOrder(id: string): Promise<OrderView | null> {
  const order = await db.select().from(orders).where(eq(orders.id, id)).get();
  if (!order) return null;
  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, id));
  return toView(order, items);
}

export interface OrderSummary {
  id: string;
  email: string;
  customerName: string;
  total: number;
  createdAt: Date;
  itemCount: number;
}

/** Pedidos recientes para el panel (solo cabecera + nº de ítems). */
export async function listOrders(limit = 100): Promise<OrderSummary[]> {
  const rows = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.createdAt))
    .limit(limit);

  const summaries: OrderSummary[] = [];
  for (const order of rows) {
    const items = await db
      .select({ qty: orderItems.qty })
      .from(orderItems)
      .where(eq(orderItems.orderId, order.id));
    summaries.push({
      id: order.id,
      email: order.email,
      customerName: order.customerName,
      total: order.total,
      createdAt: order.createdAt,
      itemCount: items.reduce((n, i) => n + i.qty, 0),
    });
  }
  return summaries;
}

/** Búsqueda del cliente: exige código + email correctos. */
export async function findOrder(
  id: string,
  email: string,
): Promise<OrderView | null> {
  const order = await db
    .select()
    .from(orders)
    .where(
      and(eq(orders.id, id.trim()), eq(orders.email, email.trim().toLowerCase())),
    )
    .get();
  if (!order) return null;
  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, order.id));
  return toView(order, items);
}
