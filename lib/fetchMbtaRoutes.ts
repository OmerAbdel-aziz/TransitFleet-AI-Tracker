export async function fetchMbtaRoutes() {
  const url = `https://api-v3.mbta.com/routes?filter[type]=3`;

  const res = await fetch(url, {
    headers: {
      "x-api-key": process.env.MBTA_API_KEY || "",
    },
    cache: "no-store", // always fresh
  });

  if (!res.ok) throw new Error(`MBTA routes fetch failed: ${res.status}`);

  const json = await res.json();

  return json.data.map((r: any) => ({
    id: r.id,
    shortName: r.attributes.short_name || r.id,
    longName: r.attributes.long_name || "",
    description: r.attributes.description || "",
  }));
}
