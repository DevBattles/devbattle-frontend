import { Routes, Route } from "react-router-dom";

import PublicLayout from "@/components/layout/PublicLayout";
import ProtectedRoute from "./ProtectedRoute";

import Home from "@/pages/home/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";

import Dashboard from "@/pages/dashboard/Dashboard";
import Agent from "@/pages/dashboard/Agent";

import NotFound from "@/pages/NotFound";
import Profile from "@/pages/dashboard/Profile";

function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

      <Route
        path="/agent"
        element={
          <ProtectedRoute>
            <Agent />
          </ProtectedRoute>
        }
      />
      

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;