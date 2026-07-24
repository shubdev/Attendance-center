import { NavLink } from "react-router-dom"


const Navigations = ({ usersRes }) => {

    return (
        <nav className="flex gap-2 p-1.5 bg-white/40 dark:bg-[#111c2e]/60 rounded-2xl w-fit backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.1)] mb-8">
            <NavLink 
                to="/admin/dir" 
                className={({ isActive }) => `px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${isActive ? "bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-md" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50"}`} 
            >
                User Directory ({usersRes?.data?.length || 0})
            </NavLink>

            <NavLink 
                to="/admin/reports" 
                className={({ isActive }) => `px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${isActive ? "bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-md" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50"}`} 
            >
                Daily Reports
            </NavLink>

            <NavLink 
                to="/admin/attendance" 
                className={({ isActive }) => `px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${isActive ? "bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-md" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50"}`} 
            >
                Attendance Logs
            </NavLink>
        </nav>
    );
}

export default Navigations