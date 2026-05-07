import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      alert("Login Berhasil!");
      navigate("/dashboard");
    } catch (error) {
      alert("Login gagal! Cek email dan password Anda.");
    }
  };

  return (
    <div
      style={{
        padding: "50px",
        maxWidth: "400px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h2>Login Karyawan</h2>
      <p style={{ color: "gray", fontSize: "14px" }}>
        Waktu Sesi Token: 1 Menit
      </p>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="email"
          placeholder="Email (admin@gmail.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "10px" }}
        />
        <input
          type="password"
          placeholder="Password (pass123)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "10px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
