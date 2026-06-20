import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import heroCarimg from "../assets/hero-car.png";

export default function Home() {
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] =
    useState([]);
  const [search, setSearch] =
    useState("");

  const [count, setCount] = useState({
    cars: 0,
    customers: 0,
    drivers: 0
  });

  const baseUrl =
    "http://localhost:5194";

  const makeImage = (url) => {
    if (!url) return "";
    if (url.startsWith("http"))
      return url;
    return baseUrl + url;
  };

  useEffect(() => {
    const load = async () => {
      try {
        const carsData = await fetch(
          `${baseUrl}/api/Cars`
        ).then((r) => r.json());

        const driversData =
          await fetch(
            `${baseUrl}/api/Drivers`
          ).then((r) => r.json());

        const bookingsData =
          await fetch(
            `${baseUrl}/api/Bookings/requests`
          ).then((r) => r.json());

        setCars(carsData);
        setFilteredCars(carsData);

        setCount({
          cars: carsData.length,
          customers:
            bookingsData.length,
          drivers:
            driversData.length
        });
      } catch (e) {
        console.log("ERROR:", e);

        Swal.fire({
          title: "Error",
          text: "Failed to load homepage data",
          icon: "error"
        });
      }
    };

    load();
  }, []);

  const handleSearch = () => {
    const text = search
      .trim()
      .toLowerCase();

    if (!text) {
      setFilteredCars(cars);
      return;
    }

    const result = cars.filter(
      (c) =>
        (c.name || "")
          .toLowerCase()
          .includes(text) ||
        (c.brand || "")
          .toLowerCase()
          .includes(text) ||
        (c.carType || "")
          .toLowerCase()
          .includes(text) ||
        (c.fuelType || "")
          .toLowerCase()
          .includes(text)
    );

    setFilteredCars(result);
  };

  const copyCoupon = (code) => {
    navigator.clipboard.writeText(code);

    Swal.fire({
      title: "Copied! 🎉",
      text: `Coupon Copied: ${code}`,
      icon: "success",
      timer: 1200,
      showConfirmButton: false
    });
  };


  return (
    <div style={page}>
    {/* PREMIUM HERO */}
<div style={premiumHero}>
  <div style={heroLeft}>
    <div style={heroBadge}>
      👑 PREMIUM CAR RENTAL IN SURAT
    </div>

    <h1 style={heroTitle}>
      Drive Beyond
      <br />
      <span style={{ color: "#f5d27a" }}>
        Limits.
      </span>
    </h1>
    <p
  style={{
    color: "#f5d27a",
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "15px"
  }}
>
  Premium Luxury Cars For Every Journey
</p>

    <p style={heroDesc}>
      Experience luxury, comfort and performance
      with our premium fleet of cars.
    </p>

    <div style={heroButtons}>
      <button
        style={heroBtn}
        onClick={() => navigate("/cars")}
      >
        Explore Cars
      </button>

      <button
        style={heroOutlineBtn}
        onClick={() => navigate("/cars")}
      >
        Book Now
      </button>
    </div>
  </div>

  <div style={heroRight}>
    <img
  src={heroCarimg}
  alt="Luxury Car"
  style={heroCar}
/>
  </div>
</div>
     {/* FEATURED CARS SECTION */}
<div style={carsSection}>
  <h2 style={sectionTitle}>
    Featured Cars
  </h2>

  <p
    style={{
      textAlign: "center",
      color: "#9ca3af",
      marginTop: "-10px",
      marginBottom: "30px",
      fontSize: "15px"
    }}
  >
    Explore our premium collection of luxury,
    SUV, sedan, and sports cars designed for
    comfort, style, and performance.
  </p>

  <div style={carsGrid}>
    {filteredCars.length > 0 ? (
      filteredCars
        .slice(0, 4) // only 4-5 cars on homepage
        .map((car) => (
          <div
            key={car.id}
            style={carCard}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform =
                "translateY(-10px) scale(1.02)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform =
                "translateY(0)")
            }
          >
            <img
              src={
                makeImage(car.imageUrl) ||
                "/default-car.jpg"
              }
              alt={car.name}
              style={carImage}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform =
                  "scale(1.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform =
                  "scale(1)")
              }
            />

            <div style={carContent}>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "700"
                }}
              >
                {car.name}
              </h3>

              <p style={carBrand}>
                {car.brand}
              </p>

              <p
                style={{
                  color: "#cbd5e1",
                  marginTop: "8px",
                  fontSize: "14px"
                }}
              >
                Premium luxury car with smooth
                driving experience and top-class
                comfort.
              </p>

              <p style={carPrice}>
                ₹{car.pricePerDay}/day
              </p>

              <button
                style={viewBtn}
                onClick={() =>
                  navigate(
                    `/details/${car.id}`
                  )
                }
              >
                View Details
              </button>
            </div>
          </div>
        ))
    ) : (
      <p
        style={{
          color: "white",
          textAlign: "center",
          width: "100%"
        }}
      >
        No cars found
      </p>
    )}
  </div>

  {/* View All Cars Button */}
  <div
    style={{
      textAlign: "center",
      marginTop: "40px"
    }}
  >
    <button
      style={{
        padding: "14px 28px",
        border: "none",
        borderRadius: "14px",
        background:
          "linear-gradient(135deg,#f5d27a,#d4af6a,#b8914e)",
        fontWeight: "700",
        cursor: "pointer",
        boxShadow:
          "0 12px 25px rgba(212,175,106,0.25)"
      }}
      onClick={() => navigate("/cars")}
    >
      View All Cars
    </button>
  </div>
</div>


   {/* COUPON SECTION */}
<div id="offers"style={couponSection}>
  <h2 style={sectionTitle}>
    Exclusive Offers & Coupons
  </h2>

  <p
    style={{
      textAlign: "center",
      color: "#9ca3af",
      marginTop: "-10px",
      marginBottom: "30px",
      fontSize: "15px"
    }}
  >
    Save more on every ride with our premium
    discount coupons. Apply these offers during
    booking and enjoy luxury rides at better prices.
  </p>

  <div style={couponGrid}>
    {/* Coupon 1 */}
    <div style={couponCard}>
      <h3
        style={{
          fontSize: "24px",
          fontWeight: "800",
          color: "#f5d27a"
        }}
      >
        WELCOME10
      </h3>

      <p
        style={{
          marginTop: "12px",
          color: "#cbd5e1",
          lineHeight: "1.7",
          fontSize: "14px"
        }}
      >
        Get <b>10% OFF</b> on your first luxury
        car booking. Perfect for new users who
        want a premium experience.
      </p>

      <p
        style={{
          marginTop: "10px",
          color: "#94a3b8",
          fontSize: "13px"
        }}
      >
        
      </p>

      <button
        style={couponBtn}
        onClick={() =>
          copyCoupon("WELCOME10")
        }
      >
        Copy Code
      </button>
    </div>

    {/* Coupon 2 */}
    <div style={couponCard}>
      <h3
        style={{
          fontSize: "24px",
          fontWeight: "800",
          color: "#f5d27a"
        }}
      >
        FLAT500
      </h3>

      <p
        style={{
          marginTop: "12px",
          color: "#cbd5e1",
          lineHeight: "1.7",
          fontSize: "14px"
        }}
      >
        Enjoy <b>Flat ₹500 OFF</b> on weekend
        bookings. Best for long drives and family
        trips with comfort.
      </p>

      <p
        style={{
          marginTop: "10px",
          color: "#94a3b8",
          fontSize: "13px"
        }}
      >
        
      </p>

      <button
        style={couponBtn}
        onClick={() =>
          copyCoupon("FLAT500")
        }
      >
        Copy Code
      </button>
    </div>

    {/* Coupon 3 */}
    <div style={couponCard}>
      <h3
        style={{
          fontSize: "24px",
          fontWeight: "800",
          color: "#f5d27a"
        }}
      >
        DRIVEFREE
      </h3>

      <p
        style={{
          marginTop: "12px",
          color: "#cbd5e1",
          lineHeight: "1.7",
          fontSize: "14px"
        }}
      >
        Get <b>Free Driver Service</b> with
        selected premium cars for a smoother and
        more relaxing journey.
      </p>

      <p
        style={{
          marginTop: "10px",
          color: "#94a3b8",
          fontSize: "13px"
        }}
      >
        
      </p>

      <button
        style={couponBtn}
        onClick={() =>
          copyCoupon("DRIVEFREE")
        }
      >
        Copy Code
      </button>
    </div>
  </div>
</div>
    {/* WHY CHOOSE US SECTION */}
    <div
  style={whyCard}
>
      <h2 style={whyTitle}>
        Why Choose EasyDrive
      </h2>

      <div style={whyGrid}

      >
        <div style={whyCard}>
          <div style={icon}>
            🚗
          </div>
          <h3 style={whyHeading}>Premium Cars</h3>
          <p style={whyText}>
            Luxury, SUV, Sedan and
            family cars available
            for every trip.
          </p>
        </div>

        <div style={whyCard}>
          <div style={icon}>
            🧑‍✈️
          </div>
          <h3>
            Professional Drivers
          </h3>
          <p style={whyText}>
            Verified and
            experienced drivers
            for safe travel
            experience.
          </p>
        </div>

        <div style={whyCard}>
          <div style={icon}>
            ⚡
          </div>
          <h3>
            Instant Booking
          </h3>
          <p style={whyText}>
            Quick booking
            process with smooth
            payment and
            confirmation.
          </p>
        </div>

        <div style={whyCard}>
          <div style={icon}>
            💰
          </div>
          <h3>Best Pricing</h3>
          <p style={whyText}>
            Affordable daily
            rental plans with
            premium service
            quality.
          </p>
        </div>
      </div>
    </div>

    {/* TESTIMONIAL SECTION */}
    <div style={testimonialSection}
   
    >
      <h2 style={sectionTitle}>
        What Customers Say
      </h2>

      <div style={testimonialGrid}>
        <div
          style={testimonialCard}
        >
          <p>
            “Very smooth booking
            process and excellent
            car condition.”
          </p>
          <h4>
            - Rahul Sharma
          </h4>
        </div>

        <div
          style={testimonialCard}
        >
          <p>
            “Driver was
            professional and trip
            was very
            comfortable.”
          </p>
          <h4>
            - Priya Patel
          </h4>
        </div>

        <div
          style={testimonialCard}
        >
          <p>
            “Best premium rental
            service I found in
            Surat.”
          </p>
          <h4>
            - Aman Verma
          </h4>
        </div>
      </div>
    </div>
  </div>
  );
}
/* ---------- PREMIUM 3D + ANIMATED STYLES ---------- */

const page = {
  background:
    "radial-gradient(circle at top, #111827 0%, #05070f 45%, #020617 100%)",
  color: "white",
  minHeight: "100vh",
  fontFamily: "Inter, sans-serif",
  overflowX: "hidden"
};

/* HERO */

const hero = {
  textAlign: "center",
  padding: "100px 20px 80px",
  position: "relative"
};

const badge = {
  color: "#f5d27a",
  border: "1px solid rgba(255,255,255,0.12)",
  display: "inline-block",
  padding: "8px 18px",
  borderRadius: "30px",
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
  fontWeight: "600",
  letterSpacing: "0.5px"
};

const title = {
  fontSize: "58px",
  marginTop: "24px",
  fontWeight: "900",
  lineHeight: "1.15",
  letterSpacing: "0.5px",
  textShadow: "0 10px 40px rgba(0,0,0,0.35)"
};

const gold = {
  background:
    "linear-gradient(135deg,#f5d27a,#d4af6a,#b8914e)",
  WebkitBackgroundClip: "text",
  color: "transparent",
  textShadow: "none"
};

const subtitle = {
  color: "#cbd5e1",
  marginTop: "18px",
  fontSize: "17px",
  maxWidth: "700px",
  marginInline: "auto",
  lineHeight: "1.7"
};

const searchBox = {
  marginTop: "40px",
  display: "flex",
  justifyContent: "center",
  gap: "14px",
  flexWrap: "wrap"
};

const input = {
  padding: "16px 18px",
  width: "340px",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  backdropFilter: "blur(16px)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  outline: "none",
  transition: "0.3s"
};

const searchBtn = {
  background:
    "linear-gradient(135deg,#f5d27a,#d4af6a,#b8914e)",
  border: "none",
  padding: "16px 28px",
  borderRadius: "16px",
  cursor: "pointer",
  fontWeight: "800",
  fontSize: "15px",
  transition: "0.35s",
  boxShadow: "0 15px 35px rgba(212,175,106,0.35)",
  transform: "translateY(0)"
};

const sectionTitle = {
  textAlign: "center",
  marginBottom: "34px"
};

/* FEATURED CARS */

const carsSection = {
  padding: "80px 40px"
};

const carsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(300px,1fr))",
  gap: "28px",
  marginTop: "35px"
};

const carCard = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "24px",
  overflow: "hidden",
  backdropFilter: "blur(18px)",
  transition: "0.4s",
  cursor: "pointer",
  boxShadow:
    "0 20px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
  transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)"
};

const carImage = {
  width: "100%",
  height: "230px",
  objectFit: "cover",
  transition: "0.45s",
  filter: "brightness(1.02)"
};

const carContent = {
  padding: "22px"
};

const carBrand = {
  color: "#cbd5e1",
  marginTop: "8px",
  fontSize: "15px"
};

const carPrice = {
  color: "#f5d27a",
  fontSize: "24px",
  fontWeight: "800",
  marginTop: "16px"
};

const viewBtn = {
  marginTop: "20px",
  width: "100%",
  padding: "15px",
  border: "none",
  borderRadius: "16px",
  background:
    "linear-gradient(135deg,#f5d27a,#d4af6a,#b8914e)",
  fontWeight: "800",
  cursor: "pointer",
  transition: "0.35s",
  boxShadow:
    "0 14px 30px rgba(212,175,106,0.28)",
  transform: "translateY(0)"
};

/* COUPON */

const couponSection = {
  padding: "80px 40px"
};

const couponGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(300px,1fr))",
  gap: "24px",
  marginTop: "24px"
};

const couponCard = {
  background:
    "linear-gradient(145deg,#111827,#020617)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "24px",
  padding: "30px",
  color: "white",
  boxShadow:
    "0 20px 40px rgba(0,0,0,0.35)",
  transition: "0.35s",
  transform: "translateY(0)"
};

const couponBtn = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "14px",
  background:
    "linear-gradient(135deg,#f5d27a,#d4af6a,#b8914e)",
  fontWeight: "800",
  cursor: "pointer",
  boxShadow:
    "0 12px 28px rgba(212,175,106,0.25)"
};

/* WHY CHOOSE US */
/* WHY CHOOSE US */
/* WHY CHOOSE US */

const whySection = {
  padding: "80px 40px"
};

const whyGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(300px,1fr))",
  gap: "24px",
  marginTop: "30px"
};

const whyCard = {
  background:
    "linear-gradient(145deg,#111827,#020617)",
  border:
    "1px solid rgba(255,255,255,0.08)",
  borderRadius: "24px",
  padding: "34px 28px",
  color: "white",
  textAlign: "center",
  boxShadow:
    "0 20px 40px rgba(0,0,0,0.35)",
  transition: "0.35s",
  transform: "translateY(0)",
  cursor: "pointer"
};

const icon = {
  width: "75px",
  height: "75px",
  margin: "0 auto 20px",
  borderRadius: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    "linear-gradient(135deg,#f5d27a,#d4af6a,#b8914e)",
  fontSize: "34px",
  color: "#111",
  boxShadow:
    "0 12px 28px rgba(212,175,106,0.25)"
};

const whyTitle = {
  fontSize: "42px",
  fontWeight: "800",
  textAlign: "center",
  marginBottom: "12px",
  color: "white"
};

const whyHeading = {
  fontSize: "24px",
  fontWeight: "700",
  marginBottom: "12px",
  color: "white"
};

const whyText = {
  color: "#cbd5e1",
  fontSize: "15px",
  lineHeight: "1.8"
};

/* TESTIMONIAL */

const testimonialSection = {
  padding: "80px 40px"
};

const testimonialGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(300px,1fr))",
  gap: "24px",
  marginTop: "30px"
};

const testimonialCard = {
  background:
    "linear-gradient(145deg,#111827,#020617)",
  border:
    "1px solid rgba(255,255,255,0.08)",
  borderRadius: "24px",
  padding: "30px",
  color: "white",
  boxShadow:
    "0 20px 40px rgba(0,0,0,0.35)",
  transition: "0.35s",
  transform: "translateY(0)",
  cursor: "pointer"
};
const premiumHero = {
  minHeight: "90vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "40px 80px 80px",
  gap: "70px",
  background:
    "linear-gradient(135deg,#020617 0%,#071028 40%,#020617 100%)",
  position: "relative",
  overflow: "hidden"
};

const heroLeft = {
  flex: 1,
  maxWidth: "650px"
};

const heroRight = {
  flex: 1.3,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const heroBadge = {
  display: "inline-block",
  padding: "12px 24px",
  border: "1px solid rgba(245,210,122,0.5)",
  borderRadius: "40px",
  color: "#f5d27a",
  marginBottom: "30px",
  background: "rgba(245,210,122,0.05)",
  backdropFilter: "blur(10px)",
  fontWeight: "600",
  letterSpacing: "0.5px"
};

const heroTitle = {
  fontSize: "82px",
  fontWeight: "900",
  lineHeight: "0.95",
  marginBottom: "20px",
  letterSpacing: "-3px"
};

const heroDesc = {
  color: "#cbd5e1",
  fontSize: "22px",
  lineHeight: "1.8",
  maxWidth: "600px",
  marginBottom: "35px"
};

const heroButtons = {
  display: "flex",
  gap: "18px",
  marginBottom: "40px"
};

const heroBtn = {
  background:
    "linear-gradient(135deg,#f5d27a,#d4af6a,#b8914e)",
  border: "none",
  padding: "18px 34px",
  borderRadius: "16px",
  fontWeight: "800",
  fontSize: "16px",
  cursor: "pointer",
  boxShadow:
    "0 15px 35px rgba(212,175,106,0.35)"
};

const heroOutlineBtn = {
  background: "transparent",
  border: "1px solid rgba(245,210,122,0.6)",
  color: "#f5d27a",
  padding: "18px 34px",
  borderRadius: "16px",
  fontWeight: "700",
  fontSize: "16px",
  cursor: "pointer"
};

const heroCar = {
  width: "100%",
  maxWidth: "950px",
  borderRadius: "28px",
  boxShadow:
    "0 40px 80px rgba(0,0,0,0.65)",
  objectFit: "cover"
};