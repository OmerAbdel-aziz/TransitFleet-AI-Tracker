"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { MapView } from "./map-view"
import { MetricsPanel } from "./metrics-panel"
import { PredictionCard } from "@/components/predictions-card"
import { Button } from "@/components/ui/button"
import { LogOut, Menu, X, Sun, Moon } from "lucide-react"
import { navigation } from "@/config/navigation"
import Link from "next/link"
import { useBusSocket } from "@/lib/hooks/useBusSocket"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const buses = useBusSocket()

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-[1010]">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-background border-[#6939db]/20"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-[1020] w-64 bg-[#6939db] dark:bg-[#4c1d95] transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 border-b border-white/10">
            <h1 className="text-xl font-bold text-white">TransitFleet AI</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  item.href === "/"
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10 space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-full justify-center text-white/80 hover:bg-white/10 cursor-pointer"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        <main className="p-6 lg:p-8 space-y-6">
          <div className="hidden lg:block">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Fleet Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time monitoring and AI-powered predictions for your transit fleet
            </p>
          </div>

          <MapView buses={buses} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MetricsPanel />
            </div>
            <div>
              <PredictionCard />
            </div>
          </div>

          {children}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[1010] bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export { DashboardLayout }
export default DashboardLayout