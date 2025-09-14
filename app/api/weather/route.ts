import { NextRequest, NextResponse } from "next/server"
import { fetchWeather } from "@/lib/fetchWeather"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lat = parseFloat(searchParams.get("lat") || "")
  const lon = parseFloat(searchParams.get("lon") || "")

  if (isNaN(lat) || isNaN(lon)) {
    return NextResponse.json({ error: "lat and lon are required" }, { status: 400 })
  }

  try {
    const weather = await fetchWeather(lat, lon)
    return NextResponse.json(weather)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
