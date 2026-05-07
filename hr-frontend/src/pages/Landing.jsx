import { Link } from "react-router-dom";
import { ArrowRight, Users, ShieldCheck, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import Plasma from "../components/Plasma";
import logoUrip from "../assets/logo-urip.png";
import GlassSurface from "../components/GlassSurface";
import GradientText from "../components/GradientText";
import SpotlightCard from "../components/SpotlightCard";
import LogoLoop from "../components/LogoLoop";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary-100 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Plasma
          color="#10b981" // Emerald 500
          speed={0.5}
          direction="forward"
          scale={1.2}
          opacity={0.6}
          mouseInteractive={true}
        />
      </div>

      {/* Navbar with GlassSurface */}
      <nav className="fixed top-6 w-full z-50 flex justify-center px-4">
        <GlassSurface
          width={800}
          height={70}
          borderRadius={50}
          brightness={80}
          opacity={0.8}
          blur={15}
          className="border border-white/30 shadow-lg"
        >
          <div className="w-full h-full px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logoUrip} alt="Logo RS Urip Sumoharjo" className="w-10 h-10 object-contain drop-shadow-sm" />
              <span className="font-bold text-xl tracking-tight text-slate-800">RS Urip Sumoharjo</span>
            </div>
            <Link
              to="/login"
              className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold transition-all shadow-md shadow-primary-200 flex items-center gap-2"
            >
              Masuk <ArrowRight size={18} />
            </Link>
          </div>
        </GlassSurface>
      </nav>

      {/* Hero Section */}
      <main className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="px-5 py-2 bg-white/80 backdrop-blur-sm text-primary-700 rounded-full text-sm font-bold mb-8 inline-block shadow-sm border border-primary-100">
              Technical Test - Fullstack Developer
            </span>
            <h1 className="text-5xl sm:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 drop-shadow-sm flex flex-col items-center gap-2">
              Kelola SDM Anda
              <GradientText
                colors={["#10b981", "#14b8a6", "#10b981"]}
                animationSpeed={3}
                showBorder={false}
                className="text-5xl sm:text-7xl font-extrabold pb-2"
              >
                Dengan Cerdas.
              </GradientText>
            </h1>
            <div className="max-w-xl mx-auto mb-10 text-center">
              <SpotlightCard className="p-6 bg-white/30 backdrop-blur-md border border-white/40 shadow-lg !bg-transparent" spotlightColor="rgba(255, 255, 255, 0.5)">
                <p className="text-lg text-slate-800 leading-relaxed font-medium">
                  Rasakan generasi baru dari Sistem Manajemen SDM. Cepat, aman, dan intuitif,
                  dirancang khusus untuk lingkungan medis modern di RS Urip Sumoharjo.
                </p>
              </SpotlightCard>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/login"
                className="w-full sm:w-auto px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3"
              >
                Mulai Sekarang <ArrowRight />
              </Link>
            </div>

            {/* Tech Stack Icons */}
            <div className="mt-14 pt-8 border-t border-slate-200/30 max-w-4xl mx-auto">
              <p className="text-sm font-semibold text-slate-500 mb-6 uppercase tracking-widest">Powered by</p>
              <div className="h-20 relative overflow-hidden">
                <LogoLoop
                  logos={[
                    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React" },
                    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js" },
                    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", alt: "Express.js" },
                    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", alt: "MySQL" },
                    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript" },
                    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg", alt: "Vite" },
                    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", alt: "Tailwind CSS" },
                    {
                      node: <span className="font-extrabold text-[16px] text-slate-800 tracking-tighter border border-slate-200 px-3 py-1 rounded-full bg-white shadow-sm">R-BITS</span>,
                      title: "React Bits"
                    }
                  ]}
                  speed={30}
                  direction="left"
                  logoHeight={40}
                  gap={60}
                  hoverSpeed={10}
                  scaleOnHover={true}
                  fadeOut={true}
                  fadeOutColor="#f8fafc"
                />
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div id="features" className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 bg-white/90 backdrop-blur-md rounded-3xl border border-white/50 shadow-lg hover:shadow-xl transition-all text-left"
            >
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Direktori Karyawan</h3>
              <p className="text-slate-600 leading-relaxed">
                Kelola profil karyawan, informasi gaji, dan data pribadi secara mudah di satu tempat terpusat.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 bg-white/90 backdrop-blur-md rounded-3xl border border-white/50 shadow-lg hover:shadow-xl transition-all text-left"
            >
              <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-teal-100">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Analisis Real-time</h3>
              <p className="text-slate-600 leading-relaxed">
                Visualisasikan distribusi gaji dan demografi tenaga kerja dengan grafik dan laporan dinamis.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 bg-white/90 backdrop-blur-md rounded-3xl border border-white/50 shadow-lg hover:shadow-xl transition-all text-left"
            >
              <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-primary-100">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Audit Aktivitas</h3>
              <p className="text-slate-600 leading-relaxed">
                Setiap perubahan tercatat dengan baik. Pantau log sistem untuk memastikan integritas dan keamanan data.
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200/50 bg-white/50 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 font-medium">
          &copy; 2026 Technical Test RS Urip Sumoharjo - Erlangga Dwi Jiwantoro.
        </div>
      </footer>
    </div>
  );
}
