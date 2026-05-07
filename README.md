<div align="center">
  <img src="./hr-frontend/src/assets/logo-urip.png" alt="Logo RS Urip Sumoharjo" width="120" />
  <h1>🏥 Sistem Manajemen SDM - RS Urip Sumoharjo</h1>
  <p><strong>Technical Test - Full Stack Developer</strong></p>
</div>

<br />

Sebuah sistem manajemen data karyawan rumah sakit berbasis web (Full Stack) yang dibangun dengan arsitektur modern. Proyek ini dikembangkan khusus untuk memenuhi kualifikasi **Technical Test Full Stack Developer RS Urip Sumoharjo**, mencakup fungsionalitas CRUD, Audit Log berbasis Trigger Database, Autentikasi JWT, Ekspor PDF, hingga visualisasi antarmuka kelas enterprise.

---

## ✨ Fitur Unggulan

Proyek ini tidak hanya memenuhi **seluruh persyaratan wajib (Core Requirements)** dari lembar soal, tetapi juga mengimplementasikan standar industri tambahan untuk aspek UI/UX (*Eksplorasi Bonus*):

1. **🔒 Keamanan JWT Ketat:** Implementasi autentikasi JSON Web Token dengan masa kedaluwarsa absolut (1 Menit) sesuai instruksi soal.
2. **🗄️ Database Trigger (Audit Log):** Perekaman otomatis (*Real-time*) setiap aktivitas `INSERT`, `UPDATE`, dan `DELETE` dari tabel `KARYAWAN` ke tabel `TLOG` di tingkat database MySQL.
3. **📊 Visualisasi Data Interaktif:** Dashboard dilengkapi dengan grafik distribusi gaji (*Recharts*) dan ringkasan data analitik.
4. **📜 Laporan PDF Profesional:** Cetak rekap data karyawan dengan format PDF yang rapi, lengkap dengan kop surat institusi.
5. **🎨 Antarmuka Enterprise-Grade:** Menggunakan kombinasi *Tailwind CSS v4*, *Framer Motion*, dan elemen *Glassmorphism* untuk pengalaman pengguna yang sangat responsif, mulus, dan memanjakan mata.

---

## 🛠️ Teknologi yang Digunakan

**Backend:**
* Node.js & Express.js (RESTful API)
* MySQL (Database & Trigger)
* JSON Web Token (Autentikasi)

**Frontend:**
* React.js (Vite)
* Tailwind CSS v4 (Styling)
* Framer Motion (Animasi UI)
* Recharts (Visualisasi Data)
* jsPDF & jsPDF-AutoTable (Ekspor Dokumen)

---

## 📸 Cuplikan Antarmuka (Screenshots)

> **Catatan untuk Reviewer:** Berikut adalah cuplikan antarmuka dari aplikasi yang telah berjalan. 

*(Untuk Penulis Repo: Silakan ambil tangkapan layar web Anda dan drag-and-drop gambar tersebut tepat di bawah teks ini untuk menggantikan placeholder gambar GitHub)*

| Halaman Landing & Login | Dashboard (Ringkasan & Chart) |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x350/f8fafc/10b981?text=Masukkan+Gambar+Halaman+Login+Disini" alt="Login Page" width="100%"/> | <img src="https://via.placeholder.com/600x350/f8fafc/10b981?text=Masukkan+Gambar+Dashboard+Disini" alt="Dashboard" width="100%"/> |

| Halaman Direktori Karyawan | Riwayat Aktivitas (Trigger TLOG) |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x350/f8fafc/10b981?text=Masukkan+Gambar+Tabel+Karyawan+Disini" alt="Direktori Karyawan" width="100%"/> | <img src="https://via.placeholder.com/600x350/f8fafc/10b981?text=Masukkan+Gambar+Riwayat+TLOG+Disini" alt="Activity Logs" width="100%"/> |

---

## ⚙️ Persyaratan Sistem (Prerequisites)

Sebelum menjalankan aplikasi, pastikan mesin Anda telah terpasang perangkat lunak berikut:
- **Node.js** (Versi 18+ direkomendasikan)
- **MySQL Server** (XAMPP / MySQL Workbench / dsb)
- **Git**

---

## 🚀 Cara Instalasi & Menjalankan Proyek (Plug & Play)

Proyek ini telah dikonfigurasi agar semudah mungkin dievaluasi oleh tim IT (Plug and Play). **Tidak diperlukan file `.env`**; seluruh konfigurasi telah diatur pada `server.js` untuk kemudahan *review*.

### Langkah 1: Kloning Repositori
```bash
git clone https://github.com/USERNAME-ANDA/HR-Project-Test.git
cd HR-Project-Test
```

### Langkah 2: Persiapan Database MySQL
1. Buka MySQL client Anda (misal: phpMyAdmin atau Terminal MySQL).
2. Buat database baru bernama `HR` dan jalankan script SQL di bawah ini untuk menginisiasi Tabel dan Trigger:

<details>
<summary><b>Klik disini untuk melihat Script SQL lengkap (Copy & Paste)</b></summary>

```sql
CREATE DATABASE IF NOT EXISTS HR;
USE HR;

-- Tabel Karyawan
CREATE TABLE KARYAWAN (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nama VARCHAR(100) NOT NULL,
    Tgl_Lahir DATE NOT NULL,
    Gaji DECIMAL(15, 2) NOT NULL
);

-- Tabel Log Transaksi
CREATE TABLE TLOG (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Tanggal DATE NOT NULL,
    Jam TIME NOT NULL,
    Keterangan VARCHAR(255) NOT NULL
);

-- Trigger untuk INSERT
DELIMITER $$
CREATE TRIGGER trg_after_insert_karyawan
AFTER INSERT ON KARYAWAN
FOR EACH ROW
BEGIN
    INSERT INTO TLOG (Tanggal, Jam, Keterangan)
    VALUES (CURDATE(), CURTIME(), CONCAT('INSERT: Menambah karyawan baru (', NEW.Nama, ')'));
END$$

-- Trigger untuk UPDATE
CREATE TRIGGER trg_after_update_karyawan
AFTER UPDATE ON KARYAWAN
FOR EACH ROW
BEGIN
    INSERT INTO TLOG (Tanggal, Jam, Keterangan)
    VALUES (CURDATE(), CURTIME(), CONCAT('UPDATE: Mengubah data karyawan ID #', NEW.Id));
END$$

-- Trigger untuk DELETE
CREATE TRIGGER trg_after_delete_karyawan
AFTER DELETE ON KARYAWAN
FOR EACH ROW
BEGIN
    INSERT INTO TLOG (Tanggal, Jam, Keterangan)
    VALUES (CURDATE(), CURTIME(), CONCAT('DELETE: Menghapus data karyawan ID #', OLD.Id));
END$$
DELIMITER ;
```
</details>

### Langkah 3: Menjalankan Backend (API)
Buka terminal baru pada root folder, kemudian:
```bash
cd hr-backend
npm install
node server.js
```
*Server API akan berjalan secara lokal pada `http://localhost:5000`.*

### Langkah 4: Menjalankan Frontend (Web UI)
Buka terminal (tab) baru pada root folder, kemudian:
```bash
cd hr-frontend
npm install
npm run dev
```
*Aplikasi web akan terbuka secara otomatis di browser Anda, biasanya pada port `http://localhost:5173`.*

---

## 🔑 Kredensial Login (Testing)

Untuk mengakses dashboard dan melewati verifikasi JWT (Expired 1 Menit), gunakan data *dummy* berikut pada halaman masuk:

- **Email:** `admin@gmail.com`
- **Kata Sandi:** `pass123`

---
<div align="center">
  <p>Dikembangkan oleh <b>Erlangga Dwi Jiwantoro</b> untuk Tes Teknis RS Urip Sumoharjo.</p>
</div>
