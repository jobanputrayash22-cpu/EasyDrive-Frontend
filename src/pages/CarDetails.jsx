import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CarDetails() {
  const { id } = useParams();
  const nav = useNavigate();

  const [car, setCar] = useState(null);

  // 🔥 BASE URL
  const baseUrl = "http://localhost:5194";

  // 🔥 IMAGE FIX FUNCTION
  const makeImage = (url) => {
    if (!url || url === "") {
      return "/default-car.jpg";
    }

    // if already full URL
    if (url.startsWith("http")) {
      return url;
    }

    // backend image path
    return baseUrl + url;
  };

  useEffect(() => {
    fetch(`${baseUrl}/api/Cars/${id}`)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed");
        }
        return r.json();
      })
      .then((data) => {
        console.log("CAR DATA:", data);
        console.log("IMAGE URL:", data.imageUrl);
        setCar(data);
      })
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: "Failed to load car details",
          icon: "error"
        });
      });
  }, [id]);

  if (!car) {
    return (
      <h2
        style={{
          color: "white",
          padding: "20px"
        }}
      >
        Loading...
      </h2>
    );
  }

  return (
    <div style={page}>
      {/* BACK BUTTON */}
      <button
        style={backBtn}
        onClick={() => nav("/cars")}
      >
        ← Back to Cars
      </button>

      <div style={layout}>
        {/* LEFT SIDE */}
        <div>
          {/* IMAGE */}
          <div style={imageBox}>
            <img
              src={makeImage(car.imageUrl)}
              alt={car.name || "Car"}
              style={image}
              onError={(e) => {
                e.target.src = "/default-car.jpg";
              }}
            />
          </div>

          {/* FEATURES */}
          <div style={sectionBox}>
            <h3
              style={{
                marginBottom: "12px"
              }}
            >
              Features & Amenities
            </h3>

            <div style={features}>
              <span>✓ AC</span>
              <span>✓ GPS</span>
              <span>✓ Bluetooth</span>
              <span>✓ Reverse Cam</span>
              <span>✓ Airbags</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={sideCard}>
          <p style={brand}>
            {car.brand} • {car.year}
          </p>

          <h1 style={carTitle}>
            {car.name}
          </h1>

          {/* AVAILABLE */}
          <div
            style={{
              ...available,
              background: car.available
                ? "rgba(16,185,129,0.15)"
                : "rgba(239,68,68,0.15)",
              color: car.available
                ? "#10b981"
                : "#ef4444"
            }}
          >
            {car.available
              ? "Available Now"
              : "Currently Unavailable"}
          </div>

          {/* DETAILS GRID */}
          <div style={grid}>
            <div style={infoBox}>
              <p>Fuel</p>
              <b>{car.fuelType}</b>
            </div>

            <div style={infoBox}>
              <p>Transmission</p>
              <b>{car.transmission}</b>
            </div>

            <div style={infoBox}>
              <p>Seats</p>
              <b>{car.seats}</b>
            </div>

            <div style={infoBox}>
              <p>Mileage</p>
              <b>{car.mileage}</b>
            </div>

            <div style={infoBox}>
              <p>Type</p>
              <b>{car.carType}</b>
            </div>

            <div style={infoBox}>
              <p>Year</p>
              <b>{car.year}</b>
            </div>
          </div>

          <p style={desc}>
            Premium {car.carType} with advanced
            comfort and performance.
          </p>

          <h2 style={price}>
            ₹{car.pricePerDay} <span>/day</span>
          </h2>

          {car.available ? (
            <button
              style={bookBtn}
              onClick={() =>
                nav(`/booking/${car.id}`)
              }
            >
              Book Now
            </button>
          ) : (
            <button
              style={{
                ...bookBtn,
                background: "#444",
                cursor: "not-allowed"
              }}
              disabled
            >
              Unavailable
            </button>
          )}

          <button
            style={secondaryBtn}
            onClick={() => nav("/cars")}
          >
            Browse Other Cars
          </button>
        </div>
      </div>
    </div>
  );
}
/* SMALLER STYLES */

const page = {
  minHeight: "100vh",
  background: "#05070f",
  padding: "18px",
  color: "white",
  maxWidth: "1200px",
  margin: "0 auto"
};

const backBtn = {
  marginBottom: "14px",
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.12)",
  padding: "8px 14px",
  borderRadius: "10px",
  color: "white",
  fontSize: "13px",
  cursor: "pointer"
};

const layout = {
  display: "grid",
  gridTemplateColumns: "1.4fr 0.8fr",
  gap: "18px",
  alignItems: "start"
};

const imageBox = {
  borderRadius: "14px",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.06)"
};

const image = {
  width: "100%",
  height: "300px",
  objectFit: "cover"
};

const sectionBox = {
  marginTop: "16px",
  padding: "18px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.06)"
};

const features = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  fontSize: "14px"
};

const sideCard = {
  padding: "22px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.06)"
};

const brand = {
  fontSize: "12px",
  color: "#7c7f95",
  textTransform: "uppercase"
};

const carTitle = {
  marginTop: "8px",
  fontSize: "24px"
};

const available = {
  display: "inline-block",
  padding: "7px 14px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "600",
  margin: "12px 0"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  marginTop: "14px"
};

const infoBox = {
  padding: "14px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.05)"
};

const desc = {
  marginTop: "16px",
  color: "#9ca3af",
  fontSize: "14px"
};

const price = {
  marginTop: "18px",
  fontSize: "22px",
  color: "#d4b06a"
};

const bookBtn = {
  width: "100%",
  padding: "13px",
  marginTop: "16px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(135deg,#d4b06a,#b8914c)",
  fontWeight: "700",
  fontSize: "14px",
  cursor: "pointer"
};

const secondaryBtn = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.10)",
  color: "white",
  fontSize: "14px",
  cursor: "pointer"
};