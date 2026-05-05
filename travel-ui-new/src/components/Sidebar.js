function Sidebar({ setPage, logout, role }) {

    return (
        <div style={{
            width: "220px",
            background: "#1e1e2f",
            color: "white",
            height: "100vh",
            padding: "20px"
        }}>

            <h2>🌍 Travel</h2>

            <button onClick={() => setPage("dashboard")}>Dashboard</button><br/>
            <button onClick={() => setPage("search")}>Search</button><br/>
            <button onClick={() => setPage("booking")}>Booking</button><br/>

            {role === "ADMIN" && (
                <>
                    <button onClick={() => setPage("admin")}>Admin</button><br/>
                </>
            )}

            <br/>
            <button onClick={logout}>Logout</button>

        </div>
    );
}

export default Sidebar;