// app/api/socket/route.ts
import { Server } from "socket.io";
import { fetchMbtaBusesWithWeather } from "@/lib/fetchMbta";

export const GET = async () => {
  if (!(global as any).io) {
    console.log("🔌 Starting Socket.io server...");

    const io = new Server(3001, {
      cors: { origin: "*" },
      path: "/api/socket",
    });

    (global as any).io = io;

    io.on("connection", (socket) => {
      console.log("✅ Client connected:", socket.id);
    });

    // Fetch MBTA buses every 10s and include weather
    setInterval(async () => {
      try {
        const buses = await fetchMbtaBusesWithWeather(["1", "66", "15"]); // multiple routes
        io.emit("busUpdate", buses);
      } catch (err) {
        console.error("MBTA fetch failed:", err);
      }
    }, 10000);
  }

  return new Response("Socket.IO server running", { status: 200 });
};
