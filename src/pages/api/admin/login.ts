import type { APIRoute } from "astro";
import {
  SESSION_COOKIE,
  createSession,
  findAdminByEmail,
  purgeExpiredSessions,
  sessionCookieOptions,
  verifyPassword,
} from "../../../lib/auth";
import { checkRateLimit, getClientIp } from "../../../lib/rate-limit";

export const prerender = false;

// Límite de intentos de login por IP: 5 intentos cada 15 minutos
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export const POST: APIRoute = async ({
  request,
  cookies,
  redirect,
  clientAddress,
}) => {
  const ip = getClientIp(request, clientAddress);
  const rateLimit = checkRateLimit(
    "admin-login",
    ip,
    LOGIN_MAX_ATTEMPTS,
    LOGIN_WINDOW_MS,
  );

  if (!rateLimit.allowed) {
    return redirect("/admin/login?error=rate", 303);
  }

  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");

  const fail = () => redirect("/admin/login?error=1", 303);

  if (!email || !password) return fail();

  const user = await findAdminByEmail(email);
  // Verificamos igual sin usuario para no filtrar cuáles emails existen.
  const dummy =
    "0000000000000000000000000000000000000000000000000000000000000000:0000000000000000000000000000000000000000000000000000000000000000";
  const ok = await verifyPassword(password, user?.passwordHash ?? dummy);

  if (!user || !ok) return fail();

  await purgeExpiredSessions();
  const session = await createSession(user.id);
  cookies.set(
    SESSION_COOKIE,
    session.id,
    sessionCookieOptions(session.expiresAt, import.meta.env.PROD),
  );

  return redirect("/admin", 303);
};
