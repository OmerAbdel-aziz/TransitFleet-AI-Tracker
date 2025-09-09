"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ZoomIn, ZoomOut, Filter, MapPin, Minimize2, Maximize2 } from "lucide-react"

// TypeScript interfaces
interface Bus {
  id: string
  lat: number
  lng: number
  route: string
  status: "on-time" | "delayed" | "early"
}

interface MapViewProps {
  buses?: Bus[]
  className?: string
}

export function MapView({ buses = [], className }: MapViewProps) {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "buses" | "routes">("all")
  const [controlPanelMinimized, setControlPanelMinimized] = useState(false)
  const [legendMinimized, setLegendMinimized] = useState(false)

  return (
    <Card className="w-full border-[#a78bfa] dark:border-[#6939db]">
      <div className="relative">
        {/* Map placeholder */}
        <div className="w-full h-[60vh] bg-gray-100 dark:bg-gray-800 border-2 border-[#8b5cf6] dark:border-[#6939db] rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-[#6939db] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Leaflet Map Placeholder</h3>
            <p className="text-gray-500 dark:text-gray-400">Interactive transit map will be displayed here</p>
          </div>
        </div>

        {/* Control panel */}
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center justify-between p-2 border-b bg-[#f3f4f6] dark:bg-[#4c1d95]">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Controls</span>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 hover:bg-[#8b5cf6] dark:hover:bg-[#6939db]"
              onClick={() => setControlPanelMinimized(!controlPanelMinimized)}
            >
              {controlPanelMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
            </Button>
          </div>

          {!controlPanelMinimized && (
            <div className="p-3 space-y-2">
              <div className="flex flex-col space-y-2">
                {/* Zoom controls */}
                <div className="flex space-x-1">
                  <Button size="sm" className="bg-[#6939db] hover:bg-[#5b21b6] text-white">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-[#6939db] hover:bg-[#5b21b6] text-white">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </div>

                {/* Filter controls */}
                <div className="border-t pt-2">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Filter by:</p>
                  <div className="space-y-1">
                    {["all", "buses", "routes"].map((filter) => (
                      <Button
                        key={filter}
                        size="sm"
                        variant={selectedFilter === filter ? "default" : "outline"}
                        className={`
                          w-full text-xs capitalize
                          ${
                            selectedFilter === filter
                              ? "bg-[#6939db] hover:bg-[#5b21b6] text-white"
                              : "border-[#8b5cf6] text-[#6939db] hover:bg-[#f3f4f6] dark:hover:bg-[#4c1d95]"
                          }
                        `}
                        onClick={() => setSelectedFilter(filter as any)}
                      >
                        <Filter className="h-3 w-3 mr-1" />
                        {filter}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center justify-between p-2 border-b bg-[#f3f4f6] dark:bg-[#4c1d95]">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Legend</span>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 hover:bg-[#8b5cf6] dark:hover:bg-[#6939db]"
              onClick={() => setLegendMinimized(!legendMinimized)}
            >
              {legendMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
            </Button>
          </div>

          {!legendMinimized && (
            <div className="p-3">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Bus Status</p>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">On Time</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Delayed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Early</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
