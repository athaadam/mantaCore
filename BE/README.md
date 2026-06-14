# MantaCore Backend - Express.js + MySQL

Node.js Express backend for MantaCore ERP system.

## Setup

### 1. Prerequisites
- Node.js v16+
- MySQL Server running

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Database
Edit `.env` file:
```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=manta_core
DB_USER=root
DB_PASSWORD=
```

Make sure MySQL database `manta_core` exists and is accessible.

### 4. Start Server
Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

Server runs on `http://localhost:3000`

## Project Structure

```
BE/
├── config/           # Configuration files (database.js)
├── controllers/      # Route handlers
├── middleware/       # Express middleware (auth, roles, etc)
├── routes/          # API routes
├── utils/           # Utility functions
├── server.js        # Main server file
└── package.json     # Dependencies
```

## API Endpoints

Base URL: `http://localhost:3000/api`

### Public Routes
- `POST /register` - Register new user
- `POST /login` - User login

### Protected Routes (require authentication token)
- `POST /logout` - User logout
- `GET /user` - Get current user info

### Available Endpoints
All endpoints in `routes/api.js` are documented with proper middleware guards for:
- Subscription verification
- Role-based access (cashier, management, admin)

## API Documentation

See `routes/api.js` for complete endpoint list and middleware requirements.

## Authentication

JWT token authentication. Pass token in Authorization header:
```
Authorization: Bearer <token>
```

## Database Schema

Automatically synced with Sequelize. Tables:
- companies
- users
- items
- costumers
- invoices
- invoice_items
- purchases
- purchase_items

## Notes
- Password hashing with bcryptjs
- JWT authentication
- Role-based access control (admin, management, cashier)
- Transaction-based invoice/purchase operations
