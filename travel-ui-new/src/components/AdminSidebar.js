import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AdminSidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {

        localStorage.removeItem("user");

        window.location.href = "/";
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (

        <div
            style={{
                width: "260px",
                background: "#171752",
                color: "white",
                minHeight: "100vh",
                padding: "25px",
                boxSizing: "border-box",
                boxShadow:
                    "4px 0 10px rgba(0,0,0,0.1)"
            }}
        >

            {/* LOGO / TITLE */}

            <div
                style={{
                    marginBottom: "35px"
                }}
            >
                <h1
                    style={{
                        margin: 0,
                        fontSize: "30px"
                    }}
                >
                    🚀 Admin
                </h1>

                <p
                    style={{
                        color: "#c7c7ff",
                        marginTop: "8px"
                    }}
                >
                    Travel Management
                </p>
            </div>

            {/* DASHBOARD */}

            <button
                onClick={() =>
                    navigate("/admin")
                }
                style={{
                    ...btnStyle,
                    background:
                        isActive("/admin")
                            ? "#5b5be0"
                            : "#2c2c3e"
                }}
            >
                📊 Dashboard
            </button>

            {/* TRIPS / VEHICLES */}

            <button
                onClick={() =>
                    navigate("/admin/routes")
                }
                style={{
                    ...btnStyle,
                    background:
                        isActive("/admin/routes")
                            ? "#5b5be0"
                            : "#2c2c3e"
                }}
            >
                🚗 Trips
            </button>

            {/* BOOKINGS */}

            <button
                onClick={() =>
                    navigate("/admin/bookings")
                }
                style={{
                    ...btnStyle,
                    background:
                        isActive("/admin/bookings")
                            ? "#5b5be0"
                            : "#2c2c3e"
                }}
            >
                📖 Bookings
            </button>

            {/* ANALYTICS */}

            <button
                onClick={() =>
                    navigate("/admin/analytics")
                }
                style={{
                    ...btnStyle,
                    background:
                        isActive("/admin/analytics")
                            ? "#5b5be0"
                            : "#2c2c3e"
                }}
            >
                📈 Analytics
            </button>

            {/* LOGOUT */}

            <button
                onClick={logout}
                style={{
                    ...btnStyle,
                    background: "red",
                    marginTop: "50px"
                }}
            >
                🚪 Logout
            </button>

        </div>
    );
}

const btnStyle = {

    display: "block",

    width: "100%",

    marginTop: "15px",

    padding: "15px",

    background: "#2c2c3e",

    color: "white",

    border: "none",

    borderRadius: "12px",

    cursor: "pointer",

    fontSize: "16px",

    textAlign: "left",

    transition: "0.3s"
};

export default AdminSidebar;