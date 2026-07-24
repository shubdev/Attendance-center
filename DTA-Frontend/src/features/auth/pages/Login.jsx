import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../theme/useTheme.js";
import { handleForm } from "../utils/formHandler.js";
import useAuth from "../hooks/useAuth.js";

function Login() {

  const { darkMode, setDarkMode } = useTheme();
  const { handleLogin, isLoginLoading } = useAuth();


  return (
    <div className="min-h-screen flex transition-colors duration-300 bg-grid-light dark:bg-grid-dark relative">
      {/* Dark mode vignette overlay */}
      <div className="absolute inset-0 bg-grid-dark-vignette opacity-0 dark:opacity-100 pointer-events-none transition-opacity duration-300 z-0"></div>
      
      {/* Form Container */}
      <div className="w-full flex items-center justify-center p-8 lg:p-16 relative z-10">
        <div className="absolute top-8 right-8">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-2xl bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-800 transition-all hover-lift"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>

        <div className="w-full max-w-md p-8 sm:p-10 glass-card bg-white dark:bg-slate-900/60 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-black/50 space-y-10 rounded-3xl border border-slate-200/60 dark:border-slate-700/50 relative z-10">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
              Welcome back
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Please enter your details to sign in to D-Table Analytics.
            </p>
          </div>

          <form onSubmit={handleForm(handleLogin)} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 subtle-ring shadow-inner"
                placeholder="name@company.com"
                name="email"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 subtle-ring shadow-inner"
                placeholder="••••••••"
                name="password"
              />
            </div>
            <button
              type="submit"
              disabled={isLoginLoading}
              className="cursor-pointer w-full py-4 premium-gradient-bg text-white font-black rounded-2xl glow-btn disabled:opacity-50 mt-4 text-lg"
            >
              {isLoginLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400">
            New employee?{" "}
            <Link to="/register" className="font-bold text-sky-600 dark:text-sky-400 hover:text-sky-500 transition-colors">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
