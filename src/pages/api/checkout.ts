import type { APIRoute } from "astro";
import { checkoutSchema, createOrder } from "../../lib/orders";
import { checkRateLimit, getClientIp } from "../../lib/rate-limit";

export const prerender = false;

// Límite de compras por IP: 15 compras por ventana de 10 minutos
const CHECKOUT_MAX_ORDERS = 15;
const CHECKOUT_WINDOW_MS = 10 * 60 * 1000;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = getClientIp(request, clientAddress);
  const rateLimit = checkRateLimit("checkout", ip, CHECKOUT_MAX_ORDERS, CHECKOUT_WINDOW_MS);

  if (!rateLimit.allowed) {
    const retryAfter = Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000));
    return new Response(
      JSON.stringify({
        error: `Has alcanzado el límite de ${CHECKOUT_MAX_ORDERS} pedidos en este período. Por favor, intentá de nuevo en unos minutos.`,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(CHECKOUT_MAX_ORDERS),
          "X-RateLimit-Remaining": "0",
        },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Cuerpo inválido." }, 400);
  }

  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return json({ error: "Revisá los datos del pedido." }, 422);
  }

  try {
    const order = await createOrder(parsed.data);
    return new Response(JSON.stringify({ ok: true, orderId: order.id }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "X-RateLimit-Limit": String(CHECKOUT_MAX_ORDERS),
        "X-RateLimit-Remaining": String(rateLimit.remaining),
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo crear el pedido.";
    return json({ error: message }, 409);
  }
};

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
