"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Bus, Clock, MapPin, TrendingUp } from "lucide-react"

// Types
interface FleetMetric {
  label: string
  value: string | number
  icon: React.ComponentType<any>
  trend?: "up" | "down" | "stable"
  color: string
}

export function MetricsPanel() {
  const [metrics, setMetrics] = useState<FleetMetric[] | null>(null)

  useEffect(() => {
    fetch("/api/metrics")
      .then((res) => res.json())
      .then((data) => {
        const updated: FleetMetric[] = [
          {
            label: "Total Buses",
            value: data.totalBuses,
            icon: Bus,
            trend: "stable",
            color: "text-[#6939db]",
          },
          {
            label: "Avg Delay",
            value: `${data.avgDelay} min`,
            icon: Clock,
            trend: data.avgDelay > 5 ? "up" : data.avgDelay < 5 ? "down" : "stable",
            color: data.avgDelay > 5 ? "text-red-600" : "text-green-600",
          },
          {
            label: "Distance Covered",
            value: data.distanceCovered ? `${data.distanceCovered} km` : "N/A",
            icon: MapPin,
            trend: "up",
            color: "text-blue-600",
          },
          {
            label: "Active Routes",
            value: data.activeRoutes,
            icon: TrendingUp,
            trend: "up",
            color: "text-orange-600",
          },
        ]
        setMetrics(updated)
      })
      .catch(console.error)
  }, [])

  // Placeholder delay trend (we’ll replace with real predictions later)
  const delayTrendData = [
    { time: "06:00", delay: 2 },
    { time: "08:00", delay: 8 },
    { time: "10:00", delay: 5 },
    { time: "12:00", delay: 3 },
    { time: "14:00", delay: 6 },
    { time: "16:00", delay: 12 },
    { time: "18:00", delay: 9 },
    { time: "20:00", delay: 4 },
  ]

  if (!metrics) return <p>Loading metrics...</p>

  return (
    <div className="space-y-6">
      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card
            key={index}
            className="border-[#a78bfa] dark:border-[#6939db] hover:scale-105 transition-transform duration-200"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{metric.value}</p>
                </div>
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
              </div>
              {metric.trend && (
                <div className="mt-2 flex items-center">
                  <TrendingUp
                    className={`h-4 w-4 mr-1 ${
                      metric.trend === "up"
                        ? "text-green-500 rotate-0"
                        : metric.trend === "down"
                        ? "text-red-500 rotate-180"
                        : "text-gray-500"
                    }`}
                  />
                  <span className="text-xs text-gray-500">
                    {metric.trend === "up"
                      ? "Increasing"
                      : metric.trend === "down"
                      ? "Decreasing"
                      : "Stable"}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delay Trend Chart */}
      <Card className="border-[#a78bfa] dark:border-[#6939db]">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Delay Trend Chart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={delayTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="time" className="text-xs" tick={{ fill: "currentColor" }} />
                <YAxis
                  className="text-xs"
                  tick={{ fill: "currentColor" }}
                  label={{ value: "Delay (min)", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="delay"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: "#6939db", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#6939db" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
