import React, {
    useEffect,
    useState
} from "react";

import UserSidebar
    from "./UserSidebar";

function UserDashboard({
                           user,
                           setUser
                       }) {

    const [vehicles,
        setVehicles] =
        useState([]);

    const [search,
        setSearch] =
        useState("");

    const [bookingDetails,
        setBookingDetails] =
        useState({});

    // ======================
    // LOAD VEHICLES
    // ======================

    useEffect(() => {

        fetch(
            "http://localhost:8080/vehicles"
        )

            .then((res) =>
                res.json()
            )

            .then((data) => {

                const activeTrips =
                    data.filter(
                        (v) =>
                            !v.booked
                    );

                setVehicles(
                    activeTrips
                );
            })

            .catch((err) =>
                console.log(err));

    }, []);

    // ======================
    // INPUT CHANGE
    // ======================

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

    // ======================
    // BOOKING
    // ======================

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

                        `http://localhost:8080/bookings/book?vehicleId=${vehicleId}&userId=${user.id}&returnDate=${details.returnDate}&familyMembers=${details.familyMembers || 1}`,

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

    // ======================
    // SEARCH
    // ======================

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

            <UserSidebar
                user={user}
                setUser={setUser}
            />

            {/* MAIN CONTENT */}

            <div
                style={{
                    flex: 1,

                    marginLeft:
                        "300px",

                    padding:
                        "35px",

                    width:
                        "calc(100% - 300px)",

                    boxSizing:
                        "border-box"
                }}
            >

                {/* HEADER */}

                <div
                    style={{
                        marginBottom:
                            "30px"
                    }}
                >

                    <h1
                        style={{
                            color:
                                "#1b1b78",

                            fontSize:
                                "48px",

                            marginBottom:
                                "10px",

                            lineHeight:
                                "1.2"
                        }}
                    >
                        Welcome{" "}
                        {
                            user?.username
                        }
                        👋
                    </h1>

                    <p
                        style={{
                            color:
                                "#666",

                            fontSize:
                                "18px"
                        }}
                    >
                        Find your perfect travel destination
                    </p>

                </div>

                {/* SEARCH */}

                <input
                    type="text"

                    placeholder="🔍 Search Source or Destination"

                    value={
                        search
                    }

                    onChange={(e) =>
                        setSearch(
                            e.target
                                .value
                        )
                    }

                    style={{
                        width:
                            "100%",

                        padding:
                            "18px",

                        borderRadius:
                            "16px",

                        border:
                            "1px solid #ddd",

                        fontSize:
                            "17px",

                        marginBottom:
                            "35px",

                        outline:
                            "none",

                        boxSizing:
                            "border-box"
                    }}
                />

                {/* VEHICLE CARDS */}

                <div
                    style={{
                        display:
                            "grid",

                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(380px, 1fr))",

                        gap:
                            "30px"
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

                                style={{
                                    background:
                                        "white",

                                    borderRadius:
                                        "24px",

                                    padding:
                                        "28px",

                                    boxShadow:
                                        "0 6px 18px rgba(0,0,0,0.1)"
                                }}
                            >

                                <h2
                                    style={{
                                        color:
                                            "#1b1b78",

                                        marginBottom:
                                            "22px"
                                    }}
                                >
                                    {
                                        vehicle.source
                                    }

                                    {" → "}

                                    {
                                        vehicle.destination
                                    }
                                </h2>

                                <p>
                                    🚘 Vehicle:
                                    {" "}
                                    {
                                        vehicle.vehicleType
                                    }
                                </p>

                                <p>
                                    📅 Date:
                                    {" "}
                                    {
                                        vehicle.departureDate
                                    }
                                </p>

                                <p>
                                    🕒 Time:
                                    {" "}
                                    {
                                        vehicle.departureTime
                                    }
                                </p>

                                <p>
                                    💰 Price:
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

                                    style={inputStyle}
                                />

                                <input
                                    type="number"

                                    min="1"

                                    placeholder="Family Members"

                                    onChange={(e) =>
                                        handleInputChange(
                                            vehicle.id,
                                            "familyMembers",
                                            e.target.value
                                        )
                                    }

                                    style={inputStyle}
                                />

                                <button
                                    onClick={() =>
                                        handleBooking(
                                            vehicle.id
                                        )
                                    }

                                    style={{
                                        width:
                                            "100%",

                                        padding:
                                            "16px",

                                        background:
                                            "#1b1b78",

                                        border:
                                            "none",

                                        color:
                                            "white",

                                        borderRadius:
                                            "14px",

                                        fontSize:
                                            "17px",

                                        fontWeight:
                                            "600",

                                        marginTop:
                                            "18px",

                                        cursor:
                                            "pointer"
                                    }}
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

const inputStyle = {

    width:
        "100%",

    padding:
        "14px",

    marginTop:
        "15px",

    borderRadius:
        "12px",

    border:
        "1px solid #ccc",

    fontSize:
        "15px",

    boxSizing:
        "border-box"
};

export default UserDashboard;