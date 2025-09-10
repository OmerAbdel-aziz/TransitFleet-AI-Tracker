"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// TypeScript interface for chart data
interface ChartDataPoint {
  date: string
  performance: number
}

interface ReportChartProps {
  data: ChartDataPoint[]
}

export function ReportChart({ data }: ReportChartProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-[#6939db]/20 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{formatDate(label)}</p>
          <p className="text-sm text-[#6939db]">Performance: {payload[0].value}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="border-[#6939db]/20">
      <CardHeader className="bg-[#6939db]/5 dark:bg-[#6939db]/10">
        <CardTitle className="text-[#6939db] dark:text-[#a78bfa]">Fleet Performance Over Time</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-20" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                stroke="currentColor"
                className="text-xs text-muted-foreground"
              />
              <YAxis domain={[0, 100]} stroke="currentColor" className="text-xs text-muted-foreground" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="performance"
                stroke="#6939db"
                strokeWidth={3}
                dot={{ fill: "#6939db", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#6939db", strokeWidth: 2, fill: "#8b5cf6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-3 h-3 bg-[#6939db] rounded-full"></div>
            <span>Fleet Performance Percentage</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ReportChart
