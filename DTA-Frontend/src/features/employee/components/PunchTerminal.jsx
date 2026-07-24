import { useRef } from "react";
import Webcam from "react-webcam";
import dayjs from "dayjs";
import { FaCamera, FaSignInAlt, FaSignOutAlt, FaClock, FaCheckCircle, FaPlusCircle} from "react-icons/fa";
import useAttendance from "../hooks/useAttendance.js";

function PunchTerminal({ todayLog, refetchLogs, onOpenOTModal }) {
  
  const webcamRef = useRef(null);
  const { cameraActive, photo, setPhoto, punching, handleCapture, handlePunchIn, handlePunchOut} = useAttendance();

  const capture = () => handleCapture(webcamRef);
  const onPunchIn = () => handlePunchIn(refetchLogs);
  const onPunchOut = () => handlePunchOut(refetchLogs);

  return (
    <div className="lg:col-span-1 relative p-8 rounded-3xl bg-gradient-to-br from-[#4b7996]/95 via-[#376380]/90 to-[#224863]/95 text-white border border-white/30 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,35,55,0.35)] animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden flex flex-col items-center group transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/20">
      
      {/* Decorative gradient orb */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-sky-400/20 rounded-full blur-3xl group-hover:bg-sky-400/30 transition-all duration-500"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <h3 className="text-xl font-extrabold mb-6 text-white flex items-center gap-2 relative z-10 w-full justify-center">
        <div className="text-white/80">
          <FaClock size={20} />
        </div>
        Punch Terminal
      </h3>

      {!todayLog ? (
        // Punch In View
        <div className="w-full flex flex-col items-center space-y-6 relative z-10">
          {!photo ? (
            <div className="relative w-full aspect-video max-w-sm rounded-3xl overflow-hidden bg-white/10 border-2 border-dashed border-white/30 shadow-inner flex items-center justify-center transition-all duration-300 hover:border-sky-400">
              {cameraActive ? (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-full object-cover"
                  videoConstraints={{ facingMode: "user" }}
                />
              ) : (
                <span className="text-sm font-semibold text-white/50 uppercase tracking-widest flex items-center gap-2">
                  <FaCamera /> Camera offline
                </span>
              )}
              <div className="absolute bottom-4 right-4">
                <button
                  onClick={capture}
                  className="cursor-pointer p-3.5 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl transition-all hover-lift shadow-lg shadow-sky-600/30"
                  title="Capture photo"
                >
                  <FaCamera size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="relative w-full aspect-video max-w-sm rounded-3xl overflow-hidden bg-white/10 shadow-xl ring-4 ring-sky-400/20">
              <img src={photo} className="w-full h-full object-cover" alt="Captured selfie" />
              <button
                onClick={() => setPhoto(null)}
                className="absolute top-3 right-3 px-4 py-1.5 bg-sky-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-sky-700 transition shadow-lg hover-lift"
              >
                Retake
              </button>
            </div>
          )}
          <button
            onClick={onPunchIn}
            disabled={punching}
            className="cursor-pointer w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl transition-all shadow-lg shadow-emerald-600/25 glow-btn flex items-center justify-center gap-2 disabled:opacity-50 text-lg"
          >
            <FaSignInAlt size={20} />
            {punching ? "Acquiring Coordinates..." : "Punch In Now"}
          </button>
        </div>
      ) : !todayLog.punchOut ? (
        // Punch Out View
        <div className="w-full flex flex-col items-center space-y-8 py-6 relative z-10">
          <div className="text-center space-y-1">
            <p className="text-xs text-white/60 uppercase tracking-widest font-bold">
              PUNCH-IN TIME
            </p>
            <p className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 tracking-tighter">
              {dayjs(todayLog.punchIn).format("hh:mm:ss A")}
            </p>
            <p className="text-sm font-medium text-white/80 bg-white/10 px-3 py-1 rounded-full w-fit mx-auto border border-white/20">
              {todayLog.date}
            </p>
          </div>

          {!photo ? (
            <div className="relative w-full aspect-video max-w-sm rounded-3xl overflow-hidden bg-white/10 border-2 border-dashed border-white/30 shadow-inner flex items-center justify-center transition-all duration-300 hover:border-sky-400">
              {cameraActive ? (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-full object-cover"
                  videoConstraints={{ facingMode: "user" }}
                />
              ) : (
                <span className="text-sm font-semibold text-white/50 uppercase tracking-widest flex items-center gap-2">
                  <FaCamera /> Camera offline
                </span>
              )}
              <div className="absolute bottom-4 right-4">
                <button
                  onClick={capture}
                  className="cursor-pointer p-3.5 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl transition-all hover-lift shadow-lg shadow-sky-600/30"
                  title="Capture photo"
                >
                  <FaCamera size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="relative w-full aspect-video max-w-sm rounded-3xl overflow-hidden bg-white/10 shadow-xl ring-4 ring-sky-400/20">
              <img src={photo} className="w-full h-full object-cover" alt="Captured selfie" />
              <button
                onClick={() => setPhoto(null)}
                className="absolute top-3 right-3 px-4 py-1.5 bg-sky-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-sky-700 transition shadow-lg hover-lift"
              >
                Retake
              </button>
            </div>
          )}

          <button
            onClick={onPunchOut}
            disabled={punching}
            className="cursor-pointer w-full py-4 bg-sky-600 hover:bg-sky-700 text-white font-black rounded-2xl transition-all shadow-lg shadow-sky-600/25 glow-btn flex items-center justify-center gap-2 disabled:opacity-50 text-lg"
          >
            <FaSignOutAlt size={20} />
            {punching ? "Acquiring Coordinates..." : "Punch Out Now"}
          </button>
        </div>
      ) : (
        // Shift Completed View
        <div className="w-full flex flex-col items-center py-8 text-center space-y-6 relative z-10">
          <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-2 animate-in zoom-in duration-500 border border-white/20">
             <FaCheckCircle className="text-5xl text-white drop-shadow-md" />
          </div>
          <div className="space-y-2">
            <p className="font-extrabold text-white text-2xl tracking-tight">Shift Completed!</p>
            <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
              <p className="text-sm font-medium text-white/70 mb-1 uppercase tracking-wider">
                Total Worked Hours
              </p>
              <p className="text-3xl font-black text-white drop-shadow-sm">
                {todayLog.workingHours} <span className="text-lg">hrs</span>
              </p>
              <p className={`text-xs font-bold mt-2 px-2 py-1 rounded-full inline-block ${todayLog.workingHours >= 8 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'} border`}>
                {todayLog.workingHours >= 8 ? "Full-Time (Completed)" : "Part-Time/Incomplete"}
              </p>
            </div>
          </div>
          
          {!todayLog.otRequest ? (
            <button
              onClick={() => onOpenOTModal(todayLog._id)}
              className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 glow-btn"
            >
              <FaPlusCircle size={16} /> Request Overtime
            </button>
          ) : (
            <div className="w-full py-3 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center gap-2">
               <span className="text-sm font-bold text-white/80">OT Status:</span>
               <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                 todayLog.overtimeStatus === 'approved' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 
                 todayLog.overtimeStatus === 'rejected' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 
                 'bg-amber-500/20 text-amber-300 border-amber-500/30'
               }`}>
                 {todayLog.overtimeStatus}
               </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PunchTerminal;
