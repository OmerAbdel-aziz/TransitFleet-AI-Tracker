import { Server } from "socket.io"
import { NextRequest } from "next/server"


export const GET = async (req:NextRequest) =>{
    
  if (!(global as any).io) {
    console.log("🔌 Starting Socket.io server...");

    const io = new Server(3001, {
      cors: { origin: "*" },
      path: "/api/socket",
    });

    io.on("connection", (socket) => {
      console.log("✅ Client connected:", socket.id);

      socket.on("ping", (msg) => {
        console.log("📩 Ping received:", msg);
        socket.emit("pong", "Hello from server!");
      });

      socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
      });
    });

    (global as any).io = io;
  }

  return new Response("Socket.IO server running", { status: 200 });

}