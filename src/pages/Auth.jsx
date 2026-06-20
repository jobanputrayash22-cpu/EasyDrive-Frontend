import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import "./auth.css";

export default function Auth({ type }) {
  const isLogin = type === "login";

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [fullName, setFullName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const handleSubmit =
    async () => {
      const url = isLogin
        ? "http://localhost:5194/api/Auth/login"
        : "http://localhost:5194/api/Auth/register";

      const bodyData =
        isLogin
          ? { email, password }
          : {
              fullName,
              email,
              phone,
              password,
              role: "User"
            };

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify(
            bodyData
          )
        });

        const data = await res.json();

        if (!res.ok) {
          Swal.fire({
            title: "Error",
            text: isLogin
              ? "Invalid login"
              : "Registration failed",
            icon: "error"
          });
          return;
        }

        if (isLogin) {
          localStorage.setItem(
            "token",
            data.token
          );

          localStorage.setItem(
            "email",
            data.email
          );

          localStorage.setItem(
            "role",
            data.role
          );

          localStorage.setItem(
            "userId",
            data.userId
          );

          localStorage.setItem(
            "fullName",
            data.fullName
          );
          
           localStorage.setItem(
            "phone",
            data.phone
          );

          localStorage.setItem(
            "user",
            JSON.stringify({
              token: data.token,
              email: data.email,
              role: data.role,
              userId: data.userId,
              fullName: data.fullName,
              phone: data.phone
            })
          );

          Swal.fire({
            title: "Login Successful ✅",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });

          setTimeout(() => {
            if (data.role === "Admin") {
              window.location = "/admin";
            } else if (data.role === "Driver") {
              window.location =
                "/driver-dashboard";
            } else {
              window.location = "/";
            }
          }, 1500);
        } else {
          Swal.fire({
            title:
              "Registered successfully ✅",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });

          setTimeout(() => {
            window.location = "/login";
          }, 1500);
        }
      } catch {
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error"
        });
      }
    };

  const handleGoogle =
    async (res) => {
      try {
        const decoded =
          jwtDecode(
            res.credential
          );

        const response =
          await fetch(
            "http://localhost:5194/api/Auth/google",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json"
              },
              body: JSON.stringify(
                {
                  email:
                    decoded.email,
                  fullName:
                    decoded.name
                }
              )
            }
          );

        if (!response.ok) {
          Swal.fire({
            title: "Error",
            text:
              "Google authentication failed",
            icon: "error"
          });
          return;
        }

        const data =
          await response.json();

        const userData = {
          token: data.token,
          email: data.email,
          role: data.role,
          userId: data.userId,
          fullName:
            decoded.name ||
            data.fullName ||
            "Customer",
            phone: data.phone,
          picture:
            decoded.picture
        };

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "email",
          data.email
        );

        localStorage.setItem(
          "role",
          data.role
        );

        localStorage.setItem(
          "userId",
          data.userId
        );

        localStorage.setItem(
          "fullName",
          userData.fullName
        );

        localStorage.setItem(
          "user",
          JSON.stringify(userData)
        );

        Swal.fire({
          title:
            "Google Login Successful ✅",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });

        setTimeout(() => {
          if (data.role === "Admin") {
            window.location = "/admin";
          } else if (data.role === "Driver") {
            window.location =
              "/driver-dashboard";
          } else {
            window.location = "/";
          }
        }, 1500);
      } catch {
        Swal.fire({
          title: "Error",
          text: "Google auth failed",
          icon: "error"
        });
      }
    };


  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>
          {isLogin
            ? "Welcome Back"
            : "Create Your Account"}
        </h2>

        {!isLogin && (
          <>
            <input
              className="auth-input"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) =>
                setFullName(
                  e.target.value
                )
              }
            />

            <input
              className="auth-input"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
            />
          </>
        )}

        <input
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          className="auth-input"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          className="auth-btn"
          onClick={
            handleSubmit
          }
        >
          {isLogin
            ? "Login"
            : "Create Account"}
        </button>

        <div className="auth-divider">
          OR
        </div>

        <GoogleLogin
          onSuccess={
            handleGoogle
          }
          onError={() =>
            alert(
              "Google Failed"
            )
          }
        />

        <p className="auth-text">
          {isLogin ? (
            <>
              Don’t have an
              account?{" "}
              <a href="/register">
                Signup
              </a>
            </>
          ) : (
            <>
              Already have an
              account?{" "}
              <a href="/login">
                Login
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}