import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] =
    useState(false);
  const [newEmail, setNewEmail] =
    useState("");

  useEffect(() => {
    const stored =
      localStorage.getItem("user");

    if (stored) {
      const u = JSON.parse(stored);
      setUser(u);
      setNewEmail(u.email || "");
    }
  }, []);

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout",
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

  const saveProfile = () => {
    if (!newEmail.trim()) {
      Swal.fire({
        title: "Warning",
        text: "Please enter email",
        icon: "warning"
      });
      return;
    }

    const updated = {
      ...user,
      email: newEmail
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updated)
    );

    setUser(updated);
    setEditing(false);

    Swal.fire({
      title:
        "Profile updated successfully",
      icon: "success",
      timer: 1200,
      showConfirmButton: false
    });
  };

  if (!user) {
    return (
      <h2 style={{ padding: "40px" }}>
        Login required
      </h2>
    );
  }


  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#020617)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px"
      }}
    >
      <div
        style={{
          background:
            "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          padding: "40px",
          borderRadius: "16px",
          width: "420px",
          color: "white",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.6)"
        }}
      >
        {/* PHOTO */}
        <div
          style={{
            textAlign: "center"
          }}
        >
          {user.picture ? (
            <img
              src={user.picture}
              alt="profile"
              style={{
                width: "95px",
                height: "95px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "15px"
              }}
            />
          ) : (
            <div
              style={{
                width: "95px",
                height: "95px",
                borderRadius: "50%",
                background: "#6366f1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "34px",
                margin:
                  "0 auto 15px"
              }}
            >
              {user.email?.[0]?.toUpperCase()}
            </div>
          )}
        </div>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          My Profile
        </h2>

        {/* EMAIL */}
        <label>Email</label>

        {editing ? (
          <input
            value={newEmail}
            onChange={(e) =>
              setNewEmail(
                e.target.value
              )
            }
            style={input}
          />
        ) : (
          <div style={field}>
            {user.email}
          </div>
        )}

        {/* ROLE */}
        <label
          style={{
            marginTop: "15px"
          }}
        >
          Role
        </label>

        <div style={field}>
          {user.role || "User"}
        </div>

        {/* BUTTONS */}
        <div
          style={{
            marginTop: "25px",
            display: "flex",
            gap: "10px"
          }}
        >
          {editing ? (
            <button
              style={btnPrimary}
              onClick={saveProfile}
            >
              Save
            </button>
          ) : (
            <button
              style={btnPrimary}
              onClick={() =>
                setEditing(true)
              }
            >
              Edit Profile
            </button>
          )}

          <button
            style={btnDark}
            onClick={logout}
          >
            Logout
          </button>
        </div>

        {/* BOOKING HISTORY */}
        <div
          style={{
            marginTop: "30px"
          }}
        >
          <h3
            style={{
              marginBottom: "10px"
            }}
          >
            Booking History
          </h3>

          <div
            style={{
              background:
                "rgba(255,255,255,0.05)",
              padding: "12px",
              borderRadius: "8px",
              fontSize: "14px",
              color: "#bbb"
            }}
          >
            No bookings yet
            (connect backend later)
          </div>
        </div>
      </div>
    </div>
  );
}

/* styles */
const input={
  width:"100%",
  padding:"10px",
  borderRadius:"8px",
  border:"1px solid rgba(255,255,255,0.2)",
  background:"rgba(255,255,255,0.05)",
  color:"white"
};

const field={
  padding:"10px",
  borderRadius:"8px",
  background:"rgba(255,255,255,0.08)",
  marginTop:"5px"
};

const btnPrimary={
  flex:1,
  padding:"11px",
  border:"none",
  borderRadius:"8px",
  background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
  color:"white",
  cursor:"pointer"
};

const btnDark={
  flex:1,
  padding:"11px",
  border:"none",
  borderRadius:"8px",
  background:"#111",
  color:"white",
  cursor:"pointer"
};