// app/api/mbta/route.ts
import { NextResponse } from "next/server";
import { fetchMbtaBusesWithWeather } from "@/lib/fetchMbta";

export async function GET() {
  const buses = await fetchMbtaBusesWithWeather(["1" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9" , "10"]);
  console.log("MBTA Api route returned :", buses.length)
  return NextResponse.json(buses);
}
