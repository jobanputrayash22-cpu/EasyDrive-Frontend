import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Requests() {
  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await fetch(
        "http://localhost:5194/api/Bookings/requests"
      );

      if (!res.ok) {
        Swal.fire({
          title: "Error",
          text: "Failed to load bookings",
          icon: "error"
        });
        return;
      }

      const data =
        await res.json();

      setBookings(data);
    } catch {
      Swal.fire({
        title: "Error",
        text: "Failed to load bookings",
        icon: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleView = (name) => {
    Swal.fire({
      title: "Booking Details",
      text: `${
        name || "Customer"
      } booking details viewed`,
      icon: "success",
      timer: 1200,
      showConfirmButton: false
    });
  };

  if (loading) {
    return (
      <h2 style={{ color: "white" }}>
        Loading bookings...
      </h2>
    );
  }

  return (
    <div style={page}>
      <h1 style={title}>
        Bookings Management
      </h1>

      <div style={tableBox}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>
                Customer
              </th>

              <th style={th}>
                Phone
              </th>

              <th style={th}>
                Car
              </th>

              <th style={th}>
                Driver
              </th>

              <th style={th}>
                Dates
              </th>

              <th style={th}>
                Pickup Time
              </th>

              <th style={th}>
                Amount
              </th>

              <th style={th}>
                Status
              </th>

              <th style={th}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings.map(
              (b, i) => (
                <tr key={i}>
                  <td style={td}>
                    <div
                      style={
                        userRow
                      }
                    >
                      <div
                        style={
                          avatar
                        }
                      >
                        {b.customerName
                          ?.charAt(
                            0
                          )
                          ?.toUpperCase()}
                      </div>

                      <div>
                        <div
                          style={
                            userName
                          }
                        >
                          {b.customerName ||
                            "User"}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td
                    style={
                      tdLight
                    }
                  >
                    {b.phone ||
                      "-"}
                  </td>

                  <td style={td}>
                    {b.carName ||
                      "-"}
                  </td>

                  <td style={td}>
                    {b.driverName ||
                      "Self Drive"}
                  </td>

                  <td style={td}>
                    {b.fromDate} →{" "}
                    {b.toDate}
                  </td>

                  <td style={td}>
                    {b.time ||
                      "-"}
                  </td>

                  <td style={td}>
                    ₹
                    {b.amount ||
                      0}
                  </td>

                  <td style={td}>
                    <span
                      style={
                        statusBadge
                      }
                    >
                      {b.status ||
                        "Pending"}
                    </span>
                  </td>

                  <td style={td}>
                    <button
                      style={
                        viewBtn
                      }
                      onClick={() =>
                        handleView(
                          b.customerName
                        )
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const page = {
  padding: "28px",
  background: "#05070f",
  minHeight: "100vh",
  color: "white"
};

const title = {
  fontSize: "34px",
  fontWeight: "800",
  marginBottom: "24px"
};

const tableBox = {
  background: "#0b0d17",
  borderRadius: "22px",
  border:
    "1px solid rgba(255,255,255,0.05)",
  overflow: "hidden"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const th = {
  textAlign: "left",
  padding: "22px 18px",
  color: "#6b7280",
  fontSize: "14px",
  textTransform: "uppercase",
  letterSpacing: "1px",
  borderBottom:
    "1px solid rgba(255,255,255,0.05)"
};

const td = {
  padding: "18px",
  borderBottom:
    "1px solid rgba(255,255,255,0.03)"
};

const tdLight = {
  ...td,
  color: "#94a3b8"
};

const userRow = {
  display: "flex",
  alignItems: "center",
  gap: "14px"
};

const avatar = {
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  background: "#d4b06a",
  color: "#111",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "700"
};

const userName = {
  fontWeight: "700",
  fontSize: "16px"
};

const statusBadge = {
  padding: "8px 16px",
  borderRadius: "999px",
  background:
    "rgba(16,185,129,0.12)",
  color: "#34d399",
  border:
    "1px solid rgba(16,185,129,0.2)",
  fontWeight: "700",
  fontSize: "14px"
};

const viewBtn = {
  padding: "10px 18px",
  borderRadius: "12px",
  border:
    "1px solid rgba(255,255,255,0.08)",
  background: "#151826",
  color: "#cbd5e1",
  fontWeight: "600",
  cursor: "pointer"
};