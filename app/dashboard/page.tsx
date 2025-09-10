"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";

export default function SocketTest() {
  useEffect(() => {
    // Connect to the server on port 3001
    const socket = io("http://localhost:3001", { path: "/api/socket" });

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
      socket.emit("ping", "Hello server!");
    });

    socket.on("pong", (msg) => {
      console.log("📨 Pong from server:", msg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>Socket.io Test</div>;
}
