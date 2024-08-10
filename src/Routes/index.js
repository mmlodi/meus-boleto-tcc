import React from "react";
import {Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import CategoryPage from "../pages/CategoryPage";
import DashboardPage from "../pages/DashboardPage";

export default function AppRouter(){

    return(
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/category" element={<CategoryPage/>}/>
            <Route path="/dashboard" element={<DashboardPage/>}/>
            <Route path="/NotFound" element={<NotFound/>}/>
        </Routes>
    );
}