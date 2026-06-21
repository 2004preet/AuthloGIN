import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchUsers()
      .then((data) => setUsers(data.users))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const getInitials = (name) =>
    name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0].toUpperCase())
      .join("");

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-greeting">
        <p className="label">Signed in as</p>
        <h1>
          Welcome, <span>{user?.name}</span>
        </h1>
      </div>

      <div className="section-header">
        <p className="section-title">Registered users</p>
        {!loading && !error && (
          <span className="user-count-badge">{users.length} total</span>
        )}
      </div>

      {loading && (
        <div className="empty-state">
          <span className="spinner" style={{ borderTopColor: "var(--text-muted)", borderColor: "var(--border)" }} />
          Loading users...
        </div>
      )}

      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="empty-state">No users registered yet.</div>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="users-grid">
          {users.map((u) => (
            <div className="user-card" key={u._id}>
              <div className="user-avatar">{getInitials(u.name)}</div>
              <div className="user-info">
                <p className="user-name">{u.name}</p>
                <p className="user-email">{u.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
