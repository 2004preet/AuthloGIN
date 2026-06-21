#!/bin/bash

# ─────────────────────────────────────────────
#  Local Dev Startup Script
#  Starts backend (port 3000) + frontend (port 3001)
# ─────────────────────────────────────────────

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Check MongoDB
if ! command -v mongod &>/dev/null; then
  echo ""
  echo "⚠️  MongoDB not found."
  echo "   Install it: brew tap mongodb/brew && brew install mongodb-community"
  echo "   Then start: brew services start mongodb-community"
  echo ""
  echo "   Or use MongoDB Atlas (free): https://www.mongodb.com/atlas"
  echo "   Update MONGO_URI in backend/.env with your Atlas connection string."
  echo ""
  read -p "Press Enter to continue anyway (if using Atlas URI)..."
fi

# ── Backend ──────────────────────────────────
echo "▶ Starting backend..."
cd "$PROJECT_DIR/backend"
npm install --silent
npx nodemon server.js &
BACKEND_PID=$!
echo "  Backend PID: $BACKEND_PID (port 3000)"

sleep 2

# ── Frontend ─────────────────────────────────
echo "▶ Starting frontend..."
cd "$PROJECT_DIR/frontend"
npm install --silent
PORT=3001 npm start &
FRONTEND_PID=$!
echo "  Frontend PID: $FRONTEND_PID (port 3001)"

echo ""
echo "✅ App running:"
echo "   Frontend → http://localhost:3001"
echo "   Backend  → http://localhost:3000"
echo "   Health   → http://localhost:3000/api/health"
echo ""
echo "Press Ctrl+C to stop both servers."

# Wait and clean up on exit
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'Servers stopped.'" EXIT
wait
