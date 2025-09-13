import { NormalizedBus } from "@/features/fleet-tracker";



export async function fetchMbtaBuses(routes?: string[] | string): Promise<NormalizedBus[]> {
  // Default route if nothing passed
  let routeFilter = "1";

  if (Array.isArray(routes)) {
    routeFilter = routes.join(","); // e.g. "1,66,15"
  } else if (typeof routes === "string") {
    routeFilter = routes;
  }

  const url = `https://api-v3.mbta.com/vehicles?filter[route]=${routeFilter}&filter[route_type]=3`;

  const res = await fetch(url, {
    headers: {
      "x-api-key": process.env.MBTA_API_KEY || "",
    },
  });

  if (!res.ok) {
    throw new Error(`MBTA API failed: ${res.status}`);
  }

  const json = await res.json();

  return json.data.map((v: any): NormalizedBus => ({
    id: v.id,
    route: v.relationships.route.data?.id || "unknown",
    lat: v.attributes.latitude ?? null,
    lng: v.attributes.longitude ?? null,
    eta: null, // we'll merge predictions later
    delay: 0,
    speed: v.attributes.speed ?? null,
    status: v.attributes.current_status,
  }));
}