import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-memory store. Replace with a real DB for production.
const users = [];

// Helper: strip password before returning a user
const publicUser = ({ name, email }) => ({ name, email });

/**
 * 1. User Registration
 * POST /api/register
 * Body: { name, email, password }
 */
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, message: "Name is required" });
  }
  if (!email || !email.trim()) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }
  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ success: false, message: "Password must contain at least 6 characters" });
  }

  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return res.status(409).json({ success: false, message: "Email already registered" });
  }

  users.push({ name: name.trim(), email: email.trim(), password });

  return res.status(201).json({ success: true, message: "User Registered Successfully" });
});

/**
 * 2. User Login
 * POST /api/login
 * Body: { email, password }
 */
app.post("/api/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !email.trim()) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ success: false, message: "Password is required" });
  }

  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }

  return res.json({
    success: true,
    message: "Login Successful",
    user: publicUser(user),
  });
});

/**
 * 3. Users List
 * GET /api/users
 */
app.get("/api/users", (req, res) => {
  return res.json({ success: true, users: users.map(publicUser) });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
