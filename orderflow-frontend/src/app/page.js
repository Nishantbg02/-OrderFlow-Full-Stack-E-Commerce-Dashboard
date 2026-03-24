"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  const [statusCounts, setStatusCounts] = useState({
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
  });

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

  useEffect(() => {
    fetch("https://localhost:7175/api/Product")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.length);
        setLowStockProducts(data.filter((p) => p.stock < 5));
      });

    fetch("https://localhost:7175/api/Order")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);

        const total = data.reduce((sum, order) => sum + order.totalAmount, 0);
        setRevenue(total);

        setStatusCounts({
          pending: data.filter((o) => o.status === "Pending").length,
          processing: data.filter((o) => o.status === "Processing").length,
          shipped: data.filter((o) => o.status === "Shipped").length,
          delivered: data.filter((o) => o.status === "Delivered").length,
        });
      });
  }, []);

  if (loading) return <p style={{ padding: "50px" }}>Checking access...</p>;

  return (
    <div style={{ padding: "60px" }}>
      <h1>OrderFlow Dashboard</h1>
      <p>Admin Panel</p>

      <h3>Total Products: {products}</h3>
      <h3>Total Orders: {orders.length}</h3>
      <h3>Revenue: ₹{revenue}</h3>

      <h3>Low Stock</h3>
      {lowStockProducts.map((p) => (
        <p key={p.id}>{p.name}</p>
      ))}

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={orders}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="id" />
          <YAxis />
          <Tooltip />
          <Line dataKey="totalAmount" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
