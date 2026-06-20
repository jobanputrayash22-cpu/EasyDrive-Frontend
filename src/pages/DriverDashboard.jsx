import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function DriverDashboard() {
  const [rides, setRides] =
    useState([]);

  const [driverName, setDriverName] =
    useState("");

  const [stats, setStats] = useState({
    totalRides: 0,
    completedRides: 0,
    activeRides: 0,
    totalEarnings: 0
  });

  useEffect(() => {
    loadRides();
  }, []);

  const loadRides = async () => {
    try {
      const driverData = JSON.parse(
        localStorage.getItem("driver")
      );

      const driverId =
        driverData?.driverId || 1;

      const driverName =
        driverData?.name || "Driver";

      setDriverName(driverName);

      const res = await fetch(
        `http://localhost:5194/api/Bookings/driver/${driverId}`
      );

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load rides"
        });

        return;
      }

      const data = await res.json();

      setRides(data);

      const completed = data.filter(
        (x) =>
          x.status ===
          "Completed"
      );

      const active = data.filter(
        (x) =>
          x.status ===
            "Approved" ||
          x.status ===
            "On Ride"
      );

      const earnings =
        completed.reduce(
          (sum, x) =>
            sum +
            ((x.totalAmount ||
              0) *
              0.2),
          0
        );

      setStats({
        totalRides: data.length,
        completedRides:
          completed.length,
        activeRides:
          active.length,
        totalEarnings:
          earnings
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to load rides"
      });
    }
  };

  const updateRide = async (
    id,
    action
  ) => {
    try {
      const res = await fetch(
        `http://localhost:5194/api/Bookings/${id}/${action}`,
        {
          method: "PUT"
        }
      );

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Action Failed",
          text:
            "Something went wrong"
        });

        return;
      }

      if (action === "start") {
        Swal.fire({
          icon: "success",
          title:
            "Ride Started 🚗",
          showConfirmButton: false,
          timer: 1500
        });
      }

      if (
        action === "complete"
      ) {
        Swal.fire({
          icon: "success",
          title:
            "Ride Completed ✅",
          showConfirmButton: false,
          timer: 1500
        });
      }

      loadRides();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Action Failed",
        text:
          "Something went wrong"
      });
    }
  };

  const logout = () => {
    localStorage.removeItem(
      "driver"
    );

    Swal.fire({
      icon: "success",
      title: "Logged Out",
      text:
        "Logged out successfully",
      showConfirmButton: false,
      timer: 1500
    });

    setTimeout(() => {
      window.location.href =
        "/";
    }, 1500);
  };

  return (
    <div style={page}>
      <div style={topBar}>
        <div>
          <h1 style={title}>
            Driver Dashboard
          </h1>

          <p style={subtitle}>
            Welcome, {driverName}
          </p>
        </div>

        <button
          style={logoutBtn}
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <div style={statsGrid}>
        <div style={statCard}>
          <h3>Total Rides</h3>
          <h2>
            {stats.totalRides}
          </h2>
        </div>

        <div style={statCard}>
          <h3>Completed</h3>
          <h2>
            {
              stats.completedRides
            }
          </h2>
        </div>

        <div style={statCard}>
          <h3>Active</h3>
          <h2>
            {stats.activeRides}
          </h2>
        </div>

        <div style={statCard}>
          <h3>
            Total Earnings
          </h3>
          <h2>
            ₹
            {
              stats.totalEarnings
            }
          </h2>
        </div>
      </div>

      {rides.length === 0 ? (
        <div style={emptyBox}>
          No rides assigned
        </div>
      ) : (
        rides.map((ride) => (
          <div
            key={ride.id}
            style={card}
          >
            <h2>
              {ride.carName}
            </h2>

            <p>
              Customer:
              <b>
                {" "}
                {
                  ride.customerName
                }
              </b>
            </p>

            <p>
              Phone:
              <b>
                {" "}
                {ride.phone}
              </b>
            </p>

            <p>
              Dates:
              <b>
                {" "}
                {
                  ride.fromDate
                }{" "}
                →{" "}
                {ride.toDate}
              </b>
            </p>

            <p>
              Pickup Time:
              <b>
                {" "}
                {ride.time}
              </b>
            </p>

            <p>
              Pickup Location:
              <b>
                {" "}
                {ride.pickupLocation ||
                  "Not Provided"}
              </b>
            </p>

            <p>
              Payment Status:
              <b>
                {" "}
                {ride.paymentStatus ||
                  "Pending"}
              </b>
            </p>

            <p>
              Status:
              <b>
                {" "}
                {ride.status}
              </b>
            </p>

            <p>
              Amount:
              <b>
                ₹
                {
                  ride.totalAmount
                }
              </b>
            </p>

            <div style={btns}>
              {ride.status ===
                "Approved" && (
                <button
                  style={startBtn}
                  onClick={() =>
                    updateRide(
                      ride.id,
                      "start"
                    )
                  }
                >
                  Start Ride
                </button>
              )}

              {ride.status ===
                "On Ride" && (
                <button
                  style={
                    completeBtn
                  }
                  onClick={() =>
                    updateRide(
                      ride.id,
                      "complete"
                    )
                  }
                >
                  Complete Ride
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
/* STYLES */

const page = {
  minHeight: "100vh",
  background: "#05070f",
  padding: "30px",
  color: "white"
};

const topBar = {
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center",
  marginBottom: "30px"
};

const title = {
  fontSize: "38px",
  marginBottom: "8px"
};

const subtitle = {
  color: "#9ca3af",
  fontSize: "16px"
};

const logoutBtn = {
  padding: "12px 20px",
  border: "none",
  borderRadius: "12px",
  background: "#ef4444",
  color: "white",
  cursor: "pointer"
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
  marginBottom: "30px"
};

const statCard = {
  background: "#0b0d17",
  padding: "24px",
  borderRadius: "18px",
  border:
    "1px solid rgba(255,255,255,0.08)"
};

const emptyBox = {
  padding: "40px",
  background: "#0b0d17",
  borderRadius: "18px"
};

const card = {
  background: "#0b0d17",
  padding: "24px",
  borderRadius: "18px",
  marginBottom: "20px",
  border:
    "1px solid rgba(255,255,255,0.08)"
};

const btns = {
  display: "flex",
  gap: "12px",
  marginTop: "20px"
};

const startBtn = {
  padding: "12px 20px",
  border: "none",
  borderRadius: "12px",
  background: "#10b981",
  color: "white",
  cursor: "pointer"
};

const completeBtn = {
  padding: "12px 20px",
  border: "none",
  borderRadius: "12px",
  background: "#3b82f6",
  color: "white",
  cursor: "pointer"
};