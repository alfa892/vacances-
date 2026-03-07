/**
 * In-memory token-bucket rate limiter.
 *
 * Works well for single-instance deployments (Node server, Docker container).
 * In serverless / multi-instance environments each instance has its own Map,
 * so effective limits are multiplied by the number of instances and reset on
 * cold starts.
 *
 * For production at scale, consider a shared store such as Upstash Redis
 * (`@upstash/ratelimit`) which provides atomic, cross-instance rate limiting.
 */
const buckets = new Map<string, { tokens: number; updatedAt: number }>();

type RateLimitConfig = {
  key: string;
  limit: number;
  windowMs: number;
};

export function rateLimit({ key, limit, windowMs }: RateLimitConfig) {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { tokens: limit, updatedAt: now };
  const elapsed = now - bucket.updatedAt;
  const refill = Math.floor(elapsed / windowMs) * limit;

  const tokens = Math.min(limit, bucket.tokens + (refill > 0 ? refill : 0));
  const nextTokens = tokens > 0 ? tokens - 1 : 0;

  buckets.set(key, { tokens: nextTokens, updatedAt: now });

  const allowed = tokens > 0;
  const retryAfter = allowed ? 0 : Math.ceil((windowMs - (elapsed % windowMs)) / 1000);

  return { allowed, retryAfter };
}
