let lastGoodData: any[] = [];

export async function fetchMbtaBuses(routes?: string[] | string) {
  let routeFilter = "1";
  if (Array.isArray(routes)) routeFilter = routes.join(",");
  else if (typeof routes === "string") routeFilter = routes;

  const url = `https://api-v3.mbta.com/vehicles?filter[route]=${routeFilter}&filter[route_type]=3`;

  const res = await fetch(url, {
    headers: {
      "x-api-key": process.env.MBTA_API_KEY || "",
    },
  });

  if (!res.ok) {
    console.warn(`⚠️ MBTA fetch failed (${res.status}), using cached data`);
    return lastGoodData;
  }

  const json = await res.json();
  lastGoodData = json.data.map((v: any) => ({
    id: v.id,
    route: v.relationships.route.data?.id || "unknown",
    lat: v.attributes.latitude,
    lng: v.attributes.longitude,
    speed: v.attributes.speed,
    status: v.attributes.current_status,
    updatedAt: v.attributes.updated_at,
  }));

  return lastGoodData;
}
