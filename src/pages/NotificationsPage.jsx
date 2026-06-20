import { useEffect, useState } from "react";

export default function NotificationsPage() {
  const [items, setItems] =
    useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const userId =
      localStorage.getItem("userId") || 1;

    const res = await fetch(
      `http://localhost:5194/api/Notifications/${userId}`
    );

    const data = await res.json();
    setItems(data);
  };

  return (
    <div style={page}>
      <h1 style={title}>
        Notifications
      </h1>

      {items.map((n) => (
        <div
          key={n.id}
          style={card}
        >
          <h2>{n.title}</h2>
          <p>{n.message}</p>
          <small>
            {new Date(
              n.createdAt
            ).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}

const page = {
  padding: "30px",
  minHeight: "100vh",
  background: "#05070f",
  color: "white"
};

const title = {
  fontSize: "34px",
  marginBottom: "30px"
};

const card = {
  background: "#0b0d17",
  padding: "20px",
  borderRadius: "18px",
  marginBottom: "20px"
};