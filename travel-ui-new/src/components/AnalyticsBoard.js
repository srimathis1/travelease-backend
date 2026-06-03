import React, {
    useEffect,
    useState
} from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";

function AnalyticsBoard() {

    const [
        analytics,
        setAnalytics
    ] = useState({

        totalTrips: 0,
        totalBookings: 0,
        totalFeedbacks: 0,
        mostBookedPlace: "-",
        topRatedPlace: "-",
        monthlyBookings: {}
    });

    useEffect(() => {

        fetch(
            "http://localhost:8080/analytics/dashboard"
        )
            .then(
                (res) =>
                    res.json()
            )
            .then(
                (data) =>
                    setAnalytics(
                        data
                    )
            )
            .catch(
                (err) =>
                    console.log(
                        err
                    )
            );

    }, []);

    // ===================
    // GRAPH DATA
    // ===================

    const monthlyData =
        Object.entries(
            analytics.monthlyBookings || {}
        ).map(
            ([month,
                 bookings]) => ({
                month,
                bookings
            })
        );

    const destinationData = [
        {
            place:
            analytics.mostBookedPlace,
            bookings:
            analytics.totalBookings
        }
    ];

    const ratingData = [
        {
            name:
            analytics.topRatedPlace,
            value:
            analytics.totalFeedbacks
        }
    ];

    const COLORS = [
        "#1e2088",
        "#5c6bc0",
        "#7986cb"
    ];

    return (

        <div
            style={{
                marginTop:
                    "30px"
            }}
        >

            {/* LINE GRAPH */}

            <div
                style={
                    graphCard
                }
            >

                <h2>
                    📈 Monthly Booking Trend
                </h2>

                <LineChart
                    width={850}
                    height={300}
                    data={
                        monthlyData
                    }
                >

                    <CartesianGrid
                        strokeDasharray=
                            "3 3"
                    />

                    <XAxis
                        dataKey=
                            "month"
                    />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type=
                            "monotone"

                        dataKey=
                            "bookings"

                        stroke=
                            "#1e2088"

                        strokeWidth={
                            4
                        }
                    />

                </LineChart>

            </div>

            {/* BAR GRAPH */}

            <div
                style={
                    graphCard
                }
            >

                <h2>
                    🔥 Most Booked Place
                </h2>

                <BarChart
                    width={850}
                    height={300}
                    data={
                        destinationData
                    }
                >

                    <CartesianGrid
                        strokeDasharray=
                            "3 3"
                    />

                    <XAxis
                        dataKey=
                            "place"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey=
                            "bookings"

                        fill=
                            "#1e2088"
                    />

                </BarChart>

            </div>

            {/* PIE GRAPH */}

            <div
                style={
                    graphCard
                }
            >

                <h2>
                    ⭐ Top Rated Place
                </h2>

                <PieChart
                    width={850}
                    height={320}
                >

                    <Pie
                        data={
                            ratingData
                        }

                        cx="50%"
                        cy="50%"

                        outerRadius={
                            110
                        }

                        dataKey=
                            "value"

                        label
                    >

                        {
                            ratingData
                                .map(

                                    (
                                        entry,
                                        index
                                    ) => (

                                        <Cell
                                            key={
                                                index
                                            }

                                            fill={
                                                COLORS[
                                                index %
                                                COLORS.length
                                                    ]
                                            }
                                        />
                                    )
                                )
                        }

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </div>

        </div>
    );
}

const graphCard = {

    background:
        "white",

    borderRadius:
        "25px",

    padding:
        "25px",

    marginBottom:
        "30px",

    boxShadow:
        "0 5px 18px rgba(0,0,0,0.1)"
};

export default AnalyticsBoard;