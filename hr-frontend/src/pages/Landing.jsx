import { Link } from "react-router-dom";
import { ArrowRight, Users, ShieldCheck, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary-100">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              HR
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">UripSumoharjo</span>
          </div>
          <Link
            to="/login"
            className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-all shadow-lg shadow-primary-200 flex items-center gap-2"
          >
            Sign In <ArrowRight size={18} />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold mb-6 inline-block border border-primary-100">
              Technical Test - Fullstack Developer
            </span>
            <h1 className="text-5xl sm:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
              Manage Your Workforce <br />
              <span className="bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
                With Intelligence.
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Experience the next generation of HR Management. Fast, secure, and intuitive tools 
              designed for modern medical institutions and corporate environments.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-semibold text-lg transition-all shadow-xl flex items-center justify-center gap-3"
              >
                Get Started Now <ArrowRight />
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-2xl font-semibold text-lg transition-all flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div id="features" className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-left"
            >
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Employee Directory</h3>
              <p className="text-slate-500 leading-relaxed">
                Effortlessly manage employee profiles, salaries, and personal details in one centralized location.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-left"
            >
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Analytics</h3>
              <p className="text-slate-500 leading-relaxed">
                Visualize salary distributions and workforce demographics with dynamic charts and reports.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-left"
            >
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Activity Auditing</h3>
              <p className="text-slate-500 leading-relaxed">
                Every change is tracked. Monitor system logs and triggers to ensure data integrity and security.
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          &copy; 2024 HR Management System - RS Urip Sumoharjo Technical Test.
        </div>
      </footer>
    </div>
  );
}
