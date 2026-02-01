// /src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import RequireRole from "./components/Protected/RequireRole";
import RoleRedirect from "./components/Protected/RoleRedirect";

import AdminLayout from "./components/Admin/AdminLayout";
import Usermanagement from "./components/Admin/Usermanagement";
import Home from "./components/Home/Home";
import BookingList from "./components/Receptionist/BookingList";
import MaintenanceRequests from "./components/Maintenance/Requests";
import MaintenanceDashboard from "./components/Maintenance/MaintenanceDashboard";

const Forbidden = () => (
  <div style={{ padding: 40, textAlign: "center" }}>
    <h1>403 - Forbidden</h1>
    <p>You don't have permission to access this page.</p>
    <a href="/">Go Home</a>
  </div>
);

const AdminDashboard = () => (
  <div>
    <h1>Admin Dashboard</h1>
    <p>Welcome to admin panel!</p>
  </div>
);

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Load user khi app khởi động
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      setCurrentUser(userData);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
  };

  const handleRegisterSuccess = (userData) => {
    setCurrentUser(userData);
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/register" element={<Register onRegisterSuccess={handleRegisterSuccess} />} />
      <Route path="/forbidden" element={<Forbidden />} />

      {/* ===== CUSTOMER/USER ===== */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>

      {/* ===== ADMIN ===== */}
      <Route element={<RequireRole allowed={["ADMIN"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Usermanagement />} />
        </Route>
      </Route>


      {/* ===== RECEPTIONIST ===== */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RequireRole allowed={["RECEPTIONIST"]} />}>
          <Route path="/receptionist/booking-list" element={<BookingList />} />
        </Route>
      </Route>

      {/* ===== MAINTENANCE ===== */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RequireRole allowed={["MAINTENANCE"]} />}>
          <Route path="/maintenance/dashboard" element={<MaintenanceDashboard />} />
          <Route path="/maintenance/requests" element={<MaintenanceRequests />} />
        </Route>
      </Route>
    </Routes>
  );
}