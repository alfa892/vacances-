import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/app/lib/rateLimit";

const trackSchema = z.object({
  event: z.string().min(1).max(80),
  path: z.string().optional(),
  dayId: z.string().optional(),
  city: z.string().optional(),
  device: z.string().optional(),
  props: z
    .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
    .optional(),
  ts: z.number().optional(),
});

const ipFromRequest = (request: NextRequest) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip") ||
  "anon";

export async function POST(request: NextRequest) {
  const ip = ipFromRequest(request);
  const { allowed, retryAfter } = rateLimit({
    key: `track:${ip}`,
    limit: 120,
    windowMs: 5 * 60 * 1000,
  });

  if (!allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = trackSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const event = parsed.data;

  if (process.env.NODE_ENV !== "production") {
    // Dev: log events for debugging.
    // Prod: intentional no-op — plug in your analytics provider here
    // (e.g. Plausible, PostHog, or a DB write) when ready.
    console.debug("track event", { ip, event });
  }

  return new NextResponse(null, { status: 204 });
}
