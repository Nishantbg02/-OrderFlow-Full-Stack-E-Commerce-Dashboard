"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser || storedUser === "undefined") {
        setUser(null);
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Invalid JSON:", storedUser);
        localStorage.removeItem("user");
        setUser(null);
      }
    };

    getUser();
    window.addEventListener("storage", getUser);

    return () => {
      window.removeEventListener("storage", getUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <nav style={nav}>
      {/* 🔷 Logo */}
      <h2 style={logo}>🚀 OrderFlow</h2>

      <div style={right}>
        {/* Admin Links */}
        {user?.role === "Admin" && (
          <>
            <Link href="/" style={link}>
              Dashboard
            </Link>
            <Link href="/products" style={link}>
              Products
            </Link>
            <Link href="/orders" style={link}>
              Orders
            </Link>
          </>
        )}

        {/* User Links */}
        {user && (
          <Link href="/shop" style={link}>
            Shop
          </Link>
        )}

        {user && user.role !== "Admin" && (
          <Link href="/my-orders" style={link}>
            My Orders
          </Link>
        )}

        {/* Auth Section */}
        {user ? (
          <>
            <span style={userBadge}>👤 {user.email}</span>

            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" style={link}>
              Login
            </Link>
            <Link href="/register" style={link}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

/* 🔥 MODERN STYLES */

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 40px",

  background: "rgba(30, 41, 59, 0.7)",
  backdropFilter: "blur(12px)",
  borderBottom: "1px solid #334155",

  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const logo = {
  fontWeight: "bold",
  fontSize: "20px",
};

const right = {
  display: "flex",
  gap: "20px",
  alignItems: "center",
};

const link = {
  color: "#cbd5f5",
  textDecoration: "none",
  fontWeight: "500",
};

const userBadge = {
  background: "#0f172a",
  padding: "6px 12px",
  borderRadius: "999px",
  border: "1px solid #334155",
  fontSize: "13px",
};
