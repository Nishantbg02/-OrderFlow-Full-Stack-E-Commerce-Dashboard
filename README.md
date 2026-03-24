# 🛒 OrderFlow – Full Stack E-Commerce Dashboard

A modern full-stack web application for managing products, orders, and users with a clean UI and real-world business logic.

---

## 🚀 Features

### 👤 Authentication

* User Registration & Login
* Role-based access (Admin / Customer)
* Protected routes

### 🛍️ Customer Features

* Browse products
* Add to cart
* Place orders
* View "My Orders"
* Cancel orders (only when pending)

### 🧑‍💼 Admin Features

* Dashboard with analytics
* Manage products (Add / Edit / Delete)
* Manage orders
* Update order status (with proper workflow)
* Cannot modify cancelled orders

### 📊 Dashboard

* Total Products
* Total Orders
* Revenue tracking
* Order status overview
* Low stock alerts

---

## 🧠 Business Logic

* Order lifecycle:
  `Pending → Processing → Shipped → Delivered`

* Cancelled orders are **locked** and cannot be modified

* Orders are linked to logged-in users

---

## 🛠️ Tech Stack

### Frontend

* Next.js (App Router)
* React
* JavaScript
* Recharts (Charts)

### Backend

* ASP.NET Core Web API
* Entity Framework Core

### Database

* SQL Server

---

## 🎨 UI/UX

* Modern dark theme 🌙
* Glassmorphism design
* Responsive layout
* Clean card-based UI
* Smooth transitions

---

## 📁 Project Structure

```
/app
  /login
  /register
  /shop
  /products
  /orders
  /my-orders
  page.js (Dashboard)
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/your-repo-name.git
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Run frontend

```
npm run dev
```

### 4️⃣ Run backend

* Open ASP.NET project
* Run using Visual Studio

---

## 🔐 Test Credentials

### Admin

```
Email: test@gmail.com
Password: 123
```

### User

```
Email: joyal@gmail.com
Password: j123

```
You can either:

✅ Use existing user credentials (if available), OR
✅ Register a new account from the Register page and login

---

## 📌 Future Improvements

* JWT Authentication
* Payment integration
* Email notifications
* Product images upload
* Search & filtering
* Mobile responsiveness

---

## 💬 About

This project demonstrates real-world full-stack development with proper business logic, authentication, and UI/UX design.

---

## ⭐ Author

**Nishant**
Frontend Developer (React / Next.js)

---

##📸 Screenshots


🏠 Dashboard (Admin)




🛍️ Shop Page (Customer)




🧾 Orders Page (Admin)




📦 My Orders (Customer)
