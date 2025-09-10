import { prisma } from "@/lib/prisma-client"

export interface TfLBus {
  id: string | unknown
  route: string
  lat: number | null
  lng: number | null
  eta: Date
  delay: number
}

export async function fetchTfLBuses(lineIds: string[] = ["55"]) {
  // Step 1: Fetch all arrivals for a line
  const res = await fetch(`https://api.tfl.gov.uk/Line/${lineIds.join(",")}/Arrivals`)
  if (!res.ok) throw new Error("Failed to fetch TfL Line Arrivals")

  const data = await res.json()

  // Step 2: Collect unique vehicleIds (limit to avoid 9000+ requests!)
  const vehicleIds = [...new Set(data.map((b: any) => b.vehicleId))].slice(0, 15)

  const buses: TfLBus[] = []

  // Step 3: Fetch details for each vehicle
  for (const vId of vehicleIds) {
    try {
      const vRes = await fetch(`https://api.tfl.gov.uk/Vehicle/${vId}/Arrivals`)
      if (!vRes.ok) continue

      const vData = await vRes.json()
      if (vData.length > 0) {
        const b = vData[0]

        const bus: TfLBus = {
          id: vId,
          route: b.lineId,
          lat: b.latitude ?? null,
          lng: b.longitude ?? null,
          eta: new Date(b.expectedArrival),
          delay: Math.round(b.timeToStation / 60),
        }

        buses.push(bus)

        // Save into DB
        await prisma.busHistory.create({
          data: {
            busId: bus.id,
            route: bus.route,
            lat: bus.lat,
            lng: bus.lng,
            eta: bus.eta,
            delay: bus.delay,
          },
        })
      }
    } catch (err) {
      console.error(`❌ Error fetching vehicle ${vId}:`, err)
    }
  }

  return buses
}
