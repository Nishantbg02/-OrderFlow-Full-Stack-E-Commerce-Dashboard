"use client";

import { useContext } from "react";
import { CartContext } from "../context/cartContext";

export default function Cart() {
  const { cart, clearCart } = useContext(CartContext);

  const checkout = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const items = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const order = {
      userId: 1,
      items: items,
    };

    await fetch("https://localhost:7175/api/Order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    clearCart();
    alert("Order placed successfully!");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Your Cart</h1>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item, index) => (
        <div key={index} style={card}>
          <h3>{item.name}</h3>
          <p>Price: ₹{item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}

      {cart.length > 0 && (
        <button style={btn} onClick={checkout}>
          Checkout
        </button>
      )}
    </div>
  );
}

const card = {
  border: "1px solid #ccc",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "6px",
};

const btn = {
  marginTop: "20px",
  padding: "10px 18px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
