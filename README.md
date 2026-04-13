# ☕ Coffee Shop Backend API

Backend REST API untuk aplikasi Coffee Shop / E-Commerce menggunakan **Node.js, Express, PostgreSQL, JWT Authentication, Redis, dan Swagger Documentation**.

---

## 🚀 Features

- 🔐 Authentication (Register, Login, Logout)
- 🔑 JWT Token + Redis Session
- 👤 User Management (CRUD + Upload Profile)
- 📦 Product Management (CRUD + Pagination)
- ⭐ Product Reviews & Recommendation
- 🛒 Cart System (Auto merge quantity)
- 📚 Swagger API Documentation
- 🔒 Protected Routes with Middleware

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL (pg)
- JWT (jsonwebtoken)
- Redis
- Argon2 (password hashing)
- Swagger (swagger-jsdoc + swagger-ui-express)

---

## 📂 Project Structure
```
src/
├── controllers/
├── handlers/
├── middleware/
├── models/
├── lib/
├── routes/
├── docs/
└── app.js
```
---

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/hilmy07/koda-b6-backend-node.git
cd koda-b6-backend-node
```

### 2. Install Dependencies
```bash
npm install
```
### 3. Setup Environment (.env)
Buat file `.env` di folder backend:
```env
PORT=8000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_db
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_secret
REDIS_URL=redis://127.0.0.1:6379
```

## ▶️ Run Project
### Development
```bash
npm run dev
```
### Production
```bash
npm start
```

## 📚 API Documentation (Swagger)
http://localhost:8000/docs

## 🔐 Authentication
Gunakan Bearer Token:

Authorization: Bearer <token>

## 📌 API Endpoints

### 🔐 Auth

| Method | Endpoint     | Description   |
| ------ | ------------ | ------------- |
| POST   | /auth/new    | Register user |
| POST   | /auth        | Login user    |
| POST   | /auth/logout | Logout user   |

### 👤 Users
| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | /users         | Get all users  |
| GET    | /users/:id     | Get user by id |
| DELETE | /users/:id     | Delete user    |
| PATCH  | /users/profile | Update profile |


### 📦 Products
| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| GET    | /products             | Get all products     |
| GET    | /products/:id         | Product detail       |
| GET    | /products/recommended | Recommended products |
| GET    | /products/reviews     | Product reviews      |
| POST   | /products             | Create product       |
| PATCH  | /products/:id         | Update product       |
| DELETE | /products/:id         | Delete product       |

### 🛒 Cart
| Method | Endpoint   | Description      |
| ------ | ---------- | ---------------- |
| POST   | /carts     | Add to cart      |


### 🔥 Security
JWT Authentication
Password hashing (Argon2)
Redis token session
Middleware protected routes

## 🧪 Example Response
{
  "success": true,
  "message": "login success",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}

## 👨‍💻 Author

Muhammad Hilmy Haidar Aly
GitHub: https://github.com/hilmy07

## 📄 License

MIT License

---
Kalau kamu mau, aku bisa upgrade lagi jadi:
- 🔥 README versi **portfolio ATS HR (biar kelihatan senior backend)**
- 🔥 atau tambahin **architecture diagram + Redis flow + JWT flow**
- 🔥 atau bikin versi “Open Source Professional Level”

tinggal bilang 👍
