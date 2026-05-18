import {
    useNavigate,
    useLocation
} from "react-router-dom";

function UserSidebar({

                         user,

                         setUser

                     }) {

    const navigate =
        useNavigate();

    const location =
        useLocation();

    const logout = () => {

        localStorage.clear();

        setUser(null);

        navigate("/");
    };

    const menuButton =
        (path) => ({

            width: "100%",

            padding: "16px",

            border: "none",

            borderRadius:
                "14px",

            marginBottom:
                "18px",

            cursor:
                "pointer",

            fontSize:
                "18px",

            fontWeight:
                "600",

            transition:
                "0.3s",

            background:
                location.pathname ===
                path
                    ? "#4d4de3"
                    : "#2d2d74",

            color:
                "white",

            boxShadow:
                "0 4px 10px rgba(0,0,0,0.2)"
        });

    return (

        <div
            style={{
                width: "240px",

                background:
                    "#15154d",

                color:
                    "white",

                minHeight:
                    "100vh",

                padding:
                    "28px",

                position:
                    "fixed",

                left: 0,

                top: 0
            }}
        >

            {/* HEADER */}

            <h1
                style={{
                    marginBottom:
                        "8px"
                }}
            >
                User Panel
            </h1>

            <p
                style={{
                    color:
                        "#ccc",

                    marginBottom:
                        "25px"
                }}
            >
                Welcome,
                {" "}
                {
                    user?.username
                }
            </p>

            <hr />

            {/* DASHBOARD */}

            <button
                style={menuButton(
                    "/user"
                )}

                onClick={() =>
                    navigate(
                        "/user"
                    )
                }
            >
                🏠 Dashboard
            </button>

            {/* PROFILE */}

            <button
                style={menuButton(
                    "/user/profile"
                )}

                onClick={() =>
                    navigate(
                        "/user/profile"
                    )
                }
            >
                👤 Profile
            </button>

            {/* BOOKINGS */}

            <button
                style={menuButton(
                    "/user/bookings"
                )}

                onClick={() =>
                    navigate(
                        "/user/bookings"
                    )
                }
            >
                📖 My Bookings
            </button>

            {/* LOGOUT */}

            <button
                style={{
                    ...menuButton(""),

                    background:
                        "#ff1a1a",

                    marginTop:
                        "30px"
                }}

                onClick={logout}
            >
                🚪 Logout
            </button>

        </div>
    );
}

export default UserSidebar;