import React, { useState } from "react";

function AddRoute() {
    const [route, setRoute] = useState({
        source: "",
        destination: "",
        transportType: "",
        availableSeats: "",
        price: "",
        distance: ""
    });

    const handleChange = (e) => {
        setRoute({ ...route, [e.target.name]: e.target.value });
    };

    const addRoute = () => {
        fetch("http://localhost:8080/route/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(route)
        })
            .then((res) => res.json())
            .then(() => {
                alert("✅ Route Added Successfully");
            })
            .catch(() => alert("❌ Error adding route"));
    };

    return (
        <div>
            <h2>➕ Add New Route</h2>

            <input name="source" placeholder="Source" onChange={handleChange} />
            <input name="destination" placeholder="Destination" onChange={handleChange} />
            <input name="transportType" placeholder="Transport Type" onChange={handleChange} />
            <input name="availableSeats" type="number" placeholder="Seats" onChange={handleChange} />
            <input name="price" type="number" placeholder="Price" onChange={handleChange} />
            <input name="distance" type="number" placeholder="Distance" onChange={handleChange} />

            <br /><br />

            <button onClick={addRoute}>Add Route</button>
        </div>
    );
}

export default AddRoute;