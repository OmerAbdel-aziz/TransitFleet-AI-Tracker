// "use client"

// import { useEffect, useState } from "react"
// import { io, Socket } from "socket.io-client"

// interface Bus {
//   eta: string | number | Date
//   id: string
//   lat: number
//   lng: number
//   route: string
//   status: "on-time" | "delayed" | "early"
//   delay: number
// }

// export function useBusSocket() {
//   const [buses, setBuses] = useState<Bus[]>([])

//   useEffect(() => {
//     const socket: Socket = io("http://localhost:3001", {
//       path: "/api/socket",
//     })

//     socket.on("connect", () => {
//       console.log("✅ Connected to socket:", socket.id)
//       // Expose for debugging
//       ;(window as any).socket = socket
//     })

//     socket.on("busUpdate", (data: Bus[]) => {
//       console.log("📡 Got bus update:", data)
//       setBuses(data)
//     })

//     socket.on("disconnect", () => {
//       console.log("❌ Disconnected from socket")
//     })

//     return () => {
//       socket.disconnect()
//     }
//   }, [])

//   return buses
// }



// hooks/useBusSocket.ts (renamed for clarity; was useBusSocket.ts)
"use client"

import { useEffect, useState } from "react"
import Pusher from "pusher-js"

interface Bus {
  eta: string | number | Date
  id: string
  lat: number
  lng: number
  route: string
  status: "on-time" | "delayed" | "early"  // Add this if missing
  delay: number
  weather?: any  // Add to match fetchMbta output
}

export function useBusSocket() {
  const [buses, setBuses] = useState<Bus[]>([])

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_PUSHER_KEY || !process.env.NEXT_PUBLIC_PUSHER_CLUSTER) {
      console.error("❌ Pusher env vars missing!");
      return;
    }

    // Enable Pusher logging for debugging
    Pusher.logToConsole = true;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      forceTLS: true,  // Recommended for security
    })

    pusher.connection.bind('connected', () => {
      console.log("✅ Pusher connected!");
    });

    pusher.connection.bind('error', (err: any) => {
      console.error("❌ Pusher connection error:", err);
    });

    const channel = pusher.subscribe("bus-channel")

    channel.bind("pusher:subscription_succeeded", (members: any) => {
      console.log("✅ Subscribed to bus-channel, members:", members.count);
    });

    channel.bind("busUpdate", (data: Bus[]) => {
      console.log("📡 Got bus update:", data.length, "buses");
      setBuses(data);
      console.log("Updated buses state:", data);  // Log updated state
    });

    channel.bind("pusher:error", (err: any) => {
      console.error("❌ Channel error:", err);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
      // if (intervalId) clearInterval(intervalId);  // If using dev interval
    }
  }, [])

  console.log("Current buses state:", buses);  // This will now update on re-renders
  return buses
}
