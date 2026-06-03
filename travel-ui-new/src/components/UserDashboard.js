import React, {
    useEffect,
    useState
} from "react";

import UserSidebar
    from "./UserSidebar";

import AnalyticsBoard
    from "./AnalyticsBoard";

function UserDashboard() {

    const storedUser =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const [
        vehicles,
        setVehicles
    ] = useState([]);

    const [
        search,
        setSearch
    ] = useState("");

    const [
        bookingDetails,
        setBookingDetails
    ] = useState({});

    useEffect(() => {

        fetch(
            "http://localhost:8080/vehicles"
        )
            .then(
                (res) =>
                    res.json()
            )
            .then(
                (data) => {

                    const activeTrips =
                        data.filter(
                            (
                                v
                            ) =>
                                !v.booked
                        );

                    setVehicles(
                        activeTrips
                    );
                }
            );

    }, []);

    // ==================
    // HANDLE INPUT
    // ==================

    const handleInputChange =
        (
            vehicleId,
            field,
            value
        ) => {

            setBookingDetails(
                (prev) => ({

                    ...prev,

                    [vehicleId]: {

                        ...prev[
                            vehicleId
                            ],

                        [field]:
                        value
                    }
                })
            );
        };

    // ==================
    // BOOKING
    // ==================

    const handleBooking =
        async (
            vehicleId
        ) => {

            const details =
                bookingDetails[
                    vehicleId
                    ];

            if (
                !details
                    ?.returnDate
            ) {

                alert(
                    "Please select return date"
                );

                return;
            }

            try {

                const response =
                    await fetch(

                        `http://localhost:8080/bookings/book?vehicleId=${vehicleId}&userId=${storedUser.id}&returnDate=${details.returnDate}&familyMembers=${details.familyMembers || 1}`,

                        {
                            method:
                                "POST"
                        }
                    );

                if (
                    response.ok
                ) {

                    alert(
                        "✅ Booking Successful"
                    );

                    window.location.reload();

                } else {

                    alert(
                        "❌ Booking Failed"
                    );
                }

            } catch {

                alert(
                    "❌ Server Error"
                );
            }
        };

    const filteredVehicles =
        vehicles.filter(

            (vehicle) =>

                vehicle.destination
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                vehicle.source
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

    return (

        <div
            style={{
                display:
                    "flex",

                background:
                    "#ececf1",

                minHeight:
                    "100vh"
            }}
        >

            <UserSidebar />

            <div
                style={{
                    marginLeft:
                        "300px",

                    padding:
                        "35px",

                    width:
                        "100%"
                }}
            >

                <h1>
                    Welcome {
                    storedUser
                        ?.username
                } 👋
                </h1>

                <p>
                    Explore best travel routes
                </p>

                <AnalyticsBoard />

                <input
                    type="text"

                    placeholder=
                        "🔍 Search destination"

                    value={
                        search
                    }

                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }

                    style={
                        searchStyle
                    }
                />

                <div
                    style={{
                        display:
                            "grid",

                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(380px,1fr))",

                        gap:
                            "25px"
                    }}
                >

                    {filteredVehicles.map(
                        (
                            vehicle
                        ) => (

                            <div
                                key={
                                    vehicle.id
                                }

                                style={
                                    cardStyle
                                }
                            >

                                <h2>
                                    {
                                        vehicle.source
                                    }
                                    →
                                    {
                                        vehicle.destination
                                    }
                                </h2>

                                <p>
                                    ₹
                                    {
                                        vehicle.price
                                    }
                                </p>

                                <input
                                    type="date"

                                    onChange={(e) =>
                                        handleInputChange(
                                            vehicle.id,
                                            "returnDate",
                                            e.target.value
                                        )
                                    }

                                    style={
                                        inputStyle
                                    }
                                />

                                <input
                                    type="number"

                                    placeholder=
                                        "Family Members"

                                    onChange={(e) =>
                                        handleInputChange(
                                            vehicle.id,
                                            "familyMembers",
                                            e.target.value
                                        )
                                    }

                                    style={
                                        inputStyle
                                    }
                                />

                                <button
                                    onClick={() =>
                                        handleBooking(
                                            vehicle.id
                                        )
                                    }

                                    style={
                                        bookBtn
                                    }
                                >
                                    Book Now
                                </button>

                            </div>
                        )
                    )}

                </div>

            </div>

        </div>
    );
}

const searchStyle = {
    width: "100%",
    padding: "15px",
    marginBottom: "30px"
};

const cardStyle = {
    background: "white",
    padding: "25px",
    borderRadius: "25px"
};

const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "10px"
};

const bookBtn = {
    width: "100%",
    padding: "15px",
    background: "#1e2088",
    color: "white",
    border: "none",
    borderRadius: "15px",
    marginTop: "15px",
    cursor: "pointer"
};

export default UserDashboard;