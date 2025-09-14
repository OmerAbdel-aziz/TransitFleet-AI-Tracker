// lib/fetchMbta.ts
import { prisma } from "@/lib/prisma-client"
import { fetchWeather } from "@/lib/fetchWeather"

export async function fetchMbtaBusesWithWeather(routes: string[] = ["1"]) {
  const routeFilter = routes.join(",")
  const url = `https://api-v3.mbta.com/vehicles?filter[route]=${routeFilter}&filter[route_type]=3`

  const res = await fetch(url, {
    headers: {
      "x-api-key": process.env.MBTA_API_KEY ?? "",
    },
  })

  if (!res.ok) throw new Error(`MBTA API failed: ${res.status}`)

  const json = await res.json()

  const buses = await Promise.all(
    json.data.map(async (bus: any) => {
      const lat = bus.attributes.latitude ?? null
      const lng = bus.attributes.longitude ?? null

      // Fetch weather only if we have coords
      let weather = null
      if (lat && lng) {
        try {
          weather = await fetchWeather(lat, lng)
        } catch (err) {
          console.error(`Weather fetch failed for bus ${bus.id}`, err)
        }
      }

      const busData = {
        id: bus.id,
        route: bus.relationships.route.data.id,
        lat,
        lng,
        eta: bus.attributes.updated_at
          ? new Date(bus.attributes.updated_at)
          : null,
        delay: bus.attributes.current_status === "STOPPED_AT" ? 1 : 0,
        weather, // ✅ attach weather
      }

      // Cache snapshot in Postgres
      await prisma.busHistory.create({
        data: {
          busId: busData.id,
          route: busData.route,
          lat: busData.lat,
          lng: busData.lng,
          eta: busData.eta,
          delay: busData.delay,
        },
      })

      return busData
    })
  )

  return buses
}
