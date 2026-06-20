import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={footer}>
      <div style={container}>
        {/* LEFT */}
        <div>
          <h2
            style={logo}
            onClick={() => navigate("/")}
          >
            🚗 EasyDrive
          </h2>

          <p style={desc}>
            Premium Car Rental Service with luxury cars,
            flexible booking options, and professional
            drivers for a smooth, safe, and comfortable
            journey across the city.
          </p>

          <div style={socials}>
            <span style={socialIcon}>📘</span>
            <span style={socialIcon}>📷</span>
            <span style={socialIcon}>🐦</span>
            <span style={socialIcon}>💼</span>
          </div>
        </div>

        {/* CENTER */}
        <div>
          <h4 style={heading}>Quick Links</h4>

          <p
            style={link}
            onClick={() => navigate("/")}
          >
            Home
          </p>

          <p
            style={link}
            onClick={() => navigate("/cars")}
          >
            Cars
          </p>

          <p
            style={link}
            onClick={() => navigate("/my-bookings")}
          >
            My Bookings
          </p>

          <p
            style={link}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </p>
        </div>

        {/* RIGHT */}
        <div id="contact">
          <h4 style={heading}>Contact Info</h4>

          <p style={contact}>
            📧 info@easydrive.com
          </p>

          <p style={contact}>
            📞 +91 98765 43210
          </p>

          <p style={contact}>
            📍 Surat, Gujarat, India
          </p>

          <p style={contact}>
            🕒 Mon - Sun | 24x7 Service
          </p>
        </div>
      </div>

      <div style={bottom}>
        © 2026 EasyDrive. All Rights Reserved.
      </div>
    </footer>
  );
}

/* ===== PREMIUM STYLES ===== */

const footer = {
  background:
    "linear-gradient(180deg,#0b0d17,#05070f)",
  borderTop:
    "1px solid rgba(255,255,255,0.06)",
  marginTop: "70px",
  paddingTop: "60px"
};

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 30px 45px",
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1.2fr",
  gap: "50px",
  color: "white"
};

const logo = {
  margin: 0,
  fontSize: "32px",
  fontWeight: "800",
  color: "#d4b06a",
  marginBottom: "18px",
  cursor: "pointer"
};

const desc = {
  color: "#94a3b8",
  lineHeight: "1.9",
  fontSize: "15px",
  maxWidth: "430px"
};

const socials = {
  display: "flex",
  gap: "12px",
  marginTop: "20px"
};

const socialIcon = {
  width: "42px",
  height: "42px",
  borderRadius: "12px",
  background:
    "rgba(255,255,255,0.04)",
  border:
    "1px solid rgba(255,255,255,0.06)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "18px"
};

const heading = {
  fontSize: "18px",
  fontWeight: "700",
  marginBottom: "20px",
  color: "white"
};

const link = {
  color: "#cbd5e1",
  marginBottom: "14px",
  cursor: "pointer",
  fontSize: "15px",
  transition: "0.2s"
};

const contact = {
  color: "#cbd5e1",
  marginBottom: "14px",
  fontSize: "15px",
  lineHeight: "1.7"
};

const bottom = {
  borderTop:
    "1px solid rgba(255,255,255,0.06)",
  padding: "22px",
  textAlign: "center",
  color: "#6b7280",
  fontSize: "14px"
};
