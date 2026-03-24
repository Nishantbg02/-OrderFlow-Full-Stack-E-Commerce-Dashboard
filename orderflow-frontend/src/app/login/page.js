"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("https://localhost:7175/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        alert("Invalid login");
        return;
      }

      const user = await res.json();

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "Admin") {
        window.location.href = "/";
      } else {
        window.location.href = "/shop";
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h1>Login</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button onClick={handleLogin} style={button}>
          Login
        </button>
      </div>
    </div>
  );
}

const container = {
  height: "80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  backgroundColor: "#1e293b",
  padding: "30px",
  borderRadius: "12px",
  width: "300px",
};

const input = {
  display: "block",
  marginBottom: "15px",
  padding: "10px",
  width: "100%",
  borderRadius: "6px",
  border: "none",
};

const button = {
  padding: "10px",
  width: "100%",
  backgroundColor: "#10b981",
  color: "white",
  border: "none",
  borderRadius: "6px",
};
