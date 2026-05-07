<div align="center">
  <img src="./hr-frontend/src/assets/logo-urip.png" alt="Logo RS Urip Sumoharjo" width="120" />
  <h1>Sistem Manajemen SDM - RS Urip Sumoharjo</h1>
  <p><strong>Tes Teknis - Full Stack Developer</strong></p>
</div>

<br />

Aplikasi ini merupakan sistem manajemen data karyawan rumah sakit berbasis web yang dikembangkan untuk memenuhi kualifikasi tes teknis Full Stack Developer di RS Urip Sumoharjo. Proyek ini mencakup fungsionalitas manajemen data (CRUD), pencatatan log aktivitas menggunakan trigger database, autentikasi berbasis JWT, serta fitur ekspor data ke format PDF.

---

## Fitur Sistem

Sistem ini mengimplementasikan beberapa fitur utama sesuai dengan spesifikasi yang diminta:

1. **Autentikasi JWT:** Implementasi keamanan menggunakan JSON Web Token dengan masa berlaku akses sesuai instruksi.
2. **Audit Log (Database Trigger):** Pencatatan otomatis setiap aktivitas penambahan, perubahan, dan penghapusan data karyawan dari tabel KARYAWAN ke tabel TLOG pada tingkat database.
3. **Visualisasi Data:** Dashboard yang menampilkan ringkasan data analitik dan grafik distribusi gaji.
4. **Laporan PDF:** Fitur untuk mengunduh rekap data karyawan dalam format dokumen PDF dengan format standar.
5. **Antarmuka Pengguna:** Desain antarmuka yang responsif menggunakan Tailwind CSS dan Framer Motion untuk navigasi yang optimal.

---

## Teknologi yang Digunakan

**Backend:**
* Node.js & Express.js
* MySQL (Database & Trigger)
* JSON Web Token

**Frontend:**
* React.js (Vite)
* Tailwind CSS
* Framer Motion
* Recharts
* jsPDF & jsPDF-AutoTable

---

## Cuplikan Antarmuka

Berikut adalah tampilan antarmuka dari aplikasi:

| Halaman Landing | Dashboard |
| :---: | :---: |
| <img alt="Screenshot 1" src="https://github.com/user-attachments/assets/141bed13-7158-46ed-b04d-c9a301c2a889" /> | <img alt="Screenshot 2" src="https://github.com/user-attachments/assets/a3383d14-a61b-4d4a-a378-ece55f8d1b6c" /> |

| Direktori Karyawan | Riwayat Aktivitas (TLOG) |
| :---: | :---: |
| <img alt="Screenshot 3" src="https://github.com/user-attachments/assets/71068a67-e7ef-47c7-9d29-024d5dd7d983" /> | <img alt="Screenshot 4" src="https://github.com/user-attachments/assets/6fdedf34-4751-481d-8592-2f2d51d33cc8" /> |

| Halaman Login | Cetak Dokumen |
| :---: | :---: |
| <img width="1920" height="1080" alt="Screenshot 2026-05-07 162212" src="https://github.com/user-attachments/assets/71dc09a3-fdf4-4ffc-baed-5ddbc7f00846" /> | <img width="992" height="700" alt="Screenshot 2026-05-07 163340" src="https://github.com/user-attachments/assets/2fed8629-4438-4449-a7da-849e58e01da9" /> |

---

## Persyaratan Sistem

Pastikan perangkat lunak berikut telah terpasang sebelum menjalankan aplikasi:
- Node.js (Versi 18 atau lebih baru)
- MySQL Server
- Git

---

## Panduan Instalasi dan Konfigurasi

### 1. Kloning Repositori
```bash
git clone https://github.com/USERNAME-ANDA/HR-Project-Test.git
cd HR-Project-Test
```

### 2. Persiapan Database
1. Buat database baru dengan nama `HR`.
2. Jalankan skrip SQL berikut untuk membuat tabel dan trigger yang diperlukan:

<details>
<summary><b>Skrip SQL Inisialisasi</b></summary>

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

```
</details>

### 3. Menjalankan Backend
```bash
cd hr-backend
npm install
node server.js
```
Server akan berjalan pada `http://localhost:5000`.

### 4. Menjalankan Frontend
```bash
cd hr-frontend
npm install
npm run dev
```
Aplikasi dapat diakses melalui browser pada alamat yang tertera di terminal (default: `http://localhost:5173`).

---

## Kredensial Login

Gunakan data berikut untuk masuk ke dalam sistem:

- **Email:** `admin@gmail.com`
- **Kata Sandi:** `pass123`

---

<div align="center">
  <p>Dikembangkan oleh Erlangga Dwi Jiwantoro.</p>
</div>
