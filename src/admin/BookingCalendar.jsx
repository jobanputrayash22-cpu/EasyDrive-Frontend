import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Swal from "sweetalert2";

export default function BookingCalendar() {
  const [events, setEvents] =
    useState([]);

  useEffect(() => {
    loadCalendar();
  }, []);

  const loadCalendar = async () => {
    try {
      const res = await fetch(
        "http://localhost:5194/api/Bookings/calendar"
      );

      if (!res.ok) {
        Swal.fire({
          title: "Error",
          text: "Failed to load calendar",
          icon: "error"
        });
        return;
      }

      const data =
        await res.json();

      const styledEvents =
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

      setEvents(styledEvents);
    } catch {
      Swal.fire({
        title: "Error",
        text: "Failed to load calendar",
        icon: "error"
      });
    }
  };


  return (
    <div style={page}>
      <h1 style={title}>
        📅 Booking
        Calendar
      </h1>

      <div
        style={calendarBox}
      >
        <FullCalendar
          plugins={[
            dayGridPlugin,
            interactionPlugin
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
        />
      </div>
    </div>
  );
}
const page = {
  minHeight: "100vh",
  background: "#05070f",
  padding: "30px",
  color: "white"
};

const title = {
  fontSize: "38px",
  marginBottom: "30px"
};

const calendarBox = {
  background: "#0b0d17",
  padding: "24px",
  borderRadius: "18px"
};