import React, {
    useEffect,
    useState
} from "react";

import UserSidebar
    from "./UserSidebar";

function Profile({
                     user,
                     setUser
                 }) {

    const [form,
        setForm] =
        useState({

            username: "",
            email: "",
            phone: "",
            address: ""
        });

    useEffect(() => {

        if (user) {

            setForm({

                username:
                    user.username || "",

                email:
                    user.email || "",

                phone:
                    user.phone || "",

                address:
                    user.address || ""
            });
        }

    }, [user]);

    const handleChange =
        (e) => {

            setForm({

                ...form,

                [e.target.name]:
                e.target.value
            });
        };

    const updateProfile =
        async () => {

            try {

                const res =
                    await fetch(

                        `http://localhost:8080/auth/profile/${user.id}`,

                        {

                            method:
                                "PUT",

                            headers: {

                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    form
                                )
                        }
                    );

                if (
                    res.ok
                ) {

                    const updatedUser = {

                        ...user,
                        ...form
                    };

                    localStorage.setItem(

                        "user",

                        JSON.stringify(
                            updatedUser
                        )
                    );

                    setUser(
                        updatedUser
                    );

                    alert(
                        "✅ Profile Updated"
                    );

                }

            } catch {

                alert(
                    "❌ Server Error"
                );
            }
        };

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
                    👤 My Profile
                </h1>

                <div
                    style={{
                        background:
                            "white",

                        maxWidth:
                            "700px",

                        padding:
                            "40px",

                        borderRadius:
                            "24px",

                        boxShadow:
                            "0 6px 18px rgba(0,0,0,0.1)"
                    }}
                >

                    <input
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    <input
                        name="phone"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    <textarea
                        name="address"
                        placeholder="Address"
                        value={form.address}
                        onChange={handleChange}
                        style={{
                            ...inputStyle,
                            height:
                                "120px"
                        }}
                    />

                    <button
                        onClick={
                            updateProfile
                        }

                        style={
                            buttonStyle
                        }
                    >
                        Update Profile
                    </button>

                </div>

            </div>

        </div>
    );
}

const inputStyle = {

    width:
        "100%",

    padding:
        "16px",

    marginBottom:
        "20px",

    borderRadius:
        "14px",

    border:
        "1px solid #ddd",

    fontSize:
        "16px",

    boxSizing:
        "border-box"
};

const buttonStyle = {

    width:
        "100%",

    padding:
        "16px",

    border:
        "none",

    borderRadius:
        "14px",

    background:
        "#1b1b78",

    color:
        "white",

    fontSize:
        "18px",

    fontWeight:
        "600",

    cursor:
        "pointer"
};

export default Profile;