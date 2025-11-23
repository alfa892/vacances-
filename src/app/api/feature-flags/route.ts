import { NextResponse } from "next/server";
import { FeatureFlagsResponse } from "../data/types";

export const revalidate = 1800;

export async function GET() {
  const flags: FeatureFlagsResponse = {
    animations: true,
    motionLevel: "full",
    contrast: "normal",
    density: "airy",
  };

  return NextResponse.json(flags, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
    },
  });
}
