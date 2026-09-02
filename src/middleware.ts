import { defineMiddleware } from "astro:middleware";
import { SESSION_COOKIE, validateSession } from "./lib/auth";

const PUBLIC_ADMIN_PATHS = new Set(["/admin/login", "/api/admin/login"]);

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const inAdminArea =
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith("/api/admin/");

  if (!inAdminArea) return next();

  const sessionId = context.cookies.get(SESSION_COOKIE)?.value;
  const admin = await validateSession(sessionId);
  context.locals.admin = admin;

  if (PUBLIC_ADMIN_PATHS.has(pathname)) {
    if (admin && pathname === "/admin/login") {
      return context.redirect("/admin");
    }
    return next();
  }

  if (!admin) {
    if (pathname.startsWith("/api/")) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    return context.redirect("/admin/login");
  }

  return next();
});
