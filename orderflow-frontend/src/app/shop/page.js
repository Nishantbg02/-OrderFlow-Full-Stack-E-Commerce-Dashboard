"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // 🔒 Auth
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
    } else {
      setTimeout(() => setLoading(false), 0);
    }
  }, [router]);

  // 📦 Load products
  useEffect(() => {
    fetch("https://localhost:7175/api/Product")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // ➕ Add to cart
  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // ❌ Remove from cart
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // 💰 Total
  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // 🛒 Checkout
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    const orderData = {
      userId: user.id,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    const res = await fetch("https://localhost:7175/api/Order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (res.ok) {
      alert("✅ Order placed!");
      setCart([]);
    }
  };

  if (loading) return <p style={{ padding: "50px" }}>Loading...</p>;

  return (
    <div style={container}>
      <h1 style={title}>🛒 Shop</h1>

      <div style={layout}>
        {/* PRODUCTS */}
        <div style={productsContainer}>
          {products.map((product) => (
            <div key={product.id} style={card}>
              <h3>{product.name}</h3>

              <p style={price}>₹{product.price}</p>

              <p style={stock}>
                {product.stock > 0 ? `Stock: ${product.stock}` : "Out of stock"}
              </p>

              <button style={button} onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* CART */}
        <div style={cartContainer}>
          <h2>🧾 Cart</h2>

          {cart.length === 0 ? (
            <p style={{ opacity: 0.7 }}>No items in cart</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} style={cartItem}>
                  <div>
                    <p>{item.name}</p>
                    <small>Qty: {item.quantity}</small>
                  </div>

                  <div>
                    <p>₹{item.price * item.quantity}</p>

                    <button
                      style={removeBtn}
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <hr style={{ margin: "15px 0", borderColor: "#334155" }} />

              <h3>Total: ₹{getTotal()}</h3>

              <button style={checkoutBtn} onClick={handleCheckout}>
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* 🔥 MODERN STYLES */

const container = {
  padding: "50px",
};

const title = {
  fontSize: "32px",
  marginBottom: "30px",
};

const layout = {
  display: "flex",
  gap: "40px",
};

const productsContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  flex: 3,
};

const card = {
  background: "rgba(30,41,59,0.6)",
  backdropFilter: "blur(10px)",
  padding: "20px",
  borderRadius: "16px",
  border: "1px solid #334155",
  boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
  transform: "translateY(0)",
};

const price = {
  fontSize: "18px",
  margin: "10px 0",
};

const stock = {
  fontSize: "14px",
  opacity: 0.7,
};

const button = {
  marginTop: "10px",
  padding: "10px",
  background: "linear-gradient(90deg,#3b82f6,#6366f1)",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
};

const cartContainer = {
  flex: 1,
  background: "#1e293b",
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
};

const cartItem = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "12px",
};

const removeBtn = {
  marginTop: "5px",
  padding: "4px 8px",
  backgroundColor: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "5px",
  fontSize: "12px",
  cursor: "pointer",
};

const checkoutBtn = {
  marginTop: "15px",
  width: "100%",
  padding: "12px",
  background: "linear-gradient(90deg,#10b981,#059669)",
  border: "none",
  borderRadius: "10px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};
