import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminLoginPage from "./components/AdminLoginPage";
import Dashboard from "./components/Dashboard"; // افترض أن لديك هذه الصفحة
import ProtectedRoute from "./components/ProtectedRoute"; // مكون لحماية المسارات

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://teleconsultation-backend.onrender.com"
    : "http://localhost:10000";

function App() {
  const [user, setUser] = useState({ role: null, userId: null });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    if (token && role && userId) {
      setUser({ role, userId });
    }
  }, []);

  const handleLoginSuccess = ({ role, userId }) => {
    setUser({ role, userId });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setUser({ role: null, userId: null });
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/admin-login"
          element={
            user.role ? (
              <Navigate to="/admin-dashboard" />
            ) : (
              <AdminLoginPage
                apiUrl={API_URL}
                tokenKey="token"
                roleKey="role"
                onLoginSuccess={handleLoginSuccess}
              />
            )
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/admin-login" />} />
      </Routes>
    </Router>
  );
}

export default App;