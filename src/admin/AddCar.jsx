import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function AddCar() {
  const [showForm, setShowForm] = useState(false);
  const [cars, setCars] = useState([]);

  const [car, setCar] = useState({
    name: "",
    brand: "",
    model: "",
    year: "2023",
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: "5",
    carType: "SUV",
    registrationNumber: "",
    pricePerDay: "",
    mileage: "",
    imageFile: null
  });

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      const res = await fetch("http://localhost:5194/api/Cars");
      const data = await res.json();
      setCars(data);
    } catch {
      Swal.fire("Error", "Failed to load cars", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imageFile") {
      setCar({
        ...car,
        imageFile: files[0]
      });
      return;
    }

    setCar({
      ...car,
      [name]: value
    });
  };

  const saveCar = async () => {
    if (
      !car.name.trim() ||
      !car.brand.trim() ||
      Number(car.pricePerDay) <= 0
    ) {
      Swal.fire("Warning", "Fill required fields properly", "warning");
      return;
    }

    const formData = new FormData();

    formData.append("name", car.name);
    formData.append("brand", car.brand);
    formData.append("model", car.model);
    formData.append("year", car.year);
    formData.append("fuelType", car.fuelType);
    formData.append("transmission", car.transmission);
    formData.append("seats", car.seats);
    formData.append("carType", car.carType);
    formData.append("registrationNumber", car.registrationNumber);
    formData.append("pricePerDay", car.pricePerDay);
    formData.append("mileage", car.mileage);

    if (car.imageFile) {
      formData.append("Image", car.imageFile);
    }

    try {
      const res = await fetch("http://localhost:5194/api/Cars", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        const err = await res.text();
        Swal.fire("Error", err || "Failed to save car", "error");
        return;
      }

      Swal.fire({
        title: "Car Added Successfully ✅",
        icon: "success",
        timer: 1200,
        showConfirmButton: false
      });

      setShowForm(false);

      setCar({
        name: "",
        brand: "",
        model: "",
        year: "2023",
        fuelType: "Petrol",
        transmission: "Automatic",
        seats: "5",
        carType: "SUV",
        registrationNumber: "",
        pricePerDay: "",
        mileage: "",
        imageFile: null
      });

      loadCars();
    } catch {
      Swal.fire("Error", "Server error while saving car", "error");
    }
  };

  return (
    <div style={page}>
      <div style={topBar}>
        {/* TABLE */}

        <h1 style={title}>Cars Management</h1>

        {!showForm && (
          <button style={addBtn} onClick={() => setShowForm(true)}>
            + Add New Car
          </button>
        )}
      </div>
      <div style={tableBox}>
  <table style={table}>
    <thead>
      <tr>
        <th style={th}>Image</th>
        <th style={th}>Car</th>
        <th style={th}>Brand</th>
        <th style={th}>Type</th>
        <th style={th}>Price</th>
        <th style={th}>Seats</th>
        <th style={th}>Status</th>
      </tr>
    </thead>

    <tbody>
      {cars.length > 0 ? (
        cars.map((c, i) => (
          <tr key={i}>
            <td style={td}>
              <img
  src={
    c.imageUrl?.startsWith("http")
      ? c.imageUrl
      : `http://localhost:5194${c.imageUrl}`
  }
  alt="car"
  onError={(e) => {
    e.target.src =
      "https://via.placeholder.com/110x75?text=Car";
  }}
  style={{
    width: "110px",
    height: "75px",
    objectFit: "cover",
    borderRadius: "12px",
    border: "1px solid #222"
  }}
/>
            </td>

            <td style={tdBold}>{c.name}</td>
            <td style={td}>{c.brand}</td>
            <td style={td}>{c.carType}</td>
            <td style={td}>₹{c.pricePerDay}</td>
            <td style={td}>{c.seats}</td>

            <td style={td}>
              <span
                style={
                  c.available
                    ? statusActive
                    : statusBusy
                }
              >
                {c.available
                  ? "Available"
                  : "Booked"}
              </span>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="7"
            style={{
              padding: "40px",
              textAlign: "center",
              color: "#888"
            }}
          >
            No Cars Found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

      {showForm && (
        <div style={overlay}>
          <div style={modal}>
            <h2 style={modalTitle}>Add New Car</h2>

            <div style={grid}>

              <Input
                label="Car Name"
                name="name"
                value={car.name}
                onChange={handleChange}
                suggestions={["Fortuner", "Creta", "Swift", "BMW X5"]}
              />

              <Input
                label="Brand"
                name="brand"
                value={car.brand}
                onChange={handleChange}
                suggestions={["Toyota", "Hyundai", "BMW", "Mercedes"]}
              />

              <Input
                label="Model"
                name="model"
                value={car.model}
                onChange={handleChange}
                suggestions={["2024", "ZX", "Sport", "Top Model"]}
              />

              <SelectInput
                label="Year"
                name="year"
                value={car.year}
                onChange={handleChange}
                options={["2025", "2024", "2023", "2022"]}
              />

              <Input
                label="Price Per Day"
                name="pricePerDay"
                value={car.pricePerDay}
                onChange={handleChange}
              />

              <SelectInput
                label="Seats"
                name="seats"
                value={car.seats}
                onChange={handleChange}
                options={["2", "4", "5", "7"]}
              />

              <SelectInput
                label="Fuel Type"
                name="fuelType"
                value={car.fuelType}
                onChange={handleChange}
                options={["Petrol", "Diesel", "Electric", "Hybrid"]}
              />

              <SelectInput
                label="Transmission"
                name="transmission"
                value={car.transmission}
                onChange={handleChange}
                options={["Automatic", "Manual"]}
              />

              <Input
                label="Mileage"
                name="mileage"
                value={car.mileage}
                onChange={handleChange}
              />

              <SelectInput
                label="Car Type"
                name="carType"
                value={car.carType}
                onChange={handleChange}
                options={["SUV", "Sedan", "Hatchback", "Luxury"]}
              />

              <Input
                label="Registration Number"
                name="registrationNumber"
                value={car.registrationNumber}
                onChange={handleChange}
              />

              {/* IMAGE FILE */}
              <div>
                <label style={labelStyle}>Car Image</label>

                <input
                  type="file"
                  accept="image/*"
                  name="imageFile"
                  onChange={handleChange}
                  style={input}
                />
              </div>
            </div>

            <div style={btnRow}>
              <button style={saveBtn} onClick={saveCar}>
                Save Car
              </button>

              <button
                style={cancelBtn}
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function Input({
  label,
  name,
  value,
  onChange,
  suggestions = []
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>

      <input
        list={name}
        name={name}
        value={value}
        onChange={onChange}
        style={input}
      />

      <datalist id={name}>
        {suggestions.map((s) => (
          <option key={s} value={s} />
        ))}
      </datalist>
    </div>
  );
}

function SelectInput({
  label,
  name,
  value,
  onChange,
  options
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        style={input}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
/* ---------- STYLES ---------- */
const page = {
  padding: "30px",
  color: "white",
  minHeight: "100vh",
  background: "#05070f",
  width: "100%",
  overflowX: "hidden",
  boxSizing: "border-box"
};

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
  gap: "20px",
  flexWrap: "wrap"
};

const title = {
  fontSize: "42px",
  fontWeight: "800",
  margin: 0
};

const addBtn = {
  background: "#d4b06a",
  color: "black",
  border: "none",
  padding: "14px 30px",
  borderRadius: "14px",
  fontWeight: "700",
  cursor: "pointer",
  fontSize: "15px",
  whiteSpace: "nowrap"
};

const overlay = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backdropFilter: "blur(5px)",
  padding: "20px",
  zIndex: 1000
};

const modal = {
  width: "850px",
  maxWidth: "95%",
  maxHeight: "88vh",
  overflowY: "auto",
  background: "#0b0d17",
  borderRadius: "20px",
  padding: "28px",
  border: "1px solid rgba(255,255,255,0.06)",
  boxSizing: "border-box"
};

const modalTitle = {
  fontSize: "36px",
  fontWeight: "800",
  marginBottom: "30px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: "18px",
  width: "100%"
};

const fullWidth = {
  gridColumn: "1 / -1"
};

const labelStyle = {
  display: "block",
  marginBottom: "10px",
  fontSize: "15px",
  color: "#9ca3af"
};

const input = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid #20263d",
  background: "#0f1220",
  color: "white",
  outline: "none",
  fontSize: "15px",
  boxSizing: "border-box"
};

const textarea = {
  ...input,
  minHeight: "90px",
  resize: "none"
};

const checkboxRow = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "18px"
};

const btnRow = {
  display: "flex",
  gap: "14px",
  marginTop: "24px",
  flexWrap: "wrap"
};

const saveBtn = {
  flex: 1,
  minWidth: "180px",
  padding: "14px",
  background: "#d4b06a",
  border: "none",
  borderRadius: "12px",
  fontWeight: "700",
  cursor: "pointer"
};

const cancelBtn = {
  flex: 1,
  minWidth: "180px",
  padding: "14px",
  background: "#151826",
  border: "1px solid #2b324d",
  borderRadius: "12px",
  color: "white",
  cursor: "pointer"
};

const tableBox = {
  marginTop: "30px",
  background: "#0b0d17",
  borderRadius: "20px",
  overflowX: "auto",
  width: "100%",
  border: "1px solid rgba(255,255,255,0.05)"
};

const table = {
  width: "100%",
  minWidth: "950px",
  borderCollapse: "collapse"
};

const th = {
  textAlign: "left",
  padding: "20px",
  color: "#94a3b8",
  fontSize: "14px",
  borderBottom:
    "1px solid rgba(255,255,255,0.05)",
  whiteSpace: "nowrap"
};

const td = {
  padding: "18px 20px",
  borderBottom:
    "1px solid rgba(255,255,255,0.03)",
  color: "#cbd5e1",
  whiteSpace: "nowrap"
};

const tdBold = {
  ...td,
  fontWeight: "700",
  color: "white"
};

const statusActive = {
  padding: "8px 16px",
  borderRadius: "999px",
  background:
    "rgba(16,185,129,0.12)",
  color: "#34d399",
  fontWeight: "700",
  fontSize: "14px",
  border:
    "1px solid rgba(16,185,129,0.2)",
  display: "inline-block"
};

const statusBusy = {
  padding: "8px 16px",
  borderRadius: "999px",
  background:
    "rgba(239,68,68,0.12)",
  color: "#ef4444",
  fontWeight: "700",
  fontSize: "14px",
  border:
    "1px solid rgba(239,68,68,0.2)",
  display: "inline-block"
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