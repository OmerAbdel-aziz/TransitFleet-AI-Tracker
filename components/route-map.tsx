"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Filter, ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react"

// interface RouteMapProps { routeId: string; buses: { id: string; lat: number; lng: number; status: string }[] }
export function RouteMap({
  routeId,
  buses,
}: {
  routeId: string
  buses: { id: string; lat: number; lng: number; status: string }[]
}) {
  const [controlsMinimized, setControlsMinimized] = useState(false)

  return (
    <Card className="relative overflow-hidden border-[#6939db]">
      {/* Map placeholder */}
      <div className="h-[50vh] bg-muted flex items-center justify-center border-2 border-[#6939db] rounded-lg">
        <div className="text-center">
          <div className="text-lg font-medium text-muted-foreground mb-2">Leaflet Map Placeholder</div>
          <div className="text-sm text-muted-foreground">
            Route {routeId} - {buses.length} buses active
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div
        className={`
        absolute top-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg border border-[#6939db] shadow-lg transition-all duration-300
        ${controlsMinimized ? "w-12 h-12" : "p-4"}
      `}
      >
        {controlsMinimized ? (
          <Button variant="ghost" size="sm" className="w-full h-full p-0" onClick={() => setControlsMinimized(false)}>
            <Maximize2 className="h-4 w-4 text-[#6939db]" />
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Map Controls</h3>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setControlsMinimized(true)}>
                <Minimize2 className="h-3 w-3 text-[#6939db]" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                className="bg-[#6939db] hover:bg-[#8b5cf6] text-white hover:scale-105 transition-transform"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter Buses
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-[#6939db] text-[#6939db] hover:bg-[#6939db] hover:text-white hover:scale-105 transition-transform bg-transparent"
              >
                <ZoomIn className="mr-2 h-4 w-4" />
                Zoom In
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-[#6939db] text-[#6939db] hover:bg-[#6939db] hover:text-white hover:scale-105 transition-transform bg-transparent"
              >
                <ZoomOut className="mr-2 h-4 w-4" />
                Zoom Out
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Bus Status Legend */}
      <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg border border-[#6939db] p-3 shadow-lg">
        <h4 className="text-xs font-medium mb-2">Bus Status</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>On Time ({buses.filter((b) => b.status === "on-time").length})</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Delayed ({buses.filter((b) => b.status === "delayed").length})</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Early ({buses.filter((b) => b.status === "early").length})</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
