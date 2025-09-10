"use client"

import { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"

interface Bus {
  eta: string | number | Date
  id: string
  lat: number
  lng: number
  route: string
  status: "on-time" | "delayed" | "early"
}

export function useBusSocket() {
  const [buses, setBuses] = useState<Bus[]>([])

  useEffect(() => {
    const socket: Socket = io("http://localhost:3001", {
      path: "/api/socket",
    })

    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket.id)
      // Expose for debugging
      ;(window as any).socket = socket
    })

    socket.on("busUpdate", (data: Bus[]) => {
      console.log("📡 Got bus update:", data)
      setBuses(data)
    })

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from socket")
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return buses
}
