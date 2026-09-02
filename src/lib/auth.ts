import {
  randomBytes,
  randomUUID,
  scrypt as scryptCb,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";
import { and, eq, gt, lt } from "drizzle-orm";
import { db } from "./db";
import { adminUsers, sessions } from "./db/schema";
import type { AdminUserRow } from "./db/schema";

const scrypt = promisify(scryptCb) as (
  password: string | Buffer,
  salt: string | Buffer,
  keylen: number,
) => Promise<Buffer>;

const KEYLEN = 64;
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 días
export const SESSION_COOKIE = "nexus_admin_session";

// --- Password hashing (scrypt, sin dependencias nativas) ---

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = await scrypt(password, salt, KEYLEN);
  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = await scrypt(password, salt, KEYLEN);
  const hashBuf = Buffer.from(hash, "hex");
  return (
    hashBuf.length === derived.length && timingSafeEqual(hashBuf, derived)
  );
}

// --- Usuarios ---

export async function createAdminUser(email: string, password: string) {
  const passwordHash = await hashPassword(password);
  const id = randomUUID();
  await db
    .insert(adminUsers)
    .values({ id, email: email.toLowerCase(), passwordHash })
    .onConflictDoUpdate({
      target: adminUsers.email,
      set: { passwordHash },
    });
  return id;
}

export async function findAdminByEmail(
  email: string,
): Promise<AdminUserRow | undefined> {
  return db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email.toLowerCase()))
    .get();
}

// --- Sesiones ---

export async function createSession(userId: string): Promise<{
  id: string;
  expiresAt: Date;
}> {
  const id = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await db.insert(sessions).values({ id, userId, expiresAt });
  return { id, expiresAt };
}

export interface AdminIdentity {
  id: string;
  email: string;
}

/** Devuelve el admin dueño de la sesión, o `null` si no vale / expiró. */
export async function validateSession(
  sessionId: string | undefined,
): Promise<AdminIdentity | null> {
  if (!sessionId) return null;

  const row = await db
    .select({
      userId: adminUsers.id,
      email: adminUsers.email,
      expiresAt: sessions.expiresAt,
    })
    .from(sessions)
    .innerJoin(adminUsers, eq(sessions.userId, adminUsers.id))
    .where(and(eq(sessions.id, sessionId), gt(sessions.expiresAt, new Date())))
    .get();

  if (!row) return null;
  return { id: row.userId, email: row.email };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}

/** Limpieza oportunista de sesiones vencidas. */
export async function purgeExpiredSessions(): Promise<void> {
  await db.delete(sessions).where(lt(sessions.expiresAt, new Date()));
}

// --- Cookie ---

export function sessionCookieOptions(expiresAt: Date, prod: boolean) {
  return {
    httpOnly: true,
    secure: prod,
    sameSite: "lax" as const,
    path: "/",
    expires: expiresAt,
  };
}
