import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { usePunchInMutation, usePunchOutMutation, useVerifyAttendanceMutation } from "../api/attendance.api.js";


export default function useAttendance() {

  const [cameraActive, setCameraActive] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [gps, setGps] = useState(null);
  const [punching, setPunching] = useState(false);

  const [punchIn] = usePunchInMutation();
  const [punchOut] = usePunchOutMutation();
  const [verifyAttendance] = useVerifyAttendanceMutation();


  const handleCapture = useCallback((webcamRef) => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setPhoto(imageSrc);
      toast.success("Selfie captured!");
    }
  }, []);


  const handlePunchIn = async (refetchLogs) => {
    if (!photo) {
      toast.error("Please capture your selfie first!");
      return;
    }

    setPunching(true);
    toast.loading("Obtaining location...", { id: "gps" });

    navigator.geolocation.getCurrentPosition( async (pos) => {

        const location = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };

        console.log("Punch In Location -> Latitude:", location.latitude, "Longitude:", location.longitude);

        setGps(location);
        toast.success("Location acquired", { id: "gps" });

        try {
          toast.loading("Punching in...", { id: "punch" });
          await punchIn({ selfie: photo, location }).unwrap();
          toast.success("Punched in successfully!", { id: "punch" });
          setPhoto(null);
          if (refetchLogs) refetchLogs();

        } catch (err) {
          toast.error(err?.data?.message || "Punch In failed", { id: "punch" });
        } finally {
          setPunching(false);
        }
      },
      (err) => {
        toast.error("Geolocation access denied or timed out. Please allow GPS.", { id: "gps" });
        setPunching(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };


  const handlePunchOut = async (refetchLogs) => {
    if (!photo) {
      toast.error("Please capture your selfie first!");
      return;
    }

    setPunching(true);
    toast.loading("Obtaining location...", { id: "gps" });

    navigator.geolocation.getCurrentPosition( async (pos) => {
        const location = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };

        console.log("Punch Out Location -> Latitude:", location.latitude, "Longitude:", location.longitude);

        setGps(location);
        toast.success("Location acquired", { id: "gps" });

        try {
          toast.loading("Punching out...", { id: "punchout" });
          await punchOut({ selfie: photo, location }).unwrap();
          toast.success("Punched out successfully!", { id: "punchout" });
          setPhoto(null);
          if (refetchLogs) refetchLogs();
        } catch (err) {
          toast.error(err?.data?.message || "Punch Out failed", { id: "punchout" });
        } finally {
          setPunching(false);
        }
      },
      (err) => {
        toast.error("Geolocation access denied or timed out. Please allow GPS.", { id: "gps" });
        setPunching(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };


  const handleVerify = async (id, status, remarks, onSuccess) => {
    try {
      await verifyAttendance({ id, status, remarks }).unwrap();
      toast.success("Attendance record validated successfully.");
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err?.data?.message || "Verification failed");
    }
  };


  return { cameraActive, setCameraActive, photo, setPhoto, gps, punching, handleCapture, handlePunchIn, handlePunchOut, handleVerify };

}