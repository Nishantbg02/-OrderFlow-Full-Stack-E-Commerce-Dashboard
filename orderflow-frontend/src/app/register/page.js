"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ VALIDATION
  const validate = () => {
    if (!form.name || !form.email || !form.phone || !form.password) {
      alert("Please fill all required fields");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      alert("Invalid email format");
      return false;
    }

    if (form.phone.length < 10) {
      alert("Phone number must be at least 10 digits");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("https://localhost:7175/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          password: form.password,
        }),
      });

      if (res.ok) {
        alert("Registration successful!");
        router.push("/login");
      } else {
        alert("Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Create Account 🚀</h2>

        <div style={inputGroup}>
          <span>👤</span>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            style={input}
          />
        </div>

        <div style={inputGroup}>
          <span>📧</span>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            style={input}
          />
        </div>

        <div style={inputGroup}>
          <span>📱</span>
          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            style={input}
          />
        </div>

        <div style={inputGroup}>
          <span>📍</span>
          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            style={input}
          />
        </div>

        <div style={inputGroup}>
          <span>🔒</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            style={input}
          />
        </div>

        <div style={inputGroup}>
          <span>🔒</span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            style={input}
          />
        </div>

        <button onClick={handleRegister} style={button} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
}

/* 🔥 STYLES */

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #0f172a, #1e293b)",
};

const card = {
  background: "#1e293b",
  padding: "30px",
  borderRadius: "16px",
  width: "350px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
};

const title = {
  textAlign: "center",
  marginBottom: "20px",
};

const inputGroup = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "12px",
  background: "#0f172a",
  padding: "8px",
  borderRadius: "8px",
  border: "1px solid #334155",
};

const input = {
  border: "none",
  outline: "none",
  background: "transparent",
  color: "white",
  width: "100%",
};

const button = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(90deg, #3b82f6, #6366f1)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};
