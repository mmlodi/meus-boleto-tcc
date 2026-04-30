import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ element: Element }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    // If the user is not authenticated, redirect to login page
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Render the protected element
    return <Element />;
};

export default ProtectedRoute;
