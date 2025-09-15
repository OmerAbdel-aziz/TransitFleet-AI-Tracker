"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { AlertTriangle, Brain, Clock, CheckCircle } from "lucide-react"

// TypeScript interfaces
interface Prediction {
  id: string
  busId: string
  message: string
  confidence: number
  severity: "low" | "medium" | "high"
  timestamp: Date
}

interface PredictionCardProps {
  predictions?: Prediction[]
  className?: string
}

export function PredictionCard({ className }: PredictionCardProps) {
  const [aiAlertsEnabled, setAiAlertsEnabled] = useState(true)

  // Sample predictions
  const predictions: Prediction[] = [
    {
      id: "1",
      busId: "123",
      message: "15min delay predicted",
      confidence: 85,
      severity: "high",
      timestamp: new Date(),
    },
    {
      id: "2",
      busId: "456",
      message: "Route optimization suggested",
      confidence: 72,
      severity: "medium",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    },
    {
      id: "3",
      busId: "789",
      message: "On-time arrival expected",
      confidence: 94,
      severity: "low",
      timestamp: new Date(Date.now() - 600000), // 10 minutes ago
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return AlertTriangle
      case "medium":
        return Clock
      case "low":
        return CheckCircle
      default:
        return Brain
    }
  }

  return (
    <Card className="bg-[#f3f4f6] dark:bg-[#4c1d95]/20 border-[#a78bfa] dark:border-[#6939db]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <Brain className="h-5 w-5 text-[#6939db] mr-2" />
            AI Predictions
          </CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Alerts</span>
            <Switch
              checked={aiAlertsEnabled}
              onCheckedChange={setAiAlertsEnabled}
              className="data-[state=checked]:bg-[#6939db]"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {aiAlertsEnabled ? (
          <>
            {predictions.map((prediction) => {
              const SeverityIcon = getSeverityIcon(prediction.severity)
              return (
                <div
                  key={prediction.id}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-[#a78bfa] dark:border-[#8b5cf6] hover:scale-105 transition-transform duration-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <SeverityIcon className="h-4 w-4 text-[#6939db]" />
                      <span className="font-medium text-gray-900 dark:text-gray-100">Bus #{prediction.busId}</span>
                    </div>
                    <Badge className={getSeverityColor(prediction.severity)}>{prediction.confidence}% confidence</Badge>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{prediction.message}</p>
                  {/* <p className="text-xs text-gray-500 dark:text-gray-400">
                    {prediction.timestamp.toLocaleTimeString()}
                  </p> */}
                </div>
              )
            })}
            <Button className="w-full bg-[#6939db] hover:bg-[#5b21b6] text-white" size="sm">
              View All Predictions
            </Button>
          </>
        ) : (
          <div className="text-center py-8">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">AI alerts are disabled</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Enable alerts to see predictions</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
