"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyOrders() {
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    try {
      const user = JSON.parse(storedUser);

      fetch("https://localhost:7175/api/Order")
        .then((res) => res.json())
        .then((data) => {
          const userOrders = data.filter((order) => order.userId === user.id);

          setOrders(userOrders);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } catch (err) {
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [router]);

  // ✅ UPDATED CANCEL FUNCTION
  const cancelOrder = async (orderId) => {
    const confirmCancel = confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmCancel) return;

    try {
      const res = await fetch(
        `https://localhost:7175/api/Order/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify("Cancelled"),
        },
      );

      if (res.ok) {
        // ✅ update UI instead of deleting
        setOrders((prev) =>
          prev.map((o) =>
            o.id === orderId ? { ...o, status: "Cancelled" } : o,
          ),
        );

        alert("Order cancelled successfully");
      } else {
        alert("Failed to cancel order");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  if (loading) {
    return <p style={{ padding: "50px" }}>Loading your orders...</p>;
  }

  return (
    <div style={container}>
      <h1 style={title}>📦 My Orders</h1>

      {orders.length === 0 ? (
        <div style={emptyState}>
          <h3>No Orders Yet 😔</h3>
          <p>Start shopping to place your first order</p>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={card}>
            <div style={row}>
              <h3>Order #{order.id}</h3>
              <span style={statusStyle(order.status)}>{order.status}</span>
            </div>

            <p>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>

            {order.createdAt && (
              <p style={date}>{new Date(order.createdAt).toLocaleString()}</p>
            )}

            {/* ✅ Cancel only if Pending */}
            {order.status === "Pending" && (
              <button style={cancelBtn} onClick={() => cancelOrder(order.id)}>
                Cancel Order
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  padding: "60px",
  maxWidth: "800px",
  margin: "auto",
};

const title = {
  marginBottom: "30px",
};

const card = {
  backgroundColor: "#1e293b",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const date = {
  fontSize: "12px",
  opacity: 0.6,
  marginTop: "5px",
};

const cancelBtn = {
  marginTop: "12px",
  padding: "8px 12px",
  backgroundColor: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const emptyState = {
  textAlign: "center",
  marginTop: "50px",
  opacity: 0.8,
};

const statusStyle = (status) => {
  const colors = {
    Pending: "#f59e0b",
    Processing: "#3b82f6",
    Shipped: "#8b5cf6",
    Delivered: "#10b981",
    Cancelled: "#ef4444", // ✅ added
  };

  return {
    backgroundColor: colors[status] || "#64748b",
    padding: "5px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    color: "white",
  };
};
