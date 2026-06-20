import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function BookingPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [car, setCar] = useState(null);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

const [activeCoupons, setActiveCoupons] =
  useState([]);
  const [withDriver, setWithDriver] = useState(false);

  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState("");

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [notes, setNotes] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5194/api/Cars/" + id)
      .then((res) => res.json())
      .then((data) => setCar(data))
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: "Failed to load car",
          icon: "error"
        });
      });
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:5194/api/Drivers/available")
      .then((res) => res.json())
      .then((data) => setDrivers(data))
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: "Failed to load drivers",
          icon: "error"
        });
      });
  }, []);
useEffect(() => {
  loadCoupons();
}, []);

const loadCoupons = async () => {
  try {
    const res = await fetch(
      "http://localhost:5194/api/Coupons"
    );

    const data = await res.json();

    setActiveCoupons(data);
  } catch (err) {
    console.log(err);
  }
};
  const calculateDays = () => {
    if (!fromDate || !toDate) return 0;

    const start = new Date(fromDate);
    const end = new Date(toDate);

    const diff = Math.ceil(
      (end - start) / (1000 * 60 * 60 * 24)
    );

    return diff > 0 ? diff : 0;
  };

  const totalDays = calculateDays();
  const carPrice = car?.pricePerDay || 0;
  const driverFee = withDriver ? 500 : 0;

  const total =
    totalDays * (Number(carPrice) + driverFee);

  const finalTotal =
    total - discount > 0
      ? total - discount
      : total;

  const applyCoupon = async () => {
    if (!coupon.trim()) {
      Swal.fire({
        title: "Warning",
        text: "Please enter coupon code",
        icon: "warning"
      });
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5194/api/Coupons/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            code: coupon,
            amount: total
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          title: "Error",
          text: "Invalid Coupon",
          icon: "error"
        });
        return;
      }

      setDiscount(data.discount);

      Swal.fire({
        title: "Coupon Applied ✅",
        icon: "success",
        timer: 1200,
        showConfirmButton: false
      });
    } catch {
      Swal.fire({
        title: "Error",
        text: "Failed to apply coupon",
        icon: "error"
      });
    }
  };

 const handleBooking = async () => {

  // ✅ LOGIN CHECK
  const userData = JSON.parse(
    localStorage.getItem("user")
  );

  if (!userData) {
    Swal.fire({
      title: "Login Required",
      text: "Please login before booking a car",
      icon: "warning"
    });

    nav("/login");
    return;
  }

  if (!fromDate) {
    Swal.fire({
      title: "Warning",
      text: "Please select From Date",
      icon: "warning"
    });
    return;
  }

  if (!toDate) {
    Swal.fire({
      title: "Warning",
      text: "Please select To Date",
      icon: "warning"
    });
    return;
  }

  if (!pickup.trim()) {
    Swal.fire({
      title: "Warning",
      text: "Please enter Pickup Location",
      icon: "warning"
    });
    return;
  }

  if (!drop.trim()) {
    Swal.fire({
      title: "Warning",
      text: "Please enter Drop Location",
      icon: "warning"
    });
    return;
  }

  if (withDriver && !selectedDriver) {
    Swal.fire({
      title: "Warning",
      text: "Please select Driver",
      icon: "warning"
    });
    return;
  }

  if (totalDays <= 0) {
    Swal.fire({
      title: "Error",
      text: "Invalid date range",
      icon: "error"
    });
    return;
  }

  try {
    const payload = {
      userId: userData.userId,

      customerName:
        userData.fullName ||
        userData.name,

      phone:
        userData.phone,

      carId: Number(id),

      withDriver,

      driverId: withDriver
        ? parseInt(selectedDriver)
        : null,

      fromDate,
      toDate,

      pickupLocation: pickup,
      dropLocation: drop,

      time: "10:00 AM",

      totalAmount: finalTotal
    };
    console.log("USER DATA:", userData);
console.log("PHONE:", userData.phone);
console.log("PAYLOAD:", payload);

    const bookingRes = await fetch(
      "http://localhost:5194/api/Bookings",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify(
          payload
        )
      }
    );

    const rawText =
      await bookingRes.text();

    if (!bookingRes.ok) {
      Swal.fire({
        title: "Error",
        text:
          rawText ||
          "Booking failed",
        icon: "error"
      });
      return;
    }

    const bookingData =
      JSON.parse(rawText);

    Swal.fire({
      title:
        "Booking Successful ✅",
      icon: "success",
      timer: 1200,
      showConfirmButton: false
    });

    setTimeout(() => {
      nav("/payment", {
        state: {
          carName: car.name,
          brand: car.brand,
          fromDate,
          toDate,
          totalDays,
          withDriver,

          selectedDriver:
            drivers.find(
              (d) =>
                d.id ===
                parseInt(
                  selectedDriver
                )
            )?.name ||
            "Self Drive",

          total: finalTotal,

          bookingId:
            bookingData.bookingId
        }
      });
    }, 1200);

  } catch (err) {
    console.log(err);

    Swal.fire({
      title: "Error",
      text: "Booking failed",
      icon: "error"
    });
  }
};
  if (!car) {
    return (
      <h2 style={{ color: "white", padding: 30 }}>
        Loading...
      </h2>
    );
  }

return (
  <div style={page}>
    <button
      style={backBtn}
      onClick={() => nav("/cars")}
    >
      ← Back to Cars
    </button>

    <h1 style={title}>
      Book — {car.name}
    </h1>

    <div style={layout}>
      {/* LEFT SIDE */}
      <div>
        {/* DATES */}
        <div style={card}>
          <h3 style={sectionTitle}>
            Select Dates
          </h3>

          <div style={dateGrid}>
            <div>
              <p style={label}>
                From Date *
              </p>

              <input
                type="date"
                value={fromDate}
                onChange={(e) =>
                  setFromDate(
                    e.target.value
                  )
                }
                style={input}
              />
            </div>

            <div>
              <p style={label}>
                To Date *
              </p>

              <input
                type="date"
                value={toDate}
                onChange={(e) =>
                  setToDate(
                    e.target.value
                  )
                }
                style={input}
              />
            </div>
          </div>
        </div>

        {/* DRIVER OPTION */}
        <div style={card}>
          <h3 style={sectionTitle}>
            Driver Option
          </h3>

          <div style={driverGrid}>
            <div
              onClick={() => {
                setWithDriver(false);
                setSelectedDriver("");
              }}
              style={{
                ...driverBox,
                border: !withDriver
                  ? "2px solid #c8a96e"
                  : "1px solid rgba(255,255,255,0.08)"
              }}
            >
              <h3
                style={{
                  margin: 0
                }}
              >
                Self Drive
              </h3>

              <p style={muted}>
                Without Driver
              </p>
            </div>

            <div
              onClick={() =>
                setWithDriver(true)
              }
              style={{
                ...driverBox,
                border: withDriver
                  ? "2px solid #c8a96e"
                  : "1px solid rgba(255,255,255,0.08)"
              }}
            >
              <h3
                style={{
                  margin: 0
                }}
              >
                With Driver
              </h3>

              <p style={muted}>
                +₹500/day
              </p>
            </div>
          </div>

          {withDriver && (
            <div
              style={{
                marginTop: 20
              }}
            >
              <p style={label}>
                Select Driver *
              </p>

              <select
                value={selectedDriver}
                onChange={(e) =>
                  setSelectedDriver(
                    e.target.value
                  )
                }
                style={input}
              >
                <option value="">
                  -- Select Driver --
                </option>

                {drivers.map(
                  (driver) => (
                    <option
                      key={
                        driver.id
                      }
                      value={
                        driver.id
                      }
                    >
                      {
                        driver.name
                      }{" "}
                      (
                      {
                        driver.experienceYears
                      }{" "}
                      yrs)
                    </option>
                  )
                )}
              </select>
            </div>
          )}
        </div>

        {/* PICKUP DROP */}
        <div style={card}>
          <h3 style={sectionTitle}>
            Pickup & Drop Details
          </h3>

          <p style={label}>
            Pickup Location *
          </p>

          <input
            style={input}
            placeholder="Pickup location"
            value={pickup}
            onChange={(e) =>
              setPickup(
                e.target.value
              )
            }
          />

          <p style={label}>
            Drop Location *
          </p>

          <input
            style={input}
            placeholder="Drop location"
            value={drop}
            onChange={(e) =>
              setDrop(
                e.target.value
              )
            }
          />

          <p style={label}>
            Special Notes
          </p>

          <textarea
            style={textarea}
            placeholder="Optional notes..."
            value={notes}
            onChange={(e) =>
              setNotes(
                e.target.value
              )
            }
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={summaryCard}>
        <h3 style={sectionTitle}>
          Booking Summary
        </h3>

        <div style={carBox}>
          <div style={emoji}>
            🚘
          </div>

          <div>
            <h3
              style={{
                margin: 0
              }}
            >
              {car.name}
            </h3>

            <p style={muted}>
              {car.brand} •{" "}
              {car.year} •{" "}
              {car.carType}
            </p>
          </div>
        </div>

        <div style={row}>
          <span style={muted}>
            Car Rate
          </span>
          <b>
            ₹
            {car.pricePerDay}
            /day
          </b>
        </div>

        <div style={row}>
          <span style={muted}>
            Driver Fee
          </span>
          <b>
            {withDriver
              ? "₹500/day"
              : "Not selected"}
          </b>
        </div>

        <div style={row}>
          <span style={muted}>
            Driver Name
          </span>

          <b>
            {withDriver
              ? drivers.find(
                  (d) =>
                    d.id ===
                    parseInt(
                      selectedDriver
                    )
                )?.name ||
                "Not selected"
              : "Self Drive"}
          </b>
        </div>

        <div style={row}>
          <span style={muted}>
            Duration
          </span>

          <b>
            {totalDays > 0
              ? `${totalDays} days`
              : "Not set"}
          </b>
        </div>

        {/* PROMO CODE */}
        <div style={card}>
          <h3
            style={sectionTitle}
          >
            Promo Code
          </h3>

          <input
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) =>
              setCoupon(
                e.target.value
              )
            }
            style={input}
          />

          <button
            style={{
              ...bookBtn,
              marginTop:
                "12px"
            }}
            onClick={
              applyCoupon
            }
          >
            Apply Coupon
          </button>
          {/* ACTIVE COUPONS */}

{/* ACTIVE COUPONS */}

<div
  style={{
    marginTop: "18px"
  }}
>
  <p
    style={{
      color: "#94a3b8",
      fontSize: "13px",
      marginBottom: "12px",
      fontWeight: "600"
    }}
  >
    Active Coupons
  </p>

  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "10px"
    }}
  >
    {activeCoupons.map((c) => (
      <div
        key={c.id}
        onClick={() =>
          setCoupon(c.code)
        }
        style={{
          background:
            "linear-gradient(145deg,#111827,#020617)",
          border:
            "1px solid rgba(255,255,255,0.06)",
          borderRadius: "14px",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          transition: "0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "translateY(-3px)";
          e.currentTarget.style.border =
            "1px solid rgba(212,175,106,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            "translateY(0px)";
          e.currentTarget.style.border =
            "1px solid rgba(255,255,255,0.06)";
        }}
      >
        <span
          style={{
            color: "#f5d27a",
            fontWeight: "700",
            fontSize: "14px"
          }}
        >
          {c.code}
        </span>

        <span
          style={{
            color: "#10b981",
            fontSize: "13px",
            fontWeight: "600"
          }}
        >
          {c.isPercentage
            ? `${c.discountAmount}%`
            : `₹${c.discountAmount}`}
        </span>
      </div>
    ))}
  </div>
</div>
          {discount > 0 && (
            <p
              style={{
                marginTop:
                  "12px",
                color:
                  "#10b981",
                fontWeight:
                  "600"
              }}
            >
              Discount Applied:
              ₹{discount}
            </p>
          )}
        </div>

        <hr style={line} />

        <div style={row}>
          <h2>Total</h2>

          <h2 style={price}>
            {total > 0
              ? `₹${total}`
              : "—"}
          </h2>
        </div>

        {discount > 0 && (
          <div style={row}>
            <span
              style={muted}
            >
              Discount
            </span>

            <b
              style={{
                color:
                  "#10b981"
              }}
            >
              - ₹
              {discount}
            </b>
          </div>
        )}

        <hr style={line} />

        <div style={row}>
          <h2>
            Final Total
          </h2>

          <h2 style={price}>
            {finalTotal > 0
              ? `₹${finalTotal}`
              : "—"}
          </h2>
        </div>

        <button
          style={bookBtn}
          onClick={
            handleBooking
          }
        >
          Confirm Booking
        </button>
      </div>
    </div>
  </div>
);
}


const page = {
  minHeight: "100vh",
  background: "#05070f",
  padding: "16px",
  color: "white",
  maxWidth: "1050px",
  margin: "0 auto"
};

const backBtn = {
  padding: "8px 16px",
  borderRadius: "10px",
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "white",
  cursor: "pointer",
  marginBottom: "16px",
  fontSize: "13px"
};

const title = {
  fontSize: "22px",
  marginBottom: "18px",
  fontWeight: "700"
};

const layout = {
  display: "grid",
  gridTemplateColumns: "1.2fr 0.8fr",
  gap: "16px",
  alignItems: "start"
};

const card = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "14px",
  padding: "16px",
  marginBottom: "14px"
};

const summaryCard = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "14px",
  padding: "16px",
  position: "sticky",
  top: "16px"
};

const sectionTitle = {
  marginBottom: "12px",
  fontSize: "16px",
  fontWeight: "600"
};

const dateGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px"
};

const label = {
  fontSize: "12px",
  marginBottom: "5px",
  color: "#9ca3af"
};

const input = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "#0f172a",
  color: "white",
  fontSize: "13px",
  outline: "none",
  boxSizing: "border-box"
};

const textarea = {
  ...input,
  minHeight: "70px",
  resize: "none"
};

const driverGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px"
};

const driverBox = {
  padding: "14px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.08)",
  cursor: "pointer",
  transition: "0.2s"
};

const carBox = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  padding: "14px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.03)",
  marginBottom: "14px"
};

const emoji = {
  fontSize: "20px"
};

const muted = {
  color: "#9ca3af",
  fontSize: "12px"
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
  alignItems: "center",
  fontSize: "13px"
};

const line = {
  border: "none",
  borderTop: "1px solid rgba(255,255,255,0.08)",
  margin: "14px 0"
};

const price = {
  color: "#c8a96e",
  fontSize: "20px",
  fontWeight: "700"
};

const bookBtn = {
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(135deg,#c8a96e,#a8894e)",
  fontWeight: "600",
  fontSize: "13px",
  cursor: "pointer",
  marginTop: "8px"
};
