import { NextRequest, NextResponse } from "next/server"
import { predictDelay } from "@/lib/predictDelay"


export async function POST(req: NextRequest) {
try {
const body = await req.json()
console.log("Prediction request received:", body)


const prediction = await predictDelay(body)


return NextResponse.json(prediction)
} catch (error: any) {
console.error("Prediction API route error:", error)


return NextResponse.json(
{
error: "Prediction failed",
error_type: error?.name || "UNKNOWN_ERROR",
technical_details: error?.message || String(error),
},
{ status: 500 }
)
}
}