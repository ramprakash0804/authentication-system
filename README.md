# 🔐 Authentication System

A full-stack authentication system built with React, Node.js, Express.js, and MongoDB.

## 🚀 Features

- User Registration
- User Login
- Email Verification
- JWT Authentication
- Access & Refresh Tokens
- Persistent Login
- Protected Routes
- Profile Management
- Edit Profile
- Change Password
- Forgot Password
- Password Reset
- Logout
- Input Validation
- Rate Limiting
- Security Middleware
- Responsive UI

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- React Router
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Nodemailer

### Tools
- Postman
- VS Code
- Git
- GitHub

## 📁 Project Structure

```text
authentication-system/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── validations/
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── .env.example
└── README.md
````

## ⚙️ Installation

### Backend

```bash
cd server
npm install
node server.js
```

Backend runs on:

```text
http://localhost:5000
```

### Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## 🔐 Environment Variables

Create a `.env` file in the server folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Never commit the real `.env` file to GitHub.

## 🔄 Authentication Flow

```text
Register
   ↓
Email Verification
   ↓
Login
   ↓
Dashboard
   ↓
My Profile
   ├── Edit Profile
   ├── Change Password
   └── Logout
```

### Password Recovery

```text
Forgot Password
      ↓
Enter Email
      ↓
Reset Email
      ↓
Reset Password
      ↓
Login
```

## 🧪 API Testing

The backend APIs can be tested using Postman.

Base URL:

```text
http://localhost:5000/api/auth
```

Main endpoints:

```text
POST /register
POST /login
GET  /profile
PUT  /profile
PUT  /change-password
POST /forgot-password
POST /reset-password/:token
POST /refresh-token
POST /logout
GET  /verify-email/:token
```

## 🔒 Security

Never commit or share:

* MongoDB passwords
* JWT secrets
* Email passwords
* API keys
* Access tokens
* Refresh tokens
* `.env` files

## 📌 Project Status

**Authentication System — Completed Core Features ✅**

This project is built as a full-stack authentication system and can be extended for applications such as ride-hailing, e-commerce, SaaS, and community platforms.

## 📄 License

This project is for educational and development purposes.

```
```
