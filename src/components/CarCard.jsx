import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CarCard({ car }) {

  const nav = useNavigate();
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        ...card,
        transform: hover ? "translateY(-10px)" : "translateY(0)",
        boxShadow: hover
          ? "0 25px 60px rgba(0,0,0,0.8)"
          : "0 10px 30px rgba(0,0,0,0.5)"
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >

      {/* IMAGE BOX */}
      <div style={imgBox}>

        <img
          src={car.image}
          style={{
            ...img,
            transform: hover ? "scale(1.08)" : "scale(1)"
          }}
        />

        {/* AVAILABLE */}
        <div style={{
          ...badge,
          background: car.available ? "#16a34a" : "#ef4444"
        }}>
          {car.available ? "Available" : "Unavailable"}
        </div>

        {/* TYPE */}
        <div style={type}>{car.type}</div>

      </div>

      {/* CONTENT */}
      <div style={{ padding: "18px" }}>

        <p style={brand}>{car.brand} • {car.year}</p>

        <h3 style={title}>{car.name}</h3>

        {/* FEATURES */}
        <div style={tags}>
          <span>⛽ {car.fuel}</span>
          <span>⚙ {car.trans || car.transmission}</span>
          <span>🪑 {car.seats} Seats</span>
          {car.mileage && <span>📊 {car.mileage}</span>}
        </div>

        {/* BOTTOM */}
        <div style={bottom}>

          <div>
            <span style={price}>₹{car.price}</span>
            <span style={perDay}> / day</span>
          </div>

          <button
            style={{
              ...btn,
              transform: hover ? "scale(1.05)" : "scale(1)"
            }}
            onClick={() => nav(`/details/${car.id}`)}
          >
            View Details →
          </button>

        </div>

      </div>

    </div>
  );
}
const card = {
  background: "linear-gradient(145deg,#0b0b16,#0f172a)",
  borderRadius: "20px",
  border: "1px solid rgba(255,255,255,0.06)",
  overflow: "hidden",
  transition: "all 0.35s ease",
  cursor: "pointer",
  maxWidth: "420px",
  width: "100%",
  minHeight: "420px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "0 20px 50px rgba(0,0,0,0.45)"
};

const imgBox = {
  position: "relative",
  height: "220px",
  overflow: "hidden",
  background: "#0e0e1a"
};

const img = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  transition: "0.4s ease"
};

const badge = {
  position: "absolute",
  top: "14px",
  right: "14px",
  padding: "6px 14px",
  borderRadius: "20px",
  fontSize: "11px",
  fontWeight: "600",
  color: "white"
};

const type = {
  position: "absolute",
  bottom: "14px",
  left: "14px",
  background: "#c8a96e",
  padding: "6px 14px",
  borderRadius: "12px",
  fontSize: "11px",
  fontWeight: "600",
  color: "#000"
};

const brand = {
  fontSize: "13px",
  color: "#7a7890"
};

const title = {
  marginTop: "6px",
  fontSize: "22px",
  fontWeight: "700",
  color: "white"
};

const tags = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  fontSize: "13px",
  marginTop: "14px",
  color: "#9ca3af"
};

const bottom = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "22px"
};

const price = {
  fontSize: "26px",
  fontWeight: "700",
  color: "#c8a96e"
};

const perDay = {
  fontSize: "13px",
  color: "#888"
};

const btn = {
  background: "linear-gradient(135deg,#c8a96e,#a8894e)",
  border: "none",
  padding: "10px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "600",
  transition: "0.3s"
};