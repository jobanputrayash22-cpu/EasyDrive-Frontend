import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/admin"
    },
    {
      name: "Add Car",
      path: "/admin/add-car"
    },
    {
      name: "Add Driver",
      path: "/admin/add-driver"
    },
    {
      name: "Requests",
      path: "/admin/requests"
    },
    {
      name: "Bookings",
      path: "/admin/bookings"
    },
    {
      name: "Calendar",
      path: "/admin/calendar"
    }
  ];

  return (
    <div style={sidebar}>
      <h2 style={title}>
        Admin Panel
      </h2>

      <div style={menuWrap}>
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...link,
              ...(location.pathname ===
              item.path
                ? activeLink
                : {})
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

const sidebar = {
  width: "260px",
  minHeight: "100vh",
  background: "#0b0d17",
  color: "white",
  padding: "30px 20px",
  borderRight:
    "1px solid rgba(255,255,255,0.05)",
  display: "flex",
  flexDirection: "column"
};

const title = {
  fontSize: "28px",
  fontWeight: "800",
  marginBottom: "30px",
  color: "#d4b06a"
};

const menuWrap = {
  display: "flex",
  flexDirection: "column",
  gap: "14px"
};

const link = {
  color: "#cbd5e1",
  textDecoration: "none",
  padding: "14px 18px",
  borderRadius: "14px",
  fontSize: "15px",
  fontWeight: "500",
  transition: "0.3s ease",
  background: "transparent"
};

const activeLink = {
  background: "#111827",
  color: "#ffffff",
  border:
    "1px solid rgba(212,176,106,0.25)"
};