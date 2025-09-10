"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Table, Calendar } from "lucide-react"

export function ExportControls() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleExportPDF = () => {
    // PDF export logic would go here
    console.log("[v0] Exporting as PDF with date range:", { startDate, endDate })
  }

  const handleExportCSV = () => {
    // CSV export logic would go here
    console.log("[v0] Exporting as CSV with date range:", { startDate, endDate })
  }

  return (
    <Card className="border-[#6939db]/20">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Date Range Picker */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-sm font-medium text-foreground">
                Start Date
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6939db]" />
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-10 border-[#6939db]/20 focus:border-[#6939db] focus:ring-[#6939db]/20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date" className="text-sm font-medium text-foreground">
                End Date
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6939db]" />
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="pl-10 border-[#6939db]/20 focus:border-[#6939db] focus:ring-[#6939db]/20"
                />
              </div>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleExportPDF}
              className="bg-[#6939db] hover:bg-[#8b5cf6] text-white transition-all duration-200 hover:scale-105"
            >
              <FileText className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            <Button
              onClick={handleExportCSV}
              variant="outline"
              className="border-[#6939db] text-[#6939db] hover:bg-[#6939db] hover:text-white transition-all duration-200 hover:scale-105 bg-transparent"
            >
              <Table className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ExportControls
