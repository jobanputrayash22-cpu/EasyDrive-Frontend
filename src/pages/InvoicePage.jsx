import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate
} from "react-router-dom";

import Swal from "sweetalert2";

export default function InvoicePage() {
  const { id } = useParams();

  const nav = useNavigate();

  const [invoice, setInvoice] =
    useState(null);

  useEffect(() => {
    loadInvoice();
  }, []);

  const loadInvoice = async () => {
    try {
      const res = await fetch(
        `http://localhost:5194/api/Invoice/${id}`
      );

      if (!res.ok) {
        Swal.fire({
          title: "Error",
          text: "Failed to load invoice",
          icon: "error"
        });

        return;
      }

      const data = await res.json();

      setInvoice(data);
    } catch {
      Swal.fire({
        title: "Error",
        text: "Failed to load invoice",
        icon: "error"
      });
    }
  };

  const handlePrint = () => {
    Swal.fire({
      title: "Preparing Invoice...",
      icon: "info",
      timer: 1000,
      showConfirmButton: false
    });

    setTimeout(() => {
      const win = window.open(
        "",
        "",
        "width=900,height=900"
      );

      win.document.write(`
        <html>
          <head>
            <title>Invoice</title>

            <style>
              body{
                font-family: Arial;
                padding:40px;
                background:white;
                color:#111;
              }

              h1{
                margin-bottom:20px;
              }

              hr{
                margin:20px 0;
              }

              .price{
                color:#c8a96e;
                font-weight:bold;
                font-size:26px;
              }

              p{
                margin:12px 0;
                font-size:16px;
              }
            </style>
          </head>

          <body>
            ${
              document.getElementById(
                "invoiceArea"
              ).innerHTML
            }
          </body>
        </html>
      `);

      win.document.close();

      win.print();
    }, 1000);
  };

  if (!invoice) {
    return (
      <h2 style={{ color: "white" }}>
        Loading...
      </h2>
    );
  }

  return (
    <div style={page}>
      <div
        style={card}
        id="invoiceArea"
      >
        <h1 style={title}>
          Invoice Receipt
        </h1>

        <p>
          Invoice No:
          <b>
            {" "}
            {invoice.invoiceNo}
          </b>
        </p>

        <hr />

        <p>
          Customer:
          <b>
            {" "}
            {invoice.customerName}
          </b>
        </p>

        <p>
          Phone:
          <b>
            {" "}
            {invoice.phone}
          </b>
        </p>

        <p>
          Car:
          <b>
            {" "}
            {invoice.carName}
          </b>
        </p>

        <p>
          Brand:
          <b>
            {" "}
            {invoice.brand}
          </b>
        </p>

        <p>
          Dates:
          <b>
            {" "}
            {invoice.fromDate} →{" "}
            {invoice.toDate}
          </b>
        </p>

        <p>
          Driver:
          <b>
            {" "}
            {invoice.withDriver
              ? "With Driver"
              : "Self Drive"}
          </b>
        </p>

        <hr />

        <p>
          Subtotal:
          <b>
            {" "}
            ₹{invoice.subtotal}
          </b>
        </p>

        <h2>
          Final Amount:
          <span style={price}>
            {" "}
            ₹
            {invoice.finalAmount}
          </span>
        </h2>

        <button
          style={printBtn}
          onClick={handlePrint}
        >
          Download / Print PDF
        </button>

        {/* BACK HOME BUTTON */}

        <button
          style={backBtn}
          onClick={() => nav("/")}
        >
          Back Home
        </button>
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

const card = {
  maxWidth: "700px",
  margin: "0 auto",
  background: "#0b0d17",
  padding: "30px",
  borderRadius: "20px",
  border:
    "1px solid rgba(255,255,255,0.08)"
};

const title = {
  fontSize: "34px",
  marginBottom: "20px"
};

const price = {
  color: "#d4b06a"
};

const printBtn = {
  marginTop: "30px",
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "12px",
  background: "#d4b06a",
  fontWeight: "700",
  cursor: "pointer",
  marginBottom: "12px"
};

const backBtn = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border:
    "1px solid rgba(255,255,255,0.08)",
  background: "transparent",
  color: "white",
  fontWeight: "600",
  cursor: "pointer"
};