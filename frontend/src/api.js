// Small wrapper around the backend API.
// Dev: empty base -> "/api" hits Vite's proxy to the local Express server.
// Prod (Vercel): set VITE_API_BASE to the deployed backend URL, e.g.
//   VITE_API_BASE=https://authlogin-backend.onrender.com
const BASE = `${import.meta.env.VITE_API_BASE || ""}/api`;

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export const registerUser = (body) =>
  request("/register", { method: "POST", body: JSON.stringify(body) });

export const loginUser = (body) =>
  request("/login", { method: "POST", body: JSON.stringify(body) });

export const getUsers = () => request("/users");
