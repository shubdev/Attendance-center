import dns from "node:dns";
import http from "node:http";
import connectDB from "./src/config/db.config.js";
import app from "./src/app.js";
import logger from "./src/utils/logger.js";
import { initSocket } from "./src/socket/index.js";

const port = process.env.PORT || 3000;

// Force Node.js DNS queries through Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("UNCAUGHT EXCEPTION! 💥 Shutting down...", {
    stack: err.stack || err,
  });

  process.exit(1);
});

// Connect MongoDB
await connectDB();

const server = http.createServer(app);
initSocket(server);

server.listen(port, () => {
  logger.info(`✅ HTTP & Socket.IO Server running on port ${port}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...", {
    stack: err.stack || err,
  });

  server.close(() => {
    process.exit(1);
  });
});