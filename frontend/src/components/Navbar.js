import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <span className="navbar-brand">
        dev<span>panel</span>
      </span>

      <button className="hamburger" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
        <span />
        <span />
        <span />
      </button>

      <ul className={`navbar-links ${open ? "open" : ""}`}>
        <li>
          <NavLink to="/" end onClick={() => setOpen(false)}>
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink to="/register" onClick={() => setOpen(false)}>
                Register
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" onClick={() => setOpen(false)}>
                Login
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink to="/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
