"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Clock, Route, CheckCircle } from "lucide-react"

// interface RouteOptimizerProps { routeId: string }
export function RouteOptimizer({ routeId }: { routeId: string }) {
  const suggestions = [
    {
      id: 1,
      type: "route",
      title: "Avoid Main Street",
      description: "Heavy traffic detected on Main St. Alternative route saves 10 minutes.",
      impact: "High",
      savings: "10 min",
      icon: Route,
    },
    {
      id: 2,
      type: "schedule",
      title: "Adjust Bus 002 Schedule",
      description: "Bus 002 consistently runs 5 minutes late. Recommend schedule adjustment.",
      impact: "Medium",
      savings: "5 min",
      icon: Clock,
    },
    {
      id: 3,
      type: "optimization",
      title: "Increase Frequency",
      description: "High passenger demand detected. Consider adding one more bus during peak hours.",
      impact: "High",
      savings: "15% capacity",
      icon: Lightbulb,
    },
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <Card className="border-[#6939db] bg-[#a78bfa]/5 dark:bg-[#a78bfa]/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#6939db]">
          <Lightbulb className="h-5 w-5" />
          AI Route Optimizer
        </CardTitle>
        <p className="text-sm text-muted-foreground">AI-powered suggestions to improve route efficiency</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="p-4 rounded-lg border border-[#6939db]/20 bg-card hover:bg-[#a78bfa]/10 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#6939db]/10">
                <suggestion.icon className="h-4 w-4 text-[#6939db]" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{suggestion.title}</h4>
                  <Badge className={getImpactColor(suggestion.impact)}>{suggestion.impact}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#6939db]">Saves: {suggestion.savings}</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2 text-xs border-[#6939db] text-[#6939db] hover:bg-[#6939db] hover:text-white hover:scale-105 transition-transform bg-transparent"
                    >
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Button className="w-full bg-[#6939db] hover:bg-[#8b5cf6] text-white hover:scale-105 transition-transform">
          View All Suggestions
        </Button>
      </CardContent>
    </Card>
  )
}
