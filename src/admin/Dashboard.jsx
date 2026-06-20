import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Dashboard() {
  const [stats, setStats] = useState({
    cars: 0,
    drivers: 0,
    requests: 0,
    bookings: 0,
    revenue: 0,
    confirmed: 0,
    completed: 0
  });

  const [recentBookings, setRecentBookings] =
    useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await fetch(
        "http://localhost:5194/api/Dashboard"
      );

      if (!res.ok) {
        Swal.fire({
          title: "Error",
          text: "Failed to load dashboard",
          icon: "error"
        });
        return;
      }

      const data = await res.json();

      setStats({
        cars: data.totalCars,
        drivers: data.totalDrivers,
        bookings: data.totalBookings,
        requests: data.pendingRequests,
        revenue: data.totalRevenue,
        confirmed: data.approvedBookings,
        completed: data.completedRides
      });

      setRecentBookings(
        data.recentBookings || []
      );
    } catch (e) {
      console.log("Dashboard error", e);

      Swal.fire({
        title: "Error",
        text: "Failed to load dashboard",
        icon: "error"
      });
    }
  };

  const cards = [
    {
      title: "Total Cars",
      value: stats.cars,
      icon: "🚗",
      color: "#d4b06a"
    },
    {
      title: "Total Drivers",
      value: stats.drivers,
      icon: "👤",
      color: "#8b5cf6"
    },
    {
      title: "Pending Requests",
      value: stats.requests,
      icon: "⏳",
      color: "#f59e0b"
    },
    {
      title: "Total Bookings",
      value: stats.bookings,
      icon: "📅",
      color: "#22c55e"
    },
    {
      title: "Approved",
      value: stats.confirmed,
      icon: "✅",
      color: "#10b981"
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: "🏁",
      color: "#3b82f6"
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue}`,
      icon: "💰",
      color: "#34d399"
    }
  ];


  return (
    <div style={page}>
      <h1 style={title}>
        Dashboard Overview
      </h1>

      <div style={cardGrid}>
        {cards.map(
          (c, i) => (
            <div
              key={i}
              style={card}
            >
              <div
                style={
                  topIcon
                }
              >
                {c.icon}
              </div>

              <p
                style={
                  cardTitle
                }
              >
                {c.title}
              </p>

              <h2
                style={{
                  ...cardValue,
                  color:
                    c.color
                }}
              >
                {c.value}
              </h2>
            </div>
          )
        )}
      </div>

      <div
        style={
          middleSection
        }
      >
        <div
          style={chartBox}
        >
          <h2
            style={
              sectionTitle
            }
          >
            Monthly Revenue
          </h2>

          <div
            style={bars}
          >
            {[
              45, 62, 38, 10,
              55, 80
            ].map(
              (v, i) => (
                <div
                  key={i}
                  style={
                    barWrapper
                  }
                >
                  <div
                    style={{
                      ...bar,
                      height: `${v * 2}px`
                    }}
                  />

                  <span
                    style={
                      monthText
                    }
                  >
                    {
                      [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun"
                      ][i]
                    }
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        <div
          style={
            statusBox
          }
        >
          <h2
            style={
              sectionTitle
            }
          >
            Bookings Status
          </h2>

          <StatusRow
            title="Pending"
            value={
              stats.requests
            }
            color="#f59e0b"
          />

          <StatusRow
            title="Approved"
            value={
              stats.confirmed
            }
            color="#10b981"
          />

          <StatusRow
            title="Completed"
            value={
              stats.completed
            }
            color="#3b82f6"
          />
        </div>
      </div>

      <div style={tableBox}>
        <h2
          style={
            sectionTitle
          }
        >
          Recent Bookings
        </h2>

        <table style={table}>
          <thead>
            <tr>
              <th style={th}>
                Customer
              </th>
              <th style={th}>
                Car
              </th>
              <th style={th}>
                Status
              </th>
              <th style={th}>
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {recentBookings.map(
              (b, i) => (
                <tr
                  key={i}
                >
                  <td
                    style={td}
                  >
                    {b.customerName ||
                      "Customer"}
                  </td>

                  <td
                    style={td}
                  >
                    {b.carName ||
                      `Car #${b.carId}`}
                  </td>

                  <td
                    style={td}
                  >
                    {b.status ||
                      "Pending"}
                  </td>

                  <td
                    style={td}
                  >
                    ₹
                    {b.totalAmount ||
                      b.amount ||
                      0}
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

function StatusRow({
  title,
  value,
  color
}) {
  return (
    <div
      style={{
        marginBottom:
          "22px"
      }}
    >
      <div
        style={statusTop}
      >
        <span>{title}</span>
        <span>{value}</span>
      </div>

      <div
        style={progressBg}
      >
        <div
          style={{
            ...progressFill,
            width: `${Math.min(
              value * 20,
              100
            )}%`,
            background:
              color
          }}
        />
      </div>
    </div>
  );
}
/* ---------- STYLES ---------- */

const page = {
  minHeight: "100vh",
  background: "#05070f",
  color: "white",
  padding: "30px"
};

const title = {
  fontSize: "42px",
  fontWeight: "800",
  marginBottom: "30px"
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "18px",
  marginBottom: "25px"
};

const card = {
  background:
    "linear-gradient(145deg,#0b1020,#111827)",
  border:
    "1px solid rgba(255,255,255,0.06)",
  borderRadius: "18px",
  padding: "20px",
  minHeight: "150px",
  position: "relative",
  boxShadow:
    "0 15px 35px rgba(0,0,0,0.35)"
};

const topIcon = {
  position: "absolute",
  right: "16px",
  top: "14px",
  fontSize: "24px"
};

const cardTitle = {
  fontSize: "13px",
  color: "#6b7280",
  marginBottom: "10px",
  textTransform: "uppercase",
  letterSpacing: "1px"
};

const cardValue = {
  fontSize: "30px",
  fontWeight: "800"
};

const middleSection = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "24px",
  marginBottom: "30px"
};

const chartBox = {
  background: "#0b0f1a",
  borderRadius: "20px",
  padding: "28px",
  border:
    "1px solid rgba(255,255,255,0.05)"
};

const statusBox = {
  background: "#0b0f1a",
  borderRadius: "20px",
  padding: "28px",
  border:
    "1px solid rgba(255,255,255,0.05)"
};

const sectionTitle = {
  fontSize: "24px",
  fontWeight: "700",
  marginBottom: "25px"
};

const bars = {
  display: "flex",
  alignItems: "end",
  gap: "20px",
  height: "260px"
};

const barWrapper = {
  flex: 1,
  textAlign: "center"
};

const bar = {
  width: "100%",
  background: "#d4b06a",
  borderRadius: "10px 10px 0 0"
};

const monthText = {
  display: "block",
  marginTop: "10px",
  color: "#9ca3af"
};

const statusTop = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "8px"
};

const progressBg = {
  width: "100%",
  height: "8px",
  background: "#1f2937",
  borderRadius: "999px"
};

const progressFill = {
  height: "100%",
  borderRadius: "999px"
};

const tableBox = {
  background: "#0b0f1a",
  borderRadius: "20px",
  padding: "28px",
  border:
    "1px solid rgba(255,255,255,0.05)"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const th = {
  textAlign: "left",
  padding: "14px 10px",
  color: "#6b7280",
  borderBottom:
    "1px solid rgba(255,255,255,0.08)"
};

const td = {
  padding: "16px 10px",
  borderBottom:
    "1px solid rgba(255,255,255,0.05)"
};