import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Mail, Lock, AlertCircle, ArrowLeft, Shield } from "lucide-react";
import { motion } from "framer-motion";
import logoUrip from "../assets/logo-urip.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      setError("Otentikasi gagal! Periksa kembali kredensial Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans selection:bg-primary-200 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[440px] relative z-10"
      >
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-8 transition-colors group font-medium"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Kembali ke Portal
        </Link>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/50 border border-white overflow-hidden">
          <div className="p-10 pb-6 text-center">
            <img src={logoUrip} alt="RS Urip Sumoharjo Logo" className="w-20 h-20 object-contain mx-auto mb-6 drop-shadow-md" />
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Akses Aman</h2>
            <p className="text-slate-500 mt-2 font-medium">Sistem SDM RS Urip Sumoharjo</p>
          </div>

          <div className="px-10 pb-10">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 text-sm font-medium shadow-sm"
              >
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <p>{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Alamat Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                  <input
                    type="email"
                    placeholder="admin@rsuripsumoharjo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all placeholder:text-slate-400 font-medium text-slate-900"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2 ml-1">
                  <label className="block text-sm font-bold text-slate-700">Kata Sandi</label>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all placeholder:text-slate-400 font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="relative z-10">Masuk</span> 
                      <LogIn size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100/50">
              <div className="p-4 bg-primary-50/50 rounded-2xl border border-primary-100/50">
                <div className="flex items-center gap-2 text-primary-700 font-bold text-xs uppercase tracking-wider mb-1">
                  <Lock size={12} /> Sesi Aman
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Sesi aktif akan otomatis berakhir setelah 1 menit tidak ada aktivitas sesuai protokol RS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
