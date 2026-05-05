import React from "react";
import { useNavigate } from "react-router-dom";

function AdminSidebar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user");
        window.location.href = "/";   // ✅ safe logout
    };

    return (
        <div style={{
            width: "220px",
            background: "#1e1e2f",
            color: "white",
            height: "100vh",
            padding: "20px"
        }}>
            <h2>🚀 Admin</h2>

            <button
                onClick={() => navigate("/admin")}
                style={btnStyle}
            >
                Dashboard
            </button>

            <button
                onClick={() => navigate("/admin/routes")}
                style={btnStyle}
            >
                Routes
            </button>

            <button
                onClick={logout}
                style={{
                    ...btnStyle,
                    background: "red"
                }}
            >
                Logout
            </button>
        </div>
    );
}

const btnStyle = {
    display: "block",
    width: "100%",
    marginTop: "15px",
    padding: "10px",
    background: "#2c2c3e",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
};

export default AdminSidebar;