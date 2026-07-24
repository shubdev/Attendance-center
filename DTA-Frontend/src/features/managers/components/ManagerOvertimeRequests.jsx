import { useOutletContext } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";

function ManagerOvertimeRequests() {
  const { pendingOT, onOTDecisionSubmit } = useOutletContext();

  return (
    <div className="relative p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-[#4b7996]/95 via-[#376380]/90 to-[#224863]/95 text-white border border-white/30 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,35,55,0.35)] animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
      {/* Soft background ambient glows */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-sky-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <h3 className="text-2xl font-extrabold mb-6 text-white relative z-10">Overtime Request</h3>
      <div className="space-y-4 relative z-10">
        {pendingOT?.data?.map((ot) => (
          <div
            key={ot._id}
            className="p-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-5 hover:shadow-2xl transition-all duration-300 hover:border-sky-300/50 hover:bg-white/15"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-lg text-white tracking-tight">{ot.employee.name}</span>
                <span className="text-[11px] bg-sky-500/20 text-sky-200 font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm border border-sky-400/30">
                  {ot.requestedHours} hrs requested
                </span>
              </div>
              <p className="text-xs font-medium text-white/70">Date: {ot.attendance.date} <span className="mx-2">•</span> Email: {ot.employee.email}</p>
              <div className="mt-2 p-3 bg-white/10 rounded-xl border border-white/20">
                <p className="text-sm font-medium text-white/90 italic">
                  &ldquo;{ot.reason}&rdquo;
                </p>
              </div>
              {ot.status !== "pending" && (
                <div className="text-xs font-bold mt-3 text-white/80">
                  Status:{" "}
                  <span className={ot.status === "approved" ? "text-emerald-300" : "text-rose-300"}>
                    {ot.status.toUpperCase()}
                  </span>
                  {ot.remarks && <span className="text-white/60 font-medium ml-2"> — Remarks: {ot.remarks}</span>}
                </div>
              )}
            </div>

            {ot.status === "pending" && (
              <div className="flex gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => {
                    const notes = prompt("Enter approval remarks (optional):");
                    if (notes !== null) onOTDecisionSubmit(ot._id, true, notes);
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-black transition-all glow-btn flex items-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <FaCheck /> Approve
                </button>
                <button
                  onClick={() => {
                    const notes = prompt("Enter rejection reason:");
                    if (notes) onOTDecisionSubmit(ot._id, false, notes);
                  }}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-black transition-all glow-btn flex items-center gap-2 shadow-lg shadow-rose-600/20"
                >
                  <FaTimes /> Reject
                </button>
              </div>
            )}
          </div>
        ))}
        {!pendingOT?.data?.length && (
          <p className="text-center py-10 text-white/60 font-medium">No overtime requests found.</p>
        )}
      </div>
    </div>
  );
}

export default ManagerOvertimeRequests;
