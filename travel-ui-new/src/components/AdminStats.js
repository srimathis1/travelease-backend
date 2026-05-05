import React from "react";

function AdminStats({ stats }) {
    return (
        <div>
            <h2>Admin Dashboard</h2>

            <div style={{ display: "flex", gap: "20px" }}>
                <div style={card}>Routes: {stats.routes || 0}</div>
                <div style={card}>Bookings: {stats.totalBookings || 0}</div>
                <div style={card}>Top: {stats.topRoute || "-"}</div>
            </div>
        </div>
    );
}

const card = {
    padding: "20px",
    background: "#f5f5f5",
    borderRadius: "10px"
};

export default AdminStats;