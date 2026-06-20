import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Bookings() {
  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [filter, setFilter] =
    useState("All");

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

  const updateStatus = async (id, action) => {
    try {
      const res = await fetch(
        `http://localhost:5194/api/Bookings/${id}/${action}`,
        {
          method: "PUT"
        }
      );

      if (!res.ok) {
        Swal.fire({
          title: "Error",
          text: "Status update failed",
          icon: "error"
        });
        return;
      }

      if (action === "approve") {
        Swal.fire({
          title: "Booking Approved ✅",
          icon: "success",
          timer: 1200,
          showConfirmButton: false
        });
      }

      if (action === "cancel") {
        Swal.fire({
          title: "Booking Cancelled ❌",
          icon: "success",
          timer: 1200,
          showConfirmButton: false
        });
      }

      if (action === "start") {
        Swal.fire({
          title: "Ride Started 🚗",
          icon: "success",
          timer: 1200,
          showConfirmButton: false
        });
      }

      if (action === "complete") {
        Swal.fire({
          title: "Ride Completed 🎉",
          icon: "success",
          timer: 1200,
          showConfirmButton: false
        });
      }

      loadBookings();
    } catch {
      Swal.fire({
        title: "Error",
        text: "Status update failed",
        icon: "error"
      });
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );
  };

  const filteredBookings =
    filter === "All"
      ? bookings
      : bookings.filter(
          (b) => b.status === filter
        );

  if (loading) {
    return (
      <h2 style={{ color: "white" }}>
        Loading...
      </h2>
    );
  }


  return (
    <div style={page}>
      <div style={topBar}>
        <h1 style={title}>
          Bookings
          Management
        </h1>

        <div style={filterWrap}>
          {[
            "All",
            "Pending",
            "Approved",
            "On Ride",
            "Completed",
            "Cancelled"
          ].map(
            (item) => (
              <button
                key={item}
                onClick={() =>
                  setFilter(
                    item
                  )
                }
                style={{
                  ...filterBtn,
                  ...(filter ===
                  item
                    ? activeFilter
                    : {})
                }}
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>

      <div style={tableBox}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>
                #
              </th>
              <th style={th}>
                Customer
              </th>
              <th style={th}>
                Car
              </th>
              <th style={th}>
                Driver
              </th>
              <th style={th}>
                Driver ID
              </th>
              <th style={th}>
                Dates
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
            {filteredBookings.map(
              (b, i) => (
                <tr
                  key={b.id}
                >
                  <td
                    style={td}
                  >
                    #{i + 1}
                  </td>

                  <td
                    style={
                      tdBold
                    }
                  >
                    {b.customerName ||
                      "Customer"}
                  </td>

                  <td
                    style={td}
                  >
                    🚗{" "}
                    {b.carName ||
                      "Unknown Car"}
                  </td>

                  <td
                    style={td}
                  >
                    {b.driverName ||
                      "Self Drive"}
                  </td>

                  <td
                    style={td}
                  >
                    {b.driverCode ||
                      "-"}
                  </td>

                  <td
                    style={td}
                  >
                    <div>
                      {formatDate(
                        b.fromDate
                      )}
                    </div>

                    <div>
                      {formatDate(
                        b.toDate
                      )}
                    </div>
                  </td>

                  <td
                    style={price}
                  >
                    ₹
                    {b.amount ||
                      0}
                  </td>

                  <td
                    style={td}
                  >
                    <span
                      style={{
                        ...statusBadge,
                        ...(b.status ===
                        "Pending"
                          ? pending
                          : b.status ===
                            "Approved"
                          ? approved
                          : b.status ===
                            "On Ride"
                          ? onRide
                          : b.status ===
                            "Completed"
                          ? completed
                          : cancelled)
                      }}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td
                    style={td}
                  >
                    <div
                      style={
                        actionWrap
                      }
                    >
                      {b.status ===
                        "Pending" && (
                        <>
                          <button
                            style={
                              approveBtn
                            }
                            onClick={() =>
                              updateStatus(
                                b.id,
                                "approve"
                              )
                            }
                          >
                            Approve
                          </button>

                          <button
                            style={
                              cancelBtn
                            }
                            onClick={() =>
                              updateStatus(
                                b.id,
                                "cancel"
                              )
                            }
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {b.status ===
                        "Approved" && (
                        <button
                          style={
                            startBtn
                          }
                          onClick={() =>
                            updateStatus(
                              b.id,
                              "start"
                            )
                          }
                        >
                          Start
                          Ride
                        </button>
                      )}

                      {b.status ===
                        "On Ride" && (
                        <button
                          style={
                            completeBtn
                          }
                          onClick={() =>
                            updateStatus(
                              b.id,
                              "complete"
                            )
                          }
                        >
                          Complete
                          Ride
                        </button>
                      )}
                    </div>
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
  color: "white",
  minHeight: "100vh",
  background: "#05070f"
};

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "28px"
};

const title = {
  fontSize: "34px",
  fontWeight: "800"
};

const filterWrap = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap"
};

const filterBtn = {
  padding: "12px 18px",
  borderRadius: "14px",
  border:
    "1px solid rgba(255,255,255,0.08)",
  background: "#151826",
  color: "#cbd5e1",
  cursor: "pointer"
};

const activeFilter = {
  border:
    "1px solid rgba(212,176,106,0.3)",
  color: "#d4b06a"
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
  padding: "20px 18px",
  borderBottom:
    "1px solid rgba(255,255,255,0.03)",
  color: "#cbd5e1"
};

const tdBold = {
  ...td,
  fontWeight: "700",
  color: "white"
};

const price = {
  ...td,
  fontWeight: "700",
  color: "#d4b06a",
  fontSize: "18px"
};

const statusBadge = {
  padding: "8px 16px",
  borderRadius: "999px",
  fontWeight: "700",
  fontSize: "14px",
  display: "inline-block"
};

const pending = {
  background:
    "rgba(245,158,11,0.12)",
  color: "#f59e0b",
  border:
    "1px solid rgba(245,158,11,0.2)"
};

const approved = {
  background:
    "rgba(59,130,246,0.12)",
  color: "#3b82f6",
  border:
    "1px solid rgba(59,130,246,0.2)"
};

const onRide = {
  background:
    "rgba(139,92,246,0.12)",
  color: "#8b5cf6",
  border:
    "1px solid rgba(139,92,246,0.2)"
};

const completed = {
  background:
    "rgba(16,185,129,0.12)",
  color: "#34d399",
  border:
    "1px solid rgba(16,185,129,0.2)"
};

const cancelled = {
  background:
    "rgba(239,68,68,0.12)",
  color: "#ef4444",
  border:
    "1px solid rgba(239,68,68,0.2)"
};

const actionWrap = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};

const approveBtn = {
  padding: "10px 14px",
  borderRadius: "12px",
  border:
    "1px solid rgba(59,130,246,0.2)",
  background:
    "rgba(59,130,246,0.08)",
  color: "#3b82f6",
  cursor: "pointer",
  fontWeight: "600"
};

const startBtn = {
  padding: "10px 14px",
  borderRadius: "12px",
  border:
    "1px solid rgba(139,92,246,0.2)",
  background:
    "rgba(139,92,246,0.08)",
  color: "#8b5cf6",
  cursor: "pointer",
  fontWeight: "600"
};

const completeBtn = {
  padding: "10px 14px",
  borderRadius: "12px",
  border:
    "1px solid rgba(16,185,129,0.2)",
  background:
    "rgba(16,185,129,0.08)",
  color: "#34d399",
  cursor: "pointer",
  fontWeight: "600"
};

const cancelBtn = {
  padding: "10px 14px",
  borderRadius: "12px",
  border:
    "1px solid rgba(239,68,68,0.2)",
  background:
    "rgba(239,68,68,0.08)",
  color: "#ef4444",
  cursor: "pointer",
  fontWeight: "600"
};