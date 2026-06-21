# DevPanel — React + Node.js Assessment

A full-stack user authentication system built with React.js and Node.js/Express.

---

## Project Structure

```
project/
├── backend/
│   ├── controllers/   authController.js
│   ├── models/        User.js
│   ├── routes/        auth.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/        index.html
    ├── src/
    │   ├── components/  Navbar.js
    │   ├── context/     AuthContext.js
    │   ├── pages/       Home.js, Register.js, Login.js, Dashboard.js
    │   ├── services/    api.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

---

## Setup Instructions

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

Server runs on: http://localhost:5000

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

App runs on: http://localhost:3000

---

## API Endpoints

| Method | Endpoint       | Description          |
|--------|---------------|----------------------|
| POST   | /api/register | Register new user    |
| POST   | /api/login    | Login user           |
| GET    | /api/users    | Get all users        |

---

## Features

- User registration with validation
- Secure login with JWT authentication
- Password hashing with bcrypt
- Password show/hide toggle
- Loading spinners during API calls
- Persistent login with localStorage
- Logout functionality
- Responsive design (mobile, tablet, desktop)
- Clean error and success messages

---

## Tech Stack

**Frontend:** React 18, React Router v6, Context API, CSS (no UI library)

**Backend:** Node.js, Express, bcryptjs, jsonwebtoken

> Note: Data is stored in-memory. Users reset when the server restarts. For a production setup, connect a database like MongoDB or PostgreSQL.
