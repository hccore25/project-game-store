import type { APIRoute } from "astro";
import {
  SESSION_COOKIE,
  createSession,
  findAdminByEmail,
  purgeExpiredSessions,
  sessionCookieOptions,
  verifyPassword,
} from "../../../lib/auth";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
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
