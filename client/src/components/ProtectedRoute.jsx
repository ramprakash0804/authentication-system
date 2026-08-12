import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    // Wait while we check the existing session
    if (loading) {
        return <h2>Loading...</h2>;
    }

    // User is not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // User is logged in
    return children;
}

export default ProtectedRoute;