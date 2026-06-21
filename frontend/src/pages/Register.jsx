import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api.js";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState(null); // { type, text }
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Client-side validation matching the API rules.
  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";
    if (form.password.length < 6) return "Password must contain at least 6 characters";
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const error = validate();
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser(form);
      setMessage({ type: "success", text: "✓ " + res.message });
      setForm({ name: "", email: "", password: "" });
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      setMessage({ type: "error", text: "✕ " + err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Create account</h2>
      <p className="subtitle">Join us — it only takes a few seconds.</p>
      <form onSubmit={onSubmit} noValidate>
        <label>Name</label>
        <input name="name" value={form.name} onChange={onChange} placeholder="John" />

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
          placeholder="At least 6 characters"
        />

        <button type="submit" disabled={loading}>
          {loading && <span className="spinner" />}
          {loading ? "Creating…" : "Register"}
        </button>
      </form>

      {message && <p className={`msg ${message.type}`}>{message.text}</p>}
    </div>
  );
}
