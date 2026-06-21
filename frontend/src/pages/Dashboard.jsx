import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api.js";

export default function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    // Guard the route: no logged-in user => back to login.
    if (!user) {
      navigate("/login");
      return;
    }
    getUsers()
      .then((res) => setUsers(res.users))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="card">
      <div className="dash-header">
        <div className="welcome-row">
          <div className="avatar">{initials}</div>
          <div>
            <div className="hi">Welcome back 👋</div>
            <h2>{user.name}</h2>
          </div>
        </div>
        <button className="link-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <p className="section-title">Registered users · {users.length}</p>

      {error && <p className="msg error">✕ {error}</p>}
      {loading && <p className="empty">Loading users…</p>}

      <ol className="user-list">
        {users.map((u, i) => (
          <li key={u.email || i} style={{ animationDelay: `${i * 80}ms` }}>
            <span className="badge">{i + 1}</span>
            {u.name}
          </li>
        ))}
      </ol>

      {!loading && users.length === 0 && !error && (
        <p className="empty">No users registered yet.</p>
      )}
    </div>
  );
}
