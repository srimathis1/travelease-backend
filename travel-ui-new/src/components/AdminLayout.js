import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {

    return (
        <div style={{ display: "flex" }}>

            {/* SIDEBAR */}
            <AdminSidebar />

            {/* CONTENT */}
            <div style={{ flex: 1, padding: "20px" }}>
                <Outlet />   {/* 🔥 THIS IS CRITICAL */}
            </div>

        </div>
    );
}

export default AdminLayout;