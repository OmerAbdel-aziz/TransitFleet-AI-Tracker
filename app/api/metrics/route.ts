// app/api/metrics/route.ts
import { NextResponse } from "next/server"
import { fetchMbtaBusesWithWeather } from "@/lib/fetchMbta"
import { fetchMbtaRoutes } from "@/lib/fetchMbtaRoutes"

export async function GET() {
  try {
    // Fetch bus data
    const buses = await fetchMbtaBusesWithWeather(["1" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9" , "10"]);
    console.log("Metrics Api Route Returned :", buses.length)
    const routes = await fetchMbtaRoutes()

    // Calculate metrics
    const totalBuses = buses.length
    const avgDelay = buses.length
      ? Math.round(
          buses.reduce((acc : any, bus : any) => acc + (bus.delay || 0), 0) / buses.length
        )
      : 0

    // Distance covered → not available directly in MBTA, so we’ll stub
    const distanceCovered = totalBuses * 5 // pretend each bus covers 5km

    const activeRoutes = routes.length

    return NextResponse.json({
      totalBuses,
      avgDelay,
      distanceCovered,
      activeRoutes,
    })
  } catch (error) {
    console.error("Metrics API error:", error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
