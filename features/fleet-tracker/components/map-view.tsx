"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ZoomIn, ZoomOut, Filter, Minimize2, Maximize2 } from "lucide-react"
import dynamic from 'next/dynamic'

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

interface TflBus {
  eta: string | number | Date
  id: string
  lat: number
  lng: number
  route: string
  status: "on-time" | "delayed" | "early"
}

interface MapViewProps {
  buses?: TflBus[]
  className?: string
}

// Custom marker icons based on status
const createCustomIcon = (status: string) => {
  if (typeof window === 'undefined') return null
  
  const L = require('leaflet')
  
  const colors = {
    'on-time': '#10b981',
    'delayed': '#ef4444',
    'early': '#3b82f6'
  }
  
  const color = colors[status as keyof typeof colors] || '#6b7280'
  
  return L.divIcon({
    html: `
      <div style="
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: ${color};
        border: 2px solid white;
        box-shadow: 0 0 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: bold;
        color: white;
      ">🚌</div>
    `,
    className: 'custom-bus-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  })
}

// Leaflet setup component
const LeafletMap = ({ buses }: { buses: TflBus[] }) => {
  useEffect(() => {
    // Fix for default markers in Leaflet
    if (typeof window !== 'undefined') {
      const L = require('leaflet')
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
        iconUrl: '/leaflet/images/marker-icon.png',
        shadowUrl: '/leaflet/images/marker-shadow.png',
      })
    }
  }, [])

  if (typeof window === 'undefined') {
    return (
      <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <MapContainer
      center={[42.3601, -71.0589]}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full rounded-lg border-2 border-[#8b5cf6] dark:border-[#6939db]"
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {buses.map((bus) => {
        const icon = createCustomIcon(bus.status)
        return (
          <Marker 
            key={bus.id} 
            position={[bus.lat, bus.lng]}
            icon={icon}
          >
            <Popup>
              <div className="text-sm">
                <div className="font-semibold">Bus {bus.id}</div>
                <div>Route: {bus.route}</div>
                <div>Status: <span className={`font-medium ${
                  bus.status === 'on-time' ? 'text-green-600' :
                  bus.status === 'delayed' ? 'text-red-600' :
                  'text-blue-600'
                }`}>{bus.status}</span></div>
                <div>ETA: {new Date(bus.eta).toLocaleTimeString()}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Position: {bus.lat.toFixed(4)}, {bus.lng.toFixed(4)}
                </div>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}

export function MapView({ buses = [], className }: MapViewProps) {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "buses" | "routes">("all")
  const [controlPanelMinimized, setControlPanelMinimized] = useState(false)
  const [legendMinimized, setLegendMinimized] = useState(false)
  const [debugMode, setDebugMode] = useState(process.env.NODE_ENV === 'development')
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering map
  useEffect(() => {
    setMounted(true)
    
    // Load Leaflet CSS dynamically
    if (typeof window !== 'undefined') {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
      link.crossOrigin = ''
      
      // Only add if not already present
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        document.head.appendChild(link)
      }
    }
  }, [])

  // Filter and validate buses
  const validBuses = buses.filter((bus) => {
    if (!bus) {
      console.warn('Found null/undefined bus in data')
      return false
    }
    
    // Check if lat/lng exist and are not null
    if (bus.lat === null || bus.lat === undefined || bus.lng === null || bus.lng === undefined) {
      console.warn(`Bus ${bus.id || 'unknown'} has null/undefined coordinates:`, { lat: bus.lat, lng: bus.lng })
      return false
    }
    
    const lat = Number(bus.lat)
    const lng = Number(bus.lng)
    
    if (isNaN(lat) || isNaN(lng)) {
      console.warn(`Bus ${bus.id || 'unknown'} has invalid coordinate values:`, { lat: bus.lat, lng: bus.lng, converted: { lat, lng } })
      return false
    }
    
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      console.warn(`Bus ${bus.id || 'unknown'} has out-of-range coordinates:`, { lat, lng })
      return false
    }
    
    if (!bus.id) {
      console.warn('Bus missing ID:', bus)
      return false
    }
    
    return true
  })

  // Apply filters
  const filteredBuses = validBuses.filter((bus) => {
    switch (selectedFilter) {
      case "buses":
        return bus.status !== undefined
      case "routes":
        return bus.route !== undefined
      default:
        return true
    }
  })

  useEffect(() => {
    if (debugMode) {
      console.log("🚌 MapView Debug Info:")
      console.log("  - Total buses received:", buses.length)
      console.log("  - Valid buses:", validBuses.length)
      console.log("  - Filtered buses:", filteredBuses.length)
      console.log("  - Component mounted:", mounted)
      
      if (buses.length > 0) {
        console.log("  - First bus sample:", buses[0])
      }
      
      if (validBuses.length > 0) {
        console.log("  - First valid bus:", validBuses[0])
      }
      
      // Check for common data issues
      buses.forEach((bus, index) => {
        if (!bus.lat || !bus.lng) {
          console.warn(`  ⚠️ Bus ${index} missing coordinates:`, bus)
        }
        if (typeof bus.lat === 'string' || typeof bus.lng === 'string') {
          console.warn(`  ⚠️ Bus ${index} has string coordinates:`, { lat: bus.lat, lng: bus.lng, types: { lat: typeof bus.lat, lng: typeof bus.lng } })
        }
      })
    }
  }, [buses, validBuses, filteredBuses, mounted, debugMode])

  if (!mounted) {
    return (
      <Card className="w-full border-[#a78bfa] dark:border-[#6939db]">
        <div className="relative w-full h-[75vh]">
          <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Initializing map...</p>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="w-full border-[#a78bfa] dark:border-[#6939db]">
      <div className="relative w-full h-[75vh]"> 
        
      
        {debugMode && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/90 text-white p-3 rounded-lg text-xs z-[1001] max-w-sm">
            <div className="grid grid-cols-2 gap-2">
              <div>Total: <span className="font-mono text-yellow-300">{buses.length}</span></div>
              <div>Valid: <span className="font-mono text-green-300">{validBuses.length}</span></div>
              <div>Filtered: <span className="font-mono text-blue-300">{filteredBuses.length}</span></div>
              <div>Filter: <span className="font-mono text-purple-300">{selectedFilter}</span></div>
            </div>
            {validBuses.length === 0 && buses.length > 0 && (
              <div className="mt-2 text-red-300 text-xs">
                ⚠️ No valid coordinates found in bus data
              </div>
            )}
          </div>
        )}

        {/* Map Container */}
        <div className="w-full h-full relative">
          <LeafletMap buses={filteredBuses} />
          
          {/* No data overlay */}
          {/* {filteredBuses.length === 0 && (
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center z-[999]">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-2">🚌</div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {buses.length === 0 ? "No bus data available" : "No buses match current filter"}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {buses.length === 0 ? "Waiting for real-time data..." : `${buses.length} total buses available`}
                </div>
              </div>
            </div>
          )} */}
        </div>

        {/* Control panel */}
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-[1000]">
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
                        {filter} ({
                          filter === 'all' ? validBuses.length :
                          filter === 'buses' ? validBuses.filter(b => b.status).length :
                          validBuses.filter(b => b.route).length
                        })
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Debug toggle (development only) */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="border-t pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs"
                      onClick={() => setDebugMode(!debugMode)}
                    >
                      {debugMode ? "Hide Debug" : "Show Debug"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-[1000]">
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
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    On Time ({validBuses.filter(b => b.status === 'on-time').length})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Delayed ({validBuses.filter(b => b.status === 'delayed').length})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Early ({validBuses.filter(b => b.status === 'early').length})
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}