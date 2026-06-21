# User Auth App

Full-stack demo: Node/Express API + React (Vite) frontend with Register, Login, and Dashboard pages.

## Project structure

```
user-auth-app/
├── backend/        Express API (in-memory user store)
│   └── server.js
└── frontend/       React + Vite app
    └── src/pages/  Register, Login, Dashboard
```

## API

| Method | Endpoint        | Body                      | Success response |
|--------|-----------------|---------------------------|------------------|
| POST   | `/api/register` | `{ name, email, password }` | `{ success: true, message: "User Registered Successfully" }` |
| POST   | `/api/login`    | `{ email, password }`     | `{ success: true, message: "Login Successful" }` |
| GET    | `/api/users`    | —                         | `{ success: true, users: [...] }` |

**Validation**
- Register: name required, email required, password ≥ 6 characters.
- Login: email required, password required.

## Run it

**1. Backend** (port 5000)
```bash
cd backend
npm install
npm start
```

**2. Frontend** (port 3000, proxies `/api` to the backend)
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 — register a user, log in, and the Dashboard shows
`Welcome <name>` plus the list of registered users.

> Note: users are stored in memory and reset when the backend restarts.
> Swap the `users` array in `backend/server.js` for a real database for persistence.
