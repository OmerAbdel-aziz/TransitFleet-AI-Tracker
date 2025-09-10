import { NextResponse } from "next/server"
import { fetchTfLBuses } from "@/lib/fetchTfl"

export async function GET() {
  try {
    const buses = await fetchTfLBuses(["55", "12", "25"])
    return NextResponse.json(buses)
  } catch (err: any) {
    console.error("❌ TfL API error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
