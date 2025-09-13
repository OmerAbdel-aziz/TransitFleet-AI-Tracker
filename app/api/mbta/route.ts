// app/api/mbta/route.ts
import { NextResponse } from "next/server";
import { fetchMbtaBuses } from "@/lib/fetchMbta";

export async function GET() {
  const buses = await fetchMbtaBuses(["1" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9" , "10"]);
  return NextResponse.json(buses);
}
