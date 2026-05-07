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
  Calendar,
  UserPlus,
  LayoutDashboard,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StatsChart from "../components/StatsChart";
import LogTable from "../components/LogTable";

export default function Dashboard() {
  const [karyawan, setKaryawan] = useState([]);
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({ Nama: "", Tgl_Lahir: "", Gaji: "" });
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
      alert("Session expired or system error. Please login again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:5000/api/karyawan/${id}`, getAuthHeader());
        fetchData();
      } catch (error) {
        alert("Failed to delete record.");
      }
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
    doc.setFontSize(20);
    doc.text("Employee Data Report", 14, 22);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

    const tableColumn = ["ID", "Name", "Date of Birth", "Salary"];
    const tableRows = karyawan.map((k) => [
      k.Id,
      k.Nama,
      k.Tgl_Lahir,
      `Rp ${parseInt(k.Gaji).toLocaleString()}`,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      theme: 'grid',
      headStyles: { fillHex: '#0ea5e9' }
    });

    doc.save("Employee_Report.pdf");
  };

  const filteredKaryawan = karyawan.filter(k => 
    k.Nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSalary = karyawan.reduce((acc, curr) => acc + parseInt(curr.Gaji), 0);
  const avgSalary = karyawan.length > 0 ? totalSalary / karyawan.length : 0;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            HR
          </div>
          <span className="font-bold text-lg tracking-tight">Urip HRD</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-primary-50 text-primary-700 rounded-xl font-semibold">
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
            <Users size={20} /> Employees
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
            <TrendingUp size={20} /> Analytics
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
            <Calendar size={20} /> Schedule
          </a>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium"
          >
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500">Welcome back, Administrator</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search employees..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-primary-500 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => { setEditId(null); setForm({ Nama: "", Tgl_Lahir: "", Gaji: "" }); setIsModalOpen(true); }}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-primary-200 transition-all"
            >
              <Plus size={18} /> <span className="hidden sm:inline">Add Employee</span>
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <p className="text-slate-500 text-sm font-medium">Total Employees</p>
              <h3 className="text-3xl font-bold mt-1">{karyawan.length}</h3>
            </div>
            
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                <DollarSign size={24} />
              </div>
              <p className="text-slate-500 text-sm font-medium">Total Monthly Payroll</p>
              <h3 className="text-3xl font-bold mt-1">Rp {totalSalary.toLocaleString()}</h3>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
                <TrendingUp size={24} />
              </div>
              <p className="text-slate-500 text-sm font-medium">Average Salary</p>
              <h3 className="text-3xl font-bold mt-1">Rp {Math.round(avgSalary).toLocaleString()}</h3>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
                <UserPlus size={24} />
              </div>
              <p className="text-slate-500 text-sm font-medium">New Hires (Month)</p>
              <h3 className="text-3xl font-bold mt-1">0</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Chart Area */}
            <div className="xl:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Salary Distribution</h3>
                  <p className="text-sm text-slate-500">Employee vs Monthly Salary (IDR)</p>
                </div>
                <button 
                  onClick={exportPDF}
                  className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl transition-all border border-slate-200"
                  title="Export PDF"
                >
                  <Printer size={20} />
                </button>
              </div>
              <StatsChart data={karyawan} />
            </div>

            {/* Log Area */}
            <div className="h-[450px]">
              <LogTable logs={logs} />
            </div>
          </div>

          {/* Table Area */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-xl font-bold">Employee Directory</h3>
              <span className="text-sm text-slate-500">{filteredKaryawan.length} records found</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                    <th className="px-8 py-4">Employee</th>
                    <th className="px-8 py-4">Birth Date</th>
                    <th className="px-8 py-4">Salary</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredKaryawan.map((k) => (
                    <tr key={k.Id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-sm">
                            {k.Nama.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{k.Nama}</p>
                            <p className="text-xs text-slate-400">ID: #{k.Id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-4 text-slate-600 font-medium">
                        {k.Tgl_Lahir}
                      </td>
                      <td className="px-8 py-4">
                        <span className="font-bold text-slate-900">Rp {parseInt(k.Gaji).toLocaleString()}</span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleEdit(k)}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(k.Id)}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Form Modal */}
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
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {editId ? "Update Employee" : "New Employee"}
                  </h3>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-all">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={form.Nama}
                      onChange={(e) => setForm({ ...form, Nama: e.target.value })}
                      required
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Birth Date</label>
                      <input
                        type="date"
                        value={form.Tgl_Lahir}
                        onChange={(e) => setForm({ ...form, Tgl_Lahir: e.target.value })}
                        required
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Salary (Monthly)</label>
                      <input
                        type="number"
                        placeholder="IDR"
                        value={form.Gaji}
                        onChange={(e) => setForm({ ...form, Gaji: e.target.value })}
                        required
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold shadow-lg shadow-primary-200 transition-all"
                    >
                      {editId ? "Save Changes" : "Create Record"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
