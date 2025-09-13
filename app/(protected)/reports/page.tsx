import { ReportsLayout } from "@/components/reports-layout"
import { ReportTable } from "@/components/reports-table"
import { ExportControls } from "@/components/export-control"
import { ReportChart } from "@/components/reports-chart"

// Sample data for demonstration
const sampleReports = [
  { routeId: "R001", avgDelay: 3.2, distance: 45.8, date: "2024-01-15" },
  { routeId: "R002", avgDelay: 1.8, distance: 32.4, date: "2024-01-15" },
  { routeId: "R003", avgDelay: 5.1, distance: 67.2, date: "2024-01-15" },
  { routeId: "R004", avgDelay: 2.3, distance: 28.9, date: "2024-01-15" },
  { routeId: "R005", avgDelay: 4.7, distance: 51.6, date: "2024-01-15" },
]

const chartData = [
  { date: "2024-01-01", performance: 85 },
  { date: "2024-01-02", performance: 88 },
  { date: "2024-01-03", performance: 82 },
  { date: "2024-01-04", performance: 90 },
  { date: "2024-01-05", performance: 87 },
  { date: "2024-01-06", performance: 91 },
  { date: "2024-01-07", performance: 89 },
]

export default function ReportsPage() {
  return (
    <ReportsLayout>
      <div className="space-y-6">
        {/* Export Controls - Sticky top bar */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-[#6939db]/20">
          <ExportControls />
        </div>

        {/* Report Table */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Fleet Performance Reports</h2>
          <ReportTable reports={sampleReports} />
        </div>

        {/* Report Chart */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Performance Analytics</h2>
          <ReportChart data={chartData} />
        </div>
      </div>
    </ReportsLayout>
  )
}
