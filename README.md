# Luxe E-Commerce Platform 🛍️

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)

A high-performance, full-stack E-Commerce web application built with modern web technologies. This project demonstrates scalable architecture patterns, secure payment integrations, and robust performance optimizations.

<img width="1366" height="592" alt="Homepage Screenshot" src="https://github.com/user-attachments/assets/55858be5-66d5-491f-a9e4-a06fad0dc8b1" />

## ✨ Key Features

- **Full-Stack Architecture:** Feature-sliced React frontend coupled with a layered Node.js/Express backend.
- **Secure Authentication:** JWT-based authentication using industry-standard `HttpOnly` cookies.
- **Payment Processing:** Integrated with Stripe for secure, backend-validated checkout sessions.
- **Admin Dashboard:** Complete CRUD (Create, Read, Update, Delete) interface for product management.
- **Performance Optimized:** 
  - Database-level pagination and filtering using PostgreSQL.
  - Image lazy-loading and optimized resource fetching (`fetchPriority`).
  - React Loading Skeletons to prevent layout shifts.
- **Enterprise Security:** Backend Rate Limiting to prevent DDoS and Brute Force attacks.
- **Resilient UI:** Implemented React Error Boundaries for graceful degradation.

---

## 🏗️ Architecture

This project follows professional, enterprise-grade architectural patterns to ensure maintainability and scalability.

### Backend (Layered Architecture)
- **Routes:** Route definitions mapping to controllers.
- **Controllers:** Request validation and HTTP response handling.
- **Services:** Core business logic (price validation, Stripe session creation).
- **Repositories (Repository Pattern):** Database abstraction layer. SQL queries are isolated here, allowing for seamless database migrations in the future.

### Frontend (Feature-Based Structure)
Code is organized by business feature (e.g., `src/features/cart`, `src/features/catalog`) rather than file type, encapsulating logic, styles, and components for easier scaling.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL (running locally or remotely)
- A Stripe Developer Account

### 1. Clone the repository
```bash
git clone https://github.com/JeremieMadera/Tienda-Online.git
cd Tienda-Online
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/ecommerce_db
JWT_SECRET=your_super_secret_key
STRIPE_SECRET_KEY=sk_test_...
FRONTEND_URL=http://localhost:5173
```
Run the development server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd .. # Go back to project root
npm install
```
Create a `.env` file in the root directory:
```env
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```
Run the Vite development server:
```bash
npm run dev
```

---

## 📸 Screenshots

| Catalog & Real-time Search | Cart Drawer |
|:---:|:---:|
| <img width="1366" height="591" alt="Catalog Image" src="https://github.com/user-attachments/assets/2d355b71-c62e-4746-8974-9bfc5adf4f38" /> | <img width="1366" height="585" alt="Cart Drawer Image" src="https://github.com/user-attachments/assets/2b4fe04c-2877-438d-88fd-cb008351be2f" /> |

| Admin Dashboard | Stripe Checkout |
|:---:|:---:|
| <img width="1366" height="596" alt="Admin Dashboard Image" src="https://github.com/user-attachments/assets/5dc4392c-58c5-44e1-b50c-884673e2853a" /> | <img width="1366" height="596" alt="Checkout Image" src="https://github.com/user-attachments/assets/79d58a0e-98df-42bd-9840-b3f15ef25294" /> |

---

## 👨‍💻 Author
**Jeremie Madera**
- [LinkedIn](https://www.linkedin.com/in/jeremie-madera-aa14b8277/)
- [GitHub](https://github.com/JeremieMadera)
