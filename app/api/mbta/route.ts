// app/api/mbta/route.ts
import { NextResponse } from "next/server";
import { fetchMbtaBuses } from "@/lib/fetchMbta";

export async function GET() {
  const buses = await fetchMbtaBuses("1");
  return NextResponse.json(buses);
}
