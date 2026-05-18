import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {

    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                background: "#f4f5fa"
            }}
        >
            {/* LEFT SIDEBAR */}
            <AdminSidebar />

            {/* RIGHT CONTENT */}
            <div
                style={{
                    flex: 1,
                    padding: "30px",
                    overflowY: "auto"
                }}
            >
                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;