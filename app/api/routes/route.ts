import { NextResponse } from "next/server";
import { fetchMbtaRoutes } from "@/lib/fetchMbtaRoutes";

export async function GET() {
  try {
    const routes = await fetchMbtaRoutes();
    return NextResponse.json(routes);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
