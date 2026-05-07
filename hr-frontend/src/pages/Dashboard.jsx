import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function Dashboard() {
  const [karyawan, setKaryawan] = useState([]);
  const [form, setForm] = useState({ Nama: "", Tgl_Lahir: "", Gaji: "" });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchKaryawan = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/karyawan",
        getAuthHeader()
      );
      setKaryawan(res.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Sesi Anda habis (1 Menit). Silakan login kembali.");
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  useEffect(() => {
    fetchKaryawan();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/karyawan/${editId}`,
          form,
          getAuthHeader()
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/karyawan",
          form,
          getAuthHeader()
        );
      }
      setForm({ Nama: "", Tgl_Lahir: "", Gaji: "" });
      setEditId(null);
      fetchKaryawan();
    } catch (error) {
      alert("Gagal menyimpan data. Pastikan sesi belum expired.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin hapus data ini?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/karyawan/${id}`,
          getAuthHeader()
        );
        fetchKaryawan();
      } catch (error) {
        alert("Gagal menghapus data.");
      }
    }
  };

  const handleEdit = (k) => {
    setForm({ Nama: k.Nama, Tgl_Lahir: k.Tgl_Lahir, Gaji: k.Gaji });
    setEditId(k.Id);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text("Laporan Data Karyawan", 14, 15);

    const tableColumn = ["ID", "Nama", "Tanggal Lahir", "Gaji"];
    const tableRows = karyawan.map((k) => [
      k.Id,
      k.Nama,
      k.Tgl_Lahir,
      `Rp ${k.Gaji}`,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("Laporan_Karyawan.pdf");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Dashboard HR - Data Karyawan</h2>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 15px",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ccc",
        }}
      >
        <h3>{editId ? "Edit Karyawan" : "Tambah Karyawan"}</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Nama"
            value={form.Nama}
            onChange={(e) => setForm({ ...form, Nama: e.target.value })}
            required
          />
          <input
            type="date"
            value={form.Tgl_Lahir}
            onChange={(e) => setForm({ ...form, Tgl_Lahir: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Gaji"
            value={form.Gaji}
            onChange={(e) => setForm({ ...form, Gaji: e.target.value })}
            required
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#2ecc71",
              color: "white",
              border: "none",
              cursor: "pointer",
              padding: "5px 15px",
            }}
          >
            {editId ? "Update" : "Simpan"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setForm({ Nama: "", Tgl_Lahir: "", Gaji: "" });
              }}
            >
              Batal
            </button>
          )}
        </form>
      </div>

      <button
        onClick={exportPDF}
        style={{
          marginBottom: "15px",
          padding: "10px",
          backgroundColor: "#f1c40f",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🖨️ Cetak Laporan PDF
      </button>

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}
      >
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Tgl Lahir</th>
            <th>Gaji</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {karyawan.map((k) => (
            <tr key={k.Id}>
              <td>{k.Id}</td>
              <td>{k.Nama}</td>
              <td>{k.Tgl_Lahir}</td>
              <td>Rp {k.Gaji}</td>
              <td>
                <button
                  onClick={() => handleEdit(k)}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(k.Id)}
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "white",
                    border: "none",
                  }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
