import type { APIRoute } from "astro";
import { SESSION_COOKIE, invalidateSession } from "../../../lib/auth";

export const prerender = false;

export const POST: APIRoute = async ({ cookies, redirect }) => {
  const sessionId = cookies.get(SESSION_COOKIE)?.value;
  if (sessionId) await invalidateSession(sessionId);
  cookies.delete(SESSION_COOKIE, { path: "/" });
  return redirect("/admin/login", 303);
};
