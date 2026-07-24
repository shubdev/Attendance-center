import { useState } from "react";
import useOvertime from "../../managers/hooks/useOvertime.js";

function OvertimeRequestModal({ attendanceId, onClose }) {
  const [otHours, setOtHours] = useState(1);
  const [otReason, setOtReason] = useState("");
  const { handleOTSubmit, isSubmitting } = useOvertime();

  const onSubmit = (e) => {
    e.preventDefault();
    handleOTSubmit(attendanceId, otHours, otReason, onClose);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-[#4b7996]/95 via-[#376380]/90 to-[#224863]/95 text-white border border-white/30 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,35,55,0.35)] animate-in zoom-in-95 duration-200 overflow-hidden w-full max-w-md space-y-6">
        
        {/* Subtle decorative glow inside modal */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-500/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex justify-between items-center relative z-10">
          <h4 className="text-2xl font-extrabold text-white">Request Overtime</h4>
          <button
            onClick={onClose}
            className="cursor-pointer p-2 rounded-xl bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-all hover-lift border border-white/20"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-5 relative z-10">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-white/90">
              Overtime Hours
            </label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              required
              className="w-full px-4 py-3.5 rounded-2xl border border-white/20 bg-white/10 text-white subtle-ring shadow-sm placeholder-white/50"
              value={otHours}
              onChange={(e) => setOtHours(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-white/90">
              Reason / Task Done
            </label>
            <textarea
              required
              rows="3"
              className="w-full px-4 py-3.5 rounded-2xl border border-white/20 bg-white/10 text-white subtle-ring shadow-sm resize-none placeholder-white/50"
              placeholder="Completed database architecture modifications..."
              value={otReason}
              onChange={(e) => setOtReason(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer w-full py-4 premium-gradient-bg text-white font-black rounded-2xl glow-btn disabled:opacity-50 mt-4 text-lg"
          >
            {isSubmitting ? "Submitting Request..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OvertimeRequestModal;
