import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserSearch from "./UserSearch";

function UserDashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user || user.role !== "USER") {
            navigate("/");
        }
    }, [user, navigate]);

    const logout = () => {
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <div style={{ display: "flex" }}>

            {/* SIDEBAR */}
            <div style={{
                width: "220px",
                background: "#1e1e2f",
                color: "white",
                height: "100vh",
                padding: "20px"
            }}>
                <h2>👤 User</h2>

                <p style={{ marginTop: "20px" }}>
                    Welcome, {user?.username}
                </p>

                <button
                    onClick={logout}
                    style={{
                        marginTop: "30px",
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        width: "100%",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Logout
                </button>
            </div>

            {/* MAIN CONTENT */}
            <div style={{ flex: 1, padding: "30px" }}>
                <h2>🔍 Search Routes</h2>

                <UserSearch />
            </div>

        </div>
    );
}

export default UserDashboard;