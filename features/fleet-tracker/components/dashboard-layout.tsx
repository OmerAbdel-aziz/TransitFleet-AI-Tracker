"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { MapView } from "./map-view"
import { MetricsPanel } from  "./metrics-panel"
import { PredictionCard } from "@/features/ai-predictions/components/predictions-card"
import { Button } from "@/components/ui/button"
import { Home, Route, FileText, LogOut, Menu, X, Sun, Moon } from "lucide-react"

// TypeScript interfaces
interface DashboardLayoutProps {
  className?: string
}

const DashboardLayout = ({ className }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const navigationItems = [
    { icon: Home, label: "Home", href: "/dashboard", active: true },
    { icon: Route, label: "Routes", href: "/routes" },
    { icon: FileText, label: "Reports", href: "/reports" },
    { icon: LogOut, label: "Logout", href: "/logout" },
  ]

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-[#6939db] dark:bg-[#4c1d95] 
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:relative lg:z-auto lg:flex-shrink-0
      `}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#8b5cf6]">
          <h1 className="text-xl font-bold text-white">TransitFleet AI</h1>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-[#5b21b6]"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "secondary" : "ghost"}
              className={`
                w-full justify-start text-white hover:bg-[#5b21b6]
                ${item.active ? "bg-[#8b5cf6]" : ""}
              `}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-[#5b21b6]"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="mr-3 h-5 w-5" /> : <Moon className="mr-3 h-5 w-5" />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden bg-white dark:bg-gray-800 border-b p-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 p-6 space-y-6">
          <div className="hidden lg:block">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Fleet Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time monitoring and AI-powered predictions for your transit fleet
            </p>
          </div>

          {/* Map View - Full width */}
          <MapView />

          {/* Metrics and Predictions - Side by side on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MetricsPanel />
            </div>
            <div>
              <PredictionCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export { DashboardLayout }
export default DashboardLayout
