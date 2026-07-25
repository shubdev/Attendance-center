import { backendUrl } from "../../../store/apiSlice.js";
import { useState } from "react";
import dayjs from "dayjs";
import { FaMapMarkerAlt } from "react-icons/fa";
import useAttendance from "../../employee/hooks/useAttendance.js";
import { useGetAttendanceTeamQuery } from "../../employee/api/attendance.api.js";
  
function AdminAttendanceLogs() {

  const { data: teamLogs, refetch: refetchLogs } = useGetAttendanceTeamQuery();

  const [selectedLog, setSelectedLog] = useState(null);
  const [verifyStatus, setVerifyStatus] = useState("valid");
  const [verifyRemarks, setVerifyRemarks] = useState("");

  const { handleVerify } = useAttendance();

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    handleVerify(selectedLog._id, verifyStatus, verifyRemarks, () => {
      setSelectedLog(null);
      setVerifyRemarks("");
      refetchLogs();
    });
  };

  return (
    <>
      {/* Main Glass Card Container matching reference picture aesthetic */}
      <div className="relative p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-[#4b7996]/95 via-[#376380]/90 to-[#224863]/95 text-white border border-white/30 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,35,55,0.35)] animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
        
        {/* Soft background ambient glows */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-sky-400/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Bar Header inspired by the reference design */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 relative z-10">
          <div className="flex items-center gap-4">
            {/* Frosted Circular Badge */}
            <div className="w-12 h-12 rounded-full border border-white/40 bg-white/15 backdrop-blur-md flex items-center justify-center font-extrabold text-lg text-white shadow-lg">
              {teamLogs?.data?.length || 0}
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">Team Attendance</h3>
              <p className="text-xs sm:text-sm font-medium text-white/80">Real-time attendance logs & verification dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-5 py-2.5 rounded-full bg-[#0c1e30]/80 border border-white/20 backdrop-blur-md text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl">
              <span>{dayjs().format("D MMMM YYYY")}</span>
              <span className="text-white/40">|</span>
              <span className="text-sky-300 font-extrabold">Active</span>
            </div>
          </div>
        </div>

        {/* Table Wrapper */}
        <div className="overflow-x-auto rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl relative z-10">
          <table className="w-full text-left text-sm border-collapse whitespace-nowrap">
            <thead className="bg-white/15 border-b border-white/20">
              <tr className="text-white/90">
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Employee</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Date</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Punch In/Out</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Working Hours</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Selfie Preview</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Status</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {teamLogs?.data?.map((log) => (
                <tr key={log._id} className="hover:bg-white/15 transition-all duration-200">
                  <td className="py-4 px-5">
                    <div className="font-bold text-white text-base">{log.employee.name}</div>
                    <div className="text-xs font-medium text-white/70">{log.employee.email}</div>
                  </td>
                  <td className="py-4 px-5 font-medium text-white/90">{log.date}</td>
                  <td className="py-4 px-5">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">In: {dayjs(log.punchIn).format("hh:mm A")}</div>
                    <div className="text-xs font-extrabold uppercase tracking-wider text-amber-300 mt-1">
                      Out: {log.punchOut ? dayjs(log.punchOut).format("hh:mm A") : "Active"}
                    </div>
                  </td>
                  <td className="py-4 px-5 font-extrabold text-white text-base">
                    {log.workingHours} <span className="text-xs font-medium text-white/70">hrs</span>
                  </td>
                  <td className="py-4 px-5">
                    <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-white/50 bg-white/20 shadow-lg p-0.5">
                      <img
                        src={`${backendUrl}${log.selfieUrl}`}
                        alt="Selfie"
                        className="w-full h-full rounded-full object-cover hover:scale-125 transition-transform duration-500 cursor-pointer"
                        onClick={() => setSelectedLog(log)}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100";
                        }}
                      />
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm border backdrop-blur-md ${log.status === "valid"
                        ? "bg-emerald-500/20 text-emerald-200 border-emerald-400/40"
                        : log.status === "invalid"
                          ? "bg-rose-500/20 text-rose-200 border-rose-400/40"
                          : "bg-amber-500/20 text-amber-200 border-amber-400/40"
                        }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => {
                        setSelectedLog(log);
                        setVerifyStatus(log.status === "pending" ? "valid" : log.status);
                        setVerifyRemarks(log.remarks || "");
                      }}
                      className="px-5 py-2.5 bg-[#0b1d30] hover:bg-[#071320] text-white rounded-full text-xs font-extrabold transition-all border border-white/20 shadow-lg shadow-black/20 hover:scale-105 active:scale-95"
                    >
                      Verify Record
                    </button>
                  </td>
                </tr>
              ))}
              {!teamLogs?.data?.length && (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-white/70 font-medium">
                    No logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification Modal matching the picture design */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-[#061424]/60 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl p-8 rounded-3xl bg-gradient-to-br from-[#4b7996]/95 via-[#376380]/90 to-[#224863]/95 text-white border border-white/30 shadow-[0_25px_70px_rgba(0,0,0,0.5)] space-y-6 animate-in zoom-in-95 duration-200 relative overflow-hidden">
            
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-sky-400/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center relative z-10">
              <div>
                <h4 className="text-2xl font-extrabold text-white tracking-tight">Verify Attendance</h4>
                <p className="text-sm font-medium text-white/80 mt-1">{selectedLog.employee.name} <span className="mx-2">•</span> {selectedLog.date}</p>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="w-10 h-10 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold transition-all shadow-md"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
              {/* Image Column */}
              <div className="rounded-3xl overflow-hidden aspect-square border-2 border-white/40 bg-white/10 shadow-2xl relative group">
                <img
                  src={`${backendUrl}${selectedLog.selfieUrl}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Captured Selfie"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&h=400";
                  }}
                />
              </div>

              {/* Data and form Column */}
              <div className="space-y-6 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-white/80 uppercase tracking-wider flex items-center gap-1.5">
                    <FaMapMarkerAlt /> GPS Position
                  </div>
                  <div className="p-4 bg-white/10 border border-white/20 rounded-2xl text-sm space-y-1.5 backdrop-blur-md shadow-inner">
                    <div className="flex justify-between items-center text-white/80"><span className="font-medium">Latitude</span> <span className="font-bold text-white">{selectedLog.location.latitude}</span></div>
                    <div className="flex justify-between items-center text-white/80"><span className="font-medium">Longitude</span> <span className="font-bold text-white">{selectedLog.location.longitude}</span></div>
                  </div>
                </div>

                <form onSubmit={handleVerifySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-2">
                      Validation Status
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setVerifyStatus("valid")}
                        className={`py-3 rounded-full text-sm font-extrabold border transition-all ${verifyStatus === "valid"
                          ? "bg-emerald-500/30 text-emerald-200 border-emerald-400 shadow-lg"
                          : "border-white/20 bg-white/10 text-white/70 hover:bg-white/20"
                          }`}
                      >
                        VALID
                      </button>
                      <button
                        type="button"
                        onClick={() => setVerifyStatus("invalid")}
                        className={`py-3 rounded-full text-sm font-extrabold border transition-all ${verifyStatus === "invalid"
                          ? "bg-rose-500/30 text-rose-200 border-rose-400 shadow-lg"
                          : "border-white/20 bg-white/10 text-white/70 hover:bg-white/20"
                          }`}
                      >
                        INVALID
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-2">
                      Verification Note
                    </label>
                    <textarea
                      rows="2"
                      className="w-full px-4 py-3 rounded-2xl border border-white/20 bg-white/10 text-white placeholder-white/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-300 resize-none"
                      placeholder="Add remarks..."
                      value={verifyRemarks}
                      onChange={(e) => setVerifyRemarks(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="cursor-pointer w-full py-3.5 bg-[#0b1d30] hover:bg-[#071320] text-white font-extrabold rounded-full text-base border border-white/20 transition-all shadow-xl hover:scale-[1.02] active:scale-98"
                  >
                    Submit Validation
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminAttendanceLogs;
