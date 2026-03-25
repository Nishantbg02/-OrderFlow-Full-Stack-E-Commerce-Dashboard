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

🔐 Login Page
<img width="1882" height="976" alt="image" src="https://github.com/user-attachments/assets/f7e87bf4-0d3a-4c2c-a912-cb2b99640f75" />


📝 Registration Page

<img width="1854" height="981" alt="image" src="https://github.com/user-attachments/assets/cd60f2e7-94d1-44dc-aa2b-ac75643cd301" />


🏠 Dashboard (Admin)

<img width="1879" height="1005" alt="image" src="https://github.com/user-attachments/assets/13a6f965-1ee0-48f6-b315-2d9b5901943d" />


🛍️ Shop Page (Customer)

<img width="1889" height="994" alt="image" src="https://github.com/user-attachments/assets/aa0a027e-53ea-4377-b4f6-77b44cc55bb3" />


🧾 Orders Page (Admin)

<img width="1877" height="986" alt="image" src="https://github.com/user-attachments/assets/525c713c-d27e-4278-a8a0-74c7a935d2b6" />


🛒 Products (Admin)

<img width="1862" height="983" alt="image" src="https://github.com/user-attachments/assets/f2412eaf-9fe8-4010-bcd2-1358cb1e8c72" />


📦 My Orders (Customer)

<img width="1860" height="956" alt="image" src="https://github.com/user-attachments/assets/35693846-9fec-4e46-bc9e-e52b01be344d" />

