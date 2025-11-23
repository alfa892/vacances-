import { NextResponse } from "next/server";
import { budgetData } from "../data/budgetData";

export const revalidate = 3600;

export async function GET() {
  return NextResponse.json(budgetData, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
