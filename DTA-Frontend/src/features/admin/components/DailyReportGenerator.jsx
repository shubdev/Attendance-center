import dayjs from "dayjs";
import { FaDownload } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin.js";

function DailyReportGenerator({ reportDate, setReportDate, reportRes }) {
  const { handleExportCSV } = useAdmin();

  const exportReport = () => {
    handleExportCSV(reportRes?.data, reportDate);
  };

  return (
    <div className="relative p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-[#4b7996]/95 via-[#376380]/90 to-[#224863]/95 text-white border border-white/30 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,35,55,0.35)] animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
      {/* Soft background ambient glows */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-sky-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 relative z-10">
        <div>
          <h3 className="text-2xl font-extrabold text-white">Daily Report</h3>
          <p className="text-sm font-medium text-white/70 mt-1">
            Compile and export workspace attendance statistics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="date"
            className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/50 text-sm font-bold subtle-ring shadow-sm"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)}
          />
          <button
            onClick={exportReport}
            className="cursor-pointer px-5 py-2.5 premium-gradient-bg text-white rounded-xl text-sm font-black transition-all flex items-center gap-2 glow-btn"
          >
            <FaDownload /> Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl relative z-10">
        <table className="w-full text-left text-sm border-collapse whitespace-nowrap">
          <thead className="bg-white/15 border-b border-white/20">
            <tr className="text-white/80">
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Employee</th>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Punch In</th>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Punch Out</th>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Working Hours</th>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Location</th>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Validation</th>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Overtime</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {reportRes?.data?.map((row) => (
              <tr
                key={row.attendanceId}
                className="hover:bg-white/10 transition-colors duration-150"
              >
                <td className="py-4 px-5">
                  <div className="font-bold text-white">
                    {row.employeeName}
                  </div>
                  <div className="text-[11px] font-medium text-white/70">
                    {row.employeeEmail}
                  </div>
                </td>
                <td className="py-4 px-5 font-medium text-white/90">
                  {dayjs(row.punchIn).format("hh:mm A")}
                </td>
                <td className="py-4 px-5 font-medium text-white/90">
                  {row.punchOut ? dayjs(row.punchOut).format("hh:mm A") : "Active"}
                </td>
                <td className="py-4 px-5 font-black text-sky-300">
                  {row.workingHours} <span className="text-xs font-semibold opacity-70">hrs</span>
                </td>
                <td className="py-4 px-5">
                  <span className="text-[11px] font-mono font-semibold text-white/80 bg-white/20 px-2 py-1 rounded">
                    {row.location.latitude.toFixed(4)},{" "}
                    {row.location.longitude.toFixed(4)}
                  </span>
                </td>
                <td className="py-4 px-5">
                  <span
                    className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-sm ${row.status === "valid"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        : row.status === "invalid"
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                          : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-4 px-5">
                  {row.overtimeStatus === "none" ? (
                    <span className="text-white/50 font-medium italic">none</span>
                  ) : (
                    <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm bg-white/20 text-white">
                      {row.overtimeStatus} ({row.overtimeHours}h)
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {!reportRes?.data?.length && (
              <tr>
                <td colSpan="7" className="py-12 text-center text-white/60 font-medium">
                  No logs found for this date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DailyReportGenerator;
