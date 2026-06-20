import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function DriverLogin() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Swal.fire({
        title: "Warning",
        text:
          "Please enter username and password",
        icon: "warning"
      });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5194/api/Drivers/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            username,
            password
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          title: "Error",
          text: data || "Login failed",
          icon: "error"
        });
        return;
      }

      // SAVE DRIVER LOGIN
      localStorage.setItem(
        "driver",
        JSON.stringify(data)
      );

      // ✅ SUCCESS AUTO CLOSE
      Swal.fire({
        title:
          "Driver Login Success ✅",
        icon: "success",
        timer: 1200,
        showConfirmButton: false
      });

      setTimeout(() => {
        navigate("/driver-dashboard");
      }, 1200);
    } catch {
      Swal.fire({
        title: "Error",
        text: "Server error",
        icon: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>
          Driver Login
        </h1>

        <p style={subtitle}>
          Login to access your
          assigned rides
        </p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={input}
        />

        <button
          style={button}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <button
          style={backBtn}
          onClick={() =>
            navigate("/")
          }
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
/* ===== STYLES ===== */

const page = {
  minHeight: "100vh",
  background: "#05070f",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px"
};

const card = {
  width: "100%",
  maxWidth: "420px",
  background:
    "rgba(255,255,255,0.03)",
  border:
    "1px solid rgba(255,255,255,0.06)",
  borderRadius: "18px",
  padding: "32px",
  color: "white"
};

const title = {
  margin: 0,
  fontSize: "30px",
  fontWeight: "700",
  marginBottom: "10px",
  textAlign: "center"
};

const subtitle = {
  color: "#94a3b8",
  textAlign: "center",
  marginBottom: "28px",
  fontSize: "14px"
};

const input = {
  width: "100%",
  padding: "14px",
  marginBottom: "16px",
  borderRadius: "12px",
  border:
    "1px solid rgba(255,255,255,0.08)",
  background: "#0f172a",
  color: "white",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box"
};

const button = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "12px",
  background:
    "linear-gradient(135deg,#d4af6a,#b8914e)",
  fontWeight: "700",
  fontSize: "15px",
  cursor: "pointer",
  marginTop: "8px"
};

const backBtn = {
  width: "100%",
  padding: "13px",
  marginTop: "12px",
  borderRadius: "12px",
  border:
    "1px solid rgba(255,255,255,0.08)",
  background: "transparent",
  color: "white",
  cursor: "pointer"
};