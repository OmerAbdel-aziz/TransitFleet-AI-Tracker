// // app/api/socket/route.ts
// import { Server } from "socket.io";
// import { fetchMbtaBusesWithWeather } from "@/lib/fetchMbta";

// export const GET = async () => {
//   if (!(global as any).io) {
//     console.log("🔌 Starting Socket.io server...");

//     const io = new Server(3001, {
//       cors: { origin: "*" },
//       path: "/api/socket",
//     });

//     (global as any).io = io;

//     io.on("connection", (socket) => {
//       console.log("✅ Client connected:", socket.id);
//     });

//     // Fetch MBTA buses every 10s and include weather
//     setInterval(async () => {
//       try {
//         const buses = await fetchMbtaBusesWithWeather(["1", "66", "15"]); // multiple routes
//         io.emit("busUpdate", buses);
//       } catch (err) {
//         console.error("MBTA fetch failed:", err);
//       }
//     }, 10000);
//   }

//   return new Response("Socket.IO server running", { status: 200 });
// };


// app/api/socket/route.ts
import { pusher } from "@/lib/pusher";
import { fetchMbtaBusesWithWeather } from "@/lib/fetchMbta";

let intervalId: NodeJS.Timeout | null = null; // For dev periodic triggering

export const GET = async () => {
  try {
    // Start periodic updates in dev (remove in prod; use cron instead)
    if (process.env.NODE_ENV === 'development' && !intervalId) {
      console.log("🔄 Starting dev interval for bus updates...");
      intervalId = setInterval(async () => {
        try {
          const buses = await fetchMbtaBusesWithWeather(["1", "66", "15"]);
          await pusher.trigger("bus-channel", "busUpdate", buses);
          console.log(`📡 Dev trigger sent ${buses.length} buses`);
        } catch (err) {
          console.error("Dev interval fetch failed:", err);
        }
      }, 10000); // Every 10s, like old code
    }

    // Manual trigger on GET
    const buses = await fetchMbtaBusesWithWeather(["1", "66", "15"]);
    await pusher.trigger("bus-channel", "busUpdate", buses);
    console.log(`✅ Triggered ${buses.length} buses`);

    return new Response("✅ Bus update sent", { status: 200 });
  } catch (err) {
    console.error("Pusher emit failed:", err);
    return new Response("❌ Error sending update", { status: 500 });
  }
};

// Optional: Add a POST or cleanup route if needed, but GET is fine for polling
