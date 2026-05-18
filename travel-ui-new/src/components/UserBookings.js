import React, {
    useEffect,
    useState
} from "react";

import UserSidebar
    from "./UserSidebar";

function UserBookings({
                          user,
                          setUser
                      }) {

    const [bookings,
        setBookings] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);

    useEffect(() => {

        fetch(
            `http://localhost:8080/bookings/user/${user.id}`
        )

            .then((res) =>
                res.json()
            )

            .then((data) => {

                if (
                    Array.isArray(
                        data
                    )
                ) {

                    setBookings(
                        data
                    );

                } else {

                    setBookings(
                        []
                    );
                }

                setLoading(
                    false
                );
            })

            .catch(() => {

                setBookings(
                    []
                );

                setLoading(
                    false
                );
            });

    }, [user.id]);

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

            <div
                style={{
                    flex: 1,

                    marginLeft:
                        "300px",

                    padding:
                        "35px",

                    width:
                        "calc(100% - 300px)"
                }}
            >

                <h1
                    style={{
                        color:
                            "#1b1b78",

                        fontSize:
                            "45px",

                        marginBottom:
                            "35px"
                    }}
                >
                    📖 My Bookings
                </h1>

                {loading ? (

                    <h2>
                        Loading...
                    </h2>

                ) : bookings.length === 0 ? (

                    <div
                        style={emptyBox}
                    >
                        <h2>
                            No Bookings Found
                        </h2>

                        <p>
                            Book trips from dashboard
                        </p>
                    </div>

                ) : (

                    <div
                        style={{
                            display:
                                "grid",

                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(380px,1fr))",

                            gap:
                                "30px"
                        }}
                    >

                        {bookings.map(
                            (
                                booking
                            ) => (

                                <div
                                    key={
                                        booking.id
                                    }

                                    style={
                                        cardStyle
                                    }
                                >

                                    <h2
                                        style={{
                                            color:
                                                "#1b1b78",

                                            marginBottom:
                                                "20px"
                                        }}
                                    >
                                        {
                                            booking
                                                .vehicle
                                                ?.source || "Trip"
                                        }

                                        {" → "}

                                        {
                                            booking
                                                .vehicle
                                                ?.destination || ""
                                        }
                                    </h2>

                                    <p>
                                        🚘 Vehicle:
                                        {" "}
                                        {
                                            booking
                                                .vehicle
                                                ?.vehicleType || "-"
                                        }
                                    </p>

                                    <p>
                                        📅 Departure:
                                        {" "}
                                        {
                                            booking
                                                .vehicle
                                                ?.departureDate || "-"
                                        }
                                    </p>

                                    <p>
                                        🔄 Return:
                                        {" "}
                                        {
                                            booking.returnDate || "-"
                                        }
                                    </p>

                                    <p>
                                        👨‍👩‍👧 Family:
                                        {" "}
                                        {
                                            booking.familyMembers || 1
                                        }
                                    </p>

                                    <p>
                                        💰 ₹
                                        {
                                            booking
                                                .vehicle
                                                ?.price || 0
                                        }
                                    </p>

                                    <div
                                        style={{
                                            marginTop:
                                                "20px"
                                        }}
                                    >

                                        <span
                                            style={{
                                                background:
                                                    "#1b1b78",

                                                color:
                                                    "white",

                                                padding:
                                                    "10px 18px",

                                                borderRadius:
                                                    "12px",

                                                fontWeight:
                                                    "bold"
                                            }}
                                        >
                                            {
                                                booking.status ||
                                                "CONFIRMED"
                                            }
                                        </span>

                                    </div>

                                </div>
                            )
                        )}

                    </div>
                )}

            </div>

        </div>
    );
}

const cardStyle = {

    background:
        "white",

    padding:
        "28px",

    borderRadius:
        "24px",

    boxShadow:
        "0 6px 18px rgba(0,0,0,0.1)"
};

const emptyBox = {

    background:
        "white",

    padding:
        "50px",

    borderRadius:
        "24px",

    textAlign:
        "center"
};

export default UserBookings;