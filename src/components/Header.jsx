import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logoImg from "../assets/easyDrive-logo.png";

export default function Header() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location = "/";
  };

  return (
    <header style={header}>
      {/* LOGO */}
      <div style={logo} onClick={() => navigate("/")}>
        <img
          src={logoImg}
          alt="EasyDrive"
          style={{
            height: "65px",
            width: "auto",
            cursor: "pointer",
          }}
        />
      </div>

      {/* NAVIGATION */}
      <div style={navLinks}>
        <Link to="/" style={navLink}>
          Home
        </Link>

        <Link to="/cars" style={navLink}>
          Cars
        </Link>

        <a href="#offers" style={navLink}>
          Offers
        </a>

        {user && (
          <Link to="/my-bookings" style={navLink}>
            My Bookings
          </Link>
        )}

        <a href="#contact" style={navLink}>
          Contact
        </a>
      </div>

      {/* RIGHT SIDE */}
      <div style={right}>
        {!user ? (
          <>
            <Link to="/login">
              <button style={loginBtn}>Login</button>
            </Link>

            <Link to="/register">
              <button style={registerBtn}>Register</button>
            </Link>
          </>
        ) : (
          <div style={{ position: "relative" }}>
            <div
              style={userBox}
              onClick={() => setOpen(!open)}
            >
              {user.picture ? (
                <img
                  src={user.picture}
                  alt=""
                  style={avatar}
                />
              ) : (
                <div style={avatarFallback}>
                  {user.email?.[0]?.toUpperCase()}
                </div>
              )}

              <span style={email}>{user.email}</span>
            </div>

            {open && (
              <div style={dropdown}>
                <Link to="/profile" style={item}>
                  My Profile
                </Link>

                <Link to="/my-bookings" style={item}>
                  My Bookings
                </Link>

                {user.role === "Admin" && (
                  <Link to="/admin" style={item}>
                    Admin Panel
                  </Link>
                )}

                <div
                  style={{
                    ...item,
                    color: "#ff4d4f",
                  }}
                  onClick={logout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

/* ================= STYLES ================= */

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "18px 50px",
  background: "#070711",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  position: "sticky",
  top: 0,
  zIndex: 999,
};

const logo = {
  cursor: "pointer",
};

const navLinks = {
  display: "flex",
  alignItems: "center",
  gap: "35px",
};

const navLink = {
  color: "#ddd",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: "500",
};

const right = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const loginBtn = {
  background: "transparent",
  border: "1px solid #2a2a3a",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: "10px",
  cursor: "pointer",
};

const registerBtn = {
  background: "#c8a96e",
  border: "none",
  color: "#000",
  fontWeight: "600",
  padding: "8px 16px",
  borderRadius: "10px",
  cursor: "pointer",
};

const userBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
};

const avatar = {
  width: "38px",
  height: "38px",
  borderRadius: "50%",
  objectFit: "cover",
};

const avatarFallback = {
  width: "38px",
  height: "38px",
  borderRadius: "50%",
  background: "#c8a96e",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#000",
  fontWeight: "bold",
};

const email = {
  color: "#ddd",
  fontSize: "14px",
};

const dropdown = {
  position: "absolute",
  top: "55px",
  right: 0,
  width: "200px",
  background: "#111",
  border: "1px solid #222",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
};

const item = {
  display: "block",
  padding: "12px 16px",
  textDecoration: "none",
  color: "#ddd",
  borderBottom: "1px solid #222",
  cursor: "pointer",
};