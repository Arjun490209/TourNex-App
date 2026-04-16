import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // ⏳ loading state (जब getMe चल रहा हो)
  if (loading) {
    return <div>Loading...</div>;
  }

  // ❌ अगर login नहीं है
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  // ✅ access allowed
  return children;
};

export default ProtectedRoute;
