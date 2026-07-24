import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { socket } from "../../socket/socketClient.js";
import { selectUser } from "../auth/auth.slice.js";
import { apiSlice } from "../../store/apiSlice.js";

export function useSocketListeners() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      if (socket.connected) {
        socket.disconnect();
      }
      return;
    }

    if (!socket.connected) {
      socket.connect();
    }

    // 1. Reconnect Handler
    const handleReconnect = () => {
      dispatch(apiSlice.util.invalidateTags(["Attendance", "OTRequest", "Report"]));
    };

    // 2. Event Handlers
    const handlePunchIn = (data) => {
      dispatch(apiSlice.util.invalidateTags(["Attendance", "Report"]));
      if (user.role === "manager" || user.role === "admin") {
        toast.success(`⚡ ${data.userName} just punched in!`);
      }
    };

    const handlePunchOut = (data) => {
      dispatch(apiSlice.util.invalidateTags(["Attendance", "Report"]));
      if (user.role === "manager" || user.role === "admin") {
        toast.success(`⚡ ${data.userName} just punched out!`);
      }
    };

    const handleVerified = (data) => {
      dispatch(apiSlice.util.invalidateTags(["Attendance", "Report"]));
      if (user.role === "employee" && data.userId === (user._id || user.id)) {
        toast.success(`📋 Your attendance status was updated to ${data.status}.`);
      }
    };

    const handleOTCreated = (data) => {
      dispatch(apiSlice.util.invalidateTags(["OTRequest", "Report"]));
      if (user.role === "manager" || user.role === "admin") {
        toast.success(`⏰ New overtime request received from ${data.userName}`);
      }
    };

    const handleOTApproved = (data) => {
      dispatch(apiSlice.util.invalidateTags(["OTRequest", "Attendance", "Report"]));
      if (user.role === "employee" && data.userId === (user._id || user.id)) {
        toast.success(`✅ Your overtime request was approved!`);
      }
    };

    const handleOTRejected = (data) => {
      dispatch(apiSlice.util.invalidateTags(["OTRequest", "Attendance", "Report"]));
      if (user.role === "employee" && data.userId === (user._id || user.id)) {
        toast.error(`❌ Your overtime request was rejected.`);
      }
    };

    socket.on("connect", () => {
      console.log("🔌 Real-time Socket connected");
    });

    socket.io.on("reconnect", handleReconnect);
    socket.on("attendance:punch-in", handlePunchIn);
    socket.on("attendance:punch-out", handlePunchOut);
    socket.on("attendance:verified", handleVerified);
    socket.on("overtime:created", handleOTCreated);
    socket.on("overtime:approved", handleOTApproved);
    socket.on("overtime:rejected", handleOTRejected);

    return () => {
      socket.off("connect");
      socket.io.off("reconnect", handleReconnect);
      socket.off("attendance:punch-in", handlePunchIn);
      socket.off("attendance:punch-out", handlePunchOut);
      socket.off("attendance:verified", handleVerified);
      socket.off("overtime:created", handleOTCreated);
      socket.off("overtime:approved", handleOTApproved);
      socket.off("overtime:rejected", handleOTRejected);
    };
  }, [user, dispatch]);
}
