import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home-wrapper">
      <div className="home-content">
        <span className="home-eyebrow">Junior Developer Assessment</span>
        <h1>Full-stack auth, done right</h1>
        <p>
          A clean implementation of user registration, login, and a live dashboard — built with React and Node.js.
        </p>
        <div className="home-actions">
          {user ? (
            <Link to="/dashboard" className="btn-home-primary">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn-home-primary">
                Create an account
              </Link>
              <Link to="/login" className="btn-home-secondary">
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
