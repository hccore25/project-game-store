interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const stores = new Map<string, Map<string, RateLimitRecord>>();

/**
 * Limitador de tasa en memoria por IP o clave arbitraria.
 * Limpia automáticamente registros expirados para evitar crecimiento de memoria.
 */
export function checkRateLimit(
  scope: string,
  key: string,
  maxRequests: number,
  windowMs: number,
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  let store = stores.get(scope);
  if (!store) {
    store = new Map();
    stores.set(scope, store);
  }

  // Limpieza periódica si la tienda en memoria crece
  if (store.size > 1000) {
    for (const [k, record] of store.entries()) {
      if (record.resetAt <= now) {
        store.delete(k);
      }
    }
  }

  const existing = store.get(key);
  if (!existing || existing.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs };
  }

  if (existing.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - existing.count,
    resetAt: existing.resetAt,
  };
}

/**
 * Extrae la IP del cliente considerando proxies inversos (Cloudflare, Nginx, Vercel)
 * o la dirección informada por el adaptador de Astro.
 */
export function getClientIp(request: Request, clientAddress?: string): string {
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return clientAddress || "127.0.0.1";
}
