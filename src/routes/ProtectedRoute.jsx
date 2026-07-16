import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { loading, isAuthenticated, user, getDashboardPath } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to={getDashboardPath()} replace />;
  }

  return children;
}

export default ProtectedRoute;