import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Swal from "sweetalert2";
export default function AdminCalendar() {
  const [events, setEvents] =
    useState([]);

  const [selected, setSelected] =
    useState(null);


useEffect(() => {
  fetch(
    "http://localhost:5194/api/Bookings/calendar"
  )
    .then((r) => r.json())
    .then((data) => {
      const styled =
        data.map((e) => {
          let color = "#6366f1";

          if (e.status === "Pending") {
            color = "#f59e0b";
          }

          if (e.status === "Approved") {
            color = "#10b981";
          }

          if (e.status === "On Ride") {
            color = "#3b82f6";
          }

          if (e.status === "Completed") {
            color = "#64748b";
          }

          if (
            e.status === "Cancelled" ||
            e.status === "Declined"
          ) {
            color = "#ef4444";
          }

          return {
            ...e,
            backgroundColor: color,
            borderColor: color,
            textColor: "white"
          };
        });

      setEvents(styled);
    })
    .catch(() => {
      Swal.fire({
        title: "Error",
        text: "Failed to load calendar",
        icon: "error"
      });
    });
}, []);
  return (
    <div style={page}>
      <h2 style={title}>
        📅 Booking
        Calendar
      </h2>

      <div style={card}>
        <FullCalendar
          plugins={[
            dayGridPlugin
          ]}
          initialView="dayGridMonth"
          events={events}
          height="auto"
          displayEventTime={
            false
          }
          dayMaxEvents={
            true
          }
          nowIndicator={
            true
          }
          headerToolbar={{
            left:
              "prev,next today",
            center:
              "title",
            right:
              "dayGridMonth"
          }}
          eventClick={(
            info
          ) => {
            setSelected({
              ...info.event
                .extendedProps,
              title:
                info.event
                  .title,
              start:
                info.event
                  .startStr,
              end:
                info.event
                  .endStr
            });
          }}
        />
      </div>

      {/* POPUP */}
      {selected && (
        <div
          style={popupBg}
        >
          <div
            style={popup}
          >
            <h3
              style={{
                marginBottom: 14
              }}
            >
              🚗{" "}
              {
                selected.title
              }
            </h3>

            <p>
              <b>
                Customer:
              </b>{" "}
              {
                selected.customer
              }
            </p>

            <p>
              <b>
                Phone:
              </b>{" "}
              {
                selected.phone
              }
            </p>

            <p>
              <b>
                Driver:
              </b>{" "}
              {selected.driver
                ? "With Driver"
                : "Self Drive"}
            </p>

            <p>
              <b>
                Pickup Time:
              </b>{" "}
              {
                selected.pickupTime
              }
            </p>

            <p>
              <b>
                Status:
              </b>{" "}
              {
                selected.status
              }
            </p>

            <p>
              <b>
                Start Date:
              </b>{" "}
              {
                selected.start
              }
            </p>

            <p>
              <b>
                End Date:
              </b>{" "}
              {
                selected.end
              }
            </p>

            <button
              onClick={() =>
                setSelected(
                  null
                )
              }
              style={btn}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
const page = {
  minHeight: "100vh",
  background: "#05070f",
  padding: "25px",
  color: "white"
};

const title = {
  fontSize: "30px",
  fontWeight: "700",
  marginBottom: "20px"
};

const card = {
  background:
    "rgba(255,255,255,0.04)",
  padding: "22px",
  borderRadius: "18px",
  backdropFilter: "blur(18px)",
  border:
    "1px solid rgba(255,255,255,0.08)",
  boxShadow:
    "0 20px 40px rgba(0,0,0,0.5)"
};

const popupBg = {
  position: "fixed",
  inset: 0,
  background:
    "rgba(0,0,0,0.75)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999
};

const popup = {
  background: "#0f172a",
  padding: "28px",
  borderRadius: "16px",
  width: "360px",
  color: "white",
  border:
    "1px solid rgba(255,255,255,0.08)",
  boxShadow:
    "0 20px 50px rgba(0,0,0,0.8)"
};

const btn = {
  marginTop: "18px",
  padding: "12px 20px",
  border: "none",
  background:
    "linear-gradient(135deg,#6366f1,#8b5cf6)",
  color: "white",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  width: "100%"
};