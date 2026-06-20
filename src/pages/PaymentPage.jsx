import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function PaymentPage() {
  const nav = useNavigate();
  const { state } = useLocation();

  const [selectedMethod, setSelectedMethod] =
    useState("UPI / PhonePe / GPay");

  const paymentMethods = [
    { icon: "📱", name: "UPI / PhonePe / GPay" },
    { icon: "💳", name: "Credit Card" },
    { icon: "💳", name: "Debit Card" },
    { icon: "🏦", name: "Net Banking" },
    { icon: "💵", name: "Pay at Pickup" }
  ];

  if (!state) {
    return (
      <h2
        style={{
          color: "white",
          padding: 30
        }}
      >
        No booking data found
      </h2>
    );
  }

  // PAY NOW
  const handlePayment = () => {
    Swal.fire({
      title: `Payment Successful via ${selectedMethod}!`,
      icon: "success",
      timer: 1200,
      showConfirmButton: false
    });

    const bookingId =
      state.bookingId || 1;

    setTimeout(() => {
      nav(`/invoice/${bookingId}`);
    }, 1200);
  };

  // PAY LATER
  const handlePayLater = () => {
    Swal.fire({
      title: "Booking saved with Pay Later",
      icon: "info",
      timer: 1200,
      showConfirmButton: false
    });

    const bookingId =
      state.bookingId || 1;

    setTimeout(() => {
      nav(`/invoice/${bookingId}`);
    }, 1200);
  };

  return (
    <div style={page}>
      <h1 style={title}>
        Complete Payment
      </h1>

      <div style={layout}>
        {/* LEFT */}
        <div>
          {/* Booking Summary */}
          <div style={card}>
            <h2 style={sectionTitle}>
              Booking Summary
            </h2>

            <div style={row}>
              <span style={muted}>
                Car
              </span>
              <b>{state.carName}</b>
            </div>

            <div style={row}>
              <span style={muted}>
                Dates
              </span>
              <b>
                {state.fromDate} →{" "}
                {state.toDate}
              </b>
            </div>

            <div style={row}>
              <span style={muted}>
                Duration
              </span>
              <b>
                {state.totalDays} days
              </b>
            </div>

            <div style={row}>
              <span style={muted}>
                Driver
              </span>
              <b>
                {state.withDriver
                  ? state.selectedDriver
                  : "Self Drive"}
              </b>
            </div>
          </div>

          {/* Payment Method */}
          <div style={card}>
            <h2 style={sectionTitle}>
              Payment Method
            </h2>

            {paymentMethods.map(
              (item, index) => (
                <div
                  key={index}
                  onClick={() =>
                    setSelectedMethod(
                      item.name
                    )
                  }
                  style={{
                    ...methodBox,
                    border:
                      selectedMethod ===
                      item.name
                        ? "2px solid #c8a96e"
                        : "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "space-between",
                    cursor: "pointer"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: "12px"
                    }}
                  >
                    <span
                      style={{
                        fontSize:
                          "22px"
                      }}
                    >
                      {item.icon}
                    </span>

                    <span
                      style={{
                        fontSize:
                          "14px",
                        fontWeight:
                          "500"
                      }}
                    >
                      {item.name}
                    </span>
                  </div>

                  {selectedMethod ===
                    item.name && (
                    <span
                      style={{
                        color:
                          "#c8a96e",
                        fontSize:
                          "22px",
                        fontWeight:
                          "700"
                      }}
                    >
                      ✓
                    </span>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div style={summaryCard}>
          <h2 style={sectionTitle}>
            Amount Due
          </h2>

          <div style={amount}>
            ₹{state.total}
          </div>

          <p style={mutedCenter}>
            for {state.totalDays} days
          </p>

          <div style={secureBox}>
            🔒 Secure simulated payment
            gateway.
            <br />
            No real charges.
          </div>

          {/* PAY NOW */}
          <button
            style={payBtn}
            onClick={handlePayment}
          >
            Pay ₹{state.total}
          </button>

          {/* PAY LATER */}
          <button
            style={laterBtn}
            onClick={handlePayLater}
          >
            Pay Later
          </button>
        </div>
      </div>
    </div>
  );
}
/* STYLES */

const page = {
  minHeight: "100vh",
  background: "#05070f",
  padding: "16px",
  color: "white",
  maxWidth: "1050px",
  margin: "0 auto"
};

const title = {
  fontSize: "22px",
  fontWeight: "700",
  marginBottom: "18px"
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

const row = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
  alignItems: "center",
  fontSize: "13px"
};

const muted = {
  color: "#9ca3af",
  fontSize: "12px"
};

const mutedCenter = {
  color: "#9ca3af",
  textAlign: "center",
  fontSize: "12px",
  marginBottom: "14px"
};

const methodBox = {
  padding: "14px",
  borderRadius: "12px",
  marginBottom: "10px",
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.08)",
  cursor: "pointer",
  fontSize: "13px"
};

const amount = {
  fontSize: "34px",
  fontWeight: "700",
  color: "#c8a96e",
  textAlign: "center",
  marginTop: "10px",
  marginBottom: "6px"
};

const payBtn = {
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(135deg,#c8a96e,#a8894e)",
  fontWeight: "600",
  fontSize: "13px",
  cursor: "pointer",
  marginBottom: "10px"
};

const laterBtn = {
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "transparent",
  color: "white",
  fontSize: "13px",
  cursor: "pointer"
};

const secureBox = {
  padding: "12px",
  borderRadius: "12px",
  background: "rgba(16,185,129,0.08)",
  border: "1px solid rgba(16,185,129,0.2)",
  color: "#34d399",
  fontSize: "12px",
  margin: "14px 0"
};