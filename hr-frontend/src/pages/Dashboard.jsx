import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { 
  Users, 
  Plus, 
  Search, 
  LogOut, 
  Printer, 
  Edit3, 
  Trash2, 
  DollarSign,
  TrendingUp,
  LayoutDashboard,
  X,
  History,
  AlertTriangle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StatsChart from "../components/StatsChart";
import LogTable from "../components/LogTable";
import logoUrip from "../assets/logo-urip.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TiltedCard from "../components/TiltedCard";

export default function Dashboard() {
  const [karyawan, setKaryawan] = useState([]);
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({ Nama: "", Tgl_Lahir: "", Gaji: "" });
  const [editId, setEditId] = useState(null);
  
  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, karyawan, history
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchData = async () => {
    try {
      const [kRes, lRes] = await Promise.all([
        axios.get("http://localhost:5000/api/karyawan", getAuthHeader()),
        axios.get("http://localhost:5000/api/log", getAuthHeader())
      ]);
      setKaryawan(kRes.data);
      setLogs(lRes.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Auto refresh every 30s
    return () => clearInterval(interval);
  }, []);

  // Reset pagination on search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/karyawan/${editId}`, form, getAuthHeader());
      } else {
        await axios.post("http://localhost:5000/api/karyawan", form, getAuthHeader());
      }
      setForm({ Nama: "", Tgl_Lahir: "", Gaji: "" });
      setEditId(null);
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      alert("Sesi telah berakhir atau terjadi kesalahan sistem. Silakan login kembali.");
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`http://localhost:5000/api/karyawan/${deleteId}`, getAuthHeader());
      setIsDeleteModalOpen(false);
      setDeleteId(null);
      fetchData();
    } catch (error) {
      alert("Gagal menghapus data.");
    }
  };

  const handleEdit = (k) => {
    setForm({ Nama: k.Nama, Tgl_Lahir: k.Tgl_Lahir, Gaji: k.Gaji });
    setEditId(k.Id);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    
    // Kop Surat
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("RUMAH SAKIT URIP SUMOHARJO", 14, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Jl. Urip Sumoharjo No.200, Gn. Sulah, Way Halim, Bandar Lampung, Lampung 35133", 14, 26);
    doc.text("Telepon: (0721) 771322 | Email: info@rsuripsumoharjo.com", 14, 32);
    
    // Garis Kop Surat
    doc.setLineWidth(0.5);
    doc.line(14, 35, 196, 35);
    doc.setLineWidth(1.5);
    doc.line(14, 36.5, 196, 36.5); 

    // Judul Laporan
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("LAPORAN DATA KARYAWAN", 105, 48, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Dicetak pada: ${new Date().toLocaleString('id-ID')}`, 14, 56);

    const tableColumn = ["ID", "Nama Karyawan", "Tanggal Lahir", "Gaji"];
    const tableRows = karyawan.map((k) => [
      k.Id,
      k.Nama,
      k.Tgl_Lahir,
      `Rp ${parseInt(k.Gaji).toLocaleString('id-ID')}`,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 60,
      theme: 'grid',
      headStyles: { fillColor: '#10b981' } // Emerald 500
    });

    doc.save("Laporan_Karyawan.pdf");
  };

  // Pagination Logic
  const filteredKaryawan = karyawan.filter(k => 
    k.Nama.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredKaryawan.length / itemsPerPage);
  const paginatedKaryawan = filteredKaryawan.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalSalary = karyawan.reduce((acc, curr) => acc + parseInt(curr.Gaji), 0);
  const avgSalary = karyawan.length > 0 ? totalSalary / karyawan.length : 0;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans flex overflow-hidden selection:bg-primary-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col z-20">
        <div className="p-6 flex items-center gap-3 border-b border-slate-50">
          <img src={logoUrip} alt="Logo" className="w-10 h-10 object-contain drop-shadow-sm" />
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-slate-800 leading-tight">RS Urip Sumoharjo</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Sistem SDM</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-6">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-primary-50 text-primary-700 shadow-sm border border-primary-100/50' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <LayoutDashboard size={20} className={activeTab === 'dashboard' ? 'text-primary-600' : ''} /> Ringkasan
          </button>
          <button 
            onClick={() => setActiveTab('karyawan')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'karyawan' ? 'bg-primary-50 text-primary-700 shadow-sm border border-primary-100/50' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Users size={20} className={activeTab === 'karyawan' ? 'text-primary-600' : ''} /> Karyawan
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'history' ? 'bg-primary-50 text-primary-700 shadow-sm border border-primary-100/50' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <History size={20} className={activeTab === 'history' ? 'text-primary-600' : ''} /> Riwayat
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-bold"
          >
            <LogOut size={20} /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200 px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight capitalize">
              {activeTab === 'dashboard' ? 'Ringkasan Dashboard' : 
               activeTab === 'karyawan' ? 'Karyawan' : 'Riwayat'}
            </h1>
            <p className="text-sm text-slate-500 font-medium">Selamat datang kembali, Administrator</p>
          </div>
          
          <div className="flex items-center gap-4">
            {activeTab === 'karyawan' && (
              <div className="relative hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Cari karyawan..." 
                  className="pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64 font-medium transition-all placeholder:text-slate-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-7xl mx-auto">
          
          {/* TAB: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TiltedCard
                  containerHeight="160px"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  scaleOnHover={1.02}
                  rotateAmplitude={8}
                  displayOverlayContent={true}
                  className="rounded-3xl"
                  overlayContent={
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm w-full h-full flex flex-col justify-center pointer-events-none">
                      <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-4 border border-primary-100/50">
                        <Users size={24} />
                      </div>
                      <p className="text-slate-500 text-sm font-bold tracking-wide uppercase">Total Karyawan</p>
                      <h3 className="text-3xl font-extrabold mt-1 text-slate-800">{karyawan.length}</h3>
                    </div>
                  }
                />
                
                <TiltedCard
                  containerHeight="160px"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  scaleOnHover={1.02}
                  rotateAmplitude={8}
                  displayOverlayContent={true}
                  className="rounded-3xl"
                  overlayContent={
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm w-full h-full flex flex-col justify-center pointer-events-none">
                      <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-4 border border-teal-100/50">
                        <DollarSign size={24} />
                      </div>
                      <p className="text-slate-500 text-sm font-bold tracking-wide uppercase">Total Gaji Bulanan</p>
                      <h3 className="text-3xl font-extrabold mt-1 text-slate-800">Rp {totalSalary.toLocaleString('id-ID')}</h3>
                    </div>
                  }
                />

                <TiltedCard
                  containerHeight="160px"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  scaleOnHover={1.02}
                  rotateAmplitude={8}
                  displayOverlayContent={true}
                  className="rounded-3xl"
                  overlayContent={
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm w-full h-full flex flex-col justify-center pointer-events-none">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 border border-emerald-100/50">
                        <TrendingUp size={24} />
                      </div>
                      <p className="text-slate-500 text-sm font-bold tracking-wide uppercase">Rata-rata Gaji</p>
                      <h3 className="text-3xl font-extrabold mt-1 text-slate-800">Rp {Math.round(avgSalary).toLocaleString('id-ID')}</h3>
                    </div>
                  }
                />
              </div>

              {/* Chart Area */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="mb-8">
                  <h3 className="text-xl font-extrabold text-slate-900">Distribusi Gaji</h3>
                  <p className="text-sm text-slate-500 font-medium">Karyawan vs Gaji Bulanan (IDR)</p>
                </div>
                <div className="h-[400px]">
                  <StatsChart data={karyawan} />
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: KARYAWAN */}
          {activeTab === 'karyawan' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Action Buttons Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-800">Direktori Karyawan</h3>
                  <p className="text-sm text-slate-500 mt-1">Kelola data karyawan dan eksport ke PDF.</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={exportPDF}
                    className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-bold flex items-center gap-2 shadow-sm transition-all"
                    title="Cetak PDF"
                  >
                    <Printer size={18} className="text-slate-500" /> <span>Cetak</span>
                  </button>
                  <button 
                    onClick={() => { setEditId(null); setForm({ Nama: "", Tgl_Lahir: "", Gaji: "" }); setIsModalOpen(true); }}
                    className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary-200 transition-all"
                  >
                    <Plus size={18} /> <span>Tambah</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="px-8 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                  <span className="text-sm font-bold text-slate-600">Daftar Data</span>
                  <span className="text-sm font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">{filteredKaryawan.length} data</span>
                </div>
                <div className="overflow-x-auto min-h-[400px]">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-white text-slate-400 text-xs uppercase tracking-widest font-extrabold border-b border-slate-100">
                        <th className="px-8 py-5">Nama Karyawan</th>
                        <th className="px-8 py-5">Tanggal Lahir</th>
                        <th className="px-8 py-5">Gaji</th>
                        <th className="px-8 py-5 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {paginatedKaryawan.map((k) => (
                        <tr key={k.Id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-primary-50 text-primary-700 rounded-2xl flex items-center justify-center font-bold text-lg border border-primary-100/50 shadow-sm">
                                {k.Nama.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 text-base">{k.Nama}</p>
                                <p className="text-xs font-semibold text-slate-400">ID: #{k.Id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-slate-600 font-semibold">
                            {k.Tgl_Lahir}
                          </td>
                          <td className="px-8 py-5">
                            <span className="font-extrabold text-slate-800">Rp {parseInt(k.Gaji).toLocaleString('id-ID')}</span>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => handleEdit(k)}
                                className="p-2.5 bg-slate-50 text-slate-600 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100"
                                title="Ubah"
                              >
                                <Edit3 size={18} />
                              </button>
                              <button 
                                onClick={() => confirmDelete(k.Id)}
                                className="p-2.5 bg-slate-50 text-slate-600 hover:text-red-600 rounded-xl hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                                title="Hapus"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {paginatedKaryawan.length === 0 && (
                        <tr>
                          <td colSpan="4" className="px-8 py-12 text-center text-slate-500 font-medium">
                            Tidak ada karyawan yang cocok dengan "{searchTerm}"
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="px-8 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <span className="text-sm text-slate-500 font-medium">
                      Menampilkan {(currentPage - 1) * itemsPerPage + 1} hingga {Math.min(currentPage * itemsPerPage, filteredKaryawan.length)} dari {filteredKaryawan.length}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <div className="flex gap-1">
                        {Array.from({ length: totalPages }).map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentPage(idx + 1)}
                            className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                              currentPage === idx + 1 
                                ? 'bg-primary-600 text-white shadow-sm shadow-primary-200' 
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB: HISTORY */}
          {activeTab === 'history' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <LogTable logs={logs} />
            </motion.div>
          )}

        </div>
      </main>

      {/* Create/Update Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-visible border border-slate-100"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center shadow-sm">
                      {editId ? <Edit3 size={20} /> : <Plus size={20} />}
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      {editId ? "Ubah Data Karyawan" : "Tambah Karyawan Baru"}
                    </h3>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Nama Lengkap</label>
                    <input
                      type="text"
                      placeholder="Misal: Budi Santoso"
                      value={form.Nama}
                      onChange={(e) => setForm({ ...form, Nama: e.target.value })}
                      required
                      className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-5 relative z-50">
                    <div className="relative">
                      <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Tanggal Lahir</label>
                      <DatePicker
                        selected={form.Tgl_Lahir ? new Date(form.Tgl_Lahir) : null}
                        onChange={(date) => {
                          const formattedDate = date ? date.toISOString().split('T')[0] : "";
                          setForm({ ...form, Tgl_Lahir: formattedDate });
                        }}
                        dateFormat="yyyy-MM-dd"
                        className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium text-slate-900"
                        placeholderText="Pilih tanggal lahir"
                        wrapperClassName="w-full"
                        required
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        maxDate={new Date()}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Gaji Bulanan</label>
                      <input
                        type="number"
                        placeholder="IDR"
                        value={form.Gaji}
                        onChange={(e) => setForm({ ...form, Gaji: e.target.value })}
                        required
                        className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="pt-6 flex gap-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-2xl font-bold transition-all"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold shadow-xl shadow-primary-200 transition-all"
                    >
                      {editId ? "Simpan Perubahan" : "Simpan Data"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-sm rounded-3xl shadow-2xl relative z-10 overflow-hidden border border-slate-100 p-8 text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-red-100">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Hapus Data?</h3>
              <p className="text-slate-500 font-medium mb-8">
                Tindakan ini tidak dapat dibatalkan. Apakah Anda yakin ingin menghapus data karyawan ini secara permanen?
              </p>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-2xl font-bold transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold shadow-xl shadow-red-200 transition-all"
                >
                  Hapus
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
