import React, { useEffect, useState } from "react";

function AdminDashboard() {

    const [data, setData] = useState({});

    useEffect(() => {
        fetch("http://localhost:8080/dashboard/admin")
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        <>
            <h2>📊 Dashboard Overview</h2>

            <div className="stats-grid">
                <div className="stat-card"><h1>{data.users}</h1><p>Users</p></div>
                <div className="stat-card"><h1>{data.routes}</h1><p>Routes</p></div>
                <div className="stat-card"><h1>{data.totalBookings}</h1><p>Bookings</p></div>
                <div className="stat-card"><h1>{data.trainRoutes}</h1><p>Train</p></div>
                <div className="stat-card"><h1>{data.flightRoutes}</h1><p>Flight</p></div>
            </div>
        </>
    );
}

export default AdminDashboard;