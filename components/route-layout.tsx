"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { RouteMap } from "./route-map"
import { RouteAnalytics } from "@/components/routes-analytics"
import { RouteOptimizer } from "./route-optimizer"
import { Home, Route, FileText, LogOut, Sun, Moon, Menu, X } from "lucide-react"

// interface RouteLayoutProps { routeId: string }
const RouteLayout = ({ routeId }: { routeId: string }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Routes", href: "/routes", icon: Route, current: true },
    { name: "Reports", href: "/reports", icon: FileText },
  ]

  // Mock data for the route
  const buses = [
    { id: "bus-001", lat: 40.7128, lng: -74.006, status: "on-time" },
    { id: "bus-002", lat: 40.7589, lng: -73.9851, status: "delayed" },
    { id: "bus-003", lat: 40.7505, lng: -73.9934, status: "on-time" },
    { id: "bus-004", lat: 40.7282, lng: -73.7949, status: "early" },
    { id: "bus-005", lat: 40.6892, lng: -74.0445, status: "on-time" },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#6939db] dark:bg-[#5b21b6] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-[#8b5cf6]/20">
            <h1 className="text-lg font-semibold text-white">TransitFleet AI</h1>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-[#8b5cf6]/20"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                  ${item.current ? "bg-[#8b5cf6] text-white" : "text-white/80 hover:bg-[#8b5cf6]/20 hover:text-white"}
                `}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </a>
            ))}
          </nav>

          {/* Bottom section */}
          <div className="border-t border-[#8b5cf6]/20 p-4 space-y-2">
            {/* Theme switcher */}
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center text-white hover:bg-[#8b5cf6]/20"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Logout */}
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-white/80 hover:bg-[#8b5cf6]/20 hover:text-white"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-card border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Route {routeId}</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Page header */}
            <div className="hidden lg:block">
              <h1 className="text-2xl font-bold text-foreground">Route {routeId}</h1>
              <p className="text-muted-foreground">Real-time monitoring and optimization</p>
            </div>

            {/* Route Map - Full width */}
            <RouteMap routeId={routeId} buses={buses} />

            {/* Analytics and Optimizer - Side by side on desktop, stacked on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RouteAnalytics routeId={routeId} buses={buses} />
              <RouteOptimizer routeId={routeId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { RouteLayout }
export default RouteLayout
