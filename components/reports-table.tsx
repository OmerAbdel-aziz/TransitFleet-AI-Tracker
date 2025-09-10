"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// TypeScript interface for report data
interface Report {
  routeId: string
  avgDelay: number
  distance: number
  date: string
}

interface ReportTableProps {
  reports: Report[]
}

export function ReportTable({ reports }: ReportTableProps) {
  const getDelayBadgeVariant = (delay: number) => {
    if (delay <= 2) return "default"
    if (delay <= 4) return "secondary"
    return "destructive"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="border-[#6939db]/20">
      <CardHeader className="bg-[#6939db]/5 dark:bg-[#6939db]/10">
        <CardTitle className="text-[#6939db] dark:text-[#a78bfa]">Fleet Performance Data</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#6939db] dark:bg-[#5b21b6]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Route ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Avg Delay (min)</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Total Distance (km)</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reports.map((report, index) => (
                <tr key={report.routeId} className="hover:bg-[#6939db]/5 dark:hover:bg-[#6939db]/10 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-[#6939db] dark:text-[#a78bfa]">{report.routeId}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{report.avgDelay.toFixed(1)}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{report.distance.toFixed(1)}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(report.date)}</td>
                  <td className="px-6 py-4">
                    <Badge variant={getDelayBadgeVariant(report.avgDelay)}>
                      {report.avgDelay <= 2 ? "On Time" : report.avgDelay <= 4 ? "Minor Delay" : "Major Delay"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export default ReportTable
