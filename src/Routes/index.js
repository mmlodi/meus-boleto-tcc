import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import CategoryPage from "../pages/CategoryPage";
import DashboardPage from "../pages/DashboardPage";
import InvestmentPage from "../pages/InvestmentPage";
import TransactionsPage from "../pages/TransactionsPage";
import SignInSide from "../pages/SignInPage";
import ProtectedRoute from "./ProtectedRoute";
import SignUpSide from "../pages/SignUpPage";
import { UserPage } from "../pages/UserPage";

export default function AppRouter() {
    console.log("AppRouter");
    return (
        <Routes>
            {/* Public Route */}
            <Route path="/login" element={<SignInSide />} />
            <Route path="/signup" element={<SignUpSide />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute element={HomePage} />} />
            <Route path="/category" element={<ProtectedRoute element={CategoryPage} />} />
            <Route path="/transactions" element={<ProtectedRoute element={TransactionsPage} />} />
            <Route path="/dashboard" element={<ProtectedRoute element={DashboardPage} />} />
            <Route path="/investments" element={<ProtectedRoute element={InvestmentPage} />} />
            <Route path="/user" element={<ProtectedRoute element={UserPage} />} />
            
            {/* Not Found Route */}
            <Route path="/NotFound" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/NotFound" />} /> {/* Fallback route */}
        </Routes>
    );
}
