import React from "react";
import dayjs from "dayjs";
import { FaCalendarAlt } from "react-icons/fa";

function AttendanceLogsTable({ logs }) {
  return (
    <div className="lg:col-span-2 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Attendance Logs */}
      <div className="relative p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-[#4b7996]/95 via-[#376380]/90 to-[#224863]/95 text-white border border-white/30 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,35,55,0.35)] animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
        {/* Soft background ambient glows */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-sky-400/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-6 relative z-10">
           <h3 className="text-2xl font-extrabold text-white flex items-center gap-3 drop-shadow-sm">
             <div className="text-white/80">
               <FaCalendarAlt size={22} />
             </div>
             Your Attendance Logs
           </h3>
        </div>
        
        <div className="overflow-x-auto rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl relative z-10">
          <table className="w-full text-left text-sm border-collapse whitespace-nowrap">
            <thead className="bg-white/15 border-b border-white/20">
              <tr className="text-white/90">
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Date</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Punch In</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Punch Out</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Working Hours</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Validation</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">OT Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {logs?.map((log) => (
                <tr key={log._id} className="hover:bg-white/15 transition-all duration-200">
                  <td className="py-4 px-5 font-bold text-white text-base">{log.date}</td>
                  <td className="py-4 px-5 text-emerald-300 font-extrabold uppercase tracking-wider text-xs">IN: {dayjs(log.punchIn).format("hh:mm A")}</td>
                  <td className="py-4 px-5 text-amber-300 font-extrabold uppercase tracking-wider text-xs">{log.punchOut ? `OUT: ${dayjs(log.punchOut).format("hh:mm A")}` : "OUT: ACTIVE"}</td>
                  <td className="py-4 px-5 font-extrabold text-white text-base">
                    {log.workingHours} <span className="text-xs font-medium text-white/70">hrs</span>
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm border backdrop-blur-md ${
                        log.status === "valid"
                          ? "bg-emerald-500/20 text-emerald-200 border-emerald-400/40"
                          : log.status === "invalid"
                          ? "bg-rose-500/20 text-rose-200 border-rose-400/40"
                          : "bg-amber-500/20 text-amber-200 border-amber-400/40"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    {log.overtimeStatus === "none" ? (
                      <span className="text-white/50 font-medium italic">none</span>
                    ) : (
                      <span
                        className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm border backdrop-blur-md ${
                          log.overtimeStatus === "approved"
                            ? "bg-emerald-500/20 text-emerald-200 border-emerald-400/40"
                            : log.overtimeStatus === "rejected"
                            ? "bg-rose-500/20 text-rose-200 border-rose-400/40"
                            : "bg-amber-500/20 text-amber-200 border-amber-400/40"
                        }`}
                      >
                        {log.overtimeStatus} ({log.overtimeHours}h)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {!logs?.length && (
                <tr>
                  <td colSpan="6" className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                       <FaCalendarAlt className="text-4xl text-white/30" />
                       <span className="text-white/70 font-medium">No attendance logs found for this period.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AttendanceLogsTable;
