import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./components/Login";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./components/AdminDashboard";
import AdminRoutes from "./components/AdminRoutes";
import UserDashboard from "./components/UserDashboard";

function App() {

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    return (
        <BrowserRouter>
            <Routes>

                {/* LOGIN */}
                <Route path="/" element={<Login setUser={setUser} />} />

                {/* ADMIN ROUTES */}
                <Route path="/admin" element={
                    user?.role === "ADMIN"
                        ? <AdminLayout />
                        : <Navigate to="/" />
                }>
                    <Route index element={<AdminDashboard />} />
                    <Route path="routes" element={<AdminRoutes />} />
                </Route>

                {/* USER */}
                <Route path="/user" element={
                    user?.role === "USER"
                        ? <UserDashboard />
                        : <Navigate to="/" />
                } />

            </Routes>
        </BrowserRouter>
    );
}

export default App;