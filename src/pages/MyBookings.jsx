import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function MyBookings() {
  const [bookings, setBookings] =
    useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        Swal.fire({
          title: "Warning",
          text: "Please login first",
          icon: "warning"
        });
        return;
      }

      const res = await fetch(
        `http://localhost:5194/api/Bookings/user/${user.userId}`
      );

      if (!res.ok) {
        Swal.fire({
          title: "Error",
          text: "Failed to load bookings",
          icon: "error"
        });
        return;
      }

      const data = await res.json();
      setBookings(data);
    } catch {
      Swal.fire({
        title: "Error",
        text: "Failed to load bookings",
        icon: "error"
      });
    }
  };

  const getStatusStyle = (status) => {
    if (status === "Approved") {
      return {
        background:
          "rgba(16,185,129,0.15)",
        color: "#10b981",
        border:
          "1px solid rgba(16,185,129,0.25)"
      };
    }

    if (status === "Declined") {
      return {
        background:
          "rgba(239,68,68,0.15)",
        color: "#ef4444",
        border:
          "1px solid rgba(239,68,68,0.25)"
      };
    }

    if (status === "Completed") {
      return {
        background:
          "rgba(59,130,246,0.15)",
        color: "#3b82f6",
        border:
          "1px solid rgba(59,130,246,0.25)"
      };
    }
if (status === "Cancelled") {
  return {
    background:
      "rgba(239,68,68,0.15)",
    color: "#ef4444",
    border:
      "1px solid rgba(239,68,68,0.25)"
  };
}
    return {
      background:
        "rgba(245,158,11,0.15)",
      color: "#f59e0b",
      border:
        "1px solid rgba(245,158,11,0.25)"
    };
  };
const handleViewDetails = (id) => {
  Swal.fire({
    title: "Opening Invoice...",
    icon: "info",
    timer: 1000,
    showConfirmButton: false
  });

  setTimeout(() => {
    navigate(`/invoice/${id}`);
  }, 1000);
};

const handleCancelBooking = async (id) => {
  const result = await Swal.fire({
    title: "Cancel Booking?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Cancel",
    cancelButtonText: "No"
  });

  if (!result.isConfirmed) return;

  try {
    const res = await fetch(
      `http://localhost:5194/api/Bookings/${id}/cancel`,
      {
        method: "PUT"
      }
    );

    if (!res.ok) {
      throw new Error();
    }

    Swal.fire({
      title: "Cancelled",
      text: "Booking cancelled successfully",
      icon: "success"
    });

    loadBookings();
  } catch {
    Swal.fire({
      title: "Error",
      text: "Failed to cancel booking",
      icon: "error"
    });
  }
};



  return (
    <div style={page}>
      <div style={header}>
        <h1 style={title}>
          My Bookings
        </h1>

        <p style={subtitle}>
          Track all your car rental
          bookings here
        </p>
      </div>

      {bookings.length === 0 ? (
        <div style={emptyBox}>
          <h2>No Bookings Found</h2>
          <p>
            You haven’t booked any car
            yet.
          </p>
        </div>
      ) : (
        <div style={grid}>
          {bookings.map((b) => (
            <div
              key={b.id}
              style={card}
            >
              <div style={top}>
                <div>
                  <h2
                    style={{
                      marginBottom:
                        "6px"
                    }}
                  >
                    {b.carName ||
                      `Car #${b.carId}`}
                  </h2>

                  <p
                    style={{
                      color:
                        "#94a3b8"
                    }}
                  >
                    {b.brand ||
                      "Premium Rental Car"}
                  </p>
                </div>

                <div
                  style={{
                    ...statusBadge,
                    ...getStatusStyle(
                      b.status
                    )
                  }}
                >
                  {b.status}
                </div>
              </div>

              <div style={detailsGrid}>
                <div style={detailBox}>
                  <p style={label}>
                    Pickup Date
                  </p>

                  <strong>
                    {new Date(
                      b.startDate
                    ).toLocaleDateString()}
                  </strong>
                </div>

                <div style={detailBox}>
                  <p style={label}>
                    Return Date
                  </p>

                  <strong>
                    {new Date(
                      b.endDate
                    ).toLocaleDateString()}
                  </strong>
                </div>

                <div style={detailBox}>
                  <p style={label}>
                    Pickup Time
                  </p>

                  <strong>
                    {b.time}
                  </strong>
                </div>

                <div style={detailBox}>
                  <p style={label}>
                    Driver
                  </p>

                  <strong>
                    {b.withDriver
                      ? "With Driver"
                      : "Self Drive"}
                  </strong>
                </div>
              </div>

             <div style={footer}>
  <div>
    <p style={label}>
      Total Amount
    </p>

    <h3 style={price}>
      ₹{b.totalAmount || "----"}
    </h3>
  </div>

  <div style={{ display: "flex", gap: "10px" }}>
    <button
      style={button}
      onClick={() => handleViewDetails(b.id)}
    >
      View Details
    </button>

    {(b.status === "Pending" ||
      b.status === "Approved") && (
      <button
        style={cancelBtn}
        onClick={() =>
          handleCancelBooking(b.id)
        }
      >
        Cancel
      </button>
    )}
  </div>
</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
const page = {
  minHeight: "100vh",
  background: "#05070f",
  padding: "28px",
  color: "white"
};

const header = {
  marginBottom: "24px"
};

const title = {
  fontSize: "34px",
  fontWeight: "700",
  marginBottom: "8px"
};

const subtitle = {
  color: "#94a3b8",
  fontSize: "15px"
};

const emptyBox = {
  textAlign: "center",
  padding: "60px 20px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.06)"
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(360px,1fr))",
  gap: "18px"
};

const card = {
  background:
    "linear-gradient(180deg, rgba(15,23,42,0.95), rgba(2,6,23,0.95))",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "18px",
  padding: "22px"
};

const top = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "18px"
};

const statusBadge = {
  padding: "8px 14px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: "600"
};

const detailsGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
  marginBottom: "20px"
};

const detailBox = {
  padding: "14px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.05)"
};

const label = {
  color: "#94a3b8",
  fontSize: "12px",
  marginBottom: "6px"
};

const footer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const price = {
  marginTop: "4px",
  fontSize: "24px",
  color: "#d4af6a"
};

const button = {
  padding: "12px 22px",
  border: "none",
  borderRadius: "12px",
  background:
    "linear-gradient(135deg,#d4af6a,#b8914e)",
  color: "black",
  fontWeight: "700",
  cursor: "pointer"
};
const cancelBtn = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "12px 20px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "600"
};