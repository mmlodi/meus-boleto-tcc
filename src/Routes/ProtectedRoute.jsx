import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ element: Element }) => {
    const { isAuthenticated, user } = useAuth();
    console.log("ProtectedRoute isAuth..",isAuthenticated, user);
    // Handle the case where user authentication is still being checked (token validation in AuthProvider).
    if (user === undefined) {
        // You can return a loading indicator here if desired
        return <div>Loading...</div>;  // Alternatively, return null to show nothing.
    }

    // If the user is not authenticated, redirect to login page
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Render the protected element
    return <Element />;
};

export default ProtectedRoute;
