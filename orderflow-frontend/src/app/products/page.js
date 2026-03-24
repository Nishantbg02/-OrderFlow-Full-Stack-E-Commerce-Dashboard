"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Products() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ added

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  // 🔒 Admin protection (FIXED)
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
      setTimeout(() => setLoading(false), 0); // ✅ prevent flash
    }
  }, [router]);

  const fetchProducts = async () => {
    const res = await fetch("https://localhost:7175/api/Product");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    const loadProducts = async () => {
      await fetchProducts();
    };

    loadProducts();
  }, []);

  const addProduct = async () => {
    const product = {
      Name: name,
      Price: Number(price),
      Stock: Number(stock),
    };

    await fetch("https://localhost:7175/api/Product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    setName("");
    setPrice("");
    setStock("");

    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await fetch(`https://localhost:7175/api/Product/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  const updateProduct = async () => {
    await fetch(`https://localhost:7175/api/Product/${editingProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Price: Number(price),
        Stock: Number(stock),
      }),
    });

    setEditingProduct(null);
    setName("");
    setPrice("");
    setStock("");

    fetchProducts();
  };

  // ⏳ Prevent UI flash
  if (loading) {
    return <p style={{ padding: "50px" }}>Checking access...</p>;
  }

  return (
    <div style={container}>
      <h1>Products</h1>

      <div style={formCard}>
        <h3>{editingProduct ? "Edit Product" : "Add Product"}</h3>

        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={input}
        />

        <input
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          style={input}
        />

        <button
          style={addBtn}
          onClick={editingProduct ? updateProduct : addProduct}
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </div>

      <div style={grid}>
        {products.map((p) => (
          <div key={p.id} style={card}>
            <h3>{p.name}</h3>
            <p>Price: ₹{p.price}</p>
            <p>Stock: {p.stock}</p>

            <button
              style={editBtn}
              onClick={() => {
                setEditingProduct(p);
                setName(p.name);
                setPrice(p.price);
                setStock(p.stock);
              }}
            >
              Edit
            </button>

            <button style={deleteBtn} onClick={() => deleteProduct(p.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* styles */
const container = { padding: "60px", maxWidth: "1000px", margin: "auto" };
const formCard = {
  backgroundColor: "#1e293b",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "30px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "300px",
};
const input = {
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #334155",
  backgroundColor: "#0f172a",
  color: "white",
};
const addBtn = {
  padding: "10px",
  backgroundColor: "#2563eb",
  border: "none",
  borderRadius: "6px",
  color: "white",
};
const grid = { display: "flex", gap: "20px", flexWrap: "wrap" };
const card = {
  backgroundColor: "#1e293b",
  padding: "20px",
  borderRadius: "10px",
  width: "220px",
};
const editBtn = {
  marginTop: "10px",
  marginRight: "10px",
  padding: "8px",
  backgroundColor: "#f59e0b",
  color: "white",
  border: "none",
  borderRadius: "5px",
};
const deleteBtn = {
  marginTop: "10px",
  padding: "8px",
  backgroundColor: "#dc2626",
  border: "none",
  borderRadius: "6px",
  color: "white",
};
