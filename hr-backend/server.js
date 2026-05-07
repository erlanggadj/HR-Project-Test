const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// 1. KONEKSI DATABASE
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "HR",
});

db.connect((err) => {
  if (err) console.error("=> Gagal terhubung MySQL:", err);
  else console.log("=> Terkoneksi ke database HR");
});

const SECRET_KEY = "rahasia_urip_sumoharjo";

// 2. ENDPOINT LOGIN (JWT Auth)
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "pass123") {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1m" });
    return res.json({ message: "Login sukses", token });
  }

  return res.status(401).json({ message: "Email atau Password salah" });
});

// 3. MIDDLEWARE VALIDASI TOKEN
const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header)
    return res.status(403).json({ message: "Akses ditolak. Token tidak ada." });

  const token = header.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json({ message: "Sesi expired. Silakan login kembali." });
    req.user = decoded;
    next();
  });
};

// 4. RESTFUL API CRUD KARYAWAN (Dilindungi Token)

// CREATE
app.post("/api/karyawan", verifyToken, (req, res) => {
  const { Nama, Tgl_Lahir, Gaji } = req.body;
  db.query(
    "INSERT INTO KARYAWAN (Nama, Tgl_Lahir, Gaji) VALUES (?, ?, ?)",
    [Nama, Tgl_Lahir, Gaji],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Data Karyawan berhasil ditambah",
        id: result.insertId,
      });
    }
  );
});

// READ
app.get("/api/karyawan", verifyToken, (req, res) => {
  db.query(
    'SELECT Id, Nama, DATE_FORMAT(Tgl_Lahir, "%Y-%m-%d") as Tgl_Lahir, Gaji FROM KARYAWAN',
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

// UPDATE
app.put("/api/karyawan/:id", verifyToken, (req, res) => {
  const id = req.params.id;
  const { Nama, Tgl_Lahir, Gaji } = req.body;

  db.query(
    "UPDATE KARYAWAN SET Nama=?, Tgl_Lahir=?, Gaji=? WHERE Id=?",
    [Nama, Tgl_Lahir, Gaji, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Data Karyawan berhasil diubah" });
    }
  );
});

// DELETE
app.delete("/api/karyawan/:id", verifyToken, (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM KARYAWAN WHERE Id=?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Data Karyawan dihapus" });
  });
});

// GET LOG
app.get("/api/log", verifyToken, (req, res) => {
  db.query(
    "SELECT Id, DATE_FORMAT(Tanggal, '%Y-%m-%d') as Tanggal, Jam, Keterangan FROM TLOG ORDER BY Id DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

app.listen(5000, () => console.log("=> Server Backend jalan di port 5000"));
