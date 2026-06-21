// Small wrapper around the backend API.
// Uses Vite's dev proxy so calls go to the Express server on :5000.
const BASE = "/api";

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
