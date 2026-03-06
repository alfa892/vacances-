import { NextRequest, NextResponse } from "next/server";
import { storyData } from "../data/storyData";
import { SearchResult } from "../data/types";
import { SearchResponse } from "../data/searchTypes";
import { rateLimit } from "@/app/lib/rateLimit";

const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 20;

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

const textMatches = (text: string, query: string) => normalize(text).includes(query);

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const query = (url.searchParams.get("q") || "").trim();
  const requestedLimit = Number(url.searchParams.get("limit") || DEFAULT_LIMIT);
  const limit =
    Number.isFinite(requestedLimit) && requestedLimit > 0
      ? Math.min(requestedLimit, MAX_LIMIT)
      : DEFAULT_LIMIT;

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  const { allowed, retryAfter } = rateLimit({
    key: `search:${ip}`,
    limit: 60,
    windowMs: 5 * 60 * 1000,
  });

  if (!allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please slow down." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const q = normalize(query);
  const results: { item: SearchResult; score: number }[] = [];

  storyData.days.forEach((day) => {
    const haystack = [day.label, day.summary, ...day.cities, day.mood || ""].join(" ");
    const match = !q || textMatches(haystack, q);
    if (match) {
      results.push({
        item: {
          kind: "day",
          id: day.id,
          title: day.label,
          subtitle: day.summary,
        },
        score: q ? 2 : 0.5,
      });
    }

    day.stops.forEach((stop) => {
      const stopHaystack = [
        stop.title,
        stop.city,
        stop.description,
        stop.price || "",
        ...(stop.tags || []),
      ].join(" ");
      if (!q || textMatches(stopHaystack, q)) {
        results.push({
          item: {
            kind: "stop",
            id: stop.id,
            title: stop.title,
            subtitle: `${stop.city}${stop.time ? ` · ${stop.time}` : ""}`,
            dayId: day.id,
            href: stop.href,
            description: stop.description,
          },
          score: q ? 3 : 0.2,
        });
      }
    });
  });

  storyData.ctas.forEach((cta) => {
    const haystack = `${cta.label} ${cta.type}`;
    if (!q || textMatches(haystack, q)) {
      results.push({
        item: {
          kind: "cta",
          id: cta.label.toLowerCase().replace(/\s+/g, "-"),
          title: cta.label,
          subtitle: cta.type === "whatsapp" ? "Ouvrir dans WhatsApp" : "Ouvrir",
          href: cta.href,
        },
        score: q ? 1 : 0.1,
      });
    }
  });

  const ranked = results
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item)
    .slice(0, limit);

  const payload: SearchResponse = {
    query: query || "",
    results: ranked,
  };

  return NextResponse.json(
    payload,
    {
      status: 200,
      headers: { "Cache-Control": "public, max-age=30, stale-while-revalidate=60" },
    }
  );
}
