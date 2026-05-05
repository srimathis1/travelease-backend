import React, { useState } from "react";

function UserSearch() {

    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [routes, setRoutes] = useState([]);
    const [searched, setSearched] = useState(false);

    const handleSearch = () => {

        fetch("http://localhost:8080/route/all")
            .then(res => res.json())
            .then(data => {

                // ✅ FILTER ONLY MATCHING ROUTES
                const filtered = data.filter(r =>
                    r.source.toLowerCase().includes(source.toLowerCase()) &&
                    r.destination.toLowerCase().includes(destination.toLowerCase())
                );

                setRoutes(filtered);
                setSearched(true);
            });
    };

    return (
        <div>

            {/* 🔍 SEARCH INPUT */}
            <div style={{ marginBottom: "20px" }}>
                <input
                    placeholder="Source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    style={{ marginRight: "10px", padding: "8px" }}
                />

                <input
                    placeholder="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    style={{ marginRight: "10px", padding: "8px" }}
                />

                <button onClick={handleSearch}>
                    Search
                </button>
            </div>

            {/* 🚫 NO DATA MESSAGE */}
            {!searched && <p>🔎 Search routes to see results</p>}

            {/* 🚫 NO MATCH */}
            {searched && routes.length === 0 && (
                <p>No routes found ❌</p>
            )}

            {/* ✅ RESULTS TABLE */}
            {routes.length > 0 && (
                <table style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}>
                    <thead>
                    <tr style={{ background: "#667eea", color: "white" }}>
                        <th>ID</th>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Seats</th>
                    </tr>
                    </thead>

                    <tbody>
                    {routes.map(r => (
                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.source}</td>
                            <td>{r.destination}</td>
                            <td>{r.transportType}</td>
                            <td>₹{r.price}</td>
                            <td>{r.availableSeats}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

        </div>
    );
}

export default UserSearch;