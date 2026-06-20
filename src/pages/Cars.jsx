import { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import Swal from "sweetalert2";

export default function Cars() {
  const [cars, setCars] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [type, setType] =
    useState("");

  const [fuel, setFuel] =
    useState("");

  const [trans, setTrans] =
    useState("");

  const baseUrl =
    "http://localhost:5194";

  const resetAll = () => {
    setSearch("");
    setType("");
    setFuel("");
    setTrans("");

    Swal.fire({
      title:
        "Filters Reset Successfully",
      icon: "success",
      timer: 1200,
      showConfirmButton: false
    });
  };

  const makeImageUrl = (url) => {
    if (!url || url.trim() === "") {
      return "/default-car.jpg";
    }

    if (url.startsWith("http")) {
      return url;
    }

    return baseUrl + url;
  };

  useEffect(() => {
    fetch(`${baseUrl}/api/Cars`)
      .then((res) => res.json())
      .then((data) => {
        const formatted =
          data.map((car) => ({
            id: car.id,
            name: car.name || "",
            brand: car.brand || "",
            year: car.year || "",
            fuel: car.fuelType || "",
            trans:
              car.transmission || "",
            seats: car.seats || "",
            type: car.carType || "",
            price:
              car.pricePerDay || 0,
            image: makeImageUrl(
              car.imageUrl
            ),
            available:
              car.available ?? true
          }));

        setCars(formatted);
      })
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: "Failed to load cars",
          icon: "error"
        });
      });
  }, []);

  const filtered = cars.filter(
    (c) =>
      (c.name || "")
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) &&
      (type === "" ||
        c.type === type) &&
      (fuel === "" ||
        c.fuel === fuel) &&
      (trans === "" ||
        c.trans === trans)
  );


  return (
    <div style={page}>
      <div style={layout}>
        {/* SIDEBAR */}
        <div style={sidebar}>
          <div style={topRow}>
            <h3
              style={{
                margin: 0
              }}
            >
              Filters
            </h3>

            <span
              style={resetText}
              onClick={resetAll}
            >
              Reset
            </span>
          </div>

          {/* SEARCH */}
          <input
            placeholder="Search cars..."
            value={search}
            style={searchInput}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          {/* CAR TYPE */}
          <p style={section}>
            CAR TYPE
          </p>

          {[
            "SUV",
            "Sedan",
            "Luxury",
            "Van",
            "Hatchback",
            "Convertible"
          ].map((t) => (
            <label
              key={t}
              style={radioRow}
            >
              <input
                type="radio"
                name="type"
                checked={
                  type === t
                }
                onChange={() =>
                  setType(t)
                }
              />
              {t}
            </label>
          ))}

          {/* FUEL */}
          <p style={section}>
            FUEL TYPE
          </p>

          {[
            "Petrol",
            "Diesel",
            "Electric",
            "Hybrid",
            "CNG"
          ].map((f) => (
            <label
              key={f}
              style={radioRow}
            >
              <input
                type="radio"
                name="fuel"
                checked={
                  fuel === f
                }
                onChange={() =>
                  setFuel(f)
                }
              />
              {f}
            </label>
          ))}

          {/* TRANSMISSION */}
          <p style={section}>
            TRANSMISSION
          </p>

          {[
            "Manual",
            "Automatic"
          ].map((t) => (
            <label
              key={t}
              style={radioRow}
            >
              <input
                type="radio"
                name="trans"
                checked={
                  trans === t
                }
                onChange={() =>
                  setTrans(t)
                }
              />
              {t}
            </label>
          ))}

          {/* PRICE */}
          <p style={section}>
            PRICE RANGE
            (₹/DAY)
          </p>

          <div style={priceRow}>
            <input
              placeholder="Min"
              style={priceInput}
            />

            <input
              placeholder="Max"
              style={priceInput}
            />
          </div>

          {/* SORT */}
          <p style={section}>
            SORT BY
          </p>

          <select
            style={select}
          >
            <option>
              Newest
            </option>
            <option>
              Price Low
            </option>
            <option>
              Price High
            </option>
          </select>
        </div>

        {/* MAIN */}
        <div
          style={{
            flex: 1
          }}
        >
          <h2>
            Available Cars
          </h2>

          <p
            style={{
              color:
                "#9ca3af"
            }}
          >
            {
              filtered.length
            }{" "}
            cars found
          </p>

          <div style={grid}>
            {filtered.map(
              (c) => (
                <CarCard
                  key={c.id}
                  car={c}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const page={
  minHeight:"100vh",
  background:"#05070f",
  color:"white",
  padding:"30px"
};

const layout={
  display:"flex",
  gap:"30px"
};

const sidebar = {
  width: "270px",
  background: "linear-gradient(180deg,#0b0f1a,#05070f)",
  padding: "22px",
  borderRadius: "18px",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
  overflow: "hidden"   // ⭐ ADD THIS
};

const topRow={
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center"
};

const resetText={
  color:"#c8a96e",
  fontSize:"13px",
  cursor:"pointer"
};

const searchInput={
  width:"100%",
  padding:"12px",
  marginTop:"15px",
  borderRadius:"12px",
  border:"1px solid #1f2937",
  background:"#0f172a",
  color:"white",
  boxSizing: 'border-box'

};

const section={
  marginTop:"20px",
  fontSize:"12px",
  color:"#6b7280",
  letterSpacing:"1px"
};

const radioRow={
  display:"flex",
  alignItems:"center",
  gap:"8px",
  marginTop:"8px",
  fontSize:"14px",
  color:"#d1d5db",
  cursor:"pointer"
};

const priceRow = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
  width: "100%"   // ⭐ ADD
};

const priceInput = {
  width: "100%",          // ⭐ CHANGE (flex hatao)
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #1f2937",
  background: "#0f172a",
  color: "white",
  minWidth: "0"           // ⭐ VERY IMPORTANT (fix overflow)
};

const select={
  width:"100%",
  padding:"12px",
  marginTop:"10px",
  borderRadius:"12px",
  background:"#0f172a",
  border:"1px solid #1f2937",
  color:"white"
};
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "25px",
  marginTop: "20px"
};