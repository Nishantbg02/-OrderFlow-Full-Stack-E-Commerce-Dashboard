"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Orders() {
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔒 Admin protection
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.role !== "Admin") {
      router.push("/shop");
    } else {
      setTimeout(() => setLoading(false), 0);
    }
  }, [router]);

  const fetchOrders = async () => {
    const res = await fetch("https://localhost:7175/api/Order");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    const loadOrders = async () => {
      await fetchOrders();
    };

    loadOrders();
  }, []);
  // ✅ STATUS FLOW LOGIC
  const isValidTransition = (current, next) => {
    const flow = {
      Pending: ["Processing"],
      Processing: ["Shipped"],
      Shipped: ["Delivered"],
      Delivered: [],
      Cancelled: [], // 🔒 locked
    };

    return flow[current]?.includes(next);
  };

  // ✅ UPDATED STATUS FUNCTION
  const updateStatus = async (orderId, newStatus, currentStatus) => {
    if (currentStatus === "Cancelled") {
      alert("❌ Cannot update a cancelled order");
      return;
    }

    if (!isValidTransition(currentStatus, newStatus)) {
      alert(`❌ Invalid status change: ${currentStatus} → ${newStatus}`);
      return;
    }

    try {
      const res = await fetch(
        `https://localhost:7175/api/Order/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newStatus),
        },
      );

      if (res.ok) {
        fetchOrders();
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const viewOrder = async (orderId) => {
    const res = await fetch(`https://localhost:7175/api/Order/${orderId}`);
    const data = await res.json();

    setSelectedOrderId(orderId);
    setOrderItems(data.items);
  };

  if (loading) {
    return <p style={{ padding: "50px" }}>Checking access...</p>;
  }

  return (
    <div style={container}>
      <h1>📦 Orders (Admin)</h1>

      {orders.map((order) => (
        <div key={order.id} style={card}>
          <div style={row}>
            <h3>Order #{order.id}</h3>
            <span style={statusStyle(order.status)}>{order.status}</span>
          </div>

          <p>User: {order.userId}</p>
          <p>Total: ₹{order.totalAmount}</p>

          {/* 🔒 Disable if cancelled */}
          <select
            value={order.status}
            disabled={order.status === "Cancelled"}
            onChange={(e) =>
              updateStatus(order.id, e.target.value, order.status)
            }
            style={select}
          >
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>

          {/* ❗ Show message if cancelled */}
          {order.status === "Cancelled" && (
            <p style={cancelMsg}>❌ Cancelled by customer</p>
          )}

          <button style={viewBtn} onClick={() => viewOrder(order.id)}>
            View Items
          </button>

          {selectedOrderId === order.id && (
            <div style={itemsContainer}>
              {orderItems.map((item, index) => (
                <div key={index} style={itemRow}>
                  <span>{item.productName}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  padding: "60px",
  maxWidth: "1000px",
  margin: "auto",
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

const select = {
  marginTop: "10px",
  padding: "6px",
  borderRadius: "6px",
};

const viewBtn = {
  marginTop: "15px",
  padding: "8px",
  backgroundColor: "#6366f1",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const itemsContainer = {
  marginTop: "10px",
  borderTop: "1px solid #334155",
};

const itemRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "6px 0",
};

const cancelMsg = {
  color: "#ef4444",
  marginTop: "10px",
  fontSize: "13px",
};

const statusStyle = (status) => {
  const colors = {
    Pending: "#f59e0b",
    Processing: "#3b82f6",
    Shipped: "#8b5cf6",
    Delivered: "#10b981",
    Cancelled: "#ef4444",
  };

  return {
    backgroundColor: colors[status] || "#64748b",
    padding: "5px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    color: "white",
  };
};
