import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// User Pages
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import BookingPage from "./pages/BookingPage";
import InvoicePage from "./pages/InvoicePage";
import DriverDashboard from "./pages/DriverDashboard";
import DriverLogin from "./pages/DriverLogin";
import NotificationsPage from "./pages/NotificationsPage";
import ReviewPage from "./pages/ReviewPage";
import PaymentPage from "./pages/PaymentPage";

// Admin Pages
import Dashboard from "./admin/Dashboard";
import AddCar from "./admin/AddCar";
import AddDriver from "./admin/AddDriver";
import Requests from "./admin/Requests";
import Bookings from "./admin/Bookings";
import AdminLayout from "./admin/AdminLayout";
import AdminCalendar from "./admin/AdminCalendar";

export default function App() {
  return (
    <BrowserRouter>
      {/* TOAST CONTAINER */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="dark"
      />

      <Routes>
        {/* ================= USER ROUTES ================= */}

        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />

        <Route
          path="/cars"
          element={
            <>
              <Header />
              <Cars />
              <Footer />
            </>
          }
        />

        {/* FIXED ROUTE */}
        <Route
          path="/details/:id"
          element={<CarDetails />}
        />

        <Route
          path="/login"
          element={<Auth type="login" />}
        />

        <Route
          path="/register"
          element={<Auth type="register" />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

        <Route
          path="/booking/:id"
          element={<BookingPage />}
        />

        <Route
          path="/payment"
          element={<PaymentPage />}
        />

        <Route
          path="/driver-login"
          element={<DriverLogin />}
        />

        <Route
          path="/invoice/:id"
          element={<InvoicePage />}
        />

        <Route
          path="/driver-dashboard"
          element={<DriverDashboard />}
        />

        <Route
          path="/notifications"
          element={<NotificationsPage />}
        />

        <Route
          path="/review"
          element={<ReviewPage />}
        />

        {/* ================= ADMIN ROUTES ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="Admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="add-car"
            element={<AddCar />}
          />

          <Route
            path="add-driver"
            element={<AddDriver />}
          />

          <Route
            path="requests"
            element={<Requests />}
          />

          <Route
            path="bookings"
            element={<Bookings />}
          />

          <Route
            path="calendar"
            element={<AdminCalendar />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}