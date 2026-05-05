import React, { useEffect, useState } from "react";
import "./AdminRoutes.css";

function AdminRoutes() {

    const [routes, setRoutes] = useState([]);

    const [form, setForm] = useState({
        source: "",
        destination: "",
        transportType: "",
        price: "",
        availableSeats: ""
    });

    // 🔥 LOAD ROUTES FROM BACKEND
    const fetchRoutes = () => {
        fetch("http://localhost:8080/route/all")
            .then(res => res.json())
            .then(data => {
                console.log("ROUTES:", data); // DEBUG
                setRoutes(data);
            });
    };

    useEffect(() => {
        fetchRoutes();
    }, []);

    // 🔥 HANDLE INPUT
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 🔥 ADD ROUTE
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:8080/route/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        }).then(() => {
            fetchRoutes(); // reload
            setForm({
                source: "",
                destination: "",
                transportType: "",
                price: "",
                availableSeats: ""
            });
        });
    };

    // 🔥 DELETE ROUTE
    const deleteRoute = (id) => {
        fetch(`http://localhost:8080/route/${id}`, {
            method: "DELETE"
        }).then(fetchRoutes);
    };

    return (
        <div className="routes-container">

            <h2>🚀 Manage Routes</h2>

            {/* FORM */}
            <form className="route-form" onSubmit={handleSubmit}>
                <input name="source" placeholder="Source" value={form.source} onChange={handleChange}/>
                <input name="destination" placeholder="Destination" value={form.destination} onChange={handleChange}/>
                <input name="transportType" placeholder="Train / Flight" value={form.transportType} onChange={handleChange}/>
                <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange}/>
                <input type="number" name="availableSeats" placeholder="Seats" value={form.availableSeats} onChange={handleChange}/>

                <button type="submit">Add Route</button>
            </form>

            {/* TABLE */}
            <table className="routes-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Seats</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>
                {routes.length === 0 ? (
                    <tr>
                        <td colSpan="7">No routes available</td>
                    </tr>
                ) : (
                    routes.map(r => (
                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.source}</td>
                            <td>{r.destination}</td>
                            <td>{r.transportType}</td>
                            <td>₹{r.price}</td>
                            <td>{r.availableSeats}</td>
                            <td>
                                <button onClick={() => deleteRoute(r.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>

        </div>
    );
}

export default AdminRoutes;