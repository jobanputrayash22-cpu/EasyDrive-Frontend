import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AddDriver() {
  const [showForm, setShowForm] = useState(false);
  const [drivers, setDrivers] = useState([]);

  const [driver, setDriver] = useState({
    name: "",
    phone: "",
    licenseNumber: "",
    experienceYears: "",
    address: "",
    photoUrl: "",
    username: "",
    password: ""
  });

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    try {
      const res = await fetch("http://localhost:5194/api/Drivers");
      const data = await res.json();
      setDrivers(data);
    } catch {
      Swal.fire({
        title: "Error",
        text: "Failed to load drivers",
        icon: "error"
      });
    }
  };

  const handleChange = (e) => {
    setDriver({
      ...driver,
      [e.target.name]: e.target.value
    });
  };

  const saveDriver = async () => {
    if (
      !driver.name ||
      !driver.phone ||
      !driver.licenseNumber ||
      !driver.username ||
      !driver.password
    ) {
      Swal.fire({
        title: "Warning",
        text: "Fill all required fields",
        icon: "warning"
      });
      return;
    }

    const payload = {
      name: driver.name,
      phone: driver.phone,
      licenseNumber: driver.licenseNumber,
      experienceYears: Number(driver.experienceYears) || 0,
      address: driver.address,
      photoUrl: driver.photoUrl,
      username: driver.username,
      password: driver.password,
      available: true
    };

    try {
      const res = await fetch("http://localhost:5194/api/Drivers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.text();
        console.log("Backend error:", err);

        Swal.fire({
          title: "Error",
          text: err || "Failed to save driver",
          icon: "error"
        });
        return;
      }

      Swal.fire({
        title: "Driver Added Successfully ✅",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });

      setDriver({
        name: "",
        phone: "",
        licenseNumber: "",
        experienceYears: "",
        address: "",
        photoUrl: "",
        username: "",
        password: ""
      });

      setShowForm(false);
      loadDrivers();
    } catch {
      Swal.fire({
        title: "Error",
        text: "Failed to save driver",
        icon: "error"
      });
    }
  };

  const deleteDriver = async (id) => {
    try {
      const res = await fetch(`http://localhost:5194/api/Drivers/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        Swal.fire({
          title: "Error",
          text: "Delete failed",
          icon: "error"
        });
        return;
      }

      Swal.fire({
        title: "Driver Deleted Successfully",
        icon: "success",
        timer: 1200,
        showConfirmButton: false
      });

      loadDrivers();
    } catch {
      Swal.fire({
        title: "Error",
        text: "Delete failed",
        icon: "error"
      });
    }
  };

  return (
    <div style={page}>
      <div style={topBar}>
        <h1 style={title}>Drivers Management</h1>

        {!showForm && (
          <button style={addBtn} onClick={() => setShowForm(true)}>
            + Add Driver
          </button>
        )}
      </div>

      <div style={tableBox}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>#</th>
              <th style={th}>Driver</th>
              <th style={th}>Phone</th>
              <th style={th}>License</th>
              <th style={th}>Experience</th>
              <th style={th}>Status</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {drivers.map((d, i) => (
              <tr key={d.id}>
                <td style={td}>#{i + 1}</td>
                <td style={tdBold}>{d.name}</td>
                <td style={td}>{d.phone}</td>
                <td style={td}>{d.licenseNumber}</td>
                <td style={td}>{d.experienceYears || 0} yrs</td>
                <td style={td}>
                  <span style={status}>
                    {d.available ? "Active" : "Busy"}
                  </span>
                </td>
                <td style={td}>
                  <button
                    style={deleteBtn}
                    onClick={() => deleteDriver(d.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div style={overlay}>
          <div style={modal}>
            <h2 style={modalTitle}>Add New Driver</h2>

            <Input label="Full Name" name="name" value={driver.name} onChange={handleChange} />
            <Input label="Phone" name="phone" value={driver.phone} onChange={handleChange} />
            <Input label="License Number" name="licenseNumber" value={driver.licenseNumber} onChange={handleChange} />
            <Input label="Experience (years)" name="experienceYears" value={driver.experienceYears} onChange={handleChange} />
            <Input label="Address" name="address" value={driver.address} onChange={handleChange} />
            <Input label="Photo URL" name="photoUrl" value={driver.photoUrl} onChange={handleChange} />

            {/* 🔥 NEW FIELDS */}
            <Input label="Username" name="username" value={driver.username} onChange={handleChange} />
            <Input label="Password" name="password" value={driver.password} onChange={handleChange} />

            <div style={btnRow}>
              <button style={saveBtn} onClick={saveDriver}>
                Save Driver
              </button>
              <button style={cancelBtn} onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={labelStyle}>{label}</label>
      <input name={name} value={value} onChange={onChange} style={input} />
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
  fontSize: "32px",
  fontWeight: "800",
  margin: 0
};

const addBtn = {
  background: "#d4b06a",
  color: "black",
  border: "none",
  padding: "14px 28px",
  borderRadius: "14px",
  fontWeight: "700",
  cursor: "pointer"
};

const tableBox = {
  background: "#0b0d17",
  borderRadius: "20px",
  overflow: "hidden",
  border:
    "1px solid rgba(255,255,255,0.05)"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const th = {
  textAlign: "left",
  padding: "20px",
  color: "#94a3b8",
  fontSize: "14px",
  borderBottom:
    "1px solid rgba(255,255,255,0.05)"
};

const td = {
  padding: "18px 20px",
  borderBottom:
    "1px solid rgba(255,255,255,0.03)",
  color: "#cbd5e1"
};

const tdBold = {
  ...td,
  fontWeight: "700",
  color: "white"
};

const status = {
  padding: "8px 16px",
  borderRadius: "999px",
  background:
    "rgba(16,185,129,0.12)",
  color: "#34d399",
  fontWeight: "700",
  fontSize: "14px",
  border:
    "1px solid rgba(16,185,129,0.2)"
};

const deleteBtn = {
  padding: "10px 16px",
  borderRadius: "12px",
  border:
    "1px solid rgba(239,68,68,0.25)",
  background:
    "rgba(239,68,68,0.08)",
  color: "#ef4444",
  fontWeight: "700",
  cursor: "pointer"
};

const btnRow = {
  display: "flex",
  gap: "10px",
  marginTop: "16px"
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.65)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backdropFilter: "blur(5px)",
  zIndex: 999
};

const modal = {
  width: "520px",
  maxWidth: "90%",
  background: "#0b0d17",
  borderRadius: "22px",
  padding: "28px",
  border:
    "1px solid rgba(255,255,255,0.06)"
};

const modalTitle = {
  fontSize: "28px",
  fontWeight: "800",
  marginBottom: "20px"
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontSize: "14px",
  color: "#9ca3af"
};

const input = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: "12px",
  border: "1px solid #20263d",
  background: "#0f1220",
  color: "white",
  outline: "none",
  fontSize: "15px",
  boxSizing: "border-box"
};

const saveBtn = {
  flex: 1,
  padding: "14px",
  background: "#d4b06a",
  border: "none",
  borderRadius: "12px",
  fontWeight: "700",
  cursor: "pointer"
};

const cancelBtn = {
  width: "140px",
  padding: "14px",
  background: "#151826",
  border: "1px solid #2b324d",
  borderRadius: "12px",
  color: "white",
  cursor: "pointer",
  fontWeight: "600"
};