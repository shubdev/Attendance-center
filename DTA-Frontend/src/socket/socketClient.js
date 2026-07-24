import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BASE_URI && import.meta.env.VITE_BASE_URI.includes('localhost') 
  ? 'http://localhost:3000' 
  : (import.meta.env.VITE_BASE_URI || "https://attendance-management-system-7evz.onrender.com");

export const socket = io(backendUrl, {
  withCredentials: true,
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
