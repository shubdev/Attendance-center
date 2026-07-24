import { useSelector } from "react-redux";
import { FaSun, FaMoon, FaPowerOff } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { selectUser } from "../auth.slice.js";
import { useTheme } from "../../theme/useTheme.js";
import useAuth from "../hooks/useAuth.js";
import DashboardRedirect from "../../../routes/DashboardRedirect.jsx";

function DashboardLayout() {

  const { handleLogout } = useAuth();
  const user = useSelector(selectUser);
  const { darkMode, setDarkMode } = useTheme();


  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50/30 to-slate-100 dark:bg-gradient-to-br dark:from-[#0b1320] dark:via-[#111c2e] dark:to-[#050a12] text-slate-800 dark:text-slate-100 transition-colors duration-300 flex flex-col relative overflow-hidden z-0">
      <DashboardRedirect />
      
      {/* Texture Background Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] dark:opacity-[0.25] mix-blend-multiply dark:mix-blend-overlay pointer-events-none -z-10"></div>
      
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/4 w-[40rem] h-[20rem] bg-sky-500/10 dark:bg-sky-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <header className="sticky top-0 z-30 mx-4 mt-4 mb-2 rounded-3xl p-4 px-6 flex justify-between items-center bg-white/40 dark:bg-[#111c2e]/60 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight m-0 text-slate-900 dark:text-white leading-tight">D-Table</h1>
            <p className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">Attendance Center</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="font-bold text-sm text-slate-900 dark:text-white leading-tight">{user?.name}</span>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 uppercase tracking-wider">
              {user?.role}
            </span>
          </div>

          <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all hover-lift shadow-sm border border-white/60 dark:border-slate-700/50"
          >
            {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>

          <button
            onClick={handleLogout}
            className="cursor-pointer p-2.5 rounded-2xl bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-900/50 shadow-sm border border-sky-100 dark:border-sky-800/50 transition-all hover-lift"
          >
            <FaPowerOff size={16} />
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
