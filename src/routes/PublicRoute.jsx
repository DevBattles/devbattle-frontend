import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function PublicRoute({ children }) {
  const { loading, isAuthenticated, getDashboardPath } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={getDashboardPath()} replace />;
  }

  return children;
}

export default PublicRoute;