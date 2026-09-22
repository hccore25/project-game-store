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

  // Protección Anti-CSRF para operaciones administrativas que mutan estado
  if (context.request.method !== "GET" && context.request.method !== "HEAD") {
    const origin = context.request.headers.get("origin");
    const secFetchSite = context.request.headers.get("sec-fetch-site");

    if (secFetchSite === "cross-site") {
      if (pathname.startsWith("/api/")) {
        return new Response(
          JSON.stringify({ error: "Petición cross-site no permitida (CSRF)" }),
          {
            status: 403,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      return new Response("Forbidden: Cross-site request rejected", { status: 403 });
    }

    if (origin && origin !== context.url.origin) {
      if (pathname.startsWith("/api/")) {
        return new Response(
          JSON.stringify({ error: "Origen no autorizado (CSRF)" }),
          {
            status: 403,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      return new Response("Forbidden: Origin mismatch", { status: 403 });
    }
  }

  return next();
});
