import React from "react";
import {Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";

export default function AppRouter(){

    return(
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/NotFound" element={<NotFound/>}/>
        </Routes>
    );
}