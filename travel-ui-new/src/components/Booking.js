import React, { useState } from "react";

function Booking() {
    const [routeId, setRouteId] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleBooking = async () => {
        setMessage("");
        setError("");

        try {
            const res = await fetch("http://localhost:8080/booking/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    routeId: Number(routeId),
                    travelerName: name
                })
            });

            if (!res.ok) {
                const errText = await res.text();
                throw new Error(errText || "Booking failed");
            }

            const data = await res.json();

            // ✅ SUCCESS MESSAGE
            setMessage("✅ Booking Confirmed!");
            setRouteId("");
            setName("");

        } catch (err) {
            // ❌ ERROR MESSAGE
            setError("❌ " + err.message);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Booking</h2>

            <input
                placeholder="Route ID"
                value={routeId}
                onChange={(e) => setRouteId(e.target.value)}
            /><br /><br />

            <input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            /><br /><br />

            <button onClick={handleBooking}>Book Now</button>

            {/* ✅ SUCCESS */}
            {message && <p style={{ color: "green" }}>{message}</p>}

            {/* ❌ ERROR */}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default Booking;