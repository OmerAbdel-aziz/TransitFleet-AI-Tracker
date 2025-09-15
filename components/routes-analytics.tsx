"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Bus, Clock, TrendingUp } from "lucide-react"

// interface RouteAnalyticsProps { routeId: string; buses: { id: string; lat: number; lng: number; status: string }[] }
export function RouteAnalytics({
  routeId,
  buses,
}: {
  routeId: string
  buses: { id: string; lat: number; lng: number; status: string }[]
}) {
  // Mock delay data for the chart
  const delayData = [
    { bus: "Bus 1", delay: 2 },
    { bus: "Bus 2", delay: 8 },
    { bus: "Bus 3", delay: 0 },
    { bus: "Bus 4", delay: -3 },
    { bus: "Bus 5", delay: 5 },
  ]

  const avgDelay = delayData.reduce((sum, item) => sum + item.delay, 0) / delayData.length

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-[#6939db]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Buses</p>
                <p className="text-2xl font-bold text-[#6939db]">{buses.length}</p>
              </div>
              <Bus className="h-8 w-8 text-[#6939db]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#6939db]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Delay</p>
                <p className="text-2xl font-bold text-[#6939db]">{Math.round(avgDelay)}min</p>
              </div>
              <Clock className="h-8 w-8 text-[#6939db]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#6939db]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Time</p>
                <p className="text-2xl font-bold text-[#6939db]">
                  {Math.round((buses.filter((b) => b.status === "on-time").length / buses.length) * 100)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-[#6939db]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delay Chart */}
      <Card className="border-[#6939db]">
        <CardHeader>
          <CardTitle className="text-[#6939db]">Delay by Bus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={delayData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="bus" className="text-xs" />
                <YAxis className="text-xs" label={{ value: "Minutes", angle: -90, position: "insideLeft" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid #6939db",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="delay" fill="#6939db" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
