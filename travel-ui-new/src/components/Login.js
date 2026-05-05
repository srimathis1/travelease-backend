import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {

    const navigate = useNavigate();

    const [role, setRole] = useState("");
    const [isRegister, setIsRegister] = useState(false);

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 🔐 ADMIN LOGIN (unchanged)
    const adminLogin = () => {
        if (form.password === "admin123") {
            const adminUser = { username: "admin", role: "ADMIN" };
            localStorage.setItem("user", JSON.stringify(adminUser));
            setUser(adminUser);
            navigate("/admin");
        } else {
            alert("Wrong password ❌");
        }
    };

    // 👤 USER LOGIN (FIXED)
    const userLogin = async () => {
        try {
            const res = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: form.username,
                    password: form.password
                })
            });

            if (!res.ok) throw new Error();

            const data = await res.json();

            const userData = { ...data, role: "USER" };

            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);

            navigate("/user");

        } catch {
            alert("Login failed ❌");
        }
    };

    // 🆕 REGISTER
    const registerUser = async () => {
        try {
            const res = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            if (!res.ok) throw new Error();

            alert("Registered successfully ✅");
            setIsRegister(false);

        } catch {
            alert("Registration failed ❌");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">

                {/* ROLE SELECT */}
                {!role && (
                    <>
                        <h2>Select Role</h2>
                        <button onClick={() => setRole("USER")}>User</button>
                        <button onClick={() => setRole("ADMIN")}>Admin</button>
                    </>
                )}

                {/* ADMIN */}
                {role === "ADMIN" && (
                    <>
                        <h2>Admin Login</h2>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                        <button onClick={adminLogin}>Login</button>
                        <p onClick={() => setRole("")}>← Back</p>
                    </>
                )}

                {/* USER */}
                {role === "USER" && (
                    <>
                        <h2>{isRegister ? "Register" : "User Login"}</h2>

                        <input
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                        />

                        {isRegister && (
                            <input
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                            />
                        )}

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />

                        <button onClick={isRegister ? registerUser : userLogin}>
                            {isRegister ? "Register" : "Login"}
                        </button>

                        <p onClick={() => setIsRegister(!isRegister)}>
                            {isRegister
                                ? "Already have account? Login"
                                : "New user? Register"}
                        </p>

                        <p onClick={() => setRole("")}>← Back</p>
                    </>
                )}

            </div>
        </div>
    );
}

export default Login;