// teleconsultation-app/src/App.js
import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import AdminLoginPage from "./components/AdminLoginPage";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/admin-login");
  };

  const handleLoginSuccess = (data) => {
    if (data.role === "Admin") {
      navigate("/dashboard");
    } else if (data.role === "Doctor") {
      navigate("/doctor-dashboard");
    } else if (data.role === "Patient") {
      navigate("/patient-profile");
    }
  };

  return (
    <div className="page-container">
      <ToastContainer />
      {role &&
        !["/admin-login"].includes(location.pathname) && (
          <Navbar role={role} onLogout={handleLogout} />
        )}
      <Routes>
        <Route
          path="/admin-login"
          element={
            <AdminLoginPage
              apiUrl="https://teleconsultation-backend.onrender.com"
              tokenKey="token"
              roleKey="role"
              onLoginSuccess={handleLoginSuccess}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;```javascript
// teleconsultation-app/src/App.js
import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import AdminLoginPage from "./components/AdminLoginPage";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!role && !["/admin-login"].includes(location.pathname)) {
      navigate("/admin-login");
    }
  }, [role, location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/admin-login");
  };

  const handleLoginSuccess = (data) => {
    if (data.role === "Admin") {
      navigate("/dashboard");
    } else if (data.role === "Doctor") {
      navigate("/doctor-dashboard");
    } else if (data.role === "Patient") {
      navigate("/patient-profile");
    }
  };

  return (
    <div className="page-container">
      <ToastContainer />
      {role &&
        !["/admin-login"].includes(location.pathname) && (
          <Navbar role={role} onLogout={handleLogout} />
        )}
      <Routes>
        <Route
          path="/admin-login"
          element={
            <AdminLoginPage
              apiUrl="https://teleconsultation-backend.onrender.com"
              tokenKey="token"
              roleKey="role"
              onLoginSuccess={handleLoginSuccess}
            />
          }
        />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
```