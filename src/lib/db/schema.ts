import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

/**
 * Catálogo de juegos. Cada fila equivale a un archivo
 * `src/content/games/<slug>.json` del proyecto original;
 * esos archivos ahora son solo la semilla inicial (`pnpm db:seed`).
 */
export const games = sqliteTable("games", {
  slug: text("slug").primaryKey(),
  title: text("title").notNull(),
  edition: text("edition").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  discountPercent: integer("discount_percent"),
  tag: text("tag", { enum: ["new", "bestseller"] }),
  isNew: integer("is_new", { mode: "boolean" }).notNull().default(false),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  preorder: integer("preorder", { mode: "boolean" }).notNull().default(false),
  genres: text("genres", { mode: "json" }).notNull().$type<string[]>(),
  platforms: text("platforms", { mode: "json" })
    .notNull()
    .$type<Array<"PC" | "PS">>(),
  developer: text("developer").notNull(),
  releaseDate: text("release_date").notNull(),
  rating: text("rating").notNull(),
  systemReqMin: text("system_req_min").notNull(),
  systemReqRec: text("system_req_rec").notNull(),
  image: text("image").notNull(),
  gallery: text("gallery", { mode: "json" })
    .notNull()
    .$type<string[]>()
    .default(sql`'[]'`),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type GameRow = typeof games.$inferSelect;
export type NewGameRow = typeof games.$inferInsert;

/**
 * Usuarios del panel de administración. No hay cuentas de comprador:
 * el checkout es de invitado. Se siembra con `pnpm admin:create`.
 */
export const adminUsers = sqliteTable("admin_users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

/** Sesiones de administración (cookie httpOnly → fila). */
export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => adminUsers.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type AdminUserRow = typeof adminUsers.$inferSelect;
export type SessionRow = typeof sessions.$inferSelect;

/**
 * Pedidos del checkout de invitado. No hay pago real: al confirmar se
 * generan claves de juego ficticias. El pedido se consulta luego con
 * su código + el email (página `/orders`).
 */
export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(), // p. ej. "NX-7F3K9Q2XAB4M"
  email: text("email").notNull(),
  customerName: text("customer_name").notNull(),
  total: real("total").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const orderItems = sqliteTable("order_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderId: text("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  // Referencia blanda: si el juego se borra después, el pedido histórico
  // conserva su propio título y precio.
  gameSlug: text("game_slug").notNull(),
  title: text("title").notNull(),
  unitPrice: real("unit_price").notNull(),
  qty: integer("qty").notNull(),
  image: text("image").notNull(),
  keys: text("keys", { mode: "json" }).notNull().$type<string[]>(),
});

export type OrderRow = typeof orders.$inferSelect;
export type OrderItemRow = typeof orderItems.$inferSelect;
