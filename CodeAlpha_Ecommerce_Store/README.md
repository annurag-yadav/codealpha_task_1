# CodeAlpha Ecommerce Store

A full-stack MERN e-commerce application built for the CodeAlpha Full Stack Development internship. This project contains a separate frontend and backend folder for a clean, industry-standard structure.

## Tech Stack

- Frontend: React + Vite, React Router, Axios, Tailwind CSS
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Auth: JWT + bcrypt password hashing
- State: Redux Toolkit for cart management

## Project Structure

```bash
CodeAlpha_Ecommerce_Store/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── seeder.js
│   └── server.js
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── ...
├── README.md
└── .gitignore
```

## Features

- User registration and login with JWT authentication
- Protected checkout flow
- Product grid with product details view
- Shopping cart with add/remove and quantity updates
- Order creation and order history page
- MongoDB models for users, products, and orders
- Seed script to populate sample product data

## Setup Instructions

### 1. Clone and navigate

```bash
cd CodeAlpha_Ecommerce_Store
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Update the MongoDB URI and JWT secret in `.env` if needed.

Then run:

```bash
npm run dev
```

### 3. Frontend setup

Open a new terminal:

```bash
cd CodeAlpha_Ecommerce_Store/frontend
npm install
npm run dev
```

The frontend will run on: http://localhost:5173
The backend will run on: http://localhost:5000

### 4. Seed sample products

In the backend terminal:

```bash
npm run seed
```

## Environment Variables

Create a `.env` file in the backend directory with:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/codealpha_ecommerce
JWT_SECRET=your_secret_key
NODE_ENV=development
```

## Demo Screenshots

Add screenshots here after running the app:

- Home page
- Product details
- Cart page
- Login/Register
- Order history

## Notes

This project is intended as a professional internship submission and follows a modular MERN architecture with clear separation of concerns for maintainability and scalability.
