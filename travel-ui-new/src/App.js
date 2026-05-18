import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import { useState } from "react";

import "./App.css";

/* LOGIN */
import Login from "./components/Login";

/* ADMIN */
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./components/AdminDashboard";
import AdminRoutes from "./components/AdminRoutes";
import AdminBookings from "./components/AdminBookings";
import Analytics from "./components/Analytics";

/* USER */
import UserDashboard from "./components/UserDashboard";
import UserBookings from "./components/UserBookings";
import Profile from "./components/Profile";

function App() {

    const [user, setUser] = useState(
        JSON.parse(
            localStorage.getItem("user")
        )
    );

    return (

        <BrowserRouter>

            <Routes>

                {/* ================= LOGIN ================= */}

                <Route
                    path="/"
                    element={
                        <Login
                            setUser={setUser}
                        />
                    }
                />

                {/* ================= ADMIN ================= */}

                <Route
                    path="/admin"
                    element={
                        user?.role === "ADMIN"

                            ? (

                                <AdminLayout
                                    user={user}
                                    setUser={setUser}
                                />

                            )

                            : (
                                <Navigate to="/" />
                            )
                    }
                >

                    {/* DASHBOARD */}

                    <Route
                        index
                        element={
                            <AdminDashboard />
                        }
                    />

                    {/* TRIPS */}

                    <Route
                        path="routes"
                        element={
                            <AdminRoutes />
                        }
                    />

                    {/* BOOKINGS */}

                    <Route
                        path="bookings"
                        element={
                            <AdminBookings />
                        }
                    />

                    {/* ANALYTICS */}

                    <Route
                        path="analytics"
                        element={
                            <Analytics />
                        }
                    />

                </Route>

                {/* ================= USER ================= */}

                {/* USER DASHBOARD */}

                <Route
                    path="/user"
                    element={
                        user?.role === "USER"

                            ? (

                                <UserDashboard
                                    user={user}
                                    setUser={setUser}
                                />

                            )

                            : (
                                <Navigate to="/" />
                            )
                    }
                />

                {/* USER BOOKINGS */}

                <Route
                    path="/user/bookings"
                    element={
                        user?.role === "USER"

                            ? (

                                <UserBookings
                                    user={user}
                                    setUser={setUser}
                                />

                            )

                            : (
                                <Navigate to="/" />
                            )
                    }
                />

                {/* USER PROFILE */}

                <Route
                    path="/user/profile"
                    element={
                        user?.role === "USER"

                            ? (

                                <Profile
                                    user={user}
                                    setUser={setUser}
                                />

                            )

                            : (
                                <Navigate to="/" />
                            )
                    }
                />

                {/* ================= FALLBACK ================= */}

                <Route
                    path="*"
                    element={
                        <Navigate to="/" />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;