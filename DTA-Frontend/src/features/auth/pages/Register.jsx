import { Link } from "react-router-dom";
import { handleForm } from "../utils/formHandler.js";
import { FaSun, FaMoon } from "react-icons/fa";
import { useGetManagersQuery } from "../api/auth.api.js";
import { useTheme } from "../../theme/useTheme.js";
import { useState } from "react";
import useAuth from "../hooks/useAuth.js";


function Register() {

  const { darkMode, setDarkMode } = useTheme();
  const { handleRegister, isRegisterLoading } = useAuth();
  const [role, setRole] = useState("employee")
  const { data: managersRes } = useGetManagersQuery();


  return (
    <div className="min-h-screen flex transition-colors duration-300 bg-grid-light dark:bg-grid-dark relative">
      
      {/* Dark mode vignette overlay */}
      <div className="absolute inset-0 bg-grid-dark-vignette opacity-0 dark:opacity-100 pointer-events-none transition-opacity duration-300 z-0"></div>

      {/* Form Container */}
      <div className="w-full flex items-center justify-center p-4 sm:p-8 relative z-10 overflow-hidden h-screen">
        <div className="absolute top-8 right-8 z-20">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-2xl bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-800 transition-all hover-lift"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>

        <div className="w-full max-w-3xl p-8 sm:p-10 glass-card bg-white dark:bg-slate-900/60 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-black/50 space-y-6 rounded-3xl border border-slate-200/60 dark:border-slate-700/50 relative z-10 mx-auto">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
              Create Account
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Fill in the details below to get started.
            </p>
          </div>

          <form onSubmit={handleForm(handleRegister)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 subtle-ring shadow-inner"
                  placeholder="John Doe"
                  name="name"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 subtle-ring shadow-inner"
                  placeholder="john@company.com"
                  name="email"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 subtle-ring shadow-inner"
                  placeholder="•••••••• (Min 6 chars)"
                  name="password"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                  Company Role
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 subtle-ring shadow-inner"
                  name="role"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              {role === "employee" && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300 sm:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                    Assign Manager
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 subtle-ring shadow-inner"
                    name="manager"
                  >
                    <option value="">No Manager Assigned</option>
                    {managersRes?.data?.map((mgr) => (
                      <option key={mgr._id} value={mgr._id}>
                        {mgr.name} ({mgr.email})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isRegisterLoading}
              className="cursor-pointer w-full py-3.5 premium-gradient-bg text-white font-black text-lg rounded-xl glow-btn disabled:opacity-50 mt-2"
            >
              {isRegisterLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-sky-600 dark:text-sky-400 hover:text-sky-500 transition-colors">
              Sign In here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
