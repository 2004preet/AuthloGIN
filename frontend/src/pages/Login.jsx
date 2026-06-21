import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api.js";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!form.email.trim()) return setMessage({ type: "error", text: "Email is required" });
    if (!form.password) return setMessage({ type: "error", text: "Password is required" });

    setLoading(true);
    try {
      const res = await loginUser(form);
      // Persist the logged-in user so the Dashboard can greet them.
      localStorage.setItem("user", JSON.stringify(res.user));
      setMessage({ type: "success", text: "✓ " + res.message });
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (err) {
      setMessage({ type: "error", text: "✕ " + err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Welcome back</h2>
      <p className="subtitle">Log in to access your dashboard.</p>
      <form onSubmit={onSubmit} noValidate>
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder="john@example.com"
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          placeholder="Your password"
        />

        <button type="submit" disabled={loading}>
          {loading && <span className="spinner" />}
          {loading ? "Signing in…" : "Login"}
        </button>
      </form>

      {message && <p className={`msg ${message.type}`}>{message.text}</p>}
    </div>
  );
}
