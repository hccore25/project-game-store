import type { APIRoute } from "astro";
import { checkoutSchema, createOrder } from "../../lib/orders";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
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
    return json({ ok: true, orderId: order.id }, 201);
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
