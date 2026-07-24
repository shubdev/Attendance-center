import { Server } from "socket.io";
import { CLIENT_URL } from "../config/env.config.js";
import { socketAuthMiddleware } from "./auth.socket.js";
import { setIO } from "./emitter.js";
import logger from "../utils/logger.js";

export const initSocket = (httpServer) => {
  const allowedOrigin = CLIENT_URL.endsWith("/") ? CLIENT_URL.slice(0, -1) : CLIENT_URL;

  const io = new Server(httpServer, {
    cors: {
      origin: allowedOrigin,
      credentials: true,
    },
  });

  // Use authentication middleware
  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    const user = socket.user;
    if (!user) {
      socket.disconnect(true);
      return;
    }

    // 1. Join user-specific room
    const userRoom = `user:${user._id}`;
    socket.join(userRoom);

    // 2. Join manager room if user is a manager
    if (user.role === "manager") {
      const managerRoom = `manager:${user._id}`;
      socket.join(managerRoom);
    }

    // 3. Join admin room if user is an admin
    if (user.role === "admin") {
      socket.join("role:admin");
    }

    logger.info(`🔌 Socket connected: User ${user.name} (${user.role}) joined rooms: ${Array.from(socket.rooms).join(", ")}`);

    socket.on("disconnect", () => {
      logger.info(`🔌 Socket disconnected: User ${user.name}`);
    });
  });

  setIO(io);
  return io;
};
