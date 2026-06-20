import {
  Link,
  Outlet,
  useLocation
} from "react-router-dom";
import logoImg from "../assets/easydrive-logo.png"
import Swal from "sweetalert2";

export default function AdminLayout() {
  const location =
    useLocation();

  const menu = [
    {
      name: "Dashboard",
      icon: "📊",
      path: "/admin"
    },
    {
      name: "Cars",
      icon: "🚗",
      path: "/admin/add-car"
    },
    {
      name: "Drivers",
      icon: "👤",
      path: "/admin/add-driver"
    },
    {
      name: "Requests",
      icon: "📋",
      path: "/admin/requests"
    },
    {
      name: "Bookings",
      icon: "📦",
      path: "/admin/bookings"
    },
    {
      name: "Calendar",
      icon: "📅",
      path: "/admin/calendar"
    }
  ];

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();

        Swal.fire({
          title: "Logged out successfully ✅",
          icon: "success",
          timer: 1200,
          showConfirmButton: false
        });

        setTimeout(() => {
          window.location = "/";
        }, 1200);
      }
    });
  };


  return (
    <div style={layout}>
      {/* SIDEBAR */}
      <aside style={sidebar}>
        {/* LOGO */}
       <div style={logoSection}>
  <img
    src={logoImg}
    alt="EasyDrive"
    style={adminLogo}
  />

  <p style={subLogo}>
    ADMIN PANEL
  </p>
</div>

        {/* MENU */}
        <div style={menuWrap}>
          {menu.map(
            (item) => {
              const active =
                location.pathname ===
                item.path;

              return (
                <Link
                  key={
                    item.path
                  }
                  to={
                    item.path
                  }
                  style={{
                    ...menuItem,
                    ...(active
                      ? activeMenu
                      : {})
                  }}
                >
                  <span>
                    {
                      item.icon
                    }
                  </span>

                  <span>
                    {
                      item.name
                    }
                  </span>
                </Link>
              );
            }
          )}
        </div>

        {/* FOOTER */}
        <div style={footer}>
          <div
            style={userCard}
          >
            <div
              style={avatar}
            >
              A
            </div>

            <div>
              <div
                style={
                  userName
                }
              >
                Admin User
              </div>

              <div
                style={
                  userRole
                }
              >
                Administrator
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            style={logoutBtn}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={main}>
        <div style={content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const layout = {
  display: "flex",
  minHeight: "100vh",
  background: "#05070f",
  color: "white",
  fontFamily: "system-ui"
};

const sidebar = {
  width: "240px",
  minWidth: "240px",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  background: "#0b0d17",
  borderRight:
    "1px solid rgba(255,255,255,0.05)",
  display: "flex",
  flexDirection: "column",
  justifyContent:
    "space-between",
  zIndex: 999
};

const logoSection = {
  padding: "28px 20px",
  borderBottom:
    "1px solid rgba(255,255,255,0.05)"
};

const logo = {
  margin: 0,
  fontSize: "18px",
  fontWeight: "700",
  color: "#d4b06a"
};

const subLogo = {
  marginTop: "4px",
  fontSize: "11px",
  color: "#6b7280",
  letterSpacing: "1px"
};

const menuWrap = {
  padding: "20px 0"
};

const menuItem = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px 18px",
  margin: "4px 10px",
  borderRadius: "12px",
  textDecoration: "none",
  color: "#cbd5e1",
  fontSize: "15px",
  fontWeight: "500"
};

const activeMenu = {
  background:
    "rgba(212,176,106,0.14)",
  color: "#d4b06a"
};

const footer = {
  padding: "20px",
  borderTop:
    "1px solid rgba(255,255,255,0.05)",
  marginTop: "auto"
};

const userCard = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  marginBottom: "18px"
};

const avatar = {
  width: "38px",
  height: "38px",
  borderRadius: "50%",
  background: "#d4b06a",
  color: "#111",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "700"
};

const userName = {
  fontWeight: "600",
  fontSize: "14px"
};

const userRole = {
  fontSize: "12px",
  color: "#6b7280"
};

const logoutBtn = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border:
    "1px solid rgba(255,255,255,0.08)",
  background: "#151826",
  color: "white",
  fontWeight: "500",
  cursor: "pointer",
  fontSize: "14px"
};

const main = {
  flex: 1,
  marginLeft: "240px",
  background: "#05070f",
  minHeight: "100vh"
};

const content = {
  padding: "28px"
};
const adminLogo = {
  width: "120px",
  height: "auto",
  objectFit: "contain",
  marginBottom: "10px",
  filter:
    "drop-shadow(0 0 15px rgba(245,210,122,0.25))"
};